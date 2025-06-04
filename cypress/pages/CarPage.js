class CarPage {
  checkout() {
    cy.get('[data-test="checkout"]').click();
  }
}
export default new CarPage();
