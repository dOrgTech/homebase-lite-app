import React from "react"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
  Typography,
  Button,
  Grid
} from "@material-ui/core"
import { toShortAddress } from "services/contracts/utils"
import { FileCopyOutlined } from "@material-ui/icons"

const CustomContent = styled(DialogContent)({
  padding: "0px 54px 22px 54px !important"
})

const CopyIcon = styled(FileCopyOutlined)({
  marginLeft: 8,
  cursor: "pointer"
})

const CustomTitle = styled(Typography)(({ theme }) => ({
  borderBottom: `0.3px solid ${theme.palette.primary.light}`,
  paddingBottom: 16
}))

export const VotesDialog: React.FC<{ open: boolean; handleClose: any }> = ({ open, handleClose }) => {
  const descriptionElementRef = React.useRef<HTMLElement>(null)
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  return (
    <div>
      <Dialog
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">
          {" "}
          <CustomTitle color="textPrimary" variant="body2">
            30 Votes:
          </CustomTitle>
        </DialogTitle>
        <CustomContent>
          <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
            {[...Array(30).keys()].map(elem => (
              <Grid container direction="row" alignItems="baseline" key={elem}>
                <Grid item xs={6} md={4} lg={4} xl={4} key={elem} container direction="row" alignItems="center">
                  <Typography> {toShortAddress("tz1bQgEea45ciBpYdFj4y4P3hNyDM8aMF6WB")}</Typography>
                  <CopyIcon color="secondary" fontSize="inherit" />
                </Grid>
                <Grid item xs={6} md={4} lg={4} xl={4} key={elem} container justifyContent="center">
                  <Typography variant="body1"> Choice 1 </Typography>
                </Grid>
                <Grid item xs={6} md={4} lg={4} xl={4} key={elem} container justifyContent="center">
                  <Typography variant="body1"> 14290 TKN </Typography>
                </Grid>
              </Grid>
            ))}
          </DialogContentText>
        </CustomContent>
        <DialogActions>
          <Button variant="contained" color="secondary" onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
