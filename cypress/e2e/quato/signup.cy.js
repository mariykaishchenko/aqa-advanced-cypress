/// <reference types="cypress" />
import urls from "../../test-data/urls.json";
import colors from "../../test-data/colors.json";
import SignupForm from "../../pom/forms/SignupForm";
import HomePage from "../../pom/pages/HomePage";

describe("Sign up", () => {
  const VALID_NAME = "Cypress";
  const VALID_LAST_NAME = "Tester";
  const VALID_PASSWORD = "Password1!";
  const INVALID_BORDER_COLOR = colors.INVALID_BORDER_COLOR;
  const EXISTING_EMAIL = Cypress.env("MAIN_USER_EMAIL");
  let VALID_EMAIL; // initialized in beforeEach to ensure uniqueness for each test run

  const expectValidationMessage = (input, expectedMessage) => {
    SignupForm.getValidationMessage(input, expectedMessage).should(
      "be.visible",
    );
  };
  const expectFieldToBeValid = (input) => {
    input.should("not.have.class", "is-invalid");
    input.closest(".form-group").find(".invalid-feedback").should("not.exist");
  };

  beforeEach(() => {
    VALID_EMAIL = `mariyka.ishchenko+${Date.now()}@gmail.com`;
  });

  beforeEach(() => {
    HomePage.visit();
    HomePage.clickSignUpButton();
  });

  it("should be visible", () => {
    SignupForm.modal.should("be.visible");
  });

  it("hides the popup when the cross icon is clicked", () => {
    SignupForm.close();

    SignupForm.modal.should("not.be.visible");
  });

  it("registers a user with valid details and navigates to the garage", () => {
    SignupForm.fillForm({
      name: VALID_NAME,
      lastName: VALID_LAST_NAME,
      email: VALID_EMAIL,
      password: VALID_PASSWORD,
    });
    SignupForm.clickRegisterButton();

    cy.contains("Registration complete").should("be.visible");
    cy.url().should("include", urls.GARAGE_PAGE);
  });

  it("does not register a user with an existing email", () => {
    SignupForm.fillForm({
      name: VALID_NAME,
      lastName: VALID_LAST_NAME,
      email: EXISTING_EMAIL,
      password: VALID_PASSWORD,
    });
    SignupForm.clickRegisterButton();

    cy.contains("User already exists").should("be.visible");
  });

  context("Name field", () => {
    it("shows that Name is required", () => {
      SignupForm.nameInput.focus().blur();

      expectValidationMessage(SignupForm.nameInput, "Name is required");
    });

    it("validates a Name shorter than 2 characters", () => {
      SignupForm.enterName("A").blur();

      expectValidationMessage(
        SignupForm.nameInput,
        "Name has to be from 2 to 20 characters long",
      );
    });

    it("validates a Name longer than 20 characters", () => {
      SignupForm.enterName("A".repeat(21)).blur();

      expectValidationMessage(
        SignupForm.nameInput,
        "Name has to be from 2 to 20 characters long",
      );
    });

    it("validates a Name with non-English characters", () => {
      SignupForm.enterName("Іван").blur();

      expectValidationMessage(SignupForm.nameInput, "Name is invalid");
    });

    it("allows a Name with 2 characters", () => {
      SignupForm.enterName("Al").blur();

      expectFieldToBeValid(SignupForm.nameInput);
    });

    it("allows a Name with 20 characters", () => {
      SignupForm.enterName("A".repeat(20)).blur();

      expectFieldToBeValid(SignupForm.nameInput);
    });

    it("ignores all spaces in Name", () => {
      const nameWithSpaces = " Cy press ";

      SignupForm.enterName(nameWithSpaces).blur();

      SignupForm.nameInput.should(
        "have.value",
        nameWithSpaces.replaceAll(" ", ""),
      );
    });

    it("shows a red Name input when validation fails", () => {
      SignupForm.nameInput.focus().blur();

      SignupForm.nameInput.should(
        "have.css",
        "border-color",
        INVALID_BORDER_COLOR,
      );
    });

    it("disables Register when Name validation fails", () => {
      SignupForm.enterName("A").blur();
      SignupForm.enterLastName(VALID_LAST_NAME);
      SignupForm.enterEmail(VALID_EMAIL);
      SignupForm.enterPassword(VALID_PASSWORD);
      SignupForm.enterRepeatPassword(VALID_PASSWORD);

      SignupForm.isRegisterButtonDisabled();
    });
  });

  context("Last name field", () => {
    it("shows that Last name is required", () => {
      SignupForm.lastNameInput.focus().blur();

      expectValidationMessage(
        SignupForm.lastNameInput,
        "Last name is required",
      );
    });

    it("validates a Last name shorter than 2 characters", () => {
      SignupForm.enterLastName("A").blur();

      expectValidationMessage(
        SignupForm.lastNameInput,
        "Last name has to be from 2 to 20 characters long",
      );
    });

    it("validates a Last name longer than 20 characters", () => {
      SignupForm.enterLastName("A".repeat(21)).blur();

      expectValidationMessage(
        SignupForm.lastNameInput,
        "Last name has to be from 2 to 20 characters long",
      );
    });

    it("validates a Last name with non-English characters", () => {
      SignupForm.enterLastName("Іванов").blur();

      expectValidationMessage(SignupForm.lastNameInput, "Last name is invalid");
    });

    it("allows a Last name with 2 characters", () => {
      SignupForm.enterLastName("Li").blur();

      expectFieldToBeValid(SignupForm.lastNameInput);
    });

    it("allows a Last name with 20 characters", () => {
      SignupForm.enterLastName("A".repeat(20)).blur();

      expectFieldToBeValid(SignupForm.lastNameInput);
    });

    it("ignores all spaces in Last name", () => {
      const lastNameWithSpaces = " Tes ter ";

      SignupForm.enterLastName(lastNameWithSpaces).blur();

      SignupForm.lastNameInput.should(
        "have.value",
        lastNameWithSpaces.replaceAll(" ", ""),
      );
    });

    it("shows a red Last name input when validation fails", () => {
      SignupForm.lastNameInput.focus().blur();

      SignupForm.lastNameInput.should(
        "have.css",
        "border-color",
        INVALID_BORDER_COLOR,
      );
    });

    it("disables Register when Last name validation fails", () => {
      SignupForm.enterName(VALID_NAME);
      SignupForm.enterLastName("A").blur();
      SignupForm.enterEmail(VALID_EMAIL);
      SignupForm.enterPassword(VALID_PASSWORD);
      SignupForm.enterRepeatPassword(VALID_PASSWORD);

      SignupForm.isRegisterButtonDisabled();
    });
  });

  context("Email field", () => {
    it("shows that Email is required", () => {
      SignupForm.emailInput.focus().blur();

      expectValidationMessage(SignupForm.emailInput, "Email required");
    });

    it("validates an Email without an @ symbol", () => {
      SignupForm.enterEmail("cypress.example.com").blur();

      expectValidationMessage(SignupForm.emailInput, "Email is incorrect");
    });

    it("validates an Email without a domain", () => {
      SignupForm.enterEmail("cypress@").blur();

      expectValidationMessage(SignupForm.emailInput, "Email is incorrect");
    });

    it("validates an Email without a username", () => {
      SignupForm.enterEmail("@example.com").blur();

      expectValidationMessage(SignupForm.emailInput, "Email is incorrect");
    });

    it("validates an Email without a domain extension", () => {
      SignupForm.enterEmail("cypress@example").blur();

      expectValidationMessage(SignupForm.emailInput, "Email is incorrect");
    });

    it("shows a red Email input when validation fails", () => {
      SignupForm.emailInput.focus().blur();

      SignupForm.emailInput.should(
        "have.css",
        "border-color",
        INVALID_BORDER_COLOR,
      );
    });

    it("disables Register when Email validation fails", () => {
      SignupForm.enterName(VALID_NAME);
      SignupForm.enterLastName(VALID_LAST_NAME);
      SignupForm.enterEmail("cypress.example.com").blur();
      SignupForm.enterPassword(VALID_PASSWORD);
      SignupForm.enterRepeatPassword(VALID_PASSWORD);

      SignupForm.isRegisterButtonDisabled();
    });
  });

  context("Password field", () => {
    const PASSWORD_INVALID_MESSAGE =
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter";

    it("shows that Password is required", () => {
      SignupForm.passwordInput.focus().blur();

      expectValidationMessage(SignupForm.passwordInput, "Password required");
    });

    it("validates a Password shorter than 8 characters", () => {
      SignupForm.enterPassword("Pass12!").blur();

      expectValidationMessage(
        SignupForm.passwordInput,
        PASSWORD_INVALID_MESSAGE,
      );
    });

    it("validates a Password longer than 15 characters", () => {
      SignupForm.enterPassword("Password1234567!").blur();

      expectValidationMessage(
        SignupForm.passwordInput,
        PASSWORD_INVALID_MESSAGE,
      );
    });

    it("validates a Password without a number", () => {
      SignupForm.enterPassword("Password!").blur();

      expectValidationMessage(
        SignupForm.passwordInput,
        PASSWORD_INVALID_MESSAGE,
      );
    });

    it("validates a Password without an uppercase letter", () => {
      SignupForm.enterPassword("password1!").blur();

      expectValidationMessage(
        SignupForm.passwordInput,
        PASSWORD_INVALID_MESSAGE,
      );
    });

    it("validates a Password without a lowercase letter", () => {
      SignupForm.enterPassword("PASSWORD1!").blur();

      expectValidationMessage(
        SignupForm.passwordInput,
        PASSWORD_INVALID_MESSAGE,
      );
    });

    it("allows a Password with 8 characters", () => {
      SignupForm.enterPassword("Pass1!ab").blur();

      expectFieldToBeValid(SignupForm.passwordInput);
    });

    it("allows a Password with 15 characters", () => {
      SignupForm.enterPassword("Password12345!a").blur();

      expectFieldToBeValid(SignupForm.passwordInput);
    });

    it("shows a red Password input when validation fails", () => {
      SignupForm.passwordInput.focus().blur();

      SignupForm.passwordInput.should(
        "have.css",
        "border-color",
        INVALID_BORDER_COLOR,
      );
    });

    it("disables Register when Password validation fails", () => {
      SignupForm.enterName(VALID_NAME);
      SignupForm.enterLastName(VALID_LAST_NAME);
      SignupForm.enterEmail(VALID_EMAIL);
      SignupForm.enterPassword("password1!").blur();
      SignupForm.enterRepeatPassword("password1!");

      SignupForm.isRegisterButtonDisabled();
    });
  });

  context("Re-enter password field", () => {
    it("shows that Re-enter password is required", () => {
      SignupForm.repeatPasswordInput.focus().blur();

      expectValidationMessage(
        SignupForm.repeatPasswordInput,
        "Re-enter password required",
      );
    });

    it("validates that Re-enter password matches Password", () => {
      SignupForm.enterPassword(VALID_PASSWORD);
      SignupForm.enterRepeatPassword(`${VALID_PASSWORD}1`).blur();

      expectValidationMessage(
        SignupForm.repeatPasswordInput,
        "Passwords do not match",
      );
    });

    it("shows a red Re-enter password input when validation fails", () => {
      SignupForm.repeatPasswordInput.focus().blur();

      SignupForm.repeatPasswordInput.should(
        "have.css",
        "border-color",
        INVALID_BORDER_COLOR,
      );
    });

    it("disables Register when Re-enter password validation fails", () => {
      SignupForm.enterName(VALID_NAME);
      SignupForm.enterLastName(VALID_LAST_NAME);
      SignupForm.enterEmail(VALID_EMAIL);
      SignupForm.enterPassword(VALID_PASSWORD);
      SignupForm.enterRepeatPassword(`${VALID_PASSWORD}1`).blur();

      SignupForm.isRegisterButtonDisabled();
    });
  });
});
