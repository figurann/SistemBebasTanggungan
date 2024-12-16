// ========= Event Listeners Initialization =========
document.addEventListener("DOMContentLoaded", initializeApp);
window.onerror = handleGlobalError;

// ========= DOM Elements =========
const DOM = {
  navLinks: () => document.querySelectorAll(".nav-links li"),
  profileContainer: () => document.querySelector(".profile-container"),
  profileDropdown: () => document.querySelector(".profile-dropdown"),
  logoutButton: () => document.getElementById("logout"),
  notificationIcon: () => document.querySelector(".notification-icon"),
};

// ========= Main Application Initialize =========
function initializeApp() {
  const elements = {
    navLinks: DOM.navLinks(),
    profileContainer: DOM.profileContainer(),
    profileDropdown: DOM.profileDropdown(),
    logoutButton: DOM.logoutButton(),
    notificationIcon: DOM.notificationIcon(),
  };

  initializeNavigationHandlers(elements);
  initializeProfileHandlers(elements);
  initializeNotificationHandlers(elements);
  initializeLogoutHandler(elements);
  initializeWindowHandlers(elements);
  setActiveMenu(elements.navLinks);
}

// ========= Navigation Handlers =========
function initializeNavigationHandlers({ navLinks }) {
  navLinks.forEach((link) => {
    link.addEventListener("mouseover", function () {
      this.classList.add("hover");
    });
    link.addEventListener("mouseout", function () {
      this.classList.remove("hover");
    });
    link.addEventListener("click", function (e) {
      handleNavigation(e, this, navLinks);
    });
  });
}

function handleNavigation(event, clickedLink, allLinks) {
  if (!clickedLink.classList.contains("dropdown")) {
    allLinks.forEach((item) => item.classList.remove("active"));
    clickedLink.classList.add("active");
  }
}

// ========= Profile Handlers =========
function initializeProfileHandlers({ profileContainer, profileDropdown }) {
  document.addEventListener("click", (event) => {
    if (!profileContainer.contains(event.target)) {
      profileDropdown.style.display = "none";
    }
  });

  profileContainer.addEventListener("mouseenter", () => {
    profileDropdown.style.display = "block";
  });

  profileContainer.addEventListener("mouseleave", () => {
    profileDropdown.style.display = "none";
  });
}

// ========= Notification Handlers =========
function initializeNotificationHandlers({ notificationIcon }) {
  notificationIcon?.addEventListener("click", handleNotificationClick);
}

function handleNotificationClick() {
  console.log("Menampilkan notifikasi...");
}

// ========= Logout Handler =========
function initializeLogoutHandler({ logoutButton }) {
  if (logoutButton) {
    logoutButton.addEventListener("click", handleLogout);
  }
}

function handleLogout(event) {
  event.preventDefault();
  console.log("Logout button clicked. Redirecting to login.php...");

  const logoutPath = "../../views/login.php";

  // Debug: Verify Path
  fetch(logoutPath, { method: "HEAD" })
    .then((response) => {
      if (response.ok) {
        window.location.href = logoutPath;
      } else {
        console.error("Error: File login.php not found.");
        alert("Error: Cannot find the login page.");
      }
    })
    .catch(() => {
      console.error("Network error. Redirecting with fallback...");
      window.location.assign(logoutPath);
    });
}

// ========= Window Event Handlers =========
function initializeWindowHandlers({ profileDropdown }) {
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      profileDropdown.style.display = "none";
    }, 250);
  });
}

// ========= Menu State Management =========
function setActiveMenu(navLinks) {
  const currentPath = window.location.pathname;
  navLinks.forEach((link) => {
    const anchor = link.querySelector("a");
    if (anchor && anchor.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });
}

// ========= Error Handling =========
function handleGlobalError(msg, url, lineNo, columnNo, error) {
  console.error(
    `Error: ${msg}\nURL: ${url}\nLine: ${lineNo}\nColumn: ${columnNo}\nError object: ${JSON.stringify(
      error
    )}`
  );
  return false;
}
