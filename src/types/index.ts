// data/projects.json 의 links 항목에 대한 타입 정의
export interface Link {
  name: string; // 링크 이름 (예: GitHub, 구동영상)
  url: string;  // 연결될 URL
}

// data/projects.json 안의 개별 프로젝트 객체 타입 정의
export interface Project {
  id: string; // 고유 ID (영문 소문자로 자유롭게 작성)
  title: string; // 프로젝트명
  period: string; // 개발 기간
  type: string; // 분류 (모달 및 카드에 표시)
  organization: string; // 진행 기관 (예: 부산IT교육센터)
  environment: string[]; // 사용 기술 스택 배열
  teamSize: number; // 참여 인원 수
  backgroundAndSummary: string; // 개발 배경 및 주요 내용
  role: string[]; // 담당 역할 (리스트 형태로 모달에 출력됨)
  troubleshooting?: string[]; // (추가) 트러블슈팅 및 문제 해결 경험
  links: Link[]; // 관련 링크 배열
  presentationUrl?: string; // (추가) 프로젝트별 발표 자료 링크 (PDF 등)
  screenshots?: string[]; // (추가) PPT 핵심 장표 또는 기능 스크린샷 이미지 경로들
  lastUpdated?: string; // (추가) 최근 데이터/자료 업데이트 날짜
}

// data/skills.json 의 최상위 카테고리 항목 (예: Backend, Frontend)
export interface SkillCategory {
  category: string; // 카테고리 제목
  items: SkillItem[]; // 세부 스킬 스택 리스트
}

// 세부 스킬 스택에 대한 정의
export interface SkillItem {
  name: string; // 기술 이름 (예: JAVA)
  details: string[]; // 그 기술을 통해 할 수 있는 세부 내용들 (총알(Bullet) 리스트로 출력됨)
}
