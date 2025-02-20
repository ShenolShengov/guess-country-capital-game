import modes from './modes.js';
import factory from './factory.js';
import endponts from './endpoints.js';
import config from './config.js';

const html = {
    siteContainer: document.querySelector('.site'),
    homeContainer: document.querySelector('.home-container'),
    guesContainer: document.querySelector('.guess-container'),
    guessForm: document.querySelector('.guess-form'),
    guessLabel: document.querySelector('.guess-label'),
    guessInput: document.querySelector('.guess-input'),
    countryImg: document.querySelector('.country-img'),
    sujectionsList: document.querySelector('#sujections-list'),
    nextBtn: document.querySelector('.next-btn'),
    showAnswerBtn: document.querySelector('.show-answer-btn'),
};

let countryToGuess = {};

const engine = {
    setUpGame,
    attachGuessHandler: attachHandlers,
};

export default engine;

function setUpGame(guessMode) {
    config.mode = guessMode;
    const mode = modes[guessMode];
    html.guessLabel.textContent = mode.label;
    html.homeContainer.classList.add('hidden');

    renderLoader();
    Promise.all([loadSujections(mode), loadRandomCountry()])
        .then((d) => {
            removeError();
            const [namesSujections, randomCountry] = d;

            renderSujections(namesSujections);
            renderRandomCountry(randomCountry);
            html.guesContainer.classList.remove('hidden');
            removeLoader();
        })
        .catch(() => {
            removeLoader();
            renderError();
        });
}

function attachHandlers() {
    html.guessForm.addEventListener('submit', guessCountryHandler);
    html.nextBtn.addEventListener('click', nextCountryHandler);
    html.showAnswerBtn.addEventListener('click', showAnswerHandler);
}

function nextCountryHandler() {
    renderLoader();
    html.guesContainer.classList.add('hidden');
    loadRandomCountry().then((c) => {
        removeLoader();
        html.guesContainer.classList.remove('hidden');
        html.guessInput.value = '';
        renderRandomCountry(c);
        removeGuessMessage();
    });
}

function showAnswerHandler() {
    const answerData = getAnswerData();

    const answerDialog = factory.answerDialog(answerData);
    html.siteContainer.append(answerDialog);
    answerDialog.showModal();
}

function getAnswerData() {
    console.log(config.mode);
    if (config.mode === 'Guess country') {
        return {
            message: 'The country is: ',
            answer: countryToGuess.name,
        };
    }
    return {
        message: 'The capital of ' + countryToGuess.name + ' is:',
        answer: countryToGuess.capital,
    };
}

function guessCountryHandler(e) {
    e.preventDefault();
    removeGuessMessage();
    const guess = html.guessInput.value;
    const ansewr = getAnswerData().answer;
    const message =
        guess === ansewr
            ? factory.correctGuessMessage()
            : factory.wrongGuessMessage();
    html.guessForm.append(message);
}

function removeGuessMessage() {
    const m = document.querySelector('.guess-message');
    if (m) m.remove();
}

function renderLoader() {
    const loader = factory.loader();
    html.siteContainer.append(loader);
}

function removeLoader() {
    const l = document.querySelector('.loader');
    if (l) l.remove();
}

function renderError() {
    html.siteContainer.append(factory.erorrContainer());
}

function removeError() {
    const err = document.querySelector('.error');
    if (err) err.remove();
}

function loadSujections(mode) {
    return mode.fetchGuessSujection();
}

function renderRandomCountry(country) {
    countryToGuess = country;
    html.countryImg.src = countryToGuess.flag;
}

function renderSujections(sujections) {
    html.sujectionsList.append(...sujections.map(factory.sujecitonOption));
}

function loadRandomCountry() {
    return fetch(endponts.countries)
        .then((r) => r.json())
        .then((countries) => {
            const randomIndex = Math.floor(Math.random() * countries.length);
            const data = countries[randomIndex];
            const country = {
                name: data.name.common,
                capital: data.capital[0],
                flag: data.flags.png,
            };
            return country;
        });
}
