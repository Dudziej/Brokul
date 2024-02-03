describe('Homepage', () => {
  it('successfully loads', () => {
    cy.visit('/')
    cy.contains('Witaj w moim zadaniu testowym!')
  })
})

describe('Admin Panel - Product Management', () => {
  beforeEach(() => {
    cy.visit('#/admin-panel');
  });

  it('allows adding a new product', () => {
    cy.get('[data-testid="add-product-button"]').click();
    cy.get('[data-testid="add-product-dialog"]')
    cy.get('[data-testid="product-name-input"]').type('AAA Testowy Produkt');
    cy.get('[data-testid="product-price-input"]').type('123');
    cy.get('[data-testid="submit-button"]').click();
    cy.get('[data-testid="product-list-table"]')
      .find('th')
      .contains('Nazwa Produktu')
      .click();
    cy.contains('AAA Testowy Produkt');
    cy.contains('123.00 zł');
  });

  it('allows editing a product', () => {
    cy.get('[data-testid="product-list-table"]')
      .find('th')
      .contains('Nazwa Produktu')
      .click();
    cy.contains('AAA Testowy Produkt')
      .parent()
      .find('.mdi-pencil')
      .click();
    cy.get('[data-testid="edit-price-textfield"]')
      .clear()
      .type('456')
      .type('{enter}');
    cy.contains('456.00 zł');
  });


  it('allows deleting a product', () => {
    cy.get('[data-testid="product-list-table"]')
      .find('th')
      .contains('Nazwa Produktu')
      .click();
    cy.contains('AAA Testowy Produkt')
      .parent()
      .find('.mdi-delete')
      .click();
    cy.should('not.contain', 'AAA Testowy produkt');
  });
});