import React, { useEffect } from "react";
import { getWithoutJWT } from "../service/http-request";

const ChatPage = () => {
  const fetchChats = async () => {
    const { data } = await getWithoutJWT("/api/chat");
    console.log(data);
  };

  useEffect(() => {
    // fetchChats();
  }, []);

  return <div>ChatPage</div>;
};

export default ChatPage;
