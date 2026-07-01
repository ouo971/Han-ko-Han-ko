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
  // CONE YARNS (5 Curated Items)
  // ==========================================
  {
    id: 1,
    name: "[굿실] 그리스 Grith 프리미엄 램스울 콘사 (1kg)",
    category: "cone",
    material: "Lambswool 100%",
    price: 38000,
    origPrice: 42000,
    discount: 10,
    image: "/assets/cone_oatmeal.png",
    rating: 4.8,
    reviews: 142,
    isBest: true,
    isNew: false,
    isSale: true,
    colors: ["오트밀 밀크", "피스타치오 그린", "더스티 로즈", "안개 그레이"],
    colorHexes: ["#E5D3C3", "#93C572", "#DCAE96", "#BCC6CC"],
    info: "굿실의 베스트셀러 대표 램스울 콘사 그리스(Grith)입니다. 가장 대중적인 6합 굵기로 제작되어 가디건, 풀오버 니트, 겨울 모자 등 의류와 소품 모두에 완벽하게 어울립니다. 대용량 콘 포장으로 이음새 없는 깔끔한 대작을 완성할 수 있습니다.",
    weight: "약 1000g (실 안쪽 지관 무게 포함)",
    needles: "대바늘 3.5mm ~ 4.5mm / 코바늘 5/0호 ~ 6/0호",
    wash: "드라이클리닝 권장 / 울샴푸로 30도 이하 미지근한 물에 단독 손세탁"
  },
  {
    id: 2,
    name: "[굿실] 대용량 천연마 삼베 콘사 (420g)",
    category: "cone",
    material: "Natural Hemp 100%",
    price: 22000,
    origPrice: 22000,
    discount: 0,
    image: "/assets/cone_pistachio.png",
    rating: 4.6,
    reviews: 88,
    isBest: false,
    isNew: true,
    isSale: false,
    colors: ["내추럴 린넨", "세이지 그린", "밤하늘 네이비"],
    colorHexes: ["#E2D5C3", "#B2AC88", "#1A2E40"],
    info: "천연 삼베 100% 원사로 제작된 친환경 대용량 콘사입니다. 삼베 특유의 까슬까슬하고 시원한 텍스처로 물 빠짐이 좋고 건조가 빨라 친환경 주방 수세미, 샤워 타올, 매트 등을 뜨기에 완벽합니다.",
    weight: "약 420g",
    needles: "대바늘 3.0mm ~ 3.5mm / 코바늘 3/0호 ~ 4/0호",
    wash: "일반 세탁 가능 / 그늘에 평평하게 건조"
  },
  {
    id: 11,
    name: "[굿실] 캐시미어 블렌딩 모헤어 콘사 (420g)",
    category: "cone",
    material: "Kid Mohair 40% + Wool 40% + Nylon 20%",
    price: 49000,
    origPrice: 49000,
    discount: 0,
    image: "/assets/cone_yarn.png",
    rating: 4.9,
    reviews: 104,
    isBest: true,
    isNew: true,
    isSale: false,
    colors: ["안개 그레이", "로즈 쿼츠", "민트 블러썸", "미드나잇 블랙"],
    colorHexes: ["#BCC6CC", "#F7CAC9", "#AAF0D1", "#111111"],
    info: "천연 키드 모헤어와 프리미엄 울을 블렌딩한 하이엔드 콘사입니다. 하이엔드 방적공법을 거쳐 모헤어 특유의 털 날림을 최소화하고 몽환적인 솜털 광택만을 극대화했습니다. 피부 자극이 거의 없어 바로 입는 옷을 뜨기에 좋습니다.",
    weight: "약 420g",
    needles: "대바늘 3.0mm ~ 4.0mm",
    wash: "드라이클리닝 권장 / 울샴푸 가벼운 단독 손세탁"
  },
  {
    id: 12,
    name: "[굿실] 카부램 KABU-Lamb 울 콘사 (1kg)",
    category: "cone",
    material: "Lambswool 80% + Nylon 20%",
    price: 38000,
    origPrice: 42000,
    discount: 10,
    image: "/assets/cone_dustyrose.png",
    rating: 4.7,
    reviews: 45,
    isBest: false,
    isNew: false,
    isSale: true,
    colors: ["더스티 로즈", "라일락 퍼플", "모카 브라운", "머스타드 골드"],
    colorHexes: ["#DCAE96", "#C8A2C8", "#7E5C46", "#FFDB58"],
    info: "부드러운 램스울 합사에 탄탄한 나일론을 연사해 내구성을 강화한 카부램 라인업입니다. 기모감이 부드럽게 올라와 겨울철 머플러, 배색 장갑, 오버핏 스웨터 등을 뜨기에 좋습니다.",
    weight: "약 1000g (실 안쪽 지관 무게 포함)",
    needles: "대바늘 3.5mm ~ 4.5mm / 코바늘 5/0호 ~ 6/0호",
    wash: "울샴푸 미지근한 물에 단독 손세탁"
  },
  {
    id: 13,
    name: "[굿실] 에어 메리노 울 콘사 (700g)",
    category: "cone",
    material: "Extra Fine Merino Wool 100%",
    price: 42000,
    origPrice: 47000,
    discount: 10,
    image: "/assets/cone_oatmeal.png",
    rating: 4.9,
    reviews: 39,
    isBest: false,
    isNew: true,
    isSale: true,
    colors: ["바닐라 크림", "버터 옐로우", "캐롯 오렌지", "라벤더 드림"],
    colorHexes: ["#F9E8D2", "#FFFDd0", "#ED9121", "#E6E6FA"],
    info: "공기층을 함유하도록 특수 제작된 최고급 메리노 울 100% 특수 콘사입니다. 편물을 짰을 때 압도적으로 푹신하며, 가벼운 중량 대비 극강의 보온성과 원사 탄력 복원력을 자랑합니다.",
    weight: "약 700g",
    needles: "대바늘 4.5mm ~ 5.5mm",
    wash: "울샴푸 30도 이하 미지근한 물 세탁"
  },

  // ==========================================
  // BALL YARNS (5 Curated Items)
  // ==========================================
  {
    id: 3,
    name: "[굿실] 서프라이즈코튼 SupriseCotton (5볼 세트)",
    category: "ball",
    material: "Organic Cotton 100%",
    price: 18000,
    origPrice: 20000,
    discount: 10,
    image: "/assets/ball_lavender.png",
    rating: 4.9,
    reviews: 210,
    isBest: true,
    isNew: false,
    isSale: true,
    colors: ["라벤더 포그", "소프트 핑크", "진달래 핑크", "세이지 그린", "캐롯 오렌지"],
    colorHexes: ["#D2C4D9", "#FFB7C5", "#E05A88", "#B2AC88", "#ED9121"],
    info: "국제 유기농 인증(OCS)을 획득한 굿실의 시그니처 멜란지 코튼 볼실 세트입니다. 은은하게 섞인 멜란지 파스텔 컬러 톤이 사랑스럽습니다. 자극 없이 부드러워 티코스터, 인형 옷, 네트백, 유아용 소품 등을 뜨기에 최적입니다.",
    weight: "50g * 5개입 (총 250g)",
    needles: "대바늘 2.5mm ~ 3.0mm / 코바늘 4/0호 ~ 5/0호",
    wash: "세탁망에 넣어 울코스 단독 세탁 가능 / 건조기 사용 불가"
  },
  {
    id: 4,
    name: "[굿실] 램스타미디움 LambstarMedium (70g)",
    category: "ball",
    material: "Superwash Wool 80% + Acrylic 20%",
    price: 8550,
    origPrice: 9500,
    discount: 10,
    image: "/assets/ball_mint.png",
    rating: 4.9,
    reviews: 112,
    isBest: true,
    isNew: false,
    isSale: true,
    colors: ["피치 멜론", "민트 그린", "머스타드", "코발트 블루", "베이비 핑크"],
    colorHexes: ["#FFDAB9", "#98FF98", "#FFDB58", "#0047AB", "#F4C2C2"],
    info: "세탁기 사용이 가능한 슈퍼워시 가공이 적용되어 실용성을 극대화한 램스타 미디움 사입니다. 보온성이 훌륭하고 세탁 관리가 매우 쉬워 데일리 웨어, 아기 옷, 겨울 목도리를 뜨기에 최고의 효율을 가집니다.",
    weight: "약 70g",
    needles: "대바늘 4.0mm ~ 4.5mm / 코바늘 6/0호",
    wash: "세탁망 사용 울코스 기계 세탁 가능"
  },
  {
    id: 5,
    name: "[굿실] 빅플레인페이퍼얀 [종이실] (150g)",
    category: "ball",
    material: "Wood Pulp Paper 100%",
    price: 11000,
    origPrice: 11000,
    discount: 0,
    image: "/assets/ball_yarn.png",
    rating: 4.6,
    reviews: 35,
    isBest: false,
    isNew: true,
    isSale: false,
    colors: ["내추럴 크래프트", "코코아", "밤하늘 네이비", "라임 그린", "진흙 테라코타"],
    colorHexes: ["#D2B48C", "#5C4033", "#1A2E40", "#32CD32", "#C26D55"],
    info: "천연 침엽수 펄프로 얇고 균일하게 가공한 빅플레인 종이실입니다. 가볍고 빳빳하여 형태 유지가 훌륭하므로 여름 파나마햇 모자, 비치백, 테이블 매트 등을 뜨기에 제격입니다.",
    weight: "약 150g",
    needles: "코바늘 5/0호 ~ 6/0호",
    wash: "침수 세탁 금지 / 부분 오염 발생 시 물티슈로 톡톡 닦아내기"
  },
  {
    id: 6,
    name: "[굿실] 퐁퐁 소프트 키드 모헤어 볼실 (25g)",
    category: "ball",
    material: "Kid Mohair 70% + Silk 30%",
    price: 9500,
    origPrice: 9500,
    discount: 0,
    image: "/assets/ball_lavender.png",
    rating: 4.8,
    reviews: 15,
    isBest: false,
    isNew: true,
    isSale: false,
    colors: ["로즈 페탈", "라일락", "애프리콧 피치", "민트 스윗", "스모키 베이지"],
    colorHexes: ["#F4C2C2", "#C8A2C8", "#FBCEB1", "#AAF0D1", "#B8A99A"],
    info: "이탈리아 최고급 키드 모헤어로 가공된 고급 모사입니다. 깃털처럼 가벼운 실크 심지에 몽환적인 솜털 기모가 감싸고 있어, 단독 레이스 머플러를 뜨거나 다른 원사와 배색 매치하기에 아주 적합합니다.",
    weight: "25g",
    needles: "대바늘 3.0mm ~ 5.0mm",
    wash: "드라이클리닝 필수 / 단독 손세탁"
  },
  {
    id: 7,
    name: "[굿실] 프리미엄 소프트 알파카 볼실 (50g)",
    category: "ball",
    material: "Baby Alpaca 80% + Merino Wool 20%",
    price: 12000,
    origPrice: 12000,
    discount: 0,
    image: "/assets/ball_yarn.png",
    rating: 4.9,
    reviews: 58,
    isBest: true,
    isNew: true,
    isSale: false,
    colors: ["오트밀 샌드", "모카 브라운", "어두운 목탄", "파스텔 핑크", "라벤더 드림"],
    colorHexes: ["#C6BAA4", "#7E5C46", "#3A3B3C", "#FFD1DC", "#E6E6FA"],
    info: "남미 안데스산맥의 최고급 베이비 알파카를 다량 함유한 프리미엄 볼실입니다. 캐시미어급 보드라움과 뛰어난 보온성으로 찬 겨울철 스웨터나 가디건을 뜨기에 적격입니다.",
    weight: "50g",
    needles: "대바늘 3.5mm ~ 4.0mm / 코바늘 5/0호",
    wash: "중성세제 미온수 단독 손세탁 / 평평하게 건조"
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
    info: "세계적인 뜨개 명가 니트프로(KnitPro)의 조립식 목바늘 플래그십 세트입니다. 특유의 다채로운 적층 자작나무 결이 고급스럽고, 실의 미끄러짐이 적당하여 초보자도 코를 빠뜨리지 않고 부드럽게 뜰 수 있습니다. 줄 꼬임 방지 스위블 케이블이 포함되어 있습니다.",
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
