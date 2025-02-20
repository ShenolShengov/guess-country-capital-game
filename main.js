import engine from './engine.js';

const html = {
    homeContainer: document.querySelector('.home-container'),
    guesContainer: document.querySelector('.guess-container'),
};

html.homeContainer.addEventListener('click', startGuessCountry);

function startGuessCountry(e) {
    if (!e.target.matches('a')) return;
    const guessMode = e.target.dataset.guessMode;
    engine.setUpGame(guessMode);
    engine.attachGuessHandler();
}
