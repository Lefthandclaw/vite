import { fetchData, showToast } from './fetch.js';

// Hae päiväkirjamerkinnät ja näytä kortit
const fetchEntries = async () => {
  try {
    const url = '/diary.json'; // Osoite JSON-tiedostoon
    const entries = await fetchData(url);

    // Tyhjennä korttialue
    const cardsContainer = document.querySelector('.cards-container');
    cardsContainer.innerHTML = '';

    // Luo kortit jokaisesta merkinnästä
    entries.forEach(entry => {
      const card = document.createElement('div');
      card.classList.add('card');

      // Lisää kuva (voit vaihtaa oikean kuvan URL:ään)
      const cardImg = document.createElement('div');
      cardImg.classList.add('card-img');
      cardImg.innerHTML = `<img src="https://placekitten.com/200/300" alt="Kissa">`;
      card.appendChild(cardImg);

      // Lisää päiväkirjamerkinnän tiedot
      const cardDiary = document.createElement('div');
      cardDiary.classList.add('card-diary');
      cardDiary.innerHTML = `
        <h4>${entry.entry_date}</h4>
        <p><strong>Mood:</strong> ${entry.mood}</p>
        <p><strong>Weight:</strong> ${entry.weight} kg</p>
        <p><strong>Sleep:</strong> ${entry.sleep_hours} hours</p>
        <p><strong>Notes:</strong> ${entry.notes}</p>
      `;
      card.appendChild(cardDiary);

      // Lisää kortti alueelle
      cardsContainer.appendChild(card);
    });
  } catch (error) {
    showToast('Failed to fetch entries', 'error');
  }
};

// Lisää tapahtumankäsittelijä painikkeelle
document.querySelector('.get_entries').addEventListener('click', fetchEntries);