export type LotusLoadingState = {
  progress: number;
  complete: boolean;
};

const listeners = new Set<(state: LotusLoadingState) => void>();
let state: LotusLoadingState = { progress: 0, complete: false };

export function publishLotusLoading(progress: number, complete = false) {
  state = {
    progress: Math.max(state.progress, Math.min(100, Math.round(progress))),
    complete,
  };
  listeners.forEach((listener) => listener(state));
}

export function subscribeToLotusLoading(listener: (state: LotusLoadingState) => void) {
  listeners.add(listener);
  listener(state);
  return () => listeners.delete(listener);
}
