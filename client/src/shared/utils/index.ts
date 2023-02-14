import cloneDeep from 'clone-deep';

import type { CurrentUserSchema } from 'shared/types';
import { APP_NAME, EMPTY_STRING, PAGE_TITLE_DIVIDER } from 'shared/constants';

export function replaceUrl(to: string): void {
  history.replaceState({}, EMPTY_STRING, to);
}

export function replaceLocation(to: string): void {
  location.replace(to);
}

export function setParamsToUrl<T extends object>(url: string, params: T): string {
  let finalUrl: string = url;

  for (const [key, value] of Object.entries(params)) {
    const paramRegExp = new RegExp(`:${key}`, 'g');

    finalUrl = finalUrl.replace(paramRegExp, value);
  }

  return finalUrl;
}

export function updatePageTitle(title: string): void {
  document.title = [title, APP_NAME].join(PAGE_TITLE_DIVIDER);
}

export function firstToUpperCase(str: string): string {
  const [ firstLetter, ...restLetters ]: string[] = str.split(EMPTY_STRING);

  return [ firstLetter.toUpperCase(), ...restLetters ].join(EMPTY_STRING);
}

export function getUserInitials({ name, surname }: CurrentUserSchema): string {
  return (name[0] + surname[0]).toUpperCase();
}

export function cloneObject<T>(obj: T): T {
  return cloneDeep(obj);
}
