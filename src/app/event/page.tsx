'use client'
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { MapPin } from 'lucide-react';
import Image from 'next/image';

const EventPage = () => {
  const { authToken } = useAuth();
  const router = useRouter();

  // Mock event data - in a real app, you would fetch this using the authToken
  const eventData = {
    title: "Test Test",
    date: "Thursday 20 March",
    time: "16:00 - 17:00 GMT+5:30",
    location: "17th Main, HSR",
    description: "Join the blazing event for an electrifying experience",
    status: "Ended",
    isPrivate: true,
    isLive: true,
    host: {
      name: "Marc Cuban",
      avatar: "/api/placeholder/40/40"
    },
    attendees: [
      { name: "Akhil", avatar: "/banner.png" },
      { name: "Sachin", avatar: "/banner.png" },
      { name: "+12 more...", avatar:"/banner.png" }
    ],
    gallery: [
      { image: "/banner.png", timeAgo: "2h ago" },
      { image: "/banner.png", timeAgo: "2h ago" },
      { image: "/banner.png", timeAgo: "2h ago" }
    ]
  };

  // Protect the route
  React.useEffect(() => {
    if (!authToken) {
      router.push('/');
    }
  }, [authToken, router]);

  if (!authToken) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header/>
        <div className="flex-1">
            {/* Navigation Bar */}
    
            <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
        
                <div className="space-y-6">
                {/* Main Event Card */}
                <div className="bg-white rounded-2xl  overflow-hidden">
                
                <div className="relative">                   
    <div className="aspect-video overflow-hidden relative">                                                                            
        <Image                        
        src="/banner.png"                       
        alt="Event Banner"                       
        className="w-full h-full"
        width={800}
        height={450}
        priority
        />                    
    </div>                                      

    {/* Status Badge - positioned slightly below the top of the banner */}                   
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2">                     
        <div className="text-center">                       
        <span className="inline-flex items-center px-[50px] py-[5px] rounded-full text-[10.16px] font-semibold bg-red-500 text-white shadow-lg">                         
            {eventData.status}                       
        </span>                     
        </div>                   
    </div>                    

    {/* Attendees section - positioned to slightly overlap the bottom of the banner */}
    <div className="absolute left-1/2 transform -translate-x-1/2" style={{top: 'calc(100% - 20px)'}}>                     
        <div className="bg-white/90 backdrop-blur-sm rounded-md px-4 py-2 shadow-lg border border-white/20">                       
        <div className="flex items-center space-x-2">                         
            <div className="flex -space-x-2">                           
            {eventData.attendees.slice(0, 3).map((attendee, index) => (                             
                <div key={index} className="flex items-center">                               
                {attendee.avatar ? (                                 
                    <Image                                    
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm"                                   
                    src={attendee.avatar}                                   
                    alt={attendee.name}
                    width={32}
                    height={32}                                 
                    />                               
                ) : (                                 
                    <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center shadow-sm">                                   
                    <span className="text-xs text-gray-600">+</span>                                 
                    </div>                               
                )}                             
                </div>                           
            ))}                         
            </div>                         
            <span className="text-sm text-red-500 font-medium">                           
            Akhil, Sachin, +12 more...                         
            </span>                       
        </div>                     
        </div>                   
    </div>                 
    </div>


                    {/* Host Info */}
                    <div className="px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                        <h3 className="font-semibold text-gray-900">Hosted By</h3>
                        <div className="flex items-center mt-2">
                            <Image 
                            className="w-10 h-10 rounded-full"
                            src={'/banner.png'}
                            alt={eventData.host.name}
                            width={40}
                            height={40}
                            />
                            <div className="ml-3">
                            <p className="font-medium text-gray-900">{eventData.host.name}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                    
                    <div className="">
                        <button className="text-[#120D2680] hover:text-blue-800 text-sm">
                        Contact the Host
                        </button>
                        <br/>
                        <button className="text-[#120D2680] hover:text-red-800 text-sm">
                        Report Event
                        </button>
                    </div>
                    </div>

                 
                    <div className="px-6 py-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Gallery</h3>
                    <div className="grid grid-cols-3 gap-3">
                        {eventData.gallery.map((item, index) => (
                        <div key={index} className="relative">
                            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                            <Image 
                                src={item.image}
                                alt={`Gallery ${index + 1}`}
                                className="w-full h-full object-cover"
                                width={200}
                                height={200}
                            />
                            </div>
                            <span className="absolute bottom-2 left-2 text-xs text-white bg-black bg-opacity-60 px-2 py-1 rounded">
                            {item.timeAgo}
                            </span>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>




                
                </div>

                {/* Right Column - Event Details */}
                <div className="space-y-6">
                {/* Private Event Badge */}
                {eventData.isPrivate && (
                    <div className="flex items-center text-red-600">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-sm font-medium">Private Event</span>
                    </div>
                )}

                {/* Event Title */}
                <h1 className="text-4xl font-bold text-gray-900">{eventData.title}</h1>

                {/* Date and Time */}
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    </div>
                    <div>
                    <p className="font-medium text-[14px] text-[#120D26]">{eventData.date}</p>
                    <p className="text-gray-600">{eventData.time}</p>
                    </div>
                </div>

                {/* Location */}
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                    <MapPin color='#F94C57' />
                    </div>
                    <div>
                    <p className="font-medium text-[14px] text-[#120D26]">{eventData.location}</p>
                    </div>
                </div>

                {/* QR Code */}
                <div className="">
                    <div className="flex items-center space-x-3">
                    <Image 
                        src="/qrr.png" 
                        alt="QR Code" 
                        className="w-12 h-12 bg-[#F94C57] p-1 rounded-lg"
                        width={48}
                        height={48}
                    />
                    <p className="text-[14px] font-medium text-[#120D26]">Tap to view ticket</p>
                    </div>
                </div>

                {/* Event Description */}
                <div className="shadow-lg border rounded-lg overflow-hidden">
        <h2 className="text-[14px] text-white font-semibold bg-[#F94C57] px-6 py-3 mb-0">Event Description</h2>
        <div className="p-6 pt-3">
            <p className="mb-4 font-semibold text-[#120D26] text-[15px]">{eventData.description}</p>
            {eventData.isLive && (
            <p className="text-[13px] text-[#120D26C9]">This event is currently live.</p>
            )}
            
            <div className="mt-6">
            <p className="text-[14px] text-[#120D26] font-semibold mb-3">Download the app for an seamless experience</p>
            <button className="w-full bg-[#F94C57] hover:bg-[#e03e49] text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
                <span>Download the app</span>
            </button>
            </div>
        </div>
        </div>

                </div>
            </div>
            </div>
        </div>
      <Footer/>
    </div>
  );
};

export default EventPage;