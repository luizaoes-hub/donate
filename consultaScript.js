// --- FIREBASE  ---
const firebaseConfig = {
  apiKey: "AIzaSyCo2czU7cYJaBNg4R23jL2WDa0px_JuJlE",
  authDomain: "toys-27079.firebaseapp.com",
  databaseURL: "https://toys-27079-default-rtdb.firebaseio.com/",
  projectId: "toys-27079",
  storageBucket: "toys-27079.firebasestorage.app",
  messagingSenderId: "113123012743",
  appId: "1:113123012743:web:496d19213b75bab80c8822"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const donationsRef = database.ref('donations');

const rankingContainerConsulta = document.getElementById("rankingContainerConsulta");

function carregaRankingConsulta() {
  listenForDonationsConsulta(); // Carrega o ranking
}

function listenForDonationsConsulta() {
  donationsRef.on('value', (snapshot) => {
    const donationsData = snapshot.val();
    if (!donationsData) {
      rankingContainerConsulta.innerHTML = "<p>Nenhuma doação registrada ainda.</p>";
      return;
    }

    const salaTotals = {};

    // Agrupa 
    for (const key in donationsData) {
      const donation = donationsData[key];
      const sala = donation.sala;
      const quantity = donation.quantity;

      if (salaTotals[sala]) {
        salaTotals[sala] += quantity;
      } else {
        salaTotals[sala] = quantity;
      }
    }

    // mete pro array arruma a casa
    const rankingArray = Object.entries(salaTotals).map(([sala, totalQuantity]) => ({
      sala,
      totalQuantity
    }));

    // to order again
    rankingArray.sort((a, b) => b.totalQuantity - a.totalQuantity);

    // Render
    renderRankingConsulta(rankingArray);
  });
}

function renderRankingConsulta(rankingArray) {
  rankingContainerConsulta.innerHTML = ""; // Limpa o conteúdo existente

  if (rankingArray.length === 0) {
    rankingContainerConsulta.innerHTML = "<p>Nenhuma doação registrada ainda.</p>";
    return;
  }

  const ul = document.createElement("ul");
  ul.className = "ranking-list"; 

  rankingArray.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "ranking-item"; 
    li.innerHTML = `
      <span class="position">#${index + 1}</span>
      <span class="sala-name">${item.sala}</span>
      <span class="total-toys">${item.totalQuantity} brinquedos</span>
    `;
    ul.appendChild(li);
  });

  rankingContainerConsulta.appendChild(ul);
}