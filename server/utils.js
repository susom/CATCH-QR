const admin = require('firebase-admin');
const serviceAccount = require('../som-irt-scci-dev-2c275bf1a983.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
  
const db = admin.firestore();

async function get(collection){
    try{
        const snapshot = await db.collection(collection).get();
        if(snapshot){
            snapshot.forEach((doc) => {
                console.log(doc.id, '=>', doc.data());
            });
        }
        
    } catch(err) {
        console.log(err)
    }
}

async function getProject(code){
    try{
        const docs = await db.collection('vera_kits').get(); //get all documents
        if(docs){
            docs.forEach((doc) => {
                let data = doc.data();
                if(data.kit_id && data.kit_id === code){
                    console.log(data.kit_id, data.project);
                    // return data.project
                }
                // console.log(doc.id, '=>', doc.data());
            });
        }
    } catch(err) {
        console.log(err);
    }
}



module.exports = {
    db, 
    getProject
};