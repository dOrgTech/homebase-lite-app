import React, { useEffect, useState } from "react"
import { Button, styled, Typography } from "@material-ui/core"
import { useIsMembers } from "../hooks/useIsMember"

const CustomButton = styled(Button)(({ theme }) => ({
  "width": 67,
  "height": 34,
  ".MuiButton-containedSecondary:hover": {
    backgroundColor: `${theme.palette.secondary.main} !important`
  }
}))

interface JoinButtonProps {
  account: string
  members: string[]
  setIsUpdated?: any
  communityId: string
}

export const JoinButton: React.FC<JoinButtonProps> = ({ account, members, setIsUpdated, communityId }) => {
  const isMember = useIsMembers(account, members)
  const [hover, setHover] = useState(false)

  const joinCommunity = async () => {
    let updatedArray = members
    if (!isMember && updatedArray) {
      updatedArray.push(account)
    } else {
      updatedArray = updatedArray?.filter(elem => elem !== account)
    }
    await fetch(`${process.env.REACT_APP_API_URL}/update/${communityId}`, {
      method: "POST",
      body: JSON.stringify(updatedArray),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() =>  setIsUpdated(Math.random()))
  }

  return (
    <CustomButton
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      variant="contained"
      color={!isMember ? "secondary" : "inherit"}
      size="small"
      onClick={e => {
        joinCommunity()
        if (!e) {
          const e = window.event
          if (e) {
            e.cancelBubble = true
          }
        }
        if (e.stopPropagation) e.stopPropagation()
      }}
    >
      {isMember && hover ? "Leave" : isMember && !hover ? "Joined" : !isMember ? "Join" : ""}
    </CustomButton>
  )
}
