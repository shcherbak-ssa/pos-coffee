import type { ErrorObject, ApiRequest, ApiService as BaseApiService } from 'shared/types';
import { ApiMethod, ApiEndpoint, ApiResponseCode, QUERY_URL_SEPARATOR } from 'shared/constants';
import { ApiError } from 'shared/errors';

export class ApiService implements BaseApiService {

  private constructor() {}

  public static create(): ApiService {
    return new ApiService();
  }

  public async get<P, Q, B, R>(apiRequest: ApiRequest<P, Q, B>): Promise<R> {
    return this.sendRequest<P, Q, B, R>(ApiMethod.GET, apiRequest);
  }

  public async post<P, Q, B, R>(apiRequest: ApiRequest<P, Q, B>): Promise<R> {
    return this.sendRequest<P, Q, B, R>(ApiMethod.POST, apiRequest);
  }

  public async put<P, Q, B>(apiRequest: ApiRequest<P, Q, B>): Promise<void> {
    return this.sendRequest<P, Q, B>(ApiMethod.PUT, apiRequest);
  }

  public async delete<P, Q, B>(apiRequest: ApiRequest<P, Q, B>): Promise<void> {
    return this.sendRequest<P, Q, B>(ApiMethod.DELETE, apiRequest);
  }

  private async sendRequest<P, Q, B, R = void>(
    method: ApiMethod,
    { endpoint, params, query, body }: ApiRequest<P, Q, B>,
  ): Promise<R> {
    let apiEndpoint: string = ApiService.setParamsToUrl(endpoint, params || {});

    if (query) {
      // @ts-ignore
      const queryString: string = new URLSearchParams(query).toString();
      apiEndpoint += QUERY_URL_SEPARATOR + queryString;
    }

    const response = await fetch(location.origin + apiEndpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept-Type': 'application/json',
      },
      body: ApiService.isGetMethod(method) ? null : JSON.stringify(body || {}),
    });

    if (response.ok) {
      if (ApiService.isNoContentCode(response.status)) {
        return {} as R;
      }

      return await response.json() as R;
    }

    const error = await response.json() as ErrorObject<B>;

    throw new ApiError(error);
  }

  private static setParamsToUrl<P extends object>(endpoint: ApiEndpoint, params: P): string {
    let apiEndpoint: string = endpoint;

    for (const [key, value] of Object.entries(params)) {
      const paramRegExp = new RegExp(`:${key}`, 'g');

      apiEndpoint = apiEndpoint.replace(paramRegExp, value);
    }

    return apiEndpoint;
  }

  private static isGetMethod(method: ApiMethod): boolean {
    return method === ApiMethod.GET;
  }

  private static isNoContentCode(code: number): boolean {
    return code === ApiResponseCode.NO_CONTENT;
  }

}
