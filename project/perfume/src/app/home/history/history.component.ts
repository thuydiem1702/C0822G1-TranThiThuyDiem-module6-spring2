import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {IOrderDetail} from '../../dto/IOrderDetail';
import {TokenService} from '../../login/service/token.service';
import {PerfumeService} from '../../service/perfume.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  iOderDetail: IOrderDetail[] = [];

  constructor(private tokenService: TokenService,
              private perfumeService: PerfumeService,
              private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle('Lịch sử mua hàng');
    window.scroll(0, 500);
    this.getCartHistory();
  }

  getCartHistory() {
    // @ts-ignore
    this.perfumeService.getPerfumeInCart(Number(this.tokenService.getId()), 'history').subscribe(next => {
      this.iOderDetail = next;
    }, error => {
    });
  }

}
