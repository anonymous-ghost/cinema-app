import React from "react";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  title?: string;
}

export const Dialog: React.FC<DialogProps> = ({ 
  open, 
  onOpenChange, 
  children,
  title
}) => {
  if (!open) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-content">
        <div className="dialog-header">
          {title && <h2 className="dialog-title">{title}</h2>}
          <button
            className="dialog-close"
            onClick={() => onOpenChange(false)}
          >
            &times;
          </button>
        </div>
        <div className="dialog-body">
          {children}
        </div>
      </div>
    </div>
  );
};

// Add animation to CSS (can be placed in index.css)
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out;
  }
`;
document.head.appendChild(style); 