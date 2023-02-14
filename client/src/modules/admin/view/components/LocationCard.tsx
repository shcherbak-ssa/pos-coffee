import { CardHeading } from "@admin/view/components/CardHeading";
import { CardWrapper } from "@admin/view/components/CardWrapper";

export type Props = {
  className?: string;
}

export function LocationCard({ className }: Props) {

  return (
    <CardWrapper className={className}>
      <CardHeading heading="Location" />

      @TODO: implement
    </CardWrapper>
  );

}
