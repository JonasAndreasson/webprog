import { Component } from 'react';

class ViewOrder extends Component{

    render(){
        var order = this.props.order;
            return(
                <div><h4> Din varukorg </h4>
                {this.props.order.map(salad => 
                    <div key={salad.uuid}>
                    <h6> {salad.makeUp()} för {salad.getPrice()}kr</h6>
                    </div>
                    )
                }
                </div>
            );

    }
}
export default ViewOrder;