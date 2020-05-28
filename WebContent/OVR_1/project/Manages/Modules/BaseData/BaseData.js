



var BaseData = {
    Datas: {
        DataKey: "",
        Index: null,
        CurIndex:null,
        LoaclDatas: {
            SportInfo: [],
            CRInfo: [],
            VenueInfo: [],
            EventInfo: [],
            Menus: {
                Index: 0,
                Items: [
                    { Key: "" },
                ]
            }
        }
    },
    Tpls: {
        tplCountryRegion: { P: "Modules/BaseData/tplCountryRegion.htm", C: "" },
        tplSport: { P: "Modules/BaseData/tplSport.htm", C: "" },
        tplVenue: { P: "Modules/BaseData/tplVenue.htm", C: "" },
        tplEventInfo: { P: "Modules/BaseData/tplEventInfo.htm", C: "" }
    },
    Path: {
        getSport: "BaseData/getSport.txt",
        editSport: "BaseData/editSport.txt",
        newSport: "BaseData/newSport.txt",
        delSport: "BaseData/delSport.txt",

        getCountryRegion: "BaseData/getCountryRegion.txt",
        editCR: "BaseData/editCR.txt",
        newCR: "BaseData/newCR.txt",
        delCR: "BaseData/delCR.txt",

        getVenue: "BaseData/getVenue.txt",
        editVenue: "BaseData/editVenue.txt",
        newVenue: "BaseData/newVenue.txt",
        delVenue: "BaseData/delVenue.txt",

        getEventInfo: "BaseData/getEventInfo.txt",
        editEventInfo: "BaseData/editEventInfo.txt",
        newEventInfo: "BaseData/newEventInfo.txt",
        delEventInfo: "BaseData/delEventInfo.txt"
        
    },
    LoadSport:function(){
        var me = BaseData;
        try {
            hhls.GetTpls(me.Tpls, function () {
                Ac.acGetTable(me.Path.getSport, {}, function (aRes) {
                    var aSI = aRes.Datas;
                    me.Datas.LoaclDatas.SportInfo = aSI.DA;
                    //CommonData.Datas.Objs.App = aRes.Datas.DA;
                    var aHtml = bt(me.Tpls.tplSport.C, { tplData: aSI.DA });
                    hhls.fillElement("#tab-1", aHtml);
                    me.DataTables();

                });
            });
        }
        catch (e) {; }
    },
    LoadCR: function () {
        var me = BaseData;
        try {
            hhls.GetTpls(me.Tpls, function () {
                Ac.acGetTable(me.Path.getCountryRegion, {}, function (aRes) {
                    var aCR = aRes.Datas;
                    me.Datas.LoaclDatas.CRInfo = aCR.DA;
                    var aHtml = bt(me.Tpls.tplCountryRegion.C, { tplData: aCR.DA });
                    hhls.fillElement("#tab-1", aHtml);
                    me.DataTables();

                });
            });
        }
        catch (e) {; }
    },
    LoadVenue: function () {
        var me = BaseData;
        try {
            hhls.GetTpls(me.Tpls, function () {
                Ac.acGetTable(me.Path.getVenue, {}, function (aRes) {
                    var aVenue = aRes.Datas;
                    me.Datas.LoaclDatas.VenueInfo = aVenue.DA;
                    var aHtml = bt(me.Tpls.tplVenue.C, { tplData: aVenue.DA });
                    hhls.fillElement("#tab-1", aHtml);
                    me.DataTables();

                });
            });
        }
        catch (e) {; }
    },
    LoadEventInfo: function () {
        var me = BaseData;
        try {
            hhls.GetTpls(me.Tpls, function () {
                
                Ac.acGetTable(me.Path.getEventInfo, {}, function (aRes) {
                    var aEventInfo = aRes.Datas;
                    me.Datas.LoaclDatas.EventInfo = aEventInfo.DA;
                    //CommonData.Datas.Objs.App = aRes.Datas.DA;
                    var aHtml = bt(me.Tpls.tplEventInfo.C, { tplData: aEventInfo.DA });
                    hhls.fillElement("#tab-1", aHtml);
                    me.DataTables();

                });
            });
        }
        catch (e) {; }
    },
    SINew: function () {
        var me = BaseData;
        try {
            me.Datas.CurIndex = -1;
            me.doShowSIDlg(-1);
        }
        catch (e) {; }
    },
    SIEdit: function (Index) {
        var me = BaseData;
        try {
            me.Datas.CurIndex = 1;
            me.doShowSIDlg(Index);
        }
        catch (e) {; }
    },
    doShowSIDlg: function (Index) {
        var me = BaseData;
        try {
            var aDlg = $("#myModal");
            if (me.Datas.CurIndex == 1) {
            var aItem = me.Datas.LoaclDatas.SportInfo[Index];
           // me.Datas.CurItemID = aItem.ID;
            me.Datas.Index = Index;
            $("#myModalLabel").text("修改赛事信息");
            aDlg.on('shown.bs.modal', function () {
                $("#Name").val(aItem.Name);
                $("#LocalName").val(aItem.LocalName);
                $("#ShortName").val(aItem.ShortName);
                $("#LocalShortName").val(aItem.LocalShortName);
                $("#OpenDate").val(aItem.OpenDate);
                $("#CloseDate").val(aItem.CloseDate);
                CommonData.LoadDatePick();
            }).on('hidden.bs.modal', function () {
                me.LoadSport();
            });
            aDlg.modal('toggle');
            } else {
                aDlg.on('shown.bs.modal', function () {
                    CommonData.LoadDatePick();
                }).on('hidden.bs.modal', function () {
                    me.LoadSport();
                });
                aDlg.modal('toggle');
            }
        }
        catch (e) {; }
    },
    deleteSi: function (Index) {
        var me = BaseData;
        try {
            var aItem = me.Datas.LoaclDatas.SportInfo[Index];
            var aPath = me.Path.delSport;

            var aFlag = window.confirm("是否确定删除该国家地区信息？");
            if (aFlag) {
                Ac.acExecuteSql(aPath, { ID: aItem.ID }, function (aRes) {
                    if (aRes.State == 1) {
                        me.LoadSport();
                    }
                    else {
                        alert("删除失败！");
                    }
                });
            }
        }
        catch (e) {; }
    },
    doSiPost: function () {
        var me = BaseData;
        var aItem = me.Datas.LoaclDatas.SportInfo[me.Datas.Index];
        try {
            if (me.Datas.CurIndex == -1) {
                
                var aInfo = {
                    //ID: aItem.ID,
                    Name: $("#Name").val(),
                    LocalName: $("#LocalName").val(),
                    ShortName: $("#ShortName").val(),
                    LocalShortName: $("#LocalShortName").val(),
                    OpenDate: $("#OpenDate").val(),
                    CloseDate: $("#CloseDate").val()
                };
                var aPath = me.Path.newSport;
                Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                    if (aRes.State == 1) {
                        $("#myModal").modal('toggle');
                        me.LoadSport();
                    }
                    else {
                        alert("提交失败！");
                    }
                });
            }
            else {
                var aInfo = {
                    ID: aItem.ID,
                    Name: $("#Name").val(),
                    LocalName: $("#LocalName").val(),
                    ShortName: $("#ShortName").val(),
                    LocalShortName: $("#LocalShortName").val(),
                    OpenDate: $("#OpenDate").val(),
                    CloseDate: $("#CloseDate").val()
                };
                var aPath = me.Path.editSport;
                Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                    if (aRes.State == 1) {
                        $("#myModal").modal('toggle');
                        me.LoadSport();
                    }
                    else {
                        alert("提交失败！");
                    }
                });
            }
        }
        catch (e) {; }
    },
    CRNew:function(){
        var me = BaseData;
        try {
            me.Datas.CurIndex = -1;
            me.doShowCRDlg(-1);
        }
        catch (e) {; }
    },
    CREdit: function (Index) {
        var me = BaseData;
        try {
            me.Datas.CurIndex = 1;
            me.doShowCRDlg(Index);
        }
        catch (e) {; }
    },
    doShowCRDlg: function (Index) {
        var me = BaseData;
        try {
            
            var aDlg = $("#myModal");
            if (me.Datas.CurIndex == 1) {
                var aItem = me.Datas.LoaclDatas.CRInfo[Index];
                // me.Datas.CurItemID = aItem.ID;
                me.Datas.Index = Index;
                $("#myModalLabel").text("修改国家与地区信息");
                aDlg.on('shown.bs.modal', function () {
                    $("#CRCode").val(aItem.CRCode);
                    $("#CRName").val(aItem.CRName);
                    $("#CRLocalName").val(aItem.CRLocalName);
                    $("#CRFullName").val(aItem.CRFullName);
                    $("#CRLocalFullName").val(aItem.CRLocalFullName);
                }).on('hidden.bs.modal', function () {
                    me.LoadCR();
                });
                aDlg.modal('toggle');
            } else {
                aDlg.on('shown.bs.modal', function () {

                }).on('hidden.bs.modal', function () {
                    me.LoadCR();
                });
                aDlg.modal('toggle');
            }

        }
        catch (e) {; }
    },
    doCRPost: function () {
        var me = BaseData;
        try {
            if (me.Datas.CurIndex == 1) {
                var aItem = me.Datas.LoaclDatas.CRInfo[me.Datas.Index];
                var aInfo = {
                    ID: aItem.ID,
                    CRCode: $("#CRCode").val(),
                    CRName: $("#CRName").val(),
                    CRLocalName: $("#CRLocalName").val(),
                    CRFullName: $("#CRFullName").val(),
                    CRLocalFullName: $("#CRLocalFullName").val()
                };
                var aPath = me.Path.editCR;
                Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                    if (aRes.State == 1) {
                        var aDlg = $("#myModal");
                        aDlg.on('shown.bs.modal', function () {

                        }).on('hidden.bs.modal', function () {
                            me.LoadCR();
                        });
                        aDlg.modal('toggle');
                    }
                    else {
                        alert("提交失败！");
                    }
                });
            } else {
                var aInfo = {
                    //ID: aItem.ID,
                    CRCode: $("#CRCode").val(),
                    CRName: $("#CRName").val(),
                    CRLocalName: $("#CRLocalName").val(),
                    CRFullName: $("#CRFullName").val(),
                    CRLocalFullName: $("#CRLocalFullName").val()
                };
                var aPath = me.Path.newCR;
                Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                    if (aRes.State == 1) {
                        var aDlg = $("#myModal");
                        aDlg.on('shown.bs.modal', function () {

                        }).on('hidden.bs.modal', function () {
                            me.LoadCR();
                        });
                        aDlg.modal('toggle');
                    }
                    else {
                        alert("提交失败！");
                    }
                });
            }
           
        }
        catch (e) {; }
    },
    deleteCR:function(Index){
        var me = BaseData;
        try {
            var aItem = me.Datas.LoaclDatas.CRInfo[Index];
            var aPath = me.Path.delCR;

            var aFlag = window.confirm("是否确定删除该国家地区信息？");
            if (aFlag) {
                Ac.acExecuteSql(aPath, { ID: aItem.ID }, function (aRes) {
                    if (aRes.State == 1) {
                        me.LoadCR();
                    }
                    else {
                        alert("删除失败！");
                    }
                });
            }
        }
        catch (e) {; }
    },
    VenueNew: function () {
        var me = BaseData;
        try {
            me.Datas.CurIndex = -1;
            me.doShowVenueDlg(-1);
        }
        catch (e) {; }
    },
    VenueEdit: function (Index) {
        var me = BaseData;
        try {
            me.Datas.CurIndex = 1;
            me.doShowVenueDlg(Index);
        }
        catch (e) {; }
    },
    doShowVenueDlg: function (Index) {
        var me = BaseData;
        try {

            var aDlg = $("#myModal");
            if (me.Datas.CurIndex == 1) {
                var aItem = me.Datas.LoaclDatas.VenueInfo[Index];
                // me.Datas.CurItemID = aItem.ID;
                me.Datas.Index = Index;
                $("#myModalLabel").text("修改场馆信息");
                aDlg.on('shown.bs.modal', function () {
                    $("#VenueCode").val(aItem.VenueCode);
                    $("#VenueName").val(aItem.VenueName);
                    $("#VenueLocalName").val(aItem.VenueLocalName);
                    $("#VenueLongName").val(aItem.VenueLongName);
                    $("#VenueLocalLongName").val(aItem.VenueLocalLongName);
                }).on('hidden.bs.modal', function () {
                    me.LoadVenue();
                });
                aDlg.modal('toggle');
            } else {
                aDlg.on('shown.bs.modal', function () {

                }).on('hidden.bs.modal', function () {
                    me.LoadVenue();
                });
                aDlg.modal('toggle');
            }

        }
        catch (e) {; }
    },
    doVenuePost: function () {
        var me = BaseData;
        try {
            if (me.Datas.CurIndex == 1) {
                var aItem = me.Datas.LoaclDatas.VenueInfo[me.Datas.Index];
                var aInfo = {
                    ID: aItem.ID,
                    VenueCode: $("#VenueCode").val(),
                    VenueName: $("#VenueName").val(),
                    VenueLocalName: $("#VenueLocalName").val(),
                    VenueLongName: $("#VenueLongName").val(),
                    VenueLocalLongName: $("#VenueLocalLongName").val()
                };
                var aPath = me.Path.editVenue;
                Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                    if (aRes.State == 1) {
                        $("#myModal").modal('toggle');
                        me.LoadVenue();
                    }
                    else {
                        alert("提交失败！");
                    }
                });
            } else {
                var aInfo = {
                    //ID: aItem.ID,
                    VenueCode: $("#VenueCode").val(),
                    VenueName: $("#VenueName").val(),
                    VenueLocalName: $("#VenueLocalName").val(),
                    VenueLongName: $("#VenueLongName").val(),
                    VenueLocalLongName: $("#VenueLocalLongName").val()
                };
                var aPath = me.Path.newVenue;
                Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                    if (aRes.State == 1) {
                        $("#myModal").modal('toggle');
                        me.LoadVenue();
                    }
                    else {
                        alert("提交失败！");
                    }
                });
            }

        }
        catch (e) {; }
    },
    deleteVenue: function (Index) {
        var me = BaseData;
        try {
            var aItem = me.Datas.LoaclDatas.VenueInfo[Index];
            var aPath = me.Path.delVenue;

            var aFlag = window.confirm("是否确定删除该场馆信息？");
            if (aFlag) {
                Ac.acExecuteSql(aPath, { ID: aItem.ID }, function (aRes) {
                    if (aRes.State == 1) {
                        me.LoadVenue();
                    }
                    else {
                        alert("删除失败！");
                    }
                });
            }
        }
        catch (e) {; }
    },
    EventInfoNew: function () {
        var me = BaseData;
        try {
            me.Datas.CurIndex = -1;
            me.doShowEventInfoDlg(-1);
        }
        catch (e) {; }
    },
    EventInfoEdit: function (Index) {
        var me = BaseData;
        try {
            me.Datas.CurIndex = 1;
            me.doShowEventInfoDlg(Index);
        }
        catch (e) {; }
    },
    doShowEventInfoDlg: function (Index) {
        var me = BaseData;
        try {

            var aDlg = $("#myModal");
            if (me.Datas.CurIndex == 1) {
                var aItem = me.Datas.LoaclDatas.EventInfo[Index];
                // me.Datas.CurItemID = aItem.ID;
                me.Datas.Index = Index;
                $("#myModalLabel").text("修改比赛项目");
                aDlg.on('shown.bs.modal', function () {
                    $("#EventCode").val(aItem.EventCode);
                    $("#EventName").val(aItem.EventName);
                    $("#EventLocalName").val(aItem.EventLocalName);
                    $("#EventOrder").val(aItem.EventOrder);
                    $("#EventLongName").val(aItem.EventLongName);
                    $("#EventLocalLongName").val(aItem.EventLocalLongName);
                    $("#EventTeam").val(aItem.EventTeam);
                    $("#EventDescription").val(aItem.EventDescription);
                    //$("#EventGender option:selected").val(aItem.EventGender);
                }).on('hidden.bs.modal', function () {
                    me.LoadEventInfo();
                });
                aDlg.modal('toggle');
            } else {
                aDlg.on('shown.bs.modal', function () {

                }).on('hidden.bs.modal', function () {
                    me.LoadEventInfo();
                });
                aDlg.modal('toggle');
            }

        }
        catch (e) {; }
    },
    doEventInfoPost: function () {
        var me = BaseData;
        try {
            if (me.Datas.CurIndex == 1) {
                var aItem = me.Datas.LoaclDatas.EventInfo[me.Datas.Index];
                var aInfo = {
                    ID: aItem.ID,
                    EventCode: $("#EventCode").val(),
                    EventName: $("#EventName").val(),
                    EventLocalName: $("#EventLocalName").val(),
                    EventOrder: $("#EventOrder").val(),
                    EventLongName: $("#EventLongName").val(),
                    EventLocalLongName: $("#EventLocalLongName").val(),
                    EventTeam: $("#EventTeam").val(),
                    EventDescription: $("#EventDescription").val(),
                    EventGender: $("#EventGender option:selected").val()
                };
                var aPath = me.Path.editEventInfo;
                Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                    if (aRes.State == 1) {
                        $("#myModal").modal('toggle');
                        me.LoadEventInfo();
                    }
                    else {
                        alert("提交失败！");
                    }
                });
            } else {
                var aInfo = {
                    //ID: aItem.ID,
                    EventCode: $("#EventCode").val(),
                    EventName: $("#EventName").val(),
                    EventLocalName: $("#EventLocalName").val(),
                    EventOrder: $("#EventOrder").val(),
                    EventLongName: $("#EventLongName").val(),
                    EventLocalLongName: $("#EventLocalLongName").val(),
                    EventTeam: $("#EventTeam").val(),
                    EventDescription: $("#EventDescription").val(),
                    EventGender: $("#EventGender option:selected").val()
                };
                var aPath = me.Path.newEventInfo;
                Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                    if (aRes.State == 1) {
                        $("#myModal").modal('toggle');
                        me.LoadEventInfo();
                    }
                    else {
                        alert("提交失败！");
                    }
                });
            }

        }
        catch (e) {; }
    },
    deleteEventInfo: function (Index) {
        var me = BaseData;
        try {
            var aItem = me.Datas.LoaclDatas.EventInfo[Index];
            var aPath = me.Path.delEventInfo;

            var aFlag = window.confirm("是否确定删除该赛事信息？");
            if (aFlag) {
                Ac.acExecuteSql(aPath, { ID: aItem.ID }, function (aRes) {
                    if (aRes.State == 1) {
                        me.LoadEventInfo();
                    }
                    else {
                        alert("删除失败！");
                    }
                });
            }
        }
        catch (e) {; }
    },
    //加载表单
    DataTables: function () {
        var me = BaseData;
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
    }
}