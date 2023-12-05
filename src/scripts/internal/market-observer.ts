import { InventoryObserver, type CallbackFunction } from '.';

const inventoryObserver = new InventoryObserver();

const callback: CallbackFunction = function (mutationsList, _) {
    for (let mutation of mutationsList) {
        if (mutation.type !== 'childList') {
            continue;
        }

        let iframe = document.querySelector('iframe') as HTMLIFrameElement;
        if (!iframe) {
            inventoryObserver.disconnect();
            inventoryObserver.observing = false;
            break;
        }

        if (inventoryObserver.observing) {
            break;
        }

        iframe.onload = function () {
            const iframeDocument =
                iframe.contentDocument || iframe.contentWindow!.document;
            const elementInsideIframe =
                iframeDocument.querySelector('#mainContents');
            inventoryObserver.observe(elementInsideIframe!);
            inventoryObserver.observing = true;
        };
    }
};

export class MarketObserver extends MutationObserver {
    private targetNode: Node;
    private config: MutationObserverInit;

    constructor() {
        super(callback);
        this.targetNode = document.body;
        this.config = { childList: true, subtree: true };
    }

    public observe(): void {
        super.observe(this.targetNode, this.config);
    }
}
