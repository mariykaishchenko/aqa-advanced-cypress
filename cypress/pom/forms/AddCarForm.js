class AddCarForm {
  get modal() {
    return cy.contains(".modal-dialog", "Add a car");
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

  get addButton() {
    return this.modal.contains("button", "Add");
  }

  get cancelButton() {
    return this.modal.contains("button", "Cancel");
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

  fillForm({ brand, model, mileage }) {
    this.selectBrand(brand);
    this.selectModel(model);
    return this.enterMileage(mileage);
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

export default new AddCarForm();
