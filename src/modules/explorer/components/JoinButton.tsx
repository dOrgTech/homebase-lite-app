import React, { useEffect, useState } from "react"
import { Button, styled, Typography } from "@material-ui/core"
import { useIsMembers } from "../hooks/useIsMember"
import { useNotification } from "modules/common/hooks/useNotification"
import { Community } from "models/Community"

const CustomButton = styled(Button)(({ theme }) => ({
  "width": 67,
  "height": 34,
  ".MuiButton-containedSecondary:hover": {
    backgroundColor: `${theme.palette.secondary.main} !important`
  }
}))

interface JoinButtonProps {
  account: string
  setIsUpdated?: any
  community: Community | undefined
}

export const JoinButton: React.FC<JoinButtonProps> = ({ account, setIsUpdated, community }) => {
  const isMember = useIsMembers(account, community?.members)
  const [hover, setHover] = useState(false)
  const openNotification = useNotification()

  const joinCommunity = async () => {
    let updatedArray = community?.members
    if (!isMember && updatedArray) {
      updatedArray.push(account)
    } else {
      updatedArray = updatedArray?.filter(elem => elem !== account)
    }
    await fetch(`${process.env.REACT_APP_API_URL}/update/${community?._id}`, {
      method: "POST",
      body: JSON.stringify(updatedArray),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() =>  {
      setIsUpdated(Math.random())
      openNotification({
        message: `You just ${!isMember ? 'joined' : 'left' } ${community?.name}!`,
        autoHideDuration: 3000,
        variant: "info"
      })
      }
    )
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
