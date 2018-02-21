const Item = require('../../models/item');
const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');

describe('Model: Item', () => {
  beforeEach(async () => {
    await mongoose.connect(databaseUrl, options);
    await mongoose.connection.db.dropDatabase();
  });

  afterEach(async () => {
    await mongoose.disconnect();
  });

  // Write your tests below:
    describe('title', () => {
        it ('should be a string', () => {
            //setup
           const titleNumber = 1;
            
            //exercise
            const item = new Item({title: titleNumber});
            
            //verify
            assert.strictEqual(item.title, titleNumber.toString());
        });
        
        it ('requires a title', () => {
            
            //setup
            const itemNoTitle = new Item ({title: '',
                                imageUrl: 'http://bloodborne.wiki.fextralife.com/file/bloodborne_small.jpg',
                                description: 'This is a test'});
            
            itemNoTitle.validateSync();
            assert.equal(itemNoTitle.errors.title.message, 'Path `title` is required.');
        });
    });
    
    describe('description', () => {
        it ('should be a string', () => {
            //setup
           const descriptionNumber = 1;
            
            //exercise
            const item = new Item({description: descriptionNumber});
            
            //verify
            assert.strictEqual(item.description, descriptionNumber.toString());
        });
        
        it ('requires a description', () => {
            
            //setup
            const itemNoDescription = new Item ({title: 'test',
                                imageUrl: 'http://bloodborne.wiki.fextralife.com/file/bloodborne_small.jpg',
                                description: ''});
            
            itemNoDescription.validateSync();
            assert.equal(itemNoDescription.errors.description.message, 'Path `description` is required.');
        });
    });
    
    describe('imageUrl', () => {
        it ('should be a string', () => {
            //setup
           const imageUrlNumber = 1;
            
            //exercise
            const item = new Item({imageUrl: imageUrlNumber});
            
            //verify
            assert.strictEqual(item.imageUrl, imageUrlNumber.toString());
        });
        
        it ('requires a imageUrl', () => {
            
            //setup
            const itemNoUrl = new Item ({title: 'test',
                                imageUrl: '',
                                description: 'This is a test'});
            
            itemNoUrl.validateSync();
            assert.equal(itemNoUrl.errors.imageUrl.message, 'Path `imageUrl` is required.');
        });
    });
});
