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

export function filterItemById<T extends { id: number }>(items: T[], item: T): T[] {
  return items.filter(({ id }) => id !== item.id);
}
