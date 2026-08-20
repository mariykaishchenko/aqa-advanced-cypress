class SignupForm {
  get modal() {
    return cy.contains(".modal-dialog", "Registration");
  }

  get nameInput() {
    return cy.get("#signupName");
  }

  get lastNameInput() {
    return cy.get("#signupLastName");
  }

  get emailInput() {
    return cy.get("#signupEmail");
  }

  get passwordInput() {
    return cy.get("#signupPassword");
  }

  get repeatPasswordInput() {
    return cy.get("#signupRepeatPassword");
  }

  get registerButton() {
    return cy.contains("button", "Register");
  }

  get closeButton() {
    return cy.get(".modal-dialog button.close");
  }

  enterName(name) {
    return this.nameInput.type(name);
  }

  enterLastName(lastName) {
    return this.lastNameInput.type(lastName);
  }

  enterEmail(email) {
    return this.emailInput.type(email);
  }

  enterPassword(password) {
    return this.passwordInput.type(password);
  }

  enterRepeatPassword(password) {
    return this.repeatPasswordInput.type(password);
  }

  fillForm({ name, lastName, email, password, repeatPassword = password }) {
    this.enterName(name);
    this.enterLastName(lastName);
    this.enterEmail(email);
    this.enterPassword(password);
    this.enterRepeatPassword(repeatPassword);
  }

  clickRegisterButton() {
    return this.registerButton.click();
  }

  isRegisterButtonDisabled() {
    return this.registerButton.should("be.disabled");
  }

  close() {
    return this.closeButton.click();
  }

  getValidationMessage(input, message) {
    return input.closest(".form-group").contains(".invalid-feedback", message);
  }
}

export default new SignupForm();
