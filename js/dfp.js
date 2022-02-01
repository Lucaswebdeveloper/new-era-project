var adtags = adtags || {};
adtags.adunits = adtags.adunits || [];
adtags.cmd = adtags.cmd || [];
adtags.lazyload = adtags.lazyload || false;
adtags.timeframe = adtags.timeframe || 0;
adtags.hasInit = false;

adtags.idclient = "";
adtags.lazyload = false;
adtags.timeframe = 0;

var script = document.createElement("script"); // create a script DOM node
script.src = "https://admanager.fivewall.com.br/ads.js";
script.async = "true";
document.head.appendChild(script);