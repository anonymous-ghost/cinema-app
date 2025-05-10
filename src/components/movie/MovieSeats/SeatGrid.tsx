import SeatButton from "./SeatButton";
import { ExtendedSeat } from "@/types/movie";

interface SeatGridProps {
  selectedSeats: ExtendedSeat[];
  occupiedSeats: ExtendedSeat[];
  onSeatToggle: (seatNumber: number) => void;
}

const SeatGrid = ({ selectedSeats, occupiedSeats, onSeatToggle }: SeatGridProps) => {
  const isSelected = (num: number) => selectedSeats.some(s => s.seatNumber === num);
  const isOccupied = (num: number) => occupiedSeats.some(s => s.seatNumber === num);

  const renderRow = (rowNumber: number) => {
    const start = (rowNumber - 1) * 8 + 1;
    return (
      <div className="flex gap-2 mb-1" key={rowNumber}>
        <span className="w-4 text-xs flex items-center justify-center text-gray-400">{rowNumber}</span>
        {Array.from({ length: 8 }, (_, i) => {
          const seatNumber = start + i;
          return (
            <SeatButton
              key={seatNumber}
              seatNumber={seatNumber}
              isSelected={isSelected(seatNumber)}
              isOccupied={isOccupied(seatNumber)}
              onClick={() => onSeatToggle(seatNumber)}
            />
          );
        })}
        <span className="w-4 text-xs flex items-center justify-center text-gray-400">{rowNumber}</span>
      </div>
    );
  };

  return (
    <>
      <div className="relative w-3/4 mx-auto mb-6">
        <div className="w-full h-5 rounded-t-sm bg-gradient-to-b from-[#9246e4] to-transparent"></div>
        <div className="text-center text-xs text-gray-400 mt-1">Screen</div>
      </div>
      {[1, 2, 3, 4, 5].map(renderRow)}
    </>
  );
};

export default SeatGrid;
