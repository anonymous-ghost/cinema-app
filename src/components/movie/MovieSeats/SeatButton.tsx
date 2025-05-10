import { motion } from "framer-motion";

interface SeatButtonProps {
  seatNumber: number;
  isSelected: boolean;
  isOccupied: boolean;
  onClick: () => void;
}

const SeatButton = ({ seatNumber, isSelected, isOccupied, onClick }: SeatButtonProps) => (
  <motion.button
    key={`seat-${seatNumber}`}
    className={`w-6 h-6 text-xs flex items-center justify-center rounded-[3px]
      ${isOccupied ? 'bg-[#3F3F3F] cursor-not-allowed' :
        isSelected ? 'bg-primary cursor-pointer' : 'bg-[#212121] cursor-pointer'
      }`}
    onClick={onClick}
    disabled={isOccupied}
    whileHover={!isOccupied ? { scale: 1.1 } : {}}
    whileTap={!isOccupied ? { scale: 0.95 } : {}}
    transition={{ duration: 0.1 }}
  >
    {seatNumber}
  </motion.button>
);

export default SeatButton;
