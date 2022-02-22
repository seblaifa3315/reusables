import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import useStyles from "./useStyles";
import TextfieldWrapper from "./FormsUI/Textfield/index";
import SelectWrapper from "./FormsUI/Select/index";
import DateTimePicker from "./FormsUI/DateTimePicker";
import CheckboxWrapper from "./FormsUI/Checkbox/index";
import ButtonWrapper from "./FormsUI/Button";
import countries from "../../Data/countries.json";

const INITIAL_FORM_STATE = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    arrivalDate: "",
    departureDate: "",
    message: "",
    termeOfService: false,
};

const FORM_VALIDATION = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.number().integer().typeError("Please enter a valid phone number").required("Required"),
    addressLine1: Yup.string().required("Required"),
    addressLine2: Yup.string(),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    arrivalDate: Yup.date().required("Required"),
    departureDate: Yup.date().required("Required"),
    message: Yup.string(),
    termeOfService: Yup.boolean().oneOf([true], "The terms and conditions must be accepted.").required("The terms and conditions must be accepted."),
});

const MaterialUIFormik = () => {
    const classes = useStyles();
    return (
        <Container maxWidth="md">
            <div className={classes.formWrapper}>
                <Formik
                    initialValues={{ ...INITIAL_FORM_STATE }}
                    validationSchema={FORM_VALIDATION}
                    onSubmit={(values) => {
                        console.log(values);
                    }}
                >
                    <Form>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography>Your details</Typography>
                            </Grid>

                            <Grid item xs={6}>
                                <TextfieldWrapper name="firstName" label="First Name" />
                            </Grid>

                            <Grid item xs={6}>
                                <TextfieldWrapper name="lastName" label="Last Name" />
                            </Grid>

                            <Grid item xs={12}>
                                <TextfieldWrapper name="email" label="Email" />
                            </Grid>

                            <Grid item xs={12}>
                                <TextfieldWrapper name="phone" label="Phone" />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography>Address</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextfieldWrapper name="addressLine1" label="Address Line1" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextfieldWrapper name="addressLine2" label="Address Line2" />
                            </Grid>
                            <Grid item xs={6}>
                                <TextfieldWrapper name="city" label="City" />
                            </Grid>
                            <Grid item xs={6}>
                                <TextfieldWrapper name="state" label="State" />
                            </Grid>
                            <Grid item xs={12}>
                                <SelectWrapper name="country" label="Country" options={countries} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>Booking information</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <DateTimePicker name="arrivalDate" label="Arrival Date" />
                            </Grid>
                            <Grid item xs={6}>
                                <DateTimePicker name="departureDate" label="Departure Date" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextfieldWrapper name="message" label="Message" multiline={true} rows={4} />
                            </Grid>
                            <Grid item xs={12}>
                                <CheckboxWrapper name="termeOfService" legend="Terme Of Service" label="I agree" />
                            </Grid>
                            <Grid item xs={12}>
                                <ButtonWrapper>Submit</ButtonWrapper>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
            </div>
        </Container>
    );
};

export default MaterialUIFormik;
