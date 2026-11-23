var form = document.getElementById("add-offering-form");

form.onsubmit = function (event) {

    event.preventDefault();
    var name = document.getElementById("offering-name").value.trim();

    var image = document.getElementById("offering-image").files[0];

    var price = document.getElementById("offering-price").value;

    var description = document.getElementById("offering-description").value.trim();

    if (name === "" || !image || price === "" || description === "") {
    alert("Please fill in all required fields.");
    return;
}
if (!isNaN(parseInt(name.charAt(0)))) {
    alert("Offering name cannot start with a number.");
    return;
}

if (isNaN(price) || Number(price) < 0) {
    alert("Please enter a valid price.");
    return;
}

var savedData = localStorage.getItem("managerOfferings");

var offerings = [];

if (savedData !== null) {
    offerings = JSON.parse(savedData);
}

var newOffering = {
    name: name,
    price: Number(price),
    description: description,
    registrations: 0
};

// Read the uploaded image
var reader = new FileReader();

reader.onload = function () {

    var img = new Image();

    img.onload = function () {

        // Create a canvas to resize the image
        var canvas = document.createElement("canvas");
        var width = img.width;
        var height = img.height;

        // Resize large images
        if (width > 400 || height > 400) {

            if (width > height) {
                height = height * (400 / width);
                width = 400;
            } else {
                width = width * (400 / height);
                height = 400;
            }
        }

        canvas.width = Math.round(width);
        canvas.height = Math.round(height);

        var context = canvas.getContext("2d");
        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convert resized image to JPEG
        newOffering.image = canvas.toDataURL("image/jpeg", 0.7);

        // Save the offering
        offerings.push(newOffering);

        try {
            localStorage.setItem("managerOfferings", JSON.stringify(offerings));

            alert(name + " has been added successfully!");
            form.reset();

        } catch (error) {
            alert("Could not save the offering. Local storage may be full.");
        }

    };

    img.onerror = function () {
        alert("Could not read the selected image.");
    };

    img.src = reader.result;
};

reader.readAsDataURL(image);

};