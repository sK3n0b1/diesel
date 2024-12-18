document.addEventListener("DOMContentLoaded", function () {
    // Инициализация Swiper
    const swiper = new Swiper('.brends__swiper', {
        slidesPerView: 1,        // Сколько слайдов показывать
        spaceBetween: 40, 
        centeredSlides: true,

        pagination: {
            el: '.brends__swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.brends__swiper-button-next',
            prevEl: '.brends__swiper-button-prev',
        },
    });

    // Устанавливаем начальное значение после инициализации
    updateSwiperInfo(swiper);

    // Добавляем обработчик изменения слайда
    swiper.on('slideChange', function () {
        updateSwiperInfo(swiper);
    });

    // Функция для обновления текста
    function updateSwiperInfo(swiperInstance) {
        const currentSlide = swiperInstance.realIndex + 1; // Текущий слайд (начинается с 0, поэтому +1)
        const totalSlides = swiperInstance.slides.filter(slide => !slide.classList.contains('swiper-slide-duplicate')).length; // Учитываем только оригинальные слайды, если loop=true

        // Проверяем ширину экрана
        const isSmallScreen = window.innerWidth < 400;

        // Обновляем текст
        const infoText = isSmallScreen
            ? `${currentSlide} из ${totalSlides}`
            : `${currentSlide} из ${totalSlides} партнеров`;

        document.querySelector('.brends__swiper-info').textContent = infoText;
    }

    // Обновляем текст при изменении размера окна
    window.addEventListener('resize', function () {
        updateSwiperInfo(swiper);
    });
});