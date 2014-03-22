/**
 * Ruta
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  attributes: {
    nombre:{
      type:'STRING',
      required:true,
      string:true
    },
    //Esto agrupa las rutas, por ejemplo SAN JOSE - HEREDIA y HEREDIA - SAN JOSE son del mismo grupo
    grupo:{
      type:'INTEGER',
      required:true,
      string:true
    }
  }
};
