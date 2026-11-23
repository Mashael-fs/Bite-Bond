// 1. Community Page: Character Counter, Photo Label & Post Validation
   
var postForm = document.querySelector(".post-form");
if (postForm) {
    var postTextarea = postForm.querySelector("textarea[name='post_content']");
    var charCount = postForm.querySelector(".char-count");
    var postPhoto = document.getElementById("post-photo");

    // Live character counter while typing (0/1000)
    postTextarea.onkeyup = function() {
        var currentLength = this.value.length;
        charCount.innerHTML = currentLength + "/1000";
        if (currentLength >= 900) {
            charCount.style.color = "#A0522D";
            charCount.style.fontWeight = "bold";
        } else {
            charCount.style.color = "";
            charCount.style.fontWeight = "normal";
        }
    };

    // Show selected image filename on the upload button
    postPhoto.onchange = function() {
        var file = this.files[0];
        if (file && /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)) {
            var label = postForm.querySelector(".upload-btn");
            label.innerHTML = "Selected: " + file.name;
            label.style.color = "#A0522D";
            label.style.fontWeight = "bold";
        }
    };

    // Validate and submit new post
    postForm.onsubmit = function(event) {
        event.preventDefault();
        var content = postTextarea.value.trim();
        var category = postForm.querySelector("select[name='food_category']").value;
        var postType = postForm.querySelector("select[name='post_type']").value;

        if (content === "" || category === "" || postType === "") {
            alert("Please write your post and select both a Food Category and Post Type.");
            return false;
        }

        alert("Your post has been shared with the Bite&Bond community!");
        postForm.reset();
        charCount.innerHTML = "0/1000";
        var label = postForm.querySelector(".upload-btn");
        label.innerHTML = "Upload photo";
        label.style.color = "";
        label.style.fontWeight = "normal";
        return true;
    };
}


// 2. Shared Post Card Actions (Community & All Posts): Like, Comment, Share
   
var actionButtons = document.querySelectorAll(".action-btn");
for (var i = 0; i < actionButtons.length; i++) {
    actionButtons[i].onclick = function() {
        var btnText = this.innerHTML.trim();
        var postContentDiv = this.parentNode.parentNode;

        // Toggle Like state
        if (btnText === "Like") {
            this.innerHTML = "Liked &#9829;";
            this.style.backgroundColor = "#B84A39";
            this.style.color = "#FFFFFF";
        } else if (btnText.indexOf("Liked") !== -1) {
            this.innerHTML = "Like";
            this.style.backgroundColor = "";
            this.style.color = "";
        }
        // Add a comment
        else if (btnText === "Comment") {
            var userComment = prompt("Write your comment:", "");
            if (userComment !== null && userComment.trim() !== "") {
                var commentPara = document.createElement("p");
                commentPara.innerHTML = "<strong>You:</strong> " + userComment.trim();
                commentPara.style.marginTop = "8px";
                commentPara.style.fontSize = "0.9em";
                commentPara.style.color = "#C88A55";
                postContentDiv.appendChild(commentPara);
            }
        }
        // Share confirmation alert
        else if (btnText === "Share") {
            var author = postContentDiv.querySelector(".member-name").innerHTML;
            alert("Post link by " + author + " copied to clipboard!");
        }
    };
}


// 3. All Posts Page: Search & Filter Posts

var filterForm = document.querySelector(".filter-form");
if (filterForm) {
    filterForm.onsubmit = function(event) {
        event.preventDefault();

        var selectedCategory = document.getElementById("food-category").value.toLowerCase();
        var selectedType = document.getElementById("post-type").value.toLowerCase();
        var locationInput = document.getElementById("location").value.trim().toLowerCase();
        var selectedRating = document.getElementById("rating").value;

        var postCards = document.querySelectorAll(".posts-section .post-card");

        for (var i = 0; i < postCards.length; i++) {
            var card = postCards[i];
            var tagsText = card.querySelector(".post-tags").innerText.toLowerCase();
            var starsCount = card.querySelector(".post-stars").innerText.trim().length;

            // Check each filter condition
            var matchCategory = (selectedCategory === "all") || (tagsText.indexOf(selectedCategory) !== -1);
            var matchType = (selectedType === "all") || (tagsText.indexOf(selectedType) !== -1);
            var matchLocation = (locationInput === "") || (tagsText.indexOf(locationInput) !== -1);
            var matchRating = (selectedRating === "") || (starsCount === parseInt(selectedRating));

            // Show or hide card based on match
            if (matchCategory && matchType && matchLocation && matchRating) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        }
    };
}


// 4. Recipes Page: Live Search & Category Filter

var recipesPage = document.querySelector(".recipes-page");
if (recipesPage) {
    var searchInput = recipesPage.querySelector(".search-input-box input");
    var categorySelect = recipesPage.querySelector(".category-select-box select");
    var recipeCards = recipesPage.querySelectorAll(".recipe-card");

    function filterRecipes() {
        var keyword = searchInput.value.trim().toLowerCase();
        var category = categorySelect.value.toLowerCase();

        for (var i = 0; i < recipeCards.length; i++) {
            var card = recipeCards[i];
            var cardText = card.innerText.toLowerCase();
            var dishType = card.querySelector(".dish-type").innerText.toLowerCase();

            var matchesKeyword = (keyword === "") || (cardText.indexOf(keyword) !== -1);
            var matchesCategory = (category === "all") ||
                (category === "main-dishes" && (dishType.indexOf("main") !== -1)) ||
                (category === "desserts" && dishType.indexOf("dessert") !== -1) ||
                (category === "appetizers" && dishType.indexOf("appetizer") !== -1) ||
                (category === "healthy" && dishType.indexOf("healthy") !== -1);

            if (matchesKeyword && matchesCategory) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        }
    }

    // Trigger filtering as the user types or changes the category dropdown
    searchInput.onkeyup = filterRecipes;
    categorySelect.onchange = filterRecipes;
}

// 5. Cooking Tips Page: Live Search & Category Filter

var tipsPage = document.querySelector(".bb-tip-flex");

if (tipsPage) {
    var tipSearchInput = document.getElementById("tip-search");
    var tipCategorySelect = document.getElementById("tip-category");
    var tipCards = tipsPage.querySelectorAll(".bb-tip-card");

    function filterTips() {
        var keyword = tipSearchInput.value.trim().toLowerCase();
        var category = tipCategorySelect.value.toLowerCase();

        for (var i = 0; i < tipCards.length; i++) {
            var card = tipCards[i];
            var cardText = card.textContent.toLowerCase();
            var tipCategory = card.getAttribute("data-category").toLowerCase();

            // Check if the tip contains the search keyword
            var matchesKeyword = (keyword === "") ||
                (cardText.indexOf(keyword) !== -1);

            // Check if the tip belongs to the selected category
            var matchesCategory = (category === "all") ||
                (tipCategory === category);

            // Show the tip only if both conditions are satisfied
            if (matchesKeyword && matchesCategory) {
                card.style.display = "";
            } else {
                card.style.display = "none";
            }
        }
    }

    // Trigger filtering as the user types or changes the category dropdown
    tipSearchInput.onkeyup = filterTips;
    tipCategorySelect.onchange = filterTips;
}