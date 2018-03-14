function loadHistory(trades){
	var shtml="";
	for(var i=0;i<trades.length;i++){
		var tA=trades[i].args.tokenA;
		var tB=trades[i].args.tokenB;
		if((tA!=tokenA&&tA!=tokenB)||(tB!=tokenA&&tB!=tokenB))continue;
		var vA=fromScientificToStrint(JSON.stringify(trades[i].args.valueA).slice(1,-1));
		var vB=fromScientificToStrint(JSON.stringify(trades[i].args.valueB).slice(1,-1));
		var hash=trades[i].transactionHash;
		var amount;
		var price;
		if(tA==tokenA){
			amount=removeDecimals(vB,tokenB_decimals);
			price=removeDecimals(str_div(addDecimals(vA,tokenB_decimals),vB),tokenA_decimals);
			shtml+="<tr onclick='openLink(\"https://ropsten.etherscan.io/tx/"+hash+"\")'><td class='recent'>13:17:23</td><td class='value' title='"+amount+"'>"+toDecimals(amount)+"</td><td class='bprice' title='"+price+"'>"+toDecimals(price)+"</td></tr>";
		}else{
			amount=removeDecimals(vA,tokenB_decimals);
			price=removeDecimals(str_div(addDecimals(vB,tokenB_decimals),vA),tokenA_decimals);
			shtml+="<tr onclick='openLink(\"https://ropsten.etherscan.io/tx/"+hash+"\")'><td class='recent'>13:17:23</td><td class='value' title='"+amount+"'>"+toDecimals(amount)+"</td><td class='sprice' title='"+price+"'>"+toDecimals(price)+"</td></tr>";
		}
	}
	for (var i=0;i<40;i++){
	}
	$("#history_data").html(shtml);
}

function renderOrders(address){
	console.log("started Render");
	var buyhtml="";
	var sellhtml="";
	var orderhtml="<colgroup><col width='24%'><col width='10%'><col width='18%'><col width='18%'><col width='18%'><col width='12%'></colgroup>";
	console.log(orders);
	for(i in orders){
		orders[i].setAmount();
		orders[i].setValue();
		console.log("-------------------------");
		console.log("Order: "+orders[i].getHash());
		console.log("-------------------------");
		console.log("Amount: "+orders[i].getAmount());
		console.log("Value: "+orders[i].getValue());
		console.log(isBiggerOrEqual(orders[i].getExpiration(), currentBlock));
		console.log("Fill: "+orders[i].filled_B+" = "+orders[i].valueB);
		console.log(!isBiggerOrEqual(orders[i].filled_B, orders[i].valueB));
		if(orders[i].getValue()!="0" && isBiggerOrEqual(orders[i].getExpiration(), currentBlock) && !isBiggerOrEqual(orders[i].filled_B, orders[i].valueB)){
			if(orders[i].isBuyOrder()){
				buyhtml+="<tr id='id_"+orders[i].getHash()+"' onclick='setupOrderFill(\""+orders[i].getHash()+"\",\""+orders[i].getAmount()+"\")'><td class='price' title='"+orders[i].getPrice()+"'>"+toDecimals(orders[i].getPrice())+"</td><td class='amount' title='"+orders[i].getAmount()+"'>"+toDecimals(orders[i].getAmount())+"</td><td class='value' title='"+orders[i].getValue()+"'>"+toDecimals(orders[i].getValue())+"</td></tr>";
				if(orders[i].owner==address){
					orderhtml+="<tr><td title='"+orders[i].getTimestamp()+"'>"+orders[i].getTimestamp()+"</td><td class='buyclr'>buy</td><td title='"+orders[i].getPrice()+"'>"+toDecimals(orders[i].getPrice())+"</td><td title='"+orders[i].getAmount()+"'>"+toDecimals(orders[i].getAmount())+"</td><td title='"+orders[i].getFilled()+"'>"+toDecimals(orders[i].getFilled())+"</td><td><ccl onclick='tryCancelOrder(\""+orders[i].getHash()+"\")'>x</ccl></td></tr>"
				}
			}else{
				sellhtml+="<tr id='id_"+orders[i].getHash()+"' onclick='setupOrderFill(\""+orders[i].getHash()+"\",\""+orders[i].getAmount()+"\")'><td class='price' title='"+orders[i].getPrice()+"'>"+toDecimals(orders[i].getPrice())+"</td><td class='amount' title='"+orders[i].getAmount()+"'>"+toDecimals(orders[i].getAmount())+"</td><td class='value' title='"+orders[i].getValue()+"'>"+toDecimals(orders[i].getValue())+"</td></tr>";
				if(orders[i].owner==address){
					orderhtml+="<tr><td title='"+orders[i].getTimestamp()+"'>"+orders[i].getTimestamp()+"</td><td class='sellclr'>sell</td><td title='"+orders[i].getPrice()+"'>"+toDecimals(orders[i].getPrice())+"</td><td title='"+orders[i].getAmount()+"'>"+toDecimals(orders[i].getAmount())+"</td><td title='"+orders[i].getFilled()+"'>"+toDecimals(orders[i].getFilled())+"</td><td><ccl onclick='tryCancelOrder(\""+orders[i].getHash()+"\")'>x</ccl></td></tr>"
				}
			}
		}
	}
	$("#buys_data").html(buyhtml);
	$("#sells_data").html(sellhtml);
	$("#orders_data").html(orderhtml);
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

function initMGraph(){
	var dataBid = [
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
	];
	var margin = {top: 15, right: 15, bottom: 25, left: 15},
	width = $(".orderstatus").width() - margin.left - margin.right,
	height = $(".orderstatus").height() - margin.top - margin.bottom-105;
	var x = d3.scaleLinear()
	.domain([d3.min(dataBid, function(d) { return d.x; }), d3.max(dataAsk, function(d) { return d.x; })])
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
	initMGraph();
}