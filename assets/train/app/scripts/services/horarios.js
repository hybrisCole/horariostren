'use strict';

angular.module('trenesMobile.services')
  .factory('horarios', function (storageWrapper,$q) {

    /*"Si son las 3, mas bien mostrar las paradas de las 5... "
    * "Si son las 7, mas bien mostrar las paradas de las 7... "
    * */
    var correspondenciaDeHoras = {
      "1":5,"2":5,"3":5,"4":5,"5":5,"6":6,
      "7":7,"8":8,"9":9,"10":15,"11":15,"12":15,
      "13":15,"14":15,"15":15,"16":16,"17":17,"18":18,
      "19":19,"20":20,"21":5,"22":5,"23":5,"24":5
    },
    correspondenciaDeMinutos = {
      "0":[0,14],
      "15":[15,29],
      "30":[30,44],
      "45":[45,59]
    };
    return {
      getHorarios: function () {
        return storageWrapper.getData('horarios','http://horarios-tren-data.nodejitsu.com/horario');
      },
      /*
      * Primero verifica si hay trenes para la hora actual...
      * Para ahorrarse ese calculo se hace una tabla de relaciones de hora,
      * entonces si por ejemplo son las 1pm, se verifica la hora de las 3pm
      * Luego verifica en bloques de 15 minutos para la hora actual.
      *
      * */
      horariosActuales: function(){
        var defer = $q.defer(),
          minutoActual = moment().minutes(),
          horaActual = moment().hours(),
          horaCorrespondencia = correspondenciaDeHoras[horaActual],
          rangoDeMinutosActual = [0,15];

        /**
         * Si estamos en la misma hora sin correspondencias,
         * sacar el calculo de minutos, si estamos antes nada
         * mas ver de 0 a 15.
        */
        if(horaActual === horaCorrespondencia){
          _.each(correspondenciaDeMinutos,function(rangoDeMiutos){
            if((minutoActual > rangoDeMiutos[0]) &&
              (minutoActual < rangoDeMiutos[1])){
              rangoDeMinutosActual = rangoDeMiutos;
            }
          });
        }
        this.getHorarios().then(function(horarios){
          var horariosActuales = _.filter(horarios,function(horario){
                var tiempoSplit = horario.tiempo.split(':'),
                    minutoSplit = _.parseInt(tiempoSplit[1]);
              return ((_.parseInt(tiempoSplit[0]) === horaCorrespondencia)
                &&(minutoSplit > rangoDeMinutosActual[0] &&
                   minutoSplit < rangoDeMinutosActual[1]));
            });
            defer.resolve(horariosActuales);
        });
        return defer.promise;
      }
    };
  });
