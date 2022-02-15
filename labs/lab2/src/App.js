import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import { Component } from 'react';
//import inventory from './inventory.ES6';
import ComposeSaladWrapper from './ComposeSaladWrapper';
import ComposeSalad from './ComposeSalad';
import ViewIngredient from './ViewIngredient'
import ViewOrder from './ViewOrder';
import { BrowserRouter, NavLink, resolvePath, Route, Routes, useNavigate } from 'react-router-dom';


class App extends Component{
  constructor(props) {
    super(props);
    this.state = {shoppingCart: [], inventory: {}};
    this.addSalad = this.addSalad.bind(this);
    this.renderPageContent = this.renderPageContent.bind(this);
  }

  componentDidMount(){
    const inventory = {};
    var url1 = new URL("http://localhost:8080/foundations");
    const promiseFoundation = safeFetchJson(url1).then(x => {
      x.forEach(foundation => {
        inventory[foundation] = {};
        fetchIngredient(url1, foundation).then(details => inventory[foundation] = details);
      });
    });
    var url2 = new URL("http://localhost:8080/proteins");
    const promiseProtein = safeFetchJson(url2).then(y => {
      y.forEach(protein => {
        inventory[protein] = {};
        fetchIngredient(url2, protein).then(details => inventory[protein] = details);
      });
    });
    var url3 = new URL("http://localhost:8080/extras");
    const promiseExtra = safeFetchJson(url3).then(z => {
      z.forEach(extra => {
        inventory[extra] = {};
        fetchIngredient(url3, extra).then(details => inventory[extra] = details);
      });
    });
    var url4 = new URL("http://localhost:8080/dressings");
    const promiseDressing = safeFetchJson(url4).then(d => {
      d.forEach(dressing => {
        inventory[dressing] = {};
        fetchIngredient(url4, dressing).then(details => inventory[dressing] = details);
      });
    });

    Promise.all([promiseFoundation, promiseProtein, promiseDressing, promiseExtra]).then(res => {
      this.setState({inventory : inventory})
    });
  }

  addSalad(salad){
    const copyState = [...this.state.shoppingCart];
    copyState.push(salad);
    this.setState({shoppingCart : copyState});
  }

    render()
    {
      
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
      <Route path="compose-salad" element={<ComposeSaladWrapper inventory={this.state.inventory} addSalad = {this.addSalad} />}/>
      <Route path="view-order" element = {<ViewOrder order = {this.state.shoppingCart}/>} />
      <Route path="view-ingredient/:name" element = {<ViewIngredient inventory = {this.state.inventory}/>}/>
      <Route path="" element = {<h1> Välkommen </h1>} />
      <Route path="*" element = {<h1>404  - Not Found!</h1>} />
    </Routes>
    );
  }

  renderPageContent(){
    
    
    return(
      <div>
      <ViewOrder order = {this.state.shoppingCart}/>
      <ComposeSaladWrapper inventory={this.state.inventory} addSalad = {this.addSalad} />
      </div>
    );
  }

}

function fetchIngredient(url, name){
  return fetch(url+"/"+name)
  .then(response => {
  if(!response.ok) {
  throw new Error('${url} returned status ${response.status}');
  }
  return response.json();
  });
}


function safeFetchJson(url) {
  return fetch(url)
  .then(response => {
  if(!response.ok) {
  throw new Error('${url} returned status ${response.status}');
  }
  return response.json();
  });
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
  <NavLink className="nav-link" to="/compose-salad">
      Komponera en sallad
  </NavLink>
  </li>
  <NavLink className='nav-link' to="/view-order">
    Varukorg
  </NavLink>
  <NavLink className='nav-link' to="/">
    Homepage
  </NavLink>
  </ul>);
  }
export default App;
