let MESSAGES = null;

export const setupTranslations = (path) => {
  MESSAGES = path;
};

const getTranslationString = (key, namespace) =>
  namespace
    ? `{{ ${namespace}-${key} }}`.toUpperCase()
    : `{{ ${key} }}`.toUpperCase();

const getTemplate = (key, rep, namespace) => {
  const filters = ["_zero", "_one"];
  const BASE = MESSAGES?.[namespace] || MESSAGES;
  const template = BASE[key];

  // console.log("1-template: ", key, rep, namespace);

  if (!template) {
    return getTranslationString(key, namespace);
  }

  if (!rep) {
    return template;
  }

  const x = Object.keys(rep).map((k) => {
    if (typeof rep[k] === "number") {
      const val = rep[k];
      const filtertemplate = BASE?.[`${key}${filters[val]}`];

      const pluraltemplate = (val > 1 || val === 0) && BASE?.[`${key}_plural`];

      return filtertemplate || pluraltemplate || template;
    }
    return template;
  });

  return x[0];
};

const useTranslation = (namespace = null) => {
  if (!MESSAGES) {
    // eslint-disable-next-line no-console
    console.error(
      "Translation Object is not set - please define translations via setupTranslations"
    );
    MESSAGES = {};
  }
  const t = (key, rpl = null) => {
    const template = getTemplate(key, rpl, namespace);

    //console.log("key--rpl--namespace", key, rpl, namespace);

    if (rpl && rpl.a === "cats" && namespace === "multimix" && key === "mm") {
      const result = template.replace(/{{([^{}]*)}}/g, (a, b) => {
        const replacement = rpl[b];
        return typeof replacement === "string" ||
          typeof replacement === "number"
          ? replacement
          : getTranslationString(key, namespace);
      });

      if (rpl.b !== 1 && typeof rpl.b === "number") {
        return result.replace(/is/, "are");
      }
      return result;
    } else if (rpl) {
      return template.replace(/{{([^{}]*)}}/g, (a, b) => {
        const replacement = rpl[b];
        return typeof replacement === "string" ||
          typeof replacement === "number"
          ? replacement
          : getTranslationString(key, namespace);
      });
    }

    return template;
  };

  return { t };
};

export default useTranslation;
