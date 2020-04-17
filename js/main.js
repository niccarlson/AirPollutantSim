/*global require, dat*/

require.config({
  deps : ['vendor/Events', 'vendor/lodash','vendor/dat.gui.min']
});

require(
  [
    'lib/ParticleSystem',
    'lib/Display',
    'lib/Vector',
    'gui'
  ],
  function(ParticleSystem, Display, Vector, GUI){
    "use strict";

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    window.addEventListener('resize', resize); resize();

    var display = new Display(document.getElementById('canvas'));
    display.init();
    var particleSystem = new ParticleSystem().init(display);
    display.start();

    var gui = new GUI(particleSystem, display);

    particleSystem.addEmitter(new Vector(1800,840),Vector.fromAngle(4,0.5));
    particleSystem.addField(new Vector(0,0), 800);
    particleSystem.addField(new Vector(0,0), 800);
    particleSystem.addField(new Vector(0,0), 800);
    particleSystem.addField(new Vector(0,0), 800);
    for(var i = 25; i < 1900; i+=25){
      particleSystem.addField(new Vector(i,-300), -10);
    }
    for(var j = 20; j < 920; j+=20){
      particleSystem.addField(new Vector(-300,j), -10);
    }



    var emitBreath = setInterval(function(){
      particleSystem.addEmitter(new Vector(1800,840),Vector.fromAngle(4,0.5));
      console.log("Emit breath")
    }, 8000);
    window.setTimeout(function(){

      var RemBreath = setInterval(function(){
      particleSystem.emitters = []
      console.log("Rem breath")

      }, 8000);
      console.log("Timeout")
      particleSystem.emitters = []

    }, 4000);

    var partCount = setInterval(function(){
      document.cookie = ("particleCount=" + particleSystem.getParticleCount())
    }, 250);


    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

  }
);

