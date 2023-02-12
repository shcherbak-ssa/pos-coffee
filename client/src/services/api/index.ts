import type { ErrorObject, ApiService as BaseApiService, Token } from 'shared/types';
import {
  ApiMethod,
  ApiEndpoint,
  ApiResponseCode,
  QUERY_URL_SEPARATOR,
  EMPTY_STRING,
  LocalStorageKey,
  AUTHORIZATION_HEADER,
} from 'shared/constants';
import { ApiError, AuthError } from 'shared/errors';
import { LocalStorage } from 'shared/helpers/local-storage';

type Headers = { [key: string]: string };

export class ApiService implements BaseApiService {

  private params: { [key: string]: string } = {};
  private query: string = EMPTY_STRING;
  private body: string = EMPTY_STRING;

  private constructor() {}

  public static create(): ApiService {
    return new ApiService();
  }

  private static isGetMethod(method: ApiMethod): boolean {
    return method === ApiMethod.GET;
  }

  private static isNoContentCode(code: number): boolean {
    return code === ApiResponseCode.NO_CONTENT;
  }

  private static getHeaders(): Headers {
    const headers: Headers = {
      'Content-Type': 'application/json',
      'Accept-Type': 'application/json',
    };

    const token: Token | null = LocalStorage.get(LocalStorageKey.USER_TOKEN);

    if (token) {
      headers[AUTHORIZATION_HEADER] = `${token.type} ${token.token}`;
    }

    return headers;
  }

  public addParams<T>(params: T): BaseApiService {
    for (const [key, value] of Object.entries(params || {})) {
      this.params[key] = `${value}`;
    }

    return this;
  }

  public addQuery<T>(query: T): BaseApiService {
    // @ts-ignore
    this.query = new URLSearchParams(query).toString();

    return this;
  }

  public addBody<T>(body: T): BaseApiService {
    this.body = JSON.stringify(body);

    return this;
  }

  public async get<T>(endpoint: ApiEndpoint): Promise<T> {
    return this.sendRequest<T>(ApiMethod.GET, endpoint);
  }

  public async post<T>(endpoint: ApiEndpoint): Promise<T> {
    return this.sendRequest<T>(ApiMethod.POST, endpoint);
  }

  public async put(endpoint: ApiEndpoint): Promise<void> {
    return this.sendRequest(ApiMethod.PUT, endpoint);
  }

  public async delete(endpoint: ApiEndpoint): Promise<void> {
    return this.sendRequest(ApiMethod.DELETE, endpoint);
  }

  private async sendRequest<T = void>(method: ApiMethod, endpoint: ApiEndpoint): Promise<T> {
    let apiEndpoint: string = this.setParamsToUrl(endpoint);
    apiEndpoint += QUERY_URL_SEPARATOR + this.query;

    const response = await fetch(location.origin + apiEndpoint, {
      method,
      headers: ApiService.getHeaders(),
      body: ApiService.isGetMethod(method) ? null : this.body,
    });

    if (response.ok) {
      if (ApiService.isNoContentCode(response.status)) {
        return {} as T;
      }

      return await response.json() as T;
    }

    const error = await response.json() as ErrorObject<{}>;

    if (response.status === ApiResponseCode.UNAUTHORIZED) {
      throw new AuthError(error.message);
    }

    throw new ApiError(error);
  }

  private setParamsToUrl(endpoint: ApiEndpoint): string {
    let apiEndpoint: string = endpoint;

    for (const [key, value] of Object.entries(this.params)) {
      const paramRegExp = new RegExp(`:${key}`, 'g');

      apiEndpoint = apiEndpoint.replace(paramRegExp, value);
    }

    return apiEndpoint;
  }

}
