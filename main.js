// Counter
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

document.querySelectorAll('.counter').forEach(($counter) => {
	new Counter($counter);
});

// Add player button
class addButton {
	constructor($el) {
		this.$el = $el;
		this.$players = document.querySelector('.players');
		this.playerTemplate = document.querySelector('.player-template').content;
		this.maxPlayers = 6;

		this.$el.addEventListener('click', () => {
			const currentPlayers = document.querySelectorAll('.player').length;

			if(currentPlayers < this.maxPlayers) {
				const clone = document.importNode(this.playerTemplate, true);
				this.$players.appendChild(clone);

				const $currentCounter = this.$players.querySelector('.player:last-of-type');
				new Counter($currentCounter);
			}
		});
	}
}

new addButton(document.querySelector('.add-button'));
