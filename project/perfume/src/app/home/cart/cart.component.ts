import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {TokenService} from '../../login/service/token.service';
import {ActivatedRoute} from '@angular/router';
import {ShareService} from '../../login/service/share.service';
import {IOrderDetail} from '../../dto/IOrderDetail';
import {PerfumeService} from '../../service/perfume.service';
import {ITotalCart} from '../../entity/itotal-cart';

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
  totalMoney = 0;
  perfumeCount = 0;
  totalCart: ITotalCart = {};

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
    this.perfumeService.getPerfumeInCart(this.idUser).subscribe(next => {
      this.iOderDetailList = next;
      // tslint:disable-next-line:prefer-for-of
      // for (let i = 0; i < this.iOderDetailList.length; i++) {
      //   this.totalMoney += this.iOderDetailList[i].money;
      //   this.perfumeCount = this.iOderDetailList[i].quantity;
      // }
      // this.share.changeData({
      //   quantity: this.perfumeCount
      // });
    }, error => {
    });
  }


  payPerfume() {
    this.perfumeService.payPerfume(this.idUser).subscribe(next => {
      Swal.fire({
        position: 'center',
        title: 'Thanh toán thành công',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000
      });
    }, error => {
      Swal.fire({
        position: 'center',
        title: 'Thanh toán thành công',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000
      });
    });
  }

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
      alert('Thất bại');
    });
  }

  deletePerfumeByIdOrder(oderDetail: IOrderDetail) {
    this.perfumeService.deleteCart(oderDetail.idOrder).subscribe(next => {
      // this.getPerfumeInCart();
      this.share.sendClickEvent();
      this.getPerfumeInCart();
      this.getCostTotal();
    }, error => {
      alert('Thất bại');
    });
  }
}
