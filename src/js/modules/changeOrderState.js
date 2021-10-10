const changeOrderState = (state) => {
    const orderSize = document.querySelector('#size'),
          orderMaterial = document.querySelector('#material'),
          orderOptions = document.querySelector('#options'),
          orderPromocode = document.querySelector('.promocode'),
          orderResult = document.querySelector('.calc-price');

    function bindActionToElem(event, elem, prop) {
        elem.addEventListener(event, (e) => {
            const target = e.target;

            if (elem.selectedIndex == -1) {
                return null;
            }

            switch(target.getAttribute('id') || target.getAttribute('class')) {
                case 'size':
                    state[prop] = elem.options[elem.selectedIndex].text;
                    break;
                case 'material':
                    state[prop] = elem.options[elem.selectedIndex].text;
                    break;
                case 'options':
                    state[prop] = elem.options[elem.selectedIndex].text;
                    break;
                case 'promocode':
                    if (elem.value !== 'IWANTPOPART' || elem.value == '') {
                        state[prop] = 'false';
                    } else {
                        state[prop] = 'true';
                    }
                    break;
            }
            state.totalPrice = orderResult.textContent;
            console.log(state);
        });
    }

    bindActionToElem('change', orderSize, 'size');
    bindActionToElem('change', orderMaterial, 'material');
    bindActionToElem('change', orderOptions, 'options');
    bindActionToElem('input', orderPromocode, 'promocode');
};

export default changeOrderState;