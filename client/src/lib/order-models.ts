import type {
  OrderLineSchema as BaseOrderLineSchema,
  OrderSchema as BaseOrderSchema,
  OrderUserSchema as BaseOrderUserSchema,
} from 'shared/types';
import { EMPTY_STRING, PaymentMethodType, ZERO } from 'shared/constants';

export class OrderSchema implements BaseOrderSchema {
  public id: number;
  public number: string;
  public total: number;
  public lines: BaseOrderLineSchema[];
  public user: BaseOrderUserSchema;
  public paymentMethod: PaymentMethodType;
  public createdAt: Date | null;

  private constructor(schema?: BaseOrderSchema) {
    this.id = schema?.id || ZERO;
    this.number = schema?.number || EMPTY_STRING;
    this.total = schema?.total || ZERO;
    this.lines = schema?.lines ? schema.lines.map(OrderLineSchema.create) : [];
    this.user = OrderUserSchema.create(schema?.user);
    this.paymentMethod = schema?.paymentMethod || PaymentMethodType.CARD;
    this.createdAt = schema?.createdAt ? new Date(schema.createdAt) : null;
  }

  public static create(schema?: BaseOrderSchema): OrderSchema {
    return new OrderSchema(schema);
  }
}

export class OrderLineSchema implements BaseOrderLineSchema {
  public id: number;
  public count: number;
  public price: number;
  public productId: number;
  public variantId: number;
  public productName: string;
  public variantName: string;
  public image: string;

  private constructor(schema?: BaseOrderLineSchema) {
    this.id = schema?.id || ZERO;
    this.count = schema?.count || ZERO;
    this.price = schema?.price || ZERO;
    this.productId = schema?.productId || ZERO;
    this.variantId = schema?.variantId || ZERO;
    this.productName = schema?.productName || EMPTY_STRING;
    this.variantName = schema?.variantName || EMPTY_STRING;
    this.image = schema?.image || EMPTY_STRING;
  }

  public static create(schema?: BaseOrderLineSchema): OrderLineSchema {
    return new OrderLineSchema(schema);
  }
}

export class OrderUserSchema implements BaseOrderUserSchema {
  public id: number;
  public name: string;
  public surname: string;

  private constructor(schema?: BaseOrderUserSchema) {
    this.id = schema?.id || ZERO;
    this.name = schema?.name || EMPTY_STRING;
    this.surname = schema?.surname || EMPTY_STRING;
  }

  public static create(schema?: BaseOrderUserSchema): OrderUserSchema {
    return new OrderUserSchema(schema);
  }
}
