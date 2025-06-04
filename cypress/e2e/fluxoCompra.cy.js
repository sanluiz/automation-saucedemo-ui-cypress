/// <reference types="cypress" />

import LoginPage from '../pages/LoginPage';
import ProdutosPage from '../pages/ProdutosPage';
import DetalhesProdutoPage from '../pages/DetalhesProdutoPage';
import CarPage from '../pages/CarPage';
import CheckoutPage from '../pages/CheckoutPage';
import CheckoutCompletePage from '../pages/CheckoutCompletePage';

describe('Fluxo completo de compra na SauceDemo', () => {
  it('deve adicionar um produto no  carrinho e finalizar pedido com sucesso', () => {
    const produto = 'Sauce Labs Backpack';

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
    CheckoutCompletePage.getSuccessMessage().should('contain.text', 'Thank you for your order!');
  });
});
