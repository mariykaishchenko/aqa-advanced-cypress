class ProfilePage {
  get page() {
    return cy.contains(".panel-page", "Profile");
  }

  get heading() {
    return this.page.contains("h1", "Profile");
  }

  get editProfileButton() {
    return this.page.contains("button", "Edit profile");
  }

  get profilePhoto() {
    return this.page.find(".profile_photo");
  }

  get profileName() {
    return this.page.find(".profile_name");
  }

  visit() {
    return cy.visit("/panel/profile");
  }

  clickEditProfileButton() {
    return this.editProfileButton.click();
  }
}

export default new ProfilePage();
