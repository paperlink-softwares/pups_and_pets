! function(a) {
    a.extend(a.fn, {
        swapClass: function(a, e) {
            var l = this.filter("." + a);
            return this.filter("." + e).removeClass(e).addClass(a), l.removeClass(a).addClass(e), this
        },
        replaceClass: function(a, e) {
            return this.filter("." + a).removeClass(a).addClass(e).end()
        },
        hoverClass: function(e) {
            return e = e || "hover", this.hover(function() {
                a(this).addClass(e)
            }, function() {
                a(this).removeClass(e)
            })
        },
        heightToggle: function(a, e) {
            a ? this.animate({
                height: "toggle"
            }, a, e) : this.each(function() {
                jQuery(this)[jQuery(this).is(":hidden") ? "show" : "hide"](), e && e.apply(this, arguments)
            })
        },
        heightHide: function(a, e) {
            a ? this.animate({
                height: "hide"
            }, a, e) : (this.hide(), e && this.each(e))
        },
        prepareBranches: function(a) {
            return a.prerendered || (this.filter(":last-child:not(ul)").addClass(e.last), this.filter((a.collapsed ? "" : "." + e.closed) + ":not(." + e.open + ")").find(">ul").hide()), this.filter(":has(>ul)")
        },
        applyClasses: function(l, s) {
            this.filter(":has(>ul):not(:has(>a))").find(">span").click(function(e) {
                s.apply(a(this).next())
            }).add(a("a", this)).hoverClass(), l.prerendered || (this.filter(":has(>ul:hidden)").addClass(e.expandable).replaceClass(e.last, e.lastExpandable), this.not(":has(>ul:hidden)").addClass(e.collapsable).replaceClass(e.last, e.lastCollapsable), this.prepend('<div class="' + e.hitarea + '"/>').find("div." + e.hitarea).each(function() {
                var e = "";
                a.each(a(this).parent().attr("class").split(" "), function() {
                    e += this + "-hitarea "
                }), a(this).addClass(e)
            })), this.find("div." + e.hitarea).click(s)
        },
        treeview: function(l) {
            if ((l = a.extend({
                    cookieId: "treeview"
                }, l)).add) return this.trigger("add", [l.add]);
            if (l.toggle) {
                var s = l.toggle;
                l.toggle = function() {
                    return s.apply(a(this).parent()[0], arguments)
                }
            }

            function t() {
                a(this).parent().find(">.hitarea").swapClass(e.collapsableHitarea, e.expandableHitarea).swapClass(e.lastCollapsableHitarea, e.lastExpandableHitarea).end().swapClass(e.collapsable, e.expandable).swapClass(e.lastCollapsable, e.lastExpandable).find(">ul").heightToggle(l.animated, l.toggle), l.unique && a(this).parent().siblings().find(">.hitarea").replaceClass(e.collapsableHitarea, e.expandableHitarea).replaceClass(e.lastCollapsableHitarea, e.lastExpandableHitarea).end().replaceClass(e.collapsable, e.expandable).replaceClass(e.lastCollapsable, e.lastExpandable).find(">ul").heightHide(l.animated, l.toggle)
            }
            this.addClass("treeview");
            var i = this.find("li").prepareBranches(l);
            switch (l.persist) {
                case "cookie":
                    var n = l.toggle;
                    l.toggle = function() {
                            var e;
                            e = [], i.each(function(l, s) {
                                e[l] = a(s).is(":has(>ul:visible)") ? 1 : 0
                            }), a.cookie(l.cookieId, e.join("")), n && n.apply(this, arguments)
                        },
                        function() {
                            var e = a.cookie(l.cookieId);
                            if (e) {
                                var s = e.split("");
                                i.each(function(e, l) {
                                    a(l).find(">ul")[parseInt(s[e]) ? "show" : "hide"]()
                                })
                            }
                        }();
                    break;
                case "location":
                    var r = this.find("a").filter(function() {
                        return this.href.toLowerCase() == location.href.toLowerCase()
                    });
                    r.length && r.addClass("selected").parents("ul, li").add(r.next()).show()
            }
            return i.applyClasses(l, t), l.control && (! function(l, s) {
                function i(s) {
                    return function() {
                        return t.apply(a("div." + e.hitarea, l).filter(function() {
                            return !s || a(this).parent("." + s).length
                        })), !1
                    }
                }
                a("a:eq(0)", s).click(i(e.collapsable)), a("a:eq(1)", s).click(i(e.expandable)), a("a:eq(2)", s).click(i())
            }(this, l.control), a(l.control).show()), this.bind("add", function(s, i) {
                a(i).prev().removeClass(e.last).removeClass(e.lastCollapsable).removeClass(e.lastExpandable).find(">.hitarea").removeClass(e.lastCollapsableHitarea).removeClass(e.lastExpandableHitarea), a(i).find("li").andSelf().prepareBranches(l).applyClasses(l, t)
            })
        }
    });
    var e = a.fn.treeview.classes = {
        open: "open",
        closed: "closed",
        expandable: "expandable",
        expandableHitarea: "expandable-hitarea",
        lastExpandableHitarea: "lastExpandable-hitarea",
        collapsable: "collapsable",
        collapsableHitarea: "collapsable-hitarea",
        lastCollapsableHitarea: "lastCollapsable-hitarea",
        lastCollapsable: "lastCollapsable",
        lastExpandable: "lastExpandable",
        last: "last",
        hitarea: "hitarea"
    };
    a.fn.Treeview = a.fn.treeview
}(jQuery);