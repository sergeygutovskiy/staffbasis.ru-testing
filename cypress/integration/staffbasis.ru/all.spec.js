/// <reference types="cypress" />

describe('Testing "Login" page', () => {
    it('can not login with empty password field', () => {
        cy.visit('http://staffbasis.ru/login');
        
        cy.get('button').click();
        cy.location('pathname').should('equal', '/login');
    });

    it('can not login with incorrect password field', () => {
        cy.visit('http://staffbasis.ru/login');
        
        cy.get('input').type('password');
        cy.get('button').click();
        cy.location('pathname').should('equal', '/login');
    });

    it('error shown when login failed', () => {
        cy.visit('http://staffbasis.ru/login');
        
        cy.get('button').click();
        cy.get('.alert-danger').should('exist');
    });

    it('redirect to admin with correct password', () => {
        cy.visit('http://staffbasis.ru/login');
        
        cy.get('input').type('****');
        cy.get('button').click();
        cy.location('pathname').should('equal', '/admin');
    });
});

describe('Testing "Admin" page', () => {
    it('can not visit page without login', () => {
        cy.visit('http://staffbasis.ru/admin');
        cy.location('pathname').should('equal', '/login');
    });

    it('phone field updating successfuly', () => {
        cy.visit('http://staffbasis.ru/login');
        
        cy.get('input').type('****');
        cy.get('button').click();
        
        cy.get('input').eq(0).clear().type('some phone');
        cy.get('button.btn-success').eq(0).click();

        cy.get('input').eq(0).should('have.value', 'some phone');
    });

    after(() => {
        cy.visit('http://staffbasis.ru/admin');
                
        cy.get('input').eq(0).clear().type('8 (911) 747-67-66');
        cy.get('button.btn-success').eq(0).click();
    });
});