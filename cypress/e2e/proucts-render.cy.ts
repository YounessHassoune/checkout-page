// productRendering.spec.js

describe("Products Rendering Test", () => {
  it("Fetches and Renders Products", () => {
    cy.visit(Cypress.env("baseUrl"));
    //it's better to use a better selector
    // here im testing if the page renders at least 2 products because that's what i have in the app
    cy.get(".flex.py-6").should("have.length.gte", 2);
  });
});
