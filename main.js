const $players = document.querySelector('.players');
let playerTemplate = document.querySelector('.player-template').content;
const clone = document.importNode(playerTemplate, true);
$players.appendChild(clone);

const $counter = document.querySelectorAll('.counter');

$counter.forEach((counter) => {
	const $buttons = counter.querySelectorAll('.counter__button');
	const $life = counter.querySelector('.counter__life');
	let lifeCount = parseInt($life.value, 10);
	lifeCount = isNaN(lifeCount) ? 0 : lifeCount;
	
	$buttons.forEach(($button) => {
		const number = parseInt($button.dataset.count);

		$button.addEventListener('click', (e) => {
			e.preventDefault();

			lifeCount = lifeCount + number;
			$life.value = lifeCount;
		});
	});
});
