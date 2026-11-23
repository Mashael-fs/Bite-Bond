document.getElementById("join-form").onsubmit = function(event) {

    event.preventDefault();

    // Retrieve input values
    var offering = document.getElementById("offering").value;
    var fullName = document.getElementById("fullname").value.trim();
    var preferredDate = document.getElementById("preferred-date").value;
    // Check if an offering is selected
if (offering === "") {
    alert("Please select an offering.");
    return false;
}
// Check that the full name contains only letters and spaces
if (!/^[a-zA-Z ]+$/.test(fullName)) {
    alert("Full name must contain letters only, without numbers or special characters.");
    return false;
}

// Check that the user entered a full name
// Check if the name is empty
if (fullName === "") {
    alert("Please enter your full name.");
    return false;
}

// Check that the name contains only letters and spaces
for (var i = 0; i < fullName.length; i++) {
    var character = fullName.charAt(i);

    if (!((character >= "A" && character <= "Z") ||
          (character >= "a" && character <= "z") ||
          character === " ")) {
        alert("Full name must contain letters only, without numbers or special characters.");
        return false;
    }
}

// Check that the member entered at least two names
var nameParts = fullName.split(" ");
var nameCount = 0;

// Loop through all parts of the name
for (var i = 0; i < nameParts.length; i++) {
   // Ignore empty parts caused by extra spaces between names
   // Only count non-empty words
    if (nameParts[i] !== "") {
        nameCount++;
    }
}

// A valid full name must contain at least two words (first and last name)
// If fewer than two words are entered, display an alert and stop submission
if (nameCount < 2) {
    alert("Please enter your full name (first and last name).");
    return false;
}

// Check that the preferred date is in the future
if (preferredDate === "") {
    alert("Please select a preferred date.");
    return false;
}

// Convert the preferred date from a string into a Date object
// Set the time to midnight in the local time zone to avoid
// incorrect comparisons caused by UTC and local time differences
var selectedDate = new Date(preferredDate + "T00:00:00");

// Create a Date object representing the current date and time
var today = new Date();
// Set today's time to midnight to compare dates without time differences
today.setHours(0, 0, 0, 0);

// Reject the selected date if it is today or any date in the past
if (selectedDate <= today) {
    alert("Preferred date must be a future date.");
    return false;
}
// Ask the member whether to stay or return to the dashboard
var stayOnPage = confirm(
    "Your participation request has been sent successfully!\n" +
    "Click OK to stay on this page, or Cancel to return to the Member Dashboard."
);

if (stayOnPage === false) {
    window.location.href = "member-dashboard.html";
    return false;
}
// Get the selected offering name
var offeringSelect = document.getElementById("offering");
var offeringName = offeringSelect.options[offeringSelect.selectedIndex].text;

// Create a new request
var newRequest = document.createElement("div");
newRequest.className = "bb-details";

// Create request information
var requestOffering = document.createElement("p");
requestOffering.textContent = "Offering: " + offeringName;

var requestName = document.createElement("p");
requestName.textContent = "Member Name: " + fullName;

var requestDate = document.createElement("p");
requestDate.textContent = "Preferred Date: " + preferredDate;

// Add information to the request
newRequest.appendChild(requestOffering);
newRequest.appendChild(requestName);
newRequest.appendChild(requestDate);

// Display the request
document.getElementById("requests-list").appendChild(newRequest);

// Clear the form
document.getElementById("join-form").reset();
};