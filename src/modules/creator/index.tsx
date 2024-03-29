/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react"
import {
  Grid,
  styled,
  Typography,
  Checkbox,
  Button,
  useMediaQuery,
  useTheme,
  withStyles,
  withTheme,
  TextareaAutosize,
  CircularProgress
} from "@material-ui/core"
import { UploadAvatar } from "./components/UploadAvatar"
import { BackButton } from "../common/BackButton"
import { Field, Form, Formik, FormikErrors, getIn } from "formik"
import { TextField as FormikTextField } from "formik-material-ui"
import { Community } from "models/Community"
import { useHistory } from "react-router"
import { validateContractAddress } from "@taquito/utils"
import { useTokenMetadata } from "services/hooks/useTokenMetadata"
import { useNotification } from "modules/common/hooks/useNotification"
import { useTezos } from "services/beacon/hooks/useTezos"
import { getSignature } from "services/utils"

const CommunityContainer = styled(Grid)(({ theme }) => ({
  boxSizing: "border-box",
  padding: "0px 15px",
  [theme.breakpoints.down("md")]: {
    marginTop: 0
  }
}))

const AvatarCommunityContainer = styled(Grid)(({ theme }) => ({
  boxSizing: "border-box",
  padding: "0px 15px",
  [theme.breakpoints.down("sm")]: {
    marginTop: 30
  }
}))

const CommunityContainerBottom = styled(Grid)(({ theme }) => ({
  boxSizing: "border-box",
  padding: "0px 15px",
  [theme.breakpoints.down("sm")]: {
    marginTop: 30,
    gap: 12
  },
  marginTop: 30
}))

const TitleContainer = styled(Grid)(({ theme }) => ({
  boxSizing: "border-box",
  padding: "0px 15px",
  [theme.breakpoints.down("md")]: {
    marginTop: 0
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

const CustomSelect = styled(Field)(({ theme }) => ({
  width: "100%",
  background: theme.palette.primary.main,
  border: "none",
  color: theme.palette.text.secondary,
  fontFamily: "Roboto Mono",
  fontSize: 18,
  paddingLeft: 26,
  borderRight: "26px solid transparent",
  borderRadius: 4,
  minHeight: 72
}))

const ErrorText = styled(Typography)({
  fontSize: 14,
  color: "red",
  marginBottom: -21,
  marginTop: 2
})

const MetadataContainer = styled(Grid)({
  marginTop: 5,
  marginBottom: -20
})

const CheckboxContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("xs")]: {
    maxWidth: "16.666667%",
    flexBasis: "16.666667%"
  },
  maxwidth: "5%",
  flexBasis: "5%"
}))

const validateForm = (values: Community) => {
  const errors: FormikErrors<Community> = {}

  if (!values.name) {
    errors.name = "Required"
  }

  if (!values.tokenAddress) {
    errors.tokenAddress = "Required"
  }

  if (values.tokenAddress && validateContractAddress(values.tokenAddress) !== 3) {
    errors.tokenAddress = "Invalid address"
  }

  return errors
}

const CommunityForm = ({ submitForm, values, setFieldValue, errors, touched, setFieldTouched, isSubmitting }: any) => {
  const theme = useTheme()
  const isMobileSmall = useMediaQuery(theme.breakpoints.down("sm"))

  const { data: tokenMetadata, isLoading: loading, error } = useTokenMetadata(values?.tokenAddress)

  useEffect(() => {
    if (tokenMetadata) {
      setFieldValue("tokenID", tokenMetadata.tokenId)
      setFieldValue("tokenType", tokenMetadata.standard)
      setFieldValue("symbol", tokenMetadata.metadata.symbol)
      setFieldValue("decimals", tokenMetadata.metadata.decimals)
    }

    if (error) {
      setFieldValue("tokenID", undefined)
      setFieldValue("tokenType", undefined)
      setFieldValue("symbol", undefined)
    }
  }, [error, setFieldValue, tokenMetadata])

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
                disabled={isSubmitting}
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
          <Field name="linkToTerms" type="text" placeholder="Link to Terms" component={CustomFormikTextField} />
        </Grid>
        <Grid item>
          <Field
            onClick={() => setFieldTouched("tokenAddress")}
            name="tokenAddress"
            type="text"
            placeholder="Token Contract Address*"
            component={CustomFormikTextField}
          />
          {tokenMetadata && !loading && (
            <MetadataContainer item xs={12}>
              <Typography variant="subtitle2" color="secondary">
                {tokenMetadata.metadata.name}
              </Typography>
            </MetadataContainer>
          )}
          {errors?.tokenAddress && touched.tokenAddress ? <ErrorText>{errors.tokenAddress}</ErrorText> : null}
        </Grid>
      </CommunityContainer>
      <AvatarCommunityContainer container direction={"column"} style={{ gap: 30 }} item xs={12} md={6} lg={3}>
        <AvatarContainer container item>
          <UploadAvatar url={values.picUri} setFieldValue={setFieldValue} disabled={isSubmitting} />
        </AvatarContainer>
      </AvatarCommunityContainer>

      <CommunityContainerBottom container justifyContent="space-between" spacing={isMobileSmall ? 4 : 1}>
        <Grid item container xs={12} md={4}>
          <Field name="symbol" type="text" placeholder="Token Symbol" component={CustomFormikTextField} />
        </Grid>
        <Grid item container xs={12} md={4}>
          <Field name="tokenID" type="text" placeholder="Token ID" component={CustomFormikTextField} />
        </Grid>
        <Grid item container xs={12} md={4}>
          <Field name="tokenType">
            {() => (
              <CustomSelect
                disabled={isSubmitting}
                as="select"
                name={getIn(values, "tokenType")}
                label="Token Standard"
                onChange={(newValue: any) => {
                  setFieldValue("tokenType", newValue.target.value)
                }}
              >
                <option value={"fa2"}>FA2</option>
                <option value={"nft"}>NFT</option>
              </CustomSelect>
            )}
          </Field>
        </Grid>
      </CommunityContainerBottom>

      <CommunityContainerBottom container direction="column">
        <Grid container direction="row" alignItems="center">
          <CheckboxContainer item xs={2}>
            <Field name="requiredTokenOwnership">
              {() => (
                <Checkbox
                  disableRipple
                  checked={values.requiredTokenOwnership}
                  value={getIn(values, "requiredTokenOwnership")}
                  inputProps={{
                    "aria-label": "Checkbox A"
                  }}
                  onChange={() => {
                    setFieldValue("requiredTokenOwnership", !values.requiredTokenOwnership)
                  }}
                />
              )}
            </Field>
          </CheckboxContainer>
          <Grid item xs>
            <Typography variant="h2" color="textPrimary">
              Require token ownership to create proposals
            </Typography>
          </Grid>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <CheckboxContainer item xs={2}>
            <Field name="allowPublicAccess">
              {() => (
                <Checkbox
                  disableRipple
                  checked={values.allowPublicAccess}
                  value={getIn(values, "allowPublicAccess")}
                  inputProps={{
                    "aria-label": "Checkbox B"
                  }}
                  onChange={() => {
                    setFieldValue("allowPublicAccess", !values.allowPublicAccess)
                  }}
                />
              )}
            </Field>
          </CheckboxContainer>
          <Grid item xs>
            <Typography variant="h2" color="textPrimary">
              Allow public read access to this community
            </Typography>
          </Grid>
        </Grid>
      </CommunityContainerBottom>
      <CommunityContainerBottom container direction="row">
        {isSubmitting ? (
          <CircularProgress color="secondary" />
        ) : (
          <Button variant="contained" color="secondary" onClick={() => submitForm(values)}>
            Create Community
          </Button>
        )}
      </CommunityContainerBottom>
    </Grid>
  )
}

export const CommunityCreator: React.FC = () => {
  const navigate = useHistory()
  const { network, account, wallet } = useTezos()
  const openNotification = useNotification()

  const initialState: Community = {
    name: "",
    description: "",
    linkToTerms: "",
    picUri: "",
    members: [],
    polls: [],
    tokenAddress: "",
    symbol: "",
    tokenID: "",
    tokenType: "FA2",
    requiredTokenOwnership: false,
    allowPublicAccess: false,
    network
  }

  const saveCommunity = useCallback(
    async (values: Community) => {
      if (!wallet) {
        return
      }
      
      values.members.push(account)

      const { signature, payloadBytes } = await getSignature(account, wallet, JSON.stringify(values))
      const publicKey = (await wallet?.client.getActiveAccount())?.publicKey
      if (!signature) {
        openNotification({
          message: `Issue with Signature`,
          autoHideDuration: 3000,
          variant: "error"
        })
        return
      }

      await fetch(`${process.env.REACT_APP_API_URL}/dao/add`, {
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
              message: "Community created!",
              autoHideDuration: 3000,
              variant: "success"
            })
            navigate.push("/explorer/communities")
          } else {
            openNotification({
              message: "Community could not be created!",
              autoHideDuration: 3000,
              variant: "error"
            })
            return
          }
        })
        .catch(error => {
          openNotification({
            message: "Community could not be created!",
            autoHideDuration: 3000,
            variant: "error"
          })
          return
        })
    },
    [navigate]
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
