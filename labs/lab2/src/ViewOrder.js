import { Button } from 'bootstrap';
import { Component } from 'react';
import { render } from 'react-dom';
import { useState } from 'react';
import { Salad } from './lab1';

class ViewOrder extends Component{

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        let myStorage = window.localStorage;
        this.reponse = "";
        this.state = {
            orders : [myStorage.getItem('posted')]
        }
    }


    handleSubmit(){
    var message = [];
    for(var i = 0; i < this.props.order.length; i++){
        message[message.length] = this.props.order[i].json();
    }
    message = JSON.stringify(message);
    
    var url = "http://localhost:8080/orders/";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.responseText);
            this.setState({
                orders :  xhr.responseText
              });
              window.localStorage.setItem('posted', xhr.responseText);
              window.localStorage.removeItem('placed');
        }}.bind(this);
    xhr.send(message);
    
}



    
    render(){
            if(this.props.order.length==0){
               var salad = JSON.parse(window.localStorage.getItem('placed'));
               if(salad!=null){
               this.props.order[0] = Object.setPrototypeOf(salad, Salad);
               }
            }
            return(
            <div>
                <div>
                <h4> Din varukorg </h4>
                    {this.props.order.map(salad => 
                    <div key={salad.uuid}>
                        <h6> {Salad.prototype.makeUp(salad)} för {Salad.prototype.getPrice(salad)}kr</h6>
                    </div>
                    )}
                </div>
                <button type="button" className="btn btn-primary" id="PlaceOrder" onClick={this.handleSubmit}>Beställ</button>
                <div>
                        <h2> Dina beställningar </h2>
                        <h6>{this.state.orders}</h6>
                </div>
            </div>
            );

    }
}
export default ViewOrder;