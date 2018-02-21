const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your test blocks below:
    //setup
    //create an item in the database using seedItemToDatabase()
    
    describe('new view is rendered',  ()=> {
        it('returns newly created item in the one page view', async ()=> {
            
            const addedItem = await seedItemToDatabase();
    
            //make a request for the item and get item id
            const itemId = addedItem._id;
       
            //go to singlepageview with the item
            const response = await request(app)
                                        .get('/items/' +itemId);
            
            //assert created item an title are in the returned HTML
            
            assert.include(parseTextFromHTML(response.text, '#item-title'), addedItem.title);
        });
    
    });
    
    
  
});
