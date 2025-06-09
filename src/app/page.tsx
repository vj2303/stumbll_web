'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthenticateModal from '@/components/modals/AuthenticateModal';
import AuthenticationFormModal from '@/components/modals/AuthenticationFormModal';
import ThankYouModal from '@/components/modals/ThankYouModal';
import ConfirmTicketsModal from '@/components/modals/ConfirmTicketsModal';
import { useAuth } from '@/context/AuthContext';

interface Location {
  name: string;
  address: string;
}

interface Host {
  fullName: string;
  username: string;
  profilePictureUrl: string | null;
}

interface Event {
  id: number;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  status: string;
  coverPhotoUrl: string;
  location: Location;
  host: Host;
}

interface GuestData {
  id?: number;
  fullName?: string;
  email?: string | null;
  phoneNumber?: string | null;
  age?: number;
  status?: string;
}

const Page = () => {
  const router = useRouter();
  const { authToken, setAuthToken } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [guestData, setGuestData] = useState<GuestData | null>(null);

  // Mock event data
  const mockEventData = {
    id: 1,
    name: "Sample Event",
    description: "A great event",
    startTime: "2024-03-20T18:00:00Z",
    endTime: "2024-03-20T22:00:00Z",
    status: "active",
    coverPhotoUrl: "",
    location: {
      name: "Event Venue",
      address: "123 Main St"
    },
    host: {
      fullName: "John Doe",
      username: "johndoe",
      profilePictureUrl: null
    }
  };

  const handleSendOtp = async (identifier: string, identifierType: string) => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (identifier: string, identifierType: string, otp: string) => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful verification
      const mockGuestData = {
        id: 1,
        email: identifier,
        status: 'verified'
      };
      
      setAuthToken('mock-token');
      setGuestData(mockGuestData);
      setCurrentStep(3);
      
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateGuest = async (name: string, age: string) => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedGuestData = {
        ...guestData,
        fullName: name,
        age: parseInt(age)
      };
      
      setGuestData(updatedGuestData);
      setCurrentStep(4); // Move to confirmation step instead of directly to event
    } catch (error) {
      console.error('Error updating guest:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmTickets = async () => {
    try {
      setLoading(true);
      // Simulate API delay for ticket confirmation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // After successful confirmation, navigate to event page
      router.push('/event');
    } catch (error) {
      console.error('Error confirming tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleClose = () => {
    setCurrentStep(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <>
      <AuthenticateModal
        isOpen={currentStep === 1}
        onClose={handleClose}
        onNext={handleNext}
      />

      <AuthenticationFormModal
        isOpen={currentStep === 2}
        onClose={handleClose}
        onNext={handleNext}
        onSendOtp={handleSendOtp}
        onVerifyOtp={handleVerifyOtp}
        loading={loading}
      />

      <ThankYouModal
        isOpen={currentStep === 3}
        onClose={handleClose}
        onNext={handleNext}
        guestData={guestData || undefined}
        onUpdateGuest={handleUpdateGuest}
        loading={loading}
      />

      <ConfirmTicketsModal
        isOpen={currentStep === 4}
        onClose={handleClose}
        onConfirm={handleConfirmTickets}
        eventData={{
          title: mockEventData.name,
          date: formatDate(mockEventData.startTime),
          time: formatTime(mockEventData.startTime),
          location: mockEventData.location.name
        }}
        loading={loading}
      />
    </>
  );
};

export default Page;