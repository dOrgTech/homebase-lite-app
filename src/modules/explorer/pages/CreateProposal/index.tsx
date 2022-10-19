import React, { useCallback, useEffect, useState } from "react"
import {
  Grid,
  styled,
  Typography,
  withStyles,
  withTheme,
  TextareaAutosize,
  Theme,
  useTheme,
  useMediaQuery
} from "@material-ui/core"
import { BackButton } from "modules/common/BackButton"
import { Choices } from "modules/explorer/components/Choices"
import { Proposal } from "models/Proposal"
import { useHistory, useParams } from "react-router-dom"
import { Field, Form, Formik, FormikErrors, getIn } from "formik"
import { TextField as FormikTextField } from "formik-material-ui"
import { DateTimePicker } from "@mui/x-date-pickers"
import TextField from "@mui/material/TextField"
import { DateRange } from "@material-ui/icons"
import { Poll } from "models/Polls"
import { useTezos } from "services/beacon/hooks/useTezos"
import { getCurrentBlock, getTotalSupplyAtReferenceBlock } from "services/utils"
import dayjs from "dayjs"
import { useNotification } from "modules/common/hooks/useNotification"

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

const Header = styled(Grid)(({ theme }) => ({
  marginBottom: 26,
  [theme.breakpoints.down("sm")]: {
    marginBottom: 6
  }
}))

const ProposalChoices = styled(Grid)({
  flexGrow: 1
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
      fontWeight: 300
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

const ErrorText = styled(Typography)({
  fontSize: 14,
  color: "red",
  marginBottom: -21,
  marginTop: 2
})

const ErrorTextChoices = styled(Typography)({
  fontSize: 14,
  color: "red",
  marginBottom: -21,
  marginTop: -66
})

const validateForm = (values: Poll) => {
  const errors: FormikErrors<Poll> = {}

  if (!values.name) {
    errors.name = "Required"
  }

  if (values.choices.length === 0 || values.choices.length === 1) {
    errors.choices = "Two options at least are required"
  }

  if (values.choices.length > 0 && values.choices.includes("")) {
    errors.choices = "Please enter an option value"
  }

  if (!values.startTime) {
    errors.startTime = "Required"
  }

  if (!values.endTime) {
    errors.endTime = "Required"
  }

  return errors
}

export const ProposalForm = ({ submitForm, values, setFieldValue, errors, touched, setFieldTouched }: any) => {
  const theme = useTheme()
  const isMobileSmall = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <PageContainer>
      <Grid container>
        <Header container direction="row">
          <Typography color="textPrimary" variant="subtitle1">
            New Proposal
          </Typography>
        </Header>
        <Grid container direction={isMobileSmall ? "row" : "column"} style={{ gap: 30 }}>
          <ProposalContainer container item direction={"column"} style={{ gap: 30 }} xs={12} md={6} lg={8}>
            <Grid item>
              <Field name="name" type="text" placeholder="Proposal Title*" component={CustomFormikTextField} />
              {errors?.name && touched.name ? <ErrorText>{errors.name}</ErrorText> : null}
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
              <Field name="externalLink" type="text" placeholder="External Link" component={CustomFormikTextField} />
            </Grid>

            {isMobileSmall ? (
              <>
                <Grid item>
                  <Field name="startTime">
                    {() => (
                      <DateTimePicker
                        inputFormat="MM/DD/YYYY hh:mm a"
                        label={getIn(values, "startTime") ? "" : "Start date"}
                        value={getIn(values, "startTime")}
                        onChange={(newValue: any) => {
                          setFieldValue("startTime", newValue.$d)
                        }}
                        components={{
                          OpenPickerIcon: DateRange
                        }}
                        renderInput={params => <CustomPicker InputLabelProps={{ shrink: false }} {...params} />}
                      />
                    )}
                  </Field>
                  {errors?.startTime && touched.startTime ? <ErrorText>{errors.startTime}</ErrorText> : null}
                </Grid>
                <Grid item>
                  <Field name="endTime">
                    {() => (
                      <DateTimePicker
                        inputFormat="MM/DD/YYYY hh:mm a"
                        label={getIn(values, "endTime") ? "" : "End date"}
                        value={getIn(values, "endTime")}
                        onChange={(newValue: any) => {
                          setFieldValue("endTime", newValue.$d)
                        }}
                        components={{
                          OpenPickerIcon: DateRange
                        }}
                        renderInput={params => <CustomPicker InputLabelProps={{ shrink: false }} {...params} />}
                      />
                    )}
                  </Field>
                  {errors?.endTime && touched.endTime ? <ErrorText>{errors.endTime}</ErrorText> : null}
                </Grid>
              </>
            ) : null}
            <ProposalChoices>
              <Choices choices={getIn(values, "choices")} submitForm={submitForm} />
              {errors?.choices && touched.choices ? <ErrorTextChoices>{errors.choices}</ErrorTextChoices> : null}
            </ProposalChoices>
          </ProposalContainer>

          {!isMobileSmall ? (
            <ProposalContainer container item direction={"column"} style={{ gap: 30 }} xs={12} md={6} lg={4}>
              <Grid item>
                <Field name="startTime">
                  {() => (
                    <DateTimePicker
                      inputFormat="MM/DD/YYYY hh:mm a"
                      label={getIn(values, "startTime") ? "" : "Start date"}
                      value={getIn(values, "startTime")}
                      onChange={(newValue: any) => {
                        setFieldValue("startTime", newValue.$d)
                      }}
                      components={{
                        OpenPickerIcon: DateRange
                      }}
                      renderInput={params => <CustomPicker InputLabelProps={{ shrink: false }} {...params} />}
                    />
                  )}
                </Field>
                {errors?.startTime && touched.startTime ? <ErrorText>{errors.startTime}</ErrorText> : null}
              </Grid>
              <Grid item>
                <Field name="endTime">
                  {() => (
                    <DateTimePicker
                      inputFormat="MM/DD/YYYY hh:mm a"
                      label={getIn(values, "endTime") ? "" : "End date"}
                      value={getIn(values, "endTime")}
                      onChange={(newValue: any) => {
                        setFieldValue("endTime", newValue.$d)
                      }}
                      components={{
                        OpenPickerIcon: DateRange
                      }}
                      renderInput={params => <CustomPicker InputLabelProps={{ shrink: false }} {...params} />}
                    />
                  )}
                </Field>
                {errors?.endTime && touched.endTime ? <ErrorText>{errors.endTime}</ErrorText> : null}
              </Grid>
            </ProposalContainer>
          ) : null}
        </Grid>
      </Grid>
    </PageContainer>
  )
}

export const ProposalCreator: React.FC = () => {
  const navigate = useHistory()
  const { network, account } = useTezos()
  const [tokenAddress, setTokenAddress] = useState<string>("")
  const openNotification = useNotification()

  const { id } = useParams<{
    id: string
  }>()

  useEffect(() => {
    async function fetchData() {
      const communityId = id.toString()
      await fetch(`${process.env.REACT_APP_API_URL}/token/${communityId}`).then(async response => {
        if (!response.ok) {
          const message = `An error has occurred: ${response.statusText}`
          console.log(message)
          return
        }

        const record = await response.json()
        if (!record) {
          console.log(`Record with id ${id} not found`)
          return
        }
        setTokenAddress(record.tokenAddress)
      })
    }
    fetchData()

    return
  }, [id, network])

  const initialState: Poll = {
    name: "",
    description: "",
    externalLink: "",
    choices: [""],
    startTime: "",
    endTime: "",
    daoID: "",
    author: account
  }

  const saveProposal = useCallback(
    async (values: Poll) => {
      const block = await getCurrentBlock(network)
      const total = await getTotalSupplyAtReferenceBlock(network, tokenAddress, block)

      const data = values
      data.daoID = id
      data.referenceBlock = String(block)
      data.totalSupplyAtReferenceBlock = total
      data.startTime = String(dayjs(values.startTime).valueOf())
      data.endTime = String(dayjs(values.endTime).valueOf())

      await fetch(`${process.env.REACT_APP_API_URL}/poll/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      })
        .then(async res => {
          openNotification({
            message: "Proposal created!",
            autoHideDuration: 3000,
            variant: "success"
          })
          navigate.push(`/explore/community/${id}`)
        })
        .catch(error => {
          openNotification({
            message: "Proposal could not be created",
            autoHideDuration: 3000,
            variant: "error"
          })
          console.log("entra en error", error)
          return
        })
    },
    [navigate, openNotification, id, network, tokenAddress]
  )

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
        onSubmit={saveProposal}
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
