import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { Card } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { fetchUserLatestChats } from "../../actions/chatActions";
import { formatDate } from "../../utils/helpers";
type Props = {};

const UsersChatList = (props: Props) => {
  const context = useContext(AppContext);
  const username = context?.user || localStorage.getItem("user");

  const {
    data: chats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["latestChats", username],
    queryFn: () => fetchUserLatestChats(username),
  });
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "80%",
        marginLeft: "10%",
        marginTop: "20px",
      }}
    >
      {chats?.map((chat: { _id: string; timestamp: Date }) => (
        <Card key={chat._id} className="mb-3" style={{ width: "100%" }}>
          <Card.Body
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => context?.setCurrentChatUser(chat?._id)}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#ddd",
                marginRight: "12px",
              }}
            ></div>
            <div style={{ flex: 1, fontWeight: "bold" }}>{chat._id}</div>
            <div style={{ color: "#888", fontSize: "14px" }}>
              {formatDate(chat.timestamp)}
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default UsersChatList;
