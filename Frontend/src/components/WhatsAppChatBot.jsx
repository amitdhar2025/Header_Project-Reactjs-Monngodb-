import React, { useState, useRef, useEffect } from 'react';

const WhatsAppChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('fresh new query');
  const containerRef = useRef(null);

  const phoneNumber = 'YOUR_PHONE_NUMBER'; // Replace with your WhatsApp number with country code, e.g. '1234567890'

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const encodedMessage = encodeURIComponent(message);
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  // Close chat if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} style={{ position: 'fixed', bottom: '10px', right: '10px', zIndex: 1000 }}>
      <button
        onClick={toggleChat}
        style={{
          backgroundColor: '#25D366',
          color: 'white',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
        }}
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="24px" height="24px">
          <path d="M20.52 3.48A11.88 11.88 0 0012 0C5.37 0 0 5.37 0 12a11.9 11.9 0 001.64 6.01L0 24l6.15-1.6A11.94 11.94 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.2-3.48-8.52zm-8.52 17.1a8.1 8.1 0 01-4.3-1.25l-.31-.19-3.65.95.98-3.56-.2-.33a8.1 8.1 0 1111.5 11.5 8.07 8.07 0 01-3.32-.62zM17.1 14.4c-.25-.12-1.48-.73-1.7-.81-.22-.08-.38-.12-.54.12s-.62.81-.76.98c-.14.17-.28.19-.53.06a6.3 6.3 0 01-1.85-1.14 7.04 7.04 0 01-1.3-1.6c-.14-.24 0-.37.1-.49.1-.1.22-.28.33-.42.11-.14.15-.24.22-.4.07-.16.03-.3-.02-.42-.05-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.4-.14 0-.3-.02-.46-.02s-.42.06-.64.3a2.7 2.7 0 00-.9.88 3.8 3.8 0 00-1.1 2.1c0 1.24.9 2.44 1.03 2.6.12.17 1.78 2.7 4.3 3.78a7.5 7.5 0 001.7.7 3.3 3.3 0 001.5.12 2.9 2.9 0 001.7-1.1c.53-.6.37-1.18.26-1.3-.1-.12-.37-.19-.62-.31z"/>
        </svg>
      </button>
      {isOpen && (
        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: '10px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            padding: '10px',
            width: '250px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="resize-none p-2 text-base rounded border border-gray-300 mb-2 font-sans dark:bg-gray-700 dark:text-white"
          />
          <button
            type="submit"
            className="bg-green-500 text-white rounded px-3 py-2 cursor-pointer font-bold dark:bg-green-600"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default WhatsAppChatBot;
