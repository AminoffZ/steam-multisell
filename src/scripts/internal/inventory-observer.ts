import { addSellManyLink, type CallbackFunction } from '.';

const callback: CallbackFunction = function (mutationsList, _) {
    for (let mutation of mutationsList) {
        if (mutation.type !== 'childList') {
            continue;
        }

        if (
            (mutation.target as HTMLElement).className !== 'item_market_actions'
        ) {
            continue;
        }

        const actions = mutation.target as HTMLElement;
        addSellManyLink(actions);
    }
};

export class InventoryObserver extends MutationObserver {
    public observing: boolean = false;
    private config: MutationObserverInit;

    constructor() {
        super(callback);
        this.config = { childList: true, subtree: true };
    }

    public observe(targetNode: Node): void {
        super.observe(targetNode, this.config);
    }
}
