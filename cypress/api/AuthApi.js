const apiUrl = "https://qauto.forstudy.space/api";

class AuthApi {
  signIn(email, password) {
    return cy.request("POST", `${apiUrl}/auth/signin`, {
      email,
      password,
      rememberMe: false,
    });
  }
}

export default new AuthApi();
