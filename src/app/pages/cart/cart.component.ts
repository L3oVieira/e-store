import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Subscriber } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { Cart, cartItem } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})

export class CartComponent implements OnInit {

  cart: Cart = {items: [{
      product: "https://via.placeholder.com/300/09f/fff.png",
      name: "Nike",
      quantity: 3,
      price: 150,
      id: 1,
    },
    {
      product: "https://via.placeholder.com/300/09f/fff.png",
      name: "AllStar",
      quantity: 1,
      price: 75,
      id: 1,
    },
  ]};


  dataSource: Array<cartItem> = [];

  displayedColumns: Array<string> = [
    'product',
    'name',
    'quantity',
    'price',
    'total',
    'action'
  ]
 

  constructor(private cartService: CartService, private httpClient: HttpClient) {}

  ngOnInit(): void{
    this.dataSource = this.cart.items;
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;

    })
  }
  
  isDisplayed(entry: number){
    entry > 0
    return true;
  }

  getTotal(item: Array<cartItem>): number {
    return this.cartService.getTotal(item)
  }

  onClearListFromCart(): void{
    this.cartService.ClearCart();
  }

  onRemoveSingleItemFromCart(item: cartItem): void{
    this.cartService.removeItemFromCart(item)
  }

  onIncreaseQuantityOfItem(item: cartItem): void{
    this.cartService.addToCart(item);
  }

  onDecreaseQuantityOfItem(item: cartItem): void{
    this.cartService.removeFromCart(item);
  }


  onCheckout(): void {
    console.log("### O valor dos items no carrinho: ", typeof(this.cart.items));
    
    this.httpClient.post("http://localhost:4242/checkout", {
      items: this.cart.items,
    }).subscribe(async (res: any) => {
      let stripe = await loadStripe("pk_test_51MSwkpGwlfcZW5ChS910V5Y7UvtDA9anZh6xqRht5bHe5KlcZWpXt5O0npxZOKf709KOP2iBB3d6d7grUDAzP10x00FZA07ex1");
      stripe?.redirectToCheckout({
        sessionId: res.id,
      })

    })
  }

}