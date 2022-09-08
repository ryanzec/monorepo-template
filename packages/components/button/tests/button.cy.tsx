import { faHouse } from '@fortawesome/free-solid-svg-icons';
import * as React from 'react';

import Button, { ButtonContext, ButtonIconPosition, ButtonSize, ButtonState, ButtonVariant } from '$/components/button';
import { cypressUtils } from '$/utils/cypress';

describe('button', () => {
  it('default group', () => {
    cy.mount(
      cypressUtils.addBasicWrapper(
        <Button.Group context={ButtonContext.PRIMARY} size={ButtonSize.MEDIUM} variant={ButtonVariant.SOLID}>
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
          context={ButtonContext.PRIMARY}
          size={ButtonSize.MEDIUM}
          variant={ButtonVariant.SOLID}
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
          context={ButtonContext.PRIMARY}
          size={ButtonSize.MEDIUM}
          variant={ButtonVariant.SOLID}
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
          <Button context={ButtonContext.PRIMARY}>primary</Button>
          <Button context={ButtonContext.SAFE}>safe</Button>
          <Button context={ButtonContext.WARNING}>warning</Button>
          <Button context={ButtonContext.DANGER}>danger</Button>
        </>,
      ),
    );

    cy.get('[data-id="button"]').should('have.length', 4);
  });

  it('sizes', () => {
    cy.mount(
      cypressUtils.addBasicWrapper(
        <>
          <Button size={ButtonSize.SMALL}>small</Button>
          <Button size={ButtonSize.MEDIUM}>medium</Button>
          <Button size={ButtonSize.LARGE}>large</Button>
        </>,
      ),
    );

    cy.get('[data-id="button"]').should('have.length', 3);
  });

  it('variants', () => {
    cy.mount(
      cypressUtils.addBasicWrapper(
        <>
          <Button variant={ButtonVariant.SOLID}>solid</Button>
          <Button variant={ButtonVariant.OUTLINE}>outline</Button>
          <Button variant={ButtonVariant.GHOST}>ghost</Button>
          <Button variant={ButtonVariant.LINK}>link</Button>
        </>,
      ),
    );

    cy.get('[data-id="button"]').should('have.length', 4);
  });

  it('icons', () => {
    cy.mount(
      cypressUtils.addBasicWrapper(
        <>
          <Button preIcon={faHouse}>pre icon</Button>
          <Button postIcon={faHouse}>post icon</Button>
        </>,
      ),
    );

    cy.get('[data-id="button"]:nth-child(1) [data-id*="icon"][data-id*="pre"]').should('have.length', 1);
    cy.get('[data-id="button"]:nth-child(2) [data-id*="icon"][data-id*="post"]').should('have.length', 1);
  });

  it('loading', () => {
    cy.mount(
      cypressUtils.addBasicWrapper(
        <>
          <Button state={ButtonState.IS_LOADING} loadingIconPosition={ButtonIconPosition.PRE}>
            pre is loading
          </Button>
          <Button state={ButtonState.IS_LOADING} loadingIconPosition={ButtonIconPosition.POST}>
            post is loading
          </Button>
        </>,
      ),
    );

    cy.get('[data-id="button"]:nth-child(1) [data-id*="icon"][data-id*="pre"][data-id*="loading"]').should(
      'have.length',
      1,
    );
    cy.get('[data-id="button"]:nth-child(2) [data-id*="icon"][data-id*="post"][data-id*="loading"]').should(
      'have.length',
      1,
    );
  });

  it('loading overrides regular icon', () => {
    cy.mount(
      cypressUtils.addBasicWrapper(
        <>
          <Button preIcon={faHouse} state={ButtonState.IS_LOADING} loadingIconPosition={ButtonIconPosition.PRE}>
            pre is loading
          </Button>
          <Button postIcon={faHouse} state={ButtonState.IS_LOADING} loadingIconPosition={ButtonIconPosition.POST}>
            post is loading
          </Button>
        </>,
      ),
    );

    cy.get('[data-id="button"]:nth-child(1) [data-id*="icon"][data-id*="pre"][data-id*="loading"]').should(
      'have.length',
      1,
    );
    cy.get('[data-id="button"]:nth-child(2) [data-id*="icon"][data-id*="post"][data-id*="loading"]').should(
      'have.length',
      1,
    );
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
