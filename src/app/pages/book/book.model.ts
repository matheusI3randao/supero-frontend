export interface Book {
  id?: string;
  titulo: string;
  isbn: string;
  autor: string;
  editora: string;
  ano: number;
  idioma: string;
  peso: number;
  comprimento: number;
  largura: number;
  altura: number;
}

export interface ResultBook {
  items: ItemBook[];
  totalCount: number;
}

export interface ItemBook {
  ano: number;
  autor: string;
  editora: string;
  id: string;
  isbn: string;
  titulo: string;
}
