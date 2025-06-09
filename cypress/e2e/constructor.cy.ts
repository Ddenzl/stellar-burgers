import { SELECTORS } from 'cypress/support/constants';

describe('Тест ингредиентов', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' }).as(
      'getIngredients'
    );
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.get(SELECTORS.INGREDIENT_BUN).as('bun');
    cy.get(SELECTORS.INGREDIENT_MAIN).as('main');
    cy.get(SELECTORS.INGREDIENT_SAUCE).as('sauce');
  });

  it('Список ингредиентов', () => {
    cy.get('@bun').should('exist');
    cy.get('@main').should('exist');
    cy.get('@sauce').should('exist');
  });

  it('Добавление в конструктор булки', () => {
    cy.addIngredient(SELECTORS.INGREDIENT_BUN);
    cy.get(SELECTORS.CONSTRUCTOR_BUN).should('exist');
  });

  it('Добавление в конструктор начинки и соуса', () => {
    cy.addIngredient(SELECTORS.INGREDIENT_MAIN);
    cy.addIngredient(SELECTORS.INGREDIENT_SAUCE);
    cy.checkConstructor([
      SELECTORS.CONSTRUCTOR_MAIN,
      SELECTORS.CONSTRUCTOR_SAUCE
    ]);
  });

  it('Открытие модального окна ингредиента и закрытие по клику на крестик', () => {
    cy.openIngredientModal(SELECTORS.INGREDIENT_BUN);
    cy.get(SELECTORS.INGREDIENT_DETAILS).should('exist');
    cy.get(SELECTORS.MODAL_OVERLAY).should('exist');
    cy.closeModal('closeButton');
  });

  it('Закрытие модального окна по клику на оверлей', () => {
    cy.openIngredientModal(SELECTORS.INGREDIENT_SAUCE);
    cy.closeModal('overlay');
  });

  it('Закрытие модального окна по нажатию Escape', () => {
    cy.openIngredientModal(SELECTORS.INGREDIENT_BUN);
    cy.closeModal('escape');
  });

  it('Сохранение модального окна при обновлении страницы', () => {
    cy.openIngredientModal(SELECTORS.INGREDIENT_MAIN);
    cy.reload();
    cy.get(SELECTORS.MODAL).should('be.visible');
  });
});

describe('Создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' }).as(
      'getIngredients'
    );
    cy.intercept('POST', 'api/orders', { fixture: 'order' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
    cy.setCookie('accessToken', 'test-token');
    localStorage.setItem('refreshToken', 'test-refresh-token');
    cy.visit('/');
    cy.get(SELECTORS.INGREDIENT_BUN);
    cy.get(SELECTORS.INGREDIENT_MAIN);
  });

  it('Успешное создание заказа', () => {
    cy.addIngredient(SELECTORS.INGREDIENT_BUN);
    cy.addIngredient(SELECTORS.INGREDIENT_MAIN);
    cy.get('button').contains(SELECTORS.ORDER_BUTTON).click();
    cy.get(SELECTORS.MODAL).should('be.visible');
    cy.fixture('order').then((orderData: { order: { number: number } }) => {
      cy.get(SELECTORS.ORDER_NUMBER).should(
        'have.text',
        orderData.order.number
      );
    });
    cy.closeModal('closeButton');
    cy.clearConstructor([
      SELECTORS.CONSTRUCTOR_BUN,
      SELECTORS.CONSTRUCTOR_MAIN,
      SELECTORS.CONSTRUCTOR_SAUCE
    ]);
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });
});
