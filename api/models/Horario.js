/**
 * Horario
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
  	
  	ruta:{
      type:'STRING',
      required:true
    },
    parada:{
      type:'STRING',
      required:true
    },
    tiempo:{
      type:'STRING',
      required:true,
      //http://stackoverflow.com/questions/14772142/24-hour-time-regex-for-html-5
      regex:'([01]?[0-9]|2[0-3]):[0-5][0-9]'
    },
    estaTren:{
      type: 'BOOLEAN',
      defaultsTo: false
    }
    
  }

};
