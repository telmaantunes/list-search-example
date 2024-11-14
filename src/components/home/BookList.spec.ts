import { describe, it, expect, vi } from 'vitest';
import { mount, RouterLinkStub } from '@vue/test-utils';
import BooksList from './BooksList.vue';
import BookItem from './BookItem.vue';
import PaginationSection from '../PaginationSection.vue';

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
  {
    "author":"James Joyce",
    "cover":"http://telmas-MBP.Home:3000/images/03.jpg",
    "rating":"9.6",
    "slug":"ulysses",
    "synopsis":"All the action of Ulysses takes place in and immediately around Dublin on a single day (June 16, 1904). The three central characters—Stephen Dedalus (the hero of Joyce’s earlier Portrait of the Artist as a Young Man); Leopold Bloom, a Jewish advertising canvasser; and his wife, Molly—are intended to be modern counterparts of Telemachus, Ulysses (Odysseus), and Penelope, respectively, and the events of the novel loosely parallel the major events in Odysseus’s journey home after the Trojan War.\nAll the action of Ulysses takes place in and immediately around Dublin on a single day (June 16, 1904). The three central characters—Stephen Dedalus (the hero of Joyce’s earlier Portrait of the Artist as a Young Man); Leopold Bloom, a Jewish advertising canvasser; and his wife, Molly—are intended to be modern counterparts of Telemachus, Ulysses (Odysseus), and Penelope, respectively, and the events of the novel loosely parallel the major events in Odysseus’s journey home after the Trojan War.",
    "title":"Ulysses",
    "upvoted":false,
    "upvotes":1003
  },
  {
    "author":"F. Scott Fitzgerald",
    "cover":"http://telmas-MBP.Home:3000/images/04.jpg",
    "rating":"9.3",
    "slug":"the-great-gatsby",
    "synopsis":"The Great Gatsby is a story told by Nick Carraway, who was once Gatsby's neighbor, and he tells the story sometime after 1922, when the incidents that fill the book take place. As the story opens, Nick has just moved from the Midwest to West Egg, Long Island, seeking his fortune as a bond salesman.\nThe Great Gatsby is a story told by Nick Carraway, who was once Gatsby's neighbor, and he tells the story sometime after 1922, when the incidents that fill the book take place. As the story opens, Nick has just moved from the Midwest to West Egg, Long Island, seeking his fortune as a bond salesman.",
    "title":"The Great Gatsby",
    "upvoted":false,
    "upvotes":991
  },
  {
    "author":"Herman Melville",
    "cover":"http://telmas-MBP.Home:3000/images/05.jpg",
    "rating":"9.1",
    "slug":"moby-dick",
    "synopsis":"The sole survivor of a lost whaling ship relates the tale of his captain's self-destructive obsession to hunt the white whale, Moby Dick. This classic story by Herman Melville revolves around Captain Ahab and his obsession with a huge whale, Moby Dick.\nThe sole survivor of a lost whaling ship relates the tale of his captain's self-destructive obsession to hunt the white whale, Moby Dick. This classic story by Herman Melville revolves around Captain Ahab and his obsession with a huge whale, Moby Dick.",
    "title":"Moby Dick",
    "upvoted":true,
    "upvotes":940
  },
  {
    "author":"William Shakespeare",
    "cover":"http://telmas-MBP.Home:3000/images/06.jpg",
    "rating":"9.0",
    "slug":"hamlet",
    "synopsis":"Hamlet, Prince of Denmark, is home from school to mourn the death of his father, King Hamlet, who has died two months earlier. Hamlet is disgusted by the marriage of his newly widowed mother, Queen Gertrude, to his Uncle, King Hamlet's brother, Claudius, who now has the throne.\nHamlet, Prince of Denmark, is home from school to mourn the death of his father, King Hamlet, who has died two months earlier. Hamlet is disgusted by the marriage of his newly widowed mother, Queen Gertrude, to his Uncle, King Hamlet's brother, Claudius, who now has the throne.",
    "title":"Hamlet",
    "upvoted":false,
    "upvotes":909
  },
  {
    "author":"Leo Tolstoy",
    "cover":"http://telmas-MBP.Home:3000/images/07.jpg",
    "rating":"8.8",
    "slug":"war-and-peace",
    "synopsis":"War and Peace broadly focuses on Napoleon’s invasion of Russia in 1812 and follows three of the most well-known characters in literature: Pierre Bezukhov, the illegitimate son of a count who is fighting for his inheritance and yearning for spiritual fulfillment; Prince Andrei Bolkonsky, who leaves his family behind to fight in the war against Napoleon; and Natasha Rostov, the beautiful young daughter of a nobleman who intrigues both men.\nWar and Peace broadly focuses on Napoleon’s invasion of Russia in 1812 and follows three of the most well-known characters in literature: Pierre Bezukhov, the illegitimate son of a count who is fighting for his inheritance and yearning for spiritual fulfillment; Prince Andrei Bolkonsky, who leaves his family behind to fight in the war against Napoleon; and Natasha Rostov, the beautiful young daughter of a nobleman who intrigues both men.",
    "title":"War and Peace",
    "upvoted":true,
    "upvotes":839
  },
  {
    "author":"Homer",
    "cover":"http://telmas-MBP.Home:3000/images/08.jpg",
    "rating":"8.5",
    "slug":"the-odyssey",
    "synopsis":"With the consent of Zeus, Athena travels to Ithaca to speak with Telemachus. Assuming the form of Odysseus's old friend Mentes, Athena predicts that Odysseus is still alive and that he will soon return to Ithaca. She advises Telemachus to call together the suitors and announce their banishment from his father's estate.\nWith the consent of Zeus, Athena travels to Ithaca to speak with Telemachus. Assuming the form of Odysseus's old friend Mentes, Athena predicts that Odysseus is still alive and that he will soon return to Ithaca. She advises Telemachus to call together the suitors and announce their banishment from his father's estate.",
    "title":"The Odyssey",
    "upvoted":false,
    "upvotes":802
  },
  {
    "author":"Gabriel Garcia Marquez",
    "cover":"http://telmas-MBP.Home:3000/images/09.jpg",
    "rating":"8.2",
    "slug":"one-hundred-years-of-solitude",
    "synopsis":"The patriarch of the family, José Arcadio Buendía, is impulsive and inquisitive. He remains a leader who is also deeply solitary, alienating himself from other men in his obsessive investigations into mysterious matters. These character traits are inherited by his descendents throughout the novel.\nThe patriarch of the family, José Arcadio Buendía, is impulsive and inquisitive. He remains a leader who is also deeply solitary, alienating himself from other men in his obsessive investigations into mysterious matters. These character traits are inherited by his descendents throughout the novel.",
    "title":"One Hundred Years of Solitude",
    "upvoted":true,
    "upvotes":723
  },
  {
    "author":"Dante Alighieri",
    "cover":"http://telmas-MBP.Home:3000/images/10.jpg",
    "rating":"8.1",
    "slug":"the-divine-comedy",
    "synopsis":"In the Divine comedy poem, he is the main character. The plot is set up in 1300, around the time Dante was in exile from his native Florence. But the actual writing was done by him between 1308 and 1321 at the time of his death. The Divine Comedy summary gives a picture of the realms of Dante's afterlife.\nIn the Divine comedy poem, he is the main character. The plot is set up in 1300, around the time Dante was in exile from his native Florence. But the actual writing was done by him between 1308 and 1321 at the time of his death. The Divine Comedy summary gives a picture of the realms of Dante's afterlife.",
    "title":"The Divine Comedy",
    "upvoted":false,
    "upvotes":749
  }
];
vi.mock('@/stores/books', () => {
  return {
    useBooksStore: vi.fn(() => ({
      list
    }))
  };
});

describe('BooksList.vue', () => {
  it('renders book list properly', () => {
    const wrapper = mount(BooksList, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });

    const bookItems = wrapper.findAllComponents(BookItem);
    expect(bookItems.length).toBe(3);
  });

  it('filters books based on search input', async () => {
    const wrapper = mount(BooksList, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });
    
    const searchInput = wrapper.find('input[type="text"]');
    await searchInput.setValue('gatsby');

    const bookItems = wrapper.findAllComponents(BookItem);
    expect(bookItems.length).toBe(1);
    expect(bookItems[0].props('item').title).toBe('The Great Gatsby');
  });

  it('changes page and shows new books', async () => {
    const wrapper = mount(BooksList, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub
        }
      }
    });

    let bookItems = wrapper.findAllComponents(BookItem);
    expect(bookItems[0].props('item').title).toBe('In Search of Lost Time');
    expect(bookItems.length).toBe(3);

    const pagination = wrapper.findComponent(PaginationSection);
    await pagination.vm.$emit('update:modelValue', 2);

    bookItems = wrapper.findAllComponents(BookItem);
    expect(bookItems[0].props('item').title).toBe('The Great Gatsby');
    expect(bookItems.length).toBe(3);
  });
});
