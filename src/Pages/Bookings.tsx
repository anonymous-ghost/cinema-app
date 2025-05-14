import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useBookings } from '../contexts/BookingsContext';
import { useFilms } from '../contexts/FilmsContext';
import { useSessions } from '../contexts/SessionsContext';
import { Booking, BookingStatus } from '../types/movie';
import '../styles/Bookings.css';

const Bookings = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const { getUserBookings, updateBookingStatus } = useBookings();
  const { films } = useFilms();
  const { sessions } = useSessions();
  const navigate = useNavigate();
  
  const [userBookings, setUserBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  // Load user bookings
  useEffect(() => {
    if (currentUser) {
      const bookings = getUserBookings(currentUser.id);
      setUserBookings(bookings);
    }
  }, [currentUser, getUserBookings]);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  // Get film and session details
  const getBookingDetails = (booking: Booking) => {
    const session = sessions.find(s => s.id === booking.sessionId.toString());
    const film = session ? films.find(f => f.id === session.filmId) : null;
    
    return { film, session };
  };
  
  // Format date for debugging
  const formatDateForDebug = (date: Date) => {
    return date.toISOString();
  };

  // Filter bookings based on active tab
  const filteredBookings = userBookings.filter(booking => {
    const { session } = getBookingDetails(booking);
    
    if (!session) return false;
    
    // Skip cancelled bookings entirely
    if (booking.status === BookingStatus.CANCELLED) return false;
    
    // For debugging
    console.log(`Booking ${booking.id} - Status: ${booking.status}`);
    
    if (activeTab === 'upcoming') {
      // Upcoming tab: ONLY show RESERVED status bookings
      return booking.status === BookingStatus.RESERVED;
    } else {
      // Past tab: ONLY show PAID status bookings
      return booking.status === BookingStatus.PAID;
    }
  });
  
  // Cancel booking
  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      updateBookingStatus(bookingId, BookingStatus.CANCELLED);
      // Refresh bookings
      if (currentUser) {
        const bookings = getUserBookings(currentUser.id);
        setUserBookings(bookings);
      }
    }
  };
  
  if (!currentUser) {
    return null; // Will redirect to login via useEffect
  }
  
  return (
    <main className="bookings-page">
      <div className="bookings-container">
        <h1>My Bookings</h1>
        
        <div className="bookings-tabs">
          <button 
            className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Bookings
          </button>
          <button 
            className={`tab-button ${activeTab === 'past' ? 'active' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            Past Bookings
          </button>
        </div>
        
        {filteredBookings.length === 0 ? (
          <div className="no-bookings">
            <p>You don't have any {activeTab} bookings.</p>
            <button 
              onClick={() => navigate('/sessions')}
              className="browse-sessions-btn"
            >
              Browse Sessions
            </button>
          </div>
        ) : (
          <div className="bookings-list">
            {filteredBookings.map(booking => {
              const { film, session } = getBookingDetails(booking);
              
              if (!film || !session) return null;
              
              return (
                <div key={booking.id} className="booking-card">
                  <div className="booking-image">
                    {film.posterUrl && <img src={film.posterUrl} alt={film.title} />}
                  </div>
                  
                  <div className="booking-details">
                    <h3>{film.title}</h3>
                    
                    <div className="booking-info">
                      <p><strong>Date:</strong> {session.date}</p>
                      <p><strong>Time:</strong> {session.time}</p>
                      <p><strong>Hall:</strong> {session.hall}</p>
                      <p><strong>Seats:</strong> {booking.seats.map(seat => `Row ${seat.row}, Seat ${seat.seat}`).join('; ')}</p>
                      <p><strong>Total Price:</strong> {booking.totalPrice} UAH</p>
                      <p><strong>Booking Date:</strong> {formatDate(booking.bookingDate)}</p>
                      <p><strong>Status:</strong> <span className={`status-${booking.status}`}>{booking.status}</span></p>
                    </div>
                    
                    {booking.status === BookingStatus.RESERVED && (
                      <div className="booking-actions">
                        <button 
                          onClick={() => navigate(`/checkout/${session.id}`, { 
                            state: { bookingId: booking.id } 
                          })}
                          className="pay-button"
                        >
                          Complete Payment
                        </button>
                        <button 
                          onClick={() => handleCancelBooking(booking.id)}
                          className="cancel-button"
                        >
                          Cancel Booking
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default Bookings; 