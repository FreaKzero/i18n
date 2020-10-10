import useTranslation, { setupTranslations } from "./i18n";

import React from "react";
import { shallow } from "enzyme";

setupTranslations({
  multi: "There are {{count}} {{animal}}",
  nonamespace: "This is a message without namespace",
  mynamespace: {
    test: "This is a {{test}}",
  },
  multimix: {
    mm: "There is {{b}} {{a}}",

    mm_plural: "There are {{b}} {{a}}",
  },
  plmix: {
    doing: "There is {{count}} cats {{doing}} (default)",
    doing_zero: "There are {{count}} cats {{doing}} (zero)",
    doing_one: "There is {{count}} cat {{doing}} (one)",
    doing_plural: "There are {{count}} cats {{doing}} (plural)",
  },
  plall: {
    cat: "There is {{count}} cat (default)",
    cat_zero: "There are {{count}} cats (zero)",
    cat_one: "There is {{count}} cat (one)",
    cat_plural: "There are {{count}} cats (plural)",
  },
  pldefzero: {
    dog: "There is {{count}} dog (default)",
    dog_plural: "There are {{count}} dogs (plural)",
  },
  plundefined: {
    dog_plural: "There are {{count}} dogs",
  },
  plzeroone: {
    cat: "There are {{count}} cats (default)",
    cat_zero: "There should be {{count}} cats (zero)",
    cat_one: "There should be {{count}} cat (one)",
  },
});

describe("useTranslation Hook", () => {
  const Test = ({ message, replace, namespace }) => {
    const { t } = useTranslation(namespace);
    return <h1>{t(message || "test", replace)}</h1>;
  };

  const Multitest = () => {
    const { t } = useTranslation();
    return <h1>{t("multi", { count: 3, animal: "cats" })}</h1>;
  };

  const PluralTest = ({ namespace, message }) => {
    const { t } = useTranslation(namespace);
    return (
      <ul>
        {[0, 1, 2, 5].map((count) => (
          <li key={`item_${count}`}>{t(message, { count })}</li>
        ))}
      </ul>
    );
  };

  const MixPluralTest = ({ namespace, message }) => {
    const { t } = useTranslation(namespace);
    return (
      <ul>
        {[0, 1, 2, 5].map((count) => (
          <li key={`item_${count}`}>
            {t(message, { count, doing: "jumping" })}
          </li>
        ))}
      </ul>
    );
  };

  const PluralMultiMix = ({ namespace, message }) => {
    const { t } = useTranslation(namespace);
    return (
      <ul>
        {[0, 1, 2, 5].map((count) => (
          <li key={`item_${count}`}>{t(message, { a: "cats", b: count })}</li>
        ))}
      </ul>
    );
  };

  it("replacement order", () => {
    const component = shallow(
      <PluralMultiMix namespace="multimix" message="mm" />
    );
    expect(component).toMatchSnapshot();
  });

  it("plurals work with mixed replacements", () => {
    const component = shallow(
      <MixPluralTest namespace="plmix" message="doing" />
    );
    expect(component).toMatchSnapshot();
  });

  it("works with default, _zero, _one", () => {
    const component = shallow(
      <PluralTest namespace="plzeroone" message="cat" />
    );
    expect(component).toMatchSnapshot();
  });

  it("Shows translationstring when replacevalues are not string or number ", () => {
    const component = shallow(
      <Test namespace="mynamespace" replace={{ test: { a: "b" } }} />
    );
    expect(component).toMatchSnapshot();
  });

  it("cant find key when only plurals are defined", () => {
    const component = shallow(
      <PluralTest namespace="plundefined" message="dog" />
    );
    expect(component).toMatchSnapshot();
  });

  it("Plurals default and _plural", () => {
    const component = shallow(
      <PluralTest namespace="pldefzero" message="dog" />
    );
    expect(component).toMatchSnapshot();
  });

  it("Plurals _zero, _one and _plural", () => {
    const component = shallow(<PluralTest namespace="plall" message="cat" />);
    expect(component).toMatchSnapshot();
  });

  it("Replaces strings with tpl parameter", () => {
    const component = shallow(
      <Test namespace="mynamespace" replace={{ test: "replaced string" }} />
    );
    expect(component).toMatchSnapshot();
  });

  it("Replaces numbers with tpl parameter", () => {
    const component = shallow(
      <Test namespace="mynamespace" replace={{ test: 1 }} />
    );
    expect(component).toMatchSnapshot();
  });

  it("Shows the translationstring when not found", () => {
    const component = shallow(
      <Test namespace="mynamespace" message="nokey" replace={{ test: 1 }} />
    );
    expect(component).toMatchSnapshot();
  });

  it("Shows the translationstring without namespace when not found", () => {
    const component = shallow(<Test message="nokey" replace={{ test: 1 }} />);
    expect(component).toMatchSnapshot();
  });

  it("Translates without namespace and without template", () => {
    const component = shallow(<Test message="nonamespace" />);
    expect(component).toMatchSnapshot();
  });

  it("replaces multiple templates", () => {
    const component = shallow(<Multitest />);
    expect(component).toMatchSnapshot();
  });

  it("does not crash when namespace is not defined", () => {
    const component = shallow(<Test namespace="notdefined" message="nokey" />);
    expect(component).toMatchSnapshot();
  });
});
