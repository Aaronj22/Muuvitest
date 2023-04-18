document.addEventListener('DOMContentLoaded', () => {
  const diaryForm = document.querySelector('form');
  const diaryEntries = document.querySelector('#diary_entries');

  diaryEntries.addEventListener('click', (event) => {
    const listItem = event.target.closest('li');
    if (listItem) {
      const diaryEntryId = listItem.dataset.id;
      showDiaryEntry(diaryEntryId);
    }

  });

  const loadMoreButton = document.querySelector('#load-more');

loadMoreButton.addEventListener('click', async () => {
  const skip = document.querySelectorAll('#diary_entries li').length;
  await fetchDiaryEntries(skip);
  
});

  fetchDiaryEntries();
  
  function addNewDiaryEntryToDOM(diaryEntry) {

    console.log('Diary Entry:', diaryEntry);

    const listItem = document.createElement('li');
    listItem.dataset.id = diaryEntry._id;
  
    const diaryDate = new Date(diaryEntry.diary_date);
    const formattedDate = diaryDate.toLocaleDateString('fi-FI');
    listItem.textContent = `${formattedDate} - ${diaryEntry.body}`;
    const emojiSpan = document.createElement('span');
    emojiSpan.className = diaryEntry.emojiClass;
    listItem.appendChild(emojiSpan);
    diaryEntries.prepend(listItem);
  }
  
// TOIMII ILMAN TÄTÄ KOODIA
  // function addNewDiaryEntryToDOM(diaryEntry) {
  //   const listItem = document.createElement('li');
  //   listItem.dataset.id = diaryEntry._id;
  //   listItem.textContent = `${new Date(diaryEntry.diary_date).toLocaleDateString('fi-FI')} - ${diaryEntry.body}`;
  //   const emojiSpan = document.createElement('span');
  //   emojiSpan.className = diaryEntry.emojiClass;
  //   listItem.appendChild(emojiSpan);
  //   diaryEntries.prepend(listItem);
  // }

  function showSavedMessage() {
    const message = document.createElement('div');
    message.textContent = 'Päiväkirja tallennettu';
    message.style.backgroundColor = 'green';
    message.style.color = 'white';
    message.style.padding = '12px';
    message.style.borderRadius = '15px';
    message.style.marginTop = '12px';
    message.style.width = 'fit-content';

    const container = document.querySelector('.diary');
    container.appendChild(message);

    setTimeout(() => {
      container.removeChild(message);
    }, 5000);
  }

  diaryForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    console.log("Validationg running");

    const date = new Date(document.querySelector('#diary_date').value);

    const content = document.querySelector('textarea').value;
    const activeEmoji = document.querySelector('.emoji-active');
    const emojiClass = activeEmoji ? activeEmoji.className : '';

    if (!date || content.length < 1 || !emojiClass) {
      event.preventDefault();
      alert('Valitse fiilis-hymiö ja/tai kirjoita vähintään 1 merkki ennen tallentamista');
      return;
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ diary_date: date, body: content, emojiClass: emojiClass }),
    };

    try {
      const response = await fetch('/diaryEntries', requestOptions);
      const newDiaryEntry = await response.json();

      if (response.ok) {
        showSavedMessage();
        addNewDiaryEntryToDOM(newDiaryEntry);

        document.querySelector('#diary_date').value = '';
        document.querySelector('textarea').value = '';
      } else {
        throw new Error('Virhe tallentaessa päiväkirjaa');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

  async function fetchDiaryEntries(skip = 0) {
    try {
      const response = await fetch(`/diaryEntries?skip=${skip}`);
      const diaryEntriesData = await response.json();
  
      diaryEntriesData.forEach((entry) => {
        addNewDiaryEntryToDOM(entry);
      });
    } catch (error) {
      console.error('Error fetching diary entries:', error);
    }
  }
  

  const activitiesButton = document.querySelector('#activities');
  const activitiesList = document.querySelector('.activities');

  activitiesButton.addEventListener('click', () => {
    activitiesList.toggleAttribute('hidden');
  });

});

async function showDiaryEntry(diaryEntryId) {
  if (!diaryEntryId) {
    document.querySelector('#selected_diary_entry').innerHTML = '';
    return;
  }

  try {
    const response = await fetch(`/diaryEntries/${diaryEntryId}`);
    const diaryEntry = await response.json();

    const diaryEntryHtml = `
      <h2>${new Date(diaryEntry.diary_date).toLocaleDateString('fi-FI')}</h2>
      <p>${diaryEntry.body}</p>
      <span class="${diaryEntry.emojiClass}"></span>
    `;

    document.querySelector('#selected_diary_entry').innerHTML = diaryEntryHtml;
  } catch (error) {
    console.error('Error:', error);
  }
}
