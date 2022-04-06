import React, { Component } from 'react';
import { Button,Container} from 'react-bootstrap';
import Navbarmenu from './Navbarmenu';
class Home extends Component {
    constructor()
    {
        super();
        this.state={
            list:null,
            quantity:1,
            pname:null,
            pprice:null,
            total:null
        }
    }
    componentDidMount(){
        this.getData();
    }
    getData(){
        fetch("http://localhost:8080/product/getAll").then((response)=>{
         response.json().then((result)=>{
         this.setState({list:result})
})
        })
    }
    tocart(id,name,prc){
        if(localStorage.getItem('login') || localStorage.getItem('admin')){
            
            

               fetch("http://localhost:8080/cart/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "userid":localStorage.getItem('login'),
                "product_name":name,
                "price": prc,
                "total": this.state.quantity*parseInt(prc),
                "quantity": this.state.quantity
            })
        }).then(() => {
                alert("Product added to cart successfully");
                this.setState({quantity:1});
                window.location='/cart';
        })

    
              
        }
        else{
            alert("Please Login to proceed");
            window.location='/login';
        }
    }
    render() {
        
        return (
            <><Navbarmenu/>
            <div> <Container>      
                {
                this.state.list?
                
                <div className='main_content'>
                    {
                        this.state.list.map((item,i)=>
                        <div className="card" key={item.id}>
                        <div className="card_img">
                            <img src={item.thumb} alt="products" />
                        </div>
                        <div className="card_header">
                            <h2>{item.product_name}</h2>
                            <p>{item.description}</p>
                            <p className="price">{item.price}<span> Rs.</span></p>
                            <p>Quantity : <input className="inp" type="number" defaultValue='1' min="1" max="10" onChange={(event) => { this.setState({ quantity: event.target.value }) }}/></p>
                            <Button variant="success" className="btn" onClick={()=>{this.tocart(item.id,item.product_name,item.price)}}>Add to cart</Button>
                        </div>
                    </div>
                        )
                    }
                </div>
                
                :
                <p>Loading...</p>
                }
                </Container>
            </div></>
        );
    }
}

export default Home;