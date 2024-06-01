import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Products } from '../../../../shared/interfaces/product';
import { Comment } from '../../../../shared/interfaces/comment';
import { CartApiService } from '../../../../shared/service/cart/cart.api.service';
import { ApiService } from '../../../../shared/service/api/api.service';
import { ToastService } from '../../../../shared/service/toast/toast.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../shared/service/auth/auth.service';
import { HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-page-detail',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './page-detail.component.html',
  styleUrl: './page-detail.component.css',
})
export class PageDetailComponent implements OnInit {
  public isLogged: boolean = this.authService.isLoggedIn();
  public product: Products | any = {};
  public message: string = 'Đã thêm vào giỏ hàng';
  public formComment: FormGroup;
  public commentList: Comment[] = [];
  constructor(
    private route: ActivatedRoute,
    private cartService: CartApiService,
    private authService: AuthService,
    private apiProducts: ApiService,
    private toastService: ToastService
  ) {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = String(routeParams.get('productId'));
    this.apiProducts.getProducts().subscribe((products: Products[]) => {
      console.log(products);
      this.product = products.find(
        (product: Products) => product._id === productIdFromRoute
      );
      this.apiProducts.increaseView(this.product?._id as string).subscribe();
      if (this.product) {
        this.commentList = this.product.comments;
      }
    });
    const day = new Date();
    const date = day.getDate();
    const month = day.getMonth();
    const year = day.getFullYear();
    const time = day.getHours();
    const minute = day.getMinutes();
    const second = day.getSeconds();
    const fullTime = `${date}/${month}/${year} ${time}:0${minute}:${second}`;
    this.formComment = new FormGroup({
      username_customer: new FormControl(this.authService.getUsername()),
      content: new FormControl('', [Validators.required]),
      date: new FormControl(fullTime),
    });
  }

  addToCart(product: Products, quantity: number) {
    if (quantity < 1) {
      this.toastService.showToast('Thêm tối thiểu một sản phẩm ', '#ff0000');
      return;
    }
    this.cartService.addToCart(product, quantity);
    this.toastService.showToast('Đã thêm vào giỏ hàng', '#17c964');
  }
  onSubmit() {
    const getUrl = new HttpParams().set('productId', this.product?._id || '');
    const productId = getUrl.get('productId');
    this.apiProducts.getProducts().subscribe((products: Products[]) => {
      this.product = products.find(
        (product: Products) => product._id === productId
      );
      if (this.product) {
        this.product?.comments.push(this.formComment.value);
        this.apiProducts.updateProduct(this.product).subscribe((res) => {
          this.commentList = this.product?.comments || [];
        });
      }
    });
  }
  ngOnInit(): void {}
}
