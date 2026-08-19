class DeleteConfirmationForm {
  get modal() {
    return cy.contains(".modal-dialog", "Do you really want to remove");
  }

  get confirmButton() {
    return this.modal.contains("button", "Remove");
  }

  clickConfirmButton() {
    return this.confirmButton.click();
  }
}

export default new DeleteConfirmationForm();
