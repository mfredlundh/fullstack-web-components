export type Validator = {
    validations: {
        flag: ValidityStateFlags;
        condition: (elem: HTMLElement) => boolean;
        message?: string;
    }[];
}

export function validate (elem: any, showError: boolean) {
    if (!elem.$validator || !elem.$validator.validations) {
        console.log('No validator found for element', elem.$validator)
        console.dir(elem)
        return;
    }
    
    const activeValidators = [];
    const messageElem = elem.shadowRoot.querySelector('.message')
    
    if (messageElem) {
        messageElem.innerHTML = '';
    }

    elem.$validator.validations.forEach((validator) => {
        if (validator.condition(elem)) {
            elem.setValidity(validator.flag, validator.message);
            activeValidators.push(validator);

            if (showError) {
                if (elem.$input) {
                    elem.$input.setAttribute('aria-invalid', 'true');
                    elem.$input.classList.add('error');
                }

                if (messageElem) {
                    const div = document.createElement('div');
                    div.innerHTML = validator.message;

                    messageElem.appendChild(div);
                }
            }
        }
    });

    if (!activeValidators.length) {
        elem.setValidity({});

        if (elem.$input) {
            elem.$input.classList.remove('error');
        }

        if (messageElem) {
            messageElem.innerHTML = '';
        }
    }


    elem.dispatchEvent(new CustomEvent('validate', { bubbles: true }))
}

