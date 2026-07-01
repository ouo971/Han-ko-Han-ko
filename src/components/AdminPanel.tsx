"use client";

import React, { useState, useEffect } from "react";
import { X, ShoppingBag, MessageSquare, Truck, Ban, Send, CheckCircle2, User } from "lucide-react";

interface OrderItem {
  product: {
    id: number;
    name: string;
    price: number;
  };
  color: string;
  quantity: number;
}

interface Order {
  id: string;
  date: string;
  address: string;
  finalPrice: string;
  items: OrderItem[];
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  payment: {
    method: string;
    detail: string;
  };
  status: "결제완료" | "배송중" | "주문취소";
}

interface ChatMessage {
  id: string;
  sender: "bot" | "user" | "admin";
  text: string;
  timestamp: string;
}

interface ActiveChat {
  userId: string;
  userName: string;
  status: "active" | "closed";
  messages: ChatMessage[];
  agentConnected: boolean;
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"orders" | "chat">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeChat, setActiveChat] = useState<ActiveChat | null>(null);
  const [replyInput, setReplyInput] = useState("");

  // Load orders and chat data
  useEffect(() => {
    if (!isOpen) return;

    const loadData = () => {
      // 1. Load orders
      const storedOrders = localStorage.getItem("hanko_orders");
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      } else {
        setOrders([]);
      }

      // 2. Load active chat
      const storedChat = localStorage.getItem("hanko_active_chat");
      if (storedChat) {
        setActiveChat(JSON.parse(storedChat));
      } else {
        setActiveChat(null);
      }
    };

    loadData();
    // Poll every 1.5 seconds to simulate real-time socket communication for chat and orders
    const interval = setInterval(loadData, 1500);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  // --- Order Status Adjustments ---
  const handleUpdateOrderStatus = (orderId: string, nextStatus: Order["status"]) => {
    const updated = orders.map((ord) => {
      if (ord.id === orderId) {
        return { ...ord, status: nextStatus };
      }
      return ord;
    });
    setOrders(updated);
    localStorage.setItem("hanko_orders", JSON.stringify(updated));
    alert(`주문 ${orderId}의 상태가 [${nextStatus}]로 변경되었습니다.`);
  };

  // --- Chat Admin Logic ---
  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyInput.trim() || !activeChat) return;

    const adminMsg: ChatMessage = {
      id: `admin-${Date.now()}`,
      sender: "admin",
      text: replyInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedChat: ActiveChat = {
      ...activeChat,
      agentConnected: true,
      messages: [...activeChat.messages, adminMsg],
    };

    setActiveChat(updatedChat);
    localStorage.setItem("hanko_active_chat", JSON.stringify(updatedChat));
    setReplyInput("");
  };

  const handleEndChat = () => {
    if (!activeChat) return;
    const confirmClose = window.confirm("고객과의 상담을 종료하시겠습니까?");
    if (!confirmClose) return;

    const closedChat: ActiveChat = {
      ...activeChat,
      status: "closed",
      agentConnected: false,
      messages: [
        ...activeChat.messages,
        {
          id: `bot-end-${Date.now()}`,
          sender: "bot",
          text: "관리자에 의해 실시간 상담이 종료되었습니다. 더 궁금한 점은 게시판을 통해 언제든 문의바랍니다. 🧶",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    };

    localStorage.setItem("hanko_active_chat", JSON.stringify(closedChat));
    setActiveChat(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#1e130c]/70 backdrop-blur-sm" onClick={onClose} />

      {/* Main Admin Panel Container */}
      <div className="relative bg-white rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl z-10 border border-brand-light-gray overflow-hidden">
        {/* Header */}
        <div className="bg-brand-dark p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-brand-primary p-2 rounded-xl text-brand-dark">
              <span className="text-xs font-bold font-mono">ADMIN</span>
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold">니팅테일 (Knitting Tale) 관리자 센터</h3>
              <span className="text-[10px] text-brand-primary/80 font-light block">주문서 검토 및 1:1 실시간 CS 상담을 진행합니다.</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex bg-brand-light/35 border-b border-brand-light-gray shrink-0">
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-6 py-4 text-xs sm:text-sm font-bold transition-all border-r border-brand-light-gray ${
              activeTab === "orders" ? "bg-white text-brand-primary border-b-2 border-b-brand-primary" : "text-brand-dark-muted hover:text-brand-primary"
            }`}
          >
            <ShoppingBag className="w-4.5 h-4.5" /> 주문 수량 관리 ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab("chat")}
            className={`flex items-center gap-2 px-6 py-4 text-xs sm:text-sm font-bold transition-all border-r border-brand-light-gray ${
              activeTab === "chat" ? "bg-white text-brand-primary border-b-2 border-b-brand-primary" : "text-brand-dark-muted hover:text-brand-primary"
            }`}
          >
            <MessageSquare className="w-4.5 h-4.5" /> 1:1 실시간 채팅 상담
            {activeChat && activeChat.status === "active" && (
              <span className="w-2.5 h-2.5 rounded-full bg-brand-accent animate-pulse" />
            )}
          </button>
        </div>

        {/* Dashboard Content Body */}
        <div className="flex-1 overflow-hidden p-6 md:p-8 bg-brand-light/10">
          {activeTab === "orders" ? (
            /* Orders Management Tab */
            <div className="h-full flex flex-col">
              <div className="flex justify-between items-center mb-4 shrink-0">
                <span className="text-xs font-bold text-brand-dark uppercase tracking-wider">주문 내역 목록</span>
                <span className="text-[11px] text-brand-dark-muted font-light">고객이 안심결제 모듈로 결제를 완료한 실제 주문입니다.</span>
              </div>

              {/* Orders Table Container */}
              <div className="flex-grow overflow-auto border border-brand-light-gray rounded-2xl bg-white scrollbar-thin">
                {orders.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center text-brand-dark-muted font-light text-sm">
                    <ShoppingBag className="w-12 h-12 text-brand-light-gray mb-3" />
                    현재 등록된 고객의 주문서가 없습니다.
                  </div>
                ) : (
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-brand-light/35 border-b border-brand-light-gray text-brand-dark font-bold">
                        <th className="p-4">주문번호 / 일자</th>
                        <th className="p-4">주문자 정보</th>
                        <th className="p-4">주문 상품 정보 (수량 / 색상)</th>
                        <th className="p-4 text-right">총 결제금액</th>
                        <th className="p-4">결제 수단</th>
                        <th className="p-4 text-center">상태</th>
                        <th className="p-4 text-center">조치</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-light-gray text-brand-dark/95">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-brand-light/5">
                          <td className="p-4 font-mono font-medium whitespace-nowrap">
                            <span className="block text-brand-primary font-bold">{order.id}</span>
                            <span className="text-[10px] text-brand-dark-muted font-light block mt-0.5">{order.date}</span>
                          </td>
                          <td className="p-4">
                            <strong className="block text-brand-dark">{order.customer.name}</strong>
                            <span className="text-[10px] text-brand-dark-muted block font-light mt-0.5">{order.customer.phone}</span>
                            <span className="text-[10px] text-brand-dark-muted block font-light truncate max-w-[150px]" title={order.address}>{order.address}</span>
                          </td>
                          <td className="p-4">
                            <div className="space-y-1">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-1">
                                  <span className="font-semibold text-brand-dark truncate max-w-[150px]" title={item.product.name}>
                                    {item.product.name}
                                  </span>
                                  <span className="text-brand-accent font-bold">({item.quantity}개)</span>
                                  <span className="text-[10px] bg-brand-light px-1.5 py-0.5 rounded border border-brand-light-gray/60 font-light">
                                    {item.color}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="p-4 text-right font-bold text-brand-accent whitespace-nowrap">
                            {order.finalPrice}
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <span className="font-medium">{order.payment.method}</span>
                            <span className="text-[10px] text-brand-dark-muted block font-light mt-0.5">{order.payment.detail}</span>
                          </td>
                          <td className="p-4 text-center whitespace-nowrap">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                              order.status === "결제완료"
                                ? "bg-blue-50 text-blue-600 border-blue-200"
                                : order.status === "배송중"
                                ? "bg-green-50 text-green-600 border-green-200 animate-pulse"
                                : "bg-red-50 text-red-600 border-red-200"
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="p-4 text-center whitespace-nowrap">
                            <div className="flex items-center justify-center gap-1.5">
                              {order.status === "결제완료" && (
                                <button
                                  onClick={() => handleUpdateOrderStatus(order.id, "배송중")}
                                  className="bg-brand-primary text-brand-dark hover:bg-brand-primary-hover p-1.5 rounded-lg flex items-center gap-1 font-semibold text-[10px] shadow-sm transition-colors cursor-pointer"
                                  title="배송중 처리"
                                >
                                  <Truck className="w-3.5 h-3.5" /> 배송하기
                                </button>
                              )}
                              {order.status !== "주문취소" && (
                                <button
                                  onClick={() => handleUpdateOrderStatus(order.id, "주문취소")}
                                  className="bg-red-50 hover:bg-red-100 text-red-600 p-1.5 rounded-lg flex items-center gap-1 font-semibold text-[10px] border border-red-200 transition-colors cursor-pointer"
                                  title="주문 취소 처리"
                                >
                                  <Ban className="w-3.5 h-3.5" /> 취소
                                </button>
                              )}
                              {order.status === "주문취소" && (
                                <span className="text-[10px] text-brand-dark-muted font-light italic">조치 없음</span>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          ) : (
            /* 1:1 Live Chat Consultations Tab */
            <div className="h-full flex gap-6">
              {/* Left Column: Chat Room List (1 room in local storage mock) */}
              <div className="w-1/3 bg-white border border-brand-light-gray rounded-2xl flex flex-col overflow-hidden shrink-0">
                <div className="p-4 bg-brand-light/35 border-b border-brand-light-gray font-bold text-xs text-brand-dark uppercase tracking-wider">
                  상담 채널 목록
                </div>
                <div className="flex-1 overflow-y-auto divide-y divide-brand-light-gray">
                  {activeChat && activeChat.status === "active" ? (
                    <div className="p-4 bg-brand-primary/10 border-l-4 border-brand-primary cursor-pointer flex items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-full bg-brand-primary text-brand-dark flex items-center justify-center font-bold text-xs shrink-0">
                          {activeChat.userName.slice(0, 1)}
                        </div>
                        <div className="min-w-0">
                          <strong className="text-xs font-semibold text-brand-dark block">{activeChat.userName}</strong>
                          <span className="text-[10px] text-brand-dark-muted truncate block font-light mt-0.5">
                            {activeChat.messages[activeChat.messages.length - 1]?.text || "연결되었습니다."}
                          </span>
                        </div>
                      </div>
                      <span className="w-2.5 h-2.5 rounded-full bg-brand-accent shrink-0 animate-ping" />
                    </div>
                  ) : (
                    <div className="p-6 text-center text-xs text-brand-dark-muted font-light">
                      대기 중인 활성 상담이 없습니다.
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Chat Conversation Window */}
              <div className="flex-1 bg-white border border-brand-light-gray rounded-2xl flex flex-col overflow-hidden">
                {activeChat && activeChat.status === "active" ? (
                  <>
                    {/* Chat Window Header */}
                    <div className="p-4 bg-brand-light/35 border-b border-brand-light-gray flex items-center justify-between shrink-0">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-brand-primary" />
                        <span className="text-xs font-bold text-brand-dark">{activeChat.userName} 고객님과 상담 중</span>
                      </div>
                      <button
                        onClick={handleEndChat}
                        className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 text-[10px] font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        상담 종료하기
                      </button>
                    </div>

                    {/* Chat Messages List */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-light/10 scrollbar-thin">
                      {activeChat.messages.map((msg, idx) => (
                        <div
                          key={msg.id || idx}
                          className={`flex gap-2.5 ${msg.sender === "admin" ? "flex-row-reverse" : "flex-row"}`}
                        >
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            msg.sender === "admin" ? "bg-brand-dark text-white" : "bg-brand-primary text-brand-dark"
                          }`}>
                            {msg.sender === "admin" ? "설" : "고"}
                          </div>
                          <div className="max-w-[70%] space-y-1">
                            <div className={`rounded-xl p-3 text-xs leading-relaxed shadow-sm ${
                              msg.sender === "admin"
                                ? "bg-brand-dark text-white rounded-tr-none font-medium"
                                : "bg-white text-brand-dark border border-brand-light-gray rounded-tl-none"
                            }`}>
                              {msg.text}
                            </div>
                            <span className={`text-[9px] text-brand-dark-muted/60 font-light block ${msg.sender === "admin" ? "text-right" : "text-left"}`}>
                              {msg.timestamp}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chat Reply Form */}
                    <form
                      onSubmit={handleSendReply}
                      className="p-3 border-t border-brand-light-gray bg-white flex gap-2 shrink-0"
                    >
                      <input
                        type="text"
                        value={replyInput}
                        onChange={(e) => setReplyInput(e.target.value)}
                        placeholder="상담 내용을 작성해 주세요..."
                        className="flex-grow border border-brand-light-gray rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-brand-primary"
                      />
                      <button
                        type="submit"
                        className="bg-brand-primary text-brand-dark font-semibold px-4 py-2 rounded-xl flex items-center gap-1 text-xs hover:bg-brand-primary-hover shadow-sm transition-colors cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5" /> 전송
                      </button>
                    </form>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 text-brand-dark-muted font-light text-sm">
                    <MessageSquare className="w-12 h-12 text-brand-light-gray mb-3" />
                    왼쪽 목록에서 활성 상담방을 선택해 주세요.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
