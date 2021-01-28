import dotenv from 'dotenv';dotenv.config();
import jwt from 'jsonwebtoken';

module.exports = function (req,res,next) {
  
    if (req.path != '/login' && req.path != '/signup' && req.path != '/' && req.path != '/form' && req.path != '/gerencial' && req.path != '/logout' && req.path != '/adminlogin') {
        if (req.cookies['SystemAuth']) {

              
                        // creo la estrategia para el token 
                         var token = req.cookies['SystemAuth'];
                      jwt.verify(token,process.env.SECRET_OR_KEY, function (error,decoded) {
                          if (error) return res.status(403).send({ message: 'No estas autorizado o logueado',error});
                          console.log('payload received', decoded);
                        if (req.path != '/login' && req.path != '/signup' && req.path != '/' && req.path != '/form' && req.path != '/logout') {
                            if (decoded.role === 'admin') next();
                            else res.status(403).send({ message: 'No tienes permisos suficientes para andar por aqui :)'});
                        }else {
                            next();
                        }
                      })
        } else res.status(403).send({ message: 'No estas autorizado o logueado'})
      
    }else next();

}