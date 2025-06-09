import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface AuthenticateModalProps {
  isOpen: boolean;
  onNext: () => void;
  onClose: () => void;
}

const AuthenticateModal: React.FC<AuthenticateModalProps> = ({
  isOpen,
  onNext,
  onClose
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Header with higher z-index to stay above blur */}
      <div className="fixed top-0 left-0 right-0 z-[70] ">
        <Header />
      </div>
      
      {/* Modal with backdrop blur */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-white/30 backdrop-blur-md"></div>
        <div className="relative p-8 max-w-md w-full mx-4">
          <div className="space-y-6">
            <div className="text-center">
              <button
                onClick={onNext}
                className="w-full bg-[#F94C57] hover:bg-[#e03e49] text-white py-4 px-6 rounded-lg transition-colors font-medium"
              >
                Authentication to start
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer with higher z-index to stay above blur - positioned at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-[70] bg-white shadow-sm">
        <Footer />
      </div>
    </>
  );
};

export default AuthenticateModal;