var express = require('express');
var router = express.Router();
var {getProjectData, getDocumentsByCode, getProjectList} = require('./utils')
const path = require('path');

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
    const {kitId} = req.body
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if(kitId)
        console.log(kitId, ' Queried by IP : ', ip, ' at time : ', Date.now());
    
    next();
});

// Get routes
router.post('/api/activate', async (req, res, next) => {
    const {kitId} = req.body
    
    try{
        if(!kitId)
            throw new Error('No kit ID passed')

        //Query doc by QR id
        const docs = await getDocumentsByCode(kitId);
        let data;

        docs.forEach(doc=> data = doc.data());
        
        const veraProj = await getProjectData(data.project);
        
        //Send project payload to front, will always be one element.
        veraProj.forEach(doc=>{
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ project: `${JSON.stringify(doc.data())}` }));    
        })
    } catch (err){
        //Log error here
        next(err)
    }
});

router.get('/api/projects', async (req, res, next) => {
    console.log('insdie')
    try{
        const list = await getProjectList();
        let docs = []
        list.forEach(doc=>docs.push(doc.data()))
        
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ projectList: `${JSON.stringify(docs)}` }));    

    } catch (err){
        //Log error here
        next(err)
    }
});

// Handles any requests that don't match the ones above, let react router take over
router.get('*', (req,res) =>{
    console.log('inside catchall');
    res.sendFile('index.html', {root: path.join(__dirname, '../build/')});
});


module.exports = router;