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
import {ActivatedRoute, Router} from '@angular/router';
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
  order: any;
  roles: String[] = [];

  constructor(private perfumeService: PerfumeService,
              private token: TokenService,
              private activatedRoute: ActivatedRoute,
              private share: ShareService, private loginService: LoginService,
              private router: Router) {
    this.idUser = parseInt(this.token.getId());
    this.share.getClickEvent().subscribe(next => {
      this.perfumeService.getPerfumeInCart(this.idUser,'cart').subscribe(next => {
        this.order = next;
      });
    });
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    console.log('alo');

    this.getPerfumeInCart();

    this.getCostTotal();
    if (this.token.getToken()) {
      this.userName = this.token.getUsername();
      this.getUserById();
    }
    this.perfumeService.getPerfumeInCart(this.idUser,'cart').subscribe(next => {
      this.order = next;
      console.log(this.order);

    });
  }

  loaderPayPal(idPerfume: number, idUser: number) {
    render(
      {
        id: '#payments',
        currency: 'USD',
        value: String(this.money),
        onApprove: (details) => {

          this.perfumeService.updatePaymentStatus(this.order).subscribe(data => {
              if (this.roles[0] != 'ROLE_ADMIN') {
                this.perfumeService.addCart(parseInt(this.token.getId()), idUser).subscribe(
                  next => {
                    this.share.sendClickEvent();
                  }
                );
              }
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Mua hàng thành công!',
                showConfirmButton: false,
                timer: 1500
              });
              this.router.navigateByUrl('/history');
            }
          );
          this.share.sendClickEvent();
          this.getPerfumeInCart();
          this.getCostTotal();
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
    this.perfumeService.getPerfumeInCart(this.idUser,'').subscribe(next => {
      this.iOderDetailList = next;
      console.log(next);
    }, error => {
      console.log(error);
    });
  }


  private getCostTotal() {
    this.perfumeService.total(this.idUser).subscribe(data => {
        this.totalCart = data;
        this.money = +(this.totalCart.totalCostUser / 23000).toFixed(2);
        // @ts-ignore
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
    }, error => {
    }, () => {
    });
  }
}
