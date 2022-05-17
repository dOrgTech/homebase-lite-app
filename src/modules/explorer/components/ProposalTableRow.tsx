import React from "react"
import { useNavigate } from "react-router-dom"
import { styled, Grid, Typography, useTheme, useMediaQuery } from "@mui/material"
import {
  CancelOutlined,
  CheckCircleOutlined,
  PauseCircleOutline,
  PlayCircleOutlineOutlined,
  RemoveCircleOutline
} from "@mui/icons-material"
import { ProposalStatus, TableStatusBadge } from "./ProposalTableRowStatusBadge"
import { RowContainer } from "./tables/RowContainer"

const ArrowContainer = styled(Grid)(({ theme }) => ({
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    display: "none"
  }
}))

const StatusText = styled(Typography)({
  textTransform: "uppercase",
  marginLeft: 10,
  marginRight: 30
})

const ArrowInfo = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    marginTop: 15
  }
}))

export interface ProposalTableRowData {
  daoId?: string
  id: string
}

type Props = { proposal: ProposalStatus }

export const ProposalTableRow = (props: Props) => {
  const { proposal } = props
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  return (
    <RowContainer item container alignItems="center" onClick={() => navigate("/explorer/communities/1/proposal/1")}>
      <Grid container style={{ gap: 26 }} xs={12} md={9} justifyContent={isMobile ? "center" : "flex-start"}>
        <Typography variant="h4" color="textSecondary" align={isMobile ? "center" : "left"}>
          Contribute to the fund
        </Typography>

        <Grid
          container
          direction={isMobile ? "column" : "row"}
          alignItems={isMobile ? "center" : "flex-start"}
          wrap="nowrap"
          style={{ gap: 32 }}
        >
          <TableStatusBadge status={proposal} />
          <ArrowInfo color="textSecondary"> Created by 888f...88d8 </ArrowInfo>
        </Grid>
      </Grid>
      <ArrowContainer item md={3} container direction="row" alignItems="center" justifyContent="flex-end">
        {status === ProposalStatus.ACTIVE ? <PlayCircleOutlineOutlined htmlColor="#FFC839" fontSize="large" /> : null}
        {status === ProposalStatus.PENDING ? (
          <PauseCircleOutline htmlColor="rgba(56, 102, 249)" fontSize="large" />
        ) : null}
        {status === ProposalStatus.PASSED ? <CheckCircleOutlined fontSize="large" color="secondary" /> : null}
        {status === ProposalStatus.NO_QUORUM ? (
          <RemoveCircleOutline fontSize="large" htmlColor="rgb(61, 61, 61)" />
        ) : null}
        {status === ProposalStatus.EXECUTED ? <CheckCircleOutlined fontSize="large" color="secondary" /> : null}
        {status === ProposalStatus.EXPIRED ? <CancelOutlined fontSize="large" htmlColor="rgb(61, 61, 61)" /> : null}
        {status === ProposalStatus.REJECTED ? <CancelOutlined fontSize="large" color="error" /> : null}
        {status === ProposalStatus.DROPPED ? <CancelOutlined fontSize="large" color="error" /> : null}
        <StatusText color="textSecondary">{status}</StatusText>
      </ArrowContainer>
    </RowContainer>
  )
}
