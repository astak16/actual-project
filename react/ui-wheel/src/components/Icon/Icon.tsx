import React from "react";
import {FontAwesomeIcon, FontAwesomeIconProps} from "@fortawesome/react-fontawesome"
import classNames from "classnames";

export type ThemeProps = "primary" | "secondary" | "success" | "info" | "danger" | "light" | "dark"

export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps
}

const Icon: React.FC<IconProps> = (props) => {
  const {className, theme, ...restProps} = props
  const classes = classNames('viking-icon', className, {
    [`icon-${theme}`]: theme
  })
  return (

    // <FontAwesomeIcon icon={'faCoffee'}/>
    <FontAwesomeIcon className={classes} {...restProps}/>
  )
}

export default Icon

