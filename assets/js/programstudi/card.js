// Data dummy untuk kartu dashboard
const dashboardCards = [
  {
    id: 1,
    title: "Verifikasi Bebas Kompensasi",
    content: "Informasi mengenai jumlah kompen yang telah dikerjakan.",
    status: "pending",
    action: "Verifikasi",
    image: "../../assets/images/programstudi/verifikasi_dokumen.png",
    link: "../../modules/programstudi/verifikasi/verifikasi-kompensasi.php",
  },
  {
    id: 2,
    title: "Verifikasi SKKM",
    content: "Informasi mengenai status SKKM Mahasiswa.",
    status: "pending",
    action: "Verifikasi",
    image: "../../assets/images/programstudi/verifikasi_skkm.png",
    link: "../../modules/programstudi/verifikasi/verifikasi-skkm.php",
  },
  {
    id: 3,
    title: "Verifikasi TOEIC",
    content: "Informasi mengenai status TOEIC Mahasiswa.",
    status: "approved",
    action: "Verifikasi",
    image: "../../assets/images/programstudi/verifikasi_toeic.png",
    link: "../../modules/programstudi/verifikasi/verifikasi-toeic.php",
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
