"use client";

import React, { useState, useEffect } from "react";
import { X, Loader2, ShieldCheck, CreditCard, Wallet, Landmark } from "lucide-react";
import { Product } from "@/data/products";

interface CartItem {
  product: Product;
  color: string;
  quantity: number;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  currentUser: { name: string; email: string; phone: string; address: string } | null;
  onOrderSuccess: (
    orderId: string,
    address: string,
    finalPrice: string,
    orderDetails: {
      items: Array<{ product: { id: number; name: string; price: number }; color: string; quantity: number }>;
      customer: { name: string; phone: string; email: string };
      payment: { method: string; detail: string };
    }
  ) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  currentUser,
  onOrderSuccess,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [memo, setMemo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- Payment State Definitions ---
  const [paymentMethod, setPaymentMethod] = useState("card"); // 'card' | 'easy' | 'bank'
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardPassword, setCardPassword] = useState("");
  const [easyProvider, setEasyProvider] = useState("kakao"); // 'kakao' | 'naver'
  const [easyPin, setEasyPin] = useState("");
  const [selectedBank, setSelectedBank] = useState("kb"); // 'kb' | 'shinhan' | 'woori'
  const [depositor, setDepositor] = useState("");

  // Pre-fill customer details from logged-in user session
  useEffect(() => {
    if (isOpen) {
      if (currentUser) {
        setName(currentUser.name);
        setPhone(currentUser.phone);
        setEmail(currentUser.email);
        setAddress(currentUser.address);
        setDepositor(currentUser.name);
      } else {
        setName("");
        setPhone("");
        setEmail("");
        setAddress("");
        setDepositor("");
      }
      // Reset payment fields
      setCardNumber("");
      setCardExpiry("");
      setCardPassword("");
      setEasyPin("");
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subtotal >= 50000 || subtotal === 0 ? 0 : 3000;
  const total = subtotal + shippingFee;
  const totalStr = `${total.toLocaleString()}원`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Basic shipping details validation
    if (!name || !phone || !email || !address) {
      alert("주문자 정보 및 배송지를 정확히 입력해 주세요.");
      return;
    }

    // 2. Specific payment method details validation
    if (paymentMethod === "card") {
      if (cardNumber.replace(/\s/g, "").length < 16) {
        alert("신용카드 번호 16자리를 올바르게 입력해 주세요.");
        return;
      }
      if (!cardExpiry || !cardExpiry.includes("/")) {
        alert("카드 유효기간(MM/YY)을 입력해 주세요.");
        return;
      }
      if (cardPassword.length < 2) {
        alert("카드 비밀번호 앞 2자리를 입력해 주세요.");
        return;
      }
    } else if (paymentMethod === "easy") {
      if (easyPin.length < 6) {
        alert("간편결제 비밀번호 6자리를 올바르게 입력해 주세요.");
        return;
      }
    } else if (paymentMethod === "bank") {
      if (!depositor) {
        alert("무통장 입금자명을 입력해 주세요.");
        return;
      }
    }

    setIsSubmitting(true);

    // Simulate secure payment gateway authorization loader
    setTimeout(() => {
      setIsSubmitting(false);

      // Generate order ID
      const today = new Date();
      const dateStr = today.toISOString().slice(0, 10).replace(/-/g, "");
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const generatedOrderId = `HK${dateStr}-${randomNum}`;

      const paymentDetail = paymentMethod === "card"
        ? `카드 ${cardNumber.slice(0, 7)}...`
        : paymentMethod === "easy"
        ? `${easyProvider === "kakao" ? "카카오페이" : "네이버페이"}`
        : `${selectedBank === "kb" ? "국민은행" : selectedBank === "shinhan" ? "신한은행" : "우리은행"} (입금자: ${depositor})`;

      const orderDetails = {
        items: cart.map(item => ({
          product: {
            id: item.product.id,
            name: item.product.name,
            price: item.product.price
          },
          color: item.color,
          quantity: item.quantity
        })),
        customer: { name, phone, email },
        payment: {
          method: paymentMethod === "card" ? "신용카드" : paymentMethod === "easy" ? "간편결제" : "무통장입금",
          detail: paymentDetail
        }
      };

      onOrderSuccess(generatedOrderId, address, totalStr, orderDetails);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#3d3227]/55 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl z-10 border border-brand-light-gray animate-fade-in-up p-6 md:p-8 scrollbar-thin">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-brand-light hover:bg-brand-accent hover:text-white text-brand-dark shadow-sm flex items-center justify-center transition-all disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mt-4">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-dark mb-2 flex items-center gap-2">
            주문 및 안전 결제
          </h3>
          <p className="text-xs text-brand-dark-muted font-light mb-6 border-b border-brand-light-gray pb-4">
            한코한코의 프리미엄 원사를 안전하게 결제하고 주문을 마칩니다.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Customer Details */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider">
                1. 배송 정보
              </h4>
              <div>
                <label className="text-xs font-semibold text-brand-dark block mb-1.5">
                  주문자명 <span className="text-brand-accent">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="예: 김코바늘"
                  disabled={isSubmitting}
                  className="w-full bg-brand-light border border-brand-light-gray rounded-xl px-4 py-2.5 text-sm text-brand-dark focus:ring-1 focus:ring-brand-primary focus:outline-none focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-brand-dark block mb-1.5">
                    연락처 <span className="text-brand-accent">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="예: 010-1234-5678"
                    disabled={isSubmitting}
                    className="w-full bg-brand-light border border-brand-light-gray rounded-xl px-4 py-2.5 text-sm text-brand-dark focus:ring-1 focus:ring-brand-primary focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-brand-dark block mb-1.5">
                    이메일 주소 <span className="text-brand-accent">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="예: hanko@example.com"
                    disabled={isSubmitting}
                    className="w-full bg-brand-light border border-brand-light-gray rounded-xl px-4 py-2.5 text-sm text-brand-dark focus:ring-1 focus:ring-brand-primary focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-brand-dark block mb-1.5">
                  배송지 주소 <span className="text-brand-accent">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="도로명 주소 및 상세 주소를 입력하세요"
                  disabled={isSubmitting}
                  className="w-full bg-brand-light border border-brand-light-gray rounded-xl px-4 py-2.5 text-sm text-brand-dark focus:ring-1 focus:ring-brand-primary focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-brand-dark block mb-1.5">
                  배송 요청사항
                </label>
                <textarea
                  rows={2}
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="부재 시 문 앞에 놓아주세요."
                  disabled={isSubmitting}
                  className="w-full bg-brand-light border border-brand-light-gray rounded-xl px-4 py-2.5 text-sm text-brand-dark focus:ring-1 focus:ring-brand-primary focus:outline-none focus:bg-white resize-none"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-4 border-t border-brand-light-gray/60 pt-5">
              <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider">
                2. 결제 수단 선택 <span className="text-brand-accent">*</span>
              </h4>
              
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`flex flex-col items-center justify-center py-3 px-2 rounded-2xl border text-center transition-all ${
                    paymentMethod === "card"
                      ? "border-brand-primary bg-brand-secondary/20 text-brand-primary font-semibold"
                      : "border-brand-light-gray hover:border-brand-primary text-brand-dark-muted"
                  }`}
                >
                  <CreditCard className="w-5 h-5 mb-1" />
                  <span className="text-[11px] sm:text-xs">신용/체크카드</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("easy")}
                  className={`flex flex-col items-center justify-center py-3 px-2 rounded-2xl border text-center transition-all ${
                    paymentMethod === "easy"
                      ? "border-brand-primary bg-brand-secondary/20 text-brand-primary font-semibold"
                      : "border-brand-light-gray hover:border-brand-primary text-brand-dark-muted"
                  }`}
                >
                  <Wallet className="w-5 h-5 mb-1" />
                  <span className="text-[11px] sm:text-xs">간편결제 (페이)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("bank")}
                  className={`flex flex-col items-center justify-center py-3 px-2 rounded-2xl border text-center transition-all ${
                    paymentMethod === "bank"
                      ? "border-brand-primary bg-brand-secondary/20 text-brand-primary font-semibold"
                      : "border-brand-light-gray hover:border-brand-primary text-brand-dark-muted"
                  }`}
                >
                  <Landmark className="w-5 h-5 mb-1" />
                  <span className="text-[11px] sm:text-xs">무통장 입금</span>
                </button>
              </div>

              {/* Dynamic Payment Detail Fields */}
              <div className="bg-brand-light/65 border border-brand-light-gray/60 p-5 rounded-2xl">
                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <span className="text-xs font-semibold text-brand-dark block border-b border-brand-light-gray/60 pb-2">
                      신용카드 가상 안심결제
                    </span>
                    <div>
                      <label className="text-[10px] font-bold text-brand-dark block mb-1">카드 번호</label>
                      <input
                        type="text"
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => {
                          // Format with dashes
                          const val = e.target.value.replace(/\D/g, "");
                          const matches = val.match(/\d{4,16}/g);
                          const match = (matches && matches[0]) || "";
                          const parts = [];

                          for (let i = 0, len = match.length; i < len; i += 4) {
                            parts.push(match.substring(i, i + 4));
                          }

                          if (parts.length > 0) {
                            setCardNumber(parts.join(" "));
                          } else {
                            setCardNumber(val);
                          }
                        }}
                        placeholder="1234 - 5678 - 1234 - 5678"
                        className="w-full bg-white border border-brand-light-gray rounded-xl px-4 py-2 text-xs text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-primary"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-brand-dark block mb-1">유효기간</label>
                        <input
                          type="text"
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, "");
                            if (val.length > 2) {
                              val = val.substring(0, 2) + "/" + val.substring(2, 4);
                            }
                            setCardExpiry(val);
                          }}
                          placeholder="MM / YY"
                          className="w-full bg-white border border-brand-light-gray rounded-xl px-4 py-2 text-xs text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-primary text-center"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-brand-dark block mb-1">비밀번호 앞 2자리</label>
                        <input
                          type="password"
                          maxLength={2}
                          value={cardPassword}
                          onChange={(e) => setCardPassword(e.target.value.replace(/\D/g, ""))}
                          placeholder="••"
                          className="w-full bg-white border border-brand-light-gray rounded-xl px-4 py-2 text-xs text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-primary text-center"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "easy" && (
                  <div className="space-y-4">
                    <span className="text-xs font-semibold text-brand-dark block border-b border-brand-light-gray/60 pb-2">
                      간편 페이결제 모듈
                    </span>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setEasyProvider("kakao")}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                          easyProvider === "kakao"
                            ? "bg-[#FEE500] text-[#191919] border-transparent"
                            : "bg-white border-brand-light-gray text-brand-dark"
                        }`}
                      >
                        카카오페이
                      </button>
                      <button
                        type="button"
                        onClick={() => setEasyProvider("naver")}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                          easyProvider === "naver"
                            ? "bg-[#03C75A] text-white border-transparent"
                            : "bg-white border-brand-light-gray text-brand-dark"
                        }`}
                      >
                        네이버페이
                      </button>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-brand-dark block mb-1">페이 결제 비밀번호 (6자리)</label>
                      <input
                        type="password"
                        maxLength={6}
                        value={easyPin}
                        onChange={(e) => setEasyPin(e.target.value.replace(/\D/g, ""))}
                        placeholder="••••••"
                        className="w-full bg-white border border-brand-light-gray rounded-xl px-4 py-2 text-xs text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-primary text-center tracking-widest"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === "bank" && (
                  <div className="space-y-4">
                    <span className="text-xs font-semibold text-brand-dark block border-b border-brand-light-gray/60 pb-2">
                      무통장 입금 계좌 안내
                    </span>
                    <div className="flex gap-2">
                      {["kb", "shinhan", "woori"].map((bank) => {
                        const label = bank === "kb" ? "국민은행" : bank === "shinhan" ? "신한은행" : "우리은행";
                        return (
                          <button
                            key={bank}
                            type="button"
                            onClick={() => setSelectedBank(bank)}
                            className={`flex-1 py-1.5 text-[11px] font-semibold rounded-lg border transition-all ${
                              selectedBank === bank
                                ? "bg-brand-primary text-white border-transparent"
                                : "bg-white border-brand-light-gray text-brand-dark"
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                    <div className="bg-white p-3.5 rounded-xl border border-brand-light-gray/80 text-center space-y-1.5">
                      <span className="text-[11px] font-semibold text-brand-dark block">
                        입금 계좌번호
                      </span>
                      <strong className="text-xs sm:text-sm font-bold text-brand-accent block select-all">
                        {selectedBank === "kb"
                          ? "국민은행 483902-01-582930 (한코한코)"
                          : selectedBank === "shinhan"
                          ? "신한은행 110-384-902038 (한코한코)"
                          : "우리은행 1002-394-028302 (한코한코)"}
                      </strong>
                      <span className="text-[10px] text-brand-dark-muted font-light block">
                        (주문 완료 후 24시간 내 미입금 시 자동 주문 취소됩니다.)
                      </span>
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-brand-dark block mb-1">입금자명</label>
                      <input
                        type="text"
                        value={depositor}
                        onChange={(e) => setDepositor(e.target.value)}
                        placeholder="실제 입금자명을 입력하세요"
                        className="w-full bg-white border border-brand-light-gray rounded-xl px-4 py-2 text-xs text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-primary"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-brand-light p-5 rounded-2xl border border-brand-light-gray/60 space-y-3">
              <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">
                결제 요약
              </h4>
              <div className="flex justify-between text-xs text-brand-dark-muted font-light">
                <span>총 상품수량</span>
                <span className="font-semibold text-brand-dark">{totalQty}개</span>
              </div>
              <div className="flex justify-between text-xs text-brand-dark-muted font-light">
                <span>배송비</span>
                <span className="font-semibold text-brand-dark">
                  {shippingFee === 0 ? "무료" : `${shippingFee.toLocaleString()}원`}
                </span>
              </div>
              <div className="border-t border-brand-light-gray/80 pt-3 flex justify-between items-baseline">
                <span className="text-sm font-bold text-brand-dark">최종 결제금액</span>
                <span className="text-lg font-extrabold text-brand-accent">{totalStr}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-dark text-white font-bold py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-brand-primary hover:text-brand-dark transition-all shadow-md disabled:bg-brand-dark-muted/65 focus:outline-none"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> 가상 안전결제 모듈 구동 중...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5 text-brand-primary" /> {totalStr} 안전 결제하기
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
