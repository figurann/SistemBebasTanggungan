// Data dummy untuk kartu dashboard
const dashboardCards = [
  {
    id: 1,
    title: "Verifikasi UKT",
    content: "Informasi mengenai UKT Mahasiswa.",
    status: "pending",
    action: "Verifikasi",
    image: "../../assets/images/akademik/verifikasi-ukt.png",
    link: "../../modules/akademik/verifikasi/verifikasi-ukt.php",
  },
  {
    id: 2,
    title: "Verifikasi Tugas Akhir",
    content: "Informasi mengenai status Tugas Akhir Mahasiswa.",
    status: "pending",
    action: "Verifikasi",
    image: "../../assets/images/akademik/verifikasi-tugasakhir.png",
    link: "../../modules/akademik/verifikasi/verifikasi-tugasakhir.php",
  },
];

// ========= Dashboard Cards Initialization =========
function initializeDashboardCards() {
  const cardContainer = document.getElementById("card-container");
  if (cardContainer) {
    cardContainer.innerHTML = dashboardCards.map(createDashboardCard).join("");
  }
}

// ========= Card Functions =========
function createDashboardCard(cardData) {
  return `  
    <div class="dashboard-card" data-card-id="${cardData.id}">  
      <div class="card-icon">  
        <img src="${cardData.image}" alt="${cardData.title} Icon" />  
      </div>  
      <h3 class="card-title">${cardData.title}</h3>  
      <div class="card-content">  
        <p>${cardData.content}</p>  
      </div>  
      <div class="card-footer">  
        <a href="${cardData.link}" class="card-action" data-card-id="${cardData.id}">  
          ${cardData.action}  
        </a>  
      </div>  
    </div>  
  `;
}

// ========= Initialization =========
document.addEventListener("DOMContentLoaded", initializeDashboardCards);
