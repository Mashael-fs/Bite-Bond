// Global Website Theme (Applies to All Pages)

// 1. Immediately apply the saved theme whenever ANY page loads
var savedTheme = localStorage.getItem("biteBondTheme");
var themeBtn = document.getElementById("theme-toggle");

if (savedTheme === "dark") {
    document.body.className = "dark-theme";
    if (themeBtn) {
        themeBtn.innerHTML = "Light Theme";
    }
} else {
    document.body.className = "";
    if (themeBtn) {
        themeBtn.innerHTML = "Dark Theme";
    }
}

// 2. Handle the Theme Toggle button (only exists on the Home Page)
if (themeBtn) {
    themeBtn.onclick = function() {
        if (document.body.className === "dark-theme") {
            document.body.className = "";
            themeBtn.innerHTML = "Dark Theme";
            localStorage.setItem("biteBondTheme", "light");
        } else {
            document.body.className = "dark-theme";
            themeBtn.innerHTML = "Light Theme";
            localStorage.setItem("biteBondTheme", "dark");
        }
    };
}