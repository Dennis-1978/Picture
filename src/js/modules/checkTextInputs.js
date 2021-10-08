const checkNumInputs = (selector) => {
	const txtInputs = document.querySelectorAll(selector);

	txtInputs.forEach(input => {
		input.addEventListener('keypress', function(event) {
			console.log(event.key);
			if (event.key.match(/[^а-яё 0-9]/ig)) {
				event.preventDefault();
			}
		});
	});
};

export default checkNumInputs;