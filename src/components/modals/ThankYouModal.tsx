import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface GuestData {
  id?: number;
  fullName?: string;
  email?: string | null;
  phoneNumber?: string | null;
  age?: number;
  status?: string;
}

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  guestData?: GuestData;
  onUpdateGuest: (name: string, age: string) => Promise<void>;
  loading: boolean;
}

const ThankYouModal: React.FC<ThankYouModalProps> = ({ 
  isOpen, 
  onClose, 
  guestData,
  onUpdateGuest,
  loading
}) => {
  const [name, setName] = useState(guestData?.fullName || '');
  const [age, setAge] = useState(guestData?.age?.toString() || '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (guestData) {
      setName(guestData.fullName || '');
      setAge(guestData.age?.toString() || '');
    }
  }, [guestData]);

  if (!isOpen) return null;

  const validateForm = () => {
    if (!name.trim()) {
      setError('Please enter your name');
      return false;
    }
    if (!age || isNaN(Number(age)) || Number(age) < 13 || Number(age) > 120) {
      setError('Please enter a valid age between 13 and 120');
      return false;
    }
    setError('');
    return true;
  };

  const handleContinue = async () => {
    if (!validateForm()) return;
    
    try {
      await onUpdateGuest(name, age);
      // The parent component will handle moving to next step
    } catch {
      setError('Failed to update information. Please try again.');
    }
  };

  return (
    <>
      {/* Header with higher z-index to stay above blur */}
      <div className="fixed top-0 left-0 right-0 z-[70]">
        <Header />
      </div>
      
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
              <h2 className="text-2xl font-bold text-black mb-2">Thank you for authenticating!</h2>
              <p className="text-gray-600 text-sm">
                We see you accepted the invite, we have some registration questions before we move forward.
              </p>
            </div>

            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md border border-red-200">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-black mb-2">Full Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                disabled={loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-black placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-2">Age *</label>
              <input
                type="number"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                  setError('');
                }}
                disabled={loading}
                min="13"
                max="120"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-black placeholder-gray-400 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Enter your age"
              />
              {/* <p className="text-xs text-gray-500 mt-1">Must be between 13 and 120 years old</p> */}
            </div>

           

            <button 
              onClick={handleContinue}
              disabled={!name.trim() || !age || loading}
              className="w-full bg-[#F94C57]   text-white py-3 rounded-lg transition-colors font-medium"
            >
              {loading ? 'Saving...' : 'Continue to Ticket Confirmation'}
            </button>
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

export default ThankYouModal;