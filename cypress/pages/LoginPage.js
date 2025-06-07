class LoginPage {
  visit() {
    cy.visit('https://www.saucedemo.com/');
  }

  fillUsername(username) {
    if (username && username.trim() !== '') {
      cy.get('#user-name').type(username);
    } else {
      throw new Error('O valor de username está vazio ou indefinido');
    }
  }

  fillPassword(password) {
    cy.get('#password').type(password);
  }

  clickLogin() {
    cy.get('#login-button').click();
  }

  submit() {
    cy.get('#login-button').click();
  }

  login(username, password) {
    if (username && username.trim() !== '') {
      this.fillUsername(username);
    }
    if (password && password.trim() !== '') {
      this.fillPassword(password);
    }
    this.submit();
  }

  validateLoginError(expectedMessage) {
    cy.get('[data-test="error"]').should('contain.text', expectedMessage);
  }
}

export default new LoginPage();
