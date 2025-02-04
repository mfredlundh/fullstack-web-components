import { html } from 'lit-html';
import { TextInputComponent } from './TextInput';
import { ButtonComponent } from '../button/Button';

export default {
    title: 'Components/Input/TextInput',
    component: 'in-textinput',
}

const validators = {
    username: {
        validations: [
            {
                flag: { valueMissing: true },
                message: 'Error: Required, please enter a username.',
                condition: (input) => input.required && input.value.length <= 0,
            },
            {
                flag: { tooShort: true },
                message: 'Error: Minimum length not met, please supply a value with at least 8 characters.',
                condition: (input) => input.minLength && input.value.length < input.minLength,
            }
        ]
    },
    password: {
        validations: [
            {
                flag: { valueMissing: true },
                message: 'Error: Required, please enter a username.',
                condition: (input) => input.required && input.value.length <= 0,
            },
            {
                flag: { tooShort: true },
                message: 'Error: Minimum length not met, please supply a value with at least 8 characters.',
                condition: (input) => input.minLength && input.value.length < input.minLength,
            },
            {
                flag: { patternMismatch: true },
                message: 'Error: Password must contain at least one uppercase letter, special character, and number.',
                condition: (input) => input.pattern && input.value.match(new RegExp(input.pattern)) === null,
            }
        ]
    },
}

const PrimaryTemplate = ({ onValidate, validators}) => {
    setTimeout(() => {
        const input = document.querySelector(`[name="username"]`);
        input.$validator = validators['username'];
    }, 0);

    return html`
        <form>    
            <in-textinput @validate="${onValidate}" name="username" required></in-textinput>
        </form>
    `;
}

export const Primary = PrimaryTemplate.bind({});

Primary.args = {
    validators,
    onvalidate: (ev) => {
        console.log("onvalidate");
        if (!document.querySelector(`[name="username"]`).validity.valid) {
            console.log('INVALID');
        } else {
            console.log('VALID');
        }
    }
}

const DisabledTemplate = () => {
    return html`
        <in-textinput value="disabled input" name="test-input" disabled></in-textinput>
    `;
}

export const Disabled = DisabledTemplate.bind({});
Disabled.args = {};

const ErrorTemplate = ({}) => {
    setTimeout(() => {
        const input = document.querySelector(`[name="username"]`);
        input.$validator = validators['username'];
        input.focus();
        input.blur();
    }, 0);
    
    return html`
        <in-textinput
            type="text"
            id="username"
            name="username"
            required
            class="form-control"
        ></in-textinput>
    `;
}

export const Error = ErrorTemplate.bind({});
Error.args = {};

const FormTemplate = ({ headline, onSubmit, onValidate, onFormData}) => {
    setTimeout(() => {
        for (let prop in validators) {
            document.querySelector(`[name="${prop}"]`).$validator = validators[prop];
        }
    }, 0);

    return html`
        <h4 slot="header">${headline}</h4>
        <form name="foo"
            slot="content"
            @formdata="${onFormData}"
            @validate="${onValidate}"
            @submit="${onSubmit}"
        >
            <fieldset>
                <legend>Login Form</legend>
                
                <label for="username">Username</label>
                <in-textinput
                    type="text"
                    id="username"
                    name="username"
                    required
                    minlength="8"
                    class="form-control"
                ></in-textinput>

                <label for="password">Password</label>
                <in-textinput
                    type="password"
                    id="password"
                    name="password"
                    required
                    minlength="8"
                    pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"
                    class="form-control"
                ></in-textinput>

                <button is="in-button" type="submit" class="primary submit">Submit</button>
            </fieldset>
        </form>    
    `;
}

export const Form = FormTemplate.bind({});
Form.args = {
    headline: 'Login',
    onSubmit: (ev) => {
        console.log(new FormData(ev.target));
        ev.preventDefault();
    },
    onFormData: (ev) => {
        console.log(ev);
        for (let value of ev.formData.values()) {
            console.log(value);
        }
    },
    onValidate: (ev) => {
        const validations = [];
        for (let prop in validators) {
            validations.push(document.querySelector(`[name="${prop}"]`).validity.valid);
        }
        
        if (validations.filter((val) => val == false).length) {
            console.warn('INVALID');
        } else {
            console.log('VALID');
        }
    },
}