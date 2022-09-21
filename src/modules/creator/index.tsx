import React, { useEffect, useState } from "react"
import {
  Grid,
  TextField,
  styled,
  Typography,
  Checkbox,
  Button,
  useMediaQuery,
  useTheme,
  withStyles,
  withTheme,
  TextareaAutosize
} from "@material-ui/core"
import { UploadAvatar } from "./components/UploadAvatar"
import { BackButton } from "../common/BackButton"
import { Field, Form, Formik, FormikErrors, getIn } from "formik"
import { TextField as FormikTextField } from "formik-material-ui"
import { Community } from "models/Community"
import { useHistory } from "react-router"
import { validateContractAddress } from "@taquito/utils";
import { useTokenMetadata } from "services/contracts/baseDAO/hooks/useTokenMetadata"


const CommunityContainer = styled(Grid)(({ theme }) => ({
  boxSizing: "border-box",
  padding: "0px 15px",
  [theme.breakpoints.down("md")]: {
    marginTop: 30
  }
}))

const CommunityContainerBottom = styled(Grid)(({ theme }) => ({
  boxSizing: "border-box",
  padding: "0px 15px",
  [theme.breakpoints.down("md")]: {
    marginTop: 30
  },
  marginTop: 30
}))

const TitleContainer = styled(Grid)(({ theme }) => ({
  boxSizing: "border-box",
  padding: "0px 15px",
  [theme.breakpoints.down("md")]: {
    marginTop: 30
  },
  marginBottom: 26
}))

const AvatarContainer = styled(Grid)({
  height: "100%"
})

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

const MetadataContainer = styled(Grid)({
  margin: "-4px 0 16px 0",
});

const validateForm = (values: Community) => {
  const errors: FormikErrors<Community> = {}

  if (!values.name) {
    errors.name = "Required"
  }

  if (!values.token_address) {
    errors.token_address = "Required"
  }

  if (
    values.token_address &&
    validateContractAddress(values.token_address) !== 3
  ) {
    errors.token_address = "Invalid address"
  }

  return errors
}

const CommunityForm = ({ submitForm, values, setFieldValue, errors, touched, setFieldTouched }: any) => {
  const theme = useTheme()
  const isMobileSmall = useMediaQuery(theme.breakpoints.down("sm"))


  const {
    data: tokenMetadata,
    isLoading: loading,
    error,
  } = useTokenMetadata(
    values?.token_address
  );

  useEffect(() => {
    if (tokenMetadata) {
      setFieldValue("token_id", tokenMetadata.token_id);
    }

    if (error) {
      setFieldValue("token_id", undefined);
    }

    if (tokenMetadata) {
      setFieldValue("token_symbol", tokenMetadata.symbol);
    }

    if (error) {
      setFieldValue("token_symbol", undefined);
    }
  }, [error, setFieldValue, tokenMetadata]);

  return (
    <Grid container>
      <TitleContainer container direction="row">
        <Typography variant="subtitle1" color="textPrimary">
          Create a Community
        </Typography>
      </TitleContainer>
      <CommunityContainer container item direction={"column"} style={{ gap: 30 }} xs={12} md={6} lg={9}>
        <Grid item>
          <Field name="name" type="text" placeholder="Community Name*" component={CustomFormikTextField} />
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
          <Field name="link" type="text" placeholder="Link to Terms" component={CustomFormikTextField} />
        </Grid>
        <Grid item>
          <Field
            onClick={() => setFieldTouched("token_address")}
            name="token_address"
            type="text"
            placeholder="Token Contract Address*"
            component={CustomFormikTextField}
          />
          {tokenMetadata && !loading && (
            <MetadataContainer item xs={12}>
              <Typography variant="subtitle2" color="secondary">
                {tokenMetadata.name}
              </Typography>
            </MetadataContainer>
          )}
          {errors?.token_address && touched.token_address ? <ErrorText>{errors.token_address}</ErrorText> : null}

        </Grid>
      </CommunityContainer>
      <CommunityContainer container direction={"column"} style={{ gap: 30 }} item xs={12} md={6} lg={3}>
        <AvatarContainer container item>
          <UploadAvatar url={values.avatar_url} setFieldValue={setFieldValue} />
        </AvatarContainer>
      </CommunityContainer>

      <CommunityContainerBottom container justifyContent="space-between" spacing={isMobileSmall ? 4 : 1}>
        <Grid item container xs={12} md={4}>
          <Field name="token_symbol" type="text" placeholder="Token Symbol" component={CustomFormikTextField} />
        </Grid>
        <Grid item container xs={12} md={4}>
          <Field name="token_id" type="text" placeholder="Token ID" component={CustomFormikTextField} />
        </Grid>
        <Grid item container xs={12} md={4}>
          <Field name="token_standard" type="text" placeholder="Token Standard" component={CustomFormikTextField} />
        </Grid>
      </CommunityContainerBottom>

      <CommunityContainerBottom container direction="column">
        <Grid container direction="row" alignItems="center">
          <Field name="required_token">
            {() => (
              <Checkbox
                disableRipple
                checked={values.required_token}
                value={getIn(values, "required_token")}
                onChange={() => {
                  setFieldValue("required_token", !values.required_token)
                }}
              />
            )}
          </Field>
          <Typography variant="h2" color="textPrimary">
            Require token ownership to create proposals
          </Typography>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <Field name="allow_access">
            {() => (
              <Checkbox
                disableRipple
                checked={values.allow_access}
                value={getIn(values, "allow_access")}
                onChange={() => {
                  setFieldValue("allow_access", !values.allow_access)
                }}
              />
            )}
          </Field>
          <Typography variant="h2" color="textPrimary">
            Allow public read access to this community
          </Typography>
        </Grid>
      </CommunityContainerBottom>
      <CommunityContainerBottom>
        <Button variant="contained" color="secondary" onClick={() => submitForm(values)}>
          Create Community
        </Button>
      </CommunityContainerBottom>
    </Grid>
  )
}

export const CommunityCreator: React.FC = () => {
  const navigate = useHistory();

  const initialState: Community = {
    name: "",
    description: "",
    link: "",
    token_address: "",
    token_symbol: "",
    token_id: "",
    token_standard: "",
    avatar_url: "",
    required_token: false,
    allow_access: false
  }

  const saveCommunity = (values: Community, { setSubmitting }: { setSubmitting: (b: boolean) => void }) => {
    setSubmitting(true);

    navigate.push("/explore/communities");
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
              <CommunityForm
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
