const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, diconnectDatabase} = require('../setup-teardown-utils');

const findImageElementBySource = (htmlAsString, src) => {
  const image = jsdom(htmlAsString).querySelector(`img[src="${src}"]`);
  if (image !== null) {
    return image;
  } else {
    throw new Error(`Image with src "${src}" not found in HTML string`);
  }
};

describe('Server path: /items/create', () => {
  const itemToCreate = buildItemObject();

  beforeEach(connectDatabaseAndDropData);

  afterEach(diconnectDatabase);

  // Write your describe blocks below:
    describe ('GET',  () => {
        it ('renders empty inputfields', async () => {
            //exercise
            const response = await request(app)
                                        .get('/items/create');
            assert.equal(parseTextFromHTML(response.text, 'input#title-input'), '');
            assert.equal(parseTextFromHTML(response.text, 'input#imageUrl-input'), '');
            assert.equal(parseTextFromHTML(response.text, 'textarea#description-input'), '');
            //verify
        });
    });
    
    describe ('POST',  () => {
        it ('creates an item', async () => {

            const itemToCreate = buildItemObject();
            const response = await request(app)
            .post('/items/create')
            .type('form')
            .send(itemToCreate);

            //exercise
            const createdItem = await Item.findOne(itemToCreate);

            assert.isOk(createdItem, 'Item not null');
            //type form mimics browser behaviour

            //verify
        });
        
        it ('route redirects after posting', async() => {
            
            const itemToCreate = buildItemObject();
            const response = await request(app)
            .post('/items/create')
            .type('form')
            .send(itemToCreate);
            
            //verify
            assert.equal(response.status, 302);
            assert.equal(response.headers.location, '/');
  
            
        });
        
        it ('/items/create request with no title should display an error message', async () => {
            const itemToSend = 
                  {
                    description : 'This is a test',
                    imageUrl :'http://bloodborne.wiki.fextralife.com/file/bloodborne_small.jpg',
                  };
            
            const response = await request(app)
            .post('/items/create')
            .type('form')
            .send(itemToSend);
            
            //verify
            const allItems = await Item.find({});

            assert.equal(allItems.length, '0');
            assert.equal(response.status, 400);
            assert.include(parseTextFromHTML(response.text, 'form'), 'required');
        });
        
        it ('/items/create request with no description should display an error message', async () => {
            const itemToSend = 
                  {
                    title : 'Test',
                    imageUrl :'http://bloodborne.wiki.fextralife.com/file/bloodborne_small.jpg',
                  };
            
            const response = await request(app)
            .post('/items/create')
            .type('form')
            .send(itemToSend);
            
            //verify
            const allItems = await Item.find({});

            assert.equal(allItems.length, '0');
            assert.equal(response.status, 400);
            assert.include(parseTextFromHTML(response.text, 'form'), 'required');
        });
        
        it ('/items/create request with no imageUrl should display an error message', async () => {
            const itemToSend = 
                  {
                    title : 'Test',
                    description : 'This is a test',
                  };
            
            const response = await request(app)
            .post('/items/create')
            .type('form')
            .send(itemToSend);
            
            //verify
            const allItems = await Item.find({});

            assert.equal(allItems.length, '0');
            assert.equal(response.status, 400);
            assert.include(parseTextFromHTML(response.text, 'form'), 'required');
        });
    });

});
