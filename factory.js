const factory = {
    sujecitonOption: (sujection) => {
        return createElement('option', { value: sujection });
    },
    loader: () => {
        const loader = createElement('div', { className: 'loader' });
        createElement('p', { textContent: 'Loading...' }, loader);
        return loader;
    },
    erorrContainer: () => {
        const error = createElement('div', {
            className: 'error flex direction-col items-center gap-small',
        });
        createElement(
            'p',
            { textContent: 'Error ocursed when fetching countries data' },
            error
        );

        createElement(
            'a',
            {
                textContent: 'Reload',
                className: 'reload-btn pointer b-r-small p-button',
                onclick: () => window.location.reload(),
            },
            error
        );
        return error;
    },
    correctGuessMessage: () => {
        return createElement('div', {
            textContent: 'Correct!',
            className: 'guess-message green',
        });
    },
    wrongGuessMessage: () => {
        return createElement('div', {
            textContent: 'Wrong!',
            className: 'guess-message red',
        });
    },

    answerDialog: (answerData) => {
        const dialog = createElement('dialog', {
            className:
                'absolute answer-dialog flex direction-col gap-small justify-center items-center',
        });

        createElement(
            'p',
            { textContent: answerData.message, className: 'answer-message' },
            dialog
        );
        createElement(
            'p',
            { className: 'answer', textContent: answerData.answer },
            dialog
        );

        createElement(
            'button',
            {
                textContent: 'X',
                className: 'close pointer absolute',
                onclick: () => dialog.close(),
            },
            dialog
        );

        return dialog;
    },
};

function createElement(tag, properties, parent) {
    const el = Object.assign(document.createElement(tag), properties);
    if (parent) parent.append(el);
    return el;
}

export default factory;
