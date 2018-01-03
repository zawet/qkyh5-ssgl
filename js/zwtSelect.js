
define(function(require,exports) {//dedine闭包
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
exports.setSelect=function(id,toid){
    id.find("option[uid='"+toid+"']").attr("selected",true);
}
});