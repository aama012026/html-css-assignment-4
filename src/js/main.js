import { reviews } from "../../assets/data/reviews.js";
import { artforms } from "../../assets/data/artforms.js";

const currentPage = document.querySelector('a.current').textContent;
console.log(currentPage);

const imageGrids = document.querySelectorAll('.img-grid');
const reviewCardTemplate = document.getElementById('review-card-template');
const featuredReviews = document.getElementById('featured-reviews');
const selectArtform = document.getElementById('select-artform');
const artformInfoTemplate = document.getElementById('artform-info-template');
const artformInfoView = document.getElementById('info-view');
const selectedArtformImg = document.getElementById('selected-artform-img');

if (featuredReviews) {
	const acrylicFragment = makeReviewCard(getRandomReview(0), 'acrylic', 'red');
	const watercolorFragment = makeReviewCard(getRandomReview(1), 'watercolor', 'violet');
	const mosaicFragment = makeReviewCard(getRandomReview(2), 'mosaic', 'green');
	featuredReviews.append(acrylicFragment, watercolorFragment, mosaicFragment);
}

if (imageGrids) {
	populateImageGrids(imageGrids);
}

if (selectArtform) {
	setArtformInfo("acrylics");
	selectArtform.addEventListener('input', e => setArtformInfo(e.target.value));
}

function getRandomReview(artformIndex) {
	const range = reviews[artformIndex].length;
	return reviews[artformIndex][Math.floor(Math.random()*range)];
}

function populateImageGrids(gridElements) {
	gridElements.forEach((el) => {
		const rows = parseInt(el.dataset.rows);
		const columns = parseInt(el.dataset.columns);
		el.style.grid = `repeat(${rows}, 1fr) / repeat(${columns}, 1fr)`;
		const cellCount = rows * columns;
		const images = [];
		reviews.forEach(artform => artform.forEach(review => images.push(review.img)));
		console.log(images);
		for (let n = 0; n < cellCount; n++) {
			if(!images.length) {
				break;
			}
			let i = Math.floor(Math.random() * images.length);
			let image = images[i];
			console.log(image);
			images.splice(i, 1);
			const imageElement = document.createElement('img');
			imageElement.classList.add('square');
			imageElement.src = `../../assets/images/user/${image}`;
			imageElement.alt = 'An image submitted by a participant';
			el.appendChild(imageElement);
		}
	});
}

function makeReviewCard(reviewData, artForm, colorClass) {
	const {name, img, text} = reviewData;
	const cardFragment = document.importNode(reviewCardTemplate.content, true);
	cardFragment.querySelector('h2').textContent = name;
	cardFragment.querySelector('h3').textContent = artForm;
	cardFragment.querySelector('p').textContent = text;
	cardFragment.querySelector('img').src = currentPage == 'Home' ? `./assets/images/user/${img}` : `../../assets/images/user/${img}`;
	cardFragment.querySelector('img').alt = 'An image submitted by a participant';
	cardFragment.querySelector('article').classList.add(colorClass);
	return cardFragment;
}

function setArtformInfo(selectedArtform) {
	artforms.forEach(artform => {
		if(artform.name == selectedArtform) {
			const {info, price, image} = artform;
			const infoFragment = document.importNode(artformInfoTemplate.content, true);
			infoFragment.querySelector('.artform-info').innerHTML += info;
			infoFragment.querySelector('.artform-price').innerHTML += price;
			artformInfoView.innerHTML = '';
			artformInfoView.appendChild(infoFragment);
			selectedArtformImg.src = `../../assets/${image.source}`;
			selectedArtformImg.alt = image.alt;
		}
	});
}
