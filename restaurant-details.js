var overviewSection = document.getElementsByClassName("restaurant-overview")[0];
var currentRestaurant = overviewSection.getElementsByTagName("h1")[0].textContent;

var reviewBox = document.getElementsByClassName("review-box")[0];
var arrows = reviewBox.getElementsByClassName("nav-arrow");
var reviewContent = reviewBox.getElementsByClassName("review-content")[0];
var reviewTextEl = reviewContent.getElementsByClassName("review-top-row")[0].getElementsByTagName("p")[0];
var reviewStarsEl = reviewContent.getElementsByClassName("stars")[0];

var reviewsList = [
{
text: reviewTextEl.textContent,
stars: reviewStarsEl.textContent
},
{
text: '"Great service, welcoming atmosphere, and delicious dishes! Highly recommended for Bite&Bond members."',
stars: "★★★★★"
},
{
text: '"Visited with the club last weekend and everything exceeded our expectations. Will definitely visit again!"',
stars: "★★★★☆"
}
];

var currentIndex = 0;

function showReview(index) {
reviewTextEl.textContent = reviewsList[index].text;
reviewStarsEl.textContent = reviewsList[index].stars;
}

arrows[0].onclick = function () {
currentIndex = currentIndex - 1;
if (currentIndex < 0) {
currentIndex = reviewsList.length - 1;
}
showReview(currentIndex);
};

arrows[1].onclick = function () {
currentIndex = currentIndex + 1;
if (currentIndex >= reviewsList.length) {
currentIndex = 0;
}
showReview(currentIndex);
};

var voteBtn = document.getElementsByClassName("btn-primary-large")[0];

voteBtn.onclick = function () {
var stored = localStorage.getItem("restaurantVotes");
var votes = stored ? JSON.parse(stored) : {};

if (votes[currentRestaurant]) {
    votes[currentRestaurant] = votes[currentRestaurant] + 1;
} else {
    votes[currentRestaurant] = 1;
}

localStorage.setItem("restaurantVotes", JSON.stringify(votes));
alert("Thank you! Your vote for " + currentRestaurant + " as Restaurant of the Month has been submitted.");
voteBtn.textContent = "Voted for " + currentRestaurant + " (" + votes[currentRestaurant] + " votes)";
};