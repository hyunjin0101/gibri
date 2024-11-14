const images = [
    '123.png',
    '7.jpg',
    '3.jpeg',
    '4.jpg',
    '5.jpg'
];
const imageLinks = [
    'https://namu.wiki/w/%ED%86%A0%ED%86%A0%EB%A1%9C', // '1.jpg'에 연결된 링크
    'https://example.com/page2', // '7.jpg'에 연결된 링크
    'https://example.com/page3', // '3.jpeg'에 연결된 링크
    'https://example.com/page4', // '4.jpg'에 연결된 링크
    'https://example.com/page5'  // '5.jpg'에 연결된 링크
];


let currentIndex = 0;
const carouselImage = document.getElementById('carouselImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const clickSound = new Audio('cllick.m4a'); // 효과음 파일 경로

// 이미지 업데이트 함수
function updateImage() {
    carouselImage.style.opacity = 0;  // 페이드 아웃 효과
    setTimeout(() => {
        carouselImage.src = images[currentIndex];
        carouselImage.style.opacity = 1;  // 페이드 인 효과
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
carouselImage.addEventListener('click', () => {
    window.location.href = imageLinks[currentIndex];
});