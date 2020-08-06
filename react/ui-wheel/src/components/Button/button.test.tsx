import React from "react";
import {fireEvent, render} from "@testing-library/react";
import Button, {ButtonProps, ButtonSize, ButtonType} from './Button'

const defaultProps = {
  onClick: jest.fn()
}

const testProps: ButtonProps = {
  btnType: 'primary',
  size: ' ',
  className: 'klass'
}

const disableProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn()
}

describe('test Button Component', () => {
  it("should render the correct default button", () => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    expect(element.disabled).toBeFalsy()
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it("should render the component based on different props", () => {
    const wrapper = render(<Button {...testProps}>Nice</Button>)
    const element = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary btn-lg klass')
  })
  it("should render a link when btnType equals link and href is provided", () => {
    const wrapper = render(<Button btnType={ButtonType.Link} href='http:dummyurl'>Link</Button>)
    const element = wrapper.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })
  it("should render disabled button when disabled set to true", () => {
    const wrapper = render(<Button {...disableProps}>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disableProps.onClick).not.toHaveBeenCalled()
  })
})
