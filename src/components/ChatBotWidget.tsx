"use client";

import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, User, CornerDownRight } from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: Date;
}

export const ChatBotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          sender: "bot",
          text: "안녕하세요! 한코한코 1:1 상담 챗봇 '코코'입니다. 어떤 도움이 필요하신가요? 아래 추천 항목을 누르시거나 궁금한 내용을 입력해 주세요! 🧶",
          timestamp: new Date(),
        },
      ]);
    }
  }, [messages.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate bot response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const botReply = getBotResponse(text);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: botReply,
          timestamp: new Date(),
        },
      ]);
    }, 1000);
  };

  const getBotResponse = (query: string): string => {
    const q = query.toLowerCase();

    // 🚚 배송 관련
    if (q.includes("배송") || q.includes("배송일") || q.includes("택배") || q.includes("언제")) {
      return "🚚 한코한코는 영업일 기준 오후 2시 이전 주문 건에 대해 당일 출고를 진행하고 있습니다! 출고 후 보통 1~2일 내에 택배로 수령하실 수 있습니다.";
    }

    // 🧶 실 추천 관련
    if (q.includes("추천") || q.includes("실") || q.includes("털실") || q.includes("초보")) {
      return "🧶 왕초보 분들에게는 실 갈라짐이 없고 탄탄한 '하비울' 볼실을 강력 추천해 드립니다! 대작을 이음새 없이 뜨고 싶으시다면 부드러운 'WOLLY 캐시미어 콘사'가 큰 사랑을 받고 있습니다.";
    }

    // 💳 취소 / 반품 관련
    if (q.includes("취소") || q.includes("반품") || q.includes("환불") || q.includes("교환")) {
      return "💳 마이페이지에서 가상 주문을 하신 후에는 배송이 시작되기 전까지 주문 취소가 가능합니다. 이미 배송된 소품이나 볼실은 7일 이내에 미개봉 상태로 접수해 주시면 교환/환불을 신속히 도와드립니다.";
    }

    // 🏢 매장 위치 관련
    if (q.includes("위치") || q.includes("매장") || q.includes("오프라인") || q.includes("어디")) {
      return "🏢 현재 오프라인 아틀리에 매장은 운영하고 있지 않으며, 차후 오픈 예정입니다! 오픈 일정이 확정되면 공지사항을 통해 소식을 전해드리겠습니다. 조금만 기다려 주세요! ☕";
    }

    // Default responses
    return "뜨개질 중 어려움이 있으시거나 궁금한 사항이 있다면 언제든 편하게 물어보세요! 친절한 '코코'가 바로 가이드해 드릴게요. 🧶";
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-brand-primary text-brand-dark w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-all cursor-pointer relative group border-2 border-white"
          title="1:1 챗봇 상담"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full animate-bounce">
            Live
          </span>
          <div className="absolute right-16 bg-brand-dark/95 text-white text-[11px] font-medium px-3 py-1.5 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">
            1:1 챗봇 상담원 코코 🧶
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-3xl w-[350px] sm:w-[380px] h-[500px] shadow-2xl border border-brand-light-gray flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-brand-dark p-4 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center text-brand-dark">
                <Bot className="w-4.5 h-4.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold tracking-wide">한코 챗봇 상담센터</h4>
                <span className="text-[10px] text-brand-primary font-light block -mt-0.5">상담원 코코가 실시간 대기 중입니다.</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Message Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-light/35 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                    msg.sender === "bot" ? "bg-brand-primary text-brand-dark" : "bg-brand-dark text-white"
                  }`}
                >
                  {msg.sender === "bot" ? <Bot className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                </div>

                {/* Message Content */}
                <div className="max-w-[75%] space-y-1">
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-xs shadow-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-brand-primary text-brand-dark font-medium rounded-tr-none"
                        : "bg-white text-brand-dark border border-brand-light-gray rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className={`text-[9px] text-brand-dark-muted/60 block ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-brand-primary flex items-center justify-center text-brand-dark shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-none border border-brand-light-gray px-4 py-3 text-xs shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-brand-dark/40 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-brand-dark/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-brand-dark/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Recommend Buttons */}
          <div className="p-3 bg-white border-t border-brand-light-gray flex gap-2 overflow-x-auto hide-scrollbar shrink-0">
            <button
              onClick={() => handleSend("🚚 배송 일정이 궁금해요")}
              className="text-[10px] sm:text-xs bg-brand-light text-brand-dark px-3 py-1.5 rounded-full border border-brand-light-gray/60 hover:bg-brand-primary/20 hover:border-brand-primary transition-colors shrink-0"
            >
              🚚 배송 일정
            </button>
            <button
              onClick={() => handleSend("🧶 뜨개 털실 추천받고 싶어요")}
              className="text-[10px] sm:text-xs bg-brand-light text-brand-dark px-3 py-1.5 rounded-full border border-brand-light-gray/60 hover:bg-brand-primary/20 hover:border-brand-primary transition-colors shrink-0"
            >
              🧶 실 추천
            </button>
            <button
              onClick={() => handleSend("💳 주문 취소 및 환불 안내")}
              className="text-[10px] sm:text-xs bg-brand-light text-brand-dark px-3 py-1.5 rounded-full border border-brand-light-gray/60 hover:bg-brand-primary/20 hover:border-brand-primary transition-colors shrink-0"
            >
              💳 취소/반품
            </button>
            <button
              onClick={() => handleSend("🏢 오프라인 매장 위치")}
              className="text-[10px] sm:text-xs bg-brand-light text-brand-dark px-3 py-1.5 rounded-full border border-brand-light-gray/60 hover:bg-brand-primary/20 hover:border-brand-primary transition-colors shrink-0"
            >
              🏢 매장 위치
            </button>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-3 bg-brand-light/20 border-t border-brand-light-gray flex gap-2 items-center"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="메시지를 입력하세요..."
              className="flex-1 bg-white border border-brand-light-gray/80 rounded-full px-4 py-2 text-xs text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-primary"
            />
            <button
              type="submit"
              className="bg-brand-primary text-brand-dark w-8 h-8 rounded-full flex items-center justify-center shadow hover:bg-brand-primary-hover transition-colors shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
