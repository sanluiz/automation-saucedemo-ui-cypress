/// <reference types="cypress" />

import LoginPage from '../pages/LoginPage';
import ProdutosPage from '../pages/ProdutosPage';
import DetalhesProdutoPage from '../pages/DetalhesProdutoPage';
import CarPage from '../pages/CarPage';
import CheckoutPage from '../pages/CheckoutPage';
import CheckoutCompletePage from '../pages/CheckoutCompletePage';

describe('Fluxo completo de compra na SauceDemo', () => {
  const produto = 'Sauce Labs Backpack';

  it('Deve selecionar produto ao carrinho e finalizar a compra', () => {
    // 1. Login
    LoginPage.visit();
    LoginPage.login('standard_user', 'secret_sauce');

    // 2. Selecionar Produto
    ProdutosPage.selectProduct(produto);

    // 3. Validação
    DetalhesProdutoPage.getTitle().should('contain.text', produto);
    DetalhesProdutoPage.getPrice().should('contain.text', '$29.99');

    // 4. Carrinho e Checkout
    DetalhesProdutoPage.addToCar();
    DetalhesProdutoPage.goToCar();
    CarPage.checkout();

    // 5. Finalizar pedido
    CheckoutPage.fillCheckoutInfo('João', 'Silva', '12345');
    CheckoutPage.finishCheckout();

    // Validação final
    CheckoutCompletePage.getSuccessMessage().should(
      'contain.text',
      'Thank you for your order!'
    );
  });

  it('Deve exibir erro ao tentar login com credenciais inválidas', () => {
    LoginPage.visit();
    LoginPage.login('usuario_invalido', 'senha_errada');
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and(
        'contain.text',
        'Epic sadface: Username and password do not match any user in this service'
      );
  });

  it('Deve exibir erro ao tentar prosseguir no checkout sem dados obrigatórios', () => {
    // Login válido
    LoginPage.visit();
    LoginPage.login('standard_user', 'secret_sauce');

    // Seleciona produto e vai para carrinho
    ProdutosPage.selectProduct(produto);
    DetalhesProdutoPage.addToCar();
    DetalhesProdutoPage.goToCar();
    CarPage.checkout();

    // Tenta avançar sem preencher campos no checkout
    CheckoutPage.fillCheckoutInfo('', '', '');
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain.text', 'Error: First Name is required');
  });

  it('Não deve permitir concluir o pedido sem preencher todos os campos obrigatórios (capturando erro)', () => {
    // Login válido
    LoginPage.visit();
    LoginPage.login('standard_user', 'secret_sauce');

    // Seleciona produto e vai para carrinho
    ProdutosPage.selectProduct(produto);
    DetalhesProdutoPage.addToCar();
    DetalhesProdutoPage.goToCar();
    CarPage.checkout();

    // Preenche dados parcialmente (sem código postal)
    cy.get('[data-test="firstName"]').type('João');
    cy.get('[data-test="lastName"]').type('Silva');
    cy.get('[data-test="postalCode"]').clear();

    // Tenta continuar (botão Continue)
    cy.get('[data-test="continue"]').click();

    // Tenta finalizar e espera o erro do método finishCheckout
    cy.on('fail', (error) => {
      expect(error.message).to.include('Não é possível finalizar o pedido');
      return false; // previne que o teste falhe por causa desse erro (opcional)
    });

    CheckoutPage.finishCheckout();
  });
});
