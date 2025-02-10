import { useState, useRef } from "react";
import axios from "axios";
import Draggable from "react-draggable";
import { FiMessageSquare } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const chatRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);
    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("https://todo-dapp3-2.onrender.com/chatbot", {
        todoTitle: input,
      });
      const botMessage = { sender: "bot", text: response.data.enhancedTodo.description };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Error processing your request." },
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div className="fixed bottom-10 right-10">
      {/* Chat Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition"
        >
          <FiMessageSquare size={24} />
        </button>
      )}

      {/* Chatbox */}
      {isOpen && (
        <Draggable nodeRef={chatRef} handle=".handle">
          <div ref={chatRef} className="w-80 p-5 border border-gray-300 rounded-lg shadow-lg bg-white fixed bottom-16 right-10">
            {/* Header */}
            <div className="handle cursor-grab active:cursor-grabbing bg-blue-500 text-white p-3 rounded-t-lg flex justify-between items-center">
              <h2 className="text-lg font-semibold">AI Chatbot 🤖</h2>
              <button onClick={() => setIsOpen(false)} className="text-white">
                <IoMdClose size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-3 border rounded bg-gray-50 space-y-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 max-w-[75%] rounded-lg break-words ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white ml-auto"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  <strong>{msg.sender === "user" ? "You" : "AI"}:</strong> {msg.text}
                </div>
              ))}
            </div>

            {/* Input & Send Button */}
            <div className="mt-4 flex">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask anything..."
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
              />
              <button
                onClick={sendMessage}
                disabled={loading}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
              >
                {loading ? "Thinking..." : "Send"}
              </button>
            </div>
          </div>
        </Draggable>
      )}
    </div>
  );
};

export default Chatbot;
