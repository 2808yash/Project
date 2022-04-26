import React,{useState,useEffect} from 'react';
import Navbarmenu from './Navbarmenu';
import { Container,Table} from 'react-bootstrap';
import { useParams } from 'react-router-dom';



const Adminreview = () => {
    const {id} = useParams();
    const [data, setState] = useState({list : "" });
    const [Allreview, setAllreview] = useState({fetchreviews : ""});

    useEffect(() => {
        fetch("http://localhost:8080/product/"+id).then((response)=>{
            response.json().then((result)=>{
                setState({list:result});       
        })
        })
        console.log(data);
        getAllreviewdata();
       

      }, []);

     


      

      const getAllreviewdata = () => {
        fetch("http://localhost:8080/get").then((response)=>{
          response.json().then((res)=>{
            setAllreview({fetchreviews:res})

          }) 
          })      
      }
      
    
      
     

  return (
    <div>
        <Navbarmenu />
        <Container><br/>
        
            <h1 className="text"> {data.list.product_name} Review</h1>
                
                    <div>
                    <Container>
                {
                 

                  Allreview.fetchreviews  ? 
                 <div>    
                <Container>
                    <Table className="styled-table">
                        <thead>
                            <tr>
                              <th>User ID</th>
                                <th>Username</th>
                                <th>Review</th>
                                
                            </tr>
                        </thead>
                   
                  
                    {
                        Allreview.fetchreviews.filter(e => e.productname === data.list.product_name ).map((item,i)=>
                           <tbody>
                               <tr key={item.id}>
                                 <td>{item.userid}</td>
                               <td>{item.username}</td>
                               <td>{item.userreview}</td>
                               </tr>
                           </tbody>
                        )
                    }
                    </Table>
                    </Container>
                </div>
               :
               ""
                }

                    </Container>
                    </div>
        </Container>

    </div>
  )
}

export default Adminreview;