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

      this.numberPage = data.number;
      this.size = data.size;
      this.totalPages = data.totalPages;
      this.first = data.first;
      this.last = data.last;
      console.log(this.perfumesByQuantitySold);
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

  addCart(idPerfume: number) {
    this.idUserTest = this.token.getId();
    if (this.idUserTest != null) {
      this.idUser = parseInt(this.idUserTest);
    }
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
