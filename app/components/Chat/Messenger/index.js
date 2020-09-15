import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';
import pluralUserTypeBuilder from '../../../utils/pluralUserTypeBuilder';

export default function Messenger() {
  const [selectedRoomId, setSelectedRoomId] = useState();
  const [messages, setMessages] = useState();
  const [userType, setUserType] = useState();

  const handleClickRoom = useCallback((roomId) => {
    setSelectedRoomId(roomId);
  }, []);

  const getConversations = () => {
    const pluralUserType = pluralUserTypeBuilder(userType);
    axios({
      method: 'POST',
      url: `http://api.keukenvergelijking.nl/${pluralUserType}/messages`,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      data: {
        room_id: selectedRoomId,
      },
    })
      .then((res) => {
        const formattedMessages = res.data.messages.map((message) => ({
          id: message.id,
          message: message.message,
          isRead: message.isRead,
          author: message.sender,
          timestamp: Number(message.date),
          type: message.type,
        }));
        console.log(formattedMessages);
        setMessages(formattedMessages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    setUserType(userInfo.type);
  }, []);

  useEffect(() => {
    if (selectedRoomId) {
      getConversations();
    }
  }, [selectedRoomId]);

  return (
    <div className="messenger">
      <div className="scrollable sidebar">
        <ConversationList handleClickRoom={handleClickRoom} />
      </div>

      <div className="scrollable sidebar">
        {selectedRoomId ? (
          <MessageList
            roomId={selectedRoomId}
            chatMessages={messages}
            setChatMessages={setMessages}
          />
        ) : (
          <h4 className="h4-center">WVælg et værelse ..</h4>
        )}
      </div>
    </div>
  );
}
