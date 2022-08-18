import { faHouse } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import Button from '$/components/button/button';
import { ButtonContext, ButtonIconPosition, ButtonSize, ButtonState, ButtonVariant } from '$/components/button/common';
import { FlexContainerDirection } from '$/storybook-helpers/common';
import FlexContainer from '$/storybook-helpers/flex-container';
import FlexContainerItem from '$/storybook-helpers/flex-container-item';

export default {
  title: 'Packages/Components/Button',
  component: Button,
  argTypes: {
    context: {
      control: {
        type: 'select',
        labels: {
          [ButtonContext.PRIMARY]: 'Primary',
          [ButtonContext.SAFE]: 'Safe',
          [ButtonContext.WARNING]: 'Warning',
          [ButtonContext.DANGER]: 'Danger',
        },
      },
    },
    size: {
      control: {
        type: 'select',
        labels: {
          [ButtonSize.SMALL]: 'Small',
          [ButtonSize.MEDIUM]: 'Medium',
          [ButtonSize.LARGE]: 'Large',
        },
      },
    },
  },
};

export const Sizes = () => {
  return (
    <>
      <FlexContainer>
        <FlexContainerItem>
          <Button data-size={ButtonSize.SMALL}>Small</Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button data-size={ButtonSize.MEDIUM}>Medium</Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button data-size={ButtonSize.LARGE}>Large</Button>
        </FlexContainerItem>
      </FlexContainer>
    </>
  );
};
Sizes.parameters = { controls: { disable: true } };

export const Icons = () => {
  return (
    <>
      <FlexContainer data-direction={FlexContainerDirection.COLUMN}>
        <FlexContainerItem>
          <Button preIcon={<Button.Icon icon={faHouse} />}>Start Icon</Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button postIcon={<Button.Icon icon={faHouse} />}>End Icon</Button>
        </FlexContainerItem>
      </FlexContainer>
    </>
  );
};
Icons.parameters = { controls: { disable: true } };

export const Loading = () => {
  return (
    <>
      <FlexContainer data-direction={FlexContainerDirection.COLUMN}>
        <FlexContainerItem>
          <Button data-state={ButtonState.IS_LOADING} loadingIconPosition={ButtonIconPosition.PRE}>
            Start Loading
          </Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button data-state={ButtonState.IS_LOADING} loadingIconPosition={ButtonIconPosition.POST}>
            End Loading
          </Button>
        </FlexContainerItem>
      </FlexContainer>
    </>
  );
};
Icons.parameters = { controls: { disable: true } };

export const Contexts = () => {
  return (
    <>
      <FlexContainer>
        <FlexContainerItem>
          <Button data-context={ButtonContext.PRIMARY}>Primary</Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button data-context={ButtonContext.SAFE}>Safe</Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button data-context={ButtonContext.WARNING}>Warning</Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button data-context={ButtonContext.DANGER}>Danger</Button>
        </FlexContainerItem>
      </FlexContainer>
    </>
  );
};
Contexts.parameters = { controls: { disable: true } };

export const Variants = () => {
  return (
    <>
      <FlexContainer>
        <FlexContainerItem>
          <Button data-context={ButtonContext.PRIMARY} data-variant={ButtonVariant.SOLID}>
            Solid
          </Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button data-context={ButtonContext.PRIMARY} data-variant={ButtonVariant.OUTLINE}>
            Outline
          </Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button data-context={ButtonContext.PRIMARY} data-variant={ButtonVariant.GHOST}>
            Ghost
          </Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button data-context={ButtonContext.PRIMARY} data-variant={ButtonVariant.LINK}>
            Link
          </Button>
        </FlexContainerItem>
        <br />
        <FlexContainerItem>
          <Button data-context={ButtonContext.SAFE} data-variant={ButtonVariant.SOLID}>
            Solid
          </Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button data-context={ButtonContext.SAFE} data-variant={ButtonVariant.OUTLINE}>
            Outline
          </Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button data-context={ButtonContext.SAFE} data-variant={ButtonVariant.GHOST}>
            Ghost
          </Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button data-context={ButtonContext.SAFE} data-variant={ButtonVariant.LINK}>
            Link
          </Button>
        </FlexContainerItem>
        <br />
        <FlexContainerItem>
          <Button data-context={ButtonContext.WARNING} data-variant={ButtonVariant.SOLID}>
            Solid
          </Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button data-context={ButtonContext.WARNING} data-variant={ButtonVariant.OUTLINE}>
            Outline
          </Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button data-context={ButtonContext.WARNING} data-variant={ButtonVariant.GHOST}>
            Ghost
          </Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button data-context={ButtonContext.WARNING} data-variant={ButtonVariant.LINK}>
            Link
          </Button>
        </FlexContainerItem>
        <br />
        <FlexContainerItem>
          <Button data-context={ButtonContext.DANGER} data-variant={ButtonVariant.SOLID}>
            Solid
          </Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button data-context={ButtonContext.DANGER} data-variant={ButtonVariant.OUTLINE}>
            Outline
          </Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button data-context={ButtonContext.DANGER} data-variant={ButtonVariant.GHOST}>
            Ghost
          </Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button data-context={ButtonContext.DANGER} data-variant={ButtonVariant.LINK}>
            Link
          </Button>
        </FlexContainerItem>
        <br />
      </FlexContainer>
    </>
  );
};
Variants.parameters = { controls: { disable: true } };

export const Groups = () => {
  return (
    <>
      <FlexContainer data-direction={FlexContainerDirection.COLUMN}>
        <FlexContainerItem>
          <div>Not Attached</div>
          <Button.Group
            data-context={ButtonContext.PRIMARY}
            data-variant={ButtonVariant.OUTLINE}
            data-size={ButtonSize.MEDIUM}
          >
            <Button>Derived From Group</Button>
            <Button
              data-context={ButtonContext.PRIMARY}
              data-variant={ButtonVariant.SOLID}
              data-state={ButtonState.IS_LOADING}
              preIcon={<Button.Icon icon={faHouse} />}
            >
              Primary
            </Button>
            <Button data-context={ButtonContext.SAFE} data-variant={ButtonVariant.LINK} data-size={ButtonSize.LARGE}>
              Safe
            </Button>
            <Button
              data-context={ButtonContext.WARNING}
              data-variant={ButtonVariant.GHOST}
              postIcon={<Button.Icon icon={faHouse} />}
            >
              Warning
            </Button>
            <Button
              data-context={ButtonContext.DANGER}
              data-variant={ButtonVariant.SOLID}
              data-size={ButtonSize.SMALL}
              disabled
            >
              Danger
            </Button>
          </Button.Group>
        </FlexContainerItem>
        <FlexContainerItem>
          <div>Attached</div>
          <Button.Group
            data-context={ButtonContext.PRIMARY}
            data-variant={ButtonVariant.OUTLINE}
            data-size={ButtonSize.MEDIUM}
            isAttached
          >
            <Button>Derived From Group</Button>
            <Button
              data-context={ButtonContext.PRIMARY}
              data-variant={ButtonVariant.SOLID}
              data-state={ButtonState.IS_LOADING}
              preIcon={<Button.Icon icon={faHouse} />}
            >
              Primary
            </Button>
            <Button data-context={ButtonContext.SAFE} data-variant={ButtonVariant.LINK} data-size={ButtonSize.LARGE}>
              Safe
            </Button>
            <Button
              data-context={ButtonContext.WARNING}
              data-variant={ButtonVariant.GHOST}
              postIcon={<Button.Icon icon={faHouse} />}
            >
              Warning
            </Button>
            <Button
              data-context={ButtonContext.DANGER}
              data-variant={ButtonVariant.SOLID}
              data-size={ButtonSize.SMALL}
              disabled
            >
              Danger
            </Button>
          </Button.Group>
        </FlexContainerItem>
      </FlexContainer>
    </>
  );
};
Groups.parameters = { controls: { disable: true } };
