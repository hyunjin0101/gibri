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

const colors = ["#ff7f50", "#87ceeb", "#98fb98", "#ff69b4", "#dda0dd"];
const posters = document.querySelectorAll('.poster');
const coverflow = document.querySelector('.coverflow');
const scrollbarThumb = document.querySelector('.scrollbar-thumb');
let activeIndex = 0;
let isDragging = false;
let startX = 0;

function updateCoverflow() {
  // 포스터 활성화
  posters.forEach((poster, index) => {
    poster.classList.remove('active');
    if (index === activeIndex) {
      poster.classList.add('active');
    }
  });

  // 포스터 이동
  const offset = -(activeIndex * 220); // 각 포스터의 넓이 + 간격
  coverflow.style.transform = `translateX(${offset}px)`;

  // 스크롤바 이동
  const thumbWidth = 100 / posters.length; // 스크롤바 너비 비율
  scrollbarThumb.style.background = colors[activeIndex]; // 스크롤바 색상 변경
  scrollbarThumb.style.width = `${thumbWidth}%`;
  scrollbarThumb.style.left = `${thumbWidth * activeIndex}%`;
}

// 키보드로 탐색
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' && activeIndex > 0) {
    activeIndex -= 1;
    updateCoverflow();
  } else if (event.key === 'ArrowRight' && activeIndex < posters.length - 1) {
    activeIndex += 1;
    updateCoverflow();
  }
});

scrollbarThumb.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
});

document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    const containerWidth = document.querySelector('.scrollbar').offsetWidth;
    const thumbWidth = scrollbarThumb.offsetWidth;
    let newLeft = e.clientX - startX;

    // 경계 제한
    newLeft = Math.max(0, Math.min(newLeft, containerWidth - thumbWidth));

    scrollbarThumb.style.left = `${(newLeft / containerWidth) * 100}%`;

    // 포스터 이동 계산
    activeIndex = Math.round((newLeft / (containerWidth - thumbWidth)) * (posters.length - 1));
    updateCoverflow();
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

// 초기화
updateCoverflow();