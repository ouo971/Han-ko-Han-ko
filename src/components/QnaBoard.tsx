"use client";

import React, { useState, useEffect } from "react";
import { Lock, Unlock, CheckCircle, Clock, Edit3, ChevronDown, ChevronUp, CornerDownRight } from "lucide-react";

interface QnaItem {
  id: number;
  category: "product" | "shipping" | "payment" | "other";
  title: string;
  author: string;
  content: string;
  isSecret: boolean;
  secretPass?: string;
  date: string;
  status: "pending" | "answered";
  answer?: string;
}

interface QnaBoardProps {
  currentUser: { name: string; email: string } | null;
}

export const QnaBoard: React.FC<QnaBoardProps> = ({ currentUser }) => {
  const [qnaList, setQnaList] = useState<QnaItem[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  
  // Form States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [category, setCategory] = useState<QnaItem["category"]>("product");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSecret, setIsSecret] = useState(false);
  const [secretPass, setSecretPass] = useState("");
  const [authorName, setAuthorName] = useState("");

  // Pre-load default questions
  useEffect(() => {
    const storedQna = localStorage.getItem("hanko_qna");
    if (storedQna) {
      setQnaList(JSON.parse(storedQna));
    } else {
      const defaultQna: QnaItem[] = [
        {
          id: 1,
          category: "product",
          title: "하비울 실 3볼로 머플러를 완성할 수 있을까요?",
          author: "뜨개요정",
          content: "하비울 실을 사용해서 너비 18cm 정도의 기본 대바늘 겉뜨기 머플러를 뜨려고 합니다. 3볼이면 성인 남성용 길이로 충분할까요?",
          isSecret: false,
          date: "2026-06-30",
          status: "answered",
          answer: "안녕하세요 고객님! 한코한코 상담원입니다. 🧶\n하비울 실 3볼을 사용하시면 너비 18cm 기준 약 150cm~160cm 내외의 기본 겉뜨기 머플러를 충분히 뜨실 수 있습니다. 손땀이 느슨하시거나 폭을 더 넓히고 싶으신 경우 4볼을 권장해 드립니다."
        },
        {
          id: 2,
          category: "shipping",
          title: "배송지를 잘못 입력했는데 변경 가능한가요?",
          author: "민트사랑",
          content: "조금 전에 아란 스웨터 DIY 키트를 주문했는데 배송지 동 호수를 빼놓고 결제했네요ㅠㅠ 동 호수 추가 가능할까요?",
          isSecret: true,
          secretPass: "1234",
          date: "2026-06-29",
          status: "answered",
          answer: "안녕하세요 고객님! 한코한코입니다.\n주문번호를 조회해 본 결과 아직 배송지시 전 단계로 확인되어 말씀 주신 주소지로 정상 변경 처리 완료했습니다. 안심하시고 예쁜 뜨개 준비해 주세요. 감사합니다!"
        },
        {
          id: 3,
          category: "product",
          title: "WOLLY 콘사 실 두께가 궁금합니다.",
          author: "콘사입문",
          content: "WOLLY 캐시미어 콘사를 합사해서 카디건을 뜨고 싶은데 실이 대략 몇 합인가요? 바늘 4.5mm 사용 가능한가요?",
          isSecret: false,
          date: "2026-06-28",
          status: "answered",
          answer: "안녕하세요 고객님!\nWOLLY 콘사는 약 6합 굵기로 감겨 있어 대바늘 3.5mm~4.0mm 단독 작업에 가장 어울립니다. 만약 4.5mm 바늘을 사용하고 싶으시다면, 모헤어 실이나 얇은 배색사를 1합 더 합사하여 작업하시는 것을 적극 권장합니다. 🧶"
        },
        {
          id: 4,
          category: "payment",
          title: "무통장 입금 확인은 언제 되나요?",
          author: "송금완료",
          content: "10분 전에 국민은행 한코한코 계좌로 입금 완료했는데 결제완료 상태로 아직 안 변한 것 같습니다.",
          isSecret: false,
          date: "2026-06-28",
          status: "answered",
          answer: "안녕하세요 고객님!\n무통장 입금 건의 경우 매시간 정각에 은행 시스템과 자동 대조 연동을 거쳐 확인됩니다. 현재 고객님의 입금이 무사히 대조되어 '결제완료' 처리 완료되었습니다. 택배 발송 후 송장 번호를 안내해 드리겠습니다."
        }
      ];
      setQnaList(defaultQna);
      localStorage.setItem("hanko_qna", JSON.stringify(defaultQna));
    }
  }, []);

  const saveQna = (updated: QnaItem[]) => {
    setQnaList(updated);
    localStorage.setItem("hanko_qna", JSON.stringify(updated));
  };

  const handleToggleExpand = (item: QnaItem) => {
    if (expandedId === item.id) {
      setExpandedId(null);
      return;
    }

    if (item.isSecret) {
      const pass = prompt("비밀번호를 입력하세요 (모의 테스트 기본 패스워드: 1234)");
      if (pass === item.secretPass || pass === "1234") {
        setExpandedId(item.id);
      } else if (pass !== null) {
        alert("비밀번호가 일치하지 않습니다.");
      }
    } else {
      setExpandedId(item.id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      alert("제목과 내용을 입력해 주세요.");
      return;
    }

    const newAuthor = currentUser ? currentUser.name : (authorName || "비회원");
    
    const newItem: QnaItem = {
      id: Date.now(),
      category,
      title,
      author: newAuthor,
      content,
      isSecret,
      secretPass: isSecret ? (secretPass || "1234") : undefined,
      date: new Date().toISOString().slice(0, 10),
      status: "pending",
    };

    const updated = [newItem, ...qnaList];
    saveQna(updated);

    // Reset Form
    setTitle("");
    setContent("");
    setIsSecret(false);
    setSecretPass("");
    setAuthorName("");
    setIsFormOpen(false);
    alert("문의사항이 성공적으로 등록되었습니다. 24시간 내에 가상 답변이 등록됩니다! 🧶");
  };

  const getCategoryLabel = (cat: QnaItem["category"]) => {
    switch (cat) {
      case "product": return "상품 문의";
      case "shipping": return "배송 문의";
      case "payment": return "결제/취소";
      case "other": return "일반 문의";
    }
  };

  const getCategoryColor = (cat: QnaItem["category"]) => {
    switch (cat) {
      case "product": return "bg-blue-50 text-blue-600 border-blue-200";
      case "shipping": return "bg-orange-50 text-orange-600 border-orange-200";
      case "payment": return "bg-purple-50 text-purple-600 border-purple-200";
      case "other": return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-brand-light-gray pb-6 mb-8 gap-4">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark">Q&A 문의 게시판</h2>
          <p className="text-xs sm:text-sm text-brand-dark-muted font-light mt-1">
            한코한코의 상품, 배송, 결제에 관한 궁금한 사항을 자유롭게 문의해 주세요.
          </p>
        </div>
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="bg-brand-dark text-white text-xs sm:text-sm font-semibold px-5 py-3 rounded-full flex items-center gap-2 hover:bg-brand-primary hover:text-brand-dark transition-all shadow-md focus:outline-none shrink-0"
        >
          <Edit3 className="w-4 h-4" /> 문의 글쓰기
        </button>
      </div>

      {/* Inquiry Form Accordion */}
      {isFormOpen && (
        <div className="bg-brand-light/35 border border-brand-light-gray/60 rounded-3xl p-6 mb-8 animate-fade-in-up">
          <h3 className="text-sm font-bold text-brand-dark mb-4 flex items-center gap-1.5">
            <Edit3 className="w-4.5 h-4.5 text-brand-primary" /> 신규 문의사항 작성
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-brand-dark block mb-1.5">문의 유형</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full bg-white border border-brand-light-gray rounded-xl px-4 py-2.5 text-xs text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-primary"
                >
                  <option value="product">상품 문의</option>
                  <option value="shipping">배송 문의</option>
                  <option value="payment">결제/취소</option>
                  <option value="other">일반 문의</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-brand-dark block mb-1.5">작성자명</label>
                <input
                  type="text"
                  value={currentUser ? currentUser.name : authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  disabled={!!currentUser}
                  placeholder={currentUser ? currentUser.name : "작성자명 입력"}
                  className="w-full bg-white disabled:bg-gray-100 border border-brand-light-gray rounded-xl px-4 py-2.5 text-xs text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-primary"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-brand-dark block mb-1.5">문의 제목</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="간략하고 명확한 제목을 기재해 주세요"
                className="w-full bg-white border border-brand-light-gray rounded-xl px-4 py-2.5 text-xs text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-primary"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-brand-dark block mb-1.5">문의 내용</label>
              <textarea
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="문의하실 구체적인 내용을 작성해 주세요."
                className="w-full bg-white border border-brand-light-gray rounded-xl px-4 py-2.5 text-xs text-brand-dark focus:outline-none focus:ring-1 focus:ring-brand-primary resize-none"
                required
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-brand-light-gray/60">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="secret-chk"
                  checked={isSecret}
                  onChange={(e) => setIsSecret(e.target.checked)}
                  className="w-4 h-4 accent-brand-primary"
                />
                <label htmlFor="secret-chk" className="text-xs font-semibold text-brand-dark cursor-pointer flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-brand-dark-muted" /> 비밀글로 등록하기
                </label>
              </div>

              {isSecret && (
                <div className="flex items-center gap-2">
                  <label className="text-[11px] font-bold text-brand-dark whitespace-nowrap">비밀번호</label>
                  <input
                    type="password"
                    maxLength={4}
                    value={secretPass}
                    onChange={(e) => setSecretPass(e.target.value.replace(/\D/g, ""))}
                    placeholder="4자리 숫자"
                    className="w-28 bg-brand-light border border-brand-light-gray rounded-lg px-2.5 py-1 text-xs text-brand-dark focus:outline-none"
                    required
                  />
                </div>
              )}
            </div>

            <div className="flex gap-3 justify-end pt-2">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-5 py-2.5 text-xs font-semibold rounded-full border border-brand-light-gray text-brand-dark hover:bg-brand-light transition-colors"
              >
                작성 취소
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-xs font-semibold rounded-full bg-brand-primary text-brand-dark hover:bg-brand-primary-hover transition-colors shadow-sm"
              >
                문의 등록하기
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Q&A List Container */}
      <div className="border border-brand-light-gray rounded-3xl overflow-hidden bg-white shadow-sm">
        {qnaList.length === 0 ? (
          <div className="p-12 text-center text-xs sm:text-sm text-brand-dark-muted font-light">
            등록된 Q&A 문의글이 없습니다.
          </div>
        ) : (
          <div className="divide-y divide-brand-light-gray">
            {qnaList.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <div key={item.id} className="transition-colors hover:bg-brand-light/10">
                  {/* List Item Row */}
                  <div
                    onClick={() => handleToggleExpand(item)}
                    className="p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getCategoryColor(item.category)} shrink-0`}>
                        {getCategoryLabel(item.category)}
                      </span>
                      <h4 className="text-xs sm:text-sm font-semibold text-brand-dark truncate flex items-center gap-1.5 min-w-0">
                        {item.isSecret && <Lock className="w-3.5 h-3.5 text-brand-dark-muted shrink-0" />}
                        <span className="truncate">{item.title}</span>
                      </h4>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right hidden sm:block">
                        <span className="text-[10px] font-semibold text-brand-dark-muted block">{item.author}</span>
                        <span className="text-[9px] text-brand-dark-muted/60 font-light block">{item.date}</span>
                      </div>
                      
                      {/* Answer Status Badge */}
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                        item.status === "answered"
                          ? "bg-green-50 text-green-600 border border-green-200"
                          : "bg-orange-50 text-orange-600 border border-orange-200"
                      }`}>
                        {item.status === "answered" ? (
                          <>
                            <CheckCircle className="w-3 h-3" /> 답변 완료
                          </>
                        ) : (
                          <>
                            <Clock className="w-3 h-3" /> 답변 대기
                          </>
                        )}
                      </span>

                      {isExpanded ? <ChevronUp className="w-4 h-4 text-brand-dark/50" /> : <ChevronDown className="w-4 h-4 text-brand-dark/50" />}
                    </div>
                  </div>

                  {/* Expanded Content Area */}
                  {isExpanded && (
                    <div className="px-5 pb-6 pt-2 bg-brand-light/10 border-t border-brand-light-gray/40 space-y-4 animate-fade-in">
                      {/* Mobile Author Info */}
                      <div className="sm:hidden flex justify-between text-[10px] text-brand-dark-muted pb-2 border-b border-brand-light-gray/45">
                        <span>작성자: {item.author}</span>
                        <span>작성일: {item.date}</span>
                      </div>

                      {/* Question Content */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-brand-primary block uppercase">Q. 문의 내용</span>
                        <p className="text-xs sm:text-sm text-brand-dark whitespace-pre-wrap leading-relaxed bg-white p-4 rounded-2xl border border-brand-light-gray/45">
                          {item.content}
                        </p>
                      </div>

                      {/* Answer Content */}
                      {item.status === "answered" && item.answer && (
                        <div className="space-y-1.5 pl-4 sm:pl-6 border-l-2 border-brand-primary/60">
                          <span className="text-[10px] font-bold text-brand-accent flex items-center gap-1">
                            <CornerDownRight className="w-3.5 h-3.5" /> A. 한코한코 공식 답변
                          </span>
                          <p className="text-xs sm:text-sm text-brand-dark whitespace-pre-wrap leading-relaxed bg-brand-secondary/10 p-4 rounded-2xl border border-brand-primary/10">
                            {item.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
