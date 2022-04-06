import React, { Component } from 'react';
import {Table,Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Navbarmenu from './Navbarmenu';
class Cart extends Component {
    constructor()
    {
        super();
        this.state={
            list:null,
        }
    }
    componentDidMount(){
        this.getData();
    }
    getData(){
        fetch("http://localhost:8080/cart/getAll/"+localStorage.getItem('login')).then((response)=>{
         response.json().then((result)=>{
         this.setState({list:result})
})
        })
    }
    
    delete(id){
        fetch("http://localhost:8080/cart/"+id, {
            method: "DELETE",
        }).then(() => {
            this.getData();
        })
    }
    render() {
        
        return (
            <><Navbarmenu/>
            <div>
                <h1 className='text'>Cart</h1>               
                {
                this.state.list?
                <div><Container>
                    <Table className="styled-table">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                    {
                        this.state.list.map((item,i)=>
                           <tbody>
                               <tr key={item.id}>
                               <td>{item.product_name}</td>
                               <td>{item.price}</td>
                               <td>{item.quantity}</td>
                               <td>{item.total}</td>
                               <td><Link className="lnk" to="" onClick={()=>{if (window.confirm('Are you sure you wish to delete this?')) this.delete(item.id)}}>Delete</Link></td>
                               </tr>
                           </tbody>
                        )
                    }
                    </Table>
                    </Container>
                </div>
                :
                <p>Loading...</p>
                }
            </div></>
        );
    }
}

export default Cart;