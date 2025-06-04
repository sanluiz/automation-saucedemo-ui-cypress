class CheckoutCompletePage {
  getSuccessMessage() {
    return cy.get(".complete-header");
  }
}
export default new CheckoutCompletePage();
