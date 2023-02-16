import { CardHeading } from "@admin/view/components/card/CardHeading";
import { CardWrapper } from "@admin/view/components/card/CardWrapper";

export type Props = {
  children: React.ReactNode;
  className?: string;
}

export function LocationCard({ className, children }: Props) {

  return (
    <CardWrapper className={className}>
      <CardHeading heading="Location" />

      <div className="grid grid-cols-3 gap-x-4 gap-y-10">
        { children }
      </div>
    </CardWrapper>
  );

}
