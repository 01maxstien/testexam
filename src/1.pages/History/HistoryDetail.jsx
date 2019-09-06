import React, { Component } from 'react'
import Axios from 'axios';
import { urlApi } from '../../3.helpers/database';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class HistoryDetail extends Component {
    state = {
        data: null
    }
    componentDidMount(){
        Axios.get(urlApi + 'history?userId=' + this.props.id + '&id='+this.props.location.state.transactionId )
        .then((res)=>{
            this.setState({data: res.data})
            console.log(res.data)
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    renderDetail=()=>{ // ini buat render jumlah
        var jsx = this.state.data.map((val) => {
            var detailsHis = val.items.map((value) => {
                return(
                            <tr>
                                <td>{value.quantity}</td>
                                <td>{value.price}</td>
                                <td>{value.productName}</td>
                                <td>{value.discount+"%"}</td>
                            </tr>
                )
            })
            return detailsHis
        })
        return jsx
    }

    functionBaru = () => {
        var baru = this.state.data.items.map((val)=>{
            return
        })
    }
    render() {
        if(this.state.data === null){
            return(
                <h1>loading</h1>
            )
        }
        return (
            <div className="container">
            <center><h3>Details History Product</h3></center>
            <table className="table table-striped mt-5 text-center">
                <thead>
                        <tr>
                            <th>Items</th>
                            <th>HArga</th>
                            <th>Nama Produk</th>
                            <th>Diskon</th>

                        </tr>
                </thead>
                <tbody>
                         {this.renderDetail()}
                </tbody>
                <tfoot>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <Link to = {{pathname: '/history'}}>
                            <th><button className="btn btn-warning">Back</button></th>
                            </Link>
                        </tr>
                </tfoot>
            </table>           
        </div>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        id: state.user.id,
        items: state.user.id
    }
}

export default connect (mapStateToProps)(HistoryDetail);