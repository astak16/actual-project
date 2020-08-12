import {ToyReact} from "./ToyReact"

class MyComponent {
  render() {
    return <div>cool</div>
  }

  setAttribute(name, value){
    this[name] = value
  }

  mountTo(parent) {
    let vdom = this.render()
    vdom.mountTo(parent)
  }
}

let a = <MyComponent name="a" id="ids"></MyComponent>

ToyReact.render(a, document.body)
