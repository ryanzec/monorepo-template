import * as React from 'react';
import { mount } from '@cypress/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import * as cypressUtils from '$utils/cypress';
import Button from '$components/button/button';
import ButtonGroup from '$components/button/button-group';
import { ButtonContext, ButtonIconPosition, ButtonSize, ButtonVariant } from '$components/button/types';

describe('button', () => {
  it('default group', () => {
    mount(
      cypressUtils.addBasicWrapper(
        <ButtonGroup context={ButtonContext.PRIMARY} size={ButtonSize.MEDIUM} variant={ButtonVariant.SOLID}>
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
          context={ButtonContext.PRIMARY}
          size={ButtonSize.MEDIUM}
          variant={ButtonVariant.SOLID}
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
          context={ButtonContext.PRIMARY}
          size={ButtonSize.MEDIUM}
          variant={ButtonVariant.SOLID}
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
    mount(
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
    mount(
      cypressUtils.addBasicWrapper(
        <>
          <Button variant={ButtonVariant.SOLID}>solid</Button>
          <Button variant={ButtonVariant.OUTLINE}>ioutline</Button>
          <Button variant={ButtonVariant.GHOST}>ghost</Button>
          <Button variant={ButtonVariant.LINK}>link</Button>
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
          <Button isLoading loadingIconPosition={ButtonIconPosition.PRE}>
            pre is loading
          </Button>
          <Button isLoading loadingIconPosition={ButtonIconPosition.POST}>
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
          <Button preIcon={<FontAwesomeIcon icon={faHouse} />} isLoading loadingIconPosition={ButtonIconPosition.PRE}>
            pre is loading
          </Button>
          <Button postIcon={<FontAwesomeIcon icon={faHouse} />} isLoading loadingIconPosition={ButtonIconPosition.POST}>
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
