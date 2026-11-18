// splash.mjs: the site-wide intro, "Through the clouds" (round 3 pick). Markup and script; styles in src/styles/splash.css.
export const splashMarkup = () => `<div class="sp1" data-sp1 aria-hidden="true">
  <div class="sp1-base"></div>
  <div class="sp1-c sp1-c--l0"></div><div class="sp1-c sp1-c--r0"></div>
  <div class="sp1-sun"></div>
  <div class="sp1-c sp1-c--l1"></div><div class="sp1-c sp1-c--r1"></div>
  <p class="sp1-mark"><span class="sp1-w">ELEVATED</span><span class="sp1-w sp1-w2">DREAMS</span></p>
  <div class="sp1-c sp1-c--l2"></div><div class="sp1-c sp1-c--r2"></div>
</div>`;
export const splashJs = "(function(){\n  var d=document,W=window,root=d.documentElement,el=d.querySelector('[data-sp1]');\n  if(!el)return;\n  var still=W.matchMedia('(prefers-reduced-motion: reduce)').matches;\n  if(!root.classList.contains('mist-on')||still){el.parentNode.removeChild(el);return;}\n  try{W.localStorage.setItem('ed.intro','1');}catch(e){}\n  var timer=0,armT=0,armed=false,EV=['keydown','pointerdown','wheel','touchstart'];\n  function disarm(){if(!armed)return;armed=false;EV.forEach(function(e){W.removeEventListener(e,skip,true);});}\n  function arm(){armed=true;EV.forEach(function(e){W.addEventListener(e,skip,{capture:true,passive:true});});}\n  function finish(){W.clearTimeout(timer);W.clearTimeout(armT);disarm();if(el&&el.parentNode)el.parentNode.removeChild(el);el=null;\n    var y=d.querySelector('[data-gate-yes]');if(y&&root.classList.contains('gate-on'))y.focus();}\n  function skip(){if(!el||el.classList.contains('is-skip'))return;disarm();el.classList.add('is-skip');W.clearTimeout(timer);timer=W.setTimeout(finish,240);}\n  timer=W.setTimeout(finish,1120);armT=W.setTimeout(arm,60);\n})();";
