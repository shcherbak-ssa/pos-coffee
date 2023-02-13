import { Button, type ButtonProps } from 'primereact/button';

import { PageSubSectionWrapper } from 'modules/admin/view/components/PageSubSectionWrapper';
import { PrimeIcons } from 'primereact/api';

export function UsersPageSubsectionContainer() {

  const buttonSetProps: ButtonProps[] = [
    {
      icon: PrimeIcons.LIST,
    },
    {
      icon: PrimeIcons.TH_LARGE,
    },
  ];

  return (
    <PageSubSectionWrapper>
      <div></div>
      <div></div>

      <div>
        <div className="p-buttonset">
          {
            buttonSetProps.map((props, index) => {
              return (
                <Button
                  className="p-button-text p-button-sm"
                  key={index}
                  {...props}
                />
              )
            })
          }
        </div>
      </div>
    </PageSubSectionWrapper>
  );

}
