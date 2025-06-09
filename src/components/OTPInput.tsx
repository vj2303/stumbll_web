import React from 'react';

interface OTPInputProps {
  otp: string[];
  setOtp: (otp: string[]) => void;
  length?: number;
}

const OTPInput: React.FC<OTPInputProps> = ({ otp, setOtp, length = 6 }) => {
  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < length - 1) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    // Handle backspace to move to previous input
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text');
    const pasteArray = paste.split('').slice(0, length);
    
    if (pasteArray.every(char => /^[0-9]$/.test(char))) {
      const newOtp = [...otp];
      pasteArray.forEach((char, index) => {
        if (index < length) newOtp[index] = char;
      });
      setOtp(newOtp);
    }
  };

  return (
    <div className="flex space-x-2">
      {otp.map((digit, index) => (
        <input
          key={index}
          id={`otp-${index}`}
          type="text"
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-black placeholder-gray-400"
          maxLength={1}
        />
      ))}
    </div>
  );
};

export default OTPInput;
