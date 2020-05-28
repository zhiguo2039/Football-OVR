

var Sign = {
    Datas: {
        DataKey: "",
        Index: null,
        aIndex:null,
        CurIndex: null,
        Page:null,
        LoaclDatas: {
            DeleInfo: [],
            AthInfo: [],
            ResDataInfo: [],
            ResAthInfo: [],
            OfficialInfo: [],
            DelegationInfo: [],
            EventInfo: [],
            ParticipantInfo:[],
            Menus: {
                Index: 0,
                Items: [
                    { Key: "" },
                ]
            }
        }
    },
    Tpls: {

        tplDelegation: { P: "Modules/Registration/tplDelegation.htm", C: "" },
        tplAth: { P: "Modules/Registration/tplAth.htm", C: "" },
        tplDeleOption: { P: "Modules/Registration/tplDeleOption.htm", C: "" },
        tplOfficial: { P: "Modules/Registration/tplOfficial.htm", C: "" },
        tplCROption: { P: "Modules/Registration/tplCROption.htm", C: "" },
        tplResData: { P: "Modules/Registration/tplResData.htm", C: "" },
        tplAddRes: { P: "Modules/Registration/tplAddRes.htm", C: "" },
        tplEventOption: { P: "Modules/Registration/tplEventOption.htm", C: "" },
        tplResAth: { P: "Modules/Registration/tplResAth.htm", C: "" },
        tplResTable: { P: "Modules/Registration/tplResTable.htm", C: "" },
        tplResEventOption: { P: "Modules/Registration/tplResEventOption.htm", C: "" },     
        tplParAth: { P: "Modules/Registration/tplParAth.htm", C: "" },

    },
    Path: {
        getDele: "Registration/getDele.txt",
        newDele: "Registration/newDele.txt",
        editDele: "Registration/editDele.txt",
        delDele: "Registration/delDele.txt",

        getCROption: "Registration/getCROption.txt",
        getParticipant: "Registration/getParticipant.txt",

        getAth: "Registration/getAth.txt",
        newAth: "Registration/newAth.txt",
        editAth: "Registration/editAth.txt",
        delAth: "Registration/delAth.txt",

        getOfficial: "Registration/getOfficial.txt",
        newOfficial: "Registration/newOfficial.txt",
        editOfficial: "Registration/editOfficial.txt",
        delOfficial: "Registration/delOfficial.txt",


        getParticipantAthlete: "Registration/getParticipantAthlete.txt",
        getResData: "Registration/getResData.txt",
        editResData: "Registration/editResData.txt",
        getResDele: "Registration/getResDele.txt",
        

        getDeleAth: "Registration/getDeleAth.txt",
        getEvent: "Registration/getEvent.txt",
        newParticipant: "Registration/newParticipant.txt",
        delParticipant: "Registration/delParticipant.txt",
        getPAth: "Registration/getPAth.txt",
        newParticipantMember: "Registration/newParticipantMember.txt",
    },
    //加载代表团信息
    LoadDelegation: function (Index) {
        var me = Sign;
        try {
            hhls.GetTpls(me.Tpls, function () {
               
                Ac.acGetTable(me.Path.getDele, {}, function (aRes) {
                    var aDe = aRes.Datas;
                    me.Datas.LoaclDatas.DeleInfo = aDe.DA;
                    var aHtml = bt(me.Tpls.tplDelegation.C, { tplData: aDe.DA });
                    hhls.fillElement("#tab-1", aHtml);
                    CommonData.DataTables(Index);
                });
            });
        }
        catch (e) {; }
    },
    //新增代表团 表单弹出
    NewDele: function () {
        var me = Sign;
        try {
            me.Datas.CurIndex = -1;
            var aDlg = $("#myModal");
            aDlg.on('shown.bs.modal', function () {
                me.Datas.Page = CommonData.GetDataTablesNum();
            	me.VDele();
            }).on('hidden.bs.modal', function () {
                me.LoadDelegation(me.Datas.Page);
            });
            aDlg.modal('toggle');
        }
        catch (e) {; }
    },
    //编辑代表团信息 数据回显 表单 
    showEditDlg: function (Index) {
        var me = Sign;
        try {
            var aItem = me.Datas.LoaclDatas.DeleInfo[Index];
            // me.Datas.CurItemID = aItem.ID;
            me.Datas.Index = Index;
            var aDlg = $("#myModal");
                me.Datas.CurIndex = 1;
                $("#myModalLabel").text("修改代表团信息");
                aDlg.on('shown.bs.modal', function () {
                    me.Datas.Page = CommonData.GetDataTablesNum();
                	me.VDele();
                    $("#DelegationCode").val(aItem.DelegationCode);
                    $("#DelegationName").val(aItem.DelegationName);
                    $("#DelegationLocalName").val(aItem.DelegationLocalName);
                    $("#DelegationFullName").val(aItem.DelegationFullName);
                    $("#DelegationLocalFullName").val(aItem.DelegationLocalFullName);
                    $("#DelegationSYMBOL").val(aItem.DelegationSYMBOL);
                }).on('hidden.bs.modal', function () {
                    me.LoadDelegation(me.Datas.Page);
                });
                aDlg.modal('toggle');
            }
        
        catch (e) {; }
    },
    //表单Post 提交代表团数据
    doDelePost: function () {
        var me = Sign;
        try {
            var bv = $('#VDele').data('bootstrapValidator');
            bv.validate();
            if (bv.isValid()) {
            if (me.Datas.CurIndex == -1) {
                var aInfo = {
                    //ID: aItem.ID,
                    DelegationCode: $("#DelegationCode").val(),
                    DelegationName: $("#DelegationName").val(),
                    DelegationLocalName: $("#DelegationLocalName").val(),
                    DelegationFullName: $("#DelegationFullName").val(),
                    DelegationLocalFullName: $("#DelegationLocalFullName").val(),
                    DelegationSYMBOL: $("#DelegationSYMBOL").val()
                };
                var aPath = me.Path.newDele;
                Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                    if (aRes.State == 1) {
                        var aDlg = $("#myModal");
                        aDlg.on('shown.bs.modal', function () {
                            me.Datas.Page = CommonData.GetDataTablesNum();
						me.VDele();
                        }).on('hidden.bs.modal', function () {
                            me.LoadDelegation(me.Datas.Page);
                        });
                        aDlg.modal('toggle');
                    }
                    else {
                        alert("提交失败！");
                    }
                });
            } else {
                var aInfo = {
                    ID: me.Datas.LoaclDatas.DeleInfo[me.Datas.Index].ID,
                    DelegationCode: $("#DelegationCode").val(),
                    DelegationName: $("#DelegationName").val(),
                    DelegationLocalName: $("#DelegationLocalName").val(),
                    DelegationFullName: $("#DelegationFullName").val(),
                    DelegationLocalFullName: $("#DelegationLocalFullName").val(),
                    DelegationSYMBOL: $("#DelegationSYMBOL").val()
                };
                var aPath = me.Path.editDele;
                Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                    if (aRes.State == 1) {
                        var aDlg = $("#myModal");
                        aDlg.on('shown.bs.modal', function () {
                            me.Datas.Page = CommonData.GetDataTablesNum();
						me.VDele();
                        }).on('hidden.bs.modal', function () {
                            me.LoadDelegation(me.Datas.Page);
                        });
                        aDlg.modal('toggle');
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
    //删除代表团信息
    delDelegation: function (Index) {
        var me = Sign;
        try {
            var aItem = me.Datas.LoaclDatas.DeleInfo[Index];
            var aPath = me.Path.delDele;
            me.Datas.Page = CommonData.GetDataTablesNum();
            var aFlag = window.confirm("是否确定删除该代表团信息？");
            if (aFlag) {
                Ac.acExecuteSql(aPath, { ID: aItem.ID }, function (aRes) {
                    if (aRes.State == 1) {
                        me.LoadDelegation(me.Datas.Page);
                    }
                    else {
                        alert("删除失败！");
                    }
                });
            }
        }
        catch (e) {; }
    },
    //加载运动员数据
    LoadAth: function (Index) {
        var me = Sign;
        try {
            hhls.GetTpls(me.Tpls, function () {
                
                Ac.acGetTable(me.Path.getAth, {}, function (aRes) {
                    var aAt = aRes.Datas;
                    me.Datas.LoaclDatas.AthInfo = aAt.DA;
                    var aHtml = bt(me.Tpls.tplAth.C, { tplData: aAt.DA });
                    hhls.fillElement("#tab-1", aHtml);
                    CommonData.DataTables(Index);
                });
            });
        }
        catch (e) {; }
    },

    //新增运动员 表单弹出
    NewAth: function () {
        var me = Sign;
        try {
            me.Datas.CurIndex = -1;
            var aDlg = $("#myModal");
            aDlg.on('shown.bs.modal', function () {
                me.Datas.Page = CommonData.GetDataTablesNum();
				me.VAth();
                me.LoadSelect();
                //加载下拉框选择插件
                //$('.chosen-select').chosen({ width: "100%" });
                //加载运动员出生日期插件
                $('#AthleteBirthDay').datepicker({
                    todayBtn: "linked",
                    format:"yyyy-mm-dd",
                    keyboardNavigation: false,
                    forceParse: false,
                    calendarWeeks: true,
                    autoclose: true
                });
            }).on('hidden.bs.modal', function () {
                me.LoadAth(me.Datas.Page);
            });
            aDlg.modal('toggle');
        }
        catch (e) {; }
    },
    //编辑运动员信息 数据回显 表单 
    showAthEditDlg: function (Index) {
        var me = Sign;
        try {
            var aItem = me.Datas.LoaclDatas.AthInfo[Index];
            // me.Datas.CurItemID = aItem.ID;
            me.Datas.Index = Index;
            var aDlg = $("#myModal");
                 me.Datas.CurIndex = 1;
                $('#myModalLabel').text("修改运动员信息");
            aDlg.on('shown.bs.modal', function () {
                   me.Datas.Page = CommonData.GetDataTablesNum();
                    me.VAth();                  
                    $("#AthleteLocalName").val(aItem.AthleteLocalName);
                    $("#AthleteLocalShortName").val(aItem.AthleteLocalShortName);
                    $("#AthleteName").val(aItem.AthleteName);
                    $("#AthleteShortName").val(aItem.AthleteShortName);                   
                    $("#AthleteGender option:selected").val(aItem.AthleteGender);               
                    $("#AthleteCode").val(aItem.AthleteCode);
                    $("#AthleteFamilyName").val(aItem.AthleteFamilyName);
                    $("#AthleteGivenName").val(aItem.AthleteGivenName);
                    $("#AthleteTVName").val(aItem.AthleteTVName);
                    $("#AthleteTVShortName").val(aItem.AthleteTVShortName);
                    $("#AthleteWeight").val(aItem.AthleteWeight);
                    $("#AthleteHeight").val(aItem.AthleteHeight);
                    $("#AthleteBirthDay").val(aItem.AthleteBirthDay);
                    //$("#DelegationID option:selected").val(aItem.DelegationID);
                    //$("#ContryRegionCode option:selected").val(aItem.ContryRegionCode);
                    $('#AthleteGender').find('option[value=' + aItem.AthleteGender + ']').attr('selected', 'selected');
                    me.LoadSelectAthlete();
                }).on('hidden.bs.modal', function () {
                    me.LoadAth(me.Datas.Page);
                });
                aDlg.modal('toggle');
            }
        
        catch (e) {; }
    },
    LoadSelectAthlete: function () {
        var me = Sign;
        //me.Datas.Page = CommonData.GetDataTablesNum();
        var aItem = me.Datas.LoaclDatas.AthInfo[me.Datas.Index];
        try {
            hhls.GetTpls(me.Tpls, function () {
                Ac.acGetTable(me.Path.getDele, {}, function (aRes) {
                    var a = aRes.Datas;
                    var aHtml = bt(me.Tpls.tplDeleOption.C, { tplData: a.DA });
                    hhls.fillElement("#DeleSelect", aHtml);
                    $("#DelegationID").val(aItem.DelegationID);
                    //加载下拉框选择插件
                    $('.chosen-select').chosen({ width: "100%" });
                });

                Ac.acGetTable(BaseData.Path.getCountryRegion, {}, function (aRes) {
                    var a = aRes.Datas;
                    var aHtml = bt(me.Tpls.tplCROption.C, { tplData: a.DA });
                    hhls.fillElement("#CRSelect", aHtml);
                    $("#ContryRegionCode").val(aItem.ContryRegionCode);
                    //加载下拉框选择插件
                    $('.chosen-select').chosen({ width: "100%" });
                });
            });

        }
        catch (e) {; }
    },
    LoadSelectOfficial: function () {
        var me = Sign;
        //me.Datas.Page = CommonData.GetDataTablesNum();
        var aItemOfficial = me.Datas.LoaclDatas.OfficialInfo[me.Datas.aIndex];
        try {
            hhls.GetTpls(me.Tpls, function () {
                //Ac.acGetTable(me.Path.getDele, {}, function (aRes) {
                //    var a = aRes.Datas;
                //    var aHtml = bt(me.Tpls.tplDeleOption.C, { tplData: a.DA });
                //    hhls.fillElement("#DeleSelect", aHtml);
                //    $("#DelegationID").val(aItemOfficial.DelegationID);
                //    //加载下拉框选择插件
                //    $('.chosen-select').chosen({ width: "100%" });
                //});

                Ac.acGetTable(BaseData.Path.getCountryRegion, {}, function (aRes) {
                    var a = aRes.Datas;
                    var aHtml = bt(me.Tpls.tplCROption.C, { tplData: a.DA });
                    hhls.fillElement("#CRSelect", aHtml);
                    $("#ContryRegionCode").val(aItemOfficial.ContryRegionCode);
                    //加载下拉框选择插件
                    $('.chosen-select').chosen({ width: "100%" });
                });
            });

        }
        catch (e) {; }
    },

    LoadSelect: function () {
        var me = Sign;
        try {
            hhls.GetTpls(me.Tpls, function () {
                Ac.acGetTable(me.Path.getDele, {}, function (aRes) {
                    var a = aRes.Datas;                  
                    var aHtml = bt(me.Tpls.tplDeleOption.C, { tplData: a.DA });
                    hhls.fillElement("#DeleSelect", aHtml);
                    //加载下拉框选择插件
                    $('.chosen-select').chosen({ width: "100%" });
                });

                Ac.acGetTable(BaseData.Path.getCountryRegion, {}, function (aRes) {
                    var a = aRes.Datas;
                    var aHtml = bt(me.Tpls.tplCROption.C, { tplData: a.DA });
                    hhls.fillElement("#CRSelect", aHtml);
                    //加载下拉框选择插件
                    $('.chosen-select').chosen({ width: "100%" });
                });
            });

        }
        catch (e) {; }
    },
    //表单Post 提交运动员数据
    doAthPost: function () {
        var me = Sign;
        try {
            var bv = $('#VAth').data('bootstrapValidator');
            bv.validate();
            if (bv.isValid()) {
            if (me.Datas.CurIndex == -1) {
                
                var aInfo = {
                    //ID: aItem.ID,
                    AthleteLocalName: $("#AthleteLocalName").val(),
                    AthleteLocalShortName: $("#AthleteLocalShortName").val(),
                    AthleteName: $("#AthleteName").val(),
                    AthleteShortName: $("#AthleteShortName").val(),
                    AthleteCode: $("#AthleteCode").val(),
                    AthleteFamilyName: $("#AthleteFamilyName").val(),
                    AthleteGivenName: $("#AthleteGivenName").val(),
                    AthleteTVName: $("#AthleteTVName").val(),
                    AthleteTVShortName: $("#AthleteTVShortName").val(),
                    AthleteWeight: $("#AthleteWeight").val(),
                    AthleteHeight: $("#AthleteHeight").val(),
                    AthleteBirthDay: $("#AthleteBirthDay").val(),
                    AthleteGender:$("#AthleteGender").val(),
                    DelegationID: $("#DelegationID option:selected").val(),
                    ContryRegionCode: $("#ContryRegionCode option:selected").val()
                };
                
                var aPath = me.Path.newAth;
                Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                    if (aRes.State == 1) {
                        var aDlg = $("#myModal");
                        aDlg.on('shown.bs.modal', function () {
                            me.Datas.Page = CommonData.GetDataTablesNum();
						me.VAth();
                        }).on('hidden.bs.modal', function () {
                            me.LoadAth(me.Datas.Page);
                        });
                        aDlg.modal('toggle');
                    }
                    else {
                        alert("提交失败！");
                    }
                });
            } else {

               
                var aInfo = {
                    ID: me.Datas.LoaclDatas.AthInfo[me.Datas.Index].ID,
                    AthleteLocalName: $("#AthleteLocalName").val(),
                    AthleteLocalShortName: $("#AthleteLocalShortName").val(),
                    AthleteName: $("#AthleteName").val(),
                    AthleteShortName: $("#AthleteShortName").val(),
                    AthleteCode: $("#AthleteCode").val(),
                    AthleteFamilyName: $("#AthleteFamilyName").val(),
                    AthleteGivenName: $("#AthleteGivenName").val(),
                    AthleteTVName: $("#AthleteTVName").val(),
                    AthleteTVShortName: $("#AthleteTVShortName").val(),
                    AthleteWeight: $("#AthleteWeight").val(),
                    AthleteHeight: $("#AthleteHeight").val(),
                    AthleteBirthDay: $("#AthleteBirthDay").val(),
                    AthleteGender: $("#AthleteGender").val(),
                    DelegationID: $("#DelegationID option:selected").val(),
                    ContryRegionCode: $("#ContryRegionCode option:selected").val()
                };
             
                var aPath = me.Path.editAth;
                Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                    if (aRes.State == 1) {
                        var aDlg = $("#myModal");
                        aDlg.on('shown.bs.modal', function () {
                            me.Datas.Page = CommonData.GetDataTablesNum();
						me.VAth();
                        }).on('hidden.bs.modal', function () {
                            me.LoadAth(me.Datas.Page);
                        });
                        aDlg.modal('toggle');
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
    //删除运动员信息
    delAth: function (Index) {
        var me = Sign;
        try {
            var aItem = me.Datas.LoaclDatas.AthInfo[Index];
            var aPath = me.Path.delAth;
            me.Datas.Page = CommonData.GetDataTablesNum();
            var aFlag = window.confirm("是否确定删除该运动员信息？");
            if (aFlag) {
                Ac.acExecuteSql(aPath, { ID: aItem.ID }, function (aRes) {
                    if (aRes.State == 1) {
                        me.LoadAth(me.Datas.Page);
                    }
                    else {
                        alert("删除失败！");
                    }
                });
            }
        }
        catch (e) {; }
    },
    //加载官员与裁判数据
    LoadOfficial: function (Index) {
        var me = Sign;
        try {
            hhls.GetTpls(me.Tpls, function () {
                
                Ac.acGetTable(me.Path.getOfficial, {}, function (aRes) {
                    var aOfficial = aRes.Datas;
                    me.Datas.LoaclDatas.OfficialInfo = aOfficial.DA;
                    var aHtml = bt(me.Tpls.tplOfficial.C, { tplData: aOfficial.DA });
                    hhls.fillElement("#tab-1", aHtml);
                    CommonData.DataTables(Index);
                });
            });
        }
        catch (e) {; }
    },
    //新增官员与裁判 表单弹出
    NewOfficial: function () {
        var me = Sign;
        try {
            me.Datas.CurIndex = -1;
            var aDlg = $("#myModal");
            aDlg.on('shown.bs.modal', function () {
                me.Datas.Page = CommonData.GetDataTablesNum();
			me.VOff();
                me.LoadSelect();
                //加载下拉框选择插件
                //$('.chosen-select').chosen({ width: "100%" });
                //加载官员与裁判出生日期插件
                $('#OfficialBirthDay').datepicker({
                    todayBtn: "linked",
                    format:"yyyy-mm-dd",
                    keyboardNavigation: false,
                    forceParse: false,
                    calendarWeeks: true,
                    autoclose: true
                });
            }).on('hidden.bs.modal', function () {
                me.LoadOfficial( me.Datas.Page);
            });
            aDlg.modal('toggle');
        }
        catch (e) {; }
    },
    //编辑官员与裁判信息 数据回显 表单 
    showOfficialEditDlg: function (Index) {
        var me = Sign;
        try {
            var aItem = me.Datas.LoaclDatas.OfficialInfo[Index];
            // me.Datas.CurItemID = aItem.ID;
            me.Datas.aIndex = Index;
            var aDlg = $("#myModal");
                 me.Datas.CurIndex = 1;
                $("#myModalLabel").text("修改官员与裁判信息");
                aDlg.on('shown.bs.modal', function () {
                    //me.VOff();
                    me.Datas.Page = CommonData.GetDataTablesNum();
                    $("#OfficialLocalName").val(aItem.OfficialLocalName);
                    $("#OfficialLocalShortName").val(aItem.OfficialLocalShortName);
                    $("#OfficialName").val(aItem.OfficialName);
                    $("#OfficialShortName").val(aItem.OfficialShortName);
                    $('#OfficialGender').find('option[value=' + aItem.OfficialGender + ']').attr('selected', 'selected');
//                    if (aItem.OfficialGender == 'M') {
//                        $("#OfficialGender").val('男');
//                    } else {
//                        $("#OfficialGender").val('女');
                    //                    }
                    if (aItem.OfficialFunction != "") {
                        $('#OfficialFunction').find('option[value=' + aItem.OfficialFunction + ']').attr('selected', 'selected');
                    }
                    $("#OfficialCode").val(aItem.OfficialCode);
                    $("#OfficialFamilyName").val(aItem.OfficialFamilyName);
                    $("#OfficialGivenName").val(aItem.OfficialGivenName);
                    $("#OfficialTVName").val(aItem.OfficialTVName);
                    $("#OfficialTVShortName").val(aItem.OfficialTVShortName);
                    $("#OfficialWeight").val(aItem.OfficialWeight);
                    $("#OfficialHeight").val(aItem.OfficialHeight);
                    $("#OfficialBirthDay").val(aItem.OfficialBirthDay);
                    $("#OfficialIFCode").val(aItem.OfficialIFCode);
                    //$("#OfficialFunction").val(aItem.OfficialFunction);
                    $("#OfficialModifyTag").val(aItem.OfficialModifyTag);
                    $("#OfficialMemo").val(aItem.OfficialMemo);
                    me.LoadSelectOfficial();
                }).on('hidden.bs.modal', function () {
                    me.LoadOfficial( me.Datas.Page );
                });
                aDlg.modal('toggle');
            }
        
        catch (e) {; }
    },
//    //表单Post 提交官员与裁判数据
//    doOfficialPost: function () {
//        var me = Sign;
//        try {
//            var bv = $('#VOff').data('bootstrapValidator');
//            bv.validate();
//            if (bv.isValid()) {
//            if (me.Datas.CurIndex == -1) {

//                var aInfo = {
//                    //ID: aItem.ID,
//                    OfficialLocalName: $("#OfficialLocalName").val(),
//                    OfficialLocalShortName: $("#OfficialLocalShortName").val(),
//                    OfficialName: $("#OfficialName").val(),
//                    OfficialShortName: $("#OfficialShortName").val(),
//                    OfficialCode: $("#OfficialCode").val(),
//                    OfficialFamilyName: $("#OfficialFamilyName").val(),
//                    OfficialGivenName: $("#OfficialGivenName").val(),
//                    OfficialTVName: $("#OfficialTVName").val(),
//                    OfficialTVShortName: $("#OfficialTVShortName").val(),
//                    OfficialWeight: $("#OfficialWeight").val(),
//                    OfficialHeight: $("#OfficialHeight").val(),
//                    OfficialBirthDay: $("#OfficialBirthDay").val(),
//                    OfficialIFCode: $("#OfficialIFCode").val(),
//                    OfficialFunction: $("#OfficialFunction").val(),
//                    OfficialModifyTag: $("#OfficialModifyTag").val(),
//                    OfficialMemo: $("#OfficialMemo").val(),
//                    // AthleteGender: null,
//                    //DelegationID: $("#DelegationID option:selected").val(),
//                    OfficialGender: $("#OfficialGender").val(),
//                    ContryRegionCode: $("#ContryRegionCode option:selected").val()
//                };
////                if ($("#OfficialGender").val() == '男') {
////                    aInfo.OfficialGender = 'M';
////                } else {
////                    aInfo.OfficialGender = 'W';
////                }
//                var aPath = me.Path.newOfficial;
//                Ac.acExecuteSql(aPath, aInfo, function (aRes) {
//                    if (aRes.State == 1) {
//                        var aDlg = $("#myModal");
//                        aDlg.on('shown.bs.modal', function () {

//                        }).on('hidden.bs.modal', function () {
//                            me.LoadOfficial();
//                        });
//                        aDlg.modal('toggle');
//                    }
//                    else {
//                        alert("提交失败！");
//                    }
//                });
//            } else {
//                var aInfo = {
//                    ID: me.Datas.LoaclDatas.OfficialInfo[me.Datas.aIndex].ID,
//                    OfficialLocalName: $("#OfficialLocalName").val(),
//                    OfficialLocalShortName: $("#OfficialLocalShortName").val(),
//                    OfficialName: $("#OfficialName").val(),
//                    OfficialShortName: $("#OfficialShortName").val(),
//                    OfficialCode: $("#OfficialCode").val(),
//                    OfficialFamilyName: $("#OfficialFamilyName").val(),
//                    OfficialGivenName: $("#OfficialGivenName").val(),
//                    OfficialTVName: $("#OfficialTVName").val(),
//                    OfficialTVShortName: $("#OfficialTVShortName").val(),
//                    OfficialWeight: $("#OfficialWeight").val(),
//                    OfficialHeight: $("#OfficialHeight").val(),
//                    OfficialBirthDay: $("#OfficialBirthDay").val(),
//                    OfficialIFCode: $("#OfficialIFCode").val(),
//                    OfficialFunction: $("#OfficialFunction").val(),
//                    OfficialModifyTag: $("#OfficialModifyTag").val(),
//                    OfficialMemo: $("#OfficialMemo").val(),
//                    // OfficialGender: null,
//                    DelegationID: $("#DelegationID option:selected").val(),
//                    OfficialGender: $("#OfficialGender").val(),
//                    ContryRegionCode: $("#ContryRegionCode option:selected").val()
//                };
////                if ($("#OfficialGender").val() == '男') {
////                    aInfo.OfficialGender = 'M';
////                } else {
////                    aInfo.OfficialGender = 'W';
////                }
//                var aPath = me.Path.editOfficial;
//                Ac.acExecuteSql(aPath, aInfo, function (aRes) {
//                    if (aRes.State == 1) {
//                        var aDlg = $("#myModal");
//                        aDlg.on('shown.bs.modal', function () {
//                        }).on('hidden.bs.modal', function () {
//                            me.LoadOfficial();
//                        });
//                        aDlg.modal('toggle');
//                    }
//                    else {
//                        alert("提交失败！");
//                    }
//                });
//            }
//            }
//        }
//        catch (e) {; }
    //    },

    doOfficialPost: function () {
        var me = Sign;
        try {
            //var bv = $('#VOff').data('bootstrapValidator');
            //bv.validate();
            //if (bv.isValid()) {
                if (me.Datas.CurIndex == -1) {

                    var aInfo = {
                        //ID: aItem.ID,
                        OfficialLocalName: $("#OfficialLocalName").val(),
                        OfficialLocalShortName: $("#OfficialLocalShortName").val(),
                        OfficialName: $("#OfficialName").val(),
                        OfficialShortName: $("#OfficialShortName").val(),
                        OfficialCode: $("#OfficialCode").val(),
                        OfficialFamilyName: $("#OfficialFamilyName").val(),
                        OfficialGivenName: $("#OfficialGivenName").val(),
                        OfficialTVName: $("#OfficialTVName").val(),
                        OfficialTVShortName: $("#OfficialTVShortName").val(),
                        OfficialWeight: $("#OfficialWeight").val(),
                        OfficialHeight: $("#OfficialHeight").val(),
                        OfficialBirthDay: $("#OfficialBirthDay").val(),
                        OfficialIFCode: $("#OfficialIFCode").val(),
                        OfficialFunction: $("#OfficialFunction option:selected").val(),
                        OfficialMemo: $("#OfficialMemo").val(),
                        // AthleteGender: null,
                        OfficialGender: $("#OfficialGender option:selected").val(),
                        DelegationID: $("#DelegationID option:selected").val(),
                        ContryRegionCode: $("#ContryRegionCode option:selected").val(),
                        OfficialGender: $("#OfficialGender option:selected").val()
                    };
                    //                if ($("#OfficialGender").val() == '男') {
                    //                    aInfo.OfficialGender = 'M';
                    //                } else {
                    //                    aInfo.OfficialGender = 'W';
                    //                }
                    var aPath = me.Path.newOfficial;
                    Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                        if (aRes.State == 1) {
                            var aDlg = $("#myModal");
                            aDlg.on('shown.bs.modal', function () {
                                me.Datas.Page = CommonData.GetDataTablesNum();
                            }).on('hidden.bs.modal', function () {
                                me.LoadOfficial(me.Datas.Page);
                            });
                            aDlg.modal('toggle');
                        }
                        else {
                            alert("提交失败！");
                        }
                    });
                } else {
                    var aInfo = {
                        ID: me.Datas.LoaclDatas.OfficialInfo[me.Datas.aIndex].ID,
                        OfficialLocalName: $("#OfficialLocalName").val(),
                        OfficialLocalShortName: $("#OfficialLocalShortName").val(),
                        OfficialName: $("#OfficialName").val(),
                        OfficialShortName: $("#OfficialShortName").val(),
                        OfficialCode: $("#OfficialCode").val(),
                        OfficialFamilyName: $("#OfficialFamilyName").val(),
                        OfficialGivenName: $("#OfficialGivenName").val(),
                        OfficialTVName: $("#OfficialTVName").val(),
                        OfficialTVShortName: $("#OfficialTVShortName").val(),
                        OfficialWeight: $("#OfficialWeight").val(),
                        OfficialHeight: $("#OfficialHeight").val(),
                        OfficialBirthDay: $("#OfficialBirthDay").val(),
                        OfficialIFCode: $("#OfficialIFCode").val(),
                        OfficialFunction: $("#OfficialFunction").val(),
                        OfficialMemo: $("#OfficialMemo").val(),
                        OfficialGender: $("#OfficialGender option:selected").val(),
                        DelegationID: $("#DelegationID option:selected").val(),
                        ContryRegionCode: $("#ContryRegionCode option:selected").val()
                    };
                    //if ($("#OfficialGender").val() == '男') {
                    //    aInfo.OfficialGender = 'M';
                    //} else {
                    //    aInfo.OfficialGender = 'W';
                    //}
                    var aPath = me.Path.editOfficial;
                    Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                        if (aRes.State == 1) {
                            var aDlg = $("#myModal");
                            aDlg.on('shown.bs.modal', function () {
                                me.Datas.Page = CommonData.GetDataTablesNum();
                            }).on('hidden.bs.modal', function () {
                                me.LoadOfficial(me.Datas.Page);
                            });
                            aDlg.modal('toggle');
                        }
                        else {
                            alert("提交失败！");
                        }
                    });
                }
            }
        //}
        catch (e) {; }
    },
    //删除官员与裁判信息
    delOfficial: function (Index) {
        var me = Sign;
        try {
            var aItem = me.Datas.LoaclDatas.OfficialInfo[Index];
            var aPath = me.Path.delOfficial;
            me.Datas.Page = CommonData.GetDataTablesNum();
            var aFlag = window.confirm("是否确定删除该官员与裁判信息？");
            if (aFlag) {
                Ac.acExecuteSql(aPath, { ID: aItem.ID }, function (aRes) {
                    if (aRes.State == 1) {
                        me.LoadOfficial(me.Datas.Page);
                    }
                    else {
                        alert("删除失败！");
                    }
                });
            }
        }
        catch (e) {; }
    },
    //加载比赛项目
    LoadResEvent: function () {
        var me = Sign;
        try {
            hhls.GetTpls(me.Tpls, function () {
                hhls.fillElement("#tab-1", me.Tpls.tplResData.C);
                Ac.acGetTable(me.Path.getEvent, {}, function (aRes) {
                    var a = aRes.Datas;
                    me.Datas.LoaclDatas.EventInfo = a.DA;
                    var aHtml = bt(me.Tpls.tplResEventOption.C, { tplData: a.DA });
                    hhls.fillElement("#ResEventSelect", aHtml);
                    me.LoadResData();
               
                });
            });
        }
        catch (e) {; }
    },
    //加载报名报项数据
    LoadResData: function () {
        var me = Sign;
        try {
            hhls.GetTpls(me.Tpls, function () {
                
                Ac.acGetTable(me.Path.getResData, { EventID: $("#ResEventID option:selected").val() }, function (aRes) {
                    var a = aRes.Datas;
                    me.Datas.LoaclDatas.ResDataInfo = a.DA;
                    var aHtml = bt(me.Tpls.tplResTable.C, { tplData: a.DA });
                    hhls.fillElement("#tab-2", aHtml);
                    me.DataTables();
                });
            });
        }
        catch (e) {; }
    },
    //显示新增报项模块
    NewResData: function () {
        var me = Sign;
        try {
            hhls.GetTpls(me.Tpls, function () {
                hhls.fillElement("#tab-1", me.Tpls.tplAddRes.C);

                Ac.acGetTable(me.Path.getEvent, {}, function (aRes) {
                    var a = aRes.Datas;
                    var aHtml = bt(me.Tpls.tplEventOption.C, { tplData: a.DA });
                    hhls.fillElement("#EventSelect", aHtml);
                    me.loadResDel();
                    //加载下拉框选择插件
                    $('.chosen-select').chosen({ width: "100%" });

                });
//                Ac.acGetTable(me.Path.getResDele, { EventID:$("#EventID option:selected").val() }, function (aRes) {
//                    var a = aRes.Datas;
//                   // alert($("#EventID option:selected").val());
//                    //me.Datas.LoaclDatas.DelegationInfo = a.DA;
//                    me.Datas.LoaclDatas.DelegationInfo=a.DA;
//                    var aHtml = bt(me.Tpls.tplDeleOption.C, { tplData: a.DA });
//                    hhls.fillElement("#DelegationSelect", aHtml);
//                    //加载下拉框选择插件
//                    $('.chosen-select').chosen({ width: "100%" });
//
//                    me.LoadResAth();
//                });
               
               

            });

            
        }
        catch (e) {; }
    },
    
    loadResDel:function(){
    	var me= Sign;
    	
    	 Ac.acGetTable(me.Path.getResDele, { EventID:$("#EventID option:selected").val() }, function (aRes) {
             var a = aRes.Datas;
            // alert($("#EventID option:selected").val());
             //me.Datas.LoaclDatas.DelegationInfo = a.DA;
             me.Datas.LoaclDatas.DelegationInfo=a.DA;
             var aHtml = bt(me.Tpls.tplDeleOption.C, { tplData: a.DA });
             hhls.fillElement("#DelegationSelect", aHtml);
             //加载下拉框选择插件
             $('.chosen-select').chosen({ width: "100%" });

             me.LoadResAth();
         });
    },
    
    //监听代表团下拉框选中事件
    LoadResAth: function () {
        var me = Sign;
        try {
            hhls.GetTpls(me.Tpls, function () {

                    Ac.acGetTable(me.Path.getDeleAth, { ID: $("#DelegationID option:selected").val(),EventID:$("#EventID option:selected").val() }, function (aRes) {
                    var a = aRes.Datas;
                    me.Datas.LoaclDatas.ResAthInfo = a.DA;
                    var aHtml = bt(me.Tpls.tplResAth.C, { tplData: a.DA });
                    hhls.fillElement("#ResDataform", aHtml);

                    $('.dual_select').bootstrapDualListbox({
                        selectorMinimalHeight: 160
                    });
                });

            });
        }
        catch (e) {; }
    },
    //自动显示报项名称 可以修改
    LoadParticipantName: function () {
        var me = Sign;
        try {
            //alert(me.Datas.LoaclDatas.ResAthInfo[$("#ParticipantName").get(0).selectedIndex].AthleteName);
            //alert($('[name="ParticipantName"]').val());

            //$("#Participant-Name").val($('[name="ParticipantName"]').val());
            if ($('[name="ParticipantName"]').val().length == 1) {
                $("#Participant-Name").val(me.Datas.LoaclDatas.ResAthInfo[$("#ParticipantName").get(0).selectedIndex].AthleteName);
            }
            else if ($('[name="ParticipantName"]').val().length == 2) {
                Ac.acGetTable(me.Path.getPAth, { ID1: $('[name="ParticipantName"]').val()[0], ID2: $('[name="ParticipantName"]').val()[1] }, function (aRes) {
                    var a = aRes.Datas.DA;
                    //me.Datas.LoaclDatas.ResAthInfo = a.DA;
                    var str = a[0].AthleteName + "/" + a[1].AthleteName;
                    $("#Participant-Name").val(str);
                });
            } else if ($('[name="ParticipantName"]').val().length > 2) {
                $("#Participant-Name").val(me.Datas.LoaclDatas.DelegationInfo[$("#DelegationID").get(0).selectedIndex].DelegationName);
            } else if ($('[name="ParticipantName"]').val().length == 0) {
                $("#Participant-Name").val('');
            }

        }
        catch (e) {; }
    },
    //新增报项数据
    NewResAth: function () {
        var me = Sign;
        try {


            var AthID = $('[name="ParticipantName"]').val();
            var tmp = '';
            for (var i = 0; i < AthID.length; i++) {

                if (i != AthID.length - 1) {
                    tmp = tmp + AthID[i] + ',';
                } else {
                    tmp = tmp + AthID[i];
                }

            }
            //alert($("#ParticipantName").get(0).selectedIndex);
            var aInfo = {
                //ID: aItem.ID,
                DelegationID: $("#DelegationID option:selected").val(),
                EventID: $("#EventID option:selected").val(),
                ParticipantCode: $("#ParticipantCode").val(),
                //ParticipantName: me.Datas.LoaclDatas.ResAthInfo[$("#ParticipantName").get(0).selectedIndex].AthleteName,
                //ParticipantLocalName: me.Datas.LoaclDatas.ResAthInfo[$("#ParticipantName").get(0).selectedIndex].AthleteLocalName
                ParticipantName: $("#Participant-Name").val(),
                ParticipantLocalName: $("#Participant-Name").val(),
                //CoachID: $("#CoachID option:selected").val(),
                AthleteID:tmp
            };
            var aPath = me.Path.newParticipant;
            if (tmp != '' & $("#ParticipantCode").val() != '' & $("#Participant-Name").val() != '') {
                Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                    if (aRes.State == 1) {
                        me.LoadResEvent();
                    }
                    else {
                        alert("提交失败！");
                    }
                });
            }
        }
        catch (e) {; }
    },

    //编辑报项信息 数据回显 报项信息 
    showParticipantDlg: function (Index) {
        var me = Sign;
        try {
            var aItem = me.Datas.LoaclDatas.ResDataInfo[Index];
            // me.Datas.CurItemID = aItem.ID;
            me.Datas.Index = Index;
            var aDlg = $("#myModal");
            aDlg.on('shown.bs.modal', function () {
                $("#ParticipantCode").val(aItem.ParticipantCode);
                $("#EventName").val(aItem.EventName);
                $("#EventLocalName").val(aItem.EventLocalName);
                $("#ParticipantName").val(aItem.ParticipantName);
                $("#DelegationName").val(aItem.DelegationName);
                $("#OfficialName").val(aItem.OfficialName);
                $("#ParticipantSeedNo").val(aItem.ParticipantSeedNo);
                $("#ParticipantDrawNo").val(aItem.ParticipantDrawNo);
            }).on('hidden.bs.modal', function () {
                me.LoadResData();
            });
            aDlg.modal('toggle');
        }

        catch (e) {; }
    },
    //表单Post 提交报名报项数据
    doParticipantPost: function () {
        var me = Sign;
        try {
            
                var aInfo = {
                    ID: me.Datas.LoaclDatas.ResDataInfo[me.Datas.Index].ID,
                    ParticipantCode: $("#ParticipantCode").val(),
                    //EventName: $("#EventName").val(),
                    //EventLocalName: $("#EventLocalName").val(),
                    ParticipantName: $("#ParticipantName").val(),
                    //DelegationName: $("#DelegationName").val(),
                    ParticipantSeedNo: $("#ParticipantSeedNo").val(),
                    ParticipantDrawNo: $("#ParticipantDrawNo").val(),
                };
                var aPath = me.Path.editResData;
                Ac.acExecuteSql(aPath, aInfo, function (aRes) {
                    if (aRes.State == 1) {
                        var aDlg = $("#myModal");
                        aDlg.on('shown.bs.modal', function () {

                        }).on('hidden.bs.modal', function () {
                            me.LoadResData();
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

    //查看报项成员的运动员信息
    lookParticipantAthlete: function (index) {
        //alert(index);
        var me = Sign;
        var ul = '#ParticipantAthlete' + index;
        //alert(ul);
        try {
            hhls.GetTpls(me.Tpls, function () {

                Ac.acGetTable(me.Path.getParticipantAthlete, { ParticipantID: index }, function (aRes) {
                    var a = aRes.Datas;
                    me.Datas.LoaclDatas.ParticipantAthlete = a.DA;
                    var aHtml = bt(me.Tpls.tplParAth.C, { ParticipantAthlete: a.DA });
                    hhls.fillElement(ul, aHtml);
                });

            });
        }
        catch (e) {; }
    },

    //删除报项数据
    delParticipant: function (Index) {
        var me = Sign;
        try {
            //var aItem = me.Datas.LoaclDatas.ResDataInfo[Index];
            var aPath = me.Path.delParticipant;

            var aFlag = window.confirm("是否确定删除该报名报项数据？");
            if (aFlag) {
                Ac.acExecuteSql(aPath, { ID: me.Datas.LoaclDatas.ResDataInfo[Index].ID }, function (aRes) {
                    if (aRes.State == 1) {
                        me.LoadResEvent();
                    }
                    else {
                        alert("删除失败！");
                    }
                });
            }
        }
        catch (e) {; }
    },
	 //验证代表团表单
    VDele:function(){
        var me = Sign;
        try {
            $('#VDele').bootstrapValidator({
                message: '必填项',
                group: '.rowGroup',
                feedbackIcons: {
                      valid: 'glyphicon glyphicon-ok',
                      invalid: 'glyphicon glyphicon-remove',
                      validating: 'glyphicon glyphicon-refresh'
                 },
                fields: {
                    DelegationCode: {
                        validators: {
                            notEmpty: {
                                message: '必填项'
                            },
                            stringLength: {

                            }
                        }
                    },
                    DelegationName: {
                        validators: {
                            notEmpty: {
                                message: '必填项'
                            },
                            stringLength: {

                            }
                        }
                    },
                    DelegationLocalName: {
                        validators: {
                            notEmpty: {
                                message: '必填项'
                            },
                            stringLength: {

                            }
                        }
                    },
                    DelegationFullName: {
                        validators: {
                            notEmpty: {
                                message: '必填项'
                            },
                            stringLength: {

                            }
                        }
                    },
                    DelegationLocalFullName: {
                        validators: {
                            notEmpty: {
                                message: '必填项'
                            },
                            stringLength: {

                            }
                            //,
                            //regexp: {

                            //}
                        }
                    }
                }
            });

        }
        catch (e) {; }
    },
	 //验证运动员表单
    VAth: function () {
        var me = Sign;
        try {
            $('#VAth').bootstrapValidator({
                message: '必填项',
                group: '.rowGroup',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    
                    AthleteName: {
                        validators: {
                            notEmpty: {
                                message: '必填项'
                            },
                            stringLength: {

                            }
                        }
                    },
                    AthleteShortName: {
                        validators: {
                            notEmpty: {
                                message: '必填项'
                            },
                            stringLength: {

                            }
                        }
                    },
                    AthleteCode: {
                        validators: {
                            notEmpty: {
                                message: '必填项'
                            },
                            stringLength: {

                            }
                        }
                    },

                    AthleteFamilyName: {
                        validators: {
                            notEmpty: {
                                message: '必填项'
                            },
                            stringLength: {

                            }
                        }
                    },
                    AthleteGivenName: {
                        validators: {
                            notEmpty: {
                                message: '必填项'
                            },
                            stringLength: {

                            }
                        }
                    },
                    AthleteTVName: {
                        validators: {
                            notEmpty: {
                                message: '必填项'
                            },
                            stringLength: {

                            }
                        }
                    },
                    AthleteTVShortName: {
                        validators: {
                            notEmpty: {
                                message: '必填项'
                            },
                            stringLength: {

                            }
                        }
                    },
                    AthleteWeight: {
                        validators: {
                            notEmpty: {
                                message: '必填项'
                            },
                            numeric: { message: '只能输入数字' }
                        }
                    },
                    AthleteHeight: {
                        validators: {
                            notEmpty: {
                                message: '必填项'
                            },
                            numeric: { message: '只能输入数字' }
                        }
                    },
                    AthleteBirthDay: {
                        validators: {
                            notEmpty: {
                                message: '必填项'
                            },
                            date: {
                            format: 'YYYY-MM-DD',
                               message: '格式不对'
                            }
                        }
                    }
                }
            });

        }
        catch (e) {; }
    },
	
	 //验证官员与裁判表单
    VOff: function () {
        var me = Sign;
        try {
            $('#VOff').bootstrapValidator({
                message: '必填项',
                group: '.rowGroup',
                feedbackIcons: {
                    valid: 'glyphicon glyphicon-ok',
                    invalid: 'glyphicon glyphicon-remove',
                    validating: 'glyphicon glyphicon-refresh'
                },
                fields: {
                    OfficialLocalName: {
                        validators: {
                            notEmpty: {
                                message: '必填项'
                            },
                            stringLength: {

                            }
                        }
                    },
                    OfficialLocalShortName: {
                        validators: {
                            notEmpty: {
                                message: '必填项'
                            },
                            stringLength: {

                            }
                        }
                    },
                    OfficialName: {
                        validators: {
                            notEmpty: {
                                message: '必填项'
                            },
                            stringLength: {

                            }
                        }
                    },
                    OfficialShortName: {
                        validators: {
                            notEmpty: {
                                message: '必填项'
                            },
                            stringLength: {

                            }
                        }
                    },
                    OfficialCode: {
                        validators: {
                            notEmpty: {
                                message: '必填项'
                            },
                            stringLength: {

                            }
                        }
                    },

                    OfficialFamilyName: {
                        validators: {
                            notEmpty: {
                                message: '必填项'
                            },
                            stringLength: {

                            }
                        }
                    },
                    OfficialGivenName: {
                        validators: {
                            notEmpty: {
                                message: '必填项'
                            },
                            stringLength: {

                            }
                        }
                    },
                    OfficialTVName: {
                        validators: {
                            notEmpty: {
                                message: '必填项'
                            },
                            stringLength: {

                            }
                        }
                    },
                    OfficialTVShortName: {
                        validators: {
                            notEmpty: {
                                message: '必填项'
                            },
                            stringLength: {

                            }
                        }
                    },
                    OfficialWeight: {
                        validators: {
                            notEmpty: {
                                message: '必填项'
                            },
                            numeric: { message: '只能输入数字' }
                        }
                    },
                    OfficialHeight: {
                        validators: {
                            notEmpty: {
                                message: '必填项'
                            },
                            numeric: { message: '只能输入数字' }
                        }
                    },
                    OfficialBirthDay: {
                        validators: {
                            notEmpty: {
                                message: '必填项'
                            },
                            date: {
                                format: 'YYYY-MM-DD',
                                message: '格式不对'
                            }
                        }
                    }
                }
            });

        }
        catch (e) {; }
    },

    //加载表单
    DataTables: function () {
        var me = Sign;
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