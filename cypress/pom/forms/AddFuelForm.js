class AddFuelForm {
  get modal() {
    return cy.contains(".modal-dialog", "Add an expense");
  }

  get carSelect() {
    return this.modal.find("#addExpenseCar");
  }

  get dateInput() {
    return this.modal.find("#addExpenseDate");
  }

  get mileageInput() {
    return this.modal.find("#addExpenseMileage");
  }

  get litersInput() {
    return this.modal.find("#addExpenseLiters");
  }

  get totalCostInput() {
    return this.modal.find("#addExpenseTotalCost");
  }

  get datePickerToggle() {
    return this.modal.find("button.date-picker-toggle");
  }

  get addButton() {
    return this.modal.contains("button", "Add");
  }

  get cancelButton() {
    return this.modal.contains("button", "Cancel");
  }

  get closeButton() {
    return this.modal.find("button.close");
  }

  get alert() {
    return this.modal.find(".alert");
  }

  selectCar(car) {
    return this.carSelect.select(car);
  }

  enterDate(date) {
    return this.dateInput.clear().type(date);
  }

  enterMileage(mileage) {
    return this.mileageInput.clear().type(mileage);
  }

  enterLiters(liters) {
    return this.litersInput.clear().type(liters);
  }

  enterTotalCost(totalCost) {
    return this.totalCostInput.clear().type(totalCost);
  }

  fillForm({ car, date, mileage, liters, totalCost }) {
    if (car !== undefined) {
      this.selectCar(car);
    }

    if (date !== undefined) {
      this.enterDate(date);
    }

    this.enterMileage(mileage);
    this.enterLiters(liters);
    return this.enterTotalCost(totalCost);
  }

  clickDatePickerToggle() {
    return this.datePickerToggle.click();
  }

  clickAddButton() {
    return this.addButton.click();
  }

  clickCancelButton() {
    return this.cancelButton.click();
  }

  isAddButtonDisabled() {
    return this.addButton.should("be.disabled");
  }

  close() {
    return this.closeButton.click();
  }

  getValidationMessage(input, message) {
    return input.closest(".form-group").contains(".invalid-feedback", message);
  }
}

export default new AddFuelForm();
