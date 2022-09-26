import axios from "axios";
import { CARTITEMS_URL, PRODUCT_URL } from "./Url";
export function getProducts(){
    return axios.get(PRODUCT_URL);
}
export function postProduct(data){
    return axios.post(PRODUCT_URL,data);
}
export function delProduct(id){
    return axios.delete(`${PRODUCT_URL}${id}`)
}
export function getCartItems(){
    return axios.get(CARTITEMS_URL);
}
export function addToCart(data){
    return axios.post(CARTITEMS_URL,data);
}
export function delCartProduct(id){
    return axios.delete(`${CARTITEMS_URL}${id}`)
}
export function patchCartProduct(id,article){
    return axios.patch(`${CARTITEMS_URL}${id}`,article)
}