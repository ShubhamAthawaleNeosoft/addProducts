import React, { Component } from 'react'
import { postProduct } from '../config/Myservices'

export class AddProduct extends Component {

  constructor(props){
    super(props)
    this.state={
      pname:"",price:"",quantity:"",image:""
    }
  }

  changeHandler=(e)=>{
    this.setState({[e.target.name]:e.target.value})
  }

  postData=(e)=>{
    e.preventDefault(); 
    postProduct(this.state)
    .then(res=>{
      if(res){
        alert("Product Added")
      }
    })
    .catch(err=>{
      if(err){
        alert("Somthing wents Wrong")
      }
    })
  }
  render() {
    return (
      <div>
        <div className='container'>
          <h3 className='mt-4'>AddProduct</h3>
          <form onSubmit={this.postData}>
            <div className="mb-3">
              <label htmlFor='pname' className="form-label">Pname</label>
              <input type="text" name='pname' className="form-control" id="pname" onChange={this.changeHandler}></input>
            </div>
            <div className="mb-3">
              <label htmlFor='price' className="form-label">Price</label>
              <input type="text" name='price' className="form-control" id="price" onChange={this.changeHandler}></input>
            </div>
            <div className="mb-3">
              <label htmlFor='quantity' className="form-label">Quantity</label>
              <input type="text" name='quantity' className="form-control" id="quantity" onChange={this.changeHandler}></input>
            </div>
            <div className="mb-3">
              <label htmlFor='image' className="form-label">Image</label>
              <input type="text" name='image' className="form-control" id="image" onChange={this.changeHandler}></input>
            </div>
            <button type="submit" className="btn btn-dark">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

export default AddProduct