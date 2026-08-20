/// <reference types="cypress" />
import AddCarForm from "../../pom/forms/AddCarForm";
import AddFuelForm from "../../pom/forms/AddFuelForm";
import SignInForm from "../../pom/forms/SignInForm";
import FuelExpensesPage from "../../pom/pages/FuelExpensesPage";
import GaragePage from "../../pom/pages/GaragePage";
import HomePage from "../../pom/pages/HomePage";
import urls from "../../test-data/urls.json";

describe("Add fuel expense popup", () => {
  const cars = [
    { brand: "Porsche", model: "Panamera", mileage: "100" },
    { brand: "Audi", model: "TT", mileage: "200" },
  ];
  const expense = { mileage: "250", liters: "20", totalCost: "50" };

  const login = () => {
    HomePage.visit();
    HomePage.signInButton.click();
    SignInForm.signIn(
      Cypress.env("MAIN_USER_EMAIL"),
      Cypress.env("MAIN_USER_PASSWORD"),
    );
    cy.url().should("include", urls.GARAGE_PAGE);
  };

  const openAddFuelExpensePopup = () => {
    GaragePage.clickAddFuelExpenseButton();
    AddFuelForm.modal.should("be.visible");
  };

  const expectValidationMessage = (input, message) => {
    AddFuelForm.getValidationMessage(input, message).should("be.visible");
  };

  before(() => {
    login();
    GaragePage.deleteAllCars();
    cars.forEach((car) => GaragePage.addCar(car));
  });

  beforeEach(() => {
    login();
    openAddFuelExpensePopup();
  });

  after(() => {
    GaragePage.visit();
    GaragePage.deleteAllCars();
  });

  it("shows the popup title", () => {
    AddFuelForm.modal
      .find(".modal-title")
      .should("have.text", "Add an expense");
  });

  describe("Vehicle field", () => {
    it("contains the added cars in the Vehicle select", () => {
      cars.forEach(({ brand, model }) => {
        AddFuelForm.carSelect
          .contains("option", `${brand} ${model}`)
          .should("exist");
      });
    });

    it("uses the selected car mileage by default", () => {
      const car = cars[1];

      AddFuelForm.selectCar(`${car.brand} ${car.model}`);

      AddFuelForm.mileageInput.should("have.value", car.mileage);
    });
  });

  describe("Report date field", () => {
    it("uses today as the default Report date", () => {
      const today = new Intl.DateTimeFormat("en-GB")
        .format(new Date())
        .replaceAll("/", ".");

      AddFuelForm.dateInput.should("have.value", today);
    });
  });

  describe("Mileage field", () => {
    it("validates that Mileage is required", () => {
      AddFuelForm.mileageInput.clear().blur();

      expectValidationMessage(AddFuelForm.mileageInput, "Mileage required");
    });

    it("shows an alert when the first expense mileage is not greater than the initial mileage", () => {
      const car = cars[0];

      AddFuelForm.fillForm({
        car: `${car.brand} ${car.model}`,
        mileage: car.mileage,
        liters: expense.liters,
        totalCost: expense.totalCost,
      });
      AddFuelForm.clickAddButton();

      AddFuelForm.alert
        .should("be.visible")
        .and(
          "have.text",
          `First expense mileage must not be less or equal to car initial mileage. Car initial mileage is ${car.mileage}`,
        );
    });
  });

  describe("Number of liters field", () => {
    it("validates that Number of liters is required", () => {
      AddFuelForm.litersInput.focus().blur();
      expectValidationMessage(AddFuelForm.litersInput, "Liters required");
    });

    it("validates Number of liters outside the allowed range", () => {
      AddFuelForm.enterLiters("0").blur();
      expectValidationMessage(
        AddFuelForm.litersInput,
        "Liters has to be from 0.01 to 9999",
      );

      AddFuelForm.enterLiters("10000").blur();
      expectValidationMessage(
        AddFuelForm.litersInput,
        "Liters has to be from 0.01 to 9999",
      );
    });
  });

  describe("Total cost field", () => {
    it("validates that Total cost ", () => {
      AddFuelForm.totalCostInput.focus().blur();
      expectValidationMessage(
        AddFuelForm.totalCostInput,
        "Total cost required",
      );
    });

    it("validates Total cost outside the allowed range", () => {
      AddFuelForm.enterTotalCost("0").blur();
      expectValidationMessage(
        AddFuelForm.totalCostInput,
        "Total cost has to be from 0.01 to 1000000",
      );

      AddFuelForm.enterTotalCost("1000001").blur();
      expectValidationMessage(
        AddFuelForm.totalCostInput,
        "Total cost has to be from 0.01 to 1000000",
      );
    });
  });

  describe("After adding an expense", () => {
    const car = cars[0];

    beforeEach(() => {
      AddFuelForm.selectCar(`${car.brand} ${car.model}`);
      AddFuelForm.fillForm(expense);
      AddFuelForm.clickAddButton();
    });

    afterEach(() => {
      GaragePage.visit();
      GaragePage.deleteCar(car.brand, car.model);
      GaragePage.addCar(car);
    });

    it("shows a success alert", () => {
      cy.contains(".alert-success", "Fuel expense added").should("be.visible");
    });

    it("navigates to the car expenses after adding an expense", () => {
      cy.location("pathname").should("eq", urls.FUEL_EXPENSES_PAGE);
      FuelExpensesPage.findExpense(expense.mileage).should("be.visible");
    });

    it("updates car mileage in Garage after adding an expense", () => {
      GaragePage.visit();
      GaragePage.verifyCarParameters({ ...car, mileage: expense.mileage });
    });
  });
});
