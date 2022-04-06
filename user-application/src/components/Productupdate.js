import React from "react";
import {useParams} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import Navbarmenu from './Navbarmenu';

function Productupdate(){
const id=useParams();
var s=JSON.stringify(id);
var d=parseInt(s.replace(/\D/g, ""));

  const [data, setState] = React.useState({
      product_name:null,
      description:null,
      price:null,
      thumb:null,
      id:null
  });

  React.useEffect(() => {
    fetch("http://localhost:8080/product/"+d).then((response)=>{
        response.json().then((result)=>{
            
setState({
    product_name:result.product_name,
    description:result.description,
    price:result.price,
    thumb:result.thumb,
    id:result.id
})
        })
})
       
  }, []);

  const handleUpdate=()=>{
    fetch("http://localhost:8080/product/"+d, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then((response) => {
        alert("Product Updated Successfully");
    })
  }
  return (
      <><Navbarmenu/>
    <div>
        <h1 className="text">Update Product</h1><br/>
        <div>
            <input onChange={(event) => { setState({ product_name: event.target.value,description:data.description,price:data.price,thumb:data.thumb,id:data.id }) }} value={data.product_name} placeholder="product_name" /><br /><br />
            <textarea onChange={(event) => { setState({ description: event.target.value,product_name:data.product_name,price:data.price,thumb:data.thumb,id:data.id }) }} value={data.description} placeholder="description" /><br /><br />
            <input onChange={(event) => { setState({ price: event.target.value,description:data.description,product_name:data.product_name,thumb:data.thumb,id:data.id }) }} value={data.price} placeholder="price Number" /><br /><br />
            <Button className="button" variant="success" onClick={()=> handleUpdate()}>Update Product</Button>
        </div>
    </div>
    </>
);
  
}


export default Productupdate;