var express = require('express');
var router = express.Router();
var {getProjectData, getDocumentsByCode} = require('./utils')

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// Get routes
router.get('/api/register/:kitId([A-Z0-9]{7,7})', async (req, res, next) => {
    const {kitId} = req.params
    
    try{
        if(!kitId)
            throw new Error('No kit ID passed')

        //Query doc by QR id
        const docs = await getDocumentsByCode(kitId);
        let data;

        docs.forEach(doc=> data = doc.data());
        
        const veraProj = await getProjectData(data.project);
        
        //Send project payload to front
        veraProj.forEach(doc=>{
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify({ project: `${JSON.stringify(doc.data())}` }));    
        })
        
    }catch(err){
        //Log error here
        //parse error to send to front
        next(err)
    }
        
    
});


module.exports = router;