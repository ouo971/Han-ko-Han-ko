"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Fireworks } from "./Fireworks";

interface SuccessOverlayProps {
  isOpen: boolean;
  orderId: string;
  finalPrice: string;
  address: string;
  onConfirm: () => void;
}

export const SuccessOverlay: React.FC<SuccessOverlayProps> = ({
  isOpen,
  orderId,
  finalPrice,
  address,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
      {/* Fireworks canvas layer inside the overlay */}
      <Fireworks active={isOpen} />

      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#3d3227]/75 backdrop-blur-md transition-opacity" />

      {/* Ticket Box */}
      <div className="relative bg-white rounded-3xl w-full max-w-md shadow-2xl z-10 border-2 border-brand-primary p-8 text-center animate-fade-in-up flex flex-col items-center">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center text-brand-success mb-5">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        {/* Headings */}
        <h3 className="font-serif text-2xl font-bold text-brand-dark mb-2">
          주문이 완료되었습니다!
        </h3>
        <p className="text-xs text-brand-dark-muted font-light mb-6">
          한코한코 매장을 찾아주셔서 감사드립니다.
        </p>

        {/* Receipt Ticket Details */}
        <div className="w-full bg-brand-light rounded-2xl border border-brand-light-gray p-5 mb-6 text-left text-sm space-y-3 relative overflow-hidden">
          {/* Ticket border effect */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-[#3d3227]/75 rounded-r-full -ml-1.5" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-6 bg-[#3d3227]/75 rounded-l-full -mr-1.5" />

          <div className="flex justify-between items-center text-xs">
            <span className="text-brand-dark-muted font-light">주문 번호</span>
            <strong className="text-brand-dark font-bold tracking-wide">{orderId}</strong>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-brand-dark-muted font-light">결제 금액</span>
            <strong className="text-brand-accent font-extrabold">{finalPrice}</strong>
          </div>
          <div className="flex justify-between items-start gap-4 pt-2 border-t border-brand-light-gray/80">
            <span className="text-brand-dark-muted font-light flex-shrink-0">배송지</span>
            <span className="text-brand-dark text-xs text-right font-medium line-clamp-2" title={address}>
              {address}
            </span>
          </div>
        </div>

        {/* Small Helper Message */}
        <p className="text-xs text-brand-primary font-semibold mb-6">
          한코한코의 정성을 담은 포장으로 곧 발송됩니다. 🧶
        </p>

        {/* Confirm Button */}
        <button
          onClick={onConfirm}
          className="w-full bg-brand-primary hover:bg-brand-primary-hover text-brand-dark font-bold py-3.5 rounded-full transition-all shadow-md focus:outline-none"
        >
          확인
        </button>
      </div>
    </div>
  );
};
