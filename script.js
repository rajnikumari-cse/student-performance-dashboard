
const searchInput = document.querySelector("#student-search");
const performanceFilter = document.querySelector("#performance-filter");
const studentRows = document.querySelectorAll("#student-table-body tr");
const studentCount = document.querySelector("#student-count");
const noResults = document.querySelector("#no-results");

// Show today's date
const dateElement = document.querySelector("#current-date");

dateElement.textContent = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
});

// Get performance category from marks
function getPerformance(marks) {
    if (marks >= 90) {
        return "excellent";
    } else if (marks >= 80) {
        return "good";
    } else {
        return "improve";
    }
}

// Filter students by name, course or performance
function filterStudents() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedPerformance = performanceFilter.value;

    let visibleStudents = 0;

    studentRows.forEach(function(row) {
        const rowText = row.textContent.toLowerCase();
        const marks = Number(row.dataset.marks);
        const performance = getPerformance(marks);

        const matchesSearch = rowText.includes(searchText);

        const matchesPerformance =
            selectedPerformance === "all" ||
            selectedPerformance === performance;

        if (matchesSearch && matchesPerformance) {
            row.hidden = false;
            visibleStudents++;
        } else {
            row.hidden = true;
        }
    });

    studentCount.textContent =
        visibleStudents + (visibleStudents === 1 ? " student" : " students");

    noResults.hidden = visibleStudents !== 0;
}

// Update the performance status counts
function updatePerformanceCounts() {
    let excellent = 0;
    let good = 0;
    let improve = 0;

    studentRows.forEach(function(row) {
        const marks = Number(row.dataset.marks);
        const performance = getPerformance(marks);

        if (performance === "excellent") {
            excellent++;
        } else if (performance === "good") {
            good++;
        } else {
            improve++;
        }
    });

    document.querySelector("#excellent-count").textContent = excellent;
    document.querySelector("#good-count").textContent = good;
    document.querySelector("#improve-count").textContent = improve;
}

// Run search when the user types
searchInput.addEventListener("input", filterStudents);

// Run filter when the selected option changes
performanceFilter.addEventListener("change", filterStudents);

// Handle contact form
const contactForm = document.querySelector("#contact-form");
const formMessage = document.querySelector("#form-message");

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.querySelector("#contact-name").value.trim();

    formMessage.textContent =
        "Thank you, " + name + "! Your form has been validated.";

    contactForm.reset();
});

// Highlight the active navigation link
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(function(link) {
    link.addEventListener("click", function() {
        navLinks.forEach(function(item) {
            item.classList.remove("active");
        });

        link.classList.add("active");
    });
});

// Initialize dashboard
updatePerformanceCounts();
filterStudents();
