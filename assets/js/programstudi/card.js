// Data dummy untuk kartu dashboard
const dashboardCards = [
  {
    id: 1,
    title: "Verifikasi Biaya UKT",
    content: "Informasi mengenai biaya UKT dan status pembayarannya.",
    status: "approved",
    action: "Verifikasi",
    image: "../../assets/images/programstudi/verifikasi_bayarukt.png",
  },
  {
    id: 2,
    title: "Verifikasi Surat Bebas Kompensasi",
    content: "Informasi mengenai surat bebas kompensasi.",
    status: "pending",
    action: "Verifikasi",
    image: "../../assets/images/programstudi/verifikasi_dokumen.png",
  },
  {
    id: 3,
    title: "Verifikasi SKKM",
    content: "Informasi mengenai status SKKM Anda.",
    status: "pending",
    action: "Verifikasi",
    image: "../../assets/images/programstudi/verifikasi_skkm.png",
  },
  {
    id: 4,
    title: "Verifikasi TOEIC",
    content: "Informasi mengenai status TOEIC Anda.",
    status: "approved",
    action: "Verifikasi",
    image: "../../assets/images/programstudi/verifikasi_toeic.png",
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
        <button class="card-action" data-card-id="${cardData.id}">  
          ${cardData.action}  
        </button>  
      </div>  
    </div>  
  `;
}

// ========= Initialization =========
document.addEventListener("DOMContentLoaded", initializeDashboardCards);
