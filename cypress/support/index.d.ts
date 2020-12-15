/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Login via API
     */
    postUserLogin(): Chainable<any>  
  }
}