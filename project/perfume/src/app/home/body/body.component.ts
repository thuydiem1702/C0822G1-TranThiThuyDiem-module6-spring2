import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {Cart} from '../../entity/cart';
import {Perfume} from '../../entity/perfume';
import {Title} from '@angular/platform-browser';
import {TokenService} from '../../login/service/token.service';
import {PerfumeService} from '../../service/perfume.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ShareService} from '../../login/service/share.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  pagePerfume: Perfume[] = [];
  numberPage = 0;
  size = 8;
  last: any;
  first: any;

  idUserTest: string | null = '';
  idUser = 0;

  cart: Cart = {
    id: 0,
    name: '',
    image: '',
    price: 0
  };
  carts: Cart[] = [];
  isLogged = false;

  perfumesByQuantitySold: Perfume[];
  numberQuantitySold = 0;
  totalPagesQuantitySold: number;
  firstPageQuantitySold: boolean;
  lastPageQuantitySold: boolean;

  perfumes: Perfume[];
  number: number;
  totalPages: number;
  firstPage: boolean;
  lastPage: boolean;
  nameSearch = '';
  perfume: Perfume = {};

  constructor(private title: Title,
              private token: TokenService,
              private perfumeService: PerfumeService,
              private activatedRoute: ActivatedRoute,
              private shareService: ShareService,
              private route: Router) {

    this.activatedRoute.paramMap.subscribe(
      next => {
        this.searchPerfume(next.get('name'), 0);
      }
    );
    this.getPerfumeByQuantitySold(0);
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.title.setTitle('Trang chủ');
    this.isLogged = this.token.isLogger();
    this.loader();
    this.shareService.getClickEvent().subscribe(next => {
      this.loader();
    });
  }

  loader() {
    this.isLogged = this.token.isLogger();
  }

  getPerfumeByQuantitySold(size: number) {
    this.perfumeService.getAllByQuantitySold(size).subscribe(data => {
      this.perfumesByQuantitySold = data.content;
      this.numberQuantitySold = data.number;
      this.totalPagesQuantitySold = data.totalPages;
      this.firstPageQuantitySold = data.first;
      this.lastPageQuantitySold = data.last;

      this.numberPage = data.number;
      this.size = data.size;
      this.totalPages = data.totalPages;
      this.first = data.first;
      this.last = data.last;
    });
  }

  searchPerfume(name: string, page: number) {
    this.perfumeService.searchPerfumeByName(name, page).subscribe(data => {
      this.perfumes = data.content;
      this.number = data.number;
      this.totalPages = data.totalPages;
      this.firstPage = data.first;
      this.lastPage = data.last;
    }, error => {
      Swal.fire({
          position: 'center',
          icon: 'warning',
          title: 'Không tìm thấy tìm kiếm nào của bạn',
          color: 'red',
          text: name,
          showConfirmButton: true,
          timer: 10000
        }
      );
    });
  }

  addToCart(ids: number, images: string, names: string, prices: number) {
    if (this.token.getCart() !== undefined) {
      this.carts = this.token.getCart();
      this.cart.id = ids;
      this.cart.name = names;
      this.cart.image = images;
      this.cart.price = prices;
      if (this.token.checkExist(names)) {
        this.token.upQuantity(ids, this.carts);
      } else {
        this.cart.quantity = 1;
        this.carts.push(this.cart);
      }
      this.token.setCart(this.carts);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Đã thêm sản phẩm ' + this.cart.name + ' vào giỏ hàng',
        showConfirmButton: false,
        timer: 2500
      });
    } else {
      this.cart.id = ids;
      this.cart.name = names;
      this.cart.image = images;
      this.cart.price = prices;
      this.cart.quantity = 1;
      this.carts.push(this.cart);
      this.token.setCart(this.carts);
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Đã thêm sản phẩm ' + this.cart.name + ' vào giỏ hàng',
        showConfirmButton: false,
        timer: 2500
      });
    }

  }


  getList(size: number) {
    this.perfumeService.getAll(size).subscribe(next => {
      this.perfumes = next;
    }, error => {
      alert('rỗng');
    });
  }

  addCart(idPerfume: number) {
    this.idUserTest = this.token.getId();
    console.log(this.idUser);
    if (this.idUserTest != null) {
      // tslint:disable-next-line:radix
      this.idUser = parseInt(this.idUserTest);
    }
    console.log('id sản phẩm' + this.perfume);
    console.log('id User' + this.idUser);
    this.perfumeService.addCart(idPerfume, this.idUser).subscribe(next => {
      this.shareService.sendClickEvent();
      Swal.fire({
        position: 'center',
        title: 'Thêm vào giỏ thành công',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000
      });
    }, error => {
      Swal.fire({
        position: 'center',
        title: 'Vui lòng đăng nhập để mua hàng',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000
      });
    });
  }
}
