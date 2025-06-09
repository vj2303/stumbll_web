import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OTPInput from '@/components/OTPInput';

interface AuthenticationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendOtp: (identifier: string, identifierType: string) => Promise<boolean>;
  onVerifyOtp: (identifier: string, identifierType: string, otp: string) => Promise<void>;
  loading: boolean;
}

const AuthenticationFormModal: React.FC<AuthenticationFormModalProps> = ({ 
  isOpen, 
  onClose,
  onSendOtp,
  onVerifyOtp,
  loading
}) => {
  // State for form inputs
  const [identifier, setIdentifier] = useState('');
  const [identifierType, setIdentifierType] = useState('email');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showOtpField, setShowOtpField] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleIdentifierChange = (value: string) => {
    setIdentifier(value);
    // Auto-detect if it's email or phone
    const isEmail = value.includes('@');
    setIdentifierType(isEmail ? 'email' : 'phone');
    // Clear previous errors
    setError('');
    setSuccess('');
  };

  const handleSendOtp = async () => {
    setError('');
    setSuccess('');

    if (!identifier.trim()) {
      setError('Please enter your email or phone number');
      return;
    }

    if (identifierType === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(identifier)) {
        setError('Please enter a valid email address');
        return;
      }
    }

    if (identifierType === 'phone') {
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(identifier.replace(/[\s\-\(\)]/g, ''))) {
        setError('Please enter a valid phone number');
        return;
      }
    }

    try {
      await onSendOtp(identifier, identifierType);
      setSuccess(`OTP sent successfully to your ${identifierType}`);
      setShowOtpField(true);
    } catch {
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    setError('');
    setSuccess('');

    const otpString = otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    if (!/^\d{6}$/.test(otpString)) {
      setError('OTP should contain only numbers');
      return;
    }

    try {
      await onVerifyOtp(identifier, identifierType, otpString);
      setSuccess('OTP verified successfully!');
      // The parent component will handle moving to next step
    } catch (err) {
      console.error('OTP verification failed:', err);
      setError('Invalid OTP. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    try {
      await onSendOtp(identifier, identifierType);
      setError('');
      setSuccess('OTP resent successfully!');
    } catch {
      setError('Failed to resend OTP. Please try again.');
    }
  };

  const resetForm = () => {
    setShowOtpField(false);
    setOtp(['', '', '', '', '', '']);
    setError('');
    setSuccess('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <>
      <Header />
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-white/30 backdrop-blur-md"></div>
        <div className="relative bg-white rounded-lg p-8 shadow-xl max-w-md w-full mx-4">
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 text-red-500 hover:text-red-600 text-xl"
          >
            ✕
          </button>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-black mb-2">Authenticate to view event</h2>
              <p className="text-gray-600 text-sm">
                Enter your email or phone number on which you have received the invite to authenticate
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
                {success}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-black mb-2">Phone number or Email</label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => handleIdentifierChange(e.target.value)}
                disabled={showOtpField || loading}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 placeholder-gray-400 text-black disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Enter email or phone number"
              />
          
            </div>

            {showOtpField && (
              <div>
                <label className="block text-sm font-medium text-black mb-2">OTP</label>
                <OTPInput otp={otp} setOtp={setOtp} />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs text-gray-500">
                    Enter the 6-digit code sent to your {identifierType}
                  </p>
                  <button
                    onClick={handleResendOtp}
                    disabled={loading}
                    className="text-xs text-red-500 hover:text-red-600 underline disabled:opacity-50"
                  >
                    {loading ? 'Sending...' : 'Resend OTP'}
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-start space-x-2">
              <input type="checkbox" id="terms" className="mt-1" />
              <label htmlFor="terms" className="text-sm text-gray-600">
                By authenticating, you agree to the{' '}
                <span className="text-red-500 underline cursor-pointer">Terms of Service</span> and{' '}
                <span className="text-red-500 underline cursor-pointer">Privacy Policy</span>
              </label>
            </div>

            {!showOtpField ? (
              <button 
                onClick={handleSendOtp}
                disabled={!identifier.trim() || loading}
                className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white py-3 rounded-lg transition-colors"
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            ) : (
              <div className="space-y-3">
                <button 
                  onClick={handleVerifyOtp}
                  disabled={otp.join('').length < 6 || loading}
                  className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white py-3 rounded-lg transition-colors"
                >
                  {loading ? 'Verifying...' : 'Verify & Continue'}
                </button>
        
              </div>
            )}

            <div className="text-center">
              <span className="text-gray-600 text-sm">Don&apos;t have an account? </span>
              <span className="text-red-500 text-sm cursor-pointer hover:underline">Sign Up</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuthenticationFormModal;