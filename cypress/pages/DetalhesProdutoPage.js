class DetalhesProdutoPage {
  getTitle() {
    return cy.get(".inventory_details_name");
  }

  getPrice() {
    return cy.get(".inventory_details_price");
  }

  addToCar() {
    cy.get('button[data-test^="add-to-cart"]').click();
  }

  goToCar() {
    cy.get(".shopping_cart_link").click();
  }
}
export default new DetalhesProdutoPage();
