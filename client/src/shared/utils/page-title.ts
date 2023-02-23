import { APP_NAME, PAGE_TITLE_DIVIDER } from 'shared/constants';

export function updatePageTitle(title: string): void {
  document.title = [title, APP_NAME].join(PAGE_TITLE_DIVIDER);
}
