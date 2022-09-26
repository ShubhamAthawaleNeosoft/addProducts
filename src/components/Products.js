import React, { Component } from 'react'
import { addToCart, delProduct, getCartItems, getProducts } from '../config/Myservices'

export class Products extends Component {

  constructor(props) {
    super(props);
    this.state = { proData: []}
    
  }
  componentDidMount() {
    getProducts()
      .then(res => {
        this.setState({
          proData: res.data
        })
      })
  }

  delPro = (id) => {
    delProduct(id)
      .then(res => {
        if (res) {
          alert("product Deleted")
          getProducts()
            .then(res => {
              this.setState({ proData: res.data })
            })
        }
      })
  }

  addPro = (id) => {
    getCartItems()
      .then(res => {
        res.data.forEach(cartElem => {
          const exist = cartElem.id === id;
          if (exist) {
            alert("already in cart");
          }
          else if(!exist){
            this.state.proData.forEach(val => {
              if (val.id === id) {
               const newElement={...val,proQuantity:1,updatePrice:val.price}
                addToCart(newElement)
                  .then(res => {
                    if (res) {
                      alert("Product Added to cart")
                    }
                  })
              }
            });
          }
        });
      })
  }
  render() {
    return (
      <div>
        <div className='container'>
          <h3 className='mt-3'>Products</h3>
          <div className='row'>
            {this.state.proData.map((data) =>
              <div className='col-md-4 py-3' key={data.id}>
                <div className='card shadow'>
                  <img src={data.image} className="card-img-top" alt="...." height={180} />
                  <div className="card-body">
                    <h5 className="card-title">{data.pname}</h5>
                    <p className="card-text mb-0">Price : {data.price} </p>
                    <p className="card-text">Quantity : {data.quantity}</p>
                    <button className="btn btn-primary" onClick={() => this.addPro(data.id)}>Add To Cart</button>
                    <button className="btn btn-danger ms-2" onClick={() => this.delPro(data.id)}>Delete</button>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    )
  }
}

export default Products