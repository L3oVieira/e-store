import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { cols } from '../../home.component';

@Component({
  selector: 'app-product-box',
  templateUrl: './produc.component.html'
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false;
   cols = cols;
  isOnCart = false;
 
  @Input() product: Product | undefined;
  
  @Output() addToCart = new EventEmitter();

  constructor(){}

  ngOnInit(){
    
  }

  onAddToCart(): void {
    this.addToCart.emit(this.product);
    console.log("função dentro do product-box está ok!")
  }

}


