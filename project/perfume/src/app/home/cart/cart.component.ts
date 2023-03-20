import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {Cart} from '../../entity/cart';
import {TokenService} from '../../login/service/token.service';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carts: Cart[];
  total = 0;
  length = 0;

  constructor(private tokenService: TokenService, private title: Title, private router: Router) {
  }

  ngOnInit(): void {
    this.title.setTitle('Giỏ hàng');
    // tslint:disable-next-line:triple-equals
    if (this.tokenService.getCart() == undefined) {
      this.length = 0;
    } else {
      this.carts = this.tokenService.getCart();
      this.loading();
      this.length = this.carts.length;
    }


  }

  loading() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.carts.length; i++) {
      this.total += (this.carts[i].quantity * this.carts[i].price);
    }
  }

  buy() {
    if (this.tokenService.isLogger()) {
      this.length = 0;
      this.total = 0;
      this.carts = [];
      this.tokenService.setCart(undefined);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Thanh toán thành công ',
        showConfirmButton: false,
        timer: 2000
      });

    } else {
      Swal.fire({
        title: 'Bạn chưa đăng nhập!',
        text: 'Hãy đăng nhập để tiến hành thanh toán!',
        icon: 'success',
        buttonsStyling: false,
        confirmButtonText: 'Đăng nhập!',
        customClass: {
          confirmButton: 'btn btn-primary'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
      });

    }

  }

}
