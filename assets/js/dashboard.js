/* ========= Navigation Active State Handler ========= */
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-links li");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Remove active class from all links
      navLinks.forEach((item) => item.classList.remove("active"));

      // Add active class to clicked link
      this.classList.add("active");
    });
  });
});

/* ========= Dashboard Functions ========= */
// Add your other dashboard functions here

/* ========= Event Listeners ========= */
// Add your event listeners here

/* ========= Utility Functions ========= */
// Add your utility functions here
