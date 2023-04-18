function topNavFunction() {
  var x = document.getElementById("topNav");
  if (x.className === "navigation") {
    x.className += "responsive";
  } else {
    x.className = "navigation";
  }
}

const infomodal = document.getElementById("infoModal");
const infobtn = document.getElementById("info");
const infospan = document.getElementsByClassName("closeInfo")[0];

infobtn.onclick = function() {
infomodal.style.display = "block";
}
infospan.onclick = function() {
infomodal.style.display = "none";
}

const helpmodal = document.getElementById("helpModal");
const helpbtn = document.getElementById("help-icon");
const helpspan = document.getElementsByClassName("closeHelp")[0];

helpbtn.onclick = function() {
helpmodal.style.display = "block";
}
helpspan.onclick = function() {
helpmodal.style.display = "none";
}


const aphorisms = [
  '"Liikunta on parasta terveydenhoitoa."',
  '"Liikunta lisää hyvää oloa."',
  '"Et koskaan tiedä rajojasi, ellet ylitä niitä."',
  '"Pitkäkin matka täytyy aloittaa yhdellä askeleella."',
  '"Kaikki on mahdollista. Mahdottoman toteuttaminen vain vie hieman enemmän aikaa."',
  '"Tulevaisuus tulee. Vain sinä voit päättää, mihin se menee."',
  '"Tee yksi ihminen onnelliseksi joka päivä — vaikkapa se olisit sinä itse."',
  '"Jokainen voi kuntoilla omien voimiensa mukaan."',
  '"Loppujen lopuksi kadumme vain mahdollisuuksia, joihin emme tarttuneet."',
  '"Sinun täytyy odottaa asioita itseltäsi ennen kuin pystyt niihin."',
  '"Se ei ole vuori, jonka valloitamme, vaan itsemme."'
];

var randomAphorism = Math.floor(Math.random()*aphorisms.length);
document.getElementById("aphorism").innerText = aphorisms[randomAphorism];


document.addEventListener('DOMContentLoaded', () => {
const diaryForm = document.querySelector('form');

diaryForm.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const activeEmoji = document.querySelector('.emoji-active');
  
  if (activeEmoji) {
    const emojiClass = activeEmoji.className;
    const emojiClassElement = document.getElementById("emojiClass");
    // document.getElementById("emojiClass").value = emojiClass;
    emojiClassElement.value = emojiClass;
  }
});


// Emoji click handling
const emojis = document.querySelectorAll('.emoji');

emojis.forEach(emoji => {
  emoji.addEventListener('click', (event) => {
    // Remove the 'emoji-active' class from all other emojis
    emojis.forEach(otherEmoji => {
      if (otherEmoji !== event.target) {
        otherEmoji.classList.remove('emoji-active');
      }
    });

    // Toggle the 'emoji-active' class for the clicked emoji
    event.target.classList.toggle('emoji-active');
  });
});
}); 




