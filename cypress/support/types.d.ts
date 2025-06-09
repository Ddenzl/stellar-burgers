declare namespace Cypress {
  interface Chainable {
    addIngredient(selector: string): Chainable<void>;
    openIngredientModal(selector: string): Chainable<void>;
    closeModal(method: 'closeButton' | 'overlay' | 'escape'): Chainable<void>;
    checkConstructor(selectors: string[]): Chainable<void>;
    clearConstructor(selectors: string[]): Chainable<void>;
  }
}
