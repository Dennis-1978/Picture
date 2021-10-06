const sliders = (slides, direction, prev, next) => {
    let slideIndex = 1,
        paused = false; // остановка переключения слайдов

    const items = document.querySelectorAll(slides);

    function showSlides(n) {
        if (n > items.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = items.length;
        }

        // Скрываем все слайды
        items.forEach((item) => {
            item.classList.add('animated');
            item.style.display = 'none';
        });

        // Показываем необходимый
        items[slideIndex - 1].style.display = 'block';
    }

    // Первичная инициализация слайдера
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    try {
        const prevBtn = document.querySelector(prev),
              nextBtn = document.querySelector(next);

        prevBtn.addEventListener('click', () => {
            plusSlides(-1);
            items[slideIndex - 1].classList.remove('slideInLeft');
            items[slideIndex - 1].classList.add('slideInRight');
        });

        nextBtn.addEventListener('click', () => {
            plusSlides(1);
            items[slideIndex - 1].classList.remove('slideInRight');
            items[slideIndex - 1].classList.add('slideInLeft');
        });
    } catch(error){}

    function activateAnimation() {
        if (direction === 'vertical') {
            paused = setInterval(function() {
                plusSlides(1);
                items[slideIndex - 1].classList.add('slideInDown');
            }, 3000);
            console.log('Вертикальное направление', paused);
        } else {
            paused = setInterval(function() {
                plusSlides(1);
                items[slideIndex - 1].classList.remove('slideInRight');
                items[slideIndex - 1].classList.add('slideInLeft');
            }, 3000);
            console.log('Горизонтальное направление', paused);
        }
    }

    activateAnimation();

    items[0].parentNode.addEventListener('mouseenter', () => {
        clearInterval(paused);
        console.log('При наведении на слайдер', paused);
    });

    items[0].parentNode.addEventListener('mouseleave', () => {
        activateAnimation();
        console.log('Убрали курсор со слайдера',paused);
    });
        
};

export default sliders;