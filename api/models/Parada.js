/**
 * Parada
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
    lat:{
      type:'FLOAT',
      required:true,
      float:true
    },
    lng:{
      type:'FLOAT',
      required:true,
      float:true
    }
  }

};
