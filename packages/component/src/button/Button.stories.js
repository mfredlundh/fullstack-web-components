import { html } from 'lit-html';
import { ButtonComponent } from './Button';

export default {
    title: 'Components/Inputs/Button',
    component: 'in-button',
}

const Template = ({ label, variant }) => {
    return html`
        <button class="${variant}" is="in-button">
            ${label}
        </button>
    `;
}

const DisabledTemplate = ({ label, variant }) => {
    return html`
        <button class="${variant}" is="in-button" disabled>
            ${label}
        </button>
    `;
}

const IconTemplate = ({ label, variant, svg }) => html`
    <button
        class="${variant}" 
        aria-labelledby="close-button-label"
        is="in-button"
    >
        <span id="close-button-label" hidden>${label}</span>
        ${svg}
    </button>
`

export const Primary = Template.bind({});
Primary.args = {
    variant: 'primary',
    label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
    variant: 'secondary',
    label: 'Button',
};

let icon = null;
let svg = null;
if (window.FontAwesome) {
    icon = window.FontAwesome.icon({ prefix: 'fas', iconName: 'plus' });
    svg = icon.node[0];
    svg.setAttribute('aria-hidden', 'true');
}


export const Icon = IconTemplate.bind({});
Icon.args = {
    variant: 'icon icon-close',
    label: 'Close',
    svg: svg,
};

export const Disabled = DisabledTemplate.bind({});
Disabled.args = {
    variant: 'primary',
    label: 'Button',
};