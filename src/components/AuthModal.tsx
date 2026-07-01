"use client";

import React, { useState } from "react";
import { X, UserPlus, LogIn, Mail, Lock, User, Phone, MapPin } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: { name: string; email: string; phone: string; address: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const storedUsersStr = localStorage.getItem("hanko_registered_users");
      const registeredUsers = storedUsersStr ? JSON.parse(storedUsersStr) : [];
      
      const foundUser = registeredUsers.find(
        (u: any) => u.email === email && u.password === password
      );

      if (foundUser) {
        localStorage.setItem("hanko_user", JSON.stringify(foundUser));
        onAuthSuccess(foundUser);
        alert(`${foundUser.name}님, 반갑습니다! 로그인되었습니다. 🧶`);
        onClose();
      } else {
        alert("이메일 또는 비밀번호가 일치하지 않습니다. 회원가입을 먼저 진행해 주세요.");
      }
    } catch (err) {
      console.error(err);
      alert("로그인 처리 중 에러가 발생했습니다.");
    }
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name || !phone || !address) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    try {
      const storedUsersStr = localStorage.getItem("hanko_registered_users");
      const registeredUsers = storedUsersStr ? JSON.parse(storedUsersStr) : [];

      const isDuplicate = registeredUsers.some((u: any) => u.email === email);
      if (isDuplicate) {
        alert("이미 등록된 이메일 주소입니다.");
        return;
      }

      const newUser = { name, email, password, phone, address };
      registeredUsers.push(newUser);
      
      localStorage.setItem("hanko_registered_users", JSON.stringify(registeredUsers));
      localStorage.setItem("hanko_user", JSON.stringify(newUser));
      
      onAuthSuccess(newUser);
      alert("회원가입이 성공적으로 완료되었습니다! 로그인 상태로 즉시 연결됩니다. 🎉");
      onClose();
    } catch (err) {
      console.error(err);
      alert("회원가입 처리 중 에러가 발생했습니다.");
    }
  };

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#3d3227]/55 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl z-10 border border-brand-light-gray animate-fade-in-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-brand-light hover:bg-brand-accent hover:text-white text-brand-dark flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Auth Tabs */}
        <div className="flex border-b border-brand-light-gray">
          <button
            onClick={() => setIsSignUp(false)}
            className={`flex-1 py-4 text-sm font-semibold tracking-wider transition-colors ${
              !isSignUp ? "text-brand-primary border-b-2 border-brand-primary" : "text-brand-dark-muted hover:text-brand-primary"
            }`}
          >
            로그인
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`flex-1 py-4 text-sm font-semibold tracking-wider transition-colors ${
              isSignUp ? "text-brand-primary border-b-2 border-brand-primary" : "text-brand-dark-muted hover:text-brand-primary"
            }`}
          >
            회원가입
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8">
          <div className="text-center mb-6">
            <span className="font-serif text-xl font-bold text-brand-dark tracking-wide block">
              한코한코 아틀리에
            </span>
            <p className="text-xs text-brand-dark-muted font-light mt-1">
              {isSignUp ? "신규 회원으로 가입하고 다양한 해택을 누리세요." : "로그인하고 주문 배송 현황을 편리하게 관리하세요."}
            </p>
          </div>

          {!isSignUp ? (
            /* Login Form */
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-brand-primary" /> 이메일 주소
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@hanko.com"
                  className="w-full bg-brand-light border border-brand-light-gray rounded-xl px-4 py-2.5 text-sm text-brand-dark focus:ring-1 focus:ring-brand-primary focus:outline-none focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-brand-primary" /> 비밀번호
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-brand-light border border-brand-light-gray rounded-xl px-4 py-2.5 text-sm text-brand-dark focus:ring-1 focus:ring-brand-primary focus:outline-none focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-brand-dark text-white font-bold py-3 rounded-full flex items-center justify-center gap-2 hover:bg-brand-primary hover:text-brand-dark transition-all shadow-md focus:outline-none"
              >
                <LogIn className="w-4 h-4" /> 로그인하기
              </button>
            </form>
          ) : (
            /* SignUp Form */
            <form onSubmit={handleSignUp} className="space-y-3.5 overflow-y-auto max-h-[50vh] pr-1 scrollbar-thin">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-brand-primary" /> 이름 <span className="text-brand-accent">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="홍길동"
                  className="w-full bg-brand-light border border-brand-light-gray rounded-xl px-4 py-2.5 text-sm text-brand-dark focus:ring-1 focus:ring-brand-primary focus:outline-none focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-brand-primary" /> 이메일 주소 <span className="text-brand-accent">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@hanko.com"
                  className="w-full bg-brand-light border border-brand-light-gray rounded-xl px-4 py-2.5 text-sm text-brand-dark focus:ring-1 focus:ring-brand-primary focus:outline-none focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-brand-primary" /> 비밀번호 <span className="text-brand-accent">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="최소 6자 이상"
                  className="w-full bg-brand-light border border-brand-light-gray rounded-xl px-4 py-2.5 text-sm text-brand-dark focus:ring-1 focus:ring-brand-primary focus:outline-none focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-brand-primary" /> 연락처 <span className="text-brand-accent">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010-1234-5678"
                  className="w-full bg-brand-light border border-brand-light-gray rounded-xl px-4 py-2.5 text-sm text-brand-dark focus:ring-1 focus:ring-brand-primary focus:outline-none focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-brand-dark flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-primary" /> 기본 배송지 주소 <span className="text-brand-accent">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="도로명 주소 및 상세 주소"
                  className="w-full bg-brand-light border border-brand-light-gray rounded-xl px-4 py-2.5 text-sm text-brand-dark focus:ring-1 focus:ring-brand-primary focus:outline-none focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-brand-dark text-white font-bold py-3 rounded-full flex items-center justify-center gap-2 hover:bg-brand-primary hover:text-brand-dark transition-all shadow-md focus:outline-none"
              >
                <UserPlus className="w-4 h-4" /> 가입 및 즉시 로그인
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
