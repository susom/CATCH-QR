const admin = require('firebase-admin');
const env = require('dotenv').config()

if(process.env.NODE_ENV === 'production'){
    admin.initializeApp();
} else {
    const serviceAccount = require('../'+env.parsed.gcloud_credentials_prod);
    admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });        
}

class Service {
    constructor() {
        this.db = admin.firestore();
    }
    
    async querySingleDoc(collection, key, value){
        let querySnapshot = await this.db.collection(collection).where(key, "==", value).limit(1).get(); //get all documents
        if(querySnapshot.size == 1)
            return querySnapshot.docs[0].data();
        else 
            throw new Error(`No results found in collection ${collection} for ${key} : ${value}`);
    }
}

module.exports = {
    Service
};