export type Props = {
  price: number | null;
}

export function ProductsPrice({ price }: Props) {

  return <div>{ price }</div>;

}
