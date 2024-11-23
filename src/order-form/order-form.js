import axios from 'axios';

window.addEventListener('DOMContentLoaded', () => {

	const openFormButton = document.querySelector('.order__button')
	const orderForm = document.querySelector('.modal-form_show')
	const orderFormCloseButton = document.querySelector('.order-form__close-button')
	const orderFormSubmit = document.querySelector('.order-form')
	const url = 'http://localhost:5173/index.php'

	if (openFormButton) {

		openFormButton.addEventListener('click', () => {
			orderForm.classList.remove('modal-form_hide');
			document.body.style.overflow = 'hidden';
		})
	}

	orderForm.addEventListener('click', (e) => {
		if (e.target === orderForm) {
			orderForm.classList.add('modal-form_hide');
			document.body.style.overflow = '';
		}
	});

	orderFormCloseButton.addEventListener('click', (e) => {
		orderForm.classList.add('modal-form_hide');
		document.body.style.overflow = '';
	});

	const sendForm = async (url, data) => {

		console.log(data)
		const response = await axios({
			url: url,
			method: 'POST',
			data: data
		}).then((response) => {
			if (response.status === 200) {
				alert(
					'Сообщение отправлено, наш администратор перезвонит вам в ближайшее время для подтверждения заявки.',
				);
				orderFormSubmit.reset();
				orderForm.classList.add('modal-form_hide');
			}
			else alert('Ошибка при отправке формы');
		});;

	};

	orderFormSubmit.addEventListener('submit', (e) => {
		e.preventDefault();
		const formInputs = document.querySelectorAll("input.order-form__input, textarea.order-form__textarea");

		let errors = 0;
		formInputs.forEach(i => {
			if (!i.value) {
				i.classList.add('order-form__input_red-border');
				errors++;
			}

			i.addEventListener('keyup', () => {
				if (i.value.length >= 1) {
					i.classList.remove('order-form__input_red-border');
				}
			});
		})

		if (!errors) {
			const formData = new FormData(orderFormSubmit);

			sendForm(url, formData)
                    .then(() => {
                    })
                    .catch(() => {
                        const error = new Error(`Ошибка отправки формы, сервер не отвечает`);
                        alert(error);
                    });
		}
	});
})