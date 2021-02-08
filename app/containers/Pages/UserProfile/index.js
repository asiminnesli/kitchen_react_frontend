import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import brand from "dan-api/dummy/brand";
import CreateIcon from "@material-ui/icons/Create";

import dummy from "dan-api/dummy/dummyContents";
import { withStyles } from "@material-ui/core/styles";
import styles from "dan-components/SocialMedia/jss/cover-jss";
// form fields..
import {
  Select,
  TextField,
  Grid,
  Typography,
  IconButton,
  InputBase,
  Divider,
  InputLabel,
  FormControl,
  Button,
  Icon,
} from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import {
  ProfileWrapper,
  useStyles,
  Figcaption,
  FormField,
  ProfilNavBar,
  ProfilePhotoWrapper,
  ButtonsContainer,
} from "./style";
import cssButtons from "dan-styles/Buttons.scss";
import SearchIcons from "../../UiElements/IconGallery/SearchIcons";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import {
  userProfileGet,
  userProfileDataUpload,
  userProfilePhotoUpload,
  userProfilePassword,
} from "../../../data/data";
import config from "../../../actions/config";

const UserProfile = (props) => {
  const [photo, setPhoto] = useState("");
  const [salutation, setSalutation] = useState("Dhr.");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [postCode, setPostCode] = useState("");
  const [city, setCity] = useState("");
  const [land, setLand] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState(
    JSON.parse(localStorage.getItem("user")).email
  );
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [file, setFile] = useState(null);
  const [passwordResult, setPasswordResult] = useState("");

  useEffect(() => {
    userProfileGet(JSON.parse(localStorage.getItem("user")).id)
      .then((res) => {
        console.log(res);
        let profile = res.data[0];
        setCompanyName(profile.company_name);
        setSalutation(profile.salutation);
        setFirstName(profile.first_name);
        setStreet(profile.street);
        setHouseNumber(profile.house_number);
        setTelephoneNumber(profile.telephone_number);
        setPostCode(profile.postcode);
        setCity(profile.city);
        setLand(profile.land);
        setBirthday(profile.birth_date);
        if (profile.photo) setPhoto(`${config.fetchLinkUrl}${profile.photo}`);
        else setPhoto(dummy.user.avatar);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // todo: implement this to change submit new user infos
  const handleSubmit = () => {
    console.log("comming soon");
    let user = {
      salutation: salutation,
      first_name: firstName,
      surname: surname,
      company_name: companyName,
      telephone_number: telephoneNumber,
      street: street,
      house_number: houseNumber,
      postcode: postCode,
      city: city,
      land: land,
      birth_date: birthday
    };
    user = JSON.stringify(user);
    var data = { user: user };

    userProfileDataUpload(data)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });

    if (file) {
      let photo_data = new FormData();
      photo_data.append("photo", file);
      userProfilePhotoUpload(photo_data)
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (newPassword) {
      let password_data = {
        oldPassword: oldPassword,
        newPassword: newPassword,
      };
      userProfilePassword(password_data)
        .then((res) => {
          console.log(res);
          if (res.data.success === true)
            setPasswordResult(
              `<span style="color: green">Password Updated Successfully</span>`
            );
          else
            setPasswordResult(
              `<span style="color: red">Please input correct old password</span>`
            );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const title = brand.name + " - Profile";
  const description = brand.desc;
  const { classes } = props;

  const set_profile_photo = (data) => {
    setPhoto(URL.createObjectURL(data));
    setFile(data);
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
      <ProfileWrapper>
        <form noValidate>
          <ProfilNavBar>
            <Button
              size="small"
              className={classes.buttonLink}
              to="/new-offer" // todo: make sure there is a new-offer comp.
            >
              nieuw offerte
              <Icon className={classes.icon}>arrow_forward</Icon>
            </Button>
          </ProfilNavBar>
          <ProfilePhotoWrapper>
            <img src={photo} alt="" />

            <Figcaption>
              Profielfoto
              <Button size="small" className={classes.buttonLink}>
                <Dropzone
                  onDrop={(acceptedFiles) =>
                    set_profile_photo(acceptedFiles[0])
                  }
                  accept="image/*"
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <CreateIcon fontSize="small" htmlColor="#818181" />
                        <span>Wijzigen</span>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </Button>
            </Figcaption>
          </ProfilePhotoWrapper>
          <Grid container spacing={3} style={{ marginTop: "50px" }}>
            <Grid xs={12} sm={2} className={classes.padding1} item={true}>
              <Typography className={classes.label} variant="button">
                Aanhef
              </Typography>
              <FormField>
                <FormControl variant="outlined" className="formControl">
                  <InputLabel htmlFor="outlined-age-native-simple">
                    Gekozen Item
                  </InputLabel>
                  <Select
                    native
                    value={salutation}
                    className={"formControl selectView "}
                    placeholder="Dhr."
                    onChange={(e) => setSalutation(e.target.value)}
                    label="Gekozen Item"
                    inputProps={{
                      name: "age",
                      id: "outlined-age-native-simple",
                    }}
                  >
                    <option className="option" value="Dhr.">
                      Dhr.
                    </option>
                    <option className="option" value="Mvr.">
                      Mvr.
                    </option>
                  </Select>
                </FormControl>
              </FormField>
            </Grid>
            <Grid sm={3} xs={12} item={true}>
              <Typography className={classes.label} variant="button">
                Naam
              </Typography>
              <TextField
                id="outlined-full-width"
                // placeholder="Hans"
                fullWidth
                margin="normal"
                variant="outlined"
                className={classes.paper}
                InputLabelProps={{
                  shrink: true,
                }}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Grid>

            <Grid sm={5} xs={12} className={classes.margin2Left} item={true}>
              <Typography className={classes.label} variant="button">
                Bedrijfsnaam
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
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </Grid>
            <Grid sm={4} xs={12} className={classes.padding1} item={true}>
              <Typography className={classes.label} variant="button">
                Adres
              </Typography>
              <TextField
                id="outlined-full-width"
                // placeholder="Romorkstraat"
                fullWidth
                margin="normal"
                variant="outlined"
                className={classes.paper}
                InputLabelProps={{
                  shrink: true,
                }}
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </Grid>
            <Grid sm={1} xs={12} item={true}>
              <Typography className={classes.label} variant="button">
                Huisnur.
              </Typography>
              <TextField
                id="outlined-full-width"
                // placeholder="1"
                fullWidth
                margin="normal"
                variant="outlined"
                className={classes.paper}
                InputLabelProps={{
                  shrink: true,
                }}
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
              />
            </Grid>
            <Grid sm={5} xs={12} className={classes.margin2Left} item={true}>
              <Typography className={classes.label} variant="button">
                Telefon
              </Typography>
              <TextField
                id="outlined-full-width"
                // placeholder="+31621816448"
                fullWidth
                margin="normal"
                variant="outlined"
                className={classes.paper}
                InputLabelProps={{
                  shrink: true,
                }}
                value={telephoneNumber}
                onChange={(e) => setTelephoneNumber(e.target.value)}
              />
            </Grid>
            <Grid sm={2} xs={12} className={classes.padding1} item={true}>
              <Typography className={classes.label} variant="button">
                Postcode
              </Typography>
              <TextField
                id="outlined-full-width"
                // placeholder="1034 LE"
                fullWidth
                margin="normal"
                variant="outlined"
                className={classes.paper}
                InputLabelProps={{
                  shrink: true,
                }}
                value={postCode}
                onChange={(e) => setPostCode(e.target.value)}
              />
            </Grid>

            <Grid sm={3} xs={12} item={true}>
              <Typography className={classes.label} variant="button">
                Woonplaats
              </Typography>
              <TextField
                id="outlined-full-width"
                // placeholder="Amsterdam"
                fullWidth
                margin="normal"
                variant="outlined"
                className={classes.paper}
                InputLabelProps={{
                  shrink: true,
                }}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>

            <Grid sm={3} xs={12} className={classes.margin1Left} item={true}>
              <Typography className={classes.label} variant="button">
                Land
              </Typography>
              <TextField
                id="outlined-full-width"
                // placeholder="Nederland"
                fullWidth
                margin="normal"
                variant="outlined"
                className={classes.paper}
                InputLabelProps={{
                  shrink: true,
                }}
                value={land}
                onChange={(e) => setLand(e.target.value)}
              />
            </Grid>
            <Grid sm={3} xs={12} className={classes.padding1} item={true}>
              <Typography className={classes.label} variant="button">
                Birthday
              </Typography>
              <TextField
                type="date"
                id="outlined-full-width"
                // placeholder="Birthday"
                fullWidth
                margin="normal"
                variant="outlined"
                className={classes.paper}
                InputLabelProps={{
                  shrink: true,
                }}
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Grid>
          </Grid>

          <Divider
            className={classes.divider}
            variant="fullWidth"
            component="hr"
          />
          <div
            className="text-center text-success"
            dangerouslySetInnerHTML={{
              __html: passwordResult,
            }}
          />
          <Grid container spacing={3} style={{ marginTop: "20px" }}>
            <Grid sm={5} xs={12} item={true}>
              <Typography className={classes.label} variant="button">
                E-mail
              </Typography>
              <TextField
                id="outlined-full-width"
                placeholder="info@ideastudio.nl"
                fullWidth
                margin="normal"
                variant="outlined"
                className={classes.paper}
                InputLabelProps={{
                  shrink: true,
                }}
                value={email}
              />
            </Grid>
            <Grid sm={7} xs={0} item={true} />

            <Grid sm={5} xs={12} item={true}>
              <Typography className={classes.label} variant="button">
                Huidige wachtwoord
              </Typography>
              <TextField
                id="outlined-full-width"
                placeholder=""
                fullWidth
                margin="normal"
                variant="outlined"
                className={classes.paper}
                InputLabelProps={{
                  shrink: true,
                }}
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </Grid>
            <Grid
              sm={5}
              xs={12}
              className={classes.marginLeftNormal}
              item={true}
            >
              <Typography className={classes.label} variant="button">
                Nieuwe wachtwoord
              </Typography>
              <TextField
                id="outlined-full-width"
                placeholder=""
                fullWidth
                margin="normal"
                variant="outlined"
                className={classes.paper}
                InputLabelProps={{
                  shrink: true,
                }}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid className={classes.link}>
            <Link style={{ color: "#ff6600" }} to="/reset-password">
              Wachtwoord vergeten?
            </Link>
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
              onClick={handleSubmit}
            >
              OPSLAAN
            </Button>
          </ButtonsContainer>
        </form>
      </ProfileWrapper>
    </div>
  );
};

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(useStyles)(UserProfile);
