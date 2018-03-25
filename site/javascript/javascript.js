var MGraphData;
var transactions
var candles;

function loadHistory(trades){
	transactions=[]
	for(var i=trades.length-1;i>=Math.max(0, trades.length-100);i--){
		var tA=trades[i].args.tokenA;
		var tB=trades[i].args.tokenB;
		if((tA!=tokenA&&tA!=tokenB)||(tB!=tokenA&&tB!=tokenB))continue;
		var vA=fromScientificToStrint(JSON.stringify(trades[i].args.valueA).slice(1,-1));
		var vB=fromScientificToStrint(JSON.stringify(trades[i].args.valueB).slice(1,-1));
		var transaction={}
		transaction["hash"]=trades[i].transactionHash;
		transaction["block"]=trades[i].blockNumber;
		if(tA==tokenA){
			transaction["amount"]=removeDecimals(vB,tokenB_decimals);
			transaction["price_full"]=str_div(addDecimals(vA,tokenB_decimals),vB);
			transaction["price"]=removeDecimals(transaction["price_full"],tokenA_decimals);
			transaction["type"]="buy";
		}else{
			transaction["amount"]=removeDecimals(vA,tokenB_decimals);
			transaction["price_full"]=str_div(addDecimals(vB,tokenB_decimals),vA)
			transaction["price"]=removeDecimals(transaction["price_full"],tokenA_decimals);
			transaction["type"]="sell";
		}
		transactions.push(transaction);
	}
	var history_count=transactions.length;
	var history_processed=0;
	var check_callback=function(){
		history_processed++;
		if(history_processed==history_count){
			createHistoryGraph();
			finishLoadingHistory();
			initGraph("graph");
		}
	}
	for(var i=0;i<transactions.length;i++){
		getTimeForTransaction(i,check_callback);
	}
}
function createHistoryGraph(){
	candles=[]
	for(var i=0;i<transactions.length;i++){
		currDate=new Date(transactions[i]["fulldate"].getFullYear(),transactions[i]["fulldate"].getMonth(),transactions[i]["fulldate"].getDate());
		if(candles.length>0&&candles[candles.length-1]["date"].getTime()===currDate.getTime()){
			candles[candles.length-1]["close"]=transactions[i]["price_full"]
			if(compareStrInts(transactions[i]["price_full"], candles[candles.length-1]["high"])>0){
				candles[candles.length-1]["high"]=transactions[i]["price_full"];
			}else if(compareStrInts(transactions[i]["price_full"], candles[candles.length-1]["low"])<0){
				candles[candles.length-1]["low"]=transactions[i]["price_full"];
			}
		}else{
			candle={}
			candle["date"]=currDate;
			candle["open"]=transactions[i]["price_full"];
			candle["high"]=transactions[i]["price_full"];
			candle["low"]=transactions[i]["price_full"];
			candle["close"]=transactions[i]["price_full"];
			candle["volume"]=0;
			candles.push(candle);
		}
	}
	for(var i=0;i<candles.length;i++){
		candles[i]["open"]=parseFloat(removeDecimals(candles[i]["open"],tokenA_decimals));
		candles[i]["high"]=parseFloat(removeDecimals(candles[i]["high"],tokenA_decimals));
		candles[i]["low"]=parseFloat(removeDecimals(candles[i]["low"],tokenA_decimals));
		candles[i]["close"]=parseFloat(removeDecimals(candles[i]["close"],tokenA_decimals));
	}
}

function finishLoadingHistory(){
	var shtml="";
	for(var i=0;i<transactions.length;i++){
		if(transactions[i]["type"]=="buy"){
			shtml+="<tr onclick='openLink(\"https://ropsten.etherscan.io/tx/"+transactions[i]["hash"]+"\")'><td class='recent' title='"+transactions[i]["date"]+"'>"+transactions[i]["time"]+"</td><td class='value' title='"+transactions[i]["amount"]+"'>"+toDecimals(transactions[i]["amount"])+"</td><td class='bprice' title='"+transactions[i]["price"]+"'>"+toDecimals(transactions[i]["price"])+"</td></tr>";
		}else{
			shtml+="<tr onclick='openLink(\"https://ropsten.etherscan.io/tx/"+transactions[i]["hash"]+"\")'><td class='recent' title='"+transactions[i]["date"]+"'>"+transactions[i]["time"]+"</td><td class='value' title='"+transactions[i]["amount"]+"'>"+toDecimals(transactions[i]["amount"])+"</td><td class='sprice' title='"+transactions[i]["price"]+"'>"+toDecimals(transactions[i]["price"])+"</td></tr>";
		}
	}
	$("#history_data").html(shtml);
}

function getTimeForTransaction(tindex,callbackf){
	web3.eth.getBlock(transactions[tindex]["block"],function(error, result){
		if(error)return;
		var date=new Date(result["timestamp"]*1000);
		var short_date=("0"+date.getHours()).substr(-2)+":"+("0"+date.getMinutes()).substr(-2)+":"+("0"+date.getSeconds()).substr(-2);
		var full_date=("0"+date.getDate()).substr(-2)+"-"+("0"+(date.getMonth()+1)).substr(-2)+"-"+date.getFullYear()+" "+short_date;
		transactions[tindex]["time"]=short_date;
		transactions[tindex]["date"]=full_date;
		transactions[tindex]["fulldate"]=date;
		callbackf();
	});
}

function appendHistory(trade){
	var tA=trade.args.tokenA;
	var tB=trade.args.tokenB;
	if((tA!=tokenA&&tA!=tokenB)||(tB!=tokenA&&tB!=tokenB))return;
	var vA=fromScientificToStrint(JSON.stringify(trade.args.valueA).slice(1,-1));
	var vB=fromScientificToStrint(JSON.stringify(trade.args.valueB).slice(1,-1));
	var transaction={}
	transaction["hash"]=trade.transactionHash;
	transaction["block"]=trade.blockNumber;
	if(tA==tokenA){
		transaction["amount"]=removeDecimals(vB,tokenB_decimals);
		transaction["price"]=removeDecimals(str_div(addDecimals(vA,tokenB_decimals),vB),tokenA_decimals);
		transaction["type"]="buy";
	}else{
		transaction["amount"]=removeDecimals(vA,tokenB_decimals);
		transaction["price"]=removeDecimals(str_div(addDecimals(vB,tokenB_decimals),vA),tokenA_decimals);
		transaction["type"]="sell";
	}
	transactions.push(transaction);
	var lastTransaction=transactions.length-1;
	getTimeForTransaction(lastTransaction,function(){
		if(transactions[lastTransaction]["type"]=="buy"){
			var shtml="<tr class='appear' onclick='openLink(\"https://ropsten.etherscan.io/tx/"+transactions[lastTransaction]["hash"]+"\")'><td class='recent' title='"+transactions[lastTransaction]["date"]+"'>"+transactions[lastTransaction]["time"]+"</td><td class='value' title='"+transactions[lastTransaction]["amount"]+"'>"+toDecimals(transactions[lastTransaction]["amount"])+"</td><td class='bprice' title='"+transactions[lastTransaction]["price"]+"'>"+toDecimals(transactions[lastTransaction]["price"])+"</td></tr>";
		}else{
			var shtml="<tr class='appear' onclick='openLink(\"https://ropsten.etherscan.io/tx/"+transactions[lastTransaction]["hash"]+"\")'><td class='recent' title='"+transactions[lastTransaction]["date"]+"'>"+transactions[lastTransaction]["time"]+"</td><td class='value' title='"+transactions[lastTransaction]["amount"]+"'>"+toDecimals(transactions[lastTransaction]["amount"])+"</td><td class='sprice' title='"+transactions[lastTransaction]["price"]+"'>"+toDecimals(transactions[lastTransaction]["price"])+"</td></tr>";
		}
		console.log(shtml);
		$("#history_data").prepend(shtml);
		setTimeout(function(){
			$(".historycontent tr.appear").removeClass("appear");
		},100);
	});
}

function renderOrders(address){
	console.log("started Render");
	var buyhtml="";
	var sellhtml="";
	var orderhtml="<colgroup><col width='24%'><col width='10%'><col width='18%'><col width='18%'><col width='18%'><col width='12%'></colgroup>";
	console.log(orders);
	var tmp_orders=[];
	for(key in orders){
		tmp_orders.push(orders[key]);
	}
	tmp_orders.sort(function(a, b) {
		return b.comparePrice(a);
	});
	for(var i=0;i<tmp_orders.length;i++){
		if(tmp_orders[i].isBuyOrder()){
			if(tmp_orders[i].getType()=="regular"){
				buyhtml+="<tr ";
			}else if(tmp_orders[i].getType()=="append"){
				buyhtml+="<tr class='appear' ";
				tmp_orders[i].setType("regular");
			}else if(tmp_orders[i].getType()=="remove"){
				buyhtml+="<tr class='disappear' ";
				delete tmp_orders[i];
			}
			buyhtml+="id='id_"+tmp_orders[i].getHash()+"' onclick='setupOrderFill(\""+tmp_orders[i].getHash()+"\",\""+tmp_orders[i].getAmount()+"\")'><td class='price' title='"+tmp_orders[i].getPrice()+"'>"+toDecimals(tmp_orders[i].getPrice())+"</td><td class='amount' title='"+tmp_orders[i].getAmount()+"'>"+toDecimals(tmp_orders[i].getAmount())+"</td><td class='value' title='"+tmp_orders[i].getValue()+"'>"+toDecimals(tmp_orders[i].getValue())+"</td></tr>";
			
		}else{
			if(tmp_orders[i].getType()=="regular"){
				sellhtml+="<tr ";
			}else if(tmp_orders[i].getType()=="append"){
				sellhtml+="<tr class='appear' ";
				tmp_orders[i].setType("regular");
			}else if(tmp_orders[i].getType()=="remove"){
				sellhtml+="<tr class='disappear' ";
				delete tmp_orders[i];
			}
			sellhtml+="id='id_"+tmp_orders[i].getHash()+"' onclick='setupOrderFill(\""+tmp_orders[i].getHash()+"\",\""+tmp_orders[i].getAmount()+"\")'><td class='price' title='"+tmp_orders[i].getPrice()+"'>"+toDecimals(tmp_orders[i].getPrice())+"</td><td class='amount' title='"+tmp_orders[i].getAmount()+"'>"+toDecimals(tmp_orders[i].getAmount())+"</td><td class='value' title='"+tmp_orders[i].getValue()+"'>"+toDecimals(tmp_orders[i].getValue())+"</td></tr>";
			
		}
	}
	tmp_orders.sort(function(a, b) {
		return b.compareDate(a);
	});
	for(var i=0;i<tmp_orders.length;i++){
		if(tmp_orders[i].owner==address){
			orderhtml+="<tr><td title='"+tmp_orders[i].getDatetime()+"'>"+tmp_orders[i].getDatetime()+"</td><td class='"+(tmp_orders[i].isBuyOrder()?"buyclr":"sellclr")+"'>buy</td><td title='"+tmp_orders[i].getPrice()+"'>"+toDecimals(tmp_orders[i].getPrice())+"</td><td title='"+tmp_orders[i].getAmount()+"'>"+toDecimals(tmp_orders[i].getAmount())+"</td><td title='"+tmp_orders[i].getFilled()+"'>"+toDecimals(tmp_orders[i].getFilled())+"</td><td><ccl onclick='tryCancelOrder(\""+tmp_orders[i].getHash()+"\")'>x</ccl></td></tr>"
		}
	}
	generateDataBid();
	$("#buys_data").html(buyhtml);
	$("#sells_data").html(sellhtml);
	$("#orders_data").html(orderhtml);
	setTimeout(function(){
		$("#buys_data tr.appear").removeClass("appear");
		$("#sells_data tr.appear").removeClass("appear");
		$("#buys_data tr.disappear").fadeOut(250);
		$("#sells_data tr.disappear").fadeOut(250);
	},100);
}

function openLink(link){
	window.open(link,'_blank');
}
function openRedirect(link){
	window.location.href = link;
	location.reload();
}

function setupOrderFill(hash, amount){
	console.log("clicked");
	tradeLoadFill();
	$('input[name=hash]').val(hash);
	$('input[name=amount]').val(amount);
}

function tradeLoadBuy(){
	var cont="<div class='placetitle'>TRADE</div>";
	cont+="<div class='tradeview'>";
	cont+="<div class='switch current'>BUY</div>";
	cont+="<div class='switch' onclick='tradeLoadSell()'>SELL</div>";
	cont+="<div class='switch' onclick='tradeLoadFill()'>FILL</div>";
	cont+="<htx>Buy Price:</htx>";
	cont+="<input type='text' name='price' placeholder='Price'></input>";
	cont+="<htx>Amount to Buy:</htx>";
	cont+="<input type='text' name='amount' placeholder='Amount'></input>";
	cont+="<btn onclick='confirmOrder(true)'>PLACE ORDER</btn></div>";
	$(".place").html(cont);
	var pattern = new RegExp("^[0-9]*[.]?[0-9]*$");
	$('input[name=price]').on('input', function (event) { 
		if(!pattern.test(this.value)) {
			if(this.prev!=null)this.value=this.prev;
			else this.value='';
		}
		this.prev=this.value;
	});
	$('input[name=amount]').on('input', function (event) { 
		if(!pattern.test(this.value)) {
			if(this.prev!=null)this.value=this.prev;
			else this.value='';
		}
		this.prev=this.value;
	});
}
function tradeLoadSell(){
	var cont="<div class='placetitle'>TRADE</div>";
	cont+="<div class='tradeview'>";
	cont+="<div class='switch' onclick='tradeLoadBuy()'>BUY</div>";
	cont+="<div class='switch current'>SELL</div>";
	cont+="<div class='switch' onclick='tradeLoadFill()'>FILL</div>";
	cont+="<htx>Sell Price:</htx>";
	cont+="<input type='text' name='price' placeholder='Price'></input>";
	cont+="<htx>Amount to Sell:</htx>";
	cont+="<input type='text' name='amount' placeholder='Amount'></input>";
	cont+="<btn onclick='confirmOrder(false)'>PLACE ORDER</btn></div>";
	$(".place").html(cont);
	var pattern = new RegExp("^[0-9]*[.]?[0-9]*$");
	$('input[name=price]').on('input', function (event) { 
		if(!pattern.test(this.value)) {
			if(this.prev!=null)this.value=this.prev;
			else this.value='';
		}
		this.prev=this.value;
	});
	$('input[name=amount]').on('input', function (event) { 
		if(!pattern.test(this.value)) {
			if(this.prev!=null)this.value=this.prev;
			else this.value='';
		}
		this.prev=this.value;
	});
}
function tradeLoadFill(){
	var cont="<div class='placetitle'>TRADE</div>";
	cont+="<div class='tradeview'>";
	cont+="<div class='switch' onclick='tradeLoadBuy()'>BUY</div>";
	cont+="<div class='switch' onclick='tradeLoadSell()'>SELL</div>";
	cont+="<div class='switch current'>FILL</div>";
	cont+="<htx>Order Hash:</htx>";
	cont+="<input type='text' name='hash' placeholder='Hash'></input>";
	cont+="<htx>Amount to Fill:</htx>";
	cont+="<input type='text' name='amount' placeholder='Amount'></input>";
	cont+="<btn onclick='confirmFill()'>FILL ORDER</btn></div>";
	$(".place").html(cont);
	var pattern = new RegExp("^[0-9]*[.]?[0-9]*$");
	var hash_w_o = new RegExp("^([1-9a-fA-F]{1}|[0-9a-fA-F]{2,64})$");
	var hashpattern = new RegExp("^(0(x[0-9a-fA-F]{0,64})?)?$");
	$('input[name=hash]').on('input', function (event) {
		if(hash_w_o.test(this.value))this.value='0x'+this.value;
		if(!hashpattern.test(this.value)) {
			if(this.prev!=null)this.value=this.prev;
			else this.value='';
		}else{
			this.value=this.value.toLowerCase();
		}
		this.prev=this.value;
	});
	$('input[name=amount]').on('input', function (event) { 
		if(!pattern.test(this.value)) {
			if(this.prev!=null)this.value=this.prev;
			else this.value='';
		}
		this.prev=this.value;
	});
}

function generateDataBid(){
	var data={}
	data["dataBid"]=[];
	data["dataAsk"]=[];
	for(key in orders){
		var tmp={}
		tmp.x=parseFloat(orders[key].getPrice());
		tmp.y=parseFloat(orders[key].getValue());
		if(orders[key].isBuyOrder())data["dataBid"].push(tmp);
		else data["dataAsk"].push(tmp);
	}
	data["dataBid"].sort(function(a, b) {
		return b.x-a.x;
	});
	data["dataAsk"].sort(function(a, b) {
		return b.x-a.x;
	});
	for(var i=1;i<data["dataBid"].length;i++){
		data["dataBid"][i].y+=data["dataBid"][i-1].y;
	}
	for(var i=data["dataAsk"].length-1;i>0;i--){
		data["dataAsk"][i-1].y+=data["dataAsk"][i].y;
	}
	MGraphData=data;
	loadInfo();
}

function initMGraph(){
	/*var dataBid = [
	{ x: 30, y: 564, },
	{ x: 32, y: 532, },
	{ x: 33, y: 476, },
	{ x: 35, y: 345, },
	{ x: 36, y: 219, },
	{ x: 38, y: 105, },
	{ x: 39, y: 64, },
	{ x: 40, y: 0, },
	];
	var dataAsk = [
	{ x: 50, y: 455, },
	{ x: 49, y: 412, },
	{ x: 47, y: 355, },
	{ x: 46, y: 214, },
	{ x: 44, y: 145, },
	{ x: 42, y: 89, },
	{ x: 41, y: 55, },
	{ x: 40, y: 0, },
	];*/
	var dataBid=MGraphData["dataBid"];
	var dataAsk=MGraphData["dataAsk"];
	var margin = {top: 15, right: 15, bottom: 25, left: 15},
	width = $(".orderstatus").width() - margin.left - margin.right,
	height = $(".orderstatus").height() - margin.top - margin.bottom-105;
	var x = d3.scaleLinear()
	.domain([d3.min(dataBid.concat(dataAsk), function(d) { return d.x; }), d3.max(dataBid.concat(dataAsk), function(d) { return d.x; })])
	.range([0, width]);
	var y = d3.scaleLinear()
	.domain([0, d3.max(dataBid.concat(dataAsk), function(d) { return d.y*1.1; })])
	.range([height, 0]);
	var xAxis = d3.axisBottom(x);
	var areaBid = d3.area()
	.x(function(d) { return x(d.x); })
	.y0(height)
	.y1(function(d) { return y(d.y); });
	var areaAsk = d3.area()
	.x(function(d) { return x(d.x); })
	.y0(height)
	.y1(function(d) { return y(d.y); });
	var svg = d3.select(".orderstatus").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	svg.append("path")
	.datum(dataBid)
	.attr("class", "areaBid")
	.attr("d", areaBid);
	svg.append("path")
	.datum(dataAsk)
	.attr("class", "areaAsk")
	.attr("d", areaAsk);
	svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis);
}

function initGraph(container){
	var margin = {top: 25, right: 50, bottom: 25, left: 50},
	width = $(".graph").width() - margin.left - margin.right,
	height = $(".graph").height() - margin.top - margin.bottom;
	var parseDate = d3.timeParse("%d-%b-%y");
	var x = techan.scale.financetime().range([0, width]);
	var y = d3.scaleLinear().range([height, 0]);
	var cy = d3.scaleLinear().range([y(0.22), y(1)]);
	var yVolume = d3.scaleLinear().range([y(0), y(0.2)]);
	var zoom = d3.zoom().on("zoom", zoomed);
	var zoomableInit;

	var candlestick = techan.plot.candlestick()
	.xScale(x)
	.yScale(cy);

	var volume = techan.plot.volume()
	.xScale(x)
	.yScale(yVolume);

	var xAxis = d3.axisBottom(x);

	var xTopAxis = d3.axisTop(x);

	var yAxis = d3.axisLeft(cy);

	var yRightAxis = d3.axisRight(cy);

	var volAxis = d3.axisLeft(yVolume).ticks(3).tickFormat(d3.format(",.3s"));

	var volRightAxis = d3.axisRight(yVolume).ticks(3).tickFormat(d3.format(",.3s"));

	var ohlcAnnotation = techan.plot.axisannotation().axis(yAxis).orient('left').format(d3.format(',.2f'));
	var ohlcRightAnnotation = techan.plot.axisannotation().axis(yRightAxis).orient('right').translate([width, 0]);
	var volAnnotation = techan.plot.axisannotation().axis(volAxis).orient('left');
	var volRightAnnotation = techan.plot.axisannotation().axis(volRightAxis).orient('right').translate([width, 0]);
	var timeAnnotation = techan.plot.axisannotation().axis(xAxis).orient('bottom').format(d3.timeFormat('%Y-%m-%d')).width(65).translate([0, height]);
	var timeTopAnnotation = techan.plot.axisannotation().axis(xTopAxis).orient('top');

	var svgRoot = d3.select(".graph").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.call(zoom);

	var svg = svgRoot.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	var coordsText = svg.append('text')
	.style("text-anchor", "end")
	.attr("class", "coords")
	.attr("x", width - 5)
	.attr("y", 15);

	var crosshair = techan.plot.crosshair()
	.xScale(x)
	.yScale(y)
	.xAnnotation([timeAnnotation, timeTopAnnotation])
	.yAnnotation([ohlcAnnotation, ohlcRightAnnotation, volAnnotation, volRightAnnotation])
	.on("enter", enter)
	.on("out", out)
	.on("move", move);

	svg.append("clipPath")
	.attr("id", "clip")
	.append("rect")
	.attr("x", 0)
	.attr("y", y(1))
	.attr("width", width)
	.attr("height", y(0) - y(1));

	var accessor = candlestick.accessor();
	var result = d3.csv("data.csv", function(d) {
		return {
			date: parseDate(d.Date),
			open: +d.Open,
			high: +d.High,
			low: +d.Low,
			close: +d.Close,
			volume: +d.Volume
		}
	}).then(function(data){
		//data=candles
		console.log(data);
		console.log(candles);
		data=data.sort(function(a, b) { return d3.ascending(accessor.d(a), accessor.d(b)); });
		x.domain(data.map(accessor.d));
		cy.domain(techan.scale.plot.ohlc(data).domain());
		yVolume.domain(techan.scale.plot.volume(data).domain());
		svg.select("g.candlestick").datum(data);
		svg.select("g.volume").datum(data);
		draw();
		zoomableInit = x.zoomable().clamp(false).copy();

		svg.append("g")
		.datum(data)
		.attr("class", "candlestick")
		.attr("clip-path", "url(#clip)")
		.call(candlestick);

		svg.append("g")
		.datum(data)
		.attr("class", "volume")
		.attr("clip-path", "url(#clip)")
		.call(volume);

		svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

		svg.append("g")
		.attr("class", "x axis top")
		.call(xTopAxis);

		svg.append("g")
		.attr("class", "y axis")
		.call(yAxis);

		svg.append("g")
		.attr("class", "y axis right")
		.attr("transform", "translate(" + width + ",0)")
		.call(yRightAxis);

		svg.append("g")
		.attr("class", "volume axis")
		.call(volAxis);

		svg.append("g")
		.attr("class", "volume axis right")
		.attr("transform", "translate(" + width + ",0)")
		.call(volRightAxis);

		svg.append('g')
		.attr("class", "crosshair")
		.call(crosshair)
		.each(function(d){move(d);});
	});

	function testY(y) {
		var range = y.range().map(d3.event.transform.invertY, d3.event.transform),
		domain = range.map(y.invert, y);
		return y.copy().domain(domain);
	}

	function zoomed() {
		//var rescaledY = testY(y);
		//yAxis.scale(rescaledY);
		//candlestick.yScale(rescaledY);
		x.zoomable().domain(d3.event.transform.rescaleX(zoomableInit).domain());
		draw();
	}

	function enter() {
		coordsText.style("display", "inline");
	}

	function out() {
		coordsText.style("display", "none");
	}

	function move(coords) {
		if(coords!=null){
			if(coords.y>0.22){
				var diff=cy.domain()[1]-cy.domain()[0];
				var ny=cy.domain()[0]+diff*(coords.y-0.22)*1/0.78;
				coordsText.text(
 					timeAnnotation.format()(coords.x)+", "+d3.format(',.5f')(ny)
					);
			}else if(coords.y<0.2){
				var diff=yVolume.domain()[1]-yVolume.domain()[0];
				var ny=yVolume.domain()[0]+diff*coords.y*5;
				coordsText.text(
					timeAnnotation.format()(coords.x)+", "+d3.format(',d')(ny)
					);
			}else{
				timeAnnotation.format()(coords.x)
			}
		}
	}

	function draw() {
		svg.select("g.candlestick").call(candlestick);
		svg.select("g.volume").call(volume);
		svg.select("g.x.axis").call(xAxis);
		svg.select("g.x.axis.top").call(xTopAxis);
		svg.select("g.y.axis").call(yAxis);
		svg.select("g.y.axis.right").call(yRightAxis);
		svg.select("g.volume.axis").call(volAxis);
		svg.select("g.volume.axis.right").call(volRightAxis);
	}
}
function loadScrolls(){
	$(".sellscontent").mCustomScrollbar({
		axis:"y",
		theme:"dark",
		scrollInertia:5,
	});
	$(".buyscontent").mCustomScrollbar({
		axis:"y",
		theme:"dark",
		scrollInertia:5,
	});
	$(".marketscontent").mCustomScrollbar({
		axis:"y",
		theme:"dark",
		scrollInertia:5,
	});
	$(".historycontent").mCustomScrollbar({
		axis:"y",
		theme:"dark",
		scrollInertia:5,
	});
	$(".orderscontent").mCustomScrollbar({
		axis:"y",
		theme:"dark",
		scrollInertia:5,
	});
}
function loadPriceStatus(){
	var decimalBalanceA=removeDecimals(tokenA_balance,tokenA_decimals);
	var decimalBalanceB=removeDecimals(tokenB_balance,tokenB_decimals);
	var cont="<div class='infotitle'>INFO</div>";
	cont+="<div class='infoline'>"+tokenA_symbol+" balance:<right title='"+decimalBalanceA+"'>"+toDecimals(decimalBalanceA)+"</right></div>";
	cont+="<div class='infoline'>"+tokenB_symbol+" balance:<right title='"+decimalBalanceB+"'>"+toDecimals(decimalBalanceB)+"</right></div>";
	$(".orderstatus").html(cont);
}
function loadInfo(){
	var cont="<div class='infotitle'>INFO</div>";
	cont+="<div class='infoline'></div>";
	cont+="<div class='infoline'></div>";
	$(".orderstatus").html(cont);
	if(balancesLoaded()){
		loadPriceStatus();
	}
	if(MGraphData!=null){
		initMGraph();
	}
}