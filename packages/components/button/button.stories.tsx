import { faHouse } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

import Button, { ButtonContext, ButtonIconPosition, ButtonSize, ButtonState, ButtonVariant } from '$/components/button';

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
      <div>
        <div>
          <Button size={ButtonSize.SMALL}>Small</Button>
        </div>
        <div>
          <Button size={ButtonSize.MEDIUM}>Medium</Button>
        </div>
        <div>
          <Button size={ButtonSize.LARGE}>Large</Button>
        </div>
      </div>
    </>
  );
};
Sizes.parameters = { controls: { disable: true } };

export const Icons = () => {
  return (
    <>
      <div>
        <div>
          <Button preIcon={faHouse}>Start Icon</Button>
        </div>
        <div>
          <Button postIcon={faHouse}>End Icon</Button>
        </div>
      </div>
    </>
  );
};
Icons.parameters = { controls: { disable: true } };

export const Loading = () => {
  return (
    <>
      <div>
        <div>
          <Button state={ButtonState.IS_LOADING} loadingIconPosition={ButtonIconPosition.PRE}>
            Start Loading
          </Button>
        </div>
        <div>
          <Button state={ButtonState.IS_LOADING} loadingIconPosition={ButtonIconPosition.POST}>
            End Loading
          </Button>
        </div>
      </div>
    </>
  );
};
Icons.parameters = { controls: { disable: true } };

export const Contexts = () => {
  return (
    <>
      <div>
        <div>
          <Button context={ButtonContext.PRIMARY}>Primary</Button>
        </div>
        <div>
          <Button context={ButtonContext.SAFE}>Safe</Button>
        </div>
        <div>
          <Button context={ButtonContext.WARNING}>Warning</Button>
        </div>
        <div>
          <Button context={ButtonContext.DANGER}>Danger</Button>
        </div>
      </div>
    </>
  );
};
Contexts.parameters = { controls: { disable: true } };

export const Variants = () => {
  return (
    <>
      <div>
        <div>
          <Button context={ButtonContext.PRIMARY} variant={ButtonVariant.SOLID}>
            Solid
          </Button>
        </div>
        <div>
          <Button context={ButtonContext.PRIMARY} variant={ButtonVariant.OUTLINE}>
            Outline
          </Button>
        </div>
        <div>
          <Button context={ButtonContext.PRIMARY} variant={ButtonVariant.GHOST}>
            Ghost
          </Button>
        </div>
        <div>
          <Button context={ButtonContext.PRIMARY} variant={ButtonVariant.LINK}>
            Link
          </Button>
        </div>
        <br />
        <div>
          <Button context={ButtonContext.SAFE} variant={ButtonVariant.SOLID}>
            Solid
          </Button>
        </div>
        <div>
          <Button context={ButtonContext.SAFE} variant={ButtonVariant.OUTLINE}>
            Outline
          </Button>
        </div>
        <div>
          <Button context={ButtonContext.SAFE} variant={ButtonVariant.GHOST}>
            Ghost
          </Button>
        </div>
        <div>
          <Button context={ButtonContext.SAFE} variant={ButtonVariant.LINK}>
            Link
          </Button>
        </div>
        <br />
        <div>
          <Button context={ButtonContext.WARNING} variant={ButtonVariant.SOLID}>
            Solid
          </Button>
        </div>
        <div>
          <Button context={ButtonContext.WARNING} variant={ButtonVariant.OUTLINE}>
            Outline
          </Button>
        </div>
        <div>
          <Button context={ButtonContext.WARNING} variant={ButtonVariant.GHOST}>
            Ghost
          </Button>
        </div>
        <div>
          <Button context={ButtonContext.WARNING} variant={ButtonVariant.LINK}>
            Link
          </Button>
        </div>
        <br />
        <div>
          <Button context={ButtonContext.DANGER} variant={ButtonVariant.SOLID}>
            Solid
          </Button>
        </div>
        <div>
          <Button context={ButtonContext.DANGER} variant={ButtonVariant.OUTLINE}>
            Outline
          </Button>
        </div>
        <div>
          <Button context={ButtonContext.DANGER} variant={ButtonVariant.GHOST}>
            Ghost
          </Button>
        </div>
        <div>
          <Button context={ButtonContext.DANGER} variant={ButtonVariant.LINK}>
            Link
          </Button>
        </div>
        <br />
      </div>
    </>
  );
};
Variants.parameters = { controls: { disable: true } };

export const Groups = () => {
  return (
    <>
      <div>
        <div>
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
        </div>
        <div>
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
        </div>
      </div>
    </>
  );
};
Groups.parameters = { controls: { disable: true } };
