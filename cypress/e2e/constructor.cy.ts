describe('Тест ингредиентов', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.visit('/');
  });

  it('Список ингредиентов', () => {
    cy.get('[data-ingredient="bun"]').should('exist');
    cy.get('[data-ingredient="main"]').should('exist');
    cy.get('[data-ingredient="sauce"]').should('exist');
  });

  it('добавление в конструктор булки', () => {
    cy.get('[data-ingredient="bun"]')
      .first()
      .within(() => {
        cy.contains('button', 'Добавить').click();
      });

    cy.get('[data-constructor="bun"]').should('exist');
  });

  it('добавление в конструктор начинки и соуса', () => {
    cy.get('[data-ingredient="main"]')
      .first()
      .within(() => {
        cy.contains('button', 'Добавить').click();
      });

    cy.get('[data-ingredient="sauce"]')
      .first()
      .within(() => {
        cy.contains('button', 'Добавить').click();
      });

    cy.get('[data-constructor="main"], [data-constructor="sauce"]').should(
      'exist'
    );
  });

  it('Открытие модального окна ингредиента и закрытие по клику на крестик', () => {
    cy.get('[data-ingredient="bun"]').first().click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="ingredient-details"]');
    cy.get('[data-cy="modal-overlay"]').should('exist');
    cy.get('[data-cy="modal-close-button"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('Закрытие модального окна по клику на оверлей', () => {
    cy.get('[data-ingredient="sauce"]').first().click();
    cy.get('[data-cy="modal-overlay"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('Закрытие модального окна по нажатию Escape', () => {
    cy.get('[data-ingredient="bun"]').first().click();
    cy.get('body').type('{esc}');
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('Сохранение модального окна при обновлении страницы', () => {
    cy.get('[data-ingredient="main"]').first().click();
    cy.reload();
    cy.get('[data-cy="modal"]').should('be.visible');
  });
});

describe('Создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.intercept('POST', 'api/orders', { fixture: 'order' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user' });

    cy.setCookie('accessToken', 'test-token');
    localStorage.setItem('refreshToken', 'test-refresh-token');

    cy.visit('/');
  });

  it('Успешное создание заказа', () => {
    cy.get('[data-ingredient="bun"]')
      .first()
      .within(() => {
        cy.contains('button', 'Добавить').click();
      });

    cy.get('[data-ingredient="main"]')
      .first()
      .within(() => {
        cy.contains('button', 'Добавить').click();
      });

    cy.get('button').contains('Оформить заказ').click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.fixture('order').then((orderData: { order: { number: number } }) => {
      cy.get('[data-cy="order-number"]').should(
        'have.text',
        orderData.order.number
      );
    });

    cy.get('[data-cy="modal-close-button"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
    cy.get('[data-constructor="bun"]').should('not.exist');
    cy.get('[data-constructor="main"]').should('not.exist');
    cy.get('[data-constructor="sauce"]').should('not.exist');
  });
});
