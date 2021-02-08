/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-indent */
/* eslint-disable indent */
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import { Grid, Tabs, Tab } from "@material-ui/core";

import css from "dan-styles/TableHeader.scss";

import BlankPage from "../BlankPage";
import CompanyNiewOffersTable from "../../Tables/kitchen/CompanyNiewOffersTable";
import CompanyArrangedTable from "../../Tables/kitchen/CompanyArrangedTable";
import CompanyFinishedTable from "../../Tables/kitchen/CompanyFinishedTable";
import CompanyOffersTable from "../../Tables/kitchen/CompanyOffersTable";

const CompaniesOffers = (props) => {
  const title = brand.name + " - Blank Page";
  const description = brand.desc;
  const [tabStatus, setTabStatus] = useState(0);

  const handleChange = (event, value) => {
    setTabStatus(value);
  };

  
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>
      <BlankPage desc="Some text description">
        <Tabs value={tabStatus} onChange={handleChange}>
          <Tab label="NIEUWE OFFERTE" />
          <Tab label="MIJN OFFERTE" />
          <Tab label="GEREAGEERD" />
          <Tab label="AFGEHANDELD" />
        </Tabs>

        <hr />
        {tabStatus === 0 && <CompanyNiewOffersTable history={props.history} />}
        {tabStatus === 1 && <CompanyArrangedTable history={props.history} />}
        {tabStatus === 2 && <CompanyOffersTable history={props.history} />}

        {tabStatus === 3 && <CompanyFinishedTable history={props.history} />}
      </BlankPage>
    </div>
  );
};

export default CompaniesOffers;
