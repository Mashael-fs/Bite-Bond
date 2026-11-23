var restaurantsContainer = document.getElementsByClassName("restaurants-flex")[0];
var searchBox = document.getElementsByClassName("search-input-box")[0];
var searchInput = searchBox.getElementsByTagName("input")[0];
var cuisineSelect = document.getElementById("cuisine-filter");
var restaurantCards = restaurantsContainer.getElementsByClassName("restaurant-card");

function filterRestaurants() {
var searchText = searchInput.value.toLowerCase();
var selectedCuisine = cuisineSelect.value.toLowerCase().replace("-", " ");

for (var i = 0; i < restaurantCards.length; i++) {
    var card = restaurantCards[i];
    var name = card.getElementsByTagName("h2")[0].textContent.toLowerCase();
    var cuisine = card.getElementsByClassName("cuisine")[0].textContent.toLowerCase();

    var matchesName = name.indexOf(searchText) !== -1;
    var matchesCuisine = (selectedCuisine === "") || (cuisine.indexOf(selectedCuisine) !== -1);

    if (matchesName && matchesCuisine) {
        card.style.display = "flex";
    } else {
        card.style.display = "none";
    }
}
}

searchInput.onkeyup = filterRestaurants;
cuisineSelect.onchange = filterRestaurants;

var savedVotes = localStorage.getItem("restaurantVotes");
if (savedVotes) {
var votes = JSON.parse(savedVotes);
var topRestaurant = "";
var maxVotes = 0;

for (var restaurantName in votes) {
    if (votes[restaurantName] > maxVotes) {
        maxVotes = votes[restaurantName];
        topRestaurant = restaurantName;
    }
}

var featuredData = {
    "Bella Italia": {
        img: "images/rest-bella.jpg",
        stars: "★★★★★",
        desc: "Celebrated for its authentic wood-fired pizzas, fresh handmade pasta, and charming Italian dining atmosphere loved by Bite&Bond club members."
    },
    "Sakura Garden": {
        img: "images/rest-sakura.jpg",
        stars: "★★★★☆",
        desc: "Loved by club members for its fresh Salmon Nigiri, crispy Chicken Katsu Curry, and delicate Matcha Mochi in a serene Japanese setting."
    },
    "Al Oasis Grill": {
        img: "images/rest-oasis.jpg",
        stars: "★★★★★",
        desc: "Renowned for traditional Middle Eastern hospitality, signature Mixed Grill Platters, Traditional Lamb Kabsa, and Classic Kunafa."
    },
    "Le Petit Bistro": {
        img: "images/rest-bistro.jpg",
        stars: "★★★★☆",
        desc: "A charming French bistro praised by members for its French Pepper Steak, flaky Butter Croissants, and classic Crème Brûlée."
    },
    "Taco Fiesta": {
        img: "images/rest-taco.jpg",
        stars: "★★★★☆",
        desc: "Vibrant Mexican flavors featuring savory Beef Birria Tacos, loaded Classic Nachos, and warm Churros with Chocolate."
    },
    "Spice Route": {
        img: "images/rest-spice.jpg",
        stars: "★★★★★",
        desc: "Celebrated for rich Butter Chicken, Tandoori Chicken, and aromatic Vegetable Biryani crafted to perfection."
    }
};

if (topRestaurant !== "" && featuredData[topRestaurant]) {
    var featuredCard = document.getElementsByClassName("featured-card")[0];
    var featuredInfo = featuredCard.getElementsByClassName("featured-info")[0];

    featuredCard.getElementsByTagName("img")[0].src = featuredData[topRestaurant].img;
    featuredInfo.getElementsByTagName("h3")[0].textContent = topRestaurant;
    featuredInfo.getElementsByClassName("stars")[0].textContent = featuredData[topRestaurant].stars;
    featuredInfo.getElementsByTagName("p")[1].textContent = featuredData[topRestaurant].desc;
}
}