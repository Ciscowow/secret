const supabaseUrl = "https://nlxaraczwqlndfcyvbfs.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5seGFyYWN6d3FsbmRmY3l2YmZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4OTMwMDgsImV4cCI6MjA4NjQ2OTAwOH0.8UjuuTpz3ikHGJpVC2ATdk7h7N1Ps884W0dDHuIY4kg";
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseAnonKey);

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
  { h1: 'Sure na sure kana? ', h2: 'Loh 🥺' },
  { h1: 'Wag na mainis ', h2: 'Sige na plss 😢' },
  { h1: 'Hahayaan mo lang ako mag isa ', h2: 'Last chance 😭' },
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

  capyLeft.classList.remove('sad-size');
  capyRight.classList.remove('sad-size');

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

noBtn.addEventListener('mouseleave', () => {
  if (noClicked) return;

  title.textContent = originalTitle;
  subtitle.textContent = originalSubtitle;

  capyLeft.src = leftOriginal;
  capyRight.src = rightOriginal;

  capyLeft.classList.remove('sad-size');
  capyRight.classList.remove('sad-size');
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
    const { error } = await supabaseClient.rpc('increment_no');
    if (error) console.log("Supabase RPC error:", error);
  } catch (e) {
    console.log("Supabase fetch error:", e);
  }
});

