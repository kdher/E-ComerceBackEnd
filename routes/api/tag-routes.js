const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const tages = await Tag.findAll({
    include: [Product],
	});
	res.status(200).json(tages);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tag = await Tag.findByPk(req.params.id, {
		include: [{ model: Product }],
	});
  if (!tag) {
    res.status(404).json({ message: 'No Tag with this id!' });
    return;
  }
	res.status(200).json(tag);
});

router.post('/', async (req, res) => {
  // create a new tag
  const newTag = await Tag.create(req.body);
	res.status(200).json({
		message: 'Successfully Created New Tag!',
		newTag,
	});
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
 
  Tag.update(req.body, {
    where : {
      id: req.params.id,
    },
  })
  .then((tags) => {
   
  if (!tags[0]) {
      res.status(404).json({ message: 'No Tag with this id!' });
      return;
     }
     res.status(200).json( {message: `Successfully updated the tag with id of ${req.params.id}`,
      tags });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

  });


router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'No Tag with this id!' });
      return;
    }
    res.status(200).json({ message: 'Successfully Deleted the Tag ',
    tagData});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
