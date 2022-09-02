import { faHouse } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';

import Button, { ButtonContext, ButtonIconPosition, ButtonSize, ButtonState, ButtonVariant } from '$/components/button';
import { cypressUtils } from '$/utils/cypress';

describe('button', () => {
  it('default group', () => {
    cy.mount(
      cypressUtils.addBasicWrapper(
        <Button.Group
          data-context={ButtonContext.PRIMARY}
          data-size={ButtonSize.MEDIUM}
          data-variant={ButtonVariant.SOLID}
        >
          <Button>test</Button>
          <Button>test2</Button>
        </Button.Group>,
      ),
    );

    cy.get('[data-id="button-group"] [data-id="button"]').should('have.length', 2);
  });

  it('unattached group', () => {
    cy.mount(
      cypressUtils.addBasicWrapper(
        <Button.Group
          isAttached={false}
          data-context={ButtonContext.PRIMARY}
          data-size={ButtonSize.MEDIUM}
          data-variant={ButtonVariant.SOLID}
        >
          <Button>test</Button>
          <Button>test2</Button>
        </Button.Group>,
      ),
    );

    cy.get('[data-id="button-group"] [data-id="button"]').should('have.length', 2);
  });

  it('attached group', () => {
    cy.mount(
      cypressUtils.addBasicWrapper(
        <Button.Group
          isAttached={true}
          data-context={ButtonContext.PRIMARY}
          data-size={ButtonSize.MEDIUM}
          data-variant={ButtonVariant.SOLID}
        >
          <Button>test</Button>
          <Button>test2</Button>
        </Button.Group>,
      ),
    );

    cy.get('[data-id="button-group"] [data-id="button"]').should('have.length', 2);
  });

  it('contexts', () => {
    cy.mount(
      cypressUtils.addBasicWrapper(
        <>
          <Button data-context={ButtonContext.PRIMARY}>primary</Button>
          <Button data-context={ButtonContext.SAFE}>safe</Button>
          <Button data-context={ButtonContext.WARNING}>warning</Button>
          <Button data-context={ButtonContext.DANGER}>danger</Button>
        </>,
      ),
    );

    cy.get('[data-id="button"]').should('have.length', 4);
  });

  it('sizes', () => {
    cy.mount(
      cypressUtils.addBasicWrapper(
        <>
          <Button data-size={ButtonSize.SMALL}>small</Button>
          <Button data-size={ButtonSize.MEDIUM}>medium</Button>
          <Button data-size={ButtonSize.LARGE}>large</Button>
        </>,
      ),
    );

    cy.get('[data-id="button"]').should('have.length', 3);
  });

  it('variants', () => {
    cy.mount(
      cypressUtils.addBasicWrapper(
        <>
          <Button data-variant={ButtonVariant.SOLID}>solid</Button>
          <Button data-variant={ButtonVariant.OUTLINE}>outline</Button>
          <Button data-variant={ButtonVariant.GHOST}>ghost</Button>
          <Button data-variant={ButtonVariant.LINK}>link</Button>
        </>,
      ),
    );

    cy.get('[data-id="button"]').should('have.length', 4);
  });

  it('icons', () => {
    cy.mount(
      cypressUtils.addBasicWrapper(
        <>
          <Button preIcon={<Button.Icon icon={faHouse} />}>pre icon</Button>
          <Button postIcon={<Button.Icon icon={faHouse} />}>post icon</Button>
        </>,
      ),
    );

    cy.get('[data-id="button"]:nth-child(1) [data-id="pre-icon"]').should('have.length', 1);
    cy.get('[data-id="button"]:nth-child(2) [data-id="post-icon"]').should('have.length', 1);
  });

  it('loading', () => {
    cy.mount(
      cypressUtils.addBasicWrapper(
        <>
          <Button data-state={ButtonState.IS_LOADING} loadingIconPosition={ButtonIconPosition.PRE}>
            pre is loading
          </Button>
          <Button data-state={ButtonState.IS_LOADING} loadingIconPosition={ButtonIconPosition.POST}>
            post is loading
          </Button>
        </>,
      ),
    );

    cy.get('[data-id="button"]:nth-child(1) [data-id="pre-loading-icon"]').should('have.length', 1);
    cy.get('[data-id="button"]:nth-child(2) [data-id="post-loading-icon"]').should('have.length', 1);
  });

  it('loading overrides regular icon', () => {
    cy.mount(
      cypressUtils.addBasicWrapper(
        <>
          <Button
            preIcon={<Button.Icon icon={faHouse} />}
            data-state={ButtonState.IS_LOADING}
            loadingIconPosition={ButtonIconPosition.PRE}
          >
            pre is loading
          </Button>
          <Button
            postIcon={<Button.Icon icon={faHouse} />}
            data-state={ButtonState.IS_LOADING}
            loadingIconPosition={ButtonIconPosition.POST}
          >
            post is loading
          </Button>
        </>,
      ),
    );

    cy.get('[data-id="button"]:nth-child(1) [data-id="pre-loading-icon"]').should('have.length', 1);
    cy.get('[data-id="button"]:nth-child(2) [data-id="post-loading-icon"]').should('have.length', 1);
  });

  it('disabled', () => {
    cy.mount(
      cypressUtils.addBasicWrapper(
        <>
          <Button disabled>disabled</Button>
        </>,
      ),
    );

    cy.get('[data-id="button"]').should('have.length', 1);
  });
});
