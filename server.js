var express = require('express');
var bodyParser = require('body-parser');
var port = 3000;
var knex = require('./db/knex');

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

//METODOS
//SELECT
app.get('/get', function(req, res) {
    let tabla = req.body.tabla
    let campo = req.body.datos
    knex.select(campo).from(tabla)
    .then(resultado => {
        return res.status(200).json({
            ok: true,
            datos: resultado,
            mensaje: `Existen ${resultado.length} registros en la consulta`
        })
    })
    .catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: null,
            mensaje: `Error del servidor: ${error}`
        })
    })    
})

//INSERT
app.post('/agregar', function(req, res) {
    let tabla = req.body.tabla
    let datos = JSON.parse(req.body.datos)
    knex(tabla).insert(datos)
    .then(resultado => {
        return res.status(200).json({
            ok: true,
            datos: resultado,
            mensaje: `Existen ${resultado.length} registros en la consulta`
        })
    })
    .catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: null,
            mensaje: `Error del servidor: ${error}`
        })
    })    
})


//UPDATE
app.put('/actualizar', function(req, res) {
    let tabla = req.body.tabla
    let campo = req.body.campo
    let dato = req.body.dato
    knex(tabla)/*.where("id", req.params.id)*/.update(campo, dato)
    .then(resultado => {
        return res.status(200).json({
            ok: true,
            datos: resultado,
            mensaje: `Existen ${resultado.length} registros en la consulta`
        })
    })
    .catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: null,
            mensaje: `Error del servidor: ${error}`
        })
    })    
})

//DELETE
app.delete('/eliminar/:id', function(req, res) {
    let tabla = req.body.tabla
    knex(tabla).where("id", req.params.id).del()
    .then(resultado => {
        return res.status(200).json({
            ok: true,
            datos: resultado,
            mensaje: `Existen ${resultado.length} registros en la consulta`
        })
    })
    .catch((error) => {
        return res.status(500).json({
            ok: false,
            datos: null,
            mensaje: `Error del servidor: ${error}`
        })
    })    
})

//PUERTO
app.listen(port, function() {
    console.log("El servidor se ejecuta en el puerto: ", port);
})