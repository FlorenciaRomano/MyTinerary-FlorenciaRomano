const { containeranalysis } = require('googleapis/build/src/apis/containeranalysis');
const Itinerary = require('../models/itineraries');

const itineraryControllers = {
    getItinerary: async (req, res) => { //FUNCION ASINCRONA//req es lo que pedimos desde el front, res lo que le responde al front
        let itineraries //VARIABLE
        let error = null //declaramos un error con valor nulo
        try {
            itineraries = await Itinerary.find().populate("city") ////Una funcion try (un pedido) va igualar con un await para buscarme todo el contenio de Cities
            //Find funciona como filtro, si no enviamos ningun parametro nos devuelve todos los datos del modelo declarado.
            //POPULATE permite llenar ciertas partes del documento desde otra colección. pasarle un segundo parametro con los datos especificos
            // a traer de la reperencia. 
        } catch (err) {//Catch es lo que devuelve si no se cumple lo de arriba
            error = err
        }
        res.json({//Guarda en el json y si hay algun error con tineraries me devuelve error o false
            response: error ? "ERROR" : itineraries,
            success: error ? false : true,
            error: true
        })
    },


    getItinerariesByCity: async (req, res) => { //FUNCION ASINCRONA//req es lo que pedimos desde el front, res lo que le responde al front
        const id = req.params.id; //indicamos que busque un ObjectId de la colección el cual se igual al id enviado por parámetro al controlador
        let itineraries;  //declaro variable
        try {
            itineraries = await Itinerary.find({ city: id }).populate('comments.userId', { fullName: 1, avatar: 1 });////Una funcion try (un pedido) va igualar con un await para buscarme todo el contenio de Cities
            //Find funciona como filtro, si no enviamos ningun parametro nos devuelve todos los datos del modelo declarado.

        } catch (err) { //Catch es lo que devuelve si no se cumple lo de arriba
            console.error(err);
        }
        res.json({//Guarda en el json y si hay algun error con tineraries me devuelve error o false
            response: error ? "ERROR" : itineraries,
            success: error ? false : true,
            error: true
        });
    },

    //BUSCA POR ID CADA CIUDAD
    getOneItinerary: async (req, res) => {//FUNCION ASINCRONA//req es lo que pedimos desde el front, res lo que le responde al front
        const id = req.params.id//indicamos que busque un ObjectId de la colección el cual se igual al id enviado por parámetro al controlador
        let itinerary //declaro variable
        let error = null //Error con valor nulo
        try {        //Try, un pedido donde me va a igualar con un await para buscarme el contenido
            itinerary = await Itinerary.findOne({ _id: id }).populate("city", { city: 1 })
            //Find funciona como filtro, si no enviamos ningun parametro nos devuelve todos los datos del modelo declarado.
            //adentro del p() establezco la conexion, id object que me crea postman va a ser = a ID
            //POPULATE permite llenar ciertas partes del documento desde otra colección. pasarle un segundo parametro con los datos especificos
            // a traer de la reperencia.  
        } catch (err) { //Catch es lo que devuelve si no se cumple lo de arriba
            error = err
        }
        res.json({//Guarda en el json y si hay algun error con tineraries me devuelve error o false
            response: error ? "ERROR" : itinerary,
            success: error ? false : true,
            error: true
        })
    },

    // //CREA LAS ITINERARIOS
    addItinerary: async (req, res) => { //FUNCION ASINCRONA//req es lo que pedimos desde el front, res lo que le responde al front
        const { name, userName, avatar, price, duration, hashtag, likes, activities, description, city } = req.body.data
        //Desestructuro el modelo para usarlo por separado. contendrá un objeto con 10 propiedades
        let itinerary //declaro variable
        let error = null //Error con valor nulo
        try { //Try, un pedido donde me va a igualar con un await para buscarme el contenido COMO LE INDICO BAJO
            itinerary = await new Itinerary({
                name: name,
                userName: userName,
                avatar: avatar,
                description: description,
                price: price,
                duration: duration,
                hashtag: hashtag,
                likes: likes,
                activities: activities,
                description: description,
                city: city,
            }).save()
        } catch (err) { error = err } //Catch es lo que devuelve si no se cumple lo de arriba
        res.json({//Guarda en el json y si hay algun error con tineraries me devuelve error o false
            console: console.log(error),
            response: error ? `ERROR` : itinerary,
            success: error ? false : true,
            error: error
        })
    },

    // modificar una propiedad del ITINERARIO
    modifyItinerary: async (req, res) => { //FUNCION ASINCRONA
        const id = req.params.id //elemento a modificar, id de use params////elemento a identificar cada objeto
        let itinerary = req.body //Requiere la estructura de donde va a mosdificar. (body,data)
        let itinerarydb //Definomos la variable que va a esperar la respuesta a ese modelo
        let error = null // Definimos el error
        try {
            itinerarydb = await Itinerary.findOneAndUpdate({ _id: id }, itinerary, { new: true })
            //el id viene de la peticion que hicimos a modificar (desde Itinerary). Se compara con la base de datos.(Routes)
            //Try, un pedido donde me va a igualar con un await para buscarme el contenido
            //Await porque es una funcion asincrona y tiene que esperar que le de una respuesta 
            //Find funciona como filtro, si no enviamos ningun parametro nos devuelve todos los datos del modelo declarado.

        } catch (err) { error = err } //Catch es lo que devuelve si no se cumple lo de arriba
        res.json({//Guarda en el json y si hay algun error con tineraries me devuelve error o false
            console: console.log(error),
            response: error ? "ERROR" : itinerarydb,
            success: error ? false : true,
            error: error
        })
    },

    // //ELIMINA LOS DATOS
    removeItinerary: async (req, res) => {//FUNCION ASINCRONA
        const id = req.params.id//Requiere la estructura de donde va a eliminar.
        let itinerary //Declaramos variable
        let error = null //Declaramos error con valor nulo
        try {
            itinerary = await Itinerary.findOneAndDelete({ _id: id })
            //Try, un pedido donde me va a igualar con un await para buscarme el contenido
            //Find funciona como filtro, si no enviamos ningun parametro nos devuelve todos los datos del modelo declarado.
        } catch (err) { error = err }//Catch es lo que devuelve si no se cumple lo de arriba

        res.json({//Guarda en el json y si hay algun error con tineraries me devuelve error o false
            response: error ? "ERROR" : itinerary,
            success: error ? false : true,
            error: error
        })
    },

    //BUSCA ITINERARIO DESDE CIUDAD 
    findTinFromCity: async (req, res) => { //funcion asincrona
        let cityId = req.params.id //Requiere la estructura de donde va a buscar.
        //console.log(cityId)
        let tineraries  //Declaramos variable
        let error = null  //Declaramos error con valor nulo
        try {
            tineraries = await Itinerary.find({ city: cityId }).populate('comments.userId', { fullName: 1, avatar: 1 });
            //Try, un pedido donde me va a igualar con un await para buscarme el contenido
            //Find funciona como filtro, si no enviamos ningun parametro nos devuelve todos los datos del modelo declarado.

            //POPULATE permite llenar ciertas partes del documento desde otra colección.
            //console.log(tineraries)
        } catch (err) { //Catch es lo que devuelve si no se cumple lo de arriba
            error = err
            console.log(error)
        }
        res.json({ //Guarda en el json y si hay algun error con tineraries me devuelve error o false
            response: error ? 'ERROR' : { tineraries },
            success: error ? false : true,
            error: error
        })
    },

    likeDislike: async (req, res) => {
        const id = req.params.id //LLEGA POR PARAMETRO DESDE AXIOS
        const user = req.user.id //LLEGA POR RESPUESTA DESDE PASSPORT 

        await Itinerary.findOne({ _id: id })

            .then((city) => {
                if (city.likes.includes(user)) {
                    Itinerary.findOneAndUpdate({ _id: id }, { $pull: { likes: user } }, { new: true }) //PULL QUITA O SACA
                        .then((nuevaCity) => res.json({ success: true, response: nuevaCity.likes }))
                        .catch((error) => console.log(error))
                } else {
                    Itinerary.findOneAndUpdate({ _id: id }, { $push: { likes: user } }, { new: true })//PUSH AGREGA
                        .then((nuevaCity) => res.json({ success: true, response: nuevaCity.likes }))
                        .catch((error) => console.log(error))
                }
            })

            .catch((error) => res.json({ success: false, response: error }))

    },
}
module.exports = itineraryControllers //EXPORTO EL MODULO