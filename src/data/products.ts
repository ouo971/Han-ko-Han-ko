export interface Product {
  id: number;
  name: string;
  category: 'cone' | 'ball' | 'kit' | 'tools' | 'patterns';
  material: string;
  price: number;
  origPrice: number;
  discount: number;
  image: string;
  rating: number;
  reviews: number;
  isBest: boolean;
  isNew: boolean;
  isSale: boolean;
  colors: string[];
  colorHexes: string[];
  info: string;
  weight: string;
  needles: string;
  wash: string;
}

export const PRODUCTS: Product[] = [
  // ==========================================
  // CONE YARNS (Goodsil Lucky Cone Yarns)
  // ==========================================
  {
    id: 1,
    name: "[럭키콘사] BIZARRE 외국콘사 (420g)",
    category: "cone",
    material: "Viscose Blend (Spring/Summer/Autumn)",
    price: 24000,
    origPrice: 28000,
    discount: 14,
    image: "/assets/cone_yarn.png",
    rating: 4.8,
    reviews: 74,
    isBest: true,
    isNew: false,
    isSale: true,
    colors: ["로즈 핑크", "스윗 아쿠아", "오트밀 밀크", "안개 그레이"],
    colorHexes: ["#E5B2B8", "#70D6FF", "#E5D3C3", "#BCC6CC"],
    info: "굿실 럭키콘사 카테고리의 BIZARRE 외국 수입 콘사입니다. 비스코스 혼방 원사로 간절기에 입기 좋은 매끄럽고 부드러운 편물을 선사하며, 독특하고 고급스러운 직조 텍스처를 띱니다.",
    weight: "약 420g",
    needles: "대바늘 3.0mm ~ 3.5mm / 코바늘 4/0호",
    wash: "중성세제 울샴푸 미지근한 물 단독 손세탁"
  },
  {
    id: 2,
    name: "[럭키콘사] CHIC 외국콘사 (420g)",
    category: "cone",
    material: "Cotton Blend (Spring/Summer)",
    price: 26000,
    origPrice: 26000,
    discount: 0,
    image: "/assets/cone_dustyrose.png",
    rating: 4.7,
    reviews: 58,
    isBest: false,
    isNew: true,
    isSale: false,
    colors: ["더스티 로즈", "피스타치오", "크림 아이보리", "딥 초콜릿"],
    colorHexes: ["#DCAE96", "#93C572", "#FFFFF0", "#3D2314"],
    info: "세련되고 도시적인 질감의 CHIC 외국 콘사입니다. 봄과 여름 의류용으로 제작되어 통기성이 훌륭하며 보풀 날림을 차단한 매끈한 연사 공정이 돋보입니다.",
    weight: "약 420g",
    needles: "대바늘 3.0mm ~ 4.0mm / 코바늘 3/0호 ~ 5/0호",
    wash: "드라이클리닝 권장 / 손세탁"
  },
  {
    id: 11,
    name: "[럭키콘사] ALLEGRO 외국콘사 (420g)",
    category: "cone",
    material: "Linen Blend (Spring/Summer)",
    price: 25000,
    origPrice: 28000,
    discount: 10,
    image: "/assets/cone_oatmeal.png",
    rating: 4.9,
    reviews: 93,
    isBest: true,
    isNew: false,
    isSale: true,
    colors: ["라벤더 드림", "올리브 카키", "밀크 바닐라", "차콜 그레이"],
    colorHexes: ["#E6E6FA", "#808000", "#F9E8D2", "#36454F"],
    info: "쾌적하고 흐르는 듯한 드레이프성이 장점인 ALLEGRO 린넨 혼방 콘사입니다. 내추럴한 멋을 자아내며 가벼운 비치 카디건이나 숄을 뜨기에 아주 이상적인 실입니다.",
    weight: "약 420g",
    needles: "대바늘 2.5mm ~ 3.5mm / 코바늘 2/0호 ~ 4/0호",
    wash: "평평하게 그늘에서 건조 / 가벼운 찬물 단독 손세탁"
  },
  {
    id: 12,
    name: "[럭키콘사] BATISTA 1456 TINTO (420g)",
    category: "cone",
    material: "Premium Cotton 100% (Spring/Summer)",
    price: 28000,
    origPrice: 28000,
    discount: 0,
    image: "/assets/cone_pistachio.png",
    rating: 4.6,
    reviews: 41,
    isBest: false,
    isNew: true,
    isSale: false,
    colors: ["진달래 레드", "바다 블루", "버터 레몬", "미드나잇 블랙"],
    colorHexes: ["#C21E56", "#007791", "#FFF44F", "#111111"],
    info: "나염 결이 예술적인 최고급 면 100% 럭키콘사 BATISTA 1456 TINTO입니다. 피부 자극이 단 1%도 없어 예민한 피부용 이너나 어린이용 보닛을 뜨기에 가장 이상적입니다.",
    weight: "약 420g",
    needles: "대바늘 3.0mm / 코바늘 3/0호",
    wash: "세탁망 사용 울코스 물세탁 가능"
  },
  {
    id: 13,
    name: "[럭키콘사] WOLLY 캐시미어 함유 콘사 (400g)",
    category: "cone",
    material: "Cashmere Blend (Autumn/Winter)",
    price: 36000,
    origPrice: 40000,
    discount: 10,
    image: "/assets/cone_yarn.png",
    rating: 5.0,
    reviews: 128,
    isBest: true,
    isNew: true,
    isSale: true,
    colors: ["살구 코랄", "세이지 올리브", "스노우 화이트", "모카 브라운"],
    colorHexes: ["#FFCBA4", "#B2AC88", "#FDFBF7", "#7E5C46"],
    info: "캐시미어가 함유되어 고급스럽고 따뜻한 겨울용 WOLLY 콘사입니다. 두께 대비 가벼운 기모 가공 처리가 되어 포근하며 겨울 가디건이나 목도리 등으로 명품 짜임을 느끼게 해줍니다.",
    weight: "약 400g",
    needles: "대바늘 3.5mm ~ 4.5mm",
    wash: "드라이클리닝 필수"
  },

  // ==========================================
  // BALL YARNS (Sevy Yarns)
  // ==========================================
  {
    id: 3,
    name: "[세비] 하비울 Hobby Wool (50g)",
    category: "ball",
    material: "Wool 50% + Acrylic 50%",
    price: 6800,
    origPrice: 7500,
    discount: 9,
    image: "/assets/ball_yarn.png",
    rating: 4.8,
    reviews: 184,
    isBest: true,
    isNew: false,
    isSale: true,
    colors: ["딸기 핑크", "하늘 블루", "크림 오트밀", "스톤 그레이"],
    colorHexes: ["#FFB7C5", "#87CEEB", "#DCD0C0", "#8E9294"],
    info: "초보 뜨개러들 사이에서 입소문이 자자한 세비(Sevy)의 대표 입문용 울혼방 실 하비울입니다. 부드럽고 적당히 탄탄하며 실 갈라짐이 없어 대바늘 목도리, 귀도리, 장갑 등의 소품에 아주 제격입니다.",
    weight: "50g",
    needles: "대바늘 4.0mm ~ 5.0mm / 코바늘 6/0호",
    wash: "미지근한 물에 중성세제 손세탁 / 건조기 사용 절대 금지"
  },
  {
    id: 4,
    name: "[세비] 미스티 Misty 모헤어 (25g)",
    category: "ball",
    material: "Kid Mohair 60% + Polyamide 40%",
    price: 9000,
    origPrice: 9000,
    discount: 0,
    image: "/assets/ball_lavender.png",
    rating: 4.9,
    reviews: 72,
    isBest: false,
    isNew: true,
    isSale: false,
    colors: ["로즈 페탈", "민트 스윗", "바닐라 크림", "딥 퍼플"],
    colorHexes: ["#F4C2C2", "#AAF0D1", "#F9E8D2", "#4A0E4E"],
    info: "구름처럼 가볍고 환상적인 솜털 텍스처를 뽐내는 프리미엄 키드 모헤어 미스티입니다. 얇은 스카프를 단독으로 뜨거나 다른 기본 메리노 울 실과 겹쳐 잡고 뜰 때 깊은 품격을 더해줍니다.",
    weight: "25g",
    needles: "대바늘 3.5mm ~ 4.5mm",
    wash: "미온수 울샴푸 단독 손세탁"
  },
  {
    id: 5,
    name: "[세비] 올림푸스 모후 Olympus Mohu (40g)",
    category: "ball",
    material: "Supima Cotton Blend",
    price: 8800,
    origPrice: 8800,
    discount: 0,
    image: "/assets/ball_mint.png",
    rating: 4.7,
    reviews: 33,
    isBest: false,
    isNew: true,
    isSale: false,
    colors: ["라일락", "세이지 그린", "밀크 버터", "다크 차콜"],
    colorHexes: ["#C8A2C8", "#B2AC88", "#F3E5AB", "#333333"],
    info: "일본 올림푸스 사의 프리미엄 수피마 면 혼합사 모후(Mohu)입니다. 보드라운 벨벳 같은 질감에 면 특유의 쾌적함이 가미되어, 계절을 크게 타지 않는 내추럴 크로셰 니트나 에코백 뜨기에 추천합니다.",
    weight: "40g",
    needles: "코바늘 4/0호 ~ 5/0호",
    wash: "중성세제 단독 손세탁"
  },
  {
    id: 6,
    name: "[세비] 몬디알 슈퍼 트위드 Super Tweed (50g)",
    category: "ball",
    material: "Merino Wool 80% + Acrylic 20% (Tweed)",
    price: 11700,
    origPrice: 13000,
    discount: 10,
    image: "/assets/ball_yarn.png",
    rating: 5.0,
    reviews: 62,
    isBest: true,
    isNew: false,
    isSale: true,
    colors: ["와인 레트로", "그린 헤리티지", "오트밀 네프", "네이비 멜란지"],
    colorHexes: ["#58111A", "#1B4D3E", "#DCD0C0", "#0F2A4A"],
    info: "이탈리아 명가 몬디알(Mondial)의 최고급 트위드사입니다. 메리노 울 베이스에 형형색색의 트위드 알갱이가 조화롭게 박혀 있어 세련된 브리티시 감성의 꽈배기 스웨터를 뜰 때 최고의 깊이를 선사합니다.",
    weight: "50g",
    needles: "대바늘 3.5mm ~ 4.0mm",
    wash: "드라이클리닝 권장 / 손세탁"
  },
  {
    id: 7,
    name: "[세비] 베이비 알파카 코튼 (50g)",
    category: "ball",
    material: "Baby Alpaca Blend",
    price: 12000,
    origPrice: 12000,
    discount: 0,
    image: "/assets/ball_yarn.png",
    rating: 4.9,
    reviews: 49,
    isBest: false,
    isNew: false,
    isSale: false,
    colors: ["베이비 핑크", "민트 그린", "바닐라 코튼", "모카 브라운"],
    colorHexes: ["#F4C2C2", "#98FF98", "#FDF5E6", "#7E5C46"],
    info: "안데스 청정지대 알파카 솜털과 메리노 코튼을 정성스레 방적한 최고급 모사입니다. 캐시미어 못지않은 극도의 부드러움과 탄력을 겸비해 유아용 니트나 예민한 성인용 이너웨어 조끼에 안성맞춤입니다.",
    weight: "50g",
    needles: "대바늘 3.5mm ~ 4.0mm / 코바늘 5/0호",
    wash: "중성세제 울샴푸 가볍게 세탁"
  },

  // ==========================================
  // DIY KITS (2 Items)
  // ==========================================
  {
    id: 15,
    name: "[한코키트] 자도르 아란 스웨터 DIY 패키지",
    category: "kit",
    material: "Kit (Yarn + Pattern + Guide Video)",
    price: 62000,
    origPrice: 68000,
    discount: 8,
    image: "/assets/aran_sweater.png",
    rating: 4.9,
    reviews: 312,
    isBest: true,
    isNew: false,
    isSale: true,
    colors: ["크림 아이보리", "오트밀 샌드", "포레스트 올리브"],
    colorHexes: ["#FFFFF0", "#C6BAA4", "#2D5A27"],
    info: "클래식하고 도톰한 꽈배기 무늬가 돋보이는 웰메이드 아란 스웨터 패키지입니다. 굿실의 램스울 합사실 800g과 함께, 왕초보도 따라 할 수 있는 서술형 도안책, 그리고 각 파트별 튜토리얼 QR 영상 링크가 수록되어 성취감 높은 뜨개를 경험할 수 있습니다.",
    weight: "구성: 울사 800g + 종이 도안 + 가이드 영상 QR",
    needles: "대바늘 4.5mm & 5.0mm (바늘 및 꽈배기 바늘은 별도 구매)",
    wash: "편물 완성 후 첫 세탁은 드라이클리닝을 강력히 권장합니다."
  },
  {
    id: 16,
    name: "[한코키트] 그래니 스퀘어 숄더백 코바늘 패키지",
    category: "kit",
    material: "Kit (Yarn + Pattern + Guide Video)",
    price: 29000,
    origPrice: 29000,
    discount: 0,
    image: "/assets/granny_bag.png",
    rating: 4.8,
    reviews: 185,
    isBest: false,
    isNew: true,
    isSale: false,
    colors: ["믹스 카라멜 (베이지 톤)", "믹스 포레스트 (그린 톤)", "믹스 베리 (핑크 톤)"],
    colorHexes: ["#C19A6B", "#2F4F4F", "#E05A88"],
    info: "코바늘 기초 코스티치로 가볍게 시작하는 감성 네트로 숄더백입니다. 모티브를 여러 장 연결하여 가방 형태를 잡아나가는 구조로 코바늘 기법을 쉽고 재미있게 배우기 적합합니다. 친절한 전체 제작 영상 풀버전이 제공됩니다.",
    weight: "구성: 코튼혼방실 4볼 + 인조 가죽 라벨 + 종이 도안 + 풀동영상 강의",
    needles: "모사용 코바늘 6/0호 (별도 구매)",
    wash: "중성세제로 오염 부위만 부분 조심 손세탁"
  },

  // ==========================================
  // TOOLS (2 Items)
  // ==========================================
  {
    id: 21,
    name: "[바늘] 니트프로 심포니 우드 조립식 대바늘 세트",
    category: "tools",
    material: "Birch Wood",
    price: 92000,
    origPrice: 110000,
    discount: 16,
    image: "/assets/needles.png",
    rating: 5.0,
    reviews: 420,
    isBest: true,
    isNew: false,
    isSale: true,
    colors: ["심포니 우드 패키지"],
    colorHexes: ["#A0522D"],
    info: "세계적인 뜨개 명가 니트프로(KnitPro)의 조립식 목바늘 플래그십 세트입니다. 특유 of 다채로운 적층 자작나무 결이 고급스럽고, 실의 미끄러짐이 적당하여 초보자도 코를 빠뜨리지 않고 부드럽게 뜰 수 있습니다. 줄 꼬임 방지 스위블 케이블이 포함되어 있습니다.",
    weight: "구성: 바늘 팁 8쌍 (3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 7.0, 8.0mm), 케이블 4개, 스토퍼 8개, 조임키 4개, 투명 파우치",
    needles: "3.5mm ~ 8.0mm 조립형",
    wash: "수분에 약하므로 젖은 천이나 침수 보관을 피하고 전용 오일로 닦아 관리"
  },
  {
    id: 22,
    name: "[부자재] 골드 클래식 쪽가위 & 수제 스티치 마커 세트",
    category: "tools",
    material: "Brass / Acrylic",
    price: 12000,
    origPrice: 12000,
    discount: 0,
    image: "/assets/accessories.png",
    rating: 4.5,
    reviews: 92,
    isBest: false,
    isNew: true,
    isSale: false,
    colors: ["골드 클래식"],
    colorHexes: ["#FFD700"],
    info: "엔틱하고 우아한 골드 황동 가위와 손으로 직접 조립한 아기자기한 컬러 스티치 단수링(스티치 마커) 10종이 감성적인 미니 알루미늄 틴케이스에 들어 있는 세트입니다. 뜨개질하는 자리를 환하게 만들어주는 필수 악세사리입니다.",
    weight: "쪽가위 1개, 단수링 10개, 알루미늄 틴케이스 1개",
    needles: "단수링 내경: 대바늘 6.0mm까지 사용 가능",
    wash: "가위 날 부분 윤활유 관리 권장"
  },

  // ==========================================
  // PATTERNS (2 Items)
  // ==========================================
  {
    id: 25,
    name: "[도안] 베를린 리브 스카프 서술형 PDF 도안",
    category: "patterns",
    material: "Digital PDF Pattern",
    price: 6000,
    origPrice: 6000,
    discount: 0,
    image: "/assets/pattern_image.png",
    rating: 4.9,
    reviews: 298,
    isBest: true,
    isNew: false,
    isSale: false,
    colors: ["이메일 전송 (PDF)"],
    colorHexes: ["#FFFFFF"],
    info: "가을, 겨울 아우터 안에 슬림하고 멋스럽게 연출하는 세련된 스카프 도안입니다. 코줄임과 코늘림의 경사가 매끄럽게 흐르는 완성도 높은 짜임입니다. 입문자도 차분히 완성할 수 있도록 약식 동영상 클립 팁 링크가 포함되어 있습니다.",
    weight: "디지털 다운로드 파일 (PDF 5페이지 분량)",
    needles: "대바늘 3.5mm (줄바늘 또는 장갑바늘)",
    wash: "무형물 콘텐츠 특성상 메일 발송 후에는 환불이 불가합니다."
  },
  {
    id: 26,
    name: "[도안] 오슬로 꼬임 케이블 카디건 PDF 도안",
    category: "patterns",
    material: "Digital PDF Pattern",
    price: 9000,
    origPrice: 10000,
    discount: 10,
    image: "/assets/pattern_image.png",
    rating: 4.8,
    reviews: 74,
    isBest: false,
    isNew: true,
    isSale: true,
    colors: ["이메일 전송 (PDF)"],
    colorHexes: ["#FFFFFF"],
    info: "탑다운(목 둘레부터 아래로 뜨는 방식) 기법으로 내려뜨는 내추럴 핏 꽈배기 카디건 도안입니다. 몸판 중간과 소매 라인에 굵은 케이블이 들어가 여리여리한 실루엣을 자아냅니다. 서술형 가이드와 상세 제도 도안이 수록되어 있습니다.",
    weight: "디지털 다운로드 파일 (PDF 12페이지 분량)",
    needles: "대바늘 4.5mm (고무단용), 5.0mm (몸판 메인용)",
    wash: "무형물 콘텐츠 특성상 메일 발송 후에는 환불이 불가합니다."
  }
];

export const getYarnImage = (category: string, colorName: string, defaultImage: string): string => {
  if (category === "cone") {
    const name = colorName.toLowerCase();
    if (
      name.includes("핑크") ||
      name.includes("로즈") ||
      name.includes("쿼츠") ||
      name.includes("모브") ||
      name.includes("레드") ||
      name.includes("오렌지") ||
      name.includes("탠저린") ||
      name.includes("라벤더") ||
      name.includes("퍼플") ||
      name.includes("보라") ||
      name.includes("와인")
    ) {
      return "/assets/cone_dustyrose.png";
    }
    if (
      name.includes("그린") ||
      name.includes("민트") ||
      name.includes("피스타치오") ||
      name.includes("올리브") ||
      name.includes("카키") ||
      name.includes("세이지") ||
      name.includes("블러썸") ||
      name.includes("아쿠아") ||
      name.includes("블루") ||
      name.includes("스카이") ||
      name.includes("소라") ||
      name.includes("바다")
    ) {
      return "/assets/cone_pistachio.png";
    }
    if (
      name.includes("아이보리") ||
      name.includes("크림") ||
      name.includes("화이트") ||
      name.includes("오트밀") ||
      name.includes("연유") ||
      name.includes("레몬") ||
      name.includes("옐로우") ||
      name.includes("버터") ||
      name.includes("밀크")
    ) {
      return "/assets/cone_oatmeal.png";
    }
    return "/assets/cone_yarn.png";
  } else if (category === "ball") {
    const name = colorName.toLowerCase();
    if (
      name.includes("핑크") ||
      name.includes("로즈") ||
      name.includes("페탈") ||
      name.includes("라벤더") ||
      name.includes("퍼플") ||
      name.includes("라일락") ||
      name.includes("체리") ||
      name.includes("피치") ||
      name.includes("애프리콧") ||
      name.includes("버블검") ||
      name.includes("와인") ||
      name.includes("레드") ||
      name.includes("포그")
    ) {
      return "/assets/ball_lavender.png";
    }
    if (
      name.includes("민트") ||
      name.includes("그린") ||
      name.includes("올리브") ||
      name.includes("카키") ||
      name.includes("세이지") ||
      name.includes("라임") ||
      name.includes("스윗") ||
      name.includes("아쿠아") ||
      name.includes("소다")
    ) {
      return "/assets/ball_mint.png";
    }
    return "/assets/ball_yarn.png";
  }
  return defaultImage;
};
