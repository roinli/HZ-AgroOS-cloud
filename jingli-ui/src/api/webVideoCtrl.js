!
    function(e) {
        if (!e.WebVideoCtrl) {
            var t = function() {
                    function t() {
                        this.id = this.createUUID()
                    }

                    var r = "100%",
                        s = "100%",
                        o = "",
                        i = "",
                        a = {
                            szContainerID: "",
                            szColorProperty: "",
                            szOcxClassId: "clsid:FDF0038A-CF64-4634-81AB-80F0A7946D6C",
                            szMimeTypes: "application/webvideo-plugin-kit",
                            szBasePath: "",
                            iWndowType: 1,
                            iPlayMode: 2,
                            bWndFull: !0,
                            iPackageType: 2,
                            bDebugMode: !1,
                            bNoPlugin: !0,
                            cbSelWnd: null,
                            myCbSelWnd: null,
                            cbDoubleClickWnd: null,
                            cbEvent: null,
                            cbRemoteConfig: null,
                            cbInitPluginComplete: null
                        },
                        c = null,
                        u = 0,
                        l = !1,
                        d = [],
                        p = [],
                        P = null,
                        h = null,
                        I = null,
                        f = null,
                        m = this,
                        C = null,
                        S = 1,
                        v = 2,
                        y = 200,
                        g = 0,
                        x = 1,
                        D = 2,
                        z = 3,
                        T = 4,
                        b = 5,
                        A = 6,
                        M = 0,
                        R = 2,
                        L = 3,
                        q = 21,
                        G = -1,
                        W = 0,
                        X = "IPCamera",
                        w = "IPDome",
                        H = "IPZoom",
                        k = "<?xml version='1.0' encoding='utf-8'?><FileVersion><Platform name='win32'><npWebVideoKitPlugin.dll>3,0,6,2</npWebVideoKitPlugin.dll><WebVideoKitActiveX.ocx>3,0,6,2</WebVideoKitActiveX.ocx><PlayCtrl.dll>7,3,3,61</PlayCtrl.dll><StreamTransClient.dll>1,1,3,6</StreamTransClient.dll><SystemTransform.dll>2,5,2,8</SystemTransform.dll><NetStream.dll>1,0,5,59</NetStream.dll></Platform></FileVersion>";
                    GetSelectWndInfo = function(e) {
                        // console.log("GetSelectWndInfo", e);
                        if (re()) {
                            u = e;
                            var t = [];
                            t.push("<RealPlayInfo>"),
                                t.push("<SelectWnd>" + e + "</SelectWnd>"),
                                t.push("</RealPlayInfo>"),
                            a.cbSelWnd && a.cbSelWnd(f.loadXML(t.join("")))
                        } else {
                            var r = f.loadXML2(e);
                            // console.log("37", r);
                            if (n.$XML(r).find("SelectWnd", !0).length > 0) {
                                u = parseInt(n.$XML(r).find("SelectWnd").eq(0).text(), 10),
                                null === C && U();
                                var t = [];
                                t.push("<RealPlayInfo>"),
                                    t.push("<SelectWnd>" + u + "</SelectWnd>"),
                                    t.push("</RealPlayInfo>"),
                                a.cbSelWnd && a.cbSelWnd(f.loadXML2(t.join(""))),
                                a.myCbSelWnd&& a.myCbSelWnd(t.join(""))
                            } else if (n.$XML(r).find("DoubleClickWnd", !0).length > 0) {
                                var s = parseInt(n.$XML(r).find("DoubleClickWnd").eq(0).text(), 10);
                                l = "0" === n.$XML(r).find("IsFullScreen").eq(0).text(),
                                a.cbDoubleClickWnd && a.cbDoubleClickWnd(s, l)
                            }
                        }
                    },
                        e.WindowDblClick = function(e) {
                            l = e,
                            a.cbDoubleClickWnd && a.cbDoubleClickWnd(u, l)
                        },
                        e.ZoomInfoCallback = function(e) {
                            var t = m.findWndIndexByIndex(u);
                            if ( - 1 != t) {
                                var n = p[t];
                                if (t = m.findDeviceIndexByIP(n.szDeviceIdentify), -1 != t) {
                                    var r = d[t];
                                    r.oProtocolInc.set3DZoom(r, n, e, {
                                        success: function(e) {},
                                        error: function() {}
                                    })
                                }
                            }
                        },
                        PluginEventHandler = function(e, t, n) {
                            re() ? a.cbEvent && a.cbEvent(n, t, "") : (_("插件事件：PluginEventHandler iEventType：%s iParam1: %s, iParam2: %s", e, t, n), M == e || R == e ? m.I_Stop(t) : q == e ? m.I_StopRecord(t) : L == e && m.I_StopVoiceTalk(), a.cbEvent && a.cbEvent(e, t, n))
                        },
                        GetHttpInfo = function(e, t, n) {
                            _("http响应返回：http状态：%s, http数据：%s", e, t),
                                ue.prototype.processCallback(e, t)
                        },
                        e.RemoteConfigInfo = function(e) {
                            a.cbRemoteConfig && a.cbRemoteConfig(e)
                        },
                        e.KeyBoardEventInfo = function(e) {
                            100 === parseInt(e, 10) && (l = !1, a.cbDoubleClickWnd && a.cbDoubleClickWnd(u, l))
                        };
                    var _ = function() {
                            if (a.bDebugMode) {
                                var e = E(arguments);
                                P._alert(e)
                            }
                        },
                        E = function() {
                            for (var e = arguments[0], t = 1; t < arguments.length; t++) e = e.replace("%s", arguments[t]);
                            return e
                        },
                        Z = function(e) {
                            var t = e.indexOf(":");
                            return t > -1 ? e.substring(0, t) : e
                        },
                        B = function(e) {
                            return "undefined" == typeof e
                        },
                        N = function(e) {
                            return "[object Object]" === Object.prototype.toString.call(e)
                        },
                        F = function() {
                            var e = "";
                            if (f.browser().msie) e = "<object classid='" + a.szOcxClassId + "' codebase='' standby='Waiting...' id='" + o + "' width='" + r + "' height='" + s + "' align='center' ><param name='wndtype' value='" + a.iWndowType + "'><param name='playmode' value='" + a.iPlayMode + "'><param name='colors' value='" + a.szColorProperty + "'></object>";
                            else for (var t = navigator.mimeTypes.length,
                                          n = 0; t > n; n++) navigator.mimeTypes[n].type.toLowerCase() == a.szMimeTypes && (e = "<embed align='center' type='" + a.szMimeTypes + "' width='" + r + "' height='" + s + "' name='" + i + "' wndtype='" + a.iWndowType + "' playmode='" + a.iPlayMode + "' colors='" + a.szColorProperty + "'>");
                            return e
                        },
                        U = function() {
                            if (!re() && null !== c) {
                                var e = c.HWP_GetLocalConfig();
                                C = f.loadXML2(e);
                                // console.log("92 C", C, e);
                            }
                        },
                        V = function(e) {
                            m.I_GetDeviceInfo(e.szIP, {
                                success: function(t) {
                                    e.szDeviceType = n.$XML(t).find("deviceType").eq(0).text()
                                }
                            }),
                                m.I_GetAnalogChannelInfo(e.szIP, {
                                    success: function(t) {
                                        e.iAnalogChannelNum = n.$XML(t).find("VideoInputChannel", !0).length
                                    }
                                }),
                                m.I_GetAudioInfo(e.szIP, {
                                    success: function(t) {
                                        var r = n.$XML(t).find("audioCompressionType", !0);
                                        if (r.length > 0) {
                                            var s = n.$XML(r).eq(0).text(),
                                                o = 0;
                                            "G.711ulaw" == s ? o = 1 : "G.711alaw" == s ? o = 2 : "G.726" == s ? o = 3 : "MP2L2" == s || "MPEL2" == s ? o = 4 : "G.722.1" == s ? o = 0 : "AAC" == s ? o = 5 : "PCM" == s && (o = 6),
                                                e.iAudioType = o
                                        }
                                        "" !== n.$XML(t).find("audioBitRate").eq(0).text() ? e.m_iAudioBitRate = 1e3 * parseInt(n.$XML(t).find("audioBitRate").eq(0).text(), 10) : e.m_iAudioBitRate = 0,
                                            "" !== n.$XML(t).find("audioSamplingRate").eq(0).text() ? e.m_iAudioSamplingRate = 1e3 * parseInt(n.$XML(t).find("audioSamplingRate").eq(0).text(), 10) : e.m_iAudioSamplingRate = 0
                                    }
                                })
                        },
                        j = function(e) {
                            e.bSupportWebsocket = !1,
                                e.bSupportSubStreamPlayback = !1,
                                e.oProtocolInc.getSystemCapa(e, {
                                    success: function(t) {
                                        var r = n.$XML(t).find("NetworkCap").eq(0).find("isSupportWebsocket", !0);
                                        r.length > 0 && (e.bSupportWebsocket = "true" === n.$XML(t).find("NetworkCap").eq(0).find("isSupportWebsocket").eq(0).text()),
                                            r = n.$XML(t).find("RacmCap").eq(0).find("isSupportMainAndSubRecord", !0),
                                        r.length > 0 && (e.bSupportSubStreamPlayback = "true" === n.$XML(t).find("RacmCap").eq(0).find("isSupportMainAndSubRecord").eq(0).text())
                                    }
                                })
                        },
                        O = function() {
                            var e = a.bWndFull ? 1 : 0;
                            c.HWP_SetCanFullScreen(e),
                                c.HWP_SetPackageType(a.iPackageType)
                        },
                        J = function(e) {
                            var t = -1,
                                n = -1,
                                r = -1,
                                s = null;
                            if (ee(e)) s = K(e),
                                t = s.iRtspPort,
                                r = s.iDevicePort;
                            else {
                                for (var o = Q(e), i = !1, a = 0; a < o.length; a++) if (o[a].ipv4 == e.szIP || o[a].ipv6 == e.szIP) {
                                    i = !0;
                                    break
                                }
                                i ? s = K(e) : (s = Y(e), -1 == s.iRtspPort && -1 == s.iDevicePort && (s = K(e))),
                                    t = s.iRtspPort,
                                    n = s.iHttpPort,
                                    r = s.iDevicePort
                            }
                            return s
                        },
                        K = function(e) {
                            var t = -1,
                                r = -1,
                                s = -1;
                            return e.oProtocolInc.getPortInfo(e, {
                                async: !1,
                                success: function(e) {
                                    var o = n.$XML(e).find("AdminAccessProtocol", !0);
                                    t = 554;
                                    for (var i = 0,
                                             a = o.length; a > i; i++)"rtsp" === n.$XML(o).eq(i).find("protocol").eq(0).text().toLowerCase() && (t = parseInt(n.$XML(o).eq(i).find("portNo").eq(0).text(), 10)),
                                    "http" === n.$XML(o).eq(i).find("protocol").eq(0).text().toLowerCase() && (r = parseInt(n.$XML(o).eq(i).find("portNo").eq(0).text(), 10)),
                                    "dev_manage" === n.$XML(o).eq(i).find("protocol").eq(0).text().toLowerCase() && (s = parseInt(n.$XML(o).eq(i).find("portNo").eq(0).text(), 10))
                                },
                                error: function() {
                                    t = -1,
                                        r = -1,
                                        s = -1
                                }
                            }),
                            {
                                iRtspPort: t,
                                iHttpPort: r,
                                iDevicePort: s
                            }
                        },
                        Y = function(e) {
                            var t = -1,
                                r = -1,
                                s = -1;
                            return e.oProtocolInc.getUPnPPortStatus(e, {
                                async: !1,
                                success: function(e) {
                                    for (var o = n.$XML(e).find("portStatus", !0), i = 0, a = o.length; a > i; i++)"rtsp" == n.$XML(o).eq(i).find("internalPort").eq(0).text().toLowerCase() && (t = parseInt(n.$XML(o).eq(i).find("externalPort").eq(0).text(), 10)),
                                    "http" == n.$XML(o).eq(i).find("internalPort").eq(0).text().toLowerCase() && (r = parseInt(n.$XML(o).eq(i).find("externalPort").eq(0).text(), 10)),
                                    "admin" == n.$XML(o).eq(i).find("internalPort").eq(0).text().toLowerCase() && (s = parseInt(n.$XML(o).eq(i).find("externalPort").eq(0).text(), 10))
                                },
                                error: function() {
                                    t = -1,
                                        r = -1,
                                        s = -1
                                }
                            }),
                            {
                                iRtspPort: t,
                                iHttpPort: r,
                                iDevicePort: s
                            }
                        },
                        Q = function(e) {
                            var t = [];
                            return e.oProtocolInc.getNetworkBond(e, {
                                async: !1,
                                success: function(r) {
                                    "true" == n.$XML(r).find("enabled").eq(0).text() ? t.push({
                                        ipv4: n.$XML(r).find("ipAddress").eq(0).text(),
                                        ipv6: n.$XML(r).find("ipv6Address").eq(0).text()
                                    }) : e.oProtocolInc.getNetworkInterface(e, {
                                        async: !1,
                                        success: function(e) {
                                            for (var r = n.$XML(e).find("NetworkInterface", !0), s = 0, o = r.length; o > s; s++) {
                                                t.push({
                                                    ipv4: n.$XML(e).find("ipAddress").eq(0).text(),
                                                    ipv6: n.$XML(e).find("ipv6Address").eq(0).text()
                                                });
                                                break
                                            }
                                        },
                                        error: function() {}
                                    })
                                },
                                error: function() {

                                    e.oProtocolInc.getNetworkInterface(e, {
                                        async: !1,
                                        success: function(e) {

                                            for (var r = n.$XML(e).find("NetworkInterface", !0), s = 0, o = r.length; o > s; s++) {
                                                t.push({
                                                    ipv4: n.$XML(e).find("ipAddress").eq(0).text(),
                                                    ipv6: n.$XML(e).find("ipv6Address").eq(0).text()
                                                });
                                                break
                                            }
                                        },
                                        error: function() {
                                        }
                                    })
                                }
                            }),
                                t
                        },
                        ee = function(e) {
                            var t = !1;
                            return e.oProtocolInc.getPPPoEStatus(e, {
                                async: !1,
                                success: function(e) {
                                    t = n.$XML(e).find("ipAddress", !0).length > 0 ? !0 : n.$XML(e).find("ipv6Address", !0).length > 0
                                },
                                error: function() {
                                    t = !1
                                }
                            }),
                                t
                        },
                        te = function(e) {

                            e.oStreamCapa.bObtained || e.oProtocolInc instanceof le && e.oProtocolInc.getSDKCapa(e, {
                                async: !1,
                                success: function(t) {

                                    e.oStreamCapa.bObtained = !0,
                                        e.oStreamCapa.bSupportShttpPlay = "true" === n.$XML(t).find("isSupportHttpPlay").eq(0).text(),
                                        e.oStreamCapa.bSupportShttpPlayback = "true" === n.$XML(t).find("isSupportHttpPlayback").eq(0).text(),
                                        e.oStreamCapa.bSupportShttpsPlay = "true" === n.$XML(t).find("isSupportHttpsPlay").eq(0).text(),
                                        e.oStreamCapa.bSupportShttpsPlayback = "true" === n.$XML(t).find("isSupportHttpsPlayback").eq(0).text(),
                                        e.oStreamCapa.bSupportShttpPlaybackTransCode = "true" === n.$XML(t).find("isSupportHttpTransCodePlayback").eq(0).text(),
                                        e.oStreamCapa.bSupportShttpsPlaybackTransCode = "true" === n.$XML(t).find("isSupportHttpsTransCodePlayback").eq(0).text(),
                                    n.$XML(t).find("ipChanBase", !0).length > 0 && (e.oStreamCapa.iIpChanBase = parseInt(n.$XML(t).find("ipChanBase").eq(0).text(), 10))
                                },
                                error: function() {
                                    e.oStreamCapa.bObtained = !0
                                }
                            })
                        },
                        ne = function(e) {
                            var t = {
                                TransFrameRate: "",
                                TransResolution: "",
                                TransBitrate: ""
                            };
                            if (f.extend(t, e), "" == t.TransFrameRate || "" == t.TransResolution || "" == t.TransBitrate) return "";
                            var n = [];
                            return n.push("<?xml version='1.0' encoding='UTF-8'?>"),
                                n.push("<CompressionInfo>"),
                                n.push("<TransFrameRate>" + t.TransFrameRate + "</TransFrameRate>"),
                                n.push("<TransResolution>" + t.TransResolution + "</TransResolution>"),
                                n.push("<TransBitrate>" + t.TransBitrate + "</TransBitrate>"),
                                n.push("</CompressionInfo>"),
                                n.join("")
                        },
                        re = function() {
                            if (a.bNoPlugin) {
                                var e = f.browser();
                                return !! (e.chrome && parseInt(e.version, 10) > 45 || e.mozilla && parseInt(e.version, 10) > 52)
                            }
                            return ! 1
                        },
                        se = function(e) {
                            var t = location.hostname,
                                n = location.port || "80";
                            return /^(http|https):\/\/([^\/]+)(.+)$/.test(e) && (e = e.replace(RegExp.$2, t + ":" + n)),
                                f.cookie("webVideoCtrlProxy", RegExp.$2, {
                                    raw: !0
                                }),
                                e
                        },
                        oe = function() {
                            var e = "<ResponseStatus>";
                            // console.log("224");
                            return e += "<requestURL></requestURL>",
                                e += "<statusCode>4</statusCode>",
                                e += "<statusString>Invalid Operation</statusString>",
                                e += "<subStatusCode>notSupport</subStatusCode>",
                                e += "</ResponseStatus>",
                                f.loadXML(e)
                        };
                    this.I_InitPlugin = function(t, n, o) {
                        if (r = t, s = n, f.extend(a, o), re()) {
                            var i = f.getDirName();
                            i && ("object" == typeof exports && "undefined" != typeof module || ("function" == typeof define && define.amd ? require([i + "/jsPlugin-1.0.0.min.js"],
                                function(t) {
                                    e.JSPlugin = t.JSPlugin,
                                    o.cbInitPluginComplete && o.cbInitPluginComplete()
                                }) : f.loadScript(i + "/jsPlugin-1.0.0.min.js",
                                function() {
                                    o.cbInitPluginComplete && o.cbInitPluginComplete()
                                }))),
                                addEventListener("resize",
                                    function() {
                                        null !== c && c.JS_Resize(r, s)
                                    }),
                                B(document.fullScreen) ? B(document.webkitIsFullScreen) ? B(document.mozFullScreen) || document.addEventListener("mozfullscreenchange",
                                    function(t) {
                                        var n = document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || !1;
                                        l && !n && e.KeyBoardEventInfo(100)
                                    }) : document.addEventListener("webkitfullscreenchange",
                                    function(t) {
                                        var n = document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || !1;
                                        l && !n && e.KeyBoardEventInfo(100)
                                    }) : document.addEventListener("fullscreenchange",
                                    function(t) {
                                        var n = document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || !1;
                                        l && !n && e.KeyBoardEventInfo(100)
                                    }),
                                addEventListener("unload",
                                    function() {
                                        null !== c && c.JS_DestroyWorker()
                                    })
                        } else o.cbInitPluginComplete && o.cbInitPluginComplete()
                    },
                        this.I_InsertOBJECTPlugin = function(t) {
                            if (B(t) || (a.szContainerID = t), null == document.getElementById(a.szContainerID)) return - 1;
                            if (null != document.getElementById(o) || 0 != document.getElementsByName(o).length) return - 1;
                            if (re()) {
                                var n = {
                                        szId: t,
                                        iType: 1,
                                        iWidth: r,
                                        iHeight: s,
                                        iMaxSplit: 4,
                                        iCurrentSplit: a.iWndowType,
                                        szBasePath: f.getDirName()
                                    },
                                    u = a.szColorProperty;
                                if ("" != u) {
                                    for (var l = {},
                                             d = u.split(";"), p = "", P = 0, h = d.length; h > P; P++) p = d[P],
                                        p.indexOf("sub-background") > -1 ? l.background = p.split(":")[1] : p.indexOf("sub-border-select") > -1 ? l.borderSelect = p.split(":")[1] : p.indexOf("sub-border") > -1 && (l.border = p.split(":")[1]);
                                    n.oStyle = l
                                }
                                c = new JSPlugin(n)
                            } else document.getElementById(a.szContainerID).innerHTML = F(),
                                c = f.browser().msie ? document.getElementById(o) : document.getElementsByName(i)[0];
                            return null == c && null == c.object ? -1 : ("object" == typeof e.attachEvent && f.browser().msie && (c.attachEvent("GetSelectWndInfo", GetSelectWndInfo), c.attachEvent("ZoomInfoCallback", ZoomInfoCallback), c.attachEvent("GetHttpInfo", GetHttpInfo), c.attachEvent("PluginEventHandler", PluginEventHandler), c.attachEvent("RemoteConfigInfo", RemoteConfigInfo), c.attachEvent("KeyBoardEventInfo", KeyBoardEventInfo)), U(), 0)
                        },
                        this.I_WriteOBJECT_XHTML = function() {
                            return re() ? -1 : (document.writeln(F()), c = f.browser().msie ? document.getElementById(o) : document.getElementsByName(i)[0], null == c && null == c.object ? -1 : ("object" == typeof e.attachEvent && f.browser().msie && (c.attachEvent("GetSelectWndInfo", GetSelectWndInfo), c.attachEvent("ZoomInfoCallback", ZoomInfoCallback), c.attachEvent("GetHttpInfo", GetHttpInfo), c.attachEvent("PluginEventHandler", PluginEventHandler), c.attachEvent("RemoteConfigInfo", RemoteConfigInfo), c.attachEvent("KeyBoardEventInfo", KeyBoardEventInfo)), U(), 0))
                        },
                        this.I_OpenFileDlg = function(e) {
                            var t = "";
                            if (re()) return t;
                            if (t = c.HWP_OpenFileBrowser(e, ""), null == t) return "";
                            if (1 == e) {
                                if (t.length > 100) return - 1
                            } else if (t.length > 130) return - 1;
                            return t
                        },
                        this.I_GetLocalCfg = function() {
                            var e = null;
                            if (re()) return e;
                            var t = c.HWP_GetLocalConfig(),
                                r = [];

                            return C = f.loadXML(t),
                                r.push("<LocalConfigInfo>"),
                                r.push("<ProtocolType>" + n.$XML(C).find("ProtocolType").eq(0).text() + "</ProtocolType>"),
                                r.push("<PackgeSize>" + n.$XML(C).find("PackgeSize").eq(0).text() + "</PackgeSize>"),
                                r.push("<PlayWndType>" + n.$XML(C).find("PlayWndType").eq(0).text() + "</PlayWndType>"),
                                r.push("<BuffNumberType>" + n.$XML(C).find("BuffNumberType").eq(0).text() + "</BuffNumberType>"),
                                r.push("<RecordPath>" + n.$XML(C).find("RecordPath").eq(0).text() + "</RecordPath>"),
                                r.push("<CapturePath>" + n.$XML(C).find("CapturePath").eq(0).text() + "</CapturePath>"),
                                r.push("<PlaybackFilePath>" + n.$XML(C).find("PlaybackFilePath").eq(0).text() + "</PlaybackFilePath>"),
                                r.push("<PlaybackPicPath>" + n.$XML(C).find("PlaybackPicPath").eq(0).text() + "</PlaybackPicPath>"),
                                r.push("<DeviceCapturePath>" + n.$XML(C).find("DeviceCapturePath").eq(0).text() + "</DeviceCapturePath>"),
                                r.push("<DownloadPath>" + n.$XML(C).find("DownloadPath").eq(0).text() + "</DownloadPath>"),
                                r.push("<IVSMode>" + n.$XML(C).find("IVSMode").eq(0).text() + "</IVSMode>"),
                                r.push("<CaptureFileFormat>" + n.$XML(C).find("CaptureFileFormat").eq(0).text() + "</CaptureFileFormat>"),
                                r.push("</LocalConfigInfo>"),
                                e = f.loadXML(r.join(""))
                        },
                        this.I_SetLocalCfg = function(e) {
                            if (re()) return - 1;
                            // console.log("227");
                            var t = f.loadXML(e),
                                r = !1;
                            // console.log("285 t", t, e);
                            return n.$XML(C).find("ProtocolType").eq(0).text(n.$XML(t).find("ProtocolType").eq(0).text()),
                                n.$XML(C).find("PackgeSize").eq(0).text(n.$XML(t).find("PackgeSize").eq(0).text()),
                                n.$XML(C).find("PlayWndType").eq(0).text(n.$XML(t).find("PlayWndType").eq(0).text()),
                                n.$XML(C).find("BuffNumberType").eq(0).text(n.$XML(t).find("BuffNumberType").eq(0).text()),
                                n.$XML(C).find("RecordPath").eq(0).text(n.$XML(t).find("RecordPath").eq(0).text()),
                                n.$XML(C).find("CapturePath").eq(0).text(n.$XML(t).find("CapturePath").eq(0).text()),
                                n.$XML(C).find("PlaybackFilePath").eq(0).text(n.$XML(t).find("PlaybackFilePath").eq(0).text()),
                                n.$XML(C).find("DeviceCapturePath").eq(0).text(n.$XML(t).find("DeviceCapturePath").eq(0).text()),
                                n.$XML(C).find("PlaybackPicPath").eq(0).text(n.$XML(t).find("PlaybackPicPath").eq(0).text()),
                                n.$XML(C).find("DownloadPath").eq(0).text(n.$XML(t).find("DownloadPath").eq(0).text()),
                                n.$XML(C).find("IVSMode").eq(0).text(n.$XML(t).find("IVSMode").eq(0).text()),
                                n.$XML(C).find("CaptureFileFormat").eq(0).text(n.$XML(t).find("CaptureFileFormat").eq(0).text()),
                                r = c.HWP_SetLocalConfig(f.toXMLStr(C)),
                                r ? 0 : -1
                        };
                    var ie = function(e, t, n, r, s, o, i) {
                        var a = {
                            protocol: t,
                            success: null,
                            error: null
                        };
                        f.extend(a, i),
                            f.extend(a, {
                                success: function(a) {
                                    var c = new ae;
                                    c.szIP = e,
                                        2 == t ? (c.szHttpProtocol = "https://", c.iHttpsPort = n) : (c.szHttpProtocol = "http://", c.iHttpPort = n),
                                        c.iCGIPort = n,
                                        c.szDeviceIdentify = e + "_" + n,
                                        c.szAuth = r,
                                        c.iDeviceProtocol = s,
                                        c.oProtocolInc = o,
                                        d.push(c),
                                        _("使用%s协议登录成功", s),
                                        V(c),
                                        O(),
                                        j(c),
                                    i.success && i.success(a)
                                },
                                error: function(e, t) {
                                    i.error && i.error(e, t)
                                }
                            }),
                            o.login(e, n, r, a)
                    };
                    this.I_Login = function(t, r, s, o, i, a) {
                        var c = t + "_" + s,
                            u = this.findDeviceIndexByIP(c);
                        if ( - 1 != u) return _("设备已经登录过"),
                            -1;
                        var l = h,
                            p = S;
                        if (B(a.cgi) || (S == a.cgi ? (l = h, p = S) : (l = I, p = v)), re()) if (S == p) {
                            var P = {
                                success: null,
                                error: null
                            };
                            f.extend(P, {
                                success: function(c) {
                                    var u = {
                                        success: null,
                                        error: null
                                    };
                                    f.extend(u, {
                                        success: function(o) {
                                            var i = new ae;
                                            i.szIP = t,
                                                2 == r ? (i.szHttpProtocol = "https://", i.iHttpsPort = s) : (i.szHttpProtocol = "http://", i.iHttpPort = s),
                                                i.iCGIPort = s,
                                                i.szDeviceIdentify = t + "_" + s,
                                                i.szAuth = n.$XML(o).find("sessionID").eq(0).text(),
                                                i.iDeviceProtocol = p,
                                                i.oProtocolInc = l,
                                                d.push(i),
                                                _("使用%s协议登录成功", p),
                                                V(i),
                                                j(i),
                                                i.sessionFailed = 0,
                                                i.sesstionTimer = setInterval(function() {
                                                        l.sessionHeartbeat(i,
                                                            function() {
                                                                i.sessionFailed = 0
                                                            },
                                                            function() {
                                                                i.sessionFailed++,
                                                                i.sessionFailed >= 5 && (clearInterval(i.sesstionTimer), e.PluginEventHandler(G, i.szDeviceIdentify))
                                                            })
                                                    },
                                                    3e4),
                                            a.success && a.success(o)
                                        },
                                        error: function(e, t) {
                                            a.error && a.error(e, t)
                                        }
                                    }),
                                        l.sessionLogin(t, r, s, o, i, c, u)
                                },
                                error: function(e, t) {
                                    a.error && a.error(e, t)
                                }
                            }),
                                l.getSessionCap(t, r, s, o, P)
                        } else a.error && a.error(403, oe());
                        else {
                            var m = "";
                            if (S == p) {
                                m = f.Base64.encode(":" + o + ":" + i);
                                var P = {
                                    success: null,
                                    error: null
                                };
                                f.extend(P, a),
                                    f.extend(P, {
                                        error: function(e, n) {
                                            m = f.Base64.encode(o + ":" + i),
                                                p = S,
                                                l = h;
                                            var c = {
                                                success: null,
                                                error: null
                                            };
                                            f.extend(c, a),
                                                f.extend(c, {
                                                    error: function() {
                                                        if (!B(a.cgi)) return void(a.error && a.error(e, n));
                                                        m = f.Base64.encode(":" + o + ":" + i),
                                                            p = v,
                                                            l = I;
                                                        var c = {
                                                            success: null,
                                                            error: null
                                                        };
                                                        f.extend(c, a),
                                                            f.extend(c, {
                                                                error: function(e, n) {
                                                                    m = f.Base64.encode(o + ":" + i),
                                                                        p = v,
                                                                        l = I;
                                                                    var c = {
                                                                        success: null,
                                                                        error: null
                                                                    };
                                                                    f.extend(c, a),
                                                                        f.extend(c, {
                                                                            error: function() {
                                                                                a.error && a.error(e, n)
                                                                            }
                                                                        }),
                                                                        ie(t, r, s, m, p, l, c)
                                                                }
                                                            }),
                                                            ie(t, r, s, m, p, l, c)
                                                    }
                                                }),
                                                ie(t, r, s, m, p, l, c)
                                        }
                                    }),
                                    ie(t, r, s, m, p, l, P)
                            } else {
                                m = f.Base64.encode(":" + o + ":" + i),
                                    p = v,
                                    l = I;
                                var P = {
                                    success: null,
                                    error: null
                                };
                                f.extend(P, a),
                                    f.extend(P, {
                                        error: function(e, n) {
                                            m = f.Base64.encode(o + ":" + i),
                                                p = v,
                                                l = I;
                                            var c = {
                                                success: null,
                                                error: null
                                            };
                                            f.extend(c, a),
                                                f.extend(c, {
                                                    error: function() {
                                                        a.error && a.error(e, n)
                                                    }
                                                }),
                                                ie(t, r, s, m, p, l, c)
                                        }
                                    }),
                                    ie(t, r, s, m, p, l, P)
                            }
                        }
                    },
                        this.I_Logout = function(e) {
                            var t = this.findDeviceIndexByIP(e);
                            if ( - 1 != t) {
                                if (re()) {
                                    var n = d[t];
                                    clearInterval(n.sesstionTimer),
                                        n.oProtocolInc.sessionLogout(n, {})
                                }
                                return d.splice(t, 1),
                                    0
                            }
                            return - 1
                        },
                        this.I_GetAudioInfo = function(e, t) {
                            var n = this.findDeviceIndexByIP(e);
                            if ( - 1 != n) {
                                var r = d[n],
                                    s = {
                                        success: null,
                                        error: null
                                    };
                                f.extend(s, t),
                                    r.oProtocolInc.getAudioInfo(r, s)
                            }
                        },
                        this.I_GetDeviceInfo = function(e, t) {
                            var n = this.findDeviceIndexByIP(e);
                            if ( - 1 != n) {
                                var r = d[n],
                                    s = {
                                        success: null,
                                        error: null
                                    };
                                f.extend(s, t),
                                    r.oProtocolInc.getDeviceInfo(r, s)
                            }
                        },
                        this.I_GetAnalogChannelInfo = function(e, t) {
                            var n = this.findDeviceIndexByIP(e);
                            if ( - 1 != n) {
                                var r = d[n],
                                    s = {
                                        success: null,
                                        error: null
                                    };
                                f.extend(s, t),
                                    r.oProtocolInc.getAnalogChannelInfo(r, s)
                            }
                        },
                        this.I_GetDigitalChannelInfo = function(e, t) {
                            var n = this.findDeviceIndexByIP(e);
                            if ( - 1 != n) {
                                var r = d[n],
                                    s = {
                                        success: null,
                                        error: null
                                    };
                                f.extend(s, t),
                                    r.oProtocolInc.getDigitalChannelInfo(r, s)
                            }
                        },
                        this.I_GetZeroChannelInfo = function(e, t) {
                            var n = this.findDeviceIndexByIP(e);
                            if ( - 1 != n) {
                                var r = d[n],
                                    s = {
                                        success: null,
                                        error: null
                                    };
                                f.extend(s, t),
                                    r.oProtocolInc.getZeroChannelInfo(r, s)
                            }
                        },
                        this.I_StartRealPlay = function(e, t) {
                            var r = this.findDeviceIndexByIP(e),
                                s = "",
                                o = "",
                                i = -1,
                                a = 0,
                                c = 0,
                                l = !1,
                                P = {
                                    iWndIndex: u,
                                    iStreamType: 1,
                                    iChannelID: 1,
                                    bZeroChannel: !1
                                };
                            if (f.extend(P, t), -1 != r) {
                                te(d[r]);
                                var h = d[r];
                                if (re()) {
                                    if (!h.bSupportWebsocket) return void(t.error && t.error(403, oe()));
                                    s = h.oProtocolInc.CGI.startWsRealPlay,
                                        o = "ws://",
                                        B(P.iWSPort) ? h.iWSPort = 7681 : h.iWSPort = P.iWSPort,
                                        i = h.iWSPort,
                                        c = P.iStreamType,
                                        a = P.iChannelID <= h.iAnalogChannelNum ? P.iChannelID: h.oStreamCapa.iIpChanBase + parseInt(P.iChannelID, 10) - h.iAnalogChannelNum - 1,
                                        l = !0
                                } else {
                                    var I = parseInt(n.$XML(C).find("ProtocolType").eq(0).text(), 10);
                                    I == W && h.oStreamCapa.bSupportShttpPlay ? (_("SHTTP RealPlay"), s = h.oProtocolInc.CGI.startShttpRealPlay, o = "http://", c = P.iStreamType - 1, a = P.iChannelID <= h.iAnalogChannelNum ? P.iChannelID: h.oStreamCapa.iIpChanBase + parseInt(P.iChannelID, 10) - h.iAnalogChannelNum - 1, l = !0, B(P.iPort) ? "https://" == h.szHttpProtocol ? ( - 1 == h.iHttpPort && (h.iHttpPort = J(h).iHttpPort), i = h.iHttpPort) : i = h.iCGIPort: (h.iHttpPort = P.iPort, i = P.iPort)) : (_("RTSP RealPlay"), s = h.oProtocolInc.CGI.startRealPlay, o = "rtsp://", c = P.iStreamType, a = P.iChannelID, B(P.iRtspPort) || (h.iRtspPort = P.iRtspPort), -1 == h.iRtspPort && (h.iRtspPort = J(h).iRtspPort), i = h.iRtspPort)
                                }
                                if ( - 1 == i) return _("获取端口号失败"),
                                    void(t.error && t.error());
                                if (f.extend(P, {
                                        urlProtocol: o,
                                        cgi: s,
                                        iPort: i,
                                        iStreamType: c,
                                        iChannelID: a
                                    }), r = this.findWndIndexByIndex(P.iWndIndex), -1 == r) if (re()) h.oProtocolInc.startRealPlay(h, P).then(function() {
                                        r = this.findWndIndexByIndex(P.iWndIndex);
                                        var e = p[r];
                                        e.bShttpIPChannel = l,
                                        t.success && t.success()
                                    },
                                    function() {
                                        t.error && t.error()
                                    });
                                else {
                                    // console.log(h, P);
                                    var m = h.oProtocolInc.startRealPlay(h, P);
                                    if (0 == m) {
                                        r = this.findWndIndexByIndex(P.iWndIndex);
                                        var S = p[r];
                                        S.bShttpIPChannel = l,
                                        t.success && t.success()
                                    } else h.iRtspPort = -1,
                                    t.error && t.error()
                                }
                            } else t.error && t.error()
                        },
                        this.I_Stop = function(e) {
                            var t = {
                                iWndIndex: u
                            };
                            N(e) ? f.extend(t, e) : B(e) || (t.iWndIndex = e);
                            var n = this.findWndIndexByIndex(t.iWndIndex);
                            if ( - 1 != n) {
                                var r = p[n];
                                if (r.bRecord && (re() || c.HWP_StopSave(r.iIndex)), r.bSound && (re() || c.HWP_CloseSound()), r.bEZoom && (re() || c.HWP_DisableZoom(r.iIndex)), re()) c.JS_Stop(t.iWndIndex).then(function() {
                                        p.splice(n, 1),
                                        t.success && t.success()
                                    },
                                    function() {
                                        t.error && t.error()
                                    });
                                else {
                                    var s = c.HWP_Stop(t.iWndIndex);
                                    0 == s ? (p.splice(n, 1), t.success && t.success()) : t.error && t.error()
                                }
                            } else t.error && t.error()
                        },
                        this.I_OpenSound = function(e) {
                            e = B(e) ? u: e;
                            var t = this.findWndIndexByIndex(e),
                                n = -1;
                            if ( - 1 != t) {
                                var r = p[t];
                                r.bSound || (n = re() ? c.JS_OpenSound(e) : c.HWP_OpenSound(e), 0 == n && (r.bSound = !0))
                            }
                            return n
                        },
                        this.I_CloseSound = function(e) {
                            e = B(e) ? u: e;
                            var t = this.findWndIndexByIndex(e),
                                n = -1;
                            if ( - 1 != t) {
                                var r = p[t];
                                r.bSound && (n = re() ? c.JS_CloseSound() : c.HWP_CloseSound(), 0 == n && (r.bSound = !1))
                            }
                            return n
                        },
                        this.I_SetVolume = function(e, t) {
                            var n = -1;
                            if (e = parseInt(e, 10), isNaN(e)) return n;
                            if (0 > e || e > 100) return n;
                            t = B(t) ? u: t;
                            var r = this.findWndIndexByIndex(t);
                            return - 1 != r && (re() ? (c.JS_SetVolume(t, e), n = 0) : n = c.HWP_SetVolume(t, e)),
                                n
                        },
                        this.I_CapturePic = function(e, t) {
                            var n = {
                                iWndIndex: u,
                                bDateDir: !0
                            };
                            N(t) ? f.extend(n, t) : B(t) || (n.iWndIndex = t);
                            var r = this.findWndIndexByIndex(n.iWndIndex),
                                s = -1;
                            if ( - 1 != r) if (re()) {
                                var o = "JPEG";
                                ".jpg" === e.slice( - 4).toLowerCase() ? e = e.slice(0, -4) : ".jpeg" === e.slice( - 5).toLowerCase() ? e = e.slice(0, -5) : ".bmp" === e.slice( - 4).toLowerCase() && (e = e.slice(0, -4), o = "BMP"),
                                    s = c.JS_CapturePicture(n.iWndIndex, e, o)
                            } else ".jpg" === e.slice( - 4).toLowerCase() ? e = e.slice(0, -4) : ".jpeg" === e.slice( - 5).toLowerCase() && (e = e.slice(0, -5)),
                                s = c.HWP_CapturePicture(n.iWndIndex, e, n.bDateDir);
                            return s
                        },
                        this.I_StartRecord = function(e, t) {
                            var n = {
                                iWndIndex: u,
                                bDateDir: !0
                            };
                            N(t) ? f.extend(n, t) : B(t) || (n.iWndIndex = t);
                            var r = this.findWndIndexByIndex(n.iWndIndex);
                            if ( - 1 != r) {
                                var s = p[r];
                                if (s.bRecord) n.error && n.error();
                                else if (re()) {
                                    var o = f.browser();
                                    o.chrome ? c.JS_StartSave(n.iWndIndex, e).then(function() {
                                            s.bRecord = !0,
                                            n.success && n.success()
                                        },
                                        function() {
                                            n.error && n.error()
                                        }) : n.error && n.error()
                                } else {
                                    var i = c.HWP_StartSave(n.iWndIndex, e, n.bDateDir);
                                    0 == i ? (s.bRecord = !0, n.success && n.success()) : n.error && n.error()
                                }
                            } else n.error && n.error()
                        },
                        this.I_StopRecord = function(e) {
                            var t = {
                                iWndIndex: u
                            };
                            N(e) ? f.extend(t, e) : B(e) || (t.iWndIndex = e);
                            var n = this.findWndIndexByIndex(t.iWndIndex);
                            if ( - 1 != n) {
                                var r = p[n];
                                if (r.bRecord) if (re()) {
                                    var s = f.browser();
                                    s.chrome ? c.JS_StopSave(t.iWndIndex).then(function() {
                                            r.bRecord = !1,
                                            t.success && t.success()
                                        },
                                        function() {
                                            t.error && t.error()
                                        }) : t.error && t.error()
                                } else {
                                    var o = c.HWP_StopSave(t.iWndIndex);
                                    0 == o ? (r.bRecord = !1, t.success && t.success()) : t.error && t.error()
                                } else t.error && t.error()
                            } else t.error && t.error()
                        },
                        this.I_StartVoiceTalk = function(e, t) {
                            if (isNaN(parseInt(t, 10))) return - 1;
                            var n = this.findDeviceIndexByIP(e),
                                r = -1;
                            if ( - 1 != n) {
                                var s = d[n];
                                s.bVoiceTalk || (r = re() ? -1 : s.oProtocolInc.startVoiceTalk(s, t), 0 == r && (d[n].bVoiceTalk = !0))
                            }
                            return r
                        },
                        this.I_StopVoiceTalk = function() {
                            var e = -1;
                            if (!re()) {
                                e = c.HWP_StopVoiceTalk();
                                for (var t = 0,
                                         n = d.length; n > t; t++) if (d[t].bVoiceTalk) {
                                    d[t].bVoiceTalk = !1;
                                    break
                                }
                            }
                            return e
                        },
                        this.I_PTZControl = function(e, t, n) {
                            var r = {
                                iWndIndex: u,
                                iPTZIndex: e,
                                iPTZSpeed: 4
                            };
                            f.extend(r, n),
                                f.extend(r, {
                                    async: !1
                                });
                            var s = this.findWndIndexByIndex(r.iWndIndex);
                            if ( - 1 != s) {
                                var o = p[s];
                                if (s = this.findDeviceIndexByIP(o.szIP), -1 != s) {
                                    var i = d[s];
                                    9 == e ? i.oProtocolInc.ptzAutoControl(i, t, o, r) : i.oProtocolInc.ptzControl(i, t, o, r)
                                }
                            }
                        },
                        this.I_EnableEZoom = function(e) {
                            e = B(e) ? u: e;
                            var t = this.findWndIndexByIndex(e),
                                n = -1;
                            if ( - 1 != t) {
                                var r = p[t];
                                r.bEZoom || (n = re() ? c.JS_EnableZoom(e) : c.HWP_EnableZoom(e, 0), 0 == n && (r.bEZoom = !0))
                            }
                            return n
                        },
                        this.I_DisableEZoom = function(e) {
                            e = B(e) ? u: e;
                            var t = this.findWndIndexByIndex(e),
                                n = -1;
                            if ( - 1 != t) {
                                var r = p[t];
                                r.bEZoom && (re() ? n = c.JS_DisableZoom(e) : (c.HWP_DisableZoom(e), n = 0), 0 == n && (r.bEZoom = !1))
                            }
                            return n
                        },
                        this.I_Enable3DZoom = function(e) {
                            e = B(e) ? u: e;
                            var t = this.findWndIndexByIndex(e),
                                n = -1;
                            if ( - 1 != t) {
                                var r = p[t];
                                r.b3DZoom || (n = re() ? -1 : c.HWP_EnableZoom(e, 1), 0 == n && (r.b3DZoom = !0))
                            }
                            return n
                        },
                        this.I_Disable3DZoom = function(e) {
                            e = B(e) ? u: e;
                            var t = this.findWndIndexByIndex(e),
                                n = -1;
                            if ( - 1 != t) {
                                var r = p[t];
                                r.b3DZoom && (re() ? n = -1 : (c.HWP_DisableZoom(e), n = 0), 0 == n && (r.b3DZoom = !1))
                            }
                            return n
                        },
                        this.I_FullScreen = function(e) {
                            re() ? c.JS_FullScreenDisplay(e) : c.HWP_FullScreenDisplay(e)
                        },
                        this.I_SetPreset = function(e, t) {
                            var n = {
                                iWndIndex: u,
                                iPresetID: e
                            };
                            f.extend(n, t);
                            var r = this.findWndIndexByIndex(n.iWndIndex);
                            if ( - 1 != r) {
                                var s = p[r];
                                if (r = this.findDeviceIndexByIP(s.szIP), -1 != r) {
                                    var o = d[r];
                                    o.oProtocolInc.setPreset(o, s, n)
                                }
                            }
                        },
                        this.I_GoPreset = function(e, t) {
                            var n = {
                                iWndIndex: u,
                                iPresetID: e
                            };
                            f.extend(n, t);
                            var r = this.findWndIndexByIndex(n.iWndIndex);
                            if ( - 1 != r) {
                                var s = p[r];
                                if (r = this.findDeviceIndexByIP(s.szIP), -1 != r) {
                                    var o = d[r];
                                    o.oProtocolInc.goPreset(o, s, n)
                                }
                            }
                        },
                        this.I_RecordSearch = function(e, t, n, r, s) {
                            var o = this.findDeviceIndexByIP(e);
                            if ( - 1 != o) {
                                var i = d[o],
                                    a = {
                                        iChannelID: t,
                                        szStartTime: n,
                                        szEndTime: r,
                                        iSearchPos: 0,
                                        iStreamType: 1,
                                        success: null,
                                        error: null
                                    };
                                f.extend(a, s),
                                    i.oProtocolInc.recordSearch(i, a)
                            }
                        },
                        this.I_StartPlayback = function(e, t) {
                            var r = this.findDeviceIndexByIP(e),
                                s = "",
                                o = "",
                                i = -1,
                                a = 1,
                                c = 0,
                                l = f.dateFormat(new Date, "yyyy-MM-dd"),
                                p = {
                                    iWndIndex: u,
                                    iStreamType: 1,
                                    iChannelID: 1,
                                    szStartTime: l + " 00:00:00",
                                    szEndTime: l + " 23:59:59"
                                };
                            if (f.extend(p, t), -1 != r) {
                                te(d[r]);
                                var P = d[r];
                                if (re()) {
                                    if (!P.bSupportWebsocket) return void(t.error && t.error(403, oe()));
                                    if (!B(p.oTransCodeParam)) return void(t.error && t.error());
                                    s = P.oProtocolInc.CGI.startWsPlayback,
                                        o = "ws://",
                                        B(p.iWSPort) ? P.iWSPort = 7681 : P.iWSPort = p.iWSPort,
                                        i = P.iWSPort,
                                        c = p.iStreamType,
                                        a = p.iChannelID <= P.iAnalogChannelNum ? p.iChannelID: P.oStreamCapa.iIpChanBase + parseInt(p.iChannelID, 10) - P.iAnalogChannelNum - 1,
                                        a = 100 * a + c
                                } else {
                                    var h = parseInt(n.$XML(C).find("ProtocolType").eq(0).text(), 10);
                                    h == W && P.oStreamCapa.bSupportShttpPlay ? (s = B(p.oTransCodeParam) ? P.oProtocolInc.CGI.startShttpPlayback: P.oProtocolInc.CGI.startTransCodePlayback, o = "http://", c = p.iStreamType - 1, a = p.iChannelID <= P.iAnalogChannelNum ? p.iChannelID: P.oStreamCapa.iIpChanBase + parseInt(p.iChannelID, 10) - P.iAnalogChannelNum - 1, P.bSupportSubStreamPlayback && (a = 100 * a + c), B(p.iPort) ? "https://" == P.szHttpProtocol ? ( - 1 == P.iHttpPort && (P.iHttpPort = J(P).iHttpPort), i = P.iHttpPort) : i = P.iCGIPort: (P.iHttpPort = p.iPort, i = p.iPort)) : (s = P.oProtocolInc.CGI.startPlayback, o = "rtsp://", c = p.iStreamType, a = 100 * p.iChannelID + c, B(p.iRtspPort) || (P.iRtspPort = p.iRtspPort), -1 == P.iRtspPort && (P.iRtspPort = J(P).iRtspPort), i = P.iRtspPort)
                                }
                                if ( - 1 == i) return _("获取端口号失败"),
                                    void(t.error && t.error());
                                if (f.extend(p, {
                                        urlProtocol: o,
                                        cgi: s,
                                        iPort: i,
                                        iChannelID: a
                                    }), r = this.findWndIndexByIndex(p.iWndIndex), -1 == r) if (re()) p.szStartTime = p.szStartTime.replace(" ", "T") + "Z",
                                    p.szEndTime = p.szEndTime.replace(" ", "T") + "Z",
                                    P.oProtocolInc.startPlayback(P, p).then(function() {
                                            t.success && t.success()
                                        },
                                        function() {
                                            t.error && t.error()
                                        });
                                else {
                                    p.szStartTime = p.szStartTime.replace(/[-:]/g, "").replace(" ", "T") + "Z",
                                        p.szEndTime = p.szEndTime.replace(/[-:]/g, "").replace(" ", "T") + "Z";
                                    var I = P.oProtocolInc.startPlayback(P, p);
                                    0 == I ? t.success && t.success() : (P.iRtspPort = -1, t.error && t.error())
                                }
                            } else t.error && t.error()
                        },
                        this.I_ReversePlayback = function(e, t) {
                            var r = this.findDeviceIndexByIP(e),
                                s = -1,
                                o = "",
                                i = "",
                                a = -1,
                                c = -1,
                                l = 0,
                                p = f.dateFormat(new Date, "yyyy-MM-dd"),
                                P = {
                                    iWndIndex: u,
                                    iStreamType: 1,
                                    iChannelID: 1,
                                    szStartTime: p + " 00:00:00",
                                    szEndTime: p + " 23:59:59"
                                };
                            if (f.extend(P, t), -1 != r) {
                                te(d[r]);
                                var h = d[r];
                                if (re()) return s;
                                var I = parseInt(n.$XML(C).find("ProtocolType").eq(0).text(), 10);
                                if (I == W && h.oStreamCapa.bSupportShttpPlay ? (o = h.oProtocolInc.CGI.startShttpReversePlayback, i = "http://", l = P.iStreamType - 1, c = P.iChannelID <= h.iAnalogChannelNum ? P.iChannelID: h.oStreamCapa.iIpChanBase + parseInt(P.iChannelID, 10) - h.iAnalogChannelNum - 1, c = 100 * c + l, B(P.iPort) ? "https://" == h.szHttpProtocol ? ( - 1 == h.iHttpPort && (h.iHttpPort = J(h).iHttpPort), a = h.iHttpPort) : a = h.iCGIPort: (h.iHttpPort = P.iPort, a = P.iPort)) : (o = h.oProtocolInc.CGI.startPlayback, i = "rtsp://", l = P.iStreamType, c = 100 * P.iChannelID + l, B(P.iRtspPort) || (h.iRtspPort = P.iRtspPort), -1 == h.iRtspPort && (h.iRtspPort = J(h).iRtspPort), a = h.iRtspPort), -1 == a) return _("获取端口号失败"),
                                    s;
                                f.extend(P, {
                                    urlProtocol: i,
                                    cgi: o,
                                    iPort: a,
                                    iChannelID: c
                                }),
                                    r = this.findWndIndexByIndex(P.iWndIndex),
                                -1 == r && (P.szStartTime = P.szStartTime.replace(/[-:]/g, "").replace(" ", "T") + "Z", P.szEndTime = P.szEndTime.replace(/[-:]/g, "").replace(" ", "T") + "Z", s = h.oProtocolInc.reversePlayback(h, P))
                            }
                            return - 1 == s && (h.iRtspPort = -1),
                                s
                        },
                        this.I_Frame = function(e) {
                            var t = {
                                iWndIndex: u
                            };
                            N(e) ? f.extend(t, e) : B(e) || (t.iWndIndex = e);
                            var n = this.findWndIndexByIndex(t.iWndIndex);
                            if ( - 1 != n) {
                                var r = p[n],
                                    s = r.iPlayStatus;
                                if (s == D || s == T) if (re()) c.JS_FrameForward(t.iWndIndex).then(function() {
                                        r.iPlayStatus = T,
                                        t.success && t.success()
                                    },
                                    function() {
                                        t.error && t.error()
                                    });
                                else {
                                    var o = c.HWP_FrameForward(t.iWndIndex);
                                    0 == o ? (r.iPlayStatus = T, t.success && t.success()) : t.error && t.error()
                                } else t.error && t.error()
                            } else t.error && t.error()
                        },
                        this.I_Pause = function(e) {
                            var t = {
                                iWndIndex: u
                            };
                            N(e) ? f.extend(t, e) : B(e) || (t.iWndIndex = e);
                            var n = this.findWndIndexByIndex(t.iWndIndex);
                            if ( - 1 != n) {
                                var r = p[n],
                                    s = r.iPlayStatus,
                                    o = -1;
                                if (s == D) o = z;
                                else {
                                    if (s != b) return void(t.error && t.error());
                                    o = A
                                }
                                if (re()) c.JS_Pause(t.iWndIndex).then(function() {
                                        r.iPlayStatus = o,
                                        t.success && t.success()
                                    },
                                    function() {
                                        t.error && t.error()
                                    });
                                else {
                                    var i = c.HWP_Pause(t.iWndIndex);
                                    0 == i ? (r.iPlayStatus = o, t.success && t.success()) : t.error && t.error()
                                }
                            } else t.error && t.error()
                        },
                        this.I_Resume = function(e) {
                            var t = {
                                iWndIndex: u
                            };
                            N(e) ? f.extend(t, e) : B(e) || (t.iWndIndex = e);
                            var n = this.findWndIndexByIndex(t.iWndIndex);
                            if ( - 1 != n) {
                                var r = p[n],
                                    s = r.iPlayStatus,
                                    o = -1;
                                if (s == z || s == T) o = D;
                                else {
                                    if (s != A) return void(t.error && t.error());
                                    o = b
                                }
                                if (re()) c.JS_Resume(t.iWndIndex).then(function() {
                                        r.iPlayStatus = o,
                                        t.success && t.success()
                                    },
                                    function() {
                                        t.error && t.error()
                                    });
                                else {
                                    var i = c.HWP_Resume(t.iWndIndex);
                                    0 == i ? (r.iPlayStatus = o, t.success && t.success()) : t.error && t.error()
                                }
                            } else t.error && t.error()
                        },
                        this.I_PlaySlow = function(e) {
                            var t = {
                                iWndIndex: u
                            };
                            N(e) ? f.extend(t, e) : B(e) || (t.iWndIndex = e);
                            var n = this.findWndIndexByIndex(t.iWndIndex);
                            if ( - 1 != n) {
                                var r = p[n];
                                if (r.iPlayStatus == D) if (re()) {
                                    var s = c.JS_GetWndStatus(t.iWndIndex);
                                    s.iRate <= -4 ? t.error && t.error() : c.JS_Slow(t.iWndIndex).then(function() {
                                            t.success && t.success()
                                        },
                                        function() {
                                            t.error && t.error()
                                        })
                                } else {
                                    var o = c.HWP_Slow(t.iWndIndex);
                                    0 == o ? t.success && t.success() : t.error && t.error()
                                } else t.error && t.error()
                            } else t.error && t.error()
                        },
                        this.I_PlayFast = function(e) {
                            var t = {
                                iWndIndex: u
                            };
                            N(e) ? f.extend(t, e) : B(e) || (t.iWndIndex = e);
                            var n = this.findWndIndexByIndex(t.iWndIndex);
                            if ( - 1 != n) {
                                var r = p[n];
                                if (r.iPlayStatus == D) if (re()) {
                                    var s = c.JS_GetWndStatus(t.iWndIndex);
                                    s.iRate >= 4 ? t.error && t.error() : c.JS_Fast(t.iWndIndex).then(function() {
                                            t.success && t.success()
                                        },
                                        function() {
                                            t.error && t.error()
                                        })
                                } else {
                                    var o = c.HWP_Fast(t.iWndIndex);
                                    0 == o ? t.success && t.success() : t.error && t.error()
                                } else t.error && t.error()
                            } else t.error && t.error()
                        },
                        this.I_GetOSDTime = function(e) {
                            var t = {
                                iWndIndex: u
                            };
                            N(e) ? f.extend(t, e) : B(e) || (t.iWndIndex = e);
                            var n = this.findWndIndexByIndex(t.iWndIndex);
                            if ( - 1 != n) {
                                if (re()) c.JS_GetOSDTime(t.iWndIndex).then(function(e) {
                                        if (t.success) {
                                            var n = f.dateFormat(new Date(1e3 * e), "yyyy-MM-dd hh:mm:ss");
                                            t.success(n)
                                        }
                                    },
                                    function() {
                                        t.error && t.error()
                                    });
                                else if (t.success) {
                                    var r = c.HWP_GetOSDTime(t.iWndIndex),
                                        s = f.dateFormat(new Date(1e3 * r), "yyyy-MM-dd hh:mm:ss");
                                    t.success(s)
                                }
                            } else t.error && t.error()
                        },
                        this.I_StartDownloadRecord = function(e, t, n, r) {
                            var s = this.findDeviceIndexByIP(e),
                                o = -1;
                            if ( - 1 != s) {
                                var i = d[s],
                                    a = {
                                        szPlaybackURI: t,
                                        szFileName: n,
                                        bDateDir: !0
                                    };
                                B(r) || f.extend(a, r),
                                    o = i.oProtocolInc.startDownloadRecord(i, a)
                            }
                            return o
                        },
                        this.I_GetDownloadStatus = function(e) {
                            var t = -1;
                            return re() ? t: (t = c.HWP_GetDownloadStatus(e), 1 == t && (t = -1), t)
                        },
                        this.I_GetDownloadProgress = function(e) {
                            return re() ? -1 : c.HWP_GetDownloadProgress(e);
                        },
                        this.I_StopDownloadRecord = function(e) {
                            return re() ? -1 : c.HWP_StopDownload(e)
                        },
                        this.I_ExportDeviceConfig = function(e) {
                            var t = this.findDeviceIndexByIP(e),
                                n = -1;
                            if ( - 1 != t) {
                                var r = d[t];
                                if (re()) return n;
                                n = r.oProtocolInc.exportDeviceConfig(r)
                            }
                            return n
                        },
                        this.I_ImportDeviceConfig = function(e, t) {
                            var n = this.findDeviceIndexByIP(e),
                                r = -1;
                            if ( - 1 != n) {
                                var s = d[n],
                                    o = {
                                        szFileName: t
                                    };
                                if (re()) return r;
                                r = s.oProtocolInc.importDeviceConfig(s, o)
                            }
                            return r
                        },
                        this.I_RestoreDefault = function(e, t, n) {
                            var r = {
                                success: null,
                                error: null
                            };
                            f.extend(r, n);
                            var s = this.findDeviceIndexByIP(e);
                            if ( - 1 != s) {
                                var o = d[s];
                                o.oProtocolInc.restore(o, t, r)
                            }
                        },
                        this.I_Restart = function(e, t) {
                            var n = this.findDeviceIndexByIP(e),
                                r = {
                                    success: null,
                                    error: null
                                };
                            if (f.extend(r, t), -1 != n) {
                                var s = d[n];
                                s.oProtocolInc.restart(s, r)
                            }
                        },
                        this.I_Reconnect = function(e, t) {
                            var n = this.findDeviceIndexByIP(e),
                                r = {
                                    success: null,
                                    error: null
                                };
                            if (f.extend(r, t), -1 != n) {
                                var s = d[n];
                                s.oProtocolInc.login(s.szIP, s.iCGIPort, s.szAuth, r)
                            }
                        },
                        this.I_StartUpgrade = function(e, t) {
                            var n = this.findDeviceIndexByIP(e),
                                r = -1;
                            if ( - 1 != n) {
                                var s = d[n],
                                    o = {
                                        szFileName: t
                                    };
                                if (re()) return r;
                                r = s.oProtocolInc.startUpgrade(s, o)
                            }
                            return r
                        },
                        this.I_UpgradeStatus = function() {
                            return re() ? -1 : c.HWP_UpgradeStatus()
                        },
                        this.I_UpgradeProgress = function() {
                            return re() ? -1 : c.HWP_UpgradeProgress()
                        },
                        this.I_StopUpgrade = function() {
                            return re() ? -1 : c.HWP_StopUpgrade()
                        },
                        this.I_CheckPluginInstall = function() {
                            var e = -1,
                                t = f.browser();
                            if (re()) e = 0;
                            else if (t.msie) try {
                                new ActiveXObject("WebVideoKitActiveX.WebVideoKitActiveXCtrl.1");
                                e = 0
                            } catch(n) {} else for (var r = 0,
                                                        s = navigator.mimeTypes.length; s > r; r++) if ("application/webvideo-plugin-kit" == navigator.mimeTypes[r].type.toLowerCase()) {
                                e = 0;
                                break
                            }
                            return e
                        },
                        this.I_CheckPluginVersion = function() {
                            return re() ? 0 : c.HWP_CheckPluginUpdate(k) ? -1 : 0
                        },
                        this.I_SendHTTPRequest = function(e, t, n) {
                            var r = this.findDeviceIndexByIP(e);
                            if (! (0 > r)) {
                                var s = d[r],
                                    o = new ue,
                                    i = s.szHttpProtocol + s.szIP + ":" + s.iCGIPort + "/" + t,
                                    a = {
                                        type: "GET",
                                        url: i,
                                        auth: s.szAuth,
                                        success: null,
                                        error: null
                                    };
                                f.extend(a, n),
                                    f.extend(a, {
                                        success: function(e) {
                                            n.success && n.success(e)
                                        },
                                        error: function(e, t) {
                                            n.error && n.error(e, t)
                                        }
                                    }),
                                    o.setRequestParam(a),
                                    o.submitRequest()
                            }
                        },
                        this.I_RemoteConfig = function(e, t) {
                            var n = this.findDeviceIndexByIP(e),
                                r = -1,
                                s = -1;
                            if (re()) return r;
                            var o = {
                                iLan: 0,
                                iDevicePort: -1,
                                iType: 0
                            };
                            if (f.extend(o, t), -1 != n) {
                                var i = d[n];
                                if ( - 1 == o.iDevicePort) if ( - 1 == i.iDevicePort) {
                                    if (i.iDevicePort = J(i).iDevicePort, s = i.iDevicePort, -1 == s) return r
                                } else s = i.iDevicePort;
                                else s = o.iDevicePort;
                                if (":" == f.Base64.decode(i.szAuth)[0]) var a = f.Base64.decode(i.szAuth).split(":")[1],
                                    u = f.Base64.decode(i.szAuth).split(":")[2];
                                else var a = f.Base64.decode(i.szAuth).split(":")[0],
                                    u = f.Base64.decode(i.szAuth).split(":")[1];
                                var l = "<RemoteInfo><DeviceInfo><DeviceType>" + o.iType + "</DeviceType><LanType>" + o.iLan + "</LanType><IP>" + i.szIP + "</IP><Port>" + s + "</Port><UName>" + a + "</UName><PWD>" + f.Base64.encode(u) + "</PWD></DeviceInfo></RemoteInfo>";
                                return c.HWP_ShowRemConfig(l)
                            }
                            return r
                        },
                        this.I_ChangeWndNum = function(e) {
                            return isNaN(parseInt(e, 10)) ? -1 : (re() ? c.JS_ArrangeWindow(e) : c.HWP_ArrangeWindow(e), 0)
                        },
                        this.I_GetLastError = function() {
                            return re() ? -1 : c.HWP_GetLastError()
                        },
                        this.I_GetWindowStatus = function(e) {
                            if (B(e)) {
                                var t = [];
                                return f.extend(t, p),
                                    t
                            }
                            var n = this.findWndIndexByIndex(e);
                            if ( - 1 != n) {
                                var t = {};
                                return f.extend(t, p[n]),
                                    t
                            }
                            return null
                        },
                        this.I_GetIPInfoByMode = function(e, t, n, r) {
                            return re() ? "": c.HWP_GetIpInfoByMode(e, t, n, r)
                        },
                        this.I_SetPlayModeType = function(e) {
                            return re() ? -1 : c.HWP_SetPlayModeType(e)
                        },
                        this.I_SetSnapDrawMode = function(e, t) {
                            return re() ? -1 : c.HWP_SetSnapDrawMode(e, t)
                        },
                        this.I_SetSnapPolygonInfo = function(e, t) {
                            if (re()) return - 1;
                            var r, s, o, i, a, u, l, d, p, P, h, I, m, C = c.HWP_GetSnapPolygonInfo(e);
                            // console.log("921", r);
                            r = f.loadXML(C),
                                s = n.$XML(r).find("SnapPolygon", !0);

                            var S = s.length,
                                v = [];
                            for (o = 0, i = s.length; i > o; o++) a = s[o],
                                v.push(n.$XML(a).find("id").eq(0).text());
                            var y = v.join(",");
                            // console.log("927");
                            if (y = "," + y + ",", r = f.loadXML(t), s = n.$XML(r).find("SnapPolygon", !0), S + s.length > 32) return - 3;
                            for (o = 0, i = s.length; i > o; o++) {
                                if (a = s[o], u = n.$XML(a).find("id").eq(0).text(), !f.isInt(u)) return - 2;
                                if (l = parseInt(u, 10), 1 > l || l > 32) return - 2;
                                if (y.indexOf("," + u + ",") > -1) return - 4;
                                if (d = n.$XML(a).find("tips").eq(0).text(), d.length > 32) return - 2;
                                if (h = "true" === n.$XML(a).find("isClosed").eq(0).text(), !h) {
                                    if (p = n.$XML(a).find("MinClosed").eq(0).text(), !f.isInt(p)) return - 2;
                                    if (P = parseInt(p, 10), 4 > P || P > 17) return - 2;
                                    if (I = n.$XML(a).find("PointNumMax").eq(0).text(), !f.isInt(I)) return - 2;
                                    if (m = parseInt(I, 10), P > m || m > 17) return - 2
                                }
                            }
                            return c.HWP_SetSnapPolygonInfo(e, t)
                        },
                        this.I_GetSnapPolygonInfo = function(e) {
                            return re() ? "": c.HWP_GetSnapPolygonInfo(e)
                        },
                        this.I_ClearSnapInfo = function(e) {
                            return re() ? -1 : c.HWP_ClearSnapInfo(e, 1)
                        },
                        this.I_DeviceCapturePic = function(e, t, n, r) {
                            var s = this.findDeviceIndexByIP(e),
                                o = -1;
                            if ( - 1 != s) {
                                var i = d[s],
                                    a = {
                                        bDateDir: !0
                                    };
                                if (f.extend(a, r), !B(a.iResolutionWidth) && !f.isInt(a.iResolutionWidth)) return o;
                                if (!B(a.iResolutionHeight) && !f.isInt(a.iResolutionHeight)) return o;
                                o = i.oProtocolInc.deviceCapturePic(i, t, n, a)
                            }
                            return o
                        },
                        this.I_SetPackageType = function(e) {
                            return re() ? -1 : c.HWP_SetPackageType(e)
                        },
                        this.I_GetDevicePort = function(e) {

                            var t = this.findDeviceIndexByIP(e),
                                n = null;
                            if ( - 1 != t) {
                                var r = d[t];
                                n = J(r)
                            }
                            return n
                        },
                        this.findDeviceIndexByIP = function(e) {
                            if (e.indexOf("_") > -1) {
                                for (var t = 0,
                                         n = d.length; n > t; t++) if (d[t].szDeviceIdentify == e) return t
                            } else for (var t = 0,
                                            n = d.length; n > t; t++) if (d[t].szIP == e) return t;
                            return - 1
                        },
                        this.findWndIndexByIndex = function(e) {
                            for (var t = 0,
                                     n = p.length; n > t; t++) if (p[t].iIndex == e) return t;
                            return - 1
                        };
                    var ae = function() {
                            this.szIP = "",
                                this.szHostName = "",
                                this.szAuth = "",
                                this.szHttpProtocol = "http://",
                                this.iCGIPort = 80,
                                this.szDeviceIdentify = "",
                                this.iDevicePort = -1,
                                this.iHttpPort = -1,
                                this.iHttpsPort = -1,
                                this.iRtspPort = -1,
                                this.iWSPort = -1,
                                this.iAudioType = 1,
                                this.m_iAudioBitRate = -1,
                                this.m_iAudioSamplingRate = -1,
                                this.iDeviceProtocol = S,
                                this.oProtocolInc = null,
                                this.iAnalogChannelNum = 0,
                                this.szDeviceType = "",
                                this.bVoiceTalk = !1,
                                this.oStreamCapa = {
                                    bObtained: !1,
                                    bSupportShttpPlay: !1,
                                    bSupportShttpPlayback: !1,
                                    bSupportShttpsPlay: !1,
                                    bSupportShttpsPlayback: !1,
                                    bSupportShttpPlaybackTransCode: !1,
                                    bSupportShttpsPlaybackTransCode: !1,
                                    iIpChanBase: 1
                                }
                        },
                        ce = function() {
                            this.iIndex = 0,
                                this.szIP = "",
                                this.iCGIPort = 80,
                                this.szDeviceIdentify = "",
                                this.iChannelID = "",
                                this.iPlayStatus = g,
                                this.bSound = !1,
                                this.bRecord = !1,
                                this.bPTZAuto = !1,
                                this.bEZoom = !1,
                                this.b3DZoom = !1
                        },
                        ue = function() {
                            this.options = {
                                type: "GET",
                                url: "",
                                auth: "",
                                timeout: 1e4,
                                data: "",
                                async: !0,
                                success: null,
                                error: null
                            },
                                this.m_szHttpHead = "",
                                this.m_szHttpContent = "",
                                this.m_szHttpData = ""
                        };
                    ue.prototype.m_httpRequestSet = [],
                        ue.prototype.setRequestParam = function(e) {
                            f.extend(this.options, e)
                        },
                        ue.prototype.submitRequest = function() {
                            var t = null,
                                n = this;
                            if (re()) {
                                this.options.auth ? f.cookie("WebSession", this.options.auth) : f.cookie("WebSession", null);
                                var r = se(this.options.url),
                                    s = new e.XMLHttpRequest;
                                s.open(this.options.type, r, this.options.async),
                                    s.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
                                    s.setRequestHeader("If-Modified-Since", "0"),
                                    s.send(this.options.data || null);
                                var o = function() {
                                    if (4 === s.readyState) {
                                        t = {
                                            funSuccessCallback: n.options.success,
                                            funErrorCallback: n.options.error
                                        };
                                        var e = s.status + s.responseText;
                                        0 === s.status && (e = ""),
                                            n.httpDataAnalyse(t, e)
                                    }
                                };
                                this.options.async ? (s.timeout = this.options.timeout, s.onreadystatechange = function() {
                                    o()
                                }) : o()
                            } else {
                                var i = this.getHttpMethod(this.options.type);
                                if (this.options.async) {
                                    var a = c.HWP_SubmitHttpRequest(i, this.options.url, this.options.auth, this.options.data, this.options.timeout); - 1 != a && (t = {
                                        iRequestID: a,
                                        funSuccessCallback: this.options.success,
                                        funErrorCallback: this.options.error
                                    },
                                        this.m_httpRequestSet.push(t))
                                } else {
                                    var u = c.HWP_SendHttpSynRequest(i, this.options.url, this.options.auth, this.options.data, this.options.timeout);
                                    t = {
                                        funSuccessCallback: this.options.success,
                                        funErrorCallback: this.options.error
                                    },
                                        this.httpDataAnalyse(t, u)
                                }
                            }
                        },
                        ue.prototype.getHttpMethod = function(e) {
                            var t = {
                                    GET: 1,
                                    POST: 2,
                                    PUT: 5,
                                    DELETE: 6
                                },
                                n = t[e];
                            return n ? n: -1
                        },
                        ue.prototype.processCallback = function(e, t) {
                            for (var n = null,
                                     r = 0; r < this.m_httpRequestSet.length; r++) if (e == this.m_httpRequestSet[r].iRequestID) {
                                n = this.m_httpRequestSet[r],
                                    this.m_httpRequestSet.splice(r, 1);
                                break
                            }
                            null != n && (this.httpDataAnalyse(n, t), delete n)
                        },
                        ue.prototype.httpDataAnalyse = function(e, t) {
                            var n = "",
                                r = 0;

                            "" == t || B(t) ? e.funErrorCallback() : (r = parseInt(t.substring(0, 3)), n = t.substring(3, t.length), isNaN(r) ? e.funErrorCallback() : y == r ? e.funSuccessCallback(f.loadXML2(n)) : e.funErrorCallback(r, f.loadXML2(n)))
                        };
                    var le = function() {};
                    le.prototype.CGI = {
                        login: "%s%s:%s/ISAPI/Security/userCheck",
                        getAudioInfo: "%s%s:%s/ISAPI/System/TwoWayAudio/channels",
                        getDeviceInfo: "%s%s:%s/ISAPI/System/deviceInfo",
                        getAnalogChannelInfo: "%s%s:%s/ISAPI/System/Video/inputs/channels",
                        getDigitalChannel: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels",
                        getDigitalChannelInfo: "%s%s:%s/ISAPI/ContentMgmt/InputProxy/channels/status",
                        getZeroChannelInfo: "%s%s:%s/ISAPI/ContentMgmt/ZeroVideo/channels",
                        getStreamChannels: {
                            analog: "%s%s:%s/ISAPI/Streaming/channels",
                            digital: "%s%s:%s/ISAPI/ContentMgmt/StreamingProxy/channels"
                        },
                        getStreamDynChannels: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/DynStreaming/channels",
                        startRealPlay: {
                            channels: "%s%s:%s/PSIA/streaming/channels/%s",
                            zeroChannels: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/ZeroStreaming/channels/%s"
                        },
                        startShttpRealPlay: {
                            channels: "%s%s:%s/SDK/play/%s/004",
                            zeroChannels: "%s%s:%s/SDK/play/100/004/ZeroStreaming"
                        },
                        startWsRealPlay: {
                            channels: "%s%s:%s/%s",
                            zeroChannels: "%s%s:%s/%s"
                        },
                        startVoiceTalk: {
                            open: "%s%s:%s/ISAPI/System/TwoWayAudio/channels/%s/open",
                            close: "%s%s:%s/ISAPI/System/TwoWayAudio/channels/%s/close",
                            audioData: "%s%s:%s/ISAPI/System/TwoWayAudio/channels/%s/audioData"
                        },
                        ptzControl: {
                            analog: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/continuous",
                            digital: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/continuous"
                        },
                        ptzAutoControl: {
                            ipdome: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/presets/%s/goto",
                            analog: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/autoPan",
                            digital: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/autoPan"
                        },
                        setPreset: {
                            analog: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/presets/%s",
                            digital: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/presets/%s"
                        },
                        goPreset: {
                            analog: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/presets/%s/goto",
                            digital: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/presets/%s/goto"
                        },
                        ptzFocus: {
                            analog: "%s%s:%s/ISAPI/Image/channels/%s/focus",
                            digital: "%s%s:%s/ISAPI/ContentMgmt/ImageProxy/channels/%s/focus",
                            ipc: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/focus"
                        },
                        ptzIris: {
                            analog: "%s%s:%s/ISAPI/Image/channels/%s/iris",
                            digital: "%s%s:%s/ISAPI/ContentMgmt/ImageProxy/channels/%s/iris",
                            ipc: "%s%s:%s/ISAPI/System/Video/inputs/channels/%s/iris"
                        },
                        getNetworkBond: "%s%s:%s/ISAPI/System/Network/Bond",
                        getNetworkInterface: "%s%s:%s/ISAPI/System/Network/interfaces",
                        getUPnPPortStatus: "%s%s:%s/ISAPI/System/Network/UPnP/ports/status",
                        getPPPoEStatus: "%s%s:%s/ISAPI/System/Network/PPPoE/1/status",
                        getPortInfo: "%s%s:%s/ISAPI/Security/adminAccesses",
                        recordSearch: "%s%s:%s/ISAPI/ContentMgmt/search",
                        startPlayback: "%s%s:%s/PSIA/streaming/tracks/%s?starttime=%s&endtime=%s",
                        startWsPlayback: "%s%s:%s/%s",
                        startShttpPlayback: "%s%s:%s/SDK/playback/%s",
                        startShttpReversePlayback: "%s%s:%s/SDK/playback/%s/reversePlay",
                        startTransCodePlayback: "%s%s:%s/SDK/playback/%s/transcoding",
                        startDownloadRecord: "%s%s:%s/ISAPI/ContentMgmt/download",
                        deviceConfig: "%s%s:%s/ISAPI/System/configurationData",
                        restart: "%s%s:%s/ISAPI/System/reboot",
                        restore: "%s%s:%s/ISAPI/System/factoryReset?mode=%s",
                        startUpgrade: {
                            upgrade: "%s%s:%s/ISAPI/System/updateFirmware",
                            status: "%s%s:%s/ISAPI/System/upgradeStatus"
                        },
                        set3DZoom: {
                            analog: "%s%s:%s/ISAPI/PTZCtrl/channels/%s/position3D",
                            digital: "%s%s:%s/ISAPI/ContentMgmt/PTZCtrlProxy/channels/%s/position3D"
                        },
                        SDKCapabilities: "%s%s:%s/SDK/capabilities",
                        deviceCapture: {
                            channels: "%s%s:%s/ISAPI/Streaming/channels/%s/picture"
                        },
                        sessionCap: "%s%s:%s/ISAPI/Security/sessionLogin/capabilities?username=%s",
                        sessionLogin: "%s%s:%s/ISAPI/Security/sessionLogin",
                        sessionHeartbeat: "%s%s:%s/ISAPI/Security/sessionHeartbeat",
                        sessionLogout: "%s%s:%s/ISAPI/Security/sessionLogout",
                        systemCapabilities: "%s%s:%s/ISAPI/System/capabilities"
                    },
                        le.prototype.login = function(e, t, n, r) {
                            var s = 2 == r.protocol ? "https://": "http://",
                                o = E(this.CGI.login, s, e, t),
                                i = new ue,
                                a = {
                                    type: "GET",
                                    url: o,
                                    auth: n,
                                    success: null,
                                    error: null
                                };
                            f.extend(a, r),
                                f.extend(a, {
                                    success: function(e) {
                                        r.success && r.success(e)
                                    },
                                    error: function(e, t) {
                                        r.error && r.error(e, t)
                                    }
                                }),
                                i.setRequestParam(a),
                                i.submitRequest()
                        },
                        le.prototype.getAudioInfo = function(e, t) {
                            var n = E(this.CGI.getAudioInfo, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                r = new ue,
                                s = {
                                    type: "GET",
                                    url: n,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(s, t),
                                f.extend(s, {
                                    success: function(e) {
                                        t.success && t.success(e)
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }),
                                r.setRequestParam(s),
                                r.submitRequest()
                        },
                        le.prototype.getDeviceInfo = function(e, t) {
                            var r = E(this.CGI.getDeviceInfo, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                s = new ue,
                                o = {
                                    type: "GET",
                                    url: r,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(o, t),
                                f.extend(o, {
                                    success: function(e) {
                                        var r = [];
                                        r.push("<DeviceInfo>"),
                                            r.push("<deviceName>" + f.escape(n.$XML(e).find("deviceName").eq(0).text()) + "</deviceName>"),
                                            r.push("<deviceID>" + n.$XML(e).find("deviceID").eq(0).text() + "</deviceID>"),
                                            r.push("<deviceType>" + n.$XML(e).find("deviceType").eq(0).text() + "</deviceType>"),
                                            r.push("<model>" + n.$XML(e).find("model").eq(0).text() + "</model>"),
                                            r.push("<serialNumber>" + n.$XML(e).find("serialNumber").eq(0).text() + "</serialNumber>"),
                                            r.push("<macAddress>" + n.$XML(e).find("macAddress").eq(0).text() + "</macAddress>"),
                                            r.push("<firmwareVersion>" + n.$XML(e).find("firmwareVersion").eq(0).text() + "</firmwareVersion>"),
                                            r.push("<firmwareReleasedDate>" + n.$XML(e).find("firmwareReleasedDate").eq(0).text() + "</firmwareReleasedDate>"),
                                            r.push("<encoderVersion>" + n.$XML(e).find("encoderVersion").eq(0).text() + "</encoderVersion>"),
                                            r.push("<encoderReleasedDate>" + n.$XML(e).find("encoderReleasedDate").eq(0).text() + "</encoderReleasedDate>"),
                                            r.push("</DeviceInfo>"),
                                            e = f.loadXML(r.join("")),
                                        t.success && t.success(e),
                                        t.mysuccess &&t.mysuccess(r.join(""))
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }),
                                s.setRequestParam(o),
                                s.submitRequest()
                        },
                        le.prototype.getAnalogChannelInfo = function(e, t) {
                            var r = E(this.CGI.getAnalogChannelInfo, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                s = new ue,
                                o = {
                                    type: "GET",
                                    url: r,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(o, t),
                                f.extend(o, {
                                    success: function(e) {
                                        var r = [];
                                        r.push("<VideoInputChannelList>");
                                        for (var s = n.$XML(e).find("VideoInputChannel", !0), o = 0, i = s.length; i > o; o++) {
                                            var a = s[o];
                                            r.push("<VideoInputChannel>"),
                                                r.push("<id>" + n.$XML(a).find("id").eq(0).text() + "</id>"),
                                                r.push("<inputPort>" + n.$XML(a).find("inputPort").eq(0).text() + "</inputPort>"),
                                                r.push("<name>" + f.escape(n.$XML(a).find("name").eq(0).text()) + "</name>"),
                                                r.push("<videoFormat>" + n.$XML(a).find("videoFormat").eq(0).text() + "</videoFormat>"),
                                                r.push("</VideoInputChannel>")
                                        }
                                        // console.log("1171", r);
                                        r.push("</VideoInputChannelList>"),
                                            e = f.loadXML(r.join("")),
                                        t.success && t.success(e),
                                        t.mysuccess &&t.mysuccess(r.join(""))
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }),
                                s.setRequestParam(o),
                                s.submitRequest()
                        },
                        le.prototype.getDigitalChannel = function(e, t) {
                            var r = E(this.CGI.getDigitalChannel, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                s = new ue,
                                o = {
                                    type: "GET",
                                    url: r,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(o, t),
                                f.extend(o, {
                                    success: function(e) {
                                        var r = [];
                                        r.push("<InputProxyChannelList>");
                                        for (var s = n.$XML(e).find("InputProxyChannel", !0), o = 0, i = s.length; i > o; o++) {
                                            var a = s[o];
                                            r.push("<InputProxyChannel>"),
                                                r.push("<id>" + n.$XML(a).find("id").eq(0).text() + "</id>"),
                                                r.push("<name>" + f.escape(n.$XML(a).find("name").eq(0).text()) + "</name>"),
                                                r.push("</InputProxyChannel>")
                                        }
                                        // console.log("1188", r);

                                        r.push("</InputProxyChannelList>"),
                                            e = f.loadXML2(r.join("")),
                                        t.success && t.success(e),
                                        t.mysuccess &&t.mysuccess(r.join(""))
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }),
                                s.setRequestParam(o),
                                s.submitRequest()
                        },
                        le.prototype.getDigitalChannelInfo = function(e, t) {
                            var r = null,
                                s = {};
                            if (this.getDigitalChannel(e, {
                                    async: !1,
                                    success: function(e) {
                                        r = e;
                                        for (var t = n.$XML(r).find("InputProxyChannel", !0), o = 0, i = t.length; i > o; o++) {
                                            var a = t[o],
                                                c = n.$XML(a).find("id").eq(0).text(),
                                                u = n.$XML(a).find("name").eq(0).text();
                                            s[c] = u
                                        }
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }), null !== r) {
                                var o = E(this.CGI.getDigitalChannelInfo, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                    i = new ue,
                                    a = {
                                        type: "GET",
                                        url: o,
                                        auth: e.szAuth,
                                        success: null,
                                        error: null
                                    };
                                f.extend(a, t),
                                    f.extend(a, {
                                        success: function(e) {
                                            var r = [];
                                            r.push("<InputProxyChannelStatusList>");
                                            for (var o = n.$XML(e).find("InputProxyChannelStatus", !0), i = 0, a = o.length; a > i; i++) {
                                                var c = o[i],
                                                    u = n.$XML(c).find("id").eq(0).text();
                                                r.push("<InputProxyChannelStatus>"),
                                                    r.push("<id>" + u + "</id>"),
                                                    r.push("<sourceInputPortDescriptor>"),
                                                    r.push("<proxyProtocol>" + n.$XML(c).find("proxyProtocol").eq(0).text() + "</proxyProtocol>"),
                                                    r.push("<addressingFormatType>" + n.$XML(c).find("addressingFormatType").eq(0).text() + "</addressingFormatType>"),
                                                    r.push("<ipAddress>" + n.$XML(c).find("ipAddress").eq(0).text() + "</ipAddress>"),
                                                    r.push("<managePortNo>" + n.$XML(c).find("managePortNo").eq(0).text() + "</managePortNo>"),
                                                    r.push("<srcInputPort>" + n.$XML(c).find("srcInputPort").eq(0).text() + "</srcInputPort>"),
                                                    r.push("<userName>" + f.escape(n.$XML(c).find("userName").eq(0).text()) + "</userName>"),
                                                    r.push("<streamType>" + n.$XML(c).find("streamType").eq(0).text() + "</streamType>"),
                                                    r.push("<online>" + n.$XML(c).find("online").eq(0).text() + "</online>"),
                                                    r.push("<name>" + f.escape(s[u]) + "</name>"),
                                                    r.push("</sourceInputPortDescriptor>"),
                                                    r.push("</InputProxyChannelStatus>")
                                            }
                                            // console.log("1217", r);
                                            r.push("</InputProxyChannelStatusList>"),
                                                e = f.loadXML2(r.join("")),
                                            t.success && t.success(e),
                                            t.mysuccess &&t.mysuccess(r.join(""))
                                            // t.success && t.success(r.join(""))
                                        },
                                        error: function(e, n) {
                                            t.error && t.error(e, n)
                                        }
                                    }),
                                    i.setRequestParam(a),
                                    i.submitRequest()
                            }
                        },
                        le.prototype.getZeroChannelInfo = function(e, t) {
                            var n = E(this.CGI.getZeroChannelInfo, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                r = new ue,
                                s = {
                                    type: "GET",
                                    url: n,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(s, t),
                                f.extend(s, {
                                    success: function(e) {
                                        t.success && t.success(e)
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }),
                                r.setRequestParam(s),
                                r.submitRequest()
                        },
                        le.prototype.getStreamChannels = function(e, t) {
                            if (0 != e.iAnalogChannelNum) var n = E(this.CGI.getStreamChannels.analog, e.szHttpProtocol, e.szIP, e.iCGIPort);
                            else var n = E(this.CGI.getStreamChannels.digital, e.szHttpProtocol, e.szIP, e.iCGIPort);
                            var r = new ue,
                                s = {
                                    type: "GET",
                                    url: n,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(s, t),
                                f.extend(s, {
                                    success: function(e) {
                                        t.success && t.success(e)
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }),
                                r.setRequestParam(s),
                                r.submitRequest()
                        },
                        le.prototype.getPPPoEStatus = function(e, t) {
                            var n = E(this.CGI.getPPPoEStatus, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                r = new ue,
                                s = {
                                    type: "GET",
                                    url: n,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(s, t),
                                f.extend(s, {
                                    success: function(e) {
                                        t.success && t.success(e)
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }),
                                r.setRequestParam(s),
                                r.submitRequest()
                        },
                        le.prototype.getUPnPPortStatus = function(e, t) {
                            var n = E(this.CGI.getUPnPPortStatus, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                r = new ue,
                                s = {
                                    type: "GET",
                                    url: n,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(s, t),
                                f.extend(s, {
                                    success: function(e) {
                                        t.success && t.success(e)
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }),
                                r.setRequestParam(s),
                                r.submitRequest()
                        },
                        le.prototype.getNetworkBond = function(e, t) {
                            var n = E(this.CGI.getNetworkBond, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                r = new ue,
                                s = {
                                    type: "GET",
                                    url: n,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(s, t),
                                f.extend(s, {
                                    success: function(e) {
                                        t.success && t.success(e)
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }),
                                r.setRequestParam(s),
                                r.submitRequest()
                        },
                        le.prototype.getNetworkInterface = function(e, t) {

                            var n = E(this.CGI.getNetworkInterface, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                r = new ue,
                                s = {
                                    type: "GET",
                                    url: n,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(s, t),
                                f.extend(s, {
                                    success: function(e) {
                                        t.success && t.success(e)
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }),
                                r.setRequestParam(s),
                                r.submitRequest()
                        },
                        le.prototype.getPortInfo = function(e, t) {
                            var n = E(this.CGI.getPortInfo, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                r = new ue,
                                s = {
                                    type: "GET",
                                    url: n,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(s, t),
                                f.extend(s, {
                                    success: function(e) {
                                        t.success && t.success(e)
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }),
                                r.setRequestParam(s),
                                r.submitRequest()
                        },
                        le.prototype.startRealPlay = function(e, t) {
                            var n = 100 * t.iChannelID + t.iStreamType,
                                r = "",
                                s = -1,
                                o = e.szIP;
                            "rtsp://" === t.urlProtocol && (o = Z(o)),
                                t.bZeroChannel ? (re() && (n = 0), r = E(t.cgi.zeroChannels, t.urlProtocol, o, t.iPort, n)) : r = E(t.cgi.channels, t.urlProtocol, o, t.iPort, n);
                            var i = function() {
                                var n = new ce;
                                n.iIndex = t.iWndIndex,
                                    n.szIP = e.szIP,
                                    n.iCGIPort = e.iCGIPort,
                                    n.szDeviceIdentify = e.szDeviceIdentify,
                                    n.iChannelID = t.iChannelID,
                                    n.iPlayStatus = x,
                                    p.push(n)
                            };
                            if (re()) {
                                var a = new Promise(function(n, s) {
                                    c.JS_Play(r, {
                                            session: e.szAuth
                                        },
                                        t.iWndIndex).then(function() {
                                            i(),
                                                n()
                                        },
                                        function() {
                                            s()
                                        })
                                });
                                return a
                            }
                            return s = c.HWP_Play(r, e.szAuth, t.iWndIndex, "", ""),
                            0 == s && i(),
                                s
                        },
                        le.prototype.startVoiceTalk = function(e, t) {
                            var n = E(this.CGI.startVoiceTalk.open, e.szHttpProtocol, e.szIP, e.iCGIPort, t),
                                r = E(this.CGI.startVoiceTalk.close, e.szHttpProtocol, e.szIP, e.iCGIPort, t),
                                s = E(this.CGI.startVoiceTalk.audioData, e.szHttpProtocol, e.szIP, e.iCGIPort, t),
                                o = c.HWP_StartVoiceTalkEx(n, r, s, e.szAuth, e.iAudioType, e.m_iAudioBitRate, e.m_iAudioSamplingRate);
                            return o
                        },
                        le.prototype.ptzAutoControl = function(e, t, n, r) {
                            var s = n.iChannelID,
                                o = "",
                                i = "";
                            if (r.iPTZSpeed = r.iPTZSpeed < 7 ? 15 * r.iPTZSpeed: 100, t && (r.iPTZSpeed = 0), e.szDeviceType != w) o = s <= e.iAnalogChannelNum ? E(this.CGI.ptzAutoControl.analog, e.szHttpProtocol, e.szIP, e.iCGIPort, n.iChannelID) : n.bShttpIPChannel ? E(this.CGI.ptzAutoControl.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, n.iChannelID - e.oStreamCapa.iIpChanBase + 1 + e.iAnalogChannelNum) : E(this.CGI.ptzAutoControl.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, n.iChannelID),
                                i = "<?xml version='1.0' encoding='UTF-8'?><autoPanData><autoPan>" + r.iPTZSpeed + "</autoPan></autoPanData>";
                            else {
                                var a = 99;
                                t && (a = 96),
                                    o = E(this.CGI.ptzAutoControl.ipdome, e.szHttpProtocol, e.szIP, e.iCGIPort, n.iChannelID, a)
                            }
                            var c = new ue,
                                u = {
                                    type: "PUT",
                                    url: o,
                                    async: !1,
                                    auth: e.szAuth,
                                    data: i,
                                    success: null,
                                    error: null
                                },
                                l = this;
                            f.extend(u, r),
                                f.extend(u, {
                                    success: function(e) {
                                        n.bPTZAuto = !n.bPTZAuto,
                                        r.success && r.success(e)
                                    },
                                    error: function(t, s) {
                                        if (X == e.szDeviceType || H == e.szDeviceType) {
                                            o = n.bShttpIPChannel ? E(l.CGI.ptzControl.analog, e.szHttpProtocol, e.szIP, e.iCGIPort, n.iChannelID - e.oStreamCapa.iIpChanBase + 1 + e.iAnalogChannelNum) : E(l.CGI.ptzControl.analog, e.szHttpProtocol, e.szIP, e.iCGIPort, n.iChannelID),
                                                i = "<?xml version='1.0' encoding='UTF-8'?><PTZData><pan>" + r.iPTZSpeed + "</pan><tilt>0</tilt></PTZData>";
                                            var a = new ue,
                                                c = {
                                                    type: "PUT",
                                                    url: o,
                                                    async: !1,
                                                    auth: e.szAuth,
                                                    data: i,
                                                    success: null,
                                                    error: null
                                                };
                                            f.extend(c, r),
                                                a.setRequestParam(c),
                                                a.submitRequest()
                                        } else r.error && r.error(t, s)
                                    }
                                }),
                                c.setRequestParam(u),
                                c.submitRequest()
                        },
                        le.prototype.ptzControl = function(e, t, n, r) {
                            var s = n.iChannelID,
                                o = "";
                            n.bPTZAuto && this.ptzAutoControl(e, !0, n, {
                                iPTZSpeed: 0
                            }),
                                t ? r.iPTZSpeed = 0 : r.iPTZSpeed = r.iPTZSpeed < 7 ? 15 * r.iPTZSpeed: 100;
                            var i = [{},
                                    {
                                        pan: 0,
                                        tilt: r.iPTZSpeed
                                    },
                                    {
                                        pan: 0,
                                        tilt: -r.iPTZSpeed
                                    },
                                    {
                                        pan: -r.iPTZSpeed,
                                        tilt: 0
                                    },
                                    {
                                        pan: r.iPTZSpeed,
                                        tilt: 0
                                    },
                                    {
                                        pan: -r.iPTZSpeed,
                                        tilt: r.iPTZSpeed
                                    },
                                    {
                                        pan: -r.iPTZSpeed,
                                        tilt: -r.iPTZSpeed
                                    },
                                    {
                                        pan: r.iPTZSpeed,
                                        tilt: r.iPTZSpeed
                                    },
                                    {
                                        pan: r.iPTZSpeed,
                                        tilt: -r.iPTZSpeed
                                    },
                                    {},
                                    {
                                        speed: r.iPTZSpeed
                                    },
                                    {
                                        speed: -r.iPTZSpeed
                                    },
                                    {
                                        speed: r.iPTZSpeed
                                    },
                                    {
                                        speed: -r.iPTZSpeed
                                    },
                                    {
                                        speed: r.iPTZSpeed
                                    },
                                    {
                                        speed: -r.iPTZSpeed
                                    }],
                                a = "",
                                c = {};
                            switch (r.iPTZIndex) {
                                case 1:
                                case 2:
                                case 3:
                                case 4:
                                case 5:
                                case 6:
                                case 7:
                                case 8:
                                    c = this.CGI.ptzControl,
                                        a = "<?xml version='1.0' encoding='UTF-8'?><PTZData><pan>" + i[r.iPTZIndex].pan + "</pan><tilt>" + i[r.iPTZIndex].tilt + "</tilt></PTZData>";
                                    break;
                                case 10:
                                case 11:
                                    c = this.CGI.ptzControl,
                                        a = "<?xml version='1.0' encoding='UTF-8'?><PTZData><zoom>" + i[r.iPTZIndex].speed + "</zoom></PTZData>";
                                    break;
                                case 12:
                                case 13:
                                    c = this.CGI.ptzFocus,
                                        a = "<?xml version='1.0' encoding='UTF-8'?><FocusData><focus>" + i[r.iPTZIndex].speed + "</focus></FocusData>";
                                    break;
                                case 14:
                                case 15:
                                    c = this.CGI.ptzIris,
                                        a = "<?xml version='1.0' encoding='UTF-8'?><IrisData><iris>" + i[r.iPTZIndex].speed + "</iris></IrisData>";
                                    break;
                                default:
                                    return void(r.error && r.error())
                            }
                            o = c != this.CGI.ptzFocus && c != this.CGI.ptzIris || e.szDeviceType != X && e.szDeviceType != w && e.szDeviceType != H ? s <= e.iAnalogChannelNum ? E(c.analog, e.szHttpProtocol, e.szIP, e.iCGIPort, n.iChannelID) : n.bShttpIPChannel ? E(c.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, n.iChannelID - e.oStreamCapa.iIpChanBase + 1 + e.iAnalogChannelNum) : E(c.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, n.iChannelID) : E(c.ipc, e.szHttpProtocol, e.szIP, e.iCGIPort, n.iChannelID);
                            var u = new ue,
                                l = {
                                    type: "PUT",
                                    url: o,
                                    async: !1,
                                    auth: e.szAuth,
                                    data: a,
                                    success: null,
                                    error: null
                                };
                            f.extend(l, r),
                                f.extend(l, {
                                    success: function(e) {
                                        r.success && r.success(e)
                                    },
                                    error: function(e, t) {
                                        r.error && r.error(e, t)
                                    }
                                }),
                                u.setRequestParam(l),
                                u.submitRequest()
                        },
                        le.prototype.setPreset = function(e, t, n) {
                            var r = t.iChannelID,
                                s = "",
                                o = "";
                            s = r <= e.iAnalogChannelNum ? E(this.CGI.setPreset.analog, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID, n.iPresetID) : t.bShttpIPChannel ? E(this.CGI.setPreset.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID - e.oStreamCapa.iIpChanBase + 1 + e.iAnalogChannelNum, n.iPresetID) : E(this.CGI.setPreset.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID, n.iPresetID),
                                o = "<?xml version='1.0' encoding='UTF-8'?>",
                                o += "<PTZPreset>",
                                o += "<id>" + n.iPresetID + "</id>",
                            e.szDeviceType != w && (o += "<presetName>Preset" + n.iPresetID + "</presetName>"),
                                o += "</PTZPreset>";
                            var i = new ue,
                                a = {
                                    type: "PUT",
                                    url: s,
                                    auth: e.szAuth,
                                    data: o,
                                    success: null,
                                    error: null
                                };
                            f.extend(a, n),
                                f.extend(a, {
                                    success: function(e) {
                                        n.success && n.success(e)
                                    },
                                    error: function(e, t) {
                                        n.error && n.error(e, t)
                                    }
                                }),
                                i.setRequestParam(a),
                                i.submitRequest()
                        },
                        le.prototype.goPreset = function(e, t, n) {
                            var r = t.iChannelID,
                                s = "";
                            s = r <= e.iAnalogChannelNum ? E(this.CGI.goPreset.analog, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID, n.iPresetID) : t.bShttpIPChannel ? E(this.CGI.goPreset.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID - e.oStreamCapa.iIpChanBase + 1 + e.iAnalogChannelNum, n.iPresetID) : E(this.CGI.goPreset.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID, n.iPresetID);
                            var o = new ue,
                                i = {
                                    type: "PUT",
                                    url: s,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(i, n),
                                f.extend(i, {
                                    success: function(e) {
                                        n.success && n.success(e)
                                    },
                                    error: function(e, t) {
                                        n.error && n.error(e, t)
                                    }
                                }),
                                o.setRequestParam(i),
                                o.submitRequest()
                        },
                        le.prototype.recordSearch = function(e, r) {
                            var s = "",
                                o = "",
                                i = r.iChannelID,
                                a = r.iStreamType,
                                c = r.szStartTime.replace(" ", "T") + "Z",
                                u = r.szEndTime.replace(" ", "T") + "Z";
                            s = E(this.CGI.recordSearch, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                o = "<?xml version='1.0' encoding='UTF-8'?><CMSearchDescription><searchID>" + new t + "</searchID><trackList><trackID>" + (100 * i + a) + "</trackID></trackList><timeSpanList><timeSpan><startTime>" + c + "</startTime><endTime>" + u + "</endTime></timeSpan></timeSpanList><maxResults>40</maxResults><searchResultPostion>" + r.iSearchPos + "</searchResultPostion><metadataList><metadataDescriptor>//metadata.ISAPI.org/VideoMotion</metadataDescriptor></metadataList></CMSearchDescription>";
                            var l = new ue,
                                d = {
                                    type: "POST",
                                    url: s,
                                    auth: e.szAuth,
                                    data: o,
                                    success: null,
                                    error: null
                                };
                            f.extend(d, r),
                                f.extend(d, {
                                    success: function(e) {
                                        var t = [];
                                        t.push("<CMSearchResult>"),
                                            t.push("<responseStatus>" + n.$XML(e).find("responseStatus").eq(0).text() + "</responseStatus>"),
                                            t.push("<responseStatusStrg>" + n.$XML(e).find("responseStatusStrg").eq(0).text() + "</responseStatusStrg>"),
                                            t.push("<numOfMatches>" + n.$XML(e).find("numOfMatches").eq(0).text() + "</numOfMatches>"),
                                            t.push("<matchList>");
                                        for (var s = n.$XML(e).find("searchMatchItem", !0), o = 0, i = s.length; i > o; o++) {
                                            var a = s[o];
                                            t.push("<searchMatchItem>"),
                                                t.push("<trackID>" + n.$XML(a).find("trackID").eq(0).text() + "</trackID>"),
                                                t.push("<startTime>" + n.$XML(a).find("startTime").eq(0).text() + "</startTime>"),
                                                t.push("<endTime>" + n.$XML(a).find("endTime").eq(0).text() + "</endTime>"),
                                                t.push("<playbackURI>" + f.escape(n.$XML(a).find("playbackURI").eq(0).text()) + "</playbackURI>"),
                                                t.push("<metadataDescriptor>" + n.$XML(a).find("metadataDescriptor").eq(0).text().split("/")[1] + "</metadataDescriptor>"),
                                                t.push("</searchMatchItem>")
                                        }
                                        t.push("</matchList>"),
                                            t.push("</CMSearchResult>"),
                                            e = f.loadXML(t.join("")),
                                        r.success && r.success(e)
                                    },
                                    error: function(e, t) {
                                        r.error && r.error(e, t)
                                    }
                                }),
                                l.setRequestParam(d),
                                l.submitRequest()
                        },
                        le.prototype.startPlayback = function(e, t) {
                            var n = t.iWndIndex,
                                r = "",
                                s = t.szStartTime,
                                o = t.szEndTime,
                                i = e.szIP;
                            if ("rtsp://" === t.urlProtocol && (i = Z(i)), r = re() ? E(t.cgi, t.urlProtocol, i, t.iPort, t.iChannelID) : E(t.cgi, t.urlProtocol, i, t.iPort, t.iChannelID, s, o), !B(t.oTransCodeParam)) {
                                var a = ne(t.oTransCodeParam);
                                if ("" == a) return - 1;
                                c.HWP_SetTrsPlayBackParam(n, a)
                            }
                            var u = function() {
                                var r = new ce;
                                r.iIndex = n,
                                    r.szIP = e.szIP,
                                    r.iCGIPort = e.iCGIPort,
                                    r.szDeviceIdentify = e.szDeviceIdentify,
                                    r.iChannelID = t.iChannelID,
                                    r.iPlayStatus = D,
                                    p.push(r)
                            };
                            if (re()) {
                                var l = new Promise(function(t, i) {
                                    c.JS_Play(r, {
                                            session: e.szAuth
                                        },
                                        n, s, o).then(function() {
                                            u(),
                                                t()
                                        },
                                        function() {
                                            i()
                                        })
                                });
                                return l
                            }
                            var d = c.HWP_Play(r, e.szAuth, n, s, o);
                            return 0 == d && u(),
                                d
                        },
                        le.prototype.reversePlayback = function(e, t) {
                            var n = t.iWndIndex,
                                r = t.szStartTime,
                                s = t.szEndTime,
                                o = e.szIP;
                            "rtsp://" === t.urlProtocol && (o = Z(o));
                            var i = E(t.cgi, t.urlProtocol, o, t.iPort, t.iChannelID, r, s),
                                a = c.HWP_ReversePlay(i, e.szAuth, n, r, s);
                            if (0 == a) {
                                var u = new ce;
                                u.iIndex = n,
                                    u.szIP = e.szIP,
                                    u.iCGIPort = e.iCGIPort,
                                    u.szDeviceIdentify = e.szDeviceIdentify,
                                    u.iChannelID = t.iChannelID,
                                    u.iPlayStatus = b,
                                    p.push(u)
                            }
                            return a
                        },
                        le.prototype.startDownloadRecord = function(e, t) {
                            var n = -1,
                                r = E(this.CGI.startDownloadRecord, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                s = "<?xml version='1.0' encoding='UTF-8'?><downloadRequest><playbackURI> " + f.escape(t.szPlaybackURI) + "</playbackURI></downloadRequest>";
                            return re() ? (r = se(r), n = c.JS_StartDownload(r, e.szAuth, t.szFileName, s)) : n = c.HWP_StartDownload(r, e.szAuth, t.szFileName, s, t.bDateDir),
                                n
                        },
                        le.prototype.exportDeviceConfig = function(e) {
                            var t = E(this.CGI.deviceConfig, e.szHttpProtocol, e.szIP, e.iCGIPort);
                            return c.HWP_ExportDeviceConfig(t, e.szAuth, "", 0)
                        },
                        le.prototype.importDeviceConfig = function(e, t) {
                            var n = E(this.CGI.deviceConfig, e.szHttpProtocol, e.szIP, e.iCGIPort);
                            return c.HWP_ImportDeviceConfig(n, e.szAuth, t.szFileName, 0)
                        },
                        le.prototype.restart = function(e, t) {
                            var n = E(this.CGI.restart, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                r = new ue,
                                s = {
                                    type: "PUT",
                                    url: n,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(s, t),
                                f.extend(s, {
                                    success: function(e) {
                                        t.success && t.success(e)
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }),
                                r.setRequestParam(s),
                                r.submitRequest()
                        },
                        le.prototype.restore = function(e, t, n) {
                            var r = E(this.CGI.restore, e.szHttpProtocol, e.szIP, e.iCGIPort, t),
                                s = new ue,
                                o = {
                                    type: "PUT",
                                    url: r,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(o, n),
                                f.extend(o, {
                                    success: function(e) {
                                        n.success && n.success(e)
                                    },
                                    error: function(e, t) {
                                        n.error && n.error(e, t)
                                    }
                                }),
                                s.setRequestParam(o),
                                s.submitRequest()
                        },
                        le.prototype.startUpgrade = function(e, t) {
                            var n = E(this.CGI.startUpgrade.upgrade, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                r = E(this.CGI.startUpgrade.status, e.szHttpProtocol, e.szIP, e.iCGIPort);
                            return c.HWP_StartUpgrade(n, r, e.szAuth, t.szFileName)
                        },
                        le.prototype.set3DZoom = function(e, t, r, s) {
                            var o = t.iChannelID,
                                i = "";
                            i = o <= e.iAnalogChannelNum ? E(this.CGI.set3DZoom.analog, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID) : t.bShttpIPChannel ? E(this.CGI.set3DZoom.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID - e.oStreamCapa.iIpChanBase + 1 + e.iAnalogChannelNum) : E(this.CGI.set3DZoom.digital, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID);
                            var a = f.loadXML(r),
                                c = parseInt(n.$XML(a).find("StartPoint").eq(0).find("positionX").eq(0).text(), 10),
                                u = parseInt(n.$XML(a).find("StartPoint").eq(0).find("positionY").eq(0).text(), 10),
                                l = parseInt(n.$XML(a).find("EndPoint").eq(0).find("positionX").eq(0).text(), 10),
                                d = parseInt(n.$XML(a).find("EndPoint").eq(0).find("positionY").eq(0).text(), 10),
                                p = "<?xml version='1.0' encoding='UTF-8'?><Position3D><StartPoint><positionX>" + c + "</positionX><positionY>" + (255 - u) + "</positionY></StartPoint><EndPoint><positionX>" + l + "</positionX><positionY>" + (255 - d) + "</positionY></EndPoint></Position3D>",
                                P = new ue,
                                h = {
                                    type: "PUT",
                                    url: i,
                                    data: p,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(h, s),
                                f.extend(h, {
                                    success: function(e) {
                                        s.success && s.success(e)
                                    },
                                    error: function(e, t) {
                                        s.error && s.error(e, t)
                                    }
                                }),
                                P.setRequestParam(h),
                                P.submitRequest()
                        },
                        le.prototype.getSDKCapa = function(e, t) {

                            var n = E(this.CGI.SDKCapabilities, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                r = new ue,
                                s = {
                                    type: "GET",
                                    url: n,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(s, t),
                                f.extend(s, {
                                    success: function(e) {
                                        t.success && t.success(e)
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }),
                                r.setRequestParam(s),
                                r.submitRequest()
                        },
                        le.prototype.deviceCapturePic = function(e, t, n, r) {
                            var t = 100 * t + 1,
                                s = -1,
                                o = E(this.CGI.deviceCapture.channels, e.szHttpProtocol, e.szIP, e.iCGIPort, t),
                                i = [];
                            if (f.isInt(r.iResolutionWidth) && i.push("videoResolutionWidth=" + r.iResolutionWidth), f.isInt(r.iResolutionHeight) && i.push("videoResolutionHeight=" + r.iResolutionHeight), i.length > 0 && (o += "?" + i.join("&")), re()) {
                                var a = function(e, t) {
                                    var n = ".jpg";
                                    return $("body").append('<a id="jsplugin_download_a" href="' + e + '" download=' + t + n + '><li id="jsplugin_download_li"></li></a>'),
                                        $("#jsplugin_download_li").trigger("click"),
                                        $("#jsplugin_download_a").remove(),
                                        0
                                };
                                o = se(o),
                                    s = a(o, n)
                            } else s = c.HWP_DeviceCapturePic(o, e.szAuth, n, r.bDateDir);
                            return s
                        },
                        le.prototype.getSessionCap = function(e, t, n, r, s) {
                            var o = "";
                            o = 2 == t ? "https://": "http://";
                            var i = E(this.CGI.sessionCap, o, e, n, encodeURIComponent(r)),
                                a = new ue,
                                c = {
                                    type: "GET",
                                    url: i,
                                    auth: "",
                                    success: null,
                                    error: null
                                };
                            f.extend(c, s),
                                f.extend(c, {
                                    success: function(e) {
                                        s.success && s.success(e)
                                    },
                                    error: function(e, t) {
                                        s.error && s.error(e, t)
                                    }
                                }),
                                a.setRequestParam(c),
                                a.submitRequest()
                        },
                        le.prototype.sessionLogin = function(e, t, r, s, o, i, a) {
                            var c = "";
                            c = 2 == t ? "https://": "http://";
                            var u = E(this.CGI.sessionLogin, c, e, r),
                                l = n.$XML(i).find("sessionID").eq(0).text(),
                                d = n.$XML(i).find("challenge").eq(0).text(),
                                p = parseInt(n.$XML(i).find("iterations").eq(0).text(), 10),
                                P = !1,
                                h = "";
                            n.$XML(i).find("isIrreversible", !0).length > 0 && (P = "true" === n.$XML(i).find("isIrreversible").eq(0).text(), h = n.$XML(i).find("salt").eq(0).text());
                            var I = "";
                            if (P) {
                                I = f.sha256(s + h + o),
                                    I = f.sha256(I + d);
                                for (var m = 2; p > m; m++) I = f.sha256(I)
                            } else {
                                I = f.sha256(o) + d;
                                for (var m = 1; p > m; m++) I = f.sha256(I)
                            }
                            var C = "<SessionLogin>";
                            C += "<userName>" + f.escape(s) + "</userName>",
                                C += "<password>" + I + "</password>",
                                C += "<sessionID>" + l + "</sessionID>",
                                C += "</SessionLogin>";
                            var S = new ue,
                                v = {
                                    type: "POST",
                                    url: u,
                                    data: C,
                                    auth: "",
                                    success: null,
                                    error: null
                                };
                            f.extend(v, a),
                                f.extend(v, {
                                    success: function(e) {
                                        a.success && a.success(e)
                                    },
                                    error: function(e, t) {
                                        a.error && a.error(e, t)
                                    }
                                }),
                                S.setRequestParam(v),
                                S.submitRequest()
                        },
                        le.prototype.sessionHeartbeat = function(e, t) {
                            var n = E(this.CGI.sessionHeartbeat, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                r = new ue,
                                s = {
                                    type: "PUT",
                                    url: n,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(s, t),
                                f.extend(s, {
                                    success: function(e) {
                                        t.success && t.success(e)
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }),
                                r.setRequestParam(s),
                                r.submitRequest()
                        },
                        le.prototype.sessionLogout = function(e, t) {
                            var n = E(this.CGI.sessionLogout, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                r = new ue,
                                s = {
                                    type: "PUT",
                                    url: n,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(s, t),
                                f.extend(s, {
                                    success: function(e) {
                                        t.success && t.success(e)
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }),
                                r.setRequestParam(s),
                                r.submitRequest()
                        },
                        le.prototype.getSystemCapa = function(e, t) {
                            var n = E(this.CGI.systemCapabilities, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                r = new ue,
                                s = {
                                    type: "GET",
                                    url: n,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(s, t),
                                f.extend(s, {
                                    success: function(e) {
                                        t.success && t.success(e)
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }),
                                r.setRequestParam(s),
                                r.submitRequest()
                        };
                    var de = function() {};
                    de.prototype.CGI = {
                        login: "%s%s:%s/PSIA/Custom/SelfExt/userCheck",
                        getAudioInfo: "%s%s:%s/PSIA/Custom/SelfExt/TwoWayAudio/channels",
                        getDeviceInfo: "%s%s:%s/PSIA/System/deviceInfo",
                        getAnalogChannelInfo: "%s%s:%s/PSIA/System/Video/inputs/channels",
                        getDigitalChannel: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/DynVideo/inputs/channels",
                        getDigitalChannelInfo: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/DynVideo/inputs/channels/status",
                        getZeroChannelInfo: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/ZeroVideo/channels",
                        getStreamChannels: {
                            analog: "%s%s:%s/PSIA/Streaming/channels",
                            digital: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/DynStreaming/channels"
                        },
                        getStreamDynChannels: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/DynStreaming/channels",
                        startRealPlay: {
                            channels: "%s%s:%s/PSIA/streaming/channels/%s",
                            zeroChannels: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/ZeroStreaming/channels/%s"
                        },
                        startVoiceTalk: {
                            open: "%s%s:%s/PSIA/Custom/SelfExt/TwoWayAudio/channels/%s/open",
                            close: "%s%s:%s/PSIA/Custom/SelfExt/TwoWayAudio/channels/%s/close",
                            audioData: "%s%s:%s/PSIA/Custom/SelfExt/TwoWayAudio/channels/%s/audioData"
                        },
                        ptzControl: "%s%s:%s/PSIA/PTZ/channels/%s/continuous",
                        ptzAutoControl: "%s%s:%s/PSIA/Custom/SelfExt/PTZ/channels/%s/autoptz",
                        setPreset: "%s%s:%s/PSIA/PTZ/channels/%s/presets/%s",
                        goPreset: "%s%s:%s/PSIA/PTZ/channels/%s/presets/%s/goto",
                        ptzFocus: "%s%s:%s/PSIA/System/Video/inputs/channels/%s/focus",
                        ptzIris: "%s%s:%s/PSIA/System/Video/inputs/channels/%s/iris",
                        getNetworkBond: "%s%s:%s/PSIA/Custom/SelfExt/Bond",
                        getNetworkInterface: "%s%s:%s/PSIA/System/Network/interfaces",
                        getUPnPPortStatus: "%s%s:%s/PSIA/Custom/SelfExt/UPnP/ports/status",
                        getPPPoEStatus: "%s%s:%s/PSIA/Custom/SelfExt/PPPoE/1/status",
                        getPortInfo: "%s%s:%s/PSIA/Security/AAA/adminAccesses",
                        recordSearch: "%s%s:%s/PSIA/ContentMgmt/search",
                        startPlayback: "%s%s:%s/PSIA/streaming/tracks/%s?starttime=%s&endtime=%s",
                        startDownloadRecord: "%s%s:%s/PSIA/Custom/SelfExt/ContentMgmt/download",
                        deviceConfig: "%s%s:%s/PSIA/System/configurationData",
                        restart: "%s%s:%s/PSIA/System/reboot",
                        restore: "%s%s:%s/PSIA/System/factoryReset?mode=%s",
                        startUpgrade: {
                            upgrade: "%s%s:%s/PSIA/System/updateFirmware",
                            status: "%s%s:%s/PSIA/Custom/SelfExt/upgradeStatus"
                        },
                        set3DZoom: "%s%s:%s/PSIA/Custom/SelfExt/PTZ/channels/%s/Set3DZoom",
                        deviceCapture: {
                            channels: "%s%s:%s/PSIA/Streaming/channels/%s/picture"
                        },
                        systemCapabilities: "%s%s:%s/PSIA/System/capabilities"
                    },
                        de.prototype.login = function(e, t, r, s) {
                            var o = 2 == s.protocol ? "https://": "http://",
                                i = E(this.CGI.login, o, e, t),
                                a = new ue,
                                c = {
                                    type: "GET",
                                    url: i,
                                    auth: r,
                                    success: null,
                                    error: null
                                };
                            f.extend(c, s),
                                f.extend(c, {
                                    success: function(e) {
                                        "200" == n.$XML(e).find("statusValue").eq(0).text() ? s.success && s.success(e) : s.error && s.error(401, e)
                                    },
                                    error: function(e, t) {
                                        s.error && s.error(e, t)
                                    }
                                }),
                                a.setRequestParam(c),
                                a.submitRequest()
                        },
                        de.prototype.getAudioInfo = function(e, t) {
                            var n = E(this.CGI.getAudioInfo, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                r = new ue,
                                s = {
                                    type: "GET",
                                    url: n,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(s, t),
                                f.extend(s, {
                                    success: function(e) {
                                        t.success && t.success(e)
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }),
                                r.setRequestParam(s),
                                r.submitRequest()
                        },
                        de.prototype.getDeviceInfo = function(e, t) {
                            var r = E(this.CGI.getDeviceInfo, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                s = new ue,
                                o = {
                                    type: "GET",
                                    url: r,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(o, t),
                                f.extend(o, {
                                    success: function(e) {
                                        var r = [];
                                        r.push("<DeviceInfo>"),
                                            r.push("<deviceName>" + f.escape(n.$XML(e).find("deviceName").eq(0).text()) + "</deviceName>"),
                                            r.push("<deviceID>" + n.$XML(e).find("deviceID").eq(0).text() + "</deviceID>"),
                                            r.push("<deviceType>" + n.$XML(e).find("deviceDescription").eq(0).text() + "</deviceType>"),
                                            r.push("<model>" + n.$XML(e).find("model").eq(0).text() + "</model>"),
                                            r.push("<serialNumber>" + n.$XML(e).find("serialNumber").eq(0).text() + "</serialNumber>"),
                                            r.push("<macAddress>" + n.$XML(e).find("macAddress").eq(0).text() + "</macAddress>"),
                                            r.push("<firmwareVersion>" + n.$XML(e).find("firmwareVersion").eq(0).text() + "</firmwareVersion>"),
                                            r.push("<firmwareReleasedDate>" + n.$XML(e).find("firmwareReleasedDate").eq(0).text() + "</firmwareReleasedDate>"),
                                            r.push("<encoderVersion>" + n.$XML(e).find("logicVersion").eq(0).text() + "</encoderVersion>"),
                                            r.push("<encoderReleasedDate>" + n.$XML(e).find("logicReleasedDate").eq(0).text() + "</encoderReleasedDate>"),
                                            r.push("</DeviceInfo>"),
                                            e = f.loadXML(r.join("")),
                                        t.success && t.success(e),
                                        t.mysuccess &&t.mysuccess(r.join(""))
                                        // console.log("2922",r.join(""))
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }),
                                s.setRequestParam(o),
                                s.submitRequest()
                        },
                        de.prototype.getSystemCapa = function(e, t) {
                            var n = E(this.CGI.systemCapabilities, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                r = new ue,
                                s = {
                                    type: "GET",
                                    url: n,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(s, t),
                                f.extend(s, {
                                    success: function(e) {
                                        t.success && t.success(e)
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }),
                                r.setRequestParam(s),
                                r.submitRequest()
                        },
                        de.prototype.getAnalogChannelInfo = function(e, t) {
                            var r = E(this.CGI.getAnalogChannelInfo, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                s = new ue,
                                o = {
                                    type: "GET",
                                    url: r,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(o, t),
                                f.extend(o, {
                                    success: function(e) {
                                        var r = [];
                                        r.push("<VideoInputChannelList>");
                                        for (var s = n.$XML(e).find("VideoInputChannel", !0), o = 0, i = s.length; i > o; o++) {
                                            var a = s[o];
                                            r.push("<VideoInputChannel>"),
                                                r.push("<id>" + n.$XML(a).find("id").eq(0).text() + "</id>"),
                                                r.push("<inputPort>" + n.$XML(a).find("inputPort").eq(0).text() + "</inputPort>"),
                                                r.push("<name>" + f.escape(n.$XML(a).find("name").eq(0).text()) + "</name>"),
                                                r.push("<videoFormat>" + n.$XML(a).find("videoFormat").eq(0).text() + "</videoFormat>"),
                                                r.push("</VideoInputChannel>")
                                        }

                                        r.push("</VideoInputChannelList>"),
                                            e = f.loadXML(r.join("")),
                                        t.success && t.success(e)
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }),
                                s.setRequestParam(o),
                                s.submitRequest()
                        },
                        de.prototype.getDigitalChannel = function(e, t) {
                            var r = E(this.CGI.getDigitalChannel, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                s = new ue,
                                o = {
                                    type: "GET",
                                    url: r,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(o, t),
                                f.extend(o, {
                                    success: function(e) {
                                        var r = [];
                                        r.push("<InputProxyChannelList>");
                                        for (var s = n.$XML(e).find("DynVideoInputChannel", !0), o = 0, i = s.length; i > o; o++) {
                                            var a = s[o];
                                            r.push("<InputProxyChannel>"),
                                                r.push("<id>" + n.$XML(a).find("id").eq(0).text() + "</id>"),
                                                r.push("<name>" + f.escape(n.$XML(a).find("name").eq(0).text()) + "</name>"),
                                                r.push("</InputProxyChannel>")
                                        }

                                        r.push("</InputProxyChannelList>"),
                                            e = f.loadXML(r.join("")),
                                        t.success && t.success(e),
                                        t.mysuccess &&t.mysuccess(r.join(""))
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }),
                                s.setRequestParam(o),
                                s.submitRequest()
                        },
                        de.prototype.getDigitalChannelInfo = function(e, t) {
                            var r = null,
                                s = {};
                            if (this.getDigitalChannel(e, {
                                    async: !1,
                                    success: function(e) {
                                        r = e;
                                        for (var t = n.$XML(r).find("InputProxyChannel", !0), o = 0, i = t.length; i > o; o++) {
                                            var a = t[o],
                                                c = n.$XML(a).find("id").eq(0).text(),
                                                u = n.$XML(a).find("name").eq(0).text();
                                            s[c] = u
                                        }
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }), null !== r) {
                                var o = E(this.CGI.getDigitalChannelInfo, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                    i = new ue,
                                    a = {
                                        type: "GET",
                                        url: o,
                                        auth: e.szAuth,
                                        success: null,
                                        error: null
                                    };
                                f.extend(a, t),
                                    f.extend(a, {
                                        success: function(e) {
                                            var r = [];
                                            r.push("<InputProxyChannelStatusList>");
                                            for (var o = n.$XML(e).find("DynVideoInputChannelStatus", !0), i = 0, a = o.length; a > i; i++) {
                                                var c = o[i],
                                                    u = n.$XML(c).find("id").eq(0).text();
                                                r.push("<InputProxyChannelStatus>"),
                                                    r.push("<id>" + u + "</id>"),
                                                    r.push("<sourceInputPortDescriptor>"),
                                                    r.push("<proxyProtocol>" + n.$XML(c).find("adminProtocol").eq(0).text() + "</proxyProtocol>"),
                                                    r.push("<addressingFormatType>" + n.$XML(c).find("addressingFormatType").eq(0).text() + "</addressingFormatType>"),
                                                    r.push("<ipAddress>" + n.$XML(c).find("ipAddress").eq(0).text() + "</ipAddress>"),
                                                    r.push("<managePortNo>" + n.$XML(c).find("adminPortNo").eq(0).text() + "</managePortNo>"),
                                                    r.push("<srcInputPort>" + n.$XML(c).find("srcInputPort").eq(0).text() + "</srcInputPort>"),
                                                    r.push("<userName>" + f.escape(n.$XML(c).find("userName").eq(0).text()) + "</userName>"),
                                                    r.push("<streamType>" + n.$XML(c).find("streamType").eq(0).text() + "</streamType>"),
                                                    r.push("<online>" + n.$XML(c).find("online").eq(0).text() + "</online>"),
                                                    r.push("<name>" + f.escape(s[u]) + "</name>"),
                                                    r.push("</sourceInputPortDescriptor>"),
                                                    r.push("</InputProxyChannelStatus>")
                                            }
                                            // console.log("1746");
                                            r.push("</InputProxyChannelStatusList>"),
                                                e = f.loadXML(r.join("")),
                                            t.success && t.success(e),
                                            t.mysuccess &&t.mysuccess(r.join(""))
                                        },
                                        error: function(e, n) {
                                            t.error && t.error(e, n)
                                        }
                                    }),
                                    i.setRequestParam(a),
                                    i.submitRequest()
                            }
                        },
                        de.prototype.getZeroChannelInfo = function(e, t) {
                            var n = E(this.CGI.getZeroChannelInfo, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                r = new ue,
                                s = {
                                    type: "GET",
                                    url: n,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(s, t),
                                f.extend(s, {
                                    success: function(e) {
                                        t.success && t.success(e)
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }),
                                r.setRequestParam(s),
                                r.submitRequest()
                        },
                        de.prototype.getPPPoEStatus = function(e, t) {
                            var n = E(this.CGI.getPPPoEStatus, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                r = new ue,
                                s = {
                                    type: "GET",
                                    url: n,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(s, t),
                                f.extend(s, {
                                    success: function(e) {
                                        t.success && t.success(e)
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }),
                                r.setRequestParam(s),
                                r.submitRequest()
                        },
                        de.prototype.getUPnPPortStatus = function(e, t) {
                            var n = E(this.CGI.getUPnPPortStatus, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                r = new ue,
                                s = {
                                    type: "GET",
                                    url: n,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(s, t),
                                f.extend(s, {
                                    success: function(e) {
                                        t.success && t.success(e)
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }),
                                r.setRequestParam(s),
                                r.submitRequest()
                        },
                        de.prototype.getNetworkBond = function(e, t) {
                            var n = E(this.CGI.getNetworkBond, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                r = new ue,
                                s = {
                                    type: "GET",
                                    url: n,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(s, t),
                                f.extend(s, {
                                    success: function(e) {
                                        t.success && t.success(e)
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }),
                                r.setRequestParam(s),
                                r.submitRequest()
                        },
                        de.prototype.getNetworkInterface = function(e, t) {
                            var n = E(this.CGI.getNetworkInterface, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                r = new ue,
                                s = {
                                    type: "GET",
                                    url: n,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(s, t),
                                f.extend(s, {
                                    success: function(e) {
                                        t.success && t.success(e)
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }),
                                r.setRequestParam(s),
                                r.submitRequest()
                        },
                        de.prototype.getPortInfo = function(e, t) {
                            var r = E(this.CGI.getPortInfo, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                s = new ue,
                                o = {
                                    type: "GET",
                                    url: r,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(o, t),
                                f.extend(o, {
                                    success: function(r) {
                                        var s = [];
                                        s.push("<AdminAccessProtocolList>");
                                        for (var o = n.$XML(r).find("AdminAccessProtocol", !0), i = 0, a = o.length; a > i; i++) {
                                            o[i];
                                            s.push("<AdminAccessProtocol>"),
                                                s.push("<id>" + n.$XML(r).find("id").eq(0).text() + "</id>"),
                                                s.push("<enabled>" + n.$XML(r).find("enabled").eq(0).text() + "</enabled>"),
                                                s.push("<protocol>" + n.$XML(r).find("protocol").eq(0).text().toUpperCase() + "</protocol>"),
                                                s.push("<portNo>" + n.$XML(r).find("portNo").eq(0).text() + "</portNo>"),
                                                s.push("</AdminAccessProtocol>")
                                        }
                                        I.getStreamChannels(e, {
                                            async: !1,
                                            success: function(r) {
                                                if (n.$XML(r).find("rtspPortNo", !0).length > 0) {
                                                    var o = parseInt(n.$XML(r).find("rtspPortNo").eq(0).text(), 10);
                                                    s.push("<AdminAccessProtocol>"),
                                                        s.push("<id>4</id>"),
                                                        s.push("<enabled>true</enabled>"),
                                                        s.push("<protocol>RTSP</protocol>"),
                                                        s.push("<portNo>" + o + "</portNo>"),
                                                        s.push("</AdminAccessProtocol>"),
                                                        s.push("</AdminAccessProtocolList>");
                                                    // console.log("1819");
                                                    var i = f.loadXML(s.join(""));
                                                    t.success && t.success(i)
                                                } else I.getStreamDynChannels(e, {
                                                    async: !1,
                                                    success: function(e) {
                                                        if (n.$XML(e).find("rtspPortNo", !0).length > 0) {
                                                            var r = parseInt(n.$XML(e).find("rtspPortNo").eq(0).text(), 10);
                                                            s.push("<AdminAccessProtocol>"),
                                                                s.push("<id>4</id>"),
                                                                s.push("<enabled>true</enabled>"),
                                                                s.push("<protocol>RTSP</protocol>"),
                                                                s.push("<portNo>" + r + "</portNo>"),
                                                                s.push("</AdminAccessProtocol>"),
                                                                s.push("</AdminAccessProtocolList>");
                                                            // console.log("1827");
                                                            var o = f.loadXML(s.join(""));
                                                            t.success && t.success(o)
                                                        }
                                                    },
                                                    error: function() {
                                                        t.error && t.error()
                                                    }
                                                })
                                            },
                                            error: function() {
                                                t.error && t.error()
                                            }
                                        })
                                    },
                                    error: function() {
                                        var r = [];
                                        r.push("<AdminAccessProtocolList>"),
                                            I.getStreamChannels(e, {
                                                async: !1,
                                                success: function(s) {
                                                    if (n.$XML(s).find("rtspPortNo", !0).length > 0) {
                                                        var o = parseInt(n.$XML(s).find("rtspPortNo").eq(0).text(), 10);
                                                        r.push("<AdminAccessProtocol>"),
                                                            r.push("<id>4</id>"),
                                                            r.push("<enabled>true</enabled>"),
                                                            r.push("<protocol>RTSP</protocol>"),
                                                            r.push("<portNo>" + o + "</portNo>"),
                                                            r.push("</AdminAccessProtocol>"),
                                                            r.push("</AdminAccessProtocolList>");
                                                        var i = f.loadXML(r.join(""));
                                                        // console.log("1847");
                                                        t.success && t.success(i)
                                                    } else I.getStreamDynChannels(e, {
                                                        async: !1,
                                                        success: function(e) {
                                                            if (n.$XML(e).find("rtspPortNo", !0).length > 0) {
                                                                var s = parseInt(n.$XML(e).find("rtspPortNo").eq(0).text(), 10);
                                                                r.push("<AdminAccessProtocol>"),
                                                                    r.push("<id>4</id>"),
                                                                    r.push("<enabled>true</enabled>"),
                                                                    r.push("<protocol>RTSP</protocol>"),
                                                                    r.push("<portNo>" + s + "</portNo>"),
                                                                    r.push("</AdminAccessProtocol>"),
                                                                    r.push("</AdminAccessProtocolList>");
                                                                var o = f.loadXML(r.join(""));
                                                                // console.log("1855");
                                                                t.success && t.success(o)
                                                            }
                                                        },
                                                        error: function() {
                                                            t.error && t.error()
                                                        }
                                                    })
                                                },
                                                error: function() {
                                                    t.error && t.error()
                                                }
                                            })
                                    }
                                }),
                                s.setRequestParam(o),
                                s.submitRequest()
                        },
                        de.prototype.getStreamChannels = function(e, t) {
                            if (0 != e.iAnalogChannelNum) var n = E(this.CGI.getStreamChannels.analog, e.szHttpProtocol, e.szIP, e.iCGIPort);
                            else var n = E(this.CGI.getStreamChannels.digital, e.szHttpProtocol, e.szIP, e.iCGIPort);
                            var r = new ue,
                                s = {
                                    type: "GET",
                                    url: n,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(s, t),
                                f.extend(s, {
                                    success: function(e) {
                                        t.success && t.success(e)
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }),
                                r.setRequestParam(s),
                                r.submitRequest()
                        },
                        de.prototype.getStreamDynChannels = function(e, t) {
                            var n = E(this.CGI.getStreamDynChannels, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                r = new ue,
                                s = {
                                    type: "GET",
                                    url: n,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(s, t),
                                f.extend(s, {
                                    success: function(e) {
                                        t.success && t.success(e)
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }),
                                r.setRequestParam(s),
                                r.submitRequest()
                        },
                        de.prototype.startRealPlay = function(e, t) {
                            var n = 100 * t.iChannelID + t.iStreamType,
                                r = "",
                                s = e.szIP;
                            "rtsp://" === t.urlProtocol && (s = Z(s)),
                                r = t.bZeroChannel ? E(t.cgi.zeroChannels, t.urlProtocol, s, t.iPort, n) : E(t.cgi.channels, t.urlProtocol, s, t.iPort, n);
                            var o = c.HWP_Play(r, e.szAuth, t.iWndIndex, "", "");
                            if (0 == o) {
                                var i = new ce;
                                i.iIndex = t.iWndIndex,
                                    i.szIP = e.szIP,
                                    i.iCGIPort = e.iCGIPort,
                                    i.szDeviceIdentify = e.szDeviceIdentify,
                                    i.iChannelID = t.iChannelID,
                                    i.iPlayStatus = x,
                                    p.push(i)
                            }
                            return o
                        },
                        de.prototype.startVoiceTalk = function(e, t) {
                            var n = E(this.CGI.startVoiceTalk.open, e.szHttpProtocol, e.szIP, e.iCGIPort, t),
                                r = E(this.CGI.startVoiceTalk.close, e.szHttpProtocol, e.szIP, e.iCGIPort, t),
                                s = E(this.CGI.startVoiceTalk.audioData, e.szHttpProtocol, e.szIP, e.iCGIPort, t),
                                o = c.HWP_StartVoiceTalkEx(n, r, s, e.szAuth, e.iAudioTypeoDeviceInfo.m_iAudioBitRate, e.m_iAudioSamplingRate);
                            return o
                        },
                        de.prototype.ptzAutoControl = function(e, t, n, r) {
                            var s = n.iChannelID,
                                o = "",
                                i = "";
                            if (r.iPTZSpeed = r.iPTZSpeed < 7 ? 15 * r.iPTZSpeed: 100, t && (r.iPTZSpeed = 0), e.szDeviceType != w) o = E(this.CGI.ptzAutoControl, e.szHttpProtocol, e.szIP, e.iCGIPort, s),
                                i = "<?xml version='1.0' encoding='UTF-8'?><PTZData><pan>" + r.iPTZSpeed + "</pan><tilt>0</tilt></PTZData>";
                            else {
                                var a = 99;
                                t && (a = 96),
                                    o = E(this.CGI.goPreset, e.szHttpProtocol, e.szIP, e.iCGIPort, s, a)
                            }
                            var c = new ue,
                                u = {
                                    type: "PUT",
                                    url: o,
                                    async: !1,
                                    auth: e.szAuth,
                                    data: i,
                                    success: null,
                                    error: null
                                },
                                l = this;
                            f.extend(u, r),
                                f.extend(u, {
                                    success: function(e) {
                                        n.bPTZAuto = !n.bPTZAuto,
                                        r.success && r.success(e)
                                    },
                                    error: function(t, s) {
                                        if (e.szDeviceType != w) {
                                            o = E(l.CGI.ptzControl, e.szHttpProtocol, e.szIP, e.iCGIPort, n.iChannelID);
                                            var a = new ue,
                                                c = {
                                                    type: "PUT",
                                                    url: o,
                                                    async: !1,
                                                    auth: e.szAuth,
                                                    data: i,
                                                    success: null,
                                                    error: null
                                                };
                                            f.extend(c, r),
                                                a.setRequestParam(c),
                                                a.submitRequest()
                                        } else r.error && r.error(t, s)
                                    }
                                }),
                                c.setRequestParam(u),
                                c.submitRequest()
                        },
                        de.prototype.ptzControl = function(e, t, n, r) {
                            var s = (n.iChannelID, "");
                            n.bPTZAuto && this.ptzAutoControl(e, !0, n, {
                                iPTZSpeed: 0
                            }),
                                t ? r.iPTZSpeed = 0 : r.iPTZSpeed = r.iPTZSpeed < 7 ? 15 * r.iPTZSpeed: 100;
                            var o = [{},
                                    {
                                        pan: 0,
                                        tilt: r.iPTZSpeed
                                    },
                                    {
                                        pan: 0,
                                        tilt: -r.iPTZSpeed
                                    },
                                    {
                                        pan: -r.iPTZSpeed,
                                        tilt: 0
                                    },
                                    {
                                        pan: r.iPTZSpeed,
                                        tilt: 0
                                    },
                                    {
                                        pan: -r.iPTZSpeed,
                                        tilt: r.iPTZSpeed
                                    },
                                    {
                                        pan: -r.iPTZSpeed,
                                        tilt: -r.iPTZSpeed
                                    },
                                    {
                                        pan: r.iPTZSpeed,
                                        tilt: r.iPTZSpeed
                                    },
                                    {
                                        pan: r.iPTZSpeed,
                                        tilt: -r.iPTZSpeed
                                    },
                                    {},
                                    {
                                        speed: r.iPTZSpeed
                                    },
                                    {
                                        speed: -r.iPTZSpeed
                                    },
                                    {
                                        speed: r.iPTZSpeed
                                    },
                                    {
                                        speed: -r.iPTZSpeed
                                    },
                                    {
                                        speed: r.iPTZSpeed
                                    },
                                    {
                                        speed: -r.iPTZSpeed
                                    }],
                                i = "",
                                a = {};
                            switch (r.iPTZIndex) {
                                case 1:
                                case 2:
                                case 3:
                                case 4:
                                case 5:
                                case 6:
                                case 7:
                                case 8:
                                    a = this.CGI.ptzControl,
                                        i = "<?xml version='1.0' encoding='UTF-8'?><PTZData><pan>" + o[r.iPTZIndex].pan + "</pan><tilt>" + o[r.iPTZIndex].tilt + "</tilt></PTZData>";
                                    break;
                                case 10:
                                case 11:
                                    a = this.CGI.ptzControl,
                                        i = "<?xml version='1.0' encoding='UTF-8'?><PTZData><zoom>" + o[r.iPTZIndex].speed + "</zoom></PTZData>";
                                    break;
                                case 12:
                                case 13:
                                    a = this.CGI.ptzFocus,
                                        i = "<?xml version='1.0' encoding='UTF-8'?><FocusData><focus>" + o[r.iPTZIndex].speed + "</focus></FocusData>";
                                    break;
                                case 14:
                                case 15:
                                    a = this.CGI.ptzIris,
                                        i = "<?xml version='1.0' encoding='UTF-8'?><IrisData><iris>" + o[r.iPTZIndex].speed + "</iris></IrisData>";
                                    break;
                                default:
                                    return void(r.error && r.error())
                            }
                            s = E(a, e.szHttpProtocol, e.szIP, e.iCGIPort, n.iChannelID);
                            var c = new ue,
                                u = {
                                    type: "PUT",
                                    url: s,
                                    async: !1,
                                    auth: e.szAuth,
                                    data: i,
                                    success: null,
                                    error: null
                                };
                            f.extend(u, r),
                                f.extend(u, {
                                    success: function(e) {
                                        r.success && r.success(e)
                                    },
                                    error: function(e, t) {
                                        r.error && r.error(e, t)
                                    }
                                }),
                                c.setRequestParam(u),
                                c.submitRequest()
                        },
                        de.prototype.setPreset = function(e, t, n) {
                            var r = (t.iChannelID, ""),
                                s = "";
                            r = E(this.CGI.setPreset, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID, n.iPresetID),
                                s = "<?xml version='1.0' encoding='UTF-8'?>",
                                s += "<PTZPreset>",
                                s += "<id>" + n.iPresetID + "</id>",
                            e.szDeviceType != w && (s += "<presetName>Preset" + n.iPresetID + "</presetName>"),
                                s += "</PTZPreset>";
                            var o = new ue,
                                i = {
                                    type: "PUT",
                                    url: r,
                                    auth: e.szAuth,
                                    data: s,
                                    success: null,
                                    error: null
                                };
                            f.extend(i, n),
                                f.extend(i, {
                                    success: function(e) {
                                        n.success && n.success(e)
                                    },
                                    error: function(e, t) {
                                        n.error && n.error(e, t)
                                    }
                                }),
                                o.setRequestParam(i),
                                o.submitRequest()
                        },
                        de.prototype.goPreset = function(e, t, n) {
                            var r = (t.iChannelID, "");
                            r = E(this.CGI.goPreset, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID, n.iPresetID);
                            var s = new ue,
                                o = {
                                    type: "PUT",
                                    url: r,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(o, n),
                                f.extend(o, {
                                    success: function(e) {
                                        n.success && n.success(e)
                                    },
                                    error: function(e, t) {
                                        n.error && n.error(e, t)
                                    }
                                }),
                                s.setRequestParam(o),
                                s.submitRequest()
                        },
                        de.prototype.recordSearch = function(e, r) {
                            var s = "",
                                o = "",
                                i = r.iChannelID,
                                a = r.iStreamType,
                                c = r.szStartTime.replace(" ", "T") + "Z",
                                u = r.szEndTime.replace(" ", "T") + "Z";
                            s = E(this.CGI.recordSearch, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                o = "<?xml version='1.0' encoding='UTF-8'?><CMSearchDescription><searchID>" + new t + "</searchID><trackList><trackID>" + (100 * i + a) + "</trackID></trackList><timeSpanList><timeSpan><startTime>" + c + "</startTime><endTime>" + u + "</endTime></timeSpan></timeSpanList><maxResults>40</maxResults><searchResultPostion>" + r.iSearchPos + "</searchResultPostion><metadataList><metadataDescriptor>//metadata.psia.org/VideoMotion</metadataDescriptor></metadataList></CMSearchDescription>";
                            var l = new ue,
                                d = {
                                    type: "POST",
                                    url: s,
                                    auth: e.szAuth,
                                    data: o,
                                    success: null,
                                    error: null
                                };
                            f.extend(d, r),
                                f.extend(d, {
                                    success: function(e) {
                                        var t = [];
                                        t.push("<CMSearchResult>"),
                                            t.push("<responseStatus>" + n.$XML(e).find("responseStatus").eq(0).text() + "</responseStatus>"),
                                            t.push("<responseStatusStrg>" + n.$XML(e).find("responseStatusStrg").eq(0).text() + "</responseStatusStrg>"),
                                            t.push("<numOfMatches>" + n.$XML(e).find("numOfMatches").eq(0).text() + "</numOfMatches>"),
                                            t.push("<matchList>");
                                        for (var s = n.$XML(e).find("searchMatchItem", !0), o = 0, i = s.length; i > o; o++) {
                                            var a = s[o];
                                            t.push("<searchMatchItem>"),
                                                t.push("<trackID>" + n.$XML(a).find("trackID").eq(0).text() + "</trackID>"),
                                                t.push("<startTime>" + n.$XML(a).find("startTime").eq(0).text() + "</startTime>"),
                                                t.push("<endTime>" + n.$XML(a).find("endTime").eq(0).text() + "</endTime>"),
                                                t.push("<playbackURI>" + f.escape(n.$XML(a).find("playbackURI").eq(0).text()) + "</playbackURI>"),
                                                t.push("<metadataDescriptor>" + n.$XML(a).find("metadataDescriptor").eq(0).text().split("/")[1] + "</metadataDescriptor>"),
                                                t.push("</searchMatchItem>")
                                        }
                                        // console.log("2006");
                                        t.push("</matchList>"),
                                            t.push("</CMSearchResult>"),
                                            e = f.loadXML(t.join("")),
                                        r.success && r.success(e)
                                    },
                                    error: function(e, t) {
                                        r.error && r.error(e, t)
                                    }
                                }),
                                l.setRequestParam(d),
                                l.submitRequest()
                        },
                        de.prototype.startPlayback = function(e, t) {
                            var n = t.iWndIndex,
                                r = t.szStartTime,
                                s = t.szEndTime,
                                o = e.szIP;
                            "rtsp://" === t.urlProtocol && (o = Z(o));
                            var i = E(t.cgi, t.urlProtocol, o, t.iPort, t.iChannelID, r, s),
                                a = c.HWP_Play(i, e.szAuth, n, r, s);
                            if (0 == a) {
                                var u = new ce;
                                u.iIndex = n,
                                    u.szIP = e.szIP,
                                    u.iCGIPort = e.iCGIPort,
                                    u.szDeviceIdentify = e.szDeviceIdentify,
                                    u.iChannelID = t.iChannelID,
                                    u.iPlayStatus = D,
                                    p.push(u)
                            }
                            return a
                        },
                        de.prototype.reversePlayback = function(e, t) {
                            var n = t.iWndIndex,
                                r = t.szStartTime,
                                s = t.szEndTime,
                                o = e.szIP;
                            "rtsp://" === t.urlProtocol && (o = Z(o));
                            var i = E(t.cgi, t.urlProtocol, o, t.iPort, t.iChannelID, r, s),
                                a = c.HWP_ReversePlay(i, e.szAuth, n, r, s);
                            if (0 == a) {
                                var u = new ce;
                                u.iIndex = n,
                                    u.szIP = e.szIP,
                                    u.iCGIPort = e.iCGIPort,
                                    u.szDeviceIdentify = e.szDeviceIdentify,
                                    u.iChannelID = t.iChannelID,
                                    u.iPlayStatus = b,
                                    p.push(u)
                            }
                            return a
                        },
                        de.prototype.startDownloadRecord = function(e, t) {
                            var n = E(this.CGI.startDownloadRecord, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                r = "<?xml version='1.0' encoding='UTF-8'?><downloadRequest><playbackURI> " + f.escape(t.szPlaybackURI) + "</playbackURI></downloadRequest>";
                            return c.HWP_StartDownload(n, e.szAuth, t.szFileName, r, t.bDateDir)
                        },
                        de.prototype.exportDeviceConfig = function(e) {
                            var t = E(this.CGI.deviceConfig, e.szHttpProtocol, e.szIP, e.iCGIPort);
                            return c.HWP_ExportDeviceConfig(t, e.szAuth, "", 0)
                        },
                        de.prototype.importDeviceConfig = function(e, t) {
                            var n = E(this.CGI.deviceConfig, e.szHttpProtocol, e.szIP, e.iCGIPort);
                            return c.HWP_ImportDeviceConfig(n, e.szAuth, t.szFileName, 0)
                        },
                        de.prototype.restart = function(e, t) {
                            var n = E(this.CGI.restart, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                r = new ue,
                                s = {
                                    type: "PUT",
                                    url: n,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(s, t),
                                f.extend(s, {
                                    success: function(e) {
                                        t.success && t.success(e)
                                    },
                                    error: function(e, n) {
                                        t.error && t.error(e, n)
                                    }
                                }),
                                r.setRequestParam(s),
                                r.submitRequest()
                        },
                        de.prototype.restore = function(e, t, n) {
                            var r = E(this.CGI.restore, e.szHttpProtocol, e.szIP, e.iCGIPort, t),
                                s = new ue,
                                o = {
                                    type: "PUT",
                                    url: r,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(o, n),
                                f.extend(o, {
                                    success: function(e) {
                                        n.success && n.success(e)
                                    },
                                    error: function(e, t) {
                                        n.error && n.error(e, t)
                                    }
                                }),
                                s.setRequestParam(o),
                                s.submitRequest()
                        },
                        de.prototype.startUpgrade = function(e, t) {
                            var n = E(this.CGI.startUpgrade.upgrade, e.szHttpProtocol, e.szIP, e.iCGIPort),
                                r = E(this.CGI.startUpgrade.status, e.szHttpProtocol, e.szIP, e.iCGIPort);
                            return c.HWP_StartUpgrade(n, r, e.szAuth, t.szFileName)
                        },
                        de.prototype.set3DZoom = function(e, t, n, r) {
                            var s = E(this.CGI.set3DZoom, e.szHttpProtocol, e.szIP, e.iCGIPort, t.iChannelID),
                                o = new ue,
                                i = {
                                    type: "PUT",
                                    url: s,
                                    data: n,
                                    auth: e.szAuth,
                                    success: null,
                                    error: null
                                };
                            f.extend(i, r),
                                f.extend(i, {
                                    success: function(e) {
                                        r.success && r.success(e)
                                    },
                                    error: function(e, t) {
                                        r.error && r.error(e, t)
                                    }
                                }),
                                o.setRequestParam(i),
                                o.submitRequest()
                        },
                        de.prototype.deviceCapturePic = function(e, t, n, r) {
                            var t = 100 * t + 1,
                                s = E(this.CGI.deviceCapture.channels, e.szHttpProtocol, e.szIP, e.iCGIPort, t),
                                o = [];
                            return f.isInt(r.iResolutionWidth) && o.push("videoResolutionWidth=" + r.iResolutionWidth),
                            f.isInt(r.iResolutionHeight) && o.push("videoResolutionHeight=" + r.iResolutionHeight),
                            o.length > 0 && (s += "?" + o.join("&")),
                                c.HWP_DeviceCapturePic(s, e.szAuth, n, r.bDateDir)
                        };
                    var pe = function() {};
                    pe.prototype._alert = function(e) {
                        a.bDebugMode && console.log(e);
                    },
                        function(t) {
                            var n = function(e) {
                                this.elems = [],
                                    this.length = 0,
                                    this.length = this.elems.push(e)
                            };
                            n.prototype.find = function(e, t) {
                                var n = this.elems[this.length - 1] ? this.elems[this.length - 1].getElementsByTagName(e) : [];
                                return this.length = this.elems.push(n),
                                    t ? n: this
                            },
                                n.prototype.eq = function(e, t) {
                                    var n = this.elems[this.length - 1].length,
                                        r = null;
                                    return n > 0 && n > e && (r = this.elems[this.length - 1][e]),
                                        this.length = this.elems.push(r),
                                        t ? r: this
                                },
                                n.prototype.text = function(t) {
                                    return this.elems[this.length - 1] ? t ? void(e.DOMParser ? this.elems[this.length - 1].textContent = t: this.elems[this.length - 1].text = t) : e.DOMParser ? this.elems[this.length - 1].textContent: this.elems[this.length - 1].text: ""
                                },
                                n.prototype.attr = function(e) {
                                    if (this.elems[this.length - 1]) {
                                        var t = this.elems[this.length - 1].attributes.getNamedItem(e);
                                        return t ? t.value: ""
                                    }
                                },
                                t.$XML = function(e) {
                                    return new n(e)
                                }
                        } (this);
                    var Pe = function() {};
                    Pe.prototype.extend = function() {
                        for (var e, t = arguments[0] || {},
                                 n = 1, r = arguments.length; r > n; n++) if (null != (e = arguments[n])) for (var s in e) {
                            var o = (t[s], e[s]);
                            t !== o && ("object" == typeof o ? t[s] = this.extend({},
                                o) : void 0 !== o && (t[s] = o))
                        }
                        return t
                    },
                        Pe.prototype.browser = function() {
                            var e = /(chrome)[ \/]([\w.]+)/,
                                t = /(safari)[ \/]([\w.]+)/,
                                n = /(opera)(?:.*version)?[ \/]([\w.]+)/,
                                r = /(msie) ([\w.]+)/,
                                s = /(trident.*rv:)([\w.]+)/,
                                o = /(mozilla)(?:.*? rv:([\w.]+))?/,
                                i = navigator.userAgent.toLowerCase(),
                                a = e.exec(i) || t.exec(i) || n.exec(i) || r.exec(i) || s.exec(i) || i.indexOf("compatible") < 0 && o.exec(i) || ["unknow", "0"];
                            a.length > 0 && a[1].indexOf("trident") > -1 && (a[1] = "msie");
                            var c = {};
                            return c[a[1]] = !0,
                                c.version = a[2],
                                c
                        },
                        Pe.prototype.loadXML = function(t) {
                            if (null == t || "" == t) return null;
                            var n = null;
                            //现场硬盘录像机用这段
                            if (e.DOMParser) {
                                var r = new DOMParser;
                                n = r.parseFromString(t, "text/xml")
                                // console.log("DOMParser");
                            } else {
                                if (window.ActiveXObject) {
                                    n = new ActiveXObject("Microsoft.XMLDOM"),
                                        n.async = !1,
                                        n.loadXML(t);
                                    // console.log("ActiveXObject");
                                }
                            }

                            return n
                        },
                        Pe.prototype.loadXML2 = function(t) {
                            if (null == t || "" == t) return null;
                            var n = null;

                            try //Internet Explorer
                            {
                                n = new ActiveXObject("Microsoft.XMLDOM");
                                n.async = "false";
                                n.loadXML(t);
                            } catch(e) {
                                try //Firefox, Mozilla, Opera, etc.
                                {
                                    var parser = new DOMParser();
                                    n = parser.parseFromString(t, "text/xml");
                                } catch(e) {
                                    alert(e.message);
                                    return;
                                }
                            }
                            return n
                        },
                        Pe.prototype.toXMLStr = function(e) {
                            var t = "";
                            try {
                                var n = new XMLSerializer;
                                t = n.serializeToString(e)
                            } catch(r) {
                                try {
                                    t = e.xml
                                } catch(r) {
                                    return ""
                                }
                            }
                            return - 1 == t.indexOf("<?xml") && (t = "<?xml version='1.0' encoding='utf-8'?>" + t),
                                t
                        },
                        Pe.prototype.escape = function(e) {
                            return e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
                        },
                        Pe.prototype.dateFormat = function(e, t) {
                            var n = {
                                "M+": e.getMonth() + 1,
                                "d+": e.getDate(),
                                "h+": e.getHours(),
                                "m+": e.getMinutes(),
                                "s+": e.getSeconds(),
                                "q+": Math.floor((e.getMonth() + 3) / 3),
                                S: e.getMilliseconds()
                            };
                            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length)));
                            for (var r in n) new RegExp("(" + r + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? n[r] : ("00" + n[r]).substr(("" + n[r]).length)));
                            return t
                        },
                        Pe.prototype.Base64 = {
                            _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                            encode: function(e) {
                                var t, n, r, s, o, i, a, c = "",
                                    u = 0;
                                for (e = Pe.prototype.Base64._utf8_encode(e); u < e.length;) t = e.charCodeAt(u++),
                                    n = e.charCodeAt(u++),
                                    r = e.charCodeAt(u++),
                                    s = t >> 2,
                                    o = (3 & t) << 4 | n >> 4,
                                    i = (15 & n) << 2 | r >> 6,
                                    a = 63 & r,
                                    isNaN(n) ? i = a = 64 : isNaN(r) && (a = 64),
                                    c = c + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(i) + this._keyStr.charAt(a);
                                return c
                            },
                            decode: function(e) {
                                var t, n, r, s, o, i, a, c = "",
                                    u = 0;
                                for (e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); u < e.length;) s = this._keyStr.indexOf(e.charAt(u++)),
                                    o = this._keyStr.indexOf(e.charAt(u++)),
                                    i = this._keyStr.indexOf(e.charAt(u++)),
                                    a = this._keyStr.indexOf(e.charAt(u++)),
                                    t = s << 2 | o >> 4,
                                    n = (15 & o) << 4 | i >> 2,
                                    r = (3 & i) << 6 | a,
                                    c += String.fromCharCode(t),
                                64 != i && (c += String.fromCharCode(n)),
                                64 != a && (c += String.fromCharCode(r));
                                return c = Pe.prototype.Base64._utf8_decode(c)
                            },
                            _utf8_encode: function(e) {
                                e = e.replace(/\r\n/g, "\n");
                                for (var t = "",
                                         n = 0; n < e.length; n++) {
                                    var r = e.charCodeAt(n);
                                    128 > r ? t += String.fromCharCode(r) : r > 127 && 2048 > r ? (t += String.fromCharCode(r >> 6 | 192), t += String.fromCharCode(63 & r | 128)) : (t += String.fromCharCode(r >> 12 | 224), t += String.fromCharCode(r >> 6 & 63 | 128), t += String.fromCharCode(63 & r | 128))
                                }
                                return t
                            },
                            _utf8_decode: function(e) {
                                for (var t = "",
                                         n = 0,
                                         r = c1 = c2 = 0; n < e.length;) r = e.charCodeAt(n),
                                    128 > r ? (t += String.fromCharCode(r), n++) : r > 191 && 224 > r ? (c2 = e.charCodeAt(n + 1), t += String.fromCharCode((31 & r) << 6 | 63 & c2), n += 2) : (c2 = e.charCodeAt(n + 1), c3 = e.charCodeAt(n + 2), t += String.fromCharCode((15 & r) << 12 | (63 & c2) << 6 | 63 & c3), n += 3);
                                return t
                            }
                        },
                        Pe.prototype.createEventScript = function(e, t, n) {
                            var r = document.createElement("script");
                            r.htmlFor = e,
                                r.event = t,
                                r.innerHTML = n,
                                document.body.parentNode.appendChild(r)
                        },
                        Pe.prototype.isInt = function(e) {
                            return /^\d+$/.test(e)
                        },
                        Pe.prototype.getDirName = function() {
                            var e = "";
                            if ("" !== a.szBasePath) e = a.szBasePath;
                            else {
                                var t = /[^?#]*\//,
                                    n = document.getElementById("videonode");
                                if (n) e = n.src.match(t)[0];
                                else {
                                    for (var r = document.scripts,
                                             s = 0,
                                             o = r.length; o > s; s++) if (r[s].src.indexOf("webVideoCtrl.js") > -1) {
                                        n = r[s];
                                        break
                                    }
                                    n && (e = n.src.match(t)[0])
                                }
                            }
                            return e
                        },
                        Pe.prototype.loadScript = function(e, t) {
                            var n = document.createElement("script");
                            n.type = "text/javascript",
                                n.onload = function() {
                                    t()
                                },
                                n.src = e,
                                document.getElementsByTagName("head")[0].appendChild(n)
                        },
                        Pe.prototype.sha256 = function(e) {
                            function t(e, t) {
                                var n = (65535 & e) + (65535 & t);
                                return (e >> 16) + (t >> 16) + (n >> 16) << 16 | 65535 & n
                            }

                            function n(e, t) {
                                return e >>> t | e << 32 - t
                            }

                            return e = function(e) {
                                for (var e = e.replace(/\r\n/g, "\n"), t = "", n = 0; n < e.length; n++) {
                                    var r = e.charCodeAt(n);
                                    128 > r ? t += String.fromCharCode(r) : (r > 127 && 2048 > r ? t += String.fromCharCode(r >> 6 | 192) : (t += String.fromCharCode(r >> 12 | 224), t += String.fromCharCode(r >> 6 & 63 | 128)), t += String.fromCharCode(63 & r | 128))
                                }
                                return t
                            } (e),
                                function(e) {
                                    for (var t = "",
                                             n = 0; n < 4 * e.length; n++) t += "0123456789abcdef".charAt(e[n >> 2] >> 8 * (3 - n % 4) + 4 & 15) + "0123456789abcdef".charAt(e[n >> 2] >> 8 * (3 - n % 4) & 15);
                                    return t
                                } (function(e, r) {
                                    var s, o, i, a, c, u, l, d, p, P, h, I, f = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298],
                                        m = [1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225],
                                        C = Array(64);
                                    for (e[r >> 5] |= 128 << 24 - r % 32, e[(r + 64 >> 9 << 4) + 15] = r, p = 0; p < e.length; p += 16) {
                                        for (s = m[0], o = m[1], i = m[2], a = m[3], c = m[4], u = m[5], l = m[6], d = m[7], P = 0; 64 > P; P++) C[P] = 16 > P ? e[P + p] : t(t(t(n(C[P - 2], 17) ^ n(C[P - 2], 19) ^ C[P - 2] >>> 10, C[P - 7]), n(C[P - 15], 7) ^ n(C[P - 15], 18) ^ C[P - 15] >>> 3), C[P - 16]),
                                            h = t(t(t(t(d, n(c, 6) ^ n(c, 11) ^ n(c, 25)), c & u ^ ~c & l), f[P]), C[P]),
                                            I = t(n(s, 2) ^ n(s, 13) ^ n(s, 22), s & o ^ s & i ^ o & i),
                                            d = l,
                                            l = u,
                                            u = c,
                                            c = t(a, h),
                                            a = i,
                                            i = o,
                                            o = s,
                                            s = t(h, I);
                                        m[0] = t(s, m[0]),
                                            m[1] = t(o, m[1]),
                                            m[2] = t(i, m[2]),
                                            m[3] = t(a, m[3]),
                                            m[4] = t(c, m[4]),
                                            m[5] = t(u, m[5]),
                                            m[6] = t(l, m[6]),
                                            m[7] = t(d, m[7])
                                    }
                                    return m
                                } (function(e) {
                                    for (var t = [], n = 0; n < 8 * e.length; n += 8) t[n >> 5] |= (255 & e.charCodeAt(n / 8)) << 24 - n % 32;
                                    return t
                                } (e), 8 * e.length))
                        },
                        Pe.prototype.cookie = function(e, t, n) {
                            if (arguments.length > 1 && (null === t || "object" != typeof t)) {
                                if (n = this.extend({},
                                        n), null === t && (n.expires = -1), "number" == typeof n.expires) {
                                    var r = n.expires,
                                        s = n.expires = new Date;
                                    s.setDate(s.getDate() + r)
                                }
                                return document.cookie = [encodeURIComponent(e), "=", n.raw ? String(t) : encodeURIComponent(String(t)), n.expires ? "; expires=" + n.expires.toUTCString() : "", n.path ? "; path=" + n.path: "; path=/", n.domain ? "; domain=" + n.domain: "", n.secure ? "; secure": ""].join("")
                            }
                            n = t || {};
                            var o, i = n.raw ?
                                function(e) {
                                    return e
                                }: decodeURIComponent;
                            return (o = new RegExp("(?:^|; )" + encodeURIComponent(e) + "=([^;]*)").exec(document.cookie)) ? i(o[1]) : null
                        },
                        t.prototype.valueOf = function() {
                            return this.id
                        },
                        t.prototype.toString = function() {
                            return this.id
                        },
                        t.prototype.createUUID = function() {
                            var e = new Date(1582, 10, 15, 0, 0, 0, 0),
                                n = new Date,
                                r = n.getTime() - e.getTime(),
                                s = "-",
                                o = t.getIntegerBits(r, 0, 31),
                                i = t.getIntegerBits(r, 32, 47),
                                a = t.getIntegerBits(r, 48, 59) + "1",
                                c = t.getIntegerBits(t.rand(4095), 0, 7),
                                u = t.getIntegerBits(t.rand(4095), 0, 7),
                                l = t.getIntegerBits(t.rand(8191), 0, 7) + t.getIntegerBits(t.rand(8191), 8, 15) + t.getIntegerBits(t.rand(8191), 0, 7) + t.getIntegerBits(t.rand(8191), 8, 15) + t.getIntegerBits(t.rand(8191), 0, 15);
                            return o + s + i + s + a + s + c + u + s + l
                        },
                        t.getIntegerBits = function(e, n, r) {
                            var s = t.returnBase(e, 16),
                                o = new Array,
                                i = "",
                                a = 0;
                            for (a = 0; a < s.length; a++) o.push(s.substring(a, a + 1));
                            for (a = Math.floor(n / 4); a <= Math.floor(r / 4); a++) i += o[a] && "" != o[a] ? o[a] : "0";
                            return i
                        },
                        t.returnBase = function(e, t) {
                            var n = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
                            if (t > e) var r = n[e];
                            else {
                                var s = "" + Math.floor(e / t),
                                    o = e - s * t;
                                if (s >= t) var r = this.returnBase(s, t) + n[o];
                                else var r = n[s] + n[o]
                            }
                            return r
                        },
                        t.rand = function(e) {
                            return Math.floor(Math.random() * e)
                        },
                        h = new le,
                        I = new de,
                        P = new pe,
                        f = new Pe;
                    var he = f.dateFormat(new Date, "yyyyMMddhhmmss");
                    return o = "webVideoCtrl" + he,
                        i = "webVideoCtrl" + he,
                    "object" != typeof e.attachEvent && f.browser().msie && (f.createEventScript(o, "GetSelectWndInfo(SelectWndInfo)", "GetSelectWndInfo(SelectWndInfo);"), f.createEventScript(o, "ZoomInfoCallback(szZoomInfo)", "ZoomInfoCallback(szZoomInfo);"), f.createEventScript(o, "GetHttpInfo(lID, lpInfo, lReverse)", "GetHttpInfo(lID, lpInfo, lReverse);"), f.createEventScript(o, "PluginEventHandler(iEventType, iParam1, iParam2)", "PluginEventHandler(iEventType, iParam1, iParam2);"), f.createEventScript(o, "RemoteConfigInfo(lID)", "RemoteConfigInfo(lID);"), f.createEventScript(o, "KeyBoardEventInfo(iKeyCode)", "KeyBoardEventInfo(iKeyCode);")),
                        this
                } (),
                n = e.WebVideoCtrl = t;
            n.version = "1.1.0"
        }
    } (this),
"object" == typeof exports && "undefined" != typeof module || ("function" == typeof define && define.amd ? define(function() {
    return WebVideoCtrl
}) : "function" == typeof define && define.cmd && define(function(e, t, n) {
    n.exports = WebVideoCtrl
}));
// export{
//   WebVideoCtrl()
// }
