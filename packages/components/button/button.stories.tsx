import { faHouse } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import Button, { ButtonContext, ButtonIconPosition, ButtonSize, ButtonState, ButtonVariant } from '$/components/button';
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
          <Button size={ButtonSize.SMALL}>Small</Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button size={ButtonSize.MEDIUM}>Medium</Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button size={ButtonSize.LARGE}>Large</Button>
        </FlexContainerItem>
      </FlexContainer>
    </>
  );
};
Sizes.parameters = { controls: { disable: true } };

export const Icons = () => {
  return (
    <>
      <FlexContainer direction={FlexContainerDirection.COLUMN}>
        <FlexContainerItem>
          <Button preIcon={faHouse}>Start Icon</Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button postIcon={faHouse}>End Icon</Button>
        </FlexContainerItem>
      </FlexContainer>
    </>
  );
};
Icons.parameters = { controls: { disable: true } };

export const Loading = () => {
  return (
    <>
      <FlexContainer direction={FlexContainerDirection.COLUMN}>
        <FlexContainerItem>
          <Button state={ButtonState.IS_LOADING} loadingIconPosition={ButtonIconPosition.PRE}>
            Start Loading
          </Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button state={ButtonState.IS_LOADING} loadingIconPosition={ButtonIconPosition.POST}>
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
          <Button context={ButtonContext.PRIMARY}>Primary</Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button context={ButtonContext.SAFE}>Safe</Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button context={ButtonContext.WARNING}>Warning</Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button context={ButtonContext.DANGER}>Danger</Button>
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
          <Button context={ButtonContext.PRIMARY} variant={ButtonVariant.SOLID}>
            Solid
          </Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button context={ButtonContext.PRIMARY} variant={ButtonVariant.OUTLINE}>
            Outline
          </Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button context={ButtonContext.PRIMARY} variant={ButtonVariant.GHOST}>
            Ghost
          </Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button context={ButtonContext.PRIMARY} variant={ButtonVariant.LINK}>
            Link
          </Button>
        </FlexContainerItem>
        <br />
        <FlexContainerItem>
          <Button context={ButtonContext.SAFE} variant={ButtonVariant.SOLID}>
            Solid
          </Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button context={ButtonContext.SAFE} variant={ButtonVariant.OUTLINE}>
            Outline
          </Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button context={ButtonContext.SAFE} variant={ButtonVariant.GHOST}>
            Ghost
          </Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button context={ButtonContext.SAFE} variant={ButtonVariant.LINK}>
            Link
          </Button>
        </FlexContainerItem>
        <br />
        <FlexContainerItem>
          <Button context={ButtonContext.WARNING} variant={ButtonVariant.SOLID}>
            Solid
          </Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button context={ButtonContext.WARNING} variant={ButtonVariant.OUTLINE}>
            Outline
          </Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button context={ButtonContext.WARNING} variant={ButtonVariant.GHOST}>
            Ghost
          </Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button context={ButtonContext.WARNING} variant={ButtonVariant.LINK}>
            Link
          </Button>
        </FlexContainerItem>
        <br />
        <FlexContainerItem>
          <Button context={ButtonContext.DANGER} variant={ButtonVariant.SOLID}>
            Solid
          </Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button context={ButtonContext.DANGER} variant={ButtonVariant.OUTLINE}>
            Outline
          </Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button context={ButtonContext.DANGER} variant={ButtonVariant.GHOST}>
            Ghost
          </Button>
        </FlexContainerItem>
        <FlexContainerItem>
          <Button context={ButtonContext.DANGER} variant={ButtonVariant.LINK}>
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
      <FlexContainer direction={FlexContainerDirection.COLUMN}>
        <FlexContainerItem>
          <div>Not Attached</div>
          <Button.Group context={ButtonContext.PRIMARY} variant={ButtonVariant.OUTLINE} size={ButtonSize.MEDIUM}>
            <Button>Derived From Group</Button>
            <Button
              context={ButtonContext.PRIMARY}
              variant={ButtonVariant.SOLID}
              state={ButtonState.IS_LOADING}
              preIcon={faHouse}
            >
              Primary
            </Button>
            <Button context={ButtonContext.SAFE} variant={ButtonVariant.LINK} size={ButtonSize.LARGE}>
              Safe
            </Button>
            <Button context={ButtonContext.WARNING} variant={ButtonVariant.GHOST} postIcon={faHouse}>
              Warning
            </Button>
            <Button context={ButtonContext.DANGER} variant={ButtonVariant.SOLID} size={ButtonSize.SMALL} disabled>
              Danger
            </Button>
          </Button.Group>
        </FlexContainerItem>
        <FlexContainerItem>
          <div>Attached</div>
          <Button.Group
            context={ButtonContext.PRIMARY}
            variant={ButtonVariant.OUTLINE}
            size={ButtonSize.MEDIUM}
            isAttached
          >
            <Button>Derived From Group</Button>
            <Button
              context={ButtonContext.PRIMARY}
              variant={ButtonVariant.SOLID}
              state={ButtonState.IS_LOADING}
              preIcon={faHouse}
            >
              Primary
            </Button>
            <Button context={ButtonContext.SAFE} variant={ButtonVariant.LINK} size={ButtonSize.LARGE}>
              Safe
            </Button>
            <Button context={ButtonContext.WARNING} variant={ButtonVariant.GHOST} postIcon={faHouse}>
              Warning
            </Button>
            <Button context={ButtonContext.DANGER} variant={ButtonVariant.SOLID} size={ButtonSize.SMALL} disabled>
              Danger
            </Button>
          </Button.Group>
        </FlexContainerItem>
      </FlexContainer>
    </>
  );
};
Groups.parameters = { controls: { disable: true } };
