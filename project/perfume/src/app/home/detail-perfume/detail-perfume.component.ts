import {Component, OnInit} from '@angular/core';
import {Cart} from '../../entity/cart';
import {Perfume} from '../../entity/perfume';
import {Title} from '@angular/platform-browser';
import {TokenService} from '../../login/service/token.service';
import {PerfumeService} from '../../service/perfume.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ShareService} from '../../login/service/share.service';

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

  // tslint:disable-next-line:max-line-length
  constructor(private title: Title,
              private token: TokenService,
              private perfumeService: PerfumeService,
              private activatedRoute: ActivatedRoute,
              private shareService: ShareService,
              private route: Router) {
    this.getPerfumeByQuantitySold();
  }


  ngOnInit(): void {
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

  // getPerfumeByQuantitySold(page: number) {
  //   this.perfumeService.getAllByQuantitySold(page).subscribe(data => {
  //     this.perfumesByQuantitySold = data.content;
  //     this.numberQuantitySold = data.number;
  //     this.totalPagesQuantitySold = data.totalPages;
  //     this.firstPageQuantitySold = data.first;
  //     this.lastPageQuantitySold = data.last;
  //   });
  // }

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
}
