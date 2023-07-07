import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ChatPage = () => {

  const [chat, setChat] = useState([]);

  const getChats = async () => {
    try {
      const info = await axios.get('http://localhost:8080/api/chat');
      setChat(info.data)
    } catch (error) {
      console.warn(error);
    }
  }

  useEffect(() => {
    getChats()
  }, []);

  return (
    <div>
      {
        chat.map((item) => (
            <div key={item._id}>
              {item.chatName}
            </div>
        ))
      }
    </div>
  )
}

export default ChatPage