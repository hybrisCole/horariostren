/**
 * Precio
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {

    paradaDesde:{
      type:'STRING',
      required:true
    },
    paradaHacia:{
      type:'STRING',
      required:true
    },
    valor:{
      type:'FLOAT',
      required:true,
      min:100,
      max: 10000
    }
  }
};
