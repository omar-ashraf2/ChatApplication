const UserList: React.FC = () => {
  const users = ["Alice", "Bob", "Charlie"];

  return (
    <div className="w-1/4 bg-gray-100 p-4 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Active Users</h2>
      <ul className="space-y-2">
        {users.map((user, index) => (
          <li key={index} className="p-2 bg-white rounded-md shadow-sm">
            {user}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default UserList;
