import { useState } from "react";

interface LoginFormProps {
  setUsername: (username: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setUsername }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input) {
      setUsername(input);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center h-screen justify-center"
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter your name"
        className="p-2 border rounded-md"
      />
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white p-2 rounded-md"
      >
        Join Chat
      </button>
    </form>
  );
};

export default LoginForm;
