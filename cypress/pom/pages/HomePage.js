import SignInForm from "../forms/SignInForm";
import urls from "../../test-data/urls.json";

class HomePage {
  get signInButton() {
    return cy.contains("button", "Sign In");
  }

  get signUpButton() {
    return cy.contains("button", "Sign up");
  }

  visit() {
    return cy.visit(urls.HOME_PAGE);
  }

  clickSignUpButton() {
    return this.signUpButton.click();
  }

  signIn(email, password) {
    this.signInButton.click();
    return SignInForm.signIn(email, password);
  }
}

export default new HomePage();
