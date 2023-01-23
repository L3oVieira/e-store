import { Component, Input, OnInit } from '@angular/core';
import { Cart, cartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styles: [
  ]
})

export class HeaderComponent{
  
  private _cart: Cart = {items: []};
  itemsQuantity: number = 0;
  
  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart){
    this._cart = cart;
    console.log("Quantidade dentro do header:", this._cart.items );

    this.itemsQuantity = cart.items.
    map((item) => item.quantity).
    reduce((prev, current) => prev + current, 0);
  }
  constructor(private cartService: CartService) {}

  
  getTotal(items: Array<cartItem>): number {
    return this.cartService.getTotal(items)
  }

  onClearCart(): void{
    return this.cartService.ClearCart();

  }
}
