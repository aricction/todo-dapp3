import { useState, useRef } from "react";
import axios from "axios";
import Draggable from "react-draggable";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null); // ✅ Use ref instead of relying on findDOMNode

  const sendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);

    const promptMessage = {
      sender: "system",
      text: `Help me break down and enhance this TODO: ${input}
      
Provide:
- Detailed description
- Estimated time to complete
- Potential Subtasks
- Suggested priority (low/medium/high)

Response format:
Description: [Detailed description]
Time Estimate: [X hours/minutes]
Subtasks:
1. [Subtask 1]
2. [Subtask 2]
Priority: [low/medium/high]
      `,
    };

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage, promptMessage]);

    try {
      const response = await axios.post("http://localhost:3000/chatbot", {
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
    <Draggable nodeRef={chatRef} handle=".handle">
      <div ref={chatRef} className="fixed bottom-10 right-10 max-w-lg p-5 border border-gray-300 rounded-lg shadow-lg bg-white cursor-move">
        {/* Header with drag handle */}
        <div className="handle cursor-grab active:cursor-grabbing bg-blue-500 text-white p-3 rounded-t-lg text-center">
          <h2 className="text-lg font-semibold">AI Chatbot 🤖</h2>
        </div>

        {/* Chat Messages Container */}
        <div className="h-64 overflow-y-auto p-3 border rounded bg-gray-50 space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 max-w-[75%] rounded-lg break-words ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white ml-auto"
                  : msg.sender === "system"
                  ? "bg-yellow-300 text-black"
                  : "bg-gray-200 text-black"
              }`}
            >
              <strong>
                {msg.sender === "user" ? "You" : msg.sender === "system" ? "Prompt" : "AI"}:
              </strong>{" "}
              {msg.text}
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
  );
};

export default Chatbot;
