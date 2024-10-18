import { useState } from "react";
import ChatContainer from "./components/ChatContainer";
import LoginForm from "./components/Login";

const App: React.FC = () => {
  const [username, setUsername] = useState<string | null>(null);

  return (
    <>
      {!username ? (
        <LoginForm setUsername={setUsername} />
      ) : (
        <ChatContainer username={username} />
      )}
    </>
  );
};

export default App;
