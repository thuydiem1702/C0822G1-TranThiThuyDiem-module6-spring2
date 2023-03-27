import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {Cart} from '../../entity/cart';
import {TokenService} from '../../login/service/token.service';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {ShareService} from '../../login/service/share.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  // carts: Cart[];
  // total = 0;
  // length = 0;
  //
  // constructor(private tokenService: TokenService, private title: Title, private router: Router) {
  // }
  //
  // ngOnInit(): void {
  //   this.title.setTitle('Giỏ hàng');
  //   // tslint:disable-next-line:triple-equals
  //   if (this.tokenService.getCart() == undefined) {
  //     this.length = 0;
  //   } else {
  //     this.carts = this.tokenService.getCart();
  //     this.loading();
  //     this.length = this.carts.length;
  //   }
  // }
  //
  // loading() {
  //   // tslint:disable-next-line:prefer-for-of
  //   for (let i = 0; i < this.carts.length; i++) {
  //     this.total += (this.carts[i].quantity * this.carts[i].price);
  //   }
  // }
  //
  // buy() {
  //   if (this.tokenService.isLogger()) {
  //     this.length = 0;
  //     this.total = 0;
  //     this.carts = [];
  //     this.tokenService.setCart(undefined);
  //     Swal.fire({
  //       position: 'center',
  //       icon: 'success',
  //       title: 'Thanh toán thành công ',
  //       showConfirmButton: false,
  //       timer: 2000
  //     });
  //
  //   } else {
  //     Swal.fire({
  //       title: 'Bạn chưa đăng nhập!',
  //       text: 'Hãy đăng nhập để tiến hành thanh toán!',
  //       icon: 'success',
  //       buttonsStyling: false,
  //       confirmButtonText: 'Đăng nhập!',
  //       customClass: {
  //         confirmButton: 'btn btn-primary'
  //       }
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         this.router.navigate(['/login']);
  //       }
  //     });
  //   }
  // }

  cartList: Cart[] = [];
  totalPayment = 0;
  length = 0;
  quantity = 0;

  constructor(private tokenService: TokenService,
              private shareService: ShareService) {
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    if (!this.tokenService.getCart()) {
      this.length = 0;
    } else {
      this.cartList = this.tokenService.getCart();
      this.totalPayment = this.getTotalPayment();
      this.length = this.cartList.length;
      this.quantity = this.getQuantity();
    }
    this.shareService.getClickEvent().subscribe(next => {
      this.totalPayment = this.getTotalPayment();
      this.length = this.cartList.length;
      this.quantity = this.getQuantity();
    });
  }

  getQuantity() {
    let quantity = 0;
    this.cartList.forEach((item: any) => {
      quantity += item.quantity;
    });
    return quantity;
  }

  getTotalPayment() {
    let total = 0;
    this.cartList.forEach((item: any) => {
      total += item.quantity * item.price;
    });
    return total;
  }

  removeCard(i: number) {
    this.cartList.splice(i, 1);
    this.tokenService.setCart(this.cartList);
    this.shareService.sendClickEvent();
  }

  updateQuantity(i: number, ev: any) {
    // tslint:disable-next-line:radix
    let newQuantity = parseInt(ev.target.value);
    newQuantity = newQuantity > 0 ? newQuantity : 1;
    // ev.target.value = new newQuantity;
    this.cartList[i].quantity = newQuantity;
    this.tokenService.setCart(this.cartList);
    this.shareService.sendClickEvent();
  }

  reduceQuantity(i: number, quantity: number) {
    let newQuantity = quantity - 1;
    // newQuantity = newQuantity > 0 ? newQuantity : 1;
    // tslint:disable-next-line:triple-equals
    if (newQuantity == 0) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.cartList.splice(i, 1);
          this.tokenService.setCart(this.cartList);
          this.shareService.sendClickEvent();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
        }
      });
    }
    newQuantity = newQuantity > 0 ? newQuantity : 1;
    this.cartList[i].quantity = newQuantity;
    this.tokenService.setCart(this.cartList);
    this.shareService.sendClickEvent();
  }

  increaseQuantity(i: number, quantity: number) {
    this.cartList[i].quantity = quantity + 1;
    this.tokenService.setCart(this.cartList);
    this.shareService.sendClickEvent();
  }
}
