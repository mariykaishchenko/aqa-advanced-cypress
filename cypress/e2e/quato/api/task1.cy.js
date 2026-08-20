import AuthApi from "../../../api/AuthApi";
import CarsApi from "../../../api/CarsApi";

const carPayload = {
  carBrandId: 1,
  carModelId: 1,
  mileage: 100,
};

const expectCar = (car, expected = {}) => {
  expect(car).to.include.all.keys(
    "id",
    "carBrandId",
    "carModelId",
    "initialMileage",
    "updatedMileageAt",
    "mileage",
    "brand",
    "model",
    "logo",
  );
  expect(car.id).to.be.a("number").and.be.greaterThan(0);
  expect(car.carBrandId).to.be.a("number").and.be.greaterThan(0);
  expect(car.carModelId).to.be.a("number").and.be.greaterThan(0);
  expect(car.initialMileage).to.be.a("number");
  expect(car.updatedMileageAt).to.be.a("string");
  expect(car.mileage).to.be.a("number");
  expect(car.brand).to.be.a("string");
  expect(car.model).to.be.a("string");
  expect(car.logo).to.be.a("string");
  expect(car).to.include(expected);
};

describe("Cars API", () => {
  let sid;

  before(() => {
    cy.visit("");

    AuthApi.signIn(
      Cypress.env("MAIN_USER_EMAIL"),
      Cypress.env("MAIN_USER_PASSWORD"),
    ).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("status", "ok");

      cy.getCookie("sid").then((cookie) => {
        expect(cookie, "session cookie").to.exist;
        sid = cookie.value;

        CarsApi.deleteAllCars();
      });
    });
  });

  beforeEach(() => {
    cy.setCookie("sid", sid);
  });

  after(() => {
    cy.setCookie("sid", sid);
    CarsApi.deleteAllCars();
  });

  it("GET /cars returns the current user's cars as JSON", () => {
    CarsApi.getAll().then((response) => {
      expect(response.status).to.eq(200);
      expect(response.headers["content-type"]).to.include("application/json");
      expect(response.body).to.have.property("status", "ok");
      expect(response.body.data).to.be.an("array");
      response.body.data.forEach((car) => expectCar(car));
    });
  });

  it("GET /cars/:id returns a car as JSON", () => {
    CarsApi.create(carPayload).then(({ body }) => {
      const carId = body.data.id;

      CarsApi.getById(carId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers["content-type"]).to.include("application/json");
        expect(response.body).to.have.property("status", "ok");
        expectCar(response.body.data, { id: carId, ...carPayload });
      });

      CarsApi.delete(carId);
    });
  });

  it("POST /cars creates a car and returns it as JSON", () => {
    CarsApi.create(carPayload).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.headers["content-type"]).to.include("application/json");
      expect(response.body).to.have.property("status", "ok");
      expectCar(response.body.data, carPayload);

      CarsApi.delete(response.body.data.id);
    });
  });

  it("PUT /cars/:id updates a car and returns it as JSON", () => {
    CarsApi.create(carPayload).then(({ body }) => {
      const carId = body.data.id;
      const updatedPayload = { ...carPayload, mileage: 200 };

      CarsApi.update(carId, updatedPayload).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers["content-type"]).to.include("application/json");
        expect(response.body).to.have.property("status", "ok");
        expectCar(response.body.data, { id: carId, ...updatedPayload });
      });

      CarsApi.delete(carId);
    });
  });

  it("DELETE /cars/:id deletes a car and returns its ID as JSON", () => {
    CarsApi.create(carPayload).then(({ body }) => {
      const carId = body.data.id;

      CarsApi.delete(carId).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.headers["content-type"]).to.include("application/json");
        expect(response.body).to.deep.equal({
          status: "ok",
          data: { carId },
        });
      });
    });
  });
});
