export type Props = {
  heading: string;
}

export function CardHeading({ heading }: Props) {

  return <h3 className="mb-10">{ heading }</h3>;

}
