import type { UserSchema as BaseUserSchema, User as BaseUser } from 'shared/types';
import { EMPTY_STRING, UserType, ZERO } from 'shared/constants';

type Schema = BaseUserSchema | null;

export class UserSchema implements BaseUserSchema {
  public id: number;
  public name: string;
  public surname: string;
  public email: string;
  public username: string;
  public type: UserType;

  private constructor() {
    this.id = ZERO;
    this.name = EMPTY_STRING;
    this.surname = EMPTY_STRING;
    this.email = EMPTY_STRING;
    this.username = EMPTY_STRING;
    this.type = UserType.ADMIN;
  }

  public static create(): UserSchema {
    return new UserSchema();
  }
}

export class User implements BaseUser {

  private constructor(
    private schema: Schema,
    private draft: BaseUserSchema,
  ) {}

  public static create(originalSchema?: BaseUserSchema): User {
    const schema: Schema = originalSchema ? new UserSchema(originalSchema) : null;
    const draft: BaseUserSchema = new UserSchema(originalSchema);

    return new User(schema, draft);
  }

  get id(): number {
    return this.draft.id;
  }

  get fullName(): string {
    const { name, surname } = this.draft;

    return `${name} ${surname}`;
  }

  set name(name: string) {
    this.draft.name = name;
  }

  set surname(surname: string) {
    this.draft.surname = surname;
  }

  get email(): string {
    return this.draft.email;
  }

  set email(email: string) {
    this.draft.email = email;
  }

  get username(): string {
    return this.draft.username;
  }

  set username(username: string) {
    this.draft.username = username;
  }

  get type(): UserType {
    return this.draft.type;
  }

  set type(type: UserType) {
    this.draft.type = type;
  }

  get hasUpdates(): boolean {
    if (this.schema === null) return true;

    for (const [ key, value ] of Object.entries(this.schema)) {
      if (this.draft[key as keyof UserSchema] !== value) {
        return true;
      }
    }

    return false;
  }

}
