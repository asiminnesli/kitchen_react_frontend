import React from 'react';

import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import Messenger from '../../../components/Chat/Messenger';
// import {
//   fetchChatAction,
//   showChatAction,
//   sendAction,
//   hideDetailAction,
//   deleteAction,
// } from "dan-actions/ChatActions";
// import styles from "dan-components/Contact/contact-jss";

class Chat extends React.Component {
  // componentDidMount() {
  //   const { fetchChatData, fetchContactData } = this.props;
  //   fetchChatData(chatData);
  //   fetchContactData(contactData);
  // }

  render() {
    const title = brand.name + ' - Chat App';
    const description = brand.desc;

    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>

        {/* <StreamApiChat /> */}
        <div>
          <Messenger />
        </div>
        {/* </div> */}
      </div>
    );
  }
}

// const userToCompany = () => {
//   return axios({
//     method: "POST",
//     headers: { Authorization: "Bearer " + localStorage.getItem("token") },
//     url: `${config.fetchLinkUrl}users/getRooms`,
//   })
//     .then((res) => {
//       console.log(res);
//       return res;
//     })
//     .catch((error) => {
//       console.log(error.response.data);
//       return error;
//     });
// };

export default Chat;
