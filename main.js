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
  { h1: 'Bawal mag no 🤪', h2: 'Bruh 🙄' },
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

  const lastIndex = noMessages.length - 1;

  if (noClickIndex < lastIndex) {
    noClickIndex += 1;
  } else {
    if (!yesBtn.dataset.scale) yesBtn.dataset.scale = "1";
    let scale = parseFloat(yesBtn.dataset.scale);

    scale *= 1.35; 
    yesBtn.dataset.scale = String(scale);

    yesBtn.style.transformOrigin = "center";
    yesBtn.style.transition = "transform 200ms ease";

    yesBtn.style.position = "fixed";
    yesBtn.style.left = "50%";
    yesBtn.style.top = "50%";
    yesBtn.style.zIndex = "999999";
    yesBtn.style.transform = `translate(-50%, -50%) scale(${scale})`;

  }

  try {
    const { error } = await supabaseClient.rpc('increment_no');
    if (error) console.log("Supabase RPC error:", error);
  } catch (e) {
    console.log("Supabase fetch error:", e);
  }
});




