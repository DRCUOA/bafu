// controllers/diagramController.js
const diagramsDAO = require('../models/diagramsDAO');

async function createDiagram(req, res) {
  const { diagram_name, diagram_code, description, revision_notes, diagram_type } = req.body;
  const diagram_img_file_path = req.file.path;
  const newDiagram = {
    diagram_img_file_path,
    diagram_code,
    diagram_name,
    description,
    revision_notes,
    diagram_type
  };
  try {
    const diagram = await diagramsDAO.createDiagram(newDiagram);
    res.redirect(`/diagrams/${diagram.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating diagram');
  }
}

async function getDiagram(req, res) {
  const { id } = req.params;
  console.log('diagram saught:', id)
  try {
    const diagram = await diagramsDAO.retrieveDiagramWithId(id);
    res.render('diagrams/diagram-view', { diagram });
  } catch (err) {
    console.error(err);
    res.status(404).send('Diagram not found');
  }
}


async function getAllDiagrams(req, res) {
  try {
    const diagrams = await diagramsDAO.retrieveAllDiagrams();
    return diagrams;
  } catch (err) {
    console.error(err);
    res.status(404).send('Diagram not found');
  }
}

async function updateDiagram(req, res) {
  const { id } = req.params;
  const { diagram_name, diagram_code, description, revision_notes, diagram_type } = req.body;
  const diagram_img_file_path = req.file.path;
  const updatedDiagram = {
    diagram_img_file_path,
    diagram_code,
    diagram_name,
    description,
    revision_notes,
    diagram_type
  };
  try {
    await diagramsDAO.updateDiagram(updatedDiagram);
    res.redirect(`/diagrams/${id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating diagram');
  }
}

async function deleteDiagram(req, res) {
  const { id } = req.params;
  try {
    await diagramsDAO.deleteDiagramById(id);
    res.redirect('/diagrams');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting diagram');
  }
}

module.exports = {
  createDiagram,
  getDiagram,
  getAllDiagrams,
  updateDiagram,
  deleteDiagram
};
