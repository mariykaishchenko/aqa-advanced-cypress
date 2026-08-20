import urls from "../../test-data/urls.json";

class FuelExpensesPage {
  get page() {
    return cy.contains(".panel-page", "Fuel expenses");
  }

  get heading() {
    return this.page.contains("h1", "Fuel expenses");
  }

  get addFuelExpenseButton() {
    return this.page.contains("button", "Add fuel expense");
  }

  get expensesTable() {
    return this.page.find(".expenses_table");
  }

  get expenseRows() {
    return this.expensesTable.find("tbody tr");
  }

  get editButtons() {
    return this.expensesTable.find(".btn-edit");
  }

  get deleteButtons() {
    return this.expensesTable.find(".btn-delete");
  }

  visit() {
    return cy.visit(urls.FUEL_EXPENSES_PAGE);
  }

  clickAddFuelExpenseButton() {
    return this.addFuelExpenseButton.click();
  }

  findExpense(value) {
    return this.expenseRows.contains("td", value).closest("tr");
  }

  clickEditExpense(index = 0) {
    return this.editButtons.eq(index).click();
  }

  clickDeleteExpense(index = 0) {
    return this.deleteButtons.eq(index).click();
  }
}

export default new FuelExpensesPage();
