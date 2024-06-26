import { Component, OnInit } from '@angular/core';
import { Products } from '../../../../shared/interfaces/product';
import { DataService } from '../../../../shared/service/data/data.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartApiService } from '../../../../shared/service/cart/cart.api.service';
@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  public filterList: Products[] = [];
  constructor(
    private dataService: DataService,
    private cartApi: CartApiService
  ) {}
  ngOnInit(): void {
    this.dataService.currentMessage.subscribe((products: Products[]) => {
      console.log(products);
      this.filterList = products;
    });
  }
  addToCart(product: any, quantity: number): void {
    this.cartApi.addToCart(product, quantity);
  }
}
