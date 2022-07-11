const  User = require("../models/users")
const bcryptjs = require("bcryptjs")
const sendVerification = require ("../Controllers/sendVerification")
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const usersControllers = {

    signUpUsers : async(req, res) =>{
        console.log(req.body)
        const { fullName, email , password , from, avatar, country } = req.body.userData
       const uniqueString = crypto.randomBytes(15).toString("hex")  //uniqueString es un código que se enviará por 
       //mail para luego cambiar verification
        try{
            const userExist = await User.findOne({ email }); 
            const verification = false; //Por default: verification=false pero se 
            //cambia a true si la información del 
            //registro viene de una red social
            
            if(userExist){
                if(userExist.from.indexOf(from) !== -1){ //La segunda condición del segundo 
                 // condicional, tal y como vimos: agrega un 
                  //from y una password a los arrays 
                  //correspondientes y se asegura la verification
                  
                  
                    res.json({ 
                        success: false,
                        from: from,
                        message: "Ya has realizado tu signup de esta forma por favor realiza SignIn"
                    })
                } else {
                    const passwordHasheada = bcryptjs.hashSync(password, 10)  
                    userExist.from.push(from)
                    userExist.password.push(passwordHasheada)
                    userExist.verification = true 
                    await userExist.save()
                    res.json({
                        success: true,
                        from: from,
                        message: "agregamos" + from + "a tus medios para realizar signIn"
                    })
                }
            } else {
                    const passwordHasheada = bcryptjs.hashSync(password, 10)
                    const newUser = await new User ({
                       fullName: fullName,
                        email: email ,
                        password: [passwordHasheada],
                        uniqueString: uniqueString,
                        verification : false,
                        country: country,
                        avatar: avatar,
                        from: [from]  
                    });
                    if(from !== "form-signup" ) { //Se incorpora al controlador de signUp inmediatamente luego de crear el usuario nuevo por registro
                        newUser.verification = true
                        await newUser.save()
                        res.json({
                            succes: true,
                            from: from,
                            message: "felicitaciones se ha creado tu usuario con " + from
                        });
  console.log(newUser)
                    } else{
                        await sendVerification(email, uniqueString)
                        await newUser.save()
                        
                        res.json({
                            success: true,
                            from: from,
                            message: "te enviamos un email para validarlo, por favor verifica tu casiila para completar el signUp"
                        
                        })
                    }
                }
            } catch(error){
                res.json({
                    console:console.log(error),
                    success: false,
                    from:from,
                    message: error,
                })
            }
        },

        signInUser: async (req, res) => {
            const { email, password, from } = req.body.logedUser;
            try {
              const userExist = await User.findOne({ email }); //buscamos por email
              //const indexPass = userExist.from.indexOf(from);
              if (!userExist) {
                res.json({//si no existe el usuario 
                  success: false,
                  from: "no from",
                  message: "User does not exist, please signup",
                });
              } else if (userExist.verification) { //si existe la verificacion del usuario se logra registrar
                let passwordMatch = userExist.password.filter((pass) =>
                    bcryptjs.compareSync(password, pass) //encripamos la contraseña
                  );
                  //filtramos en el array de contraseñas hasheadas si coincide la contraseña
                  if (from === "form-Signup") {
                    if(passwordMatch.length > 0){
                      const userData = {
                        id: userExist._id,
                        fullName: userExist.fullName,
                      
                        email: userExist.email,
                       avatar: userExist.avatar,
                        country: userExist.country,
                        from: userExist.from,
                    };
                    await userExist.save(); //sing es un metodo:firma una secuencia de comandos almacenada en una cadena
                    const token = jwt.sign({ ...userData }, process.env.SECRET_KEY, {
                      expiresIn: 1000 * 60 * 60 * 24,
                    });
                    //console.log(token)
                    res.json({
                      response: {token, userData },//llega a userAction
                      success: true,
                      from: from,
                      message: "Welcome " + userData.fullName,
                    });
                  }else {
                  //si no hay coincidencias
                    res.json({
                      success: false,
                      from: from,
                      message:`verify your password!`,
                    });
                  }
                }else {
                  //si fue registrado por redes sociales
                  
                  if (passwordMatch.length > 0) {//*borre el >= //hay coincidencias
                    const userData = {
                      id: userExist._id,
                      fullName: userExist.fullName,
                      
                        email: userExist.email,
                       avatar: userExist.avatar,
                        country: userExist.country,
                        from: userExist.from,
                    };
                    await userExist.save();
                    const token = jwt.sign({ ...userData }, process.env.SECRET_KEY, {
                      expiresIn: 1000 * 60 * 60 * 24,
                    });
                    res.json({
                      response: { token, userData },//llega a userAction
                      success: true,
                      from: from,
                      message: "Welcome bak" + userData.fullName 
                    });
                  } else {
                    //si no hay coincidencias
                    res.json({
                      success: false,
                      from: from,
                      message: 'verify your mail or password!'
                    });
                  }
                }
              }else { 
                 //si está registrado PERO el usuario NO FUE VALIDADO
                res.json({
                  success: false,
                  from: from,
                  message: `validate your account`,
                });
              }
            } catch (error) {
              console.log(error);
              res.json({
                success: false,
                from:from,
                message: "Something went wrong. Try again in a few seconds",
                
              });
            }
          },
    



          //Una vez que el usuario haga click en el enlace que suministramos en el email, el usuario accederá a 
//         la ruta que definimos para la verificación. Es necesario definir ese controlador y su ruta.
          verificationMail: async (req, res) => {
            const { string } = req.params;
            const user = await User.findOne({ uniqueString: string });
            //console.log(user)
            if (user) {
              user.verification = true;
              await user.save();
              res.redirect("http://localhost:3000");
            } else {
              res.json({
                success: false,
                message: 'email has not account yet!',
              });
            }
          },
          verifyToken: (req, res) => {
            const user = {
              id: req.user.id,
              email: req.user.email,
              fullName: req.user.fullName,
              avatar: req.user.avatar,
        
              from: "token",
            };
            //console.log(req.user) 
            if (!req.err) {
              res.json({
                success: true,
                response: { user },
                message: "Hi! Welcome back " + req.user.fullName,
              });
            } else {
              res.json({
                success: false,
                message: "sign in please!",
              });
            }
          },
//     signInUser : async (req, res) =>{
//         const {email, password, from} = req.body.logedUser
//         try{
//             const userExist = await User.findOne({ email })
//             // const indexPass = userExist.from.indexOf(from)
//             if(!userExist){
//                 res.json({
//                     succes: false,
//                     from:'no from', 
//                     message:"your user has not been registered,please try again"})
//             } else{
                
//                 if(from !== "form-signup"){
//                     let passwordMatch = userExist.password.filter(pass => bcryptjs.compareSync(password,pass))

//                     if (passwordMatch.length > 0){
//                         const userData = {
//                             id: userExist._id,
//                            fullName: userExist.fullName,
//                             email: userExist.email,
//                             avatar: userExist.imageUser,
//                             country: userExist.country,
//                             from: from,
//                         }
//                         await userExist.save()
//                         res.json({
//                             success: true,
//                             from: from,
//                             Response: {userData},
//                             message: "bienvenido devuelta " + userData.firstName,
//                         })
//                     } else{
//                         res.json({
//                             succes: false,
//                             from: from,
//                             message: "no has realizado el registro con " + from + " si quieres ingresar debes hacer el signUp " + from
//                         })
//                     }
//                 } else {
//                     let passwordMatch = userExist.password.filter(pass => bcryptjs.compareSync(password,pass))

//                     if (passwordMatch.length > 0){
//                         const userData = {
//                             id: userExist._id,
//                             fullName: userExist.fullName,
//                             email: userExist.email,
//                             country: userExist.country,
//                             avatar: userExist.imageUser,
//                             from: from,
//                         }
//                         await userExist.save()
//                         res.json ({
//                             success : true,
//                             from: from,
//                             Response: { token, userData },
//                             message: "welcome" + userData.firstName
//                         })
//                     } else {
//                         res.json({
//                             success: false,
//                             from: from,
//                             message: "el usuario o el password no coinciden",
//                         })
//                     }
//                 }
//             }
//         }
// catch (error){
//         res.json({
//             console: console.log(error),
//             success: false,
//             message: "algo a salido mal intalo en unos minutos"
//         })
//     }
// },
// getUsers: async (req, res) =>{
//     let user
//     let error = null
//     try{
//         user = await User.find()
//     }catch (err) {error = err}
//     res.json({
//         response: error ? `ERROR` : { user },
//         success: error ? false : true,
//         error: error
//     })
// }, 
 }

module.exports = usersControllers