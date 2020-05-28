


var CommonData = {
    Datas: {
        DataKey: "",
        NewsInfo: [],
        PDFType:null,
        ReportUrl: "http://127.0.0.1/RS/TempPath/",
        LoaclDatas: {
            TeamEntriesInfo: [],
            SubMenus: {
                Index: 0,
                Items: [
                    { ID: "1", Key: "BaseData", Caption: "基础数据", Icon: "", Href: "" },
                    { ID: "2", Key: "Registration", Caption: "报名报项", Icon: "", Href: "" },
                    { ID: "3", Key: "Shedule", Caption: "赛事计划", Icon: "", Href: "" },
                    { ID: "4", Key: "Result", Caption: "成绩上传", Icon: "", Href: "" },
                    { ID: "5", Key: "Rank", Caption: "名次与奖牌", Icon: "", Href: "" }
                ]
            },
            sMenus: {
                Index: 0,
                Items: [
                    { SubID: "1", Caption: "赛事信息", Icon: "", Fun: "BaseData.LoadSport();" },
                    { SubID: "1", Caption: "国家与地区信息", Icon: "", Fun: "BaseData.LoadCR();" },
                    { SubID: "1", Caption: "比赛项目", Icon: "", Fun: "BaseData.LoadEventInfo();" },
                    { SubID: "1", Caption: "场馆信息", Icon: "", Fun: "BaseData.LoadVenue();" },
                    { SubID: "2", Caption: "代表团信息", Icon: "", Fun: "Sign.LoadDelegation(0);" },
                    { SubID: "2", Caption: "运动员信息", Icon: "", Fun: "Sign.LoadAth(0);" },
                    { SubID: "2", Caption: "官员与裁判信息", Icon: "", Fun: "Sign.LoadOfficial(0);" },
                    { SubID: "2", Caption: "报名报项数据", Icon: "", Fun: "Sign.LoadResData();" },
                    { SubID: "3", Caption: "赛事编排", Icon: "", Fun: "Shedule.LoadMatchSch();" },
                    { SubID: "3", Caption: "竞赛计划", Icon: "", Fun: "Shedule.LoadMatchAth();" },
                    { SubID: "3", Caption: "比赛单元", Icon: "", Fun: "" },
                    { SubID: "4", Caption: "赛事成绩(按项目)", Icon: "", Fun: "" },
                    { SubID: "4", Caption: "赛事成绩(按赛段)", Icon: "", Fun: "Result.LoadResultSession();" }

                ]
            }
        }
    },
    Tpls: {
        //tplMenu: { P: "Modules/CommonDatas/tplMenu.htm", C: "" },
        tplNews: { P: "Modules/CommonDatas/News.htm", C: "" }

    },
    Path: {
        getcode: "CommonDatas/getcode.txt",
        getfullMatchCode: "CommonDatas/getfullMatchCode.txt",
        getfullTeamMatchCode: "CommonDatas/getfullTeamMatchCode.txt",
        getSessioncode: "CommonDatas/getSessioncode.txt",


        getNews: "CommonDatas/getNews.txt",
        newNews: "CommonDatas/newNews.txt",
        delNews: "CommonDatas/delNews.txt",
        reNews: "CommonDatas/reNews.txt",
    
    },


    //获取当前时间
    getCurrentTime: function () {
        var str = new Date();
        var date = str.toLocaleDateString();
        var h = str.getHours();
        var m = str.getMinutes();
        var s = str.getSeconds();
        var newtime = date + ' ' + h + ':' + m + ':' + s;
        $('#ReviseTime').val(newtime);
    },


    ///官方公告
    LoadNews: function () {
        var me = CommonData;
        try {
            hhls.GetTpls(me.Tpls, function () {

                //hhls.fillElement("#SJH", me.Tpls.tplNews.C);
                Ac.acGetTable(me.Path.getNews, {}, function (aRes) {
                    var aSI = aRes.Datas;
                    me.Datas.LoaclDatas.NewsInfo = aSI.DA;
                    var aHtml = bt(me.Tpls.tplNews.C, { newsinfo: aSI.DA });
                    hhls.fillElement("#tab-1", aHtml);
                    me.DataTables();
                });
            });

        }
        catch (e) {; }
    },
    ShowPDFVersion:function(PDFType){
        var me = CommonData;
       
        try {

            var aDlg = $("#PDF_Modal");
            aDlg.on('shown.bs.modal', function () {

            }).on('hidden.bs.modal', function () {
               // me.LoadDelegation(me.Datas.Page);
            });
            aDlg.modal('toggle');
            
            me.Datas.PDFType=PDFType;
        }
        catch (E) {; }
    },
    PostPDFVersion: function () {
        var me = CommonData;
        try {
            if (me.Datas.PDFType == "C31T") {
                me.PrintC31T();
            }
            else if (me.Datas.PDFType == "C33") {
                me.PrintC33();
            }
            else if (me.Datas.PDFType == "C38") {
                me.PrintC38();
            }
            else if (me.Datas.PDFType == "C38C") {
                me.PrintC38C();
            }

            else if (me.Datas.PDFType == "C39") {
                me.PrintC39();
            }
            else if (me.Datas.PDFType == "C08") {
                me.PrintC08();
            }
            else if (me.Datas.PDFType == "C58") {
                me.PrintC58();
            }
            else if (me.Datas.PDFType == "C73") {
                me.PrintC73();
            }
            else if (me.Datas.PDFType == "C76") {
                me.PrintC76();
            }

            else if (me.Datas.PDFType == "C84A") {
                me.PrintC84A();
            }

            else if (me.Datas.PDFType == "C84B") {
                me.PrintC84B();
            }

            else if (me.Datas.PDFType == "C85A") {
                me.PrintC85A();
            }
            else if (me.Datas.PDFType == "C89") {
                me.PrintC89();
            }
            else if (me.Datas.PDFType == "C92C") {
                me.PrintC92C();
            }

            else if (me.Datas.PDFType == "C93") {
                me.PrintC93();
            }
            else if (me.Datas.PDFType == "C95") {
                me.PrintC95();
            }


        } catch (e) {; }
    },
           	
    // 新增官方公告
    newNews: function () {
        var me = CommonData;
        try {
            var box = document.getElementsByName("checkbox");
            var objArray = box.length;
            var newsType ='';

            for (var i = 0; i < objArray; i++) {
                if (box[i].checked == true) {
                    newsType += box[i].value;
                }
            }
           
            var newsinfo = {
                newstitle: $('#Newstitle').val(),
                newssubtitle: $('#Newssubtitle').val(),
                newssummary: $('#Newsummary').val(),
                newstime: $('#Newstime').val(),
                newsPublisher: $('#NewsPublisher').val(),
                newsstatus: newsType,
                newsinfo: $('#Newsinfo').val(),
                newsEvent:$("#EventSelect option:selected").val()
            };
            var aPath = me.Path.newNews;
            Ac.acExecuteSql(aPath, newsinfo, function (aRes) {
                if (aRes.State == 1) {
                    //$("#myModal").modal('toggle');
                    me.LoadNews();
                }
                else {
                    alert("提交失败！");
                }
            });
        } catch (e) {; }
    },
    //
    shownews: function (index) {
        var me = CommonData;
        var aItem = me.Datas.LoaclDatas.NewsInfo[index];
        //alert(aItem.NewsTime);
        $('#reNewsid').val(aItem.ID);
        $('#reNewstitle').val(aItem.NewsTitle);
        $('#reNewssubtitle').val(aItem.NewsSubTitle);
        $('#reNewsummary').val(aItem.NewsSummary),
		$('#reNewstime').val(aItem.NewsTime);
        $('#reNewsPublisher').val(aItem.NewsPublisher);
        $('#reNewsstatus').val(aItem.Status);
        $('#reNewsinfo').val(aItem.NewsDetails);
        $('#reEventSelect').val(aItem.EventGender);
    },
    //删除官方公告
    Delnews: function (id) {
        var me = CommonData;
        try {
            var aPath = me.Path.delNews;
            var aFlag = window.confirm("是否确定删除该公告信息？");
            if (aFlag) {
                Ac.acExecuteSql(aPath, { ID: id + '' }, function (aRes) {
                    if (aRes.State == 1) {
                        //$("#myModal").modal('toggle');
                        me.LoadNews();
                    }
                    else {
                        alert("提交失败！");
                    }
                });
            }
        } catch (e) {; }
    },
    //修改官方公告
    reNews: function () {
        var me = CommonData;
        try {
            var box = document.getElementsByName("recheckbox");
            var objArray = box.length;
            var newsType = '';

            for (var i = 0; i < objArray; i++) {
                if (box[i].checked == true) {
                    
                    newsType += box[i].value;
                }
            }
          
    
            var newsinfo = {
                newsid: $('#reNewsid').val(),
                newstitle: $('#reNewstitle').val(),
                newssummary: $('#reNewsummary').val(),
                newssubtitle: $('#reNewssubtitle').val(),
                newstime: $('#reNewstime').val(),
                newsPublisher: $('#reNewsPublisher').val(),
                newsstatus: newsType,
                newsinfo: $('#reNewsinfo').val(),
                newsEvent: $("#reEventSelect option:selected").val()
            };
            var aPath = me.Path.reNews;
            Ac.acExecuteSql(aPath, newsinfo, function (aRes) {
                if (aRes.State == 1) {
                    //$("#myModal").modal('toggle');
                    me.LoadNews();
                }
                else {
                    alert("提交失败！");
                }
            });
        } catch (e) {; }
    },
    //录入详情
    Detail: function (index) {
        var me = CommonData;
        var aItem = me.Datas.LoaclDatas.NewsInfo[index];

        $("#text-newsdetail").val(aItem.NewsDetails);
    },
    //获取当前时间
    getnowtime: function () {
        var str = new Date();
        var date = str.toLocaleDateString();
        var h = str.getHours();
        var m = str.getMinutes();
        var s = str.getSeconds();
        var newtime = date + ' ' + h + ':' + m + ':' + s;
        $('#Newstime').val(newtime);
    },


    LoadMenuItem: function () {
        var me = CommonData;
        try {
            hhls.GetTpls(me.Tpls, function () {

                var aHtml = bt(me.Tpls.tplMenu.C, { tplData: me.Datas.LoaclDatas.SubMenus.Items, tplData1: me.Datas.LoaclDatas.sMenus.Items });
                hhls.fillElement("#menu", aHtml);
                $('#side-menu').metisMenu();

            });

        }
        catch (e) {; }
    },
    ImportXml: function () {
        var me = CommonData;
        try {

            Ac.acImportLocalODF("FBL-------------------------------_DT_PARTIC", function (aRes) {
                alert(aRes.Datas);
                Sign.LoadAth();
               
            });
        }
        catch (E) {; }
    },

    ImportTeamXml: function () {
        var me = CommonData;
        try {

            Ac.acImportLocalODF("FBL-------------------------------_DT_PARTIC_TEAMS", function (aRes) {
                alert(aRes.Datas);
                Sign.LoadResEvent();

            });
        }
        catch (E) {; }
    },
    LoadDatePick: function () {
        try {
            $('#OpenDate,#CloseDate').datepicker({
                todayBtn: "linked",
                keyboardNavigation: false,
                forceParse: false,
                calendarWeeks: true,
                autoclose: true
            });

            $('#BeginTime,#EndTime').datepicker({
                todayBtn: "linked",
                keyboardNavigation: false,
                forceParse: false,
                calendarWeeks: true,
                autoclose: true
            });
        }
        catch (e) {; }
    },
    //打印报表C08
    PrintC08: function () {
        var me = CommonData;
       
        var ReportSqls = {
            GameInfo: "FB/get_C08_match",
            Results: "FB/C08_getCompetition"
        }
        var ReportParams = {
            //CRName: me.Datas.LoaclDatas.TeamEntriesInfo.CRName,
        }
        Ac.acGetTable(me.Path.getcode, { eventid: $("#EventID option:selected").val() }, function (aRes) {
            var aSI = aRes.Datas;

            var PDFName = aRes.Datas.DA[0].T + "------------_C08 ";
            Ac.acGetReport("FB/C08", ReportSqls, { EventID: $("#EventID option:selected").val()}, PDFName, function (aRes) {
            //var a = aRes.Datas;
            //me.Datas.LoaclDatas.TeamEntriesInfo = a.DA;
                if (aRes.State == 1) {

                window.open(me.Datas.ReportUrl + aRes.Datas);
            }
        });
        })
    },
    //打印报表C31T
    PrintC31T: function () {
        var me = CommonData;

        var ReportSqls = {
            GameInfo: "FB/get_C31T_match",
            Results: "FB/getTeamEntries",
            CR: "FB/C31T_getCR",
            Coach:"FB/C31T_getCoach",
        }
        var ReportParams = {
            //CRName: me.Datas.LoaclDatas.TeamEntriesInfo.CRName,
        }
        Ac.acGetTable(me.Path.getcode, { eventid: $("#ResEventID option:selected").val() }, function (aRes) {
            var aSI = aRes.Datas;

            var PDFName = aRes.Datas.DA[0].T + "------------_C31T ";
            Ac.acGetReport("FB/C31T", ReportSqls, { EventID: $("#ResEventID option:selected").val()}, PDFName, function (aRes) {
            //var a = aRes.Datas;
            //me.Datas.LoaclDatas.TeamEntriesInfo = a.DA;
                if (aRes.State == 1) {

                window.open(me.Datas.ReportUrl + aRes.Datas);
            }
        });
        })
        
    },
    //打印报表C33
    PrintC33: function () {
        var me = CommonData;

        var ReportSqls = {
            GameInfo: "FB/get_C33_match",
            Results: "FB/getTeamEntries",
            CR: "FB/C31T_getCR",
            Coach: "FB/C31T_getCoach",
            Color: "FB/C33_getColor",
            Official: "FB/C33_getOfficer"
        }
        var ReportParams = {
            //CRName: me.Datas.LoaclDatas.TeamEntriesInfo.CRName,
        }
        Ac.acGetTable(me.Path.getcode, { eventid: $("#ResEventID option:selected").val() }, function (aRes) {
            var aSI = aRes.Datas;

            var PDFName = aRes.Datas.DA[0].T + "------------_C33 ";
            Ac.acGetReport("FB/C33", ReportSqls, { EventID: $("#ResEventID option:selected").val() }, PDFName, function (aRes) {
                //var a = aRes.Datas;
                //me.Datas.LoaclDatas.TeamEntriesInfo = a.DA;
                if (aRes.State == 1) {
                    window.open(me.Datas.ReportUrl + aRes.Datas);
                }
            });
        });
    },
    //打印报表C38
    PrintC38: function () {
        var me = CommonData;

        var ReportSqls = {
            GameInfo: "FB/get_C38_match",
            Result: "FB/C38_getDataCheckList",
            //Result: "FB/getTeamEntries",
            
            CR: "FB/C31T_getCR",
            CoachInfo: "FB/C38_getCoach",
        }
        var ReportParams = {
            //CRName: me.Datas.LoaclDatas.TeamEntriesInfo.CRName,
        }
        Ac.acGetTable(me.Path.getcode, { eventid: $("#ResEventID option:selected").val() }, function (aRes) {
            var aSI = aRes.Datas;

            var PDFName = aRes.Datas.DA[0].T + "------------_C38 ";
            Ac.acGetReport("FB/C38", ReportSqls, { EventID: $("#ResEventID option:selected").val(), }, PDFName, function (aRes) {
                //var a = aRes.Datas;
                //me.Datas.LoaclDatas.TeamEntriesInfo = a.DA;
                if (aRes.State == 1) {
                    window.open(me.Datas.ReportUrl + aRes.Datas);
                }
            });
        });
    },
    //打印报表C38C
    PrintC38C: function () {
        var me = CommonData;

        var ReportSqls = {
            GameInfo: "FB/get_C38C_match",
            Results: "FB/C38C_getParticipant",
        }
        var ReportParams = {
            
        }
        Ac.acGetTable(me.Path.getcode, { eventid: $("#ResEventID option:selected").val() }, function (aRes) {
            var aSI = aRes.Datas;

            var PDFName = aRes.Datas.DA[0].T + "------------_C38C ";
            Ac.acGetReport("FB/C38C", ReportSqls, { EventID: $("#ResEventID option:selected").val(), }, PDFName, function (aRes) {
             
            if (aRes.State == 1) {
                window.open(me.Datas.ReportUrl + aRes.Datas);
            }
        });
        });
    },
    //打印报表C39
    PrintC39: function () {
        var me = CommonData;

        var ReportSqls = {
            GameInfo: "FB/get_C39_match",
            Judge: "FB/C39_getJudge",
            Official: "FB/C39_getOfficial",
        }
        var ReportParams = {

        }
        Ac.acGetReport("FB/C39", ReportSqls, { }, "FBL-------------------------------_C39_", function (aRes) {

            if (aRes.State == 1) {
                window.open(me.Datas.ReportUrl + aRes.Datas);
            }
        });
    },
    //打印报表C51
    PrintC51: function () {
        var me = CommonData;

        var ReportSqls = {
            GameInfo: "FB/get_C51_match",
            Official: "FB/C51_getOfficial",
            MatchTime: "FB/getMatchTime",
            AShirts: "FB/C51_getAShirts",
            A_Athlete: "FB/C51_getA_Athlete",
            A_AthleteS: "FB/C51_getA_AthleteS",
            BShirts: "FB/C51_getBShirts",
            B_Athlete: "FB/C51_getB_Athlete",
            B_AthleteS: "FB/C51_getB_AthleteS",
            MatchName: "FB/C73_MatchScore",

        }
        var ReportParams = {
            MatchID: Result.Datas.LoaclDatas.ResultSessionInfo[Result.Datas.dIndex].ID,
            PhaseID: $("#PhaseID option:selected").val()
        }
        Ac.acGetTable(me.Path.getfullMatchCode, { ID: Result.Datas.LoaclDatas.ResultSessionInfo[Result.Datas.dIndex].ID}, function (aRes) {
            var aSI = aRes.Datas;
            var PDFName= aRes.Datas.DA[0].T+"_C51_";
            Ac.acGetReport("FB/C51", ReportSqls, ReportParams, PDFName, function (aRes) {

                if (aRes.State == 1) {
                    window.open(me.Datas.ReportUrl + aRes.Datas);
                }
            });
        })
        
    },
    //打印报表C58
    PrintC58: function () {
        var me = CommonData;

        var ReportSqls = {
            GameInfo: "FB/get_C58_match",
            Results: "FB/C58_getDailySchedule",
        }
        var ReportParams = {

        }

        Ac.acGetReport("FB/C58", ReportSqls, {}, "FBL-------------------------------_C58 ", function (aRes) {

            if (aRes.State == 1) {
                window.open(me.Datas.ReportUrl + aRes.Datas);
            }
        });
    },
    //打印报表C67
    PrintC67: function () {
        var me = CommonData;
        var newsid;
        var ID;
        var obj = document.getElementsByName("newsradio");
        for(var i=0; i<obj.length; i ++){
            if(obj[i].checked){
                newsid = obj[i].value;
                ID = i;
            }
        }
        //alert(newsid);
        try {
            var ReportSqls = {
                Results: "FB/C67",
                GameInfo: "FB/get_C67_match"
            }
          
           
            var PDFName="FBL-------------------------------_C67 ";
            Ac.acGetReport("FB/C67", ReportSqls, { NewsID: newsid, newsEvent: me.Datas.LoaclDatas.NewsInfo[ID].EventGender }, PDFName, function (aRes) {
                //alert(aRes.Datas);
                if (aRes.State == 1) {
                    window.open(me.Datas.ReportUrl + aRes.Datas);
                }

            });
        }catch (E) {; }
        },
    //打印报表C73
    PrintC73: function () {
        var me = CommonData;

        var ReportSqls = {
            MatchScore:"FB/C73_MatchScore",
            MatchTime:"FB/getMatchTime",
            GameInfo: "FB/get_C73A_match",
            MatchInfo: "FB/C73A_getMatchInfo",
            Penalty: "FB/C73_getPenaltyA",
            PenaltyB: "FB/C73_getPenaltyB",
            OfficialInfo: "FB/C73A_getOfficial",
            Delegation: "FB/C73A_getDelegation",
            Athlete: "FB/C73A_getAthlete",
            GoalScore: "FB/C73A_GoalScore",
            Cautions: "FB/C73A_Cautions",
            Explusions: "FB/C73A_Explusions",
            CoachInfo: "FB/C73_getCoach",
            AdditionalTime: "FB/C73A_AdditionalTime",
            Results: "FB/C73B_getMatchInfo",
            BTech: "FB/C73B_getMatchInfoB",
            PA: "FB/C73B_getPA",
            PB: "FB/C73B_getPB",
            PAS: "FB/C73B_getPAS",
            PBS: "FB/C73B_getPBS"

        }
        var ReportParams = {
            MatchID: Result.Datas.LoaclDatas.ResultSessionInfo[Result.Datas.cIndex].ID,
            PhaseID: $("#PhaseID option:selected").val(),
            ParticipantAID: Result.Datas.LoaclDatas.ResultSessionInfo[Result.Datas.cIndex].ParticipantAID,
            ParticipantBID: Result.Datas.LoaclDatas.ResultSessionInfo[Result.Datas.cIndex].ParticipantBID,
            //ParticipantID: $("#AthleteParticipantID option:selected").val(),
        }
        Ac.acGetTable(me.Path.getfullMatchCode, { ID: Result.Datas.LoaclDatas.ResultSessionInfo[Result.Datas.cIndex].ID }, function (aRes) {
            var aSI = aRes.Datas;
            var PDFName = aRes.Datas.DA[0].T + "_C73 ";
            Ac.acGetReport("FB/C73", ReportSqls, ReportParams, PDFName, function (aRes) {

                if (aRes.State == 1) {
                    window.open(me.Datas.ReportUrl + aRes.Datas);
                }
            });
        });
    },
   
    //打印报表C76
    PrintC76: function () {
        var me = CommonData;

        var ReportSqls = {
            GameInfo: "FB/get_C76_match",
            GP: "FB/C76_getGroupP",
            Score: "FB/C76_getScore",
            GroupTech: "FB/C76_getGrouptech",
            GPB: "FB/C76_getGroupPB",
            ScoreB: "FB/C76_getScoreB",
            GroupTechB: "FB/C76_getGrouptechB",
            Medal:"FB/C76_getMedalNameByEvent",
            GPC: "FB/C76_getGroupPC",
            ScoreC: "FB/C76_getScoreC",
            GroupTechC: "FB/C76_getGrouptechC",
            //Medal: "FB/C76_getMedalNameByEvent"
        }
        var ReportParams = {
            EventID:$("#EventID option:selected").val(),
        }

        Ac.acGetTable(me.Path.getcode, { eventid: $("#EventID option:selected").val() }, function (aRes) {
            var aSI = aRes.Datas;
            var EventID = $("#EventID option:selected").val();
            var PDFName = aRes.Datas.DA[0].T + "------------_C76 ";
            if (EventID == "1") {
                Ac.acGetReport("FB/C76W", ReportSqls, ReportParams, PDFName, function (aRes) {

                    if (aRes.State == 1) {
                        window.open(me.Datas.ReportUrl + aRes.Datas);
                    }
                });
            } else if (EventID == "16") {
                Ac.acGetReport("FB/C76M", ReportSqls, ReportParams, PDFName, function (aRes) {

                    if (aRes.State == 1) {
                        window.open(me.Datas.ReportUrl + aRes.Datas);
                    }
                });
            }
           
        });
    },
    //打印报表C85A
    PrintC85A: function () {
        var me = CommonData;

        var ReportSqls = {
            GameInfo: "FB/get_C85A_match",
            Results: "FB/C85A_getGoalScores",
            ShotOnGoals: "FB/C85A_getShotOnGoals",
            Shots: "FB/C85A_getShot",
        }
        var ReportParams = {
            EventID: $("#EventID option:selected").val()

        }
        Ac.acGetTable(me.Path.getcode, { eventid: $("#EventID option:selected").val() }, function (aRes) {
            var aSI = aRes.Datas;

            
            var PDFName = aRes.Datas.DA[0].T + "------------_C85A "
            Ac.acGetReport("FB/C85A", ReportSqls, ReportParams, PDFName, function (aRes) {

                if (aRes.State == 1) {
                    window.open(me.Datas.ReportUrl + aRes.Datas);
                }
            });
        });
    },
    //打印报表C84A
    PrintC84A: function () {
        var me = CommonData;

        var ReportSqls = {
            GameInfo: "FB/get_C84A_match",
            Results: "FB/C84A_getTechStatistic",
            CR: "FB/C84A_getCR",
        }
        var ReportParams = {
            ParticipantID: $("#AthleteParticipantID option:selected").val(),
            PhaseID: $("#PhaseID option:selected").val(),

        }



        Ac.acGetTable(me.Path.getcode, { eventid: $("#EventID option:selected").val() }, function (aRes) {
            var aSI = aRes.Datas;

            //var PDFName = aRes.Datas.DA[0].T + $("#AthleteParticipantID option:selected").text().split("--")[0] + "---------_C84A_"
            var PDFName = aRes.Datas.DA[0].T  + "------------_C84A "
            Ac.acGetReport("FB/C84A", ReportSqls, ReportParams, PDFName, function (aRes) {

                if (aRes.State == 1) {
                    window.open(me.Datas.ReportUrl + aRes.Datas);
                }
            });
        });
    },
    //打印报表C84B
    PrintC84B: function () {
        var me = CommonData;

        var ReportSqls = {
            GameInfo: "FB/get_C84B_match",
            Results: "FB/C84B_getTech",
            MatchPlayed:"FB/C84B_MatchPlayed",
        }
        var ReportParams = {
            EventID: $("#EventID option:selected").val()
        }


        Ac.acGetTable(me.Path.getcode, { eventid: $("#EventID option:selected").val() }, function (aRes) {
            var aSI = aRes.Datas;

            var PDFName = aRes.Datas.DA[0].T +"------------_C84B ";
            Ac.acGetReport("FB/C84B", ReportSqls, ReportParams, PDFName, function (aRes) {

                if (aRes.State == 1) {
                    window.open(me.Datas.ReportUrl + aRes.Datas);
                }
            });
        });
    },
    //打印报表C89
    PrintC89: function () {
        var me = CommonData;

        var ReportSqls = {
            GameInfo: "FB/get_C89_match",
            Results: "FB/C89_getDisciplinaryMatters",

        }
        var ReportParams = {

        }
        Ac.acGetTable(me.Path.getcode, { eventid: $("#EventID option:selected").val() }, function (aRes) {
            var aSI = aRes.Datas;

            var PDFName = aRes.Datas.DA[0].T + "------------_C89 ";
            Ac.acGetReport("FB/C89", ReportSqls, { EventID: $("#EventID option:selected").val() }, PDFName, function (aRes) {

                if (aRes.State == 1) {
                    window.open(me.Datas.ReportUrl + aRes.Datas);
                }
            });
        });
    },
    //打印报表C95
    PrintC95: function () {
        var me = CommonData;
        try {

            var ReportSqls = {
                GameInfo: "FB/get_C95_match",
                Result: "FB/C95_getRank"
                //Athlete: "Athlete"
            }
            Ac.acGetReport("FB/C95", ReportSqls, {}, "FBL-------------------------------_C95 ", function (aRes) {

                if (aRes.State == 1) {
                    window.open(me.Datas.ReportUrl + aRes.Datas);
                }
            });
        }
        catch (E) {; }
    },
    //打印报表C93 
    PrintC93: function () {
        var me = CommonData;
        try {

            var ReportSqls = {
                GameInfo: "FB/get_C93_match",
                Result: "FB/C93_getEventRank",
                //Athlete: "Athlete"
            }
            Ac.acGetReport("FB/C93", ReportSqls, {}, "FBL-------------------------------_C93 ", function (aRes) {

                if (aRes.State == 1) {
                    window.open(me.Datas.ReportUrl + aRes.Datas);
                }
            });
        }
        catch (E) {; }
    },
    //打印报表C92C 
    PrintC92C: function () {
        var me = CommonData;
        try {

            var ReportSqls = {
                GameInfo: "FB/get_C92C_match",
                Results: "FB/C92C_getTeamRank"
                //Athlete: "Athlete"
            }
            var EventID = $('#eventsel option:selected').val();

            Ac.acGetTable(me.Path.getcode, { eventid: $("#eventsel option:selected").val() }, function (aRes) {
                var aSI = aRes.Datas;

                var PDFName = aRes.Datas.DA[0].T + "------------_C92C ";
                Ac.acGetReport("FB/C92C", ReportSqls, { EventID: EventID }, PDFName, function (aRes) {
                    //alert(aRes.Datas);
                    if (aRes.State == 1) {
                        window.open(me.Datas.ReportUrl + aRes.Datas);
                    }

                });
            });
        }
        catch (E) {; }
    },
    GetSelectItems: function (aDatas, aKey, aCaption) {
        var me = CommonData;
        var aHtml = "";
        try {
            $.each(aDatas, function (aInd, aItem) {
                aHtml += "<option value='" + aItem[aKey] + "'>" + aItem[aCaption] + "</option>";
            });
        }
        catch (e) {; }
        return aHtml;
    },
    OnPickMenuItem: function (aIndex) {
        var me = CommonData;
        try {
            //me.GetLocalData();
            me.Datas.LoaclDatas.Menus.Index = aIndex;
            //me.SetLocalData();
            var aItems = $(".MenusBody ul li");
            aItems.removeClass("active");
            $(aItems[aIndex]).addClass("active");
            var aModule = me.Datas.LoaclDatas.Menus.Items[aIndex].Key;
            var aFun = aModule + ".Load()";
            eval(aFun);

        }
        catch (e) {; }
    },
    GetLocalData: function () {
        var me = CommonData;
        try {
            var aData = hhls.loadLocalObj(me.Datas.DataKey);
            if (aData != null) {
                me.Datas.LoaclDatas = aData;
            }
        }
        catch (e) {; }
    },
    SetLocalData: function () {
        var me = CommonData;
        try {
            hhls.saveLocalObj(me.Datas.DataKey, me.Datas.LoaclDatas);
        }
        catch (e) {; }
    },
    Exit: function () {
        var me = CommonData;
        try {
            hhls.goUrl("mLogin.htm");
        }
        catch (e) {; }
    },
    //获取当前时间，格式YYYY-MM-DD
	GetNowFormatDate:function() {
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
	},
    //获取当前时间，格式YYYY-MM-DD
	GetNowFormatTime: function () {
	    var date = new Date();

	    var hours = date.getHours();
	    var minutes = date.getMinutes();
	    var seconds = date.getSeconds();

	    if (hours >= 1 && hours <= 9) {
	        hours = "0" + hours;
	    }

	    if (minutes >= 1 && minutes <= 9) {
	        minutes = "0" + minutes;
	    }

	    if (seconds >= 1 && seconds <= 9) {
	        seconds = "0" + seconds;
	    }

	    var currenttime = hours +':'+ minutes + ':'+seconds;
	    return currenttime;
	},

    //加载表单
    DataTables: function () {
        var me = CommonData;
        $('.dataTables-example').DataTable({
            pageLength: 10,
            responsive: true,
            buttons: [
                {
                    customize: function (win) {
                        $(win.document.body).addClass('white-bg');
                        $(win.document.body).css('font-size', '10px');
                        $(win.document.body).find('table')
                                .addClass('compact')
                                .css('font-size', 'inherit');
                    }
                }
            ]
        });
    },
    DataTables: function (Index) {
        var me = BaseData;
        $('.dataTables-example').DataTable({
            pageLength: 10,
            responsive: true,
            dom: '<"html5buttons"B>lTfgitp',
            buttons: [

                { extend: 'excel', title: 'ExampleFile' },
                {
                    extend: 'print',
                    customize: function (win) {
                        $(win.document.body).addClass('white-bg');
                        $(win.document.body).css('font-size', '10px');
                        $(win.document.body).find('table')
                                .addClass('compact')
                                .css('font-size', 'inherit');
                    }
                }
            ]
        });
        var oTable = $(".dataTables-example").dataTable(); //table1为表格的id
        oTable.fnPageChange(Index);//加载跳转
    },
    GetDataTablesNum: function () {
        try {
            var oTable = $(".dataTables-example").dataTable(); //table1为表格的id
            var tableSetings = oTable.fnSettings();
            var paging_length = tableSetings._iDisplayLength;//当前每页显示多少  
            var page_start = tableSetings._iDisplayStart;//当前页开始  
            var page = (page_start / paging_length); //得到页数值  比页码小1
            //oTable.fnPageChange(page);//加载跳转
        }
        catch (e) {; }
        return page;
    }

}