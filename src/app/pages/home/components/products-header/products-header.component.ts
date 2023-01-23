import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styles: [
  ]
})
export class ProductsHeaderComponent implements OnInit{
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() NumberOfItemsChange = new EventEmitter<string>();
  @Output() sortChange = new EventEmitter<string>();

  sort = 'desc';
  showNumberOfItems = 12;
  constructor() {}

  ngOnInit(): void{
  }

  onSortUpdated(newSort: string): void {
    this.sort = newSort;
    this.sortChange.emit(newSort);
  }
  
  onItemsUpdated(Items: string): void {
    this.showNumberOfItems = parseInt(Items);
    this.NumberOfItemsChange.emit(Items);
  }

  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }

}
