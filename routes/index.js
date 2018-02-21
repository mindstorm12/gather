const router = require('express').Router();

const Item = require('../models/item');

router.get('/', async (req, res, next) => {
  const items = await Item.find({});
  res.render('index', {items});

    
});

// Add additional routes below:
router.get('/items/create', async (req, res, next)=> {
    
    res.render('create');

});

router.post('/items/create', async (req, res, next) => {
    
    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    
    const newItem = new Item({title, description, imageUrl});
    
    newItem.validateSync();
    
    if (newItem.errors) {
        res.status(400).render('create', {newItem: newItem});
        
    } else {
        await newItem.save();
        res.redirect('/');
    }

});

router.get('/items/:id', async (req, res, next) => {
    
    const itemId = req.params.id;
  const items = await Item.findById({_id:itemId});
    
  res.render('singlelayout', {items});
});


//delete route
router.post('/items/:id/delete', async (req, res, next) => {
    
    const itemId = req.params.id;
    
    //DEBUG HERE
    await Item.remove({_id:itemId});
    res.redirect('/');

});

router.get('/update/:id', async (req, res, next) => {
    
    const itemId = req.params.id;
    const items = await Item.findById({_id:itemId});
    
  res.render('updatelayout', {items});
});

router.post('/items/:id/update', async (req, res, next) => {
    
    const itemId = req.params.id;
    const items = await Item.findById({_id:itemId});
    
    const title = req.body.title;
    const description = req.body.description;
    const imageUrl = req.body.imageUrl;
    
    await Item.update({'_id':itemId}, 
                     {$set:
                      {'title':title,
                          'description':description,
                        'imageUrl':imageUrl
                      }
                     });
    
    res.redirect('/');
});


module.exports = router;
