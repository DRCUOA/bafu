// routes/diagramRouter.js
const express = require('express');
const router = express.Router();
const upload = require('../utils/multer-uploader');
const diagramController = require('../controllers/diagramController');

// render the "newDiagram" view when the user navigates to "/diagrams/new"
router.get('/diagrams/new', (req, res) => {
  res.render('diagrams/diagram-create');
});

// handle the form submission and insert a new diagram into the "diagrams" table
router.post('/diagrams', upload.single('diagram_img_file_path'), async (req, res) => {
  await diagramController.createDiagram(req, res);
});


// Render the "diagrams" view when the user navigates to "/diagrams"
router.get('/diagrams', async (req, res) => {
  const diagrams = await diagramController.getAllDiagrams();
  res.render('app-menus/diagram-listAll', { diagrams });
});

// Render the indivdual diagrams found by id
router.get('/:id', (req, res) => { 
  diagramController.getDiagram(req, res);
});




module.exports = router;
