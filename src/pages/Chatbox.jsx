"use client";
import { useState, useRef, useEffect } from "react";

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const convertMarkdownToHtml = (markdown) => {
    // Convert headings
    markdown = markdown.replace(
      /^(#{1,6})\s*(.*)$/gm,
      (match, hashes, content) => {
        const level = hashes.length;
        return `<h${level}>${content}</h${level}>`;
      }
    );

    // Convert bold text
    markdown = markdown.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Convert italic text
    markdown = markdown.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Convert links
    markdown = markdown.replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    // Convert unordered lists
    markdown = markdown.replace(/^\s*-\s+(.*)$/gm, "<ul><li>$1</li></ul>");

    // Convert ordered lists
    markdown = markdown.replace(/^\s*\d+\.\s+(.*)$/gm, "<ol><li>$1</li></ol>");

    // Convert code blocks
    markdown = markdown.replace(
      /```(\w*)\s*([\s\S]*?)\s*```/g,
      (match, lang, content) => {
        const languageClass = lang ? ` class="${lang}"` : "";
        return `<pre><code${languageClass}>${content}</code></pre>`;
      }
    );

    // Convert inline code
    markdown = markdown.replace(/`([^`]+)`/g, "<code>$1</code>");

    return markdown;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: inputValue },
    ]);
    setInputValue("");

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "assistant", content: "...typing" },
    ]);

    try {
      const queryData = {
        convo: [...messages, { role: "user", content: inputValue }],
        agent: true,
        agent_id: "678bbec0a7d395300fe82126_Aavash Tamang",
      };

      const response = await fetch(
        "https://api.fagoon.ai/api/v1/upgrade/chat",
        {
          method: "POST",
          body: JSON.stringify(queryData),
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      const responseMessage = data
        ? convertMarkdownToHtml(data)
        : "No response from server";

      setMessages((prevMessages) => {
        const newMessages = prevMessages.filter(
          (msg) => msg.content !== "...typing"
        );
        return [
          ...newMessages,
          { role: "assistant", content: responseMessage },
        ];
      });
    } catch (error) {
      setMessages((prevMessages) => {
        const newMessages = prevMessages.filter(
          (msg) => msg.content !== "...typing"
        );
        return [
          ...newMessages,
          { role: "assistant", content: "Sorry, please try again." },
        ];
      });
    }
  };

  return (
    <div className="relative z-[5000]">
      <div
        className={`fixed bottom-[50px] right-10 bg-white rounded-full border-8 border-green-500 shadow-md shadow-neutral-600 cursor-pointer hover:scale-[1.15] ${
          isOpen ? "hidden" : "flex"
        }`}
        onClick={() => setIsOpen(true)}
      >
        <img
          src="/assets/Logo.png"
          width={60}
          height={60}
          alt="Logo"
          className="rounded-full"
        />
      </div>

      {isOpen && (
        <div className="fixed bottom-[50px] right-10 w-80 h-[350px] sm:h-[450px] max-w-[90%] md:h-[450px] bg-gray-100 rounded-lg shadow-lg flex flex-col">
          <div
            className="bg-gradient-to-r from-green-500 via-green-600 to-[#FAD5A5] 
                 text-white p-3 flex justify-between items-center rounded-t-lg"
          >
            <div className="flex items-center gap-[20px]">
              <img
                src="/assets/Logo.png"
                width={38}
                height={38}
                alt="Logo"
                className="rounded-full bg-white"
              />
              <div>
                <h4 className="text-lg font-semibold cursor-default">
                  PLANT ME
                </h4>
                <p className="text-sm">Your plant representative</p>
              </div>
            </div>
            <button
              className="text-2xl text-black cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-thin p-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`my-2 p-2 text-sm rounded-lg ${
                  msg.role === "user"
                    ? "bg-green-600 text-white ml-auto w-4/5"
                    : "bg-gray-300 w-4/5"
                }`}
              >
                <div dangerouslySetInnerHTML={{ __html: msg.content }} />
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div
            className="bg-gradient-to-r from-green-500 via-green-600 to-[#FAD5A5] 
             rounded-b-lg p-3 gap-2 flex flex-col sm:flex-row items-center"
          >
            <div className="flex items-center w-full sm:w-auto gap-2">
              <input
                type="text"
                className="flex-1 p-2 rounded-lg bg-gray-200 text-black w-full sm:w-auto"
                placeholder="Write a message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleSendMessage();
                }}
              />
              <button
                className="bg-gray-900 text-white p-2 rounded-lg cursor-pointer"
                onClick={handleSendMessage}
              >
                SEND
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;
