/* global TrelloPowerUp */

var Promise = TrelloPowerUp.Promise;

var BLACK_ROCKET_ICON = 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421';

TrelloPowerUp.initialize({
  // Start adding handlers for your capabilities here!
	 'card-buttons': function(t, options) {
	 	return [{
	 		icon: BLACK_ROCKET_ICON,
	 		text: 'Track Time',
      callback: function(t, options){
        return t.popup({
          title: 'Track Time',
          url:'./popup.html',
          height:250
        });
       //console.log("whoa!");
      }
	 	},
    { //adiciona um bottão powerUp, o qual remove  o startime e stoptime
     // icon: BLACK_ROCKET_ICON,
      text: 'Clear Time',
      callback: function(t, options){
        return t.remove('card','shared', ['startTime','stopTime']);
      }
    }
    ];
	 },
  
  'card-badges': function(t, opts){
    return t.getAll('card','shared').then(function(sharedData){
      if(Object.keys(sharedData).length < 1){
         return [];
         }
      var {card:{shared:{stopTime, startTime}}} = sharedData;
      var color = 'red';
      var text = 'Stop';
      if(startTime && stopTime){
        text = 'Finish';
        color = 'green';  
      }else if(startTime){
        text = 'Running';
        color = 'yellow';
      }
      return[{
        text,
        color
      }]
    })
  }
});
