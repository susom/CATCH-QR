var express = require('express');
var router = express.Router();
// var {getProjectData, getDocumentsByCode, getProjectList} = require('./utils')
const {Service} = require('./service');
const path = require('path');

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
    const {kitId} = req.body
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    if(kitId)
        console.log(kitId, ' Queried by IP : ', ip, ' at time : ', Date.now());
    
    next();
});

router.post('/api/activate', async (req, res, next) => {
    const {kitId} = req.body
    const dbService = new Service();
    try{
        if(!kitId)
            throw new Error('No kit ID passed')

        const doc = await dbService.querySingleDoc('vera_kits', 'kit_id', kitId);
        const veraProj = await dbService.querySingleDoc('vera_projects', 'name', doc.project);

        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify({ project: veraProj}));    

    } catch (err){
        //Log error here
        next(err)
    }
});

router.get('/api/projects', async (req, res, next) => {
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
    res.sendFile('index.html', {root: path.join(__dirname, '../build/')});
});


module.exports = router;