import React, {
  useCallback, useState, useRef, useEffect
} from 'react';
import './Compose.css';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import IconButton from '@material-ui/core/IconButton';
import pluralUserTypeBuilder from '../../../utils/pluralUserTypeBuilder';

export default function Compose({ roomId, chatMessages, setChatMessages }) {
  const [message, setMessage] = useState();
  const inputRef = useRef();
  const [userType, setUserType] = useState();

  const handleSendMessage = useCallback(() => {
    if (message && userType !== 'admin') {
      const pluralUserType = pluralUserTypeBuilder(userType);
      axios({
        method: 'POST',
        url: `http://portal.keukenvergelijking.nl/api/${pluralUserType}/sendMessage`,
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        data: {
          room_id: roomId,
          message,
        },
      })
        .then((res) => {
          console.log(res.data.success);
          if (res.data.success) {
            setChatMessages([
              ...chatMessages,
              {
                message,
                author: 'me',
                date: new Date().getTime(),
                isRead: false,
                type: 'text',
              },
            ]);
            inputRef.current.value = '';
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [roomId, message, inputRef]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user'));
    setUserType(userInfo.type);
    console.log(userInfo);
  }, []);

  const handleFileUpload = useCallback(
    (event) => {
      const selectedFile = event.target.files[0];
      // Create an object of formData
      const formData = new FormData();

      // Update the formData object
      formData.append('file', selectedFile, selectedFile.name);
      formData.append('room_id', roomId);

      // Request made to the backend api
      // Send formData object
      const pluralUserType = pluralUserTypeBuilder(userType);
      axios({
        method: 'POST',
        url: `http://portal.keukenvergelijking.nl/api/${pluralUserType}/sendFileViaMessage`,
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        data: formData,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [userType]
  );

  return (
    <div className="compose">
      <input
        disabled={userType === 'admin'}
        ref={inputRef}
        type="text"
        className="compose-input"
        placeholder="Type a message, @name"
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage();
          }
        }}
      />

      <Button
        disabled={userType === 'admin'}
        size="small"
        variant="outlined"
        color="secondary"
        onClick={handleSendMessage}
      >
        Send
      </Button>

      <label htmlFor="icon-button-file">
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <AttachFileIcon />
        </IconButton>
        <input
          id="icon-button-file"
          style={{ display: 'none' }}
          type="file"
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
}
Compose.propTypes = {
  rightItems: PropTypes.node.isRequired,
};
