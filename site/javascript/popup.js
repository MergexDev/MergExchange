function showPopup(){
	$(".screenshade").fadeIn(600);
	$(".popup").fadeIn(600);
}
function blocksToTime(blocks){
	blocks=Number(blocks);
	var msg="";
	var seconds=blocks*15;
	if(seconds>=60){
		var minutes=Math.floor(seconds/60);
		seconds-=minutes*60;
		if(minutes>=60){
			var hours=Math.floor(minutes/60);
			minutes-=hours*60;
			if(hours>=24){
				var days=Math.floor(hours/24);
				hours-=days*24;
				msg+=days+" days ";
			}
			if(hours>0)msg+=hours+" hours ";
		}
		if(minutes>0)msg+=minutes+" minutes ";
	}
	if(seconds>0)msg+=seconds+" seconds ";
	return msg;
}
function showMessage(title,msg){
	$(".popup").fadeOut(600,function(){
		var pr='<div class="poptitle">'+title+'</div>';
		pr+=msg;
		pr+='<okbtn onclick="closePopup();">OK</okbtn>';
		$(".popup").html(pr);
		$(".popup").fadeIn(600);
	});
}
function confirmOrder(buy){
	var price=$("input[name=price]").val();
	var amount=$("input[name=amount]").val();
	$(".screenshade").fadeIn(600);
	var pr='<div class="poptitle">Confirm '+(buy?'buy':'sell')+' order?</div>';
	pr+='Are you sure you want to place '+(buy?'buy':'sell')+' order for '+amount+' '+tokenB_symbol+', pricing at '+price+' '+tokenA_symbol+' each?';
	pr+='<br><br>Total value: '+removeDecimals(removeDecimals(str_mul(addDecimals(price,tokenA_decimals),addDecimals(amount,tokenB_decimals)),tokenA_decimals),tokenB_decimals)+' '+tokenA_symbol;
	pr+='<br><br>Order expiration time (blocks) <q id="blk_count">'+25000+" blocks ~ "+blocksToTime(25000)+'</q><br><input id="blk_input"type="text" value="25000"></input>'
	if(buy)pr+='<confirm onclick="createSellOrder('+price+', '+amount+');">Confirm</confirm>';
	else pr+='<confirm onclick="createBuyOrder('+price+', '+amount+');">Confirm</confirm>';
	pr+='<cancel onclick="closePopup();">Cancel</cancel>';
	$(".popup").html(pr);
	$("#blk_input").on("change paste keyup", function(){
		console.log("?");
		var blocks=$("#blk_input").val();
		$("#blk_count").html(blocks+" blocks ~ "+blocksToTime(blocks));
	});
	$(".popup").fadeIn(600);
}
function confirmFill(){
	var amount_regex = new RegExp("^([0-9]+|[0-9]+.[0-9]+)$");
	var hash_regex = new RegExp("^0x[0-9a-f]{64}$");
	var hash=$("input[name=hash]").val();
	var amount=$("input[name=amount]").val();
	$(".screenshade").fadeIn(600);
	if(!hash_regex.test(hash) || !amount_regex.test(amount) || orders[hash]==null){
		var pr='<div class="poptitle">Input error!</div>';
		pr+="Invalid input detected, please try again."
		pr+='<okbtn onclick="closePopup();">OK</okbtn>';
		$(".popup").html(pr);
		$(".popup").fadeIn(600);
	}else{
		var order=orders[hash];
		var pr='<div class="poptitle">Confirm order fill?</div>';
		pr+='Are you sure you want to '+(order.isBuyOrder()?'sell':'buy')+' '+amount+' '+tokenB_symbol+', pricing at '+order.getPrice()+' '+tokenA_symbol+' each?';
		pr+='<br><br>Total value: '+removeDecimals(removeDecimals(str_mul(addDecimals(order.getPrice(),tokenA_decimals),addDecimals(amount,tokenB_decimals)),tokenA_decimals),tokenB_decimals)+' '+tokenA_symbol;
		pr+='<confirm onclick="tryFillOrder();">Confirm</confirm>';
		pr+='<cancel onclick="closePopup();">Cancel</cancel>';
		$(".popup").html(pr);
		$(".popup").fadeIn(600);
	}
}
function tryCancelOrder(hash){
	$(".screenshade").fadeIn(600);
	var order=orders[hash];
	var pr='<div class="poptitle">Confirm cancel order?</div>'
	pr+='Are you sure you want to cancel this order?';
	pr+='<br><br>Order hash: <br>'+hash;
	pr+='<br><br>Created: '+order.getTimestamp();
	pr+='<br>Type: '+(order.isBuyOrder()?'Buy':'Sell');
	pr+='<br>Price: '+order.getPrice();
	pr+='<br>Amount: '+order.getAmount();
	pr+='<confirm onclick="setupCancelOrder(\''+hash+'\');">Yes</confirm>';
	pr+='<cancel onclick="closePopup();">No</cancel>';
	$(".popup").html(pr);
	$(".popup").fadeIn(600);
}
function setupCancelOrder(hash){
	orders[hash].cancelOrder(function(){
		closePopup();
	});
}
function tryFillOrder(){
	var hash=$("input[name=hash]").val();
	var amount=$("input[name=amount]").val();
	orders[hash].fillOrder(amount);
}
function closePopup(){
	$(".screenshade").fadeOut(600);
	$(".popup").fadeOut(600);
}