interface UserListProps {
  users: { name: string; avatar: string }[];
  setActiveUser: (user: string) => void;
  activeUser: string | null;
}

const UserList: React.FC<UserListProps> = ({
  users,
  setActiveUser,
  activeUser,
}) => {
  return (
    <div className="w-full md:w-1/4 hidden md:flex flex-col bg-gray-100 p-4 shadow-lg h-fit md:h-full">
      <h2 className="text-xl font-semibold mb-4">Available Users</h2>
      <ul className="space-y-2 max-sm:grid max-sm:grid-cols-2 gap-4">
        {users.map((user) => (
          <li
            key={user.name}
            className={`p-2 rounded-md shadow-sm cursor-pointer flex items-center space-x-4 transition-all duration-300
              ${
                activeUser === user.name
                  ? "border-r-4 border-blue-500 bg-blue-100"
                  : "bg-white"
              }`}
            onClick={() => setActiveUser(user.name)}
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="h-8 w-8 rounded-full"
            />
            <span>{user.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
