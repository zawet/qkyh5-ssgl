

define(function(require,exports) {//dedine闭包


//自动变化以头部的距离，i为想离头部有多远，可以负数
exports.qkyh5_topa_header=function (i,jq){
	if(jq==1){
	var titHeight = $('.qkyh5_header').height()+i;
	}else{
	var titHeight = $('.qkyh5_header').offset().height+i;}
	//console.log(titHeight);
	$(".qkyh5_main").css({"paddingTop":titHeight+"px"});
}

//下拉渲染
exports.selectDraw=function (id,data,fun){
    var optionHtml="";
    for(var i=0;i<data.length;i++){
        optionHtml+='<option value="'+data[i][1]+'" uid="'+data[i][0]+'">'+data[i][1]+'</option>';
    }
    id.html(optionHtml);
    id.change(function(){
        var onse=$(this).find("option:selected");
        fun(onse.attr("value"),onse.attr("uid"));  
    });
}
//下拉设置选中项
exports.setSelect=function(id,toid){
    id.find("option[uid='"+toid+"']").attr("selected",true);
}

//异步ajax
exports.htmlajax=function(url,sucfun){
		var urlhtml="";
		$.ajax({
		  url: url,
		  cache: false,
		  success: function(html){
			 sucfun(html);
		  }
		});	
}

//获取url里的参数
exports.getUrl=function(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
}

//判断字符串是否为空
exports.isNull=function (data){ 
    	return (data == "" || data == undefined || data == null) ? "kong" : data; 
}

//获取字符串在数组的位置
exports.indexOf=function(arr, str){
		// 如果可以的话，调用原生方法
		if(arr && arr.indexOf){
			return arr.indexOf(str);
		}
		var len = arr.length;
		for(var i = 0; i < len; i++){
			// 定位该元素位置
			if(arr[i] == str){
				return i;
			}
		}
		// 数组中不存在该元素
		return -1;
	}
	
//某日的昨天和明天
exports.comp_date=function(y_m_d,type){
		var ymd=y_m_d.split("-");
		var thisDate=new Date(Number(ymd[0]),(Number(ymd[1])-1),Number(ymd[2]));
		var returnDate=new Date();
		if(type){
			returnDate.setTime(thisDate.getTime()+24*60*60*1000);
		}else{
			returnDate.setTime(thisDate.getTime()-24*60*60*1000);
		}
		var m=returnDate.getMonth()+1;
		var d=returnDate.getDate();
		if(m<10) m="0"+m; else m=m;
		if(d<10) d="0"+d; else d=d;
		 return returnDate.getFullYear()+"-"+m+"-"+d;  
}


});