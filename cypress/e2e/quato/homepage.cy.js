/// <reference types="cypress" />
import "cypress-xpath";

describe("Homepage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context("Header", () => {
    context("Logo", () => {
      it("visible", () => {
        cy.get(".header .header_logo").should("be.visible");
      });
    });

    context("Home button", () => {
      it("visible", () => {
        cy.get(".header .header-link").contains("Home").should("be.visible");
      });
    });

    context("About button", () => {
      it("visible", () => {
        cy.get(".header")
          .find(".header-link")
          .contains("About")
          .should("be.visible");
      });
    });

    context("Contacts button", () => {
      it("visible", () => {
        cy.xpath(
          "//*[contains(@class,'header')]//button[contains(text(), 'Contacts')]",
        ).should("be.visible");
      });
    });

    context("Guest log in button", () => {
      it("visible", () => {
        cy.get(".header .header_right")
          .children()
          .first()
          .should("have.text", "Guest log in");
      });
    });

    context("Sing in button", () => {
      it("visible", () => {
        cy.get(".header .header_right button")
          .last()
          .should("have.text", "Sign In");
      });
    });
  });

  context("Contacts section", () => {
    it("has facebook link", () => {
      cy.get("#contactsSection")
        .find(".contacts_socials")
        .find(".socials_icon.icon-facebook")
        .should("be.visible");
    });

    it("has telegram link", () => {
      cy.get("#contactsSection .contacts_socials a .icon-telegram").should(
        "be.visible",
      );
    });

    it("has youtube link", () => {
      cy.get("#contactsSection .contacts_socials a .icon-youtube").should(
        "be.visible",
      );
    });

    it("has instagram link", () => {
      cy.get("#contactsSection .contacts_socials a .icon-instagram").should(
        "be.visible",
      );
    });

    it("has linkedin link", () => {
      cy.get("#contactsSection .contacts_socials a .icon-linkedin").should(
        "be.visible",
      );
    });

    it("has website", () => {
      cy.get("#contactsSection a").contains("ithillel.ua").should("be.visible");
    });

    it("has support email", () => {
      cy.get("#contactsSection a")
        .contains("support@ithillel.ua")
        .should("be.visible");
    });
  });
});
