class ProdutosPage {
  selectProduct(productName) {
    cy.contains('.inventory_item_name', productName).click();
  }
}
export default new ProdutosPage();
