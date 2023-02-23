import React, { useState } from "react"
import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  InputAdornment,
  Radio,
  styled,
  Typography,
  useMediaQuery,
  withStyles
} from "@material-ui/core"
import { theme } from "theme"

import { AddCircleOutline, RemoveCircleOutline } from "@material-ui/icons"
import { FieldArray, Field } from "formik"
import { TextField as FormikTextField } from "formik-material-ui"

const ChoicesContainer = styled(Grid)(({ theme }) => ({
  paddingBottom: 19,
  background: theme.palette.primary.main,
  borderRadius: 4
}))

const RemoveCircle = styled(RemoveCircleOutline)(({ theme }) => ({
  color: theme.palette.error.main,
  cursor: "pointer"
}))

const Title = styled(Grid)(({ theme }) => ({
  paddingLeft: 26,
  paddingRight: 26,
  paddingTop: 19,
  paddingBottom: 19,
  borderBottom: `0.3px solid ${theme.palette.primary.light}`,
  marginTop: "0px !important"
}))

const ChoiceText = styled(Typography)({
  fontWeight: 300,
  fontSize: 17
})

const StrategyText = styled(Typography)({
  marginBottom: 10
})

const VotingContainer = styled(Grid)(({ theme }) => ({
  background: theme.palette.primary.main,
  borderRadius: 4,
  padding: "19px 26px",
  paddingBottom: 0,
  [theme.breakpoints.down("sm")]: {
    paddingBottom: 14
  }
}))

const CustomFormikTextField = withStyles({
  root: {
    "& .MuiInput-root": {
      fontWeight: 300,
      textAlign: "initial",
      borderBottom: `0.3px solid ${theme.palette.primary.light} !important`,
      marginTop: "0px !important",
      paddingRight: 24
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

export const Choices: React.FC<any> = ({ choices, submitForm, isLoading, votingStrategy, setFieldValue }) => {
  const isMobileExtraSmall = useMediaQuery(theme.breakpoints.down("sm"))

  return (
    <Grid container direction="column" style={{ gap: 30 }}>
      <VotingContainer container direction="column">
        <Grid item>
          <StrategyText color="textPrimary" variant={"body2"}>
            Voting strategy{" "}
          </StrategyText>
        </Grid>
        <Grid item>
          <Grid container direction={isMobileExtraSmall ? "column" : "row"}>
            <Grid item container direction="row" xs={isMobileExtraSmall ? 12 : 6} alignItems="center">
              <Field name="votingStrategy">
                {() => (
                  <Radio
                    checked={Number(votingStrategy) === 0}
                    value={0}
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                    onClick={() => setFieldValue("votingStrategy", 0)}
                  />
                )}
              </Field>
              <ChoiceText color="textPrimary">Single choice</ChoiceText>
            </Grid>

            <Grid item container direction="row" xs={isMobileExtraSmall ? 12 : 6} alignItems="center">
              <Field name="votingStrategy">
                {() => (
                  <Radio
                    checked={Number(votingStrategy) === 1}
                    value={1}
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                    onClick={() => setFieldValue("votingStrategy", 1)}
                  />
                )}
              </Field>
              <ChoiceText color="textPrimary">Multiple choice</ChoiceText>
            </Grid>
          </Grid>
        </Grid>
      </VotingContainer>

      <ChoicesContainer container direction="column">
        <Title item>
          <Typography variant={"body2"} color="textPrimary">
            Set Poll Options
          </Typography>
        </Title>

        <FieldArray
          name="choices"
          render={arrayHelpers => (
            <div>
              {choices && choices.length > 0
                ? choices.map((choice: any, index: number) => (
                    <div key={index}>
                      <Field
                        type="text"
                        name={`choices[${index}]`}
                        placeholder={`Choice ${index + 1}`}
                        component={CustomFormikTextField}
                        InputProps={{
                          endAdornment:
                            index + 1 === choices.length ? (
                              <InputAdornment position="start">
                                <RemoveCircle
                                  onClick={() => {
                                    if (index !== 0) {
                                      arrayHelpers.remove(index)
                                    }
                                  }}
                                />
                              </InputAdornment>
                            ) : null
                        }}
                      />
                    </div>
                  ))
                : null}
              <div>
                <Grid
                  container
                  alignItems={"center"}
                  style={{ gap: 10, cursor: "pointer", paddingLeft: 16, paddingTop: 12 }}
                  onClick={() => arrayHelpers.insert(choices.length, "")}
                >
                  <IconButton size="small">
                    <AddCircleOutline htmlColor={theme.palette.secondary.main} />
                  </IconButton>
                  <Typography variant={"body2"} color={"secondary"}>
                    Add Choice
                  </Typography>
                </Grid>
              </div>
            </div>
          )}
        />
      </ChoicesContainer>
      <Grid container style={{ gap: 10, marginTop: 31 }}>
        {!isLoading ? (
          <Button variant="contained" color="secondary" onClick={submitForm}>
            Create Proposal
          </Button>
        ) : (
          <CircularProgress color="secondary" />
        )}
      </Grid>
    </Grid>
  )
}
