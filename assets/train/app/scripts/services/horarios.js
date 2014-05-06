'use strict';

angular.module('trenesMobile.services')
  .factory('horarios', function (storageWrapper,paradas,$q) {

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
          rangoDeMinutosActual = correspondenciaDeMinutos["0"];
        /**
         * Si estamos en la misma hora sin correspondencias,
         * sacar el calculo de minutos, si estamos antes nada
         * mas ver de 0 a 15.
        */
        if(horaActual === horaCorrespondencia){
          _.each(correspondenciaDeMinutos,function(rangoDeMiutos){
            if((minutoActual >= rangoDeMiutos[0]) &&
              (minutoActual <= rangoDeMiutos[1])){
              rangoDeMinutosActual = rangoDeMiutos;
            }
          });
        }

        /*No hay trenes al inicio de las 15...*/
        if(horaCorrespondencia===15 && horaActual!==15){
          rangoDeMinutosActual = correspondenciaDeMinutos["30"];
        }
        /*No hay trenes al final de las 20...*/
        if(horaCorrespondencia===20 && minutoActual>30){
          rangoDeMinutosActual = correspondenciaDeMinutos["15"];
        }
        this.getHorarios().then(function(horarios){
          var horariosActuales = _.filter(horarios,function(horario){
            var tiempoSplit = horario.tiempo.split(':'),
                minutoSplit = _.parseInt(tiempoSplit[1]);
            return ((_.parseInt(tiempoSplit[0]) === horaCorrespondencia)
              &&(minutoSplit > rangoDeMinutosActual[0] &&
                 minutoSplit < rangoDeMinutosActual[1]));
          });
          paradas.filtrar(_.pluck(horariosActuales,'parada')).
            then(function(paradasObj){
              _.each(horariosActuales,function(horario){
                horario.parada = _.find(paradasObj,function(parada){
                  return parada.id === horario.parada;
                });
              });

              //enviando los horarios ordenamos por rutas...
              defer.resolve(_.groupBy(horariosActuales,function(horario){return horario.ruta;}));
            });
        });
        return defer.promise;
      }
    };
  });
