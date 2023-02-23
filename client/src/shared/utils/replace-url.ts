import { EMPTY_STRING } from 'shared/constants';

export function replaceUrl(to: string): void {
  history.replaceState({}, EMPTY_STRING, to);
}
