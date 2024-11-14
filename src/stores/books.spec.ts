import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest';
import { useBooksStore } from './books';
import { api } from '@/composables/api';

const book = {
  "author":"Marcel Proust",
  "cover":"http://telmas-MBP.Home:3000/images/01.jpg",
  "rating":"9.9",
  "slug":"in-search-of-lost-time",
  "synopsis":"In Search of Lost Time, also translated as Remembrance of Things Past, novel in seven parts by Marcel Proust, published in French as À la recherche du temps perdu from 1913 to 1927. The novel is the story of Proust's own life, told as an allegorical search for truth.\nIn Search of Lost Time, also translated as Remembrance of Things Past, novel in seven parts by Marcel Proust, published in French as À la recherche du temps perdu from 1913 to 1927. The novel is the story of Proust's own life, told as an allegorical search for truth.",
  "title":"In Search of Lost Time",
  "upvoted":false,
  "upvotes":1111
};

const list = [
  {
    "author":"Marcel Proust",
    "cover":"http://telmas-MBP.Home:3000/images/01.jpg",
    "rating":"9.9",
    "slug":"in-search-of-lost-time",
    "synopsis":"In Search of Lost Time, also translated as Remembrance of Things Past, novel in seven parts by Marcel Proust, published in French as À la recherche du temps perdu from 1913 to 1927. The novel is the story of Proust's own life, told as an allegorical search for truth.\nIn Search of Lost Time, also translated as Remembrance of Things Past, novel in seven parts by Marcel Proust, published in French as À la recherche du temps perdu from 1913 to 1927. The novel is the story of Proust's own life, told as an allegorical search for truth.",
    "title":"In Search of Lost Time",
    "upvoted":false,
    "upvotes":1111
  },
  {
    "author":"Miguel de Cervantes",
    "cover":"http://telmas-MBP.Home:3000/images/02.jpg",
    "rating":"9.8",
    "slug":"don-quixote",
    "synopsis":"Don Quixote is a middle-aged gentleman from the region of La Mancha in central Spain. Obsessed with the chivalrous ideals touted in books he has read, he decides to take up his lance and sword to defend the helpless and destroy the wicked.\nDon Quixote is a middle-aged gentleman from the region of La Mancha in central Spain. Obsessed with the chivalrous ideals touted in books he has read, he decides to take up his lance and sword to defend the helpless and destroy the wicked.",
    "title":"Don Quixote",
    "upvoted":true,
    "upvotes":1022
  },
];

vi.mock('@/composables/api', () => ({
  api: vi.fn(),
}));

describe('useBooksStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('fetchBooks should populate the list and listTotal', async () => {
    const booksResponse = {
      books: list,
      meta: { count: 2 },
    };

    (api as Mock).mockReturnValue({
      get: vi.fn().mockResolvedValueOnce(booksResponse),
    });

    const booksStore = useBooksStore();

    const result = await booksStore.fetchBooks();

    expect(result).toEqual(booksResponse.books);
    expect(booksStore.list).toEqual(booksResponse.books);
    expect(booksStore.listTotal).toBe(2);
  });

  it('fetchBook should populate the book', async () => {
    (api as Mock).mockReturnValue({
      get: vi.fn().mockResolvedValueOnce(book),
    });

    const booksStore = useBooksStore();

    const result = await booksStore.fetchBook('in-search-of-lost-time');

    expect(result).toEqual(book);
    expect(booksStore.book).toEqual(book);
  });

  it('upvote should increment upvotes and mark book as upvoted', () => {
    const booksStore = useBooksStore();

    booksStore.list = list;
    booksStore.book = book;

    let upvotedBooks = booksStore.list.filter((book) => book.upvoted === true);
    expect(upvotedBooks?.length).toBe(1);
    let bookFromList = booksStore.list.find((book) => book.slug === 'in-search-of-lost-time');
    expect(bookFromList?.upvotes).toBe(1111);
    expect(bookFromList?.upvoted).toBe(false);
    expect(booksStore.book.upvoted).toBe(false);

    booksStore.upvote('in-search-of-lost-time');

    upvotedBooks = booksStore.list.filter((book) => book.upvoted === true);
    expect(upvotedBooks?.length).toBe(2);
    bookFromList = booksStore.list.find((book) => book.slug === 'in-search-of-lost-time');
    expect(bookFromList?.upvotes).toBe(1112);
    expect(bookFromList?.upvoted).toBe(true);

    expect(booksStore.book?.upvotes).toBe(1112);
    expect(booksStore.book?.upvoted).toBe(true);
  });
});