import { CardComponent } from './Card';

export default {
    title: 'Components/Card',
    argTypes: {
        image: {
            control: { type: 'text' },
        },
        headline: {
            control: { type: 'text' },
        },
        content: {
            control: { type: 'text' },
        },
        link: {
            control: { type: 'text' },
        }
    }
}

const PrimaryTemplate = ({ image, headline, content, link}) => `
    <in-card>
        <img slot="header" src="${image}" alt="Card image" />
        <h4 slot="header">${headline}</h4>
        <p slot="content">
            ${content}
        </p>
        <a href="#" slot="footer">${link}</a>
    </in-card>
`;

export const ImageCard = PrimaryTemplate.bind({});

ImageCard.args = {
    image: 'https://picsum.photos/200/300',
    headline: 'Food',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam massa, nec lacinia nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam massa, nec lacinia nisl nisl sit amet nisl.',
    footer: 'Read more'
}