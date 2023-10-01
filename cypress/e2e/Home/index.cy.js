describe('example to-do app', () => {
  beforeEach(() => {
    // Always go to the home page before each test
    cy.visit('http://localhost:3000/')
  })

  it('Main Promo and the For You blocks are visible', () => {
    // See if elements are visible
    cy.get('#mainPromo').should('be.visible')
    cy.get('#forYou').should('be.visible')
  })

  it('Search', () => {
    // We'll store our item text in a variable so we can reuse it
    let newItem = 'Chucky'

    // Click on the search button
    cy.get('img[alt="Loop icon"]').click()

    // See if the searchbar is autofocused
    cy.get('input[placeholder="Search OMDb.."]').should('be.focused');

    // Type in the search box the text we want to search for
    cy.get('input[placeholder="Search OMDb.."]').type(newItem)

    // See if search results
    cy.get('#searchResults').should('be.visible').should('not.contain', `No results found for ${newItem}.`)

    // Search for something that does not exist
    newItem += Date.now()
    cy.get('input[placeholder="Search OMDb.."]').clear().type(newItem)
    cy.get('#searchResults').should('be.visible').should('contain', `No results found for ${newItem}.`)

    // If Esc pressed, no more search modal should be found
    cy.get('body').type('{esc}');
    cy.get('input[placeholder="Search OMDb.."]').should('not.exist');
  })
})
