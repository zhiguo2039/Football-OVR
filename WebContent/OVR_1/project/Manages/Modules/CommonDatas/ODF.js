var ODF = {


    
    GetGDF:function(){
        var me = ODF;

        try {
            var GDF = $('#GDF').val();
            if (GDF == 'DT_SCHEDULE') {
                me.Get_DT_SCHEDULE();
            } else if (GDF == 'DT_SCHEDULE_UPDATE') {
                me.Get_DT_SCHEDULE_UPDATE();
            } else if (GDF == 'DT_PARTIC') {
                me.Get_DT_PARTIC();
            } else if (GDF == 'DT_PARTIC_UPDATE') {
                me.Get_DT_PARTIC_UPDATE();
            }else if (GDF == 'DT_PARTIC_TEAMS') {
                me.Get_DT_PARTIC_TEAMS();
            }else if (GDF == 'DT_PARTIC_TEAMS_UPDATE') {
                me.Get_DT_PARTIC_TEAMS_UPDATE();
            } else if (GDF == 'DT_STATS') {
            	
                me.Get_DT_STATS1();
            } else if (GDF == "DT_RESULT") {
            	
                me.Get_DT_RESULT1();
            } else if (GDF == "DT_POOL_STANDING") {
            	
                me.Get_DT_POOL_STANDING1();
            } else if (GDF == "DT_PLAY_BY_PLAY") {
            	
                me.Get_DT_PLAY_BY_PLAY1();
            } else if (GDF == "DT_BRACKETS") {
            	
                me.Get_DT_BRACKETS1();
            }

        }
        catch (e) {; }
    },
    Get_DT_BRACKETS1:function(){
        var me = ODF;
        try {
            var eventid = $('#EventID option:selected').val();
            Ac.acGetTable(CommonData.Path.getcode, { eventid: eventid }, function (aRes) {
                var aSI = aRes.Datas;
                var rsc=aRes.Datas.DA[0].T + '------------';
                var xmlname = rsc+'_DT_BRACKETS';

                var ODFParams = {
                		RSC: rsc,
                		eventid: eventid,
                		RSN: rsc + '_DT_BRACKETS',
                }
                Ac.acGetODF("Proc_Export_DT_BRACKETS", ODFParams, xmlname, function (aRes) {
                    //alert(aRes.Datas);
                    //window.open(me.Datas.ReportUrl + aRes.Datas);
                });
            });
                      
          }
        catch (e) {; }
           
    },

    Get_DT_PLAY_BY_PLAY1: function () {
        var me = ODF;

                try {

                    var matchid = Result.Datas.LoaclDatas.ResultSessionInfo[Result.Datas.cIndex].ID;
                    Ac.acGetTable(CommonData.Path.getfullMatchCode, { ID: matchid }, function (aRes) {
                        var aSI = aRes.Datas;

                        var xmlname = aRes.Datas.DA[0].T + 'DT_PLAY_BY_PLAY';

                        var ODFParams = {
                            matchid: matchid,
                            //matchid:1110
                            RSN:aRes.Datas.DA[0].T + 'DT_PLAY_BY_PLAY',
                        }
                        Ac.acGetODF("Proc_Export_DT_PLAY_BY_PLAY", ODFParams, xmlname, function (aRes) {
                            //alert(aRes.Datas);
                            //window.open(me.Datas.ReportUrl + aRes.Datas);
                        });
                    });

                }
        catch (e) {; }
    },

    Get_DT_POOL_STANDING1: function () {
        var me = ODF;
        
        
        // alert(eventinfo.length);TTEWSINGLES-----------------------
        
        try {
            var eventid = $('#EventID option:selected').val();
            var phaseid=$('#PhaseID option:selected').val();
            var phaseinfo=Result.Datas.LoaclDatas.PhaseInfo;
            Ac.acGetTable(CommonData.Path.getcode, { eventid: eventid }, function (aRes) {
                var aSI = aRes.Datas;
                var rsc=null;
                for(i=0;i<phaseinfo.length;i++){
                 	if(phaseid==phaseinfo[i].ID){
                 	    rsc =aRes.Datas.DA[0].T +phaseinfo[i].PhaseCode +'--------';
                 		//alert(rsc);
                 	}
                 }

                var xmlname = rsc+'_DT_POOL_STANDING';

                var ODFParams = {
                		RSC: rsc,
                		phaseid: phaseid,
                		RSN: rsc + '_DT_POOL_STANDING',

                }
                Ac.acGetODF("Proc_Export_DT_POOL_STANDING", ODFParams, xmlname, function (aRes) {
                    //alert(aRes.Datas);
                    //window.open(me.Datas.ReportUrl + aRes.Datas);
                });
            });
                      
          }
        catch (e) {; }
    },

    
    Get_DT_RESULT1: function () {
        var me = ODF;

        try {

            var matchid = Result.Datas.LoaclDatas.ResultSessionInfo[Result.Datas.cIndex].ID;
            Ac.acGetTable(CommonData.Path.getfullMatchCode, { ID: matchid }, function (aRes) {
                var aSI = aRes.Datas;

                var xmlname = aRes.Datas.DA[0].T + '_DT_RESULT';

                var ODFParams = {
                    matchid: matchid,
                    RSN: aRes.Datas.DA[0].T + '_DT_RESULT',
                    //matchid:1110
                }
                Ac.acGetODF("Proc_Export_DT_RESULT", ODFParams, xmlname, function (aRes) {
                    //alert(aRes.Datas);
                    //window.open(me.Datas.ReportUrl + aRes.Datas);
                });
            });

        }
        catch (e) {; }
    },

    Get_DT_STATS1: function () {
        var me = ODF;

        try {
            var eventid = $('#EventID option:selected').val();
            var ParticipantID = $('#AthleteParticipantID').val();
            var matchid = Result.Datas.LoaclDatas.ResultSessionInfo[Result.Datas.cIndex].ID;
           
            Ac.acGetTable(CommonData.Path.getfullMatchCode, { ID: matchid }, function (aRes) {
                var aSI = aRes.Datas;

                var xmlname = aRes.Datas.DA[0].T + '_DT_STATS';

                var ODFParams = {
                    eventid: eventid,
                    ParticipantID: ParticipantID,
                    RSN:aRes.Datas.DA[0].T + '_DT_STATS',
                }
                Ac.acGetODF("Proc_Export_DT_STATS", ODFParams, xmlname, function (aRes) {
                    //alert(aRes.Datas);
                    //window.open(me.Datas.ReportUrl + aRes.Datas);
                });
            });

        }
        catch (e) {; }
    },
           
    Get_DT_SCHEDULE: function () {
        var me = ODF;

        try {

            var ODFParams = {
                RSC: "FBL-------------------------------",
                RSN: "FBL-------------------------------_DT_SCHEDULE",
                //matchid:1110
            }
            Ac.acGetODF("Proc_Export_DT_SCHEDULE", ODFParams, "FBL-------------------------------_DT_SCHEDULE", function (aRes) {
                //alert(aRes.Datas);
                //window.open(me.Datas.ReportUrl + aRes.Datas);
            });

        }
        catch(e){;}
    },


    Get_DT_SCHEDULE_UPDATE: function () {
        var me = ODF;

        try {

            var ODFParams = {
                RSC: "FBL-------------------------------",
                RSN: "FBL-------------------------------_DT_SCHEDULE_UPDATE",
                //matchid:1110
            }
            Ac.acGetODF("Proc_Export_DT_SCHEDULE_UPDATE", ODFParams, "FBL-------------------------------_DT_SCHEDULE_UPDATE", function (aRes) {
                //alert(aRes.Datas);
                //window.open(me.Datas.ReportUrl + aRes.Datas);
            });

        }
        catch (e) {; }
    },


    Get_DT_PARTIC: function () {
        var me = ODF;

        try {

            var ODFParams = {
                RSC: "FBL-------------------------------",
                RSN: "FBL-------------------------------_DT_PARTIC",
                //matchid:1110
            }
            Ac.acGetODF("Proc_Export_DT_PARTIC", ODFParams, "FBL-------------------------------_DT_PARTIC", function (aRes) {
                //alert(aRes.Datas);
                //window.open(me.Datas.ReportUrl + aRes.Datas);
            });

        }
        catch (e) {; }
    },

    Get_DT_PARTIC_UPDATE: function () {
        var me = ODF;

        try {

            var ODFParams = {
                RSC: "FBL-------------------------------",
                RSN: "FBL-------------------------------_DT_PARTIC_UPDATE",
                //matchid:1110
            }
            Ac.acGetODF("Proc_Export_DT_PARTIC_UPDATE", ODFParams, "FBL-------------------------------_DT_PARTIC_UPDATE", function (aRes) {
                //alert(aRes.Datas);
                //window.open(me.Datas.ReportUrl + aRes.Datas);
            });

        }
        catch (e) {; }
    },

    Get_DT_PARTIC_TEAMS: function () {
        var me = ODF;

        try {

            var ODFParams = {
                RSC: "FBL-------------------------------",
                RSN: "FBL-------------------------------_DT_PARTIC_TEAMS",
                //matchid:1110
            }
            Ac.acGetODF("Proc_Export_DT_PARTIC_TEAMS", ODFParams, "FBL-------------------------------_DT_PARTIC_TEAMS", function (aRes) {
                //alert(aRes.Datas);
                //window.open(me.Datas.ReportUrl + aRes.Datas);
            });

        }
        catch (e) {; }
    },

    Get_DT_PARTIC_TEAMS_UPDATE: function () {
        var me = ODF;

        try {

            var ODFParams = {
               // RSC: "FBL-------------------------------",
                RSC: "FBL-------------------------------_DT_PARTIC_TEAMS",
                RSN: "FBL-------------------------------_DT_PARTIC_TEAMS_UPDATE",
                //matchid:1110
            }
            Ac.acGetODF("Proc_Export_DT_PARTIC_TEAMS_UPDATE", ODFParams, "FBL-------------------------------_DT_PARTIC_TEAMS_UPDATE", function (aRes) {
                //alert(aRes.Datas);
                //window.open(me.Datas.ReportUrl + aRes.Datas);
            });

        }
        catch (e) {; }
    },
    
    
////选择上传奖牌的五个XML
    Get_MedalXMl:function(){
    	var me =ODF;
    	var index=$("#ODF_Medal option:selected").val();
    	//alert(index);
    	if(index==1)
    		me.Get_DT_MEDALLISTS_DISCIPLINE();
    	else if(index==2)
    		me.Get_DT_MEDALLISTS();
    	else if(index==3)
    		me.Get_DT_MEDALS();
    	else if (index==4)
    		me.Get_DT_MEDALLISTS_DAY();
    	else if (index==5)
    		me.Get_DT_RANKING();
    },
    
    //DT_MEDALLISTS_DISCIPLINE协议：Medallists by discipline 大项奖牌获得者
    Get_DT_MEDALLISTS_DISCIPLINE: function () {
        var me = ODF;
        //alert("this is Get_DT_SCHEDULE!!!");
        try {

            var ODFParams = {
                RSC: "FBL-------------------------------",
                RSN: "FBL-------------------------------_DT_MEDALLISTS_DISCIPLINE",
                //matchid:1110
            }
            Ac.acGetODF("Proc_Export_DT_MEDALLISTS_DISCIPLINE", ODFParams, "FBL-------------------------------_DT_MEDALLISTS_DISCIPLINE", function (aRes) {
                //alert(aRes.Datas);
                //window.open(me.Datas.ReportUrl + aRes.Datas);
            });

        }
        catch(e){;}
    },
    
    ///DT_MEDALLISTS :Event's Medallists 小项奖牌获得者
    Get_DT_MEDALLISTS: function () {
        var me = ODF;
        //alert("this is Get_DT_SCHEDULE!!!");
        try {
            var eventid=$('#eventsel option:selected').val();
            var rsc=null;
            var eventinfo=Rank.Datas.LoaclDatas.EventInfo;
           // alert(eventinfo.length);TTEWSINGLES-----------------------
            for(i=0;i<eventinfo.length;i++){
            	if(eventid==eventinfo[i].ID){
            	    rsc = 'FBL' + eventinfo[i].EventGender + eventinfo[i].EventDescription + '------------'
            		//alert(rsc);
            	}
            }
            var xmlname=rsc+'_DT_MEDALLISTS';
           // alert(rsc);
            //alert(xmlname);
            var ODFParams = {
                RSC:rsc,
                eventid: eventid,
                RSN: rsc + '_DT_MEDALLISTS',
                //matchid:1110
            }
            Ac.acGetODF("Proc_Export_DT_MEDALLISTS", ODFParams, xmlname, function (aRes) {
                //alert(aRes.Datas);
                //window.open(me.Datas.ReportUrl + aRes.Datas);
            });

        }
        catch(e){;}
    },
    
    ///DT_MEDALS :Medal standings 奖牌榜
    Get_DT_MEDALS: function () {
        var me = ODF;
        //alert("this is Get_DT_SCHEDULE!!!");
        try {

            var ODFParams = {
                RSC: "FBL-------------------------------",
                RSN: "FBL-------------------------------_DT_MEDALS",
                //matchid:1110
            }
            Ac.acGetODF("Proc_Export_DT_MEDALS", ODFParams, "FBL-------------------------------_DT_MEDALS", function (aRes) {
                //alert(aRes.Datas);
                //window.open(me.Datas.ReportUrl + aRes.Datas);
            });

        }
        catch(e){;}
    },
    
    ///DT_MEDALLISTS_DAY :Medallists of the day 当天奖牌获得者
    Get_DT_MEDALLISTS_DAY: function () {
        var me = ODF;
        //alert("this is Get_DT_SCHEDULE!!!");
        try {

            var ODFParams = {
                RSC: "FBL-------------------------------",
                RSN: "FBL-------------------------------_DT_MEDALLISTS_DAY",
                //matchid:1110
            }
            Ac.acGetODF("Proc_Export_DT_MEDALLISTS_DAY", ODFParams, "FBL-------------------------------_DT_MEDALLISTS_DAY", function (aRes) {
                //alert(aRes.Datas);
                //window.open(me.Datas.ReportUrl + aRes.Datas);
            });

        }
        catch(e){;}
    },
    ///DT_RANKING  :Event Final Ranking 比赛项目最终排名
    Get_DT_RANKING : function () {
    	var me = ODF;
        //alert("this is Get_DT_SCHEDULE!!!");
        try {
            var eventid=$('#eventsel option:selected').val();
            var rsc=null;
            var eventinfo=Rank.Datas.LoaclDatas.EventInfo;
           // alert(eventinfo.length);TTEWSINGLES-----------------------
            for(i=0;i<eventinfo.length;i++){
            	if(eventid==eventinfo[i].ID){
            	    rsc = 'FBL' + eventinfo[i].EventGender + eventinfo[i].EventDescription + '------------'
            		//alert(rsc);
            	}
            }
            var xmlname=rsc+'_DT_RANKING';
//            alert(rsc);
//            alert(xmlname);
            var ODFParams = {
                RSC:rsc,
                eventid: eventid,
                RSN: rsc + '_DT_RANKING',
                //matchid:1110
            }
            Ac.acGetODF("Proc_Export_DT_RANKING", ODFParams, xmlname, function (aRes) {
                //alert(aRes.Datas);
                //window.open(me.Datas.ReportUrl + aRes.Datas);
            });

        }
        catch(e){;}
    }
}
