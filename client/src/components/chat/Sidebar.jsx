import React from 'react';
import Search from './Search';
import Chats from './Chats';

const Sidebar = ({ onSelectChat }) => {
  return (
    <div className='sidebar'>
      <Search onSelectChat={onSelectChat} />
      <Chats onSelectChat={onSelectChat} />
    </div>
  );
};

export default Sidebar;