import React, { useContext } from "react";
import SearchUser from "../SearchUser/SearchUser";
import Chat from "../Chat/Chat";
import { AppContext } from "../../context/AppContext";

type Props = {};

const Dashboard = (props: Props) => {
  const context = useContext(AppContext);

  return (
    <div>
      <SearchUser />
      {context?.currentChatUser && <Chat />}
    </div>
  );
};

export default Dashboard;
