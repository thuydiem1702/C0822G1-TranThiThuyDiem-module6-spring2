import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Perfume} from '../entity/perfume';

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

  getAllByQuantitySold(size: number): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/api/perfume/list?size=' + size);
  }

  addPerfume(perfume): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/perfume/create', perfume);
  }

  findPerfumeById(id): Observable<any> {
    return this.httpClient.get<any>('http://localhost:8080/api/perfume/' + id);

  }

  editPerfume(id, perfume): Observable<any> {
    return this.httpClient.put<any>('http://localhost:8080/api/perfume/edit/' + id, perfume);
  }
}
