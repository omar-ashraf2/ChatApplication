import ChatContainer from "./components/ChatContainer";
import UserList from "./components/UserList";

const App: React.FC = () => {
  return (
    <div className="flex h-screen">
      <UserList />
      <ChatContainer />
    </div>
  );
};

export default App;
