class SignInForm {
  get modal() {
    return cy.contains(".modal-dialog", "Log in");
  }

  get emailInput() {
    return cy.get("#signinEmail");
  }

  get passwordInput() {
    return cy.get("#signinPassword");
  }

  get rememberMeCheckbox() {
    return cy.get("#remember");
  }

  get loginButton() {
    return cy.contains("button", "Login");
  }

  get closeButton() {
    return cy.get(".modal-dialog button.close");
  }

  enterEmail(email) {
    return this.emailInput.type(email);
  }

  enterPassword(password) {
    return this.passwordInput.type(password);
  }

  checkRememberMe() {
    return this.rememberMeCheckbox.check();
  }

  clickLoginButton() {
    return this.loginButton.click();
  }

  isLoginButtonDisabled() {
    return this.loginButton.should("be.disabled");
  }

  signIn(email, password) {
    this.enterEmail(email);
    this.enterPassword(password);
    return this.clickLoginButton();
  }
}

export default new SignInForm();
