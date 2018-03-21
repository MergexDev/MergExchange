$(document).ready(function() {
	initGraph("graph");
	PhaseZeroLoading();
});

function tokensLoaded(){
	return tokenA_symbol!=null && tokenB_symbol!=null && tokenA_decimals!=null && tokenB_decimals!=null;
}
function isReadyOrders(){
	return !ordersUpdate && isFullLoaded();
}
function isReadyBalance(){
	return !balanceUpdate && metaMask_load && tokensLoaded();
}
function isFullLoaded(){
	return metaMask_load && webSocked_load && currentBlock!=null && tokensLoaded();
}
function balancesLoaded(){
	return tokenA_symbol!=null && tokenB_symbol!=null && tokenA_decimals!=null && tokenB_decimals!=null && tokenA_balance!=null && tokenB_balance!=null;
}
function finishPhaseTwoLoading(){
	if(isReadyOrders()){
		ordersUpdate=true;
		getOrders(webSocket);
		PhaseThreeLoading();
	}
	if(isReadyBalance()){
		balanceUpdate=true;
		setupExchange();
		updateBalances(EtherAccount);
	}
}

function PhaseZeroLoading(){
	var urlpath=window.location.origin+window.location.pathname;
	$.ajax({url: urlpath+"/markets.json", dataType: "json", success: function(result){
		tokenA_symbol='ETH'
		tokenB_symbol='BTC'
		var urlString=window.location.href;
		if(urlString.indexOf("#") > -1){
			var anchor=urlString.slice(urlString.indexOf("#")+1);
			if(anchor.indexOf("-") > -1){
				var tokens=anchor.split("-");
				if(tokens.length==2){
					if(tokens[0] in result.tokens)tokenA_symbol=tokens[0];
					if(tokens[1] in result.tokens)tokenB_symbol=tokens[1];
				}
			}else{
				if(anchor in result.tokens)tokenB_symbol=anchor;
			}
		}
		tokenA=result.tokens[tokenA_symbol];
		tokenB=result.tokens[tokenB_symbol];
		var markets=result.markets;
		var shtml="";
		for (var i=0;i<markets.length;i++){
			if(tokenA_symbol == markets[i].tokenA && tokenB_symbol == markets[i].tokenB){
				shtml+="<tr class='current'><td>"+markets[i].ticker+"</td><td>107.53326</td><td>0.002452</td></tr>";
			}else{
				shtml+="<tr onclick='openRedirect(\""+urlpath+"#"+markets[i].tokenA+"-"+markets[i].tokenB+"\")'><td>"+markets[i].ticker+"</td><td>107.53326</td><td>0.002452</td></tr>";
			}
		}
		$("#markets_data").html(shtml);
		PhaseOneLoading();
	}});
}

function PhaseOneLoading(){
	if("WebSocket" in window){
		webSocket = new WebSocket("ws://192.168.1.112:8080/exchangeSocket");
		webSocket.onopen = function(){
			webSocked_load = true;
			PhaseTwoLoading();
		};
		webSocket.onmessage = function(event) { 
			var msg = event.data;
			console.log("from server: "+msg);
			jsonObj=JSON.parse(msg);
			if(jsonObj["action"] == 'get_orders'){
				parseOrders(jsonObj["buyOrders"].concat(jsonObj["sellOrders"]));
			}else if(jsonObj["action"] == 'place_order'){
				closePopup();
			}
		};
		webSocket.onclose = function(){
			webSocked_load = false;
		};
		window.onbeforeunload = function(event) {
			webSocket.close();
		};
	}else{
		alert("WebSocket NOT supported by your Browser!");
	}
}

function PhaseTwoLoading(){
	if(typeof web3 !== 'undefined') {
		console.log('Web3!');
		web3js = new Web3(web3.currentProvider);
		if (web3.currentProvider.isMetaMask === true){
			console.log("MetaMask!");
			tokenA_contract = web3.eth.contract(erc20_abi).at(tokenA);
			tokenB_contract = web3.eth.contract(erc20_abi).at(tokenB);
			tokenA_contract.symbol(function(error, symbol){
				tokenA_symbol=symbol;
				finishPhaseTwoLoading();
			});
			tokenB_contract.symbol(function(error, symbol){
				tokenB_symbol=symbol;
				finishPhaseTwoLoading();
			});
			tokenA_contract.decimals(function(error, decimals){
				tokenA_decimals=decimals;
				finishPhaseTwoLoading();
			});
			tokenB_contract.decimals(function(error, decimals){
				tokenB_decimals=decimals;
				finishPhaseTwoLoading();
			});
			web3.eth.getBlockNumber(function(error,result){
				currentBlock=result;
				finishPhaseTwoLoading();
			});
			web3.version.getNetwork((err, netId) => {
				switch (netId) {
					case "1":
						console.log('This is mainnet');
						break;
					case "2":
						console.log('This is the deprecated Morden test network.');
						break;
					case "3":
						console.log('This is the ropsten test network.');
						break;
					case "4":
						console.log('This is the Rinkeby test network.');
						break;
					case "42":
						console.log('This is the Kovan test network.');
						break;
					default:
						console.log('This is an unknown network.');
				}
				finishPhaseTwoLoading();
			});
			web3js.eth.getAccounts(function(error, accounts) {
				if(accounts.length>0){
					var meta="MetaMask: "+accounts[0].slice(0,12)+"...";
					var slider="<div class='gasSlider'><input type='range' min='1' max='50' value='4' id='slider'></div>"
					$(".account_data").html("<pf onclick='openLink(\"https://etherscan.io/address/"+accounts[0]+"\")' title='"+accounts[0]+"'>"+meta+"</pf><pf id='gasInfo'><text id='gasText'>GasPrice: 4 Gwei</text>"+slider+"</pf>");
					$("#slider").on("input",function(){
						$("#gasText").html("GasPrice: "+$("#slider").val()+" Gwei");
					});
					$.ajax({url: "https://www.ethgasstation.info/json/ethgasAPI.json", dataType: "json", success: function(result){
						$("#slider").val(result["average"]/10);
						$("#gasText").html("GasPrice: "+$("#slider").val()+" Gwei");
					}});
					EtherAccount=accounts[0];
					metaMask_load=true;
					finishPhaseTwoLoading();
				}else{
					console.log("?!");
				}
			});
		}
	} else {
		console.log('No web3? You should consider trying MetaMask!');
	}
}

function PhaseThreeLoading(){
	setupGraphs();
	tradeLoadBuy();
	loadScrolls();
}

function setupGraphs(){
	loadInfo();
	$(window).on('resize', function(){
		console.log("----");
		$(".graph").html("");
		initGraph("graph");
		loadInfo();
	});
}