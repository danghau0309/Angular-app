import { Component, OnInit } from '@angular/core';

import { Products } from '../../../interface';
import { Category } from '../../../interface';
import { RouterLink } from '@angular/router';
import { CartApiService } from '../../../service/cart/cart.api.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../service/api/api.service';
@Component({
  selector: 'app-page-product',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './page-product.component.html',
  styleUrl: './page-product.component.css',
})
export class PageProductComponent implements OnInit {
  data: Products[] = [];
  category: any;
  message: string = 'Đã thêm vào giỏ hàng';
  dataFilter: any;
  queryFiter: any;
  mechanical_keyboard: any;
  mouse: any;
  mouse_pads: any;
  otherAccessories: any;
  constructor(
    private cartService: CartApiService,
    private route: ActivatedRoute,
    private api: ApiService
  ) {}
  addToCart(product: Products) {
    this.cartService.addToCart(product);
    const messageDiv = document.createElement('div');
    messageDiv.textContent = this.message;
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '4rem';
    messageDiv.style.right = '4rem';
    messageDiv.style.backgroundColor = '#18c964';
    messageDiv.style.color = 'white';
    messageDiv.style.padding = '10px';
    messageDiv.style.borderRadius = '1rem';
    messageDiv.style.transition = 'all 0.5s ease-in-out';
    messageDiv.style.fontWeight = '500';
    messageDiv.style.fontFamily = 'Quicksand, sans-serif';
    document.body.appendChild(messageDiv);
    setTimeout(() => {
      messageDiv.remove();
    }, 1000);
  }
  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.api.getProducts().subscribe((data: any) => {
        this.dataFilter = data.filter((product: any) => {
          return product.category === Number(params.get('filter'));
        });
        this.queryFiter = params.get('filter');
      });
    });
    this.api.getProducts().subscribe((data: any) => (this.data = data));
    this.api.getCategories().subscribe((categories: Category) => {
      this.category = categories;
    });
    this.getProductsKeyboard();
    this.getProductsMouse();
    this.getProductsMousePads();
    this.getOtherAccs();
  }
  getProductsKeyboard() {
    this.api.getProductCategoryKeyboard().subscribe((data: any) => {
      this.mechanical_keyboard = data;
    });
    return this.mechanical_keyboard;
  }
  getProductsMouse() {
    return this.api.getProductCategoryMouse().subscribe((data) => {
      this.mouse = data;
      return data;
    });
  }
  getProductsMousePads() {
    return this.api.getProductCategoryMousePads().subscribe((data) => {
      this.mouse_pads = data;
      return data;
    });
  }
  getOtherAccs() {
    return this.api.getOtherAccs().subscribe((data) => {
      this.otherAccessories = data;
    });
  }
}
