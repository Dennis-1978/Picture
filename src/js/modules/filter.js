const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
          items = menu.querySelectorAll('li'),
          wrapper = document.querySelector('.portfolio-wrapper'),
          markAll = wrapper.querySelectorAll('.all'),
          no = document.querySelector('.portfolio-no');

    const typeFilter = (markType) => {
        // Скрываем все элементы
        markAll.forEach(mark => {
            mark.style.display = 'none';
            mark.classList.remove('animated' ,'fadeIn');
        });

        no.style.display = 'none';
        no.classList.remove('animated' ,'fadeIn');

        // Показываем необходимые элементы
        if (markType) {
            markType.forEach(mark => {
                mark.style.display = 'block';
                mark.classList.add('animated' ,'fadeIn');
            });
        }
        
        if (markType.length == 0) {
            no.style.display = 'block';
            no.classList.add('animated' ,'fadeIn');
        }
    };

    menu.addEventListener('click', (event) => {
        let selectedClass = event.target.classList[0],
            selectedImages = wrapper.querySelectorAll(`.${selectedClass}`);
        typeFilter(selectedImages);
    });
    
    menu.addEventListener('click', (event) => {
        let target = event.target;

        if (target && target.tagName == 'LI') {
            items.forEach(btn => btn.classList.remove('active'));
            target.classList.add('active');
        } 
    });
};

export default filter;