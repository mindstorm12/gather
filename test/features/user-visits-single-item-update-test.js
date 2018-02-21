//necessary libraries
const {assert} = require('chai');

const { buildItemObject} = require('../test-utils');
const Item = require('../../models/item');

//tests for single item view

describe('user clicks on update in single item view', () => {
    
    describe('update view item page', () => {
        it ('can visit update', async() => {
            
            //setup
            browser.url('/items/create');

            const itemObject =  buildItemObject();

            //exercise

            browser.setValue('input[id=title-input]', itemObject.title);
            browser.setValue('textarea[id=description-input]', itemObject.description);
            browser.setValue('#imageUrl-input', itemObject.imageUrl);

            browser.click('button[type=submit]');
          
            //get added item as an object
            const createdItem =  await Item.findOne({title: itemObject.title});
               
            //last inserted item will be the last item in the array
            const lastInsertedId = createdItem._id;

            //click on the item that has been created in the main view
          
            //use its id to find the delete link
            const clickLink = `a[href="/items/${lastInsertedId}"]`;
         
            //click on the link
             browser.click(clickLink);
            
            const clickLink2 = `a[href="/update/${lastInsertedId}"]`;
            
             browser.click(clickLink2);
         
            //exercise
            //new description
            const descUpdate = 'This whole thing was always a setup';
            
            await browser.setValue('input[id=title-input]', 'Test');
            await browser.setValue('textarea[id=description-input]', descUpdate);
            await browser.setValue('#imageUrl-input', itemObject.imageUrl);

            await browser.click('button[type=submit]');
            //after submit, website should redirect to main page.
            

            assert.include(await browser.getText('body'), 'Test');
            

        });
        
    });
    
});