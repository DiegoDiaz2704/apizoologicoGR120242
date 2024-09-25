const express = require("express");
const router = express.Router(); //manejador de rutas de express
const animalSchema = require("../models/animal");
const areaSchema = require("../models/area");

//Areas
router.post("/areas", (req, res) => {
    const area = areaSchema(req.body);
    area
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

/*//Consultar todos los animales
router.get("/animals", (req, res) => {
    animalSchema.find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});*/

//Consultar un animal por su id
router.get("/areas", (req, res) => {
    areaSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});

//Modificar los datos de un area para agregar un animal
router.put("/areas/:id", async (req, res) => {
    const { id } = req.params;
    const animal = animalSchema(req.body);
    var idAnimal = null;

    const animalConsulta = await animalSchema.findOne({ codigo: req.body.codigo });
    if (!animalConsulta) {
        await animal.save().then((dataAnimal) => {
            idAnimal = dataAnimal._id;
        });
    } else {
        idAnimal = animalConsulta._id;
    }

    areaSchema
        .updateOne({ _id: id }, {
            //$addToSet >> agrega un nuevo elemento sin repetirlo
            //$push >> agrega un nuevo elemento sin importar si ya existe
            $addToSet: { animales: idAnimal }
        })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});



/*//Eliminar un animal por su id

router.delete("/animals/:id", (req, res) => {
    const { id } = req.params;
    animalSchema
        .findByIdAndDelete(id)
        .then((data) => {
            res.json(data);
        })
        .catch((error) => {
            res.json({ message: error });
        });
});*/



module.exports = router;