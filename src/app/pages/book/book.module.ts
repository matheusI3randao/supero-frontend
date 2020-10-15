import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule, NzDatePickerModule, NzDividerModule, NzFormModule, NzInputModule, NzPageHeaderModule, NzPaginationModule, NzTableModule } from 'ng-zorro-antd';
import { HttpUtilService } from './../../Utils/http-util.service';
import { BookComponent } from './book.component';
import { BookRoutingModule } from './book.routing';
import { BookService } from './book.service';
import { AddBookComponent } from './add-book/add-book.component';
import { NzModalModule } from 'ng-zorro-antd';
import { NzPopconfirmModule } from 'ng-zorro-antd';

@NgModule({
  imports: [
    FormsModule,
    NzFormModule,
    CommonModule,
    NzInputModule,
    NzModalModule,
    NzTableModule,
    NzButtonModule,
    NzDividerModule,
    BookRoutingModule,
    NzPageHeaderModule,
    NzPaginationModule,
    NzDatePickerModule,
    NzPopconfirmModule,
    ReactiveFormsModule,
  ],
  declarations: [BookComponent],
  exports: [],
  providers: [BookService, HttpUtilService]
})
export class BookModule { }
