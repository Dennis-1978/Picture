const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelector),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              scroll = calcScroll();

        function openModal() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
            document.body.style.marginRight = `${scroll}px`;
        }

        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            document.body.style.marginRight = `0px`;
        }
     
        trigger.forEach(btn => {  
            btn.addEventListener('click', (event) => {
                if (event.target) {
                    event.preventDefault();
                }

                // Закрываем все модальные окна c data-атрибутами
                windows.forEach(item => {
                    item.style.display = 'none';
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
            if (event.target === modal && closeClickOverlay) {
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
       
    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    showModalByTime('.popup-consultation', 6000);
};

export default modals;