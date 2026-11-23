var container = document.getElementById("manager-offerings");
var savedData = localStorage.getItem("managerOfferings");

var offerings = [];

if (savedData !== null) {
    offerings = JSON.parse(savedData);
}

function displayOfferings(list) {

    container.innerHTML = "";

    if (list.length === 0) {
        container.textContent = "No offerings added yet.";
    }

    for (var i = 0; i < list.length; i++) {

        var offering = list[i];

        var image = document.createElement("img");
        image.src = offering.image;
        image.alt = offering.name;

        var row = document.createElement("article");
        row.className = "bb-row";

        var name = document.createElement("h3");
        name.className = "bb-row-name";
        name.textContent = offering.name;
        var cost = document.createElement("div");
        cost.textContent = "Cost";

        var price = document.createElement("p");
        price.textContent = offering.price + " SAR";

        cost.appendChild(price);
        var registrations = document.createElement("div");
        registrations.textContent = "Registrations";

        var countParagraph = document.createElement("p");

        var count = document.createElement("span");
        count.className = "bb-status";
        count.textContent = offering.registrations || 0;

        countParagraph.appendChild(count);
        registrations.appendChild(countParagraph);

        var actions = document.createElement("div");
        actions.className = "bb-row-actions";

        var deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "bb-button delete-offering";
        deleteButton.textContent = "Delete";

        deleteButton.setAttribute("data-index", i);

        deleteButton.onclick = function () {

          var index = Number(this.getAttribute("data-index"));

         if (confirm("Are you sure you want to delete this offering?")) {

        offerings.splice(index, 1);

        localStorage.setItem("managerOfferings", JSON.stringify(offerings));

        displayOfferings(offerings);
    }
};

actions.appendChild(deleteButton);

        row.appendChild(image);
        row.appendChild(name);
        row.appendChild(cost);
        row.appendChild(registrations);
        row.appendChild(actions);

        container.appendChild(row);
    }

}

displayOfferings(offerings);