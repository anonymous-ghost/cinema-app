import { Session, Seat } from "@/types/movie";
import { useMemo } from "react";

// Props expected by the component
interface SeatSelectorProps {
  selectedSession: Session | null;
  selectedSeats: Seat[];
  onSeatToggle: (seat: Seat) => void;
}

const SeatSelector = ({ selectedSession, selectedSeats, onSeatToggle }: SeatSelectorProps) => {
  const rows = 4; // Number of rows
  const seatsPerRow = 9; // Number of seats per row

  // Check if the seat is selected
  const isSeatSelected = (row: number, seat: number): boolean => {
    return selectedSeats.some(s => s.row === row && s.seat === seat);
  };

  // Check if the seat is occupied (based on session data)
  const isSeatOccupied = (row: number, seat: number): boolean => {
    if (!selectedSession) return false;
    return selectedSession.occupiedSeats.some(s => s.row === row && s.seat === seat);
  };

  // Return the CSS class for the seat depending on its status
  const getSeatClass = useMemo(() => (row: number, seat: number): string => {
    if (isSeatOccupied(row, seat)) return "seat-occupied";
    if (isSeatSelected(row, seat)) return "seat-selected";
    return "seat-available";
  }, [selectedSeats, selectedSession]);

  return (
    <div>
      {/* Heading */}
      <h3 className="text-lg font-medium mb-3">Pick your seat</h3>
      <p className="text-sm text-gray-400 mb-4">Choose a seat to watch this movie</p>
      
      {/* Screen */}
      <div className="relative mb-6">
        <div className="w-full h-2 bg-primary rounded-full cinema-screen"></div>
        <div className="text-center mt-2 text-xs text-gray-400">Screen</div>
      </div>
      
      {/* Generate seats in the hall */}
      <div className="cinema-hall space-y-2">
        {/* Iterate over each row */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div className="flex justify-center space-x-2" key={`row-${rowIndex + 1}`}>
            <div className="w-5 text-xs flex items-center justify-center text-gray-400">
              {rowIndex + 1}
            </div>
            
            {/* Iterate over seats in the row */}
            {Array.from({ length: seatsPerRow }).map((_, seatIndex) => {
              const row = rowIndex + 1;
              const seat = seatIndex + 1;
              const isOccupied = isSeatOccupied(row, seat);
              
              return (
                <button
                  key={`seat-${row}-${seat}`}
                  className={getSeatClass(row, seat)}
                  onClick={() => !isOccupied && onSeatToggle({ row, seat })}
                  disabled={isOccupied || !selectedSession}
                  title={isOccupied ? "Seat is occupied" : "Click to select"}
                >
                  {seat}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex justify-center mt-8 space-x-6 text-xs">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-[#2D2D2D] rounded-sm mr-2"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-primary rounded-sm mr-2"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-700 rounded-sm mr-2 opacity-50"></div>
          <span>Occupied</span>
        </div>
      </div>
    </div>
  );
};

export default SeatSelector;