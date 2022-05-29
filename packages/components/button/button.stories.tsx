import React, { useCallback, useState } from 'react';
import { FlexContainer, FlexContainerDirection } from '$storybook-helpers/flex-container';
import { ButtonContext, ButtonIconPosition, ButtonSize, ButtonVariant } from '$components/button/types';
import { Button } from '$components/button/button';
import { ButtonGroup } from '$components/button/button-group';
import { Button as ButtonLin } from '$components/button/button-lin';
import { ButtonGroup as ButtonGroupLin } from '$components/button/button-group-lin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

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
        <Button size={ButtonSize.SMALL}>Small</Button>
        <Button size={ButtonSize.MEDIUM}>Medium</Button>
        <Button size={ButtonSize.LARGE}>Large</Button>
      </FlexContainer>
      <h1>Linaria</h1>
      <FlexContainer>
        <ButtonLin size={ButtonSize.SMALL}>Small</ButtonLin>
        <ButtonLin size={ButtonSize.MEDIUM}>Medium</ButtonLin>
        <ButtonLin size={ButtonSize.LARGE}>Large</ButtonLin>
      </FlexContainer>
    </>
  );
};
Sizes.parameters = { controls: { disable: true } };

export const Icons = () => {
  return (
    <>
      <FlexContainer direction={FlexContainerDirection.COLUMN}>
        <Button preIcon={<FontAwesomeIcon icon={faHouse} />}>Start Icon</Button>
        <Button postIcon={<FontAwesomeIcon icon={faHouse} />}>End Icon</Button>
      </FlexContainer>
      <h1>Linaria</h1>
      <FlexContainer direction={FlexContainerDirection.COLUMN}>
        <ButtonLin preIcon={<FontAwesomeIcon icon={faHouse} />}>Start Icon</ButtonLin>
        <ButtonLin postIcon={<FontAwesomeIcon icon={faHouse} />}>End Icon</ButtonLin>
      </FlexContainer>
    </>
  );
};
Icons.parameters = { controls: { disable: true } };

export const Loading = () => {
  return (
    <>
      <FlexContainer direction={FlexContainerDirection.COLUMN}>
        <Button isLoading loadingIconPosition={ButtonIconPosition.PRE}>
          Start Loading
        </Button>
        <Button isLoading loadingIconPosition={ButtonIconPosition.POST}>
          End Loading
        </Button>
      </FlexContainer>
      <h1>Linaria</h1>
      <FlexContainer direction={FlexContainerDirection.COLUMN}>
        <ButtonLin isLoading loadingIconPosition={ButtonIconPosition.PRE}>
          Start Loading
        </ButtonLin>
        <ButtonLin isLoading loadingIconPosition={ButtonIconPosition.POST}>
          End Loading
        </ButtonLin>
      </FlexContainer>
    </>
  );
};
Icons.parameters = { controls: { disable: true } };

export const Contexts = () => {
  return (
    <>
      <FlexContainer>
        <Button context={ButtonContext.PRIMARY}>Primary</Button>
        <Button context={ButtonContext.SAFE}>Safe</Button>
        <Button context={ButtonContext.WARNING}>Warning</Button>
        <Button context={ButtonContext.DANGER}>Danger</Button>
      </FlexContainer>
      <h1>Linaria</h1>
      <FlexContainer>
        <ButtonLin context={ButtonContext.PRIMARY}>Primary</ButtonLin>
        <ButtonLin context={ButtonContext.SAFE}>Safe</ButtonLin>
        <ButtonLin context={ButtonContext.WARNING}>Warning</ButtonLin>
        <ButtonLin context={ButtonContext.DANGER}>Danger</ButtonLin>
      </FlexContainer>
    </>
  );
};
Contexts.parameters = { controls: { disable: true } };

export const Variants = () => {
  return (
    <>
      <FlexContainer>
        <Button variant={ButtonVariant.SOLID}>Solid</Button>
        <Button variant={ButtonVariant.OUTLINE}>Outline</Button>
        <Button variant={ButtonVariant.GHOST}>Ghost</Button>
        <Button variant={ButtonVariant.LINK}>Link</Button>
      </FlexContainer>
      <h1>Linaria</h1>
      <FlexContainer>
        <ButtonLin variant={ButtonVariant.SOLID}>Solid</ButtonLin>
        <ButtonLin variant={ButtonVariant.OUTLINE}>Outline</ButtonLin>
        <ButtonLin variant={ButtonVariant.GHOST}>Ghost</ButtonLin>
        <ButtonLin variant={ButtonVariant.LINK}>Link</ButtonLin>
      </FlexContainer>
    </>
  );
};
Variants.parameters = { controls: { disable: true } };

export const Groups = () => {
  return (
    <>
      <FlexContainer direction={FlexContainerDirection.COLUMN}>
        <div>
          <div>Not Attached</div>
          <ButtonGroup context={ButtonContext.PRIMARY} variant={ButtonVariant.OUTLINE} size={ButtonSize.MEDIUM}>
            <Button>Derived From Group</Button>
            <Button
              context={ButtonContext.PRIMARY}
              variant={ButtonVariant.SOLID}
              isLoading
              preIcon={<FontAwesomeIcon icon={faHouse} />}
            >
              Primary
            </Button>
            <Button context={ButtonContext.SAFE} variant={ButtonVariant.LINK} size={ButtonSize.LARGE}>
              Safe
            </Button>
            <Button
              context={ButtonContext.WARNING}
              variant={ButtonVariant.GHOST}
              postIcon={<FontAwesomeIcon icon={faHouse} />}
            >
              Warning
            </Button>
            <Button context={ButtonContext.DANGER} variant={ButtonVariant.SOLID} size={ButtonSize.SMALL} disabled>
              Danger
            </Button>
          </ButtonGroup>
        </div>
        <div>
          <div>Attached</div>
          <ButtonGroup
            context={ButtonContext.PRIMARY}
            variant={ButtonVariant.OUTLINE}
            size={ButtonSize.MEDIUM}
            isAttached
          >
            <Button>Derived From Group</Button>
            <Button
              context={ButtonContext.PRIMARY}
              variant={ButtonVariant.SOLID}
              isLoading
              preIcon={<FontAwesomeIcon icon={faHouse} />}
            >
              Primary
            </Button>
            <Button context={ButtonContext.SAFE} variant={ButtonVariant.LINK} size={ButtonSize.LARGE}>
              Safe
            </Button>
            <Button
              context={ButtonContext.WARNING}
              variant={ButtonVariant.GHOST}
              postIcon={<FontAwesomeIcon icon={faHouse} />}
            >
              Warning
            </Button>
            <Button context={ButtonContext.DANGER} variant={ButtonVariant.SOLID} size={ButtonSize.SMALL} disabled>
              Danger
            </Button>
          </ButtonGroup>
        </div>
      </FlexContainer>
      <h1>Linaria</h1>
      <FlexContainer direction={FlexContainerDirection.COLUMN}>
        <div>
          <div>Not Attached</div>
          <ButtonGroupLin context={ButtonContext.PRIMARY} variant={ButtonVariant.OUTLINE} size={ButtonSize.MEDIUM}>
            <ButtonLin>Derived From Group</ButtonLin>
            <ButtonLin
              context={ButtonContext.PRIMARY}
              variant={ButtonVariant.SOLID}
              isLoading
              preIcon={<FontAwesomeIcon icon={faHouse} />}
            >
              Primary
            </ButtonLin>
            <ButtonLin context={ButtonContext.SAFE} variant={ButtonVariant.LINK} size={ButtonSize.LARGE}>
              Safe
            </ButtonLin>
            <ButtonLin
              context={ButtonContext.WARNING}
              variant={ButtonVariant.GHOST}
              postIcon={<FontAwesomeIcon icon={faHouse} />}
            >
              Warning
            </ButtonLin>
            <ButtonLin context={ButtonContext.DANGER} variant={ButtonVariant.SOLID} size={ButtonSize.SMALL} disabled>
              Danger
            </ButtonLin>
          </ButtonGroupLin>
        </div>
        <div>
          <div>Attached</div>
          <ButtonGroupLin
            context={ButtonContext.PRIMARY}
            variant={ButtonVariant.OUTLINE}
            size={ButtonSize.MEDIUM}
            isAttached
          >
            <ButtonLin>Derived From Group</ButtonLin>
            <ButtonLin
              context={ButtonContext.PRIMARY}
              variant={ButtonVariant.SOLID}
              isLoading
              preIcon={<FontAwesomeIcon icon={faHouse} />}
            >
              Primary
            </ButtonLin>
            <ButtonLin context={ButtonContext.SAFE} variant={ButtonVariant.LINK} size={ButtonSize.LARGE}>
              Safe
            </ButtonLin>
            <ButtonLin
              context={ButtonContext.WARNING}
              variant={ButtonVariant.GHOST}
              postIcon={<FontAwesomeIcon icon={faHouse} />}
            >
              Warning
            </ButtonLin>
            <ButtonLin context={ButtonContext.DANGER} variant={ButtonVariant.SOLID} size={ButtonSize.SMALL} disabled>
              Danger
            </ButtonLin>
          </ButtonGroupLin>
        </div>
      </FlexContainer>
    </>
  );
};
Groups.parameters = { controls: { disable: true } };
