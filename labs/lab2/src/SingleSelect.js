import { Component } from 'react';


class SingleSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.setCustomValidity = this.setCustomValidity.bind(this);
  }

  setCustomValidity(message){
    console.log(message);
  }

  handleChange(event) {
    this.props.onChange(this.props.name, event.target.value);
  }

  render() {
    let ingredients = Object.keys(this.props.inventory)
      .filter(name => this.props.inventory[name][this.props.name]);
    return (
      <div className='form-group'>
      <label> Pick your {this.props.name}:
      <select 
      value={this.props.selected} 
      onChange={this.handleChange} 
      required="required"
      //</label>onInvalid={this.setCustomValidity(this.props.name)}>
      >
        <option value=""></option>
        {ingredients.map(name => <option key={name} value={name} > {name}</option>)}
      </select>
      </label></div>
    )
  }

}
export default SingleSelect;