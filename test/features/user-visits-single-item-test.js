//necessary libraries
const {assert} = require('chai');

const { buildItemObject} = require('../test-utils');
const Item = require('../../models/item');

//tests for single item view

describe('user clicks on one item in main view', () => {
    
    describe('single view item page', () => {
        it ('displays information', async () => {

            //setup
            browser.url('/items/create');

            const itemObject =  buildItemObject();

            //exercise

            browser.setValue('input[id=title-input]', itemObject.title);
            browser.setValue('textarea[id=description-input]', itemObject.description);
            browser.setValue('#imageUrl-input', itemObject.imageUrl);

            browser.click('button[type=submit]');
          
//            //get added item as an object
            const createdItem = await Item.findOne({title: itemObject.title});
               
//             //last inserted item will be the last item in the array
            const lastInsertedId = createdItem._id;

//            //click on the item that has been created in the main view
          
//            use its id to find the link
            const clickLink = `a[href="/items/${lastInsertedId}"]`;
         
            //click on the link
            await browser.click(clickLink);
        
//            //verify
//            //assert that the description is in the body of the new page
            assert.include(await browser.getText('body'), itemObject.description);

        });
    });
    
});