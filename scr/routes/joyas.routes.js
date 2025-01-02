const {Router} = require('express')
const {handleGet,handleGetFiltered} = require('../controllers/joyas.controllers')

const router = Router()

router.get('/',handleGet)
router.get('/filtros',handleGetFiltered)

module.exports = router;