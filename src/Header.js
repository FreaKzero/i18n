import React from "react";
import useTranslation from "./modules/i18n";

const Header = ({ title }) => {
  const { t } = useTranslation("common");
  return <h1>{t("header", { title: title })}</h1>;
};

export default Header;
