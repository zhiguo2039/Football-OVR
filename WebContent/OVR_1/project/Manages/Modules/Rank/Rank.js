/**
 * 
 */




var Rank = {
    Datas: {
        DataKey: "",
        Index: null,
        CurIndex:null,
        LoaclDatas: {
        	TestInfo:[],
            SportInfo: [],
            CRInfo:[],
            VenueInfo:[],
            RankInfo:[],
            RankFreeInfo:[],
            EventInfo:[],
            AddRankInfo: [],
            MedalStatisticsInfo:[],
            Menus: {
                Index: 0,
                Items: [
                    { Key: "" },
                ]
            }
        }
    },
    Tpls: {
    	tplRankEvent:{P:"Modules/Rank/RankEvent.htm", C: "" },
    	tplRankInfo:{P:"Modules/Rank/RankInfo.htm", C: "" },
    	tplRankFreeInfo: { P: "Modules/Rank/RankFreeInfo.htm", C: "" },
    	tplMedalStatistics: { P: "Modules/Rank/medalStatistics.htm", C: "" },
    },
    Path: {

    	getEventName:"Rank/getEventName.txt",
    	getRankInfo:"Rank/getRankInfo.txt",
    	delRI:"Rank/deletRankInfo.txt",
    	revRI: "Rank/reviseRankInfo.txt",
    	editRankOff: "Rank/editRankOff.txt",
    	getRFP:"Rank/getRankfreepeople.txt",
    	addRI:"Rank/addRankInfo.txt",
    	autoRank: "Rank/autoRank.txt",
    	getMedalStatistics: "Rank/getMedalStatistics.txt",
    },
//装填项目选择的
    LoadRankInf:function(){
    	var me = Rank;
        try {
            hhls.GetTpls(me.Tpls, function () {
                //hhls.fillElement("#SJH", me.Tpls.tplBD.C);
                Ac.acGetTable(me.Path.getEventName, {}, function (aRes) {
        		  var aSI = aRes.Datas;
                  me.Datas.LoaclDatas.EventInfo = aSI.DA;
                  var aHtml = bt(me.Tpls.tplRankEvent.C, { eventInfo: aSI.DA});
                  hhls.fillElement("#tab-1", aHtml);
                	me.LoadRankInfo();
                	//me.DataTables();
                });
            });
        }
        catch (e) {; }
    },
    //成绩设置为官方状态
    RankOfficial: function () {
        var me = Rank;
        try {

            var aFlag = window.confirm("是否设置为官方？");
            if (aFlag) {
                var cb = document.getElementsByName("RankBox");
                var ID = '';
                var str = ',';
                for (var i = 0; i < cb.length; i++) {

                    if (cb[i].checked) {

                        for (var i = 0; i < cb.length; i++) {
                            if (cb[i].checked) {
                                ID = ID + me.Datas.LoaclDatas.RankInfo[i].ID + str;
                            }
                        }
                        if (ID.length > 0) {
                            ID = ID.substr(0, ID.length - 1);
                        }


                    }

                }
                //me.Datas.Index = i;
                Ac.acExecuteSql(me.Path.editRankOff, { ID: ID }, function (aRes) {
                    if (aRes.State == 1) {
                        me.LoadRankInfo();
                    }
                    else {
                        alert("提交失败！");
                    }
                });


            }
        }
        catch (e) {; }
    },
//装填已经录入的名次信息
    LoadRankInfo:function(){
    	var me = Rank;
        try {
            hhls.GetTpls(me.Tpls, function () {
                Ac.acGetTable(me.Path.getRankInfo, {ID:$('#eventsel option:selected').val()}, function (aRes) {
                    var aSI = aRes.Datas;
                    me.Datas.LoaclDatas.RankInfo = aSI.DA;
                    var aHtml = bt(me.Tpls.tplRankInfo.C, { rankInfo: aSI.DA });
                     hhls.fillElement("#RankEvent_RankInfo", aHtml);
                     me.DataTables();
                });
            });
        }
        catch (e) {; }
    },
//删除名次信息
    deleteRankInf:function(Index){
    	//alert(Index);
        var me = Rank;
        try {
            var aItem = me.Datas.LoaclDatas.RankInfo[Index];
            var aPath = me.Path.delRI;
           // alert("aItem.ID="+aItem.ID);
            var aFlag = window.confirm("是否确定删除该名次信息？");
            if (aFlag) {
                Ac.acExecuteSql(aPath, { ID: aItem.ID }, function (aRes) {
                	
                    if (aRes.State == 1) {
                        me.LoadRankInfo();
                    }
                    else {
                        alert("删除失败！");
                    }
                });
            }
        }
        catch (e) {; }
    },
//填充待修改的名次信息
    RankInfoEdit:function(Index){

    	var me = Rank;
    	me.MatchDate();
        try {
            var aItem = me.Datas.LoaclDatas.RankInfo[Index];
            document.getElementById('rankid').value=aItem.ID;
            document.getElementById('mingci').value=aItem.Rank;
            document.getElementById('mingcheng').value = aItem.ParticipantName;
            document.getElementById('bisaixiangmu').value = aItem.EventName;
            document.getElementById('changguan').value = aItem.VenueCode;            
            document.getElementById('shijian').value=aItem.RankDate;                   
            document.getElementById('zhuangtai').value = aItem.RankStatus;
            //document.getElementById('xuhao').value = aItem.RankOrder;
            document.getElementById('beizhu').value=aItem.RankDescription;            
        }
        catch (e) {; }
    },
//修改名次信息
    ReviseRankInfo:function(){
    	//alert("Index");
    	var me = Rank;
    	try{
        var revrankInfo = {
        		ID:$("#rankid").val(),
        		Rank:$("#mingci").val(),
        		//RankOrder:$("#xuhao").val(),
        		RankDate:$("#shijian").val(),
        		RankStatus:$("#zhuangtai").val(),
        		RankDescription:$("#beizhu").val(),
            };
        var aPath = me.Path.revRI;
        Ac.acExecuteSql(aPath, revrankInfo, function (aRes) {
            if (aRes.State == 1) {
                //$("#myModal").modal('toggle');
                me.LoadRankInf();
            }
            else {
                alert("提交失败！");
            }
        });
    }
    catch (e) {; }
    },
//填充待添加的名次的成员信息
    LoadRankFreeInfo:function(){
    	var sel=document.getElementById("eventsel"); 
    	var index = sel.selectedIndex; // 选中索引
        var EventID= sel.options[index].value;//要的值
        var me=Rank; 
    	try {
            hhls.GetTpls(me.Tpls, function () {
                Ac.acGetTable(me.Path.getRFP, {EventID:EventID}, function (aRes) {
                    var aSI = aRes.Datas;
                    me.Datas.LoaclDatas.RankFreeInfo = aSI.DA;
                    var aHtml = bt(me.Tpls.tplRankFreeInfo.C, { rankfreeInfo: aSI.DA });
                     hhls.fillElement("#modal_body", aHtml);
                     me.DataTables();
                });
            });
        }
        catch (e) {; }
    },
    //自动生成名次
    AutoRankInfo:function(){
    	var me=Rank;
    	   var aFlag = window.confirm("是否自动生成名次信息？");
           if (aFlag) {
		    	 var aPath = me.Path.autoRank;
		         Ac.acExecuteSql(aPath, {EventID:$('#eventsel option:selected').val()}, function (aRes) {
		             if (aRes.State == 1) {
		                 //$("#myModal").modal('toggle');
		                 me.LoadRankInfo();
		             }
		             else {
		                 alert("提交失败！");
		             }
		         });
           }
    	
    },

   

    //奖牌统计
    MedalStatistics: function () {
        var me = Rank;
        //alert("this is MedalStatistics!!");
        try {
            hhls.GetTpls(me.Tpls, function () {

                Ac.acGetTable(me.Path.getMedalStatistics, {}, function (aRes) {
                    var aSI = aRes.Datas;
                    me.Datas.LoaclDatas.MedalStatisticsInfo = aSI.DA;//tplMedalStatistics
                    var aHtml = bt(me.Tpls.tplMedalStatistics.C, { medalstatisticsinfo: aSI.DA });
                    hhls.fillElement("#modal_body2", aHtml);
                    me.DataTables();
                });
            });
        }
        catch (e) {; }
    },
//添加待加入名次的成员信息
    AddRankInfo:function(){
    	//alert("this is AddRankInfo!!!");
    	var obj = document.getElementsByName("rankcheckbox");
    	    check_val = [];
    	    for(k in obj){
    	        if(obj[k].checked)
    	            check_val.push(obj[k].value);
    	    }
    	var me=Rank;
    	
    	//alert( me.Datas.LoaclDatas.RankFreeInfo[check_val[0]].ParticipantName);
    	try{
    		var str="('";
    		var str1="')";
    		var str2="','";
    	    var str3=",";
    		var infos;
    		for( var i=0;i<check_val.length;i++){
    			var aItem=me.Datas.LoaclDatas.RankFreeInfo[check_val[i]];
    			var info=str+aItem.DelegationID+str2+aItem.EventID+str2+aItem.ID+str2+aItem.ParticipantCode+str2+
    			aItem.ParticipantName+str2+aItem.ParticipantLocalName+str2+"N"+str1;
    			if(i==0) infos=info;
    			else infos=infos+str3+info;
    			}
    		    //alert(infos); 
        var aPath = me.Path.addRI;
        Ac.acExecuteSql(aPath, {Infos:infos}, function (aRes) {
            if (aRes.State == 1) {
                //$("#myModal").modal('toggle');
                me.LoadRankInfo();
            }
            else {
                alert("提交失败！");
            }
        });
    }
    catch (e) {; }
    },

    
    allselect:function(){
    	//alert("this is allselect!!!");
    	if ($('#allselectcheckbox').is(':checked')){  
    	    $("input[name='RankBox']:checkbox").each(function () {
	              $(this).attr("checked", true);  
	        });
	    } else {   
    	    $("input[name='RankBox']:checkbox").each(function () {
	              $(this).attr("checked", false);  
	        });
	    }  
    },
  
    DataTables: function () {
        //var me = Rank;
    	if ( $.fn.dataTable.isDataTable( '.dataTables-example' ) ) {
    	   var table = $('.dataTables-example').DataTable();
    	   //table.destroy();
    	}
    	else {
    		$('.dataTables-example').DataTable().destroy();
    	  var  table = $('.dataTables-example').DataTable( {
    	    	pageLength: 10,
                responsive: true,
                //dom: '<"html5buttons"B>lTfgitp',
                buttons: [
                ]
    	    } );
    	}
    	
    	

    },
    

    MatchDate:function(){
    	//alert("this MatchDate!!!");
    	$('#MatchDate').datepicker({
    		todayBtn: "linked",
    		keyboardNavigation: false,
    		forceParse: false,
    		calendarWeeks: true,
    		autoclose: true
    	});
    }
    
 
   
    
 
}