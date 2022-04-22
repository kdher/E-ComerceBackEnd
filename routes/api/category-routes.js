const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categories = await Category.findAll({
    include: [{ model: Product }],
	});
	res.status(200).json(categories);
}); 

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const category = await Category.findOne(req.params.id, {
    include: [{ model: Product }],
	});
	res.status(200).json(category);
});



router.post('/', (req, res) => {
  // create a new category
  const newCategory = await Category.create(req.body);
	res.status(200).json({
		msg: 'Successfully Created New Category!!',
		newCategory,
	});
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  await Category.update(req.body, {
		where: {
			id: req.params.id,
		},
	});
	res.status(200).json({
		msg: 'Successfully Updated Category',
		...req.body,
	});
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  await Category.destroy({
		where: {
			id: req.params.id,
		},
	});
	res.status(200).json({
		msg: 'Successfully Deleted the Category' });
});

module.exports = router;
