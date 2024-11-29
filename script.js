/* document.querySelector('.toggle-button').addEventListener('click', function () {
    const hiddenRow = document.querySelector('.hidden-row');
  
    if (hiddenRow.style.display === 'flex') {
      hiddenRow.style.display = 'none';
      this.textContent = '모두 보기';
    } else {
      hiddenRow.style.display = 'flex';
      this.textContent = '닫기';
    }
  }); */
/* toggleButton.addEventListener('click', () => {
    isVisible = !isVisible;

    hiddenRows.forEach(row => {
        if (isVisible) {
            row.style.opacity = '1'; // 완전히 표시
            row.style.filter = 'none'; // 흐림 효과 제거
            row.style.pointerEvents = 'auto'; // 클릭 가능
        } else {
            row.style.opacity = '0.3'; // 흐릿하게
            row.style.filter = 'blur(3px)'; // 흐림 효과 추가
            row.style.pointerEvents = 'none'; // 클릭 방지
        }
    });

    toggleButton.textContent = isVisible ? '닫기' : '모두 보기'; // 버튼 텍스트 변경
}); */
// 버튼 정의
const toggleButton = document.querySelector('.toggle-button');

// 숨겨진 행 보이기/숨기기 로직
toggleButton.addEventListener('click', () => {
  const hiddenRows = document.querySelectorAll('.hidden-row'); // 숨겨진 행들
  let isVisible = toggleButton.dataset.visible === 'true'; // 현재 표시 상태 확인

  hiddenRows.forEach(row => {
    if (isVisible) {
      row.style.opacity = '0.3'; // 흐릿하게
      row.style.filter = 'blur(3px)'; // 흐림 효과 추가
      row.style.pointerEvents = 'none'; // 클릭 방지
    } else {
      row.style.opacity = '1'; // 완전히 보이게
      row.style.filter = 'none'; // 흐림 효과 제거
      row.style.pointerEvents = 'auto'; // 클릭 가능
    }
  });

  toggleButton.textContent = isVisible ? '모두 보기' : '닫기'; // 버튼 텍스트 변경
  toggleButton.dataset.visible = !isVisible; // 상태 업데이트
});

