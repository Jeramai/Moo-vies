import ForYou from '../../src/components/home/ForYou';

describe('<ForYou />', () => {
  beforeEach(() => {
    // Grab placeholder image to replace Next.js backend image
    cy.readFile('./public/images/placeholder.jpg', null).then((img) => {
      // Intercept requests to Next.js backend image endpoint
      cy.intercept('_next/image*', {
        statusCode: 200,
        headers: { 'Content-Type': 'image/png' },
        body: img.buffer
      });
    });
  });

  it('renders placehodlers without input', () => {
    cy.mount(<ForYou />);

    // Some checks for the content
    cy.get('.text-2xl.font-bold.mb-3.max-w-xl.m-auto').contains("You'll like these 🔥");
    cy.get('.flex.overflow-x-scroll').children().should('have.length', 7); // placeholder element count is always 7
    cy.get('.flex.overflow-x-scroll')
      .children()
      .each(($el) => {
        cy.wrap($el).find('img').should('exist');
        cy.wrap($el).find('a.p-3.text-lg.text-center.font-bold').should('contain', 'Placeholder'); // Placeholders always have placeholder as their text
      });

    // Check if urls are not redirecting
    cy.get('.flex.overflow-x-scroll').children().first().as('block1');
    cy.get('@block1').click();
    cy.url().should((text) => {
      expect(text.trim().endsWith('#')).to.be.true;
    });
  });

  it('renders with input', () => {
    const recommended = [
      { imdbID: 1, Type: 'movie', Title: '1', Poster: '/' },
      { imdbID: 2, Type: 'series', Title: '2', Poster: 'N/A' }
    ];
    cy.mount(<ForYou recommended={recommended} />);

    // Some checks for the content
    cy.get('.text-2xl.font-bold.mb-3.max-w-xl.m-auto').contains("You'll like these 🔥");
    cy.get('.flex.overflow-x-scroll').children().should('have.length', recommended.length);
    cy.get('.flex.overflow-x-scroll')
      .children()
      .each(($el, i) => {
        cy.wrap($el).find('img').should('exist');
        cy.wrap($el).find('a.p-3.text-lg.text-center.font-bold').should('contain', recommended[i].Title);
      });

    // Check if urls are redirecting
    cy.location().then((loc) => {
      cy.get('.flex.overflow-x-scroll').children().first().find('a').as('block1');
      cy.get('@block1').should('have.attr', 'href').and('not.include', loc.href);
    });
  });
});
