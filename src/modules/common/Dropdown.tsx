import React, { useEffect, useState } from "react"
import { Select, SelectProps, MenuItem, makeStyles } from "@material-ui/core"
import { Theme } from "@mui/material"

interface DropdownProps extends SelectProps {
  options: { name: string; value: string | undefined }[]
  value?: string | undefined
  onSelected?: (item: string | undefined) => void
  isFirst?: boolean
}

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    left: 0
  },
  iconOpen: {
    transform: "none"
  },
  selectSelect: {
    [theme.breakpoints.down("sm")]: {
      fontSize: 16
    },
    paddingLeft: 10,
    paddingTop: 0,
    paddingBottom: 0,
    minHeight: 24
  }
}))

export const Dropdown: React.FC<DropdownProps> = ({ options, value, onSelected }) => {
  const classes = useStyles()
  const [selected, setSelected] = useState<string | undefined>(value)

  useEffect(() => {
    setSelected(value)
  }, [value])

  const handleSelected = (event: any) => {
    setSelected(event.target.value)
    if (onSelected) onSelected(event.target.value)
  }

  return (
    <React.StrictMode>
      <Select 
        native
        value={selected}
        onChange={handleSelected}
        classes={{
          // icon: classes.icon,
          // iconOpen: classes.iconOpen,
          select: classes.selectSelect
        }}
      >
        {options.map(({ name, value }, index) => (
          <option value={value} key={`${name}-${index}`}>
            {name}
          </option>
        ))}
      </Select>
    </React.StrictMode>
  )
}
