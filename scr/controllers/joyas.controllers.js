const {obtieneInventario,dataFiltrada} = require('../models/stock')

const handleGet = async(req,res,next) => {
  try {
    const {limits,page,order_by} = req.query
    const result = await obtieneInventario(limits,page,order_by)
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

const handleGetFiltered = async(req,res,next) => {
  try {
    const {precio_max,precio_min,categoria,metal} = req.query
    const result = await dataFiltrada(precio_max,precio_min,categoria,metal)
    res.status(200).json(result)    
  } catch (error) {
    next(error)
  }

}

module.exports = {
  handleGet,
  handleGetFiltered
}