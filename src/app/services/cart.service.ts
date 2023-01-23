import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject} from 'rxjs';
import { Cart, cartItem } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cart = new BehaviorSubject<Cart>({items: []});

  constructor(private _snackBar: MatSnackBar) { }

  addToCart(item: cartItem): void {
  
    const items = [...this.cart.value.items];  
    const itemInCart = items.find((_item) => _item.id === item.id);
    
    if(itemInCart){
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({items});
    this._snackBar.open('+1 added to the cart', 'Ok', {duration: 3000})
    console.log(this.cart.value)
    
  } 

  removeFromCart(item: cartItem): void {
    const items = [...this.cart.value.items];  
    const itemInCart = items.find((_item) => _item.id === item.id);
    
    if(itemInCart){
      itemInCart.quantity -= 1;
    }

    this.cart.next({items});
    this._snackBar.open('1 item was removed from the cart', 'Ok', {duration: 3000})
    console.log(this.cart.value)
  }

  getTotal(item: Array<cartItem>): number {
    let total = item.
      map((item) => item.price * item.quantity).
      reduce((prev, current) => prev + current, 0);
    
    return total
  }

  ClearCart(): void{
    this.cart.next({items: []});
    this._snackBar.open('Cart is cleared.',
    'oK', { duration: 3000});

  }
  
  removeItemFromCart(item: cartItem): void{
    const filteredItems = this.cart.value.items.filter((_item => _item.id !== item.id));
    this.cart.next({items: filteredItems});
  }
}
