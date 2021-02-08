/* eslint-disable quotes */
/* eslint-disable react/no-multi-comp */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */

import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import LinearProgress from "@material-ui/core/LinearProgress";
import MUIDataTable from "mui-datatables";
import css from "dan-styles/Buttons.scss";
import Button from "@material-ui/core/Button";

import { Link } from "react-router-dom";
import css2 from "./index.scss";
import { userOffers } from "../../../data/data";

const styles = (theme) => ({
  table: {
    "& > div": {
      overflow: "auto",
    },
    "& table": {
      minWidth: 500,
      [theme.breakpoints.down("md")]: {
        "& td": {
          height: 40,
        },
      },
    },
  },
});
const LinkBtn = React.forwardRef(function LinkBtn(props, ref) {
  // eslint-disable-line
  return <Link to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});
/*
  It uses npm mui-datatables. It's easy to use, you just describe columns and data collection.
  Checkout full documentation here :
  https://github.com/gregnb/mui-datatables/blob/master/README.md
*/
const OffersListKlantTable = (props) => {
  const { classes } = props;
  const options = {
    onRowsDelete: (e) => {
      console.log(e);
      console.log("shfeu");
    },
    filterType: "dropdown",
    responsive: "stacked",
    print: true,
    rowsPerPage: 10,
    page: 0,
  };
  const columns = [
    {
      name: "Offerte type",
      options: {
        filter: true,
      },
    },
    {
      name: "Offerte name",
      options: {
        filter: true,
      },
    },
    {
      name: "Datum",
      options: {
        filter: true,
      },
    },
    {
      name: "Reacties",
      options: {
        filter: false,
        customBodyRender: (value) => (
          <LinearProgress
            variant="determinate"
            color="secondary"
            value={value[0]}
          />
        ),
      },
    },
    {
      name: "Status",
      options: {
        filter: false,
        customBodyRender: (value) => renderStatus(value),
      },
    },
    {
      name: "",
      options: {
        filter: false,
        customBodyRender: (value) => renderLink(value),
      },
    },
  ];

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    userOffers().then((res) => {
      if (res.isError || res.shouldLogin) {
        console.error("errors");
      }
      if (res.error) {
        console.error("error");
      }
      console.log("I am here", res);
      let data_array = [];
      res.data.map((element) => {
        let reactions = [];
        if (element.status === "concept") reactions = [33, 2];
        else if (element.status === "active") reactions = [90, 2];
        else if (element.status === "done") reactions = [100, 2];
        let raw_array = [
          element.type,
          element.name,
          element.createdAt.split("T")[0],
          reactions,
          element.status,
          element.id,
        ];
        data_array.push(raw_array);
      });
      setTableData(data_array);
    });
  }, []);

  const renderLink = (id) => {
    return (
      <Button
        variant="contained"
        color=""
        className={css.seeButton}
        onClick={() => {
          props.history.push("/users/offers/" + id);
        }}
      >
        BEKIJKEN &nbsp; &#x279C;
      </Button>
    );
  };

  const renderStatus = (status) => {
    let label = "";
    if (status === "active") label = "actief";
    else label = status;
    let name = label + "Button";
    return (
      <Button variant="contained" color="" className={css[name]}>
        {label.toUpperCase()}
      </Button>
    );
  };

  return (
    <div className={css2.multiTableContainer}>
      <MUIDataTable data={tableData} columns={columns} options={options} />
    </div>
  );
};

OffersListKlantTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OffersListKlantTable);
