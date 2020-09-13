/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect } from "react";
import shave from "shave";
import "./ConversationListItem.css";

export default function ConversationListItem({ handleClickRoom, data }) {
  const { photo, name, roomId } = data;
  useEffect(() => {
    shave(".conversation-snippet", 20);
  });

  return (
    <div
      className="conversation-list-item"
      onClick={() => handleClickRoom(roomId)}
    >
      <img className="conversation-photo" src={photo} alt="conversation" />
      <div className="conversation-info">
        <h1 className="conversation-title">{name}</h1>
      </div>
    </div>
  );
}
