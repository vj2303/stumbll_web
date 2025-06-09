import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface EventData {
  title?: string;
  date?: string;
  time?: string;
  location?: string;
}

interface ConfirmTicketsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  eventData?: EventData;
  loading: boolean;
}

const ConfirmTicketsModal: React.FC<ConfirmTicketsModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  eventData,
  loading
}) => {
  if (!isOpen) return null;

  const handleConfirm = async () => {
    // Call the parent's confirm handler which will handle the navigation
    await onConfirm();
  };

  return (
    <>
      <Header />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-white/30 backdrop-blur-md"></div>
        <div className="relative bg-white rounded-lg p-8 shadow-xl max-w-md w-full mx-4">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-red-500 hover:text-red-600 text-xl"
          >
            ✕
          </button>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-black mb-2">Confirm your tickets</h2>
              <p className="text-gray-600 text-sm">
                Please review your event details before confirming your attendance
              </p>
            </div>

            {eventData && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-black mb-2">Event Details</h3>
                {eventData.title && (
                  <p className="text-sm text-gray-700 mb-1">
                    <span className="font-medium">Event:</span> {eventData.title}
                  </p>
                )}
                {eventData.date && (
                  <p className="text-sm text-gray-700 mb-1">
                    <span className="font-medium">Date:</span> {eventData.date}
                  </p>
                )}
                {eventData.time && (
                  <p className="text-sm text-gray-700 mb-1">
                    <span className="font-medium">Time:</span> {eventData.time}
                  </p>
                )}
                {eventData.location && (
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Location:</span> {eventData.location}
                  </p>
                )}
              </div>
            )}

            <button 
              onClick={handleConfirm}
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white py-3 rounded-lg transition-colors font-medium flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Confirming...
                </>
              ) : (
                'Confirm Tickets & Access Event'
              )}
            </button>

            <p className="text-xs text-gray-500 text-center">
              After confirmation, you&apos;ll be redirected to the event page where you can view all details.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ConfirmTicketsModal;