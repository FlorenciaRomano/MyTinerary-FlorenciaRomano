const nodemailer = require('nodemailer')
const { google } = require("googleapis")
const OAuth2 = google.auth.OAuth2

const sendVerification = async (email, string) => { //depende del mail que ingresa el usuario y el uniqueString que se crea con crypto

    const myOAuth2Client = new OAuth2( //seteo-construye las configuraciones deAO2
        process.env.GOOGLE_CLIENTID,
        process.env.GOOGLE_CLIENTSECRET,
        "https://developers.google.com/oauthplayground"
    )

    myOAuth2Client.setCredentials({//LE APLICA EL REFRESH-token
        refresh_token: process.env.GOOGLE_REFRESHTOKEN
    })

    const accessToken = myOAuth2Client.getAccessToken() //creo-genero el token de acceso

    const transporter = nodemailer.createTransport({ //creo el transporter
        service: "gmail",
        auth: {
            user: process.env.USER,
            type: "OAuth2",
            //user: process.env.USER,
            clientId: process.env.GOOGLE_CLIENTID,
            clientSecret: process.env.GOOGLE_CLIENTSECRET,
            refreshToken: process.env.GOOGLE_REFRESHTOKEN,
            accessToken: accessToken
        },
        tls: {
            rejectUnauthorized: false //para evitar que bloquee el antivirus
        }
    })

    let mailOptions = { //creo las configuraciones del email
        from:'mytineraryfr@gmail.com', //de 
        to: email,//hacia
        subject: 'verify account',//el mensaje que llega por email para verificar
        html: `
            <a href=http://localhost:4000/api/verify/${string}>CLICK!</a>
            <h3>to confirm!</h3>` //el cuerpo del mensaje, va a controladores y ahi lo redirige a la pagina
    }

    await transporter.sendMail(mailOptions, function (error, response) { //espero de transporter que envie el email --sendMail-- es un metodo de nodemail
        if (error) {
            console.log(error) 
        } else {
            console.log(`check ${email} to confirm your account`)//se verifica la cuenta
        }
    })
}

module.exports = sendVerification