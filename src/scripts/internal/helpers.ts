const itemURI = (rootElement: HTMLElement) => {
    const itemLinkElement =
        rootElement.querySelector<HTMLAnchorElement>('div>div>a');
    return itemLinkElement?.href.split('/').at(-1);
};

const createSellManyLink = (rootElement: HTMLElement): HTMLAnchorElement => {
    // Get the URI from the root element
    const uri = itemURI(rootElement);

    // Find and clone the button
    const originalButton = rootElement.querySelector(
        '.item_market_action_button'
    ) as HTMLAnchorElement;
    const link = originalButton.cloneNode(true) as HTMLAnchorElement;

    // Find and update the span that contains the button text
    const buttonText = link.querySelector(
        '.item_market_action_button_contents'
    ) as HTMLSpanElement;
    if (buttonText) buttonText.textContent = 'Sell many';

    // Set new properties for the link
    link.id = 'sellManyLink';
    link.href = `https://steamcommunity.com/market/multisell?appid=730&contextid=2&items%5B%5D=${uri}`;
    link.style.marginLeft = '1rem';

    return link;
};

export const addSellManyLink = (rootElement: HTMLElement) => {
    if (rootElement.querySelector('#sellManyLink')) {
        return;
    }
    const sellManyLink = createSellManyLink(rootElement);
    rootElement.appendChild(sellManyLink);
};
