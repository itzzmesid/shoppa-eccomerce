const express = require('express'); 
const router = express.Router();

const {requireSignin} = require('../middleware/tokenAuth');
const {requireUserSignin} = require('../middleware/userAuth');
const {addToWishlist} = require('../controllers/addItemToWishlist');
const {listFromWishlist} = require('../controllers/listItemsInWishlist');
const {removeItemFromWishlist} = require('../controllers/removeItemFromWishlist');
const {deleteWishlist} = require('../controllers/deleteAnExistingWishlist');

router.post('/', requireSignin, requireUserSignin, addToWishlist);
router.get('/', requireSignin, requireUserSignin, listFromWishlist);
router.delete('/item/', requireSignin, requireUserSignin, removeItemFromWishlist);
router.delete('/:id', requireSignin, requireUserSignin, deleteWishlist);

module.exports = router;