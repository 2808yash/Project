import React, { Component } from 'react';
import { Table, Container} from 'react-bootstrap';
import Navbarmenu from './Navbarmenu';

class Order extends Component {
    constructor() {
        super();
        this.state = {
            list: {}
        }
    }
    componentDidMount() {
        this.getData();

    }

    getData() {
        fetch("http://localhost:8080/orders/getAll").then((response) => {
            response.json().then((result) => {
                this.setState({ list: result })
            })
        })
    }
    render() {
        return (
            <><Navbarmenu />
 <div>
                    <h1 className='text'>Orders</h1>
                    {

                       this.state.list.length ?
                            <div><Container>
                                <Table className="styled-table">
                                    <thead>
                                        <tr>
                                            <th>Order Id</th>
                                            <th>User Id</th>
                                            <th>Billing Name</th>
                                            <th>Address</th>
                                            <th>Phone Number</th>
                                            <th>Product Name</th>
                                            <th>Quantity</th>
                                            <th>Sub-Total</th>
                                            <th>Payment Status</th>
                                        </tr>
                                    </thead>
                                    {
                                        this.state.list.map((item, i) =>
                                            <tbody>
                                                <tr key={item.id}>
                                                    <td>{item.order_id}</td>
                                                    <td>{item.userid}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.address}</td>
                                                    <td>{item.phone_number}</td>
                                                    <td>{item.product_name}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.total}</td>
                                                    <td>{item.payment_status}</td>
                                                    </tr>
                                            </tbody>
                                        )
                                    }
                                </Table>
                                
                            </Container>
                            </div>
                            :
                            <h2  style={{
                                marginTop: "15%"
                              }}>--- No Orders Yet ---</h2>
                    }
                </div>

            </>
        );
    }
}

export default Order;