import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Perfume} from '../entity/perfume';
import {IOrderDetail} from '../dto/IOrderDetail';
import {Cart} from '../entity/cart';

@Injectable({
  providedIn: 'root'
})
export class PerfumeService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(size: number): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/api/perfume/list?size=' + size);
  }

  searchPerfumeByName(name: string, page: number): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/home/search?name=' + name + '&page=' + page);
  }


  getAllByQuantitySold(size: number): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/api/perfume/list?size=' + size);
  }

  findPerfumeById(id): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/api/perfume/' + id);

  }

  addCart(idPerfume: number, idUser: number) {
    return this.httpClient.get('http://localhost:8080/api/perfume/addOderDetail/' + idPerfume + '/' + idUser);
  }

  getPerfumeInCart(idUser: number, value: string): Observable<IOrderDetail[]> {
    return this.httpClient.get<IOrderDetail[]>('http://localhost:8080/api/perfume/get-perfume-in-cart/' + idUser + '/' + value);
  }

  changeQuantity(idUser: number, valueChange: number, idPerfume: number) {
    return this.httpClient.get('http://localhost:8080/api/perfume/change-quantity/' + idUser + '/' + valueChange + '/' + idPerfume);
  }

  total(idUser: string | number | undefined) {
    return this.httpClient.get('http://localhost:8080/api/perfume/total?idAccount=' + idUser);
  }

  deleteCart(idOrder: number) {
    return this.httpClient.delete('http://localhost:8080/api/perfume/delete/' + idOrder);
  }

  updatePaymentStatus(order) {
    let dto = [];
    for (let i = 0; i < order.length; i++) {
      let dto2 = {
        id: order[i].idOrder,
        quantity: order[i].quantity
      };
      dto.push(dto2);
    }
    return this.httpClient.post('http://localhost:8080/api/perfume/payment', dto);
  }

}
