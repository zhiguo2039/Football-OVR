/// <reference path="jQuery-2.1.3.min.js" />
/// <reference path="json.js" />
/// <reference path="baiduTpls.js" />
/// <reference path="date.js" />
/// <reference path="hhls.js" />

var hhs = {
	Info : new ThhsInfo(),
	AppParas : [],
	CallSvc : function(aAction, aDatas, aCallback) {
		try {
			var aUrl = hhs.Info.SvcUrl;
			var aPostParas = {
				AppKey : hhs.Info.AppKey,
				DBInfoKey : hhs.Info.DBInfoKey,
				WxSrcID : hhs.Info.WxSrcID,
				CmdAction : aAction,
				ActionParas : aDatas == null ? "" : hhls.getObjJson(aDatas)
			}

			$.ajax({
				url : aUrl,
				data : aPostParas,
				type : 'POST',
				dataType : 'json',
				jsonp : 'callback',
				timeout : 50000,
				success : function(aCallbackData, b, c) {
					hhls.callBack(aCallback, aCallbackData);
				},
				error : function(a, b, c) {
					var aResult = {
						State : 0,
						Datas : {
							Ea : a,
							Eb : b,
							Ec : c
						}
					};
					hhls.callBack(aCallback, aResult);
				}
			});
		} catch (cee) {
			alert(cee);
		}
	},
	/* 初始化系统 */
	InitSys : function(aInitData, aCallback) {
		try {
			for ( var p in aInitData) {
				try {
					hhs.Info[p] = aInitData[p];
				} catch (cee) {
					;
				}
			}
			// hhs.CallSvc("acGetSvrTm", {}, function (aRes) {
			// hhs.Info.SvrTm = aRes.Datas;
			// hhs.Info.SvrTm.Loc = (new Date()).getTime();
			// hhs.getAppParas(aCallback);
			// });
			hhls.callBack(aCallback);
		} catch (cer) {
			;
		}
	},
	/* 更新获取系统配置参数 */
	getAppParas : function(aCallback) {
		try {
			hhs.CallSvc("acGetAppParas", null, function(aRes) {
				hhs.AppParas = aRes.Datas;
				hhls.callBack(aCallback);
			});
		} catch (cer) {
			;
		}
	},
	/* 获取系统配置参数的值 */
	getAppParaValue : function(aKey) {
		var aRes = "";
		try {
			var aPs = $.grep(hhs.AppParas, function(aItem) {
				return aItem.F_Key == aKey;
			});
			if (aPs.length > 0) {
				aRes = aPs[0].F_Value;
			}
		} catch (cer) {
			;
		}
		return aRes;
	},
	getUtcTm : function() {
		var aTm = 0;
		try {
			aTm = hhs.Info.SvrTm.Utc - hhs.Info.SvrTm.Loc
					+ (new Date()).getTime();
		} catch (Ex) {
			;
		}
		return aTm;
	},
	getSvrTm : function() {
		var aTm = 0;
		try {
			aTm = hhs.Info.SvrTm.Svr - hhs.Info.SvrTm.Loc
					+ (new Date()).getTime();
		} catch (Ex) {
			;
		}
		return aTm;
	}
}

function ThhsInfo() {
	this.MediaPath = "http://sys.czbtzn.cn:17011/Apps/WxServer/Res/";
	this.AppKey = "";
	this.DBInfoKey = "";
	this.CmdAction = "";
	this.WxSrcID = "gh_55ea5d78376e";
	this.SvcUrl = "http://hao23333.ticp.net/wbook/SvrServlet";//51054b77.nat123.net  http://hao23333.ticp.net/wbook/SvrServlet
	this.HomeUrl = "http://sys.czbtzn.cn:17011/";
	this.BaiduKey = "";
	this.WxJsConfigDebug = true;
	this.WxJsConfigLibs = [ "onMenuShareTimeline", "onMenuShareAppMessage",
			"onMenuShareQQ", "onMenuShareWeibo", "startRecord", "stopRecord",
			"onVoiceRecordEnd", "playVoice", "pauseVoice", "stopVoice",
			"onVoicePlayEnd", "uploadVoice", "downloadVoice", "chooseImage",
			"previewImage", "uploadImage", "downloadImage", "translateVoice",
			"getNetworkType", "openLocation", "getLocation", "hideOptionMenu",
			"showOptionMenu", "hideMenuItems", "showMenuItems",
			"hideAllNonBaseMenuItem", "showAllNonBaseMenuItem", "closeWindow",
			"scanQRCode", "chooseWXPay", "openProductSpecificView", "addCard",
			"chooseCard", "openCard" ];
	this.SvrTm = {
		Svr : 0,
		Utc : 0,
		Loc : 0
	};
}