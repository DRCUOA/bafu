const SQL = require('sql-template-strings');
const dbPromise = require('../database/database');
const moment = require('moment');
const debug = require('debug');

const devDiagramDAO = debug('devLog:dao_diagrams');

/** Creates a new diagram
 * @param diagram, the diagram to insert into the database 
 */
async function createDiagram(diagram) {
  devDiagramDAO('createDiagram(diagram) : attempt to create new diagram with diagram object');
  devDiagramDAO(diagram)
  const db = await dbPromise;
  const created_at = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

  // Remove the "public/" part of the file path
  const imgFilePath = diagram.diagram_img_file_path.replace("public", "");
  const result = await db.run(SQL`INSERT INTO diagrams (diagram_img_file_path, diagram_code, diagram_name, description, revision_notes, diagram_type_name, created_at) VALUES (
    ${imgFilePath},
    ${diagram.diagram_code},
    ${diagram.diagram_name},
    ${diagram.description},
    ${diagram.revision_notes},
    ${diagram.diagram_type},
    ${created_at});`);
  // get the id generated by the db and assign it back to the diagram object
  diagram.id = result.lastID;
  return diagram;
};


/** Gets the diagram with the given id from the database.
 * If there is no such diagram, undefined will be returned.
 * 
 * @param {number} id
 */
async function retrieveDiagramWithId(id) {
  devDiagramDAO(`retrieveDiagramWithId(id) : attempt retrieve diagram with ${id}`);
  const db = await dbPromise;
  const diagram = await db.get(SQL`SELECT * FROM diagrams WHERE
      id = ${id};`);
  return diagram;
};

/** Gets all diagrams from the database */
async function retrieveAllDiagrams() {
  devDiagramDAO(`retrieveAllDiagrams(): attempt retrieve all diagrams`);
  const db = await dbPromise;
  const diagrams = await db.all(SQL`SELECT * FROM diagrams;`);
  return diagrams;
};

/** Update existing diagram details in db using passed new diagram object keys/values.
 * @param {object} diagram
 */
async function updateDiagram(diagram) {
  devDiagramDAO(`updateDiagram(${diagram.diagram_name})`);
  if (!diagram || typeof diagram !== 'object' || Object.keys(diagram).length === 0) {
    devDiagramDAO(`Invalid diagram object: ${diagram}`);
    return false;
  }

  db = await dbPromise;

  devDiagramDAO(`updateDiagram(diagram): attempt to update diagram...`);
  devDiagramDAO(`Diagram: ${diagram.diagram_name} (id: ${diagram.id}) ...`);
  const updated_at = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  const setClause = Object.keys(diagram).map(key => `${key} = ?`).join(', ');
  const values = Object.values(diagram).concat(updated_at, diagram.id);
  devDiagramDAO(`setClause: ${setClause}`);
  devDiagramDAO(`values: ${values}`);
  const sql = `UPDATE diagrams SET ${setClause}, updated_at = ? WHERE id = ?;`;
  devDiagramDAO(`sql: ${sql}`);
  try {
    await db.run(sql, values);
    devDiagramDAO(`Diagram: ${diagram.diagram_name} (id: ${diagram.id}) updated at: ${updated_at}`);
    return true;
  } catch (err) {
    devDiagramDAO(`Error updating diagram: ${err.message}`);
    return false;
  }
}

// Deletes the diagram with the given id from the database.

async function deleteDiagramWithId(id) {
  devDiagramDAO(`deleteDiagramWithId(id) : attempt delete diagram with id ${id}`);
  const db = await dbPromise;
  try {
    await db.run(SQL`DELETE FROM diagrams WHERE id = ${id};`);
    return true;
  } catch (err) {
    devDiagramDAO(`Error deleting diagram: ${err.message}`);
    return false;
  }
};

module.exports = {
  createDiagram,
  retrieveDiagramWithId,
  retrieveAllDiagrams,
  updateDiagram,
  deleteDiagramWithId
};
