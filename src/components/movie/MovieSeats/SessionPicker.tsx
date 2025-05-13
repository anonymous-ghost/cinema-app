import { motion } from "framer-motion";
import { Session } from "@/types/movie";

interface SessionPickerProps {
  sessions: Session[];
  selectedSession: Session | null;
  onSelect: (session: Session) => void;
}

const SessionPicker = ({ sessions, selectedSession, onSelect }: SessionPickerProps) => (
  <div>
    <h3 className="text-lg font-medium">Choose your date</h3>
    <p className="text-sm text-gray-400 mb-5">Choose a date to watch this movie</p>
    <div className="grid grid-cols-2 gap-3">
      {sessions.map(session => (
        <motion.button
          key={session.id}
          className={`text-sm py-2 rounded-[5px] transition ${
            selectedSession?.id === session.id
              ? "bg-primary text-white"
              : "bg-[#2D2D2D] hover:bg-[#1E1E1E] text-gray-300"
          }`}
          onClick={() => onSelect(session)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {session.date} {session.time}
        </motion.button>
      ))}
    </div>
  </div>
);

export default SessionPicker;
