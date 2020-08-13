import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Field, reduxForm } from "redux-form/immutable";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import ArrowForward from "@material-ui/icons/ArrowForward";
import AllInclusive from "@material-ui/icons/AllInclusive";
import Brightness5 from "@material-ui/icons/Brightness5";
import People from "@material-ui/icons/People";
import Icon from "@material-ui/core/Icon";
import brand from "dan-api/dummy/brand";
import logo from "dan-images/companyLogo.png";
import { TextFieldRedux, CheckboxRedux } from "./ReduxFormMUI";
import styles from "./user-jss";

// validation functions
const required = (value) => (value == null ? "Required" : undefined);
const email = (value) =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email"
    : undefined;

const passwordsMatch = (value, allValues) => {
  if (value !== allValues.get("password")) {
    return "Passwords dont match";
  }
  return undefined;
};

const LinkBtn = React.forwardRef(function LinkBtn(props, ref) {
  // eslint-disable-line
  return <NavLink to={props.to} {...props} innerRef={ref} />; // eslint-disable-line
});

// eslint-disable-next-line
class RegisterFormV2 extends React.Component {
  state = {
    tab: 0,
  };

  handleClickShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  handleChangeTab = (event, value) => {
    this.setState({ tab: value });
  };

  render() {
    const { classes, handleSubmit, pristine, submitting, deco } = this.props;
    const { tab } = this.state;
    return (
      <Paper className={classNames(classes.sideWrap, deco && classes.petal)}>
        <div className={classes.topBar}>
          <NavLink to="/" className={classes.brand}>
            <img src={logo} alt={brand.name} className={classes.companyLogo} />
            {/* bedrijfslogo */}
          </NavLink>
          <Button
            size="small"
            className={classes.buttonLink}
            component={LinkBtn}
            to="/login"
          >
            <Icon className={classes.icon}>arrow_forward</Icon>
            Heeft u al een account?
          </Button>
        </div>
        <Typography variant="h4" className={classes.title} gutterBottom>
          Registeren
        </Typography>
        <Typography
          variant="caption"
          className={classes.subtitle}
          gutterBottom
          align="center"
        />
        {tab === 0 && (
          <section>
            <form onSubmit={handleSubmit}>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="email"
                    component={TextFieldRedux}
                    placeholder="Uw Email"
                    label="Uw Email"
                    required
                    validate={[required, email]}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="password"
                    component={TextFieldRedux}
                    type="Uw wachtwoord"
                    label="Uw wachtwoord"
                    required
                    validate={[required, passwordsMatch]}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControl className={classes.formControl}>
                  <Field
                    name="passwordConfirm"
                    component={TextFieldRedux}
                    type="Wachtwoord opnieuw invoeren"
                    label="Wachtwoord opnieuw invoeren"
                    required
                    validate={[required, passwordsMatch]}
                    className={classes.field}
                  />
                </FormControl>
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Field
                      name="checkbox"
                      component={CheckboxRedux}
                      required
                      className={classes.agree}
                    />
                  }
                  label="Het eens zijn met"
                />
                <a href="#" className={classes.link}>
                  Regels en voorwaarden
                </a>
              </div>
              <div className={classes.btnArea}>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  type="submit"
                >
                  DOORGAAN MET
                  <ArrowForward
                    className={classNames(classes.rightIcon, classes.iconSmall)}
                    disabled={submitting || pristine}
                  />
                </Button>
              </div>
            </form>
          </section>
        )}
        {tab === 1 && (
          <section className={classes.socmedFull}>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              className={classes.redBtn}
              type="button"
            >
              <AllInclusive
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              Socmed 1
            </Button>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              className={classes.blueBtn}
              type="button"
            >
              <Brightness5
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              Socmed 2
            </Button>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              className={classes.cyanBtn}
              type="button"
            >
              <People
                className={classNames(classes.leftIcon, classes.iconSmall)}
              />
              Socmed 3
            </Button>
          </section>
        )}
      </Paper>
    );
  }
}

RegisterFormV2.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  deco: PropTypes.bool.isRequired,
};

const RegisterFormReduxed = reduxForm({
  form: "immutableExample",
  enableReinitialize: true,
})(RegisterFormV2);

const reducer = "ui";
const RegisterFormMapped = connect((state) => ({
  force: state,
  deco: state.getIn([reducer, "decoration"]),
}))(RegisterFormReduxed);

export default withStyles(styles)(RegisterFormMapped);
