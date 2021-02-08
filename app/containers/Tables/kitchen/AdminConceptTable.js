/* eslint-disable class-methods-use-this */
/* eslint-disable quotes */
/* eslint-disable react/no-multi-comp */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable indent */
/* eslint-disable react/jsx-indent */

import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import { Link } from "react-router-dom";
import {
  Button,
  Dialog,
  Slide,
  AppBar,
  IconButton,
  Typography,
  Toolbar,
  Grid,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import css from "dan-styles/Buttons.scss";
import css2 from "./index.scss";
import { MaterialDropZone } from "dan-components";

import pdfImage from "./images/pdf.svg";

import {
  adminDashBoardOffers,
  fileDownload,
  uploadDocuments,
  updateStatusOffer,
} from "../../../data/data";

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
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
});
const LinkBtn = React.forwardRef(function LinkBtn(props, ref) {
  // eslint-disable-line
  return <Link to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
/*
  It uses npm mui-datatables. It's easy to use, you just describe columns and data collection.
  Checkout full documentation here :
  https://github.com/gregnb/mui-datatables/blob/master/README.md
*/
const AdminConceptTable = (props) => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [classes, setClasses] = useState(props.classes);
  const [tableData, setTableData] = useState([]);
  const [oldFile, setOldFile] = useState([]);
  const [offerIdForUpload, setOfferIdForUpload] = useState("");
  const [offerIdForStatus, setOfferIdForStatus] = useState("");
  const [modalAlertOpen, setModalAlertOpen] = useState(false);

  useEffect(() => {
    adminDashBoardOffers().then((res) => {
      if (res.isError || res.shouldLogin) {
        console.error("errors");
      }
      if (res.error) {
        console.error("error");
      }
      console.log("I am here", res);
      let table_data = [];
      res.concept.map((element) => {
        let row_data = [
          element.createdAt.split("T")[0],
          element.city,
          element.profile ? element.profile.email : "",
          {
            old_files: element.old_files,
            id: element.id,
          },
          { id: element.id, files: element.files },
        ];
        table_data.push(row_data);
      });
      setTableData(table_data);
    });
  }, [open, modalOpen]);
  const columns = [
    {
      name: "Datum",
      options: {
        filter: true,
      },
    },
    {
      name: "Plaats",
      options: {
        filter: true,
      },
    },
    {
      name: "Gebruiker",
      options: {
        filter: true,
      },
    },
    {
      name: "Bijlage",
      options: {
        filter: false,
        customBodyRender: (value) => (
          <Link onClick={() => handleClickOpen(value)}>
            <img className={css2.Responsive_pdf} src={pdfImage} alt="pdf" />
          </Link>
        ),
      },
    },
    {
      name: "Publiceren",
      options: {
        filter: false,
        customBodyRender: (value) => renderLink(value),
      },
    },
  ];

  const handleClickOpen = (value) => {
    setOpen(true);
    let old_file = JSON.parse(value.old_files);
    setOldFile(old_file);
    setOfferIdForUpload(value.id);
  };

  const handleClose = () => {
    setOpen(false);
    setOldFile([]);
    setOfferIdForUpload("");
  };

  const fileSave = () => {
    let data = new FormData();
    let offer = {
      offer_id: offerIdForUpload,
    };
    files.forEach((file) => {
      data.append("files[]", file, file.name);
    });
    data.append("offer", JSON.stringify(offer));

    uploadDocuments(data).then((res) => {
      if (res.isError || res.shouldLogin) {
        console.error("errors");
      }
      if (res.error) {
        console.error("error");
      }
      console.log("I am here", res);
      setOpen(false);
      setOldFile([]);
      setOfferIdForUpload("");
    });
  };

  const getFiles = (files) => {
    console.log(files);
    setFiles(files);
  };

  const handleModalOpen = (value) => {
    if (value.files) {
      setModalOpen(true);
      setOfferIdForStatus(value.id);
    } else setModalAlertOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setOfferIdForStatus("");
  };

  const handleAlertModalClose = () => {
    setModalAlertOpen(false);
  };

  const changeStatus = () => {
    let data = {
      offerid: offerIdForStatus,
      status: "active",
    };
    updateStatusOffer(data).then((res) => {
      if (res.isError || res.shouldLogin) {
        console.error("errors");
      }
      if (res.error) {
        console.error("error");
      }
      console.log("I am here", res);
      setModalOpen(false);
      setOfferIdForStatus("");
    });
  };

  const renderLink = (value) => {
    return (
      <Button
        variant="contained"
        color=""
        className={css.seeButton}
        onClick={() => handleModalOpen(value)}
      >
        Publiceren &nbsp; &#x279C;
      </Button>
    );
  };

  const renderType = (value) => {
    return <div>{value}</div>;
  };

  const download = () => {
    oldFile.map((element) => {
      let data = {
        file: element,
      };
      fileDownload(data).then((res) => {
        if (res.isError || res.shouldLogin) {
          console.error("errors");
        }
        if (res.error) {
          console.error("error");
        }
        console.log("I am download", res);
        const url = window.URL.createObjectURL(
          new Blob([res.data], {
            type: "image/pdf",
          })
        );
        console.log("link", url);

        const link = document.createElement("a");

        link.href = url;

        link.setAttribute("download", element.split("/")[3]);

        // document.body.appendChild(link);

        link.click();
      });
    });
  };
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
  return (
    <div className={css2.multiTableContainer}>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        Transition={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={fileSave}>
              save
            </Button>
          </Toolbar>
        </AppBar>

        <Grid container>
          <Grid xs={6}>
            <ul>
              <li onClick={download}>file to download</li>
            </ul>
          </Grid>
          <Grid xs={6}>
            <MaterialDropZone
              files={files}
              showPreviews
              maxSize={5000000}
              filesLimit={5}
              text="Sleep bestanden hierheen
                            of klik op bladeren"
              header="Upload"
              showButton={true}
              getFiles={getFiles}
            />
          </Grid>
        </Grid>
      </Dialog>
      <Dialog
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {/* <DialogTitle id="alert-dialog-title">
          {'Use Google\'s location service?'}
        </DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            heb u de nodige veranderingen aangebracht? u kunt geen wijzigingen
            meer aanbrengen.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Nee
          </Button>
          <Button onClick={changeStatus} color="primary" autoFocus>
            ja
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={modalAlertOpen}
        onClose={handleAlertModalClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Firstly, upload new files
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAlertModalClose} color="primary" autoFocus>
            ja
          </Button>
        </DialogActions>
      </Dialog>
      <MUIDataTable
        title=""
        data={tableData}
        columns={columns}
        options={options}
      />
    </div>
  );
};

AdminConceptTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminConceptTable);
