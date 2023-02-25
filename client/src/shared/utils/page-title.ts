import { APP_NAME, EMPTY_STRING, PAGE_TITLE_DIVIDER } from 'shared/constants';

export function updatePageTitle(title: string = EMPTY_STRING): void {
  document.title = title ? [title, APP_NAME].join(PAGE_TITLE_DIVIDER) : APP_NAME;
}
