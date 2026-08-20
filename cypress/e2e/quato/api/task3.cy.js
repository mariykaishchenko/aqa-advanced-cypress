/// <reference types="cypress" />
import AuthApi from "../../../api/AuthApi";
import ProfilePage from "../../../pom/pages/ProfilePage";
import HomePage from "../../../pom/pages/HomePage";
import SignInForm from "../../../pom/forms/SignInForm";

describe("Profile page", () => {
  beforeEach(() => {
    HomePage.visit();
    HomePage.signInButton.click();
    SignInForm.signIn(
      Cypress.env("MAIN_USER_EMAIL"),
      Cypress.env("MAIN_USER_PASSWORD"),
    );
    cy.contains("body", "You have been successfully logged in").should(
      "be.visible",
    );
  });

  it("shows the intercepted profile name in the UI", () => {
    cy.intercept("GET", "**/api/users/profile", {
      statusCode: 200,
      body: {
        status: "ok",
        data: {
          userId: 1,
          photoFilename: "default-user.png",
          name: "Polar",
          lastName: "Bear",
        },
      },
    }).as("getProfile");

    ProfilePage.visit();

    cy.wait("@getProfile").its("response.statusCode").should("eq", 200);

    ProfilePage.heading.should("be.visible");
    ProfilePage.profileName
      .should("be.visible")
      .and("contain.text", "Polar Bear");
  });
});
