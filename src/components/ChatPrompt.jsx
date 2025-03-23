"use client";
import { useState, useEffect, useRef } from "react";
import { IoSend } from "react-icons/io5";
import { MdKeyboardVoice } from "react-icons/md";

const ChatPrompt = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue("");
  };

  return (
    <div
      ref={chatRef}
      className={`fixed z-100 bottom-10 right-10 flex justify-center transition-all duration-300
      ${isOpen ? "w-[70%]" : "w-fit"}`}
    >
      {/* Main Chat Bar */}
      <div
        className={`flex items-center bg-white w-full border-green-500 shadow-md transition-all duration-300 ${
          isOpen
            ? "p-1 rounded-full border-4"
            : "rounded-full border-0  justify-end"
        }`}
        onClick={() => !isOpen && setIsOpen(true)}
      >
        {/* Chat Input (Hidden Until Open) */}
        {isOpen && (
          <input
            type="text"
            className=" ml-2 flex-1 w-full p-2 bg-white text-black placeholder-gray-500 focus:outline-none rounded-l-full transition-all duration-300"
            placeholder="Hi! How was your day?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
          />
        )}

        {/* Send Button */}
        {isOpen && (
          <button
            className="ml-2 bg-white text-black hover:bg-gray-300 p-4 rounded-full transition-all duration-300"
            onClick={handleSendMessage}
          >
            <IoSend size={24} />
          </button>
        )}

        {/* Voice Button */}
        {isOpen && (
          <button className="ml-2 bg-white text-black hover:bg-gray-300 p-4 rounded-full transition-all duration-300">
            <MdKeyboardVoice size={24} />
          </button>
        )}

        {/* Floating Button (Always Appears) */}
        <div
          className={`rounded-full flex justify-center w-20 h-20 cursor-pointer hover:scale-[1.1] transition-all duration-300 ${
            isOpen
              ? "ml-2 p-1 bg-green-500 border-1 border-white"
              : "bg-white border-8 border-green-500"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            src="/assets/Logo.png"
            width={60}
            height={60}
            alt="Logo"
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

const ChatResponse = ({ messages }) => {
  return (
    <div className="absolute z-100 top-40 right-2 sm:right-5 md:right-10 max-w-sm w-full h-fit text-justify flex flex-col gap-2">
      {messages.map((msg, index) => (
        <div
          key={index}
          className="p-3 text-sm bg-blue-200 text-gray-800 rounded-lg shadow-md break-words"
        >
          {msg}
        </div>
      ))}
    </div>
  );
};

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);

  const handleNewMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <div>
      <ChatPrompt onSendMessage={handleNewMessage} />
      <ChatResponse messages={messages} />
    </div>
  );
};

export default ChatContainer;
