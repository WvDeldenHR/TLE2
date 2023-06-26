export function PopupModal({ isOpen, onClose }) {
    if (!isOpen) return null;
  
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="fixed inset-0 bg-black opacity-80"></div>
        <div className="bg-white rounded-lg p-8 relative text-center">
          <h2 className="text-xs font-semibold mb-4">Uw afspraak is succesvol aangemaakt!</h2>
          <button
            onClick={onClose}
            className="bg-primary hover:bg-primary text-white font-semibold py-2 px-4 rounded-md text-xs"
          >
            Alle afspraken bekijken
          </button>
        </div>
      </div>
      
    );
  }
  