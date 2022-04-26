import React, { Component } from 'react';
import { Table, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbarmenu from './Navbarmenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faXmark } from '@fortawesome/free-solid-svg-icons'

class Myorders extends Component {
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
        fetch("http://localhost:8080/orders/getAll/" + localStorage.getItem('login')).then((response) => {
            response.json().then((result) => {
                this.setState({ list: result })
            })
        })
    }
    delete(id) {
        fetch("http://localhost:8080/orders/" + id, {
            method: "DELETE",
        }).then(() => {
            this.getData();
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
                                            <th>Billing Name</th>
                                            <th>Address</th>
                                            <th>Phone Number</th>
                                            <th>Product Name</th>
                                            <th>Quantity</th>
                                            <th>Sub-Total</th>
                                            <th>Payment Status</th>
                                            <th>Cancel Order</th>
                                        </tr>
                                    </thead>
                                    {
                                        this.state.list.map((item, i) =>
                                            <tbody>
                                                <tr key={item.id}>
                                                    <td>{item.order_id}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.address}</td>
                                                    <td>{item.phone_number}</td>
                                                    <td>{item.product_name}</td>
                                                    <td>{item.quantity}</td>
                                                    <td>{item.total}</td>
                                                    <td>{item.payment_status}</td>
                                                    <td><Link className="lnk" to="" onClick={() => { if (window.confirm('Are you sure you wish to delete this?')) this.delete(item.id) }}><FontAwesomeIcon icon={faXmark} color="red" /></Link></td>
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

export default Myorders;