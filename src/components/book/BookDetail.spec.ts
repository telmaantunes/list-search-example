import { describe, it, expect } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { mount, RouterLinkStub } from '@vue/test-utils';
import BookDetail from './BookDetail.vue';
import { useBooksStore } from '@/stores/books';

const book = {
  "author": "Marcel Proust",
  "cover": "http://telmas-MBP.Home:3000/images/01.jpg",
  "rating": "9.9",
  "slug": "in-search-of-lost-time",
  "synopsis": "In Search of Lost Time, also translated as Remembrance of Things Past, novel in seven parts by Marcel Proust, published in French as À la recherche du temps perdu from 1913 to 1927. The novel is the story of Proust's own life, told as an allegorical search for truth.\nIn Search of Lost Time, also translated as Remembrance of Things Past, novel in seven parts by Marcel Proust, published in French as À la recherche du temps perdu from 1913 to 1927. The novel is the story of Proust's own life, told as an allegorical search for truth.",
  "title": "In Search of Lost Time",
  "upvoted": false,
  "upvotes": 1111
};

describe('BookDetail', () => {
  it('renders properly', async () => {
    const wrapper = mount(BookDetail, { 
      global: {
        plugins: [createTestingPinia()],
        stubs: {
          RouterLink: RouterLinkStub
        }
      },
      props: { item: book }
    });

    expect(wrapper.text()).toContain(book.title);
    expect(wrapper.text()).toContain(book.author);
    expect(wrapper.text()).toContain('Upvoted 1111 times');

  });

  it('calls store.upvote when the upvote button is clicked', async () => {
    const wrapper = mount(BookDetail, {
      global: {
        plugins: [createTestingPinia({ stubActions: false })],
        stubs: {
          RouterLink: RouterLinkStub
        }
      },
      props: {
        item: book,
      },
    });
    const store = useBooksStore();

    const upvoteButton = wrapper.find('button.book-detail__upvote');
    await upvoteButton.trigger('click');

    expect(store.upvote).toHaveBeenCalledWith(book.slug);
  });
});
