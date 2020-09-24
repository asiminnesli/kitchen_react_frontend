import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import Toolbar from '../Toolbar';
import ToolbarButton from '../ToolbarButton';
import config from '../../../actions/config';
import './ConversationList.css';
import pluralUserTypeBuilder from '../../../utils/pluralUserTypeBuilder';

export default function ConversationList({ handleClickRoom }) {
  const [conversations, setConversations] = useState([]);
  const [userType, setUserType] = useState();

  const getConversations = () => {
    const pluralUserType = pluralUserTypeBuilder(userType);
    const placeholderImagePath = '/images/avatars/pp_boy.svg';
    axios({
      method: 'POST',
      url: `${config.fetchLinkUrl}${pluralUserType}/getRooms`,
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    })
      .then((res) => {
        const newConversations = res.data.map((result) => ({
          photo: result.fetchLinkUrl
            ? `${config.fetchLinkUrl}${result.fetchLinkUrl}`
            : placeholderImagePath,
          roomId: result.id,
          name: result.nameAndSurname,
        }));
        setConversations(newConversations);
      })
      .catch((error) => {
        console.log(error.response.data);
        return error;
      });
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    setUserType(userInfo.type);
  }, []);

  useEffect(() => {
    if (userType) {
      getConversations();
    }
  }, [userType]);
  return (
    <div className="conversation-list">
      <Toolbar
        title=""
        leftItems={[<ToolbarButton key="cog" icon="ion-ios-cog" />]}
        rightItems={[
          <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />,
        ]}
      />
      {conversations.map((conversation) => (
        <ConversationListItem
          handleClickRoom={handleClickRoom}
          key={conversation.name}
          data={conversation}
        />
      ))}
    </div>
  );
}
