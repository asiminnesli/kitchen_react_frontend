import React, { useCallback } from 'react';
import moment from 'moment';
import './Message.css';
import PropTypes from 'prop-types';
import CheckIcon from '@material-ui/icons/Check';
import GetAppIcon from '@material-ui/icons/GetApp';
import axios from 'axios';

export default function Message({
  data,
  isMine,
  startsSequence,
  endsSequence,
  showTimestamp,
}) {
  const handleDownloadFile = useCallback(() => {
    axios({
      method: 'POST',
      url: 'http://api.keukenvergelijking.nl/download',
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      data: {
        file: 'messagesFiles/' + data.message,
      },
    })
      .then((res) => {
        const url = window.URL.createObjectURL(
          new Blob([res.data], {
            type: 'image/pdf',
          })
        );

        const link = document.createElement('a');
        link.href = url;

        link.setAttribute('download', data.message);

        link.click();
      })
      .catch((error) => {
        alert('Noget skete dårligt!');
        console.error(error);
      });
  }, [data]);

  const friendlyTimestamp = moment(data.timestamp).format('LLLL');
  return (
    <div
      className={[
        'message',
        `${isMine ? 'mine' : ''}`,
        `${startsSequence ? 'start' : ''}`,
        `${endsSequence ? 'end' : ''}`,
      ].join(' ')}
    >
      {showTimestamp && <div className="timestamp">{friendlyTimestamp}</div>}

      {data.type === 'text' ? (
        <div className="bubble-container">
          <div className="bubble" title={friendlyTimestamp}>
            {data.message}
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CheckIcon style={{ color: `${data.isRead ? 'green' : 'red'}` }} />
          </div>
        </div>
      ) : (
        <div onClick={handleDownloadFile}>
          Klik om het bestand te downloaden
          {' '}
          <GetAppIcon />
        </div>
      )}
    </div>
  );
}
Message.propTypes = {
  data: PropTypes.node.isRequired,
  isMine: PropTypes.node.isRequired,
  startsSequence: PropTypes.node.isRequired,
  endsSequence: PropTypes.node.isRequired,
  showTimestamp: PropTypes.node.isRequired,
};
