

var Result={
    Datas: {
        DataKey: "",
        Index: null,
        aIndex: null,
        bIndex: null,
        cIndex: null,
        dIndex: null,
        eIndex: null,
        fIndex: null,
        gIndex: null,
        hIndex: null,
        order:null,
        CurIndex: null,
        PsCount:0,
        LoaclDatas: {
            ResultSessionInfo: [],
            PhaseInfo: [],
            TeamStatisticInfo: [],
            PlayerStatisticInfo: [],
            ParticipantMemberInfo: [],
            TechInfo: [],
            TechStatisticInfo: [],      
            OfficialInfo: [],               //官员信息
            JudgeInfo: [],
            EventInfo: [],
            GroupInfo: [],
            ColorInfo: [],
            ParticipantInfo: [],
            MatchAthleteInfo:[],
            SelectedOfficialInfo:[],
            Menus: {
                Index: 0,
                Items: [
                    { Key: "" },
                ]
            }
        }
    },
    Tpls: {
    	
        tplMatchAthlete: { P: "Modules/Result/tplMatchAthlete.htm", C: "" },
        tplResultSession: { P: "Modules/Result/tplResultSession.htm", C: "" },
        tplPhaseOption: { P: "Modules/Result/tplPhaseOption.htm", C: "" },
        tplEventOption: { P: "Modules/Result/tplEventOption.htm", C: "" },
        tplResultTop: { P: "Modules/Result/tplResultTop.htm", C: "" },
        tplEntryScore: { P: "Modules/Result/tplEntryScore.htm", C: "" },
        tplTeamStatistic: { P: "Modules/Result/tplTeamStatistic.htm", C: "" },
        tplTeamTable: { P: "Modules/Result/tplTeamTable.htm", C: "" },
        tplCheckPlayer: { P: "Modules/Result/tplCheckPlayer.htm", C: "" },
        tplParticipantOption: { P: "Modules/Result/tplParticipantOption.htm", C: "" },
        tplTechStatistic: { P: "Modules/Result/tplTechStatistic.htm", C: "" },
        tplParticipantMemberOption: { P: "Modules/Result/tplParticipantMemberOption.htm", C: "" },
        tplAthleteParticipantOption: { P: "Modules/Result/tplAthleteParticipantOption.htm", C: "" },
        tplTechOption: { P: "Modules/Result/tplTechOption.htm", C: "" },
        tplAthleteTechOption: { P: "Modules/Result/tplAthleteTechOption.htm", C: "" },
        tplOfficialOption: { P: "Modules/Result/tplOfficialOption.htm", C: "" },//官员下拉框网页
        tplGroupSelect: { P: "Modules/Result/tplGroupSelect.htm", C: "" },//参赛小组下拉框网页
        tplColorSelect: { P: "Modules/Result/tplColorSelect.htm", C: "" },//颜色下拉框
        tplCoachOption: { P: "Modules/Result/tplCoachOption.htm", C: "" },

    },
    Path: {
        getMatchAthlete: "Result/getMatchAthlete.txt",
        getParticipantMember: "Result/getParticipantMember.txt",
        addMatchAthlete: "Result/addMatchAthlete.txt",
        editResultSession: "Result/editResultSession.txt",
        getResultSession: "Result/getResultSession.txt",
        getPhase: "Result/getPhase.txt",
        getEvent: "Result/getEvent.txt",


        delScoreInfo: "Result/delScoreInfo.txt",
        getTeamStatistic: "Result/getTeamStatistic.txt",
        getGroup: "Result/getGroup.txt",
        editTeamTable: "Result/editTeamTable.txt",

        getPlayerStatistic: "Result/getPlayerStatistic.txt",
        ResultStatusOfficial: "Result/ResultStatusOfficial.txt",
        ResultStatusUnOfficial: "Result/ResultStatusUnOfficial.txt",

        MatchDelayedStatus: "Result/MatchDelayedStatus.txt",
        MatchScheduleStatus: "Result/MatchScheduleStatus.txt",
        MatchStartStatus: "Result/MatchStartStatus.txt",
        MatchBreakStatus: "Result/MatchBreakStatus.txt",
        MatchFinishedStatus: "Result/MatchFinishedStatus.txt",
        


        PlayerElected: "Result/PlayerElected.txt",
        PlayerSubstitute: "Result/PlayerSubstitute.txt",

        delAth: "Result/delAth.txt",
        editAth: "Result/editAth.txt",
        editAthMF: "Result/editAthMF.txt",
        editAthDF: "Result/editAthDF.txt",
        editAthFP: "Result/editAthFP.txt",
        editAthGK: "Result/editAthGK.txt",
        editAthCP: "Result/editAthCP.txt",


        editAthTech: "Result/editAthTech.txt",
        getTech: "Result/getTech.txt",
        newTech: "Result/newTech.txt",
        getTechStatistic: "Result/getTechStatistic.txt",
        delSingleTech: "Result/delSingleTech.txt",//删除单项技术统计


        StartNext: "Result/StartNext.txt",
        EndNext: "Result/EndNext.txt",
        getScore: "Result/getScore.txt",
        getSectionOrder: "Result/getSectionOrder.txt",
        getParticipant: "Result/getParticipant.txt",
        getSelectedOfficial: "Result/getSelectedOfficial.txt",

        getOfficial: "Result/getOfficial.txt",
        getColor: "Result/getColor.txt",

        newOfficial: "Result/newOfficial.txt",
        newColor: "Result/newColor.txt",
        getJudge: "Result/getJudge.txt",
        getCoach: "Result/getCoach.txt",
        newCoach: "Result/newCoach.txt",

        postInjuryT: "Result/postInjuryT.txt",
        postSuspendT: "Result/postSuspendT.txt",
        postControlT: "Result/postControlT.txt"

    },

    //加载比赛项目下拉框
    LoadEventOption: function () {
        var me = Result;
        try {
            hhls.GetTpls(me.Tpls, function () {
                hhls.fillElement("#tab-1", me.Tpls.tplResultTop.C);
                Ac.acGetTable(me.Path.getEvent, {}, function (aRes) {
                    var aSI = aRes.Datas;
                    me.Datas.LoaclDatas.EventInfo = aSI.DA;
                    var aHtml = bt(me.Tpls.tplEventOption.C, { tplData: aSI.DA });
                    hhls.fillElement("#EventSelect", aHtml);
                    //加载下拉框选择插件
                    // $('.chosen-select').chosen({ width: "100%" });
                    me.LoadPhaseOption();
                });
            });


        }
        catch (e) {; }
    },
    
    //加载比赛阶段下拉框
    LoadPhaseOption:function(){
        var me = Result;
        //alert($("#EventID option:selected").val());
        try {
               
                Ac.acGetTable(me.Path.getPhase, { EventID: $("#EventID option:selected").val() }, function (aRes) {
                    var aSI = aRes.Datas;
                    me.Datas.LoaclDatas.PhaseInfo = aSI.DA;
                    var aHtml = bt(me.Tpls.tplPhaseOption.C, { tplData: aSI.DA });
                    hhls.fillElement("#PhaseSelect", aHtml);
                    //加载下拉框选择插件
                    // $('.chosen-select').chosen({ width: "100%" });
                    me.LoadResultSession();
                });
            
        
        }
        catch (e) {; }
    },
   
    //加载运动员信息检录
    LoadCheckPlayer: function (Index) {
        var me = Result;
        me.Datas.dIndex = Index;
        //me.ShowCheckPlayer();
        $("#ResultEdit").hide();
        $('#CheckPlayer').show();
        try {

              
                var aHtml = bt(me.Tpls.tplParticipantOption.C, { tplData: me.Datas.LoaclDatas.ResultSessionInfo[Index] });
                hhls.fillElement("#ParticipantSelect", aHtml);
                    //加载下拉框选择插件
                    // $('.chosen-select').chosen({ width: "100%" });
                me.LoadPlayerStatistic();
                me.LoadJudge();
               // me.LoadOfficial();
                //me.LoadSelectedOfficial();
                me.LoadColor();
                me.LoadCoach();

            
        }
        catch (e) {; }
    },
    //添加比赛运动员信息
    AddMatchAthlete: function () {
        
        var me = Result;
        try {
            me.Datas.PsCount = me.Datas.PsCount + 1;
            hhls.GetTpls(me.Tpls, function () {
                Ac.acGetTable(me.Path.getParticipantMember, { ParticipantID: $("#ParticipantID option:selected").val(), MatchID: me.Datas.LoaclDatas.ResultSessionInfo[me.Datas.dIndex].ID }, function (aRes) {
                    var aSI = aRes.Datas;
                    me.Datas.LoaclDatas.ParticipantMemberInfo = aSI.DA;
                    var aHtml = bt(me.Tpls.tplMatchAthlete.C, { tplData: aSI.DA });
                    hhls.fillElement("#modal_body", aHtml);
                    $('#Athlete').on('dblclick', 'td', function () {
                        //console.info($(this).text());
                        var oldVal = $(this).text();
                        var idx = $(this).closest('tr').index();
                        //alert(idx);
                        var input = "<input type='text' id='AthleteId' value='" + oldVal + "' >";
                        $(this).text('');
                        $(this).append(input);
                        $('#AthleteId').focus();
                        $('#AthleteId').blur(function () {
                            if ($(this).val() != '') {
                                oldVal = $(this).val();
                            }
                            //closest：是从当前元素开始，沿Dom树向上遍历直到找到已应用选择器的一个匹配为止。
                            $(this).closest('td').text(oldVal);

                            Ac.acExecuteSql("Result/AddAthleteNO.txt", { AthleteID: me.Datas.LoaclDatas.ParticipantMemberInfo[idx].AthleteID + '', AthleteShirtNumber: oldVal }, function (aRes) {
                                if (aRes.State == 1) {
                                    me.AddMatchAthlete();
                                }
                                else {
                                    alert("提交失败！");
                                }
                            });
                        });
                    });
                    me.fnDes(me.Datas.PsCount);
                    $("#MatchAthleteTable").dataTable().fnDestroy();
                    $("#Athlete").dataTable().fnDestroy();
                    me.DataTables();
                });
               
            });
        }
        catch (e) {; }
    },
 

    //提交比赛运动员信息
    PostMatchAthlete: function () {
        
        var obj = document.getElementsByName("PlayerBox");
        check_val = [];
        for (k in obj) {
            if (obj[k].checked)
                check_val.push(obj[k].value);
        }
        var me = Result;

        
        try {
            var str = "('";
            var str1 = "')";
            var str2 = "','";
            var str3 = ",";
            var infos;
            for (var i = 0; i < check_val.length; i++) {
                var aItem = me.Datas.LoaclDatas.ParticipantMemberInfo[check_val[i]];
                var info = str + me.Datas.LoaclDatas.ResultSessionInfo[me.Datas.dIndex].ID + str2 + aItem.ParticipantID + str2 + aItem.AthleteID + str2 + aItem.MemberPosition + str2 +
    			aItem.MemberProperty + str2 + aItem.MemberOrder+str1;
                if (i == 0) infos = info;
                else infos = infos + str3 + info;
            }
            //alert(infos); 
            var aPath = me.Path.addMatchAthlete;
            Ac.acExecuteSql(aPath, { Infos: infos }, function (aRes) {
                if (aRes.State == 1) {
                    var aDlg = $("#AddAthModal");
                    aDlg.on('shown.bs.modal', function () {

                    }).on('hidden.bs.modal', function () {
                      
                        me.LoadPlayerStatistic();
                    });
                    //aDlg.modal('toggle');
                }
                else {
                    alert("提交失败！");
                }
            });
       
        }
        catch (e) {; }
    },
    //加载运动员检录信息
    LoadPlayerStatistic: function () {

        var me = Result;
        try {
            me.Datas.PsCount = me.Datas.PsCount + 1;

                Ac.acGetTable(me.Path.getPlayerStatistic, { ParticipantID: $("#ParticipantID option:selected").val(), MatchID: me.Datas.LoaclDatas.ResultSessionInfo[me.Datas.dIndex].ID }, function (aRes) {
                    var a = aRes.Datas;
                    me.Datas.LoaclDatas.PlayerStatisticInfo = a.DA;
                    var aHtml = bt(me.Tpls.tplCheckPlayer.C, { tplData: a.DA });
                    hhls.fillElement("#tab-3", aHtml);                   
                    me.fnDes(me.Datas.PsCount);
                    me.DataTables();

                });
                //hhls.fillElement("#ResultEvent_ScoreInfo",me.Tpls.tplScoreInfo.C)
        } catch (e) {; }
    },
   
    //加载参赛运动员下拉框
    LoadParticipantMember: function () {

        var me = Result;

        try {
            hhls.GetTpls(me.Tpls, function () {
                Ac.acGetTable(me.Path.getMatchAthlete, { ParticipantID: $("#AthleteParticipantID option:selected").val(), MatchID: me.Datas.LoaclDatas.ResultSessionInfo[me.Datas.cIndex].ID }, function (aRes) {
                    var a = aRes.Datas;
                    me.Datas.LoaclDatas.MatchAthleteInfo = a.DA;
                    var aHtml = bt(me.Tpls.tplParticipantMemberOption.C, { tplData: a.DA });
                    hhls.fillElement("#ParticipantMemberSelect", aHtml);
                    me.LoadTech();
                    me.LoadTechTable();
                    
                });

            });
        } catch (e) {; }
    },
    //回显官员与裁判勾选信息
    LoadSelectedOfficial: function () {
        var me = Result;
        try {
                Ac.acGetTable(me.Path.getSelectedOfficial, { MatchID: me.Datas.LoaclDatas.ResultSessionInfo[me.Datas.dIndex].ID,}, function (aRes) {
                    var a = aRes.Datas;
                    me.Datas.LoaclDatas.SelectedOfficialInfo = a.DA;
                    var ChiefJudge = me.Datas.LoaclDatas.SelectedOfficialInfo[0].ID;
                    var JudgeA = me.Datas.LoaclDatas.SelectedOfficialInfo[1].ID;
                    var JudgeB = me.Datas.LoaclDatas.SelectedOfficialInfo[2].ID;
                    var Official = me.Datas.LoaclDatas.SelectedOfficialInfo[3].ID;
                    //$("#ChiefJudgeSelect select ").val(ChiefJudge);
                    //$("#JudgeSelectA select ").val(JudgeA);
                    //$("#JudgeSelectB select ").val(JudgeB);
                    //$("#OfficialSelect select ").val(Official);
                    $("#ChiefJudgeSelect select ").find('option[value = ' + ChiefJudge + ']').attr("selected", "selected");
                    $("#JudgeSelectA select ").find('option[value=' + JudgeA + ']').attr("selected", "selected");
                    $("#JudgeSelectB select ").find('option[value='+ JudgeB + ']').attr("selected", "selected");
                    $("#OfficialSelect select ").find('option[value=' + Official + ']').attr("selected", "selected");
                });

        } catch (e) {; }
    },


    //加载技术统计下拉框
    LoadTech: function () {

        var me = Result;

        try {
            hhls.GetTpls(me.Tpls, function () {
                Ac.acGetTable(me.Path.getTech, {}, function (aRes) {
                    var a = aRes.Datas;
                    me.Datas.LoaclDatas.TechInfo = a.DA;
                    var aHtml = bt(me.Tpls.tplAthleteTechOption.C, { tplData: a.DA });
                    hhls.fillElement("#TechSelect", aHtml);
                });

            });
        } catch (e) {; }
    },



    //加载教练
    LoadCoach: function () {

        var me = Result;

        try {
            hhls.GetTpls(me.Tpls, function () {
                Ac.acGetTable(me.Path.getCoach, {}, function (aRes) {
                    var a = aRes.Datas;
                    var aHtml = bt(me.Tpls.tplCoachOption.C, { tplData: a.DA });
                    hhls.fillElement("#CoachSelect", aHtml);
                    me.LoadSelectedCoach();

                });
               
             

            });
           
        } catch (e) {; }
    },
   

    //加载已经选择的教练下拉框
    LoadSelectedCoach: function () {

        var me = Result;

        try {
           
            Ac.acGetTable(me.Path.getParticipant, { ParticipantID: $("#ParticipantID option:selected").val() }, function (aRes) {
                var a = aRes.Datas;
                me.Datas.LoaclDatas.ParticipantInfo = a.DA;
                var CoachID = me.Datas.LoaclDatas.ParticipantInfo[0].CoachID;
                $("#CoachSelect select").find('option[value=' + CoachID + ']').attr("selected", "selected");

            });
        } catch (e) {; }
    },


    //加载裁判下拉框
    LoadJudge: function () {

        var me = Result;

        try {

                Ac.acGetTable(me.Path.getJudge, {}, function (aRes) {
                    var a = aRes.Datas;
                    me.Datas.LoaclDatas.JudgeInfo = a.DA;
                    var aHtml = bt(me.Tpls.tplOfficialOption.C, { tplData: a.DA });
                    hhls.fillElement("#ChiefJudgeSelect", aHtml);
                    hhls.fillElement("#JudgeSelectA", aHtml);
                    hhls.fillElement("#JudgeSelectB", aHtml);

                    me.LoadOfficial();
                });

        } catch (e) {; }
    },
    //回显颜色
    LoadColor: function () {

        var me = Result;

        try {
                //Ac.acGetTable(me.Path.getColor, {}, function (aRes) {
                //    var a = aRes.Datas;
                //    me.Datas.LoaclDatas.ColorInfo = a.DA;
                //    var aHtml = bt(me.Tpls.tplColorSelect.C, { tplData: a.DA });
                //    hhls.fillElement("#ShirtSelect", aHtml);
                //    hhls.fillElement("#ShortSelect", aHtml);
                //    hhls.fillElement("#SockSelect", aHtml);
                //    //$("#ShirtSelect select option:selected").val(aItem.MatchLocalName);
                //    //$("#ShortSelect select option:selected").val(aItem.PhaseLocalName);
                //    //$("SockSelect select option:selected").val(aItem.ID);
                //});
                Ac.acGetTable(me.Path.getParticipant, { ParticipantID: $("#ParticipantID option:selected").val() }, function (aRes) {
                    var a = aRes.Datas;
                    me.Datas.LoaclDatas.ParticipantInfo = a.DA;
                    var ShirtColor = me.Datas.LoaclDatas.ParticipantInfo[0].ShirtColor;
                    var ShortColor = me.Datas.LoaclDatas.ParticipantInfo[0].ShortColor;
                    var SockColor = me.Datas.LoaclDatas.ParticipantInfo[0].SockColor;             
                    ShirtColor: $("#ShirtColor").val(ShirtColor);
                    ShortColor: $("#ShortColor").val(ShortColor);
                    SockColor: $("#SockColor").val(SockColor);
                });
        } catch (e) {; }
    },

    //加载官员下拉框
    LoadOfficial: function () {

        var me = Result;

        try {
                Ac.acGetTable(me.Path.getOfficial,{}, function (aRes) {
                    var a = aRes.Datas;
                    me.Datas.LoaclDatas.OfficialInfo = a.DA;
                    var aHtml = bt(me.Tpls.tplOfficialOption.C, { tplData: a.DA });
                    hhls.fillElement("#OfficialSelect", aHtml);

                    me.LoadSelectedOfficial();
                });

        } catch (e) {; }
    },
    //提交裁判与官员信息
    doOfficialPost: function () {
        var me = Result;
        //alert($("#ChiefCouchSelect select").get(0).selectedIndex);
        //alert($("#ShirtSelect select option:selected").val());
        try {

            var aInfo = {
              
                MatchID: me.Datas.LoaclDatas.ResultSessionInfo[me.Datas.dIndex].ID,

                OfficialID1: $("#ChiefJudgeSelect select option:selected").val(),
                Duty1: me.Datas.LoaclDatas.JudgeInfo[$("#ChiefJudgeSelect select").get(0).selectedIndex].OfficialFunction,
                //OfficialOrder1: me.Datas.LoaclDatas.JudgeInfo[$("#ChiefJudgeSelect select").get(0).selectedIndex].OfficialOrder,

                OfficialID2: $("#JudgeSelectA select option:selected").val(),
                Duty2: me.Datas.LoaclDatas.JudgeInfo[$("#JudgeSelectA select").get(0).selectedIndex].OfficialFunction,
                //OfficialOrder2: me.Datas.LoaclDatas.JudgeInfo[$("#JudgeSelectA select").get(0).selectedIndex].OfficialOrder,

                OfficialID3: $("#JudgeSelectB select option:selected").val(),
                Duty3: me.Datas.LoaclDatas.JudgeInfo[$("#JudgeSelectB select").get(0).selectedIndex].OfficialFunction,
                //OfficialOrder3: me.Datas.LoaclDatas.JudgeInfo[$("#JudgeSelectB select").get(0).selectedIndex].OfficialOrder,

                OfficialID4: $("#OfficialSelect select option:selected").val(),
                Duty4: me.Datas.LoaclDatas.OfficialInfo[$("#OfficialSelect select").get(0).selectedIndex].OfficialFunction,
                //OfficialOrder4: me.Datas.LoaclDatas.OfficialInfo[$("#OfficialSelect select").get(0).selectedIndex].OfficialOrder,

            }
            var aPath = me.Path.newOfficial;
            Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                if (aRes.State == 1) {
                    alert("提交成功！");
                    //me.LoadCheckPlayer(me.Datas.dIndex);
                    me.LoadOfficial();
                }
                else {
                    alert("提交失败！");
                }
            });
        }

        catch (e) {; }
    },
    //提交队服颜色信息
    doColorPost: function () {       
            var me = Result;
           
            try {

                var aInfo = {
                    ParticipantID: $("#ParticipantID option:selected").val(),
                    ShirtColor: $("#ShirtColor").val(),
                    ShortColor: $("#ShortColor").val(),
                    SockColor: $("#SockColor").val(),

                  
                }
                var aPath = me.Path.newColor;
                Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                    if (aRes.State == 1) {
                        alert("提交成功！");
                        //me.LoadCheckPlayer(me.Datas.dIndex);
                        me.LoadColor();
                    }
                    else {
                        alert("提交失败！");
                    }
                });
            }

            catch (e) {; }
    },


    //提交教练信息
    doCoachPost: function () {
        var me = Result;

        try {

            var aInfo = {
                ParticipantID: $("#ParticipantID option:selected").val(),
                CoachID: $("#CoachID option:selected").val(),


            }
            var aPath = me.Path.newCoach;
            Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                if (aRes.State == 1) {
                    alert("提交成功！");
                    //me.LoadCheckPlayer(me.Datas.dIndex);
                    me.LoadCoach();
                }
                else {
                    alert("提交失败！");
                }
            });
        }

        catch (e) {; }
    },

    //加载运动员技术统计信息表
    LoadTechTable: function () {

        var me = Result;
        me.Datas.PsCount = me.Datas.PsCount + 1;
        try {
            hhls.GetTpls(me.Tpls, function () {
                Ac.acGetTable(me.Path.getTechStatistic, { ParticipantID: $("#AthleteParticipantID option:selected").val(), MatchID: me.Datas.LoaclDatas.ResultSessionInfo[me.Datas.cIndex].ID }, function (aRes) {
                    var a = aRes.Datas;
                    me.Datas.LoaclDatas.TechStatisticInfo = a.DA;
                    var aHtml = bt(me.Tpls.tplTechStatistic.C, { tplData: a.DA });
                    hhls.fillElement("#tab-4", aHtml);
                    me.fnDes(me.Datas.PsCount);
                    me.DataTables();
                });
                
            });
        } catch (e) {; }
    },
    //加载比赛成绩信息
    LoadResultSession: function () {
    	
        var me=Result;
        me.Datas.PsCount = me.Datas.PsCount + 1;
        try{

                Ac.acGetTable(me.Path.getResultSession, {PhaseID:$("#PhaseID option:selected").val()}, function (aRes) {
                    var aSI = aRes.Datas;
                    me.Datas.LoaclDatas.ResultSessionInfo = aSI.DA;
                    var aHtml = bt(me.Tpls.tplResultSession.C, { tplData: aSI.DA });
                    hhls.fillElement("#tab-2", aHtml);
                    me.fnDes(me.Datas.PsCount);
                    me.DataTables();
                    $("#table").dataTable().fnDestroy();
                    me.editStatusClass();

                });

        }catch(e){;}
    },

   

    //加载比赛小组下拉框
    LoadGroup: function () {
        var me = Result;
        try {
            hhls.GetTpls(me.Tpls, function () {
                hhls.fillElement("#tab-1", me.Tpls.tplTeamStatistic.C);
                Ac.acGetTable(me.Path.getGroup, {}, function (aRes) {
                    var aSI = aRes.Datas;
                    me.Datas.LoaclDatas.GroupInfo = aSI.DA;
                    var aHtml = bt(me.Tpls.tplGroupSelect.C, { tplData: aSI.DA });
                    hhls.fillElement("#GroupSelect", aHtml);
                    me.LoadTeamStatistic();
                });
            });


        }
        catch (e) {; }
    },

    //加载小组赛成绩统计信息
    LoadTeamStatistic: function () {

        var me = Result;

        try {
            hhls.GetTpls(me.Tpls, function () {
                Ac.acGetTable(me.Path.getTeamStatistic, { GroupID: $("#GroupID").val() }, function (aRes) {
                    var a = aRes.Datas;
                    me.Datas.LoaclDatas.TeamStatisticInfo = a.DA;
                    var aHtml = bt(me.Tpls.tplTeamTable.C, { tplData: a.DA });
                    hhls.fillElement("#TeamTable", aHtml);                   
                    me.DataTables();


                });
                //hhls.fillElement("#ResultEvent_ScoreInfo",me.Tpls.tplScoreInfo.C)
            });
        } catch (e) {; }
    },
  
  
    //加载技术统计信息 加载参赛国家下拉框
    LoadTechStatistic: function (Index) {
        var me = Result;

        try {

            hhls.GetTpls(me.Tpls, function () {

                var aHtml = bt(me.Tpls.tplAthleteParticipantOption.C, { tplData: me.Datas.LoaclDatas.ResultSessionInfo[Index] });
                hhls.fillElement("#AthleteParticipantSelect", aHtml);
                //加载下拉框选择插件
                me.LoadParticipantMember();
                me.LoadTechTable();
            });


        }
        catch (e) {; }
    },

    //填充成绩录入页面
    EntryScoreEdit:function(Index){
        //alert(Index);
        var me = Result;
        me.Datas.cIndex = Index;
        //var aItem = me.Datas.LoaclDatas.ResultSessionInfo[Index];
        try{

            hhls.GetTpls(me.Tpls, function () {

                Ac.acGetTable(me.Path.getSectionOrder, { MatchID: me.Datas.LoaclDatas.ResultSessionInfo[Index].ID }, function (aRes) {
                    var a = aRes.Datas.DA[0];
                    //me.Datas.LoaclDatas.TeamStatisticInfo = a.DA;
                    if (aRes.Datas.DA.length == 0) {
                        $('#StartTime1').show();
                    } else if (a.SectionOrder == '1') {
                        if (a.EndTime == "") {
                            $('#StartTime1').hide();
                            $('#EndTime1').show();
                        } else {
                            $('#StartTime1').hide();
                            $('#EndTime1').hide();
                            $('#StartTime2').show();
                        }

                    } else if (a.SectionOrder == '2') {
                        if (a.EndTime == "") {
                            $('#StartTime1').hide();
                            $('#EndTime1').hide();
                            $('#StartTime2').hide();
                            $('#EndTime2').show();
                        } else {
                            $('#StartTime1').hide();
                            $('#EndTime1').hide();
                            $('#StartTime2').hide();
                            $('#EndTime2').hide();
                            $('#StartTime3').show();
                        }
                    } else if (a.SectionOrder == '3') {
                        if (a.EndTime == "") {
                            $('#StartTime1').hide();
                            $('#EndTime1').hide();
                            $('#StartTime2').hide();
                            $('#EndTime2').hide();
                            $('#StartTime3').hide();
                            $('#EndTime3').show();
                        } else {
                            $('#StartTime1').hide();
                            $('#EndTime1').hide();
                            $('#StartTime2').hide();
                            $('#EndTime2').hide();
                            $('#StartTime3').hide();
                            $('#EndTime3').hide();
                            $('#StartTime4').show();
                        }
                    } else if (a.SectionOrder == '4') {
                        if (a.EndTime == "") {
                            $('#StartTime1').hide();
                            $('#EndTime1').hide();
                            $('#StartTime2').hide();
                            $('#EndTime2').hide();
                            $('#StartTime3').hide();
                            $('#EndTime3').hide();
                            $('#StartTime4').hide();
                            $('#EndTime4').show();
                        } else {
                            $('#StartTime1').hide();
                            $('#EndTime1').hide();
                            $('#StartTime2').hide();
                            $('#EndTime2').hide();
                            $('#StartTime3').hide();
                            $('#EndTime3').hide();
                            $('#StartTime4').hide();
                            $('#EndTime4').hide();
                            $('#StartTime5').show();
                        }
                    } else if (a.SectionOrder == '5') {
                        if (a.EndTime == "") {
                            $('#StartTime1').hide();
                            $('#EndTime1').hide();
                            $('#StartTime2').hide();
                            $('#EndTime2').hide();
                            $('#StartTime3').hide();
                            $('#EndTime3').hide();
                            $('#StartTime4').hide();
                            $('#EndTime4').hide();
                            $('#StartTime5').hide();
                            $('#EndTime5').show();
                        } else {
                            $('#StartTime1').hide();
                            $('#EndTime1').hide();
                            $('#StartTime2').hide();
                            $('#EndTime2').hide();
                            $('#StartTime3').hide();
                            $('#EndTime3').hide();
                            $('#StartTime4').hide();
                            $('#EndTime4').hide();
                            $('#StartTime5').hide();
                            $('#EndTime5').hide();
                        }
                    }

                });

                
                var aItem = me.Datas.LoaclDatas.ResultSessionInfo[Index];
                hhls.fillElement("#EntryScore",me.Tpls.tplEntryScore.C);    		
                $("#EntryScore_MatchLocalName").val(aItem.MatchLocalName);
                $("#EntryScore_PhaseLocalName").val(aItem.PhaseLocalName);
                $("#EntryScore_MatchID").val(aItem.ID);
                $("#EntryScore_MatchCode").val(aItem.UploadMatchCode);
                $("#EntryScore_ParticipantLocalNameA").val(aItem.ParticipantLocalNameA);
                $("#EntryScore_ParticipantLocalNameB").val(aItem.ParticipantLocalNameB);
                $("#EntryScore_ParticipantAID").val(aItem.ParticipantAID);
                $("#EntryScore_ParticipantBID").val(aItem.ParticipantBID);
                $("#ScoreA").val(aItem.ScoreA);
                $("#ScoreB").val(aItem.ScoreB);
                $("#SectionScoreA1").val(aItem.sectionscorea1);
                $("#SectionScoreA2").val(aItem.sectionscorea2);
                $("#SectionScoreA3").val(aItem.sectionscorea3);
                $("#SectionScoreA4").val(aItem.sectionscorea4);
                $("#SectionScoreA5").val(aItem.sectionscorea5);
                $("#SectionScoreB1").val(aItem.sectionscoreb1);
                $("#SectionScoreB2").val(aItem.sectionscoreb2);
                $("#SectionScoreB3").val(aItem.sectionscoreb3);
                $("#SectionScoreB4").val(aItem.sectionscoreb4);
                $("#SectionScoreB5").val(aItem.sectionscoreb5);
                //if (aItem.WinType > 0)
                $("#WinType").val(aItem.WinType);
                //else
                //    $("#Wintype").val(0);


               


                me.ShowEntryScore();
                me.LoadTechStatistic(Index);
                me.CountTime();

            });
        }catch(e){;}
    },
    //填充成绩录入页面
    EntryScoreEdit2: function (Index) {
        //alert(Index);
        var me = Result;
        me.Datas.cIndex = Index;
        //var aItem = me.Datas.LoaclDatas.ResultSessionInfo[Index];
        try {

            hhls.GetTpls(me.Tpls, function () {

                Ac.acGetTable(me.Path.getSectionOrder, { MatchID: me.Datas.LoaclDatas.ResultSessionInfo[Index].ID }, function (aRes) {
                    var a = aRes.Datas.DA[0];
                    //me.Datas.LoaclDatas.TeamStatisticInfo = a.DA;
                    if (aRes.Datas.DA.length == 0) {
                        $('#StartTime1').show();
                    } else if (a.SectionOrder == '1') {
                        if (a.EndTime == "") {
                            $('#StartTime1').hide();
                            $('#EndTime1').show();
                        } else {
                            $('#StartTime1').hide();
                            $('#EndTime1').hide();
                            $('#StartTime2').show();
                        }

                    } else if (a.SectionOrder == '2') {
                        if (a.EndTime == "") {
                            $('#StartTime1').hide();
                            $('#EndTime1').hide();
                            $('#StartTime2').hide();
                            $('#EndTime2').show();
                        } else {
                            $('#StartTime1').hide();
                            $('#EndTime1').hide();
                            $('#StartTime2').hide();
                            $('#EndTime2').hide();
                            $('#StartTime3').show();
                        }
                    } else if (a.SectionOrder == '3') {
                        if (a.EndTime == "") {
                            $('#StartTime1').hide();
                            $('#EndTime1').hide();
                            $('#StartTime2').hide();
                            $('#EndTime2').hide();
                            $('#StartTime3').hide();
                            $('#EndTime3').show();
                        } else {
                            $('#StartTime1').hide();
                            $('#EndTime1').hide();
                            $('#StartTime2').hide();
                            $('#EndTime2').hide();
                            $('#StartTime3').hide();
                            $('#EndTime3').hide();
                            $('#StartTime4').show();
                        }
                    } else if (a.SectionOrder == '4') {
                        if (a.EndTime == "") {
                            $('#StartTime1').hide();
                            $('#EndTime1').hide();
                            $('#StartTime2').hide();
                            $('#EndTime2').hide();
                            $('#StartTime3').hide();
                            $('#EndTime3').hide();
                            $('#StartTime4').hide();
                            $('#EndTime4').show();
                        } else {
                            $('#StartTime1').hide();
                            $('#EndTime1').hide();
                            $('#StartTime2').hide();
                            $('#EndTime2').hide();
                            $('#StartTime3').hide();
                            $('#EndTime3').hide();
                            $('#StartTime4').hide();
                            $('#EndTime4').hide();
                            $('#StartTime5').show();
                        }
                    } else if (a.SectionOrder == '5') {
                        if (a.EndTime == "") {
                            $('#StartTime1').hide();
                            $('#EndTime1').hide();
                            $('#StartTime2').hide();
                            $('#EndTime2').hide();
                            $('#StartTime3').hide();
                            $('#EndTime3').hide();
                            $('#StartTime4').hide();
                            $('#EndTime4').hide();
                            $('#StartTime5').hide();
                            $('#EndTime5').show();
                        } else {
                            $('#StartTime1').hide();
                            $('#EndTime1').hide();
                            $('#StartTime2').hide();
                            $('#EndTime2').hide();
                            $('#StartTime3').hide();
                            $('#EndTime3').hide();
                            $('#StartTime4').hide();
                            $('#EndTime4').hide();
                            $('#StartTime5').hide();
                            $('#EndTime5').hide();
                        }
                    }

                });





                me.ShowEntryScore();
                me.LoadTechStatistic(Index);


            });
        } catch (e) {; }
    },
    //遍历技术统计button，只能选择一个
    pickbtn1: function (Index) {
        var me = Result;
        me.Datas.aIndex = Index;

        for (var i = 0; i < me.Datas.LoaclDatas.TechInfo.length; i++) {
            $("#btn1-" + i).removeClass("btn-primary");
        }

        $("#btn1-" + Index).addClass("btn-primary");


        //$(".btn-block").on("click", function () {
        //    $(this).toggleClass("btn-primary");
        //    $(".btn-block").not($(this)).removeClass("btn-primary");
        //});
       
    },
    //遍历运动员button，只能选择一个
    pickbtn2: function (Index) {
        var me = Result;
        me.Datas.bIndex = Index;

        for (var i = 0; i < me.Datas.LoaclDatas.MatchAthleteInfo.length; i++) {
            $("#btn2-" + i).removeClass("btn-primary");
        }
        $("#btn2-" + Index).addClass("btn-primary");
      

    },
   

    //删除分数信息
    delResultSession:function(Index){
        var me=Result;
        var aItem = me.Datas.LoaclDatas.ResultSessionInfo[Index];
        //alert(aItem.ID);
        try {
            var aPath = me.Path.delScoreInfo;
            var aFlag = window.confirm("是否确定删除该成绩信息？");
            if (aFlag) {
                Ac.acExecuteSql(aPath, { MatchID: aItem.ID }, function (aRes) {
                	
                    if (aRes.State == 1) {
                        me.LoadResultSession();
                    }
                    else {
                        alert("删除失败！");
                    }
                });
            }
        }
        catch (e) {; }
    	
    },

    //提交补时时间
    postInjuryT: function () {
        var me = Result;
        Ac.acGetTable(me.Path.getSectionOrder, { MatchID: me.Datas.LoaclDatas.ResultSessionInfo[me.Datas.cIndex].ID }, function (aRes) {
            var a = aRes.Datas.DA[0];
            me.Datas.order = a.SectionOrder;
            var aInfo = {
                MatchID: me.Datas.LoaclDatas.ResultSessionInfo[me.Datas.cIndex].ID,
                SectionOrder: me.Datas.order + '',
                InjuryTime: $("#InjuryTime").val(),
               
            };
            var aPath = me.Path.postInjuryT;
            Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                if (aRes.State == 1) {
                    alert("提交成功！");
                    me.LoadResultSession(me.Datas.cIndex);
                }
                else {
                    alert("提交失败！");
                }
            });

        });
    },
    
    //编辑代表团信息 数据回显 表单 
    showControlT: function () {
        var me = Result;
            try {
               
                var aDlg = $("#myModal3");
                aDlg.on('shown.bs.modal', function () {
                    $("#ControlTimeA").val(me.Datas.LoaclDatas.ResultSessionInfo[me.Datas.cIndex].ControlTimeA);
                    $("#ControlTimeB").val(me.Datas.LoaclDatas.ResultSessionInfo[me.Datas.cIndex].ControlTimeB);
                }).on('hidden.bs.modal', function () {
                    
                });
                aDlg.modal('toggle');
            }
        
            catch (e) {; }
        },

    //提交控球时间
    postControlT: function () {
        var me = Result;
        var aInfo = {
            MatchID: me.Datas.LoaclDatas.ResultSessionInfo[me.Datas.cIndex].ID,
            ControlTimeA: $("#ControlTimeA").val(),
            ControlTimeB: $("#ControlTimeB").val()

        };
        var aPath = me.Path.postControlT;
        Ac.acExecuteSql(aPath, aInfo, function (aRes) {
            if (aRes.State == 1) {
                var aDlg = $("#myModal3");
                aDlg.on('shown.bs.modal', function () {
                   

                }).on('hidden.bs.modal', function () {
                    alert("提交成功！");
                    me.LoadResultSession(me.Datas.cIndex);
                });
                aDlg.modal('toggle');
            }
            else {
                alert("提交失败！");
            }

        });

    },
    closeControlT:function(){
        $("#myModal3").hide();
    },

    //提交暂停时间
    postSuspendT: function () {
        var me = Result;
        Ac.acGetTable(me.Path.getSectionOrder, { MatchID: me.Datas.LoaclDatas.ResultSessionInfo[me.Datas.cIndex].ID }, function (aRes) {
            var a = aRes.Datas.DA[0];
            me.Datas.order = a.SectionOrder;
            var aInfo = {
                MatchID: me.Datas.LoaclDatas.ResultSessionInfo[me.Datas.cIndex].ID,
                SectionOrder: me.Datas.order + '',
                StartTime: $("#StartSuspendT").val(),
                EndTime: $("#StopSuspendT").val(),
            };
            var aPath = me.Path.postSuspendT;
            Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                if (aRes.State == 1) {
                    var aDlg = $("#myModal2");
                    aDlg.on('shown.bs.modal', function () {
                       
                    }).on('hidden.bs.modal', function () {
                        alert("提交成功！");
                        me.LoadResultSession(me.Datas.cIndex);
                    });
                    aDlg.modal('toggle');
                }
                else {
                    alert("提交失败！");
                }
               
            });

        });
    },
   
    //录入分数信息
    AddScoreInfo:function(){
        var me=Result;            		
        var aInfo = {
            MatchID: $("#EntryScore_MatchID").val(),           
            ScoreA: $("#ScoreA").val(),
            ScoreB: $("#ScoreB").val(),
            SectionScoreA1: $("#SectionScoreA1").val(),
            SectionScoreA2: $("#SectionScoreA2").val(),
            SectionScoreA3: $("#SectionScoreA3").val(),
            SectionScoreA4: $("#SectionScoreA4").val(),
            SectionScoreA5: $("#SectionScoreA5").val(),
            SectionScoreB1: $("#SectionScoreB1").val(),
            SectionScoreB2: $("#SectionScoreB2").val(),
            SectionScoreB3: $("#SectionScoreB3").val(),
            SectionScoreB4: $("#SectionScoreB4").val(),
            SectionScoreB5: $("#SectionScoreB5").val(),
            WinType:$("#WinType option:selected").val(),

            ParticipantAID: $("#EntryScore_ParticipantAID").val(),
            ParticipantBID: $("#EntryScore_ParticipantBID").val()
        };
        var aPath = me.Path.editResultSession;
        Ac.acExecuteSql(aPath, aInfo, function (aRes) {
            if (aRes.State == 1) {
                me.HideEntyScore();
                me.LoadResultSession();
            }
            else {
                alert("提交失败！");
            }
        });	
    },

    //提交运动员技术统计信息数据
    doTechPost: function () {
        var me = Result;

        //var myDate = new Date();
        //myDate.getYear(); //获取当前年份(2位)
        //myDate.getFullYear(); //获取完整的年份(4位,1970-????)
        //myDate.getMonth(); //获取当前月份(0-11,0代表1月)
        //myDate.getDate(); //获取当前日(1-31)
        //myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
        //myDate.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)
        //myDate.getHours(); //获取当前小时数(0-23)
        //myDate.getMinutes(); //获取当前分钟数(0-59)
        //myDate.getSeconds(); //获取当前秒数(0-59)
        //var mytime=myDate.toLocaleTimeString(); //获取当前时间
        

        var value = $(this).attr("name");
        //alert($('#MatchSectionOrder option:selected').val());
        //alert(me.Datas.LoaclDatas.ResultSessionInfo[me.Datas.cIndex].ID);
        Ac.acGetTable(me.Path.getSectionOrder, { MatchID: me.Datas.LoaclDatas.ResultSessionInfo[me.Datas.cIndex].ID }, function (aRes) {
            var a = aRes.Datas.DA[0];
            me.Datas.order = a.SectionOrder;
            var tempA=parseInt($('#SectionScoreA1').val())+parseInt($('#SectionScoreA2').val())+parseInt($('#SectionScoreA3').val())+parseInt($('#SectionScoreA4').val())+parseInt($('#SectionScoreA5').val());
            var tempB=parseInt($('#SectionScoreB1').val())+parseInt($('#SectionScoreB2').val())+parseInt($('#SectionScoreB3').val())+parseInt($('#SectionScoreB4').val())+parseInt($('#SectionScoreB5').val());
            var aInfo = {
                ParticipantID: $("#AthleteParticipantSelect option:selected").val(),
                MatchID: me.Datas.LoaclDatas.ResultSessionInfo[me.Datas.cIndex].ID,
                //AthleteLocalName: $("#AthleteLocalName").val(),
                MatchSectionOrder: me.Datas.order + '',
                TechCode: me.Datas.LoaclDatas.TechInfo[me.Datas.aIndex].TechCode,
                //TechName: $("#TechName").val(),
                //TechLocalName: $("#TechLocalName").val(),
                AthleteID: me.Datas.LoaclDatas.MatchAthleteInfo[me.Datas.bIndex].AthleteID,
                //BeginTime: myDate.toLocaleString( ),
                ParticipantAID: $("#EntryScore_ParticipantAID").val(), 
                ParticipantBID: $("#EntryScore_ParticipantBID").val(),
                ID: me.Datas.LoaclDatas.TechInfo[me.Datas.aIndex].ID,
                CurrentScoreA:tempA.toString(),
                CurrentScoreB:tempB.toString(),
                
            };
            var aPath = me.Path.newTech;
            Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                if (aRes.State == 1) {

                    Ac.acGetTable(me.Path.getScore, { MatchID: me.Datas.LoaclDatas.ResultSessionInfo[me.Datas.cIndex].ID + '', ParticipantAID: $("#EntryScore_ParticipantAID").val(), ParticipantBID: $("#EntryScore_ParticipantBID").val() }, function (aRes) {
                        var a = aRes.Datas.DA[0];
                        //me.Datas.LoaclDatas.TechInfo = a.DA;

                        $('#ScoreA').val(parseInt(a.Ascore1) + parseInt(a.Ascore2) + parseInt(a.Ascore3) + parseInt(a.Ascore4));                        
                        $('#SectionScoreA1').val(a.Ascore1);
                        $('#SectionScoreA2').val(a.Ascore2);
                        $('#SectionScoreA3').val(a.Ascore3);
                        $('#SectionScoreA4').val(a.Ascore4);
                        $('#SectionScoreA5').val(a.Ascore5);

                        $('#ScoreB').val(parseInt(a.Bscore1) + parseInt(a.Bscore2) + parseInt(a.Bscore3) + parseInt(a.Bscore4));
                        $('#SectionScoreB1').val(a.Bscore1);
                        $('#SectionScoreB2').val(a.Bscore2);
                        $('#SectionScoreB3').val(a.Bscore3);
                        $('#SectionScoreB4').val(a.Bscore4);
                        $('#SectionScoreB5').val(a.Bscore5);
                        
                        var temp1A=parseInt(a.Ascore1) + parseInt(a.Ascore2) + parseInt(a.Ascore3) + parseInt(a.Ascore4);
                        var temp1B=parseInt(a.Bscore1) + parseInt(a.Bscore2) + parseInt(a.Bscore3) + parseInt(a.Bscore4);
                        
                        Ac.acExecuteSql("Result/updateSingleTech.txt", {ParticipantAID: $("#EntryScore_ParticipantAID").val(), ParticipantBID: $("#EntryScore_ParticipantBID").val(),CurrentScoreA:temp1A.toString(),
                            CurrentScoreB:temp1B.toString(),MatchID: me.Datas.LoaclDatas.ResultSessionInfo[me.Datas.cIndex].ID}, function (aRes) {
                            	if (aRes.State == 1) {
                            		//alert("success");
                            	}
                            	else{
                            		//alert("false");
                            	}
                        });
                        

                    });
                    me.LoadTechTable();
                    //ODF.Get_DT_PLAY_BY_PLAY1();
                    //ODF.Get_DT_RESULT1();
                    //me.openWin();

                }
                else {
                    alert("提交失败！");
                }
            });
        });



    },


    //编辑运动员单项技术统计信息 数据回显 表单 
    showAthTechEdit: function (Index) {
        var me = Result;
        
        try {
            var aItem = me.Datas.LoaclDatas.TechStatisticInfo[Index];
            // me.Datas.CurItemID = aItem.ID;
            me.Datas.gIndex = Index;
            var aDlg = $("#myModal");
            //var TechCode = aItem.TechCode;
            aDlg.on('shown.bs.modal', function () {
                
                //$("#AthleteID option:selected").text(aItem.ID).split("--")[0];
                $("#TechAthleteName").val(aItem.AthleteName);
                $("#TechAthleteLocalName").val(aItem.AthleteLocalName);
                $("#BeginTime").val(aItem.BeginTime);
                $("#Memo").val(aItem.Memo);
                //$("#TechID").find('option[value = ' + TechCode + ']').attr("selected", "selected");
                //$("#AthleteTechSelect select ").find('option[value=' + TechCode + ']').attr("selected", "selected");                
                $("#TimePoint").val(aItem.TimePoint);
              
                Ac.acGetTable(me.Path.getTech, {}, function (aRes) {
                    var a = aRes.Datas;
                    me.Datas.LoaclDatas.TechInfo = a.DA;
                    var aHtml = bt(me.Tpls.tplTechOption.C, { tplData: a.DA });
                    hhls.fillElement("#AthleteTechSelect", aHtml);
                    $("#TechID").val(aItem.TechCode);
                });


            }).on('hidden.bs.modal', function () {
                me.LoadTechTable();
            });
            aDlg.modal('toggle');

        }
        catch (e) {; }
    },

    //提交运动员技术统计修改信息
    doAthTechPost: function () {
        var me = Result;

        try {

            var aInfo = {
                ID: me.Datas.LoaclDatas.TechStatisticInfo[me.Datas.gIndex].ID,
                TechCode: $("#TechID option:selected").val(),
                BeginTime: $("#BeginTime").val(),
                TimePoint: $("#TimePoint").val(),
                Memo: $("#Memo").val(),
            }
            var aPath = me.Path.editAthTech;
            Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                if (aRes.State == 1) {
                    var aDlg = $("#myModal");
                    aDlg.on('shown.bs.modal', function () {

                    }).on('hidden.bs.modal', function () {
                        me.LoadTechStatistic();
                    });
                    aDlg.modal('toggle');
                }
                else {
                    alert("提交失败！");
                }
            });
            }

        catch (e) {; }
    },

   
    ////加载模态框技术统计下拉框
    //LoadSelect: function () {
    //    var me = Result;
    //    try {
    //        hhls.GetTpls(me.Tpls, function () {
    //            Ac.acGetTable(me.Path.getTech, {}, function (aRes) {
    //                var a = aRes.Datas;
    //                me.Datas.LoaclDatas.TechInfo = a.DA;
    //                var aHtml = bt(me.Tpls.tplTechOption.C, { tplData: a.DA });
    //                hhls.fillElement("#AthleteTechSelect", aHtml);
    //                $("#TechID").val(aItem.TechCode);
    //            });
              
    //        });

    //    }
    //    catch (e) {; }
    //},

   
    ShowCheckPlayer: function () {
        $("#ResultEdit").hide();
        $("#CheckPlayer").show();
    },
    HideCheckPlayer: function () {
        $("#CheckPlayer").hide();

        

    },
    ShowEntryScore: function () {
        $("#CheckPlayer").hide();
    	$("#ResultEdit").show();	
    },
    HideEntyScore:function(){
    	$("#ResultEdit").hide();	
    },
    //编辑运动员信息 数据回显 表单 
    showAthEditDlg: function (Index) {
        var me = Result;
        try {
            var aItem = me.Datas.LoaclDatas.PlayerStatisticInfo[Index];
            // me.Datas.CurItemID = aItem.ID;
            me.Datas.eIndex = Index;
            var aDlg = $("#MATModal");
            aDlg.on('shown.bs.modal', function () {
               
                $("#AthleteShirtNumber").val(aItem.AthleteShirtNumber);
                $("#AthleteName").val(aItem.AthleteName);
                $("#AthleteID").val(aItem.AthleteID);
                $("#AthleteLocalName").val(aItem.AthleteLocalName);
                $("#MemberProperty").val(aItem.Property);
                $("#CaptainMemo").val(aItem.Memo);
                $("#MemberPosition").find('option[value = ' + aItem.PositionCode + ']').attr("selected", "selected");
                $("#AthleteStatus").find('option[value = ' + aItem.AthleteStatus + ']').attr("selected", "selected");
                
                //$("#MemberPosition").val(aItem.PositionCode);
                
            }).on('hidden.bs.modal', function () {
                me.LoadPlayerStatistic();
            });
            aDlg.modal('toggle');

        }
        catch (e) {; }
    },
   

    
    //删除运动员单项技术统计信息
    delSingleTech: function (Index) {
        var me = Result;
        //alert(me.Datas.LoaclDatas.TechStatisticInfo[Index].ParticipantID);
        try {
            var aItem = me.Datas.LoaclDatas.TechStatisticInfo[Index];
            var aPath = me.Path.delSingleTech;
            

            var aFlag = window.confirm("是否确定删除该运动员技术统计信息？");
            if (aFlag) {
                Ac.acExecuteSql(aPath, { ID: aItem.ID, ParticipantID: me.Datas.LoaclDatas.TechStatisticInfo[Index].ParticipantID }, function (aRes) {
                    if (aRes.State == 1) {
                        Ac.acGetTable(me.Path.getScore, { MatchID: me.Datas.LoaclDatas.ResultSessionInfo[me.Datas.cIndex].ID + '', ParticipantAID: $("#EntryScore_ParticipantAID").val(), ParticipantBID: $("#EntryScore_ParticipantBID").val() }, function (aRes) {
                            var a = aRes.Datas.DA[0];
                            //me.Datas.LoaclDatas.TechInfo = a.DA;

                            $('#ScoreA').val(parseInt(a.Ascore1) + parseInt(a.Ascore2) + parseInt(a.Ascore3) + parseInt(a.Ascore4));
                            $('#SectionScoreA1').val(a.Ascore1);
                            $('#SectionScoreA2').val(a.Ascore2);
                            $('#SectionScoreA3').val(a.Ascore3);
                            $('#SectionScoreA4').val(a.Ascore4);
                            $('#SectionScoreA5').val(a.Ascore5);

                            $('#ScoreB').val(parseInt(a.Bscore1) + parseInt(a.Bscore2) + parseInt(a.Bscore3) + parseInt(a.Bscore4));
                            $('#SectionScoreB1').val(a.Bscore1);
                            $('#SectionScoreB2').val(a.Bscore2);
                            $('#SectionScoreB3').val(a.Bscore3);
                            $('#SectionScoreB4').val(a.Bscore4);
                            $('#SectionScoreB5').val(a.Bscore5);

                        });
                        me.LoadTechTable();
                    }
                    else {
                        alert("删除失败！");
                    }
                });
            }
        }
        catch (e) {; }
    },
    //删除运动员信息
    delAth: function (Index) {
        var me = Result;
        try {
            var aItem = me.Datas.LoaclDatas.PlayerStatisticInfo[Index];
            var aPath = me.Path.delAth;

            var aFlag = window.confirm("是否确定删除该运动员信息？");
            if (aFlag) {
                Ac.acExecuteSql(aPath, { AthleteID: aItem.AthleteID }, function (aRes) {
                    if (aRes.State == 1) {
                        me.LoadPlayerStatistic();
                    }
                    else {
                        alert("删除失败！");
                    }
                });
            }
        }
        catch (e) {; }
    },
    //表单Post 提交运动员数据
    doAthPost: function () {
        var me = Result;
        try {
            var aInfo = {
                AthleteID: $("#AthleteID").val(),
                ParticipantStatus: $("#ParticipantStatus").val(),
                //AthleteShirtNumber: $("#AthleteShirtNumber").val(),
                //AthleteName: $("#AthleteName").val(),
                //AthleteLocalName: $("#AthleteLocalName").val(),
                Property: $("#MemberProperty").val(),
                Memo: $("#CaptainMemo").val(),
                AthleteShirtNumber:$("#AthleteShirtNumber").val(),
                PositionCode: $("#MemberPosition option:selected").val(),
                AthleteStatus: $("#AthleteStatus option:selected").val(),
                MatchID: me.Datas.LoaclDatas.ResultSessionInfo[me.Datas.dIndex].ID,
              
            }
            var aPath = me.Path.editAth;
            Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                if (aRes.State == 1) {
                    var aDlg = $("#MATModal");
                    aDlg.on('shown.bs.modal', function () {

                    }).on('hidden.bs.modal', function () {
                        alert("提交成功！");
                        me.LoadPlayerStatistic();
                    });
                    aDlg.modal('toggle');
                }
                else {
                    alert("提交失败！");
                }
            });
        }
       
        catch (e) {; }
    },
    //官方比赛成绩信息
    ResultStatusOfficial: function (Index) {
        var me = Result;
        try {
            var aItem = me.Datas.LoaclDatas.ResultSessionInfo[Index];
            var aPath = me.Path.ResultStatusOfficial;

            var aFlag = window.confirm("是否确定官方该成绩信息？");
            if (aFlag) {
                Ac.acExecuteSql(aPath, { ID: aItem.ID }, function (aRes) {
                    if (aRes.State == 1) {
                        me.LoadResultSession();
                    }
                    else {
                        alert("官方失败！");
                    }
                });
            }
        }
        catch (e) {; }
    },
    //非官方比赛成绩信息
    ResultStatusUnOfficial: function (Index) {
        var me = Result;
        try {
            var aItem = me.Datas.LoaclDatas.ResultSessionInfo[Index];
            var aPath = me.Path.ResultStatusUnOfficial;

            var aFlag = window.confirm("是否确定非官方该成绩信息？");
            if (aFlag) {
                Ac.acExecuteSql(aPath, {ID: aItem.ID }, function (aRes) {
                    if (aRes.State == 1) {
                        me.LoadResultSession();
                    }
                    else {
                        alert("非官方失败！");
                    }
                });
            }
        }
        catch (e) {; }
    },
    
    //运动员设置为正选
    PlayerElected: function () {
        var me = Result;
        try {

            var aFlag = window.confirm("是否设置为正选？");
            if (aFlag) {
                var cb = document.getElementsByName("AthleteBox");
                var ID='';
                var str=',';
                for (var i = 0; i < cb.length; i++) {
                    
                    if (cb[i].checked) {

                        for (var i = 0; i < cb.length; i++) {
                            if (cb[i].checked) {
                                ID = ID + me.Datas.LoaclDatas.PlayerStatisticInfo[i].ID + str;
                            }
                        }
                        if (ID.length > 0) {
                            ID = ID.substr(0, ID.length - 1);
                        }


                    }


                }
                        //me.Datas.Index = i;
                            Ac.acExecuteSql(me.Path.PlayerElected, { ID: ID }, function (aRes) {
                                if (aRes.State == 1) {
                                    me.LoadPlayerStatistic();
                            }
                            else {
                                alert("提交失败！");
                            }
                        });
               
                
            }
        }
        catch (e) { ;}
    },
    //运动员设置为替补
    PlayerSubstitute: function () {
        var me = Result;
        try {

            var aFlag = window.confirm("是否设置为替补？");
            if (aFlag) {
                var cb = document.getElementsByName("AthleteBox");
                var ID='';
                var str=',';
                for (var i = 0; i < cb.length; i++) {
                    
                    if (cb[i].checked) {

                        for (var i = 0; i < cb.length; i++) {
                            if (cb[i].checked) {
                                ID = ID + me.Datas.LoaclDatas.PlayerStatisticInfo[i].ID + str;
                            }
                        }
                        if (ID.length > 0) {
                            ID = ID.substr(0, ID.length - 1);
                        }


                    }
                }
                        //me.Datas.Index = i;
                            Ac.acExecuteSql(me.Path.PlayerSubstitute, { ID: ID }, function (aRes) {
                                if (aRes.State == 1) {
                                    me.LoadPlayerStatistic();
                            }
                            else {
                                alert("提交失败！");
                            }
                        });
               
                
            }
        }
        catch (e) { ;}
    },

    //运动员设置为进攻人员
    PlayerFP: function () {
        var me = Result;
        try {

            var aFlag = window.confirm("是否设置为进攻？");
            if (aFlag) {
                var cb = document.getElementsByName("PlayerBox");
                var ID = '';
                var str = ',';
                for (var i = 0; i < cb.length; i++) {

                    if (cb[i].checked) {

                        for (var i = 0; i < cb.length; i++) {
                            if (cb[i].checked) {
                                ID = ID + me.Datas.LoaclDatas.ParticipantMemberInfo[i].ID + str;
                            }
                        }
                        if (ID.length > 0) {
                            ID = ID.substr(0, ID.length - 1);
                        }


                    }


                }
                //me.Datas.Index = i;
                Ac.acExecuteSql(me.Path.editAthFP, { ID: ID }, function (aRes) {
                    if (aRes.State == 1) {
                        me.AddMatchAthlete();
                    }
                    else {
                        alert("提交失败！");
                    }
                });


            }
        }
        catch (e) {; }
    },
   
    //运动员设置为防守人员
    PlayerDF: function () {
        var me = Result;
        try {

            var aFlag = window.confirm("是否设置为防守？");
            if (aFlag) {
                var cb = document.getElementsByName("PlayerBox");
                var ID = '';
                var str = ',';
                for (var i = 0; i < cb.length; i++) {

                    if (cb[i].checked) {

                        for (var i = 0; i < cb.length; i++) {
                            if (cb[i].checked) {
                                ID = ID + me.Datas.LoaclDatas.ParticipantMemberInfo[i].ID + str;
                            }
                        }
                        if (ID.length > 0) {
                            ID = ID.substr(0, ID.length - 1);
                        }


                    }


                }
                //me.Datas.Index = i;
                Ac.acExecuteSql(me.Path.editAthDF, { ID: ID }, function (aRes) {
                    if (aRes.State == 1) {
                        me.AddMatchAthlete();
                    }
                    else {
                        alert("提交失败！");
                    }
                });


            }
        }
        catch (e) {; }
    },


    //运动员设置为中场人员
    PlayerMF: function () {
        var me = Result;
        try {

            var aFlag = window.confirm("是否设置为中场？");
            if (aFlag) {
                var cb = document.getElementsByName("PlayerBox");
                var ID = '';
                var str = ',';
                for (var i = 0; i < cb.length; i++) {

                    if (cb[i].checked) {

                        for (var i = 0; i < cb.length; i++) {
                            if (cb[i].checked) {
                                ID = ID + me.Datas.LoaclDatas.ParticipantMemberInfo[i].ID + str;
                            }
                        }
                        if (ID.length > 0) {
                            ID = ID.substr(0, ID.length - 1);
                        }


                    }


                }
                //me.Datas.Index = i;
                Ac.acExecuteSql(me.Path.editAthMF, { ID: ID }, function (aRes) {
                    if (aRes.State == 1) {
                        me.AddMatchAthlete();
                    }
                    else {
                        alert("提交失败！");
                    }
                });


            }
        }
        catch (e) {; }
    },

    //运动员设置为守门人员
    PlayerGK: function () {
        var me = Result;
        try {

            var aFlag = window.confirm("是否设置为守门？");
            if (aFlag) {
                var cb = document.getElementsByName("PlayerBox");
                var ID = '';
                var str = ',';
                for (var i = 0; i < cb.length; i++) {

                    if (cb[i].checked) {

                        for (var i = 0; i < cb.length; i++) {
                            if (cb[i].checked) {
                                ID = ID + me.Datas.LoaclDatas.ParticipantMemberInfo[i].ID + str;
                            }
                        }
                        if (ID.length > 0) {
                            ID = ID.substr(0, ID.length - 1);
                        }


                    }


                }
                //me.Datas.Index = i;
                Ac.acExecuteSql(me.Path.editAthGK, { ID: ID }, function (aRes) {
                    if (aRes.State == 1) {
                        me.AddMatchAthlete();
                    }
                    else {
                        alert("提交失败！");
                    }
                });


            }
        }
        catch (e) {; }
    },
    //运动员设置为队长
    PlayerCP: function () {
        var me = Result;
        try {

            var aFlag = window.confirm("是否设置为队长？");
            if (aFlag) {
                var cb = document.getElementsByName("AthleteBox");
                var ID = '';
                var str = ',';
                for (var i = 0; i < cb.length; i++) {

                    if (cb[i].checked) {

                        for (var i = 0; i < cb.length; i++) {
                            if (cb[i].checked) {
                                ID = ID + me.Datas.LoaclDatas.PlayerStatisticInfo[i].ID + str;
                            }
                        }
                        if (ID.length > 0) {
                            ID = ID.substr(0, ID.length - 1);
                        }


                    }


                }
                //me.Datas.Index = i;
                Ac.acExecuteSql(me.Path.editAthCP, { ID: ID }, function (aRes) {
                    if (aRes.State == 1) {
                        me.LoadPlayerStatistic();
                    }
                    else {
                        alert("提交失败！");
                    }
                });


            }
        }
        catch (e) {; }
    },
    //设置比赛开始状态（上、下半场，加时赛上、下半场，点球赛）
    StartNext: function (Index) {
        var me = Result;
        try {
            var aInfo = {
                SectionOrder: Index + '',
                MatchID: me.Datas.LoaclDatas.ResultSessionInfo[me.Datas.cIndex].ID
            }
            Ac.acExecuteSql(me.Path.StartNext, aInfo, function (aRes) {
                if (aRes.State == 1) {


                    Ac.acGetTable(me.Path.getScore, { MatchID: me.Datas.LoaclDatas.ResultSessionInfo[me.Datas.cIndex].ID + '', ParticipantAID: $("#EntryScore_ParticipantAID").val(), ParticipantBID: $("#EntryScore_ParticipantBID").val() }, function (aRes) {
                        var a = aRes.Datas.DA[0];
                        //me.Datas.LoaclDatas.TechInfo = a.DA;

                        $('#ScoreA').val(parseInt(a.Ascore1) + parseInt(a.Ascore2) + parseInt(a.Ascore3) + parseInt(a.Ascore4));
                        $('#SectionScoreA1').val(a.Ascore1);
                        $('#SectionScoreA2').val(a.Ascore2);
                        $('#SectionScoreA3').val(a.Ascore3);
                        $('#SectionScoreA4').val(a.Ascore4);
                        $('#SectionScoreA5').val(a.Ascore5);

                        $('#ScoreB').val(parseInt(a.Bscore1) + parseInt(a.Bscore2) + parseInt(a.Bscore3) + parseInt(a.Bscore4));
                        $('#SectionScoreB1').val(a.Bscore1);
                        $('#SectionScoreB2').val(a.Bscore2);
                        $('#SectionScoreB3').val(a.Bscore3);
                        $('#SectionScoreB4').val(a.Bscore4);
                        $('#SectionScoreB5').val(a.Bscore5);

                    });
                }
                else {
                    alert("提交失败！");
                }
            });

            me.EntryScoreEdit2(me.Datas.cIndex);
        }
        catch (e) {; }
    },

    //设置比赛开始状态（上、下半场，加时赛，点球赛）
    EndNext: function (Index) {
        var me = Result;
        try {
            var aInfo = {
                SectionOrder: Index + '',
                MatchID: me.Datas.LoaclDatas.ResultSessionInfo[me.Datas.cIndex].ID
            }
            Ac.acExecuteSql(me.Path.EndNext, aInfo, function (aRes) {
                if (aRes.State == 1) {

                    Ac.acGetTable(me.Path.getScore, { MatchID: me.Datas.LoaclDatas.ResultSessionInfo[me.Datas.cIndex].ID + '', ParticipantAID: $("#EntryScore_ParticipantAID").val(), ParticipantBID: $("#EntryScore_ParticipantBID").val() }, function (aRes) {
                        var a = aRes.Datas.DA[0];
                        //me.Datas.LoaclDatas.TechInfo = a.DA;

                        $('#ScoreA').val(parseInt(a.Ascore1) + parseInt(a.Ascore2) + parseInt(a.Ascore3) + parseInt(a.Ascore4));
                        $('#SectionScoreA1').val(a.Ascore1);
                        $('#SectionScoreA2').val(a.Ascore2);
                        $('#SectionScoreA3').val(a.Ascore3);
                        $('#SectionScoreA4').val(a.Ascore4);
                        $('#SectionScoreA5').val(a.Ascore5);

                        $('#ScoreB').val(parseInt(a.Bscore1) + parseInt(a.Bscore2) + parseInt(a.Bscore3) + parseInt(a.Bscore4));
                        $('#SectionScoreB1').val(a.Bscore1);
                        $('#SectionScoreB2').val(a.Bscore2);
                        $('#SectionScoreB3').val(a.Bscore3);
                        $('#SectionScoreB4').val(a.Bscore4);
                        $('#SectionScoreB5').val(a.Bscore5);

                    });
                }
                else {
                    alert("提交失败！");
                }
            });
            me.EntryScoreEdit2(me.Datas.cIndex);
        }
        catch (e) {; }
    },

    //比赛调整成为延误状态
    DelayedStatus: function () {
        var me = Result;
        try {

            var aFlag = window.confirm("即将进入延误状态？");
            if (aFlag) {
                var cb = document.getElementsByName("input[]");
                var ID = '';
                var str = ',';
                for (var i = 0; i < cb.length; i++) {

                    if (cb[i].checked) {

                        for (var i = 0; i < cb.length; i++) {
                            if (cb[i].checked) {
                                ID = ID + me.Datas.LoaclDatas.ResultSessionInfo[i].ID + str;
                            }
                        }
                        if (ID.length > 0) {
                            ID = ID.substr(0, ID.length - 1);
                        }
                        //ID = ID + me.Datas.LoaclDatas.ResultSessionInfo[cb.length].ID
                        //me.Datas.Index = i;

                    }
                }
                //me.Datas.Index = i;
                Ac.acExecuteSql(me.Path.MatchDelayedStatus, { ID: ID }, function (aRes) {
                    if (aRes.State == 1) {
                       
                    }
                    else {
                        alert("提交失败！");
                    }
                });

                me.LoadResultSession();
                ODF.Get_DT_SCHEDULE_UPDATE();
            }
        }
        catch (e) {; }
    },

    //监控比赛状态，更改样式
    editStatusClass: function () {
        var me = Result;
        for (var i = 0; i < me.Datas.LoaclDatas.ResultSessionInfo.length; i++) {
            if (me.Datas.LoaclDatas.ResultSessionInfo[i].MatchScheduleStatus == 'RUNNING') {
                $("#statusClass-"+ i).removeClass("label-primary");
                $("#statusClass-"+ i).removeClass("label-warning");
                $("#statusClass-"+ i).addClass("label-success");
            } else if (me.Datas.LoaclDatas.ResultSessionInfo[i].MatchScheduleStatus == 'FINISHED') {
                $("#statusClass-"+ i).removeClass("label-warning");
                $("#statusClass-"+ i).removeClass("label-primary")
                $("#statusClass-"+ i).addClass("label-danger");
            } else if (me.Datas.LoaclDatas.ResultSessionInfo[i].MatchScheduleStatus == 'DELAYED') {
                $("#statusClass-" + i).removeClass("label-warning");
                $("#statusClass-" + i).removeClass("label-primary");
                $("#statusClass-" + i).removeClass("label-danger");
                $("#statusClass-" + i).addClass("label-warning");
            }
        }
    
    },
    //比赛调整成为如期状态
    ScheduleStatus: function () {
        var me = Result;
        try {

            var aFlag = window.confirm("进入如期状态？");
            if (aFlag) {
                var cb = document.getElementsByName("input[]");
                var ID = '';
                var str = ',';
                for (var i = 0; i < cb.length; i++) {

                    if (cb[i].checked) {

                        for (var i = 0; i < cb.length; i++) {
                            if (cb[i].checked) {
                                ID = ID + me.Datas.LoaclDatas.ResultSessionInfo[i].ID + str;
                            }
                        }
                        if (ID.length > 0) {
                            ID = ID.substr(0, ID.length - 1);
                        }
                        //ID = ID + me.Datas.LoaclDatas.ResultSessionInfo[cb.length].ID
                        //me.Datas.Index = i;

                    }
                }
                //me.Datas.Index = i;
                Ac.acExecuteSql(me.Path.MatchScheduleStatus, { ID: ID }, function (aRes) {
                    if (aRes.State == 1) {
                    }
                    else {
                        alert("提交失败！");
                    }
                });

                me.LoadResultSession();
                ODF.Get_DT_SCHEDULE_UPDATE();
            }
        }
        catch (e) {; }
    },
   
    //比赛调整成为开始状态
    StartStatus: function () {
        var me = Result;
        try {

            var aFlag = window.confirm("即将进入开始状态？");
            if (aFlag) {
                var cb = document.getElementsByName("input[]");
                var ID = '';
                var str = ',';
                for (var i = 0; i < cb.length; i++) {

                    if (cb[i].checked) {

                        for (var i = 0; i < cb.length; i++) {
                            if (cb[i].checked) {
                                ID = ID + me.Datas.LoaclDatas.ResultSessionInfo[i].ID + str;
                            }
                        }
                        if (ID.length > 0) {
                            ID = ID.substr(0, ID.length - 1);
                        }
                        //ID = ID + me.Datas.LoaclDatas.ResultSessionInfo[cb.length].ID
                        //me.Datas.Index = i;

                    }
                }
                //me.Datas.Index = i;
                Ac.acExecuteSql(me.Path.MatchStartStatus, { ID: ID }, function (aRes) {
                    if (aRes.State == 1) {
                       
                    }
                    else {
                        alert("提交失败！");
                    }
                });

                me.LoadResultSession();
                ODF.Get_DT_SCHEDULE_UPDATE();
            }
        }
        catch (e) {; }
    },
   
    //比赛调整成为中场休息状态
    BreakStatus: function () {
        var me = Result;
        try {

            var aFlag = window.confirm("即将进入中场休息状态？");
            if (aFlag) {
                var cb = document.getElementsByName("input[]");
                var ID = '';
                var str = ',';
                for (var i = 0; i < cb.length; i++) {

                    if (cb[i].checked) {

                        for (var i = 0; i < cb.length; i++) {
                            if (cb[i].checked) {
                                ID = ID + me.Datas.LoaclDatas.ResultSessionInfo[i].ID + str;
                            }
                        }
                        if (ID.length > 0) {
                            ID = ID.substr(0, ID.length - 1);
                        }
                        //ID = ID + me.Datas.LoaclDatas.ResultSessionInfo[cb.length].ID
                        //me.Datas.Index = i;

                    }
                }
                //me.Datas.Index = i;
                Ac.acExecuteSql(me.Path.MatchBreakStatus, { ID: ID}, function (aRes) {
                    if (aRes.State == 1) {
                    }
                    else {
                        alert("提交失败！");
                    }
                });

                me.LoadResultSession();
                ODF.Get_DT_SCHEDULE_UPDATE();
            }
        }
        catch (e) {; }
    },
    //比赛调整成为结束状态
   FinishedStatus: function () {
       var me = Result;
       try {

           var aFlag = window.confirm("即将进入结束状态？");
           if (aFlag) {
               var cb = document.getElementsByName("input[]");
               var ID = '';
               var str = ',';
               for (var i = 0; i < cb.length; i++) {

                   if (cb[i].checked) {

                       for (var i = 0; i < cb.length; i++) {
                           if (cb[i].checked) {
                               ID = ID + me.Datas.LoaclDatas.ResultSessionInfo[i].ID + str;
                           }
                       }
                       if (ID.length > 0) {
                           ID = ID.substr(0, ID.length-1);
                       }
                       //ID = ID + me.Datas.LoaclDatas.ResultSessionInfo[cb.length].ID
                       //me.Datas.Index = i;

                   }
               }
               //me.Datas.Index = i;
               Ac.acExecuteSql(me.Path.MatchFinishedStatus, { ID: ID }, function (aRes) {
                   if (aRes.State == 1) {
                   }
                   else {
                       alert("提交失败！");
                   }
               });

               me.LoadResultSession();
               ODF.Get_DT_SCHEDULE_UPDATE();
           }
       }
       catch (e) {; }
   },
    //编辑小组成绩信息 数据回显 小组成绩信息 
   showTeamTableDlg: function (Index) {
       var me = Result;
       try {
           var aItem = me.Datas.LoaclDatas.TeamStatisticInfo[Index];
           // me.Datas.CurItemID = aItem.ID;
           me.Datas.hIndex = Index;
           var aDlg = $("#myModal");
           aDlg.on('shown.bs.modal', function () {
               $("#ParticipantName").val(aItem.ParticipantName);
               $("#ParticipantLocalName").val(aItem.ParticipantLocalName);
               $("#GroupRank").val(aItem.Rank);
               $("#GroupPoints").val(aItem.GroupPoints);
               $("#MatchsPlayed").val(aItem.MatchsPlayed);
               $("#WonNumber").val(aItem.WonNumber);
               $("#DrawnNumber").val(aItem.DrawnNumber);
               $("#LostNumber").val(aItem.LostNumber);
               $("#GoalFor").val(aItem.GoalFor);
               $("#GoalAgainst").val(aItem.GoalAgainst);
               $("#GoalDifference").val(aItem.GoalDifference);
           }).on('hidden.bs.modal', function () {
               me.LoadTeamStatistic();
           });
           aDlg.modal('toggle');
       }

       catch (e) {; }
   },
    //表单Post 提交小组成绩信息
   doTeamTablePost: function () {
       var me = Result;
       try {
          
           var aInfo = {
               ID: me.Datas.LoaclDatas.TeamStatisticInfo[me.Datas.hIndex].ID,             
               GroupPoints: $("#GroupPoints").val(),
               GroupRank: $("#GroupRank").val(),
               MatchsPlayed: $("#MatchsPlayed").val(),
               WonNumber: $("#WonNumber").val(),
               DrawnNumber: $("#DrawnNumber").val(),
               LostNumber: $("#LostNumber").val(),
               GoalFor: $("#GoalFor").val(),
               GoalAgainst: $("#GoalAgainst").val(),
               GoalDifference: $("#GoalDifference").val()
           };
           var aPath = me.Path.editTeamTable;
           Ac.acExecuteSql(aPath, aInfo, function (aRes) {
               if (aRes.State == 1) {
                   var aDlg = $("#myModal");
                   aDlg.on('shown.bs.modal', function () {

                   }).on('hidden.bs.modal', function () {
                      
                       me.LoadGroup();
                   });
                   aDlg.modal('toggle');
               }
               else {
                   aDlg.modal('toggle');
                   alert("提交失败！");
               }
           });
       }

       catch (e) {; }
   },
  //checkbox单选
    selectCheckOne:function(obj){
    	//alert("this is SigCheckbox");
    	var checks = document.getElementsByName("participantcheckbox");
        if(obj.checked){
            for( var i=0;i<checks.length;i++){
            checks[i].checked=false;
            }
            obj.checked=true;
        }else{
            for( var i=0;i<checks.length;i++){
            checks[i].checked=false;
            }
        }
    },
    //全选勾选
    allselect: function () {
        //alert("this is allselect!!!");
        if ($('#allselectcheckbox').is(':checked')) {
            $("input[name='PlayerBox']:checkbox").each(function () {
                $(this).attr("checked", true);
            });
        } else {
            $("input[name='PlayerBox']:checkbox").each(function () {
                $(this).attr("checked", false);
            });
        }
    },

    
     //全选勾选
    AllAthleteSelect: function () {
            //alert("this is allselect!!!");
        if ($('#allAthleteSelected').is(':checked')) {
            $("input[name='AthleteBox']:checkbox").each(function () {
                    $(this).attr("checked", true);
                });
            } else {
            $("input[name='AthleteBox']:checkbox").each(function () {
                    $(this).attr("checked", false);
                });
            }
        },
    
    //加载表单
    DataTables: function () {
        var me = Result;
        $('.dataTables-example').DataTable({
            pageLength: 25,
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
 
    fnDes: function (Index) {
        $(".dataTables-example").dataTable().fnDestroy();
        $("#Athlete").dataTable().fnDestroy();
        for (var i = 0; i < Index; i++) {
            $("#DataTables_Table_"+i).dataTable().fnDestroy();
        }
    }
	
	
}