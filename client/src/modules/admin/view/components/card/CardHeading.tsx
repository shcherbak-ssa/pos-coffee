export type Props = {
  heading: string;
}

export function CardHeading({ heading }: Props) {

  return <h3 className="mb-12">{ heading }</h3>;

}
