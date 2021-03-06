import { postData } from "../services/requests";

const drop = () => {
    const fileInputs = document.querySelectorAll('[name="upload"]'),
          upload = document.querySelectorAll('[name=upload');
    
    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach (eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    function preventDefaults(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    function highLight(item) {
        item.closest('.file_upload').style.border = '5 px solid yellow';
        item.closest('.file_upload').style.backgroundColor = 'rgba(0,0,0, .7)';
    }

    function unHighLight(item) {
        item.closest('.file_upload').style.border = 'none';
        if (item.closest('.calc_form')) {
            item.closest('.file_upload').style.backgroundColor = '#ffffff';
        } else if (item.closest('.main')) {
            item.closest('.file_upload').style.backgroundColor = '#f7e7e6';
        } else {
            item.closest('.file_upload').style.backgroundColor = '#ededed';
        }


    }

    ['dragenter', 'dragover'].forEach (eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highLight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach (eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unHighLight(input), false);
        });
    });

    const clearInputs = () => {
        fileInputs.forEach(item => {
            item.value = '';
        });

        upload.forEach(item => {
            item.previousElementSibling.textContent = 'Файл не выбран';
        });
    };


    fileInputs.forEach(input => {
        input.addEventListener('drop', (event) => {
            input.files = event.dataTransfer.files;

            console.log(input.files[0]);

            let dots;
            const arr = input.files[0].name.split('.');
            arr[0].length > 6 ? dots = '...' : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            input.previousElementSibling.textContent = name;

            if (input.closest('.main')) {

                const formData = new FormData();
                formData.append('file', input.files[0]);             

                postData('assets/server.php', formData)
                .then(result => {
                    console.log(result);
                })
                .catch(() => {
                    console.log('Error');
                })
                .finally(() => {
                    clearInputs();
                });
            }

        });
    });

};

export default drop;