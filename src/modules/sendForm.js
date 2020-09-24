const sendForm = () => {
	const wrongMessage = 'Что-то пошло не так',
		popupThank = document.querySelector('.popup-thank'),
		sendData = body =>
			fetch('./server.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(body)
			});

	document.addEventListener('submit', event => {
		event.preventDefault();
		const target = event.target,
			body = {},
			formData = new FormData(target),
			statusMessage = target.querySelector('.status-message');

		formData.forEach((value, key) => (body[key] = value));

		if (body['phone'].length < 18) {
			statusMessage.style.color = '#ff846e';
			statusMessage.textContent = `Введите полный номер телефона`;
			return;
		}
		if (!target.querySelector('[type=checkbox]').checked) {
			statusMessage.style.color = '#ff846e';
			statusMessage.textContent = `Примите политику конфиденциальности`;
			return;
		}
		if (body['name'] === ``) return;

		statusMessage.textContent = '';
		statusMessage.innerHTML = `
		<div class="bubbles">
			<div class="bubble">
				<div class="circle"></div>
			</div>
			<div class="bubble">
				<div class="circle"></div>
			</div><div class="bubble">
				<div class="circle"></div>
			</div><div class="bubble">
				<div class="circle"></div>
			</div><div class="bubble">
				<div class="circle"></div>
			</div><div class="bubble">
				<div class="circle"></div>
			</div>
		</div>
		`;

		sendData(body)
			.then(response => {
				if (response.status !== 200) {
					throw new Error(`Status ${response.status}`);
				}
				statusMessage.textContent = ``;
				statusMessage.innerHTML = '';
				popupThank.style.visibility = `visible`;
				target.reset();
			})
			.catch(err => {
				console.error(err);
				statusMessage.textContent = wrongMessage;
				setTimeout(() => (statusMessage.textContent = ``), 3000);
			});
	});
};

export default sendForm;
