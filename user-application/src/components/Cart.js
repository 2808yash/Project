import React, { Component } from 'react';
import Navbarmenu from './Navbarmenu';
class Cart extends Component {
    render() {
        return (
            <>
            <Navbarmenu />
            <div>
                <h1 className='text'>Cart</h1>
            </div>
            </>
        );
    }
}

export default Cart;