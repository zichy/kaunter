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
		this.$content = document.querySelector('.content');
		this.$intro = document.querySelector('.intro');
		this.playerTemplate = document.querySelector('.player-template').content;

		const clone = document.importNode(this.playerTemplate, true);
		this.$el.appendChild(clone);

		const $currentCounter = this.$content.querySelector('.player:last-of-type');
		new Counter($currentCounter);

		this.$el.appendChild(this.$intro);
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

// Add button
class AddButton {
	constructor($el) {
		this.$el = $el;
		this.$button = this.$el.querySelector('.add-button');
		this.$content = document.querySelector('.content');
		this.maxPlayers = 6;

		this.$button.addEventListener('click', () => {
			const currentPlayers = document.querySelectorAll('.player').length;
			if(currentPlayers < this.maxPlayers) {
				new Player(this.$content);
			}

			const $currentPlayer = this.$content.querySelector('.player:last-of-type');
			// $currentPlayer.focus();

			const $currentDeleteButton = this.$content.querySelector('.player:last-of-type .player__delete');
			new DeleteButton($currentDeleteButton);
		});
	}
}

new AddButton(document.querySelector('.intro'));
