import type { Controller } from 'shared/types';
import { Context } from 'shared/context';

export function useController(name: string): Controller {
  return Context.getController(name);
}
