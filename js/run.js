define(function(require,exports) {//dedine闭包
	var Data=require("./Data.js");//数据总成
	var fun=require("./HFive.js");//函数总成 
    var myDate = new Date();
    var toy=myDate.getFullYear();    //获取完整的年份(4位,1970-????)
    var tom=myDate.getMonth();       //获取当前月份(0-11,0代表1月)
	var tod=myDate.getDate();        //获取当前日(1-31)
	var pages ;

	$(".popup-close").click(function(){//弹窗关闭按钮
		$(this).parents(".popup").removeClass("open");
		$(".popup-mask").fadeOut(200);
		$(".qkyh5_header,.qkyh5_main,.qkyh5_footbg").removeClass("blur");
	});	
	
	exports.index=function(){
		//初始化页面
		var mm=tom+1,dd=tod;if(mm<10) mm="0"+mm;if(dd<10) dd="0"+dd;//给不到10的月份和日数前加0
		$("#pbDate").val(toy+"-"+mm+"-"+dd);//设置日期

		//下拉渲染
		fun.selectDraw($("#ss-group select"),Data.groupData,function(vaule,uid){});
		fun.selectDraw($("#ss-class select"),Data.classData,function(vaule,uid){});
		fun.selectDraw($("#ss-ssl select"),Data.dromData,function(vaule,uid){});
		fun.selectDraw($("#ss-lc select"),Data.dromlData,function(vaule,uid){});
		fun.selectDraw($("#ss-ssh select"),Data.dromnData,function(vaule,uid){});

		//渲染初始化页面
		pageDraw(Data.pbtjData,$("#pbDate").val());

		$("#pbDate").change(function(){//日历输入框直接输入日期时，重新初始化页面三天数据;
			pageDraw(Data.pbtjData,$(this).val());
		});

		//其他一些操作交互事件
		$(".date-but").click(function(){//日期两旁的点击按钮
			if($(this).hasClass("left"))pageChange("prev"); else pageChange("next");
		});
		$(".but-bar .but.lt").click(function(){//班级和宿舍的选择按钮
			$(this).addClass("active").siblings().removeClass("active");
			var tsid=$(this).attr("toshow");
			$(".sel-bar").removeClass("ub");
			$(".ss-page").removeClass("open");
			$(".sel-bar[selid='"+tsid+"']").addClass("ub");
			$(".ss-page[pageid='"+tsid+"']").addClass("open");
		});
		
		$(".ss-pages").on("click",".toinfo",function(){//内容弹窗按钮
			$("#tips1").addClass("open");
			$(".popup-mask").fadeIn(200);
		});
		
	}

	exports.xc=function(){
		fun.selectDraw($("#ss-ssl select"),Data.dromData,function(vaule,uid){});
		fun.selectDraw($("#ss-lc select"),Data.dromlData,function(vaule,uid){});
		fun.selectDraw($("#ss-ssh select"),Data.dromnData,function(vaule,uid){});
		$("#jftxt").click(function(){//内容弹窗按钮
			$("#jctxtChoose").addClass("open");
			$(".qkyh5_header,.qkyh5_main,.qkyh5_footbg").addClass("blur");
		});

		var valAll="";
		$(".ss-choose-box").on("click","a",function(){
			valAll=$("#jftxt_hc").val();
			if($(this).attr("isc")=="no"){
				$(this).attr("isc","yes").addClass("active");
				valAll+=$(this).html()+",";
			}else{
				$(this).attr("isc","no").removeClass("active");
				valAll=valAll.replace($(this).html()+",","");
			}
			$("#jftxt_hc").val(valAll);
		});
		$("#chooseOk").click(function(){
			$("#jftxt").val($("#jftxt_hc").val());
			$(this).parents(".popup").removeClass("open");
			$(".qkyh5_header,.qkyh5_main,.qkyh5_footbg").removeClass("blur");
		})
		
	}

	exports.zs=function(){
		//下拉渲染
		fun.selectDraw($("#ss-group select"),Data.groupData,function(vaule,uid){});
		fun.selectDraw($("#ss-class select"),Data.classData,function(vaule,uid){});
		fun.selectDraw($("#ss-ssl select"),Data.dromData,function(vaule,uid){});
		fun.selectDraw($("#ss-lc select"),Data.dromlData,function(vaule,uid){});
		fun.selectDraw($("#ss-ssh select"),Data.dromnData,function(vaule,uid){});

		$("#shaixuan").click(function(){//内容弹窗按钮
			$("#sxChoose").addClass("open");
			$(".qkyh5_header,.qkyh5_main,.qkyh5_footbg").addClass("blur");
		});
	}


	//评比页辅助函数集

	//添加一级列表
	function liAdd(date){
		return '<div class="ss-pagesli" date="'+date+'"></div>';
	}
	//初始化渲染当天的前天后天三天数据
	function pageDraw(data,date){
		$(".ss-pages").html("");//清空（为了日历输入框直接输入时，避免跟旧数据重叠造成混乱）
		$(".ss-pages").append(liAdd(fun.comp_date(date,false)));
		$(".ss-pages").append(liAdd(date));
		$(".ss-pages").append(liAdd(fun.comp_date(date,true)));
		checkData_join(data[fun.comp_date(date,false)],fun.comp_date(date,false));
		checkData_join(data[date],date);
		checkData_join(data[fun.comp_date(date,true)],fun.comp_date(date,true));
		$(".ss-pages .ss-pagesli[date='"+date+"']").addClass("open");
	}
	//数据判断和加入二级内容
	function checkData_join(data,date){
		if(fun.isNull(data)=="kong"){
			$(".ss-pages .ss-pagesli[date='"+date+"']").html($("#huancun2").html());
		}else{
			$(".ss-pages .ss-pagesli[date='"+date+"']").html($("#huancun").html());
		}
	}

	//根据输入框的日期进行变换
	function pageChange(type){
		var inputDate=$("#pbDate").val();
		var prevDate=fun.comp_date(inputDate,false);
		var nextDate=fun.comp_date(inputDate,true);
		var thiss=$(".ss-pages .ss-pagesli").length;
		var activeIndex=$(".ss-pages .ss-pagesli[date='"+inputDate+"']").index();
		$(".ss-pages .ss-pagesli").removeClass("open").removeClass("rightyc");
		if(type=="prev"){
			$("#pbDate").val(prevDate);
			if(activeIndex<=0){ $(".ss-pages").prepend(liAdd(prevDate)); checkData_join(Data.pbtjData[prevDate],prevDate);}
			$(".ss-pages .ss-pagesli[date='"+prevDate+"']").addClass("open");
		}else{
			$(".ss-pages .ss-pagesli").addClass("rightyc");
			$("#pbDate").val(nextDate);
			if(activeIndex>=(thiss-1)){ $(".ss-pages").append(liAdd(nextDate)); checkData_join(Data.pbtjData[nextDate],nextDate); }
			$(".ss-pages .ss-pagesli[date='"+nextDate+"']").addClass("open");
		}
	}
});