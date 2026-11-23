document.getElementById("join-form").onsubmit = function(event) {
    
    // Prevent the default form submission until all inputs are validated
    event.preventDefault();

    // Retrieve input values from the DOM
    var photoInput = document.getElementById("photo");
    var name = document.getElementById("name").value.trim();
    var dob = document.getElementById("dob").value;
    var email = document.getElementById("email").value.trim();
    var expertise = document.getElementById("expertise").value.trim();
    var skills = document.getElementById("skills").value.trim();
    var education = document.getElementById("education").value;

    // 1. Check that no required fields are empty
    if (photoInput.files.length === 0 || name === "" || dob === "" || email === "" || expertise === "" || skills === "" || education === "") {
        alert("Please fill in all required fields and upload your photo.");
        return false;
    }

    // .) Check that the Name field does not start with a number using RegEx
    if (/^\d/.test(name)) {
        alert("Invalid Name: Name cannot start with a number.");
        return false;
    }

    // 3. Check that the uploaded file is an image only
    var fileName = photoInput.value;
    if (!/\.(jpg|jpeg|png|gif|webp)$/i.test(fileName)) {
        alert("Invalid File: Please upload an image file only (jpg, jpeg, png, gif, webp).");
        return false;
    }

    // 4. Check that the year of birth is 2008 or earlier
    var birthDate = new Date(dob);
    var birthYear = birthDate.getFullYear();
    if (birthYear > 2008) {
        alert("Invalid Date of Birth: Your year of birth must be 2008 or earlier.");
        return false;
    }

    // 5. If all inputs are valid, display a confirmation alert with the sender's name
    alert("Thank you, " + name + "! Your application to join the Bite&Bond team has been submitted successfully.");
    
    // Reset the form fields and upload label after successful submission
    document.getElementById("join-form").reset();
    var label = document.querySelector(".upload-btn");
    label.innerHTML = "Upload photo";
    label.style.color = "";
    return true;
};


// Display the selected image file name immediately upon selection
document.getElementById("photo").onchange = function() {
    var file = this.files[0];
    if (file && /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)) {
        // Update the upload button label to show the selected file name
        var label = document.querySelector(".upload-btn");
        label.innerHTML = "Selected: " + file.name;
        label.style.color = "#A0522D";
    }
};
