const admin = require('firebase-admin');
const env = require('dotenv').config()

if(process.env.NODE_ENV === 'production'){ //Dev server
    admin.initializeApp();
}else{ //Cloud run credentials as default on prod
    const serviceAccount = require('../'+env.parsed.gcloud_credentials);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}
  
const db = admin.firestore();

async function getDocumentsByCode(code){
    let doc = await db.collection('vera_kits').where("kit_id", "==", code).get(); //get all documents
    switch(doc.size){
        case 0:
            throw new Error(`No document found with id ${code}`);
        case 1: 
            return doc
        default:
            throw new Error(`Mutliple documents found with id ${code}`);
    }
}

async function getProjectData(project){
    let doc = await db.collection('vera_projects').where("name", "==", project).get(); //get all documents
    switch(doc.size){
        case 0:
            throw new Error(`No document found under project name ${project}`);
        case 1: 
            return doc
        default:
            throw new Error(`Mutliple documents found with project name ${project}`);
    }
}

async function getProjectList(){
    let doc = await db.collection('vera_projects').get()
    if(doc.size > 1)
        return doc
    else
        throw new Error(`No projects found in database`)
}

module.exports = {
    getDocumentsByCode,
    getProjectData,
    getProjectList
};