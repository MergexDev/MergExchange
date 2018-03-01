function createStyle(upcolor,downcolor){
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML="path.candle.down{fill:#"+downcolor+";stroke:#"+downcolor+";}";
	css.innerHTML+="path.candle.up{fill:#"+upcolor+";stroke:#"+upcolor+";}";
	css.innerHTML+="path.candle{fill:#"+upcolor+";stroke:#"+upcolor+";}";
	css.innerHTML+=".crosshair .axisannotation path{fill:#"+upcolor+";}";
	css.innerHTML+=".sells .price,.sprice{color:#"+downcolor+";}";
	css.innerHTML+=".buys .price,.bprice{color:#"+upcolor+";}";
	css.innerHTML+=".buyclr{color:#"+upcolor+";}";
	css.innerHTML+=".sellclr{color:#"+downcolor+";}";
	css.innerHTML+=".areaBid{stroke:#"+upcolor+";fill:#"+mergeColors(upcolor,"28282b",0.25)+";}";
	css.innerHTML+=".areaAsk{stroke:#"+downcolor+";fill:#"+mergeColors(downcolor,"28282b",0.25)+";}";
	css.innerHTML+=".sellscontent tr:hover{background-color:#"+downcolor+";}";
	css.innerHTML+=".buyscontent tr:hover{background-color:#"+upcolor+";}";
	css.innerHTML+="pf{background-color:#"+mergeColors(upcolor,"5f506f",0.65)+";}";
	css.innerHTML+="pf:hover{background-color:#"+downcolor+";}";
	css.innerHTML+="#gasInfo:hover{color:#"+downcolor+";}";
	css.innerHTML+="ccl:hover{background-color:#"+downcolor+";color:#000000;}";
	document.head.appendChild(css);
}
function mergeColors(colorA,colorB,ratio=0.5){
	var redA=parseInt(colorA.substring(0,2),16);
	var redB=parseInt(colorB.substring(0,2),16);
	var greenA=parseInt(colorA.substring(2,4),16);
	var greenB=parseInt(colorB.substring(2,4),16);
	var blueA=parseInt(colorA.substring(4,6),16);
	var blueB=parseInt(colorB.substring(4,6),16);
	var red=Math.round(redA*ratio+redB*(1-ratio));
	var green=Math.round(greenA*ratio+greenB*(1-ratio));
	var blue=Math.round(blueA*ratio+blueB*(1-ratio));
	var hex=red.toString(16)+green.toString(16)+blue.toString(16);
	return hex;
}
//createStyle("65c585","e54444");/*green-red*/
createStyle("55bfff","ff9966");/*blue-orange*/
//createStyle("ffffff","66a5e5");/*white-blue*/
