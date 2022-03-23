import { CATEGORY_DETAILS } from "../../../elements/catalog/categories/category-details";
import { BUTTON_SELECTORS } from "../../../elements/shared/button-selectors";
import { SHARED_ELEMENTS } from "../../../elements/shared/sharedElements";

export function createCategory({ name, description }) {
  fillUpCategoryGeneralInfo({ name, description });
  return saveCategory();
}

export function updateCategory({ name, description }) {
  cy.log("before filling data");
  fillUpCategoryGeneralInfo({ name, description });
  return saveCategory("CategoryUpdate");
}

export function fillUpCategoryGeneralInfo({ name, description }) {
  return cy
    .log("1")
    .get(CATEGORY_DETAILS.descriptionInput)
    .find(SHARED_ELEMENTS.contentEditable)
    .should("be.visible")
    .log("4")
    .get(CATEGORY_DETAILS.descriptionInput)
    .click()
    .log("6")
    .get(CATEGORY_DETAILS.descriptionInput)
    .find(SHARED_ELEMENTS.contentEditable)
    .log("8")
    .get(CATEGORY_DETAILS.descriptionInput)
    .clearAndType(description)
    .log("10")
    .log(name)
    .get(CATEGORY_DETAILS.nameInput)
    .clearAndType(name);
}

export function saveCategory(alias = "CategoryCreate") {
  return cy
    .addAliasToGraphRequest(alias)
    .get(BUTTON_SELECTORS.confirm)
    .click()
    .waitForRequestAndCheckIfNoErrors(`@${alias}`);
}
