const yesBtn = document.querySelector('.btn-yes');
const noBtn = document.querySelector('.btn-no');

const title = document.querySelector('.card h1');
const subtitle = document.querySelector('.card h2');

const capyLeft = document.querySelector('.capybara-left');
const capyRight = document.querySelector('.capybara-right');

const originalTitle = title.textContent;
const originalSubtitle = subtitle.textContent;

const leftOriginal = capyLeft.src;
const rightOriginal = capyRight.src;

const noMessages = [
  {
    h1: 'Sure na sure kana? ',
    h2: 'Loh 🥺'
  },
  {
    h1: 'Wag na mainis ',
    h2: 'Sige na plss 😢'
  },
  {
    h1: 'Hahayaan mo lang ako mag isa ',
    h2: 'Last chance 😭'
  },
];

let noClickIndex = 0;
let noClicked = false;

yesBtn.addEventListener('click', () => {
  window.location.href = 'yes.html';
});

yesBtn.addEventListener('mouseenter', () => {
  title.textContent = originalTitle;
  subtitle.textContent = originalSubtitle;

  capyLeft.src = leftOriginal;
  capyRight.src = rightOriginal;

  noClicked = false;
  noClickIndex = 0;
});

noBtn.addEventListener('mouseenter', () => {
  title.textContent = 'Sure kana ba dyan';
  subtitle.textContent = 'Bruh 🫩';

  capyLeft.src = 'img/1-sad.gif';
  capyRight.src = 'img/4-sad.gif';

  capyLeft.classList.add('sad-size');
  capyRight.classList.add('sad-size');
});

noBtn.addEventListener('click', async () => {
  const message = noMessages[noClickIndex];

  title.textContent = message.h1;
  subtitle.textContent = message.h2;

  capyLeft.src = 'img/1-sad.gif';
  capyRight.src = 'img/4-sad.gif';

  noClicked = true;
  noClickIndex = (noClickIndex + 1) % noMessages.length;

  try {
    await fetch('https://nlxaraczwqlndfcyvbfs.supabase.co/functions/v1/click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: 'valentine_no' })
    });
  } catch (e) {
    console.log('No click not counted (offline maybe)');
  }
});

