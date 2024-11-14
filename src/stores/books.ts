import { ref } from 'vue';
import { defineStore } from 'pinia';
import { api } from '@/composables/api';

export const useBooksStore = defineStore('books', () => {
  const list = ref<Book[]>([]);
  const listTotal = ref<number>(0);
  const book = ref<Book | undefined>(undefined);
  
  function fetchBooks() {
    return api('books').get<FetchBooksResponse>()
      .then((data) => {
        list.value = data.books;
        listTotal.value = data.meta.count;

        return data.books;
      });
  }

  function fetchBook(slug: string) {
    return api(`books/${slug}`).get<Book>()
      .then((data) => {
        book.value = data;

        return data;
      });
  }

  function upvote(slug:string) {
    const bookFromList = list.value.find(item => item.slug === slug);
    
    if(bookFromList) {
      bookFromList.upvoted = true;
      bookFromList.upvotes = bookFromList.upvotes + 1;
    }

    if(book.value) {
      book.value.upvoted = true;
      book.value.upvotes = book.value.upvotes + 1;
    }

    // should call api
  }

  return { list, listTotal, book, fetchBooks, fetchBook, upvote };
}, { persist: { storage: sessionStorage } });


export interface FetchBooksResponse {
  books: Book[]
  meta: Meta
}

export interface Book {
  author: string
  cover: string
  rating: string
  slug: string
  synopsis: string
  title: string
  upvoted: boolean
  upvotes: number
}

export interface Meta {
  count: number
}
