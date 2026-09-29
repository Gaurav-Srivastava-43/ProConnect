import React, { useContext } from 'react';
import Input from './Input';
import Messages from './Messages';
import { GeneralContext } from '../../context/GeneralContextProvider';
import { IoArrowBack } from 'react-icons/io5';

const UserChat = ({ onBack }) => {
  const { chatData } = useContext(GeneralContext);

  return (
    <div className='chat'>
      {chatData.user && chatData.user.username && (
        <div className="chatInfo">

          <button
            className="mobileBackBtn"
            onClick={onBack}
            type="button"
          >
            <IoArrowBack />
          </button>

          <img src={chatData.user.profilePic} alt="" />
          <span>{chatData.user.username}</span>

        </div>
      )}

      <Messages />
      <Input />
    </div>
  );
};

export default UserChat;