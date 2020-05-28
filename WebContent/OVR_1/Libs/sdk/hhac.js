/// <reference path="../plugins/jQuery/jQuery-2.1.3.min.js" />
/// <reference path="json.js" />
/// <reference path="baiduTpls.js" />
var Ac = {
    Info: {
        SvcUrl: "",
        Ak: "",
        Sk: "",
        AppCode: "",
        DBKey: "",
        WxSrc: ""
    },
    Call_Get: function (aAction, aPs, aCallback) {
        try {
            var aUrl = Ac.Info.SvcUrl;
            aUrl += Ac.Info.SvcUrl.indexOf("?") > 0 ? "&" : "?";
            aUrl += "randomtm=" + Math.random();
            aUrl += "&Action=" + aAction;
            var ActionParas = hhls.getClone(aPs);
            for (p in Ac.Info) {
                ActionParas[p] = Ac.Info[p];
            }
            $.ajax({
                url: aUrl,
                data: ActionParas,
                type: 'POST',
                dataType: 'json',
            //    jsonp: 'callback',
             //   timeout: 50000,
                success: function (aCallbackData) {
                    try {
                        hhls.callBack(aCallback, aCallbackData);
                    }
                    catch (Ex) { ; }
                },
                error: function (a, b, c) {
                    var aResult = { State: 0, Datas: { Ea: a, Eb: b, Ec: c} };
                    hhls.callBack(aCallback, aResult);
                }
            });
        }
        catch (E) { ; }
    },
    Call_Post: function (aAction, ActionParas, aCallback) {
        try {
            var aUrl = Ac.Info.SvcUrl;
            aUrl += Ac.Info.SvcUrl.indexOf("?") > 0 ? "&" : "?";
            aUrl += "randomtm=" + Math.random();
            aUrl += "&Action=" + aAction;
            for (p in Ac.Info) {
                aUrl += "&" + p + "=" + Ac.Info[p];
            }
            $.ajax({
                url: aUrl,
                data: ActionParas,
                type: 'POST',
                timeout: 50000,
                success: function (aCallbackData, b, c) {
                    var aResult = hhls.getJsonObj(aCallbackData);
                    hhls.callBack(aCallback, aResult);
                },
                error: function (a, b, c) {
                    var aResult = { State: 0, Datas: { Ea: a, Eb: b, Ec: c} };
                    hhls.callBack(aCallback, aResult);
                }
            });
        }
        catch (E) { ; }
    },
    acGetWxMediasPath: function () {
        return Ac.Info.SvcUrl.replace("svc.ash", "WxMedias/" + Ac.Info.WxSrc);
    },
    acGetTable: function (aPath, aDataPs, aCallback) {
        try {
            var aPostPs = {
                Path: aPath,
                Ps: hhls.getObjJson(aDataPs)
            };
            Ac.Call_Get("acGetTables", aPostPs, function (aRes) {
                var aResult = {
                    State: aRes.State,
                    DebugInfos: aRes.DebugInfos,
                    Datas: aRes.Datas
                };
                if (aResult.Datas == null) {
                    aResult.Datas = [];
                }
                hhls.callBack(aCallback, aResult);
            });
        }
        catch (E) {
            alert(E);
        }
    },
    acGetDs: function (aTables, aDataPs, aCallback) {
        try {
            var aPostPs = {
                Tables: hhls.getObjJson(aTables),
                Ps: hhls.getObjJson(aDataPs)
            };
            Ac.Call_Get("acGetDs", aPostPs, function (aRes) {
                var aResult = {
                    State: aRes.State,
                    DebugInfos: aRes.DebugInfos,
                    Datas: hhls.getJsonObj(aRes.Datas)
                };
                hhls.callBack(aCallback, aResult);
            });
        }
        catch (E) {
            alert(E);
        }
    },
    acGetPagingTable: function (aPath, aDataPs, aPageSize, aPageIndex, aOrderFields, aCallback) {
        try {
            var aPostPs = {
                Path: aPath,
                Ps: hhls.getObjJson(aDataPs)
            };
            Ac.Call_Get("acGetTable", aPostPs, function (aRes) {
                var aResult = {
                    State: aRes.State,
                    DebugInfos: aRes.DebugInfos,
                    Datas: hhls.getJsonObj(aRes.Datas)
                };
                hhls.callBack(aCallback, aResult);
            });
        }
        catch (E) {
            alert(E);
        }
    },
    acExecuteSql: function (aPath, aDataPs, aCallback) {
        try {
            var aPostPs = {
                Path: aPath,
                Ps: hhls.getObjJson(aDataPs)
            };
            Ac.Call_Get("acExecuteSql", aPostPs, function (aRes) {
                hhls.callBack(aCallback, aRes);
            });
        }
        catch (E) {
            alert(E);
        }
    },
    acHttpGet: function (aUrl, aCallback) {
        try {
            var aPostPs = {
                Url: aUrl
            };
            Ac.Call_Get("acHttpGet", aPostPs, function (aRes) {
                hhls.callBack(aCallback, aRes);
            });
        }
        catch (E) {
            alert(E);
        }
    },
    acHttpPostContent: function (aPath, aContent, aCallback) {
        try {
            var aPostPs = {
                Path: aPath,
                Content: aContent
            };
            Ac.Call_Post("acHttpPostContent", aPostPs, function (aRes) {
                hhls.callBack(aCallback, aRes);
            });
        }
        catch (E) {
            alert(E);
        }
    },
    acBosPutData: function (aAk, aSk, aEp, aBucket, aPath, aContent, aCallback) {
        try {
            var aPostPs = {
                BosAk: aAk,
                BosSk: aSk,
                BosEp: aEp,
                BosBucket: aBucket,
                Path: aPath,
                Content: aContent
            };
            Ac.Call_Post("acBosPutData", aPostPs, function (aRes) {
                hhls.callBack(aCallback, aRes);
            });
        }
        catch (E) {
            alert(E);
        }
    },
    acBosGetData: function (aAk, aSk, aEp, aBucket, aPath, aCallback) {
        try {
            var aPostPs = {
                BosAk: aAk,
                BosSk: aSk,
                BosEp: aEp,
                BosBucket: aBucket,
                Path: aPath
            };
            Ac.Call_Post("acBosGetData", aPostPs, function (aRes) {
                hhls.callBack(aCallback, aRes);
            });
        }
        catch (E) {
            alert(E);
        }
    },
    acTables2Bos: function (aTables, aPs, aAk, aSk, aEp, aBucket, aPath, aCallback) {
        try {
            var aPostPs = {
                Tables: hhls.getObjJson(aTables),
                Ps: hhls.getObjJson(aPs),
                BosAk: aAk,
                BosSk: aSk,
                BosEp: aEp,
                BosBucket: aBucket,
                BosPath: aPath
            };
            Ac.Call_Get("acTables2Bos", aPostPs, function (aRes) {
                hhls.callBack(aCallback, aRes);
            });
        }
        catch (E) {
            alert(E);
        }
    },
    acGetWxAccessToken: function (aSrcID, aCallback) {
        try {
            var aPostPs = {
                Tables: hhls.getObjJson(aTables),
                Ps: hhls.getObjJson(aPs),
                BosAk: aAk,
                BosSk: aSk,
                BosEp: aEp,
                BosBucket: aBucket,
                BosPath: aPath
            };
            Ac.Call_Post("acTables2Bos", aPostPs, function (aRes) {
                hhls.callBack(aCallback, aRes);
            });
        }
        catch (E) {
            alert(E);
        }
    },
    acWxGetAccessToken: function (aCallback) {
        try {
            var aPostPs = {
                SrcID: Ac.Info.WxSrc
            };
            Ac.Call_Get("acGetWxAccessToken", aPostPs, function (aRes) {
                hhls.callBack(aCallback, aRes);
            });
        }
        catch (E) {
            alert(E);
        }
    },
    acWxGetJsConfig: function (aCallback) {
        try {
            var aPostPs = {
                SrcID: Ac.Info.WxSrc,
                Url: window.location.href
            };
            Ac.Call_Get("acGetJsConfig", aPostPs, function (aRes) {
                hhls.callBack(aCallback, aRes);
            });
        }
        catch (E) {
            alert(E);
        }
    },
    acWxTakePhotos: function (aCallback) {
        var me = Record;
        try {
            var Index = 0;
            var Result = { LocalIds: [], ServerIDs: [] };
            ResultDatas = [];
            var UploadImgs = function () {
                try {
                    if (Index < Result.LocalIds.length) {
                        wx.uploadImage({
                            localId: Result.LocalIds[Index], // 需要上传的图片的本地ID，由chooseImage接口获得
                            isShowProgressTips: 1, // 默认为1，显示进度提示
                            success: function (res) {
                                try {
                                    var serverId = res.serverId; // 返回图片的服务器端ID
                                    Result.ServerIDs.push(serverId);
                                }
                                catch (eer) { ; }
                                Index++;
                                UploadImgs();
                            },
                            fail: function () {
                                Index++;
                                UploadImgs();
                            }
                        });
                    }
                    else {
                        for (var i = 0; i < Result.LocalIds.length; i++) {
                            ResultDatas.push({
                                L: Result.LocalIds[i],
                                S: Result.ServerIDs[i],
                                C: ""
                            });
                        }
                        hhls.callBack(aCallback, ResultDatas);
                    }
                }
                catch (Ex) { ; }
            };
            wx.chooseImage({
                count: 9, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    Result.LocalIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片  
                    UploadImgs();
                },
                fail: function () {
                    try {
                        hhls.callBack(aCallback, Result);
                    }
                    catch (ee) { ; }
                }
            });
        }
        catch (e) {
            alert(e.Message);
        }
    },
    acWxTakeVoice: function (aCallback) {
        try {
            var Result = { L: "", S: "", C: "" };
            hhwxVoiceContent.GetVoiceContent(function (aRes) {
                if (aRes.ResultState == 1) {
                    wx.uploadVoice({
                        localId: aRes.LocalVoiceID, // 需要上传的音频的本地ID，由stopRecord接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (res) {
                            var serverId = res.serverId; // 返回音频的服务器端ID
                            Result.L = aRes.LocalVoiceID;
                            Result.S = serverId;
                            Result.C = aRes.Content;
                            hhls.callBack(aCallback, Result);
                        },
                        fail: function () {
                            hhls.callBack(aCallback, Result);
                        }
                    });
                }
                else {
                    hhls.callBack(aCallback, Result);
                }
            });
        }
        catch (E) {
            alert(E);
        }
    },
    acWxGetMediaUrls: function (aMediaIDs, aMediaType, aCallback) {
        try {
            var aPostPs = {
                SrcID: Ac.Info.WxSrc,
                MediaIDs: hhls.getObjJson(aMediaIDs),
                MediaType: aMediaType
            };
            Ac.Call_Get("acGetWxMediaUrls", aPostPs, function (aRes) {
                hhls.callBack(aCallback, aRes);
            });
        }
        catch (e) { ; }
    },
    acWxShowImgs: function () {
        try {
            var aImgs = $(".wxImg");
            var aMediaIDs = [];
            $.each(aImgs, function (aInd, aImg) {
                aMediaIDs.push($(aImg).attr("MediaID"));
            });
            var aRootPath = Ac.Info.SvcUrl.replace("svc.ashx", "");
            Ac.acWxGetMediaUrls(aMediaIDs, "jpg", function (aRes) {
                $.each(aImgs, function (i, aImgItem) {
                    var aKey = $(aImgItem).attr("MediaID");
                    var aUrl = aRootPath + aRes.Datas[aKey];
                    aImgItem.src = aUrl;
                });
                
            });
        }
        catch (e) { ; }
    },
    acUploadFile: function (fileInputEmement, aData, aPostUrl, aCallback) {
        try {

            var aUrl = Ac.Info.SvcUrl;
            aUrl += Ac.Info.SvcUrl.indexOf("?") > 0 ? "&" : "?";
            aUrl += "randomtm=" + Math.random();
            aUrl += "&Action=" + "acUploadFile";
            for (p in Ac.Info) {
                aUrl += "&" + p + "=" + Ac.Info[p];
            }

            var formData = new FormData(fileInputEmement);
            //formData.append('Img', fileInputEmement);
            $.ajax({
                type: "POST", //必须用post  
                url: aUrl, 
                data: formData,
                cache: false, 
                contentType: false, //必须  
                processData: false,  
                complete: function (data) {
                    hhls.callBack(aCallback, data.responseText); 
                }  
            });
        }
        catch (cer) { }
    }

};