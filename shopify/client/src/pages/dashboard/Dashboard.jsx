import { useState } from "react";
import ChangeRole from "./ChangeRole";
import UsersData from "./UsersData";

const Dashboard = () => {
  const [role, setRole] = useState(false);

  return (
    <>
      <UsersData role={role} />
      <ChangeRole role={role} setRole={setRole} />
    </>
  );
};

export default Dashboard;
