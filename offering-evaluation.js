// Get the feedback textarea and character counter
var feedbackTextarea = document.getElementById("feedback");
var feedbackCounter = document.querySelector(".bb-counter");

// Live character counter while typing (0/1000)
feedbackTextarea.onkeyup = function() {
    var currentLength = this.value.length;
    feedbackCounter.innerHTML = currentLength + "/1000";

    // Highlight the counter when approaching the character limit
    if (currentLength >= 900) {
        feedbackCounter.style.color = "#A0522D";
        feedbackCounter.style.fontWeight = "bold";
    } else {
        feedbackCounter.style.color = "";
        feedbackCounter.style.fontWeight = "normal";
    }
};
// Attach the submit event handler to the evaluation form
document.getElementById("evaluation-form").onsubmit = function(event) {

    // Prevent the default form submission
    event.preventDefault();

    // Retrieve input values
    var offering = document.getElementById("offering").value;
    var rating = document.querySelector('input[name="rating"]:checked');
    var feedback = document.getElementById("feedback").value.trim();

    // Check if an offering is selected
if (offering === "") {
    alert("Please select an offering.");
    return false;
}

// Check if a rating is selected
if (rating === null) {
    alert("Please select a star rating.");
    return false;
}

// Check if feedback is empty
if (feedback === "") {
    alert("Please enter your feedback.");
    return false;
}

// Check the rating and display a message
var ratingValue = parseInt(rating.value);

if (ratingValue >= 3) {
    alert("Thank you for your positive feedback!");
} else {
    alert("We are sorry that your experience did not meet your expectations.");
}

// Return to the Member Dashboard
window.location.href = "member-dashboard.html";

};