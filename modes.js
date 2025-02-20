import endpoints from './endpoints.js';

const modes = {
    'Guess country': {
        label: 'Guess country',
        fetchGuessSujection() {
            return fetch(endpoints.countriesNames)
                .then((r) => r.json())
                .then((d) => d.map((c) => c.name.common));
        },
    },
    'Guess capital': {
        label: 'Guess capital',
        fetchGuessSujection() {
            return fetch(endpoints.countriesCapitals)
                .then((r) => r.json())
                .then((d) => d.map((c) => c.capital[0]));
        },
    },
};

export default modes;
