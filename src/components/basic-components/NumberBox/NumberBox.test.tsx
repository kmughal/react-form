import * as React from "react";

import render from "../../../../bin/render";
import BaseComponentProps from "../BaseComponent.Props";
import NumberBox from "./NumberBox";
import typings from "../../../../typings";

describe("NumberBox tests", () => {
  it("when title, id, name, placeholder & type must be number", () => {
    const props: BaseComponentProps = {
      id: "txt_age",
      name: "age",
      placeholder: "Enter your age",
      label: "Age :",
    };
    const { getById, typeElementText } = render(
      <NumberBox numberProps={props} />
    );

    const ageNumberBox = getById("txt_age");
    expect(ageNumberBox).mustHaveAnAttribute("name");
    expect(ageNumberBox).mustHaveAnAttribute("placeholder");
    expect(ageNumberBox).typeMustBe("number");
    typeElementText(ageNumberBox, 8);
    expect(ageNumberBox).valueMustBeEqual("8");
  });

  it("must have a label", () => {
    const props: BaseComponentProps = {
      id: "txt_age",
      name: "age",
      placeholder: "Enter your age",
      label: "Age :",
    };
    const { getByTagName } = render(<NumberBox numberProps={props} />);

    const label = getByTagName("label");
    expect(label).attributeValueMustBeSame("for", "age");
  });

  describe(" valid flag ", () => {
    it("when set to true then we are not expecting validation message", () => {
      const props: BaseComponentProps = {
        id: "txt_age",
        name: "age",
        placeholder: "Enter your age",
        label: "Age :",
        valid: true,
      };
      const { getByTagName } = render(<NumberBox numberProps={props} />);

      const validationParagraphMessage = getByTagName("p");
      expect(validationParagraphMessage).toBeNull();
    });

    it("when set to false then we are expecting validation message", () => {
      const props: BaseComponentProps = {
        id: "txt_age",
        name: "age",
        placeholder: "Enter your age",
        label: "Age :",
        valid: false,
        validationMessage: "Provided age is not valid",
      };
      const { getByTagName } = render(<NumberBox numberProps={props} />);

      const validationParagraphMessage = getByTagName("p");
      expect(validationParagraphMessage).not.toBeNull();
      expect(validationParagraphMessage).textContentEqual(
        "Provided age is not valid"
      );
    });
  });
});
