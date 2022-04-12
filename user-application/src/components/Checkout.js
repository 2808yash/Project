import React, { Component } from 'react';
import Navbarmenu from './Navbarmenu';
import { Table,Button,Container} from 'react-bootstrap';

class Checkout extends Component {
    constructor()
    {
        super();
        this.state={
            list:null
        }
    }
    componentDidMount() {
        this.getData();

    }
    getData() {
        fetch("http://localhost:8080/cart/getAll/" + localStorage.getItem('login')).then((response) => {
            response.json().then((result) => {
                this.setState({ list: result })
            })
        })
    }
    total() {
        const total = (this.state.list.reduce((total, currentItem) => total = total + currentItem.total, 0));
       
        return total;
    }

    render() {
        return (
            <>
            <Navbarmenu/>
            <Container><br/>
            <h1 className="text">Checkout</h1>
                <div style={{
                                float: "left",
                                marginLeft:"15%",
                                marginTop: "5%"
                              }}>
                                  <Container>
                                      <br/>
                   <input type="text" placeholder="Enter your name" /><br/><br/>
                   <input type="text" placeholder="Enter phone number"/><br/><br/>
                   <textarea placeholder="Enter your address"/><br/><br/>
                   <label style={{
                                color: "#009879"
                              }}>
          Payment Option : &nbsp; 
          <select className="drop">
            <option value="cod">Cash On Delivery</option>
          </select>
        </label><br/><br/>
                   <Button className='button' variant="success">Place Order</Button>
                   </Container>
                </div>
                <div  style={{
                                float: "left",
                                marginLeft:"15%",
                                marginTop: "5%"
                              }}><Container>
                {
                         this.state.list?
                         <Table className="styled-table">
                                    <thead>
                                        <tr>
                                            <th>Product Name</th>
                                            <th>Quantity</th>
                                            <th>Sub-Total</th>
                                        </tr>
                                    </thead>
                         {
                             this.state.list.map((item, i) =>
                                 <tbody>
                                     <tr key={item.id}>
                                         <td>{item.product_name}</td>
                                         <td>{item.price} x {item.quantity}</td>
                                         <td>{item.total}</td>
                                         </tr>
                                 </tbody>
                             )
                         }
                         <tfoot><tr>
                             <td></td>
                            <td> Total : {this.total()} Rs.</td>
                         </tr>
                         </tfoot>
                     </Table>  
                         :
                         <p>Loading...</p>
                    }
                    </Container>
                </div>
            </Container>
            </>
        );
    }
}

export default Checkout;