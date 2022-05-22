import React, { useCallback, useState } from 'react';
import { FlexContainer, FlexContainerDirection } from '$storybook-helpers/flex-container';
import { ButtonContext, ButtonIconPosition, ButtonSize, ButtonVariant } from '$components/button/types';
import { Button } from '$components/button/button';
import { ButtonGroup } from '$components/button/button-group';
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
    <FlexContainer>
      <Button size={ButtonSize.SMALL}>Small</Button>
      <Button size={ButtonSize.MEDIUM}>Medium</Button>
      <Button size={ButtonSize.LARGE}>Large</Button>
    </FlexContainer>
  );
};
Sizes.parameters = { controls: { disable: true } };

export const Icons = () => {
  return (
    <FlexContainer direction={FlexContainerDirection.COLUMN}>
      <Button preIcon={<FontAwesomeIcon icon={faHouse} />}>Start Icon</Button>
      <Button postIcon={<FontAwesomeIcon icon={faHouse} />}>End Icon</Button>
    </FlexContainer>
  );
};
Icons.parameters = { controls: { disable: true } };

export const Loading = () => {
  return (
    <FlexContainer direction={FlexContainerDirection.COLUMN}>
      <Button isLoading loadingIconPosition={ButtonIconPosition.PRE}>
        Start Loading
      </Button>
      <Button isLoading loadingIconPosition={ButtonIconPosition.POST}>
        End Loading
      </Button>
    </FlexContainer>
  );
};
Icons.parameters = { controls: { disable: true } };

export const Contexts = () => {
  return (
    <FlexContainer>
      <Button context={ButtonContext.PRIMARY}>Primary</Button>
      <Button context={ButtonContext.SAFE}>Safe</Button>
      <Button context={ButtonContext.WARNING}>Warning</Button>
      <Button context={ButtonContext.DANGER}>Danger</Button>
    </FlexContainer>
  );
};
Contexts.parameters = { controls: { disable: true } };

export const Variants = () => {
  return (
    <FlexContainer>
      <Button variant={ButtonVariant.SOLID}>Solid</Button>
      <Button variant={ButtonVariant.OUTLINE}>Outline</Button>
      <Button variant={ButtonVariant.GHOST}>Ghost</Button>
      <Button variant={ButtonVariant.LINK}>Link</Button>
    </FlexContainer>
  );
};
Variants.parameters = { controls: { disable: true } };

export const Groups = () => {
  return (
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
  );
};
Groups.parameters = { controls: { disable: true } };

// cypress specific stories
export const CypressClick = () => {
  const [beenClicked, setBeenClicked] = useState(false);

  const onClick = useCallback(() => {
    setBeenClicked(true);
  }, []);

  return (
    <>
      <Button onClick={onClick}>Click Me</Button>
      {beenClicked && <span data-id="been-clicked">button has been clicked</span>}
    </>
  );
};
// each story needs this to prevent typescript errors when using @storybook/testing-react
CypressClick.args = {};
