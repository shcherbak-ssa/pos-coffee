export function setParamsToUrl<T extends object>(url: string, params: T): string {
  let finalUrl: string = url;

  for (const [key, value] of Object.entries(params)) {
    const paramRegExp = new RegExp(`:${key}`, 'g');

    finalUrl = finalUrl.replace(paramRegExp, value);
  }

  return finalUrl;
}
