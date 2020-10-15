import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule, NzCardModule, NzFormModule, NzInputModule } from 'ng-zorro-antd';
import { NgxMaskModule } from 'ngx-mask';
import { AddBookComponent } from './add-book.component';
import { AddBookRoutingModule } from './add-book.routing';

@NgModule({
  declarations: [AddBookComponent],
  imports: [
    FormsModule,
    CommonModule,
    NzFormModule,
    NzCardModule,
    NzInputModule,
    NzButtonModule,
    ReactiveFormsModule,
    AddBookRoutingModule,
    NgxMaskModule.forRoot()
  ]
})
export class AddBookModule { }
