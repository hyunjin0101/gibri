const images = [
    '1.jpg',
    '2.jpg',
    '3.jpg',
    '4.jpg',
    '5.jpg'
];

let currentIndex = 0;
const carouselImage = document.getElementById('carouselImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// 이미지 업데이트 함수
function updateImage() {
    carouselImage.style.opacity = 0;  // 페이드 아웃 효과
    setTimeout(() => {
        carouselImage.src = images[currentIndex];
        carouselImage.style.opacity = 1;  // 페이드 인 효과
    }, 200);  // 0.2초 후에 이미지 전환
}

// 이전 이미지로 이동
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    updateImage();
});

// 다음 이미지로 이동
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    updateImage();
});