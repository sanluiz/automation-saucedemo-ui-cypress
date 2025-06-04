class CheckoutPage {
  fillCheckoutInfo(firstName, lastName, zipCode) {
    cy.get('[data-test="firstName"]').type(firstName);
    cy.get('[data-test="lastName"]').type(lastName);
    cy.get('[data-test="postalCode"]').type(zipCode);
    cy.get('[data-test="continue"]').click();
  }

  finishCheckout() {
    cy.get('[data-test="finish"]').click();
  }
}
export default new CheckoutPage();
