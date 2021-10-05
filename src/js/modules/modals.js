const modals = () => {
    // Переменная, которая следит была ли нажата какая-то кнопка
    let btnPressed = false;

    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              present = document.querySelector('.fixed-gift'),
              scroll = calcScroll();
        
        present.classList.add('animated', 'pulse');

        function openModal() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}px`;
            present.style.marginRight = `${scroll}px`;
        }

        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
            present.style.marginRight = `0px`;
        }
     
        trigger.forEach(btn => {  
            btn.addEventListener('click', (event) => {
                if (event.target) {
                    event.preventDefault();
                }

                btnPressed = true;

                if (destroy) {
                    btn.remove();
                }

                // Закрываем все модальные окна c data-атрибутами
                windows.forEach(item => {
                    item.style.display = 'none';
                    item.classList.add('animated', 'fadeIn');
                });

                openModal();
            });
        });

        // Закрытие модального окна при клике на крестик
        close.addEventListener('click', () => {
            // Закрываем все модальные окна c data-атрибутами
            windows.forEach(item => {
                item.style.display = 'none';
            });

            closeModal();
        });

        // Закрытие модального окна при клике на подложку
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                // Закрываем все модальные окна c data-атрибутами
                windows.forEach(item => {
                    item.style.display = 'none';
                });

                closeModal();
            }
        });
    }

    function showModalByTime(selector, time){
        setTimeout(function() {
            let isAnyModalShown = false;

            document.querySelectorAll('[data-modal]').forEach(item => {
                if (getComputedStyle(item).display !== 'none') {
                    isAnyModalShown = true;
                }
            });

            if (!isAnyModalShown) {
                document.querySelector(selector).style.display = 'block';
                document.body.style.overflow = 'hidden';

                let scroll = calcScroll();
                document.body.style.marginRight = `${scroll}px`;
            }
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth; // получили ширину прокрутки
        div.remove();

        return scrollWidth;
    }

    // Открывает модальное окно подарка при прокрутке пользователем до конца страницы
    function openByScroll(selector) {
        window.addEventListener('scroll', () => {
            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

            if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {
                document.querySelector(selector).click(); // вызвали событие вручную
            }
        });
    }
       
    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    openByScroll('.fixed-gift');
    showModalByTime('.popup-consultation', 60000);
};

export default modals;