/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useState } from "react"
import {
  Grid,
  styled,
  Typography,
  withStyles,
  withTheme,
  TextareaAutosize,
  Theme,
  useTheme,
  useMediaQuery,
  Avatar
} from "@material-ui/core"
import { BackButton } from "modules/common/BackButton"
import { Choices } from "modules/explorer/components/Choices"
import { useHistory, useParams } from "react-router-dom"
import { Field, Form, Formik, FormikErrors, getIn } from "formik"
import { TextField as FormikTextField } from "formik-material-ui"
import { DateTimePicker } from "@mui/x-date-pickers"
import TextField from "@mui/material/TextField"
import { DateRange } from "@material-ui/icons"
import { Poll } from "models/Polls"
import { useTezos } from "services/beacon/hooks/useTezos"
import { getSignature } from "services/utils"
import dayjs from "dayjs"
import { useNotification } from "modules/common/hooks/useNotification"
import duration from "dayjs/plugin/duration"
import { CommunityBadge } from "modules/explorer/components/CommunityBadge"
dayjs.extend(duration)

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

const CommunityLabel = styled(Grid)({
  minWidth: 212,
  height: 54,
  background: "#2F3438",
  borderRadius: 4,
  display: "inline-grid",
  marginBottom: 25,
  width: "fit-content",
  padding: 12
})

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

const hasDuplicates = (options: string[]) => {
  const trimOptions = options.map(option => option.trim())
  return new Set(trimOptions).size !== trimOptions.length
}

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

  if (values.choices.length > 0 && hasDuplicates(values.choices)) {
    errors.choices = "Duplicate options are not allowed"
  }

  if (!values.startTime) {
    errors.startTime = "Required"
  }

  if (values.startTime && dayjs().diff(values.startTime) > 0) {
    values.startTime = dayjs().toISOString()
  }

  if (!values.endTime) {
    errors.endTime = "Required"
  }

  if (values.startTime && values.endTime) {
    if (dayjs(values.startTime).isAfter(dayjs(values.endTime))) {
      errors.startTime = "Start date must be before end date"
    }

    if (dayjs(values.startTime).isBefore(dayjs(values.endTime))) {
      const result = dayjs(values.endTime).diff(dayjs(values.startTime), "minute")
      result < 5 ? (errors.startTime = `Can't allow less than 5 minutes for voting`) : null
    }
  }
  return errors
}

export const ProposalForm = ({
  submitForm,
  values,
  setFieldValue,
  errors,
  touched,
  isSubmitting,
  setFieldTouched
}: any) => {
  const theme = useTheme()
  const isMobileSmall = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <PageContainer>
      <Grid container>
        <Header container direction="column">
          <CommunityLabel container direction="row" justifyContent="center" alignItems="center">
            <CommunityBadge />
          </CommunityLabel>
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
                        // label={getIn(values, "startTime") ? "" : "Start date"}
                        value={getIn(values, "startTime")}
                        onChange={(newValue: any) => {
                          if (newValue) {
                            setFieldValue("startTime", newValue.$d)
                            setFieldTouched("startTime")
                          }
                        }}
                        components={{
                          OpenPickerIcon: DateRange
                        }}
                        renderInput={params => <CustomPicker InputLabelProps={{ shrink: false }} {...params} />}
                        minDateTime={dayjs()}
                        maxDateTime={getIn(values, "endTime") ? getIn(values, "endTime") : dayjs().add(2, "w")}
                        disableIgnoringDatePartForTimeValidation={true}
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
                          if (newValue) {
                            setFieldValue("endTime", newValue.$d)
                            setFieldTouched("endTime")
                          }
                        }}
                        components={{
                          OpenPickerIcon: DateRange
                        }}
                        renderInput={params => <CustomPicker InputLabelProps={{ shrink: false }} {...params} />}
                        minDate={getIn(values, "startTime")}
                        maxDateTime={dayjs().add(2, "w")}
                        disablePast
                        disableIgnoringDatePartForTimeValidation={true}
                      />
                    )}
                  </Field>
                  {errors?.endTime && touched.endTime ? <ErrorText>{errors.endTime}</ErrorText> : null}
                </Grid>
              </>
            ) : null}
            <ProposalChoices>
              <Choices choices={getIn(values, "choices")} isLoading={isSubmitting} submitForm={submitForm} />
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
                        if (newValue) {
                          setFieldValue("startTime", newValue.$d)
                          setFieldTouched("startTime")
                        }
                      }}
                      components={{
                        OpenPickerIcon: DateRange
                      }}
                      renderInput={params => <CustomPicker InputLabelProps={{ shrink: false }} {...params} />}
                      minTime={dayjs()}
                      minDateTime={dayjs()}
                      maxDateTime={getIn(values, "endTime") ? getIn(values, "endTime") : dayjs().add(2, "w")}
                      disableIgnoringDatePartForTimeValidation={true}
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
                        if (newValue) {
                          setFieldValue("endTime", newValue.$d)
                          setFieldTouched("endTime")
                        }
                      }}
                      components={{
                        OpenPickerIcon: DateRange
                      }}
                      renderInput={params => <CustomPicker InputLabelProps={{ shrink: false }} {...params} />}
                      minDate={getIn(values, "startTime")}
                      maxDateTime={dayjs().add(2, "w")}
                      disablePast
                      disableIgnoringDatePartForTimeValidation={true}
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
  const { network, account, wallet } = useTezos()
  const [tokenAddress, setTokenAddress] = useState<string>("")
  const openNotification = useNotification()
  const [isLoading, setIsLoading] = useState(false)

  const { id } = useParams<{
    id: string
  }>()

  useEffect(() => {
    async function fetchData() {
      const communityId = id.toString()
      await fetch(`${process.env.REACT_APP_API_URL}/token/${communityId}`).then(async response => {
        if (!response.ok) {
          openNotification({
            message: "An error has occurred",
            autoHideDuration: 2000,
            variant: "error"
          })
          return
        }

        const record = await response.json()
        if (!record) {
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
    startTime: dayjs().toISOString(),
    endTime: "",
    daoID: "",
    author: account
  }

  const saveProposal = useCallback(
    async (values: Poll) => {
      setIsLoading(true)
      if (!wallet) {
        return
      }

      const data = values
      data.daoID = id
      data.endTime = String(dayjs(values.endTime).valueOf())
      data.startTime = String(dayjs().valueOf())

      const { signature, payloadBytes } = await getSignature(account, wallet, JSON.stringify(data))
      const publicKey = (await wallet?.client.getActiveAccount())?.publicKey
      if (!signature) {
        openNotification({
          message: `Issue with Signature`,
          autoHideDuration: 3000,
          variant: "error"
        })
        return
      }

      await fetch(`${process.env.REACT_APP_API_URL}/poll/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          signature,
          publicKey,
          payloadBytes
        })
      })
        .then(async res => {
          if (res.ok) {
            openNotification({
              message: "Proposal created!",
              autoHideDuration: 3000,
              variant: "success"
            })
            setIsLoading(false)
            navigate.push(`/explorer/community/${id}`)
          } else {
            openNotification({
              message: "Proposal could not be created",
              autoHideDuration: 3000,
              variant: "error"
            })
            setIsLoading(false)
            return
          }
        })
        .catch(err => {
          openNotification({
            message: "Proposal could not be created",
            autoHideDuration: 3000,
            variant: "error"
          })
          setIsLoading(false)
          return
        })
    },
    [navigate, id, network, tokenAddress]
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
                isSubmitting={isLoading}
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
