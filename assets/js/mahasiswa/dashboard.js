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
  console.log("Notification clicked");
}

// ========= Logout Handlers =========
function initializeLogoutHandler({ logoutButton }) {
  logoutButton?.addEventListener("click", (e) => {
    e.preventDefault();
    handleLogout();
  });
}

function handleLogout() {
  showLogoutConfirmation();
}

function showLogoutConfirmation() {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.innerHTML = `
    <div class="modal">
      <div class="modal-content">
        <p>Apakah kamu mau Logout dari Sistem Bebas Tanggungan?</p>
        <div class="modal-buttons">
          <button class="modal-button modal-button-secondary" id="cancel-logout">Tidak</button>
          <button class="modal-button modal-button-primary" id="confirm-logout">Iya</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById("cancel-logout").addEventListener("click", () => {
    modal.classList.add("modal-fade-out");
    setTimeout(() => {
      document.body.removeChild(modal);
    }, 300);
  });

  document.getElementById("confirm-logout").addEventListener("click", () => {
    modal.classList.add("modal-fade-out");
    setTimeout(() => {
      document.body.removeChild(modal);
      window.location.href = "login.html";
    }, 300);
  });

  setTimeout(() => modal.classList.add("modal-fade-in"), 0);
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
