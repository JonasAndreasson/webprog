import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import { Component } from 'react';
import inventory from './inventory.ES6';
import ComposeSaladWrapper from './ComposeSaladWrapper';
import ComposeSalad from './ComposeSalad';
import ViewIngredient from './ViewIngredient'
import ViewOrder from './ViewOrder';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';


class App extends Component{
  constructor(props) {
    super(props);
    let extras = Object.keys(inventory).filter(name => inventory[name].extra);
    this.state = { shoppingCart: [] };
    this.addSalad = this.addSalad.bind(this);
    this.renderPageContent = this.renderPageContent.bind(this);
  }

  addSalad(salad){
    const copyState = [...this.state.shoppingCart];
    copyState.push(salad);
    this.setState({shoppingCart : copyState});
  }

    render(){
    return (
      <div className="container py-4">
        <Header />
        <Navbar />
        {this.renderRouter()}
        <Footer/>
      </div>
    ); 
  }

  renderRouter(){
    return(
    <Routes>
      <Route path="compose-salad" element={<ComposeSaladWrapper inventory={inventory} addSalad = {this.addSalad} />}/>
      <Route path="view-order" element = {<ViewOrder order = {this.state.shoppingCart}/>} />
      <Route path="view-ingredient/:name" element = {<ViewIngredient inventory = {inventory}/>}/>
      <Route path="" element = {<h1> Välkommen </h1>} />
      <Route path="*" element = {<h1>404  - Not Found!</h1>} />
    </Routes>
    );
  }

  renderPageContent(){
    
    
    return(
      <div>
      <ViewOrder order = {this.state.shoppingCart}/>
      <ComposeSaladWrapper inventory={inventory} addSalad = {this.addSalad} />
      </div>
    );
  }

}
  function Header() {
    return(
      <header className="pb-3 mb-4 border-bottom">
        <span className="fs-4">Min egen salladsbar</span>
      </header>
    );
}
  function Footer(){
    return(
    <footer className="pt-3 mt-4 text-muted border-top">
      EDAF90 - webprogrammering
    </footer>
    );
  }
function Navbar() {
  return (
  <ul className="nav nav-tabs">
  <li className="nav-item">
  <Link className="nav-link" to="/compose-salad">
      Komponera en sallad
  </Link>
  </li>
  <Link className='nav-link' to="/view-order">
    Kolla din beställning
  </Link>
  <Link className='nav-link' to="/">
    Homepage
  </Link>
  </ul>);
  }
export default App;
