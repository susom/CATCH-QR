var express = require('express');
var router = express.Router();
var {db, getProject} = require('./utils')

//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

// Get routes
router.get('/api/register/:kitId([A-Z0-9]{7,7})', async (req, res) => {
    console.log(req.params)
    const {kitId} = req.params
    console.log(kitId)
    if(kitId){
        const name = req.query.name || 'World';
        const proj = await getProject(kitId);
        console.log('project', proj)
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
    }else{
        console.log('fail')
        res.status(403).render();
        res.render('error', { error: err });
    }
    
});


module.exports = router;