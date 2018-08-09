# Usando OAuth Facebook 

En este ejercicio, usaremos el soporte de Passport OAuth a través del módulo passport-facebook-token junto con el soporte OAuth de Facebook para habilitar la autenticación de usuario dentro de su servidor.

- Configurar su servidor para que sea compatible con la autenticación de usuarios basada en proveedores de OAuth 
- Utilizar  el soporte de Passport OAuth a través del módulo `passport-facebook-token` para admitir la autenticación basada en OAuth con Facebook para sus usuarios.


## Registrar la apliaci}0n en Facebook 
- En [facebook developers](https://developers.facebook.com/apps/ ) vamos a registrar la apliacación siguiendo las instrucciones hasta obtener un App ID y un App Secret

- necesitamos descargar el archivo index.html y reemoplazar el archivo index.html si ya existe en la carpeta public.    [Ref](https://developers.facebook.com/docs/facebook-login/web/) 

- en el archivo indes.html vamos a rememplarar nuestro app-id proporcionado por facebook 

## instalar el modulo passport para facebook

en la carpeta del servidor instalar el modulo `passport-facebook-token` mediante el siguiente comando 
```
npm install passport-facebook-token --save
```

## client Secret 
En nuestro archivo de configuracion `config.js` agregaremos el App Id y App secret que nos otorga facebook, el archivo quedara de la siguiente manera

```javascript 
module.exports = {
    'secretKey': '12345-67890-09876-54321',
    'mongoUrl': 'mongodb://localhost:27017/dataBase',
    'facebook': {
        clientId: 'Your Client App ID',
        clientSecret: 'Your Client App Secret'
    }
}
```

## Modelo de usuario 
Sera necesario agregar un campo adicional al modelos del usuario de la siguiente manera
```javascript 
var User = new Schema({ // var usuario = new Esquema 

  . . .
    facebookId: String,
  . . .
});
```



## configurar el login con Facebook
# Abrimos authenticate.js
- agragamos el modulo passport facebook token

```javascript
var FacebookTokenStrategy = require('passport-facebook-token');
```
- exporamos una funcion para agregar esta funcionalidad aun usuario.

```javascript
exports.facebookPassport = passport.use(new FacebookTokenStrategy({
        clientID: config.facebook.clientId,
        clientSecret: config.facebook.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        User.findOne({facebookId: profile.id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (!err && user !== null) {
                return done(null, user);
            }
            else {
                user = new User({ username: profile.displayName });
                user.facebookId = profile.id;
                user.firstname = profile.name.givenName;
                user.lastname = profile.name.familyName;
                user.save((err, user) => {
                    if (err)
                        return done(err, false);
                    else
                        return done(null, user);
                })
            }
        });
    }
));
```


# Finalmente agregamos una ruta que nos va a registrar nuevos usuarios y genera un token

- abrimos el archivo user.js y escribimos la siguiente ruta 
```javascript
router.get('/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
  if (req.user) {
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'Login con facebook :) '});
  }
});
```

- iniciamos el servidor npm run start:n
- en el navegador vamos a  https://localhost:3443 

- despues de seguir los pasos para el login podemos generar un token de nuestro sistema en la ruta /users/facebook/token y  pasar el token a traves del header usando Authorization con el valor bearer <token>
- subir cambios a la rama personal y luego merge con dev . 
