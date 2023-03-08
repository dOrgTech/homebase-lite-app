/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
  },
  "resize": "none"
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

const ErrorTextTime = styled(Typography)({
  marginTop: -18,
  marginBottom: 0,
  fontSize: 14,
  color: "red"
})

const ErrorTextChoices = styled(Typography)({
  fontSize: 14,
  color: "red",
  marginBottom: -21,
  marginTop: -86
})

const TimeBox = styled(Grid)(({ theme }) => ({
  background: theme.palette.primary.dark,
  borderRadius: 8,
  width: 72,
  minHeight: 59,
  marginBottom: 16,
  display: "grid",
  [theme.breakpoints.down("sm")]: {
    "width": 172,
    "& input": {
      marginLeft: "30%"
    }
  }
}))

const TimeText = styled(Typography)({
  marginTop: -20,
  marginLeft: 16
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

  if (values.endTimeMinutes !== undefined && values.endTimeDays !== undefined && values.endTimeHours !== undefined) {
    if (values.endTimeMinutes !== null && values.endTimeDays !== null && values.endTimeHours !== null) {
      if (values.endTimeMinutes < 5 && values.endTimeDays === 0 && values.endTimeHours === 0) {
        errors.endTimeMinutes = `Can't allow less than 5 minutes for voting`
      }
    }
  }
  if (values.endTimeDays === null || values.endTimeDays === undefined) {
    errors.endTimeDays = "Required"
  }

  if (values.endTimeHours === null || values.endTimeHours === undefined) {
    errors.endTimeHours = "Required"
  }

  if (values.endTimeMinutes === null || values.endTimeMinutes === undefined) {
    errors.endTimeMinutes = "Required"
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
        <Grid container direction={isMobileSmall ? "row" : "column"} style={{ gap: 90 }}>
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
              <Grid item>
                <Typography color="textSecondary" variant={"body2"} style={{ marginBottom: 20 }}>
                  Voting Duration:{" "}
                </Typography>
                <Grid item container direction="row" alignItems="center">
                  <TimeBox item>
                    <Field
                      style={{ margin: "auto" }}
                      id="outlined-basic"
                      name="endTimeDays"
                      type="number"
                      placeholder="0"
                      component={CustomFormikTextField}
                      inputProps={{ min: 0 }}
                      onClick={() => {
                        if (getIn(values, "endTimeDays") === 0) {
                          setFieldValue("endTimeDays", "")
                          setFieldTouched("endTimeDays")
                        }
                      }}
                      onChange={(newValue: any) => {
                        if (newValue.target.value === "") {
                          setFieldValue("endTimeDays", "")
                        } else {
                          setFieldValue("endTimeDays", parseInt(newValue.target.value, 10))
                        }
                      }}
                    />
                  </TimeBox>
                  <TimeText color="textSecondary">days</TimeText>
                </Grid>
                {errors?.endTimeDays && touched.endTimeDays ? (
                  <ErrorTextTime>{errors.endTimeDays}</ErrorTextTime>
                ) : null}
                <Grid item container direction="row" alignItems="center">
                  <TimeBox item>
                    <Field
                      style={{ margin: "auto" }}
                      id="outlined-basic"
                      name="endTimeHours"
                      type="number"
                      placeholder="0"
                      component={CustomFormikTextField}
                      inputProps={{ min: 0 }}
                      onClick={() => {
                        if (getIn(values, "endTimeHours") === 0) {
                          setFieldValue("endTimeHours", "")
                        }
                      }}
                      onChange={(newValue: any) => {
                        if (newValue.target.value === "") {
                          setFieldValue("endTimeHours", "")
                        } else {
                          setFieldValue("endTimeHours", parseInt(newValue.target.value, 10))
                        }
                      }}
                    />
                  </TimeBox>
                  <TimeText color="textSecondary">hours</TimeText>
                </Grid>
                {errors?.endTimeHours && touched.endTimeHours ? (
                  <ErrorTextTime>{errors.endTimeHours}</ErrorTextTime>
                ) : null}
                <Grid item container direction="row" alignItems="center">
                  <TimeBox item>
                    <Field
                      style={{ margin: "auto" }}
                      id="outlined-basic"
                      name="endTimeMinutes"
                      type="number"
                      placeholder="0"
                      component={CustomFormikTextField}
                      inputProps={{ min: 0 }}
                      onClick={() => {
                        if (getIn(values, "endTimeMinutes") === 0) {
                          setFieldValue("endTimeMinutes", "")
                        }
                      }}
                      onChange={(newValue: any) => {
                        if (newValue.target.value === "") {
                          setFieldValue("endTimeMinutes", "")
                        } else {
                          setFieldValue("endTimeMinutes", parseInt(newValue.target.value, 10))
                        }
                      }}
                    />
                  </TimeBox>
                  <TimeText color="textSecondary">minutes</TimeText>
                </Grid>
                {errors?.endTimeMinutes && touched.endTimeMinutes ? (
                  <ErrorTextTime>{errors.endTimeMinutes}</ErrorTextTime>
                ) : null}
              </Grid>
            ) : null}
            <ProposalChoices>
              <Choices
                choices={getIn(values, "choices")}
                isLoading={isSubmitting}
                submitForm={submitForm}
                votingStrategy={getIn(values, "votingStrategy")}
                setFieldValue={setFieldValue}
              />
              {errors?.choices && touched.choices ? <ErrorTextChoices>{errors.choices}</ErrorTextChoices> : null}
            </ProposalChoices>
          </ProposalContainer>

          {!isMobileSmall ? (
            <Grid container item direction={"column"} style={{ gap: 10 }} xs={12} md={6} lg={4}>
              <Typography color="textSecondary" variant={"body2"} style={{ marginBottom: 20 }}>
                Voting Duration:{" "}
              </Typography>
              <Grid item container direction="row" alignItems="center">
                <TimeBox item>
                  <Field
                    style={{ margin: "auto" }}
                    id="outlined-basic"
                    name="endTimeDays"
                    type="number"
                    placeholder="0"
                    component={CustomFormikTextField}
                    inputProps={{ min: 0 }}
                    onClick={() => {
                      if (getIn(values, "endTimeDays") === 0) {
                        setFieldValue("endTimeDays", "")
                        setFieldTouched("endTimeDays")
                      }
                    }}
                    onChange={(newValue: any) => {
                      if (newValue.target.value === "") {
                        setFieldValue("endTimeDays", "")
                      } else {
                        setFieldValue("endTimeDays", parseInt(newValue.target.value, 10))
                      }
                    }}
                  />
                </TimeBox>
                <TimeText color="textSecondary">days</TimeText>
              </Grid>
              {errors?.endTimeDays && touched.endTimeDays ? <ErrorTextTime>{errors.endTimeDays}</ErrorTextTime> : null}
              <Grid item container direction="row" alignItems="center">
                <TimeBox item>
                  <Field
                    style={{ margin: "auto" }}
                    id="outlined-basic"
                    name="endTimeHours"
                    type="number"
                    placeholder="0"
                    component={CustomFormikTextField}
                    inputProps={{ min: 0 }}
                    onClick={() => {
                      if (getIn(values, "endTimeHours") === 0) {
                        setFieldValue("endTimeHours", "")
                      }
                    }}
                    onChange={(newValue: any) => {
                      if (newValue.target.value === "") {
                        setFieldValue("endTimeHours", "")
                      } else {
                        setFieldValue("endTimeHours", parseInt(newValue.target.value, 10))
                      }
                    }}
                  />
                </TimeBox>
                <TimeText color="textSecondary">hours</TimeText>
              </Grid>
              {errors?.endTimeHours && touched.endTimeHours ? (
                <ErrorTextTime>{errors.endTimeHours}</ErrorTextTime>
              ) : null}
              <Grid item container direction="row" alignItems="center">
                <TimeBox item>
                  <Field
                    style={{ margin: "auto" }}
                    id="outlined-basic"
                    name="endTimeMinutes"
                    type="number"
                    placeholder="0"
                    component={CustomFormikTextField}
                    inputProps={{ min: 0 }}
                    onClick={() => {
                      if (getIn(values, "endTimeMinutes") === 0) {
                        setFieldValue("endTimeMinutes", "")
                      }
                    }}
                    onChange={(newValue: any) => {
                      if (newValue.target.value === "") {
                        setFieldValue("endTimeMinutes", "")
                      } else {
                        setFieldValue("endTimeMinutes", parseInt(newValue.target.value, 10))
                      }
                    }}
                  />
                </TimeBox>
                <TimeText color="textSecondary">minutes</TimeText>
              </Grid>
              {errors?.endTimeMinutes && touched.endTimeMinutes ? (
                <ErrorTextTime>{errors.endTimeMinutes}</ErrorTextTime>
              ) : null}
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </PageContainer>
  )
}

const calculateEndTime = (days: number, hours: number, minutes: number) => {
  const time = dayjs().add(days, "days").add(hours, "hours").add(minutes, "minutes")
  return String(time.valueOf())
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
    author: account,
    votingStrategy: 0,
    endTimeDays: 3,
    endTimeHours: 0,
    endTimeMinutes: 0
  }

  const saveProposal = useCallback(
    async (values: Poll) => {
      setIsLoading(true)
      if (!wallet) {
        return
      }

      const data = values
      data.daoID = id
      data.startTime = String(dayjs().valueOf())
      data.endTime = calculateEndTime(values.endTimeDays!, values.endTimeHours!, values.endTimeMinutes!)

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
