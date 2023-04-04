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

  URL_COMMODITY = 'http://localhost:8080/api/perfume';

  constructor(private httpClient: HttpClient) {
  }

  getAll(size: number): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/api/perfume/list?size=' + size);
  }

  getAll2(): Observable<any> {
    return this.httpClient.get<any>(this.URL_COMMODITY + '/getList');
  }

  delete(id: number) {
    return this.httpClient.delete<any>('http://localhost:8080/api/perfume/delete/' + id);
  }

  changePage(page: number): Observable<Perfume[]> {
    return this.httpClient.get<Perfume[]>('http://localhost:8080/api/perfume/list?page=' + page);
  }

  search(id: number, type: string): Observable<Perfume[]> {
    return this.httpClient.get<Perfume[]>('http://localhost:8080/api/perfume/search/' + id + '/' + type);
  }

  search2(id: number, type: string, page: number): Observable<Perfume[]> {
    return this.httpClient.get<Perfume[]>('http://localhost:8080/api/perfume/search/' + id + '/' + type + '?page=' + page);
  }

  getAllPerfume(request: any): Observable<any> {
    const params = request;
    return this.httpClient.get<any>(this.URL_COMMODITY, {params});
  }

  searchPerfume(name: any,
                request: any): Observable<any> {
    const params = request;
    const url = this.URL_COMMODITY +
      '?name=' + name;
    return this.httpClient.get<any>(url, {params});
  }

  findById(id: number): Observable<Perfume> {
    return this.httpClient.get<Perfume>(`${(this.URL_COMMODITY)}/${id}`);
  }

  searchPerfumeByName(name: string, page: number): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/home/search?name=' + name + '&page=' + page);
  }

  searchPerfumeByPrice(price: string, page: number): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/home/search?price=' + price + '&page=' + page);
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

  getPerfumeInCart(idUser: number): Observable<IOrderDetail[]> {
    return this.httpClient.get<IOrderDetail[]>('http://localhost:8080/api/perfume/get-perfume-in-cart/' + idUser);
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

  updatePaymentStatus(order){
    let dto = []
    for (let i = 0; i < order.length; i++) {
      let dto2 = { id:order[i].idOrder,
      quantity:order[i].quantity }
      dto.push(dto2)
    }
    return this.httpClient.post('http://localhost:8080/api/perfume/payment',  dto);
  }

  getCartByIdUser(idUser : number): Observable<Cart>{
    return this.httpClient.get<Cart>('http://localhost:8080/api/perfume/' + idUser)
  }
}
