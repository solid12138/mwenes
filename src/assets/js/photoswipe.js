/*! PhotoSwipe - v4.1.2 - 2017-04-05
* http://photoswipe.com
* Copyright (c) 2017 Dmitry Semenov; */
!
function(a, b) {
    "function" == typeof define && define.amd ? define(b) : "object" == typeof exports ? module.exports = b() : a.PhotoSwipe = b()
} (this,
function() {
    "use strict";
    var a = function(a, b, c, d) {
        var e = {
            features: null,
            bind: function(a, b, c, d) {
                var e = (d ? "remove": "add") + "EventListener";
                b = b.split(" ");
                for (var f = 0; f < b.length; f++) b[f] && a[e](b[f], c, !1)
            },
            isArray: function(a) {
                return a instanceof Array
            },
            createEl: function(a, b) {
                var c = document.createElement(b || "div");
                return a && (c.className = a),
                c
            },
            getScrollY: function() {
                var a = window.pageYOffset;
                return void 0 !== a ? a: document.documentElement.scrollTop
            },
            unbind: function(a, b, c) {
                e.bind(a, b, c, !0)
            },
            removeClass: function(a, b) {
                var c = new RegExp("(\\s|^)" + b + "(\\s|$)");
                a.className = a.className.replace(c, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, "")
            },
            addClass: function(a, b) {
                e.hasClass(a, b) || (a.className += (a.className ? " ": "") + b)
            },
            hasClass: function(a, b) {
                return a.className && new RegExp("(^|\\s)" + b + "(\\s|$)").test(a.className)
            },
            getChildByClass: function(a, b) {
                for (var c = a.firstChild; c;) {
                    if (e.hasClass(c, b)) return c;
                    c = c.nextSibling
                }
            },
            arraySearch: function(a, b, c) {
                for (var d = a.length; d--;) if (a[d][c] === b) return d;
                return - 1
            },
            extend: function(a, b, c) {
                for (var d in b) if (b.hasOwnProperty(d)) {
                    if (c && a.hasOwnProperty(d)) continue;
                    a[d] = b[d]
                }
            },
            easing: {
                sine: {
                    out: function(a) {
                        return Math.sin(a * (Math.PI / 2))
                    },
                    inOut: function(a) {
                        return - (Math.cos(Math.PI * a) - 1) / 2
                    }
                },
                cubic: {
                    out: function(a) {
                        return--a * a * a + 1
                    }
                }
            },
            detectFeatures: function() {
                if (e.features) return e.features;
                var a = e.createEl(),
                b = a.style,
                c = "",
                d = {};
                if (d.oldIE = document.all && !document.addEventListener, d.touch = "ontouchstart" in window, window.requestAnimationFrame && (d.raf = window.requestAnimationFrame, d.caf = window.cancelAnimationFrame), d.pointerEvent = navigator.pointerEnabled || navigator.msPointerEnabled, !d.pointerEvent) {
                    var f = navigator.userAgent;
                    if (/iP(hone|od)/.test(navigator.platform)) {
                        var g = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
                        g && g.length > 0 && (g = parseInt(g[1], 10), g >= 1 && g < 8 && (d.isOldIOSPhone = !0))
                    }
                    var h = f.match(/Android\s([0-9\.]*)/),
                    i = h ? h[1] : 0;
                    i = parseFloat(i),
                    i >= 1 && (i < 4.4 && (d.isOldAndroid = !0), d.androidVersion = i),
                    d.isMobileOpera = /opera mini|opera mobi/i.test(f)
                }
                for (var j, k, l = ["transform", "perspective", "animationName"], m = ["", "webkit", "Moz", "ms", "O"], n = 0; n < 4; n++) {
                    c = m[n];
                    for (var o = 0; o < 3; o++) j = l[o],
                    k = c + (c ? j.charAt(0).toUpperCase() + j.slice(1) : j),
                    !d[j] && k in b && (d[j] = k);
                    c && !d.raf && (c = c.toLowerCase(), d.raf = window[c + "RequestAnimationFrame"], d.raf && (d.caf = window[c + "CancelAnimationFrame"] || window[c + "CancelRequestAnimationFrame"]))
                }
                if (!d.raf) {
                    var p = 0;
                    d.raf = function(a) {
                        var b = (new Date).getTime(),
                        c = Math.max(0, 16 - (b - p)),
                        d = window.setTimeout(function() {
                            a(b + c)
                        },
                        c);
                        return p = b + c,
                        d
                    },
                    d.caf = function(a) {
                        clearTimeout(a)
                    }
                }
                return d.svg = !!document.createElementNS && !!document.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect,
                e.features = d,
                d
            }
        };
        e.detectFeatures(),
        e.features.oldIE && (e.bind = function(a, b, c, d) {
            b = b.split(" ");
            for (var e, f = (d ? "detach": "attach") + "Event", g = function() {
                c.handleEvent.call(c)
            },
            h = 0; h < b.length; h++) if (e = b[h]) if ("object" == typeof c && c.handleEvent) {
                if (d) {
                    if (!c["oldIE" + e]) return ! 1
                } else c["oldIE" + e] = g;
                a[f]("on" + e, c["oldIE" + e])
            } else a[f]("on" + e, c)
        });
        var f = this,
        g = 25,
        h = 3,
        i = {
            allowPanToNext: !0,
            spacing: .12,
            bgOpacity: 1,
            mouseUsed: !1,
            loop: !0,
            pinchToClose: !0,
            closeOnScroll: !0,
            closeOnVerticalDrag: !0,
            verticalDragRange: .75,
            hideAnimationDuration: 333,
            showAnimationDuration: 333,
            showHideOpacity: !1,
            focus: !0,
            escKey: !0,
            arrowKeys: !0,
            mainScrollEndFriction: .35,
            panEndFriction: .35,
            isClickableElement: function(a) {
                return "A" === a.tagName
            },
            getDoubleTapZoom: function(a, b) {
                return a ? 1 : b.initialZoomLevel < .7 ? 1 : 1.33
            },
            maxSpreadZoom: 1.33,
            modal: !0,
            scaleMode: "fit"
        };
        e.extend(i, d);
        var j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, $, _, aa, ba, ca, da, ea, fa, ga, ha, ia, ja, ka, la, ma = function() {
            return {
                x: 0,
                y: 0
            }
        },
        na = ma(),
        oa = ma(),
        pa = ma(),
        qa = {},
        ra = 0,
        sa = {},
        ta = ma(),
        ua = 0,
        va = !0,
        wa = [],
        xa = {},
        ya = !1,
        za = function(a, b) {
            e.extend(f, b.publicMethods),
            wa.push(a)
        },
        Aa = function(a) {
            var b = ac();
            return a > b - 1 ? a - b: a < 0 ? b + a: a
        },
        Ba = {},
        Ca = function(a, b) {
            return Ba[a] || (Ba[a] = []),
            Ba[a].push(b)
        },
        Da = function(a) {
            var b = Ba[a];
            if (b) {
                var c = Array.prototype.slice.call(arguments);
                c.shift();
                for (var d = 0; d < b.length; d++) b[d].apply(f, c)
            }
        },
        Ea = function() {
            return (new Date).getTime()
        },
        Fa = function(a) {
            ja = a,
            f.bg.style.opacity = a * i.bgOpacity
        },
        Ga = function(a, b, c, d, e) { (!ya || e && e !== f.currItem) && (d /= e ? e.fitRatio: f.currItem.fitRatio),
            a[E] = u + b + "px, " + c + "px" + v + " scale(" + d + ")"
        },
        Ha = function(a) {
            ea && (a && (s > f.currItem.fitRatio ? ya || (mc(f.currItem, !1, !0), ya = !0) : ya && (mc(f.currItem), ya = !1)), Ga(ea, pa.x, pa.y, s))
        },
        Ia = function(a) {
            a.container && Ga(a.container.style, a.initialPosition.x, a.initialPosition.y, a.initialZoomLevel, a)
        },
        Ja = function(a, b) {
            b[E] = u + a + "px, 0px" + v
        },
        Ka = function(a, b) {
            if (!i.loop && b) {
                var c = m + (ta.x * ra - a) / ta.x,
                d = Math.round(a - tb.x); (c < 0 && d > 0 || c >= ac() - 1 && d < 0) && (a = tb.x + d * i.mainScrollEndFriction)
            }
            tb.x = a,
            Ja(a, n)
        },
        La = function(a, b) {
            var c = ub[a] - sa[a];
            return oa[a] + na[a] + c - c * (b / t)
        },
        Ma = function(a, b) {
            a.x = b.x,
            a.y = b.y,
            b.id && (a.id = b.id)
        },
        Na = function(a) {
            a.x = Math.round(a.x),
            a.y = Math.round(a.y)
        },
        Oa = null,
        Pa = function() {
            Oa && (e.unbind(document, "mousemove", Pa), e.addClass(a, "pswp--has_mouse"), i.mouseUsed = !0, Da("mouseUsed")),
            Oa = setTimeout(function() {
                Oa = null
            },
            100)
        },
        Qa = function() {
            e.bind(document, "keydown", f),
            N.transform && e.bind(f.scrollWrap, "click", f),
            i.mouseUsed || e.bind(document, "mousemove", Pa),
            e.bind(window, "resize scroll orientationchange", f),
            Da("bindEvents")
        },
        Ra = function() {
            e.unbind(window, "resize scroll orientationchange", f),
            e.unbind(window, "scroll", r.scroll),
            e.unbind(document, "keydown", f),
            e.unbind(document, "mousemove", Pa),
            N.transform && e.unbind(f.scrollWrap, "click", f),
            V && e.unbind(window, p, f),
            clearTimeout(O),
            Da("unbindEvents")
        },
        Sa = function(a, b) {
            var c = ic(f.currItem, qa, a);
            return b && (da = c),
            c
        },
        Ta = function(a) {
            return a || (a = f.currItem),
            a.initialZoomLevel
        },
        Ua = function(a) {
            return a || (a = f.currItem),
            a.w > 0 ? i.maxSpreadZoom: 1
        },
        Va = function(a, b, c, d) {
            return d === f.currItem.initialZoomLevel ? (c[a] = f.currItem.initialPosition[a], !0) : (c[a] = La(a, d), c[a] > b.min[a] ? (c[a] = b.min[a], !0) : c[a] < b.max[a] && (c[a] = b.max[a], !0))
        },
        Wa = function() {
            if (E) {
                var b = N.perspective && !G;
                return u = "translate" + (b ? "3d(": "("),
                void(v = N.perspective ? ", 0px)": ")")
            }
            E = "left",
            e.addClass(a, "pswp--ie"),
            Ja = function(a, b) {
                b.left = a + "px"
            },
            Ia = function(a) {
                var b = a.fitRatio > 1 ? 1 : a.fitRatio,
                c = a.container.style,
                d = b * a.w,
                e = b * a.h;
                c.width = d + "px",
                c.height = e + "px",
                c.left = a.initialPosition.x + "px",
                c.top = a.initialPosition.y + "px"
            },
            Ha = function() {
                if (ea) {
                    var a = ea,
                    b = f.currItem,
                    c = b.fitRatio > 1 ? 1 : b.fitRatio,
                    d = c * b.w,
                    e = c * b.h;
                    a.width = d + "px",
                    a.height = e + "px",
                    a.left = pa.x + "px",
                    a.top = pa.y + "px"
                }
            }
        },
        Xa = function(a) {
            var b = "";
            i.escKey && 27 === a.keyCode ? b = "close": i.arrowKeys && (37 === a.keyCode ? b = "prev": 39 === a.keyCode && (b = "next")),
            b && (a.ctrlKey || a.altKey || a.shiftKey || a.metaKey || (a.preventDefault ? a.preventDefault() : a.returnValue = !1, f[b]()))
        },
        Ya = function(a) {
            a && (Y || X || fa || T) && (a.preventDefault(), a.stopPropagation())
        },
        Za = function() {
            f.setScrollOffset(0, e.getScrollY())
        },
        $a = {},
        _a = 0,
        ab = function(a) {
            $a[a] && ($a[a].raf && I($a[a].raf), _a--, delete $a[a])
        },
        bb = function(a) {
            $a[a] && ab(a),
            $a[a] || (_a++, $a[a] = {})
        },
        cb = function() {
            for (var a in $a) $a.hasOwnProperty(a) && ab(a)
        },
        db = function(a, b, c, d, e, f, g) {
            var h, i = Ea();
            bb(a);
            var j = function() {
                if ($a[a]) {
                    if (h = Ea() - i, h >= d) return ab(a),
                    f(c),
                    void(g && g());
                    f((c - b) * e(h / d) + b),
                    $a[a].raf = H(j)
                }
            };
            j()
        },
        eb = {
            shout: Da,
            listen: Ca,
            viewportSize: qa,
            options: i,
            isMainScrollAnimating: function() {
                return fa
            },
            getZoomLevel: function() {
                return s
            },
            getCurrentIndex: function() {
                return m
            },
            isDragging: function() {
                return V
            },
            isZooming: function() {
                return aa
            },
            setScrollOffset: function(a, b) {
                sa.x = a,
                M = sa.y = b,
                Da("updateScrollOffset", sa)
            },
            applyZoomPan: function(a, b, c, d) {
                pa.x = b,
                pa.y = c,
                s = a,
                Ha(d)
            },
            init: function() {
                if (!j && !k) {
                    var c;
                    f.framework = e,
                    f.template = a,
                    f.bg = e.getChildByClass(a, "pswp__bg"),
                    J = a.className,
                    j = !0,
                    N = e.detectFeatures(),
                    H = N.raf,
                    I = N.caf,
                    E = N.transform,
                    L = N.oldIE,
                    f.scrollWrap = e.getChildByClass(a, "pswp__scroll-wrap"),
                    f.container = e.getChildByClass(f.scrollWrap, "pswp__container"),
                    n = f.container.style,
                    f.itemHolders = y = [{
                        el: f.container.children[0],
                        wrap: 0,
                        index: -1
                    },
                    {
                        el: f.container.children[1],
                        wrap: 0,
                        index: -1
                    },
                    {
                        el: f.container.children[2],
                        wrap: 0,
                        index: -1
                    }],
                    y[0].el.style.display = y[2].el.style.display = "none",
                    Wa(),
                    r = {
                        resize: f.updateSize,
                        orientationchange: function() {
                            clearTimeout(O),
                            O = setTimeout(function() {
                                qa.x !== f.scrollWrap.clientWidth && f.updateSize()
                            },
                            500)
                        },
                        scroll: Za,
                        keydown: Xa,
                        click: Ya
                    };
                    var d = N.isOldIOSPhone || N.isOldAndroid || N.isMobileOpera;
                    for (N.animationName && N.transform && !d || (i.showAnimationDuration = i.hideAnimationDuration = 0), c = 0; c < wa.length; c++) f["init" + wa[c]]();
                    if (b) {
                        var g = f.ui = new b(f, e);
                        g.init()
                    }
                    Da("firstUpdate"),
                    m = m || i.index || 0,
                    (isNaN(m) || m < 0 || m >= ac()) && (m = 0),
                    f.currItem = _b(m),
                    (N.isOldIOSPhone || N.isOldAndroid) && (va = !1),
                    a.setAttribute("aria-hidden", "false"),
                    i.modal && (va ? a.style.position = "fixed": (a.style.position = "absolute", a.style.top = e.getScrollY() + "px")),
                    void 0 === M && (Da("initialLayout"), M = K = e.getScrollY());
                    var l = "pswp--open ";
                    for (i.mainClass && (l += i.mainClass + " "), i.showHideOpacity && (l += "pswp--animate_opacity "), l += G ? "pswp--touch": "pswp--notouch", l += N.animationName ? " pswp--css_animation": "", l += N.svg ? " pswp--svg": "", e.addClass(a, l), f.updateSize(), o = -1, ua = null, c = 0; c < h; c++) Ja((c + o) * ta.x, y[c].el.style);
                    L || e.bind(f.scrollWrap, q, f),
                    Ca("initialZoomInEnd",
                    function() {
                        f.setContent(y[0], m - 1),
                        f.setContent(y[2], m + 1),
                        y[0].el.style.display = y[2].el.style.display = "block",
                        i.focus && a.focus(),
                        Qa()
                    }),
                    f.setContent(y[1], m),
                    f.updateCurrItem(),
                    Da("afterInit"),
                    va || (w = setInterval(function() {
                        _a || V || aa || s !== f.currItem.initialZoomLevel || f.updateSize()
                    },
                    1e3)),
                    e.addClass(a, "pswp--visible")
                }
            },
            close: function() {
                j && (j = !1, k = !0, Da("close"), Ra(), cc(f.currItem, null, !0, f.destroy))
            },
            destroy: function() {
                Da("destroy"),
                Xb && clearTimeout(Xb),
                a.setAttribute("aria-hidden", "true"),
                a.className = J,
                w && clearInterval(w),
                e.unbind(f.scrollWrap, q, f),
                e.unbind(window, "scroll", f),
                zb(),
                cb(),
                Ba = null
            },
            panTo: function(a, b, c) {
                c || (a > da.min.x ? a = da.min.x: a < da.max.x && (a = da.max.x), b > da.min.y ? b = da.min.y: b < da.max.y && (b = da.max.y)),
                pa.x = a,
                pa.y = b,
                Ha()
            },
            handleEvent: function(a) {
                a = a || window.event,
                r[a.type] && r[a.type](a)
            },
            goTo: function(a) {
                a = Aa(a);
                var b = a - m;
                ua = b,
                m = a,
                f.currItem = _b(m),
                ra -= b,
                Ka(ta.x * ra),
                cb(),
                fa = !1,
                f.updateCurrItem()
            },
            next: function() {
                f.goTo(m + 1)
            },
            prev: function() {
                f.goTo(m - 1)
            },
            updateCurrZoomItem: function(a) {
                if (a && Da("beforeChange", 0), y[1].el.children.length) {
                    var b = y[1].el.children[0];
                    ea = e.hasClass(b, "pswp__zoom-wrap") ? b.style: null
                } else ea = null;
                da = f.currItem.bounds,
                t = s = f.currItem.initialZoomLevel,
                pa.x = da.center.x,
                pa.y = da.center.y,
                a && Da("afterChange")
            },
            invalidateCurrItems: function() {
                x = !0;
                for (var a = 0; a < h; a++) y[a].item && (y[a].item.needsUpdate = !0)
            },
            updateCurrItem: function(a) {
                if (0 !== ua) {
                    var b, c = Math.abs(ua);
                    if (! (a && c < 2)) {
                        f.currItem = _b(m),
                        ya = !1,
                        Da("beforeChange", ua),
                        c >= h && (o += ua + (ua > 0 ? -h: h), c = h);
                        for (var d = 0; d < c; d++) ua > 0 ? (b = y.shift(), y[h - 1] = b, o++, Ja((o + 2) * ta.x, b.el.style), f.setContent(b, m - c + d + 1 + 1)) : (b = y.pop(), y.unshift(b), o--, Ja(o * ta.x, b.el.style), f.setContent(b, m + c - d - 1 - 1));
                        if (ea && 1 === Math.abs(ua)) {
                            var e = _b(z);
                            e.initialZoomLevel !== s && (ic(e, qa), mc(e), Ia(e))
                        }
                        ua = 0,
                        f.updateCurrZoomItem(),
                        z = m,
                        Da("afterChange")
                    }
                }
            },
            updateSize: function(b) {
                if (!va && i.modal) {
                    var c = e.getScrollY();
                    if (M !== c && (a.style.top = c + "px", M = c), !b && xa.x === window.innerWidth && xa.y === window.innerHeight) return;
                    xa.x = window.innerWidth,
                    xa.y = window.innerHeight,
                    a.style.height = xa.y + "px"
                }
                if (qa.x = f.scrollWrap.clientWidth, qa.y = f.scrollWrap.clientHeight, Za(), ta.x = qa.x + Math.round(qa.x * i.spacing), ta.y = qa.y, Ka(ta.x * ra), Da("beforeResize"), void 0 !== o) {
                    for (var d, g, j, k = 0; k < h; k++) d = y[k],
                    Ja((k + o) * ta.x, d.el.style),
                    j = m + k - 1,
                    i.loop && ac() > 2 && (j = Aa(j)),
                    g = _b(j),
                    g && (x || g.needsUpdate || !g.bounds) ? (f.cleanSlide(g), f.setContent(d, j), 1 === k && (f.currItem = g, f.updateCurrZoomItem(!0)), g.needsUpdate = !1) : d.index === -1 && j >= 0 && f.setContent(d, j),
                    g && g.container && (ic(g, qa), mc(g), Ia(g));
                    x = !1
                }
                t = s = f.currItem.initialZoomLevel,
                da = f.currItem.bounds,
                da && (pa.x = da.center.x, pa.y = da.center.y, Ha(!0)),
                Da("resize")
            },
            zoomTo: function(a, b, c, d, f) {
                b && (t = s, ub.x = Math.abs(b.x) - pa.x, ub.y = Math.abs(b.y) - pa.y, Ma(oa, pa));
                var g = Sa(a, !1),
                h = {};
                Va("x", g, h, a),
                Va("y", g, h, a);
                var i = s,
                j = {
                    x: pa.x,
                    y: pa.y
                };
                Na(h);
                var k = function(b) {
                    1 === b ? (s = a, pa.x = h.x, pa.y = h.y) : (s = (a - i) * b + i, pa.x = (h.x - j.x) * b + j.x, pa.y = (h.y - j.y) * b + j.y),
                    f && f(b),
                    Ha(1 === b)
                };
                c ? db("customZoomTo", 0, 1, c, d || e.easing.sine.inOut, k) : k(1)
            }
        },
        fb = 30,
        gb = 10,
        hb = {},
        ib = {},
        jb = {},
        kb = {},
        lb = {},
        mb = [],
        nb = {},
        ob = [],
        pb = {},
        qb = 0,
        rb = ma(),
        sb = 0,
        tb = ma(),
        ub = ma(),
        vb = ma(),
        wb = function(a, b) {
            return a.x === b.x && a.y === b.y
        },
        xb = function(a, b) {
            return Math.abs(a.x - b.x) < g && Math.abs(a.y - b.y) < g
        },
        yb = function(a, b) {
            return pb.x = Math.abs(a.x - b.x),
            pb.y = Math.abs(a.y - b.y),
            Math.sqrt(pb.x * pb.x + pb.y * pb.y)
        },
        zb = function() {
            Z && (I(Z), Z = null)
        },
        Ab = function() {
            V && (Z = H(Ab), Qb())
        },
        Bb = function() {
            return ! ("fit" === i.scaleMode && s === f.currItem.initialZoomLevel)
        },
        Cb = function(a, b) {
            return ! (!a || a === document) && (!(a.getAttribute("class") && a.getAttribute("class").indexOf("pswp__scroll-wrap") > -1) && (b(a) ? a: Cb(a.parentNode, b)))
        },
        Db = {},
        Eb = function(a, b) {
            return Db.prevent = !Cb(a.target, i.isClickableElement),
            Da("preventDragEvent", a, b, Db),
            Db.prevent
        },
        Fb = function(a, b) {
            return b.x = a.pageX,
            b.y = a.pageY,
            b.id = a.identifier,
            b
        },
        Gb = function(a, b, c) {
            c.x = .5 * (a.x + b.x),
            c.y = .5 * (a.y + b.y)
        },
        Hb = function(a, b, c) {
            if (a - Q > 50) {
                var d = ob.length > 2 ? ob.shift() : {};
                d.x = b,
                d.y = c,
                ob.push(d),
                Q = a
            }
        },
        Ib = function() {
            var a = pa.y - f.currItem.initialPosition.y;
            return 1 - Math.abs(a / (qa.y / 2))
        },
        Jb = {},
        Kb = {},
        Lb = [],
        Mb = function(a) {
            for (; Lb.length > 0;) Lb.pop();
            return F ? (la = 0, mb.forEach(function(a) {
                0 === la ? Lb[0] = a: 1 === la && (Lb[1] = a),
                la++
            })) : a.type.indexOf("touch") > -1 ? a.touches && a.touches.length > 0 && (Lb[0] = Fb(a.touches[0], Jb), a.touches.length > 1 && (Lb[1] = Fb(a.touches[1], Kb))) : (Jb.x = a.pageX, Jb.y = a.pageY, Jb.id = "", Lb[0] = Jb),
            Lb
        },
        Nb = function(a, b) {
            var c, d, e, g, h = 0,
            j = pa[a] + b[a],
            k = b[a] > 0,
            l = tb.x + b.x,
            m = tb.x - nb.x;
            return c = j > da.min[a] || j < da.max[a] ? i.panEndFriction: 1,
            j = pa[a] + b[a] * c,
            !i.allowPanToNext && s !== f.currItem.initialZoomLevel || (ea ? "h" !== ga || "x" !== a || X || (k ? (j > da.min[a] && (c = i.panEndFriction, h = da.min[a] - j, d = da.min[a] - oa[a]), (d <= 0 || m < 0) && ac() > 1 ? (g = l, m < 0 && l > nb.x && (g = nb.x)) : da.min.x !== da.max.x && (e = j)) : (j < da.max[a] && (c = i.panEndFriction, h = j - da.max[a], d = oa[a] - da.max[a]), (d <= 0 || m > 0) && ac() > 1 ? (g = l, m > 0 && l < nb.x && (g = nb.x)) : da.min.x !== da.max.x && (e = j))) : g = l, "x" !== a) ? void(fa || $ || s > f.currItem.fitRatio && (pa[a] += b[a] * c)) : (void 0 !== g && (Ka(g, !0), $ = g !== nb.x), da.min.x !== da.max.x && (void 0 !== e ? pa.x = e: $ || (pa.x += b.x * c)), void 0 !== g)
        },
        Ob = function(a) {
            if (! ("mousedown" === a.type && a.button > 0)) {
                if ($b) return void a.preventDefault();
                if (!U || "mousedown" !== a.type) {
                    if (Eb(a, !0) && a.preventDefault(), Da("pointerDown"), F) {
                        var b = e.arraySearch(mb, a.pointerId, "id");
                        b < 0 && (b = mb.length),
                        mb[b] = {
                            x: a.pageX,
                            y: a.pageY,
                            id: a.pointerId
                        }
                    }
                    var c = Mb(a),
                    d = c.length;
                    _ = null,
                    cb(),
                    V && 1 !== d || (V = ha = !0, e.bind(window, p, f), S = ka = ia = T = $ = Y = W = X = !1, ga = null, Da("firstTouchStart", c), Ma(oa, pa), na.x = na.y = 0, Ma(kb, c[0]), Ma(lb, kb), nb.x = ta.x * ra, ob = [{
                        x: kb.x,
                        y: kb.y
                    }], Q = P = Ea(), Sa(s, !0), zb(), Ab()),
                    !aa && d > 1 && !fa && !$ && (t = s, X = !1, aa = W = !0, na.y = na.x = 0, Ma(oa, pa), Ma(hb, c[0]), Ma(ib, c[1]), Gb(hb, ib, vb), ub.x = Math.abs(vb.x) - pa.x, ub.y = Math.abs(vb.y) - pa.y, ba = ca = yb(hb, ib))
                }
            }
        },
        Pb = function(a) {
            if (a.preventDefault(), F) {
                var b = e.arraySearch(mb, a.pointerId, "id");
                if (b > -1) {
                    var c = mb[b];
                    c.x = a.pageX,
                    c.y = a.pageY
                }
            }
            if (V) {
                var d = Mb(a);
                if (ga || Y || aa) _ = d;
                else if (tb.x !== ta.x * ra) ga = "h";
                else {
                    var f = Math.abs(d[0].x - kb.x) - Math.abs(d[0].y - kb.y);
                    Math.abs(f) >= gb && (ga = f > 0 ? "h": "v", _ = d)
                }
            }
        },
        Qb = function() {
            if (_) {
                var a = _.length;
                if (0 !== a) if (Ma(hb, _[0]), jb.x = hb.x - kb.x, jb.y = hb.y - kb.y, aa && a > 1) {
                    if (kb.x = hb.x, kb.y = hb.y, !jb.x && !jb.y && wb(_[1], ib)) return;
                    Ma(ib, _[1]),
                    X || (X = !0, Da("zoomGestureStarted"));
                    var b = yb(hb, ib),
                    c = Vb(b);
                    c > f.currItem.initialZoomLevel + f.currItem.initialZoomLevel / 15 && (ka = !0);
                    var d = 1,
                    e = Ta(),
                    g = Ua();
                    if (c < e) if (i.pinchToClose && !ka && t <= f.currItem.initialZoomLevel) {
                        var h = e - c,
                        j = 1 - h / (e / 1.2);
                        Fa(j),
                        Da("onPinchClose", j),
                        ia = !0
                    } else d = (e - c) / e,
                    d > 1 && (d = 1),
                    c = e - d * (e / 3);
                    else c > g && (d = (c - g) / (6 * e), d > 1 && (d = 1), c = g + d * e);
                    d < 0 && (d = 0),
                    ba = b,
                    Gb(hb, ib, rb),
                    na.x += rb.x - vb.x,
                    na.y += rb.y - vb.y,
                    Ma(vb, rb),
                    pa.x = La("x", c),
                    pa.y = La("y", c),
                    S = c > s,
                    s = c,
                    Ha()
                } else {
                    if (!ga) return;
                    if (ha && (ha = !1, Math.abs(jb.x) >= gb && (jb.x -= _[0].x - lb.x), Math.abs(jb.y) >= gb && (jb.y -= _[0].y - lb.y)), kb.x = hb.x, kb.y = hb.y, 0 === jb.x && 0 === jb.y) return;
                    if ("v" === ga && i.closeOnVerticalDrag && !Bb()) {
                        na.y += jb.y,
                        pa.y += jb.y;
                        var k = Ib();
                        return T = !0,
                        Da("onVerticalDrag", k),
                        Fa(k),
                        void Ha()
                    }
                    Hb(Ea(), hb.x, hb.y),
                    Y = !0,
                    da = f.currItem.bounds;
                    var l = Nb("x", jb);
                    l || (Nb("y", jb), Na(pa), Ha())
                }
            }
        },
        Rb = function(a) {
            if (N.isOldAndroid) {
                if (U && "mouseup" === a.type) return;
                a.type.indexOf("touch") > -1 && (clearTimeout(U), U = setTimeout(function() {
                    U = 0
                },
                600))
            }
            Da("pointerUp"),
            Eb(a, !1) && a.preventDefault();
            var b;
            if (F) {
                var c = e.arraySearch(mb, a.pointerId, "id");
                if (c > -1) if (b = mb.splice(c, 1)[0], navigator.pointerEnabled) b.type = a.pointerType || "mouse";
                else {
                    var d = {
                        4 : "mouse",
                        2 : "touch",
                        3 : "pen"
                    };
                    b.type = d[a.pointerType],
                    b.type || (b.type = a.pointerType || "mouse")
                }
            }
            var g, h = Mb(a),
            j = h.length;
            if ("mouseup" === a.type && (j = 0), 2 === j) return _ = null,
            !0;
            1 === j && Ma(lb, h[0]),
            0 !== j || ga || fa || (b || ("mouseup" === a.type ? b = {
                x: a.pageX,
                y: a.pageY,
                type: "mouse"
            }: a.changedTouches && a.changedTouches[0] && (b = {
                x: a.changedTouches[0].pageX,
                y: a.changedTouches[0].pageY,
                type: "touch"
            })), Da("touchRelease", a, b));
            var k = -1;
            if (0 === j && (V = !1, e.unbind(window, p, f), zb(), aa ? k = 0 : sb !== -1 && (k = Ea() - sb)), sb = 1 === j ? Ea() : -1, g = k !== -1 && k < 150 ? "zoom": "swipe", aa && j < 2 && (aa = !1, 1 === j && (g = "zoomPointerUp"), Da("zoomGestureEnded")), _ = null, Y || X || fa || T) if (cb(), R || (R = Sb()), R.calculateSwipeSpeed("x"), T) {
                var l = Ib();
                if (l < i.verticalDragRange) f.close();
                else {
                    var m = pa.y,
                    n = ja;
                    db("verticalDrag", 0, 1, 300, e.easing.cubic.out,
                    function(a) {
                        pa.y = (f.currItem.initialPosition.y - m) * a + m,
                        Fa((1 - n) * a + n),
                        Ha()
                    }),
                    Da("onVerticalDrag", 1)
                }
            } else {
                if (($ || fa) && 0 === j) {
                    var o = Ub(g, R);
                    if (o) return;
                    g = "zoomPointerUp"
                }
                if (!fa) return "swipe" !== g ? void Wb() : void(!$ && s > f.currItem.fitRatio && Tb(R))
            }
        },
        Sb = function() {
            var a, b, c = {
                lastFlickOffset: {},
                lastFlickDist: {},
                lastFlickSpeed: {},
                slowDownRatio: {},
                slowDownRatioReverse: {},
                speedDecelerationRatio: {},
                speedDecelerationRatioAbs: {},
                distanceOffset: {},
                backAnimDestination: {},
                backAnimStarted: {},
                calculateSwipeSpeed: function(d) {
                    ob.length > 1 ? (a = Ea() - Q + 50, b = ob[ob.length - 2][d]) : (a = Ea() - P, b = lb[d]),
                    c.lastFlickOffset[d] = kb[d] - b,
                    c.lastFlickDist[d] = Math.abs(c.lastFlickOffset[d]),
                    c.lastFlickDist[d] > 20 ? c.lastFlickSpeed[d] = c.lastFlickOffset[d] / a: c.lastFlickSpeed[d] = 0,
                    Math.abs(c.lastFlickSpeed[d]) < .1 && (c.lastFlickSpeed[d] = 0),
                    c.slowDownRatio[d] = .95,
                    c.slowDownRatioReverse[d] = 1 - c.slowDownRatio[d],
                    c.speedDecelerationRatio[d] = 1
                },
                calculateOverBoundsAnimOffset: function(a, b) {
                    c.backAnimStarted[a] || (pa[a] > da.min[a] ? c.backAnimDestination[a] = da.min[a] : pa[a] < da.max[a] && (c.backAnimDestination[a] = da.max[a]), void 0 !== c.backAnimDestination[a] && (c.slowDownRatio[a] = .7, c.slowDownRatioReverse[a] = 1 - c.slowDownRatio[a], c.speedDecelerationRatioAbs[a] < .05 && (c.lastFlickSpeed[a] = 0, c.backAnimStarted[a] = !0, db("bounceZoomPan" + a, pa[a], c.backAnimDestination[a], b || 300, e.easing.sine.out,
                    function(b) {
                        pa[a] = b,
                        Ha()
                    }))))
                },
                calculateAnimOffset: function(a) {
                    c.backAnimStarted[a] || (c.speedDecelerationRatio[a] = c.speedDecelerationRatio[a] * (c.slowDownRatio[a] + c.slowDownRatioReverse[a] - c.slowDownRatioReverse[a] * c.timeDiff / 10), c.speedDecelerationRatioAbs[a] = Math.abs(c.lastFlickSpeed[a] * c.speedDecelerationRatio[a]), c.distanceOffset[a] = c.lastFlickSpeed[a] * c.speedDecelerationRatio[a] * c.timeDiff, pa[a] += c.distanceOffset[a])
                },
                panAnimLoop: function() {
                    if ($a.zoomPan && ($a.zoomPan.raf = H(c.panAnimLoop), c.now = Ea(), c.timeDiff = c.now - c.lastNow, c.lastNow = c.now, c.calculateAnimOffset("x"), c.calculateAnimOffset("y"), Ha(), c.calculateOverBoundsAnimOffset("x"), c.calculateOverBoundsAnimOffset("y"), c.speedDecelerationRatioAbs.x < .05 && c.speedDecelerationRatioAbs.y < .05)) return pa.x = Math.round(pa.x),
                    pa.y = Math.round(pa.y),
                    Ha(),
                    void ab("zoomPan")
                }
            };
            return c
        },
        Tb = function(a) {
            return a.calculateSwipeSpeed("y"),
            da = f.currItem.bounds,
            a.backAnimDestination = {},
            a.backAnimStarted = {},
            Math.abs(a.lastFlickSpeed.x) <= .05 && Math.abs(a.lastFlickSpeed.y) <= .05 ? (a.speedDecelerationRatioAbs.x = a.speedDecelerationRatioAbs.y = 0, a.calculateOverBoundsAnimOffset("x"), a.calculateOverBoundsAnimOffset("y"), !0) : (bb("zoomPan"), a.lastNow = Ea(), void a.panAnimLoop())
        },
        Ub = function(a, b) {
            var c;
            fa || (qb = m);
            var d;
            if ("swipe" === a) {
                var g = kb.x - lb.x,
                h = b.lastFlickDist.x < 10;
                g > fb && (h || b.lastFlickOffset.x > 20) ? d = -1 : g < -fb && (h || b.lastFlickOffset.x < -20) && (d = 1)
            }
            var j;
            d && (m += d, m < 0 ? (m = i.loop ? ac() - 1 : 0, j = !0) : m >= ac() && (m = i.loop ? 0 : ac() - 1, j = !0), j && !i.loop || (ua += d, ra -= d, c = !0));
            var k, l = ta.x * ra,
            n = Math.abs(l - tb.x);
            return c || l > tb.x == b.lastFlickSpeed.x > 0 ? (k = Math.abs(b.lastFlickSpeed.x) > 0 ? n / Math.abs(b.lastFlickSpeed.x) : 333, k = Math.min(k, 400), k = Math.max(k, 250)) : k = 333,
            qb === m && (c = !1),
            fa = !0,
            Da("mainScrollAnimStart"),
            db("mainScroll", tb.x, l, k, e.easing.cubic.out, Ka,
            function() {
                cb(),
                fa = !1,
                qb = -1,
                (c || qb !== m) && f.updateCurrItem(),
                Da("mainScrollAnimComplete")
            }),
            c && f.updateCurrItem(!0),
            c
        },
        Vb = function(a) {
            return 1 / ca * a * t
        },
        Wb = function() {
            var a = s,
            b = Ta(),
            c = Ua();
            s < b ? a = b: s > c && (a = c);
            var d, g = 1,
            h = ja;
            return ia && !S && !ka && s < b ? (f.close(), !0) : (ia && (d = function(a) {
                Fa((g - h) * a + h)
            }), f.zoomTo(a, 0, 200, e.easing.cubic.out, d), !0)
        };
        za("Gestures", {
            publicMethods: {
                initGestures: function() {
                    var a = function(a, b, c, d, e) {
                        A = a + b,
                        B = a + c,
                        C = a + d,
                        D = e ? a + e: ""
                    };
                    F = N.pointerEvent,
                    F && N.touch && (N.touch = !1),
                    F ? navigator.pointerEnabled ? a("pointer", "down", "move", "up", "cancel") : a("MSPointer", "Down", "Move", "Up", "Cancel") : N.touch ? (a("touch", "start", "move", "end", "cancel"), G = !0) : a("mouse", "down", "move", "up"),
                    p = B + " " + C + " " + D,
                    q = A,
                    F && !G && (G = navigator.maxTouchPoints > 1 || navigator.msMaxTouchPoints > 1),
                    f.likelyTouchDevice = G,
                    r[A] = Ob,
                    r[B] = Pb,
                    r[C] = Rb,
                    D && (r[D] = r[C]),
                    N.touch && (q += " mousedown", p += " mousemove mouseup", r.mousedown = r[A], r.mousemove = r[B], r.mouseup = r[C]),
                    G || (i.allowPanToNext = !1)
                }
            }
        });
        var Xb, Yb, Zb, $b, _b, ac, bc, cc = function(b, c, d, g) {
            Xb && clearTimeout(Xb),
            $b = !0,
            Zb = !0;
            var h;
            b.initialLayout ? (h = b.initialLayout, b.initialLayout = null) : h = i.getThumbBoundsFn && i.getThumbBoundsFn(m);
            var j = d ? i.hideAnimationDuration: i.showAnimationDuration,
            k = function() {
                ab("initialZoom"),
                d ? (f.template.removeAttribute("style"), f.bg.removeAttribute("style")) : (Fa(1), c && (c.style.display = "block"), e.addClass(a, "pswp--animated-in"), Da("initialZoom" + (d ? "OutEnd": "InEnd"))),
                g && g(),
                $b = !1
            };
            if (!j || !h || void 0 === h.x) return Da("initialZoom" + (d ? "Out": "In")),
            s = b.initialZoomLevel,
            Ma(pa, b.initialPosition),
            Ha(),
            a.style.opacity = d ? 0 : 1,
            Fa(1),
            void(j ? setTimeout(function() {
                k()
            },
            j) : k());
            var n = function() {
                var c = l,
                g = !f.currItem.src || f.currItem.loadError || i.showHideOpacity;
                b.miniImg && (b.miniImg.style.webkitBackfaceVisibility = "hidden"),
                d || (s = h.w / b.w, pa.x = h.x, pa.y = h.y - K, f[g ? "template": "bg"].style.opacity = .001, Ha()),
                bb("initialZoom"),
                d && !c && e.removeClass(a, "pswp--animated-in"),
                g && (d ? e[(c ? "remove": "add") + "Class"](a, "pswp--animate_opacity") : setTimeout(function() {
                    e.addClass(a, "pswp--animate_opacity")
                },
                30)),
                Xb = setTimeout(function() {
                    if (Da("initialZoom" + (d ? "Out": "In")), d) {
                        var f = h.w / b.w,
                        i = {
                            x: pa.x,
                            y: pa.y
                        },
                        l = s,
                        m = ja,
                        n = function(b) {
                            1 === b ? (s = f, pa.x = h.x, pa.y = h.y - M) : (s = (f - l) * b + l, pa.x = (h.x - i.x) * b + i.x, pa.y = (h.y - M - i.y) * b + i.y),
                            Ha(),
                            g ? a.style.opacity = 1 - b: Fa(m - b * m)
                        };
                        c ? db("initialZoom", 0, 1, j, e.easing.cubic.out, n, k) : (n(1), Xb = setTimeout(k, j + 20))
                    } else s = b.initialZoomLevel,
                    Ma(pa, b.initialPosition),
                    Ha(),
                    Fa(1),
                    g ? a.style.opacity = 1 : Fa(1),
                    Xb = setTimeout(k, j + 20)
                },
                d ? 25 : 90)
            };
            n()
        },
        dc = {},
        ec = [],
        fc = {
            index: 0,
            errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
            forceProgressiveLoading: !1,
            preload: [1, 1],
            getNumItemsFn: function() {
                return Yb.length
            }
        },
        gc = function() {
            return {
                center: {
                    x: 0,
                    y: 0
                },
                max: {
                    x: 0,
                    y: 0
                },
                min: {
                    x: 0,
                    y: 0
                }
            }
        },
        hc = function(a, b, c) {
            var d = a.bounds;
            d.center.x = Math.round((dc.x - b) / 2),
            d.center.y = Math.round((dc.y - c) / 2) + a.vGap.top,
            d.max.x = b > dc.x ? Math.round(dc.x - b) : d.center.x,
            d.max.y = c > dc.y ? Math.round(dc.y - c) + a.vGap.top: d.center.y,
            d.min.x = b > dc.x ? 0 : d.center.x,
            d.min.y = c > dc.y ? a.vGap.top: d.center.y
        },
        ic = function(a, b, c) {
            if (a.src && !a.loadError) {
                var d = !c;
                if (d && (a.vGap || (a.vGap = {
                    top: 0,
                    bottom: 0
                }), Da("parseVerticalMargin", a)), dc.x = b.x, dc.y = b.y - a.vGap.top - a.vGap.bottom, d) {
                    var e = dc.x / a.w,
                    f = dc.y / a.h;
                    a.fitRatio = e < f ? e: f;
                    var g = i.scaleMode;
                    "orig" === g ? c = 1 : "fit" === g && (c = a.fitRatio),
                    c > 1 && (c = 1),
                    a.initialZoomLevel = c,
                    a.bounds || (a.bounds = gc())
                }
                if (!c) return;
                return hc(a, a.w * c, a.h * c),
                d && c === a.initialZoomLevel && (a.initialPosition = a.bounds.center),
                a.bounds
            }
            return a.w = a.h = 0,
            a.initialZoomLevel = a.fitRatio = 1,
            a.bounds = gc(),
            a.initialPosition = a.bounds.center,
            a.bounds
        },
        jc = function(a, b, c, d, e, g) {
            b.loadError || d && (b.imageAppended = !0, mc(b, d, b === f.currItem && ya), c.appendChild(d), g && setTimeout(function() {
                b && b.loaded && b.placeholder && (b.placeholder.style.display = "none", b.placeholder = null)
            },
            500))
        },
        kc = function(a) {
            a.loading = !0,
            a.loaded = !1;
            var b = a.img = e.createEl("pswp__img", "img"),
            c = function() {
                a.loading = !1,
                a.loaded = !0,
                a.loadComplete ? a.loadComplete(a) : a.img = null,
                b.onload = b.onerror = null,
                b = null
            };
            return b.onload = c,
            b.onerror = function() {
                a.loadError = !0,
                c()
            },
            b.src = a.src,
            b
        },
        lc = function(a, b) {
            if (a.src && a.loadError && a.container) return b && (a.container.innerHTML = ""),
            a.container.innerHTML = i.errorMsg.replace("%url%", a.src),
            !0
        },
        mc = function(a, b, c) {
            if (a.src) {
                b || (b = a.container.lastChild);
                var d = c ? a.w: Math.round(a.w * a.fitRatio),
                e = c ? a.h: Math.round(a.h * a.fitRatio);
                a.placeholder && !a.loaded && (a.placeholder.style.width = d + "px", a.placeholder.style.height = e + "px"),
                b.style.width = d + "px",
                b.style.height = e + "px"
            }
        },
        nc = function() {
            if (ec.length) {
                for (var a, b = 0; b < ec.length; b++) a = ec[b],
                a.holder.index === a.index && jc(a.index, a.item, a.baseDiv, a.img, !1, a.clearPlaceholder);
                ec = []
            }
        };
        za("Controller", {
            publicMethods: {
                lazyLoadItem: function(a) {
                    a = Aa(a);
                    var b = _b(a);
                    b && (!b.loaded && !b.loading || x) && (Da("gettingData", a, b), b.src && kc(b))
                },
                initController: function() {
                    e.extend(i, fc, !0),
                    f.items = Yb = c,
                    _b = f.getItemAt,
                    ac = i.getNumItemsFn,
                    bc = i.loop,
                    ac() < 3 && (i.loop = !1),
                    Ca("beforeChange",
                    function(a) {
                        var b, c = i.preload,
                        d = null === a || a >= 0,
                        e = Math.min(c[0], ac()),
                        g = Math.min(c[1], ac());
                        for (b = 1; b <= (d ? g: e); b++) f.lazyLoadItem(m + b);
                        for (b = 1; b <= (d ? e: g); b++) f.lazyLoadItem(m - b)
                    }),
                    Ca("initialLayout",
                    function() {
                        f.currItem.initialLayout = i.getThumbBoundsFn && i.getThumbBoundsFn(m)
                    }),
                    Ca("mainScrollAnimComplete", nc),
                    Ca("initialZoomInEnd", nc),
                    Ca("destroy",
                    function() {
                        for (var a, b = 0; b < Yb.length; b++) a = Yb[b],
                        a.container && (a.container = null),
                        a.placeholder && (a.placeholder = null),
                        a.img && (a.img = null),
                        a.preloader && (a.preloader = null),
                        a.loadError && (a.loaded = a.loadError = !1);
                        ec = null
                    })
                },
                getItemAt: function(a) {
                    return a >= 0 && (void 0 !== Yb[a] && Yb[a])
                },
                allowProgressiveImg: function() {
                    return i.forceProgressiveLoading || !G || i.mouseUsed || screen.width > 1200
                },
                setContent: function(a, b) {
                    i.loop && (b = Aa(b));
                    var c = f.getItemAt(a.index);
                    c && (c.container = null);
                    var d, g = f.getItemAt(b);
                    if (!g) return void(a.el.innerHTML = "");
                    Da("gettingData", b, g),
                    a.index = b,
                    a.item = g;
                    var h = g.container = e.createEl("pswp__zoom-wrap");
                    if (!g.src && g.html && (g.html.tagName ? h.appendChild(g.html) : h.innerHTML = g.html), lc(g), ic(g, qa), !g.src || g.loadError || g.loaded) g.src && !g.loadError && (d = e.createEl("pswp__img", "img"), d.style.opacity = 1, d.src = g.src, mc(g, d), jc(b, g, h, d, !0));
                    else {
                        if (g.loadComplete = function(c) {
                            if (j) {
                                if (a && a.index === b) {
                                    if (lc(c, !0)) return c.loadComplete = c.img = null,
                                    ic(c, qa),
                                    Ia(c),
                                    void(a.index === m && f.updateCurrZoomItem());
                                    c.imageAppended ? !$b && c.placeholder && (c.placeholder.style.display = "none", c.placeholder = null) : N.transform && (fa || $b) ? ec.push({
                                        item: c,
                                        baseDiv: h,
                                        img: c.img,
                                        index: b,
                                        holder: a,
                                        clearPlaceholder: !0
                                    }) : jc(b, c, h, c.img, fa || $b, !0)
                                }
                                c.loadComplete = null,
                                c.img = null,
                                Da("imageLoadComplete", b, c)
                            }
                        },
                        e.features.transform) {
                            var k = "pswp__img pswp__img--placeholder";
                            k += g.msrc ? "": " pswp__img--placeholder--blank";
                            var l = e.createEl(k, g.msrc ? "img": "");
                            g.msrc && (l.src = g.msrc),
                            mc(g, l),
                            h.appendChild(l),
                            g.placeholder = l
                        }
                        g.loading || kc(g),
                        f.allowProgressiveImg() && (!Zb && N.transform ? ec.push({
                            item: g,
                            baseDiv: h,
                            img: g.img,
                            index: b,
                            holder: a
                        }) : jc(b, g, h, g.img, !0, !0))
                    }
                    Zb || b !== m ? Ia(g) : (ea = h.style, cc(g, d || g.img)),
                    a.el.innerHTML = "",
                    a.el.appendChild(h)
                },
                cleanSlide: function(a) {
                    a.img && (a.img.onload = a.img.onerror = null),
                    a.loaded = a.loading = a.img = a.imageAppended = !1
                }
            }
        });
        var oc, pc = {},
        qc = function(a, b, c) {
            var d = document.createEvent("CustomEvent"),
            e = {
                origEvent: a,
                target: a.target,
                releasePoint: b,
                pointerType: c || "touch"
            };
            d.initCustomEvent("pswpTap", !0, !0, e),
            a.target.dispatchEvent(d)
        };
        za("Tap", {
            publicMethods: {
                initTap: function() {
                    Ca("firstTouchStart", f.onTapStart),
                    Ca("touchRelease", f.onTapRelease),
                    Ca("destroy",
                    function() {
                        pc = {},
                        oc = null
                    })
                },
                onTapStart: function(a) {
                    a.length > 1 && (clearTimeout(oc), oc = null)
                },
                onTapRelease: function(a, b) {
                    if (b && !Y && !W && !_a) {
                        var c = b;
                        if (oc && (clearTimeout(oc), oc = null, xb(c, pc))) return void Da("doubleTap", c);
                        if ("mouse" === b.type) return void qc(a, b, "mouse");
                        var d = a.target.tagName.toUpperCase();
                        if ("BUTTON" === d || e.hasClass(a.target, "pswp__single-tap")) return void qc(a, b);
                        Ma(pc, c),
                        oc = setTimeout(function() {
                            qc(a, b),
                            oc = null
                        },
                        300)
                    }
                }
            }
        });
        var rc;
        za("DesktopZoom", {
            publicMethods: {
                initDesktopZoom: function() {
                    L || (G ? Ca("mouseUsed",
                    function() {
                        f.setupDesktopZoom()
                    }) : f.setupDesktopZoom(!0))
                },
                setupDesktopZoom: function(b) {
                    rc = {};
                    var c = "wheel mousewheel DOMMouseScroll";
                    Ca("bindEvents",
                    function() {
                        e.bind(a, c, f.handleMouseWheel)
                    }),
                    Ca("unbindEvents",
                    function() {
                        rc && e.unbind(a, c, f.handleMouseWheel)
                    }),
                    f.mouseZoomedIn = !1;
                    var d, g = function() {
                        f.mouseZoomedIn && (e.removeClass(a, "pswp--zoomed-in"), f.mouseZoomedIn = !1),
                        s < 1 ? e.addClass(a, "pswp--zoom-allowed") : e.removeClass(a, "pswp--zoom-allowed"),
                        h()
                    },
                    h = function() {
                        d && (e.removeClass(a, "pswp--dragging"), d = !1)
                    };
                    Ca("resize", g),
                    Ca("afterChange", g),
                    Ca("pointerDown",
                    function() {
                        f.mouseZoomedIn && (d = !0, e.addClass(a, "pswp--dragging"))
                    }),
                    Ca("pointerUp", h),
                    b || g()
                },
                handleMouseWheel: function(a) {
                    if (s <= f.currItem.fitRatio) return i.modal && (!i.closeOnScroll || _a || V ? a.preventDefault() : E && Math.abs(a.deltaY) > 2 && (l = !0, f.close())),
                    !0;
                    if (a.stopPropagation(), rc.x = 0, "deltaX" in a) 1 === a.deltaMode ? (rc.x = 18 * a.deltaX, rc.y = 18 * a.deltaY) : (rc.x = a.deltaX, rc.y = a.deltaY);
                    else if ("wheelDelta" in a) a.wheelDeltaX && (rc.x = -.16 * a.wheelDeltaX),
                    a.wheelDeltaY ? rc.y = -.16 * a.wheelDeltaY: rc.y = -.16 * a.wheelDelta;
                    else {
                        if (! ("detail" in a)) return;
                        rc.y = a.detail
                    }
                    Sa(s, !0);
                    var b = pa.x - rc.x,
                    c = pa.y - rc.y; (i.modal || b <= da.min.x && b >= da.max.x && c <= da.min.y && c >= da.max.y) && a.preventDefault(),
                    f.panTo(b, c)
                },
                toggleDesktopZoom: function(b) {
                    b = b || {
                        x: qa.x / 2 + sa.x,
                        y: qa.y / 2 + sa.y
                    };
                    var c = i.getDoubleTapZoom(!0, f.currItem),
                    d = s === c;
                    f.mouseZoomedIn = !d,
                    f.zoomTo(d ? f.currItem.initialZoomLevel: c, b, 333),
                    e[(d ? "remove": "add") + "Class"](a, "pswp--zoomed-in")
                }
            }
        });
        var sc, tc, uc, vc, wc, xc, yc, zc, Ac, Bc, Cc, Dc, Ec = {
            history: !0,
            galleryUID: 1
        },
        Fc = function() {
            return Cc.hash.substring(1)
        },
        Gc = function() {
            sc && clearTimeout(sc),
            uc && clearTimeout(uc)
        },
        Hc = function() {
            var a = Fc(),
            b = {};
            if (a.length < 5) return b;
            var c, d = a.split("&");
            for (c = 0; c < d.length; c++) if (d[c]) {
                var e = d[c].split("=");
                e.length < 2 || (b[e[0]] = e[1])
            }
            if (i.galleryPIDs) {
                var f = b.pid;
                for (b.pid = 0, c = 0; c < Yb.length; c++) if (Yb[c].pid === f) {
                    b.pid = c;
                    break
                }
            } else b.pid = parseInt(b.pid, 10) - 1;
            return b.pid < 0 && (b.pid = 0),
            b
        },
        Ic = function() {
            if (uc && clearTimeout(uc), _a || V) return void(uc = setTimeout(Ic, 500));
            vc ? clearTimeout(tc) : vc = !0;
            var a = m + 1,
            b = _b(m);
            b.hasOwnProperty("pid") && (a = b.pid);
            var c = yc + "&gid=" + i.galleryUID + "&pid=" + a;
            zc || Cc.hash.indexOf(c) === -1 && (Bc = !0);
            var d = Cc.href.split("#")[0] + "#" + c;
            Dc ? "#" + c !== window.location.hash && history[zc ? "replaceState": "pushState"]("", document.title, d) : zc ? Cc.replace(d) : Cc.hash = c,
            zc = !0,
            tc = setTimeout(function() {
                vc = !1
            },
            60)
        };
        za("History", {
            publicMethods: {
                initHistory: function() {
                    if (e.extend(i, Ec, !0), i.history) {
                        Cc = window.location,
                        Bc = !1,
                        Ac = !1,
                        zc = !1,
                        yc = Fc(),
                        Dc = "pushState" in history,
                        yc.indexOf("gid=") > -1 && (yc = yc.split("&gid=")[0], yc = yc.split("?gid=")[0]),
                        Ca("afterChange", f.updateURL),
                        Ca("unbindEvents",
                        function() {
                            e.unbind(window, "hashchange", f.onHashChange)
                        });
                        var a = function() {
                            xc = !0,
                            Ac || (Bc ? history.back() : yc ? Cc.hash = yc: Dc ? history.pushState("", document.title, Cc.pathname + Cc.search) : Cc.hash = ""),
                            Gc()
                        };
                        Ca("unbindEvents",
                        function() {
                            l && a()
                        }),
                        Ca("destroy",
                        function() {
                            xc || a()
                        }),
                        Ca("firstUpdate",
                        function() {
                            m = Hc().pid
                        });
                        var b = yc.indexOf("pid=");
                        b > -1 && (yc = yc.substring(0, b), "&" === yc.slice( - 1) && (yc = yc.slice(0, -1))),
                        setTimeout(function() {
                            j && e.bind(window, "hashchange", f.onHashChange)
                        },
                        40)
                    }
                },
                onHashChange: function() {
                    return Fc() === yc ? (Ac = !0, void f.close()) : void(vc || (wc = !0, f.goTo(Hc().pid), wc = !1))
                },
                updateURL: function() {
                    Gc(),
                    wc || (zc ? sc = setTimeout(Ic, 800) : Ic())
                }
            }
        }),
        e.extend(f, eb)
    };
    return a
});