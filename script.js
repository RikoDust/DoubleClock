// Liste simplifiée des fuseaux horaires avec des villes représentatives.
// Chaque entrée contient un label affiché dans le menu et une valeur IANA pour le calcul du fuseau.
const cityTimezones = [
  { label: 'UTC', value: 'Etc/UTC' },
  { label: 'Paris (UTC+1)', value: 'Europe/Paris' },
  { label: 'Londres (UTC+0)', value: 'Europe/London' },
  { label: 'New York (UTC−5)', value: 'America/New_York' },
  { label: 'Los Angeles (UTC−8)', value: 'America/Los_Angeles' },
  { label: 'Rio de Janeiro (UTC−3)', value: 'America/Sao_Paulo' },
  { label: 'Moscou (UTC+3)', value: 'Europe/Moscow' },
  { label: 'Le Caire (UTC+2)', value: 'Africa/Cairo' },
  { label: 'Dubai (UTC+4)', value: 'Asia/Dubai' },
  { label: 'New Delhi (UTC+5:30)', value: 'Asia/Kolkata' },
  { label: 'Bangkok (UTC+7)', value: 'Asia/Bangkok' },
  { label: 'Pékin (UTC+8)', value: 'Asia/Shanghai' },
  { label: 'Tokyo (UTC+9)', value: 'Asia/Tokyo' },
  { label: 'Sydney (UTC+10)', value: 'Australia/Sydney' },
  { label: 'Auckland (UTC+12)', value: 'Pacific/Auckland' },
  { label: 'Honolulu (UTC−10)', value: 'Pacific/Honolulu' },
  { label: 'Anchorage (UTC−9)', value: 'America/Anchorage' },
  { label: 'Mexico (UTC−6)', value: 'America/Mexico_City' },
  { label: 'Buenos Aires (UTC−3)', value: 'America/Argentina/Buenos_Aires' },
  { label: 'Johannesburg (UTC+2)', value: 'Africa/Johannesburg' }
];



// 📥 Sélectionne le menu déroulant dans le DOM
const citySelect = document.getElementById('city-select');


// 🏙️ Remplit dynamiquement le menu déroulant avec toutes les villes de cityTimezones
cityTimezones.forEach(city => {
  const option = document.createElement('option'); // Crée un élément <option>
  option.value = city.value;                       // Valeur = nom de fuseau horaire IANA
  option.textContent = city.label;                // Texte affiché dans le menu
  citySelect.appendChild(option);                 // Ajoute l'option dans le <select>
});


// Met à jour l'horloge locale toutes les secondes
function updateLocalTime() {
  const now = new Date(); // Date et heure actuelle de l’ordinateur
  document.getElementById('local-time').textContent = now.toLocaleTimeString(); // Affiche heure locale
}
setInterval(updateLocalTime, 1000); // Met à jour chaque seconde
updateLocalTime(); // Appel initial immédiat

// Gestion de l'horloge pour le fuseau sélectionné
let selectedZone = null;         // Fuseau sélectionné
let selectedTimer = null;        // Intervalle de mise à jour (pour pouvoir l’arrêter plus tard)
const selectedTimeElement = document.getElementById('selected-time'); // Référence à l'affichage


// Événement : changement de sélection dans le menu déroulant
citySelect.addEventListener('change', (e) => {
  selectedZone = e.target.value; // Récupère le fuseau sélectionné
  clearInterval(selectedTimer);  // Arrête l’horloge précédente s’il y en avait une

  if (!selectedZone) {
    // Si aucune ville sélectionnée, remet les tirets
    selectedTimeElement.textContent = '--:--:--';
    return;
  }

  // Fonction pour afficher l'heure du fuseau sélectionné
  function updateSelectedTime() {
    const now = new Date(); // Heure actuelle
    const formatter = new Intl.DateTimeFormat('fr-FR', {
      timeZone: selectedZone,      // Fuseau horaire choisi (ex: "Asia/Tokyo")
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,               // Format 24h
    });
    selectedTimeElement.textContent = formatter.format(now); // Affiche l’heure formatée
  }

  updateSelectedTime();                        // Appel initial
  selectedTimer = setInterval(updateSelectedTime, 1000); // Mise à jour chaque seconde
});


