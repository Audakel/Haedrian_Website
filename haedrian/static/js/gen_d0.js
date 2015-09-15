if (function(a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
        if (!a.document)
            throw new Error("jQuery requires a window with a document");
        return b(a)
    }
     : b(a)
}
("undefined" != typeof window ? window : this, function(a, b) {
    function c(a) {
        var b = "length" in a && a.length
          , c = eb.type(a);
        return "function" === c || eb.isWindow(a) ? !1 : 1 === a.nodeType && b ? !0 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
    }
    function d(a, b, c) {
        if (eb.isFunction(b))
            return eb.grep(a, function(a, d) {
                return !!b.call(a, d, a) !== c
            }
            );
        if (b.nodeType)
            return eb.grep(a, function(a) {
                return a === b !== c
            }
            );
        if ("string" == typeof b) {
            if (mb.test(b))
                return eb.filter(b, a, c);
            b = eb.filter(b, a)
        }
        return eb.grep(a, function(a) {
            return eb.inArray(a, b) >= 0 !== c
        }
        )
    }
    function e(a, b) {
        do
            a = a[b];
        while (a && 1 !== a.nodeType);return a
    }
    function f(a) {
        var b = ub[a] = {};
        return eb.each(a.match(tb) || [], function(a, c) {
            b[c] = !0
        }
        ),
        b
    }
    function g() {
        ob.addEventListener ? (ob.removeEventListener("DOMContentLoaded", h, !1),
        a.removeEventListener("load", h, !1)) : (ob.detachEvent("onreadystatechange", h),
        a.detachEvent("onload", h))
    }
    function h() {
        (ob.addEventListener || "load" === event.type || "complete" === ob.readyState) && (g(),
        eb.ready())
    }
    function i(a, b, c) {
        if (void 0 === c && 1 === a.nodeType) {
            var d = "data-" + b.replace(zb, "-$1").toLowerCase();
            if (c = a.getAttribute(d),
            "string" == typeof c) {
                try {
                    c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null  : +c + "" === c ? +c : yb.test(c) ? eb.parseJSON(c) : c
                } catch (e) {}
                eb.data(a, b, c)
            } else
                c = void 0
        }
        return c
    }
    function j(a) {
        var b;
        for (b in a)
            if (("data" !== b || !eb.isEmptyObject(a[b])) && "toJSON" !== b)
                return !1;
        return !0
    }
    function k(a, b, c, d) {
        if (eb.acceptData(a)) {
            var e, f, g = eb.expando, h = a.nodeType, i = h ? eb.cache : a, j = h ? a[g] : a[g] && g;
            if (j && i[j] && (d || i[j].data) || void 0 !== c || "string" != typeof b)
                return j || (j = h ? a[g] = W.pop() || eb.guid++ : g),
                i[j] || (i[j] = h ? {} : {
                    toJSON: eb.noop
                }),
                ("object" == typeof b || "function" == typeof b) && (d ? i[j] = eb.extend(i[j], b) : i[j].data = eb.extend(i[j].data, b)),
                f = i[j],
                d || (f.data || (f.data = {}),
                f = f.data),
                void 0 !== c && (f[eb.camelCase(b)] = c),
                "string" == typeof b ? (e = f[b],
                null  == e && (e = f[eb.camelCase(b)])) : e = f,
                e
        }
    }
    function l(a, b, c) {
        if (eb.acceptData(a)) {
            var d, e, f = a.nodeType, g = f ? eb.cache : a, h = f ? a[eb.expando] : eb.expando;
            if (g[h]) {
                if (b && (d = c ? g[h] : g[h].data)) {
                    eb.isArray(b) ? b = b.concat(eb.map(b, eb.camelCase)) : b in d ? b = [b] : (b = eb.camelCase(b),
                    b = b in d ? [b] : b.split(" ")),
                    e = b.length;
                    for (; e--; )
                        delete d[b[e]];
                    if (c ? !j(d) : !eb.isEmptyObject(d))
                        return
                }
                (c || (delete g[h].data,
                j(g[h]))) && (f ? eb.cleanData([a], !0) : cb.deleteExpando || g != g.window ? delete g[h] : g[h] = null )
            }
        }
    }
    function m() {
        return !0
    }
    function n() {
        return !1
    }
    function o() {
        try {
            return ob.activeElement
        } catch (a) {}
    }
    function p(a) {
        var b = Kb.split("|")
          , c = a.createDocumentFragment();
        if (c.createElement)
            for (; b.length; )
                c.createElement(b.pop());
        return c
    }
    function q(a, b) {
        var c, d, e = 0, f = typeof a.getElementsByTagName !== xb ? a.getElementsByTagName(b || "*") : typeof a.querySelectorAll !== xb ? a.querySelectorAll(b || "*") : void 0;
        if (!f)
            for (f = [],
            c = a.childNodes || a; null  != (d = c[e]); e++)
                !b || eb.nodeName(d, b) ? f.push(d) : eb.merge(f, q(d, b));
        return void 0 === b || b && eb.nodeName(a, b) ? eb.merge([a], f) : f
    }
    function r(a) {
        Eb.test(a.type) && (a.defaultChecked = a.checked)
    }
    function s(a, b) {
        return eb.nodeName(a, "table") && eb.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }
    function t(a) {
        return a.type = (null  !== eb.find.attr(a, "type")) + "/" + a.type,
        a
    }
    function u(a) {
        var b = Vb.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"),
        a
    }
    function v(a, b) {
        for (var c, d = 0; null  != (c = a[d]); d++)
            eb._data(c, "globalEval", !b || eb._data(b[d], "globalEval"))
    }
    function w(a, b) {
        if (1 === b.nodeType && eb.hasData(a)) {
            var c, d, e, f = eb._data(a), g = eb._data(b, f), h = f.events;
            if (h) {
                delete g.handle,
                g.events = {};
                for (c in h)
                    for (d = 0,
                    e = h[c].length; e > d; d++)
                        eb.event.add(b, c, h[c][d])
            }
            g.data && (g.data = eb.extend({}, g.data))
        }
    }
    function x(a, b) {
        var c, d, e;
        if (1 === b.nodeType) {
            if (c = b.nodeName.toLowerCase(),
            !cb.noCloneEvent && b[eb.expando]) {
                e = eb._data(b);
                for (d in e.events)
                    eb.removeEvent(b, d, e.handle);
                b.removeAttribute(eb.expando)
            }
            "script" === c && b.text !== a.text ? (t(b).text = a.text,
            u(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML),
            cb.html5Clone && a.innerHTML && !eb.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && Eb.test(a.type) ? (b.defaultChecked = b.checked = a.checked,
            b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : ("input" === c || "textarea" === c) && (b.defaultValue = a.defaultValue)
        }
    }
    function y(b, c) {
        var d, e = eb(c.createElement(b)).appendTo(c.body), f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : eb.css(e[0], "display");
        return e.detach(),
        f
    }
    function z(a) {
        var b = ob
          , c = _b[a];
        return c || (c = y(a, b),
        "none" !== c && c || ($b = ($b || eb("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),
        b = ($b[0].contentWindow || $b[0].contentDocument).document,
        b.write(),
        b.close(),
        c = y(a, b),
        $b.detach()),
        _b[a] = c),
        c
    }
    function A(a, b) {
        return {
            get: function() {
                var c = a();
                if (null  != c)
                    return c ? void delete this.get : (this.get = b).apply(this, arguments)
            }
        }
    }
    function B(a, b) {
        if (b in a)
            return b;
        for (var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = mc.length; e--; )
            if (b = mc[e] + c,
            b in a)
                return b;
        return d
    }
    function C(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++)
            d = a[g],
            d.style && (f[g] = eb._data(d, "olddisplay"),
            c = d.style.display,
            b ? (f[g] || "none" !== c || (d.style.display = ""),
            "" === d.style.display && Cb(d) && (f[g] = eb._data(d, "olddisplay", z(d.nodeName)))) : (e = Cb(d),
            (c && "none" !== c || !e) && eb._data(d, "olddisplay", e ? c : eb.css(d, "display"))));
        for (g = 0; h > g; g++)
            d = a[g],
            d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
        return a
    }
    function D(a, b, c) {
        var d = ic.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
    }
    function E(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2)
            "margin" === c && (g += eb.css(a, c + Bb[f], !0, e)),
            d ? ("content" === c && (g -= eb.css(a, "padding" + Bb[f], !0, e)),
            "margin" !== c && (g -= eb.css(a, "border" + Bb[f] + "Width", !0, e))) : (g += eb.css(a, "padding" + Bb[f], !0, e),
            "padding" !== c && (g += eb.css(a, "border" + Bb[f] + "Width", !0, e)));
        return g
    }
    function F(a, b, c) {
        var d = !0
          , e = "width" === b ? a.offsetWidth : a.offsetHeight
          , f = ac(a)
          , g = cb.boxSizing && "border-box" === eb.css(a, "boxSizing", !1, f);
        if (0 >= e || null  == e) {
            if (e = bc(a, b, f),
            (0 > e || null  == e) && (e = a.style[b]),
            dc.test(e))
                return e;
            d = g && (cb.boxSizingReliable() || e === a.style[b]),
            e = parseFloat(e) || 0
        }
        return e + E(a, b, c || (g ? "border" : "content"), d, f) + "px"
    }
    function G(a, b, c, d, e) {
        return new G.prototype.init(a,b,c,d,e)
    }
    function H() {
        return setTimeout(function() {
            nc = void 0
        }
        ),
        nc = eb.now()
    }
    function I(a, b) {
        var c, d = {
            height: a
        }, e = 0;
        for (b = b ? 1 : 0; 4 > e; e += 2 - b)
            c = Bb[e],
            d["margin" + c] = d["padding" + c] = a;
        return b && (d.opacity = d.width = a),
        d
    }
    function J(a, b, c) {
        for (var d, e = (tc[b] || []).concat(tc["*"]), f = 0, g = e.length; g > f; f++)
            if (d = e[f].call(c, b, a))
                return d
    }
    function K(a, b, c) {
        var d, e, f, g, h, i, j, k, l = this, m = {}, n = a.style, o = a.nodeType && Cb(a), p = eb._data(a, "fxshow");
        c.queue || (h = eb._queueHooks(a, "fx"),
        null  == h.unqueued && (h.unqueued = 0,
        i = h.empty.fire,
        h.empty.fire = function() {
            h.unqueued || i()
        }
        ),
        h.unqueued++,
        l.always(function() {
            l.always(function() {
                h.unqueued--,
                eb.queue(a, "fx").length || h.empty.fire()
            }
            )
        }
        )),
        1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [n.overflow, n.overflowX, n.overflowY],
        j = eb.css(a, "display"),
        k = "none" === j ? eb._data(a, "olddisplay") || z(a.nodeName) : j,
        "inline" === k && "none" === eb.css(a, "float") && (cb.inlineBlockNeedsLayout && "inline" !== z(a.nodeName) ? n.zoom = 1 : n.display = "inline-block")),
        c.overflow && (n.overflow = "hidden",
        cb.shrinkWrapBlocks() || l.always(function() {
            n.overflow = c.overflow[0],
            n.overflowX = c.overflow[1],
            n.overflowY = c.overflow[2]
        }
        ));
        for (d in b)
            if (e = b[d],
            pc.exec(e)) {
                if (delete b[d],
                f = f || "toggle" === e,
                e === (o ? "hide" : "show")) {
                    if ("show" !== e || !p || void 0 === p[d])
                        continue;o = !0
                }
                m[d] = p && p[d] || eb.style(a, d)
            } else
                j = void 0;
        if (eb.isEmptyObject(m))
            "inline" === ("none" === j ? z(a.nodeName) : j) && (n.display = j);
        else {
            p ? "hidden" in p && (o = p.hidden) : p = eb._data(a, "fxshow", {}),
            f && (p.hidden = !o),
            o ? eb(a).show() : l.done(function() {
                eb(a).hide()
            }
            ),
            l.done(function() {
                var b;
                eb._removeData(a, "fxshow");
                for (b in m)
                    eb.style(a, b, m[b])
            }
            );
            for (d in m)
                g = J(o ? p[d] : 0, d, l),
                d in p || (p[d] = g.start,
                o && (g.end = g.start,
                g.start = "width" === d || "height" === d ? 1 : 0))
        }
    }
    function L(a, b) {
        var c, d, e, f, g;
        for (c in a)
            if (d = eb.camelCase(c),
            e = b[d],
            f = a[c],
            eb.isArray(f) && (e = f[1],
            f = a[c] = f[0]),
            c !== d && (a[d] = f,
            delete a[c]),
            g = eb.cssHooks[d],
            g && "expand" in g) {
                f = g.expand(f),
                delete a[d];
                for (c in f)
                    c in a || (a[c] = f[c],
                    b[c] = e)
            } else
                b[d] = e
    }
    function M(a, b, c) {
        var d, e, f = 0, g = sc.length, h = eb.Deferred().always(function() {
            delete i.elem
        }
        ), i = function() {
            if (e)
                return !1;
            for (var b = nc || H(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++)
                j.tweens[g].run(f);
            return h.notifyWith(a, [j, f, c]),
            1 > f && i ? c : (h.resolveWith(a, [j]),
            !1)
        }
        , j = h.promise({
            elem: a,
            props: eb.extend({}, b),
            opts: eb.extend(!0, {
                specialEasing: {}
            }, c),
            originalProperties: b,
            originalOptions: c,
            startTime: nc || H(),
            duration: c.duration,
            tweens: [],
            createTween: function(b, c) {
                var d = eb.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                return j.tweens.push(d),
                d
            },
            stop: function(b) {
                var c = 0
                  , d = b ? j.tweens.length : 0;
                if (e)
                    return this;
                for (e = !0; d > c; c++)
                    j.tweens[c].run(1);
                return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]),
                this
            }
        }), k = j.props;
        for (L(k, j.opts.specialEasing); g > f; f++)
            if (d = sc[f].call(j, a, k, j.opts))
                return d;
        return eb.map(k, J, j),
        eb.isFunction(j.opts.start) && j.opts.start.call(a, j),
        eb.fx.timer(eb.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })),
        j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
    }
    function N(a) {
        return function(b, c) {
            "string" != typeof b && (c = b,
            b = "*");
            var d, e = 0, f = b.toLowerCase().match(tb) || [];
            if (eb.isFunction(c))
                for (; d = f[e++]; )
                    "+" === d.charAt(0) ? (d = d.slice(1) || "*",
                    (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
        }
    }
    function O(a, b, c, d) {
        function e(h) {
            var i;
            return f[h] = !0,
            eb.each(a[h] || [], function(a, h) {
                var j = h(b, c, d);
                return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j),
                e(j),
                !1)
            }
            ),
            i
        }
        var f = {}
          , g = a === Rc;
        return e(b.dataTypes[0]) || !f["*"] && e("*")
    }
    function P(a, b) {
        var c, d, e = eb.ajaxSettings.flatOptions || {};
        for (d in b)
            void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
        return c && eb.extend(!0, a, c),
        a
    }
    function Q(a, b, c) {
        for (var d, e, f, g, h = a.contents, i = a.dataTypes; "*" === i[0]; )
            i.shift(),
            void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
        if (e)
            for (g in h)
                if (h[g] && h[g].test(e)) {
                    i.unshift(g);
                    break
                }
        if (i[0] in c)
            f = i[0];
        else {
            for (g in c) {
                if (!i[0] || a.converters[g + " " + i[0]]) {
                    f = g;
                    break
                }
                d || (d = g)
            }
            f = f || d
        }
        return f ? (f !== i[0] && i.unshift(f),
        c[f]) : void 0
    }
    function R(a, b, c, d) {
        var e, f, g, h, i, j = {}, k = a.dataTypes.slice();
        if (k[1])
            for (g in a.converters)
                j[g.toLowerCase()] = a.converters[g];
        for (f = k.shift(); f; )
            if (a.responseFields[f] && (c[a.responseFields[f]] = b),
            !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)),
            i = f,
            f = k.shift())
                if ("*" === f)
                    f = i;
                else if ("*" !== i && i !== f) {
                    if (g = j[i + " " + f] || j["* " + f],
                    !g)
                        for (e in j)
                            if (h = e.split(" "),
                            h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                                g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0],
                                k.unshift(h[1]));
                                break
                            }
                    if (g !== !0)
                        if (g && a["throws"])
                            b = g(b);
                        else
                            try {
                                b = g(b)
                            } catch (l) {
                                return {
                                    state: "parsererror",
                                    error: g ? l : "No conversion from " + i + " to " + f
                                }
                            }
                }
        return {
            state: "success",
            data: b
        }
    }
    function S(a, b, c, d) {
        var e;
        if (eb.isArray(b))
            eb.each(b, function(b, e) {
                c || Vc.test(a) ? d(a, e) : S(a + "[" + ("object" == typeof e ? b : "") + "]", e, c, d)
            }
            );
        else if (c || "object" !== eb.type(b))
            d(a, b);
        else
            for (e in b)
                S(a + "[" + e + "]", b[e], c, d)
    }
    function T() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {}
    }
    function U() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {}
    }
    function V(a) {
        return eb.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
    }
    var W = []
      , X = W.slice
      , Y = W.concat
      , Z = W.push
      , $ = W.indexOf
      , _ = {}
      , ab = _.toString
      , bb = _.hasOwnProperty
      , cb = {}
      , db = "1.11.3"
      , eb = function(a, b) {
        return new eb.fn.init(a,b)
    }
      , fb = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
      , gb = /^-ms-/
      , hb = /-([\da-z])/gi
      , ib = function(a, b) {
        return b.toUpperCase()
    }
    ;
    eb.fn = eb.prototype = {
        jquery: db,
        constructor: eb,
        selector: "",
        length: 0,
        toArray: function() {
            return X.call(this)
        },
        get: function(a) {
            return null  != a ? 0 > a ? this[a + this.length] : this[a] : X.call(this)
        },
        pushStack: function(a) {
            var b = eb.merge(this.constructor(), a);
            return b.prevObject = this,
            b.context = this.context,
            b
        },
        each: function(a, b) {
            return eb.each(this, a, b)
        },
        map: function(a) {
            return this.pushStack(eb.map(this, function(b, c) {
                return a.call(b, c, b)
            }
            ))
        },
        slice: function() {
            return this.pushStack(X.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(a) {
            var b = this.length
              , c = +a + (0 > a ? b : 0);
            return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor(null )
        },
        push: Z,
        sort: W.sort,
        splice: W.splice
    },
    eb.extend = eb.fn.extend = function() {
        var a, b, c, d, e, f, g = arguments[0] || {}, h = 1, i = arguments.length, j = !1;
        for ("boolean" == typeof g && (j = g,
        g = arguments[h] || {},
        h++),
        "object" == typeof g || eb.isFunction(g) || (g = {}),
        h === i && (g = this,
        h--); i > h; h++)
            if (null  != (e = arguments[h]))
                for (d in e)
                    a = g[d],
                    c = e[d],
                    g !== c && (j && c && (eb.isPlainObject(c) || (b = eb.isArray(c))) ? (b ? (b = !1,
                    f = a && eb.isArray(a) ? a : []) : f = a && eb.isPlainObject(a) ? a : {},
                    g[d] = eb.extend(j, f, c)) : void 0 !== c && (g[d] = c));
        return g
    }
    ,
    eb.extend({
        expando: "jQuery" + (db + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(a) {
            throw new Error(a)
        },
        noop: function() {},
        isFunction: function(a) {
            return "function" === eb.type(a)
        },
        isArray: Array.isArray || function(a) {
            return "array" === eb.type(a)
        }
        ,
        isWindow: function(a) {
            return null  != a && a == a.window
        },
        isNumeric: function(a) {
            return !eb.isArray(a) && a - parseFloat(a) + 1 >= 0
        },
        isEmptyObject: function(a) {
            var b;
            for (b in a)
                return !1;
            return !0
        },
        isPlainObject: function(a) {
            var b;
            if (!a || "object" !== eb.type(a) || a.nodeType || eb.isWindow(a))
                return !1;
            try {
                if (a.constructor && !bb.call(a, "constructor") && !bb.call(a.constructor.prototype, "isPrototypeOf"))
                    return !1
            } catch (c) {
                return !1
            }
            if (cb.ownLast)
                for (b in a)
                    return bb.call(a, b);
            for (b in a)
                ;
            return void 0 === b || bb.call(a, b)
        },
        type: function(a) {
            return null  == a ? a + "" : "object" == typeof a || "function" == typeof a ? _[ab.call(a)] || "object" : typeof a
        },
        globalEval: function(b) {
            b && eb.trim(b) && (a.execScript || function(b) {
                a.eval.call(a, b)
            }
            )(b)
        },
        camelCase: function(a) {
            return a.replace(gb, "ms-").replace(hb, ib)
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        },
        each: function(a, b, d) {
            var e, f = 0, g = a.length, h = c(a);
            if (d) {
                if (h)
                    for (; g > f && (e = b.apply(a[f], d),
                    e !== !1); f++)
                        ;
                else
                    for (f in a)
                        if (e = b.apply(a[f], d),
                        e === !1)
                            break
            } else if (h)
                for (; g > f && (e = b.call(a[f], f, a[f]),
                e !== !1); f++)
                    ;
            else
                for (f in a)
                    if (e = b.call(a[f], f, a[f]),
                    e === !1)
                        break;
            return a
        },
        trim: function(a) {
            return null  == a ? "" : (a + "").replace(fb, "")
        },
        makeArray: function(a, b) {
            var d = b || [];
            return null  != a && (c(Object(a)) ? eb.merge(d, "string" == typeof a ? [a] : a) : Z.call(d, a)),
            d
        },
        inArray: function(a, b, c) {
            var d;
            if (b) {
                if ($)
                    return $.call(b, a, c);
                for (d = b.length,
                c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)
                    if (c in b && b[c] === a)
                        return c
            }
            return -1
        },
        merge: function(a, b) {
            for (var c = +b.length, d = 0, e = a.length; c > d; )
                a[e++] = b[d++];
            if (c !== c)
                for (; void 0 !== b[d]; )
                    a[e++] = b[d++];
            return a.length = e,
            a
        },
        grep: function(a, b, c) {
            for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++)
                d = !b(a[f], f),
                d !== h && e.push(a[f]);
            return e
        },
        map: function(a, b, d) {
            var e, f = 0, g = a.length, h = c(a), i = [];
            if (h)
                for (; g > f; f++)
                    e = b(a[f], f, d),
                    null  != e && i.push(e);
            else
                for (f in a)
                    e = b(a[f], f, d),
                    null  != e && i.push(e);
            return Y.apply([], i)
        },
        guid: 1,
        proxy: function(a, b) {
            var c, d, e;
            return "string" == typeof b && (e = a[b],
            b = a,
            a = e),
            eb.isFunction(a) ? (c = X.call(arguments, 2),
            d = function() {
                return a.apply(b || this, c.concat(X.call(arguments)))
            }
            ,
            d.guid = a.guid = a.guid || eb.guid++,
            d) : void 0
        },
        now: function() {
            return +new Date
        },
        support: cb
    }),
    eb.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, b) {
        _["[object " + b + "]"] = b.toLowerCase()
    }
    );
    var jb = function(a) {
        function b(a, b, c, d) {
            var e, f, g, h, i, j, l, n, o, p;
            if ((b ? b.ownerDocument || b : O) !== G && F(b),
            b = b || G,
            c = c || [],
            h = b.nodeType,
            "string" != typeof a || !a || 1 !== h && 9 !== h && 11 !== h)
                return c;
            if (!d && I) {
                if (11 !== h && (e = sb.exec(a)))
                    if (g = e[1]) {
                        if (9 === h) {
                            if (f = b.getElementById(g),
                            !f || !f.parentNode)
                                return c;
                            if (f.id === g)
                                return c.push(f),
                                c
                        } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(g)) && M(b, f) && f.id === g)
                            return c.push(f),
                            c
                    } else {
                        if (e[2])
                            return $.apply(c, b.getElementsByTagName(a)),
                            c;
                        if ((g = e[3]) && v.getElementsByClassName)
                            return $.apply(c, b.getElementsByClassName(g)),
                            c
                    }
                if (v.qsa && (!J || !J.test(a))) {
                    if (n = l = N,
                    o = b,
                    p = 1 !== h && a,
                    1 === h && "object" !== b.nodeName.toLowerCase()) {
                        for (j = z(a),
                        (l = b.getAttribute("id")) ? n = l.replace(ub, "\\$&") : b.setAttribute("id", n),
                        n = "[id='" + n + "'] ",
                        i = j.length; i--; )
                            j[i] = n + m(j[i]);
                        o = tb.test(a) && k(b.parentNode) || b,
                        p = j.join(",")
                    }
                    if (p)
                        try {
                            return $.apply(c, o.querySelectorAll(p)),
                            c
                        } catch (q) {} finally {
                            l || b.removeAttribute("id")
                        }
                }
            }
            return B(a.replace(ib, "$1"), b, c, d)
        }
        function c() {
            function a(c, d) {
                return b.push(c + " ") > w.cacheLength && delete a[b.shift()],
                a[c + " "] = d
            }
            var b = [];
            return a
        }
        function d(a) {
            return a[N] = !0,
            a
        }
        function e(a) {
            var b = G.createElement("div");
            try {
                return !!a(b)
            } catch (c) {
                return !1
            } finally {
                b.parentNode && b.parentNode.removeChild(b),
                b = null
            }
        }
        function f(a, b) {
            for (var c = a.split("|"), d = a.length; d--; )
                w.attrHandle[c[d]] = b
        }
        function g(a, b) {
            var c = b && a
              , d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || V) - (~a.sourceIndex || V);
            if (d)
                return d;
            if (c)
                for (; c = c.nextSibling; )
                    if (c === b)
                        return -1;
            return a ? 1 : -1
        }
        function h(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a
            }
        }
        function i(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a
            }
        }
        function j(a) {
            return d(function(b) {
                return b = +b,
                d(function(c, d) {
                    for (var e, f = a([], c.length, b), g = f.length; g--; )
                        c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                }
                )
            }
            )
        }
        function k(a) {
            return a && "undefined" != typeof a.getElementsByTagName && a
        }
        function l() {}
        function m(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++)
                d += a[b].value;
            return d
        }
        function n(a, b, c) {
            var d = b.dir
              , e = c && "parentNode" === d
              , f = Q++;
            return b.first ? function(b, c, f) {
                for (; b = b[d]; )
                    if (1 === b.nodeType || e)
                        return a(b, c, f)
            }
             : function(b, c, g) {
                var h, i, j = [P, f];
                if (g) {
                    for (; b = b[d]; )
                        if ((1 === b.nodeType || e) && a(b, c, g))
                            return !0
                } else
                    for (; b = b[d]; )
                        if (1 === b.nodeType || e) {
                            if (i = b[N] || (b[N] = {}),
                            (h = i[d]) && h[0] === P && h[1] === f)
                                return j[2] = h[2];
                            if (i[d] = j,
                            j[2] = a(b, c, g))
                                return !0
                        }
            }
        }
        function o(a) {
            return a.length > 1 ? function(b, c, d) {
                for (var e = a.length; e--; )
                    if (!a[e](b, c, d))
                        return !1;
                return !0
            }
             : a[0]
        }
        function p(a, c, d) {
            for (var e = 0, f = c.length; f > e; e++)
                b(a, c[e], d);
            return d
        }
        function q(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null  != b; i > h; h++)
                (f = a[h]) && (!c || c(f, d, e)) && (g.push(f),
                j && b.push(h));
            return g
        }
        function r(a, b, c, e, f, g) {
            return e && !e[N] && (e = r(e)),
            f && !f[N] && (f = r(f, g)),
            d(function(d, g, h, i) {
                var j, k, l, m = [], n = [], o = g.length, r = d || p(b || "*", h.nodeType ? [h] : h, []), s = !a || !d && b ? r : q(r, m, a, h, i), t = c ? f || (d ? a : o || e) ? [] : g : s;
                if (c && c(s, t, h, i),
                e)
                    for (j = q(t, n),
                    e(j, [], h, i),
                    k = j.length; k--; )
                        (l = j[k]) && (t[n[k]] = !(s[n[k]] = l));
                if (d) {
                    if (f || a) {
                        if (f) {
                            for (j = [],
                            k = t.length; k--; )
                                (l = t[k]) && j.push(s[k] = l);
                            f(null , t = [], j, i)
                        }
                        for (k = t.length; k--; )
                            (l = t[k]) && (j = f ? ab(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l))
                    }
                } else
                    t = q(t === g ? t.splice(o, t.length) : t),
                    f ? f(null , g, t, i) : $.apply(g, t)
            }
            )
        }
        function s(a) {
            for (var b, c, d, e = a.length, f = w.relative[a[0].type], g = f || w.relative[" "], h = f ? 1 : 0, i = n(function(a) {
                return a === b
            }
            , g, !0), j = n(function(a) {
                return ab(b, a) > -1
            }
            , g, !0), k = [function(a, c, d) {
                var e = !f && (d || c !== C) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d));
                return b = null ,
                e
            }
            ]; e > h; h++)
                if (c = w.relative[a[h].type])
                    k = [n(o(k), c)];
                else {
                    if (c = w.filter[a[h].type].apply(null , a[h].matches),
                    c[N]) {
                        for (d = ++h; e > d && !w.relative[a[d].type]; d++)
                            ;
                        return r(h > 1 && o(k), h > 1 && m(a.slice(0, h - 1).concat({
                            value: " " === a[h - 2].type ? "*" : ""
                        })).replace(ib, "$1"), c, d > h && s(a.slice(h, d)), e > d && s(a = a.slice(d)), e > d && m(a))
                    }
                    k.push(c)
                }
            return o(k)
        }
        function t(a, c) {
            var e = c.length > 0
              , f = a.length > 0
              , g = function(d, g, h, i, j) {
                var k, l, m, n = 0, o = "0", p = d && [], r = [], s = C, t = d || f && w.find.TAG("*", j), u = P += null  == s ? 1 : Math.random() || .1, v = t.length;
                for (j && (C = g !== G && g); o !== v && null  != (k = t[o]); o++) {
                    if (f && k) {
                        for (l = 0; m = a[l++]; )
                            if (m(k, g, h)) {
                                i.push(k);
                                break
                            }
                        j && (P = u)
                    }
                    e && ((k = !m && k) && n--,
                    d && p.push(k))
                }
                if (n += o,
                e && o !== n) {
                    for (l = 0; m = c[l++]; )
                        m(p, r, g, h);
                    if (d) {
                        if (n > 0)
                            for (; o--; )
                                p[o] || r[o] || (r[o] = Y.call(i));
                        r = q(r)
                    }
                    $.apply(i, r),
                    j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i)
                }
                return j && (P = u,
                C = s),
                p
            }
            ;
            return e ? d(g) : g
        }
        var u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" + 1 * new Date, O = a.document, P = 0, Q = 0, R = c(), S = c(), T = c(), U = function(a, b) {
            return a === b && (E = !0),
            0
        }
        , V = 1 << 31, W = {}.hasOwnProperty, X = [], Y = X.pop, Z = X.push, $ = X.push, _ = X.slice, ab = function(a, b) {
            for (var c = 0, d = a.length; d > c; c++)
                if (a[c] === b)
                    return c;
            return -1
        }
        , bb = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", cb = "[\\x20\\t\\r\\n\\f]", db = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", eb = db.replace("w", "w#"), fb = "\\[" + cb + "*(" + db + ")(?:" + cb + "*([*^$|!~]?=)" + cb + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + eb + "))|)" + cb + "*\\]", gb = ":(" + db + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + fb + ")*)|.*)\\)|)", hb = new RegExp(cb + "+","g"), ib = new RegExp("^" + cb + "+|((?:^|[^\\\\])(?:\\\\.)*)" + cb + "+$","g"), jb = new RegExp("^" + cb + "*," + cb + "*"), kb = new RegExp("^" + cb + "*([>+~]|" + cb + ")" + cb + "*"), lb = new RegExp("=" + cb + "*([^\\]'\"]*?)" + cb + "*\\]","g"), mb = new RegExp(gb), nb = new RegExp("^" + eb + "$"), ob = {
            ID: new RegExp("^#(" + db + ")"),
            CLASS: new RegExp("^\\.(" + db + ")"),
            TAG: new RegExp("^(" + db.replace("w", "w*") + ")"),
            ATTR: new RegExp("^" + fb),
            PSEUDO: new RegExp("^" + gb),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + cb + "*(even|odd|(([+-]|)(\\d*)n|)" + cb + "*(?:([+-]|)" + cb + "*(\\d+)|))" + cb + "*\\)|)","i"),
            bool: new RegExp("^(?:" + bb + ")$","i"),
            needsContext: new RegExp("^" + cb + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + cb + "*((?:-\\d)?\\d*)" + cb + "*\\)|)(?=[^-]|$)","i")
        }, pb = /^(?:input|select|textarea|button)$/i, qb = /^h\d$/i, rb = /^[^{]+\{\s*\[native \w/, sb = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, tb = /[+~]/, ub = /'|\\/g, vb = new RegExp("\\\\([\\da-f]{1,6}" + cb + "?|(" + cb + ")|.)","ig"), wb = function(a, b, c) {
            var d = "0x" + b - 65536;
            return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320)
        }
        , xb = function() {
            F()
        }
        ;
        try {
            $.apply(X = _.call(O.childNodes), O.childNodes),
            X[O.childNodes.length].nodeType
        } catch (yb) {
            $ = {
                apply: X.length ? function(a, b) {
                    Z.apply(a, _.call(b))
                }
                 : function(a, b) {
                    for (var c = a.length, d = 0; a[c++] = b[d++]; )
                        ;
                    a.length = c - 1
                }
            }
        }
        v = b.support = {},
        y = b.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? "HTML" !== b.nodeName : !1
        }
        ,
        F = b.setDocument = function(a) {
            var b, c, d = a ? a.ownerDocument || a : O;
            return d !== G && 9 === d.nodeType && d.documentElement ? (G = d,
            H = d.documentElement,
            c = d.defaultView,
            c && c !== c.top && (c.addEventListener ? c.addEventListener("unload", xb, !1) : c.attachEvent && c.attachEvent("onunload", xb)),
            I = !y(d),
            v.attributes = e(function(a) {
                return a.className = "i",
                !a.getAttribute("className")
            }
            ),
            v.getElementsByTagName = e(function(a) {
                return a.appendChild(d.createComment("")),
                !a.getElementsByTagName("*").length
            }
            ),
            v.getElementsByClassName = rb.test(d.getElementsByClassName),
            v.getById = e(function(a) {
                return H.appendChild(a).id = N,
                !d.getElementsByName || !d.getElementsByName(N).length
            }
            ),
            v.getById ? (w.find.ID = function(a, b) {
                if ("undefined" != typeof b.getElementById && I) {
                    var c = b.getElementById(a);
                    return c && c.parentNode ? [c] : []
                }
            }
            ,
            w.filter.ID = function(a) {
                var b = a.replace(vb, wb);
                return function(a) {
                    return a.getAttribute("id") === b
                }
            }
            ) : (delete w.find.ID,
            w.filter.ID = function(a) {
                var b = a.replace(vb, wb);
                return function(a) {
                    var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                    return c && c.value === b
                }
            }
            ),
            w.find.TAG = v.getElementsByTagName ? function(a, b) {
                return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : v.qsa ? b.querySelectorAll(a) : void 0
            }
             : function(a, b) {
                var c, d = [], e = 0, f = b.getElementsByTagName(a);
                if ("*" === a) {
                    for (; c = f[e++]; )
                        1 === c.nodeType && d.push(c);
                    return d
                }
                return f
            }
            ,
            w.find.CLASS = v.getElementsByClassName && function(a, b) {
                return I ? b.getElementsByClassName(a) : void 0
            }
            ,
            K = [],
            J = [],
            (v.qsa = rb.test(d.querySelectorAll)) && (e(function(a) {
                H.appendChild(a).innerHTML = "<a id='" + N + "'></a><select id='" + N + "-\f]' msallowcapture=''><option selected=''></option></select>",
                a.querySelectorAll("[msallowcapture^='']").length && J.push("[*^$]=" + cb + "*(?:''|\"\")"),
                a.querySelectorAll("[selected]").length || J.push("\\[" + cb + "*(?:value|" + bb + ")"),
                a.querySelectorAll("[id~=" + N + "-]").length || J.push("~="),
                a.querySelectorAll(":checked").length || J.push(":checked"),
                a.querySelectorAll("a#" + N + "+*").length || J.push(".#.+[+~]")
            }
            ),
            e(function(a) {
                var b = d.createElement("input");
                b.setAttribute("type", "hidden"),
                a.appendChild(b).setAttribute("name", "D"),
                a.querySelectorAll("[name=d]").length && J.push("name" + cb + "*[*^$|!~]?="),
                a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"),
                a.querySelectorAll("*,:x"),
                J.push(",.*:")
            }
            )),
            (v.matchesSelector = rb.test(L = H.matches || H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && e(function(a) {
                v.disconnectedMatch = L.call(a, "div"),
                L.call(a, "[s!='']:x"),
                K.push("!=", gb)
            }
            ),
            J = J.length && new RegExp(J.join("|")),
            K = K.length && new RegExp(K.join("|")),
            b = rb.test(H.compareDocumentPosition),
            M = b || rb.test(H.contains) ? function(a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a
                  , d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
            }
             : function(a, b) {
                if (b)
                    for (; b = b.parentNode; )
                        if (b === a)
                            return !0;
                return !1
            }
            ,
            U = b ? function(a, b) {
                if (a === b)
                    return E = !0,
                    0;
                var c = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return c ? c : (c = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1,
                1 & c || !v.sortDetached && b.compareDocumentPosition(a) === c ? a === d || a.ownerDocument === O && M(O, a) ? -1 : b === d || b.ownerDocument === O && M(O, b) ? 1 : D ? ab(D, a) - ab(D, b) : 0 : 4 & c ? -1 : 1)
            }
             : function(a, b) {
                if (a === b)
                    return E = !0,
                    0;
                var c, e = 0, f = a.parentNode, h = b.parentNode, i = [a], j = [b];
                if (!f || !h)
                    return a === d ? -1 : b === d ? 1 : f ? -1 : h ? 1 : D ? ab(D, a) - ab(D, b) : 0;
                if (f === h)
                    return g(a, b);
                for (c = a; c = c.parentNode; )
                    i.unshift(c);
                for (c = b; c = c.parentNode; )
                    j.unshift(c);
                for (; i[e] === j[e]; )
                    e++;
                return e ? g(i[e], j[e]) : i[e] === O ? -1 : j[e] === O ? 1 : 0
            }
            ,
            d) : G
        }
        ,
        b.matches = function(a, c) {
            return b(a, null , null , c)
        }
        ,
        b.matchesSelector = function(a, c) {
            if ((a.ownerDocument || a) !== G && F(a),
            c = c.replace(lb, "='$1']"),
            !(!v.matchesSelector || !I || K && K.test(c) || J && J.test(c)))
                try {
                    var d = L.call(a, c);
                    if (d || v.disconnectedMatch || a.document && 11 !== a.document.nodeType)
                        return d
                } catch (e) {}
            return b(c, G, null , [a]).length > 0
        }
        ,
        b.contains = function(a, b) {
            return (a.ownerDocument || a) !== G && F(a),
            M(a, b)
        }
        ,
        b.attr = function(a, b) {
            (a.ownerDocument || a) !== G && F(a);
            var c = w.attrHandle[b.toLowerCase()]
              , d = c && W.call(w.attrHandle, b.toLowerCase()) ? c(a, b, !I) : void 0;
            return void 0 !== d ? d : v.attributes || !I ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }
        ,
        b.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        }
        ,
        b.uniqueSort = function(a) {
            var b, c = [], d = 0, e = 0;
            if (E = !v.detectDuplicates,
            D = !v.sortStable && a.slice(0),
            a.sort(U),
            E) {
                for (; b = a[e++]; )
                    b === a[e] && (d = c.push(e));
                for (; d--; )
                    a.splice(c[d], 1)
            }
            return D = null ,
            a
        }
        ,
        x = b.getText = function(a) {
            var b, c = "", d = 0, e = a.nodeType;
            if (e) {
                if (1 === e || 9 === e || 11 === e) {
                    if ("string" == typeof a.textContent)
                        return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling)
                        c += x(a)
                } else if (3 === e || 4 === e)
                    return a.nodeValue
            } else
                for (; b = a[d++]; )
                    c += x(b);
            return c
        }
        ,
        w = b.selectors = {
            cacheLength: 50,
            createPseudo: d,
            match: ob,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(vb, wb),
                    a[3] = (a[3] || a[4] || a[5] || "").replace(vb, wb),
                    "~=" === a[2] && (a[3] = " " + a[3] + " "),
                    a.slice(0, 4)
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(),
                    "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]),
                    a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])),
                    a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]),
                    a
                },
                PSEUDO: function(a) {
                    var b, c = !a[6] && a[2];
                    return ob.CHILD.test(a[0]) ? null  : (a[3] ? a[2] = a[4] || a[5] || "" : c && mb.test(c) && (b = z(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b),
                    a[2] = c.slice(0, b)),
                    a.slice(0, 3))
                }
            },
            filter: {
                TAG: function(a) {
                    var b = a.replace(vb, wb).toLowerCase();
                    return "*" === a ? function() {
                        return !0
                    }
                     : function(a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b
                    }
                },
                CLASS: function(a) {
                    var b = R[a + " "];
                    return b || (b = new RegExp("(^|" + cb + ")" + a + "(" + cb + "|$)")) && R(a, function(a) {
                        return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "")
                    }
                    )
                },
                ATTR: function(a, c, d) {
                    return function(e) {
                        var f = b.attr(e, a);
                        return null  == f ? "!=" === c : c ? (f += "",
                        "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f.replace(hb, " ") + " ").indexOf(d) > -1 : "|=" === c ? f === d || f.slice(0, d.length + 1) === d + "-" : !1) : !0
                    }
                },
                CHILD: function(a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3)
                      , g = "last" !== a.slice(-4)
                      , h = "of-type" === b;
                    return 1 === d && 0 === e ? function(a) {
                        return !!a.parentNode
                    }
                     : function(b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling", q = b.parentNode, r = h && b.nodeName.toLowerCase(), s = !i && !h;
                        if (q) {
                            if (f) {
                                for (; p; ) {
                                    for (l = b; l = l[p]; )
                                        if (h ? l.nodeName.toLowerCase() === r : 1 === l.nodeType)
                                            return !1;
                                    o = p = "only" === a && !o && "nextSibling"
                                }
                                return !0
                            }
                            if (o = [g ? q.firstChild : q.lastChild],
                            g && s) {
                                for (k = q[N] || (q[N] = {}),
                                j = k[a] || [],
                                n = j[0] === P && j[1],
                                m = j[0] === P && j[2],
                                l = n && q.childNodes[n]; l = ++n && l && l[p] || (m = n = 0) || o.pop(); )
                                    if (1 === l.nodeType && ++m && l === b) {
                                        k[a] = [P, n, m];
                                        break
                                    }
                            } else if (s && (j = (b[N] || (b[N] = {}))[a]) && j[0] === P)
                                m = j[1];
                            else
                                for (; (l = ++n && l && l[p] || (m = n = 0) || o.pop()) && ((h ? l.nodeName.toLowerCase() !== r : 1 !== l.nodeType) || !++m || (s && ((l[N] || (l[N] = {}))[a] = [P, m]),
                                l !== b)); )
                                    ;
                            return m -= e,
                            m === d || m % d === 0 && m / d >= 0
                        }
                    }
                },
                PSEUDO: function(a, c) {
                    var e, f = w.pseudos[a] || w.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
                    return f[N] ? f(c) : f.length > 1 ? (e = [a, a, "", c],
                    w.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function(a, b) {
                        for (var d, e = f(a, c), g = e.length; g--; )
                            d = ab(a, e[g]),
                            a[d] = !(b[d] = e[g])
                    }
                    ) : function(a) {
                        return f(a, 0, e)
                    }
                    ) : f
                }
            },
            pseudos: {
                not: d(function(a) {
                    var b = []
                      , c = []
                      , e = A(a.replace(ib, "$1"));
                    return e[N] ? d(function(a, b, c, d) {
                        for (var f, g = e(a, null , d, []), h = a.length; h--; )
                            (f = g[h]) && (a[h] = !(b[h] = f))
                    }
                    ) : function(a, d, f) {
                        return b[0] = a,
                        e(b, null , f, c),
                        b[0] = null ,
                        !c.pop()
                    }
                }
                ),
                has: d(function(a) {
                    return function(c) {
                        return b(a, c).length > 0
                    }
                }
                ),
                contains: d(function(a) {
                    return a = a.replace(vb, wb),
                    function(b) {
                        return (b.textContent || b.innerText || x(b)).indexOf(a) > -1
                    }
                }
                ),
                lang: d(function(a) {
                    return nb.test(a || "") || b.error("unsupported lang: " + a),
                    a = a.replace(vb, wb).toLowerCase(),
                    function(b) {
                        var c;
                        do
                            if (c = I ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang"))
                                return c = c.toLowerCase(),
                                c === a || 0 === c.indexOf(a + "-");
                        while ((b = b.parentNode) && 1 === b.nodeType);return !1
                    }
                }
                ),
                target: function(b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id
                },
                root: function(a) {
                    return a === H
                },
                focus: function(a) {
                    return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                },
                enabled: function(a) {
                    return a.disabled === !1
                },
                disabled: function(a) {
                    return a.disabled === !0
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex,
                    a.selected === !0
                },
                empty: function(a) {
                    for (a = a.firstChild; a; a = a.nextSibling)
                        if (a.nodeType < 6)
                            return !1;
                    return !0
                },
                parent: function(a) {
                    return !w.pseudos.empty(a)
                },
                header: function(a) {
                    return qb.test(a.nodeName)
                },
                input: function(a) {
                    return pb.test(a.nodeName)
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                },
                text: function(a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null  == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                },
                first: j(function() {
                    return [0]
                }
                ),
                last: j(function(a, b) {
                    return [b - 1]
                }
                ),
                eq: j(function(a, b, c) {
                    return [0 > c ? c + b : c]
                }
                ),
                even: j(function(a, b) {
                    for (var c = 0; b > c; c += 2)
                        a.push(c);
                    return a
                }
                ),
                odd: j(function(a, b) {
                    for (var c = 1; b > c; c += 2)
                        a.push(c);
                    return a
                }
                ),
                lt: j(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; --d >= 0; )
                        a.push(d);
                    return a
                }
                ),
                gt: j(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; ++d < b; )
                        a.push(d);
                    return a
                }
                )
            }
        },
        w.pseudos.nth = w.pseudos.eq;
        for (u in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        })
            w.pseudos[u] = h(u);
        for (u in {
            submit: !0,
            reset: !0
        })
            w.pseudos[u] = i(u);
        return l.prototype = w.filters = w.pseudos,
        w.setFilters = new l,
        z = b.tokenize = function(a, c) {
            var d, e, f, g, h, i, j, k = S[a + " "];
            if (k)
                return c ? 0 : k.slice(0);
            for (h = a,
            i = [],
            j = w.preFilter; h; ) {
                (!d || (e = jb.exec(h))) && (e && (h = h.slice(e[0].length) || h),
                i.push(f = [])),
                d = !1,
                (e = kb.exec(h)) && (d = e.shift(),
                f.push({
                    value: d,
                    type: e[0].replace(ib, " ")
                }),
                h = h.slice(d.length));
                for (g in w.filter)
                    !(e = ob[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(),
                    f.push({
                        value: d,
                        type: g,
                        matches: e
                    }),
                    h = h.slice(d.length));
                if (!d)
                    break
            }
            return c ? h.length : h ? b.error(a) : S(a, i).slice(0)
        }
        ,
        A = b.compile = function(a, b) {
            var c, d = [], e = [], f = T[a + " "];
            if (!f) {
                for (b || (b = z(a)),
                c = b.length; c--; )
                    f = s(b[c]),
                    f[N] ? d.push(f) : e.push(f);
                f = T(a, t(e, d)),
                f.selector = a
            }
            return f
        }
        ,
        B = b.select = function(a, b, c, d) {
            var e, f, g, h, i, j = "function" == typeof a && a, l = !d && z(a = j.selector || a);
            if (c = c || [],
            1 === l.length) {
                if (f = l[0] = l[0].slice(0),
                f.length > 2 && "ID" === (g = f[0]).type && v.getById && 9 === b.nodeType && I && w.relative[f[1].type]) {
                    if (b = (w.find.ID(g.matches[0].replace(vb, wb), b) || [])[0],
                    !b)
                        return c;
                    j && (b = b.parentNode),
                    a = a.slice(f.shift().value.length)
                }
                for (e = ob.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e],
                !w.relative[h = g.type]); )
                    if ((i = w.find[h]) && (d = i(g.matches[0].replace(vb, wb), tb.test(f[0].type) && k(b.parentNode) || b))) {
                        if (f.splice(e, 1),
                        a = d.length && m(f),
                        !a)
                            return $.apply(c, d),
                            c;
                        break
                    }
            }
            return (j || A(a, l))(d, b, !I, c, tb.test(a) && k(b.parentNode) || b),
            c
        }
        ,
        v.sortStable = N.split("").sort(U).join("") === N,
        v.detectDuplicates = !!E,
        F(),
        v.sortDetached = e(function(a) {
            return 1 & a.compareDocumentPosition(G.createElement("div"))
        }
        ),
        e(function(a) {
            return a.innerHTML = "<a href='#'></a>",
            "#" === a.firstChild.getAttribute("href")
        }
        ) || f("type|href|height|width", function(a, b, c) {
            return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
        }
        ),
        v.attributes && e(function(a) {
            return a.innerHTML = "<input/>",
            a.firstChild.setAttribute("value", ""),
            "" === a.firstChild.getAttribute("value")
        }
        ) || f("value", function(a, b, c) {
            return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
        }
        ),
        e(function(a) {
            return null  == a.getAttribute("disabled")
        }
        ) || f(bb, function(a, b, c) {
            var d;
            return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }
        ),
        b
    }
    (a);
    eb.find = jb,
    eb.expr = jb.selectors,
    eb.expr[":"] = eb.expr.pseudos,
    eb.unique = jb.uniqueSort,
    eb.text = jb.getText,
    eb.isXMLDoc = jb.isXML,
    eb.contains = jb.contains;
    var kb = eb.expr.match.needsContext
      , lb = /^<(\w+)\s*\/?>(?:<\/\1>|)$/
      , mb = /^.[^:#\[\.,]*$/;
    eb.filter = function(a, b, c) {
        var d = b[0];
        return c && (a = ":not(" + a + ")"),
        1 === b.length && 1 === d.nodeType ? eb.find.matchesSelector(d, a) ? [d] : [] : eb.find.matches(a, eb.grep(b, function(a) {
            return 1 === a.nodeType
        }
        ))
    }
    ,
    eb.fn.extend({
        find: function(a) {
            var b, c = [], d = this, e = d.length;
            if ("string" != typeof a)
                return this.pushStack(eb(a).filter(function() {
                    for (b = 0; e > b; b++)
                        if (eb.contains(d[b], this))
                            return !0
                }
                ));
            for (b = 0; e > b; b++)
                eb.find(a, d[b], c);
            return c = this.pushStack(e > 1 ? eb.unique(c) : c),
            c.selector = this.selector ? this.selector + " " + a : a,
            c
        },
        filter: function(a) {
            return this.pushStack(d(this, a || [], !1))
        },
        not: function(a) {
            return this.pushStack(d(this, a || [], !0))
        },
        is: function(a) {
            return !!d(this, "string" == typeof a && kb.test(a) ? eb(a) : a || [], !1).length
        }
    });
    var nb, ob = a.document, pb = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, qb = eb.fn.init = function(a, b) {
        var c, d;
        if (!a)
            return this;
        if ("string" == typeof a) {
            if (c = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null , a, null ] : pb.exec(a),
            !c || !c[1] && b)
                return !b || b.jquery ? (b || nb).find(a) : this.constructor(b).find(a);
            if (c[1]) {
                if (b = b instanceof eb ? b[0] : b,
                eb.merge(this, eb.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : ob, !0)),
                lb.test(c[1]) && eb.isPlainObject(b))
                    for (c in b)
                        eb.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]);
                return this
            }
            if (d = ob.getElementById(c[2]),
            d && d.parentNode) {
                if (d.id !== c[2])
                    return nb.find(a);
                this.length = 1,
                this[0] = d
            }
            return this.context = ob,
            this.selector = a,
            this
        }
        return a.nodeType ? (this.context = this[0] = a,
        this.length = 1,
        this) : eb.isFunction(a) ? "undefined" != typeof nb.ready ? nb.ready(a) : a(eb) : (void 0 !== a.selector && (this.selector = a.selector,
        this.context = a.context),
        eb.makeArray(a, this))
    }
    ;
    qb.prototype = eb.fn,
    nb = eb(ob);
    var rb = /^(?:parents|prev(?:Until|All))/
      , sb = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    eb.extend({
        dir: function(a, b, c) {
            for (var d = [], e = a[b]; e && 9 !== e.nodeType && (void 0 === c || 1 !== e.nodeType || !eb(e).is(c)); )
                1 === e.nodeType && d.push(e),
                e = e[b];
            return d
        },
        sibling: function(a, b) {
            for (var c = []; a; a = a.nextSibling)
                1 === a.nodeType && a !== b && c.push(a);
            return c
        }
    }),
    eb.fn.extend({
        has: function(a) {
            var b, c = eb(a, this), d = c.length;
            return this.filter(function() {
                for (b = 0; d > b; b++)
                    if (eb.contains(this, c[b]))
                        return !0
            }
            )
        },
        closest: function(a, b) {
            for (var c, d = 0, e = this.length, f = [], g = kb.test(a) || "string" != typeof a ? eb(a, b || this.context) : 0; e > d; d++)
                for (c = this[d]; c && c !== b; c = c.parentNode)
                    if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && eb.find.matchesSelector(c, a))) {
                        f.push(c);
                        break
                    }
            return this.pushStack(f.length > 1 ? eb.unique(f) : f)
        },
        index: function(a) {
            return a ? "string" == typeof a ? eb.inArray(this[0], eb(a)) : eb.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(a, b) {
            return this.pushStack(eb.unique(eb.merge(this.get(), eb(a, b))))
        },
        addBack: function(a) {
            return this.add(null  == a ? this.prevObject : this.prevObject.filter(a))
        }
    }),
    eb.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        },
        parents: function(a) {
            return eb.dir(a, "parentNode")
        },
        parentsUntil: function(a, b, c) {
            return eb.dir(a, "parentNode", c)
        },
        next: function(a) {
            return e(a, "nextSibling")
        },
        prev: function(a) {
            return e(a, "previousSibling")
        },
        nextAll: function(a) {
            return eb.dir(a, "nextSibling")
        },
        prevAll: function(a) {
            return eb.dir(a, "previousSibling")
        },
        nextUntil: function(a, b, c) {
            return eb.dir(a, "nextSibling", c)
        },
        prevUntil: function(a, b, c) {
            return eb.dir(a, "previousSibling", c)
        },
        siblings: function(a) {
            return eb.sibling((a.parentNode || {}).firstChild, a)
        },
        children: function(a) {
            return eb.sibling(a.firstChild)
        },
        contents: function(a) {
            return eb.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : eb.merge([], a.childNodes)
        }
    }, function(a, b) {
        eb.fn[a] = function(c, d) {
            var e = eb.map(this, b, c);
            return "Until" !== a.slice(-5) && (d = c),
            d && "string" == typeof d && (e = eb.filter(d, e)),
            this.length > 1 && (sb[a] || (e = eb.unique(e)),
            rb.test(a) && (e = e.reverse())),
            this.pushStack(e)
        }
    }
    );
    var tb = /\S+/g
      , ub = {};
    eb.Callbacks = function(a) {
        a = "string" == typeof a ? ub[a] || f(a) : eb.extend({}, a);
        var b, c, d, e, g, h, i = [], j = !a.once && [], k = function(f) {
            for (c = a.memory && f,
            d = !0,
            g = h || 0,
            h = 0,
            e = i.length,
            b = !0; i && e > g; g++)
                if (i[g].apply(f[0], f[1]) === !1 && a.stopOnFalse) {
                    c = !1;
                    break
                }
            b = !1,
            i && (j ? j.length && k(j.shift()) : c ? i = [] : l.disable())
        }
        , l = {
            add: function() {
                if (i) {
                    var d = i.length;
                    !function f(b) {
                        eb.each(b, function(b, c) {
                            var d = eb.type(c);
                            "function" === d ? a.unique && l.has(c) || i.push(c) : c && c.length && "string" !== d && f(c)
                        }
                        )
                    }
                    (arguments),
                    b ? e = i.length : c && (h = d,
                    k(c))
                }
                return this
            },
            remove: function() {
                return i && eb.each(arguments, function(a, c) {
                    for (var d; (d = eb.inArray(c, i, d)) > -1; )
                        i.splice(d, 1),
                        b && (e >= d && e--,
                        g >= d && g--)
                }
                ),
                this
            },
            has: function(a) {
                return a ? eb.inArray(a, i) > -1 : !(!i || !i.length)
            },
            empty: function() {
                return i = [],
                e = 0,
                this
            },
            disable: function() {
                return i = j = c = void 0,
                this
            },
            disabled: function() {
                return !i
            },
            lock: function() {
                return j = void 0,
                c || l.disable(),
                this
            },
            locked: function() {
                return !j
            },
            fireWith: function(a, c) {
                return !i || d && !j || (c = c || [],
                c = [a, c.slice ? c.slice() : c],
                b ? j.push(c) : k(c)),
                this
            },
            fire: function() {
                return l.fireWith(this, arguments),
                this
            },
            fired: function() {
                return !!d
            }
        };
        return l
    }
    ,
    eb.extend({
        Deferred: function(a) {
            var b = [["resolve", "done", eb.Callbacks("once memory"), "resolved"], ["reject", "fail", eb.Callbacks("once memory"), "rejected"], ["notify", "progress", eb.Callbacks("memory")]]
              , c = "pending"
              , d = {
                state: function() {
                    return c
                },
                always: function() {
                    return e.done(arguments).fail(arguments),
                    this
                },
                then: function() {
                    var a = arguments;
                    return eb.Deferred(function(c) {
                        eb.each(b, function(b, f) {
                            var g = eb.isFunction(a[b]) && a[b];
                            e[f[1]](function() {
                                var a = g && g.apply(this, arguments);
                                a && eb.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                            }
                            )
                        }
                        ),
                        a = null
                    }
                    ).promise()
                },
                promise: function(a) {
                    return null  != a ? eb.extend(a, d) : d
                }
            }
              , e = {};
            return d.pipe = d.then,
            eb.each(b, function(a, f) {
                var g = f[2]
                  , h = f[3];
                d[f[1]] = g.add,
                h && g.add(function() {
                    c = h
                }
                , b[1 ^ a][2].disable, b[2][2].lock),
                e[f[0]] = function() {
                    return e[f[0] + "With"](this === e ? d : this, arguments),
                    this
                }
                ,
                e[f[0] + "With"] = g.fireWith
            }
            ),
            d.promise(e),
            a && a.call(e, e),
            e
        },
        when: function(a) {
            var b, c, d, e = 0, f = X.call(arguments), g = f.length, h = 1 !== g || a && eb.isFunction(a.promise) ? g : 0, i = 1 === h ? a : eb.Deferred(), j = function(a, c, d) {
                return function(e) {
                    c[a] = this,
                    d[a] = arguments.length > 1 ? X.call(arguments) : e,
                    d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
                }
            }
            ;
            if (g > 1)
                for (b = new Array(g),
                c = new Array(g),
                d = new Array(g); g > e; e++)
                    f[e] && eb.isFunction(f[e].promise) ? f[e].promise().done(j(e, d, f)).fail(i.reject).progress(j(e, c, b)) : --h;
            return h || i.resolveWith(d, f),
            i.promise()
        }
    });
    var vb;
    eb.fn.ready = function(a) {
        return eb.ready.promise().done(a),
        this
    }
    ,
    eb.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? eb.readyWait++ : eb.ready(!0)
        },
        ready: function(a) {
            if (a === !0 ? !--eb.readyWait : !eb.isReady) {
                if (!ob.body)
                    return setTimeout(eb.ready);
                eb.isReady = !0,
                a !== !0 && --eb.readyWait > 0 || (vb.resolveWith(ob, [eb]),
                eb.fn.triggerHandler && (eb(ob).triggerHandler("ready"),
                eb(ob).off("ready")))
            }
        }
    }),
    eb.ready.promise = function(b) {
        if (!vb)
            if (vb = eb.Deferred(),
            "complete" === ob.readyState)
                setTimeout(eb.ready);
            else if (ob.addEventListener)
                ob.addEventListener("DOMContentLoaded", h, !1),
                a.addEventListener("load", h, !1);
            else {
                ob.attachEvent("onreadystatechange", h),
                a.attachEvent("onload", h);
                var c = !1;
                try {
                    c = null  == a.frameElement && ob.documentElement
                } catch (d) {}
                c && c.doScroll && !function e() {
                    if (!eb.isReady) {
                        try {
                            c.doScroll("left")
                        } catch (a) {
                            return setTimeout(e, 50)
                        }
                        g(),
                        eb.ready()
                    }
                }
                ()
            }
        return vb.promise(b)
    }
    ;
    var wb, xb = "undefined";
    for (wb in eb(cb))
        break;
    cb.ownLast = "0" !== wb,
    cb.inlineBlockNeedsLayout = !1,
    eb(function() {
        var a, b, c, d;
        c = ob.getElementsByTagName("body")[0],
        c && c.style && (b = ob.createElement("div"),
        d = ob.createElement("div"),
        d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
        c.appendChild(d).appendChild(b),
        typeof b.style.zoom !== xb && (b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",
        cb.inlineBlockNeedsLayout = a = 3 === b.offsetWidth,
        a && (c.style.zoom = 1)),
        c.removeChild(d))
    }
    ),
    function() {
        var a = ob.createElement("div");
        if (null  == cb.deleteExpando) {
            cb.deleteExpando = !0;
            try {
                delete a.test
            } catch (b) {
                cb.deleteExpando = !1
            }
        }
        a = null
    }
    (),
    eb.acceptData = function(a) {
        var b = eb.noData[(a.nodeName + " ").toLowerCase()]
          , c = +a.nodeType || 1;
        return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute("classid") === b
    }
    ;
    var yb = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
      , zb = /([A-Z])/g;
    eb.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function(a) {
            return a = a.nodeType ? eb.cache[a[eb.expando]] : a[eb.expando],
            !!a && !j(a)
        },
        data: function(a, b, c) {
            return k(a, b, c)
        },
        removeData: function(a, b) {
            return l(a, b)
        },
        _data: function(a, b, c) {
            return k(a, b, c, !0)
        },
        _removeData: function(a, b) {
            return l(a, b, !0)
        }
    }),
    eb.fn.extend({
        data: function(a, b) {
            var c, d, e, f = this[0], g = f && f.attributes;
            if (void 0 === a) {
                if (this.length && (e = eb.data(f),
                1 === f.nodeType && !eb._data(f, "parsedAttrs"))) {
                    for (c = g.length; c--; )
                        g[c] && (d = g[c].name,
                        0 === d.indexOf("data-") && (d = eb.camelCase(d.slice(5)),
                        i(f, d, e[d])));
                    eb._data(f, "parsedAttrs", !0)
                }
                return e
            }
            return "object" == typeof a ? this.each(function() {
                eb.data(this, a)
            }
            ) : arguments.length > 1 ? this.each(function() {
                eb.data(this, a, b)
            }
            ) : f ? i(f, a, eb.data(f, a)) : void 0
        },
        removeData: function(a) {
            return this.each(function() {
                eb.removeData(this, a)
            }
            )
        }
    }),
    eb.extend({
        queue: function(a, b, c) {
            var d;
            return a ? (b = (b || "fx") + "queue",
            d = eb._data(a, b),
            c && (!d || eb.isArray(c) ? d = eb._data(a, b, eb.makeArray(c)) : d.push(c)),
            d || []) : void 0
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = eb.queue(a, b)
              , d = c.length
              , e = c.shift()
              , f = eb._queueHooks(a, b)
              , g = function() {
                eb.dequeue(a, b)
            }
            ;
            "inprogress" === e && (e = c.shift(),
            d--),
            e && ("fx" === b && c.unshift("inprogress"),
            delete f.stop,
            e.call(a, g, f)),
            !d && f && f.empty.fire()
        },
        _queueHooks: function(a, b) {
            var c = b + "queueHooks";
            return eb._data(a, c) || eb._data(a, c, {
                empty: eb.Callbacks("once memory").add(function() {
                    eb._removeData(a, b + "queue"),
                    eb._removeData(a, c)
                }
                )
            })
        }
    }),
    eb.fn.extend({
        queue: function(a, b) {
            var c = 2;
            return "string" != typeof a && (b = a,
            a = "fx",
            c--),
            arguments.length < c ? eb.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                var c = eb.queue(this, a, b);
                eb._queueHooks(this, a),
                "fx" === a && "inprogress" !== c[0] && eb.dequeue(this, a)
            }
            )
        },
        dequeue: function(a) {
            return this.each(function() {
                eb.dequeue(this, a)
            }
            )
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", [])
        },
        promise: function(a, b) {
            var c, d = 1, e = eb.Deferred(), f = this, g = this.length, h = function() {
                --d || e.resolveWith(f, [f])
            }
            ;
            for ("string" != typeof a && (b = a,
            a = void 0),
            a = a || "fx"; g--; )
                c = eb._data(f[g], a + "queueHooks"),
                c && c.empty && (d++,
                c.empty.add(h));
            return h(),
            e.promise(b)
        }
    });
    var Ab = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
      , Bb = ["Top", "Right", "Bottom", "Left"]
      , Cb = function(a, b) {
        return a = b || a,
        "none" === eb.css(a, "display") || !eb.contains(a.ownerDocument, a)
    }
      , Db = eb.access = function(a, b, c, d, e, f, g) {
        var h = 0
          , i = a.length
          , j = null  == c;
        if ("object" === eb.type(c)) {
            e = !0;
            for (h in c)
                eb.access(a, b, h, c[h], !0, f, g)
        } else if (void 0 !== d && (e = !0,
        eb.isFunction(d) || (g = !0),
        j && (g ? (b.call(a, d),
        b = null ) : (j = b,
        b = function(a, b, c) {
            return j.call(eb(a), c)
        }
        )),
        b))
            for (; i > h; h++)
                b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
        return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
    }
      , Eb = /^(?:checkbox|radio)$/i;
    !function() {
        var a = ob.createElement("input")
          , b = ob.createElement("div")
          , c = ob.createDocumentFragment();
        if (b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        cb.leadingWhitespace = 3 === b.firstChild.nodeType,
        cb.tbody = !b.getElementsByTagName("tbody").length,
        cb.htmlSerialize = !!b.getElementsByTagName("link").length,
        cb.html5Clone = "<:nav></:nav>" !== ob.createElement("nav").cloneNode(!0).outerHTML,
        a.type = "checkbox",
        a.checked = !0,
        c.appendChild(a),
        cb.appendChecked = a.checked,
        b.innerHTML = "<textarea>x</textarea>",
        cb.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue,
        c.appendChild(b),
        b.innerHTML = "<input type='radio' checked='checked' name='t'/>",
        cb.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked,
        cb.noCloneEvent = !0,
        b.attachEvent && (b.attachEvent("onclick", function() {
            cb.noCloneEvent = !1
        }
        ),
        b.cloneNode(!0).click()),
        null  == cb.deleteExpando) {
            cb.deleteExpando = !0;
            try {
                delete b.test
            } catch (d) {
                cb.deleteExpando = !1
            }
        }
    }
    (),
    function() {
        var b, c, d = ob.createElement("div");
        for (b in {
            submit: !0,
            change: !0,
            focusin: !0
        })
            c = "on" + b,
            (cb[b + "Bubbles"] = c in a) || (d.setAttribute(c, "t"),
            cb[b + "Bubbles"] = d.attributes[c].expando === !1);
        d = null
    }
    ();
    var Fb = /^(?:input|select|textarea)$/i
      , Gb = /^key/
      , Hb = /^(?:mouse|pointer|contextmenu)|click/
      , Ib = /^(?:focusinfocus|focusoutblur)$/
      , Jb = /^([^.]*)(?:\.(.+)|)$/;
    eb.event = {
        global: {},
        add: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = eb._data(a);
            if (q) {
                for (c.handler && (i = c,
                c = i.handler,
                e = i.selector),
                c.guid || (c.guid = eb.guid++),
                (g = q.events) || (g = q.events = {}),
                (k = q.handle) || (k = q.handle = function(a) {
                    return typeof eb === xb || a && eb.event.triggered === a.type ? void 0 : eb.event.dispatch.apply(k.elem, arguments)
                }
                ,
                k.elem = a),
                b = (b || "").match(tb) || [""],
                h = b.length; h--; )
                    f = Jb.exec(b[h]) || [],
                    n = p = f[1],
                    o = (f[2] || "").split(".").sort(),
                    n && (j = eb.event.special[n] || {},
                    n = (e ? j.delegateType : j.bindType) || n,
                    j = eb.event.special[n] || {},
                    l = eb.extend({
                        type: n,
                        origType: p,
                        data: d,
                        handler: c,
                        guid: c.guid,
                        selector: e,
                        needsContext: e && eb.expr.match.needsContext.test(e),
                        namespace: o.join(".")
                    }, i),
                    (m = g[n]) || (m = g[n] = [],
                    m.delegateCount = 0,
                    j.setup && j.setup.call(a, d, o, k) !== !1 || (a.addEventListener ? a.addEventListener(n, k, !1) : a.attachEvent && a.attachEvent("on" + n, k))),
                    j.add && (j.add.call(a, l),
                    l.handler.guid || (l.handler.guid = c.guid)),
                    e ? m.splice(m.delegateCount++, 0, l) : m.push(l),
                    eb.event.global[n] = !0);
                a = null
            }
        },
        remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = eb.hasData(a) && eb._data(a);
            if (q && (k = q.events)) {
                for (b = (b || "").match(tb) || [""],
                j = b.length; j--; )
                    if (h = Jb.exec(b[j]) || [],
                    n = p = h[1],
                    o = (h[2] || "").split(".").sort(),
                    n) {
                        for (l = eb.event.special[n] || {},
                        n = (d ? l.delegateType : l.bindType) || n,
                        m = k[n] || [],
                        h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                        i = f = m.length; f--; )
                            g = m[f],
                            !e && p !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (m.splice(f, 1),
                            g.selector && m.delegateCount--,
                            l.remove && l.remove.call(a, g));
                        i && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || eb.removeEvent(a, n, q.handle),
                        delete k[n])
                    } else
                        for (n in k)
                            eb.event.remove(a, n + b[j], c, d, !0);
                eb.isEmptyObject(k) && (delete q.handle,
                eb._removeData(a, "events"))
            }
        },
        trigger: function(b, c, d, e) {
            var f, g, h, i, j, k, l, m = [d || ob], n = bb.call(b, "type") ? b.type : b, o = bb.call(b, "namespace") ? b.namespace.split(".") : [];
            if (h = k = d = d || ob,
            3 !== d.nodeType && 8 !== d.nodeType && !Ib.test(n + eb.event.triggered) && (n.indexOf(".") >= 0 && (o = n.split("."),
            n = o.shift(),
            o.sort()),
            g = n.indexOf(":") < 0 && "on" + n,
            b = b[eb.expando] ? b : new eb.Event(n,"object" == typeof b && b),
            b.isTrigger = e ? 2 : 3,
            b.namespace = o.join("."),
            b.namespace_re = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null ,
            b.result = void 0,
            b.target || (b.target = d),
            c = null  == c ? [b] : eb.makeArray(c, [b]),
            j = eb.event.special[n] || {},
            e || !j.trigger || j.trigger.apply(d, c) !== !1)) {
                if (!e && !j.noBubble && !eb.isWindow(d)) {
                    for (i = j.delegateType || n,
                    Ib.test(i + n) || (h = h.parentNode); h; h = h.parentNode)
                        m.push(h),
                        k = h;
                    k === (d.ownerDocument || ob) && m.push(k.defaultView || k.parentWindow || a)
                }
                for (l = 0; (h = m[l++]) && !b.isPropagationStopped(); )
                    b.type = l > 1 ? i : j.bindType || n,
                    f = (eb._data(h, "events") || {})[b.type] && eb._data(h, "handle"),
                    f && f.apply(h, c),
                    f = g && h[g],
                    f && f.apply && eb.acceptData(h) && (b.result = f.apply(h, c),
                    b.result === !1 && b.preventDefault());
                if (b.type = n,
                !e && !b.isDefaultPrevented() && (!j._default || j._default.apply(m.pop(), c) === !1) && eb.acceptData(d) && g && d[n] && !eb.isWindow(d)) {
                    k = d[g],
                    k && (d[g] = null ),
                    eb.event.triggered = n;
                    try {
                        d[n]()
                    } catch (p) {}
                    eb.event.triggered = void 0,
                    k && (d[g] = k)
                }
                return b.result
            }
        },
        dispatch: function(a) {
            a = eb.event.fix(a);
            var b, c, d, e, f, g = [], h = X.call(arguments), i = (eb._data(this, "events") || {})[a.type] || [], j = eb.event.special[a.type] || {};
            if (h[0] = a,
            a.delegateTarget = this,
            !j.preDispatch || j.preDispatch.call(this, a) !== !1) {
                for (g = eb.event.handlers.call(this, a, i),
                b = 0; (e = g[b++]) && !a.isPropagationStopped(); )
                    for (a.currentTarget = e.elem,
                    f = 0; (d = e.handlers[f++]) && !a.isImmediatePropagationStopped(); )
                        (!a.namespace_re || a.namespace_re.test(d.namespace)) && (a.handleObj = d,
                        a.data = d.data,
                        c = ((eb.event.special[d.origType] || {}).handle || d.handler).apply(e.elem, h),
                        void 0 !== c && (a.result = c) === !1 && (a.preventDefault(),
                        a.stopPropagation()));
                return j.postDispatch && j.postDispatch.call(this, a),
                a.result
            }
        },
        handlers: function(a, b) {
            var c, d, e, f, g = [], h = b.delegateCount, i = a.target;
            if (h && i.nodeType && (!a.button || "click" !== a.type))
                for (; i != this; i = i.parentNode || this)
                    if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
                        for (e = [],
                        f = 0; h > f; f++)
                            d = b[f],
                            c = d.selector + " ",
                            void 0 === e[c] && (e[c] = d.needsContext ? eb(c, this).index(i) >= 0 : eb.find(c, this, null , [i]).length),
                            e[c] && e.push(d);
                        e.length && g.push({
                            elem: i,
                            handlers: e
                        })
                    }
            return h < b.length && g.push({
                elem: this,
                handlers: b.slice(h)
            }),
            g
        },
        fix: function(a) {
            if (a[eb.expando])
                return a;
            var b, c, d, e = a.type, f = a, g = this.fixHooks[e];
            for (g || (this.fixHooks[e] = g = Hb.test(e) ? this.mouseHooks : Gb.test(e) ? this.keyHooks : {}),
            d = g.props ? this.props.concat(g.props) : this.props,
            a = new eb.Event(f),
            b = d.length; b--; )
                c = d[b],
                a[c] = f[c];
            return a.target || (a.target = f.srcElement || ob),
            3 === a.target.nodeType && (a.target = a.target.parentNode),
            a.metaKey = !!a.metaKey,
            g.filter ? g.filter(a, f) : a
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                return null  == a.which && (a.which = null  != b.charCode ? b.charCode : b.keyCode),
                a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, b) {
                var c, d, e, f = b.button, g = b.fromElement;
                return null  == a.pageX && null  != b.clientX && (d = a.target.ownerDocument || ob,
                e = d.documentElement,
                c = d.body,
                a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0),
                a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)),
                !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g),
                a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0),
                a
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== o() && this.focus)
                        try {
                            return this.focus(),
                            !1
                        } catch (a) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === o() && this.blur ? (this.blur(),
                    !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return eb.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(),
                    !1) : void 0
                },
                _default: function(a) {
                    return eb.nodeName(a.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(a) {
                    void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                }
            }
        },
        simulate: function(a, b, c, d) {
            var e = eb.extend(new eb.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? eb.event.trigger(e, null , b) : eb.event.dispatch.call(b, e),
            e.isDefaultPrevented() && c.preventDefault()
        }
    },
    eb.removeEvent = ob.removeEventListener ? function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1)
    }
     : function(a, b, c) {
        var d = "on" + b;
        a.detachEvent && (typeof a[d] === xb && (a[d] = null ),
        a.detachEvent(d, c))
    }
    ,
    eb.Event = function(a, b) {
        return this instanceof eb.Event ? (a && a.type ? (this.originalEvent = a,
        this.type = a.type,
        this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? m : n) : this.type = a,
        b && eb.extend(this, b),
        this.timeStamp = a && a.timeStamp || eb.now(),
        void (this[eb.expando] = !0)) : new eb.Event(a,b)
    }
    ,
    eb.Event.prototype = {
        isDefaultPrevented: n,
        isPropagationStopped: n,
        isImmediatePropagationStopped: n,
        preventDefault: function() {
            var a = this.originalEvent;
            this.isDefaultPrevented = m,
            a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        },
        stopPropagation: function() {
            var a = this.originalEvent;
            this.isPropagationStopped = m,
            a && (a.stopPropagation && a.stopPropagation(),
            a.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            var a = this.originalEvent;
            this.isImmediatePropagationStopped = m,
            a && a.stopImmediatePropagation && a.stopImmediatePropagation(),
            this.stopPropagation()
        }
    },
    eb.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(a, b) {
        eb.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c, d = this, e = a.relatedTarget, f = a.handleObj;
                return (!e || e !== d && !eb.contains(d, e)) && (a.type = f.origType,
                c = f.handler.apply(this, arguments),
                a.type = b),
                c
            }
        }
    }
    ),
    cb.submitBubbles || (eb.event.special.submit = {
        setup: function() {
            return eb.nodeName(this, "form") ? !1 : void eb.event.add(this, "click._submit keypress._submit", function(a) {
                var b = a.target
                  , c = eb.nodeName(b, "input") || eb.nodeName(b, "button") ? b.form : void 0;
                c && !eb._data(c, "submitBubbles") && (eb.event.add(c, "submit._submit", function(a) {
                    a._submit_bubble = !0
                }
                ),
                eb._data(c, "submitBubbles", !0))
            }
            )
        },
        postDispatch: function(a) {
            a._submit_bubble && (delete a._submit_bubble,
            this.parentNode && !a.isTrigger && eb.event.simulate("submit", this.parentNode, a, !0))
        },
        teardown: function() {
            return eb.nodeName(this, "form") ? !1 : void eb.event.remove(this, "._submit")
        }
    }),
    cb.changeBubbles || (eb.event.special.change = {
        setup: function() {
            return Fb.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (eb.event.add(this, "propertychange._change", function(a) {
                "checked" === a.originalEvent.propertyName && (this._just_changed = !0)
            }
            ),
            eb.event.add(this, "click._change", function(a) {
                this._just_changed && !a.isTrigger && (this._just_changed = !1),
                eb.event.simulate("change", this, a, !0)
            }
            )),
            !1) : void eb.event.add(this, "beforeactivate._change", function(a) {
                var b = a.target;
                Fb.test(b.nodeName) && !eb._data(b, "changeBubbles") && (eb.event.add(b, "change._change", function(a) {
                    !this.parentNode || a.isSimulated || a.isTrigger || eb.event.simulate("change", this.parentNode, a, !0)
                }
                ),
                eb._data(b, "changeBubbles", !0))
            }
            )
        },
        handle: function(a) {
            var b = a.target;
            return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function() {
            return eb.event.remove(this, "._change"),
            !Fb.test(this.nodeName)
        }
    }),
    cb.focusinBubbles || eb.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var c = function(a) {
            eb.event.simulate(b, a.target, eb.event.fix(a), !0)
        }
        ;
        eb.event.special[b] = {
            setup: function() {
                var d = this.ownerDocument || this
                  , e = eb._data(d, b);
                e || d.addEventListener(a, c, !0),
                eb._data(d, b, (e || 0) + 1)
            },
            teardown: function() {
                var d = this.ownerDocument || this
                  , e = eb._data(d, b) - 1;
                e ? eb._data(d, b, e) : (d.removeEventListener(a, c, !0),
                eb._removeData(d, b))
            }
        }
    }
    ),
    eb.fn.extend({
        on: function(a, b, c, d, e) {
            var f, g;
            if ("object" == typeof a) {
                "string" != typeof b && (c = c || b,
                b = void 0);
                for (f in a)
                    this.on(f, b, c, a[f], e);
                return this
            }
            if (null  == c && null  == d ? (d = b,
            c = b = void 0) : null  == d && ("string" == typeof b ? (d = c,
            c = void 0) : (d = c,
            c = b,
            b = void 0)),
            d === !1)
                d = n;
            else if (!d)
                return this;
            return 1 === e && (g = d,
            d = function(a) {
                return eb().off(a),
                g.apply(this, arguments)
            }
            ,
            d.guid = g.guid || (g.guid = eb.guid++)),
            this.each(function() {
                eb.event.add(this, a, d, c, b)
            }
            )
        },
        one: function(a, b, c, d) {
            return this.on(a, b, c, d, 1)
        },
        off: function(a, b, c) {
            var d, e;
            if (a && a.preventDefault && a.handleObj)
                return d = a.handleObj,
                eb(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler),
                this;
            if ("object" == typeof a) {
                for (e in a)
                    this.off(e, b, a[e]);
                return this
            }
            return (b === !1 || "function" == typeof b) && (c = b,
            b = void 0),
            c === !1 && (c = n),
            this.each(function() {
                eb.event.remove(this, a, c, b)
            }
            )
        },
        trigger: function(a, b) {
            return this.each(function() {
                eb.event.trigger(a, b, this)
            }
            )
        },
        triggerHandler: function(a, b) {
            var c = this[0];
            return c ? eb.event.trigger(a, b, c, !0) : void 0
        }
    });
    var Kb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video"
      , Lb = / jQuery\d+="(?:null|\d+)"/g
      , Mb = new RegExp("<(?:" + Kb + ")[\\s/>]","i")
      , Nb = /^\s+/
      , Ob = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi
      , Pb = /<([\w:]+)/
      , Qb = /<tbody/i
      , Rb = /<|&#?\w+;/
      , Sb = /<(?:script|style|link)/i
      , Tb = /checked\s*(?:[^=]|=\s*.checked.)/i
      , Ub = /^$|\/(?:java|ecma)script/i
      , Vb = /^true\/(.*)/
      , Wb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g
      , Xb = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: cb.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    }
      , Yb = p(ob)
      , Zb = Yb.appendChild(ob.createElement("div"));
    Xb.optgroup = Xb.option,
    Xb.tbody = Xb.tfoot = Xb.colgroup = Xb.caption = Xb.thead,
    Xb.th = Xb.td,
    eb.extend({
        clone: function(a, b, c) {
            var d, e, f, g, h, i = eb.contains(a.ownerDocument, a);
            if (cb.html5Clone || eb.isXMLDoc(a) || !Mb.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (Zb.innerHTML = a.outerHTML,
            Zb.removeChild(f = Zb.firstChild)),
            !(cb.noCloneEvent && cb.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || eb.isXMLDoc(a)))
                for (d = q(f),
                h = q(a),
                g = 0; null  != (e = h[g]); ++g)
                    d[g] && x(e, d[g]);
            if (b)
                if (c)
                    for (h = h || q(a),
                    d = d || q(f),
                    g = 0; null  != (e = h[g]); g++)
                        w(e, d[g]);
                else
                    w(a, f);
            return d = q(f, "script"),
            d.length > 0 && v(d, !i && q(a, "script")),
            d = h = e = null ,
            f
        },
        buildFragment: function(a, b, c, d) {
            for (var e, f, g, h, i, j, k, l = a.length, m = p(b), n = [], o = 0; l > o; o++)
                if (f = a[o],
                f || 0 === f)
                    if ("object" === eb.type(f))
                        eb.merge(n, f.nodeType ? [f] : f);
                    else if (Rb.test(f)) {
                        for (h = h || m.appendChild(b.createElement("div")),
                        i = (Pb.exec(f) || ["", ""])[1].toLowerCase(),
                        k = Xb[i] || Xb._default,
                        h.innerHTML = k[1] + f.replace(Ob, "<$1></$2>") + k[2],
                        e = k[0]; e--; )
                            h = h.lastChild;
                        if (!cb.leadingWhitespace && Nb.test(f) && n.push(b.createTextNode(Nb.exec(f)[0])),
                        !cb.tbody)
                            for (f = "table" !== i || Qb.test(f) ? "<table>" !== k[1] || Qb.test(f) ? 0 : h : h.firstChild,
                            e = f && f.childNodes.length; e--; )
                                eb.nodeName(j = f.childNodes[e], "tbody") && !j.childNodes.length && f.removeChild(j);
                        for (eb.merge(n, h.childNodes),
                        h.textContent = ""; h.firstChild; )
                            h.removeChild(h.firstChild);
                        h = m.lastChild
                    } else
                        n.push(b.createTextNode(f));
            for (h && m.removeChild(h),
            cb.appendChecked || eb.grep(q(n, "input"), r),
            o = 0; f = n[o++]; )
                if ((!d || -1 === eb.inArray(f, d)) && (g = eb.contains(f.ownerDocument, f),
                h = q(m.appendChild(f), "script"),
                g && v(h),
                c))
                    for (e = 0; f = h[e++]; )
                        Ub.test(f.type || "") && c.push(f);
            return h = null ,
            m
        },
        cleanData: function(a, b) {
            for (var c, d, e, f, g = 0, h = eb.expando, i = eb.cache, j = cb.deleteExpando, k = eb.event.special; null  != (c = a[g]); g++)
                if ((b || eb.acceptData(c)) && (e = c[h],
                f = e && i[e])) {
                    if (f.events)
                        for (d in f.events)
                            k[d] ? eb.event.remove(c, d) : eb.removeEvent(c, d, f.handle);
                    i[e] && (delete i[e],
                    j ? delete c[h] : typeof c.removeAttribute !== xb ? c.removeAttribute(h) : c[h] = null ,
                    W.push(e))
                }
        }
    }),
    eb.fn.extend({
        text: function(a) {
            return Db(this, function(a) {
                return void 0 === a ? eb.text(this) : this.empty().append((this[0] && this[0].ownerDocument || ob).createTextNode(a))
            }
            , null , a, arguments.length)
        },
        append: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = s(this, a);
                    b.appendChild(a)
                }
            }
            )
        },
        prepend: function() {
            return this.domManip(arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = s(this, a);
                    b.insertBefore(a, b.firstChild)
                }
            }
            )
        },
        before: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            }
            )
        },
        after: function() {
            return this.domManip(arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
            }
            )
        },
        remove: function(a, b) {
            for (var c, d = a ? eb.filter(a, this) : this, e = 0; null  != (c = d[e]); e++)
                b || 1 !== c.nodeType || eb.cleanData(q(c)),
                c.parentNode && (b && eb.contains(c.ownerDocument, c) && v(q(c, "script")),
                c.parentNode.removeChild(c));
            return this
        },
        empty: function() {
            for (var a, b = 0; null  != (a = this[b]); b++) {
                for (1 === a.nodeType && eb.cleanData(q(a, !1)); a.firstChild; )
                    a.removeChild(a.firstChild);
                a.options && eb.nodeName(a, "select") && (a.options.length = 0)
            }
            return this
        },
        clone: function(a, b) {
            return a = null  == a ? !1 : a,
            b = null  == b ? a : b,
            this.map(function() {
                return eb.clone(this, a, b)
            }
            )
        },
        html: function(a) {
            return Db(this, function(a) {
                var b = this[0] || {}
                  , c = 0
                  , d = this.length;
                if (void 0 === a)
                    return 1 === b.nodeType ? b.innerHTML.replace(Lb, "") : void 0;
                if (!("string" != typeof a || Sb.test(a) || !cb.htmlSerialize && Mb.test(a) || !cb.leadingWhitespace && Nb.test(a) || Xb[(Pb.exec(a) || ["", ""])[1].toLowerCase()])) {
                    a = a.replace(Ob, "<$1></$2>");
                    try {
                        for (; d > c; c++)
                            b = this[c] || {},
                            1 === b.nodeType && (eb.cleanData(q(b, !1)),
                            b.innerHTML = a);
                        b = 0
                    } catch (e) {}
                }
                b && this.empty().append(a)
            }
            , null , a, arguments.length)
        },
        replaceWith: function() {
            var a = arguments[0];
            return this.domManip(arguments, function(b) {
                a = this.parentNode,
                eb.cleanData(q(this)),
                a && a.replaceChild(b, this)
            }
            ),
            a && (a.length || a.nodeType) ? this : this.remove()
        },
        detach: function(a) {
            return this.remove(a, !0)
        },
        domManip: function(a, b) {
            a = Y.apply([], a);
            var c, d, e, f, g, h, i = 0, j = this.length, k = this, l = j - 1, m = a[0], n = eb.isFunction(m);
            if (n || j > 1 && "string" == typeof m && !cb.checkClone && Tb.test(m))
                return this.each(function(c) {
                    var d = k.eq(c);
                    n && (a[0] = m.call(this, c, d.html())),
                    d.domManip(a, b)
                }
                );
            if (j && (h = eb.buildFragment(a, this[0].ownerDocument, !1, this),
            c = h.firstChild,
            1 === h.childNodes.length && (h = c),
            c)) {
                for (f = eb.map(q(h, "script"), t),
                e = f.length; j > i; i++)
                    d = h,
                    i !== l && (d = eb.clone(d, !0, !0),
                    e && eb.merge(f, q(d, "script"))),
                    b.call(this[i], d, i);
                if (e)
                    for (g = f[f.length - 1].ownerDocument,
                    eb.map(f, u),
                    i = 0; e > i; i++)
                        d = f[i],
                        Ub.test(d.type || "") && !eb._data(d, "globalEval") && eb.contains(g, d) && (d.src ? eb._evalUrl && eb._evalUrl(d.src) : eb.globalEval((d.text || d.textContent || d.innerHTML || "").replace(Wb, "")));
                h = c = null
            }
            return this
        }
    }),
    eb.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        eb.fn[a] = function(a) {
            for (var c, d = 0, e = [], f = eb(a), g = f.length - 1; g >= d; d++)
                c = d === g ? this : this.clone(!0),
                eb(f[d])[b](c),
                Z.apply(e, c.get());
            return this.pushStack(e)
        }
    }
    );
    var $b, _b = {};
    !function() {
        var a;
        cb.shrinkWrapBlocks = function() {
            if (null  != a)
                return a;
            a = !1;
            var b, c, d;
            return c = ob.getElementsByTagName("body")[0],
            c && c.style ? (b = ob.createElement("div"),
            d = ob.createElement("div"),
            d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
            c.appendChild(d).appendChild(b),
            typeof b.style.zoom !== xb && (b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",
            b.appendChild(ob.createElement("div")).style.width = "5px",
            a = 3 !== b.offsetWidth),
            c.removeChild(d),
            a) : void 0
        }
    }
    ();
    var ac, bc, cc = /^margin/, dc = new RegExp("^(" + Ab + ")(?!px)[a-z%]+$","i"), ec = /^(top|right|bottom|left)$/;
    a.getComputedStyle ? (ac = function(b) {
        return b.ownerDocument.defaultView.opener ? b.ownerDocument.defaultView.getComputedStyle(b, null ) : a.getComputedStyle(b, null )
    }
    ,
    bc = function(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || ac(a),
        g = c ? c.getPropertyValue(b) || c[b] : void 0,
        c && ("" !== g || eb.contains(a.ownerDocument, a) || (g = eb.style(a, b)),
        dc.test(g) && cc.test(b) && (d = h.width,
        e = h.minWidth,
        f = h.maxWidth,
        h.minWidth = h.maxWidth = h.width = g,
        g = c.width,
        h.width = d,
        h.minWidth = e,
        h.maxWidth = f)),
        void 0 === g ? g : g + ""
    }
    ) : ob.documentElement.currentStyle && (ac = function(a) {
        return a.currentStyle
    }
    ,
    bc = function(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || ac(a),
        g = c ? c[b] : void 0,
        null  == g && h && h[b] && (g = h[b]),
        dc.test(g) && !ec.test(b) && (d = h.left,
        e = a.runtimeStyle,
        f = e && e.left,
        f && (e.left = a.currentStyle.left),
        h.left = "fontSize" === b ? "1em" : g,
        g = h.pixelLeft + "px",
        h.left = d,
        f && (e.left = f)),
        void 0 === g ? g : g + "" || "auto"
    }
    ),
    function() {
        function b() {
            var b, c, d, e;
            c = ob.getElementsByTagName("body")[0],
            c && c.style && (b = ob.createElement("div"),
            d = ob.createElement("div"),
            d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
            c.appendChild(d).appendChild(b),
            b.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",
            f = g = !1,
            i = !0,
            a.getComputedStyle && (f = "1%" !== (a.getComputedStyle(b, null ) || {}).top,
            g = "4px" === (a.getComputedStyle(b, null ) || {
                width: "4px"
            }).width,
            e = b.appendChild(ob.createElement("div")),
            e.style.cssText = b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",
            e.style.marginRight = e.style.width = "0",
            b.style.width = "1px",
            i = !parseFloat((a.getComputedStyle(e, null ) || {}).marginRight),
            b.removeChild(e)),
            b.innerHTML = "<table><tr><td></td><td>t</td></tr></table>",
            e = b.getElementsByTagName("td"),
            e[0].style.cssText = "margin:0;border:0;padding:0;display:none",
            h = 0 === e[0].offsetHeight,
            h && (e[0].style.display = "",
            e[1].style.display = "none",
            h = 0 === e[0].offsetHeight),
            c.removeChild(d))
        }
        var c, d, e, f, g, h, i;
        c = ob.createElement("div"),
        c.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        e = c.getElementsByTagName("a")[0],
        d = e && e.style,
        d && (d.cssText = "float:left;opacity:.5",
        cb.opacity = "0.5" === d.opacity,
        cb.cssFloat = !!d.cssFloat,
        c.style.backgroundClip = "content-box",
        c.cloneNode(!0).style.backgroundClip = "",
        cb.clearCloneStyle = "content-box" === c.style.backgroundClip,
        cb.boxSizing = "" === d.boxSizing || "" === d.MozBoxSizing || "" === d.WebkitBoxSizing,
        eb.extend(cb, {
            reliableHiddenOffsets: function() {
                return null  == h && b(),
                h
            },
            boxSizingReliable: function() {
                return null  == g && b(),
                g
            },
            pixelPosition: function() {
                return null  == f && b(),
                f
            },
            reliableMarginRight: function() {
                return null  == i && b(),
                i
            }
        }))
    }
    (),
    eb.swap = function(a, b, c, d) {
        var e, f, g = {};
        for (f in b)
            g[f] = a.style[f],
            a.style[f] = b[f];
        e = c.apply(a, d || []);
        for (f in b)
            a.style[f] = g[f];
        return e
    }
    ;
    var fc = /alpha\([^)]*\)/i
      , gc = /opacity\s*=\s*([^)]*)/
      , hc = /^(none|table(?!-c[ea]).+)/
      , ic = new RegExp("^(" + Ab + ")(.*)$","i")
      , jc = new RegExp("^([+-])=(" + Ab + ")","i")
      , kc = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }
      , lc = {
        letterSpacing: "0",
        fontWeight: "400"
    }
      , mc = ["Webkit", "O", "Moz", "ms"];
    eb.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = bc(a, "opacity");
                        return "" === c ? "1" : c
                    }
                }
            }
        },
        cssNumber: {
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": cb.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e, f, g, h = eb.camelCase(b), i = a.style;
                if (b = eb.cssProps[h] || (eb.cssProps[h] = B(i, h)),
                g = eb.cssHooks[b] || eb.cssHooks[h],
                void 0 === c)
                    return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
                if (f = typeof c,
                "string" === f && (e = jc.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(eb.css(a, b)),
                f = "number"),
                null  != c && c === c && ("number" !== f || eb.cssNumber[h] || (c += "px"),
                cb.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"),
                !(g && "set" in g && void 0 === (c = g.set(a, c, d)))))
                    try {
                        i[b] = c
                    } catch (j) {}
            }
        },
        css: function(a, b, c, d) {
            var e, f, g, h = eb.camelCase(b);
            return b = eb.cssProps[h] || (eb.cssProps[h] = B(a.style, h)),
            g = eb.cssHooks[b] || eb.cssHooks[h],
            g && "get" in g && (f = g.get(a, !0, c)),
            void 0 === f && (f = bc(a, b, d)),
            "normal" === f && b in lc && (f = lc[b]),
            "" === c || c ? (e = parseFloat(f),
            c === !0 || eb.isNumeric(e) ? e || 0 : f) : f
        }
    }),
    eb.each(["height", "width"], function(a, b) {
        eb.cssHooks[b] = {
            get: function(a, c, d) {
                return c ? hc.test(eb.css(a, "display")) && 0 === a.offsetWidth ? eb.swap(a, kc, function() {
                    return F(a, b, d)
                }
                ) : F(a, b, d) : void 0
            },
            set: function(a, c, d) {
                var e = d && ac(a);
                return D(a, c, d ? E(a, b, d, cb.boxSizing && "border-box" === eb.css(a, "boxSizing", !1, e), e) : 0)
            }
        }
    }
    ),
    cb.opacity || (eb.cssHooks.opacity = {
        get: function(a, b) {
            return gc.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
        },
        set: function(a, b) {
            var c = a.style
              , d = a.currentStyle
              , e = eb.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : ""
              , f = d && d.filter || c.filter || "";
            c.zoom = 1,
            (b >= 1 || "" === b) && "" === eb.trim(f.replace(fc, "")) && c.removeAttribute && (c.removeAttribute("filter"),
            "" === b || d && !d.filter) || (c.filter = fc.test(f) ? f.replace(fc, e) : f + " " + e)
        }
    }),
    eb.cssHooks.marginRight = A(cb.reliableMarginRight, function(a, b) {
        return b ? eb.swap(a, {
            display: "inline-block"
        }, bc, [a, "marginRight"]) : void 0
    }
    ),
    eb.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        eb.cssHooks[a + b] = {
            expand: function(c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++)
                    e[a + Bb[d] + b] = f[d] || f[d - 2] || f[0];
                return e
            }
        },
        cc.test(a) || (eb.cssHooks[a + b].set = D)
    }
    ),
    eb.fn.extend({
        css: function(a, b) {
            return Db(this, function(a, b, c) {
                var d, e, f = {}, g = 0;
                if (eb.isArray(b)) {
                    for (d = ac(a),
                    e = b.length; e > g; g++)
                        f[b[g]] = eb.css(a, b[g], !1, d);
                    return f
                }
                return void 0 !== c ? eb.style(a, b, c) : eb.css(a, b)
            }
            , a, b, arguments.length > 1)
        },
        show: function() {
            return C(this, !0)
        },
        hide: function() {
            return C(this)
        },
        toggle: function(a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                Cb(this) ? eb(this).show() : eb(this).hide()
            }
            )
        }
    }),
    eb.Tween = G,
    G.prototype = {
        constructor: G,
        init: function(a, b, c, d, e, f) {
            this.elem = a,
            this.prop = c,
            this.easing = e || "swing",
            this.options = b,
            this.start = this.now = this.cur(),
            this.end = d,
            this.unit = f || (eb.cssNumber[c] ? "" : "px")
        },
        cur: function() {
            var a = G.propHooks[this.prop];
            return a && a.get ? a.get(this) : G.propHooks._default.get(this)
        },
        run: function(a) {
            var b, c = G.propHooks[this.prop];
            return this.pos = b = this.options.duration ? eb.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a,
            this.now = (this.end - this.start) * b + this.start,
            this.options.step && this.options.step.call(this.elem, this.now, this),
            c && c.set ? c.set(this) : G.propHooks._default.set(this),
            this
        }
    },
    G.prototype.init.prototype = G.prototype,
    G.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return null  == a.elem[a.prop] || a.elem.style && null  != a.elem.style[a.prop] ? (b = eb.css(a.elem, a.prop, ""),
                b && "auto" !== b ? b : 0) : a.elem[a.prop]
            },
            set: function(a) {
                eb.fx.step[a.prop] ? eb.fx.step[a.prop](a) : a.elem.style && (null  != a.elem.style[eb.cssProps[a.prop]] || eb.cssHooks[a.prop]) ? eb.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now
            }
        }
    },
    G.propHooks.scrollTop = G.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    },
    eb.easing = {
        linear: function(a) {
            return a
        },
        swing: function(a) {
            return .5 - Math.cos(a * Math.PI) / 2
        }
    },
    eb.fx = G.prototype.init,
    eb.fx.step = {};
    var nc, oc, pc = /^(?:toggle|show|hide)$/, qc = new RegExp("^(?:([+-])=|)(" + Ab + ")([a-z%]*)$","i"), rc = /queueHooks$/, sc = [K], tc = {
        "*": [function(a, b) {
            var c = this.createTween(a, b)
              , d = c.cur()
              , e = qc.exec(b)
              , f = e && e[3] || (eb.cssNumber[a] ? "" : "px")
              , g = (eb.cssNumber[a] || "px" !== f && +d) && qc.exec(eb.css(c.elem, a))
              , h = 1
              , i = 20;
            if (g && g[3] !== f) {
                f = f || g[3],
                e = e || [],
                g = +d || 1;
                do
                    h = h || ".5",
                    g /= h,
                    eb.style(c.elem, a, g + f);
                while (h !== (h = c.cur() / d) && 1 !== h && --i)
            }
            return e && (g = c.start = +g || +d || 0,
            c.unit = f,
            c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]),
            c
        }
        ]
    };
    eb.Animation = eb.extend(M, {
        tweener: function(a, b) {
            eb.isFunction(a) ? (b = a,
            a = ["*"]) : a = a.split(" ");
            for (var c, d = 0, e = a.length; e > d; d++)
                c = a[d],
                tc[c] = tc[c] || [],
                tc[c].unshift(b)
        },
        prefilter: function(a, b) {
            b ? sc.unshift(a) : sc.push(a)
        }
    }),
    eb.speed = function(a, b, c) {
        var d = a && "object" == typeof a ? eb.extend({}, a) : {
            complete: c || !c && b || eb.isFunction(a) && a,
            duration: a,
            easing: c && b || b && !eb.isFunction(b) && b
        };
        return d.duration = eb.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in eb.fx.speeds ? eb.fx.speeds[d.duration] : eb.fx.speeds._default,
        (null  == d.queue || d.queue === !0) && (d.queue = "fx"),
        d.old = d.complete,
        d.complete = function() {
            eb.isFunction(d.old) && d.old.call(this),
            d.queue && eb.dequeue(this, d.queue)
        }
        ,
        d
    }
    ,
    eb.fn.extend({
        fadeTo: function(a, b, c, d) {
            return this.filter(Cb).css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d)
        },
        animate: function(a, b, c, d) {
            var e = eb.isEmptyObject(a)
              , f = eb.speed(b, c, d)
              , g = function() {
                var b = M(this, eb.extend({}, a), f);
                (e || eb._data(this, "finish")) && b.stop(!0)
            }
            ;
            return g.finish = g,
            e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
        },
        stop: function(a, b, c) {
            var d = function(a) {
                var b = a.stop;
                delete a.stop,
                b(c)
            }
            ;
            return "string" != typeof a && (c = b,
            b = a,
            a = void 0),
            b && a !== !1 && this.queue(a || "fx", []),
            this.each(function() {
                var b = !0
                  , e = null  != a && a + "queueHooks"
                  , f = eb.timers
                  , g = eb._data(this);
                if (e)
                    g[e] && g[e].stop && d(g[e]);
                else
                    for (e in g)
                        g[e] && g[e].stop && rc.test(e) && d(g[e]);
                for (e = f.length; e--; )
                    f[e].elem !== this || null  != a && f[e].queue !== a || (f[e].anim.stop(c),
                    b = !1,
                    f.splice(e, 1));
                (b || !c) && eb.dequeue(this, a)
            }
            )
        },
        finish: function(a) {
            return a !== !1 && (a = a || "fx"),
            this.each(function() {
                var b, c = eb._data(this), d = c[a + "queue"], e = c[a + "queueHooks"], f = eb.timers, g = d ? d.length : 0;
                for (c.finish = !0,
                eb.queue(this, a, []),
                e && e.stop && e.stop.call(this, !0),
                b = f.length; b--; )
                    f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0),
                    f.splice(b, 1));
                for (b = 0; g > b; b++)
                    d[b] && d[b].finish && d[b].finish.call(this);
                delete c.finish
            }
            )
        }
    }),
    eb.each(["toggle", "show", "hide"], function(a, b) {
        var c = eb.fn[b];
        eb.fn[b] = function(a, d, e) {
            return null  == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(I(b, !0), a, d, e)
        }
    }
    ),
    eb.each({
        slideDown: I("show"),
        slideUp: I("hide"),
        slideToggle: I("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        eb.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d)
        }
    }
    ),
    eb.timers = [],
    eb.fx.tick = function() {
        var a, b = eb.timers, c = 0;
        for (nc = eb.now(); c < b.length; c++)
            a = b[c],
            a() || b[c] !== a || b.splice(c--, 1);
        b.length || eb.fx.stop(),
        nc = void 0
    }
    ,
    eb.fx.timer = function(a) {
        eb.timers.push(a),
        a() ? eb.fx.start() : eb.timers.pop()
    }
    ,
    eb.fx.interval = 13,
    eb.fx.start = function() {
        oc || (oc = setInterval(eb.fx.tick, eb.fx.interval))
    }
    ,
    eb.fx.stop = function() {
        clearInterval(oc),
        oc = null
    }
    ,
    eb.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    },
    eb.fn.delay = function(a, b) {
        return a = eb.fx ? eb.fx.speeds[a] || a : a,
        b = b || "fx",
        this.queue(b, function(b, c) {
            var d = setTimeout(b, a);
            c.stop = function() {
                clearTimeout(d)
            }
        }
        )
    }
    ,
    function() {
        var a, b, c, d, e;
        b = ob.createElement("div"),
        b.setAttribute("className", "t"),
        b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        d = b.getElementsByTagName("a")[0],
        c = ob.createElement("select"),
        e = c.appendChild(ob.createElement("option")),
        a = b.getElementsByTagName("input")[0],
        d.style.cssText = "top:1px",
        cb.getSetAttribute = "t" !== b.className,
        cb.style = /top/.test(d.getAttribute("style")),
        cb.hrefNormalized = "/a" === d.getAttribute("href"),
        cb.checkOn = !!a.value,
        cb.optSelected = e.selected,
        cb.enctype = !!ob.createElement("form").enctype,
        c.disabled = !0,
        cb.optDisabled = !e.disabled,
        a = ob.createElement("input"),
        a.setAttribute("value", ""),
        cb.input = "" === a.getAttribute("value"),
        a.value = "t",
        a.setAttribute("type", "radio"),
        cb.radioValue = "t" === a.value
    }
    ();
    var uc = /\r/g;
    eb.fn.extend({
        val: function(a) {
            var b, c, d, e = this[0];
            {
                if (arguments.length)
                    return d = eb.isFunction(a),
                    this.each(function(c) {
                        var e;
                        1 === this.nodeType && (e = d ? a.call(this, c, eb(this).val()) : a,
                        null  == e ? e = "" : "number" == typeof e ? e += "" : eb.isArray(e) && (e = eb.map(e, function(a) {
                            return null  == a ? "" : a + ""
                        }
                        )),
                        b = eb.valHooks[this.type] || eb.valHooks[this.nodeName.toLowerCase()],
                        b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
                    }
                    );
                if (e)
                    return b = eb.valHooks[e.type] || eb.valHooks[e.nodeName.toLowerCase()],
                    b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value,
                    "string" == typeof c ? c.replace(uc, "") : null  == c ? "" : c)
            }
        }
    }),
    eb.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = eb.find.attr(a, "value");
                    return null  != b ? b : eb.trim(eb.text(a))
                }
            },
            select: {
                get: function(a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null  : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
                        if (c = d[i],
                        !(!c.selected && i !== e || (cb.optDisabled ? c.disabled : null  !== c.getAttribute("disabled")) || c.parentNode.disabled && eb.nodeName(c.parentNode, "optgroup"))) {
                            if (b = eb(c).val(),
                            f)
                                return b;
                            g.push(b)
                        }
                    return g
                },
                set: function(a, b) {
                    for (var c, d, e = a.options, f = eb.makeArray(b), g = e.length; g--; )
                        if (d = e[g],
                        eb.inArray(eb.valHooks.option.get(d), f) >= 0)
                            try {
                                d.selected = c = !0
                            } catch (h) {
                                d.scrollHeight
                            }
                        else
                            d.selected = !1;
                    return c || (a.selectedIndex = -1),
                    e
                }
            }
        }
    }),
    eb.each(["radio", "checkbox"], function() {
        eb.valHooks[this] = {
            set: function(a, b) {
                return eb.isArray(b) ? a.checked = eb.inArray(eb(a).val(), b) >= 0 : void 0
            }
        },
        cb.checkOn || (eb.valHooks[this].get = function(a) {
            return null  === a.getAttribute("value") ? "on" : a.value
        }
        )
    }
    );
    var vc, wc, xc = eb.expr.attrHandle, yc = /^(?:checked|selected)$/i, zc = cb.getSetAttribute, Ac = cb.input;
    eb.fn.extend({
        attr: function(a, b) {
            return Db(this, eb.attr, a, b, arguments.length > 1)
        },
        removeAttr: function(a) {
            return this.each(function() {
                eb.removeAttr(this, a)
            }
            )
        }
    }),
    eb.extend({
        attr: function(a, b, c) {
            var d, e, f = a.nodeType;
            if (a && 3 !== f && 8 !== f && 2 !== f)
                return typeof a.getAttribute === xb ? eb.prop(a, b, c) : (1 === f && eb.isXMLDoc(a) || (b = b.toLowerCase(),
                d = eb.attrHooks[b] || (eb.expr.match.bool.test(b) ? wc : vc)),
                void 0 === c ? d && "get" in d && null  !== (e = d.get(a, b)) ? e : (e = eb.find.attr(a, b),
                null  == e ? void 0 : e) : null  !== c ? d && "set" in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ""),
                c) : void eb.removeAttr(a, b))
        },
        removeAttr: function(a, b) {
            var c, d, e = 0, f = b && b.match(tb);
            if (f && 1 === a.nodeType)
                for (; c = f[e++]; )
                    d = eb.propFix[c] || c,
                    eb.expr.match.bool.test(c) ? Ac && zc || !yc.test(c) ? a[d] = !1 : a[eb.camelCase("default-" + c)] = a[d] = !1 : eb.attr(a, c, ""),
                    a.removeAttribute(zc ? c : d)
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (!cb.radioValue && "radio" === b && eb.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b),
                        c && (a.value = c),
                        b
                    }
                }
            }
        }
    }),
    wc = {
        set: function(a, b, c) {
            return b === !1 ? eb.removeAttr(a, c) : Ac && zc || !yc.test(c) ? a.setAttribute(!zc && eb.propFix[c] || c, c) : a[eb.camelCase("default-" + c)] = a[c] = !0,
            c
        }
    },
    eb.each(eb.expr.match.bool.source.match(/\w+/g), function(a, b) {
        var c = xc[b] || eb.find.attr;
        xc[b] = Ac && zc || !yc.test(b) ? function(a, b, d) {
            var e, f;
            return d || (f = xc[b],
            xc[b] = e,
            e = null  != c(a, b, d) ? b.toLowerCase() : null ,
            xc[b] = f),
            e
        }
         : function(a, b, c) {
            return c ? void 0 : a[eb.camelCase("default-" + b)] ? b.toLowerCase() : null
        }
    }
    ),
    Ac && zc || (eb.attrHooks.value = {
        set: function(a, b, c) {
            return eb.nodeName(a, "input") ? void (a.defaultValue = b) : vc && vc.set(a, b, c)
        }
    }),
    zc || (vc = {
        set: function(a, b, c) {
            var d = a.getAttributeNode(c);
            return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)),
            d.value = b += "",
            "value" === c || b === a.getAttribute(c) ? b : void 0
        }
    },
    xc.id = xc.name = xc.coords = function(a, b, c) {
        var d;
        return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null
    }
    ,
    eb.valHooks.button = {
        get: function(a, b) {
            var c = a.getAttributeNode(b);
            return c && c.specified ? c.value : void 0
        },
        set: vc.set
    },
    eb.attrHooks.contenteditable = {
        set: function(a, b, c) {
            vc.set(a, "" === b ? !1 : b, c)
        }
    },
    eb.each(["width", "height"], function(a, b) {
        eb.attrHooks[b] = {
            set: function(a, c) {
                return "" === c ? (a.setAttribute(b, "auto"),
                c) : void 0
            }
        }
    }
    )),
    cb.style || (eb.attrHooks.style = {
        get: function(a) {
            return a.style.cssText || void 0
        },
        set: function(a, b) {
            return a.style.cssText = b + ""
        }
    });
    var Bc = /^(?:input|select|textarea|button|object)$/i
      , Cc = /^(?:a|area)$/i;
    eb.fn.extend({
        prop: function(a, b) {
            return Db(this, eb.prop, a, b, arguments.length > 1)
        },
        removeProp: function(a) {
            return a = eb.propFix[a] || a,
            this.each(function() {
                try {
                    this[a] = void 0,
                    delete this[a]
                } catch (b) {}
            }
            )
        }
    }),
    eb.extend({
        propFix: {
            "for": "htmlFor",
            "class": "className"
        },
        prop: function(a, b, c) {
            var d, e, f, g = a.nodeType;
            if (a && 3 !== g && 8 !== g && 2 !== g)
                return f = 1 !== g || !eb.isXMLDoc(a),
                f && (b = eb.propFix[b] || b,
                e = eb.propHooks[b]),
                void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null  !== (d = e.get(a, b)) ? d : a[b]
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var b = eb.find.attr(a, "tabindex");
                    return b ? parseInt(b, 10) : Bc.test(a.nodeName) || Cc.test(a.nodeName) && a.href ? 0 : -1
                }
            }
        }
    }),
    cb.hrefNormalized || eb.each(["href", "src"], function(a, b) {
        eb.propHooks[b] = {
            get: function(a) {
                return a.getAttribute(b, 4)
            }
        }
    }
    ),
    cb.optSelected || (eb.propHooks.selected = {
        get: function(a) {
            var b = a.parentNode;
            return b && (b.selectedIndex,
            b.parentNode && b.parentNode.selectedIndex),
            null
        }
    }),
    eb.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        eb.propFix[this.toLowerCase()] = this
    }
    ),
    cb.enctype || (eb.propFix.enctype = "encoding");
    var Dc = /[\t\r\n\f]/g;
    eb.fn.extend({
        addClass: function(a) {
            var b, c, d, e, f, g, h = 0, i = this.length, j = "string" == typeof a && a;
            if (eb.isFunction(a))
                return this.each(function(b) {
                    eb(this).addClass(a.call(this, b, this.className))
                }
                );
            if (j)
                for (b = (a || "").match(tb) || []; i > h; h++)
                    if (c = this[h],
                    d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Dc, " ") : " ")) {
                        for (f = 0; e = b[f++]; )
                            d.indexOf(" " + e + " ") < 0 && (d += e + " ");
                        g = eb.trim(d),
                        c.className !== g && (c.className = g)
                    }
            return this
        },
        removeClass: function(a) {
            var b, c, d, e, f, g, h = 0, i = this.length, j = 0 === arguments.length || "string" == typeof a && a;
            if (eb.isFunction(a))
                return this.each(function(b) {
                    eb(this).removeClass(a.call(this, b, this.className))
                }
                );
            if (j)
                for (b = (a || "").match(tb) || []; i > h; h++)
                    if (c = this[h],
                    d = 1 === c.nodeType && (c.className ? (" " + c.className + " ").replace(Dc, " ") : "")) {
                        for (f = 0; e = b[f++]; )
                            for (; d.indexOf(" " + e + " ") >= 0; )
                                d = d.replace(" " + e + " ", " ");
                        g = a ? eb.trim(d) : "",
                        c.className !== g && (c.className = g)
                    }
            return this
        },
        toggleClass: function(a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : this.each(eb.isFunction(a) ? function(c) {
                eb(this).toggleClass(a.call(this, c, this.className, b), b)
            }
             : function() {
                if ("string" === c)
                    for (var b, d = 0, e = eb(this), f = a.match(tb) || []; b = f[d++]; )
                        e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                else
                    (c === xb || "boolean" === c) && (this.className && eb._data(this, "__className__", this.className),
                    this.className = this.className || a === !1 ? "" : eb._data(this, "__className__") || "")
            }
            )
        },
        hasClass: function(a) {
            for (var b = " " + a + " ", c = 0, d = this.length; d > c; c++)
                if (1 === this[c].nodeType && (" " + this[c].className + " ").replace(Dc, " ").indexOf(b) >= 0)
                    return !0;
            return !1
        }
    }),
    eb.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        eb.fn[b] = function(a, c) {
            return arguments.length > 0 ? this.on(b, null , a, c) : this.trigger(b)
        }
    }
    ),
    eb.fn.extend({
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        },
        bind: function(a, b, c) {
            return this.on(a, null , b, c)
        },
        unbind: function(a, b) {
            return this.off(a, null , b)
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d)
        },
        undelegate: function(a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
        }
    });
    var Ec = eb.now()
      , Fc = /\?/
      , Gc = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    eb.parseJSON = function(b) {
        if (a.JSON && a.JSON.parse)
            return a.JSON.parse(b + "");
        var c, d = null , e = eb.trim(b + "");
        return e && !eb.trim(e.replace(Gc, function(a, b, e, f) {
            return c && b && (d = 0),
            0 === d ? a : (c = e || b,
            d += !f - !e,
            "")
        }
        )) ? Function("return " + e)() : eb.error("Invalid JSON: " + b)
    }
    ,
    eb.parseXML = function(b) {
        var c, d;
        if (!b || "string" != typeof b)
            return null ;
        try {
            a.DOMParser ? (d = new DOMParser,
            c = d.parseFromString(b, "text/xml")) : (c = new ActiveXObject("Microsoft.XMLDOM"),
            c.async = "false",
            c.loadXML(b))
        } catch (e) {
            c = void 0
        }
        return c && c.documentElement && !c.getElementsByTagName("parsererror").length || eb.error("Invalid XML: " + b),
        c
    }
    ;
    var Hc, Ic, Jc = /#.*$/, Kc = /([?&])_=[^&]*/, Lc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm, Mc = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, Nc = /^(?:GET|HEAD)$/, Oc = /^\/\//, Pc = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/, Qc = {}, Rc = {}, Sc = "*/".concat("*");
    try {
        Ic = location.href
    } catch (Tc) {
        Ic = ob.createElement("a"),
        Ic.href = "",
        Ic = Ic.href
    }
    Hc = Pc.exec(Ic.toLowerCase()) || [],
    eb.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Ic,
            type: "GET",
            isLocal: Mc.test(Hc[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Sc,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": eb.parseJSON,
                "text xml": eb.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, b) {
            return b ? P(P(a, eb.ajaxSettings), b) : P(eb.ajaxSettings, a)
        },
        ajaxPrefilter: N(Qc),
        ajaxTransport: N(Rc),
        ajax: function(a, b) {
            function c(a, b, c, d) {
                var e, k, r, s, u, w = b;
                2 !== t && (t = 2,
                h && clearTimeout(h),
                j = void 0,
                g = d || "",
                v.readyState = a > 0 ? 4 : 0,
                e = a >= 200 && 300 > a || 304 === a,
                c && (s = Q(l, v, c)),
                s = R(l, s, v, e),
                e ? (l.ifModified && (u = v.getResponseHeader("Last-Modified"),
                u && (eb.lastModified[f] = u),
                u = v.getResponseHeader("etag"),
                u && (eb.etag[f] = u)),
                204 === a || "HEAD" === l.type ? w = "nocontent" : 304 === a ? w = "notmodified" : (w = s.state,
                k = s.data,
                r = s.error,
                e = !r)) : (r = w,
                (a || !w) && (w = "error",
                0 > a && (a = 0))),
                v.status = a,
                v.statusText = (b || w) + "",
                e ? o.resolveWith(m, [k, w, v]) : o.rejectWith(m, [v, w, r]),
                v.statusCode(q),
                q = void 0,
                i && n.trigger(e ? "ajaxSuccess" : "ajaxError", [v, l, e ? k : r]),
                p.fireWith(m, [v, w]),
                i && (n.trigger("ajaxComplete", [v, l]),
                --eb.active || eb.event.trigger("ajaxStop")))
            }
            "object" == typeof a && (b = a,
            a = void 0),
            b = b || {};
            var d, e, f, g, h, i, j, k, l = eb.ajaxSetup({}, b), m = l.context || l, n = l.context && (m.nodeType || m.jquery) ? eb(m) : eb.event, o = eb.Deferred(), p = eb.Callbacks("once memory"), q = l.statusCode || {}, r = {}, s = {}, t = 0, u = "canceled", v = {
                readyState: 0,
                getResponseHeader: function(a) {
                    var b;
                    if (2 === t) {
                        if (!k)
                            for (k = {}; b = Lc.exec(g); )
                                k[b[1].toLowerCase()] = b[2];
                        b = k[a.toLowerCase()]
                    }
                    return null  == b ? null  : b
                },
                getAllResponseHeaders: function() {
                    return 2 === t ? g : null
                },
                setRequestHeader: function(a, b) {
                    var c = a.toLowerCase();
                    return t || (a = s[c] = s[c] || a,
                    r[a] = b),
                    this
                },
                overrideMimeType: function(a) {
                    return t || (l.mimeType = a),
                    this
                },
                statusCode: function(a) {
                    var b;
                    if (a)
                        if (2 > t)
                            for (b in a)
                                q[b] = [q[b], a[b]];
                        else
                            v.always(a[v.status]);
                    return this
                },
                abort: function(a) {
                    var b = a || u;
                    return j && j.abort(b),
                    c(0, b),
                    this
                }
            };
            if (o.promise(v).complete = p.add,
            v.success = v.done,
            v.error = v.fail,
            l.url = ((a || l.url || Ic) + "").replace(Jc, "").replace(Oc, Hc[1] + "//"),
            l.type = b.method || b.type || l.method || l.type,
            l.dataTypes = eb.trim(l.dataType || "*").toLowerCase().match(tb) || [""],
            null  == l.crossDomain && (d = Pc.exec(l.url.toLowerCase()),
            l.crossDomain = !(!d || d[1] === Hc[1] && d[2] === Hc[2] && (d[3] || ("http:" === d[1] ? "80" : "443")) === (Hc[3] || ("http:" === Hc[1] ? "80" : "443")))),
            l.data && l.processData && "string" != typeof l.data && (l.data = eb.param(l.data, l.traditional)),
            O(Qc, l, b, v),
            2 === t)
                return v;
            i = eb.event && l.global,
            i && 0 === eb.active++ && eb.event.trigger("ajaxStart"),
            l.type = l.type.toUpperCase(),
            l.hasContent = !Nc.test(l.type),
            f = l.url,
            l.hasContent || (l.data && (f = l.url += (Fc.test(f) ? "&" : "?") + l.data,
            delete l.data),
            l.cache === !1 && (l.url = Kc.test(f) ? f.replace(Kc, "$1_=" + Ec++) : f + (Fc.test(f) ? "&" : "?") + "_=" + Ec++)),
            l.ifModified && (eb.lastModified[f] && v.setRequestHeader("If-Modified-Since", eb.lastModified[f]),
            eb.etag[f] && v.setRequestHeader("If-None-Match", eb.etag[f])),
            (l.data && l.hasContent && l.contentType !== !1 || b.contentType) && v.setRequestHeader("Content-Type", l.contentType),
            v.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + ("*" !== l.dataTypes[0] ? ", " + Sc + "; q=0.01" : "") : l.accepts["*"]);
            for (e in l.headers)
                v.setRequestHeader(e, l.headers[e]);
            if (l.beforeSend && (l.beforeSend.call(m, v, l) === !1 || 2 === t))
                return v.abort();
            u = "abort";
            for (e in {
                success: 1,
                error: 1,
                complete: 1
            })
                v[e](l[e]);
            if (j = O(Rc, l, b, v)) {
                v.readyState = 1,
                i && n.trigger("ajaxSend", [v, l]),
                l.async && l.timeout > 0 && (h = setTimeout(function() {
                    v.abort("timeout")
                }
                , l.timeout));
                try {
                    t = 1,
                    j.send(r, c)
                } catch (w) {
                    if (!(2 > t))
                        throw w;
                    c(-1, w)
                }
            } else
                c(-1, "No Transport");
            return v
        },
        getJSON: function(a, b, c) {
            return eb.get(a, b, c, "json")
        },
        getScript: function(a, b) {
            return eb.get(a, void 0, b, "script")
        }
    }),
    eb.each(["get", "post"], function(a, b) {
        eb[b] = function(a, c, d, e) {
            return eb.isFunction(c) && (e = e || d,
            d = c,
            c = void 0),
            eb.ajax({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            })
        }
    }
    ),
    eb._evalUrl = function(a) {
        return eb.ajax({
            url: a,
            type: "GET",
            dataType: "script",
            async: !1,
            global: !1,
            "throws": !0
        })
    }
    ,
    eb.fn.extend({
        wrapAll: function(a) {
            if (eb.isFunction(a))
                return this.each(function(b) {
                    eb(this).wrapAll(a.call(this, b))
                }
                );
            if (this[0]) {
                var b = eb(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]),
                b.map(function() {
                    for (var a = this; a.firstChild && 1 === a.firstChild.nodeType; )
                        a = a.firstChild;
                    return a
                }
                ).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            return this.each(eb.isFunction(a) ? function(b) {
                eb(this).wrapInner(a.call(this, b))
            }
             : function() {
                var b = eb(this)
                  , c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            }
            )
        },
        wrap: function(a) {
            var b = eb.isFunction(a);
            return this.each(function(c) {
                eb(this).wrapAll(b ? a.call(this, c) : a)
            }
            )
        },
        unwrap: function() {
            return this.parent().each(function() {
                eb.nodeName(this, "body") || eb(this).replaceWith(this.childNodes)
            }
            ).end()
        }
    }),
    eb.expr.filters.hidden = function(a) {
        return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !cb.reliableHiddenOffsets() && "none" === (a.style && a.style.display || eb.css(a, "display"))
    }
    ,
    eb.expr.filters.visible = function(a) {
        return !eb.expr.filters.hidden(a)
    }
    ;
    var Uc = /%20/g
      , Vc = /\[\]$/
      , Wc = /\r?\n/g
      , Xc = /^(?:submit|button|image|reset|file)$/i
      , Yc = /^(?:input|select|textarea|keygen)/i;
    eb.param = function(a, b) {
        var c, d = [], e = function(a, b) {
            b = eb.isFunction(b) ? b() : null  == b ? "" : b,
            d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
        }
        ;
        if (void 0 === b && (b = eb.ajaxSettings && eb.ajaxSettings.traditional),
        eb.isArray(a) || a.jquery && !eb.isPlainObject(a))
            eb.each(a, function() {
                e(this.name, this.value)
            }
            );
        else
            for (c in a)
                S(c, a[c], b, e);
        return d.join("&").replace(Uc, "+")
    }
    ,
    eb.fn.extend({
        serialize: function() {
            return eb.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var a = eb.prop(this, "elements");
                return a ? eb.makeArray(a) : this
            }
            ).filter(function() {
                var a = this.type;
                return this.name && !eb(this).is(":disabled") && Yc.test(this.nodeName) && !Xc.test(a) && (this.checked || !Eb.test(a))
            }
            ).map(function(a, b) {
                var c = eb(this).val();
                return null  == c ? null  : eb.isArray(c) ? eb.map(c, function(a) {
                    return {
                        name: b.name,
                        value: a.replace(Wc, "\r\n")
                    }
                }
                ) : {
                    name: b.name,
                    value: c.replace(Wc, "\r\n")
                }
            }
            ).get()
        }
    }),
    eb.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function() {
        return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && T() || U()
    }
     : T;
    var Zc = 0
      , $c = {}
      , _c = eb.ajaxSettings.xhr();
    a.attachEvent && a.attachEvent("onunload", function() {
        for (var a in $c)
            $c[a](void 0, !0)
    }
    ),
    cb.cors = !!_c && "withCredentials" in _c,
    _c = cb.ajax = !!_c,
    _c && eb.ajaxTransport(function(a) {
        if (!a.crossDomain || cb.cors) {
            var b;
            return {
                send: function(c, d) {
                    var e, f = a.xhr(), g = ++Zc;
                    if (f.open(a.type, a.url, a.async, a.username, a.password),
                    a.xhrFields)
                        for (e in a.xhrFields)
                            f[e] = a.xhrFields[e];
                    a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType),
                    a.crossDomain || c["X-Requested-With"] || (c["X-Requested-With"] = "XMLHttpRequest");
                    for (e in c)
                        void 0 !== c[e] && f.setRequestHeader(e, c[e] + "");
                    f.send(a.hasContent && a.data || null ),
                    b = function(c, e) {
                        var h, i, j;
                        if (b && (e || 4 === f.readyState))
                            if (delete $c[g],
                            b = void 0,
                            f.onreadystatechange = eb.noop,
                            e)
                                4 !== f.readyState && f.abort();
                            else {
                                j = {},
                                h = f.status,
                                "string" == typeof f.responseText && (j.text = f.responseText);
                                try {
                                    i = f.statusText
                                } catch (k) {
                                    i = ""
                                }
                                h || !a.isLocal || a.crossDomain ? 1223 === h && (h = 204) : h = j.text ? 200 : 404
                            }
                        j && d(h, i, j, f.getAllResponseHeaders())
                    }
                    ,
                    a.async ? 4 === f.readyState ? setTimeout(b) : f.onreadystatechange = $c[g] = b : b()
                },
                abort: function() {
                    b && b(void 0, !0)
                }
            }
        }
    }
    ),
    eb.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /(?:java|ecma)script/
        },
        converters: {
            "text script": function(a) {
                return eb.globalEval(a),
                a
            }
        }
    }),
    eb.ajaxPrefilter("script", function(a) {
        void 0 === a.cache && (a.cache = !1),
        a.crossDomain && (a.type = "GET",
        a.global = !1)
    }
    ),
    eb.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var b, c = ob.head || eb("head")[0] || ob.documentElement;
            return {
                send: function(d, e) {
                    b = ob.createElement("script"),
                    b.async = !0,
                    a.scriptCharset && (b.charset = a.scriptCharset),
                    b.src = a.url,
                    b.onload = b.onreadystatechange = function(a, c) {
                        (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null ,
                        b.parentNode && b.parentNode.removeChild(b),
                        b = null ,
                        c || e(200, "success"))
                    }
                    ,
                    c.insertBefore(b, c.firstChild)
                },
                abort: function() {
                    b && b.onload(void 0, !0)
                }
            }
        }
    }
    );
    var ad = []
      , bd = /(=)\?(?=&|$)|\?\?/;
    eb.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = ad.pop() || eb.expando + "_" + Ec++;
            return this[a] = !0,
            a
        }
    }),
    eb.ajaxPrefilter("json jsonp", function(b, c, d) {
        var e, f, g, h = b.jsonp !== !1 && (bd.test(b.url) ? "url" : "string" == typeof b.data && !(b.contentType || "").indexOf("application/x-www-form-urlencoded") && bd.test(b.data) && "data");
        return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = eb.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback,
        h ? b[h] = b[h].replace(bd, "$1" + e) : b.jsonp !== !1 && (b.url += (Fc.test(b.url) ? "&" : "?") + b.jsonp + "=" + e),
        b.converters["script json"] = function() {
            return g || eb.error(e + " was not called"),
            g[0]
        }
        ,
        b.dataTypes[0] = "json",
        f = a[e],
        a[e] = function() {
            g = arguments
        }
        ,
        d.always(function() {
            a[e] = f,
            b[e] && (b.jsonpCallback = c.jsonpCallback,
            ad.push(e)),
            g && eb.isFunction(f) && f(g[0]),
            g = f = void 0
        }
        ),
        "script") : void 0
    }
    ),
    eb.parseHTML = function(a, b, c) {
        if (!a || "string" != typeof a)
            return null ;
        "boolean" == typeof b && (c = b,
        b = !1),
        b = b || ob;
        var d = lb.exec(a)
          , e = !c && [];
        return d ? [b.createElement(d[1])] : (d = eb.buildFragment([a], b, e),
        e && e.length && eb(e).remove(),
        eb.merge([], d.childNodes))
    }
    ;
    var cd = eb.fn.load;
    eb.fn.load = function(a, b, c) {
        if ("string" != typeof a && cd)
            return cd.apply(this, arguments);
        var d, e, f, g = this, h = a.indexOf(" ");
        return h >= 0 && (d = eb.trim(a.slice(h, a.length)),
        a = a.slice(0, h)),
        eb.isFunction(b) ? (c = b,
        b = void 0) : b && "object" == typeof b && (f = "POST"),
        g.length > 0 && eb.ajax({
            url: a,
            type: f,
            dataType: "html",
            data: b
        }).done(function(a) {
            e = arguments,
            g.html(d ? eb("<div>").append(eb.parseHTML(a)).find(d) : a)
        }
        ).complete(c && function(a, b) {
            g.each(c, e || [a.responseText, b, a])
        }
        ),
        this
    }
    ,
    eb.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
        eb.fn[b] = function(a) {
            return this.on(b, a)
        }
    }
    ),
    eb.expr.filters.animated = function(a) {
        return eb.grep(eb.timers, function(b) {
            return a === b.elem
        }
        ).length
    }
    ;
    var dd = a.document.documentElement;
    eb.offset = {
        setOffset: function(a, b, c) {
            var d, e, f, g, h, i, j, k = eb.css(a, "position"), l = eb(a), m = {};
            "static" === k && (a.style.position = "relative"),
            h = l.offset(),
            f = eb.css(a, "top"),
            i = eb.css(a, "left"),
            j = ("absolute" === k || "fixed" === k) && eb.inArray("auto", [f, i]) > -1,
            j ? (d = l.position(),
            g = d.top,
            e = d.left) : (g = parseFloat(f) || 0,
            e = parseFloat(i) || 0),
            eb.isFunction(b) && (b = b.call(a, c, h)),
            null  != b.top && (m.top = b.top - h.top + g),
            null  != b.left && (m.left = b.left - h.left + e),
            "using" in b ? b.using.call(a, m) : l.css(m)
        }
    },
    eb.fn.extend({
        offset: function(a) {
            if (arguments.length)
                return void 0 === a ? this : this.each(function(b) {
                    eb.offset.setOffset(this, a, b)
                }
                );
            var b, c, d = {
                top: 0,
                left: 0
            }, e = this[0], f = e && e.ownerDocument;
            if (f)
                return b = f.documentElement,
                eb.contains(b, e) ? (typeof e.getBoundingClientRect !== xb && (d = e.getBoundingClientRect()),
                c = V(f),
                {
                    top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                    left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
                }) : d
        },
        position: function() {
            if (this[0]) {
                var a, b, c = {
                    top: 0,
                    left: 0
                }, d = this[0];
                return "fixed" === eb.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(),
                b = this.offset(),
                eb.nodeName(a[0], "html") || (c = a.offset()),
                c.top += eb.css(a[0], "borderTopWidth", !0),
                c.left += eb.css(a[0], "borderLeftWidth", !0)),
                {
                    top: b.top - c.top - eb.css(d, "marginTop", !0),
                    left: b.left - c.left - eb.css(d, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent || dd; a && !eb.nodeName(a, "html") && "static" === eb.css(a, "position"); )
                    a = a.offsetParent;
                return a || dd
            }
            )
        }
    }),
    eb.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(a, b) {
        var c = /Y/.test(b);
        eb.fn[a] = function(d) {
            return Db(this, function(a, d, e) {
                var f = V(a);
                return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void (f ? f.scrollTo(c ? eb(f).scrollLeft() : e, c ? e : eb(f).scrollTop()) : a[d] = e)
            }
            , a, d, arguments.length, null )
        }
    }
    ),
    eb.each(["top", "left"], function(a, b) {
        eb.cssHooks[b] = A(cb.pixelPosition, function(a, c) {
            return c ? (c = bc(a, b),
            dc.test(c) ? eb(a).position()[b] + "px" : c) : void 0
        }
        )
    }
    ),
    eb.each({
        Height: "height",
        Width: "width"
    }, function(a, b) {
        eb.each({
            padding: "inner" + a,
            content: b,
            "": "outer" + a
        }, function(c, d) {
            eb.fn[d] = function(d, e) {
                var f = arguments.length && (c || "boolean" != typeof d)
                  , g = c || (d === !0 || e === !0 ? "margin" : "border");
                return Db(this, function(b, c, d) {
                    var e;
                    return eb.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement,
                    Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? eb.css(b, c, g) : eb.style(b, c, d, g)
                }
                , b, f ? d : void 0, f, null )
            }
        }
        )
    }
    ),
    eb.fn.size = function() {
        return this.length
    }
    ,
    eb.fn.andSelf = eb.fn.addBack,
    "function" == typeof define && define.amd && define("jquery", [], function() {
        return eb
    }
    );
    var ed = a.jQuery
      , fd = a.$;
    return eb.noConflict = function(b) {
        return a.$ === eb && (a.$ = fd),
        b && a.jQuery === eb && (a.jQuery = ed),
        eb
    }
    ,
    typeof b === xb && (a.jQuery = a.$ = eb),
    eb
}
),
function() {
    function a(b, d) {
        function f(a) {
            if (f[a] !== q)
                return f[a];
            var b;
            if ("bug-string-char-index" == a)
                b = "a" != "a"[0];
            else if ("json" == a)
                b = f("json-stringify") && f("json-parse");
            else {
                var c, e = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
                if ("json-stringify" == a) {
                    var i = d.stringify
                      , k = "function" == typeof i && t;
                    if (k) {
                        (c = function() {
                            return 1
                        }
                        ).toJSON = c;
                        try {
                            k = "0" === i(0) && "0" === i(new g) && '""' == i(new h) && i(s) === q && i(q) === q && i() === q && "1" === i(c) && "[1]" == i([c]) && "[null]" == i([q]) && "null" == i(null ) && "[null,null,null]" == i([q, s, null ]) && i({
                                a: [c, !0, !1, null , "\x00\b\n\f\r	"]
                            }) == e && "1" === i(null , c) && "[\n 1,\n 2\n]" == i([1, 2], null , 1) && '"-271821-04-20T00:00:00.000Z"' == i(new j(-864e13)) && '"+275760-09-13T00:00:00.000Z"' == i(new j(864e13)) && '"-000001-01-01T00:00:00.000Z"' == i(new j(-621987552e5)) && '"1969-12-31T23:59:59.999Z"' == i(new j(-1))
                        } catch (l) {
                            k = !1
                        }
                    }
                    b = k
                }
                if ("json-parse" == a) {
                    var m = d.parse;
                    if ("function" == typeof m)
                        try {
                            if (0 === m("0") && !m(!1)) {
                                c = m(e);
                                var n = 5 == c.a.length && 1 === c.a[0];
                                if (n) {
                                    try {
                                        n = !m('"	"')
                                    } catch (l) {}
                                    if (n)
                                        try {
                                            n = 1 !== m("01")
                                        } catch (l) {}
                                    if (n)
                                        try {
                                            n = 1 !== m("1.")
                                        } catch (l) {}
                                }
                            }
                        } catch (l) {
                            n = !1
                        }
                    b = n
                }
            }
            return f[a] = !!b
        }
        b || (b = e.Object()),
        d || (d = e.Object());
        var g = b.Number || e.Number
          , h = b.String || e.String
          , i = b.Object || e.Object
          , j = b.Date || e.Date
          , k = b.SyntaxError || e.SyntaxError
          , l = b.TypeError || e.TypeError
          , m = b.Math || e.Math
          , n = b.JSON || e.JSON;
        "object" == typeof n && n && (d.stringify = n.stringify,
        d.parse = n.parse);
        var o, p, q, r = i.prototype, s = r.toString, t = new j(-0xc782b5b800cec);
        try {
            t = -109252 == t.getUTCFullYear() && 0 === t.getUTCMonth() && 1 === t.getUTCDate() && 10 == t.getUTCHours() && 37 == t.getUTCMinutes() && 6 == t.getUTCSeconds() && 708 == t.getUTCMilliseconds()
        } catch (u) {}
        if (!f("json")) {
            var v = "[object Function]"
              , w = "[object Date]"
              , x = "[object Number]"
              , y = "[object String]"
              , z = "[object Array]"
              , A = "[object Boolean]"
              , B = f("bug-string-char-index");
            if (!t)
                var C = m.floor
                  , D = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
                  , E = function(a, b) {
                    return D[b] + 365 * (a - 1970) + C((a - 1969 + (b = +(b > 1))) / 4) - C((a - 1901 + b) / 100) + C((a - 1601 + b) / 400)
                }
                ;
            if ((o = r.hasOwnProperty) || (o = function(a) {
                var b, c = {};
                return (c.__proto__ = null ,
                c.__proto__ = {
                    toString: 1
                },
                c).toString != s ? o = function(a) {
                    var b = this.__proto__
                      , c = a in (this.__proto__ = null ,
                    this);
                    return this.__proto__ = b,
                    c
                }
                 : (b = c.constructor,
                o = function(a) {
                    var c = (this.constructor || b).prototype;
                    return a in this && !(a in c && this[a] === c[a])
                }
                ),
                c = null ,
                o.call(this, a)
            }
            ),
            p = function(a, b) {
                var d, e, f, g = 0;
                (d = function() {
                    this.valueOf = 0
                }
                ).prototype.valueOf = 0,
                e = new d;
                for (f in e)
                    o.call(e, f) && g++;
                return d = e = null ,
                g ? p = 2 == g ? function(a, b) {
                    var c, d = {}, e = s.call(a) == v;
                    for (c in a)
                        e && "prototype" == c || o.call(d, c) || !(d[c] = 1) || !o.call(a, c) || b(c)
                }
                 : function(a, b) {
                    var c, d, e = s.call(a) == v;
                    for (c in a)
                        e && "prototype" == c || !o.call(a, c) || (d = "constructor" === c) || b(c);
                    (d || o.call(a, c = "constructor")) && b(c)
                }
                 : (e = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"],
                p = function(a, b) {
                    var d, f, g = s.call(a) == v, h = !g && "function" != typeof a.constructor && c[typeof a.hasOwnProperty] && a.hasOwnProperty || o;
                    for (d in a)
                        g && "prototype" == d || !h.call(a, d) || b(d);
                    for (f = e.length; d = e[--f]; h.call(a, d) && b(d))
                        ;
                }
                ),
                p(a, b)
            }
            ,
            !f("json-stringify")) {
                var F = {
                    92: "\\\\",
                    34: '\\"',
                    8: "\\b",
                    12: "\\f",
                    10: "\\n",
                    13: "\\r",
                    9: "\\t"
                }
                  , G = "000000"
                  , H = function(a, b) {
                    return (G + (b || 0)).slice(-a)
                }
                  , I = "\\u00"
                  , J = function(a) {
                    for (var b = '"', c = 0, d = a.length, e = !B || d > 10, f = e && (B ? a.split("") : a); d > c; c++) {
                        var g = a.charCodeAt(c);
                        switch (g) {
                        case 8:
                        case 9:
                        case 10:
                        case 12:
                        case 13:
                        case 34:
                        case 92:
                            b += F[g];
                            break;
                        default:
                            if (32 > g) {
                                b += I + H(2, g.toString(16));
                                break
                            }
                            b += e ? f[c] : a.charAt(c)
                        }
                    }
                    return b + '"'
                }
                  , K = function(a, b, c, d, e, f, g) {
                    var h, i, j, k, m, n, r, t, u, v, B, D, F, G, I, L;
                    try {
                        h = b[a]
                    } catch (M) {}
                    if ("object" == typeof h && h)
                        if (i = s.call(h),
                        i != w || o.call(h, "toJSON"))
                            "function" == typeof h.toJSON && (i != x && i != y && i != z || o.call(h, "toJSON")) && (h = h.toJSON(a));
                        else if (h > -1 / 0 && 1 / 0 > h) {
                            if (E) {
                                for (m = C(h / 864e5),
                                j = C(m / 365.2425) + 1970 - 1; E(j + 1, 0) <= m; j++)
                                    ;
                                for (k = C((m - E(j, 0)) / 30.42); E(j, k + 1) <= m; k++)
                                    ;
                                m = 1 + m - E(j, k),
                                n = (h % 864e5 + 864e5) % 864e5,
                                r = C(n / 36e5) % 24,
                                t = C(n / 6e4) % 60,
                                u = C(n / 1e3) % 60,
                                v = n % 1e3
                            } else
                                j = h.getUTCFullYear(),
                                k = h.getUTCMonth(),
                                m = h.getUTCDate(),
                                r = h.getUTCHours(),
                                t = h.getUTCMinutes(),
                                u = h.getUTCSeconds(),
                                v = h.getUTCMilliseconds();
                            h = (0 >= j || j >= 1e4 ? (0 > j ? "-" : "+") + H(6, 0 > j ? -j : j) : H(4, j)) + "-" + H(2, k + 1) + "-" + H(2, m) + "T" + H(2, r) + ":" + H(2, t) + ":" + H(2, u) + "." + H(3, v) + "Z"
                        } else
                            h = null ;
                    if (c && (h = c.call(b, a, h)),
                    null  === h)
                        return "null";
                    if (i = s.call(h),
                    i == A)
                        return "" + h;
                    if (i == x)
                        return h > -1 / 0 && 1 / 0 > h ? "" + h : "null";
                    if (i == y)
                        return J("" + h);
                    if ("object" == typeof h) {
                        for (G = g.length; G--; )
                            if (g[G] === h)
                                throw l();
                        if (g.push(h),
                        B = [],
                        I = f,
                        f += e,
                        i == z) {
                            for (F = 0,
                            G = h.length; G > F; F++)
                                D = K(F, h, c, d, e, f, g),
                                B.push(D === q ? "null" : D);
                            L = B.length ? e ? "[\n" + f + B.join(",\n" + f) + "\n" + I + "]" : "[" + B.join(",") + "]" : "[]"
                        } else
                            p(d || h, function(a) {
                                var b = K(a, h, c, d, e, f, g);
                                b !== q && B.push(J(a) + ":" + (e ? " " : "") + b)
                            }
                            ),
                            L = B.length ? e ? "{\n" + f + B.join(",\n" + f) + "\n" + I + "}" : "{" + B.join(",") + "}" : "{}";
                        return g.pop(),
                        L
                    }
                }
                ;
                d.stringify = function(a, b, d) {
                    var e, f, g, h;
                    if (c[typeof b] && b)
                        if ((h = s.call(b)) == v)
                            f = b;
                        else if (h == z) {
                            g = {};
                            for (var i, j = 0, k = b.length; k > j; i = b[j++],
                            h = s.call(i),
                            (h == y || h == x) && (g[i] = 1))
                                ;
                        }
                    if (d)
                        if ((h = s.call(d)) == x) {
                            if ((d -= d % 1) > 0)
                                for (e = "",
                                d > 10 && (d = 10); e.length < d; e += " ")
                                    ;
                        } else
                            h == y && (e = d.length <= 10 ? d : d.slice(0, 10));
                    return K("", (i = {},
                    i[""] = a,
                    i), f, g, e, "", [])
                }
            }
            if (!f("json-parse")) {
                var L, M, N = h.fromCharCode, O = {
                    92: "\\",
                    34: '"',
                    47: "/",
                    98: "\b",
                    116: "	",
                    110: "\n",
                    102: "\f",
                    114: "\r"
                }, P = function() {
                    throw L = M = null ,
                    k()
                }
                , Q = function() {
                    for (var a, b, c, d, e, f = M, g = f.length; g > L; )
                        switch (e = f.charCodeAt(L)) {
                        case 9:
                        case 10:
                        case 13:
                        case 32:
                            L++;
                            break;
                        case 123:
                        case 125:
                        case 91:
                        case 93:
                        case 58:
                        case 44:
                            return a = B ? f.charAt(L) : f[L],
                            L++,
                            a;
                        case 34:
                            for (a = "@",
                            L++; g > L; )
                                if (e = f.charCodeAt(L),
                                32 > e)
                                    P();
                                else if (92 == e)
                                    switch (e = f.charCodeAt(++L)) {
                                    case 92:
                                    case 34:
                                    case 47:
                                    case 98:
                                    case 116:
                                    case 110:
                                    case 102:
                                    case 114:
                                        a += O[e],
                                        L++;
                                        break;
                                    case 117:
                                        for (b = ++L,
                                        c = L + 4; c > L; L++)
                                            e = f.charCodeAt(L),
                                            e >= 48 && 57 >= e || e >= 97 && 102 >= e || e >= 65 && 70 >= e || P();
                                        a += N("0x" + f.slice(b, L));
                                        break;
                                    default:
                                        P()
                                    }
                                else {
                                    if (34 == e)
                                        break;
                                    for (e = f.charCodeAt(L),
                                    b = L; e >= 32 && 92 != e && 34 != e; )
                                        e = f.charCodeAt(++L);
                                    a += f.slice(b, L)
                                }
                            if (34 == f.charCodeAt(L))
                                return L++,
                                a;
                            P();
                        default:
                            if (b = L,
                            45 == e && (d = !0,
                            e = f.charCodeAt(++L)),
                            e >= 48 && 57 >= e) {
                                for (48 == e && (e = f.charCodeAt(L + 1),
                                e >= 48 && 57 >= e) && P(),
                                d = !1; g > L && (e = f.charCodeAt(L),
                                e >= 48 && 57 >= e); L++)
                                    ;
                                if (46 == f.charCodeAt(L)) {
                                    for (c = ++L; g > c && (e = f.charCodeAt(c),
                                    e >= 48 && 57 >= e); c++)
                                        ;
                                    c == L && P(),
                                    L = c
                                }
                                if (e = f.charCodeAt(L),
                                101 == e || 69 == e) {
                                    for (e = f.charCodeAt(++L),
                                    (43 == e || 45 == e) && L++,
                                    c = L; g > c && (e = f.charCodeAt(c),
                                    e >= 48 && 57 >= e); c++)
                                        ;
                                    c == L && P(),
                                    L = c
                                }
                                return +f.slice(b, L)
                            }
                            if (d && P(),
                            "true" == f.slice(L, L + 4))
                                return L += 4,
                                !0;
                            if ("false" == f.slice(L, L + 5))
                                return L += 5,
                                !1;
                            if ("null" == f.slice(L, L + 4))
                                return L += 4,
                                null ;
                            P()
                        }
                    return "$"
                }
                , R = function(a) {
                    var b, c;
                    if ("$" == a && P(),
                    "string" == typeof a) {
                        if ("@" == (B ? a.charAt(0) : a[0]))
                            return a.slice(1);
                        if ("[" == a) {
                            for (b = []; a = Q(),
                            "]" != a; c || (c = !0))
                                c && ("," == a ? (a = Q(),
                                "]" == a && P()) : P()),
                                "," == a && P(),
                                b.push(R(a));
                            return b
                        }
                        if ("{" == a) {
                            for (b = {}; a = Q(),
                            "}" != a; c || (c = !0))
                                c && ("," == a ? (a = Q(),
                                "}" == a && P()) : P()),
                                ("," == a || "string" != typeof a || "@" != (B ? a.charAt(0) : a[0]) || ":" != Q()) && P(),
                                b[a.slice(1)] = R(Q());
                            return b
                        }
                        P()
                    }
                    return a
                }
                , S = function(a, b, c) {
                    var d = T(a, b, c);
                    d === q ? delete a[b] : a[b] = d
                }
                , T = function(a, b, c) {
                    var d, e = a[b];
                    if ("object" == typeof e && e)
                        if (s.call(e) == z)
                            for (d = e.length; d--; )
                                S(e, d, c);
                        else
                            p(e, function(a) {
                                S(e, a, c)
                            }
                            );
                    return c.call(a, b, e)
                }
                ;
                d.parse = function(a, b) {
                    var c, d;
                    return L = 0,
                    M = "" + a,
                    c = R(Q()),
                    "$" != Q() && P(),
                    L = M = null ,
                    b && s.call(b) == v ? T((d = {},
                    d[""] = c,
                    d), "", b) : c
                }
            }
        }
        return d.runInContext = a,
        d
    }
    var b = "function" == typeof define && define.amd
      , c = {
        "function": !0,
        object: !0
    }
      , d = c[typeof exports] && exports && !exports.nodeType && exports
      , e = c[typeof window] && window || this
      , f = d && c[typeof module] && module && !module.nodeType && "object" == typeof global && global;
    if (!f || f.global !== f && f.window !== f && f.self !== f || (e = f),
    d && !b)
        a(e, d);
    else {
        var g = e.JSON
          , h = e.JSON3
          , i = !1
          , j = a(e, e.JSON3 = {
            noConflict: function() {
                return i || (i = !0,
                e.JSON = g,
                e.JSON3 = h,
                g = h = null ),
                j
            }
        });
        e.JSON = {
            parse: j.parse,
            stringify: j.stringify
        }
    }
    b && define(function() {
        return j
    }
    )
}
.call(this),
"undefined" == typeof jQuery)
    throw new Error("Bootstrap's JavaScript requires jQuery");
+function(a) {
    "use strict";
    function b() {
        var a = document.createElement("bootstrap")
          , b = {
            WebkitTransition: "webkitTransitionEnd",
            MozTransition: "transitionend",
            OTransition: "oTransitionEnd otransitionend",
            transition: "transitionend"
        };
        for (var c in b)
            if (void 0 !== a.style[c])
                return {
                    end: b[c]
                };
        return !1
    }
    a.fn.emulateTransitionEnd = function(b) {
        var c = !1
          , d = this;
        a(this).one("bsTransitionEnd", function() {
            c = !0
        }
        );
        var e = function() {
            c || a(d).trigger(a.support.transition.end)
        }
        ;
        return setTimeout(e, b),
        this
    }
    ,
    a(function() {
        a.support.transition = b(),
        a.support.transition && (a.event.special.bsTransitionEnd = {
            bindType: a.support.transition.end,
            delegateType: a.support.transition.end,
            handle: function(b) {
                return a(b.target).is(this) ? b.handleObj.handler.apply(this, arguments) : void 0
            }
        })
    }
    )
}
(jQuery),
+function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var c = a(this)
              , e = c.data("bs.alert");
            e || c.data("bs.alert", e = new d(this)),
            "string" == typeof b && e[b].call(c)
        }
        )
    }
    var c = '[data-dismiss="alert"]'
      , d = function(b) {
        a(b).on("click", c, this.close)
    }
    ;
    d.VERSION = "3.2.0",
    d.prototype.close = function(b) {
        function c() {
            f.detach().trigger("closed.bs.alert").remove()
        }
        var d = a(this)
          , e = d.attr("data-target");
        e || (e = d.attr("href"),
        e = e && e.replace(/.*(?=#[^\s]*$)/, ""));
        var f = a(e);
        b && b.preventDefault(),
        f.length || (f = d.hasClass("alert") ? d : d.parent()),
        f.trigger(b = a.Event("close.bs.alert")),
        b.isDefaultPrevented() || (f.removeClass("in"),
        a.support.transition && f.hasClass("fade") ? f.one("bsTransitionEnd", c).emulateTransitionEnd(150) : c())
    }
    ;
    var e = a.fn.alert;
    a.fn.alert = b,
    a.fn.alert.Constructor = d,
    a.fn.alert.noConflict = function() {
        return a.fn.alert = e,
        this
    }
    ,
    a(document).on("click.bs.alert.data-api", c, d.prototype.close)
}
(jQuery),
+function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this)
              , e = d.data("bs.button")
              , f = "object" == typeof b && b;
            e || d.data("bs.button", e = new c(this,f)),
            "toggle" == b ? e.toggle() : b && e.setState(b)
        }
        )
    }
    var c = function(b, d) {
        this.$element = a(b),
        this.options = a.extend({}, c.DEFAULTS, d),
        this.isLoading = !1
    }
    ;
    c.VERSION = "3.2.0",
    c.DEFAULTS = {
        loadingText: "loading..."
    },
    c.prototype.setState = function(b) {
        var c = "disabled"
          , d = this.$element
          , e = d.is("input") ? "val" : "html"
          , f = d.data();
        b += "Text",
        null  == f.resetText && d.data("resetText", d[e]()),
        d[e](null  == f[b] ? this.options[b] : f[b]),
        setTimeout(a.proxy(function() {
            "loadingText" == b ? (this.isLoading = !0,
            d.addClass(c).attr(c, c)) : this.isLoading && (this.isLoading = !1,
            d.removeClass(c).removeAttr(c))
        }
        , this), 0)
    }
    ,
    c.prototype.toggle = function() {
        var a = !0
          , b = this.$element.closest('[data-toggle="buttons"]');
        if (b.length) {
            var c = this.$element.find("input");
            "radio" == c.prop("type") && (c.prop("checked") && this.$element.hasClass("active") ? a = !1 : b.find(".active").removeClass("active")),
            a && c.prop("checked", !this.$element.hasClass("active")).trigger("change")
        }
        a && this.$element.toggleClass("active")
    }
    ;
    var d = a.fn.button;
    a.fn.button = b,
    a.fn.button.Constructor = c,
    a.fn.button.noConflict = function() {
        return a.fn.button = d,
        this
    }
    ,
    a(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(c) {
        var d = a(c.target);
        d.hasClass("btn") || (d = d.closest(".btn")),
        b.call(d, "toggle"),
        c.preventDefault()
    }
    )
}
(jQuery),
+function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this)
              , e = d.data("bs.carousel")
              , f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b)
              , g = "string" == typeof b ? b : f.slide;
            e || d.data("bs.carousel", e = new c(this,f)),
            "number" == typeof b ? e.to(b) : g ? e[g]() : f.interval && e.pause().cycle()
        }
        )
    }
    var c = function(b, c) {
        this.$element = a(b).on("keydown.bs.carousel", a.proxy(this.keydown, this)),
        this.$indicators = this.$element.find(".carousel-indicators"),
        this.options = c,
        this.paused = this.sliding = this.interval = this.$active = this.$items = null ,
        "hover" == this.options.pause && this.$element.on("mouseenter.bs.carousel", a.proxy(this.pause, this)).on("mouseleave.bs.carousel", a.proxy(this.cycle, this))
    }
    ;
    c.VERSION = "3.2.0",
    c.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0
    },
    c.prototype.keydown = function(a) {
        switch (a.which) {
        case 37:
            this.prev();
            break;
        case 39:
            this.next();
            break;
        default:
            return
        }
        a.preventDefault()
    }
    ,
    c.prototype.cycle = function(b) {
        return b || (this.paused = !1),
        this.interval && clearInterval(this.interval),
        this.options.interval && !this.paused && (this.interval = setInterval(a.proxy(this.next, this), this.options.interval)),
        this
    }
    ,
    c.prototype.getItemIndex = function(a) {
        return this.$items = a.parent().children(".item"),
        this.$items.index(a || this.$active)
    }
    ,
    c.prototype.to = function(b) {
        var c = this
          , d = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        return b > this.$items.length - 1 || 0 > b ? void 0 : this.sliding ? this.$element.one("slid.bs.carousel", function() {
            c.to(b)
        }
        ) : d == b ? this.pause().cycle() : this.slide(b > d ? "next" : "prev", a(this.$items[b]))
    }
    ,
    c.prototype.pause = function(b) {
        return b || (this.paused = !0),
        this.$element.find(".next, .prev").length && a.support.transition && (this.$element.trigger(a.support.transition.end),
        this.cycle(!0)),
        this.interval = clearInterval(this.interval),
        this
    }
    ,
    c.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }
    ,
    c.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }
    ,
    c.prototype.slide = function(b, c) {
        var d = this.$element.find(".item.active")
          , e = c || d[b]()
          , f = this.interval
          , g = "next" == b ? "left" : "right"
          , h = "next" == b ? "first" : "last"
          , i = this;
        if (!e.length) {
            if (!this.options.wrap)
                return;
            e = this.$element.find(".item")[h]()
        }
        if (e.hasClass("active"))
            return this.sliding = !1;
        var j = e[0]
          , k = a.Event("slide.bs.carousel", {
            relatedTarget: j,
            direction: g
        });
        if (this.$element.trigger(k),
        !k.isDefaultPrevented()) {
            if (this.sliding = !0,
            f && this.pause(),
            this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var l = a(this.$indicators.children()[this.getItemIndex(e)]);
                l && l.addClass("active")
            }
            var m = a.Event("slid.bs.carousel", {
                relatedTarget: j,
                direction: g
            });
            return a.support.transition && this.$element.hasClass("slide") ? (e.addClass(b),
            e[0].offsetWidth,
            d.addClass(g),
            e.addClass(g),
            d.one("bsTransitionEnd", function() {
                e.removeClass([b, g].join(" ")).addClass("active"),
                d.removeClass(["active", g].join(" ")),
                i.sliding = !1,
                setTimeout(function() {
                    i.$element.trigger(m)
                }
                , 0)
            }
            ).emulateTransitionEnd(1e3 * d.css("transition-duration").slice(0, -1))) : (d.removeClass("active"),
            e.addClass("active"),
            this.sliding = !1,
            this.$element.trigger(m)),
            f && this.cycle(),
            this
        }
    }
    ;
    var d = a.fn.carousel;
    a.fn.carousel = b,
    a.fn.carousel.Constructor = c,
    a.fn.carousel.noConflict = function() {
        return a.fn.carousel = d,
        this
    }
    ,
    a(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(c) {
        var d, e = a(this), f = a(e.attr("data-target") || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""));
        if (f.hasClass("carousel")) {
            var g = a.extend({}, f.data(), e.data())
              , h = e.attr("data-slide-to");
            h && (g.interval = !1),
            b.call(f, g),
            h && f.data("bs.carousel").to(h),
            c.preventDefault()
        }
    }
    ),
    a(window).on("load", function() {
        a('[data-ride="carousel"]').each(function() {
            var c = a(this);
            b.call(c, c.data())
        }
        )
    }
    )
}
(jQuery),
+function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this)
              , e = d.data("bs.collapse")
              , f = a.extend({}, c.DEFAULTS, d.data(), "object" == typeof b && b);
            !e && f.toggle && "show" == b && (b = !b),
            e || d.data("bs.collapse", e = new c(this,f)),
            "string" == typeof b && e[b]()
        }
        )
    }
    var c = function(b, d) {
        this.$element = a(b),
        this.options = a.extend({}, c.DEFAULTS, d),
        this.transitioning = null ,
        this.options.parent && (this.$parent = a(this.options.parent)),
        this.options.toggle && this.toggle()
    }
    ;
    c.VERSION = "3.2.0",
    c.DEFAULTS = {
        toggle: !0
    },
    c.prototype.dimension = function() {
        var a = this.$element.hasClass("width");
        return a ? "width" : "height"
    }
    ,
    c.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var c = a.Event("show.bs.collapse");
            if (this.$element.trigger(c),
            !c.isDefaultPrevented()) {
                var d = this.$parent && this.$parent.find("> .panel > .in");
                if (d && d.length) {
                    var e = d.data("bs.collapse");
                    if (e && e.transitioning)
                        return;
                    b.call(d, "hide"),
                    e || d.data("bs.collapse", null )
                }
                var f = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[f](0),
                this.transitioning = 1;
                var g = function() {
                    this.$element.removeClass("collapsing").addClass("collapse in")[f](""),
                    this.transitioning = 0,
                    this.$element.trigger("shown.bs.collapse")
                }
                ;
                if (!a.support.transition)
                    return g.call(this);
                var h = a.camelCase(["scroll", f].join("-"));
                this.$element.one("bsTransitionEnd", a.proxy(g, this)).emulateTransitionEnd(350)[f](this.$element[0][h])
            }
        }
    }
    ,
    c.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var b = a.Event("hide.bs.collapse");
            if (this.$element.trigger(b),
            !b.isDefaultPrevented()) {
                var c = this.dimension();
                this.$element[c](this.$element[c]())[0].offsetHeight,
                this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"),
                this.transitioning = 1;
                var d = function() {
                    this.transitioning = 0,
                    this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                }
                ;
                return a.support.transition ? void this.$element[c](0).one("bsTransitionEnd", a.proxy(d, this)).emulateTransitionEnd(350) : d.call(this)
            }
        }
    }
    ,
    c.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    }
    ;
    var d = a.fn.collapse;
    a.fn.collapse = b,
    a.fn.collapse.Constructor = c,
    a.fn.collapse.noConflict = function() {
        return a.fn.collapse = d,
        this
    }
    ,
    a(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(c) {
        var d, e = a(this), f = e.attr("data-target") || c.preventDefault() || (d = e.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""), g = a(f), h = g.data("bs.collapse"), i = h ? "toggle" : e.data(), j = e.attr("data-parent"), k = j && a(j);
        h && h.transitioning || (k && k.find('[data-toggle="collapse"][data-parent="' + j + '"]').not(e).addClass("collapsed"),
        e[g.hasClass("in") ? "addClass" : "removeClass"]("collapsed")),
        b.call(g, i)
    }
    )
}
(jQuery),
+function(a) {
    "use strict";
    function b(b) {
        b && 3 === b.which || (a(e).remove(),
        a(f).each(function() {
            var d = c(a(this))
              , e = {
                relatedTarget: this
            };
            d.hasClass("open") && (d.trigger(b = a.Event("hide.bs.dropdown", e)),
            b.isDefaultPrevented() || d.removeClass("open").trigger("hidden.bs.dropdown", e))
        }
        ))
    }
    function c(b) {
        var c = b.attr("data-target");
        c || (c = b.attr("href"),
        c = c && /#[A-Za-z]/.test(c) && c.replace(/.*(?=#[^\s]*$)/, ""));
        var d = c && a(c);
        return d && d.length ? d : b.parent()
    }
    function d(b) {
        return this.each(function() {
            var c = a(this)
              , d = c.data("bs.dropdown");
            d || c.data("bs.dropdown", d = new g(this)),
            "string" == typeof b && d[b].call(c)
        }
        )
    }
    var e = ".dropdown-backdrop"
      , f = '[data-toggle="dropdown"]'
      , g = function(b) {
        a(b).on("click.bs.dropdown", this.toggle)
    }
    ;
    g.VERSION = "3.2.0",
    g.prototype.toggle = function(d) {
        var e = a(this);
        if (!e.is(".disabled, :disabled")) {
            var f = c(e)
              , g = f.hasClass("open");
            if (b(),
            !g) {
                "ontouchstart" in document.documentElement && !f.closest(".navbar-nav").length && a('<div class="dropdown-backdrop"/>').insertAfter(a(this)).on("click", b);
                var h = {
                    relatedTarget: this
                };
                if (f.trigger(d = a.Event("show.bs.dropdown", h)),
                d.isDefaultPrevented())
                    return;
                e.trigger("focus"),
                f.toggleClass("open").trigger("shown.bs.dropdown", h)
            }
            return !1
        }
    }
    ,
    g.prototype.keydown = function(b) {
        if (/(38|40|27)/.test(b.keyCode)) {
            var d = a(this);
            if (b.preventDefault(),
            b.stopPropagation(),
            !d.is(".disabled, :disabled")) {
                var e = c(d)
                  , g = e.hasClass("open");
                if (!g || g && 27 == b.keyCode)
                    return 27 == b.which && e.find(f).trigger("focus"),
                    d.trigger("click");
                var h = " li:not(.divider):visible a"
                  , i = e.find('[role="menu"]' + h + ', [role="listbox"]' + h);
                if (i.length) {
                    var j = i.index(i.filter(":focus"));
                    38 == b.keyCode && j > 0 && j--,
                    40 == b.keyCode && j < i.length - 1 && j++,
                    ~j || (j = 0),
                    i.eq(j).trigger("focus")
                }
            }
        }
    }
    ;
    var h = a.fn.dropdown;
    a.fn.dropdown = d,
    a.fn.dropdown.Constructor = g,
    a.fn.dropdown.noConflict = function() {
        return a.fn.dropdown = h,
        this
    }
    ,
    a(document).on("click.bs.dropdown.data-api", b).on("click.bs.dropdown.data-api", ".dropdown form", function(a) {
        a.stopPropagation()
    }
    ).on("click.bs.dropdown.data-api", f, g.prototype.toggle).on("keydown.bs.dropdown.data-api", f + ', [role="menu"], [role="listbox"]', g.prototype.keydown)
}
(jQuery),
+function(a) {
    "use strict";
    function b(b, d) {
        return this.each(function() {
            var e = a(this)
              , f = e.data("bs.modal")
              , g = a.extend({}, c.DEFAULTS, e.data(), "object" == typeof b && b);
            f || e.data("bs.modal", f = new c(this,g)),
            "string" == typeof b ? f[b](d) : g.show && f.show(d)
        }
        )
    }
    var c = function(b, c) {
        this.options = c,
        this.$body = a(document.body),
        this.$element = a(b),
        this.$backdrop = this.isShown = null ,
        this.scrollbarWidth = 0,
        this.options.remote && this.$element.find(".modal-content").load(this.options.remote, a.proxy(function() {
            this.$element.trigger("loaded.bs.modal")
        }
        , this))
    }
    ;
    c.VERSION = "3.2.0",
    c.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    },
    c.prototype.toggle = function(a) {
        return this.isShown ? this.hide() : this.show(a)
    }
    ,
    c.prototype.show = function(b) {
        var c = this
          , d = a.Event("show.bs.modal", {
            relatedTarget: b
        });
        this.$element.trigger(d),
        this.isShown || d.isDefaultPrevented() || (this.isShown = !0,
        this.checkScrollbar(),
        this.$body.addClass("modal-open"),
        this.setScrollbar(),
        this.escape(),
        this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', a.proxy(this.hide, this)),
        this.backdrop(function() {
            var d = a.support.transition && c.$element.hasClass("fade");
            c.$element.parent().length || c.$element.appendTo(c.$body),
            c.$element.show().scrollTop(0),
            d && c.$element[0].offsetWidth,
            c.$element.addClass("in").attr("aria-hidden", !1),
            c.enforceFocus();
            var e = a.Event("shown.bs.modal", {
                relatedTarget: b
            });
            d ? c.$element.find(".modal-dialog").one("bsTransitionEnd", function() {
                c.$element.trigger("focus").trigger(e)
            }
            ).emulateTransitionEnd(300) : c.$element.trigger("focus").trigger(e)
        }
        ))
    }
    ,
    c.prototype.hide = function(b) {
        b && b.preventDefault(),
        b = a.Event("hide.bs.modal"),
        this.$element.trigger(b),
        this.isShown && !b.isDefaultPrevented() && (this.isShown = !1,
        this.$body.removeClass("modal-open"),
        this.resetScrollbar(),
        this.escape(),
        a(document).off("focusin.bs.modal"),
        this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.bs.modal"),
        a.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", a.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
    }
    ,
    c.prototype.enforceFocus = function() {
        a(document).off("focusin.bs.modal").on("focusin.bs.modal", a.proxy(function(a) {
            this.$element[0] === a.target || this.$element.has(a.target).length || this.$element.trigger("focus")
        }
        , this))
    }
    ,
    c.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", a.proxy(function(a) {
            27 == a.which && this.hide()
        }
        , this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
    }
    ,
    c.prototype.hideModal = function() {
        var a = this;
        this.$element.hide(),
        this.backdrop(function() {
            a.$element.trigger("hidden.bs.modal")
        }
        )
    }
    ,
    c.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(),
        this.$backdrop = null
    }
    ,
    c.prototype.backdrop = function(b) {
        var c = this
          , d = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var e = a.support.transition && d;
            if (this.$backdrop = a('<div class="modal-backdrop ' + d + '" />').appendTo(this.$body),
            this.$element.on("click.dismiss.bs.modal", a.proxy(function(a) {
                a.target === a.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
            }
            , this)),
            e && this.$backdrop[0].offsetWidth,
            this.$backdrop.addClass("in"),
            !b)
                return;
            e ? this.$backdrop.one("bsTransitionEnd", b).emulateTransitionEnd(150) : b()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var f = function() {
                c.removeBackdrop(),
                b && b()
            }
            ;
            a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", f).emulateTransitionEnd(150) : f()
        } else
            b && b()
    }
    ,
    c.prototype.checkScrollbar = function() {
        document.body.clientWidth >= window.innerWidth || (this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar())
    }
    ,
    c.prototype.setScrollbar = function() {
        var a = parseInt(this.$body.css("padding-right") || 0, 10);
        this.scrollbarWidth && this.$body.css("padding-right", a + this.scrollbarWidth)
    }
    ,
    c.prototype.resetScrollbar = function() {
        this.$body.css("padding-right", "")
    }
    ,
    c.prototype.measureScrollbar = function() {
        var a = document.createElement("div");
        a.className = "modal-scrollbar-measure",
        this.$body.append(a);
        var b = a.offsetWidth - a.clientWidth;
        return this.$body[0].removeChild(a),
        b
    }
    ;
    var d = a.fn.modal;
    a.fn.modal = b,
    a.fn.modal.Constructor = c,
    a.fn.modal.noConflict = function() {
        return a.fn.modal = d,
        this
    }
    ,
    a(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(c) {
        var d = a(this)
          , e = d.attr("href")
          , f = a(d.attr("data-target") || e && e.replace(/.*(?=#[^\s]+$)/, ""))
          , g = f.data("bs.modal") ? "toggle" : a.extend({
            remote: !/#/.test(e) && e
        }, f.data(), d.data());
        d.is("a") && c.preventDefault(),
        f.one("show.bs.modal", function(a) {
            a.isDefaultPrevented() || f.one("hidden.bs.modal", function() {
                d.is(":visible") && d.trigger("focus")
            }
            )
        }
        ),
        b.call(f, g, this)
    }
    )
}
(jQuery),
+function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this)
              , e = d.data("bs.tooltip")
              , f = "object" == typeof b && b;
            (e || "destroy" != b) && (e || d.data("bs.tooltip", e = new c(this,f)),
            "string" == typeof b && e[b]())
        }
        )
    }
    var c = function(a, b) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null ,
        this.init("tooltip", a, b)
    }
    ;
    c.VERSION = "3.2.0",
    c.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1,
        viewport: {
            selector: "body",
            padding: 0
        }
    },
    c.prototype.init = function(b, c, d) {
        this.enabled = !0,
        this.type = b,
        this.$element = a(c),
        this.options = this.getOptions(d),
        this.$viewport = this.options.viewport && a(this.options.viewport.selector || this.options.viewport);
        for (var e = this.options.trigger.split(" "), f = e.length; f--; ) {
            var g = e[f];
            if ("click" == g)
                this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
            else if ("manual" != g) {
                var h = "hover" == g ? "mouseenter" : "focusin"
                  , i = "hover" == g ? "mouseleave" : "focusout";
                this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)),
                this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = a.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }
    ,
    c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }
    ,
    c.prototype.getOptions = function(b) {
        return b = a.extend({}, this.getDefaults(), this.$element.data(), b),
        b.delay && "number" == typeof b.delay && (b.delay = {
            show: b.delay,
            hide: b.delay
        }),
        b
    }
    ,
    c.prototype.getDelegateOptions = function() {
        var b = {}
          , c = this.getDefaults();
        return this._options && a.each(this._options, function(a, d) {
            c[a] != d && (b[a] = d)
        }
        ),
        b
    }
    ,
    c.prototype.enter = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget,this.getDelegateOptions()),
        a(b.currentTarget).data("bs." + this.type, c)),
        clearTimeout(c.timeout),
        c.hoverState = "in",
        c.options.delay && c.options.delay.show ? void (c.timeout = setTimeout(function() {
            "in" == c.hoverState && c.show()
        }
        , c.options.delay.show)) : c.show()
    }
    ,
    c.prototype.leave = function(b) {
        var c = b instanceof this.constructor ? b : a(b.currentTarget).data("bs." + this.type);
        return c || (c = new this.constructor(b.currentTarget,this.getDelegateOptions()),
        a(b.currentTarget).data("bs." + this.type, c)),
        clearTimeout(c.timeout),
        c.hoverState = "out",
        c.options.delay && c.options.delay.hide ? void (c.timeout = setTimeout(function() {
            "out" == c.hoverState && c.hide()
        }
        , c.options.delay.hide)) : c.hide()
    }
    ,
    c.prototype.show = function() {
        var b = a.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(b);
            var c = a.contains(document.documentElement, this.$element[0]);
            if (b.isDefaultPrevented() || !c)
                return;
            var d = this
              , e = this.tip()
              , f = this.getUID(this.type);
            this.setContent(),
            e.attr("id", f),
            this.$element.attr("aria-describedby", f),
            this.options.animation && e.addClass("fade");
            var g = "function" == typeof this.options.placement ? this.options.placement.call(this, e[0], this.$element[0]) : this.options.placement
              , h = /\s?auto?\s?/i
              , i = h.test(g);
            i && (g = g.replace(h, "") || "top"),
            e.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(g).data("bs." + this.type, this),
            this.options.container ? e.appendTo(this.options.container) : e.insertAfter(this.$element);
            var j = this.getPosition()
              , k = e[0].offsetWidth
              , l = e[0].offsetHeight;
            if (i) {
                var m = g
                  , n = this.$element.parent()
                  , o = this.getPosition(n);
                g = "bottom" == g && j.top + j.height + l - o.scroll > o.height ? "top" : "top" == g && j.top - o.scroll - l < 0 ? "bottom" : "right" == g && j.right + k > o.width ? "left" : "left" == g && j.left - k < o.left ? "right" : g,
                e.removeClass(m).addClass(g)
            }
            var p = this.getCalculatedOffset(g, j, k, l);
            this.applyPlacement(p, g);
            var q = function() {
                d.$element.trigger("shown.bs." + d.type),
                d.hoverState = null
            }
            ;
            a.support.transition && this.$tip.hasClass("fade") ? e.one("bsTransitionEnd", q).emulateTransitionEnd(150) : q()
        }
    }
    ,
    c.prototype.applyPlacement = function(b, c) {
        var d = this.tip()
          , e = d[0].offsetWidth
          , f = d[0].offsetHeight
          , g = parseInt(d.css("margin-top"), 10)
          , h = parseInt(d.css("margin-left"), 10);
        isNaN(g) && (g = 0),
        isNaN(h) && (h = 0),
        b.top = b.top + g,
        b.left = b.left + h,
        a.offset.setOffset(d[0], a.extend({
            using: function(a) {
                d.css({
                    top: Math.round(a.top),
                    left: Math.round(a.left)
                })
            }
        }, b), 0),
        d.addClass("in");
        var i = d[0].offsetWidth
          , j = d[0].offsetHeight;
        "top" == c && j != f && (b.top = b.top + f - j);
        var k = this.getViewportAdjustedDelta(c, b, i, j);
        k.left ? b.left += k.left : b.top += k.top;
        var l = k.left ? 2 * k.left - e + i : 2 * k.top - f + j
          , m = k.left ? "left" : "top"
          , n = k.left ? "offsetWidth" : "offsetHeight";
        d.offset(b),
        this.replaceArrow(l, d[0][n], m)
    }
    ,
    c.prototype.replaceArrow = function(a, b, c) {
        this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "")
    }
    ,
    c.prototype.setContent = function() {
        var a = this.tip()
          , b = this.getTitle();
        a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b),
        a.removeClass("fade in top bottom left right")
    }
    ,
    c.prototype.hide = function() {
        function b() {
            "in" != c.hoverState && d.detach(),
            c.$element.trigger("hidden.bs." + c.type)
        }
        var c = this
          , d = this.tip()
          , e = a.Event("hide.bs." + this.type);
        return this.$element.removeAttr("aria-describedby"),
        this.$element.trigger(e),
        e.isDefaultPrevented() ? void 0 : (d.removeClass("in"),
        a.support.transition && this.$tip.hasClass("fade") ? d.one("bsTransitionEnd", b).emulateTransitionEnd(150) : b(),
        this.hoverState = null ,
        this)
    }
    ,
    c.prototype.fixTitle = function() {
        var a = this.$element;
        (a.attr("title") || "string" != typeof a.attr("data-original-title")) && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
    }
    ,
    c.prototype.hasContent = function() {
        return this.getTitle()
    }
    ,
    c.prototype.getPosition = function(b) {
        b = b || this.$element;
        var c = b[0]
          , d = "BODY" == c.tagName;
        return a.extend({}, "function" == typeof c.getBoundingClientRect ? c.getBoundingClientRect() : null , {
            scroll: d ? document.documentElement.scrollTop || document.body.scrollTop : b.scrollTop(),
            width: d ? a(window).width() : b.outerWidth(),
            height: d ? a(window).height() : b.outerHeight()
        }, d ? {
            top: 0,
            left: 0
        } : b.offset())
    }
    ,
    c.prototype.getCalculatedOffset = function(a, b, c, d) {
        return "bottom" == a ? {
            top: b.top + b.height,
            left: b.left + b.width / 2 - c / 2
        } : "top" == a ? {
            top: b.top - d,
            left: b.left + b.width / 2 - c / 2
        } : "left" == a ? {
            top: b.top + b.height / 2 - d / 2,
            left: b.left - c
        } : {
            top: b.top + b.height / 2 - d / 2,
            left: b.left + b.width
        }
    }
    ,
    c.prototype.getViewportAdjustedDelta = function(a, b, c, d) {
        var e = {
            top: 0,
            left: 0
        };
        if (!this.$viewport)
            return e;
        var f = this.options.viewport && this.options.viewport.padding || 0
          , g = this.getPosition(this.$viewport);
        if (/right|left/.test(a)) {
            var h = b.top - f - g.scroll
              , i = b.top + f - g.scroll + d;
            h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
        } else {
            var j = b.left - f
              , k = b.left + f + c;
            j < g.left ? e.left = g.left - j : k > g.width && (e.left = g.left + g.width - k)
        }
        return e
    }
    ,
    c.prototype.getTitle = function() {
        var a, b = this.$element, c = this.options;
        return a = b.attr("data-original-title") || ("function" == typeof c.title ? c.title.call(b[0]) : c.title)
    }
    ,
    c.prototype.getUID = function(a) {
        do
            a += ~~(1e6 * Math.random());
        while (document.getElementById(a));return a
    }
    ,
    c.prototype.tip = function() {
        return this.$tip = this.$tip || a(this.options.template)
    }
    ,
    c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }
    ,
    c.prototype.validate = function() {
        this.$element[0].parentNode || (this.hide(),
        this.$element = null ,
        this.options = null )
    }
    ,
    c.prototype.enable = function() {
        this.enabled = !0
    }
    ,
    c.prototype.disable = function() {
        this.enabled = !1
    }
    ,
    c.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }
    ,
    c.prototype.toggle = function(b) {
        var c = this;
        b && (c = a(b.currentTarget).data("bs." + this.type),
        c || (c = new this.constructor(b.currentTarget,this.getDelegateOptions()),
        a(b.currentTarget).data("bs." + this.type, c))),
        c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
    }
    ,
    c.prototype.destroy = function() {
        clearTimeout(this.timeout),
        this.hide().$element.off("." + this.type).removeData("bs." + this.type)
    }
    ;
    var d = a.fn.tooltip;
    a.fn.tooltip = b,
    a.fn.tooltip.Constructor = c,
    a.fn.tooltip.noConflict = function() {
        return a.fn.tooltip = d,
        this
    }
}
(jQuery),
+function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this)
              , e = d.data("bs.popover")
              , f = "object" == typeof b && b;
            (e || "destroy" != b) && (e || d.data("bs.popover", e = new c(this,f)),
            "string" == typeof b && e[b]())
        }
        )
    }
    var c = function(a, b) {
        this.init("popover", a, b)
    }
    ;
    if (!a.fn.tooltip)
        throw new Error("Popover requires tooltip.js");
    c.VERSION = "3.2.0",
    c.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }),
    c.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype),
    c.prototype.constructor = c,
    c.prototype.getDefaults = function() {
        return c.DEFAULTS
    }
    ,
    c.prototype.setContent = function() {
        var a = this.tip()
          , b = this.getTitle()
          , c = this.getContent();
        a.find(".popover-title")[this.options.html ? "html" : "text"](b),
        a.find(".popover-content").empty()[this.options.html ? "string" == typeof c ? "html" : "append" : "text"](c),
        a.removeClass("fade top bottom left right in"),
        a.find(".popover-title").html() || a.find(".popover-title").hide()
    }
    ,
    c.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }
    ,
    c.prototype.getContent = function() {
        var a = this.$element
          , b = this.options;
        return a.attr("data-content") || ("function" == typeof b.content ? b.content.call(a[0]) : b.content)
    }
    ,
    c.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }
    ,
    c.prototype.tip = function() {
        return this.$tip || (this.$tip = a(this.options.template)),
        this.$tip
    }
    ;
    var d = a.fn.popover;
    a.fn.popover = b,
    a.fn.popover.Constructor = c,
    a.fn.popover.noConflict = function() {
        return a.fn.popover = d,
        this
    }
}
(jQuery),
+function(a) {
    "use strict";
    function b(c, d) {
        var e = a.proxy(this.process, this);
        this.$body = a("body"),
        this.$scrollElement = a(a(c).is("body") ? window : c),
        this.options = a.extend({}, b.DEFAULTS, d),
        this.selector = (this.options.target || "") + " .nav li > a",
        this.offsets = [],
        this.targets = [],
        this.activeTarget = null ,
        this.scrollHeight = 0,
        this.$scrollElement.on("scroll.bs.scrollspy", e),
        this.refresh(),
        this.process()
    }
    function c(c) {
        return this.each(function() {
            var d = a(this)
              , e = d.data("bs.scrollspy")
              , f = "object" == typeof c && c;
            e || d.data("bs.scrollspy", e = new b(this,f)),
            "string" == typeof c && e[c]()
        }
        )
    }
    b.VERSION = "3.2.0",
    b.DEFAULTS = {
        offset: 10
    },
    b.prototype.getScrollHeight = function() {
        return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
    }
    ,
    b.prototype.refresh = function() {
        var b = "offset"
          , c = 0;
        a.isWindow(this.$scrollElement[0]) || (b = "position",
        c = this.$scrollElement.scrollTop()),
        this.offsets = [],
        this.targets = [],
        this.scrollHeight = this.getScrollHeight();
        var d = this;
        this.$body.find(this.selector).map(function() {
            var d = a(this)
              , e = d.data("target") || d.attr("href")
              , f = /^#./.test(e) && a(e);
            return f && f.length && f.is(":visible") && [[f[b]().top + c, e]] || null
        }
        ).sort(function(a, b) {
            return a[0] - b[0]
        }
        ).each(function() {
            d.offsets.push(this[0]),
            d.targets.push(this[1])
        }
        )
    }
    ,
    b.prototype.process = function() {
        var a, b = this.$scrollElement.scrollTop() + this.options.offset, c = this.getScrollHeight(), d = this.options.offset + c - this.$scrollElement.height(), e = this.offsets, f = this.targets, g = this.activeTarget;
        if (this.scrollHeight != c && this.refresh(),
        b >= d)
            return g != (a = f[f.length - 1]) && this.activate(a);
        if (g && b <= e[0])
            return g != (a = f[0]) && this.activate(a);
        for (a = e.length; a--; )
            g != f[a] && b >= e[a] && (!e[a + 1] || b <= e[a + 1]) && this.activate(f[a])
    }
    ,
    b.prototype.activate = function(b) {
        this.activeTarget = b,
        a(this.selector).parentsUntil(this.options.target, ".active").removeClass("active");
        var c = this.selector + '[data-target="' + b + '"],' + this.selector + '[href="' + b + '"]'
          , d = a(c).parents("li").addClass("active");
        d.parent(".dropdown-menu").length && (d = d.closest("li.dropdown").addClass("active")),
        d.trigger("activate.bs.scrollspy")
    }
    ;
    var d = a.fn.scrollspy;
    a.fn.scrollspy = c,
    a.fn.scrollspy.Constructor = b,
    a.fn.scrollspy.noConflict = function() {
        return a.fn.scrollspy = d,
        this
    }
    ,
    a(window).on("load.bs.scrollspy.data-api", function() {
        a('[data-spy="scroll"]').each(function() {
            var b = a(this);
            c.call(b, b.data())
        }
        )
    }
    )
}
(jQuery),
+function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this)
              , e = d.data("bs.tab");
            e || d.data("bs.tab", e = new c(this)),
            "string" == typeof b && e[b]()
        }
        )
    }
    var c = function(b) {
        this.element = a(b)
    }
    ;
    c.VERSION = "3.2.0",
    c.prototype.show = function() {
        var b = this.element
          , c = b.closest("ul:not(.dropdown-menu)")
          , d = b.data("target");
        if (d || (d = b.attr("href"),
        d = d && d.replace(/.*(?=#[^\s]*$)/, "")),
        !b.parent("li").hasClass("active")) {
            var e = c.find(".active:last a")[0]
              , f = a.Event("show.bs.tab", {
                relatedTarget: e
            });
            if (b.trigger(f),
            !f.isDefaultPrevented()) {
                var g = a(d);
                this.activate(b.closest("li"), c),
                this.activate(g, g.parent(), function() {
                    b.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: e
                    })
                }
                )
            }
        }
    }
    ,
    c.prototype.activate = function(b, c, d) {
        function e() {
            f.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"),
            b.addClass("active"),
            g ? (b[0].offsetWidth,
            b.addClass("in")) : b.removeClass("fade"),
            b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"),
            d && d()
        }
        var f = c.find("> .active")
          , g = d && a.support.transition && f.hasClass("fade");
        g ? f.one("bsTransitionEnd", e).emulateTransitionEnd(150) : e(),
        f.removeClass("in")
    }
    ;
    var d = a.fn.tab;
    a.fn.tab = b,
    a.fn.tab.Constructor = c,
    a.fn.tab.noConflict = function() {
        return a.fn.tab = d,
        this
    }
    ,
    a(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(c) {
        c.preventDefault(),
        b.call(a(this), "show")
    }
    )
}
(jQuery),
+function(a) {
    "use strict";
    function b(b) {
        return this.each(function() {
            var d = a(this)
              , e = d.data("bs.affix")
              , f = "object" == typeof b && b;
            e || d.data("bs.affix", e = new c(this,f)),
            "string" == typeof b && e[b]()
        }
        )
    }
    var c = function(b, d) {
        this.options = a.extend({}, c.DEFAULTS, d),
        this.$target = a(this.options.target).on("scroll.bs.affix.data-api", a.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", a.proxy(this.checkPositionWithEventLoop, this)),
        this.$element = a(b),
        this.affixed = this.unpin = this.pinnedOffset = null ,
        this.checkPosition()
    }
    ;
    c.VERSION = "3.2.0",
    c.RESET = "affix affix-top affix-bottom",
    c.DEFAULTS = {
        offset: 0,
        target: window
    },
    c.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset)
            return this.pinnedOffset;
        this.$element.removeClass(c.RESET).addClass("affix");
        var a = this.$target.scrollTop()
          , b = this.$element.offset();
        return this.pinnedOffset = b.top - a
    }
    ,
    c.prototype.checkPositionWithEventLoop = function() {
        setTimeout(a.proxy(this.checkPosition, this), 1)
    }
    ,
    c.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var b = a(document).height()
              , d = this.$target.scrollTop()
              , e = this.$element.offset()
              , f = this.options.offset
              , g = f.top
              , h = f.bottom;
            "object" != typeof f && (h = g = f),
            "function" == typeof g && (g = f.top(this.$element)),
            "function" == typeof h && (h = f.bottom(this.$element));
            var i = null  != this.unpin && d + this.unpin <= e.top ? !1 : null  != h && e.top + this.$element.height() >= b - h ? "bottom" : null  != g && g >= d ? "top" : !1;
            if (this.affixed !== i) {
                null  != this.unpin && this.$element.css("top", "");
                var j = "affix" + (i ? "-" + i : "")
                  , k = a.Event(j + ".bs.affix");
                this.$element.trigger(k),
                k.isDefaultPrevented() || (this.affixed = i,
                this.unpin = "bottom" == i ? this.getPinnedOffset() : null ,
                this.$element.removeClass(c.RESET).addClass(j).trigger(a.Event(j.replace("affix", "affixed"))),
                "bottom" == i && this.$element.offset({
                    top: b - this.$element.height() - h
                }))
            }
        }
    }
    ;
    var d = a.fn.affix;
    a.fn.affix = b,
    a.fn.affix.Constructor = c,
    a.fn.affix.noConflict = function() {
        return a.fn.affix = d,
        this
    }
    ,
    a(window).on("load", function() {
        a('[data-spy="affix"]').each(function() {
            var c = a(this)
              , d = c.data();
            d.offset = d.offset || {},
            d.offsetBottom && (d.offset.bottom = d.offsetBottom),
            d.offsetTop && (d.offset.top = d.offsetTop),
            b.call(c, d)
        }
        )
    }
    )
}
(jQuery),
function(a, b, c) {
    "use strict";
    function d(a) {
        return function() {
            var b, c, d = arguments[0], e = "[" + (a ? a + ":" : "") + d + "] ", f = arguments[1], g = arguments, h = function(a) {
                return "function" == typeof a ? a.toString().replace(/ \{[\s\S]*$/, "") : "undefined" == typeof a ? "undefined" : "string" != typeof a ? JSON.stringify(a) : a
            }
            ;
            for (b = e + f.replace(/\{\d+\}/g, function(a) {
                var b, c = +a.slice(1, -1);
                return c + 2 < g.length ? (b = g[c + 2],
                "function" == typeof b ? b.toString().replace(/ ?\{[\s\S]*$/, "") : "undefined" == typeof b ? "undefined" : "string" != typeof b ? Q(b) : b) : a
            }
            ),
            b = b + "\nhttp://errors.angularjs.org/1.2.28/" + (a ? a + "/" : "") + d,
            c = 2; c < arguments.length; c++)
                b = b + (2 == c ? "?" : "&") + "p" + (c - 2) + "=" + encodeURIComponent(h(arguments[c]));
            return new Error(b)
        }
    }
    function e(a) {
        if (null  == a || z(a))
            return !1;
        var b = a.length;
        return 1 === a.nodeType && b ? !0 : u(a) || Ed(a) || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
    }
    function f(a, b, c) {
        var d;
        if (a)
            if (x(a))
                for (d in a)
                    "prototype" == d || "length" == d || "name" == d || a.hasOwnProperty && !a.hasOwnProperty(d) || b.call(c, a[d], d);
            else if (Ed(a) || e(a))
                for (d = 0; d < a.length; d++)
                    b.call(c, a[d], d);
            else if (a.forEach && a.forEach !== f)
                a.forEach(b, c);
            else
                for (d in a)
                    a.hasOwnProperty(d) && b.call(c, a[d], d);
        return a
    }
    function g(a) {
        var b = [];
        for (var c in a)
            a.hasOwnProperty(c) && b.push(c);
        return b.sort()
    }
    function h(a, b, c) {
        for (var d = g(a), e = 0; e < d.length; e++)
            b.call(c, a[d[e]], d[e]);
        return d
    }
    function i(a) {
        return function(b, c) {
            a(c, b)
        }
    }
    function j() {
        for (var a, b = Dd.length; b; ) {
            if (b--,
            a = Dd[b].charCodeAt(0),
            57 == a)
                return Dd[b] = "A",
                Dd.join("");
            if (90 != a)
                return Dd[b] = String.fromCharCode(a + 1),
                Dd.join("");
            Dd[b] = "0"
        }
        return Dd.unshift("0"),
        Dd.join("")
    }
    function k(a, b) {
        b ? a.$$hashKey = b : delete a.$$hashKey
    }
    function l(a) {
        var b = a.$$hashKey;
        return f(arguments, function(b) {
            b !== a && f(b, function(b, c) {
                a[c] = b
            }
            )
        }
        ),
        k(a, b),
        a
    }
    function m(a) {
        return parseInt(a, 10)
    }
    function n(a, b) {
        return l(new (l(function() {}
        , {
            prototype: a
        })), b)
    }
    function o() {}
    function p(a) {
        return a
    }
    function q(a) {
        return function() {
            return a
        }
    }
    function r(a) {
        return "undefined" == typeof a
    }
    function s(a) {
        return "undefined" != typeof a
    }
    function t(a) {
        return null  != a && "object" == typeof a
    }
    function u(a) {
        return "string" == typeof a
    }
    function v(a) {
        return "number" == typeof a
    }
    function w(a) {
        return "[object Date]" === Ad.call(a)
    }
    function x(a) {
        return "function" == typeof a
    }
    function y(a) {
        return "[object RegExp]" === Ad.call(a)
    }
    function z(a) {
        return a && a.document && a.location && a.alert && a.setInterval
    }
    function A(a) {
        return a && a.$evalAsync && a.$watch
    }
    function B(a) {
        return "[object File]" === Ad.call(a)
    }
    function C(a) {
        return "[object Blob]" === Ad.call(a)
    }
    function D(a) {
        return a && x(a.then)
    }
    function E(a) {
        return !(!a || !(a.nodeName || a.prop && a.attr && a.find))
    }
    function F(a, b, c) {
        var d = [];
        return f(a, function(a, e, f) {
            d.push(b.call(c, a, e, f))
        }
        ),
        d
    }
    function G(a, b) {
        return -1 != H(a, b)
    }
    function H(a, b) {
        if (a.indexOf)
            return a.indexOf(b);
        for (var c = 0; c < a.length; c++)
            if (b === a[c])
                return c;
        return -1
    }
    function I(a, b) {
        var c = H(a, b);
        return c >= 0 && a.splice(c, 1),
        b
    }
    function J(a, b, c, d) {
        if (z(a) || A(a))
            throw Bd("cpws", "Can't copy! Making copies of Window or Scope instances is not supported.");
        if (b) {
            if (a === b)
                throw Bd("cpi", "Can't copy! Source and destination are identical.");
            if (c = c || [],
            d = d || [],
            t(a)) {
                var e = H(c, a);
                if (-1 !== e)
                    return d[e];
                c.push(a),
                d.push(b)
            }
            var g;
            if (Ed(a)) {
                b.length = 0;
                for (var h = 0; h < a.length; h++)
                    g = J(a[h], null , c, d),
                    t(a[h]) && (c.push(a[h]),
                    d.push(g)),
                    b.push(g)
            } else {
                var i = b.$$hashKey;
                Ed(b) ? b.length = 0 : f(b, function(a, c) {
                    delete b[c]
                }
                );
                for (var j in a)
                    g = J(a[j], null , c, d),
                    t(a[j]) && (c.push(a[j]),
                    d.push(g)),
                    b[j] = g;
                k(b, i)
            }
        } else
            b = a,
            a && (Ed(a) ? b = J(a, [], c, d) : w(a) ? b = new Date(a.getTime()) : y(a) ? (b = new RegExp(a.source,a.toString().match(/[^\/]*$/)[0]),
            b.lastIndex = a.lastIndex) : t(a) && (b = J(a, {}, c, d)));
        return b
    }
    function K(a, b) {
        if (Ed(a)) {
            b = b || [];
            for (var c = 0; c < a.length; c++)
                b[c] = a[c]
        } else if (t(a)) {
            b = b || {};
            for (var d in a)
                !pd.call(a, d) || "$" === d.charAt(0) && "$" === d.charAt(1) || (b[d] = a[d])
        }
        return b || a
    }
    function L(a, b) {
        if (a === b)
            return !0;
        if (null  === a || null  === b)
            return !1;
        if (a !== a && b !== b)
            return !0;
        var d, e, f, g = typeof a, h = typeof b;
        if (g == h && "object" == g) {
            if (!Ed(a)) {
                if (w(a))
                    return w(b) ? isNaN(a.getTime()) && isNaN(b.getTime()) || a.getTime() === b.getTime() : !1;
                if (y(a) && y(b))
                    return a.toString() == b.toString();
                if (A(a) || A(b) || z(a) || z(b) || Ed(b))
                    return !1;
                f = {};
                for (e in a)
                    if ("$" !== e.charAt(0) && !x(a[e])) {
                        if (!L(a[e], b[e]))
                            return !1;
                        f[e] = !0
                    }
                for (e in b)
                    if (!f.hasOwnProperty(e) && "$" !== e.charAt(0) && b[e] !== c && !x(b[e]))
                        return !1;
                return !0
            }
            if (!Ed(b))
                return !1;
            if ((d = a.length) == b.length) {
                for (e = 0; d > e; e++)
                    if (!L(a[e], b[e]))
                        return !1;
                return !0
            }
        }
        return !1
    }
    function M(a, b, c) {
        return a.concat(yd.call(b, c))
    }
    function N(a, b) {
        return yd.call(a, b || 0)
    }
    function O(a, b) {
        var c = arguments.length > 2 ? N(arguments, 2) : [];
        return !x(b) || b instanceof RegExp ? b : c.length ? function() {
            return arguments.length ? b.apply(a, c.concat(yd.call(arguments, 0))) : b.apply(a, c)
        }
         : function() {
            return arguments.length ? b.apply(a, arguments) : b.call(a)
        }
    }
    function P(a, d) {
        var e = d;
        return "string" == typeof a && "$" === a.charAt(0) ? e = c : z(d) ? e = "$WINDOW" : d && b === d ? e = "$DOCUMENT" : A(d) && (e = "$SCOPE"),
        e
    }
    function Q(a, b) {
        return "undefined" == typeof a ? c : JSON.stringify(a, P, b ? "  " : null )
    }
    function R(a) {
        return u(a) ? JSON.parse(a) : a
    }
    function S(a) {
        if ("function" == typeof a)
            a = !0;
        else if (a && 0 !== a.length) {
            var b = od("" + a);
            a = !("f" == b || "0" == b || "false" == b || "no" == b || "n" == b || "[]" == b)
        } else
            a = !1;
        return a
    }
    function T(a) {
        a = ud(a).clone();
        try {
            a.empty()
        } catch (b) {}
        var c = 3
          , d = ud("<div>").append(a).html();
        try {
            return a[0].nodeType === c ? od(d) : d.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(a, b) {
                return "<" + od(b)
            }
            )
        } catch (b) {
            return od(d)
        }
    }
    function U(a) {
        try {
            return decodeURIComponent(a)
        } catch (b) {}
    }
    function V(a) {
        var b, c, d = {};
        return f((a || "").split("&"), function(a) {
            if (a && (b = a.replace(/\+/g, "%20").split("="),
            c = U(b[0]),
            s(c))) {
                var e = s(b[1]) ? U(b[1]) : !0;
                pd.call(d, c) ? Ed(d[c]) ? d[c].push(e) : d[c] = [d[c], e] : d[c] = e
            }
        }
        ),
        d
    }
    function W(a) {
        var b = [];
        return f(a, function(a, c) {
            Ed(a) ? f(a, function(a) {
                b.push(Y(c, !0) + (a === !0 ? "" : "=" + Y(a, !0)))
            }
            ) : b.push(Y(c, !0) + (a === !0 ? "" : "=" + Y(a, !0)))
        }
        ),
        b.length ? b.join("&") : ""
    }
    function X(a) {
        return Y(a, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
    }
    function Y(a, b) {
        return encodeURIComponent(a).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, b ? "%20" : "+")
    }
    function Z(a, c) {
        function d(a) {
            a && h.push(a)
        }
        var e, g, h = [a], i = ["ng:app", "ng-app", "x-ng-app", "data-ng-app"], j = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
        f(i, function(c) {
            i[c] = !0,
            d(b.getElementById(c)),
            c = c.replace(":", "\\:"),
            a.querySelectorAll && (f(a.querySelectorAll("." + c), d),
            f(a.querySelectorAll("." + c + "\\:"), d),
            f(a.querySelectorAll("[" + c + "]"), d))
        }
        ),
        f(h, function(a) {
            if (!e) {
                var b = " " + a.className + " "
                  , c = j.exec(b);
                c ? (e = a,
                g = (c[2] || "").replace(/\s+/g, ",")) : f(a.attributes, function(b) {
                    !e && i[b.name] && (e = a,
                    g = b.value)
                }
                )
            }
        }
        ),
        e && c(e, g ? [g] : [])
    }
    function $(c, d) {
        var e = function() {
            if (c = ud(c),
            c.injector()) {
                var a = c[0] === b ? "document" : T(c);
                throw Bd("btstrpd", "App Already Bootstrapped with this Element '{0}'", a.replace(/</, "&lt;").replace(/>/, "&gt;"))
            }
            d = d || [],
            d.unshift(["$provide", function(a) {
                a.value("$rootElement", c)
            }
            ]),
            d.unshift("ng");
            var e = Hb(d);
            return e.invoke(["$rootScope", "$rootElement", "$compile", "$injector", "$animate", function(a, b, c, d) {
                a.$apply(function() {
                    b.data("$injector", d),
                    c(b)(a)
                }
                )
            }
            ]),
            e
        }
          , g = /^NG_DEFER_BOOTSTRAP!/;
        return a && !g.test(a.name) ? e() : (a.name = a.name.replace(g, ""),
        void (Cd.resumeBootstrap = function(a) {
            f(a, function(a) {
                d.push(a)
            }
            ),
            e()
        }
        ))
    }
    function _(a, b) {
        return b = b || "_",
        a.replace(Hd, function(a, c) {
            return (c ? b : "") + a.toLowerCase()
        }
        )
    }
    function ab() {
        vd = a.jQuery,
        vd && vd.fn.on ? (ud = vd,
        l(vd.fn, {
            scope: Vd.scope,
            isolateScope: Vd.isolateScope,
            controller: Vd.controller,
            injector: Vd.injector,
            inheritedData: Vd.inheritedData
        }),
        kb("remove", !0, !0, !1),
        kb("empty", !1, !1, !1),
        kb("html", !1, !1, !0)) : ud = ob,
        Cd.element = ud
    }
    function bb(a, b, c) {
        if (!a)
            throw Bd("areq", "Argument '{0}' is {1}", b || "?", c || "required");
        return a
    }
    function cb(a, b, c) {
        return c && Ed(a) && (a = a[a.length - 1]),
        bb(x(a), b, "not a function, got " + (a && "object" == typeof a ? a.constructor.name || "Object" : typeof a)),
        a
    }
    function db(a, b) {
        if ("hasOwnProperty" === a)
            throw Bd("badname", "hasOwnProperty is not a valid {0} name", b)
    }
    function eb(a, b, c) {
        if (!b)
            return a;
        for (var d, e = b.split("."), f = a, g = e.length, h = 0; g > h; h++)
            d = e[h],
            a && (a = (f = a)[d]);
        return !c && x(a) ? O(f, a) : a
    }
    function fb(a) {
        var b = a[0]
          , c = a[a.length - 1];
        if (b === c)
            return ud(b);
        var d = b
          , e = [d];
        do {
            if (d = d.nextSibling,
            !d)
                break;
            e.push(d)
        } while (d !== c);return ud(e)
    }
    function gb(a) {
        function b(a, b, c) {
            return a[b] || (a[b] = c())
        }
        var c = d("$injector")
          , e = d("ng")
          , f = b(a, "angular", Object);
        return f.$$minErr = f.$$minErr || d,
        b(f, "module", function() {
            var a = {};
            return function(d, f, g) {
                var h = function(a, b) {
                    if ("hasOwnProperty" === a)
                        throw e("badname", "hasOwnProperty is not a valid {0} name", b)
                }
                ;
                return h(d, "module"),
                f && a.hasOwnProperty(d) && (a[d] = null ),
                b(a, d, function() {
                    function a(a, c, d) {
                        return function() {
                            return b[d || "push"]([a, c, arguments]),
                            i
                        }
                    }
                    if (!f)
                        throw c("nomod", "Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.", d);
                    var b = []
                      , e = []
                      , h = a("$injector", "invoke")
                      , i = {
                        _invokeQueue: b,
                        _runBlocks: e,
                        requires: f,
                        name: d,
                        provider: a("$provide", "provider"),
                        factory: a("$provide", "factory"),
                        service: a("$provide", "service"),
                        value: a("$provide", "value"),
                        constant: a("$provide", "constant", "unshift"),
                        animation: a("$animateProvider", "register"),
                        filter: a("$filterProvider", "register"),
                        controller: a("$controllerProvider", "register"),
                        directive: a("$compileProvider", "directive"),
                        config: h,
                        run: function(a) {
                            return e.push(a),
                            this
                        }
                    };
                    return g && h(g),
                    i
                }
                )
            }
        }
        )
    }
    function hb(b) {
        l(b, {
            bootstrap: $,
            copy: J,
            extend: l,
            equals: L,
            element: ud,
            forEach: f,
            injector: Hb,
            noop: o,
            bind: O,
            toJson: Q,
            fromJson: R,
            identity: p,
            isUndefined: r,
            isDefined: s,
            isString: u,
            isFunction: x,
            isObject: t,
            isNumber: v,
            isElement: E,
            isArray: Ed,
            version: Id,
            isDate: w,
            lowercase: od,
            uppercase: qd,
            callbacks: {
                counter: 0
            },
            $$minErr: d,
            $$csp: Gd
        }),
        wd = gb(a);
        try {
            wd("ngLocale")
        } catch (c) {
            wd("ngLocale", []).provider("$locale", cc)
        }
        wd("ng", ["ngLocale"], ["$provide", function(a) {
            a.provider({
                $$sanitizeUri: Ec
            }),
            a.provider("$compile", Ob).directive({
                a: Fe,
                input: Qe,
                textarea: Qe,
                form: Je,
                script: zf,
                select: Cf,
                style: Ef,
                option: Df,
                ngBind: af,
                ngBindHtml: cf,
                ngBindTemplate: bf,
                ngClass: df,
                ngClassEven: ff,
                ngClassOdd: ef,
                ngCloak: gf,
                ngController: hf,
                ngForm: Ke,
                ngHide: tf,
                ngIf: lf,
                ngInclude: mf,
                ngInit: of,
                ngNonBindable: pf,
                ngPluralize: qf,
                ngRepeat: rf,
                ngShow: sf,
                ngStyle: uf,
                ngSwitch: vf,
                ngSwitchWhen: wf,
                ngSwitchDefault: xf,
                ngOptions: Bf,
                ngTransclude: yf,
                ngModel: We,
                ngList: Ze,
                ngChange: Xe,
                required: Ye,
                ngRequired: Ye,
                ngValue: _e
            }).directive({
                ngInclude: nf
            }).directive(Ge).directive(jf),
            a.provider({
                $anchorScroll: Ib,
                $animate: ce,
                $browser: Lb,
                $cacheFactory: Mb,
                $controller: Rb,
                $document: Sb,
                $exceptionHandler: Tb,
                $filter: Pc,
                $interpolate: ac,
                $interval: bc,
                $http: Yb,
                $httpBackend: $b,
                $location: pc,
                $log: qc,
                $parse: zc,
                $rootScope: Dc,
                $q: Ac,
                $sce: Jc,
                $sceDelegate: Ic,
                $sniffer: Kc,
                $templateCache: Nb,
                $timeout: Lc,
                $window: Oc,
                $$rAF: Cc,
                $$asyncCallback: Jb
            })
        }
        ])
    }
    function ib() {
        return ++Kd
    }
    function jb(a) {
        return a.replace(Nd, function(a, b, c, d) {
            return d ? c.toUpperCase() : c
        }
        ).replace(Od, "Moz$1")
    }
    function kb(a, b, c, d) {
        function e(a) {
            var e, g, h, i, j, k, l, m = c && a ? [this.filter(a)] : [this], n = b;
            if (!d || null  != a)
                for (; m.length; )
                    for (e = m.shift(),
                    g = 0,
                    h = e.length; h > g; g++)
                        for (i = ud(e[g]),
                        n ? i.triggerHandler("$destroy") : n = !n,
                        j = 0,
                        k = (l = i.children()).length; k > j; j++)
                            m.push(vd(l[j]));
            return f.apply(this, arguments)
        }
        var f = vd.fn[a];
        f = f.$original || f,
        e.$original = f,
        vd.fn[a] = e
    }
    function lb(a) {
        return !Rd.test(a)
    }
    function mb(a, b) {
        var c, d, e, f, g, h, i = b.createDocumentFragment(), j = [];
        if (lb(a))
            j.push(b.createTextNode(a));
        else {
            for (c = i.appendChild(b.createElement("div")),
            d = (Sd.exec(a) || ["", ""])[1].toLowerCase(),
            e = Ud[d] || Ud._default,
            c.innerHTML = "<div>&#160;</div>" + e[1] + a.replace(Td, "<$1></$2>") + e[2],
            c.removeChild(c.firstChild),
            f = e[0]; f--; )
                c = c.lastChild;
            for (g = 0,
            h = c.childNodes.length; h > g; ++g)
                j.push(c.childNodes[g]);
            c = i.firstChild,
            c.textContent = ""
        }
        return i.textContent = "",
        i.innerHTML = "",
        j
    }
    function nb(a, c) {
        c = c || b;
        var d;
        return (d = Qd.exec(a)) ? [c.createElement(d[1])] : mb(a, c)
    }
    function ob(a) {
        if (a instanceof ob)
            return a;
        if (u(a) && (a = Fd(a)),
        !(this instanceof ob)) {
            if (u(a) && "<" != a.charAt(0))
                throw Pd("nosel", "Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element");
            return new ob(a)
        }
        if (u(a)) {
            yb(this, nb(a));
            var c = ud(b.createDocumentFragment());
            c.append(this)
        } else
            yb(this, a)
    }
    function pb(a) {
        return a.cloneNode(!0)
    }
    function qb(a) {
        sb(a);
        for (var b = 0, c = a.childNodes || []; b < c.length; b++)
            qb(c[b])
    }
    function rb(a, b, c, d) {
        if (s(d))
            throw Pd("offargs", "jqLite#off() does not support the `selector` argument");
        var e = tb(a, "events")
          , g = tb(a, "handle");
        g && (r(b) ? f(e, function(b, c) {
            Md(a, c, b),
            delete e[c]
        }
        ) : f(b.split(" "), function(b) {
            r(c) ? (Md(a, b, e[b]),
            delete e[b]) : I(e[b] || [], c)
        }
        ))
    }
    function sb(a, b) {
        var d = a.ng339
          , e = Jd[d];
        if (e) {
            if (b)
                return void delete Jd[d].data[b];
            e.handle && (e.events.$destroy && e.handle({}, "$destroy"),
            rb(a)),
            delete Jd[d],
            a.ng339 = c
        }
    }
    function tb(a, b, c) {
        var d = a.ng339
          , e = Jd[d || -1];
        return s(c) ? (e || (a.ng339 = d = ib(),
        e = Jd[d] = {}),
        void (e[b] = c)) : e && e[b]
    }
    function ub(a, b, c) {
        var d = tb(a, "data")
          , e = s(c)
          , f = !e && s(b)
          , g = f && !t(b);
        if (d || g || tb(a, "data", d = {}),
        e)
            d[b] = c;
        else {
            if (!f)
                return d;
            if (g)
                return d && d[b];
            l(d, b)
        }
    }
    function vb(a, b) {
        return a.getAttribute ? (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").indexOf(" " + b + " ") > -1 : !1
    }
    function wb(a, b) {
        b && a.setAttribute && f(b.split(" "), function(b) {
            a.setAttribute("class", Fd((" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ").replace(" " + Fd(b) + " ", " ")))
        }
        )
    }
    function xb(a, b) {
        if (b && a.setAttribute) {
            var c = (" " + (a.getAttribute("class") || "") + " ").replace(/[\n\t]/g, " ");
            f(b.split(" "), function(a) {
                a = Fd(a),
                -1 === c.indexOf(" " + a + " ") && (c += a + " ")
            }
            ),
            a.setAttribute("class", Fd(c))
        }
    }
    function yb(a, b) {
        if (b) {
            b = b.nodeName || !s(b.length) || z(b) ? [b] : b;
            for (var c = 0; c < b.length; c++)
                a.push(b[c])
        }
    }
    function zb(a, b) {
        return Ab(a, "$" + (b || "ngController") + "Controller")
    }
    function Ab(a, b, d) {
        9 == a.nodeType && (a = a.documentElement);
        for (var e = Ed(b) ? b : [b]; a; ) {
            for (var f = 0, g = e.length; g > f; f++)
                if ((d = ud.data(a, e[f])) !== c)
                    return d;
            a = a.parentNode || 11 === a.nodeType && a.host
        }
    }
    function Bb(a) {
        for (var b = 0, c = a.childNodes; b < c.length; b++)
            qb(c[b]);
        for (; a.firstChild; )
            a.removeChild(a.firstChild)
    }
    function Cb(a, b) {
        var c = Wd[b.toLowerCase()];
        return c && Xd[a.nodeName] && c
    }
    function Db(a, c) {
        var d = function(d, e) {
            if (d.preventDefault || (d.preventDefault = function() {
                d.returnValue = !1
            }
            ),
            d.stopPropagation || (d.stopPropagation = function() {
                d.cancelBubble = !0
            }
            ),
            d.target || (d.target = d.srcElement || b),
            r(d.defaultPrevented)) {
                var g = d.preventDefault;
                d.preventDefault = function() {
                    d.defaultPrevented = !0,
                    g.call(d)
                }
                ,
                d.defaultPrevented = !1
            }
            d.isDefaultPrevented = function() {
                return d.defaultPrevented || d.returnValue === !1
            }
            ;
            var h = K(c[e || d.type] || []);
            f(h, function(b) {
                b.call(a, d)
            }
            ),
            8 >= td ? (d.preventDefault = null ,
            d.stopPropagation = null ,
            d.isDefaultPrevented = null ) : (delete d.preventDefault,
            delete d.stopPropagation,
            delete d.isDefaultPrevented)
        }
        ;
        return d.elem = a,
        d
    }
    function Eb(a, b) {
        var d, e = typeof a;
        return "function" == e || "object" == e && null  !== a ? "function" == typeof (d = a.$$hashKey) ? d = a.$$hashKey() : d === c && (d = a.$$hashKey = (b || j)()) : d = a,
        e + ":" + d
    }
    function Fb(a, b) {
        if (b) {
            var c = 0;
            this.nextUid = function() {
                return ++c
            }
        }
        f(a, this.put, this)
    }
    function Gb(a) {
        var b, c, d, e;
        return "function" == typeof a ? (b = a.$inject) || (b = [],
        a.length && (c = a.toString().replace(_d, ""),
        d = c.match(Yd),
        f(d[1].split(Zd), function(a) {
            a.replace($d, function(a, c, d) {
                b.push(d)
            }
            )
        }
        )),
        a.$inject = b) : Ed(a) ? (e = a.length - 1,
        cb(a[e], "fn"),
        b = a.slice(0, e)) : cb(a, "fn", !0),
        b
    }
    function Hb(a) {
        function b(a) {
            return function(b, c) {
                return t(b) ? void f(b, i(a)) : a(b, c)
            }
        }
        function c(a, b) {
            if (db(a, "service"),
            (x(b) || Ed(b)) && (b = v.instantiate(b)),
            !b.$get)
                throw ae("pget", "Provider '{0}' must define $get factory method.", a);
            return s[a + n] = b
        }
        function d(a, b) {
            return c(a, {
                $get: b
            })
        }
        function e(a, b) {
            return d(a, ["$injector", function(a) {
                return a.instantiate(b)
            }
            ])
        }
        function g(a, b) {
            return d(a, q(b))
        }
        function h(a, b) {
            db(a, "constant"),
            s[a] = b,
            w[a] = b
        }
        function j(a, b) {
            var c = v.get(a + n)
              , d = c.$get;
            c.$get = function() {
                var a = y.invoke(d, c);
                return y.invoke(b, null , {
                    $delegate: a
                })
            }
        }
        function k(a) {
            var b, c, d, e, g = [];
            return f(a, function(a) {
                if (!r.get(a)) {
                    r.put(a, !0);
                    try {
                        if (u(a))
                            for (b = wd(a),
                            g = g.concat(k(b.requires)).concat(b._runBlocks),
                            c = b._invokeQueue,
                            d = 0,
                            e = c.length; e > d; d++) {
                                var f = c[d]
                                  , h = v.get(f[0]);
                                h[f[1]].apply(h, f[2])
                            }
                        else
                            x(a) ? g.push(v.invoke(a)) : Ed(a) ? g.push(v.invoke(a)) : cb(a, "module")
                    } catch (i) {
                        throw Ed(a) && (a = a[a.length - 1]),
                        i.message && i.stack && -1 == i.stack.indexOf(i.message) && (i = i.message + "\n" + i.stack),
                        ae("modulerr", "Failed to instantiate module {0} due to:\n{1}", a, i.stack || i.message || i)
                    }
                }
            }
            ),
            g
        }
        function l(a, b) {
            function c(c) {
                if (a.hasOwnProperty(c)) {
                    if (a[c] === m)
                        throw ae("cdep", "Circular dependency found: {0}", c + " <- " + p.join(" <- "));
                    return a[c]
                }
                try {
                    return p.unshift(c),
                    a[c] = m,
                    a[c] = b(c)
                } catch (d) {
                    throw a[c] === m && delete a[c],
                    d
                } finally {
                    p.shift()
                }
            }
            function d(a, b, d) {
                var e, f, g, h = [], i = Gb(a);
                for (f = 0,
                e = i.length; e > f; f++) {
                    if (g = i[f],
                    "string" != typeof g)
                        throw ae("itkn", "Incorrect injection token! Expected service name as string, got {0}", g);
                    h.push(d && d.hasOwnProperty(g) ? d[g] : c(g))
                }
                return Ed(a) && (a = a[e]),
                a.apply(b, h)
            }
            function e(a, b) {
                var c, e, f = function() {}
                ;
                return f.prototype = (Ed(a) ? a[a.length - 1] : a).prototype,
                c = new f,
                e = d(a, c, b),
                t(e) || x(e) ? e : c
            }
            return {
                invoke: d,
                instantiate: e,
                get: c,
                annotate: Gb,
                has: function(b) {
                    return s.hasOwnProperty(b + n) || a.hasOwnProperty(b)
                }
            }
        }
        var m = {}
          , n = "Provider"
          , p = []
          , r = new Fb([],!0)
          , s = {
            $provide: {
                provider: b(c),
                factory: b(d),
                service: b(e),
                value: b(g),
                constant: b(h),
                decorator: j
            }
        }
          , v = s.$injector = l(s, function() {
            throw ae("unpr", "Unknown provider: {0}", p.join(" <- "))
        }
        )
          , w = {}
          , y = w.$injector = l(w, function(a) {
            var b = v.get(a + n);
            return y.invoke(b.$get, b)
        }
        );
        return f(k(a), function(a) {
            y.invoke(a || o)
        }
        ),
        y
    }
    function Ib() {
        var a = !0;
        this.disableAutoScrolling = function() {
            a = !1
        }
        ,
        this.$get = ["$window", "$location", "$rootScope", function(b, c, d) {
            function e(a) {
                var b = null ;
                return f(a, function(a) {
                    b || "a" !== od(a.nodeName) || (b = a)
                }
                ),
                b
            }
            function g() {
                var a, d = c.hash();
                d ? (a = h.getElementById(d)) ? a.scrollIntoView() : (a = e(h.getElementsByName(d))) ? a.scrollIntoView() : "top" === d && b.scrollTo(0, 0) : b.scrollTo(0, 0)
            }
            var h = b.document;
            return a && d.$watch(function() {
                return c.hash()
            }
            , function() {
                d.$evalAsync(g)
            }
            ),
            g
        }
        ]
    }
    function Jb() {
        this.$get = ["$$rAF", "$timeout", function(a, b) {
            return a.supported ? function(b) {
                return a(b)
            }
             : function(a) {
                return b(a, 0, !1)
            }
        }
        ]
    }
    function Kb(a, b, d, e) {
        function g(a) {
            try {
                a.apply(null , N(arguments, 1))
            } finally {
                if (s--,
                0 === s)
                    for (; t.length; )
                        try {
                            t.pop()()
                        } catch (b) {
                            d.error(b)
                        }
            }
        }
        function h(a, b) {
            !function c() {
                f(w, function(a) {
                    a()
                }
                ),
                v = b(c, a)
            }
            ()
        }
        function i() {
            x != j.url() && (x = j.url(),
            f(A, function(a) {
                a(j.url())
            }
            ))
        }
        var j = this
          , k = b[0]
          , l = a.location
          , m = a.history
          , n = a.setTimeout
          , p = a.clearTimeout
          , q = {};
        j.isMock = !1;
        var s = 0
          , t = [];
        j.$$completeOutstandingRequest = g,
        j.$$incOutstandingRequestCount = function() {
            s++
        }
        ,
        j.notifyWhenNoOutstandingRequests = function(a) {
            f(w, function(a) {
                a()
            }
            ),
            0 === s ? a() : t.push(a)
        }
        ;
        var v, w = [];
        j.addPollFn = function(a) {
            return r(v) && h(100, n),
            w.push(a),
            a
        }
        ;
        var x = l.href
          , y = b.find("base")
          , z = null ;
        j.url = function(b, c) {
            if (l !== a.location && (l = a.location),
            m !== a.history && (m = a.history),
            b) {
                if (x == b)
                    return;
                var d = x && hc(x) === hc(b);
                return x = b,
                !d && e.history ? c ? m.replaceState(null , "", b) : (m.pushState(null , "", b),
                y.attr("href", y.attr("href"))) : (d || (z = b),
                c ? l.replace(b) : l.href = b),
                j
            }
            return z || l.href.replace(/%27/g, "'")
        }
        ;
        var A = []
          , B = !1;
        j.onUrlChange = function(b) {
            return B || (e.history && ud(a).on("popstate", i),
            e.hashchange ? ud(a).on("hashchange", i) : j.addPollFn(i),
            B = !0),
            A.push(b),
            b
        }
        ,
        j.$$checkUrlChange = i,
        j.baseHref = function() {
            var a = y.attr("href");
            return a ? a.replace(/^(https?\:)?\/\/[^\/]*/, "") : ""
        }
        ;
        var C = {}
          , D = ""
          , E = j.baseHref();
        j.cookies = function(a, b) {
            var e, f, g, h, i;
            if (!a) {
                if (k.cookie !== D)
                    for (D = k.cookie,
                    f = D.split("; "),
                    C = {},
                    h = 0; h < f.length; h++)
                        g = f[h],
                        i = g.indexOf("="),
                        i > 0 && (a = unescape(g.substring(0, i)),
                        C[a] === c && (C[a] = unescape(g.substring(i + 1))));
                return C
            }
            b === c ? k.cookie = escape(a) + "=;path=" + E + ";expires=Thu, 01 Jan 1970 00:00:00 GMT" : u(b) && (e = (k.cookie = escape(a) + "=" + escape(b) + ";path=" + E).length + 1,
            e > 4096 && d.warn("Cookie '" + a + "' possibly not set or overflowed because it was too large (" + e + " > 4096 bytes)!"))
        }
        ,
        j.defer = function(a, b) {
            var c;
            return s++,
            c = n(function() {
                delete q[c],
                g(a)
            }
            , b || 0),
            q[c] = !0,
            c
        }
        ,
        j.defer.cancel = function(a) {
            return q[a] ? (delete q[a],
            p(a),
            g(o),
            !0) : !1
        }
    }
    function Lb() {
        this.$get = ["$window", "$log", "$sniffer", "$document", function(a, b, c, d) {
            return new Kb(a,d,b,c)
        }
        ]
    }
    function Mb() {
        this.$get = function() {
            function a(a, c) {
                function e(a) {
                    a != m && (n ? n == a && (n = a.n) : n = a,
                    f(a.n, a.p),
                    f(a, m),
                    m = a,
                    m.n = null )
                }
                function f(a, b) {
                    a != b && (a && (a.p = b),
                    b && (b.n = a))
                }
                if (a in b)
                    throw d("$cacheFactory")("iid", "CacheId '{0}' is already taken!", a);
                var g = 0
                  , h = l({}, c, {
                    id: a
                })
                  , i = {}
                  , j = c && c.capacity || Number.MAX_VALUE
                  , k = {}
                  , m = null
                  , n = null ;
                return b[a] = {
                    put: function(a, b) {
                        if (j < Number.MAX_VALUE) {
                            var c = k[a] || (k[a] = {
                                key: a
                            });
                            e(c)
                        }
                        if (!r(b))
                            return a in i || g++,
                            i[a] = b,
                            g > j && this.remove(n.key),
                            b
                    },
                    get: function(a) {
                        if (j < Number.MAX_VALUE) {
                            var b = k[a];
                            if (!b)
                                return;
                            e(b)
                        }
                        return i[a]
                    },
                    remove: function(a) {
                        if (j < Number.MAX_VALUE) {
                            var b = k[a];
                            if (!b)
                                return;
                            b == m && (m = b.p),
                            b == n && (n = b.n),
                            f(b.n, b.p),
                            delete k[a]
                        }
                        delete i[a],
                        g--
                    },
                    removeAll: function() {
                        i = {},
                        g = 0,
                        k = {},
                        m = n = null
                    },
                    destroy: function() {
                        i = null ,
                        h = null ,
                        k = null ,
                        delete b[a]
                    },
                    info: function() {
                        return l({}, h, {
                            size: g
                        })
                    }
                }
            }
            var b = {};
            return a.info = function() {
                var a = {};
                return f(b, function(b, c) {
                    a[c] = b.info()
                }
                ),
                a
            }
            ,
            a.get = function(a) {
                return b[a]
            }
            ,
            a
        }
    }
    function Nb() {
        this.$get = ["$cacheFactory", function(a) {
            return a("templates")
        }
        ]
    }
    function Ob(a, d) {
        var e = {}
          , g = "Directive"
          , h = /^\s*directive\:\s*([\d\w_\-]+)\s+(.*)$/
          , j = /(([\d\w_\-]+)(?:\:([^;]+))?;?)/
          , k = /^(on[a-z]+|formaction)$/;
        this.directive = function m(b, c) {
            return db(b, "directive"),
            u(b) ? (bb(c, "directiveFactory"),
            e.hasOwnProperty(b) || (e[b] = [],
            a.factory(b + g, ["$injector", "$exceptionHandler", function(a, c) {
                var d = [];
                return f(e[b], function(e, f) {
                    try {
                        var g = a.invoke(e);
                        x(g) ? g = {
                            compile: q(g)
                        } : !g.compile && g.link && (g.compile = q(g.link)),
                        g.priority = g.priority || 0,
                        g.index = f,
                        g.name = g.name || b,
                        g.require = g.require || g.controller && g.name,
                        g.restrict = g.restrict || "A",
                        d.push(g)
                    } catch (h) {
                        c(h)
                    }
                }
                ),
                d
            }
            ])),
            e[b].push(c)) : f(b, i(m)),
            this
        }
        ,
        this.aHrefSanitizationWhitelist = function(a) {
            return s(a) ? (d.aHrefSanitizationWhitelist(a),
            this) : d.aHrefSanitizationWhitelist()
        }
        ,
        this.imgSrcSanitizationWhitelist = function(a) {
            return s(a) ? (d.imgSrcSanitizationWhitelist(a),
            this) : d.imgSrcSanitizationWhitelist()
        }
        ,
        this.$get = ["$injector", "$interpolate", "$exceptionHandler", "$http", "$templateCache", "$parse", "$controller", "$rootScope", "$document", "$sce", "$animate", "$$sanitizeUri", function(a, d, i, m, o, q, r, s, v, w, y, z) {
            function A(a, b, c, d, e) {
                a instanceof ud || (a = ud(a)),
                f(a, function(b, c) {
                    3 == b.nodeType && b.nodeValue.match(/\S+/) && (a[c] = b = ud(b).wrap("<span></span>").parent()[0])
                }
                );
                var g = C(a, b, a, c, d, e);
                return B(a, "ng-scope"),
                function(b, c, d, e) {
                    bb(b, "scope");
                    var h = c ? Vd.clone.call(a) : a;
                    f(d, function(a, b) {
                        h.data("$" + b + "Controller", a)
                    }
                    );
                    for (var i = 0, j = h.length; j > i; i++) {
                        var k = h[i]
                          , l = k.nodeType;
                        (1 === l || 9 === l) && h.eq(i).data("$scope", b)
                    }
                    return c && c(h, b),
                    g && g(b, h, h, e),
                    h
                }
            }
            function B(a, b) {
                try {
                    a.addClass(b)
                } catch (c) {}
            }
            function C(a, b, d, e, f, g) {
                function h(a, d, e, f) {
                    var g, h, i, j, k, l, m, n, p = d.length, q = new Array(p);
                    for (k = 0; p > k; k++)
                        q[k] = d[k];
                    for (k = 0,
                    m = 0,
                    l = o.length; l > k; m++)
                        i = q[m],
                        g = o[k++],
                        h = o[k++],
                        g ? (g.scope ? (j = a.$new(),
                        ud.data(i, "$scope", j)) : j = a,
                        n = g.transcludeOnThisElement ? D(a, g.transclude, f) : !g.templateOnThisElement && f ? f : !f && b ? D(a, b) : null ,
                        g(h, j, i, e, n)) : h && h(a, i.childNodes, c, f)
                }
                for (var i, j, k, l, m, n, o = [], p = 0; p < a.length; p++)
                    i = new X,
                    j = E(a[p], [], i, 0 === p ? e : c, f),
                    k = j.length ? H(j, a[p], i, b, d, null , [], [], g) : null ,
                    k && k.scope && B(i.$$element, "ng-scope"),
                    m = k && k.terminal || !(l = a[p].childNodes) || !l.length ? null  : C(l, k ? (k.transcludeOnThisElement || !k.templateOnThisElement) && k.transclude : b),
                    o.push(k, m),
                    n = n || k || m,
                    g = null ;
                return n ? h : null
            }
            function D(a, b, c) {
                var d = function(d, e, f) {
                    var g = !1;
                    d || (d = a.$new(),
                    d.$$transcluded = !0,
                    g = !0);
                    var h = b(d, e, f, c);
                    return g && h.on("$destroy", function() {
                        d.$destroy()
                    }
                    ),
                    h
                }
                ;
                return d
            }
            function E(a, b, c, d, e) {
                var f, g, i = a.nodeType, k = c.$attr;
                switch (i) {
                case 1:
                    J(b, Pb(xd(a).toLowerCase()), "E", d, e);
                    for (var l, m, n, o, p, q, r = a.attributes, s = 0, t = r && r.length; t > s; s++) {
                        var v = !1
                          , w = !1;
                        if (l = r[s],
                        !td || td >= 8 || l.specified) {
                            m = l.name,
                            p = Fd(l.value),
                            o = Pb(m),
                            (q = ab.test(o)) && (m = _(o.substr(6), "-"));
                            var x = o.replace(/(Start|End)$/, "");
                            o === x + "Start" && (v = m,
                            w = m.substr(0, m.length - 5) + "end",
                            m = m.substr(0, m.length - 6)),
                            n = Pb(m.toLowerCase()),
                            k[n] = m,
                            (q || !c.hasOwnProperty(n)) && (c[n] = p,
                            Cb(a, n) && (c[n] = !0)),
                            U(a, b, p, n),
                            J(b, n, "A", d, e, v, w)
                        }
                    }
                    if (g = a.className,
                    u(g) && "" !== g)
                        for (; f = j.exec(g); )
                            n = Pb(f[2]),
                            J(b, n, "C", d, e) && (c[n] = Fd(f[3])),
                            g = g.substr(f.index + f[0].length);
                    break;
                case 3:
                    R(b, a.nodeValue);
                    break;
                case 8:
                    try {
                        f = h.exec(a.nodeValue),
                        f && (n = Pb(f[1]),
                        J(b, n, "M", d, e) && (c[n] = Fd(f[2])))
                    } catch (y) {}
                }
                return b.sort(P),
                b
            }
            function F(a, b, c) {
                var d = []
                  , e = 0;
                if (b && a.hasAttribute && a.hasAttribute(b)) {
                    do {
                        if (!a)
                            throw de("uterdir", "Unterminated attribute, found '{0}' but no matching '{1}' found.", b, c);
                        1 == a.nodeType && (a.hasAttribute(b) && e++,
                        a.hasAttribute(c) && e--),
                        d.push(a),
                        a = a.nextSibling
                    } while (e > 0)
                } else
                    d.push(a);
                return ud(d)
            }
            function G(a, b, c) {
                return function(d, e, f, g, h) {
                    return e = F(e[0], b, c),
                    a(d, e, f, g, h)
                }
            }
            function H(a, e, g, h, j, k, l, m, n) {
                function o(a, b, c, d) {
                    a && (c && (a = G(a, c, d)),
                    a.require = w.require,
                    a.directiveName = y,
                    (P === w || w.$$isolateScope) && (a = W(a, {
                        isolateScope: !0
                    })),
                    l.push(a)),
                    b && (c && (b = G(b, c, d)),
                    b.require = w.require,
                    b.directiveName = y,
                    (P === w || w.$$isolateScope) && (b = W(b, {
                        isolateScope: !0
                    })),
                    m.push(b))
                }
                function p(a, b, c, d) {
                    var e, g = "data", h = !1;
                    if (u(b)) {
                        for (; "^" == (e = b.charAt(0)) || "?" == e; )
                            b = b.substr(1),
                            "^" == e && (g = "inheritedData"),
                            h = h || "?" == e;
                        if (e = null ,
                        d && "data" === g && (e = d[b]),
                        e = e || c[g]("$" + b + "Controller"),
                        !e && !h)
                            throw de("ctreq", "Controller '{0}', required by directive '{1}', can't be found!", b, a);
                        return e
                    }
                    return Ed(b) && (e = [],
                    f(b, function(b) {
                        e.push(p(a, b, c, d))
                    }
                    )),
                    e
                }
                function s(a, b, h, j, k) {
                    function n(a, b) {
                        var d;
                        return arguments.length < 2 && (b = a,
                        a = c),
                        Z && (d = z),
                        k(a, b, d)
                    }
                    var o, s, t, u, v, w, x, y, z = {};
                    if (o = e === h ? g : K(g, new X(ud(h),g.$attr)),
                    s = o.$$element,
                    P) {
                        var A = /^\s*([@=&])(\??)\s*(\w*)\s*$/;
                        x = b.$new(!0),
                        !R || R !== P && R !== P.$$originalDirective ? s.data("$isolateScopeNoTemplate", x) : s.data("$isolateScope", x),
                        B(s, "ng-isolate-scope"),
                        f(P.scope, function(a, c) {
                            var e, f, g, h, i = a.match(A) || [], j = i[3] || c, k = "?" == i[2], l = i[1];
                            switch (x.$$isolateBindings[c] = l + j,
                            l) {
                            case "@":
                                o.$observe(j, function(a) {
                                    x[c] = a
                                }
                                ),
                                o.$$observers[j].$$scope = b,
                                o[j] && (x[c] = d(o[j])(b));
                                break;
                            case "=":
                                if (k && !o[j])
                                    return;
                                f = q(o[j]),
                                h = f.literal ? L : function(a, b) {
                                    return a === b || a !== a && b !== b
                                }
                                ,
                                g = f.assign || function() {
                                    throw e = x[c] = f(b),
                                    de("nonassign", "Expression '{0}' used with directive '{1}' is non-assignable!", o[j], P.name)
                                }
                                ,
                                e = x[c] = f(b),
                                x.$watch(function() {
                                    var a = f(b);
                                    return h(a, x[c]) || (h(a, e) ? g(b, a = x[c]) : x[c] = a),
                                    e = a
                                }
                                , null , f.literal);
                                break;
                            case "&":
                                f = q(o[j]),
                                x[c] = function(a) {
                                    return f(b, a)
                                }
                                ;
                                break;
                            default:
                                throw de("iscp", "Invalid isolate scope definition for directive '{0}'. Definition: {... {1}: '{2}' ...}", P.name, c, a)
                            }
                        }
                        )
                    }
                    for (y = k && n,
                    J && f(J, function(a) {
                        var c, d = {
                            $scope: a === P || a.$$isolateScope ? x : b,
                            $element: s,
                            $attrs: o,
                            $transclude: y
                        };
                        w = a.controller,
                        "@" == w && (w = o[a.name]),
                        c = r(w, d),
                        z[a.name] = c,
                        Z || s.data("$" + a.name + "Controller", c),
                        a.controllerAs && (d.$scope[a.controllerAs] = c)
                    }
                    ),
                    t = 0,
                    u = l.length; u > t; t++)
                        try {
                            v = l[t],
                            v(v.isolateScope ? x : b, s, o, v.require && p(v.directiveName, v.require, s, z), y)
                        } catch (C) {
                            i(C, T(s))
                        }
                    var D = b;
                    for (P && (P.template || null  === P.templateUrl) && (D = x),
                    a && a(D, h.childNodes, c, k),
                    t = m.length - 1; t >= 0; t--)
                        try {
                            v = m[t],
                            v(v.isolateScope ? x : b, s, o, v.require && p(v.directiveName, v.require, s, z), y)
                        } catch (C) {
                            i(C, T(s))
                        }
                }
                n = n || {};
                for (var v, w, y, z, C, D, H = -Number.MAX_VALUE, J = n.controllerDirectives, P = n.newIsolateScopeDirective, R = n.templateDirective, S = n.nonTlbTranscludeDirective, U = !1, Y = !1, Z = n.hasElementTranscludeDirective, _ = g.$$element = ud(e), ab = k, bb = h, cb = 0, db = a.length; db > cb; cb++) {
                    w = a[cb];
                    var eb = w.$$start
                      , fb = w.$$end;
                    if (eb && (_ = F(e, eb, fb)),
                    z = c,
                    H > w.priority)
                        break;
                    if ((D = w.scope) && (v = v || w,
                    w.templateUrl || (Q("new/isolated scope", P, w, _),
                    t(D) && (P = w))),
                    y = w.name,
                    !w.templateUrl && w.controller && (D = w.controller,
                    J = J || {},
                    Q("'" + y + "' controller", J[y], w, _),
                    J[y] = w),
                    (D = w.transclude) && (U = !0,
                    w.$$tlb || (Q("transclusion", S, w, _),
                    S = w),
                    "element" == D ? (Z = !0,
                    H = w.priority,
                    z = _,
                    _ = g.$$element = ud(b.createComment(" " + y + ": " + g[y] + " ")),
                    e = _[0],
                    V(j, N(z), e),
                    bb = A(z, h, H, ab && ab.name, {
                        nonTlbTranscludeDirective: S
                    })) : (z = ud(pb(e)).contents(),
                    _.empty(),
                    bb = A(z, h))),
                    w.template)
                        if (Y = !0,
                        Q("template", R, w, _),
                        R = w,
                        D = x(w.template) ? w.template(_, g) : w.template,
                        D = $(D),
                        w.replace) {
                            if (ab = w,
                            z = lb(D) ? [] : ud(Fd(D)),
                            e = z[0],
                            1 != z.length || 1 !== e.nodeType)
                                throw de("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", y, "");
                            V(j, _, e);
                            var gb = {
                                $attr: {}
                            }
                              , hb = E(e, [], gb)
                              , ib = a.splice(cb + 1, a.length - (cb + 1));
                            P && I(hb),
                            a = a.concat(hb).concat(ib),
                            M(g, gb),
                            db = a.length
                        } else
                            _.html(D);
                    if (w.templateUrl)
                        Y = !0,
                        Q("template", R, w, _),
                        R = w,
                        w.replace && (ab = w),
                        s = O(a.splice(cb, a.length - cb), _, g, j, U && bb, l, m, {
                            controllerDirectives: J,
                            newIsolateScopeDirective: P,
                            templateDirective: R,
                            nonTlbTranscludeDirective: S
                        }),
                        db = a.length;
                    else if (w.compile)
                        try {
                            C = w.compile(_, g, bb),
                            x(C) ? o(null , C, eb, fb) : C && o(C.pre, C.post, eb, fb)
                        } catch (jb) {
                            i(jb, T(_))
                        }
                    w.terminal && (s.terminal = !0,
                    H = Math.max(H, w.priority))
                }
                return s.scope = v && v.scope === !0,
                s.transcludeOnThisElement = U,
                s.templateOnThisElement = Y,
                s.transclude = bb,
                n.hasElementTranscludeDirective = Z,
                s
            }
            function I(a) {
                for (var b = 0, c = a.length; c > b; b++)
                    a[b] = n(a[b], {
                        $$isolateScope: !0
                    })
            }
            function J(b, d, f, h, j, k, l) {
                if (d === j)
                    return null ;
                var m = null ;
                if (e.hasOwnProperty(d))
                    for (var o, p = a.get(d + g), q = 0, r = p.length; r > q; q++)
                        try {
                            o = p[q],
                            (h === c || h > o.priority) && -1 != o.restrict.indexOf(f) && (k && (o = n(o, {
                                $$start: k,
                                $$end: l
                            })),
                            b.push(o),
                            m = o)
                        } catch (s) {
                            i(s)
                        }
                return m
            }
            function M(a, b) {
                var c = b.$attr
                  , d = a.$attr
                  , e = a.$$element;
                f(a, function(d, e) {
                    "$" != e.charAt(0) && (b[e] && b[e] !== d && (d += ("style" === e ? ";" : " ") + b[e]),
                    a.$set(e, d, !0, c[e]))
                }
                ),
                f(b, function(b, f) {
                    "class" == f ? (B(e, b),
                    a["class"] = (a["class"] ? a["class"] + " " : "") + b) : "style" == f ? (e.attr("style", e.attr("style") + ";" + b),
                    a.style = (a.style ? a.style + ";" : "") + b) : "$" == f.charAt(0) || a.hasOwnProperty(f) || (a[f] = b,
                    d[f] = c[f])
                }
                )
            }
            function O(a, b, c, d, e, g, h, i) {
                var j, k, n = [], p = b[0], q = a.shift(), r = l({}, q, {
                    templateUrl: null ,
                    transclude: null ,
                    replace: null ,
                    $$originalDirective: q
                }), s = x(q.templateUrl) ? q.templateUrl(b, c) : q.templateUrl;
                return b.empty(),
                m.get(w.getTrustedResourceUrl(s), {
                    cache: o
                }).success(function(l) {
                    var m, o, u, v;
                    if (l = $(l),
                    q.replace) {
                        if (u = lb(l) ? [] : ud(Fd(l)),
                        m = u[0],
                        1 != u.length || 1 !== m.nodeType)
                            throw de("tplrt", "Template for directive '{0}' must have exactly one root element. {1}", q.name, s);
                        o = {
                            $attr: {}
                        },
                        V(d, b, m);
                        var w = E(m, [], o);
                        t(q.scope) && I(w),
                        a = w.concat(a),
                        M(c, o)
                    } else
                        m = p,
                        b.html(l);
                    for (a.unshift(r),
                    j = H(a, m, c, e, b, q, g, h, i),
                    f(d, function(a, c) {
                        a == m && (d[c] = b[0])
                    }
                    ),
                    k = C(b[0].childNodes, e); n.length; ) {
                        var x = n.shift()
                          , y = n.shift()
                          , z = n.shift()
                          , A = n.shift()
                          , F = b[0];
                        if (y !== p) {
                            var G = y.className;
                            i.hasElementTranscludeDirective && q.replace || (F = pb(m)),
                            V(z, ud(y), F),
                            B(ud(F), G)
                        }
                        v = j.transcludeOnThisElement ? D(x, j.transclude, A) : A,
                        j(k, x, F, d, v)
                    }
                    n = null
                }
                ).error(function(a, b, c, d) {
                    throw de("tpload", "Failed to load template: {0}", d.url)
                }
                ),
                function(a, b, c, d, e) {
                    var f = e;
                    n ? (n.push(b),
                    n.push(c),
                    n.push(d),
                    n.push(f)) : (j.transcludeOnThisElement && (f = D(b, j.transclude, e)),
                    j(k, b, c, d, f))
                }
            }
            function P(a, b) {
                var c = b.priority - a.priority;
                return 0 !== c ? c : a.name !== b.name ? a.name < b.name ? -1 : 1 : a.index - b.index
            }
            function Q(a, b, c, d) {
                if (b)
                    throw de("multidir", "Multiple directives [{0}, {1}] asking for {2} on: {3}", b.name, c.name, a, T(d))
            }
            function R(a, b) {
                var c = d(b, !0);
                c && a.push({
                    priority: 0,
                    compile: function(a) {
                        var b = a.parent()
                          , d = b.length;
                        return d && B(a.parent(), "ng-binding"),
                        function(a, b) {
                            var e = b.parent()
                              , f = e.data("$binding") || [];
                            f.push(c),
                            e.data("$binding", f),
                            d || B(e, "ng-binding"),
                            a.$watch(c, function(a) {
                                b[0].nodeValue = a
                            }
                            )
                        }
                    }
                })
            }
            function S(a, b) {
                if ("srcdoc" == b)
                    return w.HTML;
                var c = xd(a);
                return "xlinkHref" == b || "FORM" == c && "action" == b || "IMG" != c && ("src" == b || "ngSrc" == b) ? w.RESOURCE_URL : void 0
            }
            function U(a, b, c, e) {
                var f = d(c, !0);
                if (f) {
                    if ("multiple" === e && "SELECT" === xd(a))
                        throw de("selmulti", "Binding to the 'multiple' attribute is not supported. Element: {0}", T(a));
                    b.push({
                        priority: 100,
                        compile: function() {
                            return {
                                pre: function(b, c, g) {
                                    var h = g.$$observers || (g.$$observers = {});
                                    if (k.test(e))
                                        throw de("nodomevents", "Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.");
                                    f = d(g[e], !0, S(a, e)),
                                    f && (g[e] = f(b),
                                    (h[e] || (h[e] = [])).$$inter = !0,
                                    (g.$$observers && g.$$observers[e].$$scope || b).$watch(f, function(a, b) {
                                        "class" === e && a != b ? g.$updateClass(a, b) : g.$set(e, a)
                                    }
                                    ))
                                }
                            }
                        }
                    })
                }
            }
            function V(a, c, d) {
                var e, f, g = c[0], h = c.length, i = g.parentNode;
                if (a)
                    for (e = 0,
                    f = a.length; f > e; e++)
                        if (a[e] == g) {
                            a[e++] = d;
                            for (var j = e, k = j + h - 1, l = a.length; l > j; j++,
                            k++)
                                l > k ? a[j] = a[k] : delete a[j];
                            a.length -= h - 1;
                            break
                        }
                i && i.replaceChild(d, g);
                var m = b.createDocumentFragment();
                m.appendChild(g),
                d[ud.expando] = g[ud.expando];
                for (var n = 1, o = c.length; o > n; n++) {
                    var p = c[n];
                    ud(p).remove(),
                    m.appendChild(p),
                    delete c[n]
                }
                c[0] = d,
                c.length = 1
            }
            function W(a, b) {
                return l(function() {
                    return a.apply(null , arguments)
                }
                , a, b)
            }
            var X = function(a, b) {
                this.$$element = a,
                this.$attr = b || {}
            }
            ;
            X.prototype = {
                $normalize: Pb,
                $addClass: function(a) {
                    a && a.length > 0 && y.addClass(this.$$element, a)
                },
                $removeClass: function(a) {
                    a && a.length > 0 && y.removeClass(this.$$element, a)
                },
                $updateClass: function(a, b) {
                    var c = Qb(a, b)
                      , d = Qb(b, a);
                    0 === c.length ? y.removeClass(this.$$element, d) : 0 === d.length ? y.addClass(this.$$element, c) : y.setClass(this.$$element, c, d)
                },
                $set: function(a, b, d, e) {
                    var g, h = Cb(this.$$element[0], a);
                    h && (this.$$element.prop(a, b),
                    e = h),
                    this[a] = b,
                    e ? this.$attr[a] = e : (e = this.$attr[a],
                    e || (this.$attr[a] = e = _(a, "-"))),
                    g = xd(this.$$element),
                    ("A" === g && "href" === a || "IMG" === g && "src" === a) && (this[a] = b = z(b, "src" === a)),
                    d !== !1 && (null  === b || b === c ? this.$$element.removeAttr(e) : this.$$element.attr(e, b));
                    var j = this.$$observers;
                    j && f(j[a], function(a) {
                        try {
                            a(b)
                        } catch (c) {
                            i(c)
                        }
                    }
                    )
                },
                $observe: function(a, b) {
                    var c = this
                      , d = c.$$observers || (c.$$observers = {})
                      , e = d[a] || (d[a] = []);
                    return e.push(b),
                    s.$evalAsync(function() {
                        e.$$inter || b(c[a])
                    }
                    ),
                    b
                }
            };
            var Y = d.startSymbol()
              , Z = d.endSymbol()
              , $ = "{{" == Y || "}}" == Z ? p : function(a) {
                return a.replace(/\{\{/g, Y).replace(/}}/g, Z)
            }
              , ab = /^ngAttr[A-Z]/;
            return A
        }
        ]
    }
    function Pb(a) {
        return jb(a.replace(ee, ""))
    }
    function Qb(a, b) {
        var c = ""
          , d = a.split(/\s+/)
          , e = b.split(/\s+/);
        a: for (var f = 0; f < d.length; f++) {
            for (var g = d[f], h = 0; h < e.length; h++)
                if (g == e[h])
                    continue a;
            c += (c.length > 0 ? " " : "") + g
        }
        return c
    }
    function Rb() {
        var a = {}
          , b = /^(\S+)(\s+as\s+(\w+))?$/;
        this.register = function(b, c) {
            db(b, "controller"),
            t(b) ? l(a, b) : a[b] = c
        }
        ,
        this.$get = ["$injector", "$window", function(c, e) {
            return function(f, g) {
                var h, i, j, k;
                if (u(f) && (i = f.match(b),
                j = i[1],
                k = i[3],
                f = a.hasOwnProperty(j) ? a[j] : eb(g.$scope, j, !0) || eb(e, j, !0),
                cb(f, j, !0)),
                h = c.instantiate(f, g),
                k) {
                    if (!g || "object" != typeof g.$scope)
                        throw d("$controller")("noscp", "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.", j || f.name, k);
                    g.$scope[k] = h
                }
                return h
            }
        }
        ]
    }
    function Sb() {
        this.$get = ["$window", function(a) {
            return ud(a.document)
        }
        ]
    }
    function Tb() {
        this.$get = ["$log", function(a) {
            return function() {
                a.error.apply(a, arguments)
            }
        }
        ]
    }
    function Ub(a) {
        var b, c, d, e = {};
        return a ? (f(a.split("\n"), function(a) {
            d = a.indexOf(":"),
            b = od(Fd(a.substr(0, d))),
            c = Fd(a.substr(d + 1)),
            b && (e[b] = e[b] ? e[b] + ", " + c : c)
        }
        ),
        e) : e
    }
    function Vb(a) {
        var b = t(a) ? a : c;
        return function(c) {
            return b || (b = Ub(a)),
            c ? b[od(c)] || null  : b
        }
    }
    function Wb(a, b, c) {
        return x(c) ? c(a, b) : (f(c, function(c) {
            a = c(a, b)
        }
        ),
        a)
    }
    function Xb(a) {
        return a >= 200 && 300 > a
    }
    function Yb() {
        var a = /^\s*(\[|\{[^\{])/
          , b = /[\}\]]\s*$/
          , d = /^\)\]\}',?\n/
          , e = {
            "Content-Type": "application/json;charset=utf-8"
        }
          , g = this.defaults = {
            transformResponse: [function(c) {
                return u(c) && (c = c.replace(d, ""),
                a.test(c) && b.test(c) && (c = R(c))),
                c
            }
            ],
            transformRequest: [function(a) {
                return !t(a) || B(a) || C(a) ? a : Q(a)
            }
            ],
            headers: {
                common: {
                    Accept: "application/json, text/plain, */*"
                },
                post: K(e),
                put: K(e),
                patch: K(e)
            },
            xsrfCookieName: "XSRF-TOKEN",
            xsrfHeaderName: "X-XSRF-TOKEN"
        }
          , i = this.interceptors = []
          , j = this.responseInterceptors = [];
        this.$get = ["$httpBackend", "$browser", "$cacheFactory", "$rootScope", "$q", "$injector", function(a, b, d, e, k, m) {
            function n(a) {
                function b(a) {
                    var b = l({}, a, {
                        data: Wb(a.data, a.headers, e.transformResponse)
                    });
                    return Xb(a.status) ? b : k.reject(b)
                }
                function d(a) {
                    function b(a) {
                        var b;
                        f(a, function(c, d) {
                            x(c) && (b = c(),
                            null  != b ? a[d] = b : delete a[d])
                        }
                        )
                    }
                    var c, d, e, h = g.headers, i = l({}, a.headers);
                    h = l({}, h.common, h[od(a.method)]);
                    a: for (c in h) {
                        d = od(c);
                        for (e in i)
                            if (od(e) === d)
                                continue a;
                        i[c] = h[c]
                    }
                    return b(i),
                    i
                }
                var e = {
                    method: "get",
                    transformRequest: g.transformRequest,
                    transformResponse: g.transformResponse
                }
                  , h = d(a);
                l(e, a),
                e.headers = h,
                e.method = qd(e.method);
                var i = function(a) {
                    h = a.headers;
                    var c = Wb(a.data, Vb(h), a.transformRequest);
                    return r(c) && f(h, function(a, b) {
                        "content-type" === od(b) && delete h[b]
                    }
                    ),
                    r(a.withCredentials) && !r(g.withCredentials) && (a.withCredentials = g.withCredentials),
                    q(a, c, h).then(b, b)
                }
                  , j = [i, c]
                  , m = k.when(e);
                for (f(z, function(a) {
                    (a.request || a.requestError) && j.unshift(a.request, a.requestError),
                    (a.response || a.responseError) && j.push(a.response, a.responseError)
                }
                ); j.length; ) {
                    var n = j.shift()
                      , o = j.shift();
                    m = m.then(n, o)
                }
                return m.success = function(a) {
                    return m.then(function(b) {
                        a(b.data, b.status, b.headers, e)
                    }
                    ),
                    m
                }
                ,
                m.error = function(a) {
                    return m.then(null , function(b) {
                        a(b.data, b.status, b.headers, e)
                    }
                    ),
                    m
                }
                ,
                m
            }
            function o() {
                f(arguments, function(a) {
                    n[a] = function(b, c) {
                        return n(l(c || {}, {
                            method: a,
                            url: b
                        }))
                    }
                }
                )
            }
            function p() {
                f(arguments, function(a) {
                    n[a] = function(b, c, d) {
                        return n(l(d || {}, {
                            method: a,
                            url: b,
                            data: c
                        }))
                    }
                }
                )
            }
            function q(d, f, h) {
                function i(a, b, c, d) {
                    m && (Xb(a) ? m.put(u, [a, b, Ub(c), d]) : m.remove(u)),
                    j(b, a, c, d),
                    e.$$phase || e.$apply()
                }
                function j(a, b, c, e) {
                    b = Math.max(b, 0),
                    (Xb(b) ? p.resolve : p.reject)({
                        data: a,
                        status: b,
                        headers: Vb(c),
                        config: d,
                        statusText: e
                    })
                }
                function l() {
                    var a = H(n.pendingRequests, d);
                    -1 !== a && n.pendingRequests.splice(a, 1)
                }
                var m, o, p = k.defer(), q = p.promise, u = v(d.url, d.params);
                if (n.pendingRequests.push(d),
                q.then(l, l),
                !d.cache && !g.cache || d.cache === !1 || "GET" !== d.method && "JSONP" !== d.method || (m = t(d.cache) ? d.cache : t(g.cache) ? g.cache : y),
                m)
                    if (o = m.get(u),
                    s(o)) {
                        if (D(o))
                            return o.then(l, l),
                            o;
                        Ed(o) ? j(o[1], o[0], K(o[2]), o[3]) : j(o, 200, {}, "OK")
                    } else
                        m.put(u, q);
                if (r(o)) {
                    var w = Nc(d.url) ? b.cookies()[d.xsrfCookieName || g.xsrfCookieName] : c;
                    w && (h[d.xsrfHeaderName || g.xsrfHeaderName] = w),
                    a(d.method, u, f, i, h, d.timeout, d.withCredentials, d.responseType)
                }
                return q
            }
            function v(a, b) {
                if (!b)
                    return a;
                var c = [];
                return h(b, function(a, b) {
                    null  === a || r(a) || (Ed(a) || (a = [a]),
                    f(a, function(a) {
                        t(a) && (a = w(a) ? a.toISOString() : Q(a)),
                        c.push(Y(b) + "=" + Y(a))
                    }
                    ))
                }
                ),
                c.length > 0 && (a += (-1 == a.indexOf("?") ? "?" : "&") + c.join("&")),
                a
            }
            var y = d("$http")
              , z = [];
            return f(i, function(a) {
                z.unshift(u(a) ? m.get(a) : m.invoke(a))
            }
            ),
            f(j, function(a, b) {
                var c = u(a) ? m.get(a) : m.invoke(a);
                z.splice(b, 0, {
                    response: function(a) {
                        return c(k.when(a))
                    },
                    responseError: function(a) {
                        return c(k.reject(a))
                    }
                })
            }
            ),
            n.pendingRequests = [],
            o("get", "delete", "head", "jsonp"),
            p("post", "put", "patch"),
            n.defaults = g,
            n
        }
        ]
    }
    function Zb(b) {
        if (8 >= td && (!b.match(/^(get|post|head|put|delete|options)$/i) || !a.XMLHttpRequest))
            return new a.ActiveXObject("Microsoft.XMLHTTP");
        if (a.XMLHttpRequest)
            return new a.XMLHttpRequest;
        throw d("$httpBackend")("noxhr", "This browser does not support XMLHttpRequest.")
    }
    function $b() {
        this.$get = ["$browser", "$window", "$document", function(a, b, c) {
            return _b(a, Zb, a.defer, b.angular.callbacks, c[0])
        }
        ]
    }
    function _b(a, b, c, d, e) {
        function g(a, b, c) {
            var f = e.createElement("script")
              , g = null ;
            return f.type = "text/javascript",
            f.src = a,
            f.async = !0,
            g = function(a) {
                Md(f, "load", g),
                Md(f, "error", g),
                e.body.removeChild(f),
                f = null ;
                var h = -1
                  , i = "unknown";
                a && ("load" !== a.type || d[b].called || (a = {
                    type: "error"
                }),
                i = a.type,
                h = "error" === a.type ? 404 : 200),
                c && c(h, i)
            }
            ,
            Ld(f, "load", g),
            Ld(f, "error", g),
            8 >= td && (f.onreadystatechange = function() {
                u(f.readyState) && /loaded|complete/.test(f.readyState) && (f.onreadystatechange = null ,
                g({
                    type: "load"
                }))
            }
            ),
            e.body.appendChild(f),
            g
        }
        var h = -1;
        return function(e, i, j, k, l, m, n, p) {
            function q() {
                t = h,
                v && v(),
                w && w.abort()
            }
            function r(b, d, e, f, g) {
                y && c.cancel(y),
                v = w = null ,
                0 === d && (d = e ? 200 : "file" == Mc(i).protocol ? 404 : 0),
                d = 1223 === d ? 204 : d,
                g = g || "",
                b(d, e, f, g),
                a.$$completeOutstandingRequest(o)
            }
            var t;
            if (a.$$incOutstandingRequestCount(),
            i = i || a.url(),
            "jsonp" == od(e)) {
                var u = "_" + (d.counter++).toString(36);
                d[u] = function(a) {
                    d[u].data = a,
                    d[u].called = !0
                }
                ;
                var v = g(i.replace("JSON_CALLBACK", "angular.callbacks." + u), u, function(a, b) {
                    r(k, a, d[u].data, "", b),
                    d[u] = o
                }
                )
            } else {
                var w = b(e);
                if (w.open(e, i, !0),
                f(l, function(a, b) {
                    s(a) && w.setRequestHeader(b, a)
                }
                ),
                w.onreadystatechange = function() {
                    if (w && 4 == w.readyState) {
                        var a = null
                          , b = null
                          , c = "";
                        t !== h && (a = w.getAllResponseHeaders(),
                        b = "response" in w ? w.response : w.responseText),
                        t === h && 10 > td || (c = w.statusText),
                        r(k, t || w.status, b, a, c)
                    }
                }
                ,
                n && (w.withCredentials = !0),
                p)
                    try {
                        w.responseType = p
                    } catch (x) {
                        if ("json" !== p)
                            throw x
                    }
                w.send(j || null )
            }
            if (m > 0)
                var y = c(q, m);
            else
                D(m) && m.then(q)
        }
    }
    function ac() {
        var a = "{{"
          , b = "}}";
        this.startSymbol = function(b) {
            return b ? (a = b,
            this) : a
        }
        ,
        this.endSymbol = function(a) {
            return a ? (b = a,
            this) : b
        }
        ,
        this.$get = ["$parse", "$exceptionHandler", "$sce", function(c, d, e) {
            function f(f, i, j) {
                for (var k, l, m, n, o = 0, p = [], q = f.length, r = !1, s = []; q > o; )
                    -1 != (k = f.indexOf(a, o)) && -1 != (l = f.indexOf(b, k + g)) ? (o != k && p.push(f.substring(o, k)),
                    p.push(m = c(n = f.substring(k + g, l))),
                    m.exp = n,
                    o = l + h,
                    r = !0) : (o != q && p.push(f.substring(o)),
                    o = q);
                if ((q = p.length) || (p.push(""),
                q = 1),
                j && p.length > 1)
                    throw fe("noconcat", "Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce", f);
                return !i || r ? (s.length = q,
                m = function(a) {
                    try {
                        for (var b, c = 0, g = q; g > c; c++) {
                            if ("function" == typeof (b = p[c]))
                                if (b = b(a),
                                b = j ? e.getTrusted(j, b) : e.valueOf(b),
                                null  == b)
                                    b = "";
                                else
                                    switch (typeof b) {
                                    case "string":
                                        break;
                                    case "number":
                                        b = "" + b;
                                        break;
                                    default:
                                        b = Q(b)
                                    }
                            s[c] = b
                        }
                        return s.join("")
                    } catch (h) {
                        var i = fe("interr", "Can't interpolate: {0}\n{1}", f, h.toString());
                        d(i)
                    }
                }
                ,
                m.exp = f,
                m.parts = p,
                m) : void 0
            }
            var g = a.length
              , h = b.length;
            return f.startSymbol = function() {
                return a
            }
            ,
            f.endSymbol = function() {
                return b
            }
            ,
            f
        }
        ]
    }
    function bc() {
        this.$get = ["$rootScope", "$window", "$q", function(a, b, c) {
            function d(d, f, g, h) {
                var i = b.setInterval
                  , j = b.clearInterval
                  , k = c.defer()
                  , l = k.promise
                  , m = 0
                  , n = s(h) && !h;
                return g = s(g) ? g : 0,
                l.then(null , null , d),
                l.$$intervalId = i(function() {
                    k.notify(m++),
                    g > 0 && m >= g && (k.resolve(m),
                    j(l.$$intervalId),
                    delete e[l.$$intervalId]),
                    n || a.$apply()
                }
                , f),
                e[l.$$intervalId] = k,
                l
            }
            var e = {};
            return d.cancel = function(a) {
                return a && a.$$intervalId in e ? (e[a.$$intervalId].reject("canceled"),
                b.clearInterval(a.$$intervalId),
                delete e[a.$$intervalId],
                !0) : !1
            }
            ,
            d
        }
        ]
    }
    function cc() {
        this.$get = function() {
            return {
                id: "en-us",
                NUMBER_FORMATS: {
                    DECIMAL_SEP: ".",
                    GROUP_SEP: ",",
                    PATTERNS: [{
                        minInt: 1,
                        minFrac: 0,
                        maxFrac: 3,
                        posPre: "",
                        posSuf: "",
                        negPre: "-",
                        negSuf: "",
                        gSize: 3,
                        lgSize: 3
                    }, {
                        minInt: 1,
                        minFrac: 2,
                        maxFrac: 2,
                        posPre: "¤",
                        posSuf: "",
                        negPre: "(¤",
                        negSuf: ")",
                        gSize: 3,
                        lgSize: 3
                    }],
                    CURRENCY_SYM: "$"
                },
                DATETIME_FORMATS: {
                    MONTH: "January,February,March,April,May,June,July,August,September,October,November,December".split(","),
                    SHORTMONTH: "Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),
                    DAY: "Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),
                    SHORTDAY: "Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
                    AMPMS: ["AM", "PM"],
                    medium: "MMM d, y h:mm:ss a",
                    "short": "M/d/yy h:mm a",
                    fullDate: "EEEE, MMMM d, y",
                    longDate: "MMMM d, y",
                    mediumDate: "MMM d, y",
                    shortDate: "M/d/yy",
                    mediumTime: "h:mm:ss a",
                    shortTime: "h:mm a"
                },
                pluralCat: function(a) {
                    return 1 === a ? "one" : "other"
                }
            }
        }
    }
    function dc(a) {
        for (var b = a.split("/"), c = b.length; c--; )
            b[c] = X(b[c]);
        return b.join("/")
    }
    function ec(a, b, c) {
        var d = Mc(a, c);
        b.$$protocol = d.protocol,
        b.$$host = d.hostname,
        b.$$port = m(d.port) || he[d.protocol] || null
    }
    function fc(a, b, c) {
        var d = "/" !== a.charAt(0);
        d && (a = "/" + a);
        var e = Mc(a, c);
        b.$$path = decodeURIComponent(d && "/" === e.pathname.charAt(0) ? e.pathname.substring(1) : e.pathname),
        b.$$search = V(e.search),
        b.$$hash = decodeURIComponent(e.hash),
        b.$$path && "/" != b.$$path.charAt(0) && (b.$$path = "/" + b.$$path)
    }
    function gc(a, b) {
        return 0 === b.indexOf(a) ? b.substr(a.length) : void 0
    }
    function hc(a) {
        var b = a.indexOf("#");
        return -1 == b ? a : a.substr(0, b)
    }
    function ic(a) {
        return a.substr(0, hc(a).lastIndexOf("/") + 1)
    }
    function jc(a) {
        return a.substring(0, a.indexOf("/", a.indexOf("//") + 2))
    }
    function kc(a, b) {
        this.$$html5 = !0,
        b = b || "";
        var d = ic(a);
        ec(a, this, a),
        this.$$parse = function(b) {
            var c = gc(d, b);
            if (!u(c))
                throw ie("ipthprfx", 'Invalid url "{0}", missing path prefix "{1}".', b, d);
            fc(c, this, a),
            this.$$path || (this.$$path = "/"),
            this.$$compose()
        }
        ,
        this.$$compose = function() {
            var a = W(this.$$search)
              , b = this.$$hash ? "#" + X(this.$$hash) : "";
            this.$$url = dc(this.$$path) + (a ? "?" + a : "") + b,
            this.$$absUrl = d + this.$$url.substr(1)
        }
        ,
        this.$$parseLinkUrl = function(e) {
            var f, g, h;
            return (f = gc(a, e)) !== c ? (g = f,
            h = (f = gc(b, f)) !== c ? d + (gc("/", f) || f) : a + g) : (f = gc(d, e)) !== c ? h = d + f : d == e + "/" && (h = d),
            h && this.$$parse(h),
            !!h
        }
    }
    function lc(a, b) {
        var c = ic(a);
        ec(a, this, a),
        this.$$parse = function(d) {
            function e(a, b, c) {
                var d, e = /^\/[A-Z]:(\/.*)/;
                return 0 === b.indexOf(c) && (b = b.replace(c, "")),
                e.exec(b) ? a : (d = e.exec(a),
                d ? d[1] : a)
            }
            var f = gc(a, d) || gc(c, d)
              , g = "#" == f.charAt(0) ? gc(b, f) : this.$$html5 ? f : "";
            if (!u(g))
                throw ie("ihshprfx", 'Invalid url "{0}", missing hash prefix "{1}".', d, b);
            fc(g, this, a),
            this.$$path = e(this.$$path, g, a),
            this.$$compose()
        }
        ,
        this.$$compose = function() {
            var c = W(this.$$search)
              , d = this.$$hash ? "#" + X(this.$$hash) : "";
            this.$$url = dc(this.$$path) + (c ? "?" + c : "") + d,
            this.$$absUrl = a + (this.$$url ? b + this.$$url : "")
        }
        ,
        this.$$parseLinkUrl = function(b) {
            return hc(a) == hc(b) ? (this.$$parse(b),
            !0) : !1
        }
    }
    function mc(a, b) {
        this.$$html5 = !0,
        lc.apply(this, arguments);
        var c = ic(a);
        this.$$parseLinkUrl = function(d) {
            var e, f;
            return a == hc(d) ? e = d : (f = gc(c, d)) ? e = a + b + f : c === d + "/" && (e = c),
            e && this.$$parse(e),
            !!e
        }
        ,
        this.$$compose = function() {
            var c = W(this.$$search)
              , d = this.$$hash ? "#" + X(this.$$hash) : "";
            this.$$url = dc(this.$$path) + (c ? "?" + c : "") + d,
            this.$$absUrl = a + b + this.$$url
        }
    }
    function nc(a) {
        return function() {
            return this[a]
        }
    }
    function oc(a, b) {
        return function(c) {
            return r(c) ? this[a] : (this[a] = b(c),
            this.$$compose(),
            this)
        }
    }
    function pc() {
        var b = ""
          , c = !1;
        this.hashPrefix = function(a) {
            return s(a) ? (b = a,
            this) : b
        }
        ,
        this.html5Mode = function(a) {
            return s(a) ? (c = a,
            this) : c
        }
        ,
        this.$get = ["$rootScope", "$browser", "$sniffer", "$rootElement", function(d, e, f, g) {
            function h(a) {
                d.$broadcast("$locationChangeSuccess", i.absUrl(), a)
            }
            var i, j, k, l = e.baseHref(), m = e.url();
            c ? (k = jc(m) + (l || "/"),
            j = f.history ? kc : mc) : (k = hc(m),
            j = lc),
            i = new j(k,"#" + b),
            i.$$parseLinkUrl(m, m);
            var n = /^\s*(javascript|mailto):/i;
            g.on("click", function(b) {
                if (!b.ctrlKey && !b.metaKey && 2 != b.which) {
                    for (var c = ud(b.target); "a" !== od(c[0].nodeName); )
                        if (c[0] === g[0] || !(c = c.parent())[0])
                            return;
                    var f = c.prop("href")
                      , h = c.attr("href") || c.attr("xlink:href");
                    t(f) && "[object SVGAnimatedString]" === f.toString() && (f = Mc(f.animVal).href),
                    n.test(f) || !f || c.attr("target") || b.isDefaultPrevented() || i.$$parseLinkUrl(f, h) && (b.preventDefault(),
                    i.absUrl() != e.url() && (d.$apply(),
                    a.angular["ff-684208-preventDefault"] = !0))
                }
            }
            ),
            i.absUrl() != m && e.url(i.absUrl(), !0),
            e.onUrlChange(function(a) {
                i.absUrl() != a && (d.$evalAsync(function() {
                    var b = i.absUrl();
                    i.$$parse(a),
                    d.$broadcast("$locationChangeStart", a, b).defaultPrevented ? (i.$$parse(b),
                    e.url(b)) : h(b)
                }
                ),
                d.$$phase || d.$digest())
            }
            );
            var o = 0;
            return d.$watch(function() {
                var a = e.url()
                  , b = i.$$replace;
                return o && a == i.absUrl() || (o++,
                d.$evalAsync(function() {
                    d.$broadcast("$locationChangeStart", i.absUrl(), a).defaultPrevented ? i.$$parse(a) : (e.url(i.absUrl(), b),
                    h(a))
                }
                )),
                i.$$replace = !1,
                o
            }
            ),
            i
        }
        ]
    }
    function qc() {
        var a = !0
          , b = this;
        this.debugEnabled = function(b) {
            return s(b) ? (a = b,
            this) : a
        }
        ,
        this.$get = ["$window", function(c) {
            function d(a) {
                return a instanceof Error && (a.stack ? a = a.message && -1 === a.stack.indexOf(a.message) ? "Error: " + a.message + "\n" + a.stack : a.stack : a.sourceURL && (a = a.message + "\n" + a.sourceURL + ":" + a.line)),
                a
            }
            function e(a) {
                var b = c.console || {}
                  , e = b[a] || b.log || o
                  , g = !1;
                try {
                    g = !!e.apply
                } catch (h) {}
                return g ? function() {
                    var a = [];
                    return f(arguments, function(b) {
                        a.push(d(b))
                    }
                    ),
                    e.apply(b, a)
                }
                 : function(a, b) {
                    e(a, null  == b ? "" : b)
                }
            }
            return {
                log: e("log"),
                info: e("info"),
                warn: e("warn"),
                error: e("error"),
                debug: function() {
                    var c = e("debug");
                    return function() {
                        a && c.apply(b, arguments)
                    }
                }
                ()
            }
        }
        ]
    }
    function rc(a, b) {
        if ("__defineGetter__" === a || "__defineSetter__" === a || "__lookupGetter__" === a || "__lookupSetter__" === a || "__proto__" === a)
            throw ke("isecfld", "Attempting to access a disallowed field in Angular expressions! Expression: {0}", b);
        return a
    }
    function sc(a, b) {
        if (a) {
            if (a.constructor === a)
                throw ke("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", b);
            if (a.document && a.location && a.alert && a.setInterval)
                throw ke("isecwindow", "Referencing the Window in Angular expressions is disallowed! Expression: {0}", b);
            if (a.children && (a.nodeName || a.prop && a.attr && a.find))
                throw ke("isecdom", "Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}", b);
            if (a === Object)
                throw ke("isecobj", "Referencing Object in Angular expressions is disallowed! Expression: {0}", b)
        }
        return a
    }
    function tc(a, b) {
        if (a) {
            if (a.constructor === a)
                throw ke("isecfn", "Referencing Function in Angular expressions is disallowed! Expression: {0}", b);
            if (a === me || a === ne || oe && a === oe)
                throw ke("isecff", "Referencing call, apply or bind in Angular expressions is disallowed! Expression: {0}", b)
        }
    }
    function uc(a, b, d, e, f) {
        sc(a, e),
        f = f || {};
        for (var g, h = b.split("."), i = 0; h.length > 1; i++) {
            g = rc(h.shift(), e);
            var j = sc(a[g], e);
            j || (j = {},
            a[g] = j),
            a = j,
            a.then && f.unwrapPromises && (je(e),
            "$$v" in a || !function(a) {
                a.then(function(b) {
                    a.$$v = b
                }
                )
            }
            (a),
            a.$$v === c && (a.$$v = {}),
            a = a.$$v)
        }
        return g = rc(h.shift(), e),
        sc(a[g], e),
        a[g] = d,
        d
    }
    function vc(a) {
        return "constructor" == a
    }
    function wc(a, b, d, e, f, g, h) {
        rc(a, g),
        rc(b, g),
        rc(d, g),
        rc(e, g),
        rc(f, g);
        var i = function(a) {
            return sc(a, g)
        }
          , j = h.expensiveChecks
          , k = j || vc(a) ? i : p
          , l = j || vc(b) ? i : p
          , m = j || vc(d) ? i : p
          , n = j || vc(e) ? i : p
          , o = j || vc(f) ? i : p;
        return h.unwrapPromises ? function(h, i) {
            var j, p = i && i.hasOwnProperty(a) ? i : h;
            return null  == p ? p : (p = k(p[a]),
            p && p.then && (je(g),
            "$$v" in p || (j = p,
            j.$$v = c,
            j.then(function(a) {
                j.$$v = k(a)
            }
            )),
            p = k(p.$$v)),
            b ? null  == p ? c : (p = l(p[b]),
            p && p.then && (je(g),
            "$$v" in p || (j = p,
            j.$$v = c,
            j.then(function(a) {
                j.$$v = l(a)
            }
            )),
            p = l(p.$$v)),
            d ? null  == p ? c : (p = m(p[d]),
            p && p.then && (je(g),
            "$$v" in p || (j = p,
            j.$$v = c,
            j.then(function(a) {
                j.$$v = m(a)
            }
            )),
            p = m(p.$$v)),
            e ? null  == p ? c : (p = n(p[e]),
            p && p.then && (je(g),
            "$$v" in p || (j = p,
            j.$$v = c,
            j.then(function(a) {
                j.$$v = n(a)
            }
            )),
            p = n(p.$$v)),
            f ? null  == p ? c : (p = o(p[f]),
            p && p.then && (je(g),
            "$$v" in p || (j = p,
            j.$$v = c,
            j.then(function(a) {
                j.$$v = o(a)
            }
            )),
            p = o(p.$$v)),
            p) : p) : p) : p) : p)
        }
         : function(g, h) {
            var i = h && h.hasOwnProperty(a) ? h : g;
            return null  == i ? i : (i = k(i[a]),
            b ? null  == i ? c : (i = l(i[b]),
            d ? null  == i ? c : (i = m(i[d]),
            e ? null  == i ? c : (i = n(i[e]),
            f ? null  == i ? c : i = o(i[f]) : i) : i) : i) : i)
        }
    }
    function xc(a, b) {
        return function(c, d) {
            return a(c, d, je, sc, b)
        }
    }
    function yc(a, b, d) {
        var e = b.expensiveChecks
          , g = e ? ue : te;
        if (g.hasOwnProperty(a))
            return g[a];
        var h, i = a.split("."), j = i.length;
        if (b.csp)
            h = 6 > j ? wc(i[0], i[1], i[2], i[3], i[4], d, b) : function(a, e) {
                var f, g = 0;
                do
                    f = wc(i[g++], i[g++], i[g++], i[g++], i[g++], d, b)(a, e),
                    e = c,
                    a = f;
                while (j > g);return f
            }
            ;
        else {
            var k = "var p;\n";
            e && (k += "s = eso(s, fe);\nl = eso(l, fe);\n");
            var l = e;
            f(i, function(a, c) {
                rc(a, d);
                var f = (c ? "s" : '((l&&l.hasOwnProperty("' + a + '"))?l:s)') + '["' + a + '"]'
                  , g = e || vc(a);
                g && (f = "eso(" + f + ", fe)",
                l = !0),
                k += "if(s == null) return undefined;\ns=" + f + ";\n",
                b.unwrapPromises && (k += 'if (s && s.then) {\n pw("' + d.replace(/(["\r\n])/g, "\\$1") + '");\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=' + (g ? "eso(v)" : "v") + ";});\n}\n s=" + (g ? "eso(s.$$v)" : "s.$$v") + "\n}\n")
            }
            ),
            k += "return s;";
            var m = new Function("s","l","pw","eso","fe",k);
            m.toString = q(k),
            (l || b.unwrapPromises) && (m = xc(m, d)),
            h = m
        }
        return "hasOwnProperty" !== a && (g[a] = h),
        h
    }
    function zc() {
        var a = {}
          , b = {}
          , c = {
            csp: !1,
            unwrapPromises: !1,
            logPromiseWarnings: !0,
            expensiveChecks: !1
        };
        this.unwrapPromises = function(a) {
            return s(a) ? (c.unwrapPromises = !!a,
            this) : c.unwrapPromises
        }
        ,
        this.logPromiseWarnings = function(a) {
            return s(a) ? (c.logPromiseWarnings = a,
            this) : c.logPromiseWarnings
        }
        ,
        this.$get = ["$filter", "$sniffer", "$log", function(d, e, f) {
            c.csp = e.csp;
            var g = {
                csp: c.csp,
                unwrapPromises: c.unwrapPromises,
                logPromiseWarnings: c.logPromiseWarnings,
                expensiveChecks: !0
            };
            return je = function(a) {
                c.logPromiseWarnings && !le.hasOwnProperty(a) && (le[a] = !0,
                f.warn("[$parse] Promise found in the expression `" + a + "`. Automatic unwrapping of promises in Angular expressions is deprecated."))
            }
            ,
            function(e, f) {
                var h;
                switch (typeof e) {
                case "string":
                    var i = f ? b : a;
                    if (i.hasOwnProperty(e))
                        return i[e];
                    var j = f ? g : c
                      , k = new re(j)
                      , l = new se(k,d,j);
                    return h = l.parse(e),
                    "hasOwnProperty" !== e && (i[e] = h),
                    h;
                case "function":
                    return e;
                default:
                    return o
                }
            }
        }
        ]
    }
    function Ac() {
        this.$get = ["$rootScope", "$exceptionHandler", function(a, b) {
            return Bc(function(b) {
                a.$evalAsync(b)
            }
            , b)
        }
        ]
    }
    function Bc(a, b) {
        function d(a) {
            return a
        }
        function e(a) {
            return j(a)
        }
        function g(a) {
            var b = h()
              , c = 0
              , d = Ed(a) ? [] : {};
            return f(a, function(a, e) {
                c++,
                i(a).then(function(a) {
                    d.hasOwnProperty(e) || (d[e] = a,
                    --c || b.resolve(d))
                }
                , function(a) {
                    d.hasOwnProperty(e) || b.reject(a)
                }
                )
            }
            ),
            0 === c && b.resolve(d),
            b.promise
        }
        var h = function() {
            var f, g, j = [];
            return g = {
                resolve: function(b) {
                    if (j) {
                        var d = j;
                        j = c,
                        f = i(b),
                        d.length && a(function() {
                            for (var a, b = 0, c = d.length; c > b; b++)
                                a = d[b],
                                f.then(a[0], a[1], a[2])
                        }
                        )
                    }
                },
                reject: function(a) {
                    g.resolve(k(a))
                },
                notify: function(b) {
                    if (j) {
                        var c = j;
                        j.length && a(function() {
                            for (var a, d = 0, e = c.length; e > d; d++)
                                a = c[d],
                                a[2](b)
                        }
                        )
                    }
                },
                promise: {
                    then: function(a, c, g) {
                        var i = h()
                          , k = function(c) {
                            try {
                                i.resolve((x(a) ? a : d)(c))
                            } catch (e) {
                                i.reject(e),
                                b(e)
                            }
                        }
                          , l = function(a) {
                            try {
                                i.resolve((x(c) ? c : e)(a))
                            } catch (d) {
                                i.reject(d),
                                b(d)
                            }
                        }
                          , m = function(a) {
                            try {
                                i.notify((x(g) ? g : d)(a))
                            } catch (c) {
                                b(c)
                            }
                        }
                        ;
                        return j ? j.push([k, l, m]) : f.then(k, l, m),
                        i.promise
                    },
                    "catch": function(a) {
                        return this.then(null , a)
                    },
                    "finally": function(a) {
                        function b(a, b) {
                            var c = h();
                            return b ? c.resolve(a) : c.reject(a),
                            c.promise
                        }
                        function c(c, e) {
                            var f = null ;
                            try {
                                f = (a || d)()
                            } catch (g) {
                                return b(g, !1)
                            }
                            return D(f) ? f.then(function() {
                                return b(c, e)
                            }
                            , function(a) {
                                return b(a, !1)
                            }
                            ) : b(c, e)
                        }
                        return this.then(function(a) {
                            return c(a, !0)
                        }
                        , function(a) {
                            return c(a, !1)
                        }
                        )
                    }
                }
            }
        }
          , i = function(b) {
            return D(b) ? b : {
                then: function(c) {
                    var d = h();
                    return a(function() {
                        d.resolve(c(b))
                    }
                    ),
                    d.promise
                }
            }
        }
          , j = function(a) {
            var b = h();
            return b.reject(a),
            b.promise
        }
          , k = function(c) {
            return {
                then: function(d, f) {
                    var g = h();
                    return a(function() {
                        try {
                            g.resolve((x(f) ? f : e)(c))
                        } catch (a) {
                            g.reject(a),
                            b(a)
                        }
                    }
                    ),
                    g.promise
                }
            }
        }
          , l = function(c, f, g, k) {
            var l, m = h(), n = function(a) {
                try {
                    return (x(f) ? f : d)(a)
                } catch (c) {
                    return b(c),
                    j(c)
                }
            }
            , o = function(a) {
                try {
                    return (x(g) ? g : e)(a)
                } catch (c) {
                    return b(c),
                    j(c)
                }
            }
            , p = function(a) {
                try {
                    return (x(k) ? k : d)(a)
                } catch (c) {
                    b(c)
                }
            }
            ;
            return a(function() {
                i(c).then(function(a) {
                    l || (l = !0,
                    m.resolve(i(a).then(n, o, p)))
                }
                , function(a) {
                    l || (l = !0,
                    m.resolve(o(a)))
                }
                , function(a) {
                    l || m.notify(p(a))
                }
                )
            }
            ),
            m.promise
        }
        ;
        return {
            defer: h,
            reject: j,
            when: l,
            all: g
        }
    }
    function Cc() {
        this.$get = ["$window", "$timeout", function(a, b) {
            var c = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame
              , d = a.cancelAnimationFrame || a.webkitCancelAnimationFrame || a.mozCancelAnimationFrame || a.webkitCancelRequestAnimationFrame
              , e = !!c
              , f = e ? function(a) {
                var b = c(a);
                return function() {
                    d(b)
                }
            }
             : function(a) {
                var c = b(a, 16.66, !1);
                return function() {
                    b.cancel(c)
                }
            }
            ;
            return f.supported = e,
            f
        }
        ]
    }
    function Dc() {
        var a = 10
          , b = d("$rootScope")
          , c = null ;
        this.digestTtl = function(b) {
            return arguments.length && (a = b),
            a
        }
        ,
        this.$get = ["$injector", "$exceptionHandler", "$parse", "$browser", function(d, g, h, i) {
            function k() {
                this.$id = j(),
                this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null ,
                this["this"] = this.$root = this,
                this.$$destroyed = !1,
                this.$$asyncQueue = [],
                this.$$postDigestQueue = [],
                this.$$listeners = {},
                this.$$listenerCount = {},
                this.$$isolateBindings = {}
            }
            function l(a) {
                if (r.$$phase)
                    throw b("inprog", "{0} already in progress", r.$$phase);
                r.$$phase = a
            }
            function m() {
                r.$$phase = null
            }
            function n(a, b) {
                var c = h(a);
                return cb(c, b),
                c
            }
            function p(a, b, c) {
                do
                    a.$$listenerCount[c] -= b,
                    0 === a.$$listenerCount[c] && delete a.$$listenerCount[c];
                while (a = a.$parent)
            }
            function q() {}
            k.prototype = {
                constructor: k,
                $new: function(a) {
                    var b;
                    return a ? (b = new k,
                    b.$root = this.$root,
                    b.$$asyncQueue = this.$$asyncQueue,
                    b.$$postDigestQueue = this.$$postDigestQueue) : (this.$$childScopeClass || (this.$$childScopeClass = function() {
                        this.$$watchers = this.$$nextSibling = this.$$childHead = this.$$childTail = null ,
                        this.$$listeners = {},
                        this.$$listenerCount = {},
                        this.$id = j(),
                        this.$$childScopeClass = null
                    }
                    ,
                    this.$$childScopeClass.prototype = this),
                    b = new this.$$childScopeClass),
                    b["this"] = b,
                    b.$parent = this,
                    b.$$prevSibling = this.$$childTail,
                    this.$$childHead ? (this.$$childTail.$$nextSibling = b,
                    this.$$childTail = b) : this.$$childHead = this.$$childTail = b,
                    b
                },
                $watch: function(a, b, d) {
                    var e = this
                      , f = n(a, "watch")
                      , g = e.$$watchers
                      , h = {
                        fn: b,
                        last: q,
                        get: f,
                        exp: a,
                        eq: !!d
                    };
                    if (c = null ,
                    !x(b)) {
                        var i = n(b || o, "listener");
                        h.fn = function(a, b, c) {
                            i(c)
                        }
                    }
                    if ("string" == typeof a && f.constant) {
                        var j = h.fn;
                        h.fn = function(a, b, c) {
                            j.call(this, a, b, c),
                            I(g, h)
                        }
                    }
                    return g || (g = e.$$watchers = []),
                    g.unshift(h),
                    function() {
                        I(g, h),
                        c = null
                    }
                },
                $watchCollection: function(a, b) {
                    function c() {
                        f = m(j);
                        var a, b, c;
                        if (t(f))
                            if (e(f)) {
                                g !== n && (g = n,
                                q = g.length = 0,
                                l++),
                                a = f.length,
                                q !== a && (l++,
                                g.length = q = a);
                                for (var d = 0; a > d; d++)
                                    c = g[d] !== g[d] && f[d] !== f[d],
                                    c || g[d] === f[d] || (l++,
                                    g[d] = f[d])
                            } else {
                                g !== o && (g = o = {},
                                q = 0,
                                l++),
                                a = 0;
                                for (b in f)
                                    f.hasOwnProperty(b) && (a++,
                                    g.hasOwnProperty(b) ? (c = g[b] !== g[b] && f[b] !== f[b],
                                    c || g[b] === f[b] || (l++,
                                    g[b] = f[b])) : (q++,
                                    g[b] = f[b],
                                    l++));
                                if (q > a) {
                                    l++;
                                    for (b in g)
                                        g.hasOwnProperty(b) && !f.hasOwnProperty(b) && (q--,
                                        delete g[b])
                                }
                            }
                        else
                            g !== f && (g = f,
                            l++);
                        return l
                    }
                    function d() {
                        if (p ? (p = !1,
                        b(f, f, j)) : b(f, i, j),
                        k)
                            if (t(f))
                                if (e(f)) {
                                    i = new Array(f.length);
                                    for (var a = 0; a < f.length; a++)
                                        i[a] = f[a]
                                } else {
                                    i = {};
                                    for (var c in f)
                                        pd.call(f, c) && (i[c] = f[c])
                                }
                            else
                                i = f
                    }
                    var f, g, i, j = this, k = b.length > 1, l = 0, m = h(a), n = [], o = {}, p = !0, q = 0;
                    return this.$watch(c, d)
                },
                $digest: function() {
                    var d, e, f, h, j, k, n, o, p, r, s, t = this.$$asyncQueue, u = this.$$postDigestQueue, v = a, w = this, y = [];
                    l("$digest"),
                    i.$$checkUrlChange(),
                    c = null ;
                    do {
                        for (k = !1,
                        o = w; t.length; ) {
                            try {
                                s = t.shift(),
                                s.scope.$eval(s.expression)
                            } catch (z) {
                                m(),
                                g(z)
                            }
                            c = null
                        }
                        a: do {
                            if (h = o.$$watchers)
                                for (j = h.length; j--; )
                                    try {
                                        if (d = h[j])
                                            if ((e = d.get(o)) === (f = d.last) || (d.eq ? L(e, f) : "number" == typeof e && "number" == typeof f && isNaN(e) && isNaN(f))) {
                                                if (d === c) {
                                                    k = !1;
                                                    break a
                                                }
                                            } else
                                                k = !0,
                                                c = d,
                                                d.last = d.eq ? J(e, null ) : e,
                                                d.fn(e, f === q ? e : f, o),
                                                5 > v && (p = 4 - v,
                                                y[p] || (y[p] = []),
                                                r = x(d.exp) ? "fn: " + (d.exp.name || d.exp.toString()) : d.exp,
                                                r += "; newVal: " + Q(e) + "; oldVal: " + Q(f),
                                                y[p].push(r))
                                    } catch (z) {
                                        m(),
                                        g(z)
                                    }
                            if (!(n = o.$$childHead || o !== w && o.$$nextSibling))
                                for (; o !== w && !(n = o.$$nextSibling); )
                                    o = o.$parent
                        } while (o = n);if ((k || t.length) && !v--)
                            throw m(),
                            b("infdig", "{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}", a, Q(y))
                    } while (k || t.length);for (m(); u.length; )
                        try {
                            u.shift()()
                        } catch (z) {
                            g(z)
                        }
                },
                $destroy: function() {
                    if (!this.$$destroyed) {
                        var a = this.$parent;
                        this.$broadcast("$destroy"),
                        this.$$destroyed = !0,
                        this !== r && (f(this.$$listenerCount, O(null , p, this)),
                        a.$$childHead == this && (a.$$childHead = this.$$nextSibling),
                        a.$$childTail == this && (a.$$childTail = this.$$prevSibling),
                        this.$$prevSibling && (this.$$prevSibling.$$nextSibling = this.$$nextSibling),
                        this.$$nextSibling && (this.$$nextSibling.$$prevSibling = this.$$prevSibling),
                        this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = this.$root = null ,
                        this.$$listeners = {},
                        this.$$watchers = this.$$asyncQueue = this.$$postDigestQueue = [],
                        this.$destroy = this.$digest = this.$apply = o,
                        this.$on = this.$watch = function() {
                            return o
                        }
                        )
                    }
                },
                $eval: function(a, b) {
                    return h(a)(this, b)
                },
                $evalAsync: function(a) {
                    r.$$phase || r.$$asyncQueue.length || i.defer(function() {
                        r.$$asyncQueue.length && r.$digest()
                    }
                    ),
                    this.$$asyncQueue.push({
                        scope: this,
                        expression: a
                    })
                },
                $$postDigest: function(a) {
                    this.$$postDigestQueue.push(a)
                },
                $apply: function(a) {
                    try {
                        return l("$apply"),
                        this.$eval(a)
                    } catch (b) {
                        g(b)
                    } finally {
                        m();
                        try {
                            r.$digest()
                        } catch (b) {
                            throw g(b),
                            b
                        }
                    }
                },
                $on: function(a, b) {
                    var c = this.$$listeners[a];
                    c || (this.$$listeners[a] = c = []),
                    c.push(b);
                    var d = this;
                    do
                        d.$$listenerCount[a] || (d.$$listenerCount[a] = 0),
                        d.$$listenerCount[a]++;
                    while (d = d.$parent);var e = this;
                    return function() {
                        var d = H(c, b);
                        -1 !== d && (c[d] = null ,
                        p(e, 1, a))
                    }
                },
                $emit: function(a) {
                    var b, c, d, e = [], f = this, h = !1, i = {
                        name: a,
                        targetScope: f,
                        stopPropagation: function() {
                            h = !0
                        },
                        preventDefault: function() {
                            i.defaultPrevented = !0
                        },
                        defaultPrevented: !1
                    }, j = M([i], arguments, 1);
                    do {
                        for (b = f.$$listeners[a] || e,
                        i.currentScope = f,
                        c = 0,
                        d = b.length; d > c; c++)
                            if (b[c])
                                try {
                                    b[c].apply(null , j)
                                } catch (k) {
                                    g(k)
                                }
                            else
                                b.splice(c, 1),
                                c--,
                                d--;
                        if (h)
                            return i;
                        f = f.$parent
                    } while (f);return i
                },
                $broadcast: function(a) {
                    for (var b, c, d, e = this, f = e, h = e, i = {
                        name: a,
                        targetScope: e,
                        preventDefault: function() {
                            i.defaultPrevented = !0
                        },
                        defaultPrevented: !1
                    }, j = M([i], arguments, 1); f = h; ) {
                        for (i.currentScope = f,
                        b = f.$$listeners[a] || [],
                        c = 0,
                        d = b.length; d > c; c++)
                            if (b[c])
                                try {
                                    b[c].apply(null , j)
                                } catch (k) {
                                    g(k)
                                }
                            else
                                b.splice(c, 1),
                                c--,
                                d--;
                        if (!(h = f.$$listenerCount[a] && f.$$childHead || f !== e && f.$$nextSibling))
                            for (; f !== e && !(h = f.$$nextSibling); )
                                f = f.$parent
                    }
                    return i
                }
            };
            var r = new k;
            return r
        }
        ]
    }
    function Ec() {
        var a = /^\s*(https?|ftp|mailto|tel|file):/
          , b = /^\s*((https?|ftp|file):|data:image\/)/;
        this.aHrefSanitizationWhitelist = function(b) {
            return s(b) ? (a = b,
            this) : a
        }
        ,
        this.imgSrcSanitizationWhitelist = function(a) {
            return s(a) ? (b = a,
            this) : b
        }
        ,
        this.$get = function() {
            return function(c, d) {
                var e, f = d ? b : a;
                return td && !(td >= 8) || (e = Mc(c).href,
                "" === e || e.match(f)) ? c : "unsafe:" + e
            }
        }
    }
    function Fc(a) {
        return a.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
    }
    function Gc(a) {
        if ("self" === a)
            return a;
        if (u(a)) {
            if (a.indexOf("***") > -1)
                throw ve("iwcard", "Illegal sequence *** in string matcher.  String: {0}", a);
            return a = Fc(a).replace("\\*\\*", ".*").replace("\\*", "[^:/.?&;]*"),
            new RegExp("^" + a + "$")
        }
        if (y(a))
            return new RegExp("^" + a.source + "$");
        throw ve("imatcher", 'Matchers may only be "self", string patterns or RegExp objects')
    }
    function Hc(a) {
        var b = [];
        return s(a) && f(a, function(a) {
            b.push(Gc(a))
        }
        ),
        b
    }
    function Ic() {
        this.SCE_CONTEXTS = we;
        var a = ["self"]
          , b = [];
        this.resourceUrlWhitelist = function(b) {
            return arguments.length && (a = Hc(b)),
            a
        }
        ,
        this.resourceUrlBlacklist = function(a) {
            return arguments.length && (b = Hc(a)),
            b
        }
        ,
        this.$get = ["$injector", function(d) {
            function e(a, b) {
                return "self" === a ? Nc(b) : !!a.exec(b.href)
            }
            function f(c) {
                var d, f, g = Mc(c.toString()), h = !1;
                for (d = 0,
                f = a.length; f > d; d++)
                    if (e(a[d], g)) {
                        h = !0;
                        break
                    }
                if (h)
                    for (d = 0,
                    f = b.length; f > d; d++)
                        if (e(b[d], g)) {
                            h = !1;
                            break
                        }
                return h
            }
            function g(a) {
                var b = function(a) {
                    this.$$unwrapTrustedValue = function() {
                        return a
                    }
                }
                ;
                return a && (b.prototype = new a),
                b.prototype.valueOf = function() {
                    return this.$$unwrapTrustedValue()
                }
                ,
                b.prototype.toString = function() {
                    return this.$$unwrapTrustedValue().toString()
                }
                ,
                b
            }
            function h(a, b) {
                var d = m.hasOwnProperty(a) ? m[a] : null ;
                if (!d)
                    throw ve("icontext", "Attempted to trust a value in invalid context. Context: {0}; Value: {1}", a, b);
                if (null  === b || b === c || "" === b)
                    return b;
                if ("string" != typeof b)
                    throw ve("itype", "Attempted to trust a non-string value in a content requiring a string: Context: {0}", a);
                return new d(b)
            }
            function i(a) {
                return a instanceof l ? a.$$unwrapTrustedValue() : a
            }
            function j(a, b) {
                if (null  === b || b === c || "" === b)
                    return b;
                var d = m.hasOwnProperty(a) ? m[a] : null ;
                if (d && b instanceof d)
                    return b.$$unwrapTrustedValue();
                if (a === we.RESOURCE_URL) {
                    if (f(b))
                        return b;
                    throw ve("insecurl", "Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}", b.toString())
                }
                if (a === we.HTML)
                    return k(b);
                throw ve("unsafe", "Attempting to use an unsafe value in a safe context.")
            }
            var k = function() {
                throw ve("unsafe", "Attempting to use an unsafe value in a safe context.")
            }
            ;
            d.has("$sanitize") && (k = d.get("$sanitize"));
            var l = g()
              , m = {};
            return m[we.HTML] = g(l),
            m[we.CSS] = g(l),
            m[we.URL] = g(l),
            m[we.JS] = g(l),
            m[we.RESOURCE_URL] = g(m[we.URL]),
            {
                trustAs: h,
                getTrusted: j,
                valueOf: i
            }
        }
        ]
    }
    function Jc() {
        var a = !0;
        this.enabled = function(b) {
            return arguments.length && (a = !!b),
            a
        }
        ,
        this.$get = ["$parse", "$sniffer", "$sceDelegate", function(b, c, d) {
            if (a && c.msie && c.msieDocumentMode < 8)
                throw ve("iequirks", "Strict Contextual Escaping does not support Internet Explorer version < 9 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.");
            var e = K(we);
            e.isEnabled = function() {
                return a
            }
            ,
            e.trustAs = d.trustAs,
            e.getTrusted = d.getTrusted,
            e.valueOf = d.valueOf,
            a || (e.trustAs = e.getTrusted = function(a, b) {
                return b
            }
            ,
            e.valueOf = p),
            e.parseAs = function(a, c) {
                var d = b(c);
                return d.literal && d.constant ? d : function(b, c) {
                    return e.getTrusted(a, d(b, c))
                }
            }
            ;
            var g = e.parseAs
              , h = e.getTrusted
              , i = e.trustAs;
            return f(we, function(a, b) {
                var c = od(b);
                e[jb("parse_as_" + c)] = function(b) {
                    return g(a, b)
                }
                ,
                e[jb("get_trusted_" + c)] = function(b) {
                    return h(a, b)
                }
                ,
                e[jb("trust_as_" + c)] = function(b) {
                    return i(a, b)
                }
            }
            ),
            e
        }
        ]
    }
    function Kc() {
        this.$get = ["$window", "$document", function(a, b) {
            var c, d, e = {}, f = m((/android (\d+)/.exec(od((a.navigator || {}).userAgent)) || [])[1]), g = /Boxee/i.test((a.navigator || {}).userAgent), h = b[0] || {}, i = h.documentMode, j = /^(Moz|webkit|O|ms)(?=[A-Z])/, k = h.body && h.body.style, l = !1, n = !1;
            if (k) {
                for (var o in k)
                    if (d = j.exec(o)) {
                        c = d[0],
                        c = c.substr(0, 1).toUpperCase() + c.substr(1);
                        break
                    }
                c || (c = "WebkitOpacity" in k && "webkit"),
                l = !!("transition" in k || c + "Transition" in k),
                n = !!("animation" in k || c + "Animation" in k),
                !f || l && n || (l = u(h.body.style.webkitTransition),
                n = u(h.body.style.webkitAnimation))
            }
            return {
                history: !(!a.history || !a.history.pushState || 4 > f || g),
                hashchange: "onhashchange" in a && (!i || i > 7),
                hasEvent: function(a) {
                    if ("input" == a && 9 == td)
                        return !1;
                    if (r(e[a])) {
                        var b = h.createElement("div");
                        e[a] = "on" + a in b
                    }
                    return e[a]
                },
                csp: Gd(),
                vendorPrefix: c,
                transitions: l,
                animations: n,
                android: f,
                msie: td,
                msieDocumentMode: i
            }
        }
        ]
    }
    function Lc() {
        this.$get = ["$rootScope", "$browser", "$q", "$exceptionHandler", function(a, b, c, d) {
            function e(e, g, h) {
                var i, j = c.defer(), k = j.promise, l = s(h) && !h;
                return i = b.defer(function() {
                    try {
                        j.resolve(e())
                    } catch (b) {
                        j.reject(b),
                        d(b)
                    } finally {
                        delete f[k.$$timeoutId]
                    }
                    l || a.$apply()
                }
                , g),
                k.$$timeoutId = i,
                f[i] = j,
                k
            }
            var f = {};
            return e.cancel = function(a) {
                return a && a.$$timeoutId in f ? (f[a.$$timeoutId].reject("canceled"),
                delete f[a.$$timeoutId],
                b.defer.cancel(a.$$timeoutId)) : !1
            }
            ,
            e
        }
        ]
    }
    function Mc(a) {
        var b = a;
        return td && (xe.setAttribute("href", b),
        b = xe.href),
        xe.setAttribute("href", b),
        {
            href: xe.href,
            protocol: xe.protocol ? xe.protocol.replace(/:$/, "") : "",
            host: xe.host,
            search: xe.search ? xe.search.replace(/^\?/, "") : "",
            hash: xe.hash ? xe.hash.replace(/^#/, "") : "",
            hostname: xe.hostname,
            port: xe.port,
            pathname: "/" === xe.pathname.charAt(0) ? xe.pathname : "/" + xe.pathname
        }
    }
    function Nc(a) {
        var b = u(a) ? Mc(a) : a;
        return b.protocol === ye.protocol && b.host === ye.host
    }
    function Oc() {
        this.$get = q(a)
    }
    function Pc(a) {
        function b(d, e) {
            if (t(d)) {
                var g = {};
                return f(d, function(a, c) {
                    g[c] = b(c, a)
                }
                ),
                g
            }
            return a.factory(d + c, e)
        }
        var c = "Filter";
        this.register = b,
        this.$get = ["$injector", function(a) {
            return function(b) {
                return a.get(b + c)
            }
        }
        ],
        b("currency", Rc),
        b("date", Zc),
        b("filter", Qc),
        b("json", $c),
        b("limitTo", _c),
        b("lowercase", De),
        b("number", Sc),
        b("orderBy", ad),
        b("uppercase", Ee)
    }
    function Qc() {
        return function(a, b, c) {
            if (!Ed(a))
                return a;
            var d = typeof c
              , e = [];
            e.check = function(a) {
                for (var b = 0; b < e.length; b++)
                    if (!e[b](a))
                        return !1;
                return !0
            }
            ,
            "function" !== d && (c = "boolean" === d && c ? function(a, b) {
                return Cd.equals(a, b)
            }
             : function(a, b) {
                if (a && b && "object" == typeof a && "object" == typeof b) {
                    for (var d in a)
                        if ("$" !== d.charAt(0) && pd.call(a, d) && c(a[d], b[d]))
                            return !0;
                    return !1
                }
                return b = ("" + b).toLowerCase(),
                ("" + a).toLowerCase().indexOf(b) > -1
            }
            );
            var f = function(a, b) {
                if ("string" == typeof b && "!" === b.charAt(0))
                    return !f(a, b.substr(1));
                switch (typeof a) {
                case "boolean":
                case "number":
                case "string":
                    return c(a, b);
                case "object":
                    switch (typeof b) {
                    case "object":
                        return c(a, b);
                    default:
                        for (var d in a)
                            if ("$" !== d.charAt(0) && f(a[d], b))
                                return !0
                    }
                    return !1;
                case "array":
                    for (var e = 0; e < a.length; e++)
                        if (f(a[e], b))
                            return !0;
                    return !1;
                default:
                    return !1
                }
            }
            ;
            switch (typeof b) {
            case "boolean":
            case "number":
            case "string":
                b = {
                    $: b
                };
            case "object":
                for (var g in b)
                    !function(a) {
                        "undefined" != typeof b[a] && e.push(function(c) {
                            return f("$" == a ? c : c && c[a], b[a])
                        }
                        )
                    }
                    (g);
                break;
            case "function":
                e.push(b);
                break;
            default:
                return a
            }
            for (var h = [], i = 0; i < a.length; i++) {
                var j = a[i];
                e.check(j) && h.push(j)
            }
            return h
        }
    }
    function Rc(a) {
        var b = a.NUMBER_FORMATS;
        return function(a, c) {
            return r(c) && (c = b.CURRENCY_SYM),
            Tc(a, b.PATTERNS[1], b.GROUP_SEP, b.DECIMAL_SEP, 2).replace(/\u00A4/g, c)
        }
    }
    function Sc(a) {
        var b = a.NUMBER_FORMATS;
        return function(a, c) {
            return Tc(a, b.PATTERNS[0], b.GROUP_SEP, b.DECIMAL_SEP, c)
        }
    }
    function Tc(a, b, c, d, e) {
        if (null  == a || !isFinite(a) || t(a))
            return "";
        var f = 0 > a;
        a = Math.abs(a);
        var g = a + ""
          , h = ""
          , i = []
          , j = !1;
        if (-1 !== g.indexOf("e")) {
            var k = g.match(/([\d\.]+)e(-?)(\d+)/);
            k && "-" == k[2] && k[3] > e + 1 ? (g = "0",
            a = 0) : (h = g,
            j = !0)
        }
        if (j)
            e > 0 && a > -1 && 1 > a && (h = a.toFixed(e));
        else {
            var l = (g.split(ze)[1] || "").length;
            r(e) && (e = Math.min(Math.max(b.minFrac, l), b.maxFrac)),
            a = +(Math.round(+(a.toString() + "e" + e)).toString() + "e" + -e),
            0 === a && (f = !1);
            var m = ("" + a).split(ze)
              , n = m[0];
            m = m[1] || "";
            var o, p = 0, q = b.lgSize, s = b.gSize;
            if (n.length >= q + s)
                for (p = n.length - q,
                o = 0; p > o; o++)
                    (p - o) % s === 0 && 0 !== o && (h += c),
                    h += n.charAt(o);
            for (o = p; o < n.length; o++)
                (n.length - o) % q === 0 && 0 !== o && (h += c),
                h += n.charAt(o);
            for (; m.length < e; )
                m += "0";
            e && "0" !== e && (h += d + m.substr(0, e))
        }
        return i.push(f ? b.negPre : b.posPre),
        i.push(h),
        i.push(f ? b.negSuf : b.posSuf),
        i.join("")
    }
    function Uc(a, b, c) {
        var d = "";
        for (0 > a && (d = "-",
        a = -a),
        a = "" + a; a.length < b; )
            a = "0" + a;
        return c && (a = a.substr(a.length - b)),
        d + a
    }
    function Vc(a, b, c, d) {
        return c = c || 0,
        function(e) {
            var f = e["get" + a]();
            return (c > 0 || f > -c) && (f += c),
            0 === f && -12 == c && (f = 12),
            Uc(f, b, d)
        }
    }
    function Wc(a, b) {
        return function(c, d) {
            var e = c["get" + a]()
              , f = qd(b ? "SHORT" + a : a);
            return d[f][e]
        }
    }
    function Xc(a) {
        var b = -1 * a.getTimezoneOffset()
          , c = b >= 0 ? "+" : "";
        return c += Uc(Math[b > 0 ? "floor" : "ceil"](b / 60), 2) + Uc(Math.abs(b % 60), 2)
    }
    function Yc(a, b) {
        return a.getHours() < 12 ? b.AMPMS[0] : b.AMPMS[1]
    }
    function Zc(a) {
        function b(a) {
            var b;
            if (b = a.match(c)) {
                var d = new Date(0)
                  , e = 0
                  , f = 0
                  , g = b[8] ? d.setUTCFullYear : d.setFullYear
                  , h = b[8] ? d.setUTCHours : d.setHours;
                b[9] && (e = m(b[9] + b[10]),
                f = m(b[9] + b[11])),
                g.call(d, m(b[1]), m(b[2]) - 1, m(b[3]));
                var i = m(b[4] || 0) - e
                  , j = m(b[5] || 0) - f
                  , k = m(b[6] || 0)
                  , l = Math.round(1e3 * parseFloat("0." + (b[7] || 0)));
                return h.call(d, i, j, k, l),
                d
            }
            return a
        }
        var c = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
        return function(c, d) {
            var e, g, h = "", i = [];
            if (d = d || "mediumDate",
            d = a.DATETIME_FORMATS[d] || d,
            u(c) && (c = Ce.test(c) ? m(c) : b(c)),
            v(c) && (c = new Date(c)),
            !w(c))
                return c;
            for (; d; )
                g = Be.exec(d),
                g ? (i = M(i, g, 1),
                d = i.pop()) : (i.push(d),
                d = null );
            return f(i, function(b) {
                e = Ae[b],
                h += e ? e(c, a.DATETIME_FORMATS) : b.replace(/(^'|'$)/g, "").replace(/''/g, "'")
            }
            ),
            h
        }
    }
    function $c() {
        return function(a) {
            return Q(a, !0)
        }
    }
    function _c() {
        return function(a, b) {
            if (!Ed(a) && !u(a))
                return a;
            if (b = 1 / 0 === Math.abs(Number(b)) ? Number(b) : m(b),
            u(a))
                return b ? b >= 0 ? a.slice(0, b) : a.slice(b, a.length) : "";
            var c, d, e = [];
            for (b > a.length ? b = a.length : b < -a.length && (b = -a.length),
            b > 0 ? (c = 0,
            d = b) : (c = a.length + b,
            d = a.length); d > c; c++)
                e.push(a[c]);
            return e
        }
    }
    function ad(a) {
        return function(b, c, d) {
            function f(a, b) {
                for (var d = 0; d < c.length; d++) {
                    var e = c[d](a, b);
                    if (0 !== e)
                        return e
                }
                return 0
            }
            function g(a, b) {
                return S(b) ? function(b, c) {
                    return a(c, b)
                }
                 : a
            }
            function h(a, b) {
                var c = typeof a
                  , d = typeof b;
                return c == d ? (w(a) && w(b) && (a = a.valueOf(),
                b = b.valueOf()),
                "string" == c && (a = a.toLowerCase(),
                b = b.toLowerCase()),
                a === b ? 0 : b > a ? -1 : 1) : d > c ? -1 : 1
            }
            return e(b) ? (c = Ed(c) ? c : [c],
            0 === c.length && (c = ["+"]),
            c = F(c, function(b) {
                var c = !1
                  , d = b || p;
                if (u(b)) {
                    if (("+" == b.charAt(0) || "-" == b.charAt(0)) && (c = "-" == b.charAt(0),
                    b = b.substring(1)),
                    "" === b)
                        return g(function(a, b) {
                            return h(a, b)
                        }
                        , c);
                    if (d = a(b),
                    d.constant) {
                        var e = d();
                        return g(function(a, b) {
                            return h(a[e], b[e])
                        }
                        , c)
                    }
                }
                return g(function(a, b) {
                    return h(d(a), d(b))
                }
                , c)
            }
            ),
            yd.call(b).sort(g(f, d))) : b
        }
    }
    function bd(a) {
        return x(a) && (a = {
            link: a
        }),
        a.restrict = a.restrict || "AC",
        q(a)
    }
    function cd(a, b, c, d) {
        function e(b, c) {
            c = c ? "-" + _(c, "-") : "",
            d.setClass(a, (b ? Re : Se) + c, (b ? Se : Re) + c)
        }
        var g = this
          , h = a.parent().controller("form") || He
          , i = 0
          , j = g.$error = {}
          , k = [];
        g.$name = b.name || b.ngForm,
        g.$dirty = !1,
        g.$pristine = !0,
        g.$valid = !0,
        g.$invalid = !1,
        h.$addControl(g),
        a.addClass(Te),
        e(!0),
        g.$addControl = function(a) {
            db(a.$name, "input"),
            k.push(a),
            a.$name && (g[a.$name] = a)
        }
        ,
        g.$removeControl = function(a) {
            a.$name && g[a.$name] === a && delete g[a.$name],
            f(j, function(b, c) {
                g.$setValidity(c, !0, a)
            }
            ),
            I(k, a)
        }
        ,
        g.$setValidity = function(a, b, c) {
            var d = j[a];
            if (b)
                d && (I(d, c),
                d.length || (i--,
                i || (e(b),
                g.$valid = !0,
                g.$invalid = !1),
                j[a] = !1,
                e(!0, a),
                h.$setValidity(a, !0, g)));
            else {
                if (i || e(b),
                d) {
                    if (G(d, c))
                        return
                } else
                    j[a] = d = [],
                    i++,
                    e(!1, a),
                    h.$setValidity(a, !1, g);
                d.push(c),
                g.$valid = !1,
                g.$invalid = !0
            }
        }
        ,
        g.$setDirty = function() {
            d.removeClass(a, Te),
            d.addClass(a, Ue),
            g.$dirty = !0,
            g.$pristine = !1,
            h.$setDirty()
        }
        ,
        g.$setPristine = function() {
            d.removeClass(a, Ue),
            d.addClass(a, Te),
            g.$dirty = !1,
            g.$pristine = !0,
            f(k, function(a) {
                a.$setPristine()
            }
            )
        }
    }
    function dd(a, b, d, e) {
        return a.$setValidity(b, d),
        d ? e : c
    }
    function ed(a, b) {
        var c, d;
        if (b)
            for (c = 0; c < b.length; ++c)
                if (d = b[c],
                a[d])
                    return !0;
        return !1
    }
    function fd(a, b, c, d, e) {
        if (t(e)) {
            a.$$hasNativeValidators = !0;
            var f = function(f) {
                return a.$error[b] || ed(e, d) || !ed(e, c) ? f : void a.$setValidity(b, !1)
            }
            ;
            a.$parsers.push(f)
        }
    }
    function gd(a, b, c, e, f, g) {
        var h = b.prop(nd)
          , i = b[0].placeholder
          , j = {}
          , k = od(b[0].type);
        if (e.$$validityState = h,
        !f.android) {
            var l = !1;
            b.on("compositionstart", function() {
                l = !0
            }
            ),
            b.on("compositionend", function() {
                l = !1,
                n()
            }
            )
        }
        var n = function(d) {
            if (!l) {
                var f = b.val();
                if (td && "input" === (d || j).type && b[0].placeholder !== i)
                    return void (i = b[0].placeholder);
                "password" !== k && S(c.ngTrim || "T") && (f = Fd(f));
                var g = h && e.$$hasNativeValidators;
                (e.$viewValue !== f || "" === f && g) && (a.$root.$$phase ? e.$setViewValue(f) : a.$apply(function() {
                    e.$setViewValue(f)
                }
                ))
            }
        }
        ;
        if (f.hasEvent("input"))
            b.on("input", n);
        else {
            var o, p = function() {
                o || (o = g.defer(function() {
                    n(),
                    o = null
                }
                ))
            }
            ;
            b.on("keydown", function(a) {
                var b = a.keyCode;
                91 === b || b > 15 && 19 > b || b >= 37 && 40 >= b || p()
            }
            ),
            f.hasEvent("paste") && b.on("paste cut", p)
        }
        b.on("change", n),
        e.$render = function() {
            b.val(e.$isEmpty(e.$viewValue) ? "" : e.$viewValue)
        }
        ;
        var q, r, s = c.ngPattern;
        if (s) {
            var t = function(a, b) {
                return dd(e, "pattern", e.$isEmpty(b) || a.test(b), b)
            }
            ;
            r = s.match(/^\/(.*)\/([gim]*)$/),
            r ? (s = new RegExp(r[1],r[2]),
            q = function(a) {
                return t(s, a)
            }
            ) : q = function(c) {
                var e = a.$eval(s);
                if (!e || !e.test)
                    throw d("ngPattern")("noregexp", "Expected {0} to be a RegExp but was {1}. Element: {2}", s, e, T(b));
                return t(e, c)
            }
            ,
            e.$formatters.push(q),
            e.$parsers.push(q)
        }
        if (c.ngMinlength) {
            var u = m(c.ngMinlength)
              , v = function(a) {
                return dd(e, "minlength", e.$isEmpty(a) || a.length >= u, a)
            }
            ;
            e.$parsers.push(v),
            e.$formatters.push(v)
        }
        if (c.ngMaxlength) {
            var w = m(c.ngMaxlength)
              , x = function(a) {
                return dd(e, "maxlength", e.$isEmpty(a) || a.length <= w, a)
            }
            ;
            e.$parsers.push(x),
            e.$formatters.push(x)
        }
    }
    function hd(a, b, d, e, f, g) {
        if (gd(a, b, d, e, f, g),
        e.$parsers.push(function(a) {
            var b = e.$isEmpty(a);
            return b || Ne.test(a) ? (e.$setValidity("number", !0),
            "" === a ? null  : b ? a : parseFloat(a)) : (e.$setValidity("number", !1),
            c)
        }
        ),
        fd(e, "number", Pe, null , e.$$validityState),
        e.$formatters.push(function(a) {
            return e.$isEmpty(a) ? "" : "" + a
        }
        ),
        d.min) {
            var h = function(a) {
                var b = parseFloat(d.min);
                return dd(e, "min", e.$isEmpty(a) || a >= b, a)
            }
            ;
            e.$parsers.push(h),
            e.$formatters.push(h)
        }
        if (d.max) {
            var i = function(a) {
                var b = parseFloat(d.max);
                return dd(e, "max", e.$isEmpty(a) || b >= a, a)
            }
            ;
            e.$parsers.push(i),
            e.$formatters.push(i)
        }
        e.$formatters.push(function(a) {
            return dd(e, "number", e.$isEmpty(a) || v(a), a)
        }
        )
    }
    function id(a, b, c, d, e, f) {
        gd(a, b, c, d, e, f);
        var g = function(a) {
            return dd(d, "url", d.$isEmpty(a) || Le.test(a), a)
        }
        ;
        d.$formatters.push(g),
        d.$parsers.push(g)
    }
    function jd(a, b, c, d, e, f) {
        gd(a, b, c, d, e, f);
        var g = function(a) {
            return dd(d, "email", d.$isEmpty(a) || Me.test(a), a)
        }
        ;
        d.$formatters.push(g),
        d.$parsers.push(g)
    }
    function kd(a, b, c, d) {
        r(c.name) && b.attr("name", j()),
        b.on("click", function() {
            b[0].checked && a.$apply(function() {
                d.$setViewValue(c.value)
            }
            )
        }
        ),
        d.$render = function() {
            var a = c.value;
            b[0].checked = a == d.$viewValue
        }
        ,
        c.$observe("value", d.$render)
    }
    function ld(a, b, c, d) {
        var e = c.ngTrueValue
          , f = c.ngFalseValue;
        u(e) || (e = !0),
        u(f) || (f = !1),
        b.on("click", function() {
            a.$apply(function() {
                d.$setViewValue(b[0].checked)
            }
            )
        }
        ),
        d.$render = function() {
            b[0].checked = d.$viewValue
        }
        ,
        d.$isEmpty = function(a) {
            return a !== e
        }
        ,
        d.$formatters.push(function(a) {
            return a === e
        }
        ),
        d.$parsers.push(function(a) {
            return a ? e : f
        }
        )
    }
    function md(a, b) {
        return a = "ngClass" + a,
        ["$animate", function(c) {
            function d(a, b) {
                var c = [];
                a: for (var d = 0; d < a.length; d++) {
                    for (var e = a[d], f = 0; f < b.length; f++)
                        if (e == b[f])
                            continue a;
                    c.push(e)
                }
                return c
            }
            function e(a) {
                if (Ed(a))
                    return a;
                if (u(a))
                    return a.split(" ");
                if (t(a)) {
                    var b = [];
                    return f(a, function(a, c) {
                        a && (b = b.concat(c.split(" ")))
                    }
                    ),
                    b
                }
                return a
            }
            return {
                restrict: "AC",
                link: function(g, h, i) {
                    function j(a) {
                        var b = l(a, 1);
                        i.$addClass(b)
                    }
                    function k(a) {
                        var b = l(a, -1);
                        i.$removeClass(b)
                    }
                    function l(a, b) {
                        var c = h.data("$classCounts") || {}
                          , d = [];
                        return f(a, function(a) {
                            (b > 0 || c[a]) && (c[a] = (c[a] || 0) + b,
                            c[a] === +(b > 0) && d.push(a))
                        }
                        ),
                        h.data("$classCounts", c),
                        d.join(" ")
                    }
                    function m(a, b) {
                        var e = d(b, a)
                          , f = d(a, b);
                        f = l(f, -1),
                        e = l(e, 1),
                        0 === e.length ? c.removeClass(h, f) : 0 === f.length ? c.addClass(h, e) : c.setClass(h, e, f)
                    }
                    function n(a) {
                        if (b === !0 || g.$index % 2 === b) {
                            var c = e(a || []);
                            if (o) {
                                if (!L(a, o)) {
                                    var d = e(o);
                                    m(d, c)
                                }
                            } else
                                j(c)
                        }
                        o = K(a)
                    }
                    var o;
                    g.$watch(i[a], n, !0),
                    i.$observe("class", function() {
                        n(g.$eval(i[a]))
                    }
                    ),
                    "ngClass" !== a && g.$watch("$index", function(c, d) {
                        var f = 1 & c;
                        if (f !== (1 & d)) {
                            var h = e(g.$eval(i[a]));
                            f === b ? j(h) : k(h)
                        }
                    }
                    )
                }
            }
        }
        ]
    }
    var nd = "validity"
      , od = function(a) {
        return u(a) ? a.toLowerCase() : a
    }
      , pd = Object.prototype.hasOwnProperty
      , qd = function(a) {
        return u(a) ? a.toUpperCase() : a
    }
      , rd = function(a) {
        return u(a) ? a.replace(/[A-Z]/g, function(a) {
            return String.fromCharCode(32 | a.charCodeAt(0))
        }
        ) : a
    }
      , sd = function(a) {
        return u(a) ? a.replace(/[a-z]/g, function(a) {
            return String.fromCharCode(-33 & a.charCodeAt(0))
        }
        ) : a
    }
    ;
    "i" !== "I".toLowerCase() && (od = rd,
    qd = sd);
    var td, ud, vd, wd, xd, yd = [].slice, zd = [].push, Ad = Object.prototype.toString, Bd = d("ng"), Cd = a.angular || (a.angular = {}), Dd = ["0", "0", "0"];
    td = m((/msie (\d+)/.exec(od(navigator.userAgent)) || [])[1]),
    isNaN(td) && (td = m((/trident\/.*; rv:(\d+)/.exec(od(navigator.userAgent)) || [])[1])),
    o.$inject = [],
    p.$inject = [];
    var Ed = function() {
        return x(Array.isArray) ? Array.isArray : function(a) {
            return "[object Array]" === Ad.call(a)
        }
    }
    ()
      , Fd = function() {
        return String.prototype.trim ? function(a) {
            return u(a) ? a.trim() : a
        }
         : function(a) {
            return u(a) ? a.replace(/^\s\s*/, "").replace(/\s\s*$/, "") : a
        }
    }
    ();
    xd = 9 > td ? function(a) {
        return a = a.nodeName ? a : a[0],
        a.scopeName && "HTML" != a.scopeName ? qd(a.scopeName + ":" + a.nodeName) : a.nodeName
    }
     : function(a) {
        return a.nodeName ? a.nodeName : a[0].nodeName
    }
    ;
    var Gd = function() {
        if (s(Gd.isActive_))
            return Gd.isActive_;
        var a = !(!b.querySelector("[ng-csp]") && !b.querySelector("[data-ng-csp]"));
        if (!a)
            try {
                new Function("")
            } catch (c) {
                a = !0
            }
        return Gd.isActive_ = a
    }
      , Hd = /[A-Z]/g
      , Id = {
        full: "1.2.28",
        major: 1,
        minor: 2,
        dot: 28,
        codeName: "finnish-disembarkation"
    };
    ob.expando = "ng339";
    var Jd = ob.cache = {}
      , Kd = 1
      , Ld = a.document.addEventListener ? function(a, b, c) {
        a.addEventListener(b, c, !1)
    }
     : function(a, b, c) {
        a.attachEvent("on" + b, c)
    }
      , Md = a.document.removeEventListener ? function(a, b, c) {
        a.removeEventListener(b, c, !1)
    }
     : function(a, b, c) {
        a.detachEvent("on" + b, c)
    }
      , Nd = (ob._data = function(a) {
        return this.cache[a[this.expando]] || {}
    }
    ,
    /([\:\-\_]+(.))/g)
      , Od = /^moz([A-Z])/
      , Pd = d("jqLite")
      , Qd = /^<(\w+)\s*\/?>(?:<\/\1>|)$/
      , Rd = /<|&#?\w+;/
      , Sd = /<([\w:]+)/
      , Td = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi
      , Ud = {
        option: [1, '<select multiple="multiple">', "</select>"],
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
    };
    Ud.optgroup = Ud.option,
    Ud.tbody = Ud.tfoot = Ud.colgroup = Ud.caption = Ud.thead,
    Ud.th = Ud.td;
    var Vd = ob.prototype = {
        ready: function(c) {
            function d() {
                e || (e = !0,
                c())
            }
            var e = !1;
            "complete" === b.readyState ? setTimeout(d) : (this.on("DOMContentLoaded", d),
            ob(a).on("load", d))
        },
        toString: function() {
            var a = [];
            return f(this, function(b) {
                a.push("" + b)
            }
            ),
            "[" + a.join(", ") + "]"
        },
        eq: function(a) {
            return ud(a >= 0 ? this[a] : this[this.length + a])
        },
        length: 0,
        push: zd,
        sort: [].sort,
        splice: [].splice
    }
      , Wd = {};
    f("multiple,selected,checked,disabled,readOnly,required,open".split(","), function(a) {
        Wd[od(a)] = a
    }
    );
    var Xd = {};
    f("input,select,option,textarea,button,form,details".split(","), function(a) {
        Xd[qd(a)] = !0
    }
    ),
    f({
        data: ub,
        removeData: sb
    }, function(a, b) {
        ob[b] = a
    }
    ),
    f({
        data: ub,
        inheritedData: Ab,
        scope: function(a) {
            return ud.data(a, "$scope") || Ab(a.parentNode || a, ["$isolateScope", "$scope"])
        },
        isolateScope: function(a) {
            return ud.data(a, "$isolateScope") || ud.data(a, "$isolateScopeNoTemplate")
        },
        controller: zb,
        injector: function(a) {
            return Ab(a, "$injector")
        },
        removeAttr: function(a, b) {
            a.removeAttribute(b)
        },
        hasClass: vb,
        css: function(a, b, d) {
            if (b = jb(b),
            !s(d)) {
                var e;
                return 8 >= td && (e = a.currentStyle && a.currentStyle[b],
                "" === e && (e = "auto")),
                e = e || a.style[b],
                8 >= td && (e = "" === e ? c : e),
                e
            }
            a.style[b] = d
        },
        attr: function(a, b, d) {
            var e = od(b);
            if (Wd[e]) {
                if (!s(d))
                    return a[b] || (a.attributes.getNamedItem(b) || o).specified ? e : c;
                d ? (a[b] = !0,
                a.setAttribute(b, e)) : (a[b] = !1,
                a.removeAttribute(e))
            } else if (s(d))
                a.setAttribute(b, d);
            else if (a.getAttribute) {
                var f = a.getAttribute(b, 2);
                return null  === f ? c : f
            }
        },
        prop: function(a, b, c) {
            return s(c) ? void (a[b] = c) : a[b]
        },
        text: function() {
            function a(a, c) {
                var d = b[a.nodeType];
                return r(c) ? d ? a[d] : "" : void (a[d] = c)
            }
            var b = [];
            return 9 > td ? (b[1] = "innerText",
            b[3] = "nodeValue") : b[1] = b[3] = "textContent",
            a.$dv = "",
            a
        }
        (),
        val: function(a, b) {
            if (r(b)) {
                if ("SELECT" === xd(a) && a.multiple) {
                    var c = [];
                    return f(a.options, function(a) {
                        a.selected && c.push(a.value || a.text)
                    }
                    ),
                    0 === c.length ? null  : c
                }
                return a.value
            }
            a.value = b
        },
        html: function(a, b) {
            if (r(b))
                return a.innerHTML;
            for (var c = 0, d = a.childNodes; c < d.length; c++)
                qb(d[c]);
            a.innerHTML = b
        },
        empty: Bb
    }, function(a, b) {
        ob.prototype[b] = function(b, d) {
            var e, f, g = this.length;
            if (a !== Bb && (2 == a.length && a !== vb && a !== zb ? b : d) === c) {
                if (t(b)) {
                    for (e = 0; g > e; e++)
                        if (a === ub)
                            a(this[e], b);
                        else
                            for (f in b)
                                a(this[e], f, b[f]);
                    return this
                }
                for (var h = a.$dv, i = h === c ? Math.min(g, 1) : g, j = 0; i > j; j++) {
                    var k = a(this[j], b, d);
                    h = h ? h + k : k
                }
                return h
            }
            for (e = 0; g > e; e++)
                a(this[e], b, d);
            return this
        }
    }
    ),
    f({
        removeData: sb,
        dealoc: qb,
        on: function Ff(a, c, d, e) {
            if (s(e))
                throw Pd("onargs", "jqLite#on() does not support the `selector` or `eventData` parameters");
            var g = tb(a, "events")
              , h = tb(a, "handle");
            g || tb(a, "events", g = {}),
            h || tb(a, "handle", h = Db(a, g)),
            f(c.split(" "), function(c) {
                var e = g[c];
                if (!e) {
                    if ("mouseenter" == c || "mouseleave" == c) {
                        var f = b.body.contains || b.body.compareDocumentPosition ? function(a, b) {
                            var c = 9 === a.nodeType ? a.documentElement : a
                              , d = b && b.parentNode;
                            return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
                        }
                         : function(a, b) {
                            if (b)
                                for (; b = b.parentNode; )
                                    if (b === a)
                                        return !0;
                            return !1
                        }
                        ;
                        g[c] = [];
                        var i = {
                            mouseleave: "mouseout",
                            mouseenter: "mouseover"
                        };
                        Ff(a, i[c], function(a) {
                            var b = this
                              , d = a.relatedTarget;
                            (!d || d !== b && !f(b, d)) && h(a, c)
                        }
                        )
                    } else
                        Ld(a, c, h),
                        g[c] = [];
                    e = g[c]
                }
                e.push(d)
            }
            )
        },
        off: rb,
        one: function(a, b, c) {
            a = ud(a),
            a.on(b, function d() {
                a.off(b, c),
                a.off(b, d)
            }
            ),
            a.on(b, c)
        },
        replaceWith: function(a, b) {
            var c, d = a.parentNode;
            qb(a),
            f(new ob(b), function(b) {
                c ? d.insertBefore(b, c.nextSibling) : d.replaceChild(b, a),
                c = b
            }
            )
        },
        children: function(a) {
            var b = [];
            return f(a.childNodes, function(a) {
                1 === a.nodeType && b.push(a)
            }
            ),
            b
        },
        contents: function(a) {
            return a.contentDocument || a.childNodes || []
        },
        append: function(a, b) {
            f(new ob(b), function(b) {
                (1 === a.nodeType || 11 === a.nodeType) && a.appendChild(b)
            }
            )
        },
        prepend: function(a, b) {
            if (1 === a.nodeType) {
                var c = a.firstChild;
                f(new ob(b), function(b) {
                    a.insertBefore(b, c)
                }
                )
            }
        },
        wrap: function(a, b) {
            b = ud(b)[0];
            var c = a.parentNode;
            c && c.replaceChild(b, a),
            b.appendChild(a)
        },
        remove: function(a) {
            qb(a);
            var b = a.parentNode;
            b && b.removeChild(a)
        },
        after: function(a, b) {
            var c = a
              , d = a.parentNode;
            f(new ob(b), function(a) {
                d.insertBefore(a, c.nextSibling),
                c = a
            }
            )
        },
        addClass: xb,
        removeClass: wb,
        toggleClass: function(a, b, c) {
            b && f(b.split(" "), function(b) {
                var d = c;
                r(d) && (d = !vb(a, b)),
                (d ? xb : wb)(a, b)
            }
            )
        },
        parent: function(a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        },
        next: function(a) {
            if (a.nextElementSibling)
                return a.nextElementSibling;
            for (var b = a.nextSibling; null  != b && 1 !== b.nodeType; )
                b = b.nextSibling;
            return b
        },
        find: function(a, b) {
            return a.getElementsByTagName ? a.getElementsByTagName(b) : []
        },
        clone: pb,
        triggerHandler: function(a, b, c) {
            var d, e, g, h = b.type || b, i = (tb(a, "events") || {})[h];
            i && (d = {
                preventDefault: function() {
                    this.defaultPrevented = !0
                },
                isDefaultPrevented: function() {
                    return this.defaultPrevented === !0
                },
                stopPropagation: o,
                type: h,
                target: a
            },
            b.type && (d = l(d, b)),
            e = K(i),
            g = c ? [d].concat(c) : [d],
            f(e, function(b) {
                b.apply(a, g)
            }
            ))
        }
    }, function(a, b) {
        ob.prototype[b] = function(b, c, d) {
            for (var e, f = 0; f < this.length; f++)
                r(e) ? (e = a(this[f], b, c, d),
                s(e) && (e = ud(e))) : yb(e, a(this[f], b, c, d));
            return s(e) ? e : this
        }
        ,
        ob.prototype.bind = ob.prototype.on,
        ob.prototype.unbind = ob.prototype.off
    }
    ),
    Fb.prototype = {
        put: function(a, b) {
            this[Eb(a, this.nextUid)] = b
        },
        get: function(a) {
            return this[Eb(a, this.nextUid)]
        },
        remove: function(a) {
            var b = this[a = Eb(a, this.nextUid)];
            return delete this[a],
            b
        }
    };
    var Yd = /^function\s*[^\(]*\(\s*([^\)]*)\)/m
      , Zd = /,/
      , $d = /^\s*(_?)(\S+?)\1\s*$/
      , _d = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm
      , ae = d("$injector")
      , be = d("$animate")
      , ce = ["$provide", function(a) {
        this.$$selectors = {},
        this.register = function(b, c) {
            var d = b + "-animation";
            if (b && "." != b.charAt(0))
                throw be("notcsel", "Expecting class selector starting with '.' got '{0}'.", b);
            this.$$selectors[b.substr(1)] = d,
            a.factory(d, c)
        }
        ,
        this.classNameFilter = function(a) {
            return 1 === arguments.length && (this.$$classNameFilter = a instanceof RegExp ? a : null ),
            this.$$classNameFilter
        }
        ,
        this.$get = ["$timeout", "$$asyncCallback", function(a, b) {
            function c(a) {
                a && b(a)
            }
            return {
                enter: function(a, b, d, e) {
                    d ? d.after(a) : (b && b[0] || (b = d.parent()),
                    b.append(a)),
                    c(e)
                },
                leave: function(a, b) {
                    a.remove(),
                    c(b)
                },
                move: function(a, b, c, d) {
                    this.enter(a, b, c, d)
                },
                addClass: function(a, b, d) {
                    b = u(b) ? b : Ed(b) ? b.join(" ") : "",
                    f(a, function(a) {
                        xb(a, b)
                    }
                    ),
                    c(d)
                },
                removeClass: function(a, b, d) {
                    b = u(b) ? b : Ed(b) ? b.join(" ") : "",
                    f(a, function(a) {
                        wb(a, b)
                    }
                    ),
                    c(d)
                },
                setClass: function(a, b, d, e) {
                    f(a, function(a) {
                        xb(a, b),
                        wb(a, d)
                    }
                    ),
                    c(e)
                },
                enabled: o
            }
        }
        ]
    }
    ]
      , de = d("$compile");
    Ob.$inject = ["$provide", "$$sanitizeUriProvider"];
    var ee = /^(x[\:\-_]|data[\:\-_])/i
      , fe = d("$interpolate")
      , ge = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/
      , he = {
        http: 80,
        https: 443,
        ftp: 21
    }
      , ie = d("$location");
    mc.prototype = lc.prototype = kc.prototype = {
        $$html5: !1,
        $$replace: !1,
        absUrl: nc("$$absUrl"),
        url: function(a) {
            if (r(a))
                return this.$$url;
            var b = ge.exec(a);
            return b[1] && this.path(decodeURIComponent(b[1])),
            (b[2] || b[1]) && this.search(b[3] || ""),
            this.hash(b[5] || ""),
            this
        },
        protocol: nc("$$protocol"),
        host: nc("$$host"),
        port: nc("$$port"),
        path: oc("$$path", function(a) {
            return a = null  !== a ? a.toString() : "",
            "/" == a.charAt(0) ? a : "/" + a
        }
        ),
        search: function(a, b) {
            switch (arguments.length) {
            case 0:
                return this.$$search;
            case 1:
                if (u(a) || v(a))
                    a = a.toString(),
                    this.$$search = V(a);
                else {
                    if (!t(a))
                        throw ie("isrcharg", "The first argument of the `$location#search()` call must be a string or an object.");
                    f(a, function(b, c) {
                        null  == b && delete a[c]
                    }
                    ),
                    this.$$search = a
                }
                break;
            default:
                r(b) || null  === b ? delete this.$$search[a] : this.$$search[a] = b
            }
            return this.$$compose(),
            this
        },
        hash: oc("$$hash", function(a) {
            return null  !== a ? a.toString() : ""
        }
        ),
        replace: function() {
            return this.$$replace = !0,
            this
        }
    };
    var je, ke = d("$parse"), le = {}, me = Function.prototype.call, ne = Function.prototype.apply, oe = Function.prototype.bind, pe = {
        "null": function() {
            return null
        },
        "true": function() {
            return !0
        },
        "false": function() {
            return !1
        },
        undefined: o,
        "+": function(a, b, d, e) {
            return d = d(a, b),
            e = e(a, b),
            s(d) ? s(e) ? d + e : d : s(e) ? e : c
        },
        "-": function(a, b, c, d) {
            return c = c(a, b),
            d = d(a, b),
            (s(c) ? c : 0) - (s(d) ? d : 0)
        },
        "*": function(a, b, c, d) {
            return c(a, b) * d(a, b)
        },
        "/": function(a, b, c, d) {
            return c(a, b) / d(a, b)
        },
        "%": function(a, b, c, d) {
            return c(a, b) % d(a, b)
        },
        "^": function(a, b, c, d) {
            return c(a, b) ^ d(a, b)
        },
        "=": o,
        "===": function(a, b, c, d) {
            return c(a, b) === d(a, b)
        },
        "!==": function(a, b, c, d) {
            return c(a, b) !== d(a, b)
        },
        "==": function(a, b, c, d) {
            return c(a, b) == d(a, b)
        },
        "!=": function(a, b, c, d) {
            return c(a, b) != d(a, b)
        },
        "<": function(a, b, c, d) {
            return c(a, b) < d(a, b)
        },
        ">": function(a, b, c, d) {
            return c(a, b) > d(a, b)
        },
        "<=": function(a, b, c, d) {
            return c(a, b) <= d(a, b)
        },
        ">=": function(a, b, c, d) {
            return c(a, b) >= d(a, b)
        },
        "&&": function(a, b, c, d) {
            return c(a, b) && d(a, b)
        },
        "||": function(a, b, c, d) {
            return c(a, b) || d(a, b)
        },
        "&": function(a, b, c, d) {
            return c(a, b) & d(a, b)
        },
        "|": function(a, b, c, d) {
            return d(a, b)(a, b, c(a, b))
        },
        "!": function(a, b, c) {
            return !c(a, b)
        }
    }, qe = {
        n: "\n",
        f: "\f",
        r: "\r",
        t: "	",
        v: "",
        "'": "'",
        '"': '"'
    }, re = function(a) {
        this.options = a
    }
    ;
    re.prototype = {
        constructor: re,
        lex: function(a) {
            for (this.text = a,
            this.index = 0,
            this.ch = c,
            this.lastCh = ":",
            this.tokens = []; this.index < this.text.length; ) {
                if (this.ch = this.text.charAt(this.index),
                this.is("\"'"))
                    this.readString(this.ch);
                else if (this.isNumber(this.ch) || this.is(".") && this.isNumber(this.peek()))
                    this.readNumber();
                else if (this.isIdent(this.ch))
                    this.readIdent();
                else if (this.is("(){}[].,;:?"))
                    this.tokens.push({
                        index: this.index,
                        text: this.ch
                    }),
                    this.index++;
                else {
                    if (this.isWhitespace(this.ch)) {
                        this.index++;
                        continue
                    }
                    var b = this.ch + this.peek()
                      , d = b + this.peek(2)
                      , e = pe[this.ch]
                      , f = pe[b]
                      , g = pe[d];
                    g ? (this.tokens.push({
                        index: this.index,
                        text: d,
                        fn: g
                    }),
                    this.index += 3) : f ? (this.tokens.push({
                        index: this.index,
                        text: b,
                        fn: f
                    }),
                    this.index += 2) : e ? (this.tokens.push({
                        index: this.index,
                        text: this.ch,
                        fn: e
                    }),
                    this.index += 1) : this.throwError("Unexpected next character ", this.index, this.index + 1)
                }
                this.lastCh = this.ch
            }
            return this.tokens
        },
        is: function(a) {
            return -1 !== a.indexOf(this.ch)
        },
        was: function(a) {
            return -1 !== a.indexOf(this.lastCh)
        },
        peek: function(a) {
            var b = a || 1;
            return this.index + b < this.text.length ? this.text.charAt(this.index + b) : !1
        },
        isNumber: function(a) {
            return a >= "0" && "9" >= a
        },
        isWhitespace: function(a) {
            return " " === a || "\r" === a || "	" === a || "\n" === a || "" === a || " " === a
        },
        isIdent: function(a) {
            return a >= "a" && "z" >= a || a >= "A" && "Z" >= a || "_" === a || "$" === a
        },
        isExpOperator: function(a) {
            return "-" === a || "+" === a || this.isNumber(a)
        },
        throwError: function(a, b, c) {
            c = c || this.index;
            var d = s(b) ? "s " + b + "-" + this.index + " [" + this.text.substring(b, c) + "]" : " " + c;
            throw ke("lexerr", "Lexer Error: {0} at column{1} in expression [{2}].", a, d, this.text)
        },
        readNumber: function() {
            for (var a = "", b = this.index; this.index < this.text.length; ) {
                var c = od(this.text.charAt(this.index));
                if ("." == c || this.isNumber(c))
                    a += c;
                else {
                    var d = this.peek();
                    if ("e" == c && this.isExpOperator(d))
                        a += c;
                    else if (this.isExpOperator(c) && d && this.isNumber(d) && "e" == a.charAt(a.length - 1))
                        a += c;
                    else {
                        if (!this.isExpOperator(c) || d && this.isNumber(d) || "e" != a.charAt(a.length - 1))
                            break;
                        this.throwError("Invalid exponent")
                    }
                }
                this.index++
            }
            a = 1 * a,
            this.tokens.push({
                index: b,
                text: a,
                literal: !0,
                constant: !0,
                fn: function() {
                    return a
                }
            })
        },
        readIdent: function() {
            for (var a, b, c, d, e = this, f = "", g = this.index; this.index < this.text.length && (d = this.text.charAt(this.index),
            "." === d || this.isIdent(d) || this.isNumber(d)); )
                "." === d && (a = this.index),
                f += d,
                this.index++;
            if (a)
                for (b = this.index; b < this.text.length; ) {
                    if (d = this.text.charAt(b),
                    "(" === d) {
                        c = f.substr(a - g + 1),
                        f = f.substr(0, a - g),
                        this.index = b;
                        break
                    }
                    if (!this.isWhitespace(d))
                        break;
                    b++
                }
            var h = {
                index: g,
                text: f
            };
            if (pe.hasOwnProperty(f))
                h.fn = pe[f],
                h.literal = !0,
                h.constant = !0;
            else {
                var i = yc(f, this.options, this.text);
                h.fn = l(function(a, b) {
                    return i(a, b)
                }
                , {
                    assign: function(a, b) {
                        return uc(a, f, b, e.text, e.options)
                    }
                })
            }
            this.tokens.push(h),
            c && (this.tokens.push({
                index: a,
                text: "."
            }),
            this.tokens.push({
                index: a + 1,
                text: c
            }))
        },
        readString: function(a) {
            var b = this.index;
            this.index++;
            for (var c = "", d = a, e = !1; this.index < this.text.length; ) {
                var f = this.text.charAt(this.index);
                if (d += f,
                e) {
                    if ("u" === f) {
                        var g = this.text.substring(this.index + 1, this.index + 5);
                        g.match(/[\da-f]{4}/i) || this.throwError("Invalid unicode escape [\\u" + g + "]"),
                        this.index += 4,
                        c += String.fromCharCode(parseInt(g, 16))
                    } else {
                        var h = qe[f];
                        c += h || f
                    }
                    e = !1
                } else if ("\\" === f)
                    e = !0;
                else {
                    if (f === a)
                        return this.index++,
                        void this.tokens.push({
                            index: b,
                            text: d,
                            string: c,
                            literal: !0,
                            constant: !0,
                            fn: function() {
                                return c
                            }
                        });
                    c += f
                }
                this.index++
            }
            this.throwError("Unterminated quote", b)
        }
    };
    var se = function(a, b, c) {
        this.lexer = a,
        this.$filter = b,
        this.options = c
    }
    ;
    se.ZERO = l(function() {
        return 0
    }
    , {
        constant: !0
    }),
    se.prototype = {
        constructor: se,
        parse: function(a) {
            this.text = a,
            this.tokens = this.lexer.lex(a);
            var b = this.statements();
            return 0 !== this.tokens.length && this.throwError("is an unexpected token", this.tokens[0]),
            b.literal = !!b.literal,
            b.constant = !!b.constant,
            b
        },
        primary: function() {
            var a;
            if (this.expect("("))
                a = this.filterChain(),
                this.consume(")");
            else if (this.expect("["))
                a = this.arrayDeclaration();
            else if (this.expect("{"))
                a = this.object();
            else {
                var b = this.expect();
                a = b.fn,
                a || this.throwError("not a primary expression", b),
                a.literal = !!b.literal,
                a.constant = !!b.constant
            }
            for (var c, d; c = this.expect("(", "[", "."); )
                "(" === c.text ? (a = this.functionCall(a, d),
                d = null ) : "[" === c.text ? (d = a,
                a = this.objectIndex(a)) : "." === c.text ? (d = a,
                a = this.fieldAccess(a)) : this.throwError("IMPOSSIBLE");
            return a
        },
        throwError: function(a, b) {
            throw ke("syntax", "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].", b.text, a, b.index + 1, this.text, this.text.substring(b.index))
        },
        peekToken: function() {
            if (0 === this.tokens.length)
                throw ke("ueoe", "Unexpected end of expression: {0}", this.text);
            return this.tokens[0]
        },
        peek: function(a, b, c, d) {
            if (this.tokens.length > 0) {
                var e = this.tokens[0]
                  , f = e.text;
                if (f === a || f === b || f === c || f === d || !a && !b && !c && !d)
                    return e
            }
            return !1
        },
        expect: function(a, b, c, d) {
            var e = this.peek(a, b, c, d);
            return e ? (this.tokens.shift(),
            e) : !1
        },
        consume: function(a) {
            this.expect(a) || this.throwError("is unexpected, expecting [" + a + "]", this.peek())
        },
        unaryFn: function(a, b) {
            return l(function(c, d) {
                return a(c, d, b)
            }
            , {
                constant: b.constant
            })
        },
        ternaryFn: function(a, b, c) {
            return l(function(d, e) {
                return a(d, e) ? b(d, e) : c(d, e)
            }
            , {
                constant: a.constant && b.constant && c.constant
            })
        },
        binaryFn: function(a, b, c) {
            return l(function(d, e) {
                return b(d, e, a, c)
            }
            , {
                constant: a.constant && c.constant
            })
        },
        statements: function() {
            for (var a = []; ; )
                if (this.tokens.length > 0 && !this.peek("}", ")", ";", "]") && a.push(this.filterChain()),
                !this.expect(";"))
                    return 1 === a.length ? a[0] : function(b, c) {
                        for (var d, e = 0; e < a.length; e++) {
                            var f = a[e];
                            f && (d = f(b, c))
                        }
                        return d
                    }
        },
        filterChain: function() {
            for (var a, b = this.expression(); ; ) {
                if (!(a = this.expect("|")))
                    return b;
                b = this.binaryFn(b, a.fn, this.filter())
            }
        },
        filter: function() {
            for (var a = this.expect(), b = this.$filter(a.text), c = []; ; ) {
                if (!(a = this.expect(":"))) {
                    var d = function(a, d, e) {
                        for (var f = [e], g = 0; g < c.length; g++)
                            f.push(c[g](a, d));
                        return b.apply(a, f)
                    }
                    ;
                    return function() {
                        return d
                    }
                }
                c.push(this.expression())
            }
        },
        expression: function() {
            return this.assignment()
        },
        assignment: function() {
            var a, b, c = this.ternary();
            return (b = this.expect("=")) ? (c.assign || this.throwError("implies assignment but [" + this.text.substring(0, b.index) + "] can not be assigned to", b),
            a = this.ternary(),
            function(b, d) {
                return c.assign(b, a(b, d), d)
            }
            ) : c
        },
        ternary: function() {
            var a, b, c = this.logicalOR();
            return (b = this.expect("?")) ? (a = this.assignment(),
            (b = this.expect(":")) ? this.ternaryFn(c, a, this.assignment()) : void this.throwError("expected :", b)) : c
        },
        logicalOR: function() {
            for (var a, b = this.logicalAND(); ; ) {
                if (!(a = this.expect("||")))
                    return b;
                b = this.binaryFn(b, a.fn, this.logicalAND())
            }
        },
        logicalAND: function() {
            var a, b = this.equality();
            return (a = this.expect("&&")) && (b = this.binaryFn(b, a.fn, this.logicalAND())),
            b
        },
        equality: function() {
            var a, b = this.relational();
            return (a = this.expect("==", "!=", "===", "!==")) && (b = this.binaryFn(b, a.fn, this.equality())),
            b
        },
        relational: function() {
            var a, b = this.additive();
            return (a = this.expect("<", ">", "<=", ">=")) && (b = this.binaryFn(b, a.fn, this.relational())),
            b
        },
        additive: function() {
            for (var a, b = this.multiplicative(); a = this.expect("+", "-"); )
                b = this.binaryFn(b, a.fn, this.multiplicative());
            return b
        },
        multiplicative: function() {
            for (var a, b = this.unary(); a = this.expect("*", "/", "%"); )
                b = this.binaryFn(b, a.fn, this.unary());
            return b
        },
        unary: function() {
            var a;
            return this.expect("+") ? this.primary() : (a = this.expect("-")) ? this.binaryFn(se.ZERO, a.fn, this.unary()) : (a = this.expect("!")) ? this.unaryFn(a.fn, this.unary()) : this.primary()
        },
        fieldAccess: function(a) {
            var b = this
              , c = this.expect().text
              , d = yc(c, this.options, this.text);
            return l(function(b, c, e) {
                return d(e || a(b, c))
            }
            , {
                assign: function(d, e, f) {
                    var g = a(d, f);
                    return g || a.assign(d, g = {}),
                    uc(g, c, e, b.text, b.options)
                }
            })
        },
        objectIndex: function(a) {
            var b = this
              , d = this.expression();
            return this.consume("]"),
            l(function(e, f) {
                var g, h, i = a(e, f), j = d(e, f);
                return rc(j, b.text),
                i ? (g = sc(i[j], b.text),
                g && g.then && b.options.unwrapPromises && (h = g,
                "$$v" in g || (h.$$v = c,
                h.then(function(a) {
                    h.$$v = a
                }
                )),
                g = g.$$v),
                g) : c
            }
            , {
                assign: function(c, e, f) {
                    var g = rc(d(c, f), b.text)
                      , h = sc(a(c, f), b.text);
                    return h || a.assign(c, h = {}),
                    h[g] = e
                }
            })
        },
        functionCall: function(a, b) {
            var c = [];
            if (")" !== this.peekToken().text)
                do
                    c.push(this.expression());
                while (this.expect(","));this.consume(")");
            var d = this;
            return function(e, f) {
                for (var g = [], h = b ? b(e, f) : e, i = 0; i < c.length; i++)
                    g.push(sc(c[i](e, f), d.text));
                var j = a(e, f, h) || o;
                sc(h, d.text),
                tc(j, d.text);
                var k = j.apply ? j.apply(h, g) : j(g[0], g[1], g[2], g[3], g[4]);
                return sc(k, d.text)
            }
        },
        arrayDeclaration: function() {
            var a = []
              , b = !0;
            if ("]" !== this.peekToken().text)
                do {
                    if (this.peek("]"))
                        break;
                    var c = this.expression();
                    a.push(c),
                    c.constant || (b = !1)
                } while (this.expect(","));return this.consume("]"),
            l(function(b, c) {
                for (var d = [], e = 0; e < a.length; e++)
                    d.push(a[e](b, c));
                return d
            }
            , {
                literal: !0,
                constant: b
            })
        },
        object: function() {
            var a = []
              , b = !0;
            if ("}" !== this.peekToken().text)
                do {
                    if (this.peek("}"))
                        break;
                    var c = this.expect()
                      , d = c.string || c.text;
                    this.consume(":");
                    var e = this.expression();
                    a.push({
                        key: d,
                        value: e
                    }),
                    e.constant || (b = !1)
                } while (this.expect(","));return this.consume("}"),
            l(function(b, c) {
                for (var d = {}, e = 0; e < a.length; e++) {
                    var f = a[e];
                    d[f.key] = f.value(b, c)
                }
                return d
            }
            , {
                literal: !0,
                constant: b
            })
        }
    };
    var te = {}
      , ue = {}
      , ve = d("$sce")
      , we = {
        HTML: "html",
        CSS: "css",
        URL: "url",
        RESOURCE_URL: "resourceUrl",
        JS: "js"
    }
      , xe = b.createElement("a")
      , ye = Mc(a.location.href, !0);
    Pc.$inject = ["$provide"],
    Rc.$inject = ["$locale"],
    Sc.$inject = ["$locale"];
    var ze = "."
      , Ae = {
        yyyy: Vc("FullYear", 4),
        yy: Vc("FullYear", 2, 0, !0),
        y: Vc("FullYear", 1),
        MMMM: Wc("Month"),
        MMM: Wc("Month", !0),
        MM: Vc("Month", 2, 1),
        M: Vc("Month", 1, 1),
        dd: Vc("Date", 2),
        d: Vc("Date", 1),
        HH: Vc("Hours", 2),
        H: Vc("Hours", 1),
        hh: Vc("Hours", 2, -12),
        h: Vc("Hours", 1, -12),
        mm: Vc("Minutes", 2),
        m: Vc("Minutes", 1),
        ss: Vc("Seconds", 2),
        s: Vc("Seconds", 1),
        sss: Vc("Milliseconds", 3),
        EEEE: Wc("Day"),
        EEE: Wc("Day", !0),
        a: Yc,
        Z: Xc
    }
      , Be = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/
      , Ce = /^\-?\d+$/;
    Zc.$inject = ["$locale"];
    var De = q(od)
      , Ee = q(qd);
    ad.$inject = ["$parse"];
    var Fe = q({
        restrict: "E",
        compile: function(a, c) {
            return 8 >= td && (c.href || c.name || c.$set("href", ""),
            a.append(b.createComment("IE fix"))),
            c.href || c.xlinkHref || c.name ? void 0 : function(a, b) {
                var c = "[object SVGAnimatedString]" === Ad.call(b.prop("href")) ? "xlink:href" : "href";
                b.on("click", function(a) {
                    b.attr(c) || a.preventDefault()
                }
                )
            }
        }
    })
      , Ge = {};
    f(Wd, function(a, b) {
        if ("multiple" != a) {
            var c = Pb("ng-" + b);
            Ge[c] = function() {
                return {
                    priority: 100,
                    link: function(a, d, e) {
                        a.$watch(e[c], function(a) {
                            e.$set(b, !!a)
                        }
                        )
                    }
                }
            }
        }
    }
    ),
    f(["src", "srcset", "href"], function(a) {
        var b = Pb("ng-" + a);
        Ge[b] = function() {
            return {
                priority: 99,
                link: function(c, d, e) {
                    var f = a
                      , g = a;
                    "href" === a && "[object SVGAnimatedString]" === Ad.call(d.prop("href")) && (g = "xlinkHref",
                    e.$attr[g] = "xlink:href",
                    f = null ),
                    e.$observe(b, function(b) {
                        return b ? (e.$set(g, b),
                        void (td && f && d.prop(f, e[g]))) : void ("href" === a && e.$set(g, null ))
                    }
                    )
                }
            }
        }
    }
    );
    var He = {
        $addControl: o,
        $removeControl: o,
        $setValidity: o,
        $setDirty: o,
        $setPristine: o
    };
    cd.$inject = ["$element", "$attrs", "$scope", "$animate"];
    var Ie = function(a) {
        return ["$timeout", function(b) {
            var d = {
                name: "form",
                restrict: a ? "EAC" : "E",
                controller: cd,
                compile: function() {
                    return {
                        pre: function(a, d, e, f) {
                            if (!e.action) {
                                var g = function(a) {
                                    a.preventDefault ? a.preventDefault() : a.returnValue = !1
                                }
                                ;
                                Ld(d[0], "submit", g),
                                d.on("$destroy", function() {
                                    b(function() {
                                        Md(d[0], "submit", g)
                                    }
                                    , 0, !1)
                                }
                                )
                            }
                            var h = d.parent().controller("form")
                              , i = e.name || e.ngForm;
                            i && uc(a, i, f, i),
                            h && d.on("$destroy", function() {
                                h.$removeControl(f),
                                i && uc(a, i, c, i),
                                l(f, He)
                            }
                            )
                        }
                    }
                }
            };
            return d
        }
        ]
    }
      , Je = Ie()
      , Ke = Ie(!0)
      , Le = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/
      , Me = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i
      , Ne = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/
      , Oe = {
        text: gd,
        number: hd,
        url: id,
        email: jd,
        radio: kd,
        checkbox: ld,
        hidden: o,
        button: o,
        submit: o,
        reset: o,
        file: o
    }
      , Pe = ["badInput"]
      , Qe = ["$browser", "$sniffer", function(a, b) {
        return {
            restrict: "E",
            require: "?ngModel",
            link: function(c, d, e, f) {
                f && (Oe[od(e.type)] || Oe.text)(c, d, e, f, b, a)
            }
        }
    }
    ]
      , Re = "ng-valid"
      , Se = "ng-invalid"
      , Te = "ng-pristine"
      , Ue = "ng-dirty"
      , Ve = ["$scope", "$exceptionHandler", "$attrs", "$element", "$parse", "$animate", function(a, b, c, e, g, h) {
        function i(a, b) {
            b = b ? "-" + _(b, "-") : "",
            h.removeClass(e, (a ? Se : Re) + b),
            h.addClass(e, (a ? Re : Se) + b)
        }
        this.$viewValue = Number.NaN,
        this.$modelValue = Number.NaN,
        this.$parsers = [],
        this.$formatters = [],
        this.$viewChangeListeners = [],
        this.$pristine = !0,
        this.$dirty = !1,
        this.$valid = !0,
        this.$invalid = !1,
        this.$name = c.name;
        var j = g(c.ngModel)
          , k = j.assign;
        if (!k)
            throw d("ngModel")("nonassign", "Expression '{0}' is non-assignable. Element: {1}", c.ngModel, T(e));
        this.$render = o,
        this.$isEmpty = function(a) {
            return r(a) || "" === a || null  === a || a !== a
        }
        ;
        var l = e.inheritedData("$formController") || He
          , m = 0
          , n = this.$error = {};
        e.addClass(Te),
        i(!0),
        this.$setValidity = function(a, b) {
            n[a] !== !b && (b ? (n[a] && m--,
            m || (i(!0),
            this.$valid = !0,
            this.$invalid = !1)) : (i(!1),
            this.$invalid = !0,
            this.$valid = !1,
            m++),
            n[a] = !b,
            i(b, a),
            l.$setValidity(a, b, this))
        }
        ,
        this.$setPristine = function() {
            this.$dirty = !1,
            this.$pristine = !0,
            h.removeClass(e, Ue),
            h.addClass(e, Te)
        }
        ,
        this.$setViewValue = function(c) {
            this.$viewValue = c,
            this.$pristine && (this.$dirty = !0,
            this.$pristine = !1,
            h.removeClass(e, Te),
            h.addClass(e, Ue),
            l.$setDirty()),
            f(this.$parsers, function(a) {
                c = a(c)
            }
            ),
            this.$modelValue !== c && (this.$modelValue = c,
            k(a, c),
            f(this.$viewChangeListeners, function(a) {
                try {
                    a()
                } catch (c) {
                    b(c)
                }
            }
            ))
        }
        ;
        var p = this;
        a.$watch(function() {
            var b = j(a);
            if (p.$modelValue !== b) {
                var c = p.$formatters
                  , d = c.length;
                for (p.$modelValue = b; d--; )
                    b = c[d](b);
                p.$viewValue !== b && (p.$viewValue = b,
                p.$render())
            }
            return b
        }
        )
    }
    ]
      , We = function() {
        return {
            require: ["ngModel", "^?form"],
            controller: Ve,
            link: function(a, b, c, d) {
                var e = d[0]
                  , f = d[1] || He;
                f.$addControl(e),
                a.$on("$destroy", function() {
                    f.$removeControl(e)
                }
                )
            }
        }
    }
      , Xe = q({
        require: "ngModel",
        link: function(a, b, c, d) {
            d.$viewChangeListeners.push(function() {
                a.$eval(c.ngChange)
            }
            )
        }
    })
      , Ye = function() {
        return {
            require: "?ngModel",
            link: function(a, b, c, d) {
                if (d) {
                    c.required = !0;
                    var e = function(a) {
                        return c.required && d.$isEmpty(a) ? void d.$setValidity("required", !1) : (d.$setValidity("required", !0),
                        a)
                    }
                    ;
                    d.$formatters.push(e),
                    d.$parsers.unshift(e),
                    c.$observe("required", function() {
                        e(d.$viewValue)
                    }
                    )
                }
            }
        }
    }
      , Ze = function() {
        return {
            require: "ngModel",
            link: function(a, b, d, e) {
                var g = /\/(.*)\//.exec(d.ngList)
                  , h = g && new RegExp(g[1]) || d.ngList || ","
                  , i = function(a) {
                    if (!r(a)) {
                        var b = [];
                        return a && f(a.split(h), function(a) {
                            a && b.push(Fd(a))
                        }
                        ),
                        b
                    }
                }
                ;
                e.$parsers.push(i),
                e.$formatters.push(function(a) {
                    return Ed(a) ? a.join(", ") : c
                }
                ),
                e.$isEmpty = function(a) {
                    return !a || !a.length
                }
            }
        }
    }
      , $e = /^(true|false|\d+)$/
      , _e = function() {
        return {
            priority: 100,
            compile: function(a, b) {
                return $e.test(b.ngValue) ? function(a, b, c) {
                    c.$set("value", a.$eval(c.ngValue))
                }
                 : function(a, b, c) {
                    a.$watch(c.ngValue, function(a) {
                        c.$set("value", a)
                    }
                    )
                }
            }
        }
    }
      , af = bd({
        compile: function(a) {
            return a.addClass("ng-binding"),
            function(a, b, d) {
                b.data("$binding", d.ngBind),
                a.$watch(d.ngBind, function(a) {
                    b.text(a == c ? "" : a)
                }
                )
            }
        }
    })
      , bf = ["$interpolate", function(a) {
        return function(b, c, d) {
            var e = a(c.attr(d.$attr.ngBindTemplate));
            c.addClass("ng-binding").data("$binding", e),
            d.$observe("ngBindTemplate", function(a) {
                c.text(a)
            }
            )
        }
    }
    ]
      , cf = ["$sce", "$parse", function(a, b) {
        return {
            compile: function(c) {
                return c.addClass("ng-binding"),
                function(c, d, e) {
                    function f() {
                        return (g(c) || "").toString()
                    }
                    d.data("$binding", e.ngBindHtml);
                    var g = b(e.ngBindHtml);
                    c.$watch(f, function() {
                        d.html(a.getTrustedHtml(g(c)) || "")
                    }
                    )
                }
            }
        }
    }
    ]
      , df = md("", !0)
      , ef = md("Odd", 0)
      , ff = md("Even", 1)
      , gf = bd({
        compile: function(a, b) {
            b.$set("ngCloak", c),
            a.removeClass("ng-cloak")
        }
    })
      , hf = [function() {
        return {
            scope: !0,
            controller: "@",
            priority: 500
        }
    }
    ]
      , jf = {}
      , kf = {
        blur: !0,
        focus: !0
    };
    f("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "), function(a) {
        var b = Pb("ng-" + a);
        jf[b] = ["$parse", "$rootScope", function(c, d) {
            return {
                compile: function(e, f) {
                    var g = c(f[b], !0);
                    return function(b, c) {
                        c.on(a, function(c) {
                            var e = function() {
                                g(b, {
                                    $event: c
                                })
                            }
                            ;
                            kf[a] && d.$$phase ? b.$evalAsync(e) : b.$apply(e)
                        }
                        )
                    }
                }
            }
        }
        ]
    }
    );
    var lf = ["$animate", function(a) {
        return {
            transclude: "element",
            priority: 600,
            terminal: !0,
            restrict: "A",
            $$tlb: !0,
            link: function(c, d, e, f, g) {
                var h, i, j;
                c.$watch(e.ngIf, function(f) {
                    S(f) ? i || (i = c.$new(),
                    g(i, function(c) {
                        c[c.length++] = b.createComment(" end ngIf: " + e.ngIf + " "),
                        h = {
                            clone: c
                        },
                        a.enter(c, d.parent(), d)
                    }
                    )) : (j && (j.remove(),
                    j = null ),
                    i && (i.$destroy(),
                    i = null ),
                    h && (j = fb(h.clone),
                    a.leave(j, function() {
                        j = null
                    }
                    ),
                    h = null ))
                }
                )
            }
        }
    }
    ]
      , mf = ["$http", "$templateCache", "$anchorScroll", "$animate", "$sce", function(a, b, c, d, e) {
        return {
            restrict: "ECA",
            priority: 400,
            terminal: !0,
            transclude: "element",
            controller: Cd.noop,
            compile: function(f, g) {
                var h = g.ngInclude || g.src
                  , i = g.onload || ""
                  , j = g.autoscroll;
                return function(f, g, k, l, m) {
                    var n, o, p, q = 0, r = function() {
                        o && (o.remove(),
                        o = null ),
                        n && (n.$destroy(),
                        n = null ),
                        p && (d.leave(p, function() {
                            o = null
                        }
                        ),
                        o = p,
                        p = null )
                    }
                    ;
                    f.$watch(e.parseAsResourceUrl(h), function(e) {
                        var h = function() {
                            !s(j) || j && !f.$eval(j) || c()
                        }
                          , k = ++q;
                        e ? (a.get(e, {
                            cache: b
                        }).success(function(a) {
                            if (k === q) {
                                var b = f.$new();
                                l.template = a;
                                var c = m(b, function(a) {
                                    r(),
                                    d.enter(a, null , g, h)
                                }
                                );
                                n = b,
                                p = c,
                                n.$emit("$includeContentLoaded"),
                                f.$eval(i)
                            }
                        }
                        ).error(function() {
                            k === q && r()
                        }
                        ),
                        f.$emit("$includeContentRequested")) : (r(),
                        l.template = null )
                    }
                    )
                }
            }
        }
    }
    ]
      , nf = ["$compile", function(a) {
        return {
            restrict: "ECA",
            priority: -400,
            require: "ngInclude",
            link: function(b, c, d, e) {
                c.html(e.template),
                a(c.contents())(b)
            }
        }
    }
    ]
      , of = bd({
        priority: 450,
        compile: function() {
            return {
                pre: function(a, b, c) {
                    a.$eval(c.ngInit)
                }
            }
        }
    })
      , pf = bd({
        terminal: !0,
        priority: 1e3
    })
      , qf = ["$locale", "$interpolate", function(a, b) {
        var c = /{}/g;
        return {
            restrict: "EA",
            link: function(d, e, g) {
                var h = g.count
                  , i = g.$attr.when && e.attr(g.$attr.when)
                  , j = g.offset || 0
                  , k = d.$eval(i) || {}
                  , l = {}
                  , m = b.startSymbol()
                  , n = b.endSymbol()
                  , o = /^when(Minus)?(.+)$/;
                f(g, function(a, b) {
                    o.test(b) && (k[od(b.replace("when", "").replace("Minus", "-"))] = e.attr(g.$attr[b]))
                }
                ),
                f(k, function(a, d) {
                    l[d] = b(a.replace(c, m + h + "-" + j + n))
                }
                ),
                d.$watch(function() {
                    var b = parseFloat(d.$eval(h));
                    return isNaN(b) ? "" : (b in k || (b = a.pluralCat(b - j)),
                    l[b](d, e, !0))
                }
                , function(a) {
                    e.text(a)
                }
                )
            }
        }
    }
    ]
      , rf = ["$parse", "$animate", function(a, c) {
        function g(a) {
            return a.clone[0]
        }
        function h(a) {
            return a.clone[a.clone.length - 1]
        }
        var i = "$$NG_REMOVED"
          , j = d("ngRepeat");
        return {
            transclude: "element",
            priority: 1e3,
            terminal: !0,
            $$tlb: !0,
            link: function(d, k, l, m, n) {
                var o, p, q, r, s, t, u, v, w, x = l.ngRepeat, y = x.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/), z = {
                    $id: Eb
                };
                if (!y)
                    throw j("iexp", "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.", x);
                if (t = y[1],
                u = y[2],
                o = y[3],
                o ? (p = a(o),
                q = function(a, b, c) {
                    return w && (z[w] = a),
                    z[v] = b,
                    z.$index = c,
                    p(d, z)
                }
                ) : (r = function(a, b) {
                    return Eb(b)
                }
                ,
                s = function(a) {
                    return a
                }
                ),
                y = t.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/),
                !y)
                    throw j("iidexp", "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.", t);
                v = y[3] || y[1],
                w = y[2];
                var A = {};
                d.$watchCollection(u, function(a) {
                    var l, m, o, p, t, u, y, z, B, C, D, E, F = k[0], G = {}, H = [];
                    if (e(a))
                        C = a,
                        B = q || r;
                    else {
                        B = q || s,
                        C = [];
                        for (u in a)
                            a.hasOwnProperty(u) && "$" != u.charAt(0) && C.push(u);
                        C.sort()
                    }
                    for (p = C.length,
                    m = H.length = C.length,
                    l = 0; m > l; l++)
                        if (u = a === C ? l : C[l],
                        y = a[u],
                        z = B(u, y, l),
                        db(z, "`track by` id"),
                        A.hasOwnProperty(z))
                            D = A[z],
                            delete A[z],
                            G[z] = D,
                            H[l] = D;
                        else {
                            if (G.hasOwnProperty(z))
                                throw f(H, function(a) {
                                    a && a.scope && (A[a.id] = a)
                                }
                                ),
                                j("dupes", "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}, Duplicate value: {2}", x, z, Q(y));
                            H[l] = {
                                id: z
                            },
                            G[z] = !1
                        }
                    for (u in A)
                        A.hasOwnProperty(u) && (D = A[u],
                        E = fb(D.clone),
                        c.leave(E),
                        f(E, function(a) {
                            a[i] = !0
                        }
                        ),
                        D.scope.$destroy());
                    for (l = 0,
                    m = C.length; m > l; l++) {
                        if (u = a === C ? l : C[l],
                        y = a[u],
                        D = H[l],
                        H[l - 1] && (F = h(H[l - 1])),
                        D.scope) {
                            t = D.scope,
                            o = F;
                            do
                                o = o.nextSibling;
                            while (o && o[i]);g(D) != o && c.move(fb(D.clone), null , ud(F)),
                            F = h(D)
                        } else
                            t = d.$new();
                        t[v] = y,
                        w && (t[w] = u),
                        t.$index = l,
                        t.$first = 0 === l,
                        t.$last = l === p - 1,
                        t.$middle = !(t.$first || t.$last),
                        t.$odd = !(t.$even = 0 === (1 & l)),
                        D.scope || n(t, function(a) {
                            a[a.length++] = b.createComment(" end ngRepeat: " + x + " "),
                            c.enter(a, null , ud(F)),
                            F = a,
                            D.scope = t,
                            D.clone = a,
                            G[D.id] = D
                        }
                        )
                    }
                    A = G
                }
                )
            }
        }
    }
    ]
      , sf = ["$animate", function(a) {
        return function(b, c, d) {
            b.$watch(d.ngShow, function(b) {
                a[S(b) ? "removeClass" : "addClass"](c, "ng-hide")
            }
            )
        }
    }
    ]
      , tf = ["$animate", function(a) {
        return function(b, c, d) {
            b.$watch(d.ngHide, function(b) {
                a[S(b) ? "addClass" : "removeClass"](c, "ng-hide")
            }
            )
        }
    }
    ]
      , uf = bd(function(a, b, c) {
        a.$watch(c.ngStyle, function(a, c) {
            c && a !== c && f(c, function(a, c) {
                b.css(c, "")
            }
            ),
            a && b.css(a)
        }
        , !0)
    }
    )
      , vf = ["$animate", function(a) {
        return {
            restrict: "EA",
            require: "ngSwitch",
            controller: ["$scope", function() {
                this.cases = {}
            }
            ],
            link: function(b, c, d, e) {
                var g = d.ngSwitch || d.on
                  , h = []
                  , i = []
                  , j = []
                  , k = [];
                b.$watch(g, function(c) {
                    var g, l;
                    for (g = 0,
                    l = j.length; l > g; ++g)
                        j[g].remove();
                    for (j.length = 0,
                    g = 0,
                    l = k.length; l > g; ++g) {
                        var m = i[g];
                        k[g].$destroy(),
                        j[g] = m,
                        a.leave(m, function() {
                            j.splice(g, 1)
                        }
                        )
                    }
                    i.length = 0,
                    k.length = 0,
                    (h = e.cases["!" + c] || e.cases["?"]) && (b.$eval(d.change),
                    f(h, function(c) {
                        var d = b.$new();
                        k.push(d),
                        c.transclude(d, function(b) {
                            var d = c.element;
                            i.push(b),
                            a.enter(b, d.parent(), d)
                        }
                        )
                    }
                    ))
                }
                )
            }
        }
    }
    ]
      , wf = bd({
        transclude: "element",
        priority: 800,
        require: "^ngSwitch",
        link: function(a, b, c, d, e) {
            d.cases["!" + c.ngSwitchWhen] = d.cases["!" + c.ngSwitchWhen] || [],
            d.cases["!" + c.ngSwitchWhen].push({
                transclude: e,
                element: b
            })
        }
    })
      , xf = bd({
        transclude: "element",
        priority: 800,
        require: "^ngSwitch",
        link: function(a, b, c, d, e) {
            d.cases["?"] = d.cases["?"] || [],
            d.cases["?"].push({
                transclude: e,
                element: b
            })
        }
    })
      , yf = bd({
        link: function(a, b, c, e, f) {
            if (!f)
                throw d("ngTransclude")("orphan", "Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}", T(b));
            f(function(a) {
                b.empty(),
                b.append(a)
            }
            )
        }
    })
      , zf = ["$templateCache", function(a) {
        return {
            restrict: "E",
            terminal: !0,
            compile: function(b, c) {
                if ("text/ng-template" == c.type) {
                    var d = c.id
                      , e = b[0].text;
                    a.put(d, e)
                }
            }
        }
    }
    ]
      , Af = d("ngOptions")
      , Bf = q({
        terminal: !0
    })
      , Cf = ["$compile", "$parse", function(a, d) {
        var e = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/
          , h = {
            $setViewValue: o
        };
        return {
            restrict: "E",
            require: ["select", "?ngModel"],
            controller: ["$element", "$scope", "$attrs", function(a, b, c) {
                var d, e, f = this, g = {}, i = h;
                f.databound = c.ngModel,
                f.init = function(a, b, c) {
                    i = a,
                    d = b,
                    e = c
                }
                ,
                f.addOption = function(b) {
                    db(b, '"option value"'),
                    g[b] = !0,
                    i.$viewValue == b && (a.val(b),
                    e.parent() && e.remove())
                }
                ,
                f.removeOption = function(a) {
                    this.hasOption(a) && (delete g[a],
                    i.$viewValue == a && this.renderUnknownOption(a))
                }
                ,
                f.renderUnknownOption = function(b) {
                    var c = "? " + Eb(b) + " ?";
                    e.val(c),
                    a.prepend(e),
                    a.val(c),
                    e.prop("selected", !0)
                }
                ,
                f.hasOption = function(a) {
                    return g.hasOwnProperty(a)
                }
                ,
                b.$on("$destroy", function() {
                    f.renderUnknownOption = o
                }
                )
            }
            ],
            link: function(h, i, j, k) {
                function l(a, b, c, d) {
                    c.$render = function() {
                        var a = c.$viewValue;
                        d.hasOption(a) ? (y.parent() && y.remove(),
                        b.val(a),
                        "" === a && o.prop("selected", !0)) : r(a) && o ? b.val("") : d.renderUnknownOption(a)
                    }
                    ,
                    b.on("change", function() {
                        a.$apply(function() {
                            y.parent() && y.remove(),
                            c.$setViewValue(b.val())
                        }
                        )
                    }
                    )
                }
                function m(a, b, c) {
                    var d;
                    c.$render = function() {
                        var a = new Fb(c.$viewValue);
                        f(b.find("option"), function(b) {
                            b.selected = s(a.get(b.value))
                        }
                        )
                    }
                    ,
                    a.$watch(function() {
                        L(d, c.$viewValue) || (d = K(c.$viewValue),
                        c.$render())
                    }
                    ),
                    b.on("change", function() {
                        a.$apply(function() {
                            var a = [];
                            f(b.find("option"), function(b) {
                                b.selected && a.push(b.value)
                            }
                            ),
                            c.$setViewValue(a)
                        }
                        )
                    }
                    )
                }
                function n(b, f, h) {
                    function i() {
                        var a = !1;
                        if (t) {
                            var c = h.$modelValue;
                            if (z && Ed(c)) {
                                a = new Fb([]);
                                for (var d = {}, e = 0; e < c.length; e++)
                                    d[m] = c[e],
                                    a.put(z(b, d), c[e])
                            } else
                                a = new Fb(c)
                        }
                        return a
                    }
                    function j() {
                        var a, c, d, e, j, k, u, y, B, C, D, E, F, G, H, I = {
                            "": []
                        }, J = [""], K = h.$modelValue, L = r(b) || [], M = n ? g(L) : L, N = {}, O = i();
                        for (D = 0; B = M.length,
                        B > D; D++) {
                            if (u = D,
                            n) {
                                if (u = M[D],
                                "$" === u.charAt(0))
                                    continue;N[n] = u
                            }
                            if (N[m] = L[u],
                            a = o(b, N) || "",
                            (c = I[a]) || (c = I[a] = [],
                            J.push(a)),
                            t)
                                E = s(O.remove(z ? z(b, N) : q(b, N)));
                            else {
                                if (z) {
                                    var P = {};
                                    P[m] = K,
                                    E = z(b, P) === z(b, N)
                                } else
                                    E = K === q(b, N);
                                O = O || E
                            }
                            H = l(b, N),
                            H = s(H) ? H : "",
                            c.push({
                                id: z ? z(b, N) : n ? M[D] : D,
                                label: H,
                                selected: E
                            })
                        }
                        for (t || (v || null  === K ? I[""].unshift({
                            id: "",
                            label: "",
                            selected: !O
                        }) : O || I[""].unshift({
                            id: "?",
                            label: "",
                            selected: !0
                        })),
                        C = 0,
                        y = J.length; y > C; C++) {
                            for (a = J[C],
                            c = I[a],
                            A.length <= C ? (e = {
                                element: x.clone().attr("label", a),
                                label: c.label
                            },
                            j = [e],
                            A.push(j),
                            f.append(e.element)) : (j = A[C],
                            e = j[0],
                            e.label != a && e.element.attr("label", e.label = a)),
                            F = null ,
                            D = 0,
                            B = c.length; B > D; D++)
                                d = c[D],
                                (k = j[D + 1]) ? (F = k.element,
                                k.label !== d.label && (F.text(k.label = d.label),
                                F.prop("label", k.label)),
                                k.id !== d.id && F.val(k.id = d.id),
                                F[0].selected !== d.selected && (F.prop("selected", k.selected = d.selected),
                                td && F.prop("selected", k.selected))) : ("" === d.id && v ? G = v : (G = w.clone()).val(d.id).prop("selected", d.selected).attr("selected", d.selected).prop("label", d.label).text(d.label),
                                j.push(k = {
                                    element: G,
                                    label: d.label,
                                    id: d.id,
                                    selected: d.selected
                                }),
                                p.addOption(d.label, G),
                                F ? F.after(G) : e.element.append(G),
                                F = G);
                            for (D++; j.length > D; )
                                d = j.pop(),
                                p.removeOption(d.label),
                                d.element.remove()
                        }
                        for (; A.length > C; )
                            A.pop()[0].element.remove()
                    }
                    var k;
                    if (!(k = u.match(e)))
                        throw Af("iexp", "Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}", u, T(f));
                    var l = d(k[2] || k[1])
                      , m = k[4] || k[6]
                      , n = k[5]
                      , o = d(k[3] || "")
                      , q = d(k[2] ? k[1] : m)
                      , r = d(k[7])
                      , y = k[8]
                      , z = y ? d(k[8]) : null
                      , A = [[{
                        element: f,
                        label: ""
                    }]];
                    v && (a(v)(b),
                    v.removeClass("ng-scope"),
                    v.remove()),
                    f.empty(),
                    f.on("change", function() {
                        b.$apply(function() {
                            var a, d, e, g, i, k, l, o, p, s = r(b) || [], u = {};
                            if (t) {
                                for (e = [],
                                k = 0,
                                o = A.length; o > k; k++)
                                    for (a = A[k],
                                    i = 1,
                                    l = a.length; l > i; i++)
                                        if ((g = a[i].element)[0].selected) {
                                            if (d = g.val(),
                                            n && (u[n] = d),
                                            z)
                                                for (p = 0; p < s.length && (u[m] = s[p],
                                                z(b, u) != d); p++)
                                                    ;
                                            else
                                                u[m] = s[d];
                                            e.push(q(b, u))
                                        }
                            } else if (d = f.val(),
                            "?" == d)
                                e = c;
                            else if ("" === d)
                                e = null ;
                            else if (z) {
                                for (p = 0; p < s.length; p++)
                                    if (u[m] = s[p],
                                    z(b, u) == d) {
                                        e = q(b, u);
                                        break
                                    }
                            } else
                                u[m] = s[d],
                                n && (u[n] = d),
                                e = q(b, u);
                            h.$setViewValue(e),
                            j()
                        }
                        )
                    }
                    ),
                    h.$render = j,
                    b.$watchCollection(r, j),
                    b.$watchCollection(function() {
                        var a = {}
                          , c = r(b);
                        if (c) {
                            for (var d = new Array(c.length), e = 0, f = c.length; f > e; e++)
                                a[m] = c[e],
                                d[e] = l(b, a);
                            return d
                        }
                    }
                    , j),
                    t && b.$watchCollection(function() {
                        return h.$modelValue
                    }
                    , j)
                }
                if (k[1]) {
                    for (var o, p = k[0], q = k[1], t = j.multiple, u = j.ngOptions, v = !1, w = ud(b.createElement("option")), x = ud(b.createElement("optgroup")), y = w.clone(), z = 0, A = i.children(), B = A.length; B > z; z++)
                        if ("" === A[z].value) {
                            o = v = A.eq(z);
                            break
                        }
                    p.init(q, v, y),
                    t && (q.$isEmpty = function(a) {
                        return !a || 0 === a.length
                    }
                    ),
                    u ? n(h, i, q) : t ? m(h, i, q) : l(h, i, q, p)
                }
            }
        }
    }
    ]
      , Df = ["$interpolate", function(a) {
        var b = {
            addOption: o,
            removeOption: o
        };
        return {
            restrict: "E",
            priority: 100,
            compile: function(c, d) {
                if (r(d.value)) {
                    var e = a(c.text(), !0);
                    e || d.$set("value", c.text())
                }
                return function(a, c, d) {
                    var f = "$selectController"
                      , g = c.parent()
                      , h = g.data(f) || g.parent().data(f);
                    h && h.databound ? c.prop("selected", !1) : h = b,
                    e ? a.$watch(e, function(a, b) {
                        d.$set("value", a),
                        a !== b && h.removeOption(b),
                        h.addOption(a)
                    }
                    ) : h.addOption(d.value),
                    c.on("$destroy", function() {
                        h.removeOption(d.value)
                    }
                    )
                }
            }
        }
    }
    ]
      , Ef = q({
        restrict: "E",
        terminal: !0
    });
    return a.angular.bootstrap ? void console.log("WARNING: Tried to load angular more than once.") : (ab(),
    hb(Cd),
    void ud(b).ready(function() {
        Z(b, $)
    }
    ))
}
(window, document),
!window.angular.$$csp() && window.angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-block-transitions{transition:0s all!important;-webkit-transition:0s all!important;}.ng-hide-add-active,.ng-hide-remove{display:block!important;}</style>'),
function(a, b, c) {
    "use strict";
    function d(a) {
        return null  != a && "" !== a && "hasOwnProperty" !== a && h.test("." + a)
    }
    function e(a, b) {
        if (!d(b))
            throw g("badmember", 'Dotted member path "@{0}" is invalid.', b);
        for (var e = b.split("."), f = 0, h = e.length; h > f && a !== c; f++) {
            var i = e[f];
            a = null  !== a ? a[i] : c
        }
        return a
    }
    function f(a, c) {
        c = c || {},
        b.forEach(c, function(a, b) {
            delete c[b]
        }
        );
        for (var d in a)
            !a.hasOwnProperty(d) || "$" === d.charAt(0) && "$" === d.charAt(1) || (c[d] = a[d]);
        return c
    }
    var g = b.$$minErr("$resource")
      , h = /^(\.[a-zA-Z_$][0-9a-zA-Z_$]*)+$/;
    b.module("ngResource", ["ng"]).factory("$resource", ["$http", "$q", function(a, d) {
        function h(a) {
            return i(a, !0).replace(/%26/gi, "&").replace(/%3D/gi, "=").replace(/%2B/gi, "+")
        }
        function i(a, b) {
            return encodeURIComponent(a).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, b ? "%20" : "+")
        }
        function j(a, b) {
            this.template = a,
            this.defaults = b || {},
            this.urlParams = {}
        }
        function k(h, i, r) {
            function s(a, b) {
                var c = {};
                return b = o({}, i, b),
                n(b, function(b, d) {
                    q(b) && (b = b()),
                    c[d] = b && b.charAt && "@" == b.charAt(0) ? e(a, b.substr(1)) : b
                }
                ),
                c
            }
            function t(a) {
                return a.resource
            }
            function u(a) {
                f(a || {}, this)
            }
            var v = new j(h);
            return r = o({}, l, r),
            n(r, function(e, h) {
                var i = /^(POST|PUT|PATCH)$/i.test(e.method);
                u[h] = function(h, j, k, l) {
                    var r, w, x, y = {};
                    switch (arguments.length) {
                    case 4:
                        x = l,
                        w = k;
                    case 3:
                    case 2:
                        if (!q(j)) {
                            y = h,
                            r = j,
                            w = k;
                            break
                        }
                        if (q(h)) {
                            w = h,
                            x = j;
                            break
                        }
                        w = j,
                        x = k;
                    case 1:
                        q(h) ? w = h : i ? r = h : y = h;
                        break;
                    case 0:
                        break;
                    default:
                        throw g("badargs", "Expected up to 4 arguments [params, data, success, error], got {0} arguments", arguments.length)
                    }
                    var z = this instanceof u
                      , A = z ? r : e.isArray ? [] : new u(r)
                      , B = {}
                      , C = e.interceptor && e.interceptor.response || t
                      , D = e.interceptor && e.interceptor.responseError || c;
                    n(e, function(a, b) {
                        "params" != b && "isArray" != b && "interceptor" != b && (B[b] = p(a))
                    }
                    ),
                    i && (B.data = r),
                    v.setUrlParams(B, o({}, s(r, e.params || {}), y), e.url);
                    var E = a(B).then(function(a) {
                        var c = a.data
                          , d = A.$promise;
                        if (c) {
                            if (b.isArray(c) !== !!e.isArray)
                                throw g("badcfg", "Error in resource configuration. Expected response to contain an {0} but got an {1}", e.isArray ? "array" : "object", b.isArray(c) ? "array" : "object");
                            e.isArray ? (A.length = 0,
                            n(c, function(a) {
                                A.push("object" == typeof a ? new u(a) : a)
                            }
                            )) : (f(c, A),
                            A.$promise = d)
                        }
                        return A.$resolved = !0,
                        a.resource = A,
                        a
                    }
                    , function(a) {
                        return A.$resolved = !0,
                        (x || m)(a),
                        d.reject(a)
                    }
                    );
                    return E = E.then(function(a) {
                        var b = C(a);
                        return (w || m)(b, a.headers),
                        b
                    }
                    , D),
                    z ? E : (A.$promise = E,
                    A.$resolved = !1,
                    A)
                }
                ,
                u.prototype["$" + h] = function(a, b, c) {
                    q(a) && (c = b,
                    b = a,
                    a = {});
                    var d = u[h].call(this, a, this, b, c);
                    return d.$promise || d
                }
            }
            ),
            u.bind = function(a) {
                return k(h, o({}, i, a), r)
            }
            ,
            u
        }
        var l = {
            get: {
                method: "GET"
            },
            save: {
                method: "POST"
            },
            query: {
                method: "GET",
                isArray: !0
            },
            remove: {
                method: "DELETE"
            },
            "delete": {
                method: "DELETE"
            }
        }
          , m = b.noop
          , n = b.forEach
          , o = b.extend
          , p = b.copy
          , q = b.isFunction;
        return j.prototype = {
            setUrlParams: function(a, c, d) {
                var e, f, i = this, j = d || i.template, k = i.urlParams = {};
                n(j.split(/\W/), function(a) {
                    if ("hasOwnProperty" === a)
                        throw g("badname", "hasOwnProperty is not a valid parameter name.");
                    !new RegExp("^\\d+$").test(a) && a && new RegExp("(^|[^\\\\]):" + a + "(\\W|$)").test(j) && (k[a] = !0)
                }
                ),
                j = j.replace(/\\:/g, ":"),
                c = c || {},
                n(i.urlParams, function(a, d) {
                    e = c.hasOwnProperty(d) ? c[d] : i.defaults[d],
                    b.isDefined(e) && null  !== e ? (f = h(e),
                    j = j.replace(new RegExp(":" + d + "(\\W|$)","g"), function(a, b) {
                        return f + b
                    }
                    )) : j = j.replace(new RegExp("(/?):" + d + "(\\W|$)","g"), function(a, b, c) {
                        return "/" == c.charAt(0) ? c : b + c
                    }
                    )
                }
                ),
                j = j.replace(/\/+$/, "") || "/",
                j = j.replace(/\/\.(?=\w+($|\?))/, "."),
                a.url = j.replace(/\/\\\./, "/."),
                n(c, function(b, c) {
                    i.urlParams[c] || (a.params = a.params || {},
                    a.params[c] = b)
                }
                )
            }
        },
        k
    }
    ])
}
(window, window.angular),
function(a, b, c) {
    "use strict";
    b.module("ngCookies", ["ng"]).factory("$cookies", ["$rootScope", "$browser", function(a, d) {
        function e() {
            var a, e, f, i;
            for (a in h)
                k(g[a]) && d.cookies(a, c);
            for (a in g)
                e = g[a],
                b.isString(e) || (e = "" + e,
                g[a] = e),
                e !== h[a] && (d.cookies(a, e),
                i = !0);
            if (i) {
                i = !1,
                f = d.cookies();
                for (a in g)
                    g[a] !== f[a] && (k(f[a]) ? delete g[a] : g[a] = f[a],
                    i = !0)
            }
        }
        var f, g = {}, h = {}, i = !1, j = b.copy, k = b.isUndefined;
        return d.addPollFn(function() {
            var b = d.cookies();
            f != b && (f = b,
            j(b, h),
            j(b, g),
            i && a.$apply())
        }
        )(),
        i = !0,
        a.$watch(e),
        g
    }
    ]).factory("$cookieStore", ["$cookies", function(a) {
        return {
            get: function(c) {
                var d = a[c];
                return d ? b.fromJson(d) : d
            },
            put: function(c, d) {
                a[c] = b.toJson(d)
            },
            remove: function(b) {
                delete a[b]
            }
        }
    }
    ])
}
(window, window.angular),
function(a, b) {
    "use strict";
    function c() {
        this.$get = ["$$sanitizeUri", function(a) {
            return function(b) {
                var c = [];
                return f(b, i(c, function(b, c) {
                    return !/^unsafe/.test(a(b, c))
                }
                )),
                c.join("")
            }
        }
        ]
    }
    function d(a) {
        var c = []
          , d = i(c, b.noop);
        return d.chars(a),
        c.join("")
    }
    function e(a) {
        var b, c = {}, d = a.split(",");
        for (b = 0; b < d.length; b++)
            c[d[b]] = !0;
        return c
    }
    function f(a, c) {
        function d(a, d, f, h) {
            if (d = b.lowercase(d),
            y[d])
                for (; t.last() && z[t.last()]; )
                    e("", t.last());
            x[d] && t.last() == d && e("", d),
            h = u[d] || !!h,
            h || t.push(d);
            var i = {};
            f.replace(m, function(a, b, c, d, e) {
                var f = c || d || e || "";
                i[b] = g(f)
            }
            ),
            c.start && c.start(d, i, h)
        }
        function e(a, d) {
            var e, f = 0;
            if (d = b.lowercase(d))
                for (f = t.length - 1; f >= 0 && t[f] != d; f--)
                    ;
            if (f >= 0) {
                for (e = t.length - 1; e >= f; e--)
                    c.end && c.end(t[e]);
                t.length = f
            }
        }
        "string" != typeof a && (a = null  === a || "undefined" == typeof a ? "" : "" + a);
        var f, h, i, s, t = [], v = a;
        for (t.last = function() {
            return t[t.length - 1]
        }
        ; a; ) {
            if (s = "",
            h = !0,
            t.last() && A[t.last()] ? (a = a.replace(new RegExp("(.*)<\\s*\\/\\s*" + t.last() + "[^>]*>","i"), function(a, b) {
                return b = b.replace(p, "$1").replace(r, "$1"),
                c.chars && c.chars(g(b)),
                ""
            }
            ),
            e("", t.last())) : (0 === a.indexOf("<!--") ? (f = a.indexOf("--", 4),
            f >= 0 && a.lastIndexOf("-->", f) === f && (c.comment && c.comment(a.substring(4, f)),
            a = a.substring(f + 3),
            h = !1)) : q.test(a) ? (i = a.match(q),
            i && (a = a.replace(i[0], ""),
            h = !1)) : o.test(a) ? (i = a.match(l),
            i && (a = a.substring(i[0].length),
            i[0].replace(l, e),
            h = !1)) : n.test(a) && (i = a.match(k),
            i ? (i[4] && (a = a.substring(i[0].length),
            i[0].replace(k, d)),
            h = !1) : (s += "<",
            a = a.substring(1))),
            h && (f = a.indexOf("<"),
            s += 0 > f ? a : a.substring(0, f),
            a = 0 > f ? "" : a.substring(f),
            c.chars && c.chars(g(s)))),
            a == v)
                throw j("badparse", "The sanitizer was unable to parse the following block of html: {0}", a);
            v = a
        }
        e()
    }
    function g(a) {
        if (!a)
            return "";
        var b = F.exec(a)
          , c = b[1]
          , d = b[3]
          , e = b[2];
        return e && (E.innerHTML = e.replace(/</g, "&lt;"),
        e = "textContent" in E ? E.textContent : E.innerText),
        c + e + d
    }
    function h(a) {
        return a.replace(/&/g, "&amp;").replace(s, function(a) {
            var b = a.charCodeAt(0)
              , c = a.charCodeAt(1);
            return "&#" + (1024 * (b - 55296) + (c - 56320) + 65536) + ";"
        }
        ).replace(t, function(a) {
            return "&#" + a.charCodeAt(0) + ";"
        }
        ).replace(/</g, "&lt;").replace(/>/g, "&gt;")
    }
    function i(a, c) {
        var d = !1
          , e = b.bind(a, a.push);
        return {
            start: function(a, f, g) {
                a = b.lowercase(a),
                !d && A[a] && (d = a),
                d || B[a] !== !0 || (e("<"),
                e(a),
                b.forEach(f, function(d, f) {
                    var g = b.lowercase(f)
                      , i = "img" === a && "src" === g || "background" === g;
                    D[g] !== !0 || C[g] === !0 && !c(d, i) || (e(" "),
                    e(f),
                    e('="'),
                    e(h(d)),
                    e('"'))
                }
                ),
                e(g ? "/>" : ">"))
            },
            end: function(a) {
                a = b.lowercase(a),
                d || B[a] !== !0 || (e("</"),
                e(a),
                e(">")),
                a == d && (d = !1)
            },
            chars: function(a) {
                d || e(h(a))
            }
        }
    }
    var j = b.$$minErr("$sanitize")
      , k = /^<((?:[a-zA-Z])[\w:-]*)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*(>?)/
      , l = /^<\/\s*([\w:-]+)[^>]*>/
      , m = /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g
      , n = /^</
      , o = /^<\//
      , p = /<!--(.*?)-->/g
      , q = /<!DOCTYPE([^>]*?)>/i
      , r = /<!\[CDATA\[(.*?)]]>/g
      , s = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g
      , t = /([^\#-~| |!])/g
      , u = e("area,br,col,hr,img,wbr")
      , v = e("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr")
      , w = e("rp,rt")
      , x = b.extend({}, w, v)
      , y = b.extend({}, v, e("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul"))
      , z = b.extend({}, w, e("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var"))
      , A = e("script,style")
      , B = b.extend({}, u, y, z, x)
      , C = e("background,cite,href,longdesc,src,usemap")
      , D = b.extend({}, C, e("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,size,span,start,summary,target,title,type,valign,value,vspace,width"))
      , E = document.createElement("pre")
      , F = /^(\s*)([\s\S]*?)(\s*)$/;
    b.module("ngSanitize", []).provider("$sanitize", c),
    b.module("ngSanitize").filter("linky", ["$sanitize", function(a) {
        var c = /((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>"]/
          , e = /^mailto:/;
        return function(f, g) {
            function h(a) {
                a && n.push(d(a))
            }
            function i(a, c) {
                n.push("<a "),
                b.isDefined(g) && (n.push('target="'),
                n.push(g),
                n.push('" ')),
                n.push('href="', a.replace('"', "&quot;"), '">'),
                h(c),
                n.push("</a>")
            }
            if (!f)
                return f;
            for (var j, k, l, m = f, n = []; j = m.match(c); )
                k = j[0],
                j[2] == j[3] && (k = "mailto:" + k),
                l = j.index,
                h(m.substr(0, l)),
                i(k, j[0].replace(e, "")),
                m = m.substring(l + j[0].length);
            return h(m),
            a(n.join(""))
        }
    }
    ])
}
(window, window.angular),
function(a, b) {
    "use strict";
    function c() {
        function a(a, c) {
            return b.extend(new (b.extend(function() {}
            , {
                prototype: a
            })), c)
        }
        function c(a, b) {
            var c = b.caseInsensitiveMatch
              , d = {
                originalPath: a,
                regexp: a
            }
              , e = d.keys = [];
            return a = a.replace(/([().])/g, "\\$1").replace(/(\/)?:(\w+)([\?\*])?/g, function(a, b, c, d) {
                var f = "?" === d ? d : null
                  , g = "*" === d ? d : null ;
                return e.push({
                    name: c,
                    optional: !!f
                }),
                b = b || "",
                "" + (f ? "" : b) + "(?:" + (f ? b : "") + (g && "(.+?)" || "([^/]+)") + (f || "") + ")" + (f || "")
            }
            ).replace(/([\/$\*])/g, "\\$1"),
            d.regexp = new RegExp("^" + a + "$",c ? "i" : ""),
            d
        }
        var d = {};
        this.when = function(a, e) {
            if (d[a] = b.extend({
                reloadOnSearch: !0
            }, e, a && c(a, e)),
            a) {
                var f = "/" == a[a.length - 1] ? a.substr(0, a.length - 1) : a + "/";
                d[f] = b.extend({
                    redirectTo: a
                }, c(f, e))
            }
            return this
        }
        ,
        this.otherwise = function(a) {
            return this.when(null , a),
            this
        }
        ,
        this.$get = ["$rootScope", "$location", "$routeParams", "$q", "$injector", "$http", "$templateCache", "$sce", function(c, e, f, g, h, i, j, k) {
            function l(a, b) {
                var c = b.keys
                  , d = {};
                if (!b.regexp)
                    return null ;
                var e = b.regexp.exec(a);
                if (!e)
                    return null ;
                for (var f = 1, g = e.length; g > f; ++f) {
                    var h = c[f - 1]
                      , i = e[f];
                    h && i && (d[h.name] = i)
                }
                return d
            }
            function m() {
                var a = n()
                  , d = q.current;
                a && d && a.$$route === d.$$route && b.equals(a.pathParams, d.pathParams) && !a.reloadOnSearch && !p ? (d.params = a.params,
                b.copy(d.params, f),
                c.$broadcast("$routeUpdate", d)) : (a || d) && (p = !1,
                c.$broadcast("$routeChangeStart", a, d),
                q.current = a,
                a && a.redirectTo && (b.isString(a.redirectTo) ? e.path(o(a.redirectTo, a.params)).search(a.params).replace() : e.url(a.redirectTo(a.pathParams, e.path(), e.search())).replace()),
                g.when(a).then(function() {
                    if (a) {
                        var c, d, e = b.extend({}, a.resolve);
                        return b.forEach(e, function(a, c) {
                            e[c] = b.isString(a) ? h.get(a) : h.invoke(a)
                        }
                        ),
                        b.isDefined(c = a.template) ? b.isFunction(c) && (c = c(a.params)) : b.isDefined(d = a.templateUrl) && (b.isFunction(d) && (d = d(a.params)),
                        d = k.getTrustedResourceUrl(d),
                        b.isDefined(d) && (a.loadedTemplateUrl = d,
                        c = i.get(d, {
                            cache: j
                        }).then(function(a) {
                            return a.data
                        }
                        ))),
                        b.isDefined(c) && (e.$template = c),
                        g.all(e)
                    }
                }
                ).then(function(e) {
                    a == q.current && (a && (a.locals = e,
                    b.copy(a.params, f)),
                    c.$broadcast("$routeChangeSuccess", a, d))
                }
                , function(b) {
                    a == q.current && c.$broadcast("$routeChangeError", a, d, b)
                }
                ))
            }
            function n() {
                var c, f;
                return b.forEach(d, function(d) {
                    !f && (c = l(e.path(), d)) && (f = a(d, {
                        params: b.extend({}, e.search(), c),
                        pathParams: c
                    }),
                    f.$$route = d)
                }
                ),
                f || d[null ] && a(d[null ], {
                    params: {},
                    pathParams: {}
                })
            }
            function o(a, c) {
                var d = [];
                return b.forEach((a || "").split(":"), function(a, b) {
                    if (0 === b)
                        d.push(a);
                    else {
                        var e = a.match(/(\w+)(?:[?*])?(.*)/)
                          , f = e[1];
                        d.push(c[f]),
                        d.push(e[2] || ""),
                        delete c[f]
                    }
                }
                ),
                d.join("")
            }
            var p = !1
              , q = {
                routes: d,
                reload: function() {
                    p = !0,
                    c.$evalAsync(m)
                }
            };
            return c.$on("$locationChangeSuccess", m),
            q
        }
        ]
    }
    function d() {
        this.$get = function() {
            return {}
        }
    }
    function e(a, c, d) {
        return {
            restrict: "ECA",
            terminal: !0,
            priority: 400,
            transclude: "element",
            link: function(e, f, g, h, i) {
                function j() {
                    n && (n.remove(),
                    n = null ),
                    l && (l.$destroy(),
                    l = null ),
                    m && (d.leave(m, function() {
                        n = null
                    }
                    ),
                    n = m,
                    m = null )
                }
                function k() {
                    var g = a.current && a.current.locals
                      , h = g && g.$template;
                    if (b.isDefined(h)) {
                        var k = e.$new()
                          , n = a.current
                          , q = i(k, function(a) {
                            d.enter(a, null , m || f, function() {
                                !b.isDefined(o) || o && !e.$eval(o) || c()
                            }
                            ),
                            j()
                        }
                        );
                        m = q,
                        l = n.scope = k,
                        l.$emit("$viewContentLoaded"),
                        l.$eval(p)
                    } else
                        j()
                }
                var l, m, n, o = g.autoscroll, p = g.onload || "";
                e.$on("$routeChangeSuccess", k),
                k()
            }
        }
    }
    function f(a, b, c) {
        return {
            restrict: "ECA",
            priority: -400,
            link: function(d, e) {
                var f = c.current
                  , g = f.locals;
                e.html(g.$template);
                var h = a(e.contents());
                if (f.controller) {
                    g.$scope = d;
                    var i = b(f.controller, g);
                    f.controllerAs && (d[f.controllerAs] = i),
                    e.data("$ngControllerController", i),
                    e.children().data("$ngControllerController", i)
                }
                h(d)
            }
        }
    }
    var g = b.module("ngRoute", ["ng"]).provider("$route", c);
    g.provider("$routeParams", d),
    g.directive("ngView", e),
    g.directive("ngView", f),
    e.$inject = ["$route", "$anchorScroll", "$animate"],
    f.$inject = ["$compile", "$controller", "$route"]
}
(window, window.angular),
function(a, b, c) {
    "use strict";
    b.module("ngAnimate", ["ng"]).directive("ngAnimateChildren", function() {
        var a = "$$ngAnimateChildren";
        return function(c, d, e) {
            var f = e.ngAnimateChildren;
            b.isString(f) && 0 === f.length ? d.data(a, !0) : c.$watch(f, function(b) {
                d.data(a, !!b)
            }
            )
        }
    }
    ).factory("$$animateReflow", ["$$rAF", "$document", function(a, b) {
        var c = b[0].body;
        return function(b) {
            return a(function() {
                c.offsetWidth + 1;
                b()
            }
            )
        }
    }
    ]).config(["$provide", "$animateProvider", function(d, e) {
        function f(a) {
            for (var b = 0; b < a.length; b++) {
                var c = a[b];
                if (c.nodeType == m)
                    return c
            }
        }
        function g(a) {
            return a && b.element(a)
        }
        function h(a) {
            return b.element(f(a))
        }
        function i(a, b) {
            return f(a) == f(b)
        }
        var j = b.noop
          , k = b.forEach
          , l = e.$$selectors
          , m = 1
          , n = "$$ngAnimateState"
          , o = "$$ngAnimateChildren"
          , p = "ng-animate"
          , q = {
            running: !0
        };
        d.decorator("$animate", ["$delegate", "$injector", "$sniffer", "$rootElement", "$$asyncCallback", "$rootScope", "$document", function(a, c, d, m, r, s) {
            function t(a) {
                var b = a.data(n) || {};
                b.running = !0,
                a.data(n, b)
            }
            function u(a) {
                if (a) {
                    var b = []
                      , e = {}
                      , f = a.substr(1).split(".");
                    (d.transitions || d.animations) && b.push(c.get(l[""]));
                    for (var g = 0; g < f.length; g++) {
                        var h = f[g]
                          , i = l[h];
                        i && !e[h] && (b.push(c.get(i)),
                        e[h] = !0)
                    }
                    return b
                }
            }
            function v(a, c, d) {
                function e(a, b) {
                    var c = a[b]
                      , d = a["before" + b.charAt(0).toUpperCase() + b.substr(1)];
                    return c || d ? ("leave" == b && (d = c,
                    c = null ),
                    v.push({
                        event: b,
                        fn: c
                    }),
                    r.push({
                        event: b,
                        fn: d
                    }),
                    !0) : void 0
                }
                function f(b, c, e) {
                    function f(a) {
                        if (c) {
                            if ((c[a] || j)(),
                            ++l < g.length)
                                return;
                            c = null
                        }
                        e()
                    }
                    var g = [];
                    k(b, function(a) {
                        a.fn && g.push(a)
                    }
                    );
                    var l = 0;
                    k(g, function(b, e) {
                        var g = function() {
                            f(e)
                        }
                        ;
                        switch (b.event) {
                        case "setClass":
                            c.push(b.fn(a, h, i, g));
                            break;
                        case "addClass":
                            c.push(b.fn(a, h || d, g));
                            break;
                        case "removeClass":
                            c.push(b.fn(a, i || d, g));
                            break;
                        default:
                            c.push(b.fn(a, g))
                        }
                    }
                    ),
                    c && 0 === c.length && e()
                }
                var g = a[0];
                if (g) {
                    var h, i, l = "setClass" == c, m = l || "addClass" == c || "removeClass" == c;
                    b.isArray(d) && (h = d[0],
                    i = d[1],
                    d = h + " " + i);
                    var n = a.attr("class")
                      , o = n + " " + d;
                    if (C(o)) {
                        var p = j
                          , q = []
                          , r = []
                          , s = j
                          , t = []
                          , v = []
                          , w = (" " + o).replace(/\s+/g, ".");
                        return k(u(w), function(a) {
                            var b = e(a, c);
                            !b && l && (e(a, "addClass"),
                            e(a, "removeClass"))
                        }
                        ),
                        {
                            node: g,
                            event: c,
                            className: d,
                            isClassBased: m,
                            isSetClassOperation: l,
                            before: function(a) {
                                p = a,
                                f(r, q, function() {
                                    p = j,
                                    a()
                                }
                                )
                            },
                            after: function(a) {
                                s = a,
                                f(v, t, function() {
                                    s = j,
                                    a()
                                }
                                )
                            },
                            cancel: function() {
                                q && (k(q, function(a) {
                                    (a || j)(!0)
                                }
                                ),
                                p(!0)),
                                t && (k(t, function(a) {
                                    (a || j)(!0)
                                }
                                ),
                                s(!0))
                            }
                        }
                    }
                }
            }
            function w(a, c, d, e, f, g, h) {
                function i(b) {
                    var e = "$animate:" + b;
                    t && t[e] && t[e].length > 0 && r(function() {
                        d.triggerHandler(e, {
                            event: a,
                            className: c
                        })
                    }
                    )
                }
                function j() {
                    i("before")
                }
                function l() {
                    i("after")
                }
                function m() {
                    i("close"),
                    h && r(function() {
                        h()
                    }
                    )
                }
                function o() {
                    o.hasBeenRun || (o.hasBeenRun = !0,
                    g())
                }
                function q() {
                    if (!q.hasBeenRun) {
                        q.hasBeenRun = !0;
                        var b = d.data(n);
                        b && (s && s.isClassBased ? y(d, c) : (r(function() {
                            var b = d.data(n) || {};
                            H == b.index && y(d, c, a)
                        }
                        ),
                        d.data(n, b))),
                        m()
                    }
                }
                var s = v(d, a, c);
                if (!s)
                    return o(),
                    j(),
                    l(),
                    void q();
                c = s.className;
                var t = b.element._data(s.node);
                t = t && t.events,
                e || (e = f ? f.parent() : d.parent());
                var u, w = d.data(n) || {}, x = w.active || {}, B = w.totalActive || 0, C = w.last;
                if (s.isClassBased && (u = w.running || w.disabled || C && !C.isClassBased),
                u || z(d, e))
                    return o(),
                    j(),
                    l(),
                    void q();
                var D = !1;
                if (B > 0) {
                    var E = [];
                    if (s.isClassBased) {
                        if ("setClass" == C.event)
                            E.push(C),
                            y(d, c);
                        else if (x[c]) {
                            var F = x[c];
                            F.event == a ? D = !0 : (E.push(F),
                            y(d, c))
                        }
                    } else if ("leave" == a && x["ng-leave"])
                        D = !0;
                    else {
                        for (var G in x)
                            E.push(x[G]),
                            y(d, G);
                        x = {},
                        B = 0
                    }
                    E.length > 0 && k(E, function(a) {
                        a.cancel()
                    }
                    )
                }
                if (!s.isClassBased || s.isSetClassOperation || D || (D = "addClass" == a == d.hasClass(c)),
                D)
                    return o(),
                    j(),
                    l(),
                    void m();
                "leave" == a && d.one("$destroy", function() {
                    var a = b.element(this)
                      , c = a.data(n);
                    if (c) {
                        var d = c.active["ng-leave"];
                        d && (d.cancel(),
                        y(a, "ng-leave"))
                    }
                }
                ),
                d.addClass(p);
                var H = A++;
                B++,
                x[c] = s,
                d.data(n, {
                    last: s,
                    active: x,
                    index: H,
                    totalActive: B
                }),
                j(),
                s.before(function(b) {
                    var e = d.data(n);
                    b = b || !e || !e.active[c] || s.isClassBased && e.active[c].event != a,
                    o(),
                    b === !0 ? q() : (l(),
                    s.after(q))
                }
                )
            }
            function x(a) {
                var c = f(a);
                if (c) {
                    var d = b.isFunction(c.getElementsByClassName) ? c.getElementsByClassName(p) : c.querySelectorAll("." + p);
                    k(d, function(a) {
                        a = b.element(a);
                        var c = a.data(n);
                        c && c.active && k(c.active, function(a) {
                            a.cancel()
                        }
                        )
                    }
                    )
                }
            }
            function y(a, b) {
                if (i(a, m))
                    q.disabled || (q.running = !1,
                    q.structural = !1);
                else if (b) {
                    var c = a.data(n) || {}
                      , d = b === !0;
                    !d && c.active && c.active[b] && (c.totalActive--,
                    delete c.active[b]),
                    (d || !c.totalActive) && (a.removeClass(p),
                    a.removeData(n))
                }
            }
            function z(a, c) {
                if (q.disabled)
                    return !0;
                if (i(a, m))
                    return q.running;
                var d, e, f;
                do {
                    if (0 === c.length)
                        break;
                    var g = i(c, m)
                      , h = g ? q : c.data(n) || {};
                    if (h.disabled)
                        return !0;
                    if (g && (f = !0),
                    d !== !1) {
                        var j = c.data(o);
                        b.isDefined(j) && (d = j)
                    }
                    e = e || h.running || h.last && !h.last.isClassBased
                } while (c = c.parent());return !f || !d && e
            }
            var A = 0;
            m.data(n, q),
            s.$$postDigest(function() {
                s.$$postDigest(function() {
                    q.running = !1
                }
                )
            }
            );
            var B = e.classNameFilter()
              , C = B ? function(a) {
                return B.test(a)
            }
             : function() {
                return !0
            }
            ;
            return {
                enter: function(c, d, e, f) {
                    c = b.element(c),
                    d = g(d),
                    e = g(e),
                    t(c),
                    a.enter(c, d, e),
                    s.$$postDigest(function() {
                        c = h(c),
                        w("enter", "ng-enter", c, d, e, j, f)
                    }
                    )
                },
                leave: function(c, d) {
                    c = b.element(c),
                    x(c),
                    t(c),
                    s.$$postDigest(function() {
                        w("leave", "ng-leave", h(c), null , null , function() {
                            a.leave(c)
                        }
                        , d)
                    }
                    )
                },
                move: function(c, d, e, f) {
                    c = b.element(c),
                    d = g(d),
                    e = g(e),
                    x(c),
                    t(c),
                    a.move(c, d, e),
                    s.$$postDigest(function() {
                        c = h(c),
                        w("move", "ng-move", c, d, e, j, f)
                    }
                    )
                },
                addClass: function(c, d, e) {
                    c = b.element(c),
                    c = h(c),
                    w("addClass", d, c, null , null , function() {
                        a.addClass(c, d)
                    }
                    , e)
                },
                removeClass: function(c, d, e) {
                    c = b.element(c),
                    c = h(c),
                    w("removeClass", d, c, null , null , function() {
                        a.removeClass(c, d)
                    }
                    , e)
                },
                setClass: function(c, d, e, f) {
                    c = b.element(c),
                    c = h(c),
                    w("setClass", [d, e], c, null , null , function() {
                        a.setClass(c, d, e)
                    }
                    , f)
                },
                enabled: function(a, b) {
                    switch (arguments.length) {
                    case 2:
                        if (a)
                            y(b);
                        else {
                            var c = b.data(n) || {};
                            c.disabled = !0,
                            b.data(n, c)
                        }
                        break;
                    case 1:
                        q.disabled = !a;
                        break;
                    default:
                        a = !q.disabled
                    }
                    return !!a
                }
            }
        }
        ]),
        e.register("", ["$window", "$sniffer", "$timeout", "$$animateReflow", function(d, e, g, h) {
            function i() {
                K || (K = h(function() {
                    X = [],
                    K = null ,
                    V = {}
                }
                ))
            }
            function l(a, b) {
                K && K(),
                X.push(b),
                K = h(function() {
                    k(X, function(a) {
                        a()
                    }
                    ),
                    X = [],
                    K = null ,
                    V = {}
                }
                )
            }
            function n(a, c) {
                var d = f(a);
                a = b.element(d),
                $.push(a);
                var e = Date.now() + c;
                Z >= e || (g.cancel(Y),
                Z = e,
                Y = g(function() {
                    o($),
                    $ = []
                }
                , c, !1))
            }
            function o(a) {
                k(a, function(a) {
                    var b = a.data(Q);
                    b && (b.closeAnimationFn || j)()
                }
                )
            }
            function p(a, b) {
                var c = b ? V[b] : null ;
                if (!c) {
                    var e, f, g, h, i = 0, j = 0, l = 0, n = 0;
                    k(a, function(a) {
                        if (a.nodeType == m) {
                            var b = d.getComputedStyle(a) || {};
                            g = b[F + L],
                            i = Math.max(q(g), i),
                            h = b[F + M],
                            e = b[F + N],
                            j = Math.max(q(e), j),
                            f = b[H + N],
                            n = Math.max(q(f), n);
                            var c = q(b[H + L]);
                            c > 0 && (c *= parseInt(b[H + O], 10) || 1),
                            l = Math.max(c, l)
                        }
                    }
                    ),
                    c = {
                        total: 0,
                        transitionPropertyStyle: h,
                        transitionDurationStyle: g,
                        transitionDelayStyle: e,
                        transitionDelay: j,
                        transitionDuration: i,
                        animationDelayStyle: f,
                        animationDelay: n,
                        animationDuration: l
                    },
                    b && (V[b] = c)
                }
                return c
            }
            function q(a) {
                var c = 0
                  , d = b.isString(a) ? a.split(/\s*,\s*/) : [];
                return k(d, function(a) {
                    c = Math.max(parseFloat(a) || 0, c)
                }
                ),
                c
            }
            function r(a) {
                var b = a.parent()
                  , c = b.data(P);
                return c || (b.data(P, ++W),
                c = W),
                c + "-" + f(a).getAttribute("class")
            }
            function s(a, b, c, d) {
                var e = r(b)
                  , f = e + " " + c
                  , g = V[f] ? ++V[f].total : 0
                  , h = {};
                if (g > 0) {
                    var i = c + "-stagger"
                      , k = e + " " + i
                      , l = !V[k];
                    l && b.addClass(i),
                    h = p(b, k),
                    l && b.removeClass(i)
                }
                d = d || function(a) {
                    return a()
                }
                ,
                b.addClass(c);
                var m = b.data(Q) || {}
                  , n = d(function() {
                    return p(b, f)
                }
                )
                  , o = n.transitionDuration
                  , q = n.animationDuration;
                if (0 === o && 0 === q)
                    return b.removeClass(c),
                    !1;
                b.data(Q, {
                    running: m.running || 0,
                    itemIndex: g,
                    stagger: h,
                    timings: n,
                    closeAnimationFn: j
                });
                var s = m.running > 0 || "setClass" == a;
                return o > 0 && u(b, c, s),
                q > 0 && h.animationDelay > 0 && 0 === h.animationDuration && v(b),
                !0
            }
            function t(a) {
                return "ng-enter" == a || "ng-move" == a || "ng-leave" == a
            }
            function u(a, b, c) {
                t(b) || !c ? f(a).style[F + M] = "none" : a.addClass(R)
            }
            function v(a) {
                f(a).style[H] = "none 0s"
            }
            function w(a) {
                var b = F + M
                  , c = f(a);
                c.style[b] && c.style[b].length > 0 && (c.style[b] = ""),
                a.removeClass(R)
            }
            function x(a) {
                var b = H
                  , c = f(a);
                c.style[b] && c.style[b].length > 0 && (c.style[b] = "")
            }
            function y(a, b, c, d) {
                function e() {
                    b.off(t, g),
                    b.removeClass(j),
                    D(b, c);
                    var a = f(b);
                    for (var d in v)
                        a.style.removeProperty(v[d])
                }
                function g(a) {
                    a.stopPropagation();
                    var b = a.originalEvent || a
                      , c = b.$manualTimeStamp || b.timeStamp || Date.now()
                      , e = parseFloat(b.elapsedTime.toFixed(S));
                    Math.max(c - s, 0) >= r && e >= p && d()
                }
                var h = f(b)
                  , i = b.data(Q);
                if (-1 == h.getAttribute("class").indexOf(c) || !i)
                    return void d();
                var j = "";
                k(c.split(" "), function(a, b) {
                    j += (b > 0 ? " " : "") + a + "-active"
                }
                );
                var l = i.stagger
                  , m = i.timings
                  , o = i.itemIndex
                  , p = Math.max(m.transitionDuration, m.animationDuration)
                  , q = Math.max(m.transitionDelay, m.animationDelay)
                  , r = q * U
                  , s = Date.now()
                  , t = I + " " + G
                  , u = ""
                  , v = [];
                if (m.transitionDuration > 0) {
                    var w = m.transitionPropertyStyle;
                    -1 == w.indexOf("all") && (u += J + "transition-property: " + w + ";",
                    u += J + "transition-duration: " + m.transitionDurationStyle + ";",
                    v.push(J + "transition-property"),
                    v.push(J + "transition-duration"))
                }
                if (o > 0) {
                    if (l.transitionDelay > 0 && 0 === l.transitionDuration) {
                        var x = m.transitionDelayStyle;
                        u += J + "transition-delay: " + z(x, l.transitionDelay, o) + "; ",
                        v.push(J + "transition-delay")
                    }
                    l.animationDelay > 0 && 0 === l.animationDuration && (u += J + "animation-delay: " + z(m.animationDelayStyle, l.animationDelay, o) + "; ",
                    v.push(J + "animation-delay"))
                }
                if (v.length > 0) {
                    var y = h.getAttribute("style") || "";
                    h.setAttribute("style", y + "; " + u)
                }
                b.on(t, g),
                b.addClass(j),
                i.closeAnimationFn = function() {
                    e(),
                    d()
                }
                ;
                var A = o * (Math.max(l.animationDelay, l.transitionDelay) || 0)
                  , B = (q + p) * T
                  , C = (A + B) * U;
                return i.running++,
                n(b, C),
                e
            }
            function z(a, b, c) {
                var d = "";
                return k(a.split(","), function(a, e) {
                    d += (e > 0 ? "," : "") + (c * b + parseInt(a, 10)) + "s"
                }
                ),
                d
            }
            function A(a, b, c, d) {
                return s(a, b, c, d) ? function(a) {
                    a && D(b, c)
                }
                 : void 0
            }
            function B(a, b, c, d) {
                return b.data(Q) ? y(a, b, c, d) : (D(b, c),
                void d())
            }
            function C(a, b, c, d) {
                var e = A(a, b, c);
                if (!e)
                    return i(),
                    void d();
                var f = e;
                return l(b, function() {
                    w(b, c),
                    x(b),
                    f = B(a, b, c, d)
                }
                ),
                function(a) {
                    (f || j)(a)
                }
            }
            function D(a, b) {
                a.removeClass(b);
                var c = a.data(Q);
                c && (c.running && c.running--,
                c.running && 0 !== c.running || a.removeData(Q))
            }
            function E(a, c) {
                var d = "";
                return a = b.isArray(a) ? a : a.split(/\s+/),
                k(a, function(a, b) {
                    a && a.length > 0 && (d += (b > 0 ? " " : "") + a + c)
                }
                ),
                d
            }
            var F, G, H, I, J = "";
            a.ontransitionend === c && a.onwebkittransitionend !== c ? (J = "-webkit-",
            F = "WebkitTransition",
            G = "webkitTransitionEnd transitionend") : (F = "transition",
            G = "transitionend"),
            a.onanimationend === c && a.onwebkitanimationend !== c ? (J = "-webkit-",
            H = "WebkitAnimation",
            I = "webkitAnimationEnd animationend") : (H = "animation",
            I = "animationend");
            var K, L = "Duration", M = "Property", N = "Delay", O = "IterationCount", P = "$$ngAnimateKey", Q = "$$ngAnimateCSS3Data", R = "ng-animate-block-transitions", S = 3, T = 1.5, U = 1e3, V = {}, W = 0, X = [], Y = null , Z = 0, $ = [];
            return {
                enter: function(a, b) {
                    return C("enter", a, "ng-enter", b)
                },
                leave: function(a, b) {
                    return C("leave", a, "ng-leave", b)
                },
                move: function(a, b) {
                    return C("move", a, "ng-move", b)
                },
                beforeSetClass: function(a, b, c, d) {
                    var e = E(c, "-remove") + " " + E(b, "-add")
                      , f = A("setClass", a, e, function(d) {
                        var e = a.attr("class");
                        a.removeClass(c),
                        a.addClass(b);
                        var f = d();
                        return a.attr("class", e),
                        f
                    }
                    );
                    return f ? (l(a, function() {
                        w(a, e),
                        x(a),
                        d()
                    }
                    ),
                    f) : (i(),
                    void d())
                },
                beforeAddClass: function(a, b, c) {
                    var d = A("addClass", a, E(b, "-add"), function(c) {
                        a.addClass(b);
                        var d = c();
                        return a.removeClass(b),
                        d
                    }
                    );
                    return d ? (l(a, function() {
                        w(a, b),
                        x(a),
                        c()
                    }
                    ),
                    d) : (i(),
                    void c())
                },
                setClass: function(a, b, c, d) {
                    c = E(c, "-remove"),
                    b = E(b, "-add");
                    var e = c + " " + b;
                    return B("setClass", a, e, d)
                },
                addClass: function(a, b, c) {
                    return B("addClass", a, E(b, "-add"), c)
                },
                beforeRemoveClass: function(a, b, c) {
                    var d = A("removeClass", a, E(b, "-remove"), function(c) {
                        var d = a.attr("class");
                        a.removeClass(b);
                        var e = c();
                        return a.attr("class", d),
                        e
                    }
                    );
                    return d ? (l(a, function() {
                        w(a, b),
                        x(a),
                        c()
                    }
                    ),
                    d) : void c()
                },
                removeClass: function(a, b, c) {
                    return B("removeClass", a, E(b, "-remove"), c)
                }
            }
        }
        ])
    }
    ])
}
(window, window.angular),
function(a, b, c) {
    "use strict";
    function d(a, c, d, e, f, g) {
        function h(a, c) {
            return angular.element((c || b).querySelectorAll(a))
        }
        function i(a) {
            return j[a] ? j[a] : j[a] = c.get(a, {
                cache: g
            }).then(function(a) {
                return a.data
            }
            )
        }
        this.compile = function(b) {
            b.template && /\.html$/.test(b.template) && (console.warn("Deprecated use of `template` option to pass a file. Please use the `templateUrl` option instead."),
            b.templateUrl = b.template,
            b.template = "");
            var c = b.templateUrl
              , g = b.template || ""
              , j = b.controller
              , k = b.controllerAs
              , l = angular.copy(b.resolve || {})
              , m = angular.copy(b.locals || {})
              , n = b.transformTemplate || angular.identity
              , o = b.bindToController;
            return angular.forEach(l, function(a, b) {
                l[b] = angular.isString(a) ? d.get(a) : d.invoke(a)
            }
            ),
            angular.extend(l, m),
            l.$template = c ? i(c) : a.when(g),
            b.contentTemplate && (l.$template = a.all([l.$template, i(b.contentTemplate)]).then(function(a) {
                var c = angular.element(a[0])
                  , d = h('[ng-bind="content"]', c[0]).removeAttr("ng-bind").html(a[1]);
                return b.templateUrl || d.next().remove(),
                c[0].outerHTML
            }
            )),
            a.all(l).then(function(a) {
                var c = n(a.$template);
                b.html && (c = c.replace(/ng-bind="/gi, 'ng-bind-html="'));
                var d = angular.element("<div>").html(c.trim()).contents()
                  , g = e(d);
                return {
                    locals: a,
                    element: d,
                    link: function(b) {
                        if (a.$scope = b,
                        j) {
                            var c = f(j, a, !0);
                            o && angular.extend(c.instance, a);
                            var e = angular.isObject(c) ? c : c();
                            d.data("$ngControllerController", e),
                            d.children().data("$ngControllerController", e),
                            k && (b[k] = e)
                        }
                        return g.apply(null , arguments)
                    }
                }
            }
            )
        }
        ;
        var j = {}
    }
    angular.module("mgcrea.ngStrap", ["mgcrea.ngStrap.modal", "mgcrea.ngStrap.aside", "mgcrea.ngStrap.alert", "mgcrea.ngStrap.button", "mgcrea.ngStrap.select", "mgcrea.ngStrap.datepicker", "mgcrea.ngStrap.timepicker", "mgcrea.ngStrap.navbar", "mgcrea.ngStrap.tooltip", "mgcrea.ngStrap.popover", "mgcrea.ngStrap.dropdown", "mgcrea.ngStrap.typeahead", "mgcrea.ngStrap.scrollspy", "mgcrea.ngStrap.affix", "mgcrea.ngStrap.tab", "mgcrea.ngStrap.collapse"]),
    angular.module("mgcrea.ngStrap.affix", ["mgcrea.ngStrap.helpers.dimensions", "mgcrea.ngStrap.helpers.debounce"]).provider("$affix", function() {
        var a = this.defaults = {
            offsetTop: "auto",
            inlineStyles: !0
        };
        this.$get = ["$window", "debounce", "dimensions", function(b, c, d) {
            function e(e, h) {
                function i(a, b, c) {
                    var d = j()
                      , e = k();
                    return s >= d ? "top" : null  !== a && d + a <= b.top ? "middle" : null  !== t && b.top + c + q >= e - t ? "bottom" : "middle"
                }
                function j() {
                    return n[0] === b ? b.pageYOffset : n[0].scrollTop
                }
                function k() {
                    return n[0] === b ? b.document.body.scrollHeight : n[0].scrollHeight
                }
                var l = {}
                  , m = angular.extend({}, a, h)
                  , n = m.target
                  , o = "affix affix-top affix-bottom"
                  , p = !1
                  , q = 0
                  , r = 0
                  , s = 0
                  , t = 0
                  , u = null
                  , v = null
                  , w = e.parent();
                if (m.offsetParent)
                    if (m.offsetParent.match(/^\d+$/))
                        for (var x = 0; x < 1 * m.offsetParent - 1; x++)
                            w = w.parent();
                    else
                        w = angular.element(m.offsetParent);
                return l.init = function() {
                    this.$parseOffsets(),
                    r = d.offset(e[0]).top + q,
                    p = !e[0].style.width,
                    n.on("scroll", this.checkPosition),
                    n.on("click", this.checkPositionWithEventLoop),
                    g.on("resize", this.$debouncedOnResize),
                    this.checkPosition(),
                    this.checkPositionWithEventLoop()
                }
                ,
                l.destroy = function() {
                    n.off("scroll", this.checkPosition),
                    n.off("click", this.checkPositionWithEventLoop),
                    g.off("resize", this.$debouncedOnResize)
                }
                ,
                l.checkPositionWithEventLoop = function() {
                    setTimeout(l.checkPosition, 1)
                }
                ,
                l.checkPosition = function() {
                    var a = j()
                      , b = d.offset(e[0])
                      , c = d.height(e[0])
                      , g = i(v, b, c);
                    u !== g && (u = g,
                    e.removeClass(o).addClass("affix" + ("middle" !== g ? "-" + g : "")),
                    "top" === g ? (v = null ,
                    p && e.css("width", ""),
                    m.inlineStyles && (e.css("position", m.offsetParent ? "" : "relative"),
                    e.css("top", ""))) : "bottom" === g ? (v = m.offsetUnpin ? -(1 * m.offsetUnpin) : b.top - a,
                    p && e.css("width", ""),
                    m.inlineStyles && (e.css("position", m.offsetParent ? "" : "relative"),
                    e.css("top", m.offsetParent ? "" : f[0].offsetHeight - t - c - r + "px"))) : (v = null ,
                    p && e.css("width", e[0].offsetWidth + "px"),
                    m.inlineStyles && (e.css("position", "fixed"),
                    e.css("top", q + "px"))))
                }
                ,
                l.$onResize = function() {
                    l.$parseOffsets(),
                    l.checkPosition()
                }
                ,
                l.$debouncedOnResize = c(l.$onResize, 50),
                l.$parseOffsets = function() {
                    var a = e.css("position");
                    m.inlineStyles && e.css("position", m.offsetParent ? "" : "relative"),
                    m.offsetTop && ("auto" === m.offsetTop && (m.offsetTop = "+0"),
                    m.offsetTop.match(/^[-+]\d+$/) ? (q = 1 * -m.offsetTop,
                    s = m.offsetParent ? d.offset(w[0]).top + 1 * m.offsetTop : d.offset(e[0]).top - d.css(e[0], "marginTop", !0) + 1 * m.offsetTop) : s = 1 * m.offsetTop),
                    m.offsetBottom && (t = m.offsetParent && m.offsetBottom.match(/^[-+]\d+$/) ? k() - (d.offset(w[0]).top + d.height(w[0])) + 1 * m.offsetBottom + 1 : 1 * m.offsetBottom),
                    m.inlineStyles && e.css("position", a)
                }
                ,
                l.init(),
                l
            }
            var f = angular.element(b.document.body)
              , g = angular.element(b);
            return e
        }
        ]
    }
    ).directive("bsAffix", ["$affix", "$window", function(a, b) {
        return {
            restrict: "EAC",
            require: "^?bsAffixTarget",
            link: function(c, d, e, f) {
                var g = {
                    scope: c,
                    target: f ? f.$element : angular.element(b)
                };
                angular.forEach(["offsetTop", "offsetBottom", "offsetParent", "offsetUnpin", "inlineStyles"], function(a) {
                    if (angular.isDefined(e[a])) {
                        var b = e[a];
                        /true/i.test(b) && (b = !0),
                        /false/i.test(b) && (b = !1),
                        g[a] = b
                    }
                }
                );
                var h = a(d, g);
                c.$on("$destroy", function() {
                    h && h.destroy(),
                    g = null ,
                    h = null
                }
                )
            }
        }
    }
    ]).directive("bsAffixTarget", function() {
        return {
            controller: ["$element", function(a) {
                this.$element = a
            }
            ]
        }
    }
    ),
    angular.module("mgcrea.ngStrap.alert", ["mgcrea.ngStrap.modal"]).provider("$alert", function() {
        var a = this.defaults = {
            animation: "am-fade",
            prefixClass: "alert",
            prefixEvent: "alert",
            placement: null ,
            templateUrl: "alert/alert.tpl.html",
            container: !1,
            element: null ,
            backdrop: !1,
            keyboard: !0,
            show: !0,
            duration: !1,
            type: !1,
            dismissable: !0
        };
        this.$get = ["$modal", "$timeout", function(b, c) {
            function d(d) {
                var e = {}
                  , f = angular.extend({}, a, d);
                e = b(f),
                e.$scope.dismissable = !!f.dismissable,
                f.type && (e.$scope.type = f.type);
                var g = e.show;
                return f.duration && (e.show = function() {
                    g(),
                    c(function() {
                        e.hide()
                    }
                    , 1e3 * f.duration)
                }
                ),
                e
            }
            return d
        }
        ]
    }
    ).directive("bsAlert", ["$window", "$sce", "$alert", function(a, b, c) {
        a.requestAnimationFrame || a.setTimeout;
        return {
            restrict: "EAC",
            scope: !0,
            link: function(a, d, e) {
                var f = {
                    scope: a,
                    element: d,
                    show: !1
                };
                angular.forEach(["template", "templateUrl", "controller", "controllerAs", "placement", "keyboard", "html", "container", "animation", "duration", "dismissable"], function(a) {
                    angular.isDefined(e[a]) && (f[a] = e[a])
                }
                );
                var g = /^(false|0|)$/i;
                angular.forEach(["keyboard", "html", "container", "dismissable"], function(a) {
                    angular.isDefined(e[a]) && g.test(e[a]) && (f[a] = !1)
                }
                ),
                a.hasOwnProperty("title") || (a.title = ""),
                angular.forEach(["title", "content", "type"], function(c) {
                    e[c] && e.$observe(c, function(d) {
                        a[c] = b.trustAsHtml(d)
                    }
                    )
                }
                ),
                e.bsAlert && a.$watch(e.bsAlert, function(b) {
                    angular.isObject(b) ? angular.extend(a, b) : a.content = b
                }
                , !0);
                var h = c(f);
                d.on(e.trigger || "click", h.toggle),
                a.$on("$destroy", function() {
                    h && h.destroy(),
                    f = null ,
                    h = null
                }
                )
            }
        }
    }
    ]),
    angular.module("mgcrea.ngStrap.aside", ["mgcrea.ngStrap.modal"]).provider("$aside", function() {
        var a = this.defaults = {
            animation: "am-fade-and-slide-right",
            prefixClass: "aside",
            prefixEvent: "aside",
            placement: "right",
            templateUrl: "aside/aside.tpl.html",
            contentTemplate: !1,
            container: !1,
            element: null ,
            backdrop: !0,
            keyboard: !0,
            html: !1,
            show: !0
        };
        this.$get = ["$modal", function(b) {
            function c(c) {
                var d = {}
                  , e = angular.extend({}, a, c);
                return d = b(e)
            }
            return c
        }
        ]
    }
    ).directive("bsAside", ["$window", "$sce", "$aside", function(a, b, c) {
        a.requestAnimationFrame || a.setTimeout;
        return {
            restrict: "EAC",
            scope: !0,
            link: function(a, d, e) {
                var f = {
                    scope: a,
                    element: d,
                    show: !1
                };
                angular.forEach(["template", "templateUrl", "controller", "controllerAs", "contentTemplate", "placement", "backdrop", "keyboard", "html", "container", "animation"], function(a) {
                    angular.isDefined(e[a]) && (f[a] = e[a])
                }
                );
                var g = /^(false|0|)$/i;
                angular.forEach(["backdrop", "keyboard", "html", "container"], function(a) {
                    angular.isDefined(e[a]) && g.test(e[a]) && (f[a] = !1)
                }
                ),
                angular.forEach(["title", "content"], function(c) {
                    e[c] && e.$observe(c, function(d) {
                        a[c] = b.trustAsHtml(d)
                    }
                    )
                }
                ),
                e.bsAside && a.$watch(e.bsAside, function(b) {
                    angular.isObject(b) ? angular.extend(a, b) : a.content = b
                }
                , !0);
                var h = c(f);
                d.on(e.trigger || "click", h.toggle),
                a.$on("$destroy", function() {
                    h && h.destroy(),
                    f = null ,
                    h = null
                }
                )
            }
        }
    }
    ]),
    angular.module("mgcrea.ngStrap.button", []).provider("$button", function() {
        var a = this.defaults = {
            activeClass: "active",
            toggleEvent: "click"
        };
        this.$get = function() {
            return {
                defaults: a
            }
        }
    }
    ).directive("bsCheckboxGroup", function() {
        return {
            restrict: "A",
            require: "ngModel",
            compile: function(a, b) {
                a.attr("data-toggle", "buttons"),
                a.removeAttr("ng-model");
                var c = a[0].querySelectorAll('input[type="checkbox"]');
                angular.forEach(c, function(a) {
                    var c = angular.element(a);
                    c.attr("bs-checkbox", ""),
                    c.attr("ng-model", b.ngModel + "." + c.attr("value"))
                }
                )
            }
        }
    }
    ).directive("bsCheckbox", ["$button", "$$rAF", function(a, b) {
        var c = a.defaults
          , d = /^(true|false|\d+)$/;
        return {
            restrict: "A",
            require: "ngModel",
            link: function(a, e, f, g) {
                var h = c
                  , i = "INPUT" === e[0].nodeName
                  , j = i ? e.parent() : e
                  , k = angular.isDefined(f.trueValue) ? f.trueValue : !0;
                d.test(f.trueValue) && (k = a.$eval(f.trueValue));
                var l = angular.isDefined(f.falseValue) ? f.falseValue : !1;
                d.test(f.falseValue) && (l = a.$eval(f.falseValue));
                var m = "boolean" != typeof k || "boolean" != typeof l;
                m && (g.$parsers.push(function(a) {
                    return a ? k : l
                }
                ),
                g.$formatters.push(function(a) {
                    return angular.equals(a, k)
                }
                ),
                a.$watch(f.ngModel, function() {
                    g.$render()
                }
                )),
                g.$render = function() {
                    var a = angular.equals(g.$modelValue, k);
                    b(function() {
                        i && (e[0].checked = a),
                        j.toggleClass(h.activeClass, a)
                    }
                    )
                }
                ,
                e.bind(h.toggleEvent, function() {
                    a.$apply(function() {
                        i || g.$setViewValue(!j.hasClass("active")),
                        m || g.$render()
                    }
                    )
                }
                )
            }
        }
    }
    ]).directive("bsRadioGroup", function() {
        return {
            restrict: "A",
            require: "ngModel",
            compile: function(a, b) {
                a.attr("data-toggle", "buttons"),
                a.removeAttr("ng-model");
                var c = a[0].querySelectorAll('input[type="radio"]');
                angular.forEach(c, function(a) {
                    angular.element(a).attr("bs-radio", ""),
                    angular.element(a).attr("ng-model", b.ngModel)
                }
                )
            }
        }
    }
    ).directive("bsRadio", ["$button", "$$rAF", function(a, b) {
        var c = a.defaults
          , d = /^(true|false|\d+)$/;
        return {
            restrict: "A",
            require: "ngModel",
            link: function(a, e, f, g) {
                var h, i = c, j = "INPUT" === e[0].nodeName, k = j ? e.parent() : e;
                f.$observe("value", function(b) {
                    h = d.test(b) ? a.$eval(b) : b,
                    g.$render()
                }
                ),
                g.$render = function() {
                    var a = angular.equals(g.$modelValue, h);
                    b(function() {
                        j && (e[0].checked = a),
                        k.toggleClass(i.activeClass, a)
                    }
                    )
                }
                ,
                e.bind(i.toggleEvent, function() {
                    a.$apply(function() {
                        g.$setViewValue(h),
                        g.$render()
                    }
                    )
                }
                )
            }
        }
    }
    ]),
    angular.module("mgcrea.ngStrap.collapse", []).provider("$collapse", function() {
        var a = this.defaults = {
            animation: "am-collapse",
            disallowToggle: !1,
            activeClass: "in",
            startCollapsed: !1,
            allowMultiple: !1
        }
          , b = this.controller = function(b, c, d) {
            function e(a) {
                for (var b = i.$targets.$active, c = 0; c < b.length; c++)
                    a < b[c] && (b[c] = b[c] - 1),
                    b[c] === i.$targets.length && (b[c] = i.$targets.length - 1)
            }
            function f(a) {
                var b = i.$targets.$active;
                return -1 === b.indexOf(a) ? !1 : !0
            }
            function g(a) {
                var b = i.$targets.$active.indexOf(a);
                -1 !== b && i.$targets.$active.splice(b, 1)
            }
            function h(a) {
                i.$options.allowMultiple || i.$targets.$active.splice(0, 1),
                -1 === i.$targets.$active.indexOf(a) && i.$targets.$active.push(a)
            }
            var i = this;
            i.$options = angular.copy(a),
            angular.forEach(["animation", "disallowToggle", "activeClass", "startCollapsed", "allowMultiple"], function(a) {
                angular.isDefined(d[a]) && (i.$options[a] = d[a])
            }
            );
            var j = /^(false|0|)$/i;
            angular.forEach(["disallowToggle", "startCollapsed", "allowMultiple"], function(a) {
                angular.isDefined(d[a]) && j.test(d[a]) && (i.$options[a] = !1)
            }
            ),
            i.$toggles = [],
            i.$targets = [],
            i.$viewChangeListeners = [],
            i.$registerToggle = function(a) {
                i.$toggles.push(a)
            }
            ,
            i.$registerTarget = function(a) {
                i.$targets.push(a)
            }
            ,
            i.$unregisterToggle = function(a) {
                var b = i.$toggles.indexOf(a);
                i.$toggles.splice(b, 1)
            }
            ,
            i.$unregisterTarget = function(a) {
                var b = i.$targets.indexOf(a);
                i.$targets.splice(b, 1),
                i.$options.allowMultiple && g(a),
                e(b),
                i.$viewChangeListeners.forEach(function(a) {
                    a()
                }
                )
            }
            ,
            i.$targets.$active = i.$options.startCollapsed ? [] : [0],
            i.$setActive = b.$setActive = function(a) {
                angular.isArray(a) ? i.$targets.$active = a : i.$options.disallowToggle ? h(a) : f(a) ? g(a) : h(a),
                i.$viewChangeListeners.forEach(function(a) {
                    a()
                }
                )
            }
            ,
            i.$activeIndexes = function() {
                return i.$options.allowMultiple ? i.$targets.$active : 1 === i.$targets.$active.length ? i.$targets.$active[0] : -1
            }
        }
        ;
        this.$get = function() {
            var c = {};
            return c.defaults = a,
            c.controller = b,
            c
        }
    }
    ).directive("bsCollapse", ["$window", "$animate", "$collapse", function(a, b, c) {
        c.defaults;
        return {
            require: ["?ngModel", "bsCollapse"],
            controller: ["$scope", "$element", "$attrs", c.controller],
            link: function(a, b, c, d) {
                var e = d[0]
                  , f = d[1];
                e && (f.$viewChangeListeners.push(function() {
                    e.$setViewValue(f.$activeIndexes())
                }
                ),
                e.$formatters.push(function(a) {
                    if (angular.isArray(a))
                        f.$setActive(a);
                    else {
                        var b = f.$activeIndexes();
                        angular.isArray(b) ? -1 === b.indexOf(1 * a) && f.$setActive(1 * a) : b !== 1 * a && f.$setActive(1 * a)
                    }
                    return a
                }
                ))
            }
        }
    }
    ]).directive("bsCollapseToggle", function() {
        return {
            require: ["^?ngModel", "^bsCollapse"],
            link: function(a, b, c, d) {
                var e = (d[0],
                d[1]);
                b.attr("data-toggle", "collapse"),
                e.$registerToggle(b),
                a.$on("$destroy", function() {
                    e.$unregisterToggle(b)
                }
                ),
                b.on("click", function() {
                    var d = c.bsCollapseToggle && "bs-collapse-toggle" !== c.bsCollapseToggle ? c.bsCollapseToggle : e.$toggles.indexOf(b);
                    e.$setActive(1 * d),
                    a.$apply()
                }
                )
            }
        }
    }
    ).directive("bsCollapseTarget", ["$animate", function(a) {
        return {
            require: ["^?ngModel", "^bsCollapse"],
            link: function(b, c, d, e) {
                function f() {
                    var b = g.$targets.indexOf(c)
                      , d = g.$activeIndexes()
                      , e = "removeClass";
                    angular.isArray(d) ? -1 !== d.indexOf(b) && (e = "addClass") : b === d && (e = "addClass"),
                    a[e](c, g.$options.activeClass)
                }
                var g = (e[0],
                e[1]);
                c.addClass("collapse"),
                g.$options.animation && c.addClass(g.$options.animation),
                g.$registerTarget(c),
                b.$on("$destroy", function() {
                    g.$unregisterTarget(c)
                }
                ),
                g.$viewChangeListeners.push(function() {
                    f()
                }
                ),
                f()
            }
        }
    }
    ]),
    angular.module("mgcrea.ngStrap.datepicker", ["mgcrea.ngStrap.helpers.dateParser", "mgcrea.ngStrap.helpers.dateFormatter", "mgcrea.ngStrap.tooltip"]).provider("$datepicker", function() {
        var a = this.defaults = {
            animation: "am-fade",
            prefixClass: "datepicker",
            placement: "bottom-left",
            templateUrl: "datepicker/datepicker.tpl.html",
            trigger: "focus",
            container: !1,
            keyboard: !0,
            html: !1,
            delay: 0,
            useNative: !1,
            dateType: "date",
            dateFormat: "shortDate",
            timezone: null ,
            modelDateFormat: null ,
            dayFormat: "dd",
            monthFormat: "MMM",
            yearFormat: "yyyy",
            monthTitleFormat: "MMMM yyyy",
            yearTitleFormat: "yyyy",
            strictFormat: !1,
            autoclose: !1,
            minDate: -1 / 0,
            maxDate: +1 / 0,
            startView: 0,
            minView: 0,
            startWeek: 0,
            daysOfWeekDisabled: "",
            iconLeft: "glyphicon glyphicon-chevron-left",
            iconRight: "glyphicon glyphicon-chevron-right"
        };
        this.$get = ["$window", "$document", "$rootScope", "$sce", "$dateFormatter", "datepickerViews", "$tooltip", "$timeout", function(b, c, d, e, f, g, h, i) {
            function j(b, c, d) {
                function e(a) {
                    a.selected = j.$isSelected(a.date)
                }
                function f() {
                    b[0].focus()
                }
                var j = h(b, angular.extend({}, a, d))
                  , m = d.scope
                  , n = j.$options
                  , o = j.$scope;
                n.startView && (n.startView -= n.minView);
                var p = g(j);
                j.$views = p.views;
                var q = p.viewDate;
                o.$mode = n.startView,
                o.$iconLeft = n.iconLeft,
                o.$iconRight = n.iconRight;
                var r = j.$views[o.$mode];
                o.$select = function(a) {
                    j.select(a)
                }
                ,
                o.$selectPane = function(a) {
                    j.$selectPane(a)
                }
                ,
                o.$toggleMode = function() {
                    j.setMode((o.$mode + 1) % j.$views.length)
                }
                ,
                j.update = function(a) {
                    angular.isDate(a) && !isNaN(a.getTime()) && (j.$date = a,
                    r.update.call(r, a)),
                    j.$build(!0)
                }
                ,
                j.updateDisabledDates = function(a) {
                    n.disabledDateRanges = a;
                    for (var b = 0, c = o.rows.length; c > b; b++)
                        angular.forEach(o.rows[b], j.$setDisabledEl)
                }
                ,
                j.select = function(a, b) {
                    angular.isDate(c.$dateValue) || (c.$dateValue = new Date(a)),
                    !o.$mode || b ? (c.$setViewValue(angular.copy(a)),
                    c.$render(),
                    n.autoclose && !b && i(function() {
                        j.hide(!0)
                    }
                    )) : (angular.extend(q, {
                        year: a.getFullYear(),
                        month: a.getMonth(),
                        date: a.getDate()
                    }),
                    j.setMode(o.$mode - 1),
                    j.$build())
                }
                ,
                j.setMode = function(a) {
                    o.$mode = a,
                    r = j.$views[o.$mode],
                    j.$build()
                }
                ,
                j.$build = function(a) {
                    a === !0 && r.built || (a !== !1 || r.built) && r.build.call(r)
                }
                ,
                j.$updateSelected = function() {
                    for (var a = 0, b = o.rows.length; b > a; a++)
                        angular.forEach(o.rows[a], e)
                }
                ,
                j.$isSelected = function(a) {
                    return r.isSelected(a)
                }
                ,
                j.$setDisabledEl = function(a) {
                    a.disabled = r.isDisabled(a.date)
                }
                ,
                j.$selectPane = function(a) {
                    var b = r.steps
                      , c = new Date(Date.UTC(q.year + (b.year || 0) * a, q.month + (b.month || 0) * a, 1));
                    angular.extend(q, {
                        year: c.getUTCFullYear(),
                        month: c.getUTCMonth(),
                        date: c.getUTCDate()
                    }),
                    j.$build()
                }
                ,
                j.$onMouseDown = function(a) {
                    if (a.preventDefault(),
                    a.stopPropagation(),
                    l) {
                        var b = angular.element(a.target);
                        "button" !== b[0].nodeName.toLowerCase() && (b = b.parent()),
                        b.triggerHandler("click")
                    }
                }
                ,
                j.$onKeyDown = function(a) {
                    if (/(38|37|39|40|13)/.test(a.keyCode) && !a.shiftKey && !a.altKey) {
                        if (a.preventDefault(),
                        a.stopPropagation(),
                        13 === a.keyCode)
                            return o.$mode ? o.$apply(function() {
                                j.setMode(o.$mode - 1)
                            }
                            ) : j.hide(!0);
                        r.onKeyDown(a),
                        m.$digest()
                    }
                }
                ;
                var s = j.init;
                j.init = function() {
                    return k && n.useNative ? (b.prop("type", "date"),
                    void b.css("-webkit-appearance", "textfield")) : (l && (b.prop("type", "text"),
                    b.attr("readonly", "true"),
                    b.on("click", f)),
                    void s())
                }
                ;
                var t = j.destroy;
                j.destroy = function() {
                    k && n.useNative && b.off("click", f),
                    t()
                }
                ;
                var u = j.show;
                j.show = function() {
                    !l && b.attr("readonly") || b.attr("disabled") || (u(),
                    i(function() {
                        j.$isShown && (j.$element.on(l ? "touchstart" : "mousedown", j.$onMouseDown),
                        n.keyboard && b.on("keydown", j.$onKeyDown))
                    }
                    , 0, !1))
                }
                ;
                var v = j.hide;
                return j.hide = function(a) {
                    j.$isShown && (j.$element.off(l ? "touchstart" : "mousedown", j.$onMouseDown),
                    n.keyboard && b.off("keydown", j.$onKeyDown),
                    v(a))
                }
                ,
                j
            }
            var k = (angular.element(b.document.body),
            /(ip(a|o)d|iphone|android)/gi.test(b.navigator.userAgent))
              , l = "createTouch" in b.document && k;
            return a.lang || (a.lang = f.getDefaultLocale()),
            j.defaults = a,
            j
        }
        ]
    }
    ).directive("bsDatepicker", ["$window", "$parse", "$q", "$dateFormatter", "$dateParser", "$datepicker", function(a, b, c, d, e, f) {
        var g = (f.defaults,
        /(ip(a|o)d|iphone|android)/gi.test(a.navigator.userAgent));
        return {
            restrict: "EAC",
            require: "ngModel",
            link: function(a, b, c, h) {
                function i(a) {
                    return a && a.length ? a : null
                }
                function j(a) {
                    if (angular.isDate(a)) {
                        var b = isNaN(n.$options.minDate) || a.getTime() >= n.$options.minDate
                          , c = isNaN(n.$options.maxDate) || a.getTime() <= n.$options.maxDate
                          , d = b && c;
                        h.$setValidity("date", d),
                        h.$setValidity("min", b),
                        h.$setValidity("max", c),
                        d && (h.$dateValue = a)
                    }
                }
                function k() {
                    return !h.$dateValue || isNaN(h.$dateValue.getTime()) ? "" : p(h.$dateValue, l.dateFormat)
                }
                var l = {
                    scope: a
                };
                angular.forEach(["template", "templateUrl", "controller", "controllerAs", "placement", "container", "delay", "trigger", "html", "animation", "autoclose", "dateType", "dateFormat", "timezone", "modelDateFormat", "dayFormat", "strictFormat", "startWeek", "startDate", "useNative", "lang", "startView", "minView", "iconLeft", "iconRight", "daysOfWeekDisabled", "id", "prefixClass", "prefixEvent"], function(a) {
                    angular.isDefined(c[a]) && (l[a] = c[a])
                }
                );
                var m = /^(false|0|)$/i;
                angular.forEach(["html", "container", "autoclose", "useNative"], function(a) {
                    angular.isDefined(c[a]) && m.test(c[a]) && (l[a] = !1)
                }
                ),
                c.bsShow && a.$watch(c.bsShow, function(a) {
                    n && angular.isDefined(a) && (angular.isString(a) && (a = !!a.match(/true|,?(datepicker),?/i)),
                    a === !0 ? n.show() : n.hide())
                }
                );
                var n = f(b, h, l);
                l = n.$options,
                g && l.useNative && (l.dateFormat = "yyyy-MM-dd");
                var o = l.lang
                  , p = function(a, b) {
                    return d.formatDate(a, b, o)
                }
                  , q = e({
                    format: l.dateFormat,
                    lang: o,
                    strict: l.strictFormat
                });
                angular.forEach(["minDate", "maxDate"], function(a) {
                    angular.isDefined(c[a]) && c.$observe(a, function(b) {
                        n.$options[a] = q.getDateForAttribute(a, b),
                        !isNaN(n.$options[a]) && n.$build(!1),
                        j(h.$dateValue)
                    }
                    )
                }
                ),
                a.$watch(c.ngModel, function() {
                    n.update(h.$dateValue)
                }
                , !0),
                angular.isDefined(c.disabledDates) && a.$watch(c.disabledDates, function(a, b) {
                    a = i(a),
                    b = i(b),
                    a && n.updateDisabledDates(a)
                }
                ),
                h.$parsers.unshift(function(a) {
                    var b;
                    if (!a)
                        return h.$setValidity("date", !0),
                        null ;
                    var c = q.parse(a, h.$dateValue);
                    return !c || isNaN(c.getTime()) ? void h.$setValidity("date", !1) : (j(c),
                    "string" === l.dateType ? (b = q.timezoneOffsetAdjust(c, l.timezone, !0),
                    p(b, l.modelDateFormat || l.dateFormat)) : (b = q.timezoneOffsetAdjust(h.$dateValue, l.timezone, !0),
                    "number" === l.dateType ? b.getTime() : "unix" === l.dateType ? b.getTime() / 1e3 : "iso" === l.dateType ? b.toISOString() : new Date(b)))
                }
                ),
                h.$formatters.push(function(a) {
                    var b;
                    return b = angular.isUndefined(a) || null  === a ? 0 / 0 : angular.isDate(a) ? a : "string" === l.dateType ? q.parse(a, null , l.modelDateFormat) : new Date("unix" === l.dateType ? 1e3 * a : a),
                    h.$dateValue = q.timezoneOffsetAdjust(b, l.timezone),
                    k()
                }
                ),
                h.$render = function() {
                    b.val(k())
                }
                ,
                a.$on("$destroy", function() {
                    n && n.destroy(),
                    l = null ,
                    n = null
                }
                )
            }
        }
    }
    ]).provider("datepickerViews", function() {
        function a(a, b) {
            for (var c = []; a.length > 0; )
                c.push(a.splice(0, b));
            return c
        }
        function b(a, b) {
            return (a % b + b) % b
        }
        this.defaults = {
            dayFormat: "dd",
            daySplit: 7
        };
        this.$get = ["$dateFormatter", "$dateParser", "$sce", function(c, d, e) {
            return function(f) {
                var g = f.$scope
                  , h = f.$options
                  , i = h.lang
                  , j = function(a, b) {
                    return c.formatDate(a, b, i)
                }
                  , k = d({
                    format: h.dateFormat,
                    lang: i,
                    strict: h.strictFormat
                })
                  , l = c.weekdaysShort(i)
                  , m = l.slice(h.startWeek).concat(l.slice(0, h.startWeek))
                  , n = e.trustAsHtml('<th class="dow text-center">' + m.join('</th><th class="dow text-center">') + "</th>")
                  , o = f.$date || (h.startDate ? k.getDateForAttribute("startDate", h.startDate) : new Date)
                  , p = {
                    year: o.getFullYear(),
                    month: o.getMonth(),
                    date: o.getDate()
                }
                  , q = [{
                    format: h.dayFormat,
                    split: 7,
                    steps: {
                        month: 1
                    },
                    update: function(a, b) {
                        !this.built || b || a.getFullYear() !== p.year || a.getMonth() !== p.month ? (angular.extend(p, {
                            year: f.$date.getFullYear(),
                            month: f.$date.getMonth(),
                            date: f.$date.getDate()
                        }),
                        f.$build()) : (a.getDate() !== p.date || 1 === a.getDate()) && (p.date = f.$date.getDate(),
                        f.$updateSelected())
                    },
                    build: function() {
                        var c = new Date(p.year,p.month,1)
                          , d = c.getTimezoneOffset()
                          , e = new Date(+c - 864e5 * b(c.getDay() - h.startWeek, 7))
                          , i = e.getTimezoneOffset()
                          , l = k.timezoneOffsetAdjust(new Date, h.timezone).toDateString();
                        i !== d && (e = new Date(+e + 6e4 * (i - d)));
                        for (var m, o = [], q = 0; 42 > q; q++)
                            m = k.daylightSavingAdjust(new Date(e.getFullYear(),e.getMonth(),e.getDate() + q)),
                            o.push({
                                date: m,
                                isToday: m.toDateString() === l,
                                label: j(m, this.format),
                                selected: f.$date && this.isSelected(m),
                                muted: m.getMonth() !== p.month,
                                disabled: this.isDisabled(m)
                            });
                        g.title = j(c, h.monthTitleFormat),
                        g.showLabels = !0,
                        g.labels = n,
                        g.rows = a(o, this.split),
                        this.built = !0
                    },
                    isSelected: function(a) {
                        return f.$date && a.getFullYear() === f.$date.getFullYear() && a.getMonth() === f.$date.getMonth() && a.getDate() === f.$date.getDate()
                    },
                    isDisabled: function(a) {
                        var b = a.getTime();
                        if (b < h.minDate || b > h.maxDate)
                            return !0;
                        if (-1 !== h.daysOfWeekDisabled.indexOf(a.getDay()))
                            return !0;
                        if (h.disabledDateRanges)
                            for (var c = 0; c < h.disabledDateRanges.length; c++)
                                if (b >= h.disabledDateRanges[c].start && b <= h.disabledDateRanges[c].end)
                                    return !0;
                        return !1
                    },
                    onKeyDown: function(a) {
                        if (f.$date) {
                            var b, c = f.$date.getTime();
                            37 === a.keyCode ? b = new Date(c - 864e5) : 38 === a.keyCode ? b = new Date(c - 6048e5) : 39 === a.keyCode ? b = new Date(c + 864e5) : 40 === a.keyCode && (b = new Date(c + 6048e5)),
                            this.isDisabled(b) || f.select(b, !0)
                        }
                    }
                }, {
                    name: "month",
                    format: h.monthFormat,
                    split: 4,
                    steps: {
                        year: 1
                    },
                    update: function(a) {
                        this.built && a.getFullYear() === p.year ? a.getMonth() !== p.month && (angular.extend(p, {
                            month: f.$date.getMonth(),
                            date: f.$date.getDate()
                        }),
                        f.$updateSelected()) : (angular.extend(p, {
                            year: f.$date.getFullYear(),
                            month: f.$date.getMonth(),
                            date: f.$date.getDate()
                        }),
                        f.$build())
                    },
                    build: function() {
                        for (var b, c = (new Date(p.year,0,1),
                        []), d = 0; 12 > d; d++)
                            b = new Date(p.year,d,1),
                            c.push({
                                date: b,
                                label: j(b, this.format),
                                selected: f.$isSelected(b),
                                disabled: this.isDisabled(b)
                            });
                        g.title = j(b, h.yearTitleFormat),
                        g.showLabels = !1,
                        g.rows = a(c, this.split),
                        this.built = !0
                    },
                    isSelected: function(a) {
                        return f.$date && a.getFullYear() === f.$date.getFullYear() && a.getMonth() === f.$date.getMonth()
                    },
                    isDisabled: function(a) {
                        var b = +new Date(a.getFullYear(),a.getMonth() + 1,0);
                        return b < h.minDate || a.getTime() > h.maxDate
                    },
                    onKeyDown: function(a) {
                        if (f.$date) {
                            var b = f.$date.getMonth()
                              , c = new Date(f.$date);
                            37 === a.keyCode ? c.setMonth(b - 1) : 38 === a.keyCode ? c.setMonth(b - 4) : 39 === a.keyCode ? c.setMonth(b + 1) : 40 === a.keyCode && c.setMonth(b + 4),
                            this.isDisabled(c) || f.select(c, !0)
                        }
                    }
                }, {
                    name: "year",
                    format: h.yearFormat,
                    split: 4,
                    steps: {
                        year: 12
                    },
                    update: function(a, b) {
                        !this.built || b || parseInt(a.getFullYear() / 20, 10) !== parseInt(p.year / 20, 10) ? (angular.extend(p, {
                            year: f.$date.getFullYear(),
                            month: f.$date.getMonth(),
                            date: f.$date.getDate()
                        }),
                        f.$build()) : a.getFullYear() !== p.year && (angular.extend(p, {
                            year: f.$date.getFullYear(),
                            month: f.$date.getMonth(),
                            date: f.$date.getDate()
                        }),
                        f.$updateSelected())
                    },
                    build: function() {
                        for (var b, c = p.year - p.year % (3 * this.split), d = [], e = 0; 12 > e; e++)
                            b = new Date(c + e,0,1),
                            d.push({
                                date: b,
                                label: j(b, this.format),
                                selected: f.$isSelected(b),
                                disabled: this.isDisabled(b)
                            });
                        g.title = d[0].label + "-" + d[d.length - 1].label,
                        g.showLabels = !1,
                        g.rows = a(d, this.split),
                        this.built = !0
                    },
                    isSelected: function(a) {
                        return f.$date && a.getFullYear() === f.$date.getFullYear()
                    },
                    isDisabled: function(a) {
                        var b = +new Date(a.getFullYear() + 1,0,0);
                        return b < h.minDate || a.getTime() > h.maxDate
                    },
                    onKeyDown: function(a) {
                        if (f.$date) {
                            var b = f.$date.getFullYear()
                              , c = new Date(f.$date);
                            37 === a.keyCode ? c.setYear(b - 1) : 38 === a.keyCode ? c.setYear(b - 4) : 39 === a.keyCode ? c.setYear(b + 1) : 40 === a.keyCode && c.setYear(b + 4),
                            this.isDisabled(c) || f.select(c, !0)
                        }
                    }
                }];
                return {
                    views: h.minView ? Array.prototype.slice.call(q, h.minView) : q,
                    viewDate: p
                }
            }
        }
        ]
    }
    ),
    angular.module("mgcrea.ngStrap.dropdown", ["mgcrea.ngStrap.tooltip"]).provider("$dropdown", function() {
        var a = this.defaults = {
            animation: "am-fade",
            prefixClass: "dropdown",
            prefixEvent: "dropdown",
            placement: "bottom-left",
            templateUrl: "dropdown/dropdown.tpl.html",
            trigger: "click",
            container: !1,
            keyboard: !0,
            html: !1,
            delay: 0
        };
        this.$get = ["$window", "$rootScope", "$tooltip", "$timeout", function(b, c, d, e) {
            function f(b, f) {
                function i(a) {
                    return a.target !== b[0] ? a.target !== b[0] && j.hide() : void 0
                }
                {
                    var j = {}
                      , k = angular.extend({}, a, f);
                    j.$scope = k.scope && k.scope.$new() || c.$new()
                }
                j = d(b, k);
                var l = b.parent();
                j.$onKeyDown = function(a) {
                    if (/(38|40)/.test(a.keyCode)) {
                        a.preventDefault(),
                        a.stopPropagation();
                        var b = angular.element(j.$element[0].querySelectorAll("li:not(.divider) a"));
                        if (b.length) {
                            var c;
                            angular.forEach(b, function(a, b) {
                                h && h.call(a, ":focus") && (c = b)
                            }
                            ),
                            38 === a.keyCode && c > 0 ? c-- : 40 === a.keyCode && c < b.length - 1 ? c++ : angular.isUndefined(c) && (c = 0),
                            b.eq(c)[0].focus()
                        }
                    }
                }
                ;
                var m = j.show;
                j.show = function() {
                    m(),
                    e(function() {
                        k.keyboard && j.$element && j.$element.on("keydown", j.$onKeyDown),
                        g.on("click", i)
                    }
                    , 0, !1),
                    l.hasClass("dropdown") && l.addClass("open")
                }
                ;
                var n = j.hide;
                j.hide = function() {
                    j.$isShown && (k.keyboard && j.$element && j.$element.off("keydown", j.$onKeyDown),
                    g.off("click", i),
                    l.hasClass("dropdown") && l.removeClass("open"),
                    n())
                }
                ;
                var o = j.destroy;
                return j.destroy = function() {
                    g.off("click", i),
                    o()
                }
                ,
                j
            }
            var g = angular.element(b.document.body)
              , h = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector;
            return f
        }
        ]
    }
    ).directive("bsDropdown", ["$window", "$sce", "$dropdown", function(a, b, c) {
        return {
            restrict: "EAC",
            scope: !0,
            link: function(a, b, d) {
                var e = {
                    scope: a
                };
                angular.forEach(["template", "templateUrl", "controller", "controllerAs", "placement", "container", "delay", "trigger", "keyboard", "html", "animation", "id"], function(a) {
                    angular.isDefined(d[a]) && (e[a] = d[a])
                }
                );
                var f = /^(false|0|)$/i;
                angular.forEach(["html", "container"], function(a) {
                    angular.isDefined(d[a]) && f.test(d[a]) && (e[a] = !1)
                }
                ),
                d.bsDropdown && a.$watch(d.bsDropdown, function(b) {
                    a.content = b
                }
                , !0),
                d.bsShow && a.$watch(d.bsShow, function(a) {
                    g && angular.isDefined(a) && (angular.isString(a) && (a = !!a.match(/true|,?(dropdown),?/i)),
                    a === !0 ? g.show() : g.hide())
                }
                );
                var g = c(b, e);
                a.$on("$destroy", function() {
                    g && g.destroy(),
                    e = null ,
                    g = null
                }
                )
            }
        }
    }
    ]),
    angular.module("mgcrea.ngStrap.core", []).service("$bsCompiler", d),
    d.$inject = ["$q", "$http", "$injector", "$compile", "$controller", "$templateCache"],
    angular.module("mgcrea.ngStrap.helpers.dateFormatter", []).service("$dateFormatter", ["$locale", "dateFilter", function(a, b) {
        function c(a) {
            return /(h+)([:\.])?(m+)([:\.])?(s*)[ ]?(a?)/i.exec(a).slice(1)
        }
        this.getDefaultLocale = function() {
            return a.id
        }
        ,
        this.getDatetimeFormat = function(b) {
            return a.DATETIME_FORMATS[b] || b
        }
        ,
        this.weekdaysShort = function() {
            return a.DATETIME_FORMATS.SHORTDAY
        }
        ,
        this.hoursFormat = function(a) {
            return c(a)[0]
        }
        ,
        this.minutesFormat = function(a) {
            return c(a)[2]
        }
        ,
        this.secondsFormat = function(a) {
            return c(a)[4]
        }
        ,
        this.timeSeparator = function(a) {
            return c(a)[1]
        }
        ,
        this.showSeconds = function(a) {
            return !!c(a)[4]
        }
        ,
        this.showAM = function(a) {
            return !!c(a)[5]
        }
        ,
        this.formatDate = function(a, c, d, e) {
            return b(a, c, e)
        }
    }
    ]),
    angular.module("mgcrea.ngStrap.helpers.dateParser", []).provider("$dateParser", ["$localeProvider", function() {
        function a() {
            this.year = 1970,
            this.month = 0,
            this.day = 1,
            this.hours = 0,
            this.minutes = 0,
            this.seconds = 0,
            this.milliseconds = 0
        }
        function b() {}
        function c(a) {
            return !isNaN(parseFloat(a)) && isFinite(a)
        }
        function d(a, b) {
            for (var c = a.length, d = b.toString().toLowerCase(), e = 0; c > e; e++)
                if (a[e].toLowerCase() === d)
                    return e;
            return -1
        }
        a.prototype.setMilliseconds = function(a) {
            this.milliseconds = a
        }
        ,
        a.prototype.setSeconds = function(a) {
            this.seconds = a
        }
        ,
        a.prototype.setMinutes = function(a) {
            this.minutes = a
        }
        ,
        a.prototype.setHours = function(a) {
            this.hours = a
        }
        ,
        a.prototype.getHours = function() {
            return this.hours
        }
        ,
        a.prototype.setDate = function(a) {
            this.day = a
        }
        ,
        a.prototype.setMonth = function(a) {
            this.month = a
        }
        ,
        a.prototype.setFullYear = function(a) {
            this.year = a
        }
        ,
        a.prototype.fromDate = function(a) {
            return this.year = a.getFullYear(),
            this.month = a.getMonth(),
            this.day = a.getDate(),
            this.hours = a.getHours(),
            this.minutes = a.getMinutes(),
            this.seconds = a.getSeconds(),
            this.milliseconds = a.getMilliseconds(),
            this
        }
        ,
        a.prototype.toDate = function() {
            return new Date(this.year,this.month,this.day,this.hours,this.minutes,this.seconds,this.milliseconds)
        }
        ;
        var e = a.prototype
          , f = this.defaults = {
            format: "shortDate",
            strict: !1
        };
        this.$get = ["$locale", "dateFilter", function(g, h) {
            var i = function(i) {
                function j(a) {
                    var b, c = Object.keys(r), d = [], e = [], f = a;
                    for (b = 0; b < c.length; b++)
                        if (a.split(c[b]).length > 1) {
                            var g = f.search(c[b]);
                            a = a.split(c[b]).join(""),
                            r[c[b]] && (d[g] = r[c[b]])
                        }
                    return angular.forEach(d, function(a) {
                        a && e.push(a)
                    }
                    ),
                    e
                }
                function k(a) {
                    return a.replace(/\//g, "[\\/]").replace("/-/g", "[-]").replace(/\./g, "[.]").replace(/\\s/g, "[\\s]")
                }
                function l(a) {
                    var b, c = Object.keys(q), d = a;
                    for (b = 0; b < c.length; b++)
                        d = d.split(c[b]).join("${" + b + "}");
                    for (b = 0; b < c.length; b++)
                        d = d.split("${" + b + "}").join("(" + q[c[b]] + ")");
                    return a = k(a),
                    new RegExp("^" + d + "$",["i"])
                }
                var m, n, o = angular.extend({}, f, i), p = {}, q = {
                    sss: "[0-9]{3}",
                    ss: "[0-5][0-9]",
                    s: o.strict ? "[1-5]?[0-9]" : "[0-9]|[0-5][0-9]",
                    mm: "[0-5][0-9]",
                    m: o.strict ? "[1-5]?[0-9]" : "[0-9]|[0-5][0-9]",
                    HH: "[01][0-9]|2[0-3]",
                    H: o.strict ? "1?[0-9]|2[0-3]" : "[01]?[0-9]|2[0-3]",
                    hh: "[0][1-9]|[1][012]",
                    h: o.strict ? "[1-9]|1[012]" : "0?[1-9]|1[012]",
                    a: "AM|PM",
                    EEEE: g.DATETIME_FORMATS.DAY.join("|"),
                    EEE: g.DATETIME_FORMATS.SHORTDAY.join("|"),
                    dd: "0[1-9]|[12][0-9]|3[01]",
                    d: o.strict ? "[1-9]|[1-2][0-9]|3[01]" : "0?[1-9]|[1-2][0-9]|3[01]",
                    MMMM: g.DATETIME_FORMATS.MONTH.join("|"),
                    MMM: g.DATETIME_FORMATS.SHORTMONTH.join("|"),
                    MM: "0[1-9]|1[012]",
                    M: o.strict ? "[1-9]|1[012]" : "0?[1-9]|1[012]",
                    yyyy: "[1]{1}[0-9]{3}|[2]{1}[0-9]{3}",
                    yy: "[0-9]{2}",
                    y: o.strict ? "-?(0|[1-9][0-9]{0,3})" : "-?0*[0-9]{1,4}"
                }, r = {
                    sss: e.setMilliseconds,
                    ss: e.setSeconds,
                    s: e.setSeconds,
                    mm: e.setMinutes,
                    m: e.setMinutes,
                    HH: e.setHours,
                    H: e.setHours,
                    hh: e.setHours,
                    h: e.setHours,
                    EEEE: b,
                    EEE: b,
                    dd: e.setDate,
                    d: e.setDate,
                    a: function(a) {
                        var b = this.getHours() % 12;
                        return this.setHours(a.match(/pm/i) ? b + 12 : b)
                    },
                    MMMM: function(a) {
                        return this.setMonth(d(g.DATETIME_FORMATS.MONTH, a))
                    },
                    MMM: function(a) {
                        return this.setMonth(d(g.DATETIME_FORMATS.SHORTMONTH, a))
                    },
                    MM: function(a) {
                        return this.setMonth(1 * a - 1)
                    },
                    M: function(a) {
                        return this.setMonth(1 * a - 1)
                    },
                    yyyy: e.setFullYear,
                    yy: function(a) {
                        return this.setFullYear(2e3 + 1 * a)
                    },
                    y: function(a) {
                        return this.setFullYear(50 >= 1 * a && 2 === a.length ? 2e3 + 1 * a : 1 * a)
                    }
                };
                return p.init = function() {
                    p.$format = g.DATETIME_FORMATS[o.format] || o.format,
                    m = l(p.$format),
                    n = j(p.$format)
                }
                ,
                p.isValid = function(a) {
                    return angular.isDate(a) ? !isNaN(a.getTime()) : m.test(a)
                }
                ,
                p.parse = function(b, c, d, e) {
                    d && (d = g.DATETIME_FORMATS[d] || d),
                    angular.isDate(b) && (b = h(b, d || p.$format, e));
                    var f = d ? l(d) : m
                      , i = d ? j(d) : n
                      , k = f.exec(b);
                    if (!k)
                        return !1;
                    for (var o = (new a).fromDate(c && !isNaN(c.getTime()) ? c : new Date(1970,0,1,0)), q = 0; q < k.length - 1; q++)
                        i[q] && i[q].call(o, k[q + 1]);
                    var r = o.toDate();
                    return parseInt(o.day, 10) !== r.getDate() ? !1 : r
                }
                ,
                p.getDateForAttribute = function(a, b) {
                    var d;
                    if ("today" === b) {
                        var e = new Date;
                        d = new Date(e.getFullYear(),e.getMonth(),e.getDate() + ("maxDate" === a ? 1 : 0),0,0,0,"minDate" === a ? 0 : -1)
                    } else
                        d = angular.isString(b) && b.match(/^".+"$/) ? new Date(b.substr(1, b.length - 2)) : c(b) ? new Date(parseInt(b, 10)) : angular.isString(b) && 0 === b.length ? "minDate" === a ? -1 / 0 : +1 / 0 : new Date(b);
                    return d
                }
                ,
                p.getTimeForAttribute = function(a, b) {
                    var d;
                    return d = "now" === b ? (new Date).setFullYear(1970, 0, 1) : angular.isString(b) && b.match(/^".+"$/) ? new Date(b.substr(1, b.length - 2)).setFullYear(1970, 0, 1) : c(b) ? new Date(parseInt(b, 10)).setFullYear(1970, 0, 1) : angular.isString(b) && 0 === b.length ? "minTime" === a ? -1 / 0 : +1 / 0 : p.parse(b, new Date(1970,0,1,0))
                }
                ,
                p.daylightSavingAdjust = function(a) {
                    return a ? (a.setHours(a.getHours() > 12 ? a.getHours() + 2 : 0),
                    a) : null
                }
                ,
                p.timezoneOffsetAdjust = function(a, b, c) {
                    return a ? (b && "UTC" === b && (a = new Date(a.getTime()),
                    a.setMinutes(a.getMinutes() + (c ? -1 : 1) * a.getTimezoneOffset())),
                    a) : null
                }
                ,
                p.init(),
                p
            }
            ;
            return i
        }
        ]
    }
    ]),
    angular.module("mgcrea.ngStrap.helpers.debounce", []).factory("debounce", ["$timeout", function(a) {
        return function(b, c, d) {
            var e = null ;
            return function() {
                var f = this
                  , g = arguments
                  , h = d && !e;
                return e && a.cancel(e),
                e = a(function() {
                    e = null ,
                    d || b.apply(f, g)
                }
                , c, !1),
                h && b.apply(f, g),
                e
            }
        }
    }
    ]).factory("throttle", ["$timeout", function(a) {
        return function(b, c, d) {
            var e = null ;
            return d || (d = {}),
            function() {
                var f = this
                  , g = arguments;
                e || (d.leading !== !1 && b.apply(f, g),
                e = a(function() {
                    e = null ,
                    d.trailing !== !1 && b.apply(f, g)
                }
                , c, !1))
            }
        }
    }
    ]),
    angular.module("mgcrea.ngStrap.helpers.dimensions", []).factory("dimensions", ["$document", "$window", function() {
        var b = (angular.element,
        {})
          , c = b.nodeName = function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        }
        ;
        b.css = function(b, c, d) {
            var e;
            return e = b.currentStyle ? b.currentStyle[c] : a.getComputedStyle ? a.getComputedStyle(b)[c] : b.style[c],
            d === !0 ? parseFloat(e) || 0 : e
        }
        ,
        b.offset = function(b) {
            var c = b.getBoundingClientRect()
              , d = b.ownerDocument;
            return {
                width: c.width || b.offsetWidth,
                height: c.height || b.offsetHeight,
                top: c.top + (a.pageYOffset || d.documentElement.scrollTop) - (d.documentElement.clientTop || 0),
                left: c.left + (a.pageXOffset || d.documentElement.scrollLeft) - (d.documentElement.clientLeft || 0)
            }
        }
        ,
        b.setOffset = function(a, c, d) {
            var e, f, g, h, i, j, k, l = b.css(a, "position"), m = angular.element(a), n = {};
            "static" === l && (a.style.position = "relative"),
            i = b.offset(a),
            g = b.css(a, "top"),
            j = b.css(a, "left"),
            k = ("absolute" === l || "fixed" === l) && (g + j).indexOf("auto") > -1,
            k ? (e = b.position(a),
            h = e.top,
            f = e.left) : (h = parseFloat(g) || 0,
            f = parseFloat(j) || 0),
            angular.isFunction(c) && (c = c.call(a, d, i)),
            null  !== c.top && (n.top = c.top - i.top + h),
            null  !== c.left && (n.left = c.left - i.left + f),
            "using" in c ? c.using.call(m, n) : m.css({
                top: n.top + "px",
                left: n.left + "px"
            })
        }
        ,
        b.position = function(a) {
            var e, f, g = {
                top: 0,
                left: 0
            };
            return "fixed" === b.css(a, "position") ? f = a.getBoundingClientRect() : (e = d(a),
            f = b.offset(a),
            c(e, "html") || (g = b.offset(e)),
            g.top += b.css(e, "borderTopWidth", !0),
            g.left += b.css(e, "borderLeftWidth", !0)),
            {
                width: a.offsetWidth,
                height: a.offsetHeight,
                top: f.top - g.top - b.css(a, "marginTop", !0),
                left: f.left - g.left - b.css(a, "marginLeft", !0)
            }
        }
        ;
        var d = function(a) {
            var d = a.ownerDocument
              , e = a.offsetParent || d;
            if (c(e, "#document"))
                return d.documentElement;
            for (; e && !c(e, "html") && "static" === b.css(e, "position"); )
                e = e.offsetParent;
            return e || d.documentElement
        }
        ;
        return b.height = function(a, c) {
            var d = a.offsetHeight;
            return c ? d += b.css(a, "marginTop", !0) + b.css(a, "marginBottom", !0) : d -= b.css(a, "paddingTop", !0) + b.css(a, "paddingBottom", !0) + b.css(a, "borderTopWidth", !0) + b.css(a, "borderBottomWidth", !0),
            d
        }
        ,
        b.width = function(a, c) {
            var d = a.offsetWidth;
            return c ? d += b.css(a, "marginLeft", !0) + b.css(a, "marginRight", !0) : d -= b.css(a, "paddingLeft", !0) + b.css(a, "paddingRight", !0) + b.css(a, "borderLeftWidth", !0) + b.css(a, "borderRightWidth", !0),
            d
        }
        ,
        b
    }
    ]),
    angular.module("mgcrea.ngStrap.helpers.parseOptions", []).provider("$parseOptions", function() {
        var a = this.defaults = {
            regexp: /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+(.*?)(?:\s+track\s+by\s+(.*?))?$/
        };
        this.$get = ["$parse", "$q", function(b, c) {
            function d(d, e) {
                function f(a, b) {
                    return a.map(function(a, c) {
                        var d, e, f = {};
                        return f[k] = a,
                        d = j(b, f),
                        e = n(b, f),
                        {
                            label: d,
                            value: e,
                            index: c
                        }
                    }
                    )
                }
                var g = {}
                  , h = angular.extend({}, a, e);
                g.$values = [];
                var i, j, k, l, m, n, o;
                return g.init = function() {
                    g.$match = i = d.match(h.regexp),
                    j = b(i[2] || i[1]),
                    k = i[4] || i[6],
                    l = i[5],
                    m = b(i[3] || ""),
                    n = b(i[2] ? i[1] : k),
                    o = b(i[7])
                }
                ,
                g.valuesFn = function(a, b) {
                    return c.when(o(a, b)).then(function(b) {
                        return angular.isArray(b) || (b = []),
                        g.$values = b.length ? f(b, a) : [],
                        g.$values
                    }
                    )
                }
                ,
                g.displayValue = function(a) {
                    var b = {};
                    return b[k] = a,
                    j(b)
                }
                ,
                g.init(),
                g
            }
            return d
        }
        ]
    }
    ),
    angular.version.minor < 3 && angular.version.dot < 14 && angular.module("ng").factory("$$rAF", ["$window", "$timeout", function(a, b) {
        var c = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame
          , d = a.cancelAnimationFrame || a.webkitCancelAnimationFrame || a.mozCancelAnimationFrame || a.webkitCancelRequestAnimationFrame
          , e = !!c
          , f = e ? function(a) {
            var b = c(a);
            return function() {
                d(b)
            }
        }
         : function(a) {
            var c = b(a, 16.66, !1);
            return function() {
                b.cancel(c)
            }
        }
        ;
        return f.supported = e,
        f
    }
    ]),
    angular.module("mgcrea.ngStrap.modal", ["mgcrea.ngStrap.core", "mgcrea.ngStrap.helpers.dimensions"]).provider("$modal", function() {
        var a = this.defaults = {
            animation: "am-fade",
            backdropAnimation: "am-fade",
            prefixClass: "modal",
            prefixEvent: "modal",
            placement: "top",
            templateUrl: "modal/modal.tpl.html",
            template: "",
            contentTemplate: !1,
            container: !1,
            element: null ,
            backdrop: !0,
            keyboard: !0,
            html: !1,
            show: !0
        };
        this.$get = ["$window", "$rootScope", "$bsCompiler", "$q", "$templateCache", "$http", "$animate", "$timeout", "$sce", "dimensions", function(c, d, e, f, g, h, i, j, k) {
            function l(b) {
                function c() {
                    x.$emit(v.prefixEvent + ".show", u)
                }
                function f() {
                    x.$emit(v.prefixEvent + ".hide", u),
                    q.removeClass(v.prefixClass + "-open"),
                    v.animation && q.removeClass(v.prefixClass + "-with-" + v.animation)
                }
                function g() {
                    v.backdrop && (z.on("click", r),
                    B.on("click", r),
                    B.on("wheel", s))
                }
                function h() {
                    v.backdrop && (z.off("click", r),
                    B.off("click", r),
                    B.off("wheel", s))
                }
                function j() {
                    v.keyboard && z.on("keyup", u.$onKeyUp)
                }
                function l() {
                    v.keyboard && z.off("keyup", u.$onKeyUp)
                }
                function r(a) {
                    a.target === a.currentTarget && ("static" === v.backdrop ? u.focus() : u.hide())
                }
                function s(a) {
                    a.preventDefault()
                }
                function t() {
                    u.$isShown && null  !== z && (h(),
                    l()),
                    A && (A.$destroy(),
                    A = null ),
                    z && (z.remove(),
                    z = u.$element = null )
                }
                var u = {}
                  , v = u.$options = angular.extend({}, a, b)
                  , w = u.$promise = e.compile(v)
                  , x = u.$scope = v.scope && v.scope.$new() || d.$new();
                v.element || v.container || (v.container = "body"),
                u.$id = v.id || v.element && v.element.attr("id") || "",
                o(["title", "content"], function(a) {
                    v[a] && (x[a] = k.trustAsHtml(v[a]))
                }
                ),
                x.$hide = function() {
                    x.$$postDigest(function() {
                        u.hide()
                    }
                    )
                }
                ,
                x.$show = function() {
                    x.$$postDigest(function() {
                        u.show()
                    }
                    )
                }
                ,
                x.$toggle = function() {
                    x.$$postDigest(function() {
                        u.toggle()
                    }
                    )
                }
                ,
                u.$isShown = x.$isShown = !1;
                var y, z, A, B = angular.element('<div class="' + v.prefixClass + '-backdrop"/>');
                return B.css({
                    position: "fixed",
                    top: "0px",
                    left: "0px",
                    bottom: "0px",
                    right: "0px",
                    "z-index": 1038
                }),
                w.then(function(a) {
                    y = a,
                    u.init()
                }
                ),
                u.init = function() {
                    v.show && x.$$postDigest(function() {
                        u.show()
                    }
                    )
                }
                ,
                u.destroy = function() {
                    t(),
                    B && (B.remove(),
                    B = null ),
                    x.$destroy()
                }
                ,
                u.show = function() {
                    if (!u.$isShown) {
                        var a, b;
                        if (angular.isElement(v.container) ? (a = v.container,
                        b = v.container[0].lastChild ? angular.element(v.container[0].lastChild) : null ) : v.container ? (a = n(v.container),
                        b = a[0] && a[0].lastChild ? angular.element(a[0].lastChild) : null ) : (a = null ,
                        b = v.element),
                        z && t(),
                        A = u.$scope.$new(),
                        z = u.$element = y.link(A, function() {}
                        ),
                        !x.$emit(v.prefixEvent + ".show.before", u).defaultPrevented) {
                            z.css({
                                display: "block"
                            }).addClass(v.placement),
                            v.animation && (v.backdrop && B.addClass(v.backdropAnimation),
                            z.addClass(v.animation)),
                            v.backdrop && i.enter(B, q, null ),
                            angular.version.minor <= 2 ? i.enter(z, a, b, c) : i.enter(z, a, b).then(c),
                            u.$isShown = x.$isShown = !0,
                            m(x);
                            var d = z[0];
                            p(function() {
                                d.focus()
                            }
                            ),
                            q.addClass(v.prefixClass + "-open"),
                            v.animation && q.addClass(v.prefixClass + "-with-" + v.animation),
                            g(),
                            j()
                        }
                    }
                }
                ,
                u.hide = function() {
                    u.$isShown && (x.$emit(v.prefixEvent + ".hide.before", u).defaultPrevented || (angular.version.minor <= 2 ? i.leave(z, f) : i.leave(z).then(f),
                    v.backdrop && i.leave(B),
                    u.$isShown = x.$isShown = !1,
                    m(x),
                    h(),
                    l()))
                }
                ,
                u.toggle = function() {
                    u.$isShown ? u.hide() : u.show()
                }
                ,
                u.focus = function() {
                    z[0].focus()
                }
                ,
                u.$onKeyUp = function(a) {
                    27 === a.which && u.$isShown && (u.hide(),
                    a.stopPropagation())
                }
                ,
                u
            }
            function m(a) {
                a.$$phase || a.$root && a.$root.$$phase || a.$digest()
            }
            function n(a, c) {
                return angular.element((c || b).querySelectorAll(a))
            }
            var o = angular.forEach
              , p = (String.prototype.trim,
            c.requestAnimationFrame || c.setTimeout)
              , q = angular.element(c.document.body);
            return l
        }
        ]
    }
    ).directive("bsModal", ["$window", "$sce", "$modal", function(a, b, c) {
        return {
            restrict: "EAC",
            scope: !0,
            link: function(a, d, e) {
                var f = {
                    scope: a,
                    element: d,
                    show: !1
                };
                angular.forEach(["template", "templateUrl", "controller", "controllerAs", "contentTemplate", "controller", "placement", "backdrop", "keyboard", "html", "container", "animation", "id", "prefixEvent", "prefixClass"], function(a) {
                    angular.isDefined(e[a]) && (f[a] = e[a])
                }
                );
                var g = /^(false|0|)$/i;
                angular.forEach(["backdrop", "keyboard", "html", "container"], function(a) {
                    angular.isDefined(e[a]) && g.test(e[a]) && (f[a] = !1)
                }
                ),
                angular.forEach(["title", "content"], function(c) {
                    e[c] && e.$observe(c, function(d) {
                        a[c] = b.trustAsHtml(d)
                    }
                    )
                }
                ),
                e.bsModal && a.$watch(e.bsModal, function(b) {
                    angular.isObject(b) ? angular.extend(a, b) : a.content = b
                }
                , !0);
                var h = c(f);
                d.on(e.trigger || "click", h.toggle),
                a.$on("$destroy", function() {
                    h && h.destroy(),
                    f = null ,
                    h = null
                }
                )
            }
        }
    }
    ]),
    angular.module("mgcrea.ngStrap.navbar", []).provider("$navbar", function() {
        var a = this.defaults = {
            activeClass: "active",
            routeAttr: "data-match-route",
            strict: !1
        };
        this.$get = function() {
            return {
                defaults: a
            }
        }
    }
    ).directive("bsNavbar", ["$window", "$location", "$navbar", function(a, b, c) {
        var d = c.defaults;
        return {
            restrict: "A",
            link: function(a, c, e) {
                var f = angular.copy(d);
                angular.forEach(Object.keys(d), function(a) {
                    angular.isDefined(e[a]) && (f[a] = e[a])
                }
                ),
                a.$watch(function() {
                    return b.path()
                }
                , function(a) {
                    var b = c[0].querySelectorAll("li[" + f.routeAttr + "]");
                    angular.forEach(b, function(b) {
                        var c = angular.element(b)
                          , d = c.attr(f.routeAttr).replace("/", "\\/");
                        f.strict && (d = "^" + d + "$");
                        var e = new RegExp(d,"i");
                        e.test(a) ? c.addClass(f.activeClass) : c.removeClass(f.activeClass)
                    }
                    )
                }
                )
            }
        }
    }
    ]),
    angular.module("mgcrea.ngStrap.popover", ["mgcrea.ngStrap.tooltip"]).provider("$popover", function() {
        var a = this.defaults = {
            animation: "am-fade",
            customClass: "",
            container: !1,
            target: !1,
            placement: "right",
            templateUrl: "popover/popover.tpl.html",
            contentTemplate: !1,
            trigger: "click",
            keyboard: !0,
            html: !1,
            title: "",
            content: "",
            delay: 0,
            autoClose: !1
        };
        this.$get = ["$tooltip", function(b) {
            function c(c, d) {
                var e = angular.extend({}, a, d)
                  , f = b(c, e);
                return e.content && (f.$scope.content = e.content),
                f
            }
            return c
        }
        ]
    }
    ).directive("bsPopover", ["$window", "$sce", "$popover", function(a, b, c) {
        var d = a.requestAnimationFrame || a.setTimeout;
        return {
            restrict: "EAC",
            scope: !0,
            link: function(a, e, f) {
                var g = {
                    scope: a
                };
                angular.forEach(["template", "templateUrl", "controller", "controllerAs", "contentTemplate", "placement", "container", "delay", "trigger", "html", "animation", "customClass", "autoClose", "id", "prefixClass", "prefixEvent"], function(a) {
                    angular.isDefined(f[a]) && (g[a] = f[a])
                }
                );
                var h = /^(false|0|)$/i;
                angular.forEach(["html", "container", "autoClose"], function(a) {
                    angular.isDefined(f[a]) && h.test(f[a]) && (g[a] = !1)
                }
                );
                var i = e.attr("data-target");
                angular.isDefined(i) && (g.target = h.test(i) ? !1 : i),
                angular.forEach(["title", "content"], function(c) {
                    f[c] && f.$observe(c, function(e, f) {
                        a[c] = b.trustAsHtml(e),
                        angular.isDefined(f) && d(function() {
                            j && j.$applyPlacement()
                        }
                        )
                    }
                    )
                }
                ),
                f.bsPopover && a.$watch(f.bsPopover, function(b, c) {
                    angular.isObject(b) ? angular.extend(a, b) : a.content = b,
                    angular.isDefined(c) && d(function() {
                        j && j.$applyPlacement()
                    }
                    )
                }
                , !0),
                f.bsShow && a.$watch(f.bsShow, function(a) {
                    j && angular.isDefined(a) && (angular.isString(a) && (a = !!a.match(/true|,?(popover),?/i)),
                    a === !0 ? j.show() : j.hide())
                }
                ),
                f.viewport && a.$watch(f.viewport, function(a) {
                    j && angular.isDefined(a) && j.setViewport(a)
                }
                );
                var j = c(e, g);
                a.$on("$destroy", function() {
                    j && j.destroy(),
                    g = null ,
                    j = null
                }
                )
            }
        }
    }
    ]),
    angular.module("mgcrea.ngStrap.scrollspy", ["mgcrea.ngStrap.helpers.debounce", "mgcrea.ngStrap.helpers.dimensions"]).provider("$scrollspy", function() {
        var a = this.$$spies = {}
          , c = this.defaults = {
            debounce: 150,
            throttle: 100,
            offset: 100
        };
        this.$get = ["$window", "$document", "$rootScope", "dimensions", "debounce", "throttle", function(d, e, f, g, h, i) {
            function j(a, b) {
                return a[0].nodeName && a[0].nodeName.toLowerCase() === b.toLowerCase()
            }
            function k(e) {
                var k = angular.extend({}, c, e);
                k.element || (k.element = n);
                var o = j(k.element, "body")
                  , p = o ? l : k.element
                  , q = o ? "window" : k.id;
                if (a[q])
                    return a[q].$$count++,
                    a[q];
                var r, s, t, u, v, w, x, y, z = {}, A = z.$trackedElements = [], B = [];
                return z.init = function() {
                    this.$$count = 1,
                    u = h(this.checkPosition, k.debounce),
                    v = i(this.checkPosition, k.throttle),
                    p.on("click", this.checkPositionWithEventLoop),
                    l.on("resize", u),
                    p.on("scroll", v),
                    w = h(this.checkOffsets, k.debounce),
                    r = f.$on("$viewContentLoaded", w),
                    s = f.$on("$includeContentLoaded", w),
                    w(),
                    q && (a[q] = z)
                }
                ,
                z.destroy = function() {
                    this.$$count--,
                    this.$$count > 0 || (p.off("click", this.checkPositionWithEventLoop),
                    l.off("resize", u),
                    p.off("scroll", v),
                    r(),
                    s(),
                    q && delete a[q])
                }
                ,
                z.checkPosition = function() {
                    if (B.length) {
                        if (y = (o ? d.pageYOffset : p.prop("scrollTop")) || 0,
                        x = Math.max(d.innerHeight, m.prop("clientHeight")),
                        y < B[0].offsetTop && t !== B[0].target)
                            return z.$activateElement(B[0]);
                        for (var a = B.length; a--; )
                            if (!angular.isUndefined(B[a].offsetTop) && null  !== B[a].offsetTop && t !== B[a].target && !(y < B[a].offsetTop || B[a + 1] && y > B[a + 1].offsetTop))
                                return z.$activateElement(B[a])
                    }
                }
                ,
                z.checkPositionWithEventLoop = function() {
                    setTimeout(z.checkPosition, 1)
                }
                ,
                z.$activateElement = function(a) {
                    if (t) {
                        var b = z.$getTrackedElement(t);
                        b && (b.source.removeClass("active"),
                        j(b.source, "li") && j(b.source.parent().parent(), "li") && b.source.parent().parent().removeClass("active"))
                    }
                    t = a.target,
                    a.source.addClass("active"),
                    j(a.source, "li") && j(a.source.parent().parent(), "li") && a.source.parent().parent().addClass("active")
                }
                ,
                z.$getTrackedElement = function(a) {
                    return A.filter(function(b) {
                        return b.target === a
                    }
                    )[0]
                }
                ,
                z.checkOffsets = function() {
                    angular.forEach(A, function(a) {
                        var c = b.querySelector(a.target);
                        a.offsetTop = c ? g.offset(c).top : null ,
                        k.offset && null  !== a.offsetTop && (a.offsetTop -= 1 * k.offset)
                    }
                    ),
                    B = A.filter(function(a) {
                        return null  !== a.offsetTop
                    }
                    ).sort(function(a, b) {
                        return a.offsetTop - b.offsetTop
                    }
                    ),
                    u()
                }
                ,
                z.trackElement = function(a, b) {
                    A.push({
                        target: a,
                        source: b
                    })
                }
                ,
                z.untrackElement = function(a, b) {
                    for (var c, d = A.length; d--; )
                        if (A[d].target === a && A[d].source === b) {
                            c = d;
                            break
                        }
                    A = A.splice(c, 1)
                }
                ,
                z.activate = function(a) {
                    A[a].addClass("active")
                }
                ,
                z.init(),
                z
            }
            var l = angular.element(d)
              , m = angular.element(e.prop("documentElement"))
              , n = angular.element(d.document.body);
            return k
        }
        ]
    }
    ).directive("bsScrollspy", ["$rootScope", "debounce", "dimensions", "$scrollspy", function(a, b, c, d) {
        return {
            restrict: "EAC",
            link: function(a, b, c) {
                var e = {
                    scope: a
                };
                angular.forEach(["offset", "target"], function(a) {
                    angular.isDefined(c[a]) && (e[a] = c[a])
                }
                );
                var f = d(e);
                f.trackElement(e.target, b),
                a.$on("$destroy", function() {
                    f && (f.untrackElement(e.target, b),
                    f.destroy()),
                    e = null ,
                    f = null
                }
                )
            }
        }
    }
    ]).directive("bsScrollspyList", ["$rootScope", "debounce", "dimensions", "$scrollspy", function() {
        return {
            restrict: "A",
            compile: function(a) {
                var b = a[0].querySelectorAll("li > a[href]");
                angular.forEach(b, function(a) {
                    var b = angular.element(a);
                    b.parent().attr("bs-scrollspy", "").attr("data-target", b.attr("href"))
                }
                )
            }
        }
    }
    ]),
    angular.module("mgcrea.ngStrap.select", ["mgcrea.ngStrap.tooltip", "mgcrea.ngStrap.helpers.parseOptions"]).provider("$select", function() {
        var a = this.defaults = {
            animation: "am-fade",
            prefixClass: "select",
            prefixEvent: "$select",
            placement: "bottom-left",
            templateUrl: "select/select.tpl.html",
            trigger: "focus",
            container: !1,
            keyboard: !0,
            html: !1,
            delay: 0,
            multiple: !1,
            allNoneButtons: !1,
            sort: !0,
            caretHtml: '&nbsp;<span class="caret"></span>',
            placeholder: "Choose among the following...",
            allText: "All",
            noneText: "None",
            maxLength: 3,
            maxLengthHtml: "selected",
            iconCheckmark: "glyphicon glyphicon-ok"
        };
        this.$get = ["$window", "$document", "$rootScope", "$tooltip", "$timeout", function(b, c, d, e, f) {
            function g(b, c, d) {
                var g = {}
                  , h = angular.extend({}, a, d);
                g = e(b, h);
                var j = g.$scope;
                j.$matches = [],
                j.$activeIndex = h.multiple ? [] : -1,
                j.$isMultiple = h.multiple,
                j.$showAllNoneButtons = h.allNoneButtons && h.multiple,
                j.$iconCheckmark = h.iconCheckmark,
                j.$allText = h.allText,
                j.$noneText = h.noneText,
                j.$activate = function(a) {
                    j.$$postDigest(function() {
                        g.activate(a)
                    }
                    )
                }
                ,
                j.$select = function(a) {
                    j.$$postDigest(function() {
                        g.select(a)
                    }
                    )
                }
                ,
                j.$isVisible = function() {
                    return g.$isVisible()
                }
                ,
                j.$isActive = function(a) {
                    return g.$isActive(a)
                }
                ,
                j.$selectAll = function() {
                    for (var a = 0; a < j.$matches.length; a++)
                        j.$isActive(a) || j.$select(a)
                }
                ,
                j.$selectNone = function() {
                    for (var a = 0; a < j.$matches.length; a++)
                        j.$isActive(a) && j.$select(a)
                }
                ,
                g.update = function(a) {
                    j.$matches = a,
                    g.$updateActiveIndex()
                }
                ,
                g.activate = function(a) {
                    return h.multiple ? (g.$isActive(a) ? j.$activeIndex.splice(j.$activeIndex.indexOf(a), 1) : j.$activeIndex.push(a),
                    h.sort && j.$activeIndex.sort(function(a, b) {
                        return a - b
                    }
                    )) : j.$activeIndex = a,
                    j.$activeIndex
                }
                ,
                g.select = function(a) {
                    var b = j.$matches[a].value;
                    j.$apply(function() {
                        g.activate(a),
                        h.multiple ? c.$setViewValue(j.$activeIndex.map(function(a) {
                            return j.$matches[a].value
                        }
                        )) : (c.$setViewValue(b),
                        g.hide())
                    }
                    ),
                    j.$emit(h.prefixEvent + ".select", b, a, g)
                }
                ,
                g.$updateActiveIndex = function() {
                    c.$modelValue && j.$matches.length ? j.$activeIndex = h.multiple && angular.isArray(c.$modelValue) ? c.$modelValue.map(function(a) {
                        return g.$getIndex(a)
                    }
                    ) : g.$getIndex(c.$modelValue) : j.$activeIndex >= j.$matches.length && (j.$activeIndex = h.multiple ? [] : 0)
                }
                ,
                g.$isVisible = function() {
                    return h.minLength && c ? j.$matches.length && c.$viewValue.length >= h.minLength : j.$matches.length
                }
                ,
                g.$isActive = function(a) {
                    return h.multiple ? -1 !== j.$activeIndex.indexOf(a) : j.$activeIndex === a
                }
                ,
                g.$getIndex = function(a) {
                    var b = j.$matches.length
                      , c = b;
                    if (b) {
                        for (c = b; c-- && j.$matches[c].value !== a; )
                            ;
                        if (!(0 > c))
                            return c
                    }
                }
                ,
                g.$onMouseDown = function(a) {
                    if (a.preventDefault(),
                    a.stopPropagation(),
                    i) {
                        var b = angular.element(a.target);
                        b.triggerHandler("click")
                    }
                }
                ,
                g.$onKeyDown = function(a) {
                    return /(9|13|38|40)/.test(a.keyCode) ? (a.preventDefault(),
                    a.stopPropagation(),
                    h.multiple && 9 === a.keyCode ? g.hide() : h.multiple || 13 !== a.keyCode && 9 !== a.keyCode ? void (h.multiple || (38 === a.keyCode && j.$activeIndex > 0 ? j.$activeIndex-- : 38 === a.keyCode && j.$activeIndex < 0 ? j.$activeIndex = j.$matches.length - 1 : 40 === a.keyCode && j.$activeIndex < j.$matches.length - 1 ? j.$activeIndex++ : angular.isUndefined(j.$activeIndex) && (j.$activeIndex = 0),
                    j.$digest())) : g.select(j.$activeIndex)) : void 0
                }
                ;
                var k = g.show;
                g.show = function() {
                    k(),
                    h.multiple && g.$element.addClass("select-multiple"),
                    f(function() {
                        g.$element.on(i ? "touchstart" : "mousedown", g.$onMouseDown),
                        h.keyboard && b.on("keydown", g.$onKeyDown)
                    }
                    , 0, !1)
                }
                ;
                var l = g.hide;
                return g.hide = function() {
                    h.multiple || c.$modelValue || (j.$activeIndex = -1),
                    g.$element.off(i ? "touchstart" : "mousedown", g.$onMouseDown),
                    h.keyboard && b.off("keydown", g.$onKeyDown),
                    l(!0)
                }
                ,
                g
            }
            var h = (angular.element(b.document.body),
            /(ip(a|o)d|iphone|android)/gi.test(b.navigator.userAgent))
              , i = "createTouch" in b.document && h;
            return g.defaults = a,
            g
        }
        ]
    }
    ).directive("bsSelect", ["$window", "$parse", "$q", "$select", "$parseOptions", function(a, b, c, d, e) {
        var f = d.defaults;
        return {
            restrict: "EAC",
            require: "ngModel",
            link: function(a, b, c, g) {
                var h = {
                    scope: a,
                    placeholder: f.placeholder
                };
                angular.forEach(["template", "templateUrl", "controller", "controllerAs", "placement", "container", "delay", "trigger", "keyboard", "html", "animation", "placeholder", "allNoneButtons", "maxLength", "maxLengthHtml", "allText", "noneText", "iconCheckmark", "autoClose", "id", "sort", "caretHtml", "prefixClass", "prefixEvent"], function(a) {
                    angular.isDefined(c[a]) && (h[a] = c[a])
                }
                );
                var i = /^(false|0|)$/i;
                angular.forEach(["html", "container", "allNoneButtons", "sort"], function(a) {
                    angular.isDefined(c[a]) && i.test(c[a]) && (h[a] = !1)
                }
                );
                var j = b.attr("data-multiple");
                if (angular.isDefined(j) && (h.multiple = i.test(j) ? !1 : j),
                "select" === b[0].nodeName.toLowerCase()) {
                    var k = b;
                    k.css("display", "none"),
                    b = angular.element('<button type="button" class="btn btn-default"></button>'),
                    k.after(b)
                }
                var l = e(c.bsOptions)
                  , m = d(b, g, h)
                  , n = l.$match[7].replace(/\|.+/, "").trim();
                a.$watchCollection(n, function() {
                    l.valuesFn(a, g).then(function(a) {
                        m.update(a),
                        g.$render()
                    }
                    )
                }
                ),
                a.$watch(c.ngModel, function() {
                    m.$updateActiveIndex(),
                    g.$render()
                }
                , !0),
                g.$render = function() {
                    var a, c;
                    h.multiple && angular.isArray(g.$modelValue) ? (a = g.$modelValue.map(function(a) {
                        return c = m.$getIndex(a),
                        angular.isDefined(c) ? m.$scope.$matches[c].label : !1
                    }
                    ).filter(angular.isDefined),
                    a = a.length > (h.maxLength || f.maxLength) ? a.length + " " + (h.maxLengthHtml || f.maxLengthHtml) : a.join(", ")) : (c = m.$getIndex(g.$modelValue),
                    a = angular.isDefined(c) ? m.$scope.$matches[c].label : !1),
                    b.html((a ? a : h.placeholder) + (h.caretHtml ? h.caretHtml : f.caretHtml))
                }
                ,
                h.multiple && (g.$isEmpty = function(a) {
                    return !a || 0 === a.length
                }
                ),
                a.$on("$destroy", function() {
                    m && m.destroy(),
                    h = null ,
                    m = null
                }
                )
            }
        }
    }
    ]),
    angular.module("mgcrea.ngStrap.timepicker", ["mgcrea.ngStrap.helpers.dateParser", "mgcrea.ngStrap.helpers.dateFormatter", "mgcrea.ngStrap.tooltip"]).provider("$timepicker", function() {
        var a = this.defaults = {
            animation: "am-fade",
            prefixClass: "timepicker",
            placement: "bottom-left",
            templateUrl: "timepicker/timepicker.tpl.html",
            trigger: "focus",
            container: !1,
            keyboard: !0,
            html: !1,
            delay: 0,
            useNative: !0,
            timeType: "date",
            timeFormat: "shortTime",
            timezone: null ,
            modelTimeFormat: null ,
            autoclose: !1,
            minTime: -1 / 0,
            maxTime: +1 / 0,
            length: 5,
            hourStep: 1,
            minuteStep: 5,
            secondStep: 5,
            roundDisplay: !1,
            iconUp: "glyphicon glyphicon-chevron-up",
            iconDown: "glyphicon glyphicon-chevron-down",
            arrowBehavior: "pager"
        };
        this.$get = ["$window", "$document", "$rootScope", "$sce", "$dateFormatter", "$tooltip", "$timeout", function(b, c, d, e, f, g, h) {
            function i(b, c, d) {
                function e(a) {
                    var b = 6e4 * o.minuteStep;
                    return new Date(Math.floor(a.getTime() / b) * b)
                }
                function i(a, c) {
                    var d = a + c;
                    if (b[0].createTextRange) {
                        var e = b[0].createTextRange();
                        e.collapse(!0),
                        e.moveStart("character", a),
                        e.moveEnd("character", d),
                        e.select()
                    } else
                        b[0].setSelectionRange ? b[0].setSelectionRange(a, d) : angular.isUndefined(b[0].selectionStart) && (b[0].selectionStart = a,
                        b[0].selectionEnd = d)
                }
                function l() {
                    b[0].focus()
                }
                var m = g(b, angular.extend({}, a, d))
                  , n = d.scope
                  , o = m.$options
                  , p = m.$scope
                  , q = o.lang
                  , r = function(a, b, c) {
                    return f.formatDate(a, b, q, c)
                }
                  , s = 0
                  , t = o.roundDisplay ? e(new Date) : new Date
                  , u = c.$dateValue || t
                  , v = {
                    hour: u.getHours(),
                    meridian: u.getHours() < 12,
                    minute: u.getMinutes(),
                    second: u.getSeconds(),
                    millisecond: u.getMilliseconds()
                }
                  , w = f.getDatetimeFormat(o.timeFormat, q)
                  , x = f.hoursFormat(w)
                  , y = f.timeSeparator(w)
                  , z = f.minutesFormat(w)
                  , A = f.secondsFormat(w)
                  , B = f.showSeconds(w)
                  , C = f.showAM(w);
                p.$iconUp = o.iconUp,
                p.$iconDown = o.iconDown,
                p.$select = function(a, b) {
                    m.select(a, b)
                }
                ,
                p.$moveIndex = function(a, b) {
                    m.$moveIndex(a, b)
                }
                ,
                p.$switchMeridian = function(a) {
                    m.switchMeridian(a)
                }
                ,
                m.update = function(a) {
                    angular.isDate(a) && !isNaN(a.getTime()) ? (m.$date = a,
                    angular.extend(v, {
                        hour: a.getHours(),
                        minute: a.getMinutes(),
                        second: a.getSeconds(),
                        millisecond: a.getMilliseconds()
                    }),
                    m.$build()) : m.$isBuilt || m.$build()
                }
                ,
                m.select = function(a, b, d) {
                    (!c.$dateValue || isNaN(c.$dateValue.getTime())) && (c.$dateValue = new Date(1970,0,1)),
                    angular.isDate(a) || (a = new Date(a)),
                    0 === b ? c.$dateValue.setHours(a.getHours()) : 1 === b ? c.$dateValue.setMinutes(a.getMinutes()) : 2 === b && c.$dateValue.setSeconds(a.getSeconds()),
                    c.$setViewValue(angular.copy(c.$dateValue)),
                    c.$render(),
                    o.autoclose && !d && h(function() {
                        m.hide(!0)
                    }
                    )
                }
                ,
                m.switchMeridian = function(a) {
                    if (c.$dateValue && !isNaN(c.$dateValue.getTime())) {
                        var b = (a || c.$dateValue).getHours();
                        c.$dateValue.setHours(12 > b ? b + 12 : b - 12),
                        c.$setViewValue(angular.copy(c.$dateValue)),
                        c.$render()
                    }
                }
                ,
                m.$build = function() {
                    var a, b, c = p.midIndex = parseInt(o.length / 2, 10), d = [];
                    for (a = 0; a < o.length; a++)
                        b = new Date(1970,0,1,v.hour - (c - a) * o.hourStep),
                        d.push({
                            date: b,
                            label: r(b, x),
                            selected: m.$date && m.$isSelected(b, 0),
                            disabled: m.$isDisabled(b, 0)
                        });
                    var e, f = [];
                    for (a = 0; a < o.length; a++)
                        e = new Date(1970,0,1,0,v.minute - (c - a) * o.minuteStep),
                        f.push({
                            date: e,
                            label: r(e, z),
                            selected: m.$date && m.$isSelected(e, 1),
                            disabled: m.$isDisabled(e, 1)
                        });
                    var g, h = [];
                    for (a = 0; a < o.length; a++)
                        g = new Date(1970,0,1,0,0,v.second - (c - a) * o.secondStep),
                        h.push({
                            date: g,
                            label: r(g, A),
                            selected: m.$date && m.$isSelected(g, 2),
                            disabled: m.$isDisabled(g, 2)
                        });
                    var i = [];
                    for (a = 0; a < o.length; a++)
                        i.push(B ? [d[a], f[a], h[a]] : [d[a], f[a]]);
                    p.rows = i,
                    p.showSeconds = B,
                    p.showAM = C,
                    p.isAM = (m.$date || d[c].date).getHours() < 12,
                    p.timeSeparator = y,
                    m.$isBuilt = !0
                }
                ,
                m.$isSelected = function(a, b) {
                    return m.$date ? 0 === b ? a.getHours() === m.$date.getHours() : 1 === b ? a.getMinutes() === m.$date.getMinutes() : 2 === b ? a.getSeconds() === m.$date.getSeconds() : void 0 : !1
                }
                ,
                m.$isDisabled = function(a, b) {
                    var c;
                    return 0 === b ? c = a.getTime() + 6e4 * v.minute + 1e3 * v.second : 1 === b ? c = a.getTime() + 36e5 * v.hour + 1e3 * v.second : 2 === b && (c = a.getTime() + 36e5 * v.hour + 6e4 * v.minute),
                    c < 1 * o.minTime || c > 1 * o.maxTime
                }
                ,
                p.$arrowAction = function(a, b) {
                    "picker" === o.arrowBehavior ? m.$setTimeByStep(a, b) : m.$moveIndex(a, b)
                }
                ,
                m.$setTimeByStep = function(a, b) {
                    var c = new Date(m.$date || u)
                      , d = c.getHours()
                      , e = c.getMinutes()
                      , f = c.getSeconds();
                    0 === b ? c.setHours(d - parseInt(o.hourStep, 10) * a) : 1 === b ? c.setMinutes(e - parseInt(o.minuteStep, 10) * a) : 2 === b && c.setSeconds(f - parseInt(o.secondStep, 10) * a),
                    m.select(c, b, !0)
                }
                ,
                m.$moveIndex = function(a, b) {
                    var c;
                    0 === b ? (c = new Date(1970,0,1,v.hour + a * o.length,v.minute,v.second),
                    angular.extend(v, {
                        hour: c.getHours()
                    })) : 1 === b ? (c = new Date(1970,0,1,v.hour,v.minute + a * o.length * o.minuteStep,v.second),
                    angular.extend(v, {
                        minute: c.getMinutes()
                    })) : 2 === b && (c = new Date(1970,0,1,v.hour,v.minute,v.second + a * o.length * o.secondStep),
                    angular.extend(v, {
                        second: c.getSeconds()
                    })),
                    m.$build()
                }
                ,
                m.$onMouseDown = function(a) {
                    if ("input" !== a.target.nodeName.toLowerCase() && a.preventDefault(),
                    a.stopPropagation(),
                    k) {
                        var b = angular.element(a.target);
                        "button" !== b[0].nodeName.toLowerCase() && (b = b.parent()),
                        b.triggerHandler("click")
                    }
                }
                ,
                m.$onKeyDown = function(a) {
                    if (/(38|37|39|40|13)/.test(a.keyCode) && !a.shiftKey && !a.altKey) {
                        if (a.preventDefault(),
                        a.stopPropagation(),
                        13 === a.keyCode)
                            return void m.hide(!0);
                        var b = new Date(m.$date)
                          , c = b.getHours()
                          , d = r(b, x).length
                          , e = b.getMinutes()
                          , f = r(b, z).length
                          , g = b.getSeconds()
                          , h = r(b, A).length
                          , j = 1
                          , k = /(37|39)/.test(a.keyCode)
                          , l = 2 + 1 * B + 1 * C;
                        k && (37 === a.keyCode ? s = 1 > s ? l - 1 : s - 1 : 39 === a.keyCode && (s = l - 1 > s ? s + 1 : 0));
                        var p = [0, d]
                          , q = 0;
                        38 === a.keyCode && (q = -1),
                        40 === a.keyCode && (q = 1);
                        var t = 2 === s && B
                          , u = 2 === s && !B || 3 === s && B;
                        0 === s ? (b.setHours(c + q * parseInt(o.hourStep, 10)),
                        d = r(b, x).length,
                        p = [0, d]) : 1 === s ? (b.setMinutes(e + q * parseInt(o.minuteStep, 10)),
                        f = r(b, z).length,
                        p = [d + j, f]) : t ? (b.setSeconds(g + q * parseInt(o.secondStep, 10)),
                        h = r(b, A).length,
                        p = [d + j + f + j, h]) : u && (k || m.switchMeridian(),
                        p = [d + j + f + j + (h + j) * B, 2]),
                        m.select(b, s, !0),
                        i(p[0], p[1]),
                        n.$digest()
                    }
                }
                ;
                var D = m.init;
                m.init = function() {
                    return j && o.useNative ? (b.prop("type", "time"),
                    void b.css("-webkit-appearance", "textfield")) : (k && (b.prop("type", "text"),
                    b.attr("readonly", "true"),
                    b.on("click", l)),
                    void D())
                }
                ;
                var E = m.destroy;
                m.destroy = function() {
                    j && o.useNative && b.off("click", l),
                    E()
                }
                ;
                var F = m.show;
                m.show = function() {
                    !k && b.attr("readonly") || b.attr("disabled") || (F(),
                    h(function() {
                        m.$element && m.$element.on(k ? "touchstart" : "mousedown", m.$onMouseDown),
                        o.keyboard && b && b.on("keydown", m.$onKeyDown)
                    }
                    , 0, !1))
                }
                ;
                var G = m.hide;
                return m.hide = function(a) {
                    m.$isShown && (m.$element && m.$element.off(k ? "touchstart" : "mousedown", m.$onMouseDown),
                    o.keyboard && b && b.off("keydown", m.$onKeyDown),
                    G(a))
                }
                ,
                m
            }
            var j = /(ip(a|o)d|iphone|android)/gi.test(b.navigator.userAgent)
              , k = "createTouch" in b.document && j;
            return a.lang || (a.lang = f.getDefaultLocale()),
            i.defaults = a,
            i
        }
        ]
    }
    ).directive("bsTimepicker", ["$window", "$parse", "$q", "$dateFormatter", "$dateParser", "$timepicker", function(a, b, d, e, f, g) {
        var h = g.defaults
          , i = /(ip(a|o)d|iphone|android)/gi.test(a.navigator.userAgent);
        return {
            restrict: "EAC",
            require: "ngModel",
            link: function(a, b, d, j) {
                function k(a) {
                    if (angular.isDate(a)) {
                        var b = isNaN(m.minTime) || new Date(a.getTime()).setFullYear(1970, 0, 1) >= m.minTime
                          , c = isNaN(m.maxTime) || new Date(a.getTime()).setFullYear(1970, 0, 1) <= m.maxTime
                          , d = b && c;
                        j.$setValidity("date", d),
                        j.$setValidity("min", b),
                        j.$setValidity("max", c),
                        d && (j.$dateValue = a)
                    }
                }
                function l() {
                    return !j.$dateValue || isNaN(j.$dateValue.getTime()) ? "" : q(j.$dateValue, m.timeFormat)
                }
                var m = {
                    scope: a
                };
                angular.forEach(["template", "templateUrl", "controller", "controllerAs", "placement", "container", "delay", "trigger", "keyboard", "html", "animation", "autoclose", "timeType", "timeFormat", "timezone", "modelTimeFormat", "useNative", "hourStep", "minuteStep", "secondStep", "length", "arrowBehavior", "iconUp", "iconDown", "roundDisplay", "id", "prefixClass", "prefixEvent"], function(a) {
                    angular.isDefined(d[a]) && (m[a] = d[a])
                }
                );
                var n = /^(false|0|)$/i;
                angular.forEach(["html", "container", "autoclose", "useNative", "roundDisplay"], function(a) {
                    angular.isDefined(d[a]) && n.test(d[a]) && (m[a] = !1)
                }
                ),
                d.bsShow && a.$watch(d.bsShow, function(a) {
                    o && angular.isDefined(a) && (angular.isString(a) && (a = !!a.match(/true|,?(timepicker),?/i)),
                    a === !0 ? o.show() : o.hide())
                }
                ),
                i && (m.useNative || h.useNative) && (m.timeFormat = "HH:mm");
                var o = g(b, j, m);
                m = o.$options;
                var p = m.lang
                  , q = function(a, b, c) {
                    return e.formatDate(a, b, p, c)
                }
                  , r = f({
                    format: m.timeFormat,
                    lang: p
                });
                angular.forEach(["minTime", "maxTime"], function(a) {
                    angular.isDefined(d[a]) && d.$observe(a, function(b) {
                        o.$options[a] = r.getTimeForAttribute(a, b),
                        !isNaN(o.$options[a]) && o.$build(),
                        k(j.$dateValue)
                    }
                    )
                }
                ),
                a.$watch(d.ngModel, function() {
                    o.update(j.$dateValue)
                }
                , !0),
                j.$parsers.unshift(function(a) {
                    var b;
                    if (!a)
                        return j.$setValidity("date", !0),
                        null ;
                    var d = angular.isDate(a) ? a : r.parse(a, j.$dateValue);
                    return !d || isNaN(d.getTime()) ? (j.$setValidity("date", !1),
                    c) : (k(d),
                    "string" === m.timeType ? (b = r.timezoneOffsetAdjust(d, m.timezone, !0),
                    q(b, m.modelTimeFormat || m.timeFormat)) : (b = r.timezoneOffsetAdjust(j.$dateValue, m.timezone, !0),
                    "number" === m.timeType ? b.getTime() : "unix" === m.timeType ? b.getTime() / 1e3 : "iso" === m.timeType ? b.toISOString() : new Date(b)))
                }
                ),
                j.$formatters.push(function(a) {
                    var b;
                    return b = angular.isUndefined(a) || null  === a ? 0 / 0 : angular.isDate(a) ? a : "string" === m.timeType ? r.parse(a, null , m.modelTimeFormat) : new Date("unix" === m.timeType ? 1e3 * a : a),
                    j.$dateValue = r.timezoneOffsetAdjust(b, m.timezone),
                    l()
                }
                ),
                j.$render = function() {
                    b.val(l())
                }
                ,
                a.$on("$destroy", function() {
                    o && o.destroy(),
                    m = null ,
                    o = null
                }
                )
            }
        }
    }
    ]),
    angular.module("mgcrea.ngStrap.tab", []).provider("$tab", function() {
        var a = this.defaults = {
            animation: "am-fade",
            template: "tab/tab.tpl.html",
            navClass: "nav-tabs",
            activeClass: "active"
        }
          , b = this.controller = function(b, c, d) {
            var e = this;
            e.$options = angular.copy(a),
            angular.forEach(["animation", "navClass", "activeClass"], function(a) {
                angular.isDefined(d[a]) && (e.$options[a] = d[a])
            }
            ),
            b.$navClass = e.$options.navClass,
            b.$activeClass = e.$options.activeClass,
            e.$panes = b.$panes = [],
            e.$activePaneChangeListeners = e.$viewChangeListeners = [],
            e.$push = function(a) {
                angular.isUndefined(e.$panes.$active) && b.$setActive(a.name || 0),
                e.$panes.push(a)
            }
            ,
            e.$remove = function(a) {
                var b, c = e.$panes.indexOf(a), d = e.$panes.$active;
                b = angular.isString(d) ? e.$panes.map(function(a) {
                    return a.name
                }
                ).indexOf(d) : e.$panes.$active,
                e.$panes.splice(c, 1),
                b > c ? b-- : c === b && b === e.$panes.length && b--,
                b >= 0 && b < e.$panes.length ? e.$setActive(e.$panes[b].name || b) : e.$setActive()
            }
            ,
            e.$setActive = b.$setActive = function(a) {
                e.$panes.$active = a,
                e.$activePaneChangeListeners.forEach(function(a) {
                    a()
                }
                )
            }
            ,
            e.$isActive = b.$isActive = function(a, b) {
                return e.$panes.$active === a.name || e.$panes.$active === b
            }
        }
        ;
        this.$get = function() {
            var c = {};
            return c.defaults = a,
            c.controller = b,
            c
        }
    }
    ).directive("bsTabs", ["$window", "$animate", "$tab", "$parse", function(a, b, c, d) {
        var e = c.defaults;
        return {
            require: ["?ngModel", "bsTabs"],
            transclude: !0,
            scope: !0,
            controller: ["$scope", "$element", "$attrs", c.controller],
            templateUrl: function(a, b) {
                return b.template || e.template
            },
            link: function(a, b, c, e) {
                var f = e[0]
                  , g = e[1];
                if (f && (g.$activePaneChangeListeners.push(function() {
                    f.$setViewValue(g.$panes.$active)
                }
                ),
                f.$formatters.push(function(a) {
                    return g.$setActive(a),
                    a
                }
                )),
                c.bsActivePane) {
                    var h = d(c.bsActivePane);
                    g.$activePaneChangeListeners.push(function() {
                        h.assign(a, g.$panes.$active)
                    }
                    ),
                    a.$watch(c.bsActivePane, function(a) {
                        g.$setActive(a)
                    }
                    , !0)
                }
            }
        }
    }
    ]).directive("bsPane", ["$window", "$animate", "$sce", function(a, b, c) {
        return {
            require: ["^?ngModel", "^bsTabs"],
            scope: !0,
            link: function(a, d, e, f) {
                function g() {
                    var c = h.$panes.indexOf(a);
                    b[h.$isActive(a, c) ? "addClass" : "removeClass"](d, h.$options.activeClass)
                }
                var h = (f[0],
                f[1]);
                d.addClass("tab-pane"),
                e.$observe("title", function(b) {
                    a.title = c.trustAsHtml(b)
                }
                ),
                a.name = e.name,
                h.$options.animation && d.addClass(h.$options.animation),
                e.$observe("disabled", function(b) {
                    a.disabled = a.$eval(b)
                }
                ),
                h.$push(a),
                a.$on("$destroy", function() {
                    h.$remove(a)
                }
                ),
                h.$activePaneChangeListeners.push(function() {
                    g()
                }
                ),
                g()
            }
        }
    }
    ]),
    angular.module("mgcrea.ngStrap.typeahead", ["mgcrea.ngStrap.tooltip", "mgcrea.ngStrap.helpers.parseOptions"]).provider("$typeahead", function() {
        var a = this.defaults = {
            animation: "am-fade",
            prefixClass: "typeahead",
            prefixEvent: "$typeahead",
            placement: "bottom-left",
            templateUrl: "typeahead/typeahead.tpl.html",
            trigger: "focus",
            container: !1,
            keyboard: !0,
            html: !1,
            delay: 0,
            minLength: 1,
            filter: "bsAsyncFilter",
            limit: 6,
            autoSelect: !1,
            comparator: "",
            trimValue: !0
        };
        this.$get = ["$window", "$rootScope", "$tooltip", "$$rAF", "$timeout", function(b, c, d, e, f) {
            function g(b, c, g) {
                var i = {}
                  , j = angular.extend({}, a, g);
                i = d(b, j);
                var k = g.scope
                  , l = i.$scope;
                l.$resetMatches = function() {
                    l.$matches = [],
                    l.$activeIndex = j.autoSelect ? 0 : -1
                }
                ,
                l.$resetMatches(),
                l.$activate = function(a) {
                    l.$$postDigest(function() {
                        i.activate(a)
                    }
                    )
                }
                ,
                l.$select = function(a) {
                    l.$$postDigest(function() {
                        i.select(a)
                    }
                    )
                }
                ,
                l.$isVisible = function() {
                    return i.$isVisible()
                }
                ,
                i.update = function(a) {
                    l.$matches = a,
                    l.$activeIndex >= a.length && (l.$activeIndex = j.autoSelect ? 0 : -1),
                    h(l),
                    e(i.$applyPlacement)
                }
                ,
                i.activate = function(a) {
                    l.$activeIndex = a
                }
                ,
                i.select = function(a) {
                    if (-1 !== a) {
                        var b = l.$matches[a].value;
                        c.$setViewValue(b),
                        c.$render(),
                        l.$resetMatches(),
                        k && k.$digest(),
                        l.$emit(j.prefixEvent + ".select", b, a, i)
                    }
                }
                ,
                i.$isVisible = function() {
                    return j.minLength && c ? l.$matches.length && angular.isString(c.$viewValue) && c.$viewValue.length >= j.minLength : !!l.$matches.length
                }
                ,
                i.$getIndex = function(a) {
                    var b = l.$matches.length
                      , c = b;
                    if (b) {
                        for (c = b; c-- && l.$matches[c].value !== a; )
                            ;
                        if (!(0 > c))
                            return c
                    }
                }
                ,
                i.$onMouseDown = function(a) {
                    a.preventDefault(),
                    a.stopPropagation()
                }
                ,
                i.$onKeyDown = function(a) {
                    /(38|40|13)/.test(a.keyCode) && (!i.$isVisible() || 13 === a.keyCode && -1 === l.$activeIndex || (a.preventDefault(),
                    a.stopPropagation()),
                    13 === a.keyCode && l.$matches.length ? i.select(l.$activeIndex) : 38 === a.keyCode && l.$activeIndex > 0 ? l.$activeIndex-- : 40 === a.keyCode && l.$activeIndex < l.$matches.length - 1 ? l.$activeIndex++ : angular.isUndefined(l.$activeIndex) && (l.$activeIndex = 0),
                    l.$digest())
                }
                ;
                var m = i.show;
                i.show = function() {
                    m(),
                    f(function() {
                        i.$element && i.$element.on("mousedown", i.$onMouseDown),
                        j.keyboard && b && b.on("keydown", i.$onKeyDown)
                    }
                    , 0, !1)
                }
                ;
                var n = i.hide;
                return i.hide = function() {
                    i.$element && i.$element.off("mousedown", i.$onMouseDown),
                    j.keyboard && b && b.off("keydown", i.$onKeyDown),
                    j.autoSelect || i.activate(-1),
                    n()
                }
                ,
                i
            }
            function h(a) {
                a.$$phase || a.$root && a.$root.$$phase || a.$digest()
            }
            angular.element(b.document.body);
            return g.defaults = a,
            g
        }
        ]
    }
    ).filter("bsAsyncFilter", ["$filter", function(a) {
        return function(b, c, d) {
            return b && angular.isFunction(b.then) ? b.then(function(b) {
                return a("filter")(b, c, d)
            }
            ) : a("filter")(b, c, d)
        }
    }
    ]).directive("bsTypeahead", ["$window", "$parse", "$q", "$typeahead", "$parseOptions", function(a, b, c, d, e) {
        var f = d.defaults;
        return {
            restrict: "EAC",
            require: "ngModel",
            link: function(a, b, c, g) {
                var h = {
                    scope: a
                };
                angular.forEach(["template", "templateUrl", "controller", "controllerAs", "placement", "container", "delay", "trigger", "keyboard", "html", "animation", "filter", "limit", "minLength", "watchOptions", "selectMode", "autoSelect", "comparator", "id", "prefixEvent", "prefixClass"], function(a) {
                    angular.isDefined(c[a]) && (h[a] = c[a])
                }
                );
                var i = /^(false|0|)$/i;
                angular.forEach(["html", "container", "trimValue"], function(a) {
                    angular.isDefined(c[a]) && i.test(c[a]) && (h[a] = !1)
                }
                ),
                b.attr("autocomplete", "false");
                var j = h.filter || f.filter
                  , k = h.limit || f.limit
                  , l = h.comparator || f.comparator
                  , m = c.bsOptions;
                j && (m += " | " + j + ":$viewValue"),
                l && (m += ":" + l),
                k && (m += " | limitTo:" + k);
                var n = e(m)
                  , o = d(b, g, h);
                if (h.watchOptions) {
                    var p = n.$match[7].replace(/\|.+/, "").replace(/\(.*\)/g, "").trim();
                    a.$watchCollection(p, function() {
                        n.valuesFn(a, g).then(function(a) {
                            o.update(a),
                            g.$render()
                        }
                        )
                    }
                    )
                }
                a.$watch(c.ngModel, function(b) {
                    a.$modelValue = b,
                    n.valuesFn(a, g).then(function(a) {
                        if (h.selectMode && !a.length && b.length > 0)
                            return void g.$setViewValue(g.$viewValue.substring(0, g.$viewValue.length - 1));
                        a.length > k && (a = a.slice(0, k));
                        var c = o.$isVisible();
                        c && o.update(a),
                        (1 !== a.length || a[0].value !== b) && (!c && o.update(a),
                        g.$render())
                    }
                    )
                }
                ),
                g.$formatters.push(function(a) {
                    var b = n.displayValue(a);
                    return b ? b : a && "object" != typeof a ? a : ""
                }
                ),
                g.$render = function() {
                    if (g.$isEmpty(g.$viewValue))
                        return b.val("");
                    var a = o.$getIndex(g.$modelValue)
                      , c = angular.isDefined(a) ? o.$scope.$matches[a].label : g.$viewValue;
                    c = angular.isObject(c) ? n.displayValue(c) : c;
                    var d = c ? c.toString().replace(/<(?:.|\n)*?>/gm, "") : "";
                    b.val(h.trimValue === !1 ? d : d.trim())
                }
                ,
                a.$on("$destroy", function() {
                    o && o.destroy(),
                    h = null ,
                    o = null
                }
                )
            }
        }
    }
    ]),
    angular.module("mgcrea.ngStrap.tooltip", ["mgcrea.ngStrap.core", "mgcrea.ngStrap.helpers.dimensions"]).provider("$tooltip", function() {
        var a = this.defaults = {
            animation: "am-fade",
            customClass: "",
            prefixClass: "tooltip",
            prefixEvent: "tooltip",
            container: !1,
            target: !1,
            placement: "top",
            templateUrl: "tooltip/tooltip.tpl.html",
            template: "",
            contentTemplate: !1,
            trigger: "hover focus",
            keyboard: !1,
            html: !1,
            show: !1,
            title: "",
            type: "",
            delay: 0,
            autoClose: !1,
            bsEnabled: !0,
            viewport: {
                selector: "body",
                padding: 0
            }
        };
        this.$get = ["$window", "$rootScope", "$bsCompiler", "$q", "$templateCache", "$http", "$animate", "$sce", "dimensions", "$$rAF", "$timeout", function(c, d, e, f, g, h, i, j, k, l, m) {
            function n(f, g) {
                function h() {
                    I.$emit(G.prefixEvent + ".show", F)
                }
                function n() {
                    if (I.$emit(G.prefixEvent + ".hide", F),
                    O === S) {
                        if (R && "focus" === G.trigger)
                            return f[0].blur();
                        E()
                    }
                }
                function s() {
                    var a = G.trigger.split(" ");
                    angular.forEach(a, function(a) {
                        "click" === a ? f.on("click", F.toggle) : "manual" !== a && (f.on("hover" === a ? "mouseenter" : "focus", F.enter),
                        f.on("hover" === a ? "mouseleave" : "blur", F.leave),
                        "button" === J && "hover" !== a && f.on(q ? "touchstart" : "mousedown", F.$onFocusElementMouseDown))
                    }
                    )
                }
                function t() {
                    for (var a = G.trigger.split(" "), b = a.length; b--; ) {
                        var c = a[b];
                        "click" === c ? f.off("click", F.toggle) : "manual" !== c && (f.off("hover" === c ? "mouseenter" : "focus", F.enter),
                        f.off("hover" === c ? "mouseleave" : "blur", F.leave),
                        "button" === J && "hover" !== c && f.off(q ? "touchstart" : "mousedown", F.$onFocusElementMouseDown))
                    }
                }
                function u() {
                    "focus" !== G.trigger ? O.on("keyup", F.$onKeyUp) : f.on("keyup", F.$onFocusKeyUp)
                }
                function v() {
                    "focus" !== G.trigger ? O.off("keyup", F.$onKeyUp) : f.off("keyup", F.$onFocusKeyUp)
                }
                function w() {
                    m(function() {
                        O.on("click", y),
                        r.on("click", F.hide),
                        T = !0
                    }
                    , 0, !1)
                }
                function x() {
                    T && (O.off("click", y),
                    r.off("click", F.hide),
                    T = !1)
                }
                function y(a) {
                    a.stopPropagation()
                }
                function z(a) {
                    a = a || G.target || f;
                    var d = a[0]
                      , e = "BODY" === d.tagName
                      , g = d.getBoundingClientRect()
                      , h = {};
                    for (var i in g)
                        h[i] = g[i];
                    null  === h.width && (h = angular.extend({}, h, {
                        width: g.right - g.left,
                        height: g.bottom - g.top
                    }));
                    var j = e ? {
                        top: 0,
                        left: 0
                    } : k.offset(d)
                      , l = {
                        scroll: e ? b.documentElement.scrollTop || b.body.scrollTop : a.prop("scrollTop") || 0
                    }
                      , m = e ? {
                        width: b.documentElement.clientWidth,
                        height: c.innerHeight
                    } : null ;
                    return angular.extend({}, h, l, m, j)
                }
                function A(a, b, c, d) {
                    var e, f = a.split("-");
                    switch (f[0]) {
                    case "right":
                        e = {
                            top: b.top + b.height / 2 - d / 2,
                            left: b.left + b.width
                        };
                        break;
                    case "bottom":
                        e = {
                            top: b.top + b.height,
                            left: b.left + b.width / 2 - c / 2
                        };
                        break;
                    case "left":
                        e = {
                            top: b.top + b.height / 2 - d / 2,
                            left: b.left - c
                        };
                        break;
                    default:
                        e = {
                            top: b.top - d,
                            left: b.left + b.width / 2 - c / 2
                        }
                    }
                    if (!f[1])
                        return e;
                    if ("top" === f[0] || "bottom" === f[0])
                        switch (f[1]) {
                        case "left":
                            e.left = b.left;
                            break;
                        case "right":
                            e.left = b.left + b.width - c
                        }
                    else if ("left" === f[0] || "right" === f[0])
                        switch (f[1]) {
                        case "top":
                            e.top = b.top - d;
                            break;
                        case "bottom":
                            e.top = b.top + b.height
                        }
                    return e
                }
                function B(a, b) {
                    var c = O[0]
                      , d = c.offsetWidth
                      , e = c.offsetHeight
                      , f = parseInt(k.css(c, "margin-top"), 10)
                      , g = parseInt(k.css(c, "margin-left"), 10);
                    isNaN(f) && (f = 0),
                    isNaN(g) && (g = 0),
                    a.top = a.top + f,
                    a.left = a.left + g,
                    k.setOffset(c, angular.extend({
                        using: function(a) {
                            O.css({
                                top: Math.round(a.top) + "px",
                                left: Math.round(a.left) + "px",
                                right: ""
                            })
                        }
                    }, a), 0);
                    var h = c.offsetWidth
                      , i = c.offsetHeight;
                    if ("top" === b && i !== e && (a.top = a.top + e - i),
                    !/top-left|top-right|bottom-left|bottom-right/.test(b)) {
                        var j = C(b, a, h, i);
                        if (j.left ? a.left += j.left : a.top += j.top,
                        k.setOffset(c, a),
                        /top|right|bottom|left/.test(b)) {
                            var l = /top|bottom/.test(b)
                              , m = l ? 2 * j.left - d + h : 2 * j.top - e + i
                              , n = l ? "offsetWidth" : "offsetHeight";
                            D(m, c[n], l)
                        }
                    }
                }
                function C(a, b, c, d) {
                    var e = {
                        top: 0,
                        left: 0
                    };
                    if (!F.$viewport)
                        return e;
                    var f = G.viewport && G.viewport.padding || 0
                      , g = z(F.$viewport);
                    if (/right|left/.test(a)) {
                        var h = b.top - f - g.scroll
                          , i = b.top + f - g.scroll + d;
                        h < g.top ? e.top = g.top - h : i > g.top + g.height && (e.top = g.top + g.height - i)
                    } else {
                        var j = b.left - f
                          , k = b.left + f + c;
                        j < g.left ? e.left = g.left - j : k > g.right && (e.left = g.left + g.width - k)
                    }
                    return e
                }
                function D(a, b, c) {
                    var d = p(".tooltip-arrow, .arrow", O[0]);
                    d.css(c ? "left" : "top", 50 * (1 - a / b) + "%").css(c ? "top" : "left", "")
                }
                function E() {
                    clearTimeout(L),
                    F.$isShown && null  !== O && (G.autoClose && x(),
                    G.keyboard && v()),
                    Q && (Q.$destroy(),
                    Q = null ),
                    O && (O.remove(),
                    O = F.$element = null )
                }
                var F = {}
                  , G = F.$options = angular.extend({}, a, g)
                  , H = F.$promise = e.compile(G)
                  , I = F.$scope = G.scope && G.scope.$new() || d.$new()
                  , J = f[0].nodeName.toLowerCase();
                if (G.delay && angular.isString(G.delay)) {
                    var K = G.delay.split(",").map(parseFloat);
                    G.delay = K.length > 1 ? {
                        show: K[0],
                        hide: K[1]
                    } : K[0]
                }
                F.$id = G.id || f.attr("id") || "",
                G.title && (I.title = j.trustAsHtml(G.title)),
                I.$setEnabled = function(a) {
                    I.$$postDigest(function() {
                        F.setEnabled(a)
                    }
                    )
                }
                ,
                I.$hide = function() {
                    I.$$postDigest(function() {
                        F.hide()
                    }
                    )
                }
                ,
                I.$show = function() {
                    I.$$postDigest(function() {
                        F.show()
                    }
                    )
                }
                ,
                I.$toggle = function() {
                    I.$$postDigest(function() {
                        F.toggle()
                    }
                    )
                }
                ,
                F.$isShown = I.$isShown = !1;
                var L, M, N, O, P, Q;
                H.then(function(a) {
                    N = a,
                    F.init()
                }
                ),
                F.init = function() {
                    G.delay && angular.isNumber(G.delay) && (G.delay = {
                        show: G.delay,
                        hide: G.delay
                    }),
                    "self" === G.container ? P = f : angular.isElement(G.container) ? P = G.container : G.container && (P = p(G.container)),
                    s(),
                    G.target && (G.target = angular.isElement(G.target) ? G.target : p(G.target)),
                    G.show && I.$$postDigest(function() {
                        "focus" === G.trigger ? f[0].focus() : F.show()
                    }
                    )
                }
                ,
                F.destroy = function() {
                    t(),
                    E(),
                    I.$destroy()
                }
                ,
                F.enter = function() {
                    return clearTimeout(L),
                    M = "in",
                    G.delay && G.delay.show ? void (L = setTimeout(function() {
                        "in" === M && F.show()
                    }
                    , G.delay.show)) : F.show()
                }
                ,
                F.show = function() {
                    if (G.bsEnabled && !F.$isShown) {
                        I.$emit(G.prefixEvent + ".show.before", F);
                        var a, b;
                        G.container ? (a = P,
                        b = P[0].lastChild ? angular.element(P[0].lastChild) : null ) : (a = null ,
                        b = f),
                        O && E(),
                        Q = F.$scope.$new(),
                        O = F.$element = N.link(Q, function() {}
                        ),
                        O.css({
                            top: "-9999px",
                            left: "-9999px",
                            right: "auto",
                            display: "block",
                            visibility: "hidden"
                        }),
                        G.animation && O.addClass(G.animation),
                        G.type && O.addClass(G.prefixClass + "-" + G.type),
                        G.customClass && O.addClass(G.customClass),
                        b ? b.after(O) : a.prepend(O),
                        F.$isShown = I.$isShown = !0,
                        o(I),
                        F.$applyPlacement(),
                        angular.version.minor <= 2 ? i.enter(O, a, b, h) : i.enter(O, a, b).then(h),
                        o(I),
                        l(function() {
                            O && O.css({
                                visibility: "visible"
                            })
                        }
                        ),
                        G.keyboard && ("focus" !== G.trigger && F.focus(),
                        u()),
                        G.autoClose && w()
                    }
                }
                ,
                F.leave = function() {
                    return clearTimeout(L),
                    M = "out",
                    G.delay && G.delay.hide ? void (L = setTimeout(function() {
                        "out" === M && F.hide()
                    }
                    , G.delay.hide)) : F.hide()
                }
                ;
                var R, S;
                F.hide = function(a) {
                    F.$isShown && (I.$emit(G.prefixEvent + ".hide.before", F),
                    R = a,
                    S = O,
                    angular.version.minor <= 2 ? i.leave(O, n) : i.leave(O).then(n),
                    F.$isShown = I.$isShown = !1,
                    o(I),
                    G.keyboard && null  !== O && v(),
                    G.autoClose && null  !== O && x())
                }
                ,
                F.toggle = function() {
                    F.$isShown ? F.leave() : F.enter()
                }
                ,
                F.focus = function() {
                    O[0].focus()
                }
                ,
                F.setEnabled = function(a) {
                    G.bsEnabled = a
                }
                ,
                F.setViewport = function(a) {
                    G.viewport = a
                }
                ,
                F.$applyPlacement = function() {
                    if (O) {
                        var b = G.placement
                          , c = /\s?auto?\s?/i
                          , d = c.test(b);
                        d && (b = b.replace(c, "") || a.placement),
                        O.addClass(G.placement);
                        var e = z()
                          , f = O.prop("offsetWidth")
                          , g = O.prop("offsetHeight");
                        if (F.$viewport = G.viewport && p(G.viewport.selector || G.viewport),
                        d) {
                            var h = b
                              , i = z(F.$viewport);
                            h.indexOf("bottom") >= 0 && e.bottom + g > i.bottom ? b = h.replace("bottom", "top") : h.indexOf("top") >= 0 && e.top - g < i.top && (b = h.replace("top", "bottom")),
                            ("right" === h || "bottom-left" === h || "top-left" === h) && e.right + f > i.width ? b = "right" === h ? "left" : b.replace("left", "right") : ("left" === h || "bottom-right" === h || "top-right" === h) && e.left - f < i.left && (b = "left" === h ? "right" : b.replace("right", "left")),
                            O.removeClass(h).addClass(b)
                        }
                        var j = A(b, e, f, g);
                        B(j, b)
                    }
                }
                ,
                F.$onKeyUp = function(a) {
                    27 === a.which && F.$isShown && (F.hide(),
                    a.stopPropagation())
                }
                ,
                F.$onFocusKeyUp = function(a) {
                    27 === a.which && (f[0].blur(),
                    a.stopPropagation())
                }
                ,
                F.$onFocusElementMouseDown = function(a) {
                    a.preventDefault(),
                    a.stopPropagation(),
                    F.$isShown ? f[0].blur() : f[0].focus()
                }
                ;
                var T = !1;
                return F
            }
            function o(a) {
                a.$$phase || a.$root && a.$root.$$phase || a.$digest()
            }
            function p(a, c) {
                return angular.element((c || b).querySelectorAll(a))
            }
            var q = (String.prototype.trim,
            "createTouch" in c.document)
              , r = angular.element(c.document);
            return n
        }
        ]
    }
    ).directive("bsTooltip", ["$window", "$location", "$sce", "$tooltip", "$$rAF", function(a, b, c, d, e) {
        return {
            restrict: "EAC",
            scope: !0,
            link: function(a, b, f) {
                var g = {
                    scope: a
                };
                angular.forEach(["template", "templateUrl", "controller", "controllerAs", "contentTemplate", "placement", "container", "delay", "trigger", "html", "animation", "backdropAnimation", "type", "customClass", "id"], function(a) {
                    angular.isDefined(f[a]) && (g[a] = f[a])
                }
                );
                var h = /^(false|0|)$/i;
                angular.forEach(["html", "container"], function(a) {
                    angular.isDefined(f[a]) && h.test(f[a]) && (g[a] = !1)
                }
                );
                var i = b.attr("data-target");
                angular.isDefined(i) && (g.target = h.test(i) ? !1 : i),
                a.hasOwnProperty("title") || (a.title = ""),
                f.$observe("title", function(b) {
                    if (angular.isDefined(b) || !a.hasOwnProperty("title")) {
                        var d = a.title;
                        a.title = c.trustAsHtml(b),
                        angular.isDefined(d) && e(function() {
                            j && j.$applyPlacement()
                        }
                        )
                    }
                }
                ),
                f.bsTooltip && a.$watch(f.bsTooltip, function(b, c) {
                    angular.isObject(b) ? angular.extend(a, b) : a.title = b,
                    angular.isDefined(c) && e(function() {
                        j && j.$applyPlacement()
                    }
                    )
                }
                , !0),
                f.bsShow && a.$watch(f.bsShow, function(a) {
                    j && angular.isDefined(a) && (angular.isString(a) && (a = !!a.match(/true|,?(tooltip),?/i)),
                    a === !0 ? j.show() : j.hide())
                }
                ),
                f.bsEnabled && a.$watch(f.bsEnabled, function(a) {
                    j && angular.isDefined(a) && (angular.isString(a) && (a = !!a.match(/true|1|,?(tooltip),?/i)),
                    j.setEnabled(a === !1 ? !1 : !0))
                }
                ),
                f.viewport && a.$watch(f.viewport, function(a) {
                    j && angular.isDefined(a) && j.setViewport(a)
                }
                );
                var j = d(b, g);
                a.$on("$destroy", function() {
                    j && j.destroy(),
                    g = null ,
                    j = null
                }
                )
            }
        }
    }
    ])
}
(window, document),
function() {
    "use strict";
    angular.module("mgcrea.ngStrap.alert").run(["$templateCache", function(a) {
        a.put("alert/alert.tpl.html", '<div class="alert" ng-class="[type ? \'alert-\' + type : null]"><button type="button" class="close" ng-if="dismissable" ng-click="$hide()">&times;</button> <strong ng-bind="title"></strong>&nbsp;<span ng-bind-html="content"></span></div>')
    }
    ]),
    angular.module("mgcrea.ngStrap.aside").run(["$templateCache", function(a) {
        a.put("aside/aside.tpl.html", '<div class="aside" tabindex="-1" role="dialog"><div class="aside-dialog"><div class="aside-content"><div class="aside-header" ng-show="title"><button type="button" class="close" ng-click="$hide()">&times;</button><h4 class="aside-title" ng-bind="title"></h4></div><div class="aside-body" ng-bind="content"></div><div class="aside-footer"><button type="button" class="btn btn-default" ng-click="$hide()">Close</button></div></div></div></div>')
    }
    ]),
    angular.module("mgcrea.ngStrap.datepicker").run(["$templateCache", function(a) {
        a.put("datepicker/datepicker.tpl.html", '<div class="dropdown-menu datepicker" ng-class="\'datepicker-mode-\' + $mode" style="max-width: 320px"><table style="table-layout: fixed; height: 100%; width: 100%"><thead><tr class="text-center"><th><button tabindex="-1" type="button" class="btn btn-default pull-left" ng-click="$selectPane(-1)"><i class="{{$iconLeft}}"></i></button></th><th colspan="{{ rows[0].length - 2 }}"><button tabindex="-1" type="button" class="btn btn-default btn-block text-strong" ng-click="$toggleMode()"><strong style="text-transform: capitalize" ng-bind="title"></strong></button></th><th><button tabindex="-1" type="button" class="btn btn-default pull-right" ng-click="$selectPane(+1)"><i class="{{$iconRight}}"></i></button></th></tr><tr ng-show="showLabels" ng-bind-html="labels"></tr></thead><tbody><tr ng-repeat="(i, row) in rows" height="{{ 100 / rows.length }}%"><td class="text-center" ng-repeat="(j, el) in row"><button tabindex="-1" type="button" class="btn btn-default" style="width: 100%" ng-class="{\'btn-primary\': el.selected, \'btn-info btn-today\': el.isToday && !el.selected}" ng-click="$select(el.date)" ng-disabled="el.disabled"><span ng-class="{\'text-muted\': el.muted}" ng-bind="el.label"></span></button></td></tr></tbody></table></div>')
    }
    ]),
    angular.module("mgcrea.ngStrap.dropdown").run(["$templateCache", function(a) {
        a.put("dropdown/dropdown.tpl.html", '<ul tabindex="-1" class="dropdown-menu" role="menu"><li role="presentation" ng-class="{divider: item.divider}" ng-repeat="item in content"><a role="menuitem" tabindex="-1" ng-href="{{item.href}}" ng-if="!item.divider && item.href" target="{{item.target || \'\'}}" ng-bind="item.text"></a> <a role="menuitem" tabindex="-1" href="javascript:void(0)" ng-if="!item.divider && item.click" ng-click="$eval(item.click);$hide()" ng-bind="item.text"></a></li></ul>')
    }
    ]),
    angular.module("mgcrea.ngStrap.modal").run(["$templateCache", function(a) {
        a.put("modal/modal.tpl.html", '<div class="modal" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header" ng-show="title"><button type="button" class="close" aria-label="Close" ng-click="$hide()"><span aria-hidden="true">&times;</span></button><h4 class="modal-title" ng-bind="title"></h4></div><div class="modal-body" ng-bind="content"></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="$hide()">Close</button></div></div></div></div>')
    }
    ]),
    angular.module("mgcrea.ngStrap.popover").run(["$templateCache", function(a) {
        a.put("popover/popover.tpl.html", '<div class="popover"><div class="arrow"></div><h3 class="popover-title" ng-bind="title" ng-show="title"></h3><div class="popover-content" ng-bind="content"></div></div>')
    }
    ]),
    angular.module("mgcrea.ngStrap.select").run(["$templateCache", function(a) {
        a.put("select/select.tpl.html", '<ul tabindex="-1" class="select dropdown-menu" ng-show="$isVisible()" role="select"><li ng-if="$showAllNoneButtons"><div class="btn-group" style="margin-bottom: 5px; margin-left: 5px"><button type="button" class="btn btn-default btn-xs" ng-click="$selectAll()">{{$allText}}</button> <button type="button" class="btn btn-default btn-xs" ng-click="$selectNone()">{{$noneText}}</button></div></li><li role="presentation" ng-repeat="match in $matches" ng-class="{active: $isActive($index)}"><a style="cursor: default" role="menuitem" tabindex="-1" ng-click="$select($index, $event)"><i class="{{$iconCheckmark}} pull-right" ng-if="$isMultiple && $isActive($index)"></i> <span ng-bind="match.label"></span></a></li></ul>')
    }
    ]),
    angular.module("mgcrea.ngStrap.timepicker").run(["$templateCache", function(a) {
        a.put("timepicker/timepicker.tpl.html", '<div class="dropdown-menu timepicker" style="min-width: 0px;width: auto"><table height="100%"><thead><tr class="text-center"><th><button tabindex="-1" type="button" class="btn btn-default pull-left" ng-click="$arrowAction(-1, 0)"><i class="{{ $iconUp }}"></i></button></th><th>&nbsp;</th><th><button tabindex="-1" type="button" class="btn btn-default pull-left" ng-click="$arrowAction(-1, 1)"><i class="{{ $iconUp }}"></i></button></th><th>&nbsp;</th><th><button ng-if="showSeconds" tabindex="-1" type="button" class="btn btn-default pull-left" ng-click="$arrowAction(-1, 2)"><i class="{{ $iconUp }}"></i></button></th></tr></thead><tbody><tr ng-repeat="(i, row) in rows"><td class="text-center"><button tabindex="-1" style="width: 100%" type="button" class="btn btn-default" ng-class="{\'btn-primary\': row[0].selected}" ng-click="$select(row[0].date, 0)" ng-disabled="row[0].disabled"><span ng-class="{\'text-muted\': row[0].muted}" ng-bind="row[0].label"></span></button></td><td><span ng-bind="i == midIndex ? timeSeparator : \' \'"></span></td><td class="text-center"><button tabindex="-1" ng-if="row[1].date" style="width: 100%" type="button" class="btn btn-default" ng-class="{\'btn-primary\': row[1].selected}" ng-click="$select(row[1].date, 1)" ng-disabled="row[1].disabled"><span ng-class="{\'text-muted\': row[1].muted}" ng-bind="row[1].label"></span></button></td><td><span ng-bind="i == midIndex ? timeSeparator : \' \'"></span></td><td class="text-center"><button tabindex="-1" ng-if="showSeconds && row[2].date" style="width: 100%" type="button" class="btn btn-default" ng-class="{\'btn-primary\': row[2].selected}" ng-click="$select(row[2].date, 2)" ng-disabled="row[2].disabled"><span ng-class="{\'text-muted\': row[2].muted}" ng-bind="row[2].label"></span></button></td><td ng-if="showAM">&nbsp;</td><td ng-if="showAM"><button tabindex="-1" ng-show="i == midIndex - !isAM * 1" style="width: 100%" type="button" ng-class="{\'btn-primary\': !!isAM}" class="btn btn-default" ng-click="$switchMeridian()" ng-disabled="el.disabled">AM</button> <button tabindex="-1" ng-show="i == midIndex + 1 - !isAM * 1" style="width: 100%" type="button" ng-class="{\'btn-primary\': !isAM}" class="btn btn-default" ng-click="$switchMeridian()" ng-disabled="el.disabled">PM</button></td></tr></tbody><tfoot><tr class="text-center"><th><button tabindex="-1" type="button" class="btn btn-default pull-left" ng-click="$arrowAction(1, 0)"><i class="{{ $iconDown }}"></i></button></th><th>&nbsp;</th><th><button tabindex="-1" type="button" class="btn btn-default pull-left" ng-click="$arrowAction(1, 1)"><i class="{{ $iconDown }}"></i></button></th><th>&nbsp;</th><th><button ng-if="showSeconds" tabindex="-1" type="button" class="btn btn-default pull-left" ng-click="$arrowAction(1, 2)"><i class="{{ $iconDown }}"></i></button></th></tr></tfoot></table></div>')
    }
    ]),
    angular.module("mgcrea.ngStrap.tab").run(["$templateCache", function(a) {
        a.put("tab/tab.tpl.html", '<ul class="nav" ng-class="$navClass" role="tablist"><li role="presentation" ng-repeat="$pane in $panes track by $index" ng-class="[ $isActive($pane, $index) ? $activeClass : \'\', $pane.disabled ? \'disabled\' : \'\' ]"><a role="tab" data-toggle="tab" ng-click="!$pane.disabled && $setActive($pane.name || $index)" data-index="{{ $index }}" ng-bind-html="$pane.title" aria-controls="$pane.title"></a></li></ul><div ng-transclude class="tab-content"></div>')
    }
    ]),
    angular.module("mgcrea.ngStrap.typeahead").run(["$templateCache", function(a) {
        a.put("typeahead/typeahead.tpl.html", '<ul tabindex="-1" class="typeahead dropdown-menu" ng-show="$isVisible()" role="select"><li role="presentation" ng-repeat="match in $matches" ng-class="{active: $index == $activeIndex}"><a role="menuitem" tabindex="-1" ng-click="$select($index, $event)" ng-bind="match.label"></a></li></ul>')
    }
    ]),
    angular.module("mgcrea.ngStrap.tooltip").run(["$templateCache", function(a) {
        a.put("tooltip/tooltip.tpl.html", '<div class="tooltip in" ng-show="title"><div class="tooltip-arrow"></div><div class="tooltip-inner" ng-bind="title"></div></div>')
    }
    ])
}
(window, document),
angular.module("md5", []).factory("md5", function() {
    function a(a) {
        return c(b(d(a)))
    }
    function b(a) {
        return f(g(e(a), 8 * a.length))
    }
    function c(a) {
        try {} catch (b) {
            o = 0
        }
        for (var c, d = o ? "0123456789ABCDEF" : "0123456789abcdef", e = "", f = 0; f < a.length; f++)
            c = a.charCodeAt(f),
            e += d.charAt(c >>> 4 & 15) + d.charAt(15 & c);
        return e
    }
    function d(a) {
        for (var b, c, d = "", e = -1; ++e < a.length; )
            b = a.charCodeAt(e),
            c = e + 1 < a.length ? a.charCodeAt(e + 1) : 0,
            b >= 55296 && 56319 >= b && c >= 56320 && 57343 >= c && (b = 65536 + ((1023 & b) << 10) + (1023 & c),
            e++),
            127 >= b ? d += String.fromCharCode(b) : 2047 >= b ? d += String.fromCharCode(192 | b >>> 6 & 31, 128 | 63 & b) : 65535 >= b ? d += String.fromCharCode(224 | b >>> 12 & 15, 128 | b >>> 6 & 63, 128 | 63 & b) : 2097151 >= b && (d += String.fromCharCode(240 | b >>> 18 & 7, 128 | b >>> 12 & 63, 128 | b >>> 6 & 63, 128 | 63 & b));
        return d
    }
    function e(a) {
        for (var b = Array(a.length >> 2), c = 0; c < b.length; c++)
            b[c] = 0;
        for (var c = 0; c < 8 * a.length; c += 8)
            b[c >> 5] |= (255 & a.charCodeAt(c / 8)) << c % 32;
        return b
    }
    function f(a) {
        for (var b = "", c = 0; c < 32 * a.length; c += 8)
            b += String.fromCharCode(a[c >> 5] >>> c % 32 & 255);
        return b
    }
    function g(a, b) {
        a[b >> 5] |= 128 << b % 32,
        a[(b + 64 >>> 9 << 4) + 14] = b;
        for (var c = 1732584193, d = -271733879, e = -1732584194, f = 271733878, g = 0; g < a.length; g += 16) {
            var h = c
              , n = d
              , o = e
              , p = f;
            c = i(c, d, e, f, a[g + 0], 7, -680876936),
            f = i(f, c, d, e, a[g + 1], 12, -389564586),
            e = i(e, f, c, d, a[g + 2], 17, 606105819),
            d = i(d, e, f, c, a[g + 3], 22, -1044525330),
            c = i(c, d, e, f, a[g + 4], 7, -176418897),
            f = i(f, c, d, e, a[g + 5], 12, 1200080426),
            e = i(e, f, c, d, a[g + 6], 17, -1473231341),
            d = i(d, e, f, c, a[g + 7], 22, -45705983),
            c = i(c, d, e, f, a[g + 8], 7, 1770035416),
            f = i(f, c, d, e, a[g + 9], 12, -1958414417),
            e = i(e, f, c, d, a[g + 10], 17, -42063),
            d = i(d, e, f, c, a[g + 11], 22, -1990404162),
            c = i(c, d, e, f, a[g + 12], 7, 1804603682),
            f = i(f, c, d, e, a[g + 13], 12, -40341101),
            e = i(e, f, c, d, a[g + 14], 17, -1502002290),
            d = i(d, e, f, c, a[g + 15], 22, 1236535329),
            c = j(c, d, e, f, a[g + 1], 5, -165796510),
            f = j(f, c, d, e, a[g + 6], 9, -1069501632),
            e = j(e, f, c, d, a[g + 11], 14, 643717713),
            d = j(d, e, f, c, a[g + 0], 20, -373897302),
            c = j(c, d, e, f, a[g + 5], 5, -701558691),
            f = j(f, c, d, e, a[g + 10], 9, 38016083),
            e = j(e, f, c, d, a[g + 15], 14, -660478335),
            d = j(d, e, f, c, a[g + 4], 20, -405537848),
            c = j(c, d, e, f, a[g + 9], 5, 568446438),
            f = j(f, c, d, e, a[g + 14], 9, -1019803690),
            e = j(e, f, c, d, a[g + 3], 14, -187363961),
            d = j(d, e, f, c, a[g + 8], 20, 1163531501),
            c = j(c, d, e, f, a[g + 13], 5, -1444681467),
            f = j(f, c, d, e, a[g + 2], 9, -51403784),
            e = j(e, f, c, d, a[g + 7], 14, 1735328473),
            d = j(d, e, f, c, a[g + 12], 20, -1926607734),
            c = k(c, d, e, f, a[g + 5], 4, -378558),
            f = k(f, c, d, e, a[g + 8], 11, -2022574463),
            e = k(e, f, c, d, a[g + 11], 16, 1839030562),
            d = k(d, e, f, c, a[g + 14], 23, -35309556),
            c = k(c, d, e, f, a[g + 1], 4, -1530992060),
            f = k(f, c, d, e, a[g + 4], 11, 1272893353),
            e = k(e, f, c, d, a[g + 7], 16, -155497632),
            d = k(d, e, f, c, a[g + 10], 23, -1094730640),
            c = k(c, d, e, f, a[g + 13], 4, 681279174),
            f = k(f, c, d, e, a[g + 0], 11, -358537222),
            e = k(e, f, c, d, a[g + 3], 16, -722521979),
            d = k(d, e, f, c, a[g + 6], 23, 76029189),
            c = k(c, d, e, f, a[g + 9], 4, -640364487),
            f = k(f, c, d, e, a[g + 12], 11, -421815835),
            e = k(e, f, c, d, a[g + 15], 16, 530742520),
            d = k(d, e, f, c, a[g + 2], 23, -995338651),
            c = l(c, d, e, f, a[g + 0], 6, -198630844),
            f = l(f, c, d, e, a[g + 7], 10, 1126891415),
            e = l(e, f, c, d, a[g + 14], 15, -1416354905),
            d = l(d, e, f, c, a[g + 5], 21, -57434055),
            c = l(c, d, e, f, a[g + 12], 6, 1700485571),
            f = l(f, c, d, e, a[g + 3], 10, -1894986606),
            e = l(e, f, c, d, a[g + 10], 15, -1051523),
            d = l(d, e, f, c, a[g + 1], 21, -2054922799),
            c = l(c, d, e, f, a[g + 8], 6, 1873313359),
            f = l(f, c, d, e, a[g + 15], 10, -30611744),
            e = l(e, f, c, d, a[g + 6], 15, -1560198380),
            d = l(d, e, f, c, a[g + 13], 21, 1309151649),
            c = l(c, d, e, f, a[g + 4], 6, -145523070),
            f = l(f, c, d, e, a[g + 11], 10, -1120210379),
            e = l(e, f, c, d, a[g + 2], 15, 718787259),
            d = l(d, e, f, c, a[g + 9], 21, -343485551),
            c = m(c, h),
            d = m(d, n),
            e = m(e, o),
            f = m(f, p)
        }
        return Array(c, d, e, f)
    }
    function h(a, b, c, d, e, f) {
        return m(n(m(m(b, a), m(d, f)), e), c)
    }
    function i(a, b, c, d, e, f, g) {
        return h(b & c | ~b & d, a, b, e, f, g)
    }
    function j(a, b, c, d, e, f, g) {
        return h(b & d | c & ~d, a, b, e, f, g)
    }
    function k(a, b, c, d, e, f, g) {
        return h(b ^ c ^ d, a, b, e, f, g)
    }
    function l(a, b, c, d, e, f, g) {
        return h(c ^ (b | ~d), a, b, e, f, g)
    }
    function m(a, b) {
        var c = (65535 & a) + (65535 & b)
          , d = (a >> 16) + (b >> 16) + (c >> 16);
        return d << 16 | 65535 & c
    }
    function n(a, b) {
        return a << b | a >>> 32 - b
    }
    var o = 0;
    return a
}
),
function() {
    var a;
    a = function(a) {
        return ["gravatarService", function(b) {
            var c;
            return c = function(a, b) {
                var c, d, e;
                d = {};
                for (c in b)
                    e = b[c],
                    0 === c.indexOf(a) && (c = c.substr(a.length).toLowerCase(),
                    c.length > 0 && (d[c] = e));
                return d
            }
            ,
            {
                restrict: "A",
                link: function(d, e, f) {
                    var g, h, i, j;
                    g = a ? "gravatarSrcOnce" : "gravatarSrc",
                    h = f[g],
                    delete f[g],
                    i = c("gravatar", f),
                    j = d.$watch(h, function(c) {
                        if (a) {
                            if (null  == c)
                                return;
                            j()
                        }
                        e.attr("src", b.url(c, i))
                    }
                    )
                }
            }
        }
        ]
    }
    ,
    angular.module("ui.gravatar", ["md5"]).provider("gravatarService", function() {
        var a, b, c;
        return b = this,
        a = /^[0-9a-f]{32}$/i,
        c = function(a) {
            var b, c, d;
            c = [];
            for (b in a)
                d = a[b],
                c.push("" + b + "=" + encodeURIComponent(d));
            return c.join("&")
        }
        ,
        this.defaults = {},
        this.secure = !1,
        this.protocol = null ,
        this.$get = ["md5", function(d) {
            return {
                url: function(e, f) {
                    var g, h, i, j;
                    return null  == e && (e = ""),
                    null  == f && (f = {}),
                    f = angular.extend(angular.copy(b.defaults), f),
                    i = b.protocol ? b.protocol + ":" : "",
                    j = b.secure ? "https://secure" : i + "//www",
                    e = a.test(e) ? e : d(e),
                    h = [j, ".gravatar.com/avatar/", e],
                    g = c(f),
                    g.length > 0 && h.push("?" + g),
                    h.join("")
                }
            }
        }
        ],
        this
    }
    ).directive("gravatarSrc", a()).directive("gravatarSrcOnce", a(!0))
}
.call(this),
function(a, b) {
    "use strict";
    function c(a, b, c) {
        d.directive(a, ["$parse", "$swipe", function(d, e) {
            var f = 75
              , g = .3
              , h = 30;
            return function(i, j, k) {
                function l(a) {
                    if (!m)
                        return !1;
                    var c = Math.abs(a.y - m.y)
                      , d = (a.x - m.x) * b;
                    return n && f > c && d > 0 && d > h && g > c / d
                }
                var m, n, o = d(k[a]);
                e.bind(j, {
                    start: function(a) {
                        m = a,
                        n = !0
                    },
                    cancel: function() {
                        n = !1
                    },
                    end: function(a, b) {
                        l(a) && i.$apply(function() {
                            j.triggerHandler(c),
                            o(i, {
                                $event: b
                            })
                        }
                        )
                    }
                })
            }
        }
        ])
    }
    var d = b.module("ngTouch", []);
    d.factory("$swipe", [function() {
        function a(a) {
            var b = a.touches && a.touches.length ? a.touches : [a]
              , c = a.changedTouches && a.changedTouches[0] || a.originalEvent && a.originalEvent.changedTouches && a.originalEvent.changedTouches[0] || b[0].originalEvent || b[0];
            return {
                x: c.clientX,
                y: c.clientY
            }
        }
        var b = 10;
        return {
            bind: function(c, d) {
                var e, f, g, h, i = !1;
                c.on("touchstart mousedown", function(b) {
                    g = a(b),
                    i = !0,
                    e = 0,
                    f = 0,
                    h = g,
                    d.start && d.start(g, b)
                }
                ),
                c.on("touchcancel", function(a) {
                    i = !1,
                    d.cancel && d.cancel(a)
                }
                ),
                c.on("touchmove mousemove", function(c) {
                    if (i && g) {
                        var j = a(c);
                        if (e += Math.abs(j.x - h.x),
                        f += Math.abs(j.y - h.y),
                        h = j,
                        !(b > e && b > f))
                            return f > e ? (i = !1,
                            void (d.cancel && d.cancel(c))) : (c.preventDefault(),
                            void (d.move && d.move(j, c)))
                    }
                }
                ),
                c.on("touchend mouseup", function(b) {
                    i && (i = !1,
                    d.end && d.end(a(b), b))
                }
                )
            }
        }
    }
    ]),
    d.config(["$provide", function(a) {
        a.decorator("ngClickDirective", ["$delegate", function(a) {
            return a.shift(),
            a
        }
        ])
    }
    ]),
    d.directive("ngClick", ["$parse", "$timeout", "$rootElement", function(a, c, d) {
        function e(a, b, c, d) {
            return Math.abs(a - c) < p && Math.abs(b - d) < p
        }
        function f(a, b, c) {
            for (var d = 0; d < a.length; d += 2)
                if (e(a[d], a[d + 1], b, c))
                    return a.splice(d, d + 2),
                    !0;
            return !1
        }
        function g(a) {
            if (!(Date.now() - j > o)) {
                var b = a.touches && a.touches.length ? a.touches : [a]
                  , c = b[0].clientX
                  , d = b[0].clientY;
                1 > c && 1 > d || l && l[0] === c && l[1] === d || (l && (l = null ),
                "label" === a.target.tagName.toLowerCase() && (l = [c, d]),
                f(k, c, d) || (a.stopPropagation(),
                a.preventDefault(),
                a.target && a.target.blur()))
            }
        }
        function h(a) {
            var b = a.touches && a.touches.length ? a.touches : [a]
              , d = b[0].clientX
              , e = b[0].clientY;
            k.push(d, e),
            c(function() {
                for (var a = 0; a < k.length; a += 2)
                    if (k[a] == d && k[a + 1] == e)
                        return void k.splice(a, a + 2)
            }
            , o, !1)
        }
        function i(a, b) {
            k || (d[0].addEventListener("click", g, !0),
            d[0].addEventListener("touchstart", h, !0),
            k = []),
            j = Date.now(),
            f(k, a, b)
        }
        var j, k, l, m = 750, n = 12, o = 2500, p = 25, q = "ng-click-active";
        return function(c, d, e) {
            function f() {
                o = !1,
                d.removeClass(q)
            }
            var g, h, j, k, l = a(e.ngClick), o = !1;
            d.on("touchstart", function(a) {
                o = !0,
                g = a.target ? a.target : a.srcElement,
                3 == g.nodeType && (g = g.parentNode),
                d.addClass(q),
                h = Date.now();
                var b = a.touches && a.touches.length ? a.touches : [a]
                  , c = b[0].originalEvent || b[0];
                j = c.clientX,
                k = c.clientY
            }
            ),
            d.on("touchmove", function() {
                f()
            }
            ),
            d.on("touchcancel", function() {
                f()
            }
            ),
            d.on("touchend", function(a) {
                var c = Date.now() - h
                  , l = a.changedTouches && a.changedTouches.length ? a.changedTouches : a.touches && a.touches.length ? a.touches : [a]
                  , p = l[0].originalEvent || l[0]
                  , q = p.clientX
                  , r = p.clientY
                  , s = Math.sqrt(Math.pow(q - j, 2) + Math.pow(r - k, 2));
                o && m > c && n > s && (i(q, r),
                g && g.blur(),
                b.isDefined(e.disabled) && e.disabled !== !1 || d.triggerHandler("click", [a])),
                f()
            }
            ),
            d.onclick = function() {}
            ,
            d.on("click", function(a, b) {
                c.$apply(function() {
                    l(c, {
                        $event: b || a
                    })
                }
                )
            }
            ),
            d.on("mousedown", function() {
                d.addClass(q)
            }
            ),
            d.on("mousemove mouseup", function() {
                d.removeClass(q)
            }
            )
        }
    }
    ]),
    c("ngSwipeLeft", -1, "swipeleft"),
    c("ngSwipeRight", 1, "swiperight")
}
(window, window.angular),
angular.module("angular-carousel", ["ngTouch"]),
angular.module("angular-carousel").directive("rnCarouselAutoSlide", ["$timeout", function(a) {
    return {
        restrict: "A",
        link: function(b, c, d) {
            var e = Math.round(1e3 * parseFloat(d.rnCarouselAutoSlide))
              , f = increment = !1
              , g = c.children().length;
            b.carouselExposedIndex || (b.carouselExposedIndex = 0),
            stopAutoplay = function() {
                angular.isDefined(f) && a.cancel(f),
                f = void 0
            }
            ,
            increment = function() {
                b.carouselExposedIndex = b.carouselExposedIndex < g - 1 ? b.carouselExposedIndex + 1 : 0
            }
            ,
            restartTimer = function() {
                stopAutoplay(),
                f = a(increment, e)
            }
            ,
            b.$watch("carouselIndex", function() {
                restartTimer()
            }
            ),
            restartTimer(),
            d.rnCarouselPauseOnHover && "false" != d.rnCarouselPauseOnHover && (c.on("mouseenter", stopAutoplay),
            c.on("mouseleave", restartTimer)),
            b.$on("$destroy", function() {
                stopAutoplay(),
                c.off("mouseenter", stopAutoplay),
                c.off("mouseleave", restartTimer)
            }
            )
        }
    }
}
]),
angular.module("angular-carousel").directive("rnCarouselControls", [function() {
    return {
        restrict: "A",
        replace: !0,
        scope: {
            items: "=",
            index: "="
        },
        link: function(a) {
            a.prev = function() {
                a.index > 0 && a.index--
            }
            ,
            a.next = function() {
                a.index < a.items.length - 1 && a.index++
            }
        },
        templateUrl: "carousel-controls.html"
    }
}
]),
angular.module("angular-carousel").run(["$templateCache", function(a) {
    a.put("carousel-controls.html", '<div class="rn-carousel-controls">\n  <span class="rn-carousel-control rn-carousel-control-prev" ng-click="prev()" ng-if="index > 0"></span>\n  <span class="rn-carousel-control rn-carousel-control-next" ng-click="next()" ng-if="index < items.length - 1"></span>\n</div>')
}
]),
angular.module("angular-carousel").directive("rnCarouselIndicators", [function() {
    return {
        restrict: "A",
        replace: !0,
        scope: {
            items: "=",
            index: "="
        },
        templateUrl: "carousel-indicators.html"
    }
}
]),
angular.module("angular-carousel").run(["$templateCache", function(a) {
    a.put("carousel-indicators.html", '<div class="rn-carousel-indicator">\n <span ng-repeat="item in items" ng-click="$parent.index=$index" ng-class="{active: $index==$parent.index}"></span>\n</div>')
}
]),
function() {
    "use strict";
    angular.module("angular-carousel").directive("rnCarousel", ["$swipe", "$window", "$document", "$parse", "$compile", "$rootScope", function(a, b, c, d, e, f) {
        var g = 0
          , h = 75
          , i = .05
          , j = 3
          , k = b.requestAnimationFrame || b.webkitRequestAnimationFrame || b.mozRequestAnimationFrame;
        return {
            restrict: "A",
            scope: !0,
            compile: function(l, m) {
                var n, o, p = l.children()[0].attributes, q = !1, r = !1, s = !1;
                return l.addClass("rn-carousel-slides"),
                l.children().addClass("rn-carousel-slide"),
                ["ng-repeat", "data-ng-repeat", "x-ng-repeat"].every(function(a) {
                    var b = p[a];
                    if (angular.isDefined(b)) {
                        var c = b.value.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/)
                          , d = c[3];
                        if (n = c[1],
                        o = c[2],
                        n)
                            return angular.isDefined(m.rnCarouselBuffered) && (r = !0,
                            b.value = n + " in " + o + "|carouselSlice:carouselBufferIndex:carouselBufferSize",
                            d && (b.value += " track by " + d)),
                            q = !0,
                            !1
                    }
                    return !0
                }
                ),
                function(l, m, n) {
                    function p() {
                        for (var a = [], b = 0; Q > b; b++)
                            a[b] = b;
                        l.carouselIndicatorArray = a
                    }
                    function t() {
                        var a = T.children();
                        return I = 0 === a.length ? T[0].getBoundingClientRect().width : a[0].getBoundingClientRect().width
                    }
                    function u() {
                        U.css("width", "100%");
                        var a = t();
                        a && U.css("width", a + "px")
                    }
                    function v(a) {
                        isNaN(a) && (a = l.carouselIndex * I),
                        P = a;
                        var b = -Math.round(P);
                        b += l.carouselBufferIndex * I,
                        T[0].style[J] = Z ? "translate3d(" + b + "px, 0, 0)" : "translate(" + b + "px, 0)"
                    }
                    function w() {
                        var a, b;
                        M && (a = Date.now() - O,
                        b = M * Math.exp(-a / h),
                        b > j || -j > b ? (v(N - b),
                        k(w)) : z(N / I))
                    }
                    function x(a) {
                        return a >= Q ? Q : 0 >= a ? 0 : a
                    }
                    function y() {
                        var a = 0
                          , b = (l.carouselBufferSize - 1) / 2;
                        r && (a = l.carouselIndex <= b ? 0 : Q < l.carouselBufferSize ? 0 : l.carouselIndex > Q - l.carouselBufferSize ? Q - l.carouselBufferSize : l.carouselIndex - b),
                        l.carouselBufferIndex = a
                    }
                    function z(a, b) {
                        return isNaN(a) && (a = l.carouselIndex),
                        b ? (P = a * I,
                        void F(null , null , !0)) : (l.carouselIndex = x(a),
                        y(),
                        "$apply" !== f.$$phase && "$digest" !== f.$$phase && (s ? l.$apply() : l.$digest()),
                        void v())
                    }
                    function A() {
                        return i * I
                    }
                    function B(a) {
                        R = !0,
                        F({
                            x: a.clientX,
                            y: a.clientY
                        }, a)
                    }
                    function C(a) {
                        var b = a;
                        return 0 === l.carouselIndex ? b = Math.max(-A(), b) : l.carouselIndex === Q - 1 && (b = Math.min((Q - 1) * I + A(), b)),
                        b
                    }
                    function D(a) {
                        return c.bind("mouseup", B),
                        K = !0,
                        L = a.x,
                        M = 0,
                        O = Date.now(),
                        !1
                    }
                    function E(a) {
                        var b, c;
                        return K && (b = a.x,
                        c = L - b,
                        (c > 2 || -2 > c) && (R = !0,
                        L = b,
                        k(function() {
                            v(C(P + c))
                        }
                        ))),
                        !1
                    }
                    function F(a, b, d) {
                        if (!b || R) {
                            c.unbind("mouseup", B),
                            K = !1,
                            R = !1,
                            N = P;
                            var e = A()
                              , f = l.carouselIndex * I
                              , g = f - N
                              , h = -Math[g >= 0 ? "ceil" : "floor"](g / I)
                              , i = Math.abs(g) > e;
                            h + l.carouselIndex >= Q && (h = Q - 1 - l.carouselIndex),
                            h + l.carouselIndex < 0 && (h = -l.carouselIndex);
                            var j = i ? h : 0;
                            return N = (j + l.carouselIndex) * I,
                            M = N - P,
                            O = Date.now(),
                            d && (M = P - f),
                            k(w),
                            !1
                        }
                    }
                    function G() {
                        var a, b = document.createElement("p"), c = {
                            webkitTransform: "-webkit-transform",
                            msTransform: "-ms-transform",
                            transform: "transform"
                        };
                        document.body.insertBefore(b, null );
                        for (var d in c)
                            void 0 !== b.style[d] && (b.style[d] = "translate3d(1px,1px,1px)",
                            a = window.getComputedStyle(b).getPropertyValue(c[d]));
                        return document.body.removeChild(b),
                        void 0 !== a && a.length > 0 && "none" !== a
                    }
                    function H() {
                        u(),
                        z()
                    }
                    g++;
                    var I, J, K, L, M, N, O, P = 0, Q = 0, R = !1, S = !0, T = m.wrap("<div id='carousel-" + g + "' class='rn-carousel-container'></div>"), U = T.parent();
                    if ((angular.isDefined(n.rnCarouselIndicator) || angular.isDefined(n.rnCarouselControl)) && (p(),
                    l.$watch("carouselIndex", function(a) {
                        l.indicatorIndex = a,
                        l.carouselExposedIndex = a
                    }
                    ),
                    l.$watch("indicatorIndex", function(a) {
                        z(a, !0)
                    }
                    )),
                    angular.isDefined(n.rnCarouselPreventAnimation) && (S = !1),
                    l.$watch("carouselExposedIndex", function(a) {
                        z(a, !0)
                    }
                    ),
                    angular.isDefined(n.rnCarouselIndicator)) {
                        var V = e("<div id='carousel-" + g + "-indicator' index='indicatorIndex' items='carouselIndicatorArray' rn-carousel-indicators class='rn-carousel-indicator'></div>")(l);
                        U.append(V)
                    }
                    if (angular.isDefined(n.rnCarouselControl)) {
                        var W = e("<div id='carousel-" + g + "-controls' index='indicatorIndex' items='carouselIndicatorArray' rn-carousel-controls class='rn-carousel-controls'></div>")(l);
                        U.append(W)
                    }
                    if (l.carouselBufferIndex = 0,
                    l.carouselBufferSize = 5,
                    l.carouselIndex = 0,
                    n.rnCarouselIndex) {
                        var X = function(a) {
                            Y.assign(l.$parent, a)
                        }
                          , Y = d(n.rnCarouselIndex);
                        angular.isFunction(Y.assign) ? (l.$watch("carouselIndex", function(a) {
                            X(a)
                        }
                        ),
                        l.carouselIndex = Y(l),
                        l.$parent.$watch(Y, function(a) {
                            void 0 !== a && (a >= Q ? (a = Q - 1,
                            X(a)) : 0 > a && (a = 0,
                            X(a)),
                            z(a, S))
                        }
                        ),
                        s = !0) : isNaN(n.rnCarouselIndex) || (l.carouselIndex = parseInt(n.rnCarouselIndex, 10))
                    }
                    q ? l.$watchCollection(o, function(a) {
                        Q = 0,
                        angular.isArray(a) ? Q = a.length : angular.isObject(a) && (Q = Object.keys(a).length),
                        p(),
                        I || u(),
                        z(l.carouselIndex)
                    }
                    ) : (Q = m.children().length,
                    p(),
                    u()),
                    n.$observe("rnCarouselSwipe", function(b) {
                        "false" !== b && "off" !== b ? a.bind(T, {
                            start: D,
                            move: E,
                            end: F,
                            cancel: function(a) {
                                F({}, a)
                            }
                        }) : T.unbind()
                    }
                    ),
                    s || z(l.carouselIndex),
                    J = "transform",
                    ["webkit", "Moz", "O", "ms"].every(function(a) {
                        var b = a + "Transform";
                        return "undefined" != typeof document.body.style[b] ? (J = b,
                        !1) : !0
                    }
                    );
                    var Z = G()
                      , $ = angular.element(b);
                    $.bind("orientationchange", H),
                    $.bind("resize", H),
                    l.$on("$destroy", function() {
                        c.unbind("mouseup", B),
                        $.unbind("orientationchange", H),
                        $.unbind("resize", H)
                    }
                    )
                }
            }
        }
    }
    ])
}
(),
function() {
    "use strict";
    angular.module("angular-carousel").filter("carouselSlice", function() {
        return function(a, b, c) {
            return angular.isArray(a) ? a.slice(b, b + c) : angular.isObject(a) ? a : void 0
        }
    }
    )
}
(),
function() {
    var a = angular.module("angularFileUpload", []);
    a.service("$upload", ["$http", "$q", "$timeout", function(a, b, c) {
        function d(d) {
            d.method = d.method || "POST",
            d.headers = d.headers || {},
            d.transformRequest = d.transformRequest || function(b, c) {
                return window.ArrayBuffer && b instanceof window.ArrayBuffer ? b : a.defaults.transformRequest[0](b, c)
            }
            ;
            var e = b.defer();
            window.XMLHttpRequest.__isShim && (d.headers.__setXHR_ = function() {
                return function(a) {
                    a && (d.__XHR = a,
                    d.xhrFn && d.xhrFn(a),
                    a.upload.addEventListener("progress", function(a) {
                        e.notify(a)
                    }
                    , !1),
                    a.upload.addEventListener("load", function(a) {
                        a.lengthComputable && e.notify(a)
                    }
                    , !1))
                }
            }
            ),
            a(d).then(function(a) {
                e.resolve(a)
            }
            , function(a) {
                e.reject(a)
            }
            , function(a) {
                e.notify(a)
            }
            );
            var f = e.promise;
            return f.success = function(a) {
                return f.then(function(b) {
                    a(b.data, b.status, b.headers, d)
                }
                ),
                f
            }
            ,
            f.error = function(a) {
                return f.then(null , function(b) {
                    a(b.data, b.status, b.headers, d)
                }
                ),
                f
            }
            ,
            f.progress = function(a) {
                return f.then(null , null , function(b) {
                    a(b)
                }
                ),
                f
            }
            ,
            f.abort = function() {
                return d.__XHR && c(function() {
                    d.__XHR.abort()
                }
                ),
                f
            }
            ,
            f.xhr = function(a) {
                return d.xhrFn = function(b) {
                    return function() {
                        b && b.apply(f, arguments),
                        a.apply(f, arguments)
                    }
                }
                (d.xhrFn),
                f
            }
            ,
            f
        }
        this.upload = function(b) {
            b.headers = b.headers || {},
            b.headers["Content-Type"] = void 0,
            b.transformRequest = b.transformRequest || a.defaults.transformRequest;
            var c = new FormData
              , e = b.transformRequest
              , f = b.data;
            return b.transformRequest = function(a, c) {
                if (f)
                    if (b.formDataAppender)
                        for (var d in f) {
                            var g = f[d];
                            b.formDataAppender(a, d, g)
                        }
                    else
                        for (var d in f) {
                            var g = f[d];
                            if ("function" == typeof e)
                                g = e(g, c);
                            else
                                for (var h = 0; h < e.length; h++) {
                                    var i = e[h];
                                    "function" == typeof i && (g = i(g, c))
                                }
                            a.append(d, g)
                        }
                if (null  != b.file) {
                    var j = b.fileFormDataName || "file";
                    if ("[object Array]" === Object.prototype.toString.call(b.file))
                        for (var k = "[object String]" === Object.prototype.toString.call(j), h = 0; h < b.file.length; h++)
                            a.append(k ? j : j[h], b.file[h], b.fileName && b.fileName[h] || b.file[h].name);
                    else
                        a.append(j, b.file, b.fileName || b.file.name)
                }
                return a
            }
            ,
            b.data = c,
            d(b)
        }
        ,
        this.http = function(a) {
            return d(a)
        }
    }
    ]),
    a.directive("ngFileSelect", ["$parse", "$timeout", function(a, b) {
        return function(c, d, e) {
            var f = a(e.ngFileSelect);
            if ("input" !== d[0].tagName.toLowerCase() || "file" !== (d.attr("type") && d.attr("type").toLowerCase())) {
                for (var g = angular.element('<input type="file">'), h = d[0].attributes, i = 0; i < h.length; i++)
                    "type" !== h[i].name.toLowerCase() && g.attr(h[i].name, h[i].value);
                e.multiple && g.attr("multiple", "true"),
                g.css("width", "1px").css("height", "1px").css("opacity", 0).css("position", "absolute").css("filter", "alpha(opacity=0)").css("padding", 0).css("margin", 0).css("overflow", "hidden"),
                g.attr("__wrapper_for_parent_", !0),
                d.append(g),
                d[0].__file_click_fn_delegate_ = function() {
                    g[0].click()
                }
                ,
                d.bind("click", d[0].__file_click_fn_delegate_),
                d.css("overflow", "hidden"),
                d = g
            }
            d.bind("change", function(a) {
                var d, e, g = [];
                if (d = a.__files_ || a.target.files,
                null  != d)
                    for (e = 0; e < d.length; e++)
                        g.push(d.item(e));
                b(function() {
                    f(c, {
                        $files: g,
                        $event: a
                    })
                }
                )
            }
            )
        }
    }
    ]),
    a.directive("ngFileDropAvailable", ["$parse", "$timeout", function(a, b) {
        return function(c, d, e) {
            if ("draggable" in document.createElement("span")) {
                var f = a(e.ngFileDropAvailable);
                b(function() {
                    f(c)
                }
                )
            }
        }
    }
    ]),
    a.directive("ngFileDrop", ["$parse", "$timeout", "$location", function(a, b, c) {
        return function(d, e, f) {
            function g(a) {
                return /^[\000-\177]*$/.test(a)
            }
            function h(a, d) {
                var e = []
                  , f = a.dataTransfer.items;
                if (f && f.length > 0 && f[0].webkitGetAsEntry && "file" != c.protocol() && f[0].webkitGetAsEntry().isDirectory)
                    for (var h = 0; h < f.length; h++) {
                        var j = f[h].webkitGetAsEntry();
                        null  != j && (g(j.name) ? i(e, j) : f[h].webkitGetAsEntry().isDirectory || e.push(f[h].getAsFile()))
                    }
                else {
                    var k = a.dataTransfer.files;
                    if (null  != k)
                        for (var h = 0; h < k.length; h++)
                            e.push(k.item(h))
                }
                !function m(a) {
                    b(function() {
                        l ? m(10) : d(e)
                    }
                    , a || 0)
                }
                ()
            }
            function i(a, b, c) {
                if (null  != b)
                    if (b.isDirectory) {
                        var d = b.createReader();
                        l++,
                        d.readEntries(function(d) {
                            for (var e = 0; e < d.length; e++)
                                i(a, d[e], (c ? c : "") + b.name + "/");
                            l--
                        }
                        )
                    } else
                        l++,
                        b.file(function(b) {
                            l--,
                            b._relativePath = (c ? c : "") + b.name,
                            a.push(b)
                        }
                        )
            }
            if ("draggable" in document.createElement("span")) {
                var j = null ;
                e[0].addEventListener("dragover", function(c) {
                    if (c.preventDefault(),
                    b.cancel(j),
                    !e[0].__drag_over_class_)
                        if (f.ngFileDragOverClass && f.ngFileDragOverClass.search(/\) *$/) > -1) {
                            var g = a(f.ngFileDragOverClass)(d, {
                                $event: c
                            });
                            e[0].__drag_over_class_ = g
                        } else
                            e[0].__drag_over_class_ = f.ngFileDragOverClass || "dragover";
                    e.addClass(e[0].__drag_over_class_)
                }
                , !1),
                e[0].addEventListener("dragenter", function(a) {
                    a.preventDefault()
                }
                , !1),
                e[0].addEventListener("dragleave", function() {
                    j = b(function() {
                        e.removeClass(e[0].__drag_over_class_),
                        e[0].__drag_over_class_ = null
                    }
                    , f.ngFileDragOverDelay || 1)
                }
                , !1);
                var k = a(f.ngFileDrop);
                e[0].addEventListener("drop", function(a) {
                    a.preventDefault(),
                    e.removeClass(e[0].__drag_over_class_),
                    e[0].__drag_over_class_ = null ,
                    h(a, function(b) {
                        k(d, {
                            $files: b,
                            $event: a
                        })
                    }
                    )
                }
                , !1);
                var l = 0
            }
        }
    }
    ])
}
(),
function() {
    var a = function() {
        try {
            var a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
            if (a)
                return !0
        } catch (b) {
            if (void 0 != navigator.mimeTypes["application/x-shockwave-flash"])
                return !0
        }
        return !1
    }
      , b = function(a, b) {
        window.XMLHttpRequest.prototype[a] = b(window.XMLHttpRequest.prototype[a])
    }
    ;
    if (window.XMLHttpRequest) {
        if (!window.FormData || window.FileAPI && FileAPI.forceLoad) {
            var c = function(a) {
                if (!a.__listeners) {
                    a.upload || (a.upload = {}),
                    a.__listeners = [];
                    var b = a.upload.addEventListener;
                    a.upload.addEventListener = function(c, d) {
                        a.__listeners[c] = d,
                        b && b.apply(this, arguments)
                    }
                }
            }
            ;
            b("open", function(a) {
                return function(b, d, e) {
                    c(this),
                    this.__url = d;
                    try {
                        a.apply(this, [b, d, e])
                    } catch (f) {
                        f.message.indexOf("Access is denied") > -1 && a.apply(this, [b, "_fix_for_ie_crossdomain__", e])
                    }
                }
            }
            ),
            b("getResponseHeader", function(a) {
                return function(b) {
                    return this.__fileApiXHR && this.__fileApiXHR.getResponseHeader ? this.__fileApiXHR.getResponseHeader(b) : null  == a ? null  : a.apply(this, [b])
                }
            }
            ),
            b("getAllResponseHeaders", function(a) {
                return function() {
                    return this.__fileApiXHR && this.__fileApiXHR.getAllResponseHeaders ? this.__fileApiXHR.getAllResponseHeaders() : null  == a ? null  : a.apply(this)
                }
            }
            ),
            b("abort", function(a) {
                return function() {
                    return this.__fileApiXHR && this.__fileApiXHR.abort ? this.__fileApiXHR.abort() : null  == a ? null  : a.apply(this)
                }
            }
            ),
            b("setRequestHeader", function(a) {
                return function(b, d) {
                    if ("__setXHR_" === b) {
                        c(this);
                        var e = d(this);
                        e instanceof Function && e(this)
                    } else
                        this.__requestHeaders = this.__requestHeaders || {},
                        this.__requestHeaders[b] = d,
                        a.apply(this, arguments)
                }
            }
            ),
            b("send", function(b) {
                return function() {
                    var c = this;
                    if (arguments[0] && arguments[0].__isShim) {
                        var d = arguments[0]
                          , e = {
                            url: c.__url,
                            jsonp: !1,
                            cache: !0,
                            complete: function(a, b) {
                                c.__completed = !0,
                                !a && c.__listeners.load && c.__listeners.load({
                                    type: "load",
                                    loaded: c.__loaded,
                                    total: c.__total,
                                    target: c,
                                    lengthComputable: !0
                                }),
                                !a && c.__listeners.loadend && c.__listeners.loadend({
                                    type: "loadend",
                                    loaded: c.__loaded,
                                    total: c.__total,
                                    target: c,
                                    lengthComputable: !0
                                }),
                                "abort" === a && c.__listeners.abort && c.__listeners.abort({
                                    type: "abort",
                                    loaded: c.__loaded,
                                    total: c.__total,
                                    target: c,
                                    lengthComputable: !0
                                }),
                                void 0 !== b.status && Object.defineProperty(c, "status", {
                                    get: function() {
                                        return 0 == b.status && a && "abort" !== a ? 500 : b.status
                                    }
                                }),
                                void 0 !== b.statusText && Object.defineProperty(c, "statusText", {
                                    get: function() {
                                        return b.statusText
                                    }
                                }),
                                Object.defineProperty(c, "readyState", {
                                    get: function() {
                                        return 4
                                    }
                                }),
                                void 0 !== b.response && Object.defineProperty(c, "response", {
                                    get: function() {
                                        return b.response
                                    }
                                });
                                var d = b.responseText || (a && 0 == b.status && "abort" !== a ? a : void 0);
                                Object.defineProperty(c, "responseText", {
                                    get: function() {
                                        return d
                                    }
                                }),
                                Object.defineProperty(c, "response", {
                                    get: function() {
                                        return d
                                    }
                                }),
                                a && Object.defineProperty(c, "err", {
                                    get: function() {
                                        return a
                                    }
                                }),
                                c.__fileApiXHR = b,
                                c.onreadystatechange && c.onreadystatechange()
                            },
                            fileprogress: function(a) {
                                if (a.target = c,
                                c.__listeners.progress && c.__listeners.progress(a),
                                c.__total = a.total,
                                c.__loaded = a.loaded,
                                a.total === a.loaded) {
                                    var b = this;
                                    setTimeout(function() {
                                        c.__completed || (c.getAllResponseHeaders = function() {}
                                        ,
                                        b.complete(null , {
                                            status: 204,
                                            statusText: "No Content"
                                        }))
                                    }
                                    , 1e4)
                                }
                            },
                            headers: c.__requestHeaders
                        };
                        e.data = {},
                        e.files = {};
                        for (var f = 0; f < d.data.length; f++) {
                            var g = d.data[f];
                            null  != g.val && null  != g.val.name && null  != g.val.size && null  != g.val.type ? e.files[g.key] = g.val : e.data[g.key] = g.val
                        }
                        setTimeout(function() {
                            if (!a())
                                throw 'Adode Flash Player need to be installed. To check ahead use "FileAPI.hasFlash"';
                            c.__fileApiXHR = FileAPI.upload(e)
                        }
                        , 1)
                    } else
                        b.apply(c, arguments)
                }
            }
            )
        } else
            b("setRequestHeader", function(a) {
                return function(b, c) {
                    if ("__setXHR_" === b) {
                        var d = c(this);
                        d instanceof Function && d(this)
                    } else
                        a.apply(this, arguments)
                }
            }
            );
        window.XMLHttpRequest.__isShim = !0
    }
    if (!window.FormData || window.FileAPI && FileAPI.forceLoad) {
        var d = function(b) {
            if (!a())
                throw 'Adode Flash Player need to be installed. To check ahead use "FileAPI.hasFlash"';
            var c = angular.element(b);
            if (!(c.attr("disabled") || c.hasClass("js-fileapi-wrapper") || null  == b.getAttribute("ng-file-select") && null  == b.getAttribute("data-ng-file-select")))
                if (FileAPI.wrapInsideDiv) {
                    var d = document.createElement("div");
                    d.innerHTML = '<div class="js-fileapi-wrapper" style="position:relative; overflow:hidden"></div>',
                    d = d.firstChild;
                    var e = b.parentNode;
                    e.insertBefore(d, b),
                    e.removeChild(b),
                    d.appendChild(b)
                } else
                    c.addClass("js-fileapi-wrapper"),
                    c.parent()[0].__file_click_fn_delegate_ && (("" === c.parent().css("position") || "static" === c.parent().css("position")) && c.parent().css("position", "relative"),
                    c.css("top", 0).css("bottom", 0).css("left", 0).css("right", 0).css("width", "100%").css("height", "100%").css("padding", 0).css("margin", 0),
                    c.parent().unbind("click", c.parent()[0].__file_click_fn_delegate_))
        }
          , e = function(a) {
            return function(b) {
                for (var c = FileAPI.getFiles(b), d = 0; d < c.length; d++)
                    void 0 === c[d].size && (c[d].size = 0),
                    void 0 === c[d].name && (c[d].name = "file"),
                    void 0 === c[d].type && (c[d].type = "undefined");
                b.target || (b.target = {}),
                b.target.files = c,
                b.target.files != c && (b.__files_ = c),
                (b.__files_ || b.target.files).item = function(a) {
                    return (b.__files_ || b.target.files)[a] || null
                }
                ,
                a && a.apply(this, [b])
            }
        }
          , f = function(a, b) {
            return ("change" === b.toLowerCase() || "onchange" === b.toLowerCase()) && "file" == a.getAttribute("type")
        }
        ;
        HTMLInputElement.prototype.addEventListener && (HTMLInputElement.prototype.addEventListener = function(a) {
            return function(b, c, g, h) {
                f(this, b) ? (d(this),
                a.apply(this, [b, e(c), g, h])) : a.apply(this, [b, c, g, h])
            }
        }
        (HTMLInputElement.prototype.addEventListener)),
        HTMLInputElement.prototype.attachEvent && (HTMLInputElement.prototype.attachEvent = function(a) {
            return function(b, c) {
                f(this, b) ? (d(this),
                window.jQuery ? angular.element(this).bind("change", e(null )) : a.apply(this, [b, e(c)])) : a.apply(this, [b, c])
            }
        }
        (HTMLInputElement.prototype.attachEvent)),
        window.FormData = FormData = function() {
            return {
                append: function(a, b, c) {
                    this.data.push({
                        key: a,
                        val: b,
                        name: c
                    })
                },
                data: [],
                __isShim: !0
            }
        }
        ,
        function() {
            if (window.FileAPI || (window.FileAPI = {}),
            FileAPI.forceLoad && (FileAPI.html5 = !1),
            !FileAPI.upload) {
                var b, c, d, e, f, g = document.createElement("script"), h = document.getElementsByTagName("script");
                if (window.FileAPI.jsUrl)
                    b = window.FileAPI.jsUrl;
                else if (window.FileAPI.jsPath)
                    c = window.FileAPI.jsPath;
                else
                    for (d = 0; d < h.length; d++)
                        if (f = h[d].src,
                        e = f.indexOf("angular-file-upload-shim.js"),
                        -1 == e && (e = f.indexOf("angular-file-upload-shim.min.js")),
                        e > -1) {
                            c = f.substring(0, e);
                            break
                        }
                null  == FileAPI.staticPath && (FileAPI.staticPath = c),
                g.setAttribute("src", b || c + "FileAPI.min.js"),
                document.getElementsByTagName("head")[0].appendChild(g),
                FileAPI.hasFlash = a()
            }
        }
        (),
        FileAPI.disableFileInput = function(a, b) {
            b ? a.removeClass("js-fileapi-wrapper") : a.addClass("js-fileapi-wrapper")
        }
    }
    window.FileReader || (window.FileReader = function() {
        var a = this
          , b = !1;
        this.listeners = {},
        this.addEventListener = function(b, c) {
            a.listeners[b] = a.listeners[b] || [],
            a.listeners[b].push(c)
        }
        ,
        this.removeEventListener = function(b, c) {
            a.listeners[b] && a.listeners[b].splice(a.listeners[b].indexOf(c), 1)
        }
        ,
        this.dispatchEvent = function(b) {
            var c = a.listeners[b.type];
            if (c)
                for (var d = 0; d < c.length; d++)
                    c[d].call(a, b)
        }
        ,
        this.onabort = this.onerror = this.onload = this.onloadstart = this.onloadend = this.onprogress = null ;
        var c = function(b, c) {
            var d = {
                type: b,
                target: a,
                loaded: c.loaded,
                total: c.total,
                error: c.error
            };
            return null  != c.result && (d.target.result = c.result),
            d
        }
          , d = function(d) {
            if (b || (b = !0,
            a.onloadstart && this.onloadstart(c("loadstart", d))),
            "load" === d.type) {
                a.onloadend && a.onloadend(c("loadend", d));
                var e = c("load", d);
                a.onload && a.onload(e),
                a.dispatchEvent(e)
            } else if ("progress" === d.type) {
                var e = c("progress", d);
                a.onprogress && a.onprogress(e),
                a.dispatchEvent(e)
            } else {
                var e = c("error", d);
                a.onerror && a.onerror(e),
                a.dispatchEvent(e)
            }
        }
        ;
        this.readAsArrayBuffer = function(a) {
            FileAPI.readAsBinaryString(a, d)
        }
        ,
        this.readAsBinaryString = function(a) {
            FileAPI.readAsBinaryString(a, d)
        }
        ,
        this.readAsDataURL = function(a) {
            FileAPI.readAsDataURL(a, d)
        }
        ,
        this.readAsText = function(a) {
            FileAPI.readAsText(a, d)
        }
    }
    )
}
(),
function(a, b) {
    "object" == typeof exports ? module.exports = b() : "function" == typeof define && define.amd ? define(b) : a.Spinner = b()
}
(this, function() {
    "use strict";
    function a(a, b) {
        var c, d = document.createElement(a || "div");
        for (c in b)
            d[c] = b[c];
        return d
    }
    function b(a) {
        for (var b = 1, c = arguments.length; c > b; b++)
            a.appendChild(arguments[b]);
        return a
    }
    function c(a, b, c, d) {
        var e = ["opacity", b, ~~(100 * a), c, d].join("-")
          , f = .01 + c / d * 100
          , g = Math.max(1 - (1 - a) / b * (100 - f), a)
          , h = j.substring(0, j.indexOf("Animation")).toLowerCase()
          , i = h && "-" + h + "-" || "";
        return l[e] || (m.insertRule("@" + i + "keyframes " + e + "{0%{opacity:" + g + "}" + f + "%{opacity:" + a + "}" + (f + .01) + "%{opacity:1}" + (f + b) % 100 + "%{opacity:" + a + "}100%{opacity:" + g + "}}", m.cssRules.length),
        l[e] = 1),
        e
    }
    function d(a, b) {
        var c, d, e = a.style;
        for (b = b.charAt(0).toUpperCase() + b.slice(1),
        d = 0; d < k.length; d++)
            if (c = k[d] + b,
            void 0 !== e[c])
                return c;
        return void 0 !== e[b] ? b : void 0
    }
    function e(a, b) {
        for (var c in b)
            a.style[d(a, c) || c] = b[c];
        return a
    }
    function f(a) {
        for (var b = 1; b < arguments.length; b++) {
            var c = arguments[b];
            for (var d in c)
                void 0 === a[d] && (a[d] = c[d])
        }
        return a
    }
    function g(a, b) {
        return "string" == typeof a ? a : a[b % a.length]
    }
    function h(a) {
        this.opts = f(a || {}, h.defaults, n)
    }
    function i() {
        function c(b, c) {
            return a("<" + b + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', c)
        }
        m.addRule(".spin-vml", "behavior:url(#default#VML)"),
        h.prototype.lines = function(a, d) {
            function f() {
                return e(c("group", {
                    coordsize: k + " " + k,
                    coordorigin: -j + " " + -j
                }), {
                    width: k,
                    height: k
                })
            }
            function h(a, h, i) {
                b(m, b(e(f(), {
                    rotation: 360 / d.lines * a + "deg",
                    left: ~~h
                }), b(e(c("roundrect", {
                    arcsize: d.corners
                }), {
                    width: j,
                    height: d.width,
                    left: d.radius,
                    top: -d.width >> 1,
                    filter: i
                }), c("fill", {
                    color: g(d.color, a),
                    opacity: d.opacity
                }), c("stroke", {
                    opacity: 0
                }))))
            }
            var i, j = d.length + d.width, k = 2 * j, l = 2 * -(d.width + d.length) + "px", m = e(f(), {
                position: "absolute",
                top: l,
                left: l
            });
            if (d.shadow)
                for (i = 1; i <= d.lines; i++)
                    h(i, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
            for (i = 1; i <= d.lines; i++)
                h(i);
            return b(a, m)
        }
        ,
        h.prototype.opacity = function(a, b, c, d) {
            var e = a.firstChild;
            d = d.shadow && d.lines || 0,
            e && b + d < e.childNodes.length && (e = e.childNodes[b + d],
            e = e && e.firstChild,
            e = e && e.firstChild,
            e && (e.opacity = c))
        }
    }
    var j, k = ["webkit", "Moz", "ms", "O"], l = {}, m = function() {
        var c = a("style", {
            type: "text/css"
        });
        return b(document.getElementsByTagName("head")[0], c),
        c.sheet || c.styleSheet
    }
    (), n = {
        lines: 12,
        length: 7,
        width: 5,
        radius: 10,
        rotate: 0,
        corners: 1,
        color: "#000",
        direction: 1,
        speed: 1,
        trail: 100,
        opacity: .25,
        fps: 20,
        zIndex: 2e9,
        className: "spinner",
        top: "50%",
        left: "50%",
        position: "absolute"
    };
    h.defaults = {},
    f(h.prototype, {
        spin: function(b) {
            this.stop();
            var c = this
              , d = c.opts
              , f = c.el = e(a(0, {
                className: d.className
            }), {
                position: d.position,
                width: 0,
                zIndex: d.zIndex
            });
            if (e(f, {
                left: d.left,
                top: d.top
            }),
            b && b.insertBefore(f, b.firstChild || null ),
            f.setAttribute("role", "progressbar"),
            c.lines(f, c.opts),
            !j) {
                var g, h = 0, i = (d.lines - 1) * (1 - d.direction) / 2, k = d.fps, l = k / d.speed, m = (1 - d.opacity) / (l * d.trail / 100), n = l / d.lines;
                !function o() {
                    h++;
                    for (var a = 0; a < d.lines; a++)
                        g = Math.max(1 - (h + (d.lines - a) * n) % l * m, d.opacity),
                        c.opacity(f, a * d.direction + i, g, d);
                    c.timeout = c.el && setTimeout(o, ~~(1e3 / k))
                }
                ()
            }
            return c
        },
        stop: function() {
            var a = this.el;
            return a && (clearTimeout(this.timeout),
            a.parentNode && a.parentNode.removeChild(a),
            this.el = void 0),
            this
        },
        lines: function(d, f) {
            function h(b, c) {
                return e(a(), {
                    position: "absolute",
                    width: f.length + f.width + "px",
                    height: f.width + "px",
                    background: b,
                    boxShadow: c,
                    transformOrigin: "left",
                    transform: "rotate(" + ~~(360 / f.lines * k + f.rotate) + "deg) translate(" + f.radius + "px,0)",
                    borderRadius: (f.corners * f.width >> 1) + "px"
                })
            }
            for (var i, k = 0, l = (f.lines - 1) * (1 - f.direction) / 2; k < f.lines; k++)
                i = e(a(), {
                    position: "absolute",
                    top: 1 + ~(f.width / 2) + "px",
                    transform: f.hwaccel ? "translate3d(0,0,0)" : "",
                    opacity: f.opacity,
                    animation: j && c(f.opacity, f.trail, l + k * f.direction, f.lines) + " " + 1 / f.speed + "s linear infinite"
                }),
                f.shadow && b(i, e(h("#000", "0 0 4px #000"), {
                    top: "2px"
                })),
                b(d, b(i, h(g(f.color, k), "0 0 1px rgba(0,0,0,.1)")));
            return d
        },
        opacity: function(a, b, c) {
            b < a.childNodes.length && (a.childNodes[b].style.opacity = c)
        }
    });
    var o = e(a("group"), {
        behavior: "url(#default#VML)"
    });
    return !d(o, "transform") && o.adj ? i() : j = d(o, "animation"),
    h
}
),
function(a, b) {
    "object" == typeof exports ? module.exports = b(require("spin.js")) : "function" == typeof define && define.amd ? define(["spin"], b) : a.Ladda = b(a.Spinner)
}
(this, function(a) {
    "use strict";
    function b(a) {
        if (void 0 === a)
            return void console.warn("Ladda button target must be defined.");
        a.querySelector(".ladda-label") || (a.innerHTML = '<span class="ladda-label">' + a.innerHTML + "</span>");
        var b, c = a.querySelector(".ladda-spinner");
        c || (c = document.createElement("span"),
        c.className = "ladda-spinner"),
        a.appendChild(c);
        var d, e = {
            start: function() {
                return b || (b = g(a)),
                a.setAttribute("disabled", ""),
                a.setAttribute("data-loading", ""),
                clearTimeout(d),
                b.spin(c),
                this.setProgress(0),
                this
            },
            startAfter: function(a) {
                return clearTimeout(d),
                d = setTimeout(function() {
                    e.start()
                }
                , a),
                this
            },
            stop: function() {
                return a.removeAttribute("disabled"),
                a.removeAttribute("data-loading"),
                clearTimeout(d),
                b && (d = setTimeout(function() {
                    b.stop()
                }
                , 1e3)),
                this
            },
            toggle: function() {
                return this.isLoading() ? this.stop() : this.start(),
                this
            },
            setProgress: function(b) {
                b = Math.max(Math.min(b, 1), 0);
                var c = a.querySelector(".ladda-progress");
                0 === b && c && c.parentNode ? c.parentNode.removeChild(c) : (c || (c = document.createElement("div"),
                c.className = "ladda-progress",
                a.appendChild(c)),
                c.style.width = (b || 0) * a.offsetWidth + "px")
            },
            enable: function() {
                return this.stop(),
                this
            },
            disable: function() {
                return this.stop(),
                a.setAttribute("disabled", ""),
                this
            },
            isLoading: function() {
                return a.hasAttribute("data-loading")
            },
            remove: function() {
                clearTimeout(d),
                a.removeAttribute("disabled", ""),
                a.removeAttribute("data-loading", ""),
                b && (b.stop(),
                b = null );
                for (var c = 0, f = i.length; f > c; c++)
                    if (e === i[c]) {
                        i.splice(c, 1);
                        break
                    }
            }
        };
        return i.push(e),
        e
    }
    function c(a, b) {
        for (; a.parentNode && a.tagName !== b; )
            a = a.parentNode;
        return b === a.tagName ? a : void 0
    }
    function d(a) {
        for (var b = ["input", "textarea", "select"], c = [], d = 0; b.length > d; d++)
            for (var e = a.getElementsByTagName(b[d]), f = 0; e.length > f; f++)
                e[f].hasAttribute("required") && c.push(e[f]);
        return c
    }
    function e(a, e) {
        e = e || {};
        var f = [];
        "string" == typeof a ? f = h(document.querySelectorAll(a)) : "object" == typeof a && "string" == typeof a.nodeName && (f = [a]);
        for (var g = 0, i = f.length; i > g; g++)
            (function() {
                var a = f[g];
                if ("function" == typeof a.addEventListener) {
                    var h = b(a)
                      , i = -1;
                    a.addEventListener("click", function() {
                        var b = !0
                          , f = c(a, "FORM");
                        if (void 0 !== f)
                            for (var g = d(f), j = 0; g.length > j; j++)
                                "" === g[j].value.replace(/^\s+|\s+$/g, "") && (b = !1),
                                "checkbox" !== g[j].type && "radio" !== g[j].type || g[j].checked || (b = !1),
                                "email" === g[j].type && (b = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(g[j].value));
                        b && (h.startAfter(1),
                        "number" == typeof e.timeout && (clearTimeout(i),
                        i = setTimeout(h.stop, e.timeout)),
                        "function" == typeof e.callback && e.callback.apply(null , [h]))
                    }
                    , !1)
                }
            }
            )()
    }
    function f() {
        for (var a = 0, b = i.length; b > a; a++)
            i[a].stop()
    }
    function g(b) {
        var c, d = b.offsetHeight;
        0 === d && (d = parseFloat(window.getComputedStyle(b).height)),
        d > 32 && (d *= .8),
        b.hasAttribute("data-spinner-size") && (d = parseInt(b.getAttribute("data-spinner-size"), 10)),
        b.hasAttribute("data-spinner-color") && (c = b.getAttribute("data-spinner-color"));
        var e = 12
          , f = .2 * d
          , g = .6 * f
          , h = 7 > f ? 2 : 3;
        return new a({
            color: c || "#fff",
            lines: e,
            radius: f,
            length: g,
            width: h,
            zIndex: "auto",
            top: "auto",
            left: "auto",
            className: ""
        })
    }
    function h(a) {
        for (var b = [], c = 0; a.length > c; c++)
            b.push(a[c]);
        return b
    }
    var i = [];
    return {
        bind: e,
        create: b,
        stopAll: f
    }
}
),
!function() {
    "use strict";
    angular.module("angular-ladda", []).provider("ladda", function() {
        var a = {
            style: "zoom-in"
        };
        return {
            setOption: function(b) {
                angular.extend(a, b)
            },
            $get: function() {
                return a
            }
        }
    }
    ).directive("ladda", ["$compile", "$timeout", "ladda", function(a, b, c) {
        return {
            restrict: "A",
            replace: !1,
            terminal: !0,
            priority: 501,
            link: function(d, e, f) {
                e.addClass("ladda-button"),
                angular.isUndefined(e.attr("data-style")) && e.attr("data-style", c.style || "zoom-in");
                var g = Ladda.create(e[0]);
                b(function() {
                    e.removeAttr("ladda"),
                    e.removeAttr("data-ladda"),
                    a(e, null , 501)(d),
                    d.$watch(f.ladda, function(a) {
                        a || angular.isNumber(a) ? (g.isLoading() || g.start(),
                        angular.isNumber(a) && g.setProgress(a)) : (g.stop(),
                        f.ngDisabled && e.attr("disabled", d.$eval(f.ngDisabled)))
                    }
                    )
                }
                , 0)
            }
        }
    }
    ])
}
(),
function(a) {
    "use strict";
    function b(a, b) {
        a.module("angularSpinner", []).factory("usSpinnerService", ["$rootScope", function(a) {
            var b = {};
            return b.spin = function(b) {
                a.$broadcast("us-spinner:spin", b)
            }
            ,
            b.stop = function(b) {
                a.$broadcast("us-spinner:stop", b)
            }
            ,
            b
        }
        ]).directive("usSpinner", ["$window", function(c) {
            return {
                scope: !0,
                link: function(d, e, f) {
                    function g() {
                        d.spinner && d.spinner.stop()
                    }
                    var h = b || c.Spinner;
                    d.spinner = null ,
                    d.key = a.isDefined(f.spinnerKey) ? f.spinnerKey : !1,
                    d.startActive = a.isDefined(f.spinnerStartActive) ? f.spinnerStartActive : d.key ? !1 : !0,
                    d.spin = function() {
                        d.spinner && d.spinner.spin(e[0])
                    }
                    ,
                    d.stop = function() {
                        d.startActive = !1,
                        g()
                    }
                    ,
                    d.$watch(f.usSpinner, function(a) {
                        g(),
                        d.spinner = new h(a),
                        (!d.key || d.startActive) && d.spinner.spin(e[0])
                    }
                    , !0),
                    d.$on("us-spinner:spin", function(a, b) {
                        b === d.key && d.spin()
                    }
                    ),
                    d.$on("us-spinner:stop", function(a, b) {
                        b === d.key && d.stop()
                    }
                    ),
                    d.$on("$destroy", function() {
                        d.stop(),
                        d.spinner = null
                    }
                    )
                }
            }
        }
        ])
    }
    "function" == typeof define && define.amd ? define(["angular", "spin"], b) : b(a.angular)
}
(window),
function(a, b, c, d) {
    "use strict";
    function e(a, b, c) {
        return setTimeout(k(a, c), b)
    }
    function f(a, b, c) {
        return Array.isArray(a) ? (g(a, c[b], c),
        !0) : !1
    }
    function g(a, b, c) {
        var e;
        if (a)
            if (a.forEach)
                a.forEach(b, c);
            else if (a.length !== d)
                for (e = 0; e < a.length; )
                    b.call(c, a[e], e, a),
                    e++;
            else
                for (e in a)
                    a.hasOwnProperty(e) && b.call(c, a[e], e, a)
    }
    function h(a, b, c) {
        for (var e = Object.keys(b), f = 0; f < e.length; )
            (!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]),
            f++;
        return a
    }
    function i(a, b) {
        return h(a, b, !0)
    }
    function j(a, b, c) {
        var d, e = b.prototype;
        d = a.prototype = Object.create(e),
        d.constructor = a,
        d._super = e,
        c && h(d, c)
    }
    function k(a, b) {
        return function() {
            return a.apply(b, arguments)
        }
    }
    function l(a, b) {
        return typeof a == kb ? a.apply(b ? b[0] || d : d, b) : a
    }
    function m(a, b) {
        return a === d ? b : a
    }
    function n(a, b, c) {
        g(r(b), function(b) {
            a.addEventListener(b, c, !1)
        }
        )
    }
    function o(a, b, c) {
        g(r(b), function(b) {
            a.removeEventListener(b, c, !1)
        }
        )
    }
    function p(a, b) {
        for (; a; ) {
            if (a == b)
                return !0;
            a = a.parentNode
        }
        return !1
    }
    function q(a, b) {
        return a.indexOf(b) > -1
    }
    function r(a) {
        return a.trim().split(/\s+/g)
    }
    function s(a, b, c) {
        if (a.indexOf && !c)
            return a.indexOf(b);
        for (var d = 0; d < a.length; ) {
            if (c && a[d][c] == b || !c && a[d] === b)
                return d;
            d++
        }
        return -1
    }
    function t(a) {
        return Array.prototype.slice.call(a, 0)
    }
    function u(a, b, c) {
        for (var d = [], e = [], f = 0; f < a.length; ) {
            var g = b ? a[f][b] : a[f];
            s(e, g) < 0 && d.push(a[f]),
            e[f] = g,
            f++
        }
        return c && (d = b ? d.sort(function(a, c) {
            return a[b] > c[b]
        }
        ) : d.sort()),
        d
    }
    function v(a, b) {
        for (var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0; g < ib.length; ) {
            if (c = ib[g],
            e = c ? c + f : b,
            e in a)
                return e;
            g++
        }
        return d
    }
    function w() {
        return ob++
    }
    function x(a) {
        var b = a.ownerDocument;
        return b.defaultView || b.parentWindow
    }
    function y(a, b) {
        var c = this;
        this.manager = a,
        this.callback = b,
        this.element = a.element,
        this.target = a.options.inputTarget,
        this.domHandler = function(b) {
            l(a.options.enable, [a]) && c.handler(b)
        }
        ,
        this.init()
    }
    function z(a) {
        var b, c = a.options.inputClass;
        return new (b = c ? c : rb ? N : sb ? Q : qb ? S : M)(a,A)
    }
    function A(a, b, c) {
        var d = c.pointers.length
          , e = c.changedPointers.length
          , f = b & yb && d - e === 0
          , g = b & (Ab | Bb) && d - e === 0;
        c.isFirst = !!f,
        c.isFinal = !!g,
        f && (a.session = {}),
        c.eventType = b,
        B(a, c),
        a.emit("hammer.input", c),
        a.recognize(c),
        a.session.prevInput = c
    }
    function B(a, b) {
        var c = a.session
          , d = b.pointers
          , e = d.length;
        c.firstInput || (c.firstInput = E(b)),
        e > 1 && !c.firstMultiple ? c.firstMultiple = E(b) : 1 === e && (c.firstMultiple = !1);
        var f = c.firstInput
          , g = c.firstMultiple
          , h = g ? g.center : f.center
          , i = b.center = F(d);
        b.timeStamp = nb(),
        b.deltaTime = b.timeStamp - f.timeStamp,
        b.angle = J(h, i),
        b.distance = I(h, i),
        C(c, b),
        b.offsetDirection = H(b.deltaX, b.deltaY),
        b.scale = g ? L(g.pointers, d) : 1,
        b.rotation = g ? K(g.pointers, d) : 0,
        D(c, b);
        var j = a.element;
        p(b.srcEvent.target, j) && (j = b.srcEvent.target),
        b.target = j
    }
    function C(a, b) {
        var c = b.center
          , d = a.offsetDelta || {}
          , e = a.prevDelta || {}
          , f = a.prevInput || {};
        (b.eventType === yb || f.eventType === Ab) && (e = a.prevDelta = {
            x: f.deltaX || 0,
            y: f.deltaY || 0
        },
        d = a.offsetDelta = {
            x: c.x,
            y: c.y
        }),
        b.deltaX = e.x + (c.x - d.x),
        b.deltaY = e.y + (c.y - d.y)
    }
    function D(a, b) {
        var c, e, f, g, h = a.lastInterval || b, i = b.timeStamp - h.timeStamp;
        if (b.eventType != Bb && (i > xb || h.velocity === d)) {
            var j = h.deltaX - b.deltaX
              , k = h.deltaY - b.deltaY
              , l = G(i, j, k);
            e = l.x,
            f = l.y,
            c = mb(l.x) > mb(l.y) ? l.x : l.y,
            g = H(j, k),
            a.lastInterval = b
        } else
            c = h.velocity,
            e = h.velocityX,
            f = h.velocityY,
            g = h.direction;
        b.velocity = c,
        b.velocityX = e,
        b.velocityY = f,
        b.direction = g
    }
    function E(a) {
        for (var b = [], c = 0; c < a.pointers.length; )
            b[c] = {
                clientX: lb(a.pointers[c].clientX),
                clientY: lb(a.pointers[c].clientY)
            },
            c++;
        return {
            timeStamp: nb(),
            pointers: b,
            center: F(b),
            deltaX: a.deltaX,
            deltaY: a.deltaY
        }
    }
    function F(a) {
        var b = a.length;
        if (1 === b)
            return {
                x: lb(a[0].clientX),
                y: lb(a[0].clientY)
            };
        for (var c = 0, d = 0, e = 0; b > e; )
            c += a[e].clientX,
            d += a[e].clientY,
            e++;
        return {
            x: lb(c / b),
            y: lb(d / b)
        }
    }
    function G(a, b, c) {
        return {
            x: b / a || 0,
            y: c / a || 0
        }
    }
    function H(a, b) {
        return a === b ? Cb : mb(a) >= mb(b) ? a > 0 ? Db : Eb : b > 0 ? Fb : Gb
    }
    function I(a, b, c) {
        c || (c = Kb);
        var d = b[c[0]] - a[c[0]]
          , e = b[c[1]] - a[c[1]];
        return Math.sqrt(d * d + e * e)
    }
    function J(a, b, c) {
        c || (c = Kb);
        var d = b[c[0]] - a[c[0]]
          , e = b[c[1]] - a[c[1]];
        return 180 * Math.atan2(e, d) / Math.PI
    }
    function K(a, b) {
        return J(b[1], b[0], Lb) - J(a[1], a[0], Lb)
    }
    function L(a, b) {
        return I(b[0], b[1], Lb) / I(a[0], a[1], Lb)
    }
    function M() {
        this.evEl = Nb,
        this.evWin = Ob,
        this.allow = !0,
        this.pressed = !1,
        y.apply(this, arguments)
    }
    function N() {
        this.evEl = Rb,
        this.evWin = Sb,
        y.apply(this, arguments),
        this.store = this.manager.session.pointerEvents = []
    }
    function O() {
        this.evTarget = Ub,
        this.evWin = Vb,
        this.started = !1,
        y.apply(this, arguments)
    }
    function P(a, b) {
        var c = t(a.touches)
          , d = t(a.changedTouches);
        return b & (Ab | Bb) && (c = u(c.concat(d), "identifier", !0)),
        [c, d]
    }
    function Q() {
        this.evTarget = Xb,
        this.targetIds = {},
        y.apply(this, arguments)
    }
    function R(a, b) {
        var c = t(a.touches)
          , d = this.targetIds;
        if (b & (yb | zb) && 1 === c.length)
            return d[c[0].identifier] = !0,
            [c, c];
        var e, f, g = t(a.changedTouches), h = [], i = this.target;
        if (f = c.filter(function(a) {
            return p(a.target, i)
        }
        ),
        b === yb)
            for (e = 0; e < f.length; )
                d[f[e].identifier] = !0,
                e++;
        for (e = 0; e < g.length; )
            d[g[e].identifier] && h.push(g[e]),
            b & (Ab | Bb) && delete d[g[e].identifier],
            e++;
        return h.length ? [u(f.concat(h), "identifier", !0), h] : void 0
    }
    function S() {
        y.apply(this, arguments);
        var a = k(this.handler, this);
        this.touch = new Q(this.manager,a),
        this.mouse = new M(this.manager,a)
    }
    function T(a, b) {
        this.manager = a,
        this.set(b)
    }
    function U(a) {
        if (q(a, bc))
            return bc;
        var b = q(a, cc)
          , c = q(a, dc);
        return b && c ? cc + " " + dc : b || c ? b ? cc : dc : q(a, ac) ? ac : _b
    }
    function V(a) {
        this.id = w(),
        this.manager = null ,
        this.options = i(a || {}, this.defaults),
        this.options.enable = m(this.options.enable, !0),
        this.state = ec,
        this.simultaneous = {},
        this.requireFail = []
    }
    function W(a) {
        return a & jc ? "cancel" : a & hc ? "end" : a & gc ? "move" : a & fc ? "start" : ""
    }
    function X(a) {
        return a == Gb ? "down" : a == Fb ? "up" : a == Db ? "left" : a == Eb ? "right" : ""
    }
    function Y(a, b) {
        var c = b.manager;
        return c ? c.get(a) : a
    }
    function Z() {
        V.apply(this, arguments)
    }
    function $() {
        Z.apply(this, arguments),
        this.pX = null ,
        this.pY = null
    }
    function _() {
        Z.apply(this, arguments)
    }
    function ab() {
        V.apply(this, arguments),
        this._timer = null ,
        this._input = null
    }
    function bb() {
        Z.apply(this, arguments)
    }
    function cb() {
        Z.apply(this, arguments)
    }
    function db() {
        V.apply(this, arguments),
        this.pTime = !1,
        this.pCenter = !1,
        this._timer = null ,
        this._input = null ,
        this.count = 0
    }
    function eb(a, b) {
        return b = b || {},
        b.recognizers = m(b.recognizers, eb.defaults.preset),
        new fb(a,b)
    }
    function fb(a, b) {
        b = b || {},
        this.options = i(b, eb.defaults),
        this.options.inputTarget = this.options.inputTarget || a,
        this.handlers = {},
        this.session = {},
        this.recognizers = [],
        this.element = a,
        this.input = z(this),
        this.touchAction = new T(this,this.options.touchAction),
        gb(this, !0),
        g(b.recognizers, function(a) {
            var b = this.add(new a[0](a[1]));
            a[2] && b.recognizeWith(a[2]),
            a[3] && b.requireFailure(a[3])
        }
        , this)
    }
    function gb(a, b) {
        var c = a.element;
        g(a.options.cssProps, function(a, d) {
            c.style[v(c.style, d)] = b ? a : ""
        }
        )
    }
    function hb(a, c) {
        var d = b.createEvent("Event");
        d.initEvent(a, !0, !0),
        d.gesture = c,
        c.target.dispatchEvent(d)
    }
    var ib = ["", "webkit", "moz", "MS", "ms", "o"]
      , jb = b.createElement("div")
      , kb = "function"
      , lb = Math.round
      , mb = Math.abs
      , nb = Date.now
      , ob = 1
      , pb = /mobile|tablet|ip(ad|hone|od)|android/i
      , qb = "ontouchstart" in a
      , rb = v(a, "PointerEvent") !== d
      , sb = qb && pb.test(navigator.userAgent)
      , tb = "touch"
      , ub = "pen"
      , vb = "mouse"
      , wb = "kinect"
      , xb = 25
      , yb = 1
      , zb = 2
      , Ab = 4
      , Bb = 8
      , Cb = 1
      , Db = 2
      , Eb = 4
      , Fb = 8
      , Gb = 16
      , Hb = Db | Eb
      , Ib = Fb | Gb
      , Jb = Hb | Ib
      , Kb = ["x", "y"]
      , Lb = ["clientX", "clientY"];
    y.prototype = {
        handler: function() {},
        init: function() {
            this.evEl && n(this.element, this.evEl, this.domHandler),
            this.evTarget && n(this.target, this.evTarget, this.domHandler),
            this.evWin && n(x(this.element), this.evWin, this.domHandler)
        },
        destroy: function() {
            this.evEl && o(this.element, this.evEl, this.domHandler),
            this.evTarget && o(this.target, this.evTarget, this.domHandler),
            this.evWin && o(x(this.element), this.evWin, this.domHandler)
        }
    };
    var Mb = {
        mousedown: yb,
        mousemove: zb,
        mouseup: Ab
    }
      , Nb = "mousedown"
      , Ob = "mousemove mouseup";
    j(M, y, {
        handler: function(a) {
            var b = Mb[a.type];
            b & yb && 0 === a.button && (this.pressed = !0),
            b & zb && 1 !== a.which && (b = Ab),
            this.pressed && this.allow && (b & Ab && (this.pressed = !1),
            this.callback(this.manager, b, {
                pointers: [a],
                changedPointers: [a],
                pointerType: vb,
                srcEvent: a
            }))
        }
    });
    var Pb = {
        pointerdown: yb,
        pointermove: zb,
        pointerup: Ab,
        pointercancel: Bb,
        pointerout: Bb
    }
      , Qb = {
        2: tb,
        3: ub,
        4: vb,
        5: wb
    }
      , Rb = "pointerdown"
      , Sb = "pointermove pointerup pointercancel";
    a.MSPointerEvent && (Rb = "MSPointerDown",
    Sb = "MSPointerMove MSPointerUp MSPointerCancel"),
    j(N, y, {
        handler: function(a) {
            var b = this.store
              , c = !1
              , d = a.type.toLowerCase().replace("ms", "")
              , e = Pb[d]
              , f = Qb[a.pointerType] || a.pointerType
              , g = f == tb
              , h = s(b, a.pointerId, "pointerId");
            e & yb && (0 === a.button || g) ? 0 > h && (b.push(a),
            h = b.length - 1) : e & (Ab | Bb) && (c = !0),
            0 > h || (b[h] = a,
            this.callback(this.manager, e, {
                pointers: b,
                changedPointers: [a],
                pointerType: f,
                srcEvent: a
            }),
            c && b.splice(h, 1))
        }
    });
    var Tb = {
        touchstart: yb,
        touchmove: zb,
        touchend: Ab,
        touchcancel: Bb
    }
      , Ub = "touchstart"
      , Vb = "touchstart touchmove touchend touchcancel";
    j(O, y, {
        handler: function(a) {
            var b = Tb[a.type];
            if (b === yb && (this.started = !0),
            this.started) {
                var c = P.call(this, a, b);
                b & (Ab | Bb) && c[0].length - c[1].length === 0 && (this.started = !1),
                this.callback(this.manager, b, {
                    pointers: c[0],
                    changedPointers: c[1],
                    pointerType: tb,
                    srcEvent: a
                })
            }
        }
    });
    var Wb = {
        touchstart: yb,
        touchmove: zb,
        touchend: Ab,
        touchcancel: Bb
    }
      , Xb = "touchstart touchmove touchend touchcancel";
    j(Q, y, {
        handler: function(a) {
            var b = Wb[a.type]
              , c = R.call(this, a, b);
            c && this.callback(this.manager, b, {
                pointers: c[0],
                changedPointers: c[1],
                pointerType: tb,
                srcEvent: a
            })
        }
    }),
    j(S, y, {
        handler: function(a, b, c) {
            var d = c.pointerType == tb
              , e = c.pointerType == vb;
            if (d)
                this.mouse.allow = !1;
            else if (e && !this.mouse.allow)
                return;
            b & (Ab | Bb) && (this.mouse.allow = !0),
            this.callback(a, b, c)
        },
        destroy: function() {
            this.touch.destroy(),
            this.mouse.destroy()
        }
    });
    var Yb = v(jb.style, "touchAction")
      , Zb = Yb !== d
      , $b = "compute"
      , _b = "auto"
      , ac = "manipulation"
      , bc = "none"
      , cc = "pan-x"
      , dc = "pan-y";
    T.prototype = {
        set: function(a) {
            a == $b && (a = this.compute()),
            Zb && (this.manager.element.style[Yb] = a),
            this.actions = a.toLowerCase().trim()
        },
        update: function() {
            this.set(this.manager.options.touchAction)
        },
        compute: function() {
            var a = [];
            return g(this.manager.recognizers, function(b) {
                l(b.options.enable, [b]) && (a = a.concat(b.getTouchAction()))
            }
            ),
            U(a.join(" "))
        },
        preventDefaults: function(a) {
            if (!Zb) {
                var b = a.srcEvent
                  , c = a.offsetDirection;
                if (this.manager.session.prevented)
                    return void b.preventDefault();
                var d = this.actions
                  , e = q(d, bc)
                  , f = q(d, dc)
                  , g = q(d, cc);
                return e || f && c & Hb || g && c & Ib ? this.preventSrc(b) : void 0
            }
        },
        preventSrc: function(a) {
            this.manager.session.prevented = !0,
            a.preventDefault()
        }
    };
    var ec = 1
      , fc = 2
      , gc = 4
      , hc = 8
      , ic = hc
      , jc = 16
      , kc = 32;
    V.prototype = {
        defaults: {},
        set: function(a) {
            return h(this.options, a),
            this.manager && this.manager.touchAction.update(),
            this
        },
        recognizeWith: function(a) {
            if (f(a, "recognizeWith", this))
                return this;
            var b = this.simultaneous;
            return a = Y(a, this),
            b[a.id] || (b[a.id] = a,
            a.recognizeWith(this)),
            this
        },
        dropRecognizeWith: function(a) {
            return f(a, "dropRecognizeWith", this) ? this : (a = Y(a, this),
            delete this.simultaneous[a.id],
            this)
        },
        requireFailure: function(a) {
            if (f(a, "requireFailure", this))
                return this;
            var b = this.requireFail;
            return a = Y(a, this),
            -1 === s(b, a) && (b.push(a),
            a.requireFailure(this)),
            this
        },
        dropRequireFailure: function(a) {
            if (f(a, "dropRequireFailure", this))
                return this;
            a = Y(a, this);
            var b = s(this.requireFail, a);
            return b > -1 && this.requireFail.splice(b, 1),
            this
        },
        hasRequireFailures: function() {
            return this.requireFail.length > 0
        },
        canRecognizeWith: function(a) {
            return !!this.simultaneous[a.id]
        },
        emit: function(a) {
            function b(b) {
                c.manager.emit(c.options.event + (b ? W(d) : ""), a)
            }
            var c = this
              , d = this.state;
            hc > d && b(!0),
            b(),
            d >= hc && b(!0)
        },
        tryEmit: function(a) {
            return this.canEmit() ? this.emit(a) : void (this.state = kc)
        },
        canEmit: function() {
            for (var a = 0; a < this.requireFail.length; ) {
                if (!(this.requireFail[a].state & (kc | ec)))
                    return !1;
                a++
            }
            return !0
        },
        recognize: function(a) {
            var b = h({}, a);
            return l(this.options.enable, [this, b]) ? (this.state & (ic | jc | kc) && (this.state = ec),
            this.state = this.process(b),
            void (this.state & (fc | gc | hc | jc) && this.tryEmit(b))) : (this.reset(),
            void (this.state = kc))
        },
        process: function() {},
        getTouchAction: function() {},
        reset: function() {}
    },
    j(Z, V, {
        defaults: {
            pointers: 1
        },
        attrTest: function(a) {
            var b = this.options.pointers;
            return 0 === b || a.pointers.length === b
        },
        process: function(a) {
            var b = this.state
              , c = a.eventType
              , d = b & (fc | gc)
              , e = this.attrTest(a);
            return d && (c & Bb || !e) ? b | jc : d || e ? c & Ab ? b | hc : b & fc ? b | gc : fc : kc
        }
    }),
    j($, Z, {
        defaults: {
            event: "pan",
            threshold: 10,
            pointers: 1,
            direction: Jb
        },
        getTouchAction: function() {
            var a = this.options.direction
              , b = [];
            return a & Hb && b.push(dc),
            a & Ib && b.push(cc),
            b
        },
        directionTest: function(a) {
            var b = this.options
              , c = !0
              , d = a.distance
              , e = a.direction
              , f = a.deltaX
              , g = a.deltaY;
            return e & b.direction || (b.direction & Hb ? (e = 0 === f ? Cb : 0 > f ? Db : Eb,
            c = f != this.pX,
            d = Math.abs(a.deltaX)) : (e = 0 === g ? Cb : 0 > g ? Fb : Gb,
            c = g != this.pY,
            d = Math.abs(a.deltaY))),
            a.direction = e,
            c && d > b.threshold && e & b.direction
        },
        attrTest: function(a) {
            return Z.prototype.attrTest.call(this, a) && (this.state & fc || !(this.state & fc) && this.directionTest(a))
        },
        emit: function(a) {
            this.pX = a.deltaX,
            this.pY = a.deltaY;
            var b = X(a.direction);
            b && this.manager.emit(this.options.event + b, a),
            this._super.emit.call(this, a)
        }
    }),
    j(_, Z, {
        defaults: {
            event: "pinch",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [bc]
        },
        attrTest: function(a) {
            return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & fc)
        },
        emit: function(a) {
            if (this._super.emit.call(this, a),
            1 !== a.scale) {
                var b = a.scale < 1 ? "in" : "out";
                this.manager.emit(this.options.event + b, a)
            }
        }
    }),
    j(ab, V, {
        defaults: {
            event: "press",
            pointers: 1,
            time: 500,
            threshold: 5
        },
        getTouchAction: function() {
            return [_b]
        },
        process: function(a) {
            var b = this.options
              , c = a.pointers.length === b.pointers
              , d = a.distance < b.threshold
              , f = a.deltaTime > b.time;
            if (this._input = a,
            !d || !c || a.eventType & (Ab | Bb) && !f)
                this.reset();
            else if (a.eventType & yb)
                this.reset(),
                this._timer = e(function() {
                    this.state = ic,
                    this.tryEmit()
                }
                , b.time, this);
            else if (a.eventType & Ab)
                return ic;
            return kc
        },
        reset: function() {
            clearTimeout(this._timer)
        },
        emit: function(a) {
            this.state === ic && (a && a.eventType & Ab ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = nb(),
            this.manager.emit(this.options.event, this._input)))
        }
    }),
    j(bb, Z, {
        defaults: {
            event: "rotate",
            threshold: 0,
            pointers: 2
        },
        getTouchAction: function() {
            return [bc]
        },
        attrTest: function(a) {
            return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & fc)
        }
    }),
    j(cb, Z, {
        defaults: {
            event: "swipe",
            threshold: 10,
            velocity: .65,
            direction: Hb | Ib,
            pointers: 1
        },
        getTouchAction: function() {
            return $.prototype.getTouchAction.call(this)
        },
        attrTest: function(a) {
            var b, c = this.options.direction;
            return c & (Hb | Ib) ? b = a.velocity : c & Hb ? b = a.velocityX : c & Ib && (b = a.velocityY),
            this._super.attrTest.call(this, a) && c & a.direction && a.distance > this.options.threshold && mb(b) > this.options.velocity && a.eventType & Ab
        },
        emit: function(a) {
            var b = X(a.direction);
            b && this.manager.emit(this.options.event + b, a),
            this.manager.emit(this.options.event, a)
        }
    }),
    j(db, V, {
        defaults: {
            event: "tap",
            pointers: 1,
            taps: 1,
            interval: 300,
            time: 250,
            threshold: 2,
            posThreshold: 10
        },
        getTouchAction: function() {
            return [ac]
        },
        process: function(a) {
            var b = this.options
              , c = a.pointers.length === b.pointers
              , d = a.distance < b.threshold
              , f = a.deltaTime < b.time;
            if (this.reset(),
            a.eventType & yb && 0 === this.count)
                return this.failTimeout();
            if (d && f && c) {
                if (a.eventType != Ab)
                    return this.failTimeout();
                var g = this.pTime ? a.timeStamp - this.pTime < b.interval : !0
                  , h = !this.pCenter || I(this.pCenter, a.center) < b.posThreshold;
                this.pTime = a.timeStamp,
                this.pCenter = a.center,
                h && g ? this.count += 1 : this.count = 1,
                this._input = a;
                var i = this.count % b.taps;
                if (0 === i)
                    return this.hasRequireFailures() ? (this._timer = e(function() {
                        this.state = ic,
                        this.tryEmit()
                    }
                    , b.interval, this),
                    fc) : ic
            }
            return kc
        },
        failTimeout: function() {
            return this._timer = e(function() {
                this.state = kc
            }
            , this.options.interval, this),
            kc
        },
        reset: function() {
            clearTimeout(this._timer)
        },
        emit: function() {
            this.state == ic && (this._input.tapCount = this.count,
            this.manager.emit(this.options.event, this._input))
        }
    }),
    eb.VERSION = "2.0.4",
    eb.defaults = {
        domEvents: !1,
        touchAction: $b,
        enable: !0,
        inputTarget: null ,
        inputClass: null ,
        preset: [[bb, {
            enable: !1
        }], [_, {
            enable: !1
        }, ["rotate"]], [cb, {
            direction: Hb
        }], [$, {
            direction: Hb
        }, ["swipe"]], [db], [db, {
            event: "doubletap",
            taps: 2
        }, ["tap"]], [ab]],
        cssProps: {
            userSelect: "none",
            touchSelect: "none",
            touchCallout: "none",
            contentZooming: "none",
            userDrag: "none",
            tapHighlightColor: "rgba(0,0,0,0)"
        }
    };
    var lc = 1
      , mc = 2;
    fb.prototype = {
        set: function(a) {
            return h(this.options, a),
            a.touchAction && this.touchAction.update(),
            a.inputTarget && (this.input.destroy(),
            this.input.target = a.inputTarget,
            this.input.init()),
            this
        },
        stop: function(a) {
            this.session.stopped = a ? mc : lc
        },
        recognize: function(a) {
            var b = this.session;
            if (!b.stopped) {
                this.touchAction.preventDefaults(a);
                var c, d = this.recognizers, e = b.curRecognizer;
                (!e || e && e.state & ic) && (e = b.curRecognizer = null );
                for (var f = 0; f < d.length; )
                    c = d[f],
                    b.stopped === mc || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a),
                    !e && c.state & (fc | gc | hc) && (e = b.curRecognizer = c),
                    f++
            }
        },
        get: function(a) {
            if (a instanceof V)
                return a;
            for (var b = this.recognizers, c = 0; c < b.length; c++)
                if (b[c].options.event == a)
                    return b[c];
            return null
        },
        add: function(a) {
            if (f(a, "add", this))
                return this;
            var b = this.get(a.options.event);
            return b && this.remove(b),
            this.recognizers.push(a),
            a.manager = this,
            this.touchAction.update(),
            a
        },
        remove: function(a) {
            if (f(a, "remove", this))
                return this;
            var b = this.recognizers;
            return a = this.get(a),
            b.splice(s(b, a), 1),
            this.touchAction.update(),
            this
        },
        on: function(a, b) {
            var c = this.handlers;
            return g(r(a), function(a) {
                c[a] = c[a] || [],
                c[a].push(b)
            }
            ),
            this
        },
        off: function(a, b) {
            var c = this.handlers;
            return g(r(a), function(a) {
                b ? c[a].splice(s(c[a], b), 1) : delete c[a]
            }
            ),
            this
        },
        emit: function(a, b) {
            this.options.domEvents && hb(a, b);
            var c = this.handlers[a] && this.handlers[a].slice();
            if (c && c.length) {
                b.type = a,
                b.preventDefault = function() {
                    b.srcEvent.preventDefault()
                }
                ;
                for (var d = 0; d < c.length; )
                    c[d](b),
                    d++
            }
        },
        destroy: function() {
            this.element && gb(this, !1),
            this.handlers = {},
            this.session = {},
            this.input.destroy(),
            this.element = null
        }
    },
    h(eb, {
        INPUT_START: yb,
        INPUT_MOVE: zb,
        INPUT_END: Ab,
        INPUT_CANCEL: Bb,
        STATE_POSSIBLE: ec,
        STATE_BEGAN: fc,
        STATE_CHANGED: gc,
        STATE_ENDED: hc,
        STATE_RECOGNIZED: ic,
        STATE_CANCELLED: jc,
        STATE_FAILED: kc,
        DIRECTION_NONE: Cb,
        DIRECTION_LEFT: Db,
        DIRECTION_RIGHT: Eb,
        DIRECTION_UP: Fb,
        DIRECTION_DOWN: Gb,
        DIRECTION_HORIZONTAL: Hb,
        DIRECTION_VERTICAL: Ib,
        DIRECTION_ALL: Jb,
        Manager: fb,
        Input: y,
        TouchAction: T,
        TouchInput: Q,
        MouseInput: M,
        PointerEventInput: N,
        TouchMouseInput: S,
        SingleTouchInput: O,
        Recognizer: V,
        AttrRecognizer: Z,
        Tap: db,
        Pan: $,
        Swipe: cb,
        Pinch: _,
        Rotate: bb,
        Press: ab,
        on: n,
        off: o,
        each: g,
        merge: i,
        extend: h,
        inherit: j,
        bindFn: k,
        prefixed: v
    }),
    typeof define == kb && define.amd ? define(function() {
        return eb
    }
    ) : "undefined" != typeof module && module.exports ? module.exports = eb : a[c] = eb
}
(window, document, "Hammer"),
function(a, b, c) {
    "use strict";
    function d(a, b) {
        if (!a || !b || !b.type)
            return null ;
        var d;
        return d = b.type.indexOf("pan") > -1 ? new c.Pan(b) : b.type.indexOf("pinch") > -1 ? new c.Pinch(b) : b.type.indexOf("press") > -1 ? new c.Press(b) : b.type.indexOf("rotate") > -1 ? new c.Rotate(b) : b.type.indexOf("swipe") > -1 ? new c.Swipe(b) : new c.Tap(b),
        a.add(d),
        d
    }
    function e(a, b) {
        return a && (b.preventGhosts = a.preventGhosts),
        b
    }
    function f(a) {
        return a.indexOf("pan") > -1 ? "pan" : a.indexOf("pinch") > -1 ? "pinch" : a.indexOf("press") > -1 ? "press" : a.indexOf("rotate") > -1 ? "rotate" : a.indexOf("swipe") > -1 ? "swipe" : "tap"
    }
    function g(a, b, c) {
        if (a && b) {
            var e = a.get(b.type);
            e || (e = d(a, b)),
            b.directions || (b.directions = "pan" === b.type || "swipe" === b.type ? "DIRECTION_ALL" : b.type.indexOf("left") > -1 ? "DIRECTION_LEFT" : b.type.indexOf("right") > -1 ? "DIRECTION_RIGHT" : b.type.indexOf("up") > -1 ? "DIRECTION_UP" : b.type.indexOf("down") > -1 ? "DIRECTION_DOWN" : ""),
            b.direction = h(b.directions),
            e.set(b),
            b.recognizeWith && (a.get(b.recognizeWith) || d(a, {
                type: b.recognizeWith
            }),
            e.recognizeWith(a.get(b.recognizeWith))),
            b.dropRecognizeWith && a.get(b.dropRecognizeWith) && e.dropRecognizeWith(a.get(b.dropRecognizeWith)),
            b.requireFailure && (a.get(b.requireFailure) || d(a, {
                type: b.requireFailure
            }),
            e.requireFailure(a.get(b.requireFailure))),
            b.dropRequireFailure && a.get(b.dropRequireFailure) && e.dropRequireFailure(a.get(b.dropRequireFailure)),
            b.preventGhosts && c && i(c)
        }
    }
    function h(a) {
        var d = 0;
        return b.forEach(a.split("|"), function(a) {
            c.hasOwnProperty(a) && (d |= c[a])
        }
        ),
        d
    }
    function i(b) {
        function c(a) {
            for (var b = 0; b < g.length; b++) {
                var c = g[b][0]
                  , d = g[b][1];
                if (Math.abs(a.clientX - c) < h && Math.abs(a.clientY - d) < h) {
                    a.stopPropagation(),
                    a.preventDefault();
                    break
                }
            }
        }
        function d() {
            g = []
        }
        function e() {
            g.splice(0, 1)
        }
        function f(a) {
            if (a.touches.length - a.changedTouches.length <= 0) {
                var b = a.changedTouches[0];
                g.push([b.clientX, b.clientY]),
                setTimeout(e, i)
            }
        }
        if (b) {
            var g = []
              , h = 25
              , i = 2500;
            "ontouchstart" in a && (b[0].addEventListener("touchstart", d, !0),
            b[0].addEventListener("touchend", f, !0),
            b[0].addEventListener("click", c, !0),
            b[0].addEventListener("mouseup", c, !0))
        }
    }
    if ("undefined" == typeof b)
        if ("undefined" != typeof require && require)
            try {
                b = require("angular")
            } catch (j) {
                return console.log("ERROR: Angular Hammer could not require() a reference to angular")
            }
        else {
            if ("undefined" == typeof a.angular)
                return console.log("ERROR: Angular Hammer could not find or require() a reference to angular");
            b = a.angular
        }
    if ("undefined" == typeof c)
        if ("undefined" != typeof require && require)
            try {
                c = require("hammerjs")
            } catch (j) {
                return console.log("ERROR: Angular Hammer could not require() a reference to Hammer")
            }
        else {
            if ("undefined" == typeof a.Hammer)
                return console.log("ERROR: Angular Hammer could not find or require() a reference to Hammer");
            c = a.Hammer
        }
    var k = ["hmCustom:custom", "hmSwipe:swipe", "hmSwipeleft:swipeleft", "hmSwiperight:swiperight", "hmSwipeup:swipeup", "hmSwipedown:swipedown", "hmPan:pan", "hmPanstart:panstart", "hmPanmove:panmove", "hmPanend:panend", "hmPancancel:pancancel", "hmPanleft:panleft", "hmPanright:panright", "hmPanup:panup", "hmPandown:pandown", "hmPress:press", "hmPressup:pressup", "hmRotate:rotate", "hmRotatestart:rotatestart", "hmRotatemove:rotatemove", "hmRotateend:rotateend", "hmRotatecancel:rotatecancel", "hmPinch:pinch", "hmPinchstart:pinchstart", "hmPinchmove:pinchmove", "hmPinchend:pinchend", "hmPinchcancel:pinchcancel", "hmPinchin:pinchin", "hmPinchout:pinchout", "hmTap:tap", "hmDoubletap:doubletap"];
    b.module("hmTouchEvents", []),
    b.forEach(k, function(a) {
        var d = a.split(":")
          , h = d[0]
          , i = d[1];
        b.module("hmTouchEvents").directive(h, ["$parse", "$window", function(a, d) {
            return {
                restrict: "A",
                link: function(j, k, l) {
                    if (!c || !d.addEventListener)
                        return "hmTap" === h && k.bind("click", r),
                        void ("hmDoubletap" === h && k.bind("dblclick", r));
                    var m = k.data("hammer")
                      , n = b.fromJson(l.hmManagerOptions)
                      , o = b.fromJson(l.hmRecognizerOptions);
                    m || (m = new c.Manager(k[0],n),
                    k.data("hammer", m),
                    j.$on("$destroy", function() {
                        m.destroy()
                    }
                    ));
                    var p = l[h]
                      , q = a(p)
                      , r = function(a) {
                        function b() {
                            var b = q(j, {
                                $event: a
                            });
                            b && b.call(j, a)
                        }
                        var c = j.$root.$$phase
                          , d = m.get(a.type);
                        a.element = k,
                        d && (d.options.preventDefault && a.preventDefault(),
                        d.options.stopPropagation && a.srcEvent.stopPropagation()),
                        "$apply" === c || "$digest" === c ? b() : j.$apply(b)
                    }
                    ;
                    b.isArray(o) ? b.forEach(o, function(a) {
                        "hmCustom" === h ? i = a.event : (a.type || (a.type = f(i)),
                        a.event && delete a.event),
                        ("hmCustom" === h || i.indexOf(a.type) > -1) && g(m, e(n, a), k)
                    }
                    ) : b.isObject(o) ? ("hmCustom" === h ? i = o.event : (o.type || (o.type = f(i)),
                    o.event && delete o.event),
                    ("hmCustom" === h || i.indexOf(o.type) > -1) && g(m, e(n, o), k)) : "hmCustom" !== h ? (o = {
                        type: f(i)
                    },
                    "hmDoubletap" === h && (o.event = i,
                    o.taps = 2,
                    m.get("tap") && (o.recognizeWith = "tap")),
                    o.type.indexOf("pan") > -1 && m.get("swipe") && (o.recognizeWith = "swipe"),
                    o.type.indexOf("pinch") > -1 && m.get("rotate") && (o.recognizeWith = "rotate"),
                    g(m, e(n, o), k)) : i = null ,
                    i && m.on(i, r)
                }
            }
        }
        ])
    }
    )
}
(window, window.angular, window.Hammer),
function(a, b, c) {
    "use strict";
    function d(a) {
        var b;
        if (b = a.match(j)) {
            var c = new Date(0)
              , d = 0
              , f = 0;
            return b[9] && (d = e(b[9] + b[10]),
            f = e(b[9] + b[11])),
            c.setUTCFullYear(e(b[1]), e(b[2]) - 1, e(b[3])),
            c.setUTCHours(e(b[4] || 0) - d, e(b[5] || 0) - f, e(b[6] || 0), e(b[7] || 0)),
            c
        }
        return a
    }
    function e(a) {
        return parseInt(a, 10)
    }
    function f(a, b, c) {
        var d = "";
        for (0 > a && (d = "-",
        a = -a),
        a = "" + a; a.length < b; )
            a = "0" + a;
        return c && (a = a.substr(a.length - b)),
        d + a
    }
    function g(a, d, e) {
        function f(a, c, d, e) {
            return b.isFunction(a) ? a : function() {
                return b.isNumber(a) ? [a, c, d, e] : [200, a, c]
            }
        }
        function g(a, f, g, h, j, p, q) {
            function r(a) {
                return b.isString(a) || b.isFunction(a) || a instanceof RegExp ? a : b.toJson(a)
            }
            function s(b) {
                function d() {
                    var c = b.response(a, f, g, j);
                    t.$$respHeaders = c[2],
                    h(o(c[0]), o(c[1]), t.getAllResponseHeaders(), o(c[3] || ""))
                }
                function i() {
                    for (var a = 0, b = m.length; b > a; a++)
                        if (m[a] === d) {
                            m.splice(a, 1),
                            h(-1, c, "");
                            break
                        }
                }
                return !e && p && p.then && p.then(i),
                d
            }
            var t = new i
              , u = l[0]
              , v = !1;
            if (u && u.match(a, f)) {
                if (!u.matchData(g))
                    throw new Error("Expected " + u + " with different data\nEXPECTED: " + r(u.data) + "\nGOT:      " + g);
                if (!u.matchHeaders(j))
                    throw new Error("Expected " + u + " with different headers\nEXPECTED: " + r(u.headers) + "\nGOT:      " + r(j));
                if (l.shift(),
                u.response)
                    return void m.push(s(u));
                v = !0
            }
            for (var w, x = -1; w = k[++x]; )
                if (w.match(a, f, g, j || {})) {
                    if (w.response)
                        (e ? e.defer : n)(s(w));
                    else {
                        if (!w.passThrough)
                            throw new Error("No response defined !");
                        d(a, f, g, h, j, p, q)
                    }
                    return
                }
            throw new Error(v ? "No response defined !" : "Unexpected request: " + a + " " + f + "\n" + (u ? "Expected " + u : "No more request expected"))
        }
        function j(a) {
            b.forEach(["GET", "DELETE", "JSONP", "HEAD"], function(b) {
                g[a + b] = function(d, e) {
                    return g[a](b, d, c, e)
                }
            }
            ),
            b.forEach(["PUT", "POST", "PATCH"], function(b) {
                g[a + b] = function(c, d, e) {
                    return g[a](b, c, d, e)
                }
            }
            )
        }
        var k = []
          , l = []
          , m = []
          , n = b.bind(m, m.push)
          , o = b.copy;
        return g.when = function(a, b, c, d) {
            var g = new h(a,b,c,d)
              , i = {
                respond: function(a, b, c, d) {
                    g.response = f(a, b, c, d)
                }
            };
            return e && (i.passThrough = function() {
                g.passThrough = !0
            }
            ),
            k.push(g),
            i
        }
        ,
        j("when"),
        g.expect = function(a, b, c, d) {
            var e = new h(a,b,c,d);
            return l.push(e),
            {
                respond: function(a, b, c, d) {
                    e.response = f(a, b, c, d)
                }
            }
        }
        ,
        j("expect"),
        g.flush = function(c) {
            if (a.$digest(),
            !m.length)
                throw new Error("No pending request to flush !");
            if (b.isDefined(c))
                for (; c--; ) {
                    if (!m.length)
                        throw new Error("No more pending request to flush !");
                    m.shift()()
                }
            else
                for (; m.length; )
                    m.shift()();
            g.verifyNoOutstandingExpectation()
        }
        ,
        g.verifyNoOutstandingExpectation = function() {
            if (a.$digest(),
            l.length)
                throw new Error("Unsatisfied requests: " + l.join(", "))
        }
        ,
        g.verifyNoOutstandingRequest = function() {
            if (m.length)
                throw new Error("Unflushed requests: " + m.length)
        }
        ,
        g.resetExpectations = function() {
            l.length = 0,
            m.length = 0
        }
        ,
        g
    }
    function h(a, c, d, e) {
        this.data = d,
        this.headers = e,
        this.match = function(c, d, e, f) {
            return a != c ? !1 : this.matchUrl(d) ? b.isDefined(e) && !this.matchData(e) ? !1 : b.isDefined(f) && !this.matchHeaders(f) ? !1 : !0 : !1
        }
        ,
        this.matchUrl = function(a) {
            return c ? b.isFunction(c.test) ? c.test(a) : c == a : !0
        }
        ,
        this.matchHeaders = function(a) {
            return b.isUndefined(e) ? !0 : b.isFunction(e) ? e(a) : b.equals(e, a)
        }
        ,
        this.matchData = function(a) {
            return b.isUndefined(d) ? !0 : d && b.isFunction(d.test) ? d.test(a) : d && b.isFunction(d) ? d(a) : d && !b.isString(d) ? b.equals(b.fromJson(b.toJson(d)), b.fromJson(a)) : d == a
        }
        ,
        this.toString = function() {
            return a + " " + c
        }
    }
    function i() {
        i.$$lastInstance = this,
        this.open = function(a, b, c) {
            this.$$method = a,
            this.$$url = b,
            this.$$async = c,
            this.$$reqHeaders = {},
            this.$$respHeaders = {}
        }
        ,
        this.send = function(a) {
            this.$$data = a
        }
        ,
        this.setRequestHeader = function(a, b) {
            this.$$reqHeaders[a] = b
        }
        ,
        this.getResponseHeader = function(a) {
            var d = this.$$respHeaders[a];
            return d ? d : (a = b.lowercase(a),
            (d = this.$$respHeaders[a]) ? d : (d = c,
            b.forEach(this.$$respHeaders, function(c, e) {
                d || b.lowercase(e) != a || (d = c)
            }
            ),
            d))
        }
        ,
        this.getAllResponseHeaders = function() {
            var a = [];
            return b.forEach(this.$$respHeaders, function(b, c) {
                a.push(c + ": " + b)
            }
            ),
            a.join("\n")
        }
        ,
        this.abort = b.noop
    }
    b.mock = {},
    b.mock.$BrowserProvider = function() {
        this.$get = function() {
            return new b.mock.$Browser
        }
    }
    ,
    b.mock.$Browser = function() {
        var a = this;
        this.isMock = !0,
        a.$$url = "http://server/",
        a.$$lastUrl = a.$$url,
        a.pollFns = [],
        a.$$completeOutstandingRequest = b.noop,
        a.$$incOutstandingRequestCount = b.noop,
        a.onUrlChange = function(b) {
            return a.pollFns.push(function() {
                a.$$lastUrl != a.$$url && (a.$$lastUrl = a.$$url,
                b(a.$$url))
            }
            ),
            b
        }
        ,
        a.$$checkUrlChange = b.noop,
        a.cookieHash = {},
        a.lastCookieHash = {},
        a.deferredFns = [],
        a.deferredNextId = 0,
        a.defer = function(b, c) {
            return c = c || 0,
            a.deferredFns.push({
                time: a.defer.now + c,
                fn: b,
                id: a.deferredNextId
            }),
            a.deferredFns.sort(function(a, b) {
                return a.time - b.time
            }
            ),
            a.deferredNextId++
        }
        ,
        a.defer.now = 0,
        a.defer.cancel = function(d) {
            var e;
            return b.forEach(a.deferredFns, function(a, b) {
                a.id === d && (e = b)
            }
            ),
            e !== c ? (a.deferredFns.splice(e, 1),
            !0) : !1
        }
        ,
        a.defer.flush = function(c) {
            if (b.isDefined(c))
                a.defer.now += c;
            else {
                if (!a.deferredFns.length)
                    throw new Error("No deferred tasks to be flushed");
                a.defer.now = a.deferredFns[a.deferredFns.length - 1].time
            }
            for (; a.deferredFns.length && a.deferredFns[0].time <= a.defer.now; )
                a.deferredFns.shift().fn()
        }
        ,
        a.$$baseHref = "",
        a.baseHref = function() {
            return this.$$baseHref
        }
    }
    ,
    b.mock.$Browser.prototype = {
        poll: function() {
            b.forEach(this.pollFns, function(a) {
                a()
            }
            )
        },
        addPollFn: function(a) {
            return this.pollFns.push(a),
            a
        },
        url: function(a) {
            return a ? (this.$$url = a,
            this) : this.$$url
        },
        cookies: function(a, c) {
            return a ? void (b.isUndefined(c) ? delete this.cookieHash[a] : b.isString(c) && c.length <= 4096 && (this.cookieHash[a] = c)) : (b.equals(this.cookieHash, this.lastCookieHash) || (this.lastCookieHash = b.copy(this.cookieHash),
            this.cookieHash = b.copy(this.cookieHash)),
            this.cookieHash)
        },
        notifyWhenNoOutstandingRequests: function(a) {
            a()
        }
    },
    b.mock.$ExceptionHandlerProvider = function() {
        var a;
        this.mode = function(b) {
            switch (b) {
            case "rethrow":
                a = function(a) {
                    throw a
                }
                ;
                break;
            case "log":
                var c = [];
                a = function(a) {
                    c.push(1 == arguments.length ? a : [].slice.call(arguments, 0))
                }
                ,
                a.errors = c;
                break;
            default:
                throw new Error("Unknown mode '" + b + "', only 'log'/'rethrow' modes are allowed!")
            }
        }
        ,
        this.$get = function() {
            return a
        }
        ,
        this.mode("rethrow")
    }
    ,
    b.mock.$LogProvider = function() {
        function a(a, b, c) {
            return a.concat(Array.prototype.slice.call(b, c))
        }
        var c = !0;
        this.debugEnabled = function(a) {
            return b.isDefined(a) ? (c = a,
            this) : c
        }
        ,
        this.$get = function() {
            var d = {
                log: function() {
                    d.log.logs.push(a([], arguments, 0))
                },
                warn: function() {
                    d.warn.logs.push(a([], arguments, 0))
                },
                info: function() {
                    d.info.logs.push(a([], arguments, 0))
                },
                error: function() {
                    d.error.logs.push(a([], arguments, 0))
                },
                debug: function() {
                    c && d.debug.logs.push(a([], arguments, 0))
                }
            };
            return d.reset = function() {
                d.log.logs = [],
                d.info.logs = [],
                d.warn.logs = [],
                d.error.logs = [],
                d.debug.logs = []
            }
            ,
            d.assertEmpty = function() {
                var a = [];
                if (b.forEach(["error", "warn", "info", "log", "debug"], function(c) {
                    b.forEach(d[c].logs, function(d) {
                        b.forEach(d, function(b) {
                            a.push("MOCK $log (" + c + "): " + String(b) + "\n" + (b.stack || ""))
                        }
                        )
                    }
                    )
                }
                ),
                a.length)
                    throw a.unshift("Expected $log to be empty! Either a message was logged unexpectedly, or an expected log message was not checked and removed:"),
                    a.push(""),
                    new Error(a.join("\n---------\n"))
            }
            ,
            d.reset(),
            d
        }
    }
    ,
    b.mock.$IntervalProvider = function() {
        this.$get = ["$rootScope", "$q", function(a, d) {
            var e = []
              , f = 0
              , g = 0
              , h = function(h, i, j, k) {
                function l() {
                    if (m.notify(o++),
                    j > 0 && o >= j) {
                        var d;
                        m.resolve(o),
                        b.forEach(e, function(a, b) {
                            a.id === n.$$intervalId && (d = b)
                        }
                        ),
                        d !== c && e.splice(d, 1)
                    }
                    p || a.$apply()
                }
                var m = d.defer()
                  , n = m.promise
                  , o = 0
                  , p = b.isDefined(k) && !k;
                return j = b.isDefined(j) ? j : 0,
                n.then(null , null , h),
                n.$$intervalId = f,
                e.push({
                    nextTime: g + i,
                    delay: i,
                    fn: l,
                    id: f,
                    deferred: m
                }),
                e.sort(function(a, b) {
                    return a.nextTime - b.nextTime
                }
                ),
                f++,
                n
            }
            ;
            return h.cancel = function(a) {
                if (!a)
                    return !1;
                var d;
                return b.forEach(e, function(b, c) {
                    b.id === a.$$intervalId && (d = c)
                }
                ),
                d !== c ? (e[d].deferred.reject("canceled"),
                e.splice(d, 1),
                !0) : !1
            }
            ,
            h.flush = function(a) {
                for (g += a; e.length && e[0].nextTime <= g; ) {
                    var b = e[0];
                    b.fn(),
                    b.nextTime += b.delay,
                    e.sort(function(a, b) {
                        return a.nextTime - b.nextTime
                    }
                    )
                }
                return a
            }
            ,
            h
        }
        ]
    }
    ;
    var j = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?:\:?(\d\d)(?:\:?(\d\d)(?:\.(\d{3}))?)?)?(Z|([+-])(\d\d):?(\d\d)))?$/;
    if (b.mock.TzDate = function(a, c) {
        var e = new Date(0);
        if (b.isString(c)) {
            var g = c;
            if (e.origDate = d(c),
            c = e.origDate.getTime(),
            isNaN(c))
                throw {
                    name: "Illegal Argument",
                    message: "Arg '" + g + "' passed into TzDate constructor is not a valid date string"
                }
        } else
            e.origDate = new Date(c);
        var h = new Date(c).getTimezoneOffset();
        e.offsetDiff = 60 * h * 1e3 - 1e3 * a * 60 * 60,
        e.date = new Date(c + e.offsetDiff),
        e.getTime = function() {
            return e.date.getTime() - e.offsetDiff
        }
        ,
        e.toLocaleDateString = function() {
            return e.date.toLocaleDateString()
        }
        ,
        e.getFullYear = function() {
            return e.date.getFullYear()
        }
        ,
        e.getMonth = function() {
            return e.date.getMonth()
        }
        ,
        e.getDate = function() {
            return e.date.getDate()
        }
        ,
        e.getHours = function() {
            return e.date.getHours()
        }
        ,
        e.getMinutes = function() {
            return e.date.getMinutes()
        }
        ,
        e.getSeconds = function() {
            return e.date.getSeconds()
        }
        ,
        e.getMilliseconds = function() {
            return e.date.getMilliseconds()
        }
        ,
        e.getTimezoneOffset = function() {
            return 60 * a
        }
        ,
        e.getUTCFullYear = function() {
            return e.origDate.getUTCFullYear()
        }
        ,
        e.getUTCMonth = function() {
            return e.origDate.getUTCMonth()
        }
        ,
        e.getUTCDate = function() {
            return e.origDate.getUTCDate()
        }
        ,
        e.getUTCHours = function() {
            return e.origDate.getUTCHours()
        }
        ,
        e.getUTCMinutes = function() {
            return e.origDate.getUTCMinutes()
        }
        ,
        e.getUTCSeconds = function() {
            return e.origDate.getUTCSeconds()
        }
        ,
        e.getUTCMilliseconds = function() {
            return e.origDate.getUTCMilliseconds()
        }
        ,
        e.getDay = function() {
            return e.date.getDay()
        }
        ,
        e.toISOString && (e.toISOString = function() {
            return f(e.origDate.getUTCFullYear(), 4) + "-" + f(e.origDate.getUTCMonth() + 1, 2) + "-" + f(e.origDate.getUTCDate(), 2) + "T" + f(e.origDate.getUTCHours(), 2) + ":" + f(e.origDate.getUTCMinutes(), 2) + ":" + f(e.origDate.getUTCSeconds(), 2) + "." + f(e.origDate.getUTCMilliseconds(), 3) + "Z"
        }
        );
        var i = ["getUTCDay", "getYear", "setDate", "setFullYear", "setHours", "setMilliseconds", "setMinutes", "setMonth", "setSeconds", "setTime", "setUTCDate", "setUTCFullYear", "setUTCHours", "setUTCMilliseconds", "setUTCMinutes", "setUTCMonth", "setUTCSeconds", "setYear", "toDateString", "toGMTString", "toJSON", "toLocaleFormat", "toLocaleString", "toLocaleTimeString", "toSource", "toString", "toTimeString", "toUTCString", "valueOf"];
        return b.forEach(i, function(a) {
            e[a] = function() {
                throw new Error("Method '" + a + "' is not implemented in the TzDate mock")
            }
        }
        ),
        e
    }
    ,
    b.mock.TzDate.prototype = Date.prototype,
    b.mock.animate = b.module("ngAnimateMock", ["ng"]).config(["$provide", function(a) {
        var c = [];
        a.value("$$animateReflow", function(a) {
            var b = c.length;
            return c.push(a),
            function() {
                c.splice(b, 1)
            }
        }
        ),
        a.decorator("$animate", ["$delegate", "$$asyncCallback", function(a, d) {
            var e = {
                queue: [],
                enabled: a.enabled,
                triggerCallbacks: function() {
                    d.flush()
                },
                triggerReflow: function() {
                    b.forEach(c, function(a) {
                        a()
                    }
                    ),
                    c = []
                }
            };
            return b.forEach(["enter", "leave", "move", "addClass", "removeClass", "setClass"], function(b) {
                e[b] = function() {
                    e.queue.push({
                        event: b,
                        element: arguments[0],
                        args: arguments
                    }),
                    a[b].apply(a, arguments)
                }
            }
            ),
            e
        }
        ])
    }
    ]),
    b.mock.dump = function(a) {
        function c(a) {
            var e;
            return b.isElement(a) ? (a = b.element(a),
            e = b.element("<div></div>"),
            b.forEach(a, function(a) {
                e.append(b.element(a).clone())
            }
            ),
            e = e.html()) : b.isArray(a) ? (e = [],
            b.forEach(a, function(a) {
                e.push(c(a))
            }
            ),
            e = "[ " + e.join(", ") + " ]") : e = b.isObject(a) ? b.isFunction(a.$eval) && b.isFunction(a.$apply) ? d(a) : a instanceof Error ? a.stack || "" + a.name + ": " + a.message : b.toJson(a, !0) : String(a),
            e
        }
        function d(a, c) {
            c = c || "  ";
            var e = [c + "Scope(" + a.$id + "): {"];
            for (var f in a)
                Object.prototype.hasOwnProperty.call(a, f) && !f.match(/^(\$|this)/) && e.push("  " + f + ": " + b.toJson(a[f]));
            for (var g = a.$$childHead; g; )
                e.push(d(g, c + "  ")),
                g = g.$$nextSibling;
            return e.push("}"),
            e.join("\n" + c)
        }
        return c(a)
    }
    ,
    b.mock.$HttpBackendProvider = function() {
        this.$get = ["$rootScope", g]
    }
    ,
    b.mock.$TimeoutDecorator = function(a, c) {
        function d(a) {
            var c = [];
            return b.forEach(a, function(a) {
                c.push("{id: " + a.id + ", time: " + a.time + "}")
            }
            ),
            c.join(", ")
        }
        return a.flush = function(a) {
            c.defer.flush(a)
        }
        ,
        a.verifyNoPendingTasks = function() {
            if (c.deferredFns.length)
                throw new Error("Deferred tasks to flush (" + c.deferredFns.length + "): " + d(c.deferredFns))
        }
        ,
        a
    }
    ,
    b.mock.$RAFDecorator = function(a) {
        var b = []
          , c = function(a) {
            var c = b.length;
            return b.push(a),
            function() {
                b.splice(c, 1)
            }
        }
        ;
        return c.supported = a.supported,
        c.flush = function() {
            if (0 === b.length)
                throw new Error("No rAF callbacks present");
            for (var a = b.length, c = 0; a > c; c++)
                b[c]();
            b = []
        }
        ,
        c
    }
    ,
    b.mock.$AsyncCallbackDecorator = function() {
        var a = []
          , c = function(b) {
            a.push(b)
        }
        ;
        return c.flush = function() {
            b.forEach(a, function(a) {
                a()
            }
            ),
            a = []
        }
        ,
        c
    }
    ,
    b.mock.$RootElementProvider = function() {
        this.$get = function() {
            return b.element("<div ng-app></div>")
        }
    }
    ,
    b.module("ngMock", ["ng"]).provider({
        $browser: b.mock.$BrowserProvider,
        $exceptionHandler: b.mock.$ExceptionHandlerProvider,
        $log: b.mock.$LogProvider,
        $interval: b.mock.$IntervalProvider,
        $httpBackend: b.mock.$HttpBackendProvider,
        $rootElement: b.mock.$RootElementProvider
    }).config(["$provide", function(a) {
        a.decorator("$timeout", b.mock.$TimeoutDecorator),
        a.decorator("$$rAF", b.mock.$RAFDecorator),
        a.decorator("$$asyncCallback", b.mock.$AsyncCallbackDecorator)
    }
    ]),
    b.module("ngMockE2E", ["ng"]).config(["$provide", function(a) {
        a.decorator("$httpBackend", b.mock.e2e.$httpBackendDecorator)
    }
    ]),
    b.mock.e2e = {},
    b.mock.e2e.$httpBackendDecorator = ["$rootScope", "$delegate", "$browser", g],
    b.mock.clearDataCache = function() {
        var a, c = b.element.cache;
        for (a in c)
            if (Object.prototype.hasOwnProperty.call(c, a)) {
                var d = c[a].handle;
                d && b.element(d.elem).off(),
                delete c[a]
            }
    }
    ,
    a.jasmine || a.mocha) {
        var k = null
          , l = function() {
            return !!k
        }
        ;
        (a.beforeEach || a.setup)(function() {
            k = this
        }
        ),
        (a.afterEach || a.teardown)(function() {
            var a = k.$injector;
            b.forEach(k.$modules, function(a) {
                a && a.$$hashKey && (a.$$hashKey = c)
            }
            ),
            k.$injector = null ,
            k.$modules = null ,
            k = null ,
            a && (a.get("$rootElement").off(),
            a.get("$browser").pollFns.length = 0),
            b.mock.clearDataCache(),
            b.forEach(b.element.fragments, function(a, c) {
                delete b.element.fragments[c]
            }
            ),
            i.$$lastInstance = null ,
            b.forEach(b.callbacks, function(a, c) {
                delete b.callbacks[c]
            }
            ),
            b.callbacks.counter = 0
        }
        ),
        a.module = b.mock.module = function() {
            function a() {
                if (k.$injector)
                    throw new Error("Injector already created, can not register a module!");
                var a = k.$modules || (k.$modules = []);
                b.forEach(c, function(c) {
                    a.push(b.isObject(c) && !b.isArray(c) ? function(a) {
                        b.forEach(c, function(b, c) {
                            a.value(c, b)
                        }
                        )
                    }
                     : c)
                }
                )
            }
            var c = Array.prototype.slice.call(arguments, 0);
            return l() ? a() : a
        }
        ;
        var m = function(a, b) {
            this.message = a.message,
            this.name = a.name,
            a.line && (this.line = a.line),
            a.sourceId && (this.sourceId = a.sourceId),
            a.stack && b && (this.stack = a.stack + "\n" + b.stack),
            a.stackArray && (this.stackArray = a.stackArray)
        }
        ;
        m.prototype.toString = Error.prototype.toString,
        a.inject = b.mock.inject = function() {
            function a() {
                var a = k.$modules || [];
                a.unshift("ngMock"),
                a.unshift("ng");
                var e = k.$injector;
                e || (e = k.$injector = b.injector(a));
                for (var f = 0, g = c.length; g > f; f++)
                    try {
                        e.invoke(c[f] || b.noop, this)
                    } catch (h) {
                        if (h.stack && d)
                            throw new m(h,d);
                        throw h
                    } finally {
                        d = null
                    }
            }
            var c = Array.prototype.slice.call(arguments, 0)
              , d = new Error("Declaration Location");
            return l() ? a.call(k) : a
        }
    }
}
(window, window.angular),
function(a) {
    function b(a, b, c) {
        switch (arguments.length) {
        case 2:
            return null  != a ? a : b;
        case 3:
            return null  != a ? a : null  != b ? b : c;
        default:
            throw new Error("Implement me")
        }
    }
    function c(a, b) {
        return Bb.call(a, b)
    }
    function d() {
        return {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidMonth: null ,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1
        }
    }
    function e(a) {
        vb.suppressDeprecationWarnings === !1 && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + a)
    }
    function f(a, b) {
        var c = !0;
        return o(function() {
            return c && (e(a),
            c = !1),
            b.apply(this, arguments)
        }
        , b)
    }
    function g(a, b) {
        sc[a] || (e(b),
        sc[a] = !0)
    }
    function h(a, b) {
        return function(c) {
            return r(a.call(this, c), b)
        }
    }
    function i(a, b) {
        return function(c) {
            return this.localeData().ordinal(a.call(this, c), b)
        }
    }
    function j(a, b) {
        var c, d, e = 12 * (b.year() - a.year()) + (b.month() - a.month()), f = a.clone().add(e, "months");
        return 0 > b - f ? (c = a.clone().add(e - 1, "months"),
        d = (b - f) / (f - c)) : (c = a.clone().add(e + 1, "months"),
        d = (b - f) / (c - f)),
        -(e + d)
    }
    function k(a, b, c) {
        var d;
        return null  == c ? b : null  != a.meridiemHour ? a.meridiemHour(b, c) : null  != a.isPM ? (d = a.isPM(c),
        d && 12 > b && (b += 12),
        d || 12 !== b || (b = 0),
        b) : b
    }
    function l() {}
    function m(a, b) {
        b !== !1 && H(a),
        p(this, a),
        this._d = new Date(+a._d),
        uc === !1 && (uc = !0,
        vb.updateOffset(this),
        uc = !1)
    }
    function n(a) {
        var b = A(a)
          , c = b.year || 0
          , d = b.quarter || 0
          , e = b.month || 0
          , f = b.week || 0
          , g = b.day || 0
          , h = b.hour || 0
          , i = b.minute || 0
          , j = b.second || 0
          , k = b.millisecond || 0;
        this._milliseconds = +k + 1e3 * j + 6e4 * i + 36e5 * h,
        this._days = +g + 7 * f,
        this._months = +e + 3 * d + 12 * c,
        this._data = {},
        this._locale = vb.localeData(),
        this._bubble()
    }
    function o(a, b) {
        for (var d in b)
            c(b, d) && (a[d] = b[d]);
        return c(b, "toString") && (a.toString = b.toString),
        c(b, "valueOf") && (a.valueOf = b.valueOf),
        a
    }
    function p(a, b) {
        var c, d, e;
        if ("undefined" != typeof b._isAMomentObject && (a._isAMomentObject = b._isAMomentObject),
        "undefined" != typeof b._i && (a._i = b._i),
        "undefined" != typeof b._f && (a._f = b._f),
        "undefined" != typeof b._l && (a._l = b._l),
        "undefined" != typeof b._strict && (a._strict = b._strict),
        "undefined" != typeof b._tzm && (a._tzm = b._tzm),
        "undefined" != typeof b._isUTC && (a._isUTC = b._isUTC),
        "undefined" != typeof b._offset && (a._offset = b._offset),
        "undefined" != typeof b._pf && (a._pf = b._pf),
        "undefined" != typeof b._locale && (a._locale = b._locale),
        Kb.length > 0)
            for (c in Kb)
                d = Kb[c],
                e = b[d],
                "undefined" != typeof e && (a[d] = e);
        return a
    }
    function q(a) {
        return 0 > a ? Math.ceil(a) : Math.floor(a)
    }
    function r(a, b, c) {
        for (var d = "" + Math.abs(a), e = a >= 0; d.length < b; )
            d = "0" + d;
        return (e ? c ? "+" : "" : "-") + d
    }
    function s(a, b) {
        var c = {
            milliseconds: 0,
            months: 0
        };
        return c.months = b.month() - a.month() + 12 * (b.year() - a.year()),
        a.clone().add(c.months, "M").isAfter(b) && --c.months,
        c.milliseconds = +b - +a.clone().add(c.months, "M"),
        c
    }
    function t(a, b) {
        var c;
        return b = M(b, a),
        a.isBefore(b) ? c = s(a, b) : (c = s(b, a),
        c.milliseconds = -c.milliseconds,
        c.months = -c.months),
        c
    }
    function u(a, b) {
        return function(c, d) {
            var e, f;
            return null  === d || isNaN(+d) || (g(b, "moment()." + b + "(period, number) is deprecated. Please use moment()." + b + "(number, period)."),
            f = c,
            c = d,
            d = f),
            c = "string" == typeof c ? +c : c,
            e = vb.duration(c, d),
            v(this, e, a),
            this
        }
    }
    function v(a, b, c, d) {
        var e = b._milliseconds
          , f = b._days
          , g = b._months;
        d = null  == d ? !0 : d,
        e && a._d.setTime(+a._d + e * c),
        f && pb(a, "Date", ob(a, "Date") + f * c),
        g && nb(a, ob(a, "Month") + g * c),
        d && vb.updateOffset(a, f || g)
    }
    function w(a) {
        return "[object Array]" === Object.prototype.toString.call(a)
    }
    function x(a) {
        return "[object Date]" === Object.prototype.toString.call(a) || a instanceof Date
    }
    function y(a, b, c) {
        var d, e = Math.min(a.length, b.length), f = Math.abs(a.length - b.length), g = 0;
        for (d = 0; e > d; d++)
            (c && a[d] !== b[d] || !c && C(a[d]) !== C(b[d])) && g++;
        return g + f
    }
    function z(a) {
        if (a) {
            var b = a.toLowerCase().replace(/(.)s$/, "$1");
            a = lc[a] || mc[b] || b
        }
        return a
    }
    function A(a) {
        var b, d, e = {};
        for (d in a)
            c(a, d) && (b = z(d),
            b && (e[b] = a[d]));
        return e
    }
    function B(b) {
        var c, d;
        if (0 === b.indexOf("week"))
            c = 7,
            d = "day";
        else {
            if (0 !== b.indexOf("month"))
                return;
            c = 12,
            d = "month"
        }
        vb[b] = function(e, f) {
            var g, h, i = vb._locale[b], j = [];
            if ("number" == typeof e && (f = e,
            e = a),
            h = function(a) {
                var b = vb().utc().set(d, a);
                return i.call(vb._locale, b, e || "")
            }
            ,
            null  != f)
                return h(f);
            for (g = 0; c > g; g++)
                j.push(h(g));
            return j
        }
    }
    function C(a) {
        var b = +a
          , c = 0;
        return 0 !== b && isFinite(b) && (c = b >= 0 ? Math.floor(b) : Math.ceil(b)),
        c
    }
    function D(a, b) {
        return new Date(Date.UTC(a, b + 1, 0)).getUTCDate()
    }
    function E(a, b, c) {
        return jb(vb([a, 11, 31 + b - c]), b, c).week
    }
    function F(a) {
        return G(a) ? 366 : 365
    }
    function G(a) {
        return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0
    }
    function H(a) {
        var b;
        a._a && -2 === a._pf.overflow && (b = a._a[Db] < 0 || a._a[Db] > 11 ? Db : a._a[Eb] < 1 || a._a[Eb] > D(a._a[Cb], a._a[Db]) ? Eb : a._a[Fb] < 0 || a._a[Fb] > 24 || 24 === a._a[Fb] && (0 !== a._a[Gb] || 0 !== a._a[Hb] || 0 !== a._a[Ib]) ? Fb : a._a[Gb] < 0 || a._a[Gb] > 59 ? Gb : a._a[Hb] < 0 || a._a[Hb] > 59 ? Hb : a._a[Ib] < 0 || a._a[Ib] > 999 ? Ib : -1,
        a._pf._overflowDayOfYear && (Cb > b || b > Eb) && (b = Eb),
        a._pf.overflow = b)
    }
    function I(b) {
        return null  == b._isValid && (b._isValid = !isNaN(b._d.getTime()) && b._pf.overflow < 0 && !b._pf.empty && !b._pf.invalidMonth && !b._pf.nullInput && !b._pf.invalidFormat && !b._pf.userInvalidated,
        b._strict && (b._isValid = b._isValid && 0 === b._pf.charsLeftOver && 0 === b._pf.unusedTokens.length && b._pf.bigHour === a)),
        b._isValid
    }
    function J(a) {
        return a ? a.toLowerCase().replace("_", "-") : a
    }
    function K(a) {
        for (var b, c, d, e, f = 0; f < a.length; ) {
            for (e = J(a[f]).split("-"),
            b = e.length,
            c = J(a[f + 1]),
            c = c ? c.split("-") : null ; b > 0; ) {
                if (d = L(e.slice(0, b).join("-")))
                    return d;
                if (c && c.length >= b && y(e, c, !0) >= b - 1)
                    break;
                b--
            }
            f++
        }
        return null
    }
    function L(a) {
        var b = null ;
        if (!Jb[a] && Lb)
            try {
                b = vb.locale(),
                require("./locale/" + a),
                vb.locale(b)
            } catch (c) {}
        return Jb[a]
    }
    function M(a, b) {
        var c, d;
        return b._isUTC ? (c = b.clone(),
        d = (vb.isMoment(a) || x(a) ? +a : +vb(a)) - +c,
        c._d.setTime(+c._d + d),
        vb.updateOffset(c, !1),
        c) : vb(a).local()
    }
    function N(a) {
        return a.match(/\[[\s\S]/) ? a.replace(/^\[|\]$/g, "") : a.replace(/\\/g, "")
    }
    function O(a) {
        var b, c, d = a.match(Pb);
        for (b = 0,
        c = d.length; c > b; b++)
            d[b] = rc[d[b]] ? rc[d[b]] : N(d[b]);
        return function(e) {
            var f = "";
            for (b = 0; c > b; b++)
                f += d[b] instanceof Function ? d[b].call(e, a) : d[b];
            return f
        }
    }
    function P(a, b) {
        return a.isValid() ? (b = Q(b, a.localeData()),
        nc[b] || (nc[b] = O(b)),
        nc[b](a)) : a.localeData().invalidDate()
    }
    function Q(a, b) {
        function c(a) {
            return b.longDateFormat(a) || a
        }
        var d = 5;
        for (Qb.lastIndex = 0; d >= 0 && Qb.test(a); )
            a = a.replace(Qb, c),
            Qb.lastIndex = 0,
            d -= 1;
        return a
    }
    function R(a, b) {
        var c, d = b._strict;
        switch (a) {
        case "Q":
            return _b;
        case "DDDD":
            return bc;
        case "YYYY":
        case "GGGG":
        case "gggg":
            return d ? cc : Tb;
        case "Y":
        case "G":
        case "g":
            return ec;
        case "YYYYYY":
        case "YYYYY":
        case "GGGGG":
        case "ggggg":
            return d ? dc : Ub;
        case "S":
            if (d)
                return _b;
        case "SS":
            if (d)
                return ac;
        case "SSS":
            if (d)
                return bc;
        case "DDD":
            return Sb;
        case "MMM":
        case "MMMM":
        case "dd":
        case "ddd":
        case "dddd":
            return Wb;
        case "a":
        case "A":
            return b._locale._meridiemParse;
        case "x":
            return Zb;
        case "X":
            return $b;
        case "Z":
        case "ZZ":
            return Xb;
        case "T":
            return Yb;
        case "SSSS":
            return Vb;
        case "MM":
        case "DD":
        case "YY":
        case "GG":
        case "gg":
        case "HH":
        case "hh":
        case "mm":
        case "ss":
        case "ww":
        case "WW":
            return d ? ac : Rb;
        case "M":
        case "D":
        case "d":
        case "H":
        case "h":
        case "m":
        case "s":
        case "w":
        case "W":
        case "e":
        case "E":
            return Rb;
        case "Do":
            return d ? b._locale._ordinalParse : b._locale._ordinalParseLenient;
        default:
            return c = new RegExp($(Z(a.replace("\\", "")), "i"))
        }
    }
    function S(a) {
        a = a || "";
        var b = a.match(Xb) || []
          , c = b[b.length - 1] || []
          , d = (c + "").match(jc) || ["-", 0, 0]
          , e = +(60 * d[1]) + C(d[2]);
        return "+" === d[0] ? e : -e
    }
    function T(a, b, c) {
        var d, e = c._a;
        switch (a) {
        case "Q":
            null  != b && (e[Db] = 3 * (C(b) - 1));
            break;
        case "M":
        case "MM":
            null  != b && (e[Db] = C(b) - 1);
            break;
        case "MMM":
        case "MMMM":
            d = c._locale.monthsParse(b, a, c._strict),
            null  != d ? e[Db] = d : c._pf.invalidMonth = b;
            break;
        case "D":
        case "DD":
            null  != b && (e[Eb] = C(b));
            break;
        case "Do":
            null  != b && (e[Eb] = C(parseInt(b.match(/\d{1,2}/)[0], 10)));
            break;
        case "DDD":
        case "DDDD":
            null  != b && (c._dayOfYear = C(b));
            break;
        case "YY":
            e[Cb] = vb.parseTwoDigitYear(b);
            break;
        case "YYYY":
        case "YYYYY":
        case "YYYYYY":
            e[Cb] = C(b);
            break;
        case "a":
        case "A":
            c._meridiem = b;
            break;
        case "h":
        case "hh":
            c._pf.bigHour = !0;
        case "H":
        case "HH":
            e[Fb] = C(b);
            break;
        case "m":
        case "mm":
            e[Gb] = C(b);
            break;
        case "s":
        case "ss":
            e[Hb] = C(b);
            break;
        case "S":
        case "SS":
        case "SSS":
        case "SSSS":
            e[Ib] = C(1e3 * ("0." + b));
            break;
        case "x":
            c._d = new Date(C(b));
            break;
        case "X":
            c._d = new Date(1e3 * parseFloat(b));
            break;
        case "Z":
        case "ZZ":
            c._useUTC = !0,
            c._tzm = S(b);
            break;
        case "dd":
        case "ddd":
        case "dddd":
            d = c._locale.weekdaysParse(b),
            null  != d ? (c._w = c._w || {},
            c._w.d = d) : c._pf.invalidWeekday = b;
            break;
        case "w":
        case "ww":
        case "W":
        case "WW":
        case "d":
        case "e":
        case "E":
            a = a.substr(0, 1);
        case "gggg":
        case "GGGG":
        case "GGGGG":
            a = a.substr(0, 2),
            b && (c._w = c._w || {},
            c._w[a] = C(b));
            break;
        case "gg":
        case "GG":
            c._w = c._w || {},
            c._w[a] = vb.parseTwoDigitYear(b)
        }
    }
    function U(a) {
        var c, d, e, f, g, h, i;
        c = a._w,
        null  != c.GG || null  != c.W || null  != c.E ? (g = 1,
        h = 4,
        d = b(c.GG, a._a[Cb], jb(vb(), 1, 4).year),
        e = b(c.W, 1),
        f = b(c.E, 1)) : (g = a._locale._week.dow,
        h = a._locale._week.doy,
        d = b(c.gg, a._a[Cb], jb(vb(), g, h).year),
        e = b(c.w, 1),
        null  != c.d ? (f = c.d,
        g > f && ++e) : f = null  != c.e ? c.e + g : g),
        i = kb(d, e, f, h, g),
        a._a[Cb] = i.year,
        a._dayOfYear = i.dayOfYear
    }
    function V(a) {
        var c, d, e, f, g = [];
        if (!a._d) {
            for (e = X(a),
            a._w && null  == a._a[Eb] && null  == a._a[Db] && U(a),
            a._dayOfYear && (f = b(a._a[Cb], e[Cb]),
            a._dayOfYear > F(f) && (a._pf._overflowDayOfYear = !0),
            d = fb(f, 0, a._dayOfYear),
            a._a[Db] = d.getUTCMonth(),
            a._a[Eb] = d.getUTCDate()),
            c = 0; 3 > c && null  == a._a[c]; ++c)
                a._a[c] = g[c] = e[c];
            for (; 7 > c; c++)
                a._a[c] = g[c] = null  == a._a[c] ? 2 === c ? 1 : 0 : a._a[c];
            24 === a._a[Fb] && 0 === a._a[Gb] && 0 === a._a[Hb] && 0 === a._a[Ib] && (a._nextDay = !0,
            a._a[Fb] = 0),
            a._d = (a._useUTC ? fb : eb).apply(null , g),
            null  != a._tzm && a._d.setUTCMinutes(a._d.getUTCMinutes() - a._tzm),
            a._nextDay && (a._a[Fb] = 24)
        }
    }
    function W(a) {
        var b;
        a._d || (b = A(a._i),
        a._a = [b.year, b.month, b.day || b.date, b.hour, b.minute, b.second, b.millisecond],
        V(a))
    }
    function X(a) {
        var b = new Date;
        return a._useUTC ? [b.getUTCFullYear(), b.getUTCMonth(), b.getUTCDate()] : [b.getFullYear(), b.getMonth(), b.getDate()]
    }
    function Y(b) {
        if (b._f === vb.ISO_8601)
            return void ab(b);
        b._a = [],
        b._pf.empty = !0;
        var c, d, e, f, g, h = "" + b._i, i = h.length, j = 0;
        for (e = Q(b._f, b._locale).match(Pb) || [],
        c = 0; c < e.length; c++)
            f = e[c],
            d = (h.match(R(f, b)) || [])[0],
            d && (g = h.substr(0, h.indexOf(d)),
            g.length > 0 && b._pf.unusedInput.push(g),
            h = h.slice(h.indexOf(d) + d.length),
            j += d.length),
            rc[f] ? (d ? b._pf.empty = !1 : b._pf.unusedTokens.push(f),
            T(f, d, b)) : b._strict && !d && b._pf.unusedTokens.push(f);
        b._pf.charsLeftOver = i - j,
        h.length > 0 && b._pf.unusedInput.push(h),
        b._pf.bigHour === !0 && b._a[Fb] <= 12 && (b._pf.bigHour = a),
        b._a[Fb] = k(b._locale, b._a[Fb], b._meridiem),
        V(b),
        H(b)
    }
    function Z(a) {
        return a.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(a, b, c, d, e) {
            return b || c || d || e
        }
        )
    }
    function $(a) {
        return a.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    }
    function _(a) {
        var b, c, e, f, g;
        if (0 === a._f.length)
            return a._pf.invalidFormat = !0,
            void (a._d = new Date(0 / 0));
        for (f = 0; f < a._f.length; f++)
            g = 0,
            b = p({}, a),
            null  != a._useUTC && (b._useUTC = a._useUTC),
            b._pf = d(),
            b._f = a._f[f],
            Y(b),
            I(b) && (g += b._pf.charsLeftOver,
            g += 10 * b._pf.unusedTokens.length,
            b._pf.score = g,
            (null  == e || e > g) && (e = g,
            c = b));
        o(a, c || b)
    }
    function ab(a) {
        var b, c, d = a._i, e = fc.exec(d);
        if (e) {
            for (a._pf.iso = !0,
            b = 0,
            c = hc.length; c > b; b++)
                if (hc[b][1].exec(d)) {
                    a._f = hc[b][0] + (e[6] || " ");
                    break
                }
            for (b = 0,
            c = ic.length; c > b; b++)
                if (ic[b][1].exec(d)) {
                    a._f += ic[b][0];
                    break
                }
            d.match(Xb) && (a._f += "Z"),
            Y(a)
        } else
            a._isValid = !1
    }
    function bb(a) {
        ab(a),
        a._isValid === !1 && (delete a._isValid,
        vb.createFromInputFallback(a))
    }
    function cb(a, b) {
        var c, d = [];
        for (c = 0; c < a.length; ++c)
            d.push(b(a[c], c));
        return d
    }
    function db(b) {
        var c, d = b._i;
        d === a ? b._d = new Date : x(d) ? b._d = new Date(+d) : null  !== (c = Mb.exec(d)) ? b._d = new Date(+c[1]) : "string" == typeof d ? bb(b) : w(d) ? (b._a = cb(d.slice(0), function(a) {
            return parseInt(a, 10)
        }
        ),
        V(b)) : "object" == typeof d ? W(b) : "number" == typeof d ? b._d = new Date(d) : vb.createFromInputFallback(b)
    }
    function eb(a, b, c, d, e, f, g) {
        var h = new Date(a,b,c,d,e,f,g);
        return 1970 > a && h.setFullYear(a),
        h
    }
    function fb(a) {
        var b = new Date(Date.UTC.apply(null , arguments));
        return 1970 > a && b.setUTCFullYear(a),
        b
    }
    function gb(a, b) {
        if ("string" == typeof a)
            if (isNaN(a)) {
                if (a = b.weekdaysParse(a),
                "number" != typeof a)
                    return null
            } else
                a = parseInt(a, 10);
        return a
    }
    function hb(a, b, c, d, e) {
        return e.relativeTime(b || 1, !!c, a, d)
    }
    function ib(a, b, c) {
        var d = vb.duration(a).abs()
          , e = Ab(d.as("s"))
          , f = Ab(d.as("m"))
          , g = Ab(d.as("h"))
          , h = Ab(d.as("d"))
          , i = Ab(d.as("M"))
          , j = Ab(d.as("y"))
          , k = e < oc.s && ["s", e] || 1 === f && ["m"] || f < oc.m && ["mm", f] || 1 === g && ["h"] || g < oc.h && ["hh", g] || 1 === h && ["d"] || h < oc.d && ["dd", h] || 1 === i && ["M"] || i < oc.M && ["MM", i] || 1 === j && ["y"] || ["yy", j];
        return k[2] = b,
        k[3] = +a > 0,
        k[4] = c,
        hb.apply({}, k)
    }
    function jb(a, b, c) {
        var d, e = c - b, f = c - a.day();
        return f > e && (f -= 7),
        e - 7 > f && (f += 7),
        d = vb(a).add(f, "d"),
        {
            week: Math.ceil(d.dayOfYear() / 7),
            year: d.year()
        }
    }
    function kb(a, b, c, d, e) {
        var f, g, h = fb(a, 0, 1).getUTCDay();
        return h = 0 === h ? 7 : h,
        c = null  != c ? c : e,
        f = e - h + (h > d ? 7 : 0) - (e > h ? 7 : 0),
        g = 7 * (b - 1) + (c - e) + f + 1,
        {
            year: g > 0 ? a : a - 1,
            dayOfYear: g > 0 ? g : F(a - 1) + g
        }
    }
    function lb(b) {
        var c, d = b._i, e = b._f;
        return b._locale = b._locale || vb.localeData(b._l),
        null  === d || e === a && "" === d ? vb.invalid({
            nullInput: !0
        }) : ("string" == typeof d && (b._i = d = b._locale.preparse(d)),
        vb.isMoment(d) ? new m(d,!0) : (e ? w(e) ? _(b) : Y(b) : db(b),
        c = new m(b),
        c._nextDay && (c.add(1, "d"),
        c._nextDay = a),
        c))
    }
    function mb(a, b) {
        var c, d;
        if (1 === b.length && w(b[0]) && (b = b[0]),
        !b.length)
            return vb();
        for (c = b[0],
        d = 1; d < b.length; ++d)
            b[d][a](c) && (c = b[d]);
        return c
    }
    function nb(a, b) {
        var c;
        return "string" == typeof b && (b = a.localeData().monthsParse(b),
        "number" != typeof b) ? a : (c = Math.min(a.date(), D(a.year(), b)),
        a._d["set" + (a._isUTC ? "UTC" : "") + "Month"](b, c),
        a)
    }
    function ob(a, b) {
        return a._d["get" + (a._isUTC ? "UTC" : "") + b]()
    }
    function pb(a, b, c) {
        return "Month" === b ? nb(a, c) : a._d["set" + (a._isUTC ? "UTC" : "") + b](c)
    }
    function qb(a, b) {
        return function(c) {
            return null  != c ? (pb(this, a, c),
            vb.updateOffset(this, b),
            this) : ob(this, a)
        }
    }
    function rb(a) {
        return 400 * a / 146097
    }
    function sb(a) {
        return 146097 * a / 400
    }
    function tb(a) {
        vb.duration.fn[a] = function() {
            return this._data[a]
        }
    }
    function ub(a) {
        "undefined" == typeof ender && (wb = zb.moment,
        zb.moment = a ? f("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.", vb) : vb)
    }
    for (var vb, wb, xb, yb = "2.9.0", zb = "undefined" == typeof global || "undefined" != typeof window && window !== global.window ? this : global, Ab = Math.round, Bb = Object.prototype.hasOwnProperty, Cb = 0, Db = 1, Eb = 2, Fb = 3, Gb = 4, Hb = 5, Ib = 6, Jb = {}, Kb = [], Lb = "undefined" != typeof module && module && module.exports, Mb = /^\/?Date\((\-?\d+)/i, Nb = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/, Ob = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/, Pb = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|x|X|zz?|ZZ?|.)/g, Qb = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, Rb = /\d\d?/, Sb = /\d{1,3}/, Tb = /\d{1,4}/, Ub = /[+\-]?\d{1,6}/, Vb = /\d+/, Wb = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, Xb = /Z|[\+\-]\d\d:?\d\d/gi, Yb = /T/i, Zb = /[\+\-]?\d+/, $b = /[\+\-]?\d+(\.\d{1,3})?/, _b = /\d/, ac = /\d\d/, bc = /\d{3}/, cc = /\d{4}/, dc = /[+-]?\d{6}/, ec = /[+-]?\d+/, fc = /^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/, gc = "YYYY-MM-DDTHH:mm:ssZ", hc = [["YYYYYY-MM-DD", /[+-]\d{6}-\d{2}-\d{2}/], ["YYYY-MM-DD", /\d{4}-\d{2}-\d{2}/], ["GGGG-[W]WW-E", /\d{4}-W\d{2}-\d/], ["GGGG-[W]WW", /\d{4}-W\d{2}/], ["YYYY-DDD", /\d{4}-\d{3}/]], ic = [["HH:mm:ss.SSSS", /(T| )\d\d:\d\d:\d\d\.\d+/], ["HH:mm:ss", /(T| )\d\d:\d\d:\d\d/], ["HH:mm", /(T| )\d\d:\d\d/], ["HH", /(T| )\d\d/]], jc = /([\+\-]|\d\d)/gi, kc = ("Date|Hours|Minutes|Seconds|Milliseconds".split("|"),
    {
        Milliseconds: 1,
        Seconds: 1e3,
        Minutes: 6e4,
        Hours: 36e5,
        Days: 864e5,
        Months: 2592e6,
        Years: 31536e6
    }), lc = {
        ms: "millisecond",
        s: "second",
        m: "minute",
        h: "hour",
        d: "day",
        D: "date",
        w: "week",
        W: "isoWeek",
        M: "month",
        Q: "quarter",
        y: "year",
        DDD: "dayOfYear",
        e: "weekday",
        E: "isoWeekday",
        gg: "weekYear",
        GG: "isoWeekYear"
    }, mc = {
        dayofyear: "dayOfYear",
        isoweekday: "isoWeekday",
        isoweek: "isoWeek",
        weekyear: "weekYear",
        isoweekyear: "isoWeekYear"
    }, nc = {}, oc = {
        s: 45,
        m: 45,
        h: 22,
        d: 26,
        M: 11
    }, pc = "DDD w W M D d".split(" "), qc = "M D H h m s w W".split(" "), rc = {
        M: function() {
            return this.month() + 1
        },
        MMM: function(a) {
            return this.localeData().monthsShort(this, a)
        },
        MMMM: function(a) {
            return this.localeData().months(this, a)
        },
        D: function() {
            return this.date()
        },
        DDD: function() {
            return this.dayOfYear()
        },
        d: function() {
            return this.day()
        },
        dd: function(a) {
            return this.localeData().weekdaysMin(this, a)
        },
        ddd: function(a) {
            return this.localeData().weekdaysShort(this, a)
        },
        dddd: function(a) {
            return this.localeData().weekdays(this, a)
        },
        w: function() {
            return this.week()
        },
        W: function() {
            return this.isoWeek()
        },
        YY: function() {
            return r(this.year() % 100, 2)
        },
        YYYY: function() {
            return r(this.year(), 4)
        },
        YYYYY: function() {
            return r(this.year(), 5)
        },
        YYYYYY: function() {
            var a = this.year()
              , b = a >= 0 ? "+" : "-";
            return b + r(Math.abs(a), 6)
        },
        gg: function() {
            return r(this.weekYear() % 100, 2)
        },
        gggg: function() {
            return r(this.weekYear(), 4)
        },
        ggggg: function() {
            return r(this.weekYear(), 5)
        },
        GG: function() {
            return r(this.isoWeekYear() % 100, 2)
        },
        GGGG: function() {
            return r(this.isoWeekYear(), 4)
        },
        GGGGG: function() {
            return r(this.isoWeekYear(), 5)
        },
        e: function() {
            return this.weekday()
        },
        E: function() {
            return this.isoWeekday()
        },
        a: function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), !0)
        },
        A: function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), !1)
        },
        H: function() {
            return this.hours()
        },
        h: function() {
            return this.hours() % 12 || 12
        },
        m: function() {
            return this.minutes()
        },
        s: function() {
            return this.seconds()
        },
        S: function() {
            return C(this.milliseconds() / 100)
        },
        SS: function() {
            return r(C(this.milliseconds() / 10), 2)
        },
        SSS: function() {
            return r(this.milliseconds(), 3)
        },
        SSSS: function() {
            return r(this.milliseconds(), 3)
        },
        Z: function() {
            var a = this.utcOffset()
              , b = "+";
            return 0 > a && (a = -a,
            b = "-"),
            b + r(C(a / 60), 2) + ":" + r(C(a) % 60, 2)
        },
        ZZ: function() {
            var a = this.utcOffset()
              , b = "+";
            return 0 > a && (a = -a,
            b = "-"),
            b + r(C(a / 60), 2) + r(C(a) % 60, 2)
        },
        z: function() {
            return this.zoneAbbr()
        },
        zz: function() {
            return this.zoneName()
        },
        x: function() {
            return this.valueOf()
        },
        X: function() {
            return this.unix()
        },
        Q: function() {
            return this.quarter()
        }
    }, sc = {}, tc = ["months", "monthsShort", "weekdays", "weekdaysShort", "weekdaysMin"], uc = !1; pc.length; )
        xb = pc.pop(),
        rc[xb + "o"] = i(rc[xb], xb);
    for (; qc.length; )
        xb = qc.pop(),
        rc[xb + xb] = h(rc[xb], 2);
    rc.DDDD = h(rc.DDD, 3),
    o(l.prototype, {
        set: function(a) {
            var b, c;
            for (c in a)
                b = a[c],
                "function" == typeof b ? this[c] = b : this["_" + c] = b;
            this._ordinalParseLenient = new RegExp(this._ordinalParse.source + "|" + /\d{1,2}/.source)
        },
        _months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        months: function(a) {
            return this._months[a.month()]
        },
        _monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        monthsShort: function(a) {
            return this._monthsShort[a.month()]
        },
        monthsParse: function(a, b, c) {
            var d, e, f;
            for (this._monthsParse || (this._monthsParse = [],
            this._longMonthsParse = [],
            this._shortMonthsParse = []),
            d = 0; 12 > d; d++) {
                if (e = vb.utc([2e3, d]),
                c && !this._longMonthsParse[d] && (this._longMonthsParse[d] = new RegExp("^" + this.months(e, "").replace(".", "") + "$","i"),
                this._shortMonthsParse[d] = new RegExp("^" + this.monthsShort(e, "").replace(".", "") + "$","i")),
                c || this._monthsParse[d] || (f = "^" + this.months(e, "") + "|^" + this.monthsShort(e, ""),
                this._monthsParse[d] = new RegExp(f.replace(".", ""),"i")),
                c && "MMMM" === b && this._longMonthsParse[d].test(a))
                    return d;
                if (c && "MMM" === b && this._shortMonthsParse[d].test(a))
                    return d;
                if (!c && this._monthsParse[d].test(a))
                    return d
            }
        },
        _weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdays: function(a) {
            return this._weekdays[a.day()]
        },
        _weekdaysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysShort: function(a) {
            return this._weekdaysShort[a.day()]
        },
        _weekdaysMin: "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        weekdaysMin: function(a) {
            return this._weekdaysMin[a.day()]
        },
        weekdaysParse: function(a) {
            var b, c, d;
            for (this._weekdaysParse || (this._weekdaysParse = []),
            b = 0; 7 > b; b++)
                if (this._weekdaysParse[b] || (c = vb([2e3, 1]).day(b),
                d = "^" + this.weekdays(c, "") + "|^" + this.weekdaysShort(c, "") + "|^" + this.weekdaysMin(c, ""),
                this._weekdaysParse[b] = new RegExp(d.replace(".", ""),"i")),
                this._weekdaysParse[b].test(a))
                    return b
        },
        _longDateFormat: {
            LTS: "h:mm:ss A",
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY LT",
            LLLL: "dddd, MMMM D, YYYY LT"
        },
        longDateFormat: function(a) {
            var b = this._longDateFormat[a];
            return !b && this._longDateFormat[a.toUpperCase()] && (b = this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function(a) {
                return a.slice(1)
            }
            ),
            this._longDateFormat[a] = b),
            b
        },
        isPM: function(a) {
            return "p" === (a + "").toLowerCase().charAt(0)
        },
        _meridiemParse: /[ap]\.?m?\.?/i,
        meridiem: function(a, b, c) {
            return a > 11 ? c ? "pm" : "PM" : c ? "am" : "AM"
        },
        _calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L"
        },
        calendar: function(a, b, c) {
            var d = this._calendar[a];
            return "function" == typeof d ? d.apply(b, [c]) : d
        },
        _relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years"
        },
        relativeTime: function(a, b, c, d) {
            var e = this._relativeTime[c];
            return "function" == typeof e ? e(a, b, c, d) : e.replace(/%d/i, a)
        },
        pastFuture: function(a, b) {
            var c = this._relativeTime[a > 0 ? "future" : "past"];
            return "function" == typeof c ? c(b) : c.replace(/%s/i, b)
        },
        ordinal: function(a) {
            return this._ordinal.replace("%d", a)
        },
        _ordinal: "%d",
        _ordinalParse: /\d{1,2}/,
        preparse: function(a) {
            return a
        },
        postformat: function(a) {
            return a
        },
        week: function(a) {
            return jb(a, this._week.dow, this._week.doy).week
        },
        _week: {
            dow: 0,
            doy: 6
        },
        firstDayOfWeek: function() {
            return this._week.dow
        },
        firstDayOfYear: function() {
            return this._week.doy
        },
        _invalidDate: "Invalid date",
        invalidDate: function() {
            return this._invalidDate
        }
    }),
    vb = function(b, c, e, f) {
        var g;
        return "boolean" == typeof e && (f = e,
        e = a),
        g = {},
        g._isAMomentObject = !0,
        g._i = b,
        g._f = c,
        g._l = e,
        g._strict = f,
        g._isUTC = !1,
        g._pf = d(),
        lb(g)
    }
    ,
    vb.suppressDeprecationWarnings = !1,
    vb.createFromInputFallback = f("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.", function(a) {
        a._d = new Date(a._i + (a._useUTC ? " UTC" : ""))
    }
    ),
    vb.min = function() {
        var a = [].slice.call(arguments, 0);
        return mb("isBefore", a)
    }
    ,
    vb.max = function() {
        var a = [].slice.call(arguments, 0);
        return mb("isAfter", a)
    }
    ,
    vb.utc = function(b, c, e, f) {
        var g;
        return "boolean" == typeof e && (f = e,
        e = a),
        g = {},
        g._isAMomentObject = !0,
        g._useUTC = !0,
        g._isUTC = !0,
        g._l = e,
        g._i = b,
        g._f = c,
        g._strict = f,
        g._pf = d(),
        lb(g).utc()
    }
    ,
    vb.unix = function(a) {
        return vb(1e3 * a)
    }
    ,
    vb.duration = function(a, b) {
        var d, e, f, g, h = a, i = null ;
        return vb.isDuration(a) ? h = {
            ms: a._milliseconds,
            d: a._days,
            M: a._months
        } : "number" == typeof a ? (h = {},
        b ? h[b] = a : h.milliseconds = a) : (i = Nb.exec(a)) ? (d = "-" === i[1] ? -1 : 1,
        h = {
            y: 0,
            d: C(i[Eb]) * d,
            h: C(i[Fb]) * d,
            m: C(i[Gb]) * d,
            s: C(i[Hb]) * d,
            ms: C(i[Ib]) * d
        }) : (i = Ob.exec(a)) ? (d = "-" === i[1] ? -1 : 1,
        f = function(a) {
            var b = a && parseFloat(a.replace(",", "."));
            return (isNaN(b) ? 0 : b) * d
        }
        ,
        h = {
            y: f(i[2]),
            M: f(i[3]),
            d: f(i[4]),
            h: f(i[5]),
            m: f(i[6]),
            s: f(i[7]),
            w: f(i[8])
        }) : null  == h ? h = {} : "object" == typeof h && ("from" in h || "to" in h) && (g = t(vb(h.from), vb(h.to)),
        h = {},
        h.ms = g.milliseconds,
        h.M = g.months),
        e = new n(h),
        vb.isDuration(a) && c(a, "_locale") && (e._locale = a._locale),
        e
    }
    ,
    vb.version = yb,
    vb.defaultFormat = gc,
    vb.ISO_8601 = function() {}
    ,
    vb.momentProperties = Kb,
    vb.updateOffset = function() {}
    ,
    vb.relativeTimeThreshold = function(b, c) {
        return oc[b] === a ? !1 : c === a ? oc[b] : (oc[b] = c,
        !0)
    }
    ,
    vb.lang = f("moment.lang is deprecated. Use moment.locale instead.", function(a, b) {
        return vb.locale(a, b)
    }
    ),
    vb.locale = function(a, b) {
        var c;
        return a && (c = "undefined" != typeof b ? vb.defineLocale(a, b) : vb.localeData(a),
        c && (vb.duration._locale = vb._locale = c)),
        vb._locale._abbr
    }
    ,
    vb.defineLocale = function(a, b) {
        return null  !== b ? (b.abbr = a,
        Jb[a] || (Jb[a] = new l),
        Jb[a].set(b),
        vb.locale(a),
        Jb[a]) : (delete Jb[a],
        null )
    }
    ,
    vb.langData = f("moment.langData is deprecated. Use moment.localeData instead.", function(a) {
        return vb.localeData(a)
    }
    ),
    vb.localeData = function(a) {
        var b;
        if (a && a._locale && a._locale._abbr && (a = a._locale._abbr),
        !a)
            return vb._locale;
        if (!w(a)) {
            if (b = L(a))
                return b;
            a = [a]
        }
        return K(a)
    }
    ,
    vb.isMoment = function(a) {
        return a instanceof m || null  != a && c(a, "_isAMomentObject")
    }
    ,
    vb.isDuration = function(a) {
        return a instanceof n
    }
    ;
    for (xb = tc.length - 1; xb >= 0; --xb)
        B(tc[xb]);
    vb.normalizeUnits = function(a) {
        return z(a)
    }
    ,
    vb.invalid = function(a) {
        var b = vb.utc(0 / 0);
        return null  != a ? o(b._pf, a) : b._pf.userInvalidated = !0,
        b
    }
    ,
    vb.parseZone = function() {
        return vb.apply(null , arguments).parseZone()
    }
    ,
    vb.parseTwoDigitYear = function(a) {
        return C(a) + (C(a) > 68 ? 1900 : 2e3)
    }
    ,
    vb.isDate = x,
    o(vb.fn = m.prototype, {
        clone: function() {
            return vb(this)
        },
        valueOf: function() {
            return +this._d - 6e4 * (this._offset || 0)
        },
        unix: function() {
            return Math.floor(+this / 1e3)
        },
        toString: function() {
            return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
        },
        toDate: function() {
            return this._offset ? new Date(+this) : this._d
        },
        toISOString: function() {
            var a = vb(this).utc();
            return 0 < a.year() && a.year() <= 9999 ? "function" == typeof Date.prototype.toISOString ? this.toDate().toISOString() : P(a, "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]") : P(a, "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")
        },
        toArray: function() {
            var a = this;
            return [a.year(), a.month(), a.date(), a.hours(), a.minutes(), a.seconds(), a.milliseconds()]
        },
        isValid: function() {
            return I(this)
        },
        isDSTShifted: function() {
            return this._a ? this.isValid() && y(this._a, (this._isUTC ? vb.utc(this._a) : vb(this._a)).toArray()) > 0 : !1
        },
        parsingFlags: function() {
            return o({}, this._pf)
        },
        invalidAt: function() {
            return this._pf.overflow
        },
        utc: function(a) {
            return this.utcOffset(0, a)
        },
        local: function(a) {
            return this._isUTC && (this.utcOffset(0, a),
            this._isUTC = !1,
            a && this.subtract(this._dateUtcOffset(), "m")),
            this
        },
        format: function(a) {
            var b = P(this, a || vb.defaultFormat);
            return this.localeData().postformat(b)
        },
        add: u(1, "add"),
        subtract: u(-1, "subtract"),
        diff: function(a, b, c) {
            var d, e, f = M(a, this), g = 6e4 * (f.utcOffset() - this.utcOffset());
            return b = z(b),
            "year" === b || "month" === b || "quarter" === b ? (e = j(this, f),
            "quarter" === b ? e /= 3 : "year" === b && (e /= 12)) : (d = this - f,
            e = "second" === b ? d / 1e3 : "minute" === b ? d / 6e4 : "hour" === b ? d / 36e5 : "day" === b ? (d - g) / 864e5 : "week" === b ? (d - g) / 6048e5 : d),
            c ? e : q(e)
        },
        from: function(a, b) {
            return vb.duration({
                to: this,
                from: a
            }).locale(this.locale()).humanize(!b)
        },
        fromNow: function(a) {
            return this.from(vb(), a)
        },
        calendar: function(a) {
            var b = a || vb()
              , c = M(b, this).startOf("day")
              , d = this.diff(c, "days", !0)
              , e = -6 > d ? "sameElse" : -1 > d ? "lastWeek" : 0 > d ? "lastDay" : 1 > d ? "sameDay" : 2 > d ? "nextDay" : 7 > d ? "nextWeek" : "sameElse";
            return this.format(this.localeData().calendar(e, this, vb(b)))
        },
        isLeapYear: function() {
            return G(this.year())
        },
        isDST: function() {
            return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
        },
        day: function(a) {
            var b = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return null  != a ? (a = gb(a, this.localeData()),
            this.add(a - b, "d")) : b
        },
        month: qb("Month", !0),
        startOf: function(a) {
            switch (a = z(a)) {
            case "year":
                this.month(0);
            case "quarter":
            case "month":
                this.date(1);
            case "week":
            case "isoWeek":
            case "day":
                this.hours(0);
            case "hour":
                this.minutes(0);
            case "minute":
                this.seconds(0);
            case "second":
                this.milliseconds(0)
            }
            return "week" === a ? this.weekday(0) : "isoWeek" === a && this.isoWeekday(1),
            "quarter" === a && this.month(3 * Math.floor(this.month() / 3)),
            this
        },
        endOf: function(b) {
            return b = z(b),
            b === a || "millisecond" === b ? this : this.startOf(b).add(1, "isoWeek" === b ? "week" : b).subtract(1, "ms")
        },
        isAfter: function(a, b) {
            var c;
            return b = z("undefined" != typeof b ? b : "millisecond"),
            "millisecond" === b ? (a = vb.isMoment(a) ? a : vb(a),
            +this > +a) : (c = vb.isMoment(a) ? +a : +vb(a),
            c < +this.clone().startOf(b))
        },
        isBefore: function(a, b) {
            var c;
            return b = z("undefined" != typeof b ? b : "millisecond"),
            "millisecond" === b ? (a = vb.isMoment(a) ? a : vb(a),
            +a > +this) : (c = vb.isMoment(a) ? +a : +vb(a),
            +this.clone().endOf(b) < c)
        },
        isBetween: function(a, b, c) {
            return this.isAfter(a, c) && this.isBefore(b, c)
        },
        isSame: function(a, b) {
            var c;
            return b = z(b || "millisecond"),
            "millisecond" === b ? (a = vb.isMoment(a) ? a : vb(a),
            +this === +a) : (c = +vb(a),
            +this.clone().startOf(b) <= c && c <= +this.clone().endOf(b))
        },
        min: f("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548", function(a) {
            return a = vb.apply(null , arguments),
            this > a ? this : a
        }
        ),
        max: f("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548", function(a) {
            return a = vb.apply(null , arguments),
            a > this ? this : a
        }
        ),
        zone: f("moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779", function(a, b) {
            return null  != a ? ("string" != typeof a && (a = -a),
            this.utcOffset(a, b),
            this) : -this.utcOffset()
        }
        ),
        utcOffset: function(a, b) {
            var c, d = this._offset || 0;
            return null  != a ? ("string" == typeof a && (a = S(a)),
            Math.abs(a) < 16 && (a = 60 * a),
            !this._isUTC && b && (c = this._dateUtcOffset()),
            this._offset = a,
            this._isUTC = !0,
            null  != c && this.add(c, "m"),
            d !== a && (!b || this._changeInProgress ? v(this, vb.duration(a - d, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0,
            vb.updateOffset(this, !0),
            this._changeInProgress = null )),
            this) : this._isUTC ? d : this._dateUtcOffset()
        },
        isLocal: function() {
            return !this._isUTC
        },
        isUtcOffset: function() {
            return this._isUTC
        },
        isUtc: function() {
            return this._isUTC && 0 === this._offset
        },
        zoneAbbr: function() {
            return this._isUTC ? "UTC" : ""
        },
        zoneName: function() {
            return this._isUTC ? "Coordinated Universal Time" : ""
        },
        parseZone: function() {
            return this._tzm ? this.utcOffset(this._tzm) : "string" == typeof this._i && this.utcOffset(S(this._i)),
            this
        },
        hasAlignedHourOffset: function(a) {
            return a = a ? vb(a).utcOffset() : 0,
            (this.utcOffset() - a) % 60 === 0
        },
        daysInMonth: function() {
            return D(this.year(), this.month())
        },
        dayOfYear: function(a) {
            var b = Ab((vb(this).startOf("day") - vb(this).startOf("year")) / 864e5) + 1;
            return null  == a ? b : this.add(a - b, "d")
        },
        quarter: function(a) {
            return null  == a ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (a - 1) + this.month() % 3)
        },
        weekYear: function(a) {
            var b = jb(this, this.localeData()._week.dow, this.localeData()._week.doy).year;
            return null  == a ? b : this.add(a - b, "y")
        },
        isoWeekYear: function(a) {
            var b = jb(this, 1, 4).year;
            return null  == a ? b : this.add(a - b, "y")
        },
        week: function(a) {
            var b = this.localeData().week(this);
            return null  == a ? b : this.add(7 * (a - b), "d")
        },
        isoWeek: function(a) {
            var b = jb(this, 1, 4).week;
            return null  == a ? b : this.add(7 * (a - b), "d")
        },
        weekday: function(a) {
            var b = (this.day() + 7 - this.localeData()._week.dow) % 7;
            return null  == a ? b : this.add(a - b, "d")
        },
        isoWeekday: function(a) {
            return null  == a ? this.day() || 7 : this.day(this.day() % 7 ? a : a - 7)
        },
        isoWeeksInYear: function() {
            return E(this.year(), 1, 4)
        },
        weeksInYear: function() {
            var a = this.localeData()._week;
            return E(this.year(), a.dow, a.doy)
        },
        get: function(a) {
            return a = z(a),
            this[a]()
        },
        set: function(a, b) {
            var c;
            if ("object" == typeof a)
                for (c in a)
                    this.set(c, a[c]);
            else
                a = z(a),
                "function" == typeof this[a] && this[a](b);
            return this
        },
        locale: function(b) {
            var c;
            return b === a ? this._locale._abbr : (c = vb.localeData(b),
            null  != c && (this._locale = c),
            this)
        },
        lang: f("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(b) {
            return b === a ? this.localeData() : this.locale(b)
        }
        ),
        localeData: function() {
            return this._locale
        },
        _dateUtcOffset: function() {
            return 15 * -Math.round(this._d.getTimezoneOffset() / 15)
        }
    }),
    vb.fn.millisecond = vb.fn.milliseconds = qb("Milliseconds", !1),
    vb.fn.second = vb.fn.seconds = qb("Seconds", !1),
    vb.fn.minute = vb.fn.minutes = qb("Minutes", !1),
    vb.fn.hour = vb.fn.hours = qb("Hours", !0),
    vb.fn.date = qb("Date", !0),
    vb.fn.dates = f("dates accessor is deprecated. Use date instead.", qb("Date", !0)),
    vb.fn.year = qb("FullYear", !0),
    vb.fn.years = f("years accessor is deprecated. Use year instead.", qb("FullYear", !0)),
    vb.fn.days = vb.fn.day,
    vb.fn.months = vb.fn.month,
    vb.fn.weeks = vb.fn.week,
    vb.fn.isoWeeks = vb.fn.isoWeek,
    vb.fn.quarters = vb.fn.quarter,
    vb.fn.toJSON = vb.fn.toISOString,
    vb.fn.isUTC = vb.fn.isUtc,
    o(vb.duration.fn = n.prototype, {
        _bubble: function() {
            var a, b, c, d = this._milliseconds, e = this._days, f = this._months, g = this._data, h = 0;
            g.milliseconds = d % 1e3,
            a = q(d / 1e3),
            g.seconds = a % 60,
            b = q(a / 60),
            g.minutes = b % 60,
            c = q(b / 60),
            g.hours = c % 24,
            e += q(c / 24),
            h = q(rb(e)),
            e -= q(sb(h)),
            f += q(e / 30),
            e %= 30,
            h += q(f / 12),
            f %= 12,
            g.days = e,
            g.months = f,
            g.years = h
        },
        abs: function() {
            return this._milliseconds = Math.abs(this._milliseconds),
            this._days = Math.abs(this._days),
            this._months = Math.abs(this._months),
            this._data.milliseconds = Math.abs(this._data.milliseconds),
            this._data.seconds = Math.abs(this._data.seconds),
            this._data.minutes = Math.abs(this._data.minutes),
            this._data.hours = Math.abs(this._data.hours),
            this._data.months = Math.abs(this._data.months),
            this._data.years = Math.abs(this._data.years),
            this
        },
        weeks: function() {
            return q(this.days() / 7)
        },
        valueOf: function() {
            return this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * C(this._months / 12)
        },
        humanize: function(a) {
            var b = ib(this, !a, this.localeData());
            return a && (b = this.localeData().pastFuture(+this, b)),
            this.localeData().postformat(b)
        },
        add: function(a, b) {
            var c = vb.duration(a, b);
            return this._milliseconds += c._milliseconds,
            this._days += c._days,
            this._months += c._months,
            this._bubble(),
            this
        },
        subtract: function(a, b) {
            var c = vb.duration(a, b);
            return this._milliseconds -= c._milliseconds,
            this._days -= c._days,
            this._months -= c._months,
            this._bubble(),
            this
        },
        get: function(a) {
            return a = z(a),
            this[a.toLowerCase() + "s"]()
        },
        as: function(a) {
            var b, c;
            if (a = z(a),
            "month" === a || "year" === a)
                return b = this._days + this._milliseconds / 864e5,
                c = this._months + 12 * rb(b),
                "month" === a ? c : c / 12;
            switch (b = this._days + Math.round(sb(this._months / 12)),
            a) {
            case "week":
                return b / 7 + this._milliseconds / 6048e5;
            case "day":
                return b + this._milliseconds / 864e5;
            case "hour":
                return 24 * b + this._milliseconds / 36e5;
            case "minute":
                return 24 * b * 60 + this._milliseconds / 6e4;
            case "second":
                return 24 * b * 60 * 60 + this._milliseconds / 1e3;
            case "millisecond":
                return Math.floor(24 * b * 60 * 60 * 1e3) + this._milliseconds;
            default:
                throw new Error("Unknown unit " + a)
            }
        },
        lang: vb.fn.lang,
        locale: vb.fn.locale,
        toIsoString: f("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", function() {
            return this.toISOString()
        }
        ),
        toISOString: function() {
            var a = Math.abs(this.years())
              , b = Math.abs(this.months())
              , c = Math.abs(this.days())
              , d = Math.abs(this.hours())
              , e = Math.abs(this.minutes())
              , f = Math.abs(this.seconds() + this.milliseconds() / 1e3);
            return this.asSeconds() ? (this.asSeconds() < 0 ? "-" : "") + "P" + (a ? a + "Y" : "") + (b ? b + "M" : "") + (c ? c + "D" : "") + (d || e || f ? "T" : "") + (d ? d + "H" : "") + (e ? e + "M" : "") + (f ? f + "S" : "") : "P0D"
        },
        localeData: function() {
            return this._locale
        },
        toJSON: function() {
            return this.toISOString()
        }
    }),
    vb.duration.fn.toString = vb.duration.fn.toISOString;
    for (xb in kc)
        c(kc, xb) && tb(xb.toLowerCase());
    vb.duration.fn.asMilliseconds = function() {
        return this.as("ms")
    }
    ,
    vb.duration.fn.asSeconds = function() {
        return this.as("s")
    }
    ,
    vb.duration.fn.asMinutes = function() {
        return this.as("m")
    }
    ,
    vb.duration.fn.asHours = function() {
        return this.as("h")
    }
    ,
    vb.duration.fn.asDays = function() {
        return this.as("d")
    }
    ,
    vb.duration.fn.asWeeks = function() {
        return this.as("weeks")
    }
    ,
    vb.duration.fn.asMonths = function() {
        return this.as("M")
    }
    ,
    vb.duration.fn.asYears = function() {
        return this.as("y")
    }
    ,
    vb.locale("en", {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(a) {
            var b = a % 10
              , c = 1 === C(a % 100 / 10) ? "th" : 1 === b ? "st" : 2 === b ? "nd" : 3 === b ? "rd" : "th";
            return a + c
        }
    }),
    Lb ? module.exports = vb : "function" == typeof define && define.amd ? (define(function(a, b, c) {
        return c.config && c.config() && c.config().noGlobal === !0 && (zb.moment = wb),
        vb
    }
    ),
    ub(!0)) : ub()
}
.call(this),
function(a, b) {
    "function" == typeof define && define.amd ? define([], function() {
        return b()
    }
    ) : "object" == typeof exports ? module.exports = b() : b()
}
(this, function() {
    function a(a) {
        "use strict";
        var b = a.storageKey()
          , c = a.storage()
          , d = function() {
            var d = a.preferredLanguage();
            angular.isString(d) ? a.use(d) : c.put(b, a.use())
        }
        ;
        d.displayName = "fallbackFromIncorrectStorageValue",
        c ? c.get(b) ? a.use(c.get(b))["catch"](d) : d() : angular.isString(a.preferredLanguage()) && a.use(a.preferredLanguage())
    }
    function b() {
        "use strict";
        var a, b, c = null , d = !1, e = !1;
        b = {
            sanitize: function(a, b) {
                return "text" === b && (a = g(a)),
                a
            },
            escape: function(a, b) {
                return "text" === b && (a = f(a)),
                a
            },
            sanitizeParameters: function(a, b) {
                return "params" === b && (a = h(a, g)),
                a
            },
            escapeParameters: function(a, b) {
                return "params" === b && (a = h(a, f)),
                a
            }
        },
        b.escaped = b.escapeParameters,
        this.addStrategy = function(a, c) {
            return b[a] = c,
            this
        }
        ,
        this.removeStrategy = function(a) {
            return delete b[a],
            this
        }
        ,
        this.useStrategy = function(a) {
            return d = !0,
            c = a,
            this
        }
        ,
        this.$get = ["$injector", "$log", function(f, g) {
            var h = function(a, c, d) {
                return angular.forEach(d, function(d) {
                    if (angular.isFunction(d))
                        a = d(a, c);
                    else {
                        if (!angular.isFunction(b[d]))
                            throw new Error("pascalprecht.translate.$translateSanitization: Unknown sanitization strategy: '" + d + "'");
                        a = b[d](a, c)
                    }
                }
                ),
                a
            }
              , i = function() {
                d || e || (g.warn("pascalprecht.translate.$translateSanitization: No sanitization strategy has been configured. This can have serious security implications. See http://angular-translate.github.io/docs/#/guide/19_security for details."),
                e = !0)
            }
            ;
            return f.has("$sanitize") && (a = f.get("$sanitize")),
            {
                useStrategy: function(a) {
                    return function(b) {
                        a.useStrategy(b)
                    }
                }
                (this),
                sanitize: function(a, b, d) {
                    if (c || i(),
                    arguments.length < 3 && (d = c),
                    !d)
                        return a;
                    var e = angular.isArray(d) ? d : [d];
                    return h(a, b, e)
                }
            }
        }
        ];
        var f = function(a) {
            var b = angular.element("<div></div>");
            return b.text(a),
            b.html()
        }
          , g = function(b) {
            if (!a)
                throw new Error("pascalprecht.translate.$translateSanitization: Error cannot find $sanitize service. Either include the ngSanitize module (https://docs.angularjs.org/api/ngSanitize) or use a sanitization strategy which does not depend on $sanitize, such as 'escape'.");
            return a(b)
        }
          , h = function(a, b) {
            if (angular.isObject(a)) {
                var c = angular.isArray(a) ? [] : {};
                return angular.forEach(a, function(a, d) {
                    c[d] = h(a, b)
                }
                ),
                c
            }
            return angular.isNumber(a) ? a : b(a)
        }
    }
    function c(a, b, c, d) {
        "use strict";
        var e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t = {}, u = [], v = a, w = [], x = "translate-cloak", y = !1, z = !1, A = ".", B = 0, C = !0, D = "default", E = {
            "default": function(a) {
                return (a || "").split("-").join("_")
            },
            java: function(a) {
                var b = (a || "").split("-").join("_")
                  , c = b.split("_");
                return c.length > 1 ? c[0].toLowerCase() + "_" + c[1].toUpperCase() : b
            },
            bcp47: function(a) {
                var b = (a || "").split("_").join("-")
                  , c = b.split("-");
                return c.length > 1 ? c[0].toLowerCase() + "-" + c[1].toUpperCase() : b
            }
        }, F = "2.7.2", G = function() {
            if (angular.isFunction(d.getLocale))
                return d.getLocale();
            var a, c, e = b.$get().navigator, f = ["language", "browserLanguage", "systemLanguage", "userLanguage"];
            if (angular.isArray(e.languages))
                for (a = 0; a < e.languages.length; a++)
                    if (c = e.languages[a],
                    c && c.length)
                        return c;
            for (a = 0; a < f.length; a++)
                if (c = e[f[a]],
                c && c.length)
                    return c;
            return null
        }
        ;
        G.displayName = "angular-translate/service: getFirstBrowserLanguage";
        var H = function() {
            var a = G() || "";
            return E[D] && (a = E[D](a)),
            a
        }
        ;
        H.displayName = "angular-translate/service: getLocale";
        var I = function(a, b) {
            for (var c = 0, d = a.length; d > c; c++)
                if (a[c] === b)
                    return c;
            return -1
        }
          , J = function() {
            return this.toString().replace(/^\s+|\s+$/g, "")
        }
          , K = function(a) {
            for (var b = [], c = angular.lowercase(a), d = 0, e = u.length; e > d; d++)
                b.push(angular.lowercase(u[d]));
            if (I(b, c) > -1)
                return a;
            if (f) {
                var g;
                for (var h in f) {
                    var i = !1
                      , j = Object.prototype.hasOwnProperty.call(f, h) && angular.lowercase(h) === angular.lowercase(a);
                    if ("*" === h.slice(-1) && (i = h.slice(0, -1) === a.slice(0, h.length - 1)),
                    (j || i) && (g = f[h],
                    I(b, angular.lowercase(g)) > -1))
                        return g
                }
            }
            if (a) {
                var k = a.split("_");
                if (k.length > 1 && I(b, angular.lowercase(k[0])) > -1)
                    return k[0]
            }
            return a
        }
          , L = function(a, b) {
            if (!a && !b)
                return t;
            if (a && !b) {
                if (angular.isString(a))
                    return t[a]
            } else
                angular.isObject(t[a]) || (t[a] = {}),
                angular.extend(t[a], M(b));
            return this
        }
        ;
        this.translations = L,
        this.cloakClassName = function(a) {
            return a ? (x = a,
            this) : x
        }
        ;
        var M = function(a, b, c, d) {
            var e, f, g, h;
            b || (b = []),
            c || (c = {});
            for (e in a)
                Object.prototype.hasOwnProperty.call(a, e) && (h = a[e],
                angular.isObject(h) ? M(h, b.concat(e), c, e) : (f = b.length ? "" + b.join(A) + A + e : e,
                b.length && e === d && (g = "" + b.join(A),
                c[g] = "@:" + f),
                c[f] = h));
            return c
        }
        ;
        M.displayName = "flatObject",
        this.addInterpolation = function(a) {
            return w.push(a),
            this
        }
        ,
        this.useMessageFormatInterpolation = function() {
            return this.useInterpolation("$translateMessageFormatInterpolation")
        }
        ,
        this.useInterpolation = function(a) {
            return n = a,
            this
        }
        ,
        this.useSanitizeValueStrategy = function(a) {
            return c.useStrategy(a),
            this
        }
        ,
        this.preferredLanguage = function(a) {
            return N(a),
            this
        }
        ;
        var N = function(a) {
            return a && (e = a),
            e
        }
        ;
        this.translationNotFoundIndicator = function(a) {
            return this.translationNotFoundIndicatorLeft(a),
            this.translationNotFoundIndicatorRight(a),
            this
        }
        ,
        this.translationNotFoundIndicatorLeft = function(a) {
            return a ? (q = a,
            this) : q
        }
        ,
        this.translationNotFoundIndicatorRight = function(a) {
            return a ? (r = a,
            this) : r
        }
        ,
        this.fallbackLanguage = function(a) {
            return O(a),
            this
        }
        ;
        var O = function(a) {
            return a ? (angular.isString(a) ? (h = !0,
            g = [a]) : angular.isArray(a) && (h = !1,
            g = a),
            angular.isString(e) && I(g, e) < 0 && g.push(e),
            this) : h ? g[0] : g
        }
        ;
        this.use = function(a) {
            if (a) {
                if (!t[a] && !o)
                    throw new Error("$translateProvider couldn't find translationTable for langKey: '" + a + "'");
                return i = a,
                this
            }
            return i
        }
        ;
        var P = function(a) {
            return a ? (v = a,
            this) : l ? l + v : v
        }
        ;
        this.storageKey = P,
        this.useUrlLoader = function(a, b) {
            return this.useLoader("$translateUrlLoader", angular.extend({
                url: a
            }, b))
        }
        ,
        this.useStaticFilesLoader = function(a) {
            return this.useLoader("$translateStaticFilesLoader", a)
        }
        ,
        this.useLoader = function(a, b) {
            return o = a,
            p = b || {},
            this
        }
        ,
        this.useLocalStorage = function() {
            return this.useStorage("$translateLocalStorage")
        }
        ,
        this.useCookieStorage = function() {
            return this.useStorage("$translateCookieStorage")
        }
        ,
        this.useStorage = function(a) {
            return k = a,
            this
        }
        ,
        this.storagePrefix = function(a) {
            return a ? (l = a,
            this) : a
        }
        ,
        this.useMissingTranslationHandlerLog = function() {
            return this.useMissingTranslationHandler("$translateMissingTranslationHandlerLog")
        }
        ,
        this.useMissingTranslationHandler = function(a) {
            return m = a,
            this
        }
        ,
        this.usePostCompiling = function(a) {
            return y = !!a,
            this
        }
        ,
        this.forceAsyncReload = function(a) {
            return z = !!a,
            this
        }
        ,
        this.uniformLanguageTag = function(a) {
            return a ? angular.isString(a) && (a = {
                standard: a
            }) : a = {},
            D = a.standard,
            this
        }
        ,
        this.determinePreferredLanguage = function(a) {
            var b = a && angular.isFunction(a) ? a() : H();
            return e = u.length ? K(b) : b,
            this
        }
        ,
        this.registerAvailableLanguageKeys = function(a, b) {
            return a ? (u = a,
            b && (f = b),
            this) : u
        }
        ,
        this.useLoaderCache = function(a) {
            return a === !1 ? s = void 0 : a === !0 ? s = !0 : "undefined" == typeof a ? s = "$translationCache" : a && (s = a),
            this
        }
        ,
        this.directivePriority = function(a) {
            return void 0 === a ? B : (B = a,
            this)
        }
        ,
        this.statefulFilter = function(a) {
            return void 0 === a ? C : (C = a,
            this)
        }
        ,
        this.$get = ["$log", "$injector", "$rootScope", "$q", function(a, b, c, d) {
            var f, l, u, A = b.get(n || "$translateDefaultInterpolation"), D = !1, E = {}, G = {}, H = function(a, b, c, h) {
                if (angular.isArray(a)) {
                    var j = function(a) {
                        for (var e = {}, f = [], g = function(a) {
                            var f = d.defer()
                              , g = function(b) {
                                e[a] = b,
                                f.resolve([a, b])
                            }
                            ;
                            return H(a, b, c, h).then(g, g),
                            f.promise
                        }
                        , i = 0, j = a.length; j > i; i++)
                            f.push(g(a[i]));
                        return d.all(f).then(function() {
                            return e
                        }
                        )
                    }
                    ;
                    return j(a)
                }
                var m = d.defer();
                a && (a = J.apply(a));
                var n = function() {
                    var a = e ? G[e] : G[i];
                    if (l = 0,
                    k && !a) {
                        var b = f.get(v);
                        if (a = G[b],
                        g && g.length) {
                            var c = I(g, b);
                            l = 0 === c ? 1 : 0,
                            I(g, e) < 0 && g.push(e)
                        }
                    }
                    return a
                }
                ();
                if (n) {
                    var o = function() {
                        ab(a, b, c, h).then(m.resolve, m.reject)
                    }
                    ;
                    o.displayName = "promiseResolved",
                    n["finally"](o, m.reject)
                } else
                    ab(a, b, c, h).then(m.resolve, m.reject);
                return m.promise
            }
            , Q = function(a) {
                return q && (a = [q, a].join(" ")),
                r && (a = [a, r].join(" ")),
                a
            }
            , R = function(a) {
                i = a,
                c.$emit("$translateChangeSuccess", {
                    language: a
                }),
                k && f.put(H.storageKey(), i),
                A.setLocale(i);
                var b = function(a, b) {
                    E[b].setLocale(i)
                }
                ;
                b.displayName = "eachInterpolatorLocaleSetter",
                angular.forEach(E, b),
                c.$emit("$translateChangeEnd", {
                    language: a
                })
            }
            , S = function(a) {
                if (!a)
                    throw "No language key specified for loading.";
                var e = d.defer();
                c.$emit("$translateLoadingStart", {
                    language: a
                }),
                D = !0;
                var f = s;
                "string" == typeof f && (f = b.get(f));
                var g = angular.extend({}, p, {
                    key: a,
                    $http: angular.extend({}, {
                        cache: f
                    }, p.$http)
                })
                  , h = function(b) {
                    var d = {};
                    c.$emit("$translateLoadingSuccess", {
                        language: a
                    }),
                    angular.isArray(b) ? angular.forEach(b, function(a) {
                        angular.extend(d, M(a))
                    }
                    ) : angular.extend(d, M(b)),
                    D = !1,
                    e.resolve({
                        key: a,
                        table: d
                    }),
                    c.$emit("$translateLoadingEnd", {
                        language: a
                    })
                }
                ;
                h.displayName = "onLoaderSuccess";
                var i = function(a) {
                    c.$emit("$translateLoadingError", {
                        language: a
                    }),
                    e.reject(a),
                    c.$emit("$translateLoadingEnd", {
                        language: a
                    })
                }
                ;
                return i.displayName = "onLoaderError",
                b.get(o)(g).then(h, i),
                e.promise
            }
            ;
            if (k && (f = b.get(k),
            !f.get || !f.put))
                throw new Error("Couldn't use storage '" + k + "', missing get() or put() method!");
            if (w.length) {
                var T = function(a) {
                    var c = b.get(a);
                    c.setLocale(e || i),
                    E[c.getInterpolationIdentifier()] = c
                }
                ;
                T.displayName = "interpolationFactoryAdder",
                angular.forEach(w, T)
            }
            var U = function(a) {
                var b = d.defer();
                if (Object.prototype.hasOwnProperty.call(t, a))
                    b.resolve(t[a]);
                else if (G[a]) {
                    var c = function(a) {
                        L(a.key, a.table),
                        b.resolve(a.table)
                    }
                    ;
                    c.displayName = "translationTableResolver",
                    G[a].then(c, b.reject)
                } else
                    b.reject();
                return b.promise
            }
              , V = function(a, b, c, e) {
                var f = d.defer()
                  , g = function(d) {
                    if (Object.prototype.hasOwnProperty.call(d, b)) {
                        e.setLocale(a);
                        var g = d[b];
                        "@:" === g.substr(0, 2) ? V(a, g.substr(2), c, e).then(f.resolve, f.reject) : f.resolve(e.interpolate(d[b], c)),
                        e.setLocale(i)
                    } else
                        f.reject()
                }
                ;
                return g.displayName = "fallbackTranslationResolver",
                U(a).then(g, f.reject),
                f.promise
            }
              , W = function(a, b, c, d) {
                var e, f = t[a];
                if (f && Object.prototype.hasOwnProperty.call(f, b)) {
                    if (d.setLocale(a),
                    e = d.interpolate(f[b], c),
                    "@:" === e.substr(0, 2))
                        return W(a, e.substr(2), c, d);
                    d.setLocale(i)
                }
                return e
            }
              , X = function(a, c) {
                if (m) {
                    var d = b.get(m)(a, i, c);
                    return void 0 !== d ? d : a
                }
                return a
            }
              , Y = function(a, b, c, e, f) {
                var h = d.defer();
                if (a < g.length) {
                    var i = g[a];
                    V(i, b, c, e).then(h.resolve, function() {
                        Y(a + 1, b, c, e, f).then(h.resolve)
                    }
                    )
                } else
                    h.resolve(f ? f : X(b, c));
                return h.promise
            }
              , Z = function(a, b, c, d) {
                var e;
                if (a < g.length) {
                    var f = g[a];
                    e = W(f, b, c, d),
                    e || (e = Z(a + 1, b, c, d))
                }
                return e
            }
              , $ = function(a, b, c, d) {
                return Y(u > 0 ? u : l, a, b, c, d)
            }
              , _ = function(a, b, c) {
                return Z(u > 0 ? u : l, a, b, c)
            }
              , ab = function(a, b, c, e) {
                var f = d.defer()
                  , h = i ? t[i] : t
                  , j = c ? E[c] : A;
                if (h && Object.prototype.hasOwnProperty.call(h, a)) {
                    var k = h[a];
                    "@:" === k.substr(0, 2) ? H(k.substr(2), b, c, e).then(f.resolve, f.reject) : f.resolve(j.interpolate(k, b))
                } else {
                    var l;
                    m && !D && (l = X(a, b)),
                    i && g && g.length ? $(a, b, j, e).then(function(a) {
                        f.resolve(a)
                    }
                    , function(a) {
                        f.reject(Q(a))
                    }
                    ) : m && !D && l ? f.resolve(e ? e : l) : e ? f.resolve(e) : f.reject(Q(a))
                }
                return f.promise
            }
              , bb = function(a, b, c) {
                var d, e = i ? t[i] : t, f = A;
                if (E && Object.prototype.hasOwnProperty.call(E, c) && (f = E[c]),
                e && Object.prototype.hasOwnProperty.call(e, a)) {
                    var h = e[a];
                    d = "@:" === h.substr(0, 2) ? bb(h.substr(2), b, c) : f.interpolate(h, b)
                } else {
                    var j;
                    m && !D && (j = X(a, b)),
                    i && g && g.length ? (l = 0,
                    d = _(a, b, f)) : d = m && !D && j ? j : Q(a)
                }
                return d
            }
              , cb = function(a) {
                j === a && (j = void 0),
                G[a] = void 0
            }
            ;
            if (H.preferredLanguage = function(a) {
                return a && N(a),
                e
            }
            ,
            H.cloakClassName = function() {
                return x
            }
            ,
            H.fallbackLanguage = function(a) {
                if (void 0 !== a && null  !== a) {
                    if (O(a),
                    o && g && g.length)
                        for (var b = 0, c = g.length; c > b; b++)
                            G[g[b]] || (G[g[b]] = S(g[b]));
                    H.use(H.use())
                }
                return h ? g[0] : g
            }
            ,
            H.useFallbackLanguage = function(a) {
                if (void 0 !== a && null  !== a)
                    if (a) {
                        var b = I(g, a);
                        b > -1 && (u = b)
                    } else
                        u = 0
            }
            ,
            H.proposedLanguage = function() {
                return j
            }
            ,
            H.storage = function() {
                return f
            }
            ,
            H.use = function(a) {
                if (!a)
                    return i;
                var b = d.defer();
                c.$emit("$translateChangeStart", {
                    language: a
                });
                var e = K(a);
                return e && (a = e),
                !z && t[a] || !o || G[a] ? j === a && G[a] ? G[a].then(function(a) {
                    return b.resolve(a.key),
                    a
                }
                , function(a) {
                    return b.reject(a),
                    d.reject(a)
                }
                ) : (b.resolve(a),
                R(a)) : (j = a,
                G[a] = S(a).then(function(a) {
                    return L(a.key, a.table),
                    b.resolve(a.key),
                    R(a.key),
                    a
                }
                , function(a) {
                    return c.$emit("$translateChangeError", {
                        language: a
                    }),
                    b.reject(a),
                    c.$emit("$translateChangeEnd", {
                        language: a
                    }),
                    d.reject(a)
                }
                ),
                G[a]["finally"](function() {
                    cb(a)
                }
                )),
                b.promise
            }
            ,
            H.storageKey = function() {
                return P()
            }
            ,
            H.isPostCompilingEnabled = function() {
                return y
            }
            ,
            H.isForceAsyncReloadEnabled = function() {
                return z
            }
            ,
            H.refresh = function(a) {
                function b() {
                    f.resolve(),
                    c.$emit("$translateRefreshEnd", {
                        language: a
                    })
                }
                function e() {
                    f.reject(),
                    c.$emit("$translateRefreshEnd", {
                        language: a
                    })
                }
                if (!o)
                    throw new Error("Couldn't refresh translation table, no loader registered!");
                var f = d.defer();
                if (c.$emit("$translateRefreshStart", {
                    language: a
                }),
                a)
                    if (t[a]) {
                        var h = function(c) {
                            L(c.key, c.table),
                            a === i && R(i),
                            b()
                        }
                        ;
                        h.displayName = "refreshPostProcessor",
                        S(a).then(h, e)
                    } else
                        e();
                else {
                    var j = []
                      , k = {};
                    if (g && g.length)
                        for (var l = 0, m = g.length; m > l; l++)
                            j.push(S(g[l])),
                            k[g[l]] = !0;
                    i && !k[i] && j.push(S(i));
                    var n = function(a) {
                        t = {},
                        angular.forEach(a, function(a) {
                            L(a.key, a.table)
                        }
                        ),
                        i && R(i),
                        b()
                    }
                    ;
                    n.displayName = "refreshPostProcessor",
                    d.all(j).then(n, e)
                }
                return f.promise
            }
            ,
            H.instant = function(a, b, c) {
                if (null  === a || angular.isUndefined(a))
                    return a;
                if (angular.isArray(a)) {
                    for (var d = {}, f = 0, h = a.length; h > f; f++)
                        d[a[f]] = H.instant(a[f], b, c);
                    return d
                }
                if (angular.isString(a) && a.length < 1)
                    return a;
                a && (a = J.apply(a));
                var j, k = [];
                e && k.push(e),
                i && k.push(i),
                g && g.length && (k = k.concat(g));
                for (var l = 0, n = k.length; n > l; l++) {
                    var o = k[l];
                    if (t[o] && ("undefined" != typeof t[o][a] ? j = bb(a, b, c) : (q || r) && (j = Q(a))),
                    "undefined" != typeof j)
                        break
                }
                return j || "" === j || (j = A.interpolate(a, b),
                m && !D && (j = X(a, b))),
                j
            }
            ,
            H.versionInfo = function() {
                return F
            }
            ,
            H.loaderCache = function() {
                return s
            }
            ,
            H.directivePriority = function() {
                return B
            }
            ,
            H.statefulFilter = function() {
                return C
            }
            ,
            o && (angular.equals(t, {}) && H.use(H.use()),
            g && g.length))
                for (var db = function(a) {
                    return L(a.key, a.table),
                    c.$emit("$translateChangeEnd", {
                        language: a.key
                    }),
                    a
                }
                , eb = 0, fb = g.length; fb > eb; eb++) {
                    var gb = g[eb];
                    (z || !t[gb]) && (G[gb] = S(gb).then(db))
                }
            return H
        }
        ]
    }
    function d(a, b) {
        "use strict";
        var c, d = {}, e = "default";
        return d.setLocale = function(a) {
            c = a
        }
        ,
        d.getInterpolationIdentifier = function() {
            return e
        }
        ,
        d.useSanitizeValueStrategy = function(a) {
            return b.useStrategy(a),
            this
        }
        ,
        d.interpolate = function(c, d) {
            d = d || {},
            d = b.sanitize(d, "params");
            var e = a(c)(d);
            return e = b.sanitize(e, "text")
        }
        ,
        d
    }
    function e(a, b, c, d, e, f) {
        "use strict";
        var g = function() {
            return this.toString().replace(/^\s+|\s+$/g, "")
        }
        ;
        return {
            restrict: "AE",
            scope: !0,
            priority: a.directivePriority(),
            compile: function(b, h) {
                var i = h.translateValues ? h.translateValues : void 0
                  , j = h.translateInterpolation ? h.translateInterpolation : void 0
                  , k = b[0].outerHTML.match(/translate-value-+/i)
                  , l = "^(.*)(" + c.startSymbol() + ".*" + c.endSymbol() + ")(.*)"
                  , m = "^(.*)" + c.startSymbol() + "(.*)" + c.endSymbol() + "(.*)";
                return function(b, n, o) {
                    b.interpolateParams = {},
                    b.preText = "",
                    b.postText = "";
                    var p = {}
                      , q = function(a, c, d) {
                        if (c.translateValues && angular.extend(a, e(c.translateValues)(b.$parent)),
                        k)
                            for (var f in d)
                                if (Object.prototype.hasOwnProperty.call(c, f) && "translateValue" === f.substr(0, 14) && "translateValues" !== f) {
                                    var g = angular.lowercase(f.substr(14, 1)) + f.substr(15);
                                    a[g] = d[f]
                                }
                    }
                      , r = function(a) {
                        if (angular.isFunction(r._unwatchOld) && (r._unwatchOld(),
                        r._unwatchOld = void 0),
                        angular.equals(a, "") || !angular.isDefined(a)) {
                            var d = g.apply(n.text()).match(l);
                            if (angular.isArray(d)) {
                                b.preText = d[1],
                                b.postText = d[3],
                                p.translate = c(d[2])(b.$parent);
                                var e = n.text().match(m);
                                angular.isArray(e) && e[2] && e[2].length && (r._unwatchOld = b.$watch(e[2], function(a) {
                                    p.translate = a,
                                    x()
                                }
                                ))
                            } else
                                p.translate = n.text().replace(/^\s+|\s+$/g, "")
                        } else
                            p.translate = a;
                        x()
                    }
                      , s = function(a) {
                        o.$observe(a, function(b) {
                            p[a] = b,
                            x()
                        }
                        )
                    }
                    ;
                    q(b.interpolateParams, o, h);
                    var t = !0;
                    o.$observe("translate", function(a) {
                        "undefined" == typeof a ? r("") : "" === a && t || (p.translate = a,
                        x()),
                        t = !1
                    }
                    );
                    for (var u in o)
                        o.hasOwnProperty(u) && "translateAttr" === u.substr(0, 13) && s(u);
                    if (o.$observe("translateDefault", function(a) {
                        b.defaultText = a
                    }
                    ),
                    i && o.$observe("translateValues", function(a) {
                        a && b.$parent.$watch(function() {
                            angular.extend(b.interpolateParams, e(a)(b.$parent))
                        }
                        )
                    }
                    ),
                    k) {
                        var v = function(a) {
                            o.$observe(a, function(c) {
                                var d = angular.lowercase(a.substr(14, 1)) + a.substr(15);
                                b.interpolateParams[d] = c
                            }
                            )
                        }
                        ;
                        for (var w in o)
                            Object.prototype.hasOwnProperty.call(o, w) && "translateValue" === w.substr(0, 14) && "translateValues" !== w && v(w)
                    }
                    var x = function() {
                        for (var a in p)
                            p.hasOwnProperty(a) && void 0 !== p[a] && y(a, p[a], b, b.interpolateParams, b.defaultText)
                    }
                      , y = function(b, c, d, e, f) {
                        c ? a(c, e, j, f).then(function(a) {
                            z(a, d, !0, b)
                        }
                        , function(a) {
                            z(a, d, !1, b)
                        }
                        ) : z(c, d, !1, b)
                    }
                      , z = function(b, c, e, f) {
                        if ("translate" === f) {
                            e || "undefined" == typeof c.defaultText || (b = c.defaultText),
                            n.html(c.preText + b + c.postText);
                            var g = a.isPostCompilingEnabled()
                              , i = "undefined" != typeof h.translateCompile
                              , j = i && "false" !== h.translateCompile;
                            (g && !i || j) && d(n.contents())(c)
                        } else {
                            e || "undefined" == typeof c.defaultText || (b = c.defaultText);
                            var k = o.$attr[f];
                            "data-" === k.substr(0, 5) && (k = k.substr(5)),
                            k = k.substr(15),
                            n.attr(k, b)
                        }
                    }
                    ;
                    (i || k || o.translateDefault) && b.$watch("interpolateParams", x, !0);
                    var A = f.$on("$translateChangeSuccess", x);
                    n.text().length ? r(o.translate ? o.translate : "") : o.translate && r(o.translate),
                    x(),
                    b.$on("$destroy", A)
                }
            }
        }
    }
    function f(a, b) {
        "use strict";
        return {
            compile: function(c) {
                var d = function() {
                    c.addClass(b.cloakClassName())
                }
                  , e = function() {
                    c.removeClass(b.cloakClassName())
                }
                  , f = a.$on("$translateChangeEnd", function() {
                    e(),
                    f(),
                    f = null
                }
                );
                return d(),
                function(a, c, f) {
                    f.translateCloak && f.translateCloak.length && f.$observe("translateCloak", function(a) {
                        b(a).then(e, d)
                    }
                    )
                }
            }
        }
    }
    function g(a, b) {
        "use strict";
        var c = function(c, d, e) {
            return angular.isObject(d) || (d = a(d)(this)),
            b.instant(c, d, e)
        }
        ;
        return b.statefulFilter() && (c.$stateful = !0),
        c
    }
    function h(a) {
        "use strict";
        return a("translations")
    }
    return angular.module("pascalprecht.translate", ["ng"]).run(a),
    a.$inject = ["$translate"],
    a.displayName = "runTranslate",
    angular.module("pascalprecht.translate").provider("$translateSanitization", b),
    angular.module("pascalprecht.translate").constant("pascalprechtTranslateOverrider", {}).provider("$translate", c),
    c.$inject = ["$STORAGE_KEY", "$windowProvider", "$translateSanitizationProvider", "pascalprechtTranslateOverrider"],
    c.displayName = "displayName",
    angular.module("pascalprecht.translate").factory("$translateDefaultInterpolation", d),
    d.$inject = ["$interpolate", "$translateSanitization"],
    d.displayName = "$translateDefaultInterpolation",
    angular.module("pascalprecht.translate").constant("$STORAGE_KEY", "NG_TRANSLATE_LANG_KEY"),
    angular.module("pascalprecht.translate").directive("translate", e),
    e.$inject = ["$translate", "$q", "$interpolate", "$compile", "$parse", "$rootScope"],
    e.displayName = "translateDirective",
    angular.module("pascalprecht.translate").directive("translateCloak", f),
    f.$inject = ["$rootScope", "$translate"],
    f.displayName = "translateCloakDirective",
    angular.module("pascalprecht.translate").filter("translate", g),
    g.$inject = ["$parse", "$translate"],
    g.displayName = "translateFilterFactory",
    angular.module("pascalprecht.translate").factory("$translationCache", h),
    h.$inject = ["$cacheFactory"],
    h.displayName = "$translationCache",
    "pascalprecht.translate"
}
),
function(a, b) {
    "function" == typeof define && define.amd ? define([], function() {
        return b()
    }
    ) : "object" == typeof exports ? module.exports = b() : b()
}
(this, function() {
    function a(a) {
        "use strict";
        var b = {
            get: function(b) {
                return a.get(b)
            },
            set: function(b, c) {
                a.put(b, c)
            },
            put: function(b, c) {
                a.put(b, c)
            }
        };
        return b
    }
    return angular.module("pascalprecht.translate").factory("$translateCookieStorage", a),
    a.$inject = ["$cookieStore"],
    a.displayName = "$translateCookieStorage",
    "pascalprecht.translate"
}
),
function(a, b) {
    "function" == typeof define && define.amd ? define([], function() {
        return b()
    }
    ) : "object" == typeof exports ? module.exports = b() : b()
}
(this, function() {
    function a(a, b) {
        "use strict";
        var c = function() {
            var b;
            return {
                get: function(c) {
                    return b || (b = a.localStorage.getItem(c)),
                    b
                },
                set: function(c, d) {
                    b = d,
                    a.localStorage.setItem(c, d)
                },
                put: function(c, d) {
                    b = d,
                    a.localStorage.setItem(c, d)
                }
            }
        }
        ()
          , d = "localStorage" in a;
        if (d) {
            var e = "pascalprecht.translate.storageTest";
            try {
                null  !== a.localStorage ? (a.localStorage.setItem(e, "foo"),
                a.localStorage.removeItem(e),
                d = !0) : d = !1
            } catch (f) {
                d = !1
            }
        }
        var g = d ? c : b;
        return g
    }
    return angular.module("pascalprecht.translate").factory("$translateLocalStorage", a),
    a.$inject = ["$window", "$translateCookieStorage"],
    a.displayName = "$translateLocalStorageFactory",
    "pascalprecht.translate"
}
),
function(a, b) {
    "function" == typeof define && define.amd ? define([], function() {
        return b()
    }
    ) : "object" == typeof exports ? module.exports = b() : b()
}
(this, function() {
    function a(a, b) {
        "use strict";
        return function(c) {
            if (!(c && (angular.isArray(c.files) || angular.isString(c.prefix) && angular.isString(c.suffix))))
                throw new Error("Couldn't load static files, no files and prefix or suffix specified!");
            c.files || (c.files = [{
                prefix: c.prefix,
                suffix: c.suffix
            }]);
            for (var d = function(d) {
                if (!d || !angular.isString(d.prefix) || !angular.isString(d.suffix))
                    throw new Error("Couldn't load static file, no prefix or suffix specified!");
                var e = a.defer();
                return b(angular.extend({
                    url: [d.prefix, c.key, d.suffix].join(""),
                    method: "GET",
                    params: ""
                }, c.$http)).success(function(a) {
                    e.resolve(a)
                }
                ).error(function() {
                    e.reject(c.key)
                }
                ),
                e.promise
            }
            , e = a.defer(), f = [], g = c.files.length, h = 0; g > h; h++)
                f.push(d({
                    prefix: c.files[h].prefix,
                    key: c.key,
                    suffix: c.files[h].suffix
                }));
            return a.all(f).then(function(a) {
                for (var b = a.length, c = {}, d = 0; b > d; d++)
                    for (var f in a[d])
                        c[f] = a[d][f];
                e.resolve(c)
            }
            , function(a) {
                e.reject(a)
            }
            ),
            e.promise
        }
    }
    return angular.module("pascalprecht.translate").factory("$translateStaticFilesLoader", a),
    a.$inject = ["$q", "$http"],
    a.displayName = "$translateStaticFilesLoader",
    "pascalprecht.translate"
}
),
function(a, b) {
    "function" == typeof define && define.amd ? define([], function() {
        return b()
    }
    ) : "object" == typeof exports ? module.exports = b() : b()
}
(this, function() {
    function a(a) {
        "use strict";
        return function(b) {
            a.warn("Translation for " + b + " doesn't exist")
        }
    }
    return angular.module("pascalprecht.translate").factory("$translateMissingTranslationHandlerLog", a),
    a.$inject = ["$log"],
    a.displayName = "$translateMissingTranslationHandlerLog",
    "pascalprecht.translate"
}
);
