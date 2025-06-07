class CheckoutPage {
  fillCheckoutInfo(firstName, lastName, zipCode) {
    // Só digita se o valor NÃO for string vazia ou undefined
    if (firstName !== undefined && firstName !== '') {
      cy.get('[data-test="firstName"]').clear().type(firstName);
    }
    if (lastName !== undefined && lastName !== '') {
      cy.get('[data-test="lastName"]').type(lastName);
    }
    if (zipCode !== undefined && zipCode !== '') {
      cy.get('[data-test="postalCode"]').type(zipCode);
    }

    cy.get('[data-test="continue"]').click();
  }

  finishCheckout() {
    cy.url().then((url) => {
      if (url.includes('/checkout-step-two.html')) {
        cy.get('.summary_info').should('be.visible');
        cy.get('[data-test="finish"]').should('be.visible').click();
      } else {
        throw new Error(
          'Não é possível finalizar o pedido: usuário não está na etapa 2 do checkout'
        );
      }
    });
  }
}

export default new CheckoutPage();
