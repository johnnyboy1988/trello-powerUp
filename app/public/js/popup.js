var t = window.TrelloPowerUp.iframe();

document.getElementById("track-time").addEventListener("click", function(event){
  return t.get('card','shared','startTime').then(function(startTime){
    if(!startTime){
      return t.set('card','shared','startTime', Date());
    }else{
      return t.set('card','shared','stopTime',Date());
    }
  }).then(function(){
    return t.closePopup();
  });
});


t.render(function(){
  return t.getAll('card','shared').then(function(sharedData){
    if(Object.keys(sharedData).length > 0 ){
      var { card: {shared: {stopTime, startTime}}} = sharedData;
      if(startTime && stopTime){
        document.getElementById("start-time").getElementsByClassName("time")[0].textContent = startTime;
        document.getElementById("stop-time").getElementsByClassName("time")[0].textContent = stopTime;
        document.getElementById("track-time").classList.add("hidden");
      }else if(startTime){
        document.getElementById("start-time").getElementsByClassName("time")[0].textContent = startTime;  
        const button = document.getElementById("track-time");
        button.classList.add("mod-danger");
        button.classList.remove("mod-primary");
        button.textContent = 'Stop Time';
      }
    }
  }).then(function(){
    t.sizeTo('#content').done();
  })
});
         