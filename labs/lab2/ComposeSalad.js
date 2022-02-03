import { selectOptions } from '@testing-library/user-event/dist/select-options';
import { Button } from 'bootstrap';
import { Component } from 'react';
import App from './App';
//let tool = require('./lab1.js');
import {Salad} from './lab1';

class ComposeSalad extends Component {
  //Salad salad;
  constructor(props){
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name] :  value
    });
  }
  handleInputChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if(value){
    var partialState = {};
    partialState[name] = value;
    this.setState(partialState);
    } else {
      var partialState = {};
      delete this.state[name];
      this.setState(partialState);
    }
  }
  handleSubmit(event) {
    event.preventDefault();
    let salad = new Salad();
    const inventory = this.props.inventory;
    var state = this.state;
    for(var i in state){
      if (i =='foundation'|| i == 'protein' || i == 'dressing'){
        salad.add(state[i], inventory[state[i]]);
      }
      salad.add(i, inventory[i]);
    }
    this.props.addSalad(salad);
    delete this.state['foundation'];
    delete this.state['protein'];
    delete this.state['dressing'];
    //document.getElementById('foundation').reset();
    document.getElementById('foundation').value = 'Välj bas';
    document.getElementById('protein').value = 'Välj protein';
    document.getElementById('dressing').value = 'Välj dressing';
    for(var i in state){
      document.getElementById(i).checked = document.getElementById(i).defaultValue;
      var partialState = {};
      delete this.state[i];
      this.setState(partialState);
    }
  }

  render() {
    
    let foundation = Object.keys(this.props.inventory).filter(name => this.props.inventory[name].foundation);
    let protein = Object.keys(this.props.inventory).filter(name => this.props.inventory[name].protein);
    let extra = Object.keys(this.props.inventory).filter(name => this.props.inventory[name].extra);
    let dressing = Object.keys(this.props.inventory).filter(name => this.props.inventory[name].dressing);

    return (
      <form onSubmit={this.handleSubmit}>
      <div className="continer col-12"> 
      <div className="row h-200 p-5 bg-light border rounded-3">
      <h2>Välj innehållet i din sallad</h2>
      <select  id = 'foundation' name = 'foundation' foundation={this.state.foundation} onChange={this.handleChange}>
      <option foundation = {'Välj bas'} key = {'Välj bas'}> Välj bas </option> 
      {foundation.map(name => <option foundation={name} key = {name}> {name} </option>)}
      </select>
      <select id = 'protein' name = {'protein'} protein={this.state.protein} onChange={this.handleChange}>
      <option protein = {'Välj protein'} key = {'Välj protein'}> Välj protein </option> 
      {protein.map(name => <option protein={name} key = {name}> {name} </option>)}
      </select>
      <h5> Välj extra tillbehör </h5>
      {extra.map(ingredient => <div id = 'extra' key={ingredient} className="col-4">
      
      <input id = {ingredient} name = {ingredient}
      type = "checkbox"
      key = {ingredient}
      checked = {this.state.value}
      onChange={this.handleInputChange}
      /> {"   "+ ingredient} </div>
      )}
      <select  id = 'dressing' name = 'dressing' dressing={this.state.dressing} onChange={this.handleChange}>
      <option dressing = {'Välj dressing'} key = {'Välj dressing'}> Välj dressing </option> 
      {dressing.map(name => <option dressing={name} key = {name}> {name} </option>)}
      </select>
      </div>
      <input type="submit" value="Lägg beställning" />
      </div></form>
    );
  }
}
export default ComposeSalad;