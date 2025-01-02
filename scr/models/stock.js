const {DB} = require('../config/db')
const format = require('pg-format')

const obtieneInventario = async (limits=0,page=1,order_by='id_ASC') => {
  try {
    const {rowCount:count} = await DB.query("SELECT * FROM inventario")
    if (limits===0) {limits = count}

    const [campo,direccion] = order_by.split("_")
    const offset = Math.abs((page-1)*limits)
    const formattedQuery = format(`
      SELECT * FROM inventario
      order by %s %s
      limit %s
      offset %s`,
      campo,
      direccion,
      limits,
      offset)

    const {rows,rowCount} = await DB.query(formattedQuery)
    const pages = Math.ceil(count/limits)
    return{rowCount,pages,rows}
  } catch (error) {
    throw error
  }
}

const manejoFiltros = (precio_max=0,precio_min=0,categoria="",metal="") => {
  let filtros = []

  if (precio_max>0) filtros.push(`precio <= ${precio_max}`)
  if (precio_min) filtros.push(`precio >= ${precio_min}`)
  if (categoria) filtros.push(`categoria = '${categoria}'`)
  if (metal) filtros.push(`metal = '${metal}'`)
  
  let query = "SELECT * FROM inventario"

  if (filtros.length) {
    filtros = filtros.join(" AND ")
    query += ` WHERE ${filtros}`
  }

  return query
}

const dataFiltrada = async (precio_max,precio_min,categoria,metal) => {
  try {
    const SQLQuery = manejoFiltros(precio_max,precio_min,categoria,metal)
    const {rows,rowCount} = await DB.query(SQLQuery)
    return{rowCount,rows}    
  } catch (error) { 
    throw error
  }

}

module.exports = {
  obtieneInventario,
  dataFiltrada
}