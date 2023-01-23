import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/models/product.model';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';


const ROW_HEIGHT : {[id: number]: number} = {1: 420, 3: 410, 4: 400};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit, OnDestroy{

  cols = 3;
  category: string = "";
  rowHeight = ROW_HEIGHT[this.cols];
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12';
  productSubscription: Subscription | undefined;

  
  constructor(private cartService: CartService, private storeService: StoreService) {}

  ngOnInit(): void{
    this.getProducts();
  }

  ngOnDestroy(): void{
    if(this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

  getProducts(){
    this.productSubscription = this.storeService.getAllProducts(this.count, this.sort, this.category)
    .subscribe((_products) => {
      this.products = _products
    });
  }

  onColumnsUpdated(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROW_HEIGHT[this.cols];
  }

  onItemsUpdated(items: string): void {
    this.count = items;
    this.getProducts();
  }

  onsortUpdated(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }

  onShowCategory(clickedCategory: string): void {
    this.category = clickedCategory;
    this.getProducts();
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id  
    });
    console.log("função dentro da home está ok!")
  }
}

export var cols: number | any;
