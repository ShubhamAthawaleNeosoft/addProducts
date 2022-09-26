import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { getCartItems } from '../config/Myservices';
import AddProduct from './AddProduct';
import Cart from './Cart';
import Header from './Header';
import Products from './Products';

export class Home extends Component {
    constructor(props) {
        super(props)
        this.state={
            cartItemsLength:""
        }
    }

    componentDidMount(){
        getCartItems()
        .then(res=>{
            this.setState({ cartItemsLength:res.data.length})
        })
    }

    componentDidUpdate(prevProps, PrevState){
        // console.log(PrevState.cartItemsLength)
        // console.log(this.state.cartItemsLength)
    }
    render() {
        return (
            <>
            <Router>
                <Header cardCount={this.state}></Header>
                <Routes>
                    <Route path="/addproduct" element={<AddProduct />}></Route>
                    <Route path="/" element={<Products cardCount={this.state.cartItemsLength}  />}></Route>
                    <Route path="/cart" element={<Cart />}></Route>
                </Routes>
            </Router>
        </>
        )
    }
}

export default Home