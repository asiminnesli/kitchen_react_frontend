import React from 'react';
import moment from 'moment';
import './Message.css';
import PropTypes from 'prop-types';

export default function Message({
  data,
  isMine,
  startsSequence,
  endsSequence,
  showTimestamp,
}) {
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

      <div className="bubble-container">
        <div className="bubble" title={friendlyTimestamp}>
          {data.message}
        </div>
      </div>
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
