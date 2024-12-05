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
      this.classList.add("hover"); // Tindakan hover
    });
    link.addEventListener("mouseout", function () {
      this.classList.remove("hover"); // Menghapus kelas hover
    });
    link.addEventListener("click", function (e) {
      handleNavigation(e, this, navLinks);
    });
  });
}

function handleNavigation(event, clickedLink, allLinks) {
  allLinks.forEach((item) => item.classList.remove("active"));
  clickedLink.classList.add("active");

  if (clickedLink.classList.contains("dropdown")) {
    event.preventDefault();
  }
}

// ========= Profile Handlers =========
function initializeProfileHandlers({ profileContainer, profileDropdown }) {
  document.addEventListener("click", (event) => {
    if (!profileContainer.contains(event.target)) {
      profileDropdown.style.display = "none";
    }
  });

  if (window.innerWidth <= 768) {
    profileContainer.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleProfileDropdown(profileDropdown);
    });
  } else {
    profileContainer.addEventListener("mouseenter", () => {
      showProfileDropdown();
    });

    profileContainer.addEventListener("mouseleave", () => {
      hideProfileDropdown();
    });

    profileDropdown.addEventListener("mouseenter", (e) => {
      e.stopPropagation();
    });

    profileDropdown.addEventListener("mouseleave", (e) => {
      e.stopPropagation();
    });
  }
}

function toggleProfileDropdown(dropdown) {
  dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
}

function showProfileDropdown() {
  const profileDropdown = DOM.profileDropdown();
  profileDropdown.style.display = "block";
}

function hideProfileDropdown() {
  const profileDropdown = DOM.profileDropdown();
  profileDropdown.style.display = "none";
}

// ========= Notification Handlers =========
function initializeNotificationHandlers({ notificationIcon }) {
  notificationIcon?.addEventListener("click", handleNotificationClick);
}

function handleNotificationClick() {
  console.log("Menampilkan notifikasi...");
  // Implementasi logika untuk menampilkan notifikasi, jika ada
}

// ========= Logout Handler =========
function initializeLogoutHandler({ logoutButton }) {
  logoutButton.addEventListener("click", handleLogout);
}

function handleLogout(event) {
  event.preventDefault();
  // Logika logout, bisa menghapus sesi atau mengalihkan ke halaman login
  console.log("Logout...");
  window.location.href = "../login.html"; // Ubah sesuai dengan URL logout
}

// ========= Window Event Handlers =========
function initializeWindowHandlers({ profileDropdown }) {
  window.addEventListener("resize", () => {
    profileDropdown.style.display = "none";
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

// ========= Utility Functions =========
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
