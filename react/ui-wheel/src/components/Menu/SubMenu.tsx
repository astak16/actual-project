import React, {FunctionComponentElement, useContext, useState} from "react";
import {MenuContext} from "./Menu";
import classNames from "classnames";
import {MenuItemProps} from "./MenuItem";

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({index, title, children, className}) => {
  const context = useContext(MenuContext)
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>
  const isOpend = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false

  const [menuOpen, setOpen] = useState(isOpend)
  const classes = classNames('menu-item submenu-item', className, {
    'is-active': context.index === index
  })

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(!menuOpen)
  }

  let timer: any
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer)
    e.preventDefault()
    timer = setTimeout(() => {
      setOpen(toggle)
    }, 300)
  }

  const clickEvent = context.mode === 'vertical' ? {
    onClick: handleClick
  } : {}

  const hoverEvent = context.mode !== 'vertical' ? {
    onMouseEnter: (e: React.MouseEvent) => {
      handleMouse(e, true)
    },
    onMouseLeave: (e: React.MouseEvent) => {
      handleMouse(e, false)
    }
  } : {}

  const renderChildren = () => {
    const subMenuClasses = classNames('viking-submenu', {
      'menu-opened': menuOpen
    })
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return React.cloneElement(childElement, {index: `${index}-${i}`})
      } else {
        console.error("Warning: Submenu has a child which is not a MenuItem component")
      }
    })
    return (
      <ul className={subMenuClasses}>
        {childrenComponent}
      </ul>
    )
  }

  return (
    <li key={index} className={classes} {...hoverEvent}>
      <div className='submenu-item' {...clickEvent}>{title}</div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'

export default SubMenu
