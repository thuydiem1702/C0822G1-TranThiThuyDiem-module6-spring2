import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {TokenService} from '../../login/service/token.service';
import {ActivatedRoute} from '@angular/router';
import {ShareService} from '../../login/service/share.service';
import {IOrderDetail} from '../../dto/IOrderDetail';
import {PerfumeService} from '../../service/perfume.service';
import {ITotalCart} from '../../entity/itotal-cart';
import {render} from 'creditcardpayments/creditCardPayments';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  iOderDetailList: IOrderDetail[] = [];
  public countQuantity = 0;
  idUserTest: string | null = '';
  idUser = 0;
  totalMoney: string;
  perfumeCount = 0;
  totalCart: ITotalCart = {};
  isShow: boolean;

  constructor(private perfumeService: PerfumeService,
              private token: TokenService,
              private activatedRoute: ActivatedRoute,
              private share: ShareService) {
    this.share.getClickEvent().subscribe(next => {
      this.getPerfumeInCart();
      this.getCostTotal();

    });
  }


  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.getPerfumeInCart();
    this.getCostTotal();

  }

  getPerfumeInCart() {
    this.idUserTest = this.token.getId();
    if (this.idUserTest != null) {
      // tslint:disable-next-line:radix
      this.idUser = parseInt(this.idUserTest);
    }
    this.perfumeService.getPerfumeInCart(this.idUser,'cart').subscribe(next => {
      this.iOderDetailList = next;
    }, error => {
    });
  }

  totalCostUser: number;
  oderDetail: IOrderDetail;

  private getCostTotal() {
    this.perfumeService.total(this.idUser).subscribe(data => {
        this.totalCart = data;
      }
      , error => {
      },
      () => {
      });
  }

  changeQuantity(valueChange: any, idPerfume: any) {
    // tslint:disable-next-line:radix
    this.perfumeService.changeQuantity(this.idUser, parseInt(valueChange), idPerfume).subscribe(next => {
      this.share.sendClickEvent();
    }, error => {
    });
  }

  deletePerfumeByIdOrder(oderDetail: IOrderDetail) {
    this.perfumeService.deleteCart(oderDetail.idOrder).subscribe(next => {
      // this.getPerfumeInCart();
      Swal.fire({
        position: 'center',
        title: 'Xoá sản phẩm thành công',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000
      });
      this.share.sendClickEvent();
      this.getPerfumeInCart();
      this.getCostTotal();
    }, error => {
      alert('Thất bại');
    });
  }

  payment(totalCostUser: number) {
    this.totalMoney = String(+((totalCostUser / 23485.48).toFixed(2)));
    // this.payment(totalCostUser);
    render({
      id: '#myPaypalButtons',
      currency: 'USD',
      value: '',
      onApprove: (details => {
        Swal.fire({
          position: 'center',
          title: 'Thanh toán thành công',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        });
        // this.share.sendClickEvent();
        // this.getPerfumeInCart();
        // this.getCostTotal();
      })
    });
  }
}
