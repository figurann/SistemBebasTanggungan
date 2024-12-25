document.addEventListener("DOMContentLoaded", function () {
  // Profile dropdown functionality
  const profileContainer = document.querySelector(".profile-container");
  const profileDropdown = document.querySelector(".profile-dropdown");

  if (profileContainer && profileDropdown) {
    profileContainer.addEventListener("click", function (e) {
      e.stopPropagation();
      profileDropdown.classList.toggle("show");
    });

    // Close dropdown when clicking outside
    document.addEventListener("DOMContentLoaded", () => {
      const cardContainer = document.getElementById("card-container");
      if (cardContainer) {
        cardContainer.innerHTML = dashboardCards.map(createDashboardCard).join("");
    
        // Event listener for card actions
        cardContainer.addEventListener("click", (e) => {
          const actionButton = e.target.closest(".card-action");
          if (actionButton && actionButton.tagName.toLowerCase() === 'button') {
            const cardId = parseInt(actionButton.dataset.cardId);
            handleCardAction(cardId);
          }
        });
      }
    
      // Additional listeners and initialization code
    });    
  }

  // Logout functionality
  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", function (e) {
      e.preventDefault();
      window.location.href = "../login.html";
    });
  }

  // Active menu highlighting with dropdown support
  const currentLocation = window.location.pathname;
  const menuItems = document.querySelectorAll(".nav-links li a");

  menuItems.forEach((item) => {
    // Check main menu items
    if (item.getAttribute("href") === currentLocation) {
      item.parentElement.classList.add("active");
    }

    // Check dropdown items
    const dropdownLinks = item.parentElement.querySelectorAll(
      ".dropdown-content a"
    );
    dropdownLinks.forEach((dropdownLink) => {
      if (dropdownLink.getAttribute("href") === currentLocation) {
        item.parentElement.classList.add("active");
      }
    });
  });

  // Enhanced dropdown menu behavior
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    const dropdownContent = dropdown.querySelector(".dropdown-content");
    let timeoutId;

    // Show dropdown
    dropdown.addEventListener("mouseenter", function () {
      clearTimeout(timeoutId);
      dropdowns.forEach((d) => {
        if (d !== dropdown) {
          d.querySelector(".dropdown-content").style.display = "none";
        }
      });
      dropdownContent.style.display = "block";
    });

    // Hide dropdown with delay
    dropdown.addEventListener("mouseleave", function () {
      timeoutId = setTimeout(() => {
        dropdownContent.style.display = "none";
      }, 200); // Small delay to prevent accidental mouseout
    });

    // Handle touch events for mobile
    dropdown.addEventListener("touchstart", function (e) {
      e.preventDefault();
      dropdowns.forEach((d) => {
        if (d !== dropdown) {
          d.querySelector(".dropdown-content").style.display = "none";
        }
      });
      dropdownContent.style.display =
        dropdownContent.style.display === "block" ? "none" : "block";
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown-content").forEach((dropdown) => {
        dropdown.style.display = "none";
      });
    }
  });

  // Handle window resize
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (window.innerWidth > 768) {
        document.querySelectorAll(".dropdown-content").forEach((dropdown) => {
          dropdown.style.removeProperty("display");
        });
      }
    }, 250);
  });
});
