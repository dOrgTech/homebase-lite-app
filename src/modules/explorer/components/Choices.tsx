import React, { useState } from "react"
import { Button, Divider, Grid, IconButton, styled, Typography } from "@material-ui/core"
import { theme } from "theme"

import { AddCircleOutline } from "@material-ui/icons"
import { ChoiceItem } from "./ChoiceItem"

const ChoicesContainer = styled(Grid)(({ theme }) => ({
  height: "100%",
  background: theme.palette.primary.main,
  borderRadius: 8
}))

export const Choices: React.FC = () => {
  const [choices, setChoices] = useState([{ index: 1, description: "Choice 1" }])

  const handleNewChoice = () => {
    const currentChoices = [...choices]
    currentChoices.push({ index: 1, description: "Choice 1" })
    setChoices(currentChoices)
  }

  return (
    <ChoicesContainer container direction="column">
      <Grid item>
        <Typography variant={"body2"} color="secondary">
          Choices
        </Typography>
      </Grid>
      <Divider />

      {choices.map((choice, index) => (
        <ChoiceItem index={choice.index} description={choice.description} key={index} />
      ))}

      <Grid container alignItems={"center"} justifyContent={"space-between"}>
        <Grid
          container
          justifyContent={"center"}
          alignItems={"center"}
          style={{ gap: 10, cursor: "pointer" }}
          onClick={handleNewChoice}
        >
          <IconButton size="small">
            <AddCircleOutline htmlColor={theme.palette.secondary.main} />
          </IconButton>
          <Typography variant={"body2"} color={"secondary"}>
            Add Choice
          </Typography>
        </Grid>

        <Grid container justifyContent={"center"} alignItems={"center"} style={{ gap: 10 }}>
          <Button variant="contained" color="secondary">
            Publish
          </Button>
        </Grid>
      </Grid>
    </ChoicesContainer>
  )
}
