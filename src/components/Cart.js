import React, { Component } from 'react'
import { delCartProduct, getCartItems, patchCartProduct } from '../config/Myservices'

export class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cartData: [], ptotal: 0
    }
  }
  componentDidMount() {
    
    getCartItems()
      .then(res => {
        this.setState({ cartData: res.data })
    })
    this.priceTotal();
  }

  delCartPro = (id) => {
    delCartProduct(id)
      .then(res => {
        if (res) {
          alert("cart item Deleted")
          getCartItems()
            .then(res => {
              this.setState({ cartData: res.data })
            })
            this.priceTotal();
        }
      })
  }
  increment = (id, proQuan, proPrice) => {
    const UpdatedProQuantity = parseInt(proQuan) + 1;
    const updatedPrice = parseInt(proPrice) * UpdatedProQuantity;
    const article = { proQuantity: UpdatedProQuantity, updatePrice: updatedPrice }
    patchCartProduct(id, article)
      .catch((error) => console.log('Error: ', error));
    getCartItems()
      .then(res => {
        this.setState({ cartData: res.data })
      })
      this.priceTotal();
  }
  decrement = (id, decproQuan, proPrice) => {
    if (decproQuan != "1") {
      const decProQuantity = parseInt(decproQuan) - 1;
      const updatedPrice = parseInt(proPrice) * decProQuantity;
      const article1 = { proQuantity: decProQuantity, updatePrice: updatedPrice }
      patchCartProduct(id, article1)
        .catch((error) => console.log('Error: ', error));
      getCartItems()
        .then(res => {
          this.setState({ cartData: res.data })
        })
        this.priceTotal();
    }
  }
  priceTotal =()=> {
    getCartItems()
        .then(res => {
          var sum = 0;
          res.data.forEach(val => {
            let price = parseInt( val.updatePrice)
            sum = sum + price;
          });
          this.setState({ ptotal: sum })
        })
  }

  render() {
    return (
      <div>
        <div className='container'>
          <h3 className='mt-3'>Cart Items</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Action</th>
                <th scope="col">Product</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {this.state.cartData.map((data) =>
                <tr key={data.id}>
                  <th scope="row"><button className='btn btn-sm btn-danger' onClick={() => this.delCartPro(data.id)}>X</button></th>
                  <td><img src={data.image} height="100"></img>{data.pname}</td>
                  <td>
                    <button className='btn btn-sm btn-dark' onClick={() => this.decrement(data.id, data.proQuantity, data.price)} >-</button>
                    <input type="text" value={data.proQuantity} />
                    <button className='btn btn-sm btn-dark' onClick={() => this.increment(data.id, data.proQuantity, data.price)}>+</button>
                  </td>
                  <td>{data.updatePrice}</td>
                </tr>)}

            </tbody>
            <tfoot>
              <tr>
                <th scope="col">Total</th>
                <th></th>
                <th></th>
                <th>{this.state.ptotal}</th>
              </tr>

            </tfoot>
          </table>
        </div>
      </div>
    )
  }
}

export default Cart