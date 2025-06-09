import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface AuthenticateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
}

const AuthenticateModal: React.FC<AuthenticateModalProps> = ({ 
  isOpen, 
  onClose, 
  onNext 
}) => {
  if (!isOpen) return null;

  return (
    <>
      <Header />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-white/30 backdrop-blur-md"></div>
        <div className="relative bg-white rounded-lg p-8 shadow-xl max-w-md w-full mx-4">
          {/* <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-red-500 hover:text-red-600 text-xl"
          >
            ✕
          </button> */}

          <div className="space-y-6">
            <div className="text-center">
            

              <button 
                onClick={onNext}
                className="w-full bg-[#F94C57] hover:bg-red-600 text-white py-3 px-6 rounded-lg transition-colors font-medium"
              >
                Authentication to start
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuthenticateModal;