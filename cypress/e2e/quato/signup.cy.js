/// <reference types="cypress" />

describe("Sign up", () => {
  const VALID_NAME = "Cypress";
  const VALID_LAST_NAME = "Tester";
  const VALID_PASSWORD = "Password1!";
  const INVALID_BORDER_COLOR = "rgb(220, 53, 69)";
  const EXISTING_EMAIL = "mariyka.ishchenko@gmail.com";
  const REGISTER_BUTTON_TEXT = "Register";
  let VALID_EMAIL; // initialized in beforeEach to ensure uniqueness for each test run

  const NAME_INPUT = "#signupName";
  const LAST_NAME_INPUT = "#signupLastName";
  const EMAIL_INPUT = "#signupEmail";
  const PASSWORD_INPUT = "#signupPassword";
  const REPEAT_PASSWORD_INPUT = "#signupRepeatPassword";

  const expectValidationMessage = (inputSelector, expectedMessage) => {
    cy.get(inputSelector)
      .closest(".form-group")
      .contains(".invalid-feedback", expectedMessage)
      .should("be.visible");
  };
  const expectFieldToBeValid = (inputSelector) => {
    cy.get(inputSelector).should("not.have.class", "is-invalid");
    cy.get(inputSelector)
      .closest(".form-group")
      .find(".invalid-feedback")
      .should("not.exist");
  };

  beforeEach(() => {
    VALID_EMAIL = `mariyka.ishchenko+${Date.now()}@gmail.com`;
  });

  beforeEach(() => {
    cy.visit("/");
    cy.contains("button", "Sign up").click();
  });

  it("should be visible", () => {
    cy.contains(".modal-dialog", "Registration").should("be.visible");
  });

  it("hides the popup when the cross icon is clicked", () => {
    cy.get(".modal-dialog button.close").click();

    cy.contains(".modal-dialog", "Registration").should("not.be.visible");
  });

  it("registers a user with valid details and navigates to the garage", () => {
    cy.get(NAME_INPUT).type(VALID_NAME);
    cy.get(LAST_NAME_INPUT).type(VALID_LAST_NAME);
    cy.get(EMAIL_INPUT).type(VALID_EMAIL);
    cy.get(PASSWORD_INPUT).type(VALID_PASSWORD);
    cy.get(REPEAT_PASSWORD_INPUT).type(VALID_PASSWORD);

    cy.contains("button", REGISTER_BUTTON_TEXT).click();

    cy.contains("Registration complete").should("be.visible");
    cy.url().should("include", "/panel/garage");
  });

  it("does not register a user with an existing email", () => {
    cy.get(NAME_INPUT).type(VALID_NAME);
    cy.get(LAST_NAME_INPUT).type(VALID_LAST_NAME);
    cy.get(EMAIL_INPUT).type(EXISTING_EMAIL);
    cy.get(PASSWORD_INPUT).type(VALID_PASSWORD);
    cy.get(REPEAT_PASSWORD_INPUT).type(VALID_PASSWORD);
    cy.contains("button", REGISTER_BUTTON_TEXT).click();

    cy.contains("User already exists").should("be.visible");
  });

  context("Name field", () => {
    it("shows that Name is required", () => {
      cy.get(NAME_INPUT).focus().blur();

      expectValidationMessage(NAME_INPUT, "Name is required");
    });

    it("validates a Name shorter than 2 characters", () => {
      cy.get(NAME_INPUT).type("A").blur();

      expectValidationMessage(
        NAME_INPUT,
        "Name has to be from 2 to 20 characters long",
      );
    });

    it("validates a Name longer than 20 characters", () => {
      cy.get(NAME_INPUT).type("A".repeat(21)).blur();

      expectValidationMessage(
        NAME_INPUT,
        "Name has to be from 2 to 20 characters long",
      );
    });

    it("validates a Name with non-English characters", () => {
      cy.get(NAME_INPUT).type("Іван").blur();

      expectValidationMessage(NAME_INPUT, "Name is invalid");
    });

    it("allows a Name with 2 characters", () => {
      cy.get(NAME_INPUT).type("Al").blur();

      expectFieldToBeValid(NAME_INPUT);
    });

    it("allows a Name with 20 characters", () => {
      cy.get(NAME_INPUT).type("A".repeat(20)).blur();

      expectFieldToBeValid(NAME_INPUT);
    });

    it("ignores all spaces in Name", () => {
      const nameWithSpaces = " Cy press ";

      cy.get(NAME_INPUT).type(nameWithSpaces).blur();

      cy.get(NAME_INPUT).should(
        "have.value",
        nameWithSpaces.replaceAll(" ", ""),
      );
    });

    it("shows a red Name input when validation fails", () => {
      cy.get(NAME_INPUT).focus().blur();

      cy.get(NAME_INPUT).should(
        "have.css",
        "border-color",
        INVALID_BORDER_COLOR,
      );
    });

    it("disables Register when Name validation fails", () => {
      cy.get(NAME_INPUT).type("A").blur();
      cy.get(LAST_NAME_INPUT).type(VALID_LAST_NAME);
      cy.get(EMAIL_INPUT).type(VALID_EMAIL);
      cy.get(PASSWORD_INPUT).type(VALID_PASSWORD);
      cy.get(REPEAT_PASSWORD_INPUT).type(VALID_PASSWORD);

      cy.contains("button", REGISTER_BUTTON_TEXT).should("be.disabled");
    });
  });

  context("Last name field", () => {
    it("shows that Last name is required", () => {
      cy.get(LAST_NAME_INPUT).focus().blur();

      expectValidationMessage(LAST_NAME_INPUT, "Last name is required");
    });

    it("validates a Last name shorter than 2 characters", () => {
      cy.get(LAST_NAME_INPUT).type("A").blur();

      expectValidationMessage(
        LAST_NAME_INPUT,
        "Last name has to be from 2 to 20 characters long",
      );
    });

    it("validates a Last name longer than 20 characters", () => {
      cy.get(LAST_NAME_INPUT).type("A".repeat(21)).blur();

      expectValidationMessage(
        LAST_NAME_INPUT,
        "Last name has to be from 2 to 20 characters long",
      );
    });

    it("validates a Last name with non-English characters", () => {
      cy.get(LAST_NAME_INPUT).type("Іванов").blur();

      expectValidationMessage(LAST_NAME_INPUT, "Last name is invalid");
    });

    it("allows a Last name with 2 characters", () => {
      cy.get(LAST_NAME_INPUT).type("Li").blur();

      expectFieldToBeValid(LAST_NAME_INPUT);
    });

    it("allows a Last name with 20 characters", () => {
      cy.get(LAST_NAME_INPUT).type("A".repeat(20)).blur();

      expectFieldToBeValid(LAST_NAME_INPUT);
    });

    it("ignores all spaces in Last name", () => {
      const lastNameWithSpaces = " Tes ter ";

      cy.get(LAST_NAME_INPUT).type(lastNameWithSpaces).blur();

      cy.get(LAST_NAME_INPUT).should(
        "have.value",
        lastNameWithSpaces.replaceAll(" ", ""),
      );
    });

    it("shows a red Last name input when validation fails", () => {
      cy.get(LAST_NAME_INPUT).focus().blur();

      cy.get(LAST_NAME_INPUT).should(
        "have.css",
        "border-color",
        INVALID_BORDER_COLOR,
      );
    });

    it("disables Register when Last name validation fails", () => {
      cy.get(NAME_INPUT).type(VALID_NAME);
      cy.get(LAST_NAME_INPUT).type("A").blur();
      cy.get(EMAIL_INPUT).type(VALID_EMAIL);
      cy.get(PASSWORD_INPUT).type(VALID_PASSWORD);
      cy.get(REPEAT_PASSWORD_INPUT).type(VALID_PASSWORD);

      cy.contains("button", REGISTER_BUTTON_TEXT).should("be.disabled");
    });
  });

  context("Email field", () => {
    it("shows that Email is required", () => {
      cy.get(EMAIL_INPUT).focus().blur();

      expectValidationMessage(EMAIL_INPUT, "Email is required");
    });

    it("validates an Email without an @ symbol", () => {
      cy.get(EMAIL_INPUT).type("cypress.example.com").blur();

      expectValidationMessage(EMAIL_INPUT, "Email is incorrect");
    });

    it("validates an Email without a domain", () => {
      cy.get(EMAIL_INPUT).type("cypress@").blur();

      expectValidationMessage(EMAIL_INPUT, "Email is incorrect");
    });

    it("validates an Email without a username", () => {
      cy.get(EMAIL_INPUT).type("@example.com").blur();

      expectValidationMessage(EMAIL_INPUT, "Email is incorrect");
    });

    it("validates an Email without a domain extension", () => {
      cy.get(EMAIL_INPUT).type("cypress@example").blur();

      expectValidationMessage(EMAIL_INPUT, "Email is incorrect");
    });

    it("shows a red Email input when validation fails", () => {
      cy.get(EMAIL_INPUT).focus().blur();

      cy.get(EMAIL_INPUT).should(
        "have.css",
        "border-color",
        INVALID_BORDER_COLOR,
      );
    });

    it("disables Register when Email validation fails", () => {
      cy.get(NAME_INPUT).type(VALID_NAME);
      cy.get(LAST_NAME_INPUT).type(VALID_LAST_NAME);
      cy.get(EMAIL_INPUT).type("cypress.example.com").blur();
      cy.get(PASSWORD_INPUT).type(VALID_PASSWORD);
      cy.get(REPEAT_PASSWORD_INPUT).type(VALID_PASSWORD);

      cy.contains("button", REGISTER_BUTTON_TEXT).should("be.disabled");
    });
  });

  context("Password field", () => {
    const PASSWORD_INVALID_MESSAGE =
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter";

    it("shows that Password is required", () => {
      cy.get(PASSWORD_INPUT).focus().blur();

      expectValidationMessage(PASSWORD_INPUT, "Password required");
    });

    it("validates a Password shorter than 8 characters", () => {
      cy.get(PASSWORD_INPUT).type("Pass12!").blur();

      expectValidationMessage(PASSWORD_INPUT, PASSWORD_INVALID_MESSAGE);
    });

    it("validates a Password longer than 15 characters", () => {
      cy.get(PASSWORD_INPUT).type("Password1234567!").blur();

      expectValidationMessage(PASSWORD_INPUT, PASSWORD_INVALID_MESSAGE);
    });

    it("validates a Password without a number", () => {
      cy.get(PASSWORD_INPUT).type("Password!").blur();

      expectValidationMessage(PASSWORD_INPUT, PASSWORD_INVALID_MESSAGE);
    });

    it("validates a Password without an uppercase letter", () => {
      cy.get(PASSWORD_INPUT).type("password1!").blur();

      expectValidationMessage(PASSWORD_INPUT, PASSWORD_INVALID_MESSAGE);
    });

    it("validates a Password without a lowercase letter", () => {
      cy.get(PASSWORD_INPUT).type("PASSWORD1!").blur();

      expectValidationMessage(PASSWORD_INPUT, PASSWORD_INVALID_MESSAGE);
    });

    it("allows a Password with 8 characters", () => {
      cy.get(PASSWORD_INPUT).type("Pass1!ab").blur();

      expectFieldToBeValid(PASSWORD_INPUT);
    });

    it("allows a Password with 15 characters", () => {
      cy.get(PASSWORD_INPUT).type("Password12345!a").blur();

      expectFieldToBeValid(PASSWORD_INPUT);
    });

    it("shows a red Password input when validation fails", () => {
      cy.get(PASSWORD_INPUT).focus().blur();

      cy.get(PASSWORD_INPUT).should(
        "have.css",
        "border-color",
        INVALID_BORDER_COLOR,
      );
    });

    it("disables Register when Password validation fails", () => {
      cy.get(NAME_INPUT).type(VALID_NAME);
      cy.get(LAST_NAME_INPUT).type(VALID_LAST_NAME);
      cy.get(EMAIL_INPUT).type(VALID_EMAIL);
      cy.get(PASSWORD_INPUT).type("password1!").blur();
      cy.get(REPEAT_PASSWORD_INPUT).type("password1!");

      cy.contains("button", REGISTER_BUTTON_TEXT).should("be.disabled");
    });
  });

  context("Re-enter password field", () => {
    it("shows that Re-enter password is required", () => {
      cy.get(REPEAT_PASSWORD_INPUT).focus().blur();

      expectValidationMessage(
        REPEAT_PASSWORD_INPUT,
        "Re-enter password required",
      );
    });

    it("validates that Re-enter password matches Password", () => {
      cy.get(PASSWORD_INPUT).type(VALID_PASSWORD);
      cy.get(REPEAT_PASSWORD_INPUT).type(`${VALID_PASSWORD}1`).blur();

      expectValidationMessage(REPEAT_PASSWORD_INPUT, "Passwords do not match");
    });

    it("shows a red Re-enter password input when validation fails", () => {
      cy.get(REPEAT_PASSWORD_INPUT).focus().blur();

      cy.get(REPEAT_PASSWORD_INPUT).should(
        "have.css",
        "border-color",
        INVALID_BORDER_COLOR,
      );
    });

    it("disables Register when Re-enter password validation fails", () => {
      cy.get(NAME_INPUT).type(VALID_NAME);
      cy.get(LAST_NAME_INPUT).type(VALID_LAST_NAME);
      cy.get(EMAIL_INPUT).type(VALID_EMAIL);
      cy.get(PASSWORD_INPUT).type(VALID_PASSWORD);
      cy.get(REPEAT_PASSWORD_INPUT).type(`${VALID_PASSWORD}1`).blur();

      cy.contains("button", REGISTER_BUTTON_TEXT).should("be.disabled");
    });
  });
});
