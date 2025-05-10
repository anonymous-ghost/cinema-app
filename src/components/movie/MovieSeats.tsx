import { useState } from "react";
import { Session, Seat } from "@/types/movie";
import { useToast } from "@/hooks/useToast";
import SeatGrid from "./MovieSeats/SeatGrid";
import SessionPicker from "./MovieSeats/SessionPicker";

// Props expected by the component
interface MovieSeatsProps {
  movieId: number;
  sessions: Session[];
}

// Extended seat interface with a unique seat number
export interface ExtendedSeat extends Seat {
  seatNumber: number;
}

const MovieSeats = ({ movieId, sessions }: MovieSeatsProps) => {
  // State for the selected session (default is the first one or null)
  const [selectedSession, setSelectedSession] = useState<Session | null>(sessions[0] || null);

  // State for storing seats selected by the user
  const [selectedSeats, setSelectedSeats] = useState<ExtendedSeat[]>([]);

  // Toast for user notifications
  const { toast } = useToast();

  // Generate a map of all available seats in the hall (5 rows × 8 seats)
  const seatMap: Record<number, ExtendedSeat> = {};
  for (let row = 1; row <= 5; row++) {
    for (let seat = 1; seat <= 8; seat++) {
      const seatNumber = (row - 1) * 8 + seat;
      seatMap[seatNumber] = { row, seat, seatNumber };
    }
  }

  // Get occupied seats in the selected session
  const occupiedSeats = (selectedSession?.occupiedSeats || []).map(({ row, seat }) => {
    const seatNumber = (row - 1) * 8 + seat;
    return { row, seat, seatNumber };
  });

  /*
  * Handle seat selection or deselection.
  * If the seat is already selected — remove it.
  * If not — add it.
  */
  const handleSeatToggle = (seatNumber: number) => {
    const seat = seatMap[seatNumber];
    const isSelected = selectedSeats.some(s => s.seatNumber === seatNumber);
    if (isSelected) {
      setSelectedSeats(selectedSeats.filter(s => s.seatNumber !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  /*
  * Handle adding selected seats to the cart.
  * Checks if a session and seats are selected.
  * If so — clears selection and shows a confirmation.
  */
const handleAddToCart = () => {
  if (!selectedSession) {
    toast({ title: "Please select a session date", variant: "destructive" });
    return;
  }
  if (selectedSeats.length === 0) {
    toast({ title: "No seats selected", variant: "destructive" });
    return;
  }
  toast({ title: "Added to cart", description: `${selectedSeats.length} seat(s) added.` });
  setSelectedSeats([]);
};

  // Main JSX layout with session and seat selection
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left section (session date selection and Add to cart button) */}
      <div>
        <SessionPicker
          sessions={sessions}
          selectedSession={selectedSession}
          onSelect={(session) => {
            setSelectedSession(session);
            setSelectedSeats([]);
          }}
        />
        <div className="mt-8">
          <button
            className="w-full bg-[#2B2625] hover:bg-[#1E1E1E] text-white py-3 rounded-[5px] font-medium transition"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>

      {/* Right section (seat grid display) */}
      <div>
        <h3 className="text-lg font-medium">Pick your seat</h3>
        <p className="text-sm text-gray-400 mb-5">Choose a seat to watch this movie</p>

        <div className="flex flex-col items-center mb-8">
          <SeatGrid
            selectedSeats={selectedSeats}
            occupiedSeats={occupiedSeats}
            onSeatToggle={handleSeatToggle}
          />
        </div>

        {/* Color legend for users */}
        <div className="flex items-center justify-center gap-6 text-xs font-bold">
          <div className="flex items-center"><div className="w-4 h-4 bg-[#2D2D2D] rounded-[5px] mr-2"></div><span>Available</span></div>
          <div className="flex items-center"><div className="w-4 h-4 bg-primary rounded-[5px] mr-2"></div><span>Selected</span></div>
          <div className="flex items-center"><div className="w-4 h-4 bg-gray-700 rounded-[5px] mr-2 opacity-50"></div><span>Occupied</span></div>
        </div>

      </div>
    </div>
  );
};

export default MovieSeats;
