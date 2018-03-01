function showPopup(){
	$(".screenshade").fadeIn(800);
	$(".popup").fadeIn(800);
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
function confirmOrder(buy){
	var price=$("input[name=price]").val();
	var amount=$("input[name=amount]").val();
	$(".screenshade").fadeIn(800);
	var pr='<div class="poptitle">Confirm '+(buy?'buy':'sell')+' order?</div>';
	pr+='Are you sure you want to place '+(buy?'buy':'sell')+' order for '+amount+' '+tokenB_symbol+', pricing at '+price+' '+tokenA_symbol+' each?';
	pr+='<br><br>Total value: '+removeDecimals(str_mul(addDecimals(price,tokenA_decimals),amount),tokenA_decimals)+' '+tokenA_symbol;
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
	$(".popup").fadeIn(800);
}
function tryFillOrder(){
	var hash=$("input[name=hash]").val();
	var amount=$("input[name=amount]").val();
	orders[hash].fillOrder(amount);
}
function closePopup(){
	$(".screenshade").fadeOut(800);
	$(".popup").fadeOut(800);
}