import React, { useContext } from "react";
import SearchUser from "../SearchUser/SearchUser";
import Chat from "../Chat/Chat";
import { AppContext } from "../../context/AppContext";
import UsersChatList from "../UsersChatList/UsersChatList";

const Dashboard = () => {
  const context = useContext(AppContext);

  return (
    <div>
      <SearchUser />
      {context?.currentChatUser && <Chat />}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
          width: "80%",
          marginLeft: "10%",
        }}
      >
        {!context?.currentChatUser && <UsersChatList />}
      </div>
    </div>
  );
};

export default Dashboard;
