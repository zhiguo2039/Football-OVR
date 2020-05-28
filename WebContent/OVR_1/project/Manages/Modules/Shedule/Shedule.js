


var Shedule = {
    Datas: {
        DataKey: "",
        ID:null,
        aIndex: null,
        bIndex: null,
        CurIndex: null,
        Draw: null,
        DrawIndex:null,
        LoaclDatas: {
            EventInfo: [],
            PhaseInfo: [],
            MatchInfo: [],
            MatchLInfo: [],
            VenueInfo:[],
            MatchAth:[],
            MatchSession: [],
            GroupInfo: [],
            GroupParticipantInfo: [],
            TotalOrderInfo: [],
            MTEventInfo:[],
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
        tplSessionEventOption: { P: "Modules/Shedule/tplSessionEventOption.htm", C: "" },
        tplSessionPhaseOption: { P: "Modules/Shedule/tplSessionPhaseOption.htm", C: "" },
        tplMatchList: { P: "Modules/Shedule/tplMatchList.htm", C: "" },
        tplAthleteList: { P: "Modules/Shedule/tplAthleteList.htm", C: "" },
        tplMatchAth: { P: "Modules/Shedule/tplMatchAth.htm", C: "" },

        tplVenueList: { P: "Modules/Shedule/tplVenueList.htm", C: "" },
        tplMatchTable: { P: "Modules/Shedule/tplMatchTable.htm", C: "" },

        tplTabs:{ P: "Modules/Shedule/tplTabs.htm", C: "" },
        tplTab2: { P: "Modules/Shedule/tplTab2.htm", C: "" },
        tplSessionMatch: { P: "Modules/Shedule/tplSessionMatch.htm", C: "" },
        tplSessionOption: { P: "Modules/Shedule/tplSessionOption.htm", C: "" },

        tplGEventOption: { P: "Modules/Shedule/tplGEventOption.htm", C: "" },
        tplGroupList: { P: "Modules/Shedule/tplGroupList.htm", C: "" },
        tplParticipantTable: { P: "Modules/Shedule/tplParticipantTable.htm", C: "" },


        tplMatchTotalOrder: { P: "Modules/Shedule/tplMatchTotalOrder.htm", C: "" },

    },
    Path: {
        getPhase: "Shedule/getPhase.txt",
        getPhaseByEventID: "Shedule/getPhaseByEventID.txt",
        getMatch: "Shedule/getMatch.txt",
        getMatchD: "Shedule/getMatchD.txt",
        getPhaseD: "Shedule/getPhaseD.txt",
        getMatchByPhaseID: "Shedule/getMatchByPhaseID.txt",
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

        MatchAth: "Shedule/MatchAth.txt",
        delMatchAth: "Shedule/delMatchAth.txt",

        getSessionMatch: "Shedule/getSessionMatch.txt",
        getSessionMatchByPhaseID: "Shedule/getSessionMatchByPhaseID.txt",
        getSessionInfo: "Shedule/getSessionInfo.txt",
        setSession: "Shedule/setSession.txt",

        getMatchTotalOrder: "Shedule/getMatchTotalOrder.txt",
        AddMatchOrder: "Shedule/AddMatchOrder.txt",

        ///////////////////////////////////////////////////////////////////////////////

        newGroupMatch: "Shedule/newGroupMatch.txt",
        newGroup: "Shedule/newGroup.txt",
        newPhase: "Shedule/newPhase.txt",
        getVenue: "Shedule/getVenue.txt",
        updateMatchVenue: "Shedule/updateMatchVenue.txt",
        getGroupE: "Shedule/getGroupE.txt",
        getTEvent: "Shedule/getTEvent.txt",
        getGroupParticipant: "Shedule/getGroupParticipant.txt",
        getGroupParticipantNum: "Shedule/getGroupParticipantNum.txt",
        newaGroupMatch: "Shedule/newaGroupMatch.txt",
        newGroupParticipant: "Shedule/newGroupParticipant.txt",
        upGroupParticipant: "Shedule/upGroupParticipant.txt",
    },
    //加载赛事编排模块信息
    LoadMatchSch: function () {
        var me = Shedule;
        try {
            hhls.GetTpls(me.Tpls, function () {
                hhls.fillElement("#tab-1", me.Tpls.tplSchTree.C);               

                me.LoadPMTree();
            });
        }
        catch (e) {; }
    },

    //加载比赛总序号
    setMTotalOrder: function () {
        var me = Shedule;
        try {         
            
            Ac.acGetTable(me.Path.getMatchTotalOrder, { EventID: $("#MTEventID option:selected").val() }, function (aRes) {
                var aSI = aRes.Datas;
                me.Datas.LoaclDatas.TotalOrderInfo = aSI.DA;
                var aHtml = bt(me.Tpls.tplMatchTotalOrder.C, { tplData: aSI.DA });
                hhls.fillElement("#MTOderTable", aHtml);
                $('#TotalOrder').on('dblclick', 'td', function () {
                    //console.info($(this).text());
                    var oldVal = $(this).text();
                    var idx = $(this).closest('tr').index();
                    //alert(idx);
                    var input = "<input type='text' id='Order' value='" + oldVal + "' >";
                    $(this).text('');
                    $(this).append(input);
                    $('#Order').focus();
                    $('#Order').blur(function () {
                        if ($(this).val() != '') {
                            oldVal = $(this).val();
                        }
                        //closest：是从当前元素开始，沿Dom树向上遍历直到找到已应用选择器的一个匹配为止。
                        $(this).closest('td').text(oldVal);

                        Ac.acExecuteSql(me.Path.AddMatchOrder, { MatchID: me.Datas.LoaclDatas.TotalOrderInfo[idx].ID + '', TotalOrder: oldVal }, function (aRes) {
                            if (aRes.State == 1) {
                                me.setMTotalOrder();
                            }
                            else {
                                alert("提交失败！");
                            }
                        });
                    });
                });
             
                
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
                                    $("#rk_menuitem5").unbind();
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
                $('#rk_menuitem').hide();
                $('#rk_menuitem1').hide();
                $('#rk_menuitem2').hide();
                $('#rk_menuitem3').hide();
                $('#rk_menuitem4').show();
                $('#rk_menuitem5').show();
                $('#rk_menubox').css("left", document.body.scrollLeft + event.clientX + 1 - 200);
                $('#rk_menubox').css("top", document.body.scrollLeft + event.clientY + 10 - 150);
                //删除按钮 绑定事件
                $("#rk_menuitem5").on("click", function () {
                    me.DeleteMatch(ID);
                });
                //编辑按钮 绑定事件
                $("#rk_menuitem4").on("click", function () {
                    me.EditMatch(ID);
                });
            } else if (idName == 'Phase') {
                $('#rk_menubox').show();
                $('#rk_menuitem1').hide();
                $('#rk_menuitem2').show();
                $('#rk_menuitem3').show();
                $('#rk_menuitem4').show();
                $('#rk_menuitem5').show();
                $('#rk_menubox').css("left", document.body.scrollLeft + event.clientX + 1 - 200);
                $('#rk_menubox').css("top", document.body.scrollLeft + event.clientY + 10 - 150);
                //删除按钮 绑定事件
                $("#rk_menuitem5").on("click", function () {
                    me.DeletePhase(ID);
                });
                //编辑按钮 绑定事件
                $("#rk_menuitem4").on("click", function () {
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
                $('#rk_menuitem1').show();
                $('#rk_menuitem2').hide();
                $('#rk_menuitem3').hide();
                $('#rk_menuitem4').hide();
                $('#rk_menuitem5').hide();
                $('#rk_menuitem').hide();
                $('#rk_menubox').css("left", document.body.scrollLeft + event.clientX + 1 - 200);
                $('#rk_menubox').css("top", document.body.scrollLeft + event.clientY + 10 - 150);

                //自动编排按钮 绑定事件
                $("#rk_menuitem1").on("click", function () {
                    me.SheduleFootBall(ID);
                });

            }


        }
        catch (e) {; }
    },
    //提交报项国家签号
    PostGroupParticipantDraw: function (ID) {
        var me = Shedule;
        try {
            me.Datas.Draw = ID;
           
        }

        catch (e) {; }
    },

    SheduleFootBall:function(ID){
        var me = Shedule;
        try {
            var aDlg = $("#FSModal");

            Ac.acGetTable("Shedule/getPumByEvent.txt", { EventID: ID }, function (aRes) {
                var a = aRes.Datas;
                $('#ParticipantNum').val(a.DA[0].Num);

            });

            aDlg.on('shown.bs.modal', function () {
                me.Datas.ID = ID;
                $('#EventID').val(ID);
            }).on('hidden.bs.modal', function () {

            });
            aDlg.modal('toggle');
        }
        catch (e) {; }
    },
    PostFootBallShedule: function () {
        var me = Shedule;
        try {
            var EventID = $('#EventID').val();
            var EventCode = $('#EventCode' + me.Datas.ID).val();
            var ParticipantNum = $('#ParticipantNum').val();
            var GroupNum = $('#GroupNum').val();
            var eachNum = parseInt(ParticipantNum) / parseInt(GroupNum);
            var GroupMatch = parseInt(GroupNum) * parseInt(eachNum) * (parseInt(eachNum) - 1) / 2;
            var Count = $('#GroupModelID').val();
            var aInfo = {
                EventID: EventID,
                Count: Count,
                GroupNum: GroupNum,
                GroupMacth: GroupMatch + ""
            }
            var aPath = me.Path.newPhase;
            Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                if (aRes.State == 1) {
                    
                   
                    me.LoadPMTree();

                    var aDlg = $("#FSModal");
                    aDlg.on('shown.bs.modal', function () {
                    }).on('hidden.bs.modal', function () {

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

    Update_Match_Brackets:function(){
        var me = Shedule;
        try {

                    var aInfo = {
                        PhaseID: $('#PhaseID').val()
                    };

                    Ac.acExecuteSql("Shedule/update_GroupMatch_Brackets.txt", aInfo, function (aRes) {
                        if (aRes.State == 1) {
                            me.ShowMatchList();
                        }
                        else {
                            alert("提交失败！");
                        }
                    });
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

                $('#GroupDraw').on('dblclick', 'td', function () {
                    //console.info($(this).text());
                    var oldVal = $(this).text();
                    var input = "<input type='text' id='tmpId' value='" + oldVal + "' >";
                    $(this).text('');
                    $(this).append(input);
                    $('#tmpId').focus();
                    $('#tmpId').blur(function () {
                        if ($(this).val() != '') {
                            oldVal = $(this).val();
                        }
                        //closest：是从当前元素开始，沿Dom树向上遍历直到找到已应用选择器的一个匹配为止。
                        $(this).closest('td').text(oldVal);

                        Ac.acExecuteSql("Shedule/upGroupParticipantDraw.txt", { ParticipantID: me.Datas.Draw + '', GroupDraw: oldVal }, function (aRes) {
                            if (aRes.State == 1) {
                                me.GetGroup();
                            }
                            else {
                                alert("提交失败！");
                            }
                        });
                    });
                });

            });


          
        }
        catch (e) {; }
    },
    //小组赛 给每组添加比赛
    NewGroupMatch: function (ID) {
        var me = Shedule;
        try {

            Ac.acGetTable(me.Path.getGroupParticipantNum, { GroupID: ID }, function (aRes) {
                var a = aRes.Datas;
                var GroupMatch = parseInt(a.DA[0].GroupNum) * (parseInt(a.DA[0].GroupNum) - 1) / 2;

                var aFlag = window.confirm("确定建立比赛？");
                if (aFlag) {
                    Ac.acExecuteSql(me.Path.newaGroupMatch, { GroupID: ID + '', GroupMatch: GroupMatch + '' }, function (aRes) {
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
                        if (GroupParticipant[j].checked && me.Datas.LoaclDatas.GroupParticipantInfo[j].GroupName == '') {

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
                CommonData.LoadDatePick();
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
    EditPhase: function (ID) {
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
    ShowNewMatchEdit: function (aIndex, bIndex) {
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
                    $('#VenueID').chosen({ width: "100%" });
                    //me.ShowNewMatchEdit();
                });

                Ac.acGetTable(me.Path.getLocation, {}, function (aRes) {
                    var a = aRes.Datas;
                    // me.Datas.LoaclDatas.MatchInfo = a.DA;
                    var aHtml = bt(me.Tpls.tplLocationOption.C, { tplData: a.DA });
                    hhls.fillElement("#Location", aHtml);
                    //$('.chosen-select').chosen({ width: "100%" });
                    //me.ShowNewMatchEdit();
                });


                Ac.acGetTable(me.Path.getGroup, {}, function (aRes) {
                    var a = aRes.Datas;
                    // me.Datas.LoaclDatas.MatchInfo = a.DA;
                    var aHtml = bt(me.Tpls.tplGroupOption.C, { tplData: a.DA });
                    hhls.fillElement("#Group", aHtml);
                   // $('.chosen-select').chosen({ width: "100%" });
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
                    $('#VenueID').chosen({ width: "100%" });
                    //me.ShowNewMatchEdit();
                });

                Ac.acGetTable(me.Path.getLocation, {}, function (aRes) {
                    var a = aRes.Datas;
                    // me.Datas.LoaclDatas.MatchInfo = a.DA;
                    var aHtml = bt(me.Tpls.tplLocationOption.C, { tplData: a.DA });
                    hhls.fillElement("#Location", aHtml);
                    //$('.chosen-select').chosen({ width: "100%" });
                    //me.ShowNewMatchEdit();
                });


                Ac.acGetTable(me.Path.getGroup, {}, function (aRes) {
                    var a = aRes.Datas;
                    // me.Datas.LoaclDatas.MatchInfo = a.DA;
                    var aHtml = bt(me.Tpls.tplGroupOption.C, { tplData: a.DA });
                    hhls.fillElement("#Group", aHtml);
                   // $('.chosen-select').chosen({ width: "100%" });
                    //me.ShowNewMatchEdit();
                });



                me.Datas.CurIndex = ID;

                Ac.acGetTable(me.Path.getMatchD, { ID: ID }, function (aRes) {
                    var c = aRes.Datas.DA;
                    var GroupID = c[0].GroupID;
                    $("#EventID1").val(c[0].EventID);
                    $("#PhaseID1").val(c[0].PhaseID);
                    $("#EventName1").val(c[0].EventName);
                    $("#PhaseName1").val(c[0].PhaseName);
                    $("#MatchCode").val(c[0].MatchCode);
                    $("#MatchName").val(c[0].MatchName);
                    $("#MatchLocalName").val(c[0].MatchLocalName);   
                    $("#VenueID").val(c[0].VenueCode);
                    $("#LocationID").val(c[0].LocationCode);
                    $("#MatchOrder").val(c[0].MatchOrder);
                    $("#BeginTime").val(c[0].BeginTime);
                    $("#EndTime").val(c[0].EndTime);
                    $("#begintime").val(c[0].begintime1);
                    $("#endtime").val(c[0].endtime1);
                    CommonData.LoadDatePick();
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
                    //LocationCode: $("#LocationID option:selected").val(),
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

    ShowMatchGroupDlg:function(){
        var me = Shedule;
        try {
            var aDlg = $("#MGModal");

            aDlg.on('shown.bs.modal', function () {
                Ac.acGetTable(Sign.Path.getEvent, {}, function (aRes) {
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

    //GetGroup:function(){
    //    var me = Shedule;
    //    try {
    //        var ID=$("#EventSelect option:selected").val()
    //        Ac.acGetTable(me.Path.getGroupE ,{ EventID: ID }, function (aRes) {
    //            var a = aRes.Datas;
    //            me.Datas.LoaclDatas.GroupInfo = a.DA;
    //            var aHtml = bt(me.Tpls.tplGroupList.C, { tplData: a.DA });
    //            hhls.fillElement("#GroupList", aHtml);

    //        });

    //        Ac.acGetTable(me.Path.getGroupParticipant, { EventID: ID }, function (aRes) {
    //            var a = aRes.Datas;
    //            me.Datas.LoaclDatas.GroupParticipantInfo = a.DA;
    //            var aHtml = bt(me.Tpls.tplParticipantTable.C, { tplData: a.DA });
    //            hhls.fillElement("#ParticipantTable", aHtml);
    //        });

    //    }
    //    catch (e) {; }
    //},
    //提交 对参赛队分组的批处理
    PostGroupParticipant: function (ID) {
        var me = Shedule;
        try {
            var GroupID;
            var Group = document.getElementsByName("Group[]");
            for (var i = 0; i < Group.length; i++) {
                if (Group[i].checked) {
                    GroupID = me.Datas.LoaclDatas.GroupInfo[i].ID;
                 
                    //？？？？？还要更新GroupParticipant表 不只有新增
                    Ac.acExecuteSql(me.Path.newGroupParticipant, { ParticipantID: ID + '', GroupID: GroupID }, function (aRes) {
                        if (aRes.State == 1) {
                        }
                        else {
                            alert("提交失败！");
                        }
                    });

                    var ID = $("#EventSelect option:selected").val()
                    Ac.acGetTable(me.Path.getGroupParticipant, { EventID: ID }, function (aRes) {
                        var a = aRes.Datas;
                        me.Datas.LoaclDatas.GroupParticipantInfo = a.DA;
                        var aHtml = bt(me.Tpls.tplParticipantTable.C, { tplData: a.DA });
                        hhls.fillElement("#ParticipantTable", aHtml);
                    });

                }
            }


        }
        catch (e) {; }
    },

    //删除重复的报项分组抽签号
    deleteParDrawInfo: function (DrawIndex) {
        var me = Shedule;
        try {
            var aItem = me.Datas.LoaclDatas.GroupParticipantInfo[DrawIndex];


            var aFlag = window.confirm("是否确定删除该报项抽签信息？");
            if (aFlag) {
                Ac.acExecuteSql("Shedule/deleteParDrawInfo.txt", { ID: aItem.ID }, function (aRes) {
                    if (aRes.State == 1) {
                        me.GetGroup();
                    }
                    else {
                        alert("删除失败！");
                    }
                });
            }
        }
        catch (e) {; }
    
    
    
    },



    //<!----------------------------------------------------------------------------------分隔符-------------------------------------------------------------------------------------->
    //加载批量建立场地的模态框
    ShowMatchVenueDlg: function () {
        var me = Shedule;
        try {
            var aDlg = $("#MLModal");

            aDlg.on('shown.bs.modal', function () {
                //Ac.acGetTable(me.Path.getEventPhase, { ID: ID }, function (aRes) {
                //    var a = aRes.Datas;

                //});
                me.LoadMLEventSelect();
                //me.PostMatchVenue();

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
                    $("#beEventName").val(a.DA[0].EventName);
                    $("#bePhaseID").val(ID);
                    $("#bePhaseCode").val(a.DA[0].PhaseCode);
                    $("#bePhaseOrder").val(a.DA[0].PhaseOrder);
                    $("#bePhaseName").val(a.DA[0].PhaseName);
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
            var PhaseID = $("#bePhaseID").val();
            var PhaseCode = $("#bePhaseCode").val();
            var PhaseOrder = $("#bePhaseOrder").val();
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
                            $("#beEventName").val('');
                            $("#bePhaseID").val('');
                            $("#bePhaseCode").val('');
                            $("#bePhaseOrder").val('');
                            $("#bePhaseName").val('');
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


            Ac.acGetTable(me.Path.getEventPhase, { ID: ID }, function (aRes) {
                var a = aRes.Datas;
                $("#mtEventName1").val(a.DA[0].EventName);
                $("#mtPhaseID1").val(ID);
                $("#mtPhaseCode1").val(a.DA[0].PhaseCode);
                $("#mtPhaseOrder1").val(a.DA[0].PhaseOrder);
                $("#mtPhaseName1").val(a.DA[0].PhaseName);
                $("#mtBeginTime1").val(CommonData.GetNowFormatDate());
                $("#mtEndTime1").val(CommonData.GetNowFormatDate());
                $("#mtbegintime1").val(CommonData.GetNowFormatTime());
                $("#mtendtime1").val(CommonData.GetNowFormatTime())
            });
            CommonData.LoadDatePick();
            aDlg.on('shown.bs.modal', function () {

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
            var PhaseID = $("#mtPhaseID1").val();
            var PhaseCode = $("#mtPhaseCode1").val();
            var PhaseOrder = $("#mtPhaseOrder1").val();
            var BeginTime = $("#mtBeginTime1").val() + ' ' + $("#mtbegintime1").val();
            var EndTime = $("#mtEndTime1").val() + ' ' + $("#mtendtime1").val();
            var sNum = parseInt($("#MatchNum11").val());
            var eNum = parseInt($("#MatchNum21").val());

            var count = eNum - sNum;

            var aInfo = {
                sNum: sNum + '',
                count: count + '',
                PhaseID: PhaseID,
                BeginTime: BeginTime,
                EndTime: EndTime
            }
            var aPath = me.Path.newMatchTime;
            Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                if (aRes.State == 1) {
                    me.LoadPMTree();

                    var aDlg = $("#MTModal");
                    aDlg.on('shown.bs.modal', function () {
                    }).on('hidden.bs.modal', function () {
                        $("#mtEventName1").val('');
                        $("#mtPhaseID1").val('');
                        $("#mtPhaseCode1").val('');
                        $("#mtPhaseOrder1").val('');
                        $("#mtPhaseName1").val('');
                        $("#mtBeginTime1").val('');
                        $("#mtbegintime1").val('');
                        $("#mtEndTime1").val('');
                        $("#mtendtime1").val('');
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
                me.LoadVenueMatch();
            });
        }
        catch (e) {; }
    },
    //加载 场地以及场次数据 作批量处理
    LoadVenueMatch: function () {
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

            Ac.acGetTable(me.Path.getVenue, {}, function (aRes) {
                var a = aRes.Datas;
                me.Datas.LoaclDatas.VenueInfo = a.DA;
                var aHtml = bt(me.Tpls.tplVenueList.C, { tplData: a.DA });
                hhls.fillElement("#LocationList", aHtml);

            });
        }
        catch (e) {; }
    },
    //提交 对场次添加场地的批处理
    PostMatchVenue:function(ID){
        var me = Shedule;
        try {
            var VenueCode;
            var Venue = document.getElementsByName("Venue[]");
   
            for (var i = 0; i < Venue.length; i++) {
                if (Venue[i].checked) {
                    VenueCode = me.Datas.LoaclDatas.VenueInfo[i].VenueCode;
                    

                    Ac.acExecuteSql(me.Path.updateMatchVenue, { ID: ID + '', VenueCode: VenueCode }, function (aRes) {
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
            Ac.acGetTable(me.Path.getMatchByPhaseID, { PhaseID: PhaseID }, function (aRes) {
                var a = aRes.Datas;

                Ac.acGetTable(me.Path.getParticipant, {}, function (aRes) {
                    var b = aRes.Datas;


                    var aHtml = bt(me.Tpls.tplMatchList.C, { tplDataA: a.DA, EventName: EventName ,tplDataB:b.DA});
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
                        ParticipantAID:null,
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
        catch (e) {; }
    },
    LoadSportUnit: function () {
        var me = Shedule;
        try {
            hhls.GetTpls(me.Tpls, function () {
                hhls.fillElement("#SJH", me.Tpls.tplGP.C);
                hhls.fillElement("#tab-1", me.Tpls.tplTabs.C);
                me.LoadTab2();
            });
        }
        catch (e) {; }
    },
    LoadTab2: function () {
        var me = Shedule;
        try {
            Ac.acGetTable(me.Path.getSessionMatch, { }, function (aRes) {
                var a = aRes.Datas;
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
            }
        }
        catch (e) {; }
    },

    //checkbox单选
    selectCheckOne: function (obj) {
        //alert("this is SigCheckbox");
        var checks = document.getElementsByName("participantcheckbox");
        if (obj.checked) {
            for (var i = 0; i < checks.length; i++) {
                checks[i].checked = false;
            }
            obj.checked = true;
        } else {
            for (var i = 0; i < checks.length; i++) {
                checks[i].checked = false;
            }
        }
    },
}
