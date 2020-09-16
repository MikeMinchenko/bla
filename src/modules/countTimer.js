const countTimer = deadline => {
	const timerHours = document.querySelector('#timer-hours'),
		timerMinutes = document.querySelector('#timer-minutes'),
		timerSeconds = document.querySelector('#timer-seconds');

	const getTimeRemaining = () => {
		const dateStop = new Date(deadline).getTime(),
			dateNow = new Date().getTime(),
			timeRemaining = (dateStop - dateNow) / 1000,
			seconds = Math.floor(timeRemaining) % 60,
			minutes = Math.floor((timeRemaining / 60) % 60),
			hours = Math.floor(timeRemaining / 60 / 60);

		return {
			seconds,
			minutes,
			hours,
			timeRemaining
		};
	};

	const updateClock = () => {
		const timer = getTimeRemaining();

		timerSeconds.textContent = timer.seconds;
		timerMinutes.textContent = timer.minutes;
		timerHours.textContent = timer.hours;
		if (timer.seconds < 10) {
			timerSeconds.textContent = '0' + timer.seconds;
		}
		if (timer.minutes < 10) {
			timerMinutes.textContent = '0' + timer.minutes;
		}
		if (timer.hours < 10) {
			timerHours.textContent = '0' + timer.hours;
		}
	};

	if (getTimeRemaining().timeRemaining > 0) {
		updateClock();
		setInterval(updateClock, 1000);
	} else {
		clearInterval(2);
		timerSeconds.textContent = '00';
		timerMinutes.textContent = '00';
		timerHours.textContent = '00';
	}
};

export default countTimer;
