const images = [
  'totoro.jpeg',
  'cat.jpg',
  'haul.jpg',
  'sen.jpg',
  'ponyo.jpg',
  'laputa.jpg'
];

const gif = [
  '토토로-요가.gif',
  '흰 gif.gif',
  '하루 GIF.gif',
  '보우 gif.gif',
  '포뇨 GIF 1.gif',
  '룬 GIF.gif'
]

const imageLinks = [
  'https://tngodj.github.io/Totoro/', // '1.jpg'에 연결된 링크
  'https://tngodj.github.io/Cat/', // '7.jpg'에 연결된 링크
  'https://tngodj.github.io/Haul/', // '3.jpeg'에 연결된 링크
  'https://tngodj.github.io/Sen-Chihiro/', // '4.jpg'에 연결된 링크
  'https://tngodj.github.io/Ponyo/',  // '5.jpg'에 연결된 링크
  'https://tngodj.github.io/Laputa/' // '6.jpg'에 연결된 링크
];

let currentIndex = 0;
const middleImage = document.getElementById('middleImage');
const bottomgif = document.getElementById('bottomgif');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');


// const clickSound = new Audio('cllick.m4a'); // 효과음 파일 경로

// 이미지 업데이트 함수
function updateImage() {
  middleImage.style.opacity = 0;  // 페이드 아웃 효과
  setTimeout(() => {
      middleImage.src = images[currentIndex];
      middleImage.style.opacity = 1;  // 페이드 인 효과
  }, 200);  // 0.2초 후에 이미지 전환
}

function updateGif() {
  middleImage.style.opacity = 0;  // 페이드 아웃 효과
  setTimeout(() => {
      bottomgif.src = images[currentIndex];
      bottomgif.style.opacity = 1;  // 페이드 인 효과
  }, 200);  // 0.2초 후에 이미지 전환
}

// 사운드 재생 함수
function playClickSound() {
  clickSound.currentTime = 0;  // 재생 위치 초기화
  clickSound.play();
}

// 이전 이미지로 이동
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
  updateImage();
  playClickSound();
});

// 다음 이미지로 이동
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
  updateImage();
  playClickSound();
});
// 이미지 클릭 시 새로운 페이지로 이동
middleImage.addEventListener('click', () => {
  window.location.href = imageLinks[currentIndex];
});
// 클릭된 버튼 ID를 저장하는 Set
let clickedButtons = new Set();

// 드롭다운 메뉴 표시/숨김
function toggleDropdown() {
  const dropdown = document.getElementById('dropdown-menu');
  if (dropdown.style.display === "none" || dropdown.style.display === "") {
      dropdown.style.display = "flex"; // 메뉴 보이기
  } else {
      dropdown.style.display = "none"; // 메뉴 숨기기
  }
}

// 서브 버튼 클릭 처리
function clickSubButton(buttonId) {
  switch (buttonId) {
      case 1:
          window.location.href = "https://tngodj.github.io/Gibli-WorldCup-Main/"; // 버튼 1 클릭 시 이동할 URL
          break;
      case 2:
          window.location.href = "https://tngodj.github.io/OST_Game"; // 버튼 2 클릭 시 이동할 URL
          break;
      case 3:
          window.location.href = "https://tngodj.github.io/Character-Name-Game/"; // 버튼 3 클릭 시 이동할 URL
          break;
      default:
          console.error("잘못된 버튼 ID입니다."); // 디버그용
  }
};

const posters = document.querySelectorAll('.poster');
let activeIndex = 2; // 초기 활성화된 포스터(중앙)

// 포스터 배치 함수
function arrangeCoverflow() {
  posters.forEach((poster, index) => {
    const offset = index - activeIndex;
    const scale = 1 - Math.abs(offset) * 0.1; // 크기 비율
    const rotateY = offset * 30; // 기울기
    const translateX = offset * 220; // 좌우 이동 간격

    // 스타일 설정
    poster.style.transform = `
      translateX(${translateX}px)
      scale(${scale})
      rotateY(${rotateY}deg)
    `;
    poster.style.zIndex = -Math.abs(offset); // 중앙 포스터를 위로 표시
    poster.style.opacity = Math.max(0.3, 1 - Math.abs(offset) * 0.3); // 불투명도 조정
  });
}

// 초기 배치
arrangeCoverflow();
function moveCoverflow(direction) {
  if (direction === 'next') {
    activeIndex = (activeIndex + 1) % posters.length;
  } else if (direction === 'prev') {
    activeIndex = (activeIndex - 1 + posters.length) % posters.length;
  }
  arrangeCoverflow();
}

// 키보드 이벤트 추가
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') moveCoverflow('next');
  if (e.key === 'ArrowLeft') moveCoverflow('prev');
});

// 자동 이동 (3초마다)
setInterval(() => moveCoverflow('next'), 3000);