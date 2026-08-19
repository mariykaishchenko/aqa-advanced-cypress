class CarEditForm {
  get modal() {
    return cy.contains(".modal-dialog", "Edit a car");
  }

  get brandSelect() {
    return this.modal.find("#addCarBrand");
  }

  get modelSelect() {
    return this.modal.find("#addCarModel");
  }

  get mileageInput() {
    return this.modal.find("#addCarMileage");
  }

  get creationDateInput() {
    return this.modal.find("#carCreationDate");
  }

  get datePickerToggle() {
    return this.modal.find("button.date-picker-toggle");
  }

  get saveButton() {
    return this.modal.contains("button", "Save");
  }

  get cancelButton() {
    return this.modal.contains("button", "Cancel");
  }

  get removeCarButton() {
    return this.modal.contains("button", "Remove car");
  }

  get closeButton() {
    return this.modal.find("button.close");
  }

  selectBrand(brand) {
    return this.brandSelect.select(brand);
  }

  selectModel(model) {
    return this.modelSelect.select(model);
  }

  enterMileage(mileage) {
    return this.mileageInput.clear().type(mileage);
  }

  enterCreationDate(date) {
    return this.creationDateInput.clear().type(date);
  }

  fillForm({ brand, model, mileage, creationDate }) {
    this.selectBrand(brand);
    this.selectModel(model);
    this.enterMileage(mileage);

    if (creationDate !== undefined) {
      return this.enterCreationDate(creationDate);
    }
  }

  clickDatePickerToggle() {
    return this.datePickerToggle.click();
  }

  clickSaveButton() {
    return this.saveButton.click();
  }

  clickCancelButton() {
    return this.cancelButton.click();
  }

  clickRemoveCarButton() {
    return this.removeCarButton.click();
  }

  isSaveButtonDisabled() {
    return this.saveButton.should("be.disabled");
  }

  close() {
    return this.closeButton.click();
  }

  getValidationMessage(input, message) {
    return input.closest(".form-group").contains(".invalid-feedback", message);
  }
}

export default new CarEditForm();
