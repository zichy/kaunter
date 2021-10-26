// Alert on reload
window.onbeforeunload = function (ev) {
	var ev = ev || window.event;
	const warning = 'Do you want to leave this page? Your counters will not be saved.';

	if (ev) {
		ev.returnValue = warning;
	}

	return warning;
};

// Life counter
class LifeCounter {
	constructor($el) {
		this.$el  = $el;
		this.$buttons = $el.querySelectorAll('.life__button');
		this.$life = $el.querySelector('.life__input');

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

// Secondary counters
class SecondaryCounters {
	constructor($el) {
		this.$el = $el;
		this.$counters = $el.querySelectorAll('.counter__item');

		this.$counters.forEach(($counter) => {
			const $input = $counter.querySelector('.counter__input');
			const $buttons = $counter.querySelectorAll('.counter__button');

			let count = parseInt($input.value, 10);
			count = isNaN(count) ? 0 : count;

			$buttons.forEach(($button) => {
				$button.addEventListener('click', (e) => {
					e.preventDefault();

					const number = parseInt($button.dataset.count);
					count = count + number;
					$input.value = count;
				});
			});
		});
	}
}

// Delete button
class DeleteButton {
	constructor($el) {
		this.$el = $el;
		this.$player = $el.closest('.player');
		
		this.$el.addEventListener('click', () => {
			this.$player.remove();
		});
	}
}

// Reset button
class ResetButton {
	constructor($el, $input, life) {
		this.$el = $el;
		this.$input = $input;
		this.life = life;
		this.$player = $el.closest('.player');
		this.$counters = this.$player.querySelectorAll('.counter__input');

		this.$el.addEventListener('click', (e) => {
			e.preventDefault();
			$input.value = life;

			this.$counters.forEach(($counter) => {
				$counter.value = 0;
			});

			new LifeCounter(this.$player);
			new SecondaryCounters(this.$player);
		});
	}
}

// Add button
class AddButtons {
	constructor($el) {
		this.$el = $el;
		this.$buttons = this.$el.querySelectorAll('.add-button');
		this.$content = document.querySelector('.content');
		this.maxPlayers = 6;

		this.$buttons.forEach(($button) => {
			const startingLife = $button.dataset.life;

			$button.addEventListener('click', () => {
				const currentPlayers = document.querySelectorAll('.player').length;
				if(currentPlayers < this.maxPlayers) {
					new Player(this.$content, startingLife);
				}
			});
		});
	}
}

new AddButtons(document.querySelector('.intro'));

// Player
class Player {
	constructor($el, life) {
		this.$el = $el;
		this.life = life;
		this.$content = document.querySelector('.content');
		this.$intro = document.querySelector('.intro');

		// Include player template
		this.playerTemplate = document.querySelector('.player-template');
		this.clone = document.importNode(this.playerTemplate.content, true);
		this.$el.appendChild(this.clone);

		// Get current player
		this.$currentPlayer = this.$content.querySelector('.player:last-of-type');

		// Set life count
		this.$currentLife = this.$currentPlayer.querySelector('.life__input');
		this.$currentLife.value = this.life;

		// Initialize delete button
		this.$currentDeleteButton = this.$currentPlayer.querySelector('.player__delete');
		new DeleteButton(this.$currentDeleteButton);

		// Initialize reset button
		this.$currentResetButton = this.$currentPlayer.querySelector('.counter__reset');
		new ResetButton(this.$currentResetButton, this.$currentLife, this.life);

		// Initialize counters
		new LifeCounter(this.$currentPlayer);
		new SecondaryCounters(this.$currentPlayer);

		// Insert template
		this.$el.appendChild(this.$intro);
		this.$currentPlayer.focus();
	}
}
