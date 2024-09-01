import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import GoogleCalendar from './src/components/GoogleCalendar';

console.log('VITE_GOOGLE_CALENDAR_CLIENT_ID:', import.meta.env.VITE_GOOGLE_CALENDAR_CLIENT_ID);

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CALENDAR_CLIENT_ID || '759499041121-5hgbp778n8q5s7jtk06fhn95ffn7gcrh.apps.googleusercontent.com';

console.log('CLIENT_ID being used:', CLIENT_ID);

const GoogleCalendarWidget = ({ darkMode }) => {
  const [accessToken, setAccessToken] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log('Login Success:', tokenResponse);
      setAccessToken(tokenResponse.access_token);
    },
    onError: (error) => {
      console.error('Login Failed:', error);
    },
    scope: 'https://www.googleapis.com/auth/calendar',
    clientId: CLIENT_ID,
  });

  const handleSignOut = () => {
    setAccessToken(null);
  };

  if (!CLIENT_ID) {
    console.error('Google Calendar Client ID is not set');
    return <div className="text-red-500">Error: Google Calendar Client ID is not configured.</div>;
  }

  return (
    <div className={`relative overflow-hidden rounded-lg opacity-90 transition-transform duration-300 ease-in-out hover:translate-y-[-5px] hover:shadow-lg hover:shadow-black/30 ${darkMode ? 'bg-dark-background text-dark-text' : 'bg-white text-black'}`}>
      <div className="p-6">
        {!accessToken ? (
          <div className="flex justify-center mt-4">
            <button
              className="relative px-6 py-3 bg-secondary text-sky rounded-md cursor-pointer transition-all duration-300 ease-in-out overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#ff00ff] before:via-[#8a2be2] before:to-[#87ceeb] before:opacity-0 hover:before:opacity-100 hover:bg-primary-hover hover:shadow-lg hover:shadow-black/50"
              onClick={() => login()}
            >
              Google Calendar Widget
            </button>
          </div>
        ) : (
          <div className="h-[300px] overflow-hidden">
            <GoogleCalendar accessToken={accessToken} onSignOut={handleSignOut} darkMode={darkMode} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleCalendarWidget;