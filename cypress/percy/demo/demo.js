/// <reference types="cypress"/>
/// <reference types="../../support"/>

import demoMode from "../../fixtures/urlList";

describe("Demo", () => {
  it.only("should visual check main demo page", () => {
    //   { tags: ["@login", "@allEnv", "@stable", "@oldRelease"] },
    cy.visit(demoMode);
    cy.percySnapshot("Demo main page");
  });
});
