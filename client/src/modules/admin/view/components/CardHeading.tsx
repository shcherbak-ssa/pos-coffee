import classnames from "classnames";

export type Props = {
  heading: string;
  className?: string;
}

export function CardHeading({ heading, className }: Props) {

  return (
    <h3 className={classnames('mb-10', className)}>{ heading }</h3>
  );

}
