import React from "react"
import { Avatar, styled } from "@mui/material"
import { Blockie } from "modules/common/Blockie"
import { useProfileClaim } from "services/tzprofiles/hooks/useProfileClaim"

const StyledAvatar = styled(Avatar)(({ size }: { size?: number }) => ({
  width: size || 40,
  height: size || 40
}))

type Props = { address: string; size?: number }

export const ProfileAvatar = (props: Props) => {
  const { address, size } = props

  const { data: profile } = useProfileClaim(address)

  return (
    <>
      {profile ? (
        <StyledAvatar alt={profile.credentialSubject.alias} src={profile.credentialSubject.logo} size={size} />
      ) : (
        <Blockie address={address} size={size} />
      )}
    </>
  )
}
