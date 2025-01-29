import { useCallback, useEffect, useState } from "react";

import AdminApi from "../../utils/adminApi";
import UserList from "../../components/admin/User";

const UserPage = () => {
  const columns = ["Email", "Orders", "Value"];
  const data = [
    { email: "kyle@webdevsimplified.com", orders: 1, value: "$100" },
    { email: "jane.doe@example.com", orders: 3, value: "$250" },
  ];

  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    try {
      const { data } = await AdminApi.getRequest("/apiusers");
      const parsedUsers = JSON.parse(data);
    //   console.log(parsedUsers);
      setUsers(parsedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-8 py-6">
        <h1 className="text-2xl font-bold">Users</h1>
      </div>

      {/* Data Table */}
      <UserList columns={columns} data={[...users, ...data]} />
    </div>
  );
};

export default UserPage;
