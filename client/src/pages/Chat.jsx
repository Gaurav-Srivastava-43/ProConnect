import React, { useState } from 'react';
import '../styles/Chat.css';
import Navbar from '../components/Navbar';
import Sidebar from '../components/chat/Sidebar';
import UserChat from '../components/chat/UserChat';

const Chat = () => {
  const [mobileChatOpen, setMobileChatOpen] = useState(false);

  return (
    <div className='chatPage'>
      <Navbar />

      <div className={`home ${mobileChatOpen ? 'mobile-chat-open' : ''}`}>
        <Sidebar onSelectChat={() => setMobileChatOpen(true)} />
        <UserChat onBack={() => setMobileChatOpen(false)} />
      </div>
    </div>
  );
};

export default Chat;