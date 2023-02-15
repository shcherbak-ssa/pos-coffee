import { EMPTY_STRING, UserType, ZERO } from 'shared/constants';

import type { UserSchema as BaseUserSchema, UsersFilter, UserDraft, UserUpdates } from '@admin/shared/types';

export class UserSchema implements BaseUserSchema {
  public id: number;
  public name: string;
  public surname: string;
  public email: string;
  public phone: string;
  public type: UserType;
  public isDeleted: boolean;
  public createdAt: Date | null;
  public updatedAt: Date | null;
  public deletedAt: Date | null;

  private constructor(schema?: BaseUserSchema) {
    this.id = schema?.id || ZERO;
    this.name = schema?.name || EMPTY_STRING;
    this.surname = schema?.surname || EMPTY_STRING;
    this.email = schema?.email || EMPTY_STRING;
    this.phone = schema?.phone || EMPTY_STRING;
    this.type = schema?.type || UserType.ADMIN;
    this.isDeleted = schema?.isDeleted || false;
    this.createdAt = schema?.createdAt ? new Date(schema.createdAt) : null;
    this.updatedAt = schema?.updatedAt ? new Date(schema.updatedAt) : null;
    this.deletedAt = schema?.deletedAt ? new Date(schema.deletedAt) : null;
  }

  public static create(schema?: BaseUserSchema): UserSchema {
    return new UserSchema(schema);
  }

  public isNewSchema(): boolean {
    return this.id === ZERO;
  }

  public getUpdates(): UserUpdates {
    const { id, createdAt, updatedAt, deletedAt, ...updates } = this;

    return updates;
  }
}

export function createUsersFilter({
  onlyDeleted = false,
}: UsersFilter): UsersFilter {
  return {
    onlyDeleted,
  };
}

export function createUserDraft(schema: BaseUserSchema = UserSchema.create()): UserDraft {

  return {
    get fullname(): string {
      return `${schema.name} ${schema.surname}`;
    },

    set name(name: string) {
      schema.name = name;
    },

    set surname(surname: string) {
      schema.surname = surname;
    },

    set email(email: string) {
      schema.email = email;
    },

    set phone(phone: string) {
      schema.phone = phone;
    },

    set type(type: UserType) {
      schema.type = type;
    },
  };

}
