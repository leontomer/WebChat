import React, { useState, useContext, useEffect, useRef } from "react";
import { AppContext } from "../../context/AppContext";
import {
  connectSocket,
  sendMessage,
  onReceiveMessage,
  disconnectSocket,
  getChatHistory,
} from "../../utils/socket";

const Chat: React.FC = () => {
  const chatStyles = {
    chatContainer: {
      width: "400px",
      height: "500px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column" as "column",
      overflow: "hidden",
    },
    messageList: {
      flexGrow: 1,
      padding: "10px",
      overflowY: "auto" as "auto",
      backgroundColor: "#f5f5f5",
    },
    messageInputContainer: {
      borderTop: "1px solid #ddd",
      padding: "10px",
      display: "flex",
    },
    input: {
      flexGrow: 1,
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "4px",
      marginRight: "5px",
    },
    sendButton: {
      padding: "10px 15px",
      borderRadius: "4px",
      border: "none",
      backgroundColor: "#007bff",
      color: "#fff",
      cursor: "pointer",
    },
    messageBubble: (isSender: boolean) => ({
      backgroundColor: isSender ? "#007bff" : "#ddd",
      color: isSender ? "#fff" : "#000",
      padding: "8px 12px",
      borderRadius: "15px",
      maxWidth: "80%",
      alignSelf: isSender ? "flex-end" : "flex-start",
      marginBottom: "5px",
    }),
  };

  const [messages, setMessages] = useState<
    {
      chatId: string;
      sender: string | null | undefined;
      recipient: string | null | undefined;
      message: string;
      timestamp: Date;
    }[]
  >([]);
  const context = useContext(AppContext);
  const username = context?.user || localStorage.getItem("user");
  const roomId = [username, context?.currentChatUser].sort().join("-");
  const messageListRef = useRef<HTMLDivElement | null>(null);

  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    connectSocket(roomId);
    getChatHistory(setMessages);
    onReceiveMessage((chatId, sender, recipient, message, timestamp) => {
      setMessages((prev) => [
        ...prev,
        { chatId, sender, recipient, message, timestamp },
      ]);
    });

    return () => {
      disconnectSocket();
    };
  }, [roomId]);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prev) => [
        ...prev,
        {
          chatId: roomId,
          sender: username,
          recipient: context?.currentChatUser,
          message,
          timestamp: new Date(),
        },
      ]);
      sendMessage(roomId, message, username, context?.currentChatUser);
      setMessage("");
      if (messageListRef.current) {
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
      }
    }
  };

  return (
    <div style={chatStyles.chatContainer}>
      {context?.currentChatUser}
      <div style={chatStyles.messageList} ref={messageListRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === username ? "right" : "left",
              margin: "10px",
            }}
          >
            <span
              style={{
                background: msg.sender === username ? "#007bff" : "#ddd",
                color: msg.sender === username ? "#fff" : "#000",
                padding: "5px",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>{msg.message} </span>
              <span>
                {new Date(msg.timestamp).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </span>
            </span>
          </div>
        ))}
      </div>
      <div style={chatStyles.messageInputContainer}>
        <input
          style={chatStyles.input}
          type="text"
          value={message}
          placeholder="Type a message..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button style={chatStyles.sendButton} onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
