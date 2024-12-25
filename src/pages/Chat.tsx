import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";

interface Message {
  id: number;
  content: string;
  sender: "user" | "ai";
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      content: input,
      sender: "user",
    };

    setMessages([...messages, newMessage]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        content: "Thank you for your message. How can I help you with your scouting journey today?",
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-white border-b p-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="/scout-logo.png"
              alt="Boy Scouts Logo"
              className="h-10 w-auto"
            />
            <div>
              <h1 className="text-xl font-bold" style={{ color: "#ec8e13" }}>Troop 125</h1>
              <p className="text-sm" style={{ color: "#99784D" }}>Scout Chat Assistant</p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <Card
                className={`p-4 max-w-[80%] ${
                  message.sender === "user"
                    ? "bg-[#ec8e13] text-white"
                    : "bg-white border-[#99784D] border"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </Card>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-white border-t p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSend} className="flex space-x-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border-[#99784D]"
            />
            <Button 
              type="submit" 
              className="bg-[#ec8e13] hover:bg-[#99784D] transition-colors"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </footer>
    </div>
  );
};

export default Chat;