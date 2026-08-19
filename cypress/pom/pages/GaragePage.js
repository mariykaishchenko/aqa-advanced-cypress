import CarEditForm from "../forms/CarEditForm";
import DeleteConfirmationForm from "../forms/DeleteConfirmationForm";
import AddCarForm from "../forms/AddCarForm";
import urls from "../../test-data/urls.json";

class GaragePage {
  get addCarButton() {
    return cy.contains("button", "Add car");
  }

  get addFuelExpenseButton() {
    return cy.contains("button", "Add fuel expense");
  }

  get carEditButton() {
    return cy.get(".car_edit");
  }

  visit() {
    cy.visit(urls.GARAGE_PAGE);
  }

  findCar(brand, model) {
    return cy.contains(".car-item", `${brand} ${model}`);
  }

  findCarName(brand, model) {
    return this.findCar(brand, model).find(".car_name");
  }

  findCarMileageInput(brand, model) {
    return this.findCar(brand, model).find(".update-mileage-form_input");
  }

  clickAddCarButton() {
    return this.addCarButton.click();
  }

  clickAddFuelExpenseButton() {
    return this.addFuelExpenseButton.click();
  }

  clickCarEditButton(index = 0) {
    return this.carEditButton.eq(index).click();
  }

  verifyCarParameters({ brand, model, mileage }) {
    this.findCarName(brand, model).should("have.text", `${brand} ${model}`);
    return this.findCarMileageInput(brand, model).should("have.value", mileage);
  }

  deleteCar(brand, model) {
    const car = this.findCar(brand, model);

    car.find(".car_edit").click();
    CarEditForm.clickRemoveCarButton();
    return DeleteConfirmationForm.clickConfirmButton();
  }

  deleteAllCars() {
    const removeCars = () => {
      cy.wait(500); // Wait for the page to update after deleting a car
      cy.get("body").then(($body) => {
        if ($body.find(".car-item").length === 0) {
          return;
        }

        cy.get(".car-item")
          .first()
          .within(() => {
            cy.get(".car_edit").click();
          });

        CarEditForm.clickRemoveCarButton();
        DeleteConfirmationForm.clickConfirmButton();

        removeCars();
      });
    };

    removeCars();
  }

  addCar(car) {
    this.clickAddCarButton();
    AddCarForm.fillForm(car);
    AddCarForm.clickAddButton();
  }
}

export default new GaragePage();
