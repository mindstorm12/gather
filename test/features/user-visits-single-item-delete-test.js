//necessary libraries
const {assert} = require('chai');

const { buildItemObject} = require('../test-utils');
const Item = require('../../models/item');

//tests for single item view

describe('user clicks on one item in main view', () => {
    
    describe('single view item page', () => {
        it ('deletes information', async () => {
            
            //setup
            browser.url('/items/create');

            const itemObject =  buildItemObject();

            //exercise

            browser.setValue('input[id=title-input]', itemObject.title);
            browser.setValue('textarea[id=description-input]', itemObject.description);
            browser.setValue('#imageUrl-input', itemObject.imageUrl);

            browser.click('button[type=submit]');
          
            //get added item as an object
            const createdItem = await Item.findOne({title: itemObject.title});
               
            //last inserted item will be the last item in the array
            const lastInsertedId = createdItem._id;

            //click on the item that has been created in the main view
          
            //use its id to find the delete link
            const clickLink = `#delete-${lastInsertedId}`;
         
            //click on the link
            browser.submitForm(clickLink);
            
            //after clicking the link the main page should be loaded and the item shouldn't be on it. assert that
        
            //verify
            //assert that the description is not in the body of the new page
            assert.notInclude(await browser.getText('body'), itemObject.description);

        });
    });
    
});