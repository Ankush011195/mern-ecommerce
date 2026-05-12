import { useState, useRef, useEffect } from "react";
// import axios from "axios";
import API from "../api";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi! 👋 I'm GadgetBot. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);
     try {
      const { data } = await API.post(
        "/chat",
        { message: userMsg }
      );
      setMessages(prev => [...prev, { role: "bot", text: data.reply }]);
    } catch {
      setMessages(prev => [...prev, { 
        role: "bot", text: "Sorry, I'm having trouble. Try again!" 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-black text-white
                   rounded-full shadow-lg flex items-center justify-center
                   text-2xl hover:scale-110 transition-all z-50">
        {open ? "✕" : "💬"}
      </button>

       {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 w-80 bg-white rounded-2xl
                        border border-gray-200 shadow-2xl z-50 flex flex-col"
             style={{ height: "420px", animation: "fadeUp 0.3s ease" }}>

          {/* Header */}
          <div className="bg-black text-white px-4 py-3 rounded-t-2xl flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-sm">
              🤖
            </div>
            <div>
              <div className="text-sm font-medium">GadgetBot</div>
              <div className="text-xs text-gray-400">AI Assistant</div>
            </div>
          </div>

      {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm leading-relaxed
                  ${msg.role === "user"
                    ? "bg-black text-white rounded-br-sm"
                    : "bg-gray-100 text-gray-800 rounded-bl-sm"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-3 py-2 rounded-xl text-sm">
                  <span className="animate-pulse">Typing...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

        {/* Input */}
          <div className="p-3 border-t border-gray-100 flex gap-2">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200
                         rounded-xl text-sm focus:outline-none focus:border-indigo-500"/>
            <button
              onClick={sendMessage}
              className="w-9 h-9 bg-black text-white rounded-xl flex items-center
                         justify-center hover:opacity-80 transition">
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;           