import {Component, OnInit} from '@angular/core';
import {Cart} from '../../../../entity/cart';
import {ITotalCart} from '../../../../entity/itotal-cart';
import {Title} from '@angular/platform-browser';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../../entity/user';
import {render} from 'creditcardpayments/creditCardPayments';
import {PerfumeService} from '../../../../service/perfume.service';
import {TokenService} from '../../../../login/service/token.service';
import {ShareService} from '../../../../login/service/share.service';
import {LoginService} from '../../../../login/service/login.service';
import {IOrderDetail} from '../../../../dto/IOrderDetail';
import {ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-oder-create',
  templateUrl: './oder-create.component.html',
  styleUrls: ['./oder-create.component.css']
})
export class OderCreateComponent implements OnInit {

  iOderDetailList: IOrderDetail[] = [];
  public countQuantity = 0;
  idUserTest: string | null = '';
  idUser = 0;
  totalMoney: string;
  perfumeCount = 0;
  totalCart: ITotalCart = {};
  isShow: boolean;
  // @ts-ignore
  money: number;
  user: User = {};
  userName: string;
  formOderCreate = new FormGroup({
    deliveryAddress: new FormControl('', [Validators.required]),
    deliverPhone: new FormControl('', [Validators.required]),
  });

  constructor(private perfumeService: PerfumeService,
              private token: TokenService,
              private activatedRoute: ActivatedRoute,
              private share: ShareService, private loginService: LoginService) {
    this.share.getClickEvent().subscribe(next => {
      // this.getPerfumeInCart();
      // this.getCostTotal();
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.share.sendClickEvent();
    this.getPerfumeInCart();
    this.getCostTotal();
    if (this.token.getToken()) {
      this.userName = this.token.getUsername();
      this.getUserById();
    }

  }

  loaderPayPal() {
    render(
      {
        id: '#payments',
        currency: 'USD',
        value: String(this.money),
        onApprove: (details) => {

          Swal.fire({
            position: 'center',
            title: 'Thanh toán thành công',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          });
        }
      }
    );
  }

  getPerfumeInCart() {
    this.idUserTest = this.token.getId();
    if (this.idUserTest != null) {
      // tslint:disable-next-line:radix
      this.idUser = parseInt(this.idUserTest);
    }
    this.perfumeService.getPerfumeInCart(this.idUser).subscribe(next => {
      this.iOderDetailList = next;

    }, error => {
    });
  }


  private getCostTotal() {
    this.perfumeService.total(this.idUser).subscribe(data => {
        this.totalCart = data;
        this.money = +(this.totalCart.totalCostUser / 23000).toFixed(2);
        this.loaderPayPal();
      }
      , error => {
      },
      () => {
      });
  }

  getUserById() {
    this.loginService.profile(this.userName).subscribe(data => {
      this.user = data;
      console.log(this.user);
    }, error => {
    }, () => {
    });
  }

  // setOrder() {
  //   this.oder = this.formOderCreate.value;
  //   this.oder.userDto = this.user;
  //   this.oder.purchaseHistorySet = this.cartList;
  //   this.oder.orderValue = this.totalCart.totalCostUser;
  // }
  // createOder() {
  //   this.setOrder();
  //   this.cartService.createOrder(this.oder).subscribe(data => {
  //     console.log(data);
  //     this.cartService.totalCost(this.idUser);
  //     this.temp = data;
  //     this.shareService.sendClickEvent();
  //   }, error => {
  //   }, () => {
  //   })
  // }
}
