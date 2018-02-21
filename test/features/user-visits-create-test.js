const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

// Add your tests below:

describe('visits /items/create', () => {
    
    describe('posts new item', () => {
        it ('rendered on the page', () => {
            //setup
            browser.url('/items/create');

            const itemObject =  buildItemObject();

            //exercise

            browser.setValue('input[id=title-input]', itemObject.title);
            browser.setValue('textarea[id=description-input]', itemObject.description);
            browser.setValue('#imageUrl-input', itemObject.imageUrl);

            browser.click('button[type=submit]');

            //verify

            assert.include(browser.getText('body'), itemObject.title);
            assert.include(browser.getAttribute('body img', 'src'), itemObject.imageUrl);

        });
    });
    
});
