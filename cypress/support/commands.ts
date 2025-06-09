/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// };

Cypress.Commands.add('addIngredient', (selector: string) => {
  cy.get(selector)
    .first()
    .within(() => {
      cy.contains('button', 'Добавить').click();
    });
});

Cypress.Commands.add('openIngredientModal', (selector: string) => {
  cy.get(selector).first().click();
  cy.get('[data-cy="modal"]').as('modal').should('be.visible');
});

Cypress.Commands.add(
  'closeModal',
  (method: 'closeButton' | 'overlay' | 'escape') => {
    if (method === 'closeButton') {
      cy.get('[data-cy="modal-close-button"]').click();
    } else if (method === 'overlay') {
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
    } else if (method === 'escape') {
      cy.get('body').type('{esc}');
    }
    cy.get('[data-cy="modal"]').should('not.exist');
  }
);

Cypress.Commands.add('checkConstructor', (selectors: string[]) => {
  selectors.forEach((selector) => {
    cy.get(selector).should('exist');
  });
});

Cypress.Commands.add('clearConstructor', (selectors: string[]) => {
  selectors.forEach((selector) => {
    cy.get(selector).should('not.exist');
  });
});
