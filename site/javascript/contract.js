function numb2str(r){for(str="";r>0;)str=r%10+str,r/=10;return str}function dec2hex(r){for(var t,n,e=r.toString().split(""),o=[],u=[];e.length;)for(n=1*e.shift(),t=0;n||t<o.length;t++)n+=10*(o[t]||0),o[t]=n%16,n=(n-o[t])/16;for(;o.length;)u.push(o.pop().toString(16));return"0x"+u.join("")}function hex2a(r,t=!1){var n=r.toString();for(n.startsWith("0x")&&(n=n.substring(2));n.length<64&&t;)n="0"+n;for(var e="",o=0;o<n.length;o+=2)char=String.fromCharCode(parseInt(n.substr(o,2),16)),e+=char;return e}function sha256(){for(var r="",t=0;t<arguments.length;t++)"number"==typeof arguments[t]&&arguments[t]%1==0||"string"==typeof arguments[t]&&(arguments[t].startsWith("0x")?r+=hex2a(arguments[t]):new RegExp("^\\d+$").test(arguments[t])?r+=hex2a(dec2hex(arguments[t]),!0):r+=arguments[t]);return SHA256(r)}function SHA256(r){var t=8,n=0;function e(r,t){var n=(65535&r)+(65535&t);return(r>>16)+(t>>16)+(n>>16)<<16|65535&n}function o(r,t){return r>>>t|r<<32-t}function u(r,t){return r>>>t}function f(r,t,n){return r&t^~r&n}function a(r,t,n){return r&t^r&n^t&n}function i(r){return o(r,2)^o(r,13)^o(r,22)}function h(r){return o(r,6)^o(r,11)^o(r,25)}function c(r){return o(r,7)^o(r,18)^u(r,3)}return"0x"+function(r){for(var t=n?"0123456789ABCDEF":"0123456789abcdef",e="",o=0;o<4*r.length;o++)e+=t.charAt(r[o>>2]>>8*(3-o%4)+4&15)+t.charAt(r[o>>2]>>8*(3-o%4)&15);return e}(function(r,t){var n,s,g,l,v,x,A,p,d,y,S,b=new Array(1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298),w=new Array(1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225),C=new Array(64);r[t>>5]|=128<<24-t%32,r[15+(t+64>>9<<4)]=t;for(var m=0;m<r.length;m+=16){n=w[0],s=w[1],g=w[2],l=w[3],v=w[4],x=w[5],A=w[6],p=w[7];for(var E=0;E<64;E++)C[E]=E<16?r[E+m]:e(e(e(o(S=C[E-2],17)^o(S,19)^u(S,10),C[E-7]),c(C[E-15])),C[E-16]),d=e(e(e(e(p,h(v)),f(v,x,A)),b[E]),C[E]),y=e(i(n),a(n,s,g)),p=A,A=x,x=v,v=e(l,d),l=g,g=s,s=n,n=e(d,y);w[0]=e(n,w[0]),w[1]=e(s,w[1]),w[2]=e(g,w[2]),w[3]=e(l,w[3]),w[4]=e(v,w[4]),w[5]=e(x,w[5]),w[6]=e(A,w[6]),w[7]=e(p,w[7])}return w}(function(r){for(var n=Array(),e=(1<<t)-1,o=0;o<r.length*t;o+=t)n[o>>5]|=(r.charCodeAt(o/t)&e)<<24-o%32;return n}(r),r.length*t))}

var erc20_abi=[ { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string", "value": "EtherWrapper" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint256", "value": "18" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "remaining", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [ { "name": "_name", "type": "string", "index": 0, "typeShort": "string", "bits": "", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;name", "template": "elements_input_string", "value": "INTERFACE" }, { "name": "_symbol", "type": "string", "index": 1, "typeShort": "string", "bits": "", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;symbol", "template": "elements_input_string", "value": "INT" }, { "name": "_decimals", "type": "uint256", "index": 2, "typeShort": "uint", "bits": "256", "displayName": "&thinsp;<span class=\"punctuation\">_</span>&thinsp;decimals", "template": "elements_input_uint", "value": "18" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_spender", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" } ], "name": "Approval", "type": "event" } ];

var mergex_abi=[ { "constant": false, "inputs": [ { "name": "_admin", "type": "address" } ], "name": "removeAdmin", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "owner", "type": "address" }, { "name": "tokenA", "type": "address" }, { "name": "tokenB", "type": "address" }, { "name": "tradeAmount", "type": "uint256" }, { "name": "valueA", "type": "uint256" }, { "name": "valueB", "type": "uint256" }, { "name": "expiration", "type": "uint256" }, { "name": "nonce", "type": "uint256" }, { "name": "v", "type": "uint8" }, { "name": "r", "type": "bytes32" }, { "name": "s", "type": "bytes32" } ], "name": "fillOrder", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_amount", "type": "uint256" } ], "name": "withdrawTo", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_amount", "type": "uint256" } ], "name": "withdraw", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "WrapperisEnabled", "outputs": [ { "name": "", "type": "bool", "value": true } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_wrapper", "type": "address" } ], "name": "changeWrapper", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "feeAddress", "outputs": [ { "name": "", "type": "address", "value": "0xc5cce486bb09fb49e952c868b0a7729b1ff1f8e5" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "admins", "outputs": [ { "name": "", "type": "uint8", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_symbol", "type": "string" }, { "name": "_from", "type": "address" }, { "name": "_amount", "type": "uint256" } ], "name": "withdrawNonNative", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_admin", "type": "address" }, { "name": "_access", "type": "uint8" } ], "name": "addAdmin", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_symbol", "type": "string" }, { "name": "_to", "type": "address" }, { "name": "_amount", "type": "uint256" } ], "name": "depositNonNative", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_fee", "type": "uint256" } ], "name": "setFee", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_name", "type": "string" }, { "name": "_symbol", "type": "string" }, { "name": "_decimals", "type": "uint256" } ], "name": "deployNonNativeToken", "outputs": [ { "name": "tokenAddress", "type": "address" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "feePercent", "outputs": [ { "name": "", "type": "uint256", "value": "10" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_fee", "type": "address" } ], "name": "setFeeAddress", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "EtherWrapper", "outputs": [ { "name": "", "type": "address", "value": "0x6d0111daad51da88af8381694d9a728d3411ebf8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_admin", "type": "address" }, { "name": "_access", "type": "uint8" } ], "name": "changeAccess", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" } ], "name": "depositTo", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_symbol", "type": "string" } ], "name": "getTokenAddress", "outputs": [ { "name": "tokenAddress", "type": "address", "value": "0x0000000000000000000000000000000000000000" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "deposit", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_wrapper", "type": "address" } ], "name": "setupWrapper", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "tokenA", "type": "address" }, { "name": "tokenB", "type": "address" }, { "name": "valueA", "type": "uint256" }, { "name": "valueB", "type": "uint256" }, { "name": "expiration", "type": "uint256" }, { "name": "nonce", "type": "uint256" }, { "name": "v", "type": "uint8" }, { "name": "r", "type": "bytes32" }, { "name": "s", "type": "bytes32" } ], "name": "cancelOrder", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "deployWrapper", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "bytes32" } ], "name": "fills", "outputs": [ { "name": "", "type": "uint256", "value": "0" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "payable": true, "stateMutability": "payable", "type": "fallback" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "tokenA", "type": "address" }, { "indexed": false, "name": "tokenB", "type": "address" }, { "indexed": false, "name": "valueA", "type": "uint256" }, { "indexed": false, "name": "valueB", "type": "uint256" } ], "name": "Trade", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_wrapper", "type": "address" } ], "name": "WrapperSetup", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_from", "type": "address" }, { "indexed": false, "name": "_to", "type": "address" } ], "name": "WrapperChanged", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_to", "type": "address" }, { "indexed": false, "name": "_amount", "type": "uint256" } ], "name": "EtherDeposit", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_from", "type": "address" }, { "indexed": false, "name": "_amount", "type": "uint256" } ], "name": "EtherWithdrawal", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_from", "type": "uint256" }, { "indexed": false, "name": "_to", "type": "uint256" } ], "name": "TradingFeeChanged", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_from", "type": "address" }, { "indexed": false, "name": "_to", "type": "address" } ], "name": "FeeAddressChanged", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_addr", "type": "address" }, { "indexed": false, "name": "_name", "type": "string" }, { "indexed": false, "name": "_symbol", "type": "string" } ], "name": "TokenDeployed", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_token", "type": "string" }, { "indexed": false, "name": "_to", "type": "address" }, { "indexed": false, "name": "_amount", "type": "uint256" } ], "name": "nonNativeDeposit", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "_token", "type": "string" }, { "indexed": false, "name": "_from", "type": "address" }, { "indexed": false, "name": "_amount", "type": "uint256" } ], "name": "nonNativeWithdrawal", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "admin", "type": "address" }, { "indexed": false, "name": "access", "type": "uint8" } ], "name": "AdminAdded", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "admin", "type": "address" }, { "indexed": false, "name": "old_access", "type": "uint8" }, { "indexed": false, "name": "new_access", "type": "uint8" } ], "name": "AdminAccessChanged", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "name": "admin", "type": "address" } ], "name": "AdminRemoved", "type": "event" } ];

var exchangeAddress="0x14f6650b4544ACCe642699baA305998AB393c83D";
var exchange_contract;

var balanceUpdate=false;
var ordersUpdate=false;
var metaMask_load=false;
var webSocked_load=false;
var local_nonce="0"
var webSocket;
var EtherAccount;
var tokenA;
var tokenB;
var tokenA_contract;
var tokenB_contract;
var tokenA_symbol;
var tokenB_symbol;
var tokenA_decimals;
var tokenB_decimals;
var tokenA_balance;
var tokenB_balance;
var currentBlock;
var orders;

class Order{
	constructor(_owner, _tokenA, _tokenB, _valueA, _valueB, _expire, _nonce) {
		this.owner = _owner;
		this.tokenA = _tokenA;
		this.tokenB = _tokenB;
		this.valueA = _valueA;
		this.valueB = _valueB;
		this.expire = _expire;
		this.nonce = _nonce;
		this.signed = false;
		this.hash=sha256('mergex',this.owner,this.tokenA,this.tokenB,this.valueA,this.valueB,this.expire,this.nonce);
	}
	setPriceAndAmount(_price, _amount){
		this.price = _price;
		this.amount = _amount;
	}
	setPrice(price){
		this.price = removeDecimals(price, tokenA_decimals);
	}
	setSignature(v,s,r){
		this.signature = {};
		this.signature.v = v;
		this.signature.s = s;
		this.signature.r = r;
		this.signed = true;
	}
	setTimestamp(ts){
		this.timestamp=ts;
	}
	isBuyOrder(){
		if(this.tokenA==tokenB)return true;
		return false;
	}
	sign(account, web3js, callbackf){
		var hash = this.getHash();
		console.log(hash);
		var _this=this;
		/*web3js.eth.sign(account, hash, function(error, result){
			console.log("res: "+result);
			_this.signature={};
			_this.signature.r = result.slice(0, 66);
			_this.signature.s = "0x"+result.slice(66, 130);
			if(result.slice(130, 132)=='1c')_this.signature.v=28;var connection = new WebSocket('ws://html5rocks.websocket.org/echo', ['soap', 'xmpp']);
			else _this.signature.v=27;
			callbackf();
		});*/
		web3js.personal.sign(hash, account, function(error, result){
			console.log("res: "+result);
			_this.signature={};
			_this.signature.r = result.slice(0, 66);
			_this.signature.s = "0x"+result.slice(66, 130);
			if(result.slice(130, 132)=='1c')_this.signature.v=28;
			else _this.signature.v=27;
			_this.signed=true;
			callbackf();
		});
	}
	sendOrder(ws){
		console.log("sending_order");
		if(this.signed){
			var _this=this;
			if(this.isBuyOrder()){
				tokenA_contract.allowance(this.owner, exchangeAddress, function(error, result){
					if(error)return;
					var owner_allowance=fromScientificToStrint(JSON.stringify(result).slice(1,-1));
					console.log("allow: "+owner_allowance);
					if(!isBiggerOrEqual(owner_allowance,_this.valueB)){
						tokenA_contract.approve(exchangeAddress, _this.valueB, { gasPrice: addDecimals($("#slider").val(),9) }, function(error, result){
							if(error)return;
							_this.finishSendingOrder(ws);
						});
					}else{
						_this.finishSendingOrder(ws);
					}
				});
			}else{
				tokenB_contract.allowance(this.owner, exchangeAddress, function(error, result){
					if(error)return;
					var owner_allowance=fromScientificToStrint(JSON.stringify(result).slice(1,-1));
					console.log("allow: "+owner_allowance);
					if(!isBiggerOrEqual(owner_allowance,_this.valueB)){
						tokenB_contract.approve(exchangeAddress, _this.valueB, { gasPrice: addDecimals($("#slider").val(),9) }, function(error, result){
							if(error)return;
							_this.finishSendingOrder(ws);
						});
					}else{
						_this.finishSendingOrder(ws);
					}
				});
			}
		}
		return false;
	}
	finishSendingOrder(ws){
		var jsonObj={};
		jsonObj["action"]="place_order";
		jsonObj["data"]={};
		jsonObj["data"]["hash"]=this.hash;
		jsonObj["data"]["owner"]=this.owner;
		jsonObj["data"]["tokenA"]=this.tokenA;
		jsonObj["data"]["tokenB"]=this.tokenB;
		jsonObj["data"]["valueA"]=this.valueA;
		jsonObj["data"]["valueB"]=this.valueB;
		jsonObj["data"]["expiration"]=this.expire;
		jsonObj["data"]["nonce"]=this.nonce;
		jsonObj["data"]["signature"]=this.signature;
		var jsonStr=JSON.stringify(jsonObj);
		console.log("SENDING: "+jsonStr);
		ws.send(jsonStr);
	}
	fillOrder(amount){
		if(isFullLoaded()){
			var orderA_contract;
			var orderB_contract;
			var orderA_decimals;
			var orderB_decimals;
			var amountA;
			var amountB;
			if(this.isBuyOrder()){
				orderA_contract=tokenB_contract;
				orderB_contract=tokenA_contract;
				orderA_decimals=tokenB_decimals;
				orderB_decimals=tokenA_decimals;
				var amountA=addDecimals(amount,orderA_decimals);
				var amountB=str_div(str_mul(this.valueB,amountA),this.valueA);
			}else{
				orderA_contract=tokenA_contract;
				orderB_contract=tokenB_contract;
				orderA_decimals=tokenA_decimals;
				orderB_decimals=tokenB_decimals;
				var amountB=addDecimals(amount,orderB_decimals);
				var amountA=str_div(str_mul(this.valueA,amountB),this.valueB);
			}
			var _this=this;
			orderB_contract.balanceOf(_this.owner, function(error, result){
				if(error)return;
				var owner_balance=fromScientificToStrint(JSON.stringify(result).slice(1,-1));
				if(!isBiggerOrEqual(owner_balance,amountB)){
					console.log("owner does not have funds for order!");
					showMessage("Trade error.","Order owner does not have enough funds for this transaction!");
					return;
				}
				orderB_contract.allowance(_this.owner, exchangeAddress, function(error,result){
					if(error)return;
					var owner_allowance=fromScientificToStrint(JSON.stringify(result).slice(1,-1));
					if(!isBiggerOrEqual(owner_allowance,amountB)){
						console.log("owner does not have allowance for order!");
						showMessage("Trade error.","Order owner does not have enough allowance for this transaction!");
						return;
					}
					orderA_contract.balanceOf(EtherAccount, function(error,result){
						if(error)return;
						var user_balance=fromScientificToStrint(JSON.stringify(result).slice(1,-1));
						if(!isBiggerOrEqual(user_balance,amountA)){
							console.log("User does not have funds to fill the order!");
							showMessage("Trade error.","Not enough funds to complete this trade!");
							return;
						}
						orderA_contract.allowance(EtherAccount, exchangeAddress, function(error,result){
							if(error)return;
							var user_allowance=fromScientificToStrint(JSON.stringify(result).slice(1,-1));
							console.log(user_allowance);
							if(!isBiggerOrEqual(user_allowance,amountA)){
								orderA_contract.approve(exchangeAddress, user_balance, { gasPrice: addDecimals($("#slider").val(),9) }, function(error,result){
									if(error)return;
									_this.fillOrderFinal(amountA);
								});
							}else{
								_this.fillOrderFinal(amountA);
							}
						});
					});
				});
			});
		}
	}
	fillOrderFinal(amount){
		exchange_contract.fillOrder(this.owner, this.tokenA, this.tokenB, amount, this.valueA, this.valueB, this.expire, this.nonce, this.signature.v.toString(), this.signature.r, this.signature.s, { gasPrice: addDecimals($("#slider").val(),9) }, function(error,result){
			closePopup();
			if(error)return;
		});
	}
	cancelOrder(callbackf){
		exchange_contract.cancelOrder(this.tokenA, this.tokenB, this.valueA, this.valueB, this.expire, this.nonce, this.signature.v.toString(), this.signature.r, this.signature.s, { gasPrice: addDecimals($("#slider").val(),9) }, function(error,result){
			callbackf();
			if(error)return;
			console.log("approve:"+result);
		});
	}
	setFilled(_filled){
		this.filled_A = _filled;
		this.filled_B = str_div(str_mul(_filled,this.valueB),this.valueA);
	}
	setOwnerAllowance(_allowance){
		this.allowance=_allowance;
	}
	setOwnerBalance(_balance){
		this.owner_balance=_balance;
	}
	getFilled(){
		if(this.tokenA==tokenA){
			return removeDecimals(this.filled_B, tokenB_decimals);
		}else{
			return removeDecimals(this.filled_A, tokenB_decimals);
		}
	}
	getTimestamp(){
		return this.timestamp;
	}
	setAmount(){
		this.amount=this.getAmount();
	}
	getAmount(){
		if(this.amount!=null)return this.amount;
		var tmp_value_B=this.valueB-this.filled_B;
		if(this.isBuyOrder()){
			var tmp_B=str_min(tmp_value_B,this.allowance,this.owner_balance);
			return removeDecimals(str_div(str_mul(this.valueA, tmp_B), this.valueB), tokenB_decimals);
		}else{
			return removeDecimals(str_min(tmp_value_B,this.allowance,this.owner_balance), tokenB_decimals);
		}
	}
	getPrice(){
		return this.price;
	}
	getValue(){
		if(this.value!=null)return this.value;
		var tmp_value_B=this.valueB-this.filled_B;
		if(this.isBuyOrder()){
			return removeDecimals(str_min(tmp_value_B,this.allowance,this.owner_balance), tokenA_decimals);
		}else{
			var tmp_B=str_min(tmp_value_B,this.allowance,this.owner_balance);
			return removeDecimals(str_div(str_mul(this.valueA,tmp_B),this.valueB), tokenA_decimals);
		}
	}
	setValue(){
		this.value=this.getValue();
	}
	getHash(){
		return this.hash;
	}
	getExpiration(){
		return this.expire;
	}
}

function setupExchange(){
	exchange_contract = web3.eth.contract(mergex_abi).at(exchangeAddress);
	exchange_contract.Trade({},{ fromBlock: 0, toBlock: 'latest' }).get(function(error, result){
		if(error)return;
		loadHistory(result);
	});
	exchange_contract.Trade().watch(function(error, result){
		if(error)return;
		appendHistory(result);
	});
}

function getOrders(ws){
	var jsonObj={};
	jsonObj["action"]="get_orders";
	jsonObj["data"]={};
	jsonObj["data"]["tokenA"]=tokenA;
	jsonObj["data"]["tokenB"]=tokenB;
	var jsonStr=JSON.stringify(jsonObj);
	ws.send(jsonStr);
}

function fromScientificToStrint(numb){
	if(numb.indexOf("e+")>-1){
		var parts = numb.split("e+");
		if(parts.length==2){
			return addDecimals(parts[0],parseInt(parts[1]));
		}
	}
	return numb;
}

function toDecimals(numb, decimals){
	if(decimals==null)decimals=8;
	return removeDecimals(str_round(addDecimals(numb, decimals)), decimals);
}

function addDecimals(numb, decimals){
	if(typeof numb == 'number')numb=numb.toString();
	while(decimals>0){
		if(numb.indexOf('.') > -1){
			if(numb.indexOf('.')<numb.length-2){
				numb=numb.slice(0,numb.indexOf('.'))+numb[numb.indexOf('.')+1]+'.'+numb.slice(numb.indexOf('.')+2);
			}else{
				numb=numb.slice(0,numb.indexOf('.'))+numb[numb.indexOf('.')+1];
			}
		}else{
			numb+="0";
		}
		decimals--;
	}
	while(numb[0]=='0')numb=numb.slice(1);
	if(numb=="")return "0";
	else if(numb[0]=='.')return "0"+numb;
	else return numb;
}

function removeDecimals(numb,decimals){
	if(typeof numb == 'number')numb=numb.toString();
	while(decimals>numb.length-1)numb="0"+numb;
	numb=numb.slice(0,-decimals)+"."+numb.slice(-decimals);
	while(numb[numb.length-1]=='0')numb=numb.slice(0,-1);
	if(numb[numb.length-1]=='.')numb=numb.slice(0,-1);
	return numb;
}

function cutDecimals(numb){
	if(typeof numb == 'number')numb=numb.toString();
	var decimals=numb.length-numb.indexOf('.')-1;
	return [addDecimals(numb, decimals), decimals];
}

function str_round(strnumb){
	if(typeof strnumb == 'number')strnumb=strnumb.toString();
	if(strnumb.indexOf('.') > -1){
		if(strnumb.indexOf('.')<strnumb.length-1 && Number(strnumb[strnumb.indexOf('.')+1])>4){
			return str_add(strnumb.slice(0,strnumb.indexOf('.')),'1');
		}
		return str_add(strnumb.slice(0,strnumb.indexOf('.')),'0');
	}
	return strnumb;
}

function str_add(strint_a,strint_b){
	if(typeof strint_a == 'number')strint_a=strint_a.toString();
	if(typeof strint_b == 'number')strint_b=strint_b.toString();
	return BigInteger.add(BigInteger.parseInt(strint_a,10), BigInteger.parseInt(strint_b,10)).toString(10);
}

function str_mul(strint_a,strint_b){
	if(typeof strint_a == 'number')strint_a=strint_a.toString();
	if(typeof strint_b == 'number')strint_b=strint_b.toString();
	return BigInteger.multiply(BigInteger.parseInt(strint_a,10), BigInteger.parseInt(strint_b,10)).toString(10);
}
function str_max(...numbs){
	var max=numbs[0];
	if(typeof max == 'number')max=max.toString();
	for(var i=0;i<numbs.length;i++){
		if(isBiggerOrEqual(numbs[i],max))max=numbs[i];
	}
	return max;
}
function str_min(...numbs){
	var min=numbs[0];
	if(typeof min == 'number')min=min.toString();
	for(var i=0;i<numbs.length;i++){
		if(!isBiggerOrEqual(numbs[i],min))min=numbs[i];
	}
	return min;
}
function isBiggerOrEqual(strint_a,strint_b){
	if(typeof strint_a == 'number')strint_a=strint_a.toString();
	if(typeof strint_b == 'number')strint_b=strint_b.toString();
	if(strint_a.length>strint_b.length)return true;
	else if(strint_a.length==strint_b.length){
		while(strint_a.length){
			if(Number(strint_a[0])>Number(strint_b[0]))return true;
			else if(Number(strint_a[0])<Number(strint_b[0]))return false;
			strint_a=strint_a.slice(1);
			strint_b=strint_b.slice(1);
		}
		return true;
	}
	return false;
}
function str_sub(strint_a,strint_b){
	if(typeof strint_a == 'number')strint_a=strint_a.toString();
	if(typeof strint_b == 'number')strint_b=strint_b.toString();
	return BigInteger.substract(BigInteger.parseInt(strint_a,10), BigInteger.parseInt(strint_b,10)).toString(10);
}
function str_div(strint_a,strint_b){
	if(typeof strint_a == 'number')strint_a=strint_a.toString();
	if(typeof strint_b == 'number')strint_b=strint_b.toString();
	return BigInteger.divide(BigInteger.parseInt(strint_a,10), BigInteger.parseInt(strint_b,10)).toString(10);
}

function calculateValue(amount, price, decimals){
	var dprice=str_round(addDecimals(price, decimals));
	var am=cutDecimals(amount);
	var sum=str_mul(dprice,am[0]);
	sum=str_round(removeDecimals(sum,am[1]));
	return sum;
}

function createBuyOrder(price, amount){
	if(metaMask_load && webSocked_load){
		var exp=$("#blk_input").val();
		web3.eth.getBlockNumber(function(error, block) {
			exp = str_add(block, exp);
			var valueA = calculateValue(amount, price, tokenA_decimals);
			var valueB = addDecimals(amount, tokenB_decimals);
			var signedOrder=new Order(EtherAccount, tokenA, tokenB, valueA, valueB, exp, local_nonce);
			local_nonce=str_add(local_nonce,"1");
			signedOrder.sign(EtherAccount,web3js,function(){
				signedOrder.sendOrder(webSocket);
			});
		});
		return true;
	}
	return false;
}
function createSellOrder(price, amount){
	if(metaMask_load && webSocked_load){
		var exp=$("#blk_input").val();
		web3.eth.getBlockNumber(function(error, block) {
			exp = str_add(block, exp);
			var valueA = addDecimals(amount, tokenB_decimals);
			var valueB = calculateValue(amount, price, tokenA_decimals);
			var signedOrder=new Order(EtherAccount, tokenB, tokenA, valueA, valueB, exp, local_nonce);
			local_nonce=str_add(local_nonce,"1");
			signedOrder.sign(EtherAccount,web3js,function(){
				signedOrder.sendOrder(webSocket);
			});
		});
		return true;
	}
	return false;
}
function updateBalances(account){
	var aFinished=false;
	var bFinished=false;
	tokenA_contract.balanceOf(account, function(error,result){
		tokenA_balance=JSON.stringify(result);
		tokenA_balance=fromScientificToStrint(tokenA_balance.slice(1,-1));
		aFinished=true;
		if(bFinished){
			loadInfo();
		}
	});
	tokenB_contract.balanceOf(account, function(error,result){
		tokenB_balance=JSON.stringify(result);
		tokenB_balance=fromScientificToStrint(tokenB_balance.slice(1,-1));
		bFinished=true;
		if(aFinished){
			loadInfo();
		}
	});
}
function orderFromJson(jsonObj){
	var order = new Order(jsonObj["owner"],jsonObj["tokenA"],jsonObj["tokenB"],jsonObj["valueA"],jsonObj["valueB"],jsonObj["expiration"],jsonObj["nonce"]);
	order.setSignature(jsonObj["signature"].v,jsonObj["signature"].s,jsonObj["signature"].r);
	if(order.isBuyOrder())order.setPrice(jsonObj["priceB"]);
	else order.setPrice(jsonObj["priceA"]);
	order.setTimestamp(jsonObj["timestamp"]);
	return order;
}
function parseOrders(jsonObj){
	orders={};
	var orders_count=jsonObj.length*3;
	var orders_processed=0;
	var check_callback=function(){
		orders_processed++;
		if(orders_processed==orders_count){
			for(i in orders){
				orders[i].setAmount();
				orders[i].setValue();
				/*console.log("-------------------------");
				console.log("Order: "+orders[i].getHash());
				console.log("-------------------------");
				console.log("Amount: "+orders[i].getAmount());
				console.log("Value: "+orders[i].getValue());
				console.log(isBiggerOrEqual(orders[i].getExpiration(), currentBlock));
				console.log("Fill: "+orders[i].filled_B+" = "+orders[i].valueB);
				console.log(!isBiggerOrEqual(orders[i].filled_B, orders[i].valueB));*/
				if(orders[i].owner==EtherAccount&&orders[i].nonce==local_nonce){
					local_nonce=str_add(local_nonce,"1");
				}
				if(orders[i].getValue()=="0" 
				|| !isBiggerOrEqual(orders[i].getExpiration(), currentBlock)
				|| isBiggerOrEqual(orders[i].filled_B, orders[i].valueB)){
					delete orders[i];
				}
			}
			renderOrders(EtherAccount);
		}
	};
	for(var i=0;i<jsonObj.length;i++){
		startParsingOrder(jsonObj[i],check_callback);
	}
}
function startParsingOrder(orderJson,callbackf){
	var order=orderFromJson(orderJson);
	orders[order.getHash()]=order;
	var order_contract;
	if(order.tokenA==tokenA){
		order_contract=tokenB_contract;
	}else{
		order_contract=tokenA_contract;
	}
	exchange_contract.fills(order.owner,order.getHash(),function(error,result){
		var amountFilled=fromScientificToStrint(JSON.stringify(result).slice(1,-1));
		order.setFilled(amountFilled);
		callbackf();
	});
	order_contract.balanceOf(order.owner, function(error,result){
		var tmp_balance=fromScientificToStrint(JSON.stringify(result).slice(1,-1));
		order.setOwnerBalance(tmp_balance);
		callbackf();
	});
	order_contract.allowance(order.owner, exchangeAddress, function(error,result){
		var tmp_allowance=fromScientificToStrint(JSON.stringify(result).slice(1,-1));
		order.setOwnerAllowance(tmp_allowance);
		callbackf();
	});
}