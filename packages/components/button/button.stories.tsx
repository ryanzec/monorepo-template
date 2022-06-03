import React from 'react';
import { FlexContainer, FlexContainerDirection } from '$storybook-helpers/flex-container';
import { ButtonContext, ButtonIconPosition, ButtonSize, ButtonState, ButtonVariant } from '$components/button/types';
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
        <Button data-size={ButtonSize.SMALL}>Small</Button>
        <Button data-size={ButtonSize.MEDIUM}>Medium</Button>
        <Button data-size={ButtonSize.LARGE}>Large</Button>
      </FlexContainer>
      <h1>Linaria</h1>
      <FlexContainer>
        <ButtonLin data-size={ButtonSize.SMALL}>Small</ButtonLin>
        <ButtonLin data-size={ButtonSize.MEDIUM}>Medium</ButtonLin>
        <ButtonLin data-size={ButtonSize.LARGE}>Large</ButtonLin>
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
        <Button data-state={ButtonState.IS_LOADING} loadingIconPosition={ButtonIconPosition.PRE}>
          Start Loading
        </Button>
        <Button data-state={ButtonState.IS_LOADING} loadingIconPosition={ButtonIconPosition.POST}>
          End Loading
        </Button>
      </FlexContainer>
      <h1>Linaria</h1>
      <FlexContainer direction={FlexContainerDirection.COLUMN}>
        <ButtonLin data-state={ButtonState.IS_LOADING} loadingIconPosition={ButtonIconPosition.PRE}>
          Start Loading
        </ButtonLin>
        <ButtonLin data-state={ButtonState.IS_LOADING} loadingIconPosition={ButtonIconPosition.POST}>
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
        <Button data-context={ButtonContext.PRIMARY}>Primary</Button>
        <Button data-context={ButtonContext.SAFE}>Safe</Button>
        <Button data-context={ButtonContext.WARNING}>Warning</Button>
        <Button data-context={ButtonContext.DANGER}>Danger</Button>
      </FlexContainer>
      <h1>Linaria</h1>
      <FlexContainer>
        <ButtonLin data-context={ButtonContext.PRIMARY}>Primary</ButtonLin>
        <ButtonLin data-context={ButtonContext.SAFE}>Safe</ButtonLin>
        <ButtonLin data-context={ButtonContext.WARNING}>Warning</ButtonLin>
        <ButtonLin data-context={ButtonContext.DANGER}>Danger</ButtonLin>
      </FlexContainer>
    </>
  );
};
Contexts.parameters = { controls: { disable: true } };

export const Variants = () => {
  return (
    <>
      <FlexContainer>
        <Button data-context={ButtonContext.PRIMARY} data-variant={ButtonVariant.SOLID}>
          Solid
        </Button>
        <Button data-context={ButtonContext.PRIMARY} data-variant={ButtonVariant.OUTLINE}>
          Outline
        </Button>
        <Button data-context={ButtonContext.PRIMARY} data-variant={ButtonVariant.GHOST}>
          Ghost
        </Button>
        <Button data-context={ButtonContext.PRIMARY} data-variant={ButtonVariant.LINK}>
          Link
        </Button>
        <br />
        <Button data-context={ButtonContext.SAFE} data-variant={ButtonVariant.SOLID}>
          Solid
        </Button>
        <Button data-context={ButtonContext.SAFE} data-variant={ButtonVariant.OUTLINE}>
          Outline
        </Button>
        <Button data-context={ButtonContext.SAFE} data-variant={ButtonVariant.GHOST}>
          Ghost
        </Button>
        <Button data-context={ButtonContext.SAFE} data-variant={ButtonVariant.LINK}>
          Link
        </Button>
        <br />
        <Button data-context={ButtonContext.WARNING} data-variant={ButtonVariant.SOLID}>
          Solid
        </Button>
        <Button data-context={ButtonContext.WARNING} data-variant={ButtonVariant.OUTLINE}>
          Outline
        </Button>
        <Button data-context={ButtonContext.WARNING} data-variant={ButtonVariant.GHOST}>
          Ghost
        </Button>
        <Button data-context={ButtonContext.WARNING} data-variant={ButtonVariant.LINK}>
          Link
        </Button>
        <br />
        <Button data-context={ButtonContext.DANGER} data-variant={ButtonVariant.SOLID}>
          Solid
        </Button>
        <Button data-context={ButtonContext.DANGER} data-variant={ButtonVariant.OUTLINE}>
          Outline
        </Button>
        <Button data-context={ButtonContext.DANGER} data-variant={ButtonVariant.GHOST}>
          Ghost
        </Button>
        <Button data-context={ButtonContext.DANGER} data-variant={ButtonVariant.LINK}>
          Link
        </Button>
        <br />
      </FlexContainer>
      <h1>Linaria</h1>
      <FlexContainer>
        <ButtonLin data-context={ButtonContext.PRIMARY} data-variant={ButtonVariant.SOLID}>
          Solid
        </ButtonLin>
        <ButtonLin data-context={ButtonContext.PRIMARY} data-variant={ButtonVariant.OUTLINE}>
          Outline
        </ButtonLin>
        <ButtonLin data-context={ButtonContext.PRIMARY} data-variant={ButtonVariant.GHOST}>
          Ghost
        </ButtonLin>
        <ButtonLin data-context={ButtonContext.PRIMARY} data-variant={ButtonVariant.LINK}>
          Link
        </ButtonLin>
        <br />
        <ButtonLin data-context={ButtonContext.SAFE} data-variant={ButtonVariant.SOLID}>
          Solid
        </ButtonLin>
        <ButtonLin data-context={ButtonContext.SAFE} data-variant={ButtonVariant.OUTLINE}>
          Outline
        </ButtonLin>
        <ButtonLin data-context={ButtonContext.SAFE} data-variant={ButtonVariant.GHOST}>
          Ghost
        </ButtonLin>
        <ButtonLin data-context={ButtonContext.SAFE} data-variant={ButtonVariant.LINK}>
          Link
        </ButtonLin>
        <br />
        <ButtonLin data-context={ButtonContext.WARNING} data-variant={ButtonVariant.SOLID}>
          Solid
        </ButtonLin>
        <ButtonLin data-context={ButtonContext.WARNING} data-variant={ButtonVariant.OUTLINE}>
          Outline
        </ButtonLin>
        <ButtonLin data-context={ButtonContext.WARNING} data-variant={ButtonVariant.GHOST}>
          Ghost
        </ButtonLin>
        <ButtonLin data-context={ButtonContext.WARNING} data-variant={ButtonVariant.LINK}>
          Link
        </ButtonLin>
        <br />
        <ButtonLin data-context={ButtonContext.DANGER} data-variant={ButtonVariant.SOLID}>
          Solid
        </ButtonLin>
        <ButtonLin data-context={ButtonContext.DANGER} data-variant={ButtonVariant.OUTLINE}>
          Outline
        </ButtonLin>
        <ButtonLin data-context={ButtonContext.DANGER} data-variant={ButtonVariant.GHOST}>
          Ghost
        </ButtonLin>
        <ButtonLin data-context={ButtonContext.DANGER} data-variant={ButtonVariant.LINK}>
          Link
        </ButtonLin>
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
        <div>
          <div>Not Attached</div>
          <ButtonGroup
            data-context={ButtonContext.PRIMARY}
            data-variant={ButtonVariant.OUTLINE}
            data-size={ButtonSize.MEDIUM}
          >
            <Button>Derived From Group</Button>
            <Button
              data-context={ButtonContext.PRIMARY}
              data-variant={ButtonVariant.SOLID}
              data-state={ButtonState.IS_LOADING}
              preIcon={<FontAwesomeIcon icon={faHouse} />}
            >
              Primary
            </Button>
            <Button data-context={ButtonContext.SAFE} data-variant={ButtonVariant.LINK} data-size={ButtonSize.LARGE}>
              Safe
            </Button>
            <Button
              data-context={ButtonContext.WARNING}
              data-variant={ButtonVariant.GHOST}
              postIcon={<FontAwesomeIcon icon={faHouse} />}
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
          </ButtonGroup>
        </div>
        <div>
          <div>Attached</div>
          <ButtonGroup
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
              preIcon={<FontAwesomeIcon icon={faHouse} />}
            >
              Primary
            </Button>
            <Button data-context={ButtonContext.SAFE} data-variant={ButtonVariant.LINK} data-size={ButtonSize.LARGE}>
              Safe
            </Button>
            <Button
              data-context={ButtonContext.WARNING}
              data-variant={ButtonVariant.GHOST}
              postIcon={<FontAwesomeIcon icon={faHouse} />}
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
          </ButtonGroup>
        </div>
      </FlexContainer>
      <h1>Linaria</h1>
      <FlexContainer direction={FlexContainerDirection.COLUMN}>
        <div>
          <div>Not Attached</div>
          <ButtonGroupLin
            data-context={ButtonContext.PRIMARY}
            data-variant={ButtonVariant.OUTLINE}
            data-size={ButtonSize.MEDIUM}
          >
            <ButtonLin>Derived From Group</ButtonLin>
            <ButtonLin
              data-context={ButtonContext.PRIMARY}
              data-variant={ButtonVariant.SOLID}
              data-state={ButtonState.IS_LOADING}
              preIcon={<FontAwesomeIcon icon={faHouse} />}
            >
              Primary
            </ButtonLin>
            <ButtonLin data-context={ButtonContext.SAFE} data-variant={ButtonVariant.LINK} data-size={ButtonSize.LARGE}>
              Safe
            </ButtonLin>
            <ButtonLin
              data-context={ButtonContext.WARNING}
              data-variant={ButtonVariant.GHOST}
              postIcon={<FontAwesomeIcon icon={faHouse} />}
            >
              Warning
            </ButtonLin>
            <ButtonLin
              data-context={ButtonContext.DANGER}
              data-variant={ButtonVariant.SOLID}
              data-size={ButtonSize.SMALL}
              disabled
            >
              Danger
            </ButtonLin>
          </ButtonGroupLin>
        </div>
        <div>
          <div>Attached</div>
          <ButtonGroupLin
            data-context={ButtonContext.PRIMARY}
            data-variant={ButtonVariant.OUTLINE}
            data-size={ButtonSize.MEDIUM}
            isAttached
          >
            <ButtonLin>Derived From Group</ButtonLin>
            <ButtonLin
              data-context={ButtonContext.PRIMARY}
              data-variant={ButtonVariant.SOLID}
              data-state={ButtonState.IS_LOADING}
              preIcon={<FontAwesomeIcon icon={faHouse} />}
            >
              Primary
            </ButtonLin>
            <ButtonLin data-context={ButtonContext.SAFE} data-variant={ButtonVariant.LINK} data-size={ButtonSize.LARGE}>
              Safe
            </ButtonLin>
            <ButtonLin
              data-context={ButtonContext.WARNING}
              data-variant={ButtonVariant.GHOST}
              postIcon={<FontAwesomeIcon icon={faHouse} />}
            >
              Warning
            </ButtonLin>
            <ButtonLin
              data-context={ButtonContext.DANGER}
              data-variant={ButtonVariant.SOLID}
              data-size={ButtonSize.SMALL}
              disabled
            >
              Danger
            </ButtonLin>
          </ButtonGroupLin>
        </div>
      </FlexContainer>
    </>
  );
};
Groups.parameters = { controls: { disable: true } };
