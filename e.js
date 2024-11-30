const posterLinks = [
  'https://tngodj.github.io/Totoro/', // '1.jpg'에 연결된 링크
  'https://tngodj.github.io/Cat/', // '7.jpg'에 연결된 링크
  'https://tngodj.github.io/Haul/', // '3.jpeg'에 연결된 링크
  'https://tngodj.github.io/Sen-Chihiro/', // '4.jpg'에 연결된 링크
  'https://tngodj.github.io/Ponyo/',  // '5.jpg'에 연결된 링크
  'https://tngodj.github.io/Laputa/' // '6.jpg'에 연결된 링크
];

const colors = ["#ff7f50", "#87ceeb", "#98fb98", "#ff69b4", "#dda0dd"];
const posteres = document.querySelectorAll('.poster');
const coverflow = document.querySelector('.coverflow');
const scrollbarThumb = document.querySelector('.scrollbar-thumb');
let activeIndex = 0;
let isDragging = false;
let startX = 0;

function updateCoverflow() {
  // 포스터 활성화
  posteres.forEach((poster, index) => {
    poster.classList.remove('active');
    if (index === activeIndex) {
      poster.classList.add('active');
    }
  });

  // 포스터에 클릭 이벤트 추가
posteres.forEach((poster, index) => {
  poster.addEventListener('click', () => {
    if (poster.classList.contains('active')) { // 활성화된 포스터만 클릭 가능
      const link = posterLinks[index]; // 해당 포스터의 링크 가져오기
      if (link) {
        window.open(link, '_blank'); // 새 탭에서 링크 열기
      }
    }
  });
});

  // 포스터 이동
  const offset = -(activeIndex * 220); // 각 포스터의 넓이 + 간격
  coverflow.style.transform = `translateX(${offset}px)`;

  // 스크롤바 이동
  const thumbWidth = 100 / posteres.length; // 스크롤바 너비 비율
  scrollbarThumb.style.background = colors[activeIndex]; // 스크롤바 색상 변경
  scrollbarThumb.style.width = `${thumbWidth}%`;
  scrollbarThumb.style.left = `${thumbWidth * activeIndex}%`;
}

// 키보드로 탐색
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' && activeIndex > 0) {
    activeIndex -= 1;
    updateCoverflow();
  } else if (event.key === 'ArrowRight' && activeIndex < posteres.length - 1) {
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
    activeIndex = Math.round((newLeft / (containerWidth - thumbWidth)) * (posteres.length - 1));
    updateCoverflow();
  }
});

document.addEventListener('mouseup', () => {
  isDragging = false;
});

// 초기화
updateCoverflow();