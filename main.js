class Counter {
	constructor($el) {
		this.$el  = $el;
		this.$buttons = $el.querySelectorAll('.counter__button');
		this.$life = $el.querySelector('.counter__life');
		let lifeCount = parseInt(this.$life.value, 10);
		lifeCount = isNaN(lifeCount) ? 0 : lifeCount;


		this.$buttons.forEach(($button) => {
			$button.addEventListener('click', (e) => {
				e.preventDefault();

				const number = parseInt($button.dataset.count);
				lifeCount = lifeCount + number;
				this.$life.value = lifeCount;
			});
		});
	}
}

const $counter = document.querySelectorAll('.counter');

$counter.forEach(($counter) => {
	new Counter($counter);
});

const maxPlayers = 6;

const $players = document.querySelector('.players');
let playerTemplate = document.querySelector('.player-template').content;

const $playerButton = document.querySelector('.player-button');
$playerButton.addEventListener('click', () => {
	const currentPlayers = document.querySelectorAll('.player').length;

	if(currentPlayers < maxPlayers) {
		const clone = document.importNode(playerTemplate, true);
		$players.appendChild(clone);

		const $currentCounter = $players.querySelector('.player:last-of-type');
		new Counter($currentCounter);
	}
});
