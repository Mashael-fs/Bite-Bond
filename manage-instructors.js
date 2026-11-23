var deleteForm = document.getElementById("delete-instructors");

var instructors = document.getElementsByName("instructors");

var selectAll = document.getElementById("select-all");

selectAll.onclick = function () {

    for (var i = 0; i < instructors.length; i++) {
        instructors[i].checked = selectAll.checked;
    }

};

deleteForm.onsubmit = function (event) {

    event.preventDefault();

    var selected = [];

    for (var i = 0; i < instructors.length; i++) {

        if (instructors[i].checked) {
            selected.push(instructors[i]);
        }

    }

    if (selected.length === 0) {
        alert("Please select at least one instructor to delete.");
        return;
    }

    if (confirm("Are you sure you want to delete the selected instructors?")) {

        for (var i = 0; i < selected.length; i++) {
            selected[i].closest(".bb-person").remove();
        }

        selectAll.checked = false;
    }

};

// Add New Instructor Form
document.getElementById("add-instructor-form").onsubmit = function(event) {

    event.preventDefault();
    // Retrieve input values
    var photoInput = document.getElementById("photo");
    var name = document.getElementById("name").value.trim();
    var dob = document.getElementById("dob").value;
    var email = document.getElementById("email").value.trim();
    var expertise = document.getElementById("expertise").value.trim();
    var skills = document.getElementById("skills").value.trim();
    var education = document.getElementById("education").value;
    // Check that no required fields are empty
if (photoInput.files.length === 0 || name === "" || dob === "" ||
    email === "" || expertise === "" || skills === "" || education === "") {

    alert("Please fill in all required fields and upload your photo.");
    return false;
}
// Check that the name does not start with a number
if (/^\d/.test(name)) {
    alert("Invalid Name: Name cannot start with a number.");
    return false;
}

// Check that the uploaded file is an image
var image = photoInput.files[0];

if (image.type.indexOf("image/") !== 0) {
    alert("Invalid File: Please upload an image file only.");
    return false;
}
    // Check that the year of birth is 2008 or earlier
    var birthDate = new Date(dob);
    var birthYear = birthDate.getFullYear();

    if (birthYear > 2008) {
     alert("Invalid Date of Birth: Your year of birth must be 2008 or earlier.");
     return false;
    }
    // Get the instructors list
var instructorsList = document.querySelector(".bb-instructors .bb-flex");
// Create a new instructor card
var newInstructor = document.createElement("div");
newInstructor.className = "bb-person";

// Create the instructor name
var instructorName = document.createElement("h3");
instructorName.textContent = name;

// Add the name to the card
newInstructor.appendChild(instructorName);
// Create the instructor image
var instructorImage = document.createElement("img");

// Read the uploaded image
var reader = new FileReader();

reader.onload = function () {
    instructorImage.src = reader.result;

    // Display the new instructor
    instructorsList.appendChild(newInstructor);

    // Show success message
    alert(name + " has been added successfully!");

    // Clear the form
    document.getElementById("add-instructor-form").reset();
};

reader.readAsDataURL(image);

// Set the image description
instructorImage.alt = name;

// Add the image before the instructor name
newInstructor.insertBefore(instructorImage, instructorName);
// Create a checkbox for the new instructor
var instructorCheckbox = document.createElement("input");
instructorCheckbox.type = "checkbox";
instructorCheckbox.name = "instructors";

// Add the checkbox to the card
newInstructor.appendChild(instructorCheckbox);
};