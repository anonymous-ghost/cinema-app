import React from 'react';
import '../styles/SeatSelector.css';

interface SeatSelectorProps {
  onClose: () => void;
  onConfirm: (selectedSeats: number[]) => void;
}

const SeatSelector: React.FC<SeatSelectorProps> = ({ onClose, onConfirm }) => {
  const [selectedSeats, setSelectedSeats] = React.useState<number[]>([]);

  const handleSeatClick = (row: number, seat: number) => {
    const seatNumber = row * 8 + seat;
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleConfirm = () => {
    onConfirm(selectedSeats);
    onClose();
  };

  return (
    <div className="seat-selector-overlay">
      <div className="seat-selector-modal">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <h2>Select Seat</h2>
        <div className="screen">Screen</div>
        <div className="seats-container">
          {Array.from({ length: 5 }, (_, row) => (
            <div key={row} className="seat-row">
              <span className="row-number">{row + 1}</span>
              {Array.from({ length: 8 }, (_, seat) => {
                const seatNumber = row * 8 + seat;
                const isSelected = selectedSeats.includes(seatNumber);
                const isOccupied = Math.random() < 0.3; // Random occupied seats for demo

                return (
                  <button
                    key={seat}
                    className={`seat ${isSelected ? 'selected' : ''} ${isOccupied ? 'occupied' : ''}`}
                    onClick={() => !isOccupied && handleSeatClick(row, seat)}
                    disabled={isOccupied}
                  >
                    {seat + 1}
                  </button>
                );
              })}
              <span className="row-number">{row + 1}</span>
            </div>
          ))}
        </div>
        <div className="legend">
          <div className="legend-item">
            <div className="seat-example available"></div>
            <span>Available</span>
          </div>
          <div className="legend-item">
            <div className="seat-example selected"></div>
            <span>Selected</span>
          </div>
          <div className="legend-item">
            <div className="seat-example occupied"></div>
            <span>Occupied</span>
          </div>
        </div>
        <button 
          className="confirm-button" 
          onClick={handleConfirm}
          disabled={selectedSeats.length === 0}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default SeatSelector;