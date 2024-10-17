const UserList: React.FC<{ setActiveUser?: (user: string) => void }> = ({
  setActiveUser,
}) => {
  const users = ["Alice", "Bob", "Charlie"];

  return (
    <div className="w-full md:w-1/4 bg-gray-100 p-4 shadow-lg h-full">
      <h2 className="text-xl font-semibold mb-4">Active Users</h2>
      <ul className="space-y-2">
        {users.map((user, index) => (
          <li
            key={index}
            className="p-2 bg-white rounded-md shadow-sm cursor-pointer"
            onClick={() => setActiveUser?.(user)}
          >
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
