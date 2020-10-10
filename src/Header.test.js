import { setupTranslations } from "./modules/i18n";
import Header from "./Header";
import React from "react";
import { shallow } from "enzyme";

setupTranslations({
  common: {
    header: "Hello {{title}}",
  },
});

describe("<Header />", () => {
  it("should render", () => {
    const component = shallow(<Header title="test?" />);
    expect(component).toMatchSnapshot();
  });
});
