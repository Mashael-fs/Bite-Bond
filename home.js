// 1. Back to Top Button on Scroll

var backToTopBtn = document.getElementById("back-to-top");

if (backToTopBtn) {
    // Show button when user scrolls down more than 200px
    window.onscroll = function() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    };

    // Scroll smoothly back to the top of the page when clicked
    backToTopBtn.onclick = function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
}


//2. Real-Time Clock in Footer

var clockElement = document.getElementById("live-clock");

function updateFooterClock() {
    if (clockElement) {
        var now = new Date();
        clockElement.innerHTML = "Current Time: " + now.toLocaleString();
    }
}

// Run immediately so there is no 1-second delay on page load, then update every second
updateFooterClock();
setInterval(updateFooterClock, 1000);


// 3. Interactive Member Reviews

var nextReviewBtn = document.getElementById("next-review");
var prevReviewBtn = document.getElementById("prev-review");

if (nextReviewBtn && prevReviewBtn) {
    var reviews = [
        {
            text: "“Amazing community and a great place to learn new cooking skills!”",
            author: "Italian Pasta Workshop · Club Member",
            stars: "★★★★★"
        },
        {
            text: "“The Gourmet BBQ & Steak Grill session taught me techniques I use every weekend!”",
            author: "Gourmet BBQ & Steak Grill · Club Member",
            stars: "★★★★★"
        },
        {
            text: "“A wonderful cooking experience! The workshop was fun, well-organized, and the instructor was very helpful.”",
            author: "French Pastry Basics · Club Member",
            stars: "★★★★★"
        }
    ];

    var currentReviewIndex = 0;

    function showReview(index) {
        document.getElementById("home-review-text").innerHTML = reviews[index].text;
        document.getElementById("home-review-author").innerHTML = reviews[index].author;
        document.getElementById("home-review-stars").innerHTML = reviews[index].stars;
    }

    nextReviewBtn.onclick = function() {
        currentReviewIndex = (currentReviewIndex + 1) % reviews.length;
        showReview(currentReviewIndex);
    };

    prevReviewBtn.onclick = function() {
        currentReviewIndex = (currentReviewIndex - 1 + reviews.length) % reviews.length;
        showReview(currentReviewIndex);
    };
}