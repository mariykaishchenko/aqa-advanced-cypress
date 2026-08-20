/// <reference types="cypress" />
import AddCarForm from "../../pom/forms/AddCarForm";
import SignInForm from "../../pom/forms/SignInForm";
import GaragePage from "../../pom/pages/GaragePage";
import HomePage from "../../pom/pages/HomePage";

describe("Add car popup", () => {
  const brand = "Porsche";
  const model = "Panamera";

  const openAddCarPopup = () => {
    GaragePage.clickAddCarButton();
    AddCarForm.modal.should("be.visible");
  };

  const expectMileageError = (mileage, message) => {
    AddCarForm.enterMileage(mileage).blur();
    AddCarForm.getValidationMessage(AddCarForm.mileageInput, message).should(
      "be.visible",
    );
  };

  const removeCreatedCar = () => {
    GaragePage.deleteCar(brand, model);
    GaragePage.findCar(brand, model).should("not.exist");
  };

  beforeEach(() => {
    HomePage.visit();
    HomePage.signInButton.click();
    SignInForm.signIn(
      Cypress.env("MAIN_USER_EMAIL"),
      Cypress.env("MAIN_USER_PASSWORD"),
    );
    openAddCarPopup();
  });

  it("shows the popup title", () => {
    AddCarForm.modal.find(".modal-title").should("have.text", "Add a car");
  });

  it("closes the popup with the Cancel button", () => {
    AddCarForm.clickCancelButton();

    AddCarForm.modal.should("not.exist");
  });

  it("closes the popup with the close icon", () => {
    AddCarForm.close();

    AddCarForm.modal.should("not.exist");
  });

  it("contains Brand and Model selects", () => {
    AddCarForm.brandSelect.should("be.visible");
    AddCarForm.modelSelect.should("be.visible");
  });

  describe("Milage field", () => {
    it("validates that mileage is required", () => {
      AddCarForm.mileageInput.focus().blur();

      AddCarForm.mileageInput.should("have.class", "is-invalid");
      AddCarForm.mileageInput
        .closest(".form-group")
        .contains(".invalid-feedback", "Mileage cost required")
        .should("be.visible");
    });

    it("validates mileage outside the allowed range", () => {
      expectMileageError("-1", "Mileage has to be from 0 to 999999");
      expectMileageError("10000000", "Mileage has to be from 0 to 999999");
    });
  });

  it("creates a car", () => {
    const mileage = "100";

    AddCarForm.fillForm({ brand, model, mileage });
    AddCarForm.clickAddButton();

    AddCarForm.modal.should("not.exist");
    GaragePage.verifyCarParameters({ brand, model, mileage });

    removeCreatedCar();
  });
});
