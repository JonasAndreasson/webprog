import { Component } from 'react';
import SingleSelect from './SingleSelect';
import MultipleSelect from './MultipleSelect';
import {Salad} from './lab1';

class ComposeSalad extends Component {
  constructor(props){
    super(props);
    this.state = { foundation: ''
                  , protein: ''
                  , dressing: ''
                  , extra : {}
                  };
    this.handleSingleChange = this.handleSingleChange.bind(this);
    this.handleMultipleChange = this.handleMultipleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getExtras = this.getExtras.bind(this);
  }
  handleSingleChange(name, value){
    console.log([name], value);
    this.setState({
      [name] :  value
    });
  }
  handleMultipleChange(name, checked){
    this.setState(prevState => (
      {...prevState, extra: {...prevState.extra, [name]: checked}
    }
    ));
  }
  handleSubmit(event) {
    event.preventDefault();
    event.target.classList.add("was-validated");
    if(event.target.checkValidity() === true){
      let inventory = this.props.inventory;
      let salad = new Salad()
      .add(this.state.foundation, inventory[this.state.foundation])
      .add(this.state.protein,    inventory[this.state.protein])
      .add(this.state.dressing,   inventory[this.state.dressing])
    Object.entries(this.state.extra)
      .filter(([_, v]) => v)
      .map(([k,_]) => k)
      .forEach(e => salad.add(e, inventory[e]))
    this.props.addSalad(salad);

    this.setState({ foundation: ''
                  , protein:    ''
                  , dressing:   ''
                  , extra: {}
                  });
  this.props.navigate('/view-order');
    }
    
  }

  getExtras() {
    return Object.entries(this.state.extra).filter(([_, v]) => v).map(([k, _]) => k)
  }

  render() {
    return (
      
      <div className="continer col-12"> 
      <div className="row h-200 p-5 bg-light border rounded-3">
      <h2>Välj innehållet i din sallad</h2>
      <form onSubmit={this.handleSubmit} noValidate>
      
      <SingleSelect inventory={this.props.inventory} name='foundation' onChange={this.handleSingleChange} selected={this.state.foundation} />
      <SingleSelect inventory={this.props.inventory} name='protein' onChange={this.handleSingleChange} selected={this.state.protein} />
      <MultipleSelect inventory={this.props.inventory} name='extra' onChange={this.handleMultipleChange} selected={this.getExtras()} />
      <SingleSelect inventory={this.props.inventory} name='dressing' onChange={this.handleSingleChange} selected={this.state.dressing} />
      <input type="submit" value="Lägg beställning"/>
      </form>
      </div>
      </div>
    );
  }
}
export default ComposeSalad;