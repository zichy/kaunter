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
		$button.addEventListener('click', (e) => {
			e.preventDefault();

			if($button.dataset.count === '+1') {
				lifeCount++;
			} else if($button.dataset.count === '-1') {
				lifeCount--;
			} else if($button.dataset.count === '+5') {
				lifeCount += 5;
			} else if($button.dataset.count === '-5') {
				lifeCount -= 5;
			}

			$life.value = lifeCount;
		});
	});
});
