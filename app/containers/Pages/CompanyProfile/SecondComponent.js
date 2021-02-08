import React, { useState, useEffect } from "react";
import { Grid, Typography, TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { ButtonsContainer } from "./style";
import cssButtons from "dan-styles/Buttons.scss";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import {
  companyProfileSetting,
  companyProfileSettingGet,
} from "../../../data/data";

const SecondComponent = (props) => {
  const { classes } = props;
  const [website, setWebsite] = useState("");
  const [services, setServices] = useState("");
  const [aboutCompany, setAboutCompany] = useState("");
  const [openingHours, setOpeningHours] = useState("");
  const [reviews, setReviews] = useState("");

  useEffect(() => {
    let data = {
      company_id: JSON.parse(localStorage.getItem("user")).id,
    };
    companyProfileSettingGet(data).then((res) => {
      if (res.isError || res.shouldLogin) {
        console.error("errors");
      }
      if (res.error) {
        console.error("error");
      }
      console.log("I am here", res.data);
      let response = res.data[0];
      setWebsite(response.website);
      setServices(response.services);
      setAboutCompany(response.about_company);
      setOpeningHours(response.opening_hours);
      setReviews(response.reviews);
    });
  }, []);

  const send_data = () => {
    let data = {
      website: website,
      services: services,
      about_company: aboutCompany,
      opening_hours: openingHours,
      reviews: reviews,
    };
    companyProfileSetting(data).then((res) => {
      if (res.isError || res.shouldLogin) {
        console.error("errors");
      }
      if (res.error) {
        console.error("error");
      }
      console.log("I am here", res.data);
    });
  };
  return (
    <>
      <Grid container spacing={3} style={{ marginTop: "50px" }}>
        <Grid sm={4} xs={12} className={classes.padding1} item={true}>
          <Typography className={classes.label} variant="button">
            Website
          </Typography>
          <TextField
            id="outlined-full-width"
            // placeholder="Superkeukens"
            fullWidth
            margin="normal"
            variant="outlined"
            className={classes.paper}
            InputLabelProps={{
              shrink: true,
            }}
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </Grid>
        <Grid sm={6} xs={12} className={classes.margin1Left} item={true}>
          <Typography className={classes.label} variant="button">
            Services
          </Typography>
          <TextField
            id="outlined-full-width"
            // placeholder="Superkeukens"
            fullWidth
            margin="normal"
            variant="outlined"
            className={classes.paper}
            InputLabelProps={{
              shrink: true,
            }}
            value={services}
            onChange={(e) => setServices(e.target.value)}
          />
        </Grid>

        <Grid sm={4} xs={12} className={classes.padding1} item={true}>
          <Typography className={classes.label} variant="button">
            Voeg een tekst over uw bedrijf
          </Typography>
          <TextField
            id="outlined-multiline-static"
            // placeholder="Typ hier over uw bedrijf"
            fullWidth
            style={{ height: "230px" }}
            margin="normal"
            variant="outlined"
            className={classes.paper}
            multiline
            rows={9}
            InputLabelProps={{
              shrink: true,
            }}
            value={aboutCompany}
            onChange={(e) => setAboutCompany(e.target.value)}
          />
        </Grid>
        <Grid sm={3} xs={12} className={classes.margin1Left} item={true}>
          <Typography className={classes.label} variant="button">
            Openingstijden
          </Typography>
          <TextField
            id="outlined-multiline-static"
            // placeholder="Maandag t/m Vrijdag 12:00 - 18:00
            //                 \nZaterdag 12:00 - 17:00
            //                 \nZondag gesloten!"
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            rows={9}
            className={classes.paper}
            value={openingHours}
            onChange={(e) => setOpeningHours(e.target.value)}
          />
        </Grid>
        <Grid sm={3} xs={12} className={classes.margin1Left} item={true}>
          <Typography className={classes.label} variant="button">
            Beoordelingen
          </Typography>
          <TextField
            id="outlined-multiline-static"
            // placeholder="Superkeukens"
            fullWidth
            rows={9}
            margin="normal"
            variant="outlined"
            className={classes.paper}
            multiline
            InputLabelProps={{
              shrink: true,
            }}
            value={reviews}
            onChange={(e) => setReviews(e.target.value)}
          />
        </Grid>
      </Grid>
      <ButtonsContainer>
        <Button
          variant="contained"
          color="default"
          className={classes.button + " " + cssButtons.backButton}
        >
          Anulleren
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button + " " + cssButtons.saveButton}
          endIcon={<ArrowForwardIcon />}
          onClick={send_data}
        >
          OPSLAAN
        </Button>
      </ButtonsContainer>
    </>
  );
};

export default SecondComponent;
