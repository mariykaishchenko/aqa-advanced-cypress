const apiUrl = "https://qauto.forstudy.space/api";

class CarsApi {
  getAll() {
    return cy.request(`${apiUrl}/cars`);
  }

  getById(carId) {
    return cy.request(`${apiUrl}/cars/${carId}`);
  }

  create(payload) {
    return cy.request("POST", `${apiUrl}/cars`, payload);
  }

  update(carId, payload) {
    return cy.request("PUT", `${apiUrl}/cars/${carId}`, payload);
  }

  delete(carId) {
    return cy.request("DELETE", `${apiUrl}/cars/${carId}`);
  }

  deleteAllCars() {
    return this.getAll().then(({ body }) => {
      body.data.forEach(({ id }) => this.delete(id));
    });
  }
}

export default new CarsApi();
