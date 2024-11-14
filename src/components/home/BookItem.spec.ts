import { describe, it, expect } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { mount, RouterLinkStub } from '@vue/test-utils';
import BookItem from './BookItem.vue';

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

describe('BookItem', () => {
  it('renders properly', async () => {
    const wrapper = mount(BookItem, { 
      global: {
        plugins: [createTestingPinia()],
        stubs: {
          RouterLink: RouterLinkStub
        }
      },
      props: { item: book, index: 0, highlight: undefined }
    });

    expect(wrapper.text()).toContain('1. In Search of Lost');
    expect(wrapper.text()).toContain('Marcel Proust');
    expect(wrapper.text()).toContain('Upvoted 1111 times');
    expect(wrapper.html()).toContain('9.9/10');
    const coverImage = wrapper.find('img.book-item__cover');
    expect(coverImage.exists()).toBe(true);
    expect(coverImage.attributes('src')).toBe('http://telmas-MBP.Home:3000/images/01.jpg');
  });

  it('truncates synopsis correctly when it exceeds 200 characters', () => {
    const wrapper = mount(BookItem, { 
      global: {
        plugins: [createTestingPinia()],
        stubs: {
          RouterLink: RouterLinkStub
        },
      },
      props: { item: book, index: 0, highlight: undefined }
    });

    expect(wrapper.html()).toContain('In Search of Lost Time, also translated as Remembrance of Things Past, novel in seven parts by Marcel Proust, published in French as À la recherche du temps perdu from 1913 to 1927. The novel is the s...');
  });

  it('highlights text based on highlight prop', () => {
    const wrapper = mount(BookItem, { 
      global: {
        plugins: [createTestingPinia()],
        stubs: {
          RouterLink: RouterLinkStub
        },
      },
      props: { item: book, index: 0, highlight: 'lost' }
    });

    expect(wrapper.html()).toContain('<mark>Lost</mark>');
  });
});
