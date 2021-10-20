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

// Player
class Player {
	constructor($el) {
		this.$el = $el;
		this.$players = document.querySelector('.players');
		this.$button = document.querySelector('.add-button');
		this.playerTemplate = document.querySelector('.player-template').content;

		const clone = document.importNode(this.playerTemplate, true);
		this.$el.appendChild(clone);

		const $currentCounter = this.$players.querySelector('.player:last-of-type');
		new Counter($currentCounter);

		this.$el.appendChild(this.$button);
	}
}

new Player(document.querySelector('.players'));

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

new DeleteButton(document.querySelector('.player__delete'));

// Add button
class AddButton {
	constructor($el) {
		this.$el = $el;
		this.$players = document.querySelector('.players');
		this.maxPlayers = 6;

		this.$el.addEventListener('click', () => {
			const currentPlayers = document.querySelectorAll('.player').length;
			if(currentPlayers < this.maxPlayers) {
				new Player(this.$players);
			}

			const $currentDeleteButton = this.$players.querySelector('.player:last-of-type .player__delete');
			new DeleteButton($currentDeleteButton);
		});
	}
}

new AddButton(document.querySelector('.add-button'));
