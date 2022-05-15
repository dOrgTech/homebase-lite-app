import React, { useEffect, useState } from "react"
import { Select, SelectProps, MenuItem, SelectChangeEvent } from "@mui/material"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import { makeStyles } from "@mui/styles"

interface DropdownProps extends SelectProps {
  options: { name: string; value: string | undefined }[]
  value?: string | undefined
  onSelected?: (item: string | undefined) => void
}

const useStyles = makeStyles(() => ({
  icon: {
    left: 0
  },
  iconOpen: {
    transform: "none"
  },
  selectSelect: {
    paddingLeft: 40,
    paddingTop: 0,
    paddingBottom: 0
  }
}))

export const Dropdown: React.FC<DropdownProps> = ({ options, value, onSelected }) => {
  const classes = useStyles()
  const [selected, setSelected] = useState<string | undefined>(value)

  useEffect(() => {
    setSelected(value)
  }, [value])

  const handleSelected = (event: SelectChangeEvent) => {
    setSelected(event.target.value)
    if (onSelected) onSelected(event.target.value)
  }

  return (
    <Select
      value={selected}
      IconComponent={() => <KeyboardArrowDownIcon color="inherit" />}
      onChange={handleSelected}
      classes={{
        icon: classes.icon,
        iconOpen: classes.iconOpen,
        select: classes.selectSelect
      }}
    >
      {options.map(({ name, value }, index) => (
        <MenuItem value={value} key={`${name}-${index}`}>
          {name}
        </MenuItem>
      ))}
    </Select>
  )
}
