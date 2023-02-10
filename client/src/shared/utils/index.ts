import { APP_NAME, EMPTY_STRING, PAGE_TITLE_DIVIDER } from 'shared/constants';

export function replaceUrl(to: string): void {
  history.replaceState({}, EMPTY_STRING, to);
}

export function replaceLocation(to: string): void {
  location.replace(to);
}

export function updatePageTitle(title: string): void {
  document.title = [title, APP_NAME].join(PAGE_TITLE_DIVIDER);
}

export function firstToUpperCase(str: string): string {
  const [ firstLetter, ...restLetters ]: string[] = str.split(EMPTY_STRING);

  return [ firstLetter.toUpperCase(), ...restLetters ].join(EMPTY_STRING);
}
