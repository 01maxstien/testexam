import React, { Component } from 'react';
import Axios from 'axios';
import { urlApi } from '../../3.helpers/database';
import {connect} from 'react-redux'
import './History.css'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router-dom'

class History extends Component {
    state = {
        data : null
    }
    
    componentDidMount(){
        Axios.get(urlApi + 'history?userId=' + this.props.id)
        .then((res)=>{
            this.setState({data: res.data})
            console.log(res.data)
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    renderHistory = () => {
        var jsx = this.state.data.map((val)=>{
            return(
                <tr>
                    <td>{val.id}</td>
                    <td>{val.time}</td>
                    <td>{val.totalPrice}</td>
                    <td>{val.recipient}</td>
                    <td>{val.alamat}</td>
                    <Link to = {{pathname: '/history-detail/' + val.id ,state: {
                        transactionId: val.id
                    }}}>
                        <td><button className="btn btn-warning">Details</button></td>
                    </Link>
                </tr>
            )
        })
        return jsx
    }
    render() {
        console.log(this.props.id)
        if(this.state.data === null){
            return('Loading...')
        }else if (this.props.id == 0){
           return( <Redirect to="/" exact /> )
        }
        
        return (
            <div className="container">
                {
                     this.state.data.length>0
                     ?
                     <table className="table table-striped mt-5 text-center">
                         <thead>
                         <tr>
                             <th scope="col">no</th>
                             <th scope="col">Tangal</th>
                             <th scope="col">Total Harga</th>
                             <th scope="col">Penerima</th>
                             <th scope="col">Alamat</th>
                             <th scope="col">Option</th>
                         </tr>
                         </thead>
                         <tbody>
                             {this.renderHistory()}
                         </tbody>
                     </table>
                     :
                     <>
                     <center>
                     <div className="alert alert-danger">Your History is empty,Let's <Link to ='/'>Go Shopping </Link>  </div>
             
                     </center>
                     </>
                }
            </div>
        );
        
    }
}

const mapStateToProps=(state)=>{
    return{
        id: state.user.id
    }
}
export default connect (mapStateToProps)(History);