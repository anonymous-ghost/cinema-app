interface TabButtonProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
  }
  
  const TabButton = ({ label, isActive, onClick }: TabButtonProps) => (
    <button
      className={`py-3 px-6 border-b-2 font-medium mr-4 transition-all duration-300 ${
        isActive
          ? "border-red text-red"
          : "border-transparent text-gray-400 hover:text-red"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
  
  export default TabButton;
  