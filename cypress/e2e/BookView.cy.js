describe('BookView E2E Test', () => {
  beforeEach(() => {
    cy.visit('/book/in-search-of-lost-time');
  });

  it('should load the book details correctly', () => {
    cy.contains('h1', 'In Search of Lost Time');
    cy.contains('.book-detail__synopsis', 'In Search of Lost Time, also translated as Remembrance of Things Past, novel in seven parts by Marcel Proust, published in French as À la recherche du temps perdu from 1913 to 1927. The novel is the story of Proust\'s own life, told as an allegorical search for truth. In Search of Lost Time, also translated as Remembrance of Things Past, novel in seven parts by Marcel Proust, published in French as À la recherche du temps perdu from 1913 to 1927. The novel is the story of Proust\'s own life, told as an allegorical search for truth.');
  });

  it('should increment upvotes when the upvote button is clicked', () => {
    cy.contains('.book-detail__tiny', '1111');
    cy.get('.book-detail__upvote').click();
    cy.contains('.book-detail__tiny', '1112');
  });

  it('should navigate back to the list of books when clicking the back button', () => {
    cy.get('.book-detail__link').click();

    cy.url().should('include', '/');
    cy.contains('h1', 'Top books of all time');
  });
});