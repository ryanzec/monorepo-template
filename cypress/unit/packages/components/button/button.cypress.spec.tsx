import * as React from 'react';
import { mount } from '@cypress/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { cypressUtils } from '$utils/cypress';
import Button from '$components/button/button';
import ButtonGroup from '$components/button/button-group';
import { ButtonContext, ButtonIconPosition, ButtonSize, ButtonState, ButtonVariant } from '$components/button/types';

describe('button', () => {
  it('default group', () => {
    mount(
      cypressUtils.addBasicWrapper(
        <ButtonGroup
          data-context={ButtonContext.PRIMARY}
          data-size={ButtonSize.MEDIUM}
          data-variant={ButtonVariant.SOLID}
        >
          <Button>test</Button>
          <Button>test2</Button>
        </ButtonGroup>,
      ),
    );

    cy.get('[data-id="button-group"] [data-id="button"]').should('have.length', 2);
  });

  it('unattached group', () => {
    mount(
      cypressUtils.addBasicWrapper(
        <ButtonGroup
          isAttached={false}
          data-context={ButtonContext.PRIMARY}
          data-size={ButtonSize.MEDIUM}
          data-variant={ButtonVariant.SOLID}
        >
          <Button>test</Button>
          <Button>test2</Button>
        </ButtonGroup>,
      ),
    );

    cy.get('[data-id="button-group"] [data-id="button"]').should('have.length', 2);
  });

  it('attached group', () => {
    mount(
      cypressUtils.addBasicWrapper(
        <ButtonGroup
          isAttached={true}
          data-context={ButtonContext.PRIMARY}
          data-size={ButtonSize.MEDIUM}
          data-variant={ButtonVariant.SOLID}
        >
          <Button>test</Button>
          <Button>test2</Button>
        </ButtonGroup>,
      ),
    );

    cy.get('[data-id="button-group"] [data-id="button"]').should('have.length', 2);
  });

  it('contexts', () => {
    mount(
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
    mount(
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
    mount(
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
    mount(
      cypressUtils.addBasicWrapper(
        <>
          <Button preIcon={<FontAwesomeIcon icon={faHouse} />}>pre icon</Button>
          <Button postIcon={<FontAwesomeIcon icon={faHouse} />}>post icon</Button>
        </>,
      ),
    );

    cy.get('[data-id="button"]:nth-child(1) [data-id="pre-icon"]').should('have.length', 1);
    cy.get('[data-id="button"]:nth-child(2) [data-id="post-icon"]').should('have.length', 1);
  });

  it('loading', () => {
    mount(
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
    mount(
      cypressUtils.addBasicWrapper(
        <>
          <Button
            preIcon={<FontAwesomeIcon icon={faHouse} />}
            data-state={ButtonState.IS_LOADING}
            loadingIconPosition={ButtonIconPosition.PRE}
          >
            pre is loading
          </Button>
          <Button
            postIcon={<FontAwesomeIcon icon={faHouse} />}
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
    mount(
      cypressUtils.addBasicWrapper(
        <>
          <Button disabled>disabled</Button>
        </>,
      ),
    );

    cy.get('[data-id="button"]').should('have.length', 1);
  });
});
