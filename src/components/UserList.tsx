const UserList: React.FC<{
  setActiveUser: (user: string) => void;
  activeUser: string;
}> = ({ setActiveUser, activeUser }) => {
  const users = [
    {
      name: "Alice",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    },
    {
      name: "Bob",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    },
    {
      name: "Charlie",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    {
      name: "David",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      name: "Eve",
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
      name: "Frank",
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    },
    {
      name: "Grace",
      avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    },
    {
      name: "Hank",
      avatar: "https://randomuser.me/api/portraits/men/8.jpg",
    },
    {
      name: "Layla",
      avatar: "https://randomuser.me/api/portraits/women/9.jpg",
    },
    {
      name: "John",
      avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    },
  ];

  return (
    <div className="w-full md:w-1/4 bg-gray-100 p-4 shadow-lg h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17 20h5v-2a3 3 0 00-3-3h-4a3 3 0 00-3 3v2h5zm-9 0h5v-2a3 3 0 00-3-3H6a3 3 0 00-3 3v2h5zm10-10a3 3 0 11-6 0 3 3 0 016 0zM7 10a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span>Active Users</span>
      </h2>
      <ul className="space-y-2">
        {users.map((user, index) => (
          <li
            key={index}
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
            <span className="font-medium">{user.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
