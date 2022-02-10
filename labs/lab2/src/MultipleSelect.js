import { Component } from 'react';
import { Link } from 'react-router-dom';

class MultipleSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onChange(event.target.name, event.target.checked);
  }

  render() {
    let ingredients = Object.keys(this.props.inventory)
      .filter(name => this.props.inventory[name][this.props.name]);
    return (
      <div>
        <label> Pick your {this.props.name}s: </label>
        <div className="row p-3 bg-white border rounded-3">
          {ingredients.map(name =>
          
            <div key={name} className="col-4">
              
              <input
                type="checkbox"
                className="form-check-input"
                value={name}
                name={name}
                onChange={this.handleChange}
                checked={this.props.selected.includes(name)}
                id={"extra-" + name}
              />
              <Link className='nav-link' to = {"/view-ingredient/"+name} className="col-4">
              <label htmlFor={"extra-" + name}> {name} </label>
              
              </Link>
            </div>
           
          )}
        </div>
      </div>
    )
  }
}

export default MultipleSelect;