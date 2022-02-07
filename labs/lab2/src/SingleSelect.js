import { Component } from 'react';

class SingleSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onChange(this.props.name, event.target.value);
  }

  render() {
    let ingredients = Object.keys(this.props.inventory)
      .filter(name => this.props.inventory[name][this.props.name]);
    return (
      <label> Pick your {this.props.name}:
      <select
        className="form-select"
        value={this.props.selected}
        onChange={this.handleChange}
        id='select_foundation'
      >
        <option key='' value=''></option>
        {ingredients.map(name => <option key={name} value={name}> {name}</option>)}
      </select>
      </label>
    )
  }

}
export default SingleSelect;