


var Shedule = {
    Datas: {
        DataKey: "",
        ID:null,
        aIndex: null,
        bIndex: null,
        CurIndex: null,
        LoaclDatas: {
            EventInfo: [],
            PhaseInfo: [],
            MatchInfo: [],
            MatchLInfo: [],
            LocationInfo:[],
            MatchAth: [],
            MatchSessionInfo:[],
            MatchSession: [],
            ScheduleInfo: [],
            SessionInfo: [],
            Menus: {
                Index: 0,
                Items: [
                    { Key: "" },
                ]
            }
        }
    },
    Tpls: {
        tplGP: { P: "Modules/Shedule/tplGP.htm", C: "" },
        tplSchTree: { P: "Modules/Shedule/tplSchTree.htm", C: "" },
        tplTurnEdit: { P: "Modules/Shedule/tplTurnEdit.htm", C: "" },
        tplGameEdit: { P: "Modules/Shedule/tplGameEdit.htm", C: "" },
        tplPMTree: { P: "Modules/Shedule/tplPMTree.htm", C: "" },
        tplVenueOption: { P: "Modules/Shedule/tplVenueOption.htm", C: "" },
        tplLocationOption: { P: "Modules/Shedule/tplLocationOption.htm", C: "" },
        tplGroupOption: { P: "Modules/Shedule/tplGroupOption.htm", C: "" },
        tplEventOption: { P: "Modules/Shedule/tplEventOption.htm", C: "" },
        tplMLEventOption: { P: "Modules/Shedule/tplMLEventOption.htm", C: "" },
        tplPhaseOption: { P: "Modules/Shedule/tplPhaseOption.htm", C: "" },
        tplMLPhaseOption: { P: "Modules/Shedule/tplMLPhaseOption.htm", C: "" },
        tplSessionUnit:{ P: "Modules/Shedule/tplSessionUnit.htm", C: "" },
        tplScheduleOption:{ P: "Modules/Shedule/tplScheduleOption.htm", C: "" },
        tplSessionEventOption: { P: "Modules/Shedule/tplSessionEventOption.htm", C: "" },
        tplSessionPhaseOption: { P: "Modules/Shedule/tplSessionPhaseOption.htm", C: "" },
        tplMatchList: { P: "Modules/Shedule/tplMatchList.htm", C: "" },
        tplAthleteList: { P: "Modules/Shedule/tplAthleteList.htm", C: "" },
        tplMatchAth: { P: "Modules/Shedule/tplMatchAth.htm", C: "" },

        tplLocationList: { P: "Modules/Shedule/tplLocationList.htm", C: "" },
        tplMatchTable: { P: "Modules/Shedule/tplMatchTable.htm", C: "" },

        tplTabs:{ P: "Modules/Shedule/tplTabs.htm", C: "" },
        tplTab2: { P: "Modules/Shedule/tplTab2.htm", C: "" },
        tplSessionMatch: { P: "Modules/Shedule/tplSessionMatch.htm", C: "" },
        tplSessionOption: { P: "Modules/Shedule/tplSessionOption.htm", C: "" },
        tplGEventOption: { P: "Modules/Shedule/tplGEventOption.htm", C: "" },
        tplGroupList: { P: "Modules/Shedule/tplGroupList.htm", C: "" },
        tplGroupMatchList: { P: "Modules/Shedule/tplGroupMatchList.htm", C: "" },
        tplParticipantTable: { P: "Modules/Shedule/tplParticipantTable.htm", C: "" },

    },
    Path: {
        getPhase: "Shedule/getPhase.txt",
        getPhaseByEventID: "Shedule/getPhaseByEventID.txt",
        getMatch: "Shedule/getMatch.txt",
        getMatchD: "Shedule/getMatchD.txt",
        getPhaseD: "Shedule/getPhaseD.txt",
        getMatchByPhaseID: "Shedule/getMatchByPhaseID.txt",
        getTeamMatchByPhaseID: "Shedule/getTeamMatchByPhaseID.txt",
        getMatchLByPhaseID: "Shedule/getMatchLByPhaseID.txt",
        getParticipant: "Shedule/getParticipant.txt",

        getAthByEventID: "Shedule/getAthByEventID.txt",

        getLocation: "Shedule/getLocation.txt",
        getGroup: "Shedule/getGroup.txt",

        newTurn: "Shedule/newTurn.txt",
        editTurn: "Shedule/editTurn.txt",
        deletePhase: "Shedule/deletePhase.txt",

        getEventPhase:"Shedule/getEventPhase.txt",

        newMatch: "Shedule/newMatch.txt",
        newBeMatch: "Shedule/newBeMatch.txt",
        newMatchTime: "Shedule/newMatchTime.txt",
        editMatch: "Shedule/editMatch.txt",
        deleteMatch: "Shedule/deleteMatch.txt",
        updateMatchLocation: "Shedule/updateMatchLocation.txt",
        newPhase: "Shedule/newPhase.txt",
        getGroupPhase: "Shedule/getGroupPhase.txt",
        newGroupMatch: "Shedule/newGroupMatch.txt",
        newGroup: "Shedule/newGroup.txt",

        getEventTeam: "Shedule/getEventTeam.txt",
        MatchAth: "Shedule/MatchAth.txt",
        TeamMatchAth: "Shedule/TeamMatchAth.txt",
        delMatchAth: "Shedule/delMatchAth.txt",

        getSchedule: "Shedule/getSchedule.txt",
        getSession: "Shedule/getSession.txt",
        setUnitStatus: "Shedule/setUnitStatus.txt",
        getSessionMatch: "Shedule/getSessionMatch.txt",
        getSessionMatchByPhaseID: "Shedule/getSessionMatchByPhaseID.txt",
        getSessionInfo: "Shedule/getSessionInfo.txt",
        setSession: "Shedule/setSession.txt",

        getTEvent: "Shedule/getTEvent.txt",
        getGroupE: "Shedule/getGroupE.txt",
        getGroupMatch: "Shedule/getGroupMatch.txt",
        getGroupParticipant: "Shedule/getGroupParticipant.txt",
        newGroupParticipant: "Shedule/newGroupParticipant.txt",
        upGroupParticipant: "Shedule/upGroupParticipant.txt",
        getGroupParticipantNum: "Shedule/getGroupParticipantNum.txt",
        newaGroupMatch: "Shedule/newaGroupMatch.txt",
    },
    //加载赛事编排模块信息
    LoadMatchSch: function () {
        var me = Shedule;
        try {
            hhls.GetTpls(me.Tpls, function () {
                hhls.fillElement("#SJH", me.Tpls.tplGP.C);
                hhls.fillElement("#tab-1", me.Tpls.tplSchTree.C);               

                me.LoadPMTree();
            });
        }
        catch (e) {; }
    },
    //加载赛事编排模块信息
    LoadPMTree: function () {
        var me = Shedule;
        try {
           // hhls.GetTpls(me.Tpls, function () {
                Ac.acGetTable(Sign.Path.getEvent, {}, function (aRes) {
                    var a = aRes.Datas;
                    me.Datas.LoaclDatas.EventInfo = a.DA;
                    Ac.acGetTable(me.Path.getPhase, {}, function (aRes) {
                        var b = aRes.Datas;
                        me.Datas.LoaclDatas.PhaseInfo = b.DA;
                        Ac.acGetTable(me.Path.getMatch, {}, function (aRes) {
                            var c = aRes.Datas;
                            me.Datas.LoaclDatas.MatchInfo = c.DA;
                            var aHtml = bt(me.Tpls.tplPMTree.C, { tplDataA: a.DA, tplDataB: b.DA, tplDataC: c.DA });
                            hhls.fillElement("#schTree", aHtml);

                            //给树形菜单绑定鼠标右击事件
                            $('.dd-handle').mousedown(function (event) {
                                if (event.which == 3) {
                                    $("#rk_menuitem").unbind();
                                    $("#rk_menuitem1").unbind();
                                    $("#rk_menuitem2").unbind();
                                    $("#rk_menuitem3").unbind();
                                    $("#rk_menuitem4").unbind();
                                    var itemId = $(this).attr('id');
                                    me.ShowMenu(itemId);
                                } else {
                                    
                                }
                            });

                            //实现点击document，自定义菜单消失
                            document.onclick = function () {
                                $('#rk_menubox').hide();
                            }
                            //实现滚轮滑动，自定义菜单消失
                            $("body,div").scroll(function () {
                                $('#rk_menubox').hide();
                            });
                            window.onscroll = function () {
                                $('#rk_menubox').hide();
                            }
                            // 屏蔽浏览器自带的右键
                            document.oncontextmenu = function (event) {
                                    return false;
                            };

                        });
                    });
                });

                
          //  });
        }
        catch (e) {; }
    },
    //加载右击弹出的菜单
    ShowMenu: function (itemId) {
        var me = Shedule;
        try {
            var index = itemId.lastIndexOf("\-");
            var ID = itemId.substring(index + 1, itemId.length);

            var idName = itemId.substring(0, index);
            if (idName == 'Match') {
                //alert(itemId);
                $('#rk_menubox').show();
                $('#rk_menuitem2').hide();
                $('#rk_menuitem3').hide();
                $('#rk_menuitem4').hide();
                $('#rk_menuitem').show();
                $('#rk_menuitem1').show();
                $('#rk_menubox').css("left", document.body.scrollLeft + event.clientX + 1 - 200);
                $('#rk_menubox').css("top", document.body.scrollLeft + event.clientY + 10 - 150);
                //删除按钮 绑定事件
                $("#rk_menuitem").on("click", function () {
                    me.DeleteMatch(ID);
                });
                //编辑按钮 绑定事件
                $("#rk_menuitem1").on("click", function () {
                    me.EditMatch(ID);
                });
            } else if (idName == 'Phase') {
                $('#rk_menubox').show();
                $('#rk_menuitem').show();
                $('#rk_menuitem1').show();
                $('#rk_menuitem2').show();
                $('#rk_menuitem3').show();
                $('#rk_menuitem4').hide();
                $('#rk_menubox').css("left", document.body.scrollLeft + event.clientX + 1 - 200);
                $('#rk_menubox').css("top", document.body.scrollLeft + event.clientY + 10 - 150);
                //删除按钮 绑定事件
                $("#rk_menuitem").on("click", function () {
                    me.DeletePhase(ID);
                });
                //编辑按钮 绑定事件
                $("#rk_menuitem1").on("click", function () {
                    me.EditPhase(ID);
                });
                //批量建立按钮 绑定事件
                $("#rk_menuitem2").on("click", function () {
                    me.ShowBeDlg(ID);
                });

                //批量给场次时间 绑定事件
                $("#rk_menuitem3").on("click", function () {
                    me.ShowMatchTimeDlg(ID);
                });
            } else if (idName == 'Event') {
                $('#rk_menubox').show();
                $('#rk_menuitem').hide();
                $('#rk_menuitem1').hide();
                $('#rk_menuitem2').hide();
                $('#rk_menuitem3').hide();
                $('#rk_menuitem4').show();
                $('#rk_menubox').css("left", document.body.scrollLeft + event.clientX + 1 - 200);
                $('#rk_menubox').css("top", document.body.scrollLeft + event.clientY + 10 - 150);

                //编排按钮 绑定事件
                $("#rk_menuitem4").on("click", function () {
                    me.SheduleTeam(ID);
                });
            }


        }
        catch (e) {; }
    },
    //编排 乒乓球小组赛
    SheduleTeam:function(ID){
        var me = Shedule;
        try {
            var aDlg = $("#TTModal");

            aDlg.on('shown.bs.modal', function () {
                me.Datas.ID = ID;
                $('#EventID').val(ID);
            }).on('hidden.bs.modal', function () {

            });
            aDlg.modal('toggle');
        }
        catch (e) {; }
    },
    //提交小组赛编排
    PostTTShedule: function () {
        var me = Shedule;
        try {
            var EventID = $('#EventID').val();
            var EventCode = $('#EventCode' + me.Datas.ID).val();
            var ParticipantNum = $('#ParticipantNum').val();
            var GroupNum = $('#GroupNum').val();
            var eachNum = parseInt(ParticipantNum) / parseInt(GroupNum);
            var GroupMatch = parseInt(GroupNum) * parseInt(eachNum) * (parseInt(eachNum) - 1) / 2;

            var aInfo = {
                EventID: EventID,
                EventCode: EventCode,
                GroupNum: GroupNum
            }
            var aPath = me.Path.newPhase;
            Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                if (aRes.State == 1) {

                    //Ac.acGetTable(me.Path.getGroupPhase, { EventID: EventID }, function (aRes) {
                    //    var a = aRes.Datas.DA[0];


                        var aInfo = {
                            EventID: EventID,
                           // PhaseID: a.ID,
                            //PhaseCode: a.PhaseCode,
                            GroupMatch: GroupMatch + '',
                        }

                        var aPath = me.Path.newGroupMatch;
                        Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                            if (aRes.State == 1) {
                                me.LoadPMTree();

                                var aDlg = $("#TTModal");
                                aDlg.on('shown.bs.modal', function () {
                                }).on('hidden.bs.modal', function () {

                                });
                                aDlg.modal('toggle');
                            }
                            else {
                                alert("提交失败！");
                            }
                        });
                    //});
                }
                else {
                    alert("提交失败！");
                }
            });


        }
        catch (e) {; }
    },

    ShowMatchGroupDlg: function () {
        var me = Shedule;
        try {
            var aDlg = $("#MGModal");

            aDlg.on('shown.bs.modal', function () {
                Ac.acGetTable(me.Path.getTEvent, {}, function (aRes) {
                    var a = aRes.Datas;
                    var aHtml = bt(me.Tpls.tplGEventOption.C, { tplData: a.DA });
                    hhls.fillElement("#EventSelect", aHtml);
                    //加载下拉框选择插件
                    $('.chosen-select').chosen({ width: "100%" });

                    me.GetGroup();

                });

            }).on('hidden.bs.modal', function () {

            });
            aDlg.modal('toggle');
        }
        catch (e) {; }
    },

    GetGroup: function () {
        var me = Shedule;
        try {
            var ID = $("#EventSelect option:selected").val()
            Ac.acGetTable(me.Path.getGroupE, { EventID: ID }, function (aRes) {
                var a = aRes.Datas;
                me.Datas.LoaclDatas.GroupInfo = a.DA;
                var aHtml = bt(me.Tpls.tplGroupList.C, { tplData: a.DA });
                hhls.fillElement("#GroupList", aHtml);
            });

            Ac.acGetTable(me.Path.getGroupParticipant, { EventID: ID }, function (aRes) {
                var a = aRes.Datas;
                me.Datas.LoaclDatas.GroupParticipantInfo = a.DA;
                var aHtml = bt(me.Tpls.tplParticipantTable.C, { tplData: a.DA });
                hhls.fillElement("#ParticipantTable", aHtml);
            });


            //Ac.acGetTable(me.Path.getGroupMatch, { EventID: ID }, function (aRes) {
            //    var a = aRes.Datas;
            //    //    me.Datas.LoaclDatas.GroupParticipantInfo = a.DA;
            //    var aHtml = bt(me.Tpls.tplGroupMatchList.C, { tplData: a.DA });
            //    hhls.fillElement("#GroupMatch", aHtml);
            //});
        }
        catch (e) {; }
    },
    //小组赛 给每组添加比赛
    NewGroupMatch:function(ID){
        var me = Shedule;
        try {

                Ac.acGetTable(me.Path.getGroupParticipantNum, { GroupID: ID }, function (aRes) {
                    var a = aRes.Datas;
                    var GroupMatch = parseInt(a.DA[0].GroupNum) * (parseInt(a.DA[0].GroupNum) - 1) / 2;

                    var aFlag = window.confirm("确定建立比赛？");
                    if (aFlag) {
                        Ac.acExecuteSql(me.Path.newaGroupMatch, { GroupID: ID+'', GroupMatch: GroupMatch+'' }, function (aRes) {
                            if (aRes.State == 1) {
                                me.LoadPMTree();
                            }
                            else {
                                alert("提交失败！");
                            }
                        });
                     }

                });


        }
        catch (e) {; }
    },
    //提交 对参赛队分组的批量处理
    PostGroupParticipant: function (ID) {
        var me = Shedule;
        try {
            var GroupID;
            var Group = document.getElementsByName("Group[]");
            var GroupParticipant = document.getElementsByName("GroupParticipant[]");
            for (var i = 0; i < Group.length; i++) {
                if (Group[i].checked) {
                    GroupID = me.Datas.LoaclDatas.GroupInfo[i].ID;

                    for (var j = 0; j < GroupParticipant.length; j++) {
                        if (GroupParticipant[j].checked && me.Datas.LoaclDatas.GroupParticipantInfo[j].GroupName=='') {

                            //新增GroupParticipant表
                            Ac.acExecuteSql(me.Path.newGroupParticipant, { ParticipantID: ID + '', GroupID: GroupID }, function (aRes) {
                                if (aRes.State == 1) {
                                    var ID = $("#EventSelect option:selected").val()
                                    Ac.acGetTable(me.Path.getGroupParticipant, { EventID: ID }, function (aRes) {
                                        var a = aRes.Datas;
                                        me.Datas.LoaclDatas.GroupParticipantInfo = a.DA;
                                        var aHtml = bt(me.Tpls.tplParticipantTable.C, { tplData: a.DA });
                                        hhls.fillElement("#ParticipantTable", aHtml);
                                    });
                                }
                                else {
                                    alert("提交失败！");
                                }
                            });
                        } else if (GroupParticipant[j].checked && me.Datas.LoaclDatas.GroupParticipantInfo[j].GroupName != '') {
                            //更新GroupParticipant表 
                            Ac.acExecuteSql(me.Path.upGroupParticipant, { ID: me.Datas.LoaclDatas.GroupParticipantInfo[j].ID + '', GroupID: GroupID }, function (aRes) {
                                if (aRes.State == 1) {
                                    var ID = $("#EventSelect option:selected").val()
                                    Ac.acGetTable(me.Path.getGroupParticipant, { EventID: ID }, function (aRes) {
                                        var a = aRes.Datas;
                                        me.Datas.LoaclDatas.GroupParticipantInfo = a.DA;
                                        var aHtml = bt(me.Tpls.tplParticipantTable.C, { tplData: a.DA });
                                        hhls.fillElement("#ParticipantTable", aHtml);
                                    });
                                }
                                else {
                                    alert("提交失败！");
                                }
                            });
                        }
                    }
                }
            }


        }
        catch (e) {; }
    },
    //加载批量建立场地的模态框
    ShowMatchLocationDlg:function(){
        var me = Shedule;
        try {
            var aDlg = $("#MLModal");

            aDlg.on('shown.bs.modal', function () {
                //Ac.acGetTable(me.Path.getEventPhase, { ID: ID }, function (aRes) {
                //    var a = aRes.Datas;

                //});
                me.LoadMLEventSelect();
                me.PostMatchLocation();

            }).on('hidden.bs.modal', function () {

            });
            aDlg.modal('toggle');
        }
        catch (e) {; }
    },
    //加载批量建立场次的模态框
    ShowBeDlg:function(ID){
        var me = Shedule;
        try {
            var aDlg = $("#beModal");

            aDlg.on('shown.bs.modal', function () {
                Ac.acGetTable(me.Path.getEventPhase, {ID:ID}, function (aRes) {
                    var a = aRes.Datas;
                    $("#EventName").val(a.DA[0].EventName);
                    $("#PhaseID").val(ID);
                    $("#PhaseCode").val(a.DA[0].PhaseCode);
                    $("#PhaseOrder").val(a.DA[0].PhaseOrder);
                    $("#PhaseName").val(a.DA[0].PhaseName);
                });

            }).on('hidden.bs.modal', function () {

            });
            aDlg.modal('toggle');
        }
        catch (e) {; }
    },
    //提交批量建立场次数据
    PostBeMatch:function(){
        var me = Shedule;
        try {
            var PhaseID = $("#PhaseID").val();
            var PhaseCode = $("#PhaseCode").val();
            var PhaseOrder = $("#PhaseOrder").val();
            var sNum =parseInt($("#MatchNum1").val()) ;
            var eNum = parseInt($("#MatchNum2").val());

            var count =eNum - sNum;

                var aInfo = {
                    sNum: sNum+'',
                    count: count + '',
                    PhaseCode:PhaseCode,
                    PhaseID: PhaseID,
                    PhaseOrder: PhaseOrder,
                }
                var aPath = me.Path.newBeMatch;
                Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                    if (aRes.State == 1) {
                        me.LoadPMTree();

                        var aDlg = $("#beModal");
                        aDlg.on('shown.bs.modal', function () {
                        }).on('hidden.bs.modal', function () {
                            $("#EventName").val('');
                            $("#PhaseID").val('');
                            $("#PhaseCode").val('');
                            $("#PhaseOrder").val('');
                            $("#PhaseName").val('');
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
    //加载 批量给定场次时间 模态框
    ShowMatchTimeDlg:function(ID){
        var me = Shedule;
        try {
            var aDlg = $("#MTModal");

            aDlg.on('shown.bs.modal', function () {
                Ac.acGetTable(me.Path.getEventPhase, { ID: ID }, function (aRes) {
                    var a = aRes.Datas;
                    $("#EventName1").val(a.DA[0].EventName);
                    $("#PhaseID1").val(ID);
                    $("#PhaseCode1").val(a.DA[0].PhaseCode);
                    $("#PhaseOrder1").val(a.DA[0].PhaseOrder);
                    $("#PhaseName1").val(a.DA[0].PhaseName);
                });
                CommonData.LoadDatePick();
            }).on('hidden.bs.modal', function () {

            });
            aDlg.modal('toggle');
        }
        catch (e) {; }
    },
    //提交批量建立场次时间数据
    PostMatchTime: function () {
        var me = Shedule;
        try {
            var PhaseID = $("#PhaseID1").val();
            var PhaseCode = $("#PhaseCode1").val();
            var PhaseOrder = $("#PhaseOrder1").val();
            var BeginTime = $("#BeginTime1").val();
            var sNum = parseInt($("#MatchNum11").val());
            var eNum = parseInt($("#MatchNum21").val());

            var count = eNum - sNum;

            var aInfo = {
                sNum: sNum + '',
                count: count + '',
                PhaseID: PhaseID,
                BeginTime: BeginTime,
            }
            var aPath = me.Path.newMatchTime;
            Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                if (aRes.State == 1) {
                    me.LoadPMTree();

                    var aDlg = $("#MTModal");
                    aDlg.on('shown.bs.modal', function () {
                    }).on('hidden.bs.modal', function () {
                        $("#EventName1").val('');
                        $("#PhaseID1").val('');
                        $("#PhaseCode1").val('');
                        $("#PhaseOrder1").val('');
                        $("#PhaseName1").val('');
                        $("#BeginTime1").val('');
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
    //加载轮次编辑模块
    ShowNewTurnEdit: function (Index) {
        var me = Shedule;
        try {
            me.Datas.CurIndex = -1;
            $("#GameEdit").hide();
            $("#TurnEdit").show();
            me.Datas.Index = Index;
            hhls.GetTpls(me.Tpls, function () {

                hhls.fillElement("#TurnEdit", me.Tpls.tplTurnEdit.C);
                $('#EventID').val(me.Datas.LoaclDatas.EventInfo[Index].ID);
                $('#EventName').val(me.Datas.LoaclDatas.EventInfo[Index].EventName);
            });
        }
        catch (e) {; }
    },
    //删除轮及下面场次信息
    DeletePhase: function (ID) {
        var me = Shedule;
        try {
            var aInfo = {
                ID: ID,
            };
            var aPath = me.Path.deletePhase;
            var aFlag = window.confirm("是否确定删除轮次信息？");
            if (aFlag) {
                Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                    if (aRes.State == 1) {
                        $("#GameEdit").hide();
                        $("#TurnEdit").hide();
                        $('#rk_menubox').hide();
                        me.LoadPMTree();
                    }
                    else {
                        alert("提交失败！");
                    }
                });
            }
        }
        catch (e) {; }
    },
    EditPhase:function(ID){
        var me = Shedule;
        try {
            $("#GameEdit").hide();
            $("#TurnEdit").show();
            hhls.GetTpls(me.Tpls, function () {
                hhls.fillElement("#TurnEdit", me.Tpls.tplTurnEdit.C);

            me.Datas.CurIndex = ID;
            Ac.acGetTable(me.Path.getPhaseD, { ID: ID }, function (aRes) {
                var c = aRes.Datas.DA;
                $("#EventID").val(c[0].EventID);
                $("#EventName").val(c[0].EventName);
                $("#PhaseCode").val(c[0].PhaseCode);
                $("#PhaseName").val(c[0].PhaseName);
                $("#PhaseLocalName").val(c[0].PhaseLocalName);
                $("#PhaseOrder").val(c[0].PhaseOrder);
                $("#PhaseDescription").val(c[0].PhaseDescription);
            });
            });
        }
        catch (e) {; }
    },
    //轮次添加Post
    NewTurnPost: function () {
        var me = Shedule;
        try {
            if (me.Datas.CurIndex == -1) {
                var aInfo = {
                    EventID: me.Datas.LoaclDatas.EventInfo[me.Datas.Index].ID,
                    PhaseCode: $("#PhaseCode").val(),
                    PhaseName: $("#PhaseName").val(),
                    PhaseLocalName: $("#PhaseLocalName").val(),
                    PhaseOrder: $("#PhaseOrder").val(),
                    PhaseDescription: $("#PhaseDescription").val(),

                };
                var aPath = me.Path.newTurn;
                Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                    if (aRes.State == 1) {
                        $('#EventID').val(' ');
                        //$('#EventName').val(' ');
                        $("#PhaseCode").val(' ');
                        $("#PhaseName").val(' ');
                        $("#PhaseLocalName").val(' ');
                        $("#PhaseOrder").val(' ');
                        $("#PhaseDescription").val(' ');
                        me.LoadPMTree();
                    }
                    else {
                        alert("提交失败！");
                    }
                });
            } else {
                var aInfo = {
                    ID: me.Datas.CurIndex,
                    PhaseCode: $("#PhaseCode").val(),
                    PhaseName: $("#PhaseName").val(),
                    PhaseLocalName: $("#PhaseLocalName").val(),
                    PhaseOrder: $("#PhaseOrder").val(),
                    PhaseDescription: $("#PhaseDescription").val(),

                };
                var aPath = me.Path.editTurn;
                Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                    if (aRes.State == 1) {
                        $('#EventID').val(' ');
                        //$('#EventName').val(' ');
                        $("#PhaseCode").val(' ');
                        $("#PhaseName").val(' ');
                        $("#PhaseLocalName").val(' ');
                        $("#PhaseOrder").val(' ');
                        $("#PhaseDescription").val(' ');
                        me.LoadPMTree();
                    }
                    else {
                        alert("提交失败！");
                    }
                });
            }

        }
        catch (e) {; }
    },
    //加载场次编辑模块
    ShowNewMatchEdit: function (aIndex,bIndex) {
        var me = Shedule;
        try {
            me.Datas.CurIndex = -1;
            $("#TurnEdit").hide();
            $("#GameEdit").show();
            me.Datas.aIndex = aIndex;
            me.Datas.bIndex = bIndex;
            hhls.GetTpls(me.Tpls, function () {
                
                hhls.fillElement("#GameEdit", me.Tpls.tplGameEdit.C);
                $('#EventID1').val(me.Datas.LoaclDatas.EventInfo[aIndex].ID);
                $('#EventName1').val(me.Datas.LoaclDatas.EventInfo[aIndex].EventName);

                $('#PhaseID1').val(me.Datas.LoaclDatas.PhaseInfo[bIndex].ID);
                $('#PhaseName1').val(me.Datas.LoaclDatas.PhaseInfo[bIndex].PhaseName);


                Ac.acGetTable(BaseData.Path.getVenue, {}, function (aRes) {
                    var a = aRes.Datas;
                    //me.Datas.LoaclDatas.MatchInfo = a.DA;
                    var aHtml = bt(me.Tpls.tplVenueOption.C, { tplData: a.DA });
                    hhls.fillElement("#Venue", aHtml);
                    $('.chosen-select').chosen({ width: "100%" });
                    //me.ShowNewMatchEdit();
                });

                Ac.acGetTable(me.Path.getLocation, {}, function (aRes) {
                    var a = aRes.Datas;
                   // me.Datas.LoaclDatas.MatchInfo = a.DA;
                    var aHtml = bt(me.Tpls.tplLocationOption.C, { tplData: a.DA });
                    hhls.fillElement("#Location", aHtml);
                    $('.chosen-select').chosen({ width: "100%" });
                    //me.ShowNewMatchEdit();
                });


                Ac.acGetTable(me.Path.getGroup, {}, function (aRes) {
                    var a = aRes.Datas;
                    // me.Datas.LoaclDatas.MatchInfo = a.DA;
                    var aHtml = bt(me.Tpls.tplGroupOption.C, { tplData: a.DA });
                    hhls.fillElement("#Group", aHtml);
                    $('.chosen-select').chosen({ width: "100%" });
                    //me.ShowNewMatchEdit();
                });

                CommonData.LoadDatePick();
            });
        }
        catch (e) {; }
    },
    //重新编辑场次信息
    EditMatch: function (ID) {
        var me = Shedule;
        try {
            $("#TurnEdit").hide();
            $("#GameEdit").show();

            hhls.GetTpls(me.Tpls, function () {
                hhls.fillElement("#GameEdit", me.Tpls.tplGameEdit.C);
                CommonData.LoadDatePick();

            Ac.acGetTable(BaseData.Path.getVenue, {}, function (aRes) {
                var a = aRes.Datas;
                //me.Datas.LoaclDatas.MatchInfo = a.DA;
                var aHtml = bt(me.Tpls.tplVenueOption.C, { tplData: a.DA });
                hhls.fillElement("#Venue", aHtml);
                $('.chosen-select').chosen({ width: "100%" });
                //me.ShowNewMatchEdit();
            });

            Ac.acGetTable(me.Path.getLocation, {}, function (aRes) {
                var a = aRes.Datas;
                // me.Datas.LoaclDatas.MatchInfo = a.DA;
                var aHtml = bt(me.Tpls.tplLocationOption.C, { tplData: a.DA });
                hhls.fillElement("#Location", aHtml);
                $('.chosen-select').chosen({ width: "100%" });
                //me.ShowNewMatchEdit();
            });


            Ac.acGetTable(me.Path.getGroup, {}, function (aRes) {
                var a = aRes.Datas;
                // me.Datas.LoaclDatas.MatchInfo = a.DA;
                var aHtml = bt(me.Tpls.tplGroupOption.C, { tplData: a.DA });
                hhls.fillElement("#Group", aHtml);
                $('.chosen-select').chosen({ width: "100%" });
                //me.ShowNewMatchEdit();
            });



            me.Datas.CurIndex = ID;
            Ac.acGetTable(me.Path.getMatchD, { ID: ID }, function (aRes) {
                var c = aRes.Datas.DA;
                $("#EventID1").val(c[0].EventID);
                $("#PhaseID1").val(c[0].PhaseID);
                $("#EventName1").val(c[0].EventName);
                $("#PhaseName1").val(c[0].PhaseName);
                $("#MatchCode").val(c[0].MatchCode);
                $("#MatchName").val(c[0].MatchName);
                $("#MatchLocalName").val(c[0].MatchLocalName);
                $("#GroupID").val(c[0].GroupID);
                $("#VenueID").val(c[0].VenueCode);
                $("#LocationID").val(c[0].LocationCode);
                $("#MatchOrder").val(c[0].MatchOrder);
                $("#BeginTime").val(c[0].BeginTime);
                $("#EndTime").val(c[0].EndTime);
            });

            });
        }
        catch (e) {; }
    },
    //删除场次信息
    DeleteMatch: function (ID) {
        var me = Shedule;
        try {
            var aInfo = {
                ID: ID,
            };
            var aPath = me.Path.deleteMatch;
            var aFlag = window.confirm("是否确定删除该场次信息？");
            if (aFlag) {
                Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                    if (aRes.State == 1) {
                        $("#GameEdit").hide();
                        $("#TurnEdit").hide();
                        $('#rk_menubox').hide();
                        me.LoadPMTree();
                    }
                    else {
                        alert("提交失败！");
                    }
                });
            }
        }
        catch (e) {; }
    },
    //场次次添加Post
    NewMatchPost: function () {
        var me = Shedule;
        try {
            var aPath;
            var aInfo;

            if (me.Datas.CurIndex == -1) {
                aPath = me.Path.newMatch;
                aInfo = {
                    MatchCode: $("#MatchCode").val(),
                    MatchName: $("#MatchName").val(),
                    MatchLocalName: $("#MatchLocalName").val(),
                    PhaseID: me.Datas.LoaclDatas.PhaseInfo[me.Datas.bIndex].ID,
                    GroupID: $("#GroupID option:selected").val(),
                    VenueCode: $("#VenueID option:selected").val(),
                    LocationCode: $("#LocationID option:selected").val(),
                    PhaseOrder: me.Datas.LoaclDatas.PhaseInfo[me.Datas.bIndex].PhaseOrder,
                    MatchOrder: $("#MatchOrder").val(),
                    BeginTime: null,
                    EndTime: null
                };
            } else {
                aInfo = {
                    ID: me.Datas.CurIndex,
                    MatchCode: $("#MatchCode").val(),
                    MatchName: $("#MatchName").val(),
                    MatchLocalName: $("#MatchLocalName").val(),
                    GroupID: $("#GroupID option:selected").val(),
                    VenueCode: $("#VenueID option:selected").val(),
                    LocationCode: $("#LocationID option:selected").val(),
                    MatchOrder: $("#MatchOrder").val(),
                    BeginTime: null,
                    EndTime: null
                };
                aPath = me.Path.editMatch;
            }
            aInfo.BeginTime = $("#BeginTime").val() + ' ' + $("#begintime").val();
            aInfo.EndTime = $("#EndTime").val() + ' ' + $("#endtime").val();
            
            Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                if (aRes.State == 1) {
                    $("#MatchCode").val(' '),
                    $("#MatchName").val(' '),
                    $("#MatchLocalName").val(' '),
                    $("#MatchOrder").val(' '),
                    $("#BeginTime").val(' '),
                    $("#begintime").val(' ');
                    $("#EndTime").val(' '),
                    $("#endtime").val(' ');
                    me.LoadPMTree();
                }
                else {
                    alert("提交失败！");
                }
            });
        }
        catch (e) {; }
    },
    //加载场次参赛者模块
    LoadMatchAth: function () {
        var me = Shedule;
        try {
            //me.Datas.CurIndex = 0;
            hhls.GetTpls(me.Tpls, function () {
                hhls.fillElement("#SJH", me.Tpls.tplGP.C);
                hhls.fillElement("#tab-1", me.Tpls.tplMatchAth.C);
                me.LoadEventSelect();
            });
        }
        catch (e) {; }
    },
    //加载场地编排下的项目与轮次的下拉框
    LoadMLEventSelect: function () {
        var me = Shedule;
        try {
            Ac.acGetTable(BaseData.Path.getEventInfo, {}, function (aRes) {
                var a = aRes.Datas;
                // me.Datas.LoaclDatas.MatchInfo = a.DA;
                var aHtml = bt(me.Tpls.tplMLEventOption.C, { tplData: a.DA });
                hhls.fillElement("#EventML", aHtml);
                $('.chosen-select').chosen({ width: "100%" });

                me.LoadMLPhaseSelect();
            });


        }
        catch (e) {; }
    },
    LoadMLPhaseSelect: function () {
        var me = Shedule;
        try {

            var EventID = $('#EventMLID option:selected').val();
            Ac.acGetTable(me.Path.getPhaseByEventID, { EventID: EventID }, function (aRes) {
                var a = aRes.Datas;
                // me.Datas.LoaclDatas.MatchInfo = a.DA;
                var aHtml = bt(me.Tpls.tplMLPhaseOption.C, { tplData: a.DA });
                hhls.fillElement("#PhaseML", aHtml);
                $('.chosen-select').chosen({ width: "100%" });
                me.LoadLocationMatch();
            });
        }
        catch (e) {; }
    },
    //加载 场地以及场次数据 作批量处理
    LoadLocationMatch:function(){
        var me = Shedule;
        try {

            var EventID = $('#EventMLID option:selected').val();
            var PhaseID = $('#PhaseMLID option:selected').val();
            var EventName = $('#EventMLID option:selected').text();
            var PhaseName = $('#PhaseMLID option:selected').text();
            Ac.acGetTable(me.Path.getMatchLByPhaseID, { PhaseID: PhaseID }, function (aRes) {
                var a = aRes.Datas;
                me.Datas.LoaclDatas.MatchLInfo = a.DA;
                    var aHtml = bt(me.Tpls.tplMatchTable.C, { tplData: a.DA, EventName: EventName,PhaseName:PhaseName });
                    hhls.fillElement("#MatchTable", aHtml);

            });

            Ac.acGetTable(me.Path.getLocation, {}, function (aRes) {
                var a = aRes.Datas;
                me.Datas.LoaclDatas.LocationInfo = a.DA;
                var aHtml = bt(me.Tpls.tplLocationList.C, { tplData: a.DA });
                hhls.fillElement("#LocationList", aHtml);

            });
        }
        catch (e) {; }
    },
    //提交 对场次添加场地的批处理
    PostMatchLocation:function(ID){
        var me = Shedule;
        try {
            var LocationCode;
            var location = document.getElementsByName("location[]");
            for (var i = 0; i < location.length; i++) {
                if (location[i].checked) {                   
                    LocationCode = me.Datas.LoaclDatas.LocationInfo[i].LocationCode;


                    Ac.acExecuteSql(me.Path.updateMatchLocation, { ID: ID + '', LocationCode: LocationCode }, function (aRes) {
                        if (aRes.State == 1) {
                        }
                        else {
                            alert("提交失败！");
                        }
                    });


                    var PhaseID = $('#PhaseMLID option:selected').val();
                    var EventName = $('#EventMLID option:selected').text();
                    var PhaseName = $('#PhaseMLID option:selected').text();
                    Ac.acGetTable(me.Path.getMatchLByPhaseID, { PhaseID: PhaseID }, function (aRes) {
                        var a = aRes.Datas;
                        me.Datas.LoaclDatas.MatchLInfo = a.DA;
                        var aHtml = bt(me.Tpls.tplMatchTable.C, { tplData: a.DA, EventName: EventName, PhaseName: PhaseName });
                        hhls.fillElement("#MatchTable", aHtml);

                    });

                }
            }


        }
        catch (e) {; }
    },
    //加载场次编排下的项目与轮次的下拉框
    LoadEventSelect: function () {
        var me = Shedule;
        try {
            Ac.acGetTable(BaseData.Path.getEventInfo, {}, function (aRes) {
                var a = aRes.Datas;
                // me.Datas.LoaclDatas.MatchInfo = a.DA;
                var aHtml = bt(me.Tpls.tplEventOption.C, { tplData: a.DA });
                hhls.fillElement("#Event", aHtml);
                $('.chosen-select').chosen({ width: "100%" });

                me.LoadPhaseSelect();
            });


        }
        catch (e) {; }
    },
    LoadPhaseSelect:function(){
        var me = Shedule;
        try {

            var EventID = $('#EventID option:selected').val();
            Ac.acGetTable(me.Path.getPhaseByEventID, { EventID: EventID }, function (aRes) {
                var a = aRes.Datas;
                // me.Datas.LoaclDatas.MatchInfo = a.DA;
                var aHtml = bt(me.Tpls.tplPhaseOption.C, { tplData: a.DA });
                hhls.fillElement("#Phase", aHtml);
                $('.chosen-select').chosen({ width: "100%" });
                me.ShowMatchList();
            });
            


        }
        catch (e) {; }
    },
    //加载轮次下面场次以及报项运动员
    ShowMatchList: function () {
        var me = Shedule;
        try {
            
            var EventID = $('#EventID option:selected').val();
            var PhaseID = $('#PhaseID option:selected').val();
            var EventName = $('#EventID option:selected').text();

            Ac.acGetTable(me.Path.getEventTeam, { ID: EventID }, function (aRes) {
                var a = aRes.Datas;

                if (a.DA[0].EventTeam != 'T') {

                    Ac.acGetTable(me.Path.getMatchByPhaseID, { PhaseID: PhaseID }, function (aRes) {
                        var a = aRes.Datas;

                        Ac.acGetTable(me.Path.getParticipant, {}, function (aRes) {
                            var b = aRes.Datas;


                            var aHtml = bt(me.Tpls.tplMatchList.C, { tplDataA: a.DA, EventName: EventName, tplDataB: b.DA });
                            hhls.fillElement("#nestable", aHtml);

                            $('#nestable').nestable({
                                group: 2,
                                maxDepth: 1
                            });
                            me.ShowAthleteList();
                            me.Datas.LoaclDatas.MatchAth = jQuery.parseJSON(JSON.stringify($('#nestable').nestable('serialize')));
                        });
                    });
                } else {
                    Ac.acGetTable(me.Path.getTeamMatchByPhaseID, { PhaseID: PhaseID }, function (aRes) {
                        var a = aRes.Datas;

                        Ac.acGetTable(me.Path.getParticipant, {}, function (aRes) {
                            var b = aRes.Datas;


                            var aHtml = bt(me.Tpls.tplMatchList.C, { tplDataA: a.DA, EventName: EventName, tplDataB: b.DA });
                            hhls.fillElement("#nestable", aHtml);

                            $('#nestable').nestable({
                                group: 2,
                                maxDepth: 1
                            });
                            me.ShowAthleteList();
                            me.Datas.LoaclDatas.MatchAth = jQuery.parseJSON(JSON.stringify($('#nestable').nestable('serialize')));
                        });
                    });
                }



            });
        }
        catch (e) {; }
    },
    //加载项目运动员
    ShowAthleteList: function () {
        var me = Shedule;
        try {
            var EventID = $('#EventID option:selected').val();
            //var PhaseID = $('#PhaseID option:selected').val();
            //var EventName = $('#EventID option:selected').text();
            Ac.acGetTable(me.Path.getAthByEventID, { EventID: EventID }, function (aRes) {
                var a = aRes.Datas;
                var aHtml = bt(me.Tpls.tplAthleteList.C, { tplData: a.DA });
                hhls.fillElement("#nestable1", aHtml);

                $('#nestable1').nestable({
                    group: 2,
                    maxDepth: 2,
                })
            });
        }
        catch (e) {; }
    },
    //提交 场次运动员数据
    PostMatchAth: function () {
        var me = Shedule;
        try {


            var EventID = $('#EventID option:selected').val();
            Ac.acGetTable(me.Path.getEventTeam, { ID: EventID }, function (aRes) {
                var a = aRes.Datas;

                if (a.DA[0].EventTeam != 'T') {
                    //data数据格式 [{ "matchid": 36, "children": [{ "participantid": 2 }, { "participantid": 2 }] }, { "matchid": 38, "children": [{ "participantid": 9 }, { "participantid": 8 }] }]
                    var data = jQuery.parseJSON(JSON.stringify($('#nestable').nestable('serialize')));
                    //if (me.Datas.CurIndex == 0) {
                    //    me.Datas.LoaclDatas.MatchAth = jQuery.parseJSON(JSON.stringify($('#nestable').nestable('serialize')));
                    //}
                    // alert(data[0].children[0].participantid);
                    for (var i = 0; i < data.length; i++) {
                        //data[i].hasOwnProperty("children")&&
                        if (data[i].hasOwnProperty("children") && !me.Datas.LoaclDatas.MatchAth[i].hasOwnProperty("children")) {
                            //alert(0);
                            if (data[i].children.length == 2) {

                                var aPath = me.Path.MatchAth;
                                var aInfo = {
                                    ID: data[i].matchid + '',
                                    ParticipantAID: data[i].children[0].participantid + '',
                                    ParticipantBID: data[i].children[1].participantid + '',
                                };

                                Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                                    if (aRes.State == 1) {
                                        //me.Datas.CurIndex = 1;
                                        me.Datas.LoaclDatas.MatchAth = jQuery.parseJSON(JSON.stringify($('#nestable').nestable('serialize')));
                                        me.ShowMatchList();
                                    }
                                    else {
                                        alert("提交失败！");
                                    }
                                });
                            }
                        } else if (data[i].hasOwnProperty("children") && data[i].children.length == 2) {
                            if (data[i].children[0].participantid != me.Datas.LoaclDatas.MatchAth[i].children[0].participantid || data[i].children[1].participantid != me.Datas.LoaclDatas.MatchAth[i].children[1].participantid) {
                                var aPath = me.Path.MatchAth;
                                var aInfo = {
                                    ID: data[i].matchid + '',
                                    ParticipantAID: data[i].children[0].participantid + '',
                                    ParticipantBID: data[i].children[1].participantid + '',
                                };

                                Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                                    if (aRes.State == 1) {
                                        //me.Datas.CurIndex = 1;
                                        me.Datas.LoaclDatas.MatchAth = jQuery.parseJSON(JSON.stringify($('#nestable').nestable('serialize')));
                                        me.ShowMatchList();
                                    }
                                    else {
                                        alert("提交失败！");
                                    }
                                });
                            }

                        } else if (!data[i].hasOwnProperty("children") && me.Datas.LoaclDatas.MatchAth[i].hasOwnProperty("children")) {
                            var aPath = me.Path.MatchAth;
                            var aInfo = {
                                ID: data[i].matchid + '',
                                ParticipantAID: null,
                                ParticipantBID: null,
                            };

                            Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                                if (aRes.State == 1) {
                                    //me.Datas.CurIndex = 1;
                                    me.Datas.LoaclDatas.MatchAth = jQuery.parseJSON(JSON.stringify($('#nestable').nestable('serialize')));
                                    me.ShowMatchList();
                                }
                                else {
                                    alert("提交失败！");
                                }
                            });
                        }
                    }

                } else {
                    //data数据格式 [{ "matchid": 36, "children": [{ "participantid": 2 }, { "participantid": 2 }] }, { "matchid": 38, "children": [{ "participantid": 9 }, { "participantid": 8 }] }]
                    var data = jQuery.parseJSON(JSON.stringify($('#nestable').nestable('serialize')));
                    //if (me.Datas.CurIndex == 0) {
                    //    me.Datas.LoaclDatas.MatchAth = jQuery.parseJSON(JSON.stringify($('#nestable').nestable('serialize')));
                    //}
                    // alert(data[0].children[0].participantid);
                    for (var i = 0; i < data.length; i++) {
                        //data[i].hasOwnProperty("children")&&
                        if (data[i].hasOwnProperty("children") && !me.Datas.LoaclDatas.MatchAth[i].hasOwnProperty("children")) {
                            //alert(0);
                            if (data[i].children.length == 2) {

                                var aPath = me.Path.TeamMatchAth;
                                var aInfo = {
                                    ID: data[i].matchid + '',
                                    ParticipantAID: data[i].children[0].participantid + '',
                                    ParticipantBID: data[i].children[1].participantid + '',
                                };

                                Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                                    if (aRes.State == 1) {
                                        //me.Datas.CurIndex = 1;
                                        me.Datas.LoaclDatas.MatchAth = jQuery.parseJSON(JSON.stringify($('#nestable').nestable('serialize')));
                                        me.ShowMatchList();
                                    }
                                    else {
                                        alert("提交失败！");
                                    }
                                });
                            }
                        } else if (data[i].hasOwnProperty("children") && data[i].children.length == 2) {
                            if (data[i].children[0].participantid != me.Datas.LoaclDatas.MatchAth[i].children[0].participantid || data[i].children[1].participantid != me.Datas.LoaclDatas.MatchAth[i].children[1].participantid) {
                                var aPath = me.Path.TeamMatchAth;
                                var aInfo = {
                                    ID: data[i].matchid + '',
                                    ParticipantAID: data[i].children[0].participantid + '',
                                    ParticipantBID: data[i].children[1].participantid + '',
                                };

                                Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                                    if (aRes.State == 1) {
                                        //me.Datas.CurIndex = 1;
                                        me.Datas.LoaclDatas.MatchAth = jQuery.parseJSON(JSON.stringify($('#nestable').nestable('serialize')));
                                        me.ShowMatchList();
                                    }
                                    else {
                                        alert("提交失败！");
                                    }
                                });
                            }

                        } else if (!data[i].hasOwnProperty("children") && me.Datas.LoaclDatas.MatchAth[i].hasOwnProperty("children")) {
                            var aPath = me.Path.TeamMatchAth;
                            var aInfo = {
                                ID: data[i].matchid + '',
                                ParticipantAID: null,
                                ParticipantBID: null,
                            };

                            Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                                if (aRes.State == 1) {
                                    //me.Datas.CurIndex = 1;
                                    me.Datas.LoaclDatas.MatchAth = jQuery.parseJSON(JSON.stringify($('#nestable').nestable('serialize')));
                                    me.ShowMatchList();
                                }
                                else {
                                    alert("提交失败！");
                                }
                            });
                        }
                    }
                }
            });


        }
        catch (e) {; }
    },
    //加载比赛单元模块
    LoadSportUnit: function () {
        var me = Shedule;
        try {
            hhls.GetTpls(me.Tpls, function () {
                hhls.fillElement("#SJH", me.Tpls.tplGP.C);
                hhls.fillElement("#tab-1", me.Tpls.tplTabs.C);
                me.LoadTab2();
                me.LoadTab1();
            });
        }
        catch (e) {; }
    },
    //加载比赛单元模块
    LoadTab1: function () {
        var me = Shedule;
        try {

            hhls.GetTpls(me.Tpls, function () {
                Ac.acGetTable(me.Path.getSession, {}, function (aRes) {
                    var a = aRes.Datas;
                    me.Datas.LoaclDatas.SessionInfo = a.DA;
                    var aHtml = bt(me.Tpls.tplSessionUnit.C, { tplData: a.DA });
                    hhls.fillElement("#tab1", aHtml);
                    me.LoadScheduleOption();
                    CommonData.DataTables();

                });
            });
        } catch (e) {; }
    },
    //加载比赛计划下拉框
    LoadScheduleOption: function () {
        var me = Shedule;
        try {
            hhls.GetTpls(me.Tpls, function () {
                Ac.acGetTable(me.Path.getSchedule, {}, function (aRes) {
                    var a = aRes.Datas;
                    me.Datas.LoaclDatas.ScheduleInfo = a.DA;
                    var aHtml = bt(me.Tpls.tplScheduleOption.C, { tplData: a.DA });
                    hhls.fillElement("#ScheduleSelect", aHtml);
                    //加载下拉框选择插件
                    // $('.chosen-select').chosen({ width: "100%" });
                });
            });


        }
        catch (e) {; }
    },
    //NewUnit:function(){
    //    var me = Shedule;
    //    try {
    //        me.ShowUnitDlg(-1)
    //    }
    //    catch (e) { ;}
    //},
    //EditUnit:function(Index){
    //    var me = Shedule;
    //    try {
    //        me.ShowUnitDlg(Index)
    //    }
    //    catch (e) {; }
    //},
    ShowUnitDlg:function(Index){
        var me = Shedule;
        try {
            var aDlg = $("#UnModal");
            if (Index == -1) {
                aDlg.on('shown.bs.modal', function () {
                    CommonData.LoadDatePick();
                }).on('hidden.bs.modal', function () {

                });
                aDlg.modal('toggle');
            } else{
                aDlg.on('shown.bs.modal', function () {
                    //$("#Name").val(aItem.Name);
                    //$("#LocalName").val(aItem.LocalName);
                    //$("#ShortName").val(aItem.ShortName);
                    //$("#LocalShortName").val(aItem.LocalShortName);
                    //$("#OpenDate").val(aItem.OpenDate);
                    //$("#CloseDate").val(aItem.CloseDate);


                }).on('hidden.bs.modal', function () {

                });
                aDlg.modal('toggle');
            }

        }
        catch (e) { ;}
    },
    SetUnitStatus:function(){
        var me = Shedule;
        try {
            var SessionStatus = $('#ScheduleSelect option:selected').text().split("--")[0];
            var aFlag = window.confirm("是否确定设置？");
            if (aFlag) {              
                var cb = document.getElementsByName("Unit[]");
                for (var i = 0; i < cb.length; i++) {
                    if (cb[i].checked) {
                        Ac.acExecuteSql(me.Path.setUnitStatus, { ID: me.Datas.LoaclDatas.SessionInfo[i].ID, SessionStatus: SessionStatus }, function (aRes) {
                            if (aRes.State == 1) {
                            }
                            else {
                                alert("提交失败！");
                            }
                        });
                    }
                }
                me.LoadSportUnit();
            }
        }
        catch (e) {; }
    },
    LoadTab2: function () {
        var me = Shedule;
        try {
            Ac.acGetTable(me.Path.getSessionMatch, { }, function (aRes) {
                var a = aRes.Datas;
                me.Datas.LoaclDatas.MatchSessionInfo = a.DA;
                var aHtml = bt(me.Tpls.tplTab2.C, { tplData: a.DA });
                hhls.fillElement("#tab2", aHtml);

            });
        }
        catch (e) {; }
    },
    ShowMatchSeesionDLg: function () {
        var me = Shedule;
        try {
            var aDlg = $("#Addg");

                aDlg.on('shown.bs.modal', function () {
                    Ac.acGetTable(BaseData.Path.getEventInfo, {}, function (aRes) {
                        var a = aRes.Datas;
                        // me.Datas.LoaclDatas.MatchInfo = a.DA;
                        var aHtml = bt(me.Tpls.tplSessionEventOption.C, { tplData: a.DA });
                        hhls.fillElement("#SessionEvent", aHtml);
                        $('.chosen-select').chosen({ width: "100%" });
                        me.LoadSessionPhase();
                    });

                    Ac.acGetTable(me.Path.getSessionInfo, {}, function (aRes) {
                        var a = aRes.Datas;
                        // me.Datas.LoaclDatas.MatchInfo = a.DA;
                        var aHtml = bt(me.Tpls.tplSessionOption.C, { tplData: a.DA });
                        hhls.fillElement("#Session", aHtml);
                        $('.chosen-select').chosen({ width: "100%" });
                    });
                }).on('hidden.bs.modal', function () {
                    //me.LoadSport();
                });
                aDlg.modal('toggle');

        }
        catch (e) {; }
    },
    LoadSessionPhase: function () {
        var me = Shedule;
        try {

            var EventID = $('#EventSID option:selected').val();
            Ac.acGetTable(me.Path.getPhaseByEventID, { EventID: EventID }, function (aRes) {
                var a = aRes.Datas;
                // me.Datas.LoaclDatas.MatchInfo = a.DA;
                var aHtml = bt(me.Tpls.tplSessionPhaseOption.C, { tplData: a.DA });
                hhls.fillElement("#SessionPhase", aHtml);
                $('.chosen-select').chosen({ width: "100%" });
                me.MatchSession();
            });
        }
        catch (e) {; }
    },
    MatchSession: function () {
        var me = Shedule;
        try {

            var EventID = $('#EventSID option:selected').val();
            var PhaseID = $('#PhaseID option:selected').val();
            //var EventName = $('#EventID option:selected').text();
            Ac.acGetTable(me.Path.getSessionMatchByPhaseID, { PhaseID: PhaseID }, function (aRes) {
                var a = aRes.Datas;
                me.Datas.LoaclDatas.MatchSession = a.DA;
                var aHtml = bt(me.Tpls.tplSessionMatch.C, { tplData: a.DA });
                hhls.fillElement("#SM", aHtml);

            });
        }
        catch (e) {; }
    },
    PostMatchSession: function () {
        var me = Shedule;
        try {
            var SessionID = $('#SessionID option:selected').val();
            var aFlag = window.confirm("是否确定添加所选信息？");
            if (aFlag) {
                var cb = document.getElementsByName("input[]");
                for (var i = 0; i < cb.length; i++) {
                    if (cb[i].checked) {
                        Ac.acExecuteSql(me.Path.setSession, { ID: me.Datas.LoaclDatas.MatchSession[i].ID,SessionID:SessionID }, function (aRes) {
                            if (aRes.State == 1) {

                            }
                            else {
                                alert("提交失败！");
                            }
                        });
                    }
                }
                me.LoadSportUnit();
            }
        }
        catch (e) {; }
    },
    ShowUpMatchSession: function (Index) {
        var me = Shedule;
        try {
            me.Datas.aIndex = Index;
            var aDlg = $("#upAddg");

            aDlg.on('shown.bs.modal', function () {
                Ac.acGetTable(me.Path.getSessionInfo, {}, function (aRes) {
                    var a = aRes.Datas;
                    // me.Datas.LoaclDatas.MatchInfo = a.DA;
                    var aHtml = bt(me.Tpls.tplSessionOption.C, { tplData: a.DA });
                    hhls.fillElement("#Session1", aHtml);
                    $('.chosen-select').chosen({ width: "100%" });
                });
            }).on('hidden.bs.modal', function () {
                //me.LoadSport();
            });
            aDlg.modal('toggle');

        }
        catch (e) {; }
    },
    UpMatchSession: function () {
        var me = Shedule;
        try {
            var SessionID = $('#SessionID option:selected').val();
            var aFlag = window.confirm("是否重置所选信息？");
            if (aFlag) {

                Ac.acExecuteSql(me.Path.setSession, { ID: me.Datas.LoaclDatas.MatchSessionInfo[me.Datas.aIndex].ID, SessionID: SessionID }, function (aRes) {
                    if (aRes.State == 1) {
                        var aDlg = $("#upAddg");
                        aDlg.on('shown.bs.modal', function () {
                        }).on('hidden.bs.modal', function () {
                        });
                        aDlg.modal('toggle');
                    }
                    else {
                        alert("提交失败！");
                    }
                });
                me.LoadSportUnit();
            }

        }
        catch (e) {; }
    }
}
