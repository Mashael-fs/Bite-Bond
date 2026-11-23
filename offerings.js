var container = document.getElementsByClassName("offerings-flex")[0];
var sortSelect = document.getElementById("sort-offerings");
var nodeList = container.getElementsByClassName("offering-card");

var cards = [];
for (var i = 0; i < nodeList.length; i++) {
cards.push(nodeList[i]);
}

function displayOfferings(list) {
container.innerHTML = "";
for (var i = 0; i < list.length; i++) {
container.appendChild(list[i]);
}
}

for (var i = cards.length - 1; i > 0; i--) {
var j = Math.floor(Math.random() * (i + 1));
var temp = cards[i];
cards[i] = cards[j];
cards[j] = temp;
}
displayOfferings(cards);

sortSelect.onchange = function () {
var choice = sortSelect.value;

if (choice === "name-asc") {
    cards.sort(function (a, b) {
        var nameA = a.getElementsByTagName("h2")[0].textContent.toLowerCase();
        var nameB = b.getElementsByTagName("h2")[0].textContent.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
    });
} else if (choice === "name-desc") {
    cards.sort(function (a, b) {
        var nameA = a.getElementsByTagName("h2")[0].textContent.toLowerCase();
        var nameB = b.getElementsByTagName("h2")[0].textContent.toLowerCase();
        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
        return 0;
    });
} else if (choice === "low-high") {
    cards.sort(function (a, b) {
        var priceA = parseFloat(a.getElementsByClassName("price")[0].textContent);
        var priceB = parseFloat(b.getElementsByClassName("price")[0].textContent);
        return priceA - priceB;
    });
} else if (choice === "high-low") {
    cards.sort(function (a, b) {
        var priceA = parseFloat(a.getElementsByClassName("price")[0].textContent);
        var priceB = parseFloat(b.getElementsByClassName("price")[0].textContent);
        return priceB - priceA;
    });
}

displayOfferings(cards);
};