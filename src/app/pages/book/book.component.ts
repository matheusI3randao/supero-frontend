import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService, NzTableQueryParams } from 'ng-zorro-antd';
import { Book, ResultBook, ItemBook } from "./book.model";
import { BookService } from './book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  pageIndex = 1;
  pageSize = 10;

  bookDetail: Book;
  resultBook: ResultBook;
  formBook: FormGroup;

  loading: boolean;
  onDetail: boolean;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private message: NzMessageService,
    private router: Router) { }

  resetForm() {
    this.formBook.reset();
    this.resultBook = null;
  }

  async search(page?: number) {
    this.loading = true;

    const search = this.formBook.controls.search?.value;
    const anoInicio = this.formBook.controls.anoInicio?.value;
    const anoFim = this.formBook.controls.anoFim?.value;

    console.log(search, anoInicio, anoFim);

    await this.bookService.get(search, anoInicio?.getFullYear(), anoFim?.getFullYear(), page).then((res: any) => {
      this.resultBook = res;
    }).catch((error: HttpErrorResponse) => {
      this.message.error(error.message);
    });

    this.loading = false;
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { pageIndex } = params;
    this.search(pageIndex);
  }

  deleteRow(row: ItemBook) {
    this.bookService.delete(row.id).then(res => {
      this.message.success('Livro deleteado com sucesso!');
      this.resultBook.items = this.resultBook.items.filter(i => i.id !== row.id);
    }).catch((error: HttpErrorResponse) => {
      this.message.error(error.message);
    })
  }

  edit(id: string) {
    console.log(id);
    this.router.navigate(['book/cadastrar', { id }]);
  }

  detail(id: string) {
    this.bookService.getById(id).then(res => {
      this.onDetail = true;
      this.bookDetail = res;
    }).catch((error: HttpErrorResponse) => {
      this.message.error(error.message);
    })
  }

  handleOk() {
    this.onDetail = false;
  }

  ngOnInit() {
    this.formBook = this.fb.group({
      search: [],
      anoInicio: [],
      anoFim: []
    });
  }
}
