import { PrimeIcons } from 'primereact/api';
import { Button, type ButtonProps } from 'primereact/button';

import { PageSubSectionWrapper } from '@admin/view/components/PageSubSectionWrapper';

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
