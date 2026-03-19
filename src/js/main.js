import { reviews } from "../../assets/data/reviews.js";

const featuredReviews = document.getElementById('featured-reviews');
const reviewCardTemplate = document.getElementById('review-card-template');

const acrylicFragment = makeReviewCard(getRandomReview(0), 'acrylic', 'red');
const watercolorFragment = makeReviewCard(getRandomReview(1), 'watercolor', 'violet');
const mosaicFragment = makeReviewCard(getRandomReview(2), 'mosaic', 'green');

featuredReviews.append(acrylicFragment, watercolorFragment, mosaicFragment);


function getRandomReview(artformIndex) {
	const range = reviews[artformIndex].length;
	return reviews[artformIndex][Math.floor(Math.random()*range)];
}

function makeReviewCard(reviewData, artForm, colorClass) {
	const {name, img, text} = reviewData;
	const cardFragment = document.importNode(reviewCardTemplate.content, true);
	cardFragment.querySelector('h2').textContent = name;
	cardFragment.querySelector('h3').textContent = artForm;
	cardFragment.querySelector('p').textContent = text;
	cardFragment.querySelector('img').src = `../../assets/images/user/${img}`;
	cardFragment.querySelector('img').alt = 'A painting submitted by a participant';
	cardFragment.querySelector('article').classList.add(colorClass);
	return cardFragment;
}