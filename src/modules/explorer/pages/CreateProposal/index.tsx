import React from "react"
import { Grid, styled, Typography, withStyles, withTheme, TextareaAutosize, Theme } from "@material-ui/core"
import { BackButton } from "modules/common/BackButton"
import { Choices } from "modules/explorer/components/Choices"
import { Proposal } from "models/Proposal"
import { useHistory } from "react-router-dom"
import { Field, Form, Formik, FormikErrors, getIn } from "formik"
import { TextField as FormikTextField } from "formik-material-ui"
import { DateTimePicker } from "@mui/x-date-pickers"
import TextField from "@mui/material/TextField"
import { DateRange } from "@material-ui/icons"

const ProposalContainer = styled(Grid)(({ theme }) => ({
  boxSizing: "border-box",
  [theme.breakpoints.down("md")]: {
    marginTop: 30
  }
}))

const CustomFormikTextField = withStyles({
  root: {
    "& .MuiInput-root": {
      fontWeight: 300,
      textAlign: "initial"
    },
    "& .MuiInputBase-input": {
      textAlign: "initial"
    },
    "& .MuiInput-underline:before": {
      borderBottom: "none !important"
    },
    "& .MuiInput-underline:hover:before": {
      borderBottom: "none !important"
    },
    "& .MuiInput-underline:after": {
      borderBottom: "none !important"
    }
  }
})(FormikTextField)

const PageContainer = styled("div")({
  marginBottom: 50,
  width: "1000px",
  height: "100%",
  margin: "auto",
  padding: "28px 0",
  boxSizing: "border-box",
  paddingTop: 0,

  ["@media (max-width: 1425px)"]: {},

  ["@media (max-width:1335px)"]: {},

  ["@media (max-width:1167px)"]: {
    width: "86vw"
  },

  ["@media (max-width:1030px)"]: {},

  ["@media (max-width:960px)"]: {},

  ["@media (max-width:645px)"]: {
    flexDirection: "column"
  }
})

const Header = styled(Grid)({
  marginBottom: 26
})

const ProposalChoices = styled(Grid)({
  flexGrow: 1,
  minHeight: 250
})

const CustomPicker = withStyles((theme: Theme) => ({
  root: {
    "& .MuiInput-root": {
      fontWeight: 300
    },
    "& .MuiInputBase-root": {
      "paddingRight": 26,
      "height": 72,

      "& fieldset": {
        border: "none !important"
      }
    },
    "& .MuiFormControl-root": {
      "& label": {
        color: `${theme.palette.text.primary} !important`
      }
    },
    "& label": {
      color: `${theme.palette.text.primary} !important`,
      fontFamily: "Roboto Mono",
      fontWeight: 300,
      fontSize: 18,
      marginTop: 8,
      marginLeft: 19
    },
    "& button": {
      color: theme.palette.secondary.main
    },
    "& input": {
      color: theme.palette.text.primary,
      fontFamily: "Roboto Mono",
      fontWeight: 300,
    }
  }
}))(TextField)

const CustomTextarea = styled(withTheme(TextareaAutosize))(props => ({
  "minHeight": 117,
  "boxSizing": "border-box",
  "width": "100%",
  "fontWeight": 300,
  "paddingTop": 19,
  "paddingLeft": 26,
  "border": "none",
  "fontSize": 17,
  "color": props.theme.palette.text.secondary,
  "background": props.theme.palette.primary.main,
  "borderRadius": 4,
  "paddingRight": 40,
  "wordBreak": "break-word",
  "fontFamily": "Roboto Mono",
  "&:focus-visible": {
    outline: "none"
  }
}))

const validateForm = (values: Proposal) => {
  const errors: FormikErrors<Proposal> = {}

  if (!values.title) {
    errors.title = "Required"
  }

  return errors
}

export const ProposalForm = ({ submitForm, values, setFieldValue, errors, touched, setFieldTouched }: any) => {
  return (
    <PageContainer>
      <Grid container>
        <Header container direction="row">
          <Typography color="textPrimary" variant="subtitle1">
            New Proposal
          </Typography>
        </Header>
        <Grid container direction="column" style={{ gap: 30 }}>
          <ProposalContainer container item direction={"column"} style={{ gap: 30 }} xs={12} md={6} lg={8}>
            <Grid item>
              <Field name="title" type="text" placeholder="Proposal Title*" component={CustomFormikTextField} />
            </Grid>
            <Grid item>
              <Field name="description">
                {() => (
                  <CustomTextarea
                    maxLength={1500}
                    aria-label="empty textarea"
                    placeholder="Short description"
                    value={getIn(values, "description")}
                    onChange={(newValue: any) => {
                      setFieldValue("description", newValue.target.value)
                    }}
                  />
                )}
              </Field>
            </Grid>
            <Grid item>
              <Field name="link" type="text" placeholder="External Link" component={CustomFormikTextField} />
            </Grid>
          </ProposalContainer>
          <ProposalContainer container item direction={"column"} style={{ gap: 30 }} xs={12} md={6} lg={4}>
            <Grid item>
              <Field name="start_date">
                {() => (
                  <DateTimePicker
                    inputFormat="DD/MM/YYYY hh:mm a"
                    label={getIn(values, "start_date") ? "" : "Start date"}
                    value={getIn(values, "start_date")}
                    onChange={(newValue: any) => {
                      setFieldValue("start_date", newValue)
                    }}
                    components={{
                      OpenPickerIcon: DateRange
                    }}
                    renderInput={params => <CustomPicker 
                      InputLabelProps={{ shrink: false }} {...params} />}
                  />
                )}
              </Field>
            </Grid>
            <Grid item>
              <Field name="end_date">
                {() => (
                  <DateTimePicker
                  inputFormat="DD/MM/YYYY hh:mm a"
                  label={getIn(values, "end_date") ? "" : "End date"}
                  value={getIn(values, "end_date")}
                    onChange={(newValue: any) => {
                      setFieldValue("end_date", newValue)
                    }}
                    components={{
                      OpenPickerIcon: DateRange
                    }}
                    renderInput={params => <CustomPicker 
                      InputLabelProps={{ shrink: false }} {...params} />}
                  />
                )}
              </Field>
            </Grid>
            {/* <ProposalChoices>
              <Choices />
            </ProposalChoices> */}
          </ProposalContainer>
        </Grid>
      </Grid>
    </PageContainer>
  )
}

export const ProposalCreator: React.FC = () => {
  const navigate = useHistory()

  const initialState: Proposal = {
    title: "",
    description: "",
    link: "",
    choices: [],
    start_date: "",
    end_date: ""
  }

  const saveCommunity = (values: Proposal, { setSubmitting }: { setSubmitting: (b: boolean) => void }) => {
    setSubmitting(true)

    navigate.push("/explore/communities")
  }

  return (
    <PageContainer>
      <Grid container>
        <BackButton />
      </Grid>

      <Formik
        enableReinitialize={true}
        validateOnChange={true}
        validateOnBlur={false}
        validate={validateForm}
        onSubmit={saveCommunity}
        initialValues={initialState}
      >
        {({ submitForm, isSubmitting, setFieldValue, values, errors, touched, setFieldTouched }) => {
          return (
            <Form style={{ width: "100%" }}>
              <ProposalForm
                submitForm={submitForm}
                isSubmitting={isSubmitting}
                setFieldValue={setFieldValue}
                errors={errors}
                touched={touched}
                values={values}
                setFieldTouched={setFieldTouched}
              />
            </Form>
          )
        }}
      </Formik>
    </PageContainer>
  )
}
