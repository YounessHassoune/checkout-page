describe("Checkout Form Submission", () => {
  it("Should successfully submit the checkout form and verify success popup", () => {
    cy.visit(Cypress.env("baseUrl"));
    // Fill in the form
    cy.get('input[name="email"]').type("john@doe.com");
    cy.get('input[name="cardNumber"]').type("1234123412341234");
    cy.get('input[name="expirationDate"]').type("12/31");
    cy.get('input[name="cvc"]').type("1234");
    cy.get('input[name="name"]').type("john doe");
    cy.get('input[name="address"]').type("123 Main St, Cityville, USA");
    // submit the form
    cy.get("form").submit();
    // Check if submission succeeded by verifying the presence of a success popup
    cy.get("ol.fixed.bottom-0") // Select the ol element with specific classes
      .find(".text-sm.font-semibold") // Find the element containing the success message
      .should("have.text", "Your payment has been succeeded");
  });
});
