export type CallbackFunction = (
    mutationsList: MutationRecord[],
    observer: MutationObserver
) => void;
