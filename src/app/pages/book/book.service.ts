import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpUtilService } from './../../Utils/http-util.service';
import { Book, ItemBook } from "./book.model";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient, private httpUtil: HttpUtilService) { }

  async get(search?: string, anoInicial?: number, anoFinal?: number, page?: number): Promise<ItemBook> {
    const params = [];
    if (search) {
      params.push(`search=${search}`);
    }

    if (anoInicial) {
      params.push(`anoInicial=${anoInicial}`);
    }

    if (anoFinal) {
      params.push(`anoFinal=${anoFinal}`);
    }

    if (page) {
      params.push(`page=${page}`);
    }

    return this.http.get<ItemBook>(this.httpUtil.url(`books?${params.join('&')}`)).toPromise();
  }

  async getById(id: string): Promise<Book> {
    return this.http.get<Book>(this.httpUtil.url(`books/${id}`)).toPromise();
  }

  async add(book: Book): Promise<Book> {
    return this.http.post<Book>(this.httpUtil.url('books'), book).toPromise();
  }

  async update(book: Book): Promise<Book> {
    return this.http.put<Book>(this.httpUtil.url(`books/${book.id}`), book).toPromise();
  }

  async delete(id: string): Promise<Book> {
    return this.http.delete<Book>(this.httpUtil.url(`books/${id}`)).toPromise();
  }
}
