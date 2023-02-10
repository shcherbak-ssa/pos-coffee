import type { LoaderService } from 'shared/types';

export class Context {

  private static loader: LoaderService;

  public static getLoader(): LoaderService {
    return Context.loader;
  }

  public static setLoader(loader: LoaderService): void {
    Context.loader = loader;
  }

}
