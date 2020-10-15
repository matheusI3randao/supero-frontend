import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { BookService } from '../book.service';
import { Book } from './../book.model';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  id: string;
  book: Book;
  new: boolean;
  formBook: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private message: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  addBook() {
    if (this.formBook.invalid) {
      this.message.warning('É necessário preencher todos os campos para adiconar um novo livro!');
      return;
    }

    this.book = {
      id: this.id,
      titulo: this.formBook.controls.titulo.value,
      isbn: this.formBook.controls.isbn.value,
      autor: this.formBook.controls.autor.value,
      editora: this.formBook.controls.editora.value,
      ano: parseInt(this.formBook.controls.ano.value, 10),
      idioma: this.formBook.controls.idioma.value,
      peso: parseInt(this.formBook.controls.peso.value, 10),
      comprimento: parseInt(this.formBook.controls.comprimento.value, 10),
      largura: parseInt(this.formBook.controls.largura.value, 10),
      altura: parseInt(this.formBook.controls.altura.value, 10)
    }

    if (this.new) {
      this.bookService.add(this.book).then(() => {
        this.message.success('Livro adicionado com sucesso!');
        this.router.navigate(['book']);
      }).catch((error: HttpErrorResponse) => {
        this.message.error(error.message);
      });
    } else {
      this.bookService.update(this.book).then(() => {
        this.message.success('Livro atualizado com sucesso!');
        this.router.navigate(['book']);
      }).catch((error: HttpErrorResponse) => {
        this.message.error(error.message);
      });
    }
  }

  ngOnInit(): void {
    this.new = true;

    this.activatedRoute.params.subscribe(rout => {
      const { id } = rout;

      if (id) {
        this.id = id;
        this.bookService.getById(id).then(res => {
          this.new = false;
          this.formBook.patchValue(res);
        }).catch((error: HttpErrorResponse) => {
          this.message.error(error.message);
        });
      }
    });


    this.formBook = this.fb.group({
      titulo: ['LIVRO DE TESTE', Validators.required],
      isbn: ['123456789', Validators.required],
      autor: ['MATHEUS BRANDÃO', Validators.required],
      editora: ['EDITORA SUPERO', Validators.required],
      ano: ['2020', Validators.required],
      idioma: ['PORTUGUÊS', Validators.required],
      peso: ['100', Validators.required],
      comprimento: ['22', Validators.required],
      largura: ['10', Validators.required],
      altura: ['25', Validators.required]
    });
  }
}
