import {Component, OnInit} from '@angular/core';
import {Cart} from '../../entity/cart';
import {Perfume} from '../../entity/perfume';
import {Title} from '@angular/platform-browser';
import {TokenService} from '../../login/service/token.service';
import {PerfumeService} from '../../service/perfume.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ShareService} from '../../login/service/share.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-perfume',
  templateUrl: './detail-perfume.component.html',
  styleUrls: ['./detail-perfume.component.css']
})
export class DetailPerfumeComponent implements OnInit {

  cart: Cart = {
    id: 0,
    name: '',
    image: '',
    price: 0
  };
  carts: Cart[] = [];
  isLogged = false;

  perfumesByQuantitySold: Perfume = {};
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
  idUserTest: string | null = '';
  idUser = 0;

  constructor(private title: Title,
              private token: TokenService,
              private perfumeService: PerfumeService,
              private activatedRoute: ActivatedRoute,
              private shareService: ShareService,
              private route: Router) {
    this.getPerfumeByQuantitySold();
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

  getPerfumeByQuantitySold() {
    this.activatedRoute.paramMap.subscribe(next => {
      const id = next.get('id');
      if (id != null) {
        // tslint:disable-next-line:radix no-shadowed-variable
        this.perfumeService.findPerfumeById(parseInt(id)).subscribe(next => {
          this.perfumesByQuantitySold = next;
          console.log(this.perfumesByQuantitySold);
        }, error => {
        });
      }
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
