jQuery(document).ready(function(r) {
    function i() {
        void 0 !== r.fn.selectBox && r("select.selectBox").filter(":visible").not(".enhanced").selectBox().addClass("enhanced")
    }

    function e() {
        if (void 0 !== r.prettyPhoto) {
            var t = {
                hook: "data-rel",
                social_tools: !1,
                theme: "pp_woocommerce",
                horizontal_padding: 20,
                opacity: .8,
                deeplinking: !1,
                overlay_gallery: !1,
                default_width: 500,
                changepicturecallback: function() {
                    i(), r(".wishlist-select").change(), r(document).trigger("yith_wcwl_popup_opened", [this])
                },
                markup: '<div class="pp_pic_holder"><div class="ppt">&nbsp;</div><div class="pp_top"><div class="pp_left"></div><div class="pp_middle"></div><div class="pp_right"></div></div><div class="pp_content_container"><div class="pp_left"><div class="pp_right"><div class="pp_content"><div class="pp_loaderIcon"></div><div class="pp_fade"><a href="#" class="pp_expand" title="Expand the image">Expand</a><div class="pp_hoverContainer"><a class="pp_next" href="#">next</a><a class="pp_previous" href="#">previous</a></div><div id="pp_full_res"></div><div class="pp_details"><a class="pp_close" href="#">Close</a></div></div></div></div></div></div><div class="pp_bottom"><div class="pp_left"></div><div class="pp_middle"></div><div class="pp_right"></div></div></div><div class="pp_overlay yith-wcwl-overlay"></div>'
            };
            r('a[data-rel^="prettyPhoto[add_to_wishlist_"]').add('a[data-rel="prettyPhoto[ask_an_estimate]"]').add('a[data-rel="prettyPhoto[create_wishlist]"]').unbind("click").prettyPhoto(t), r('a[data-rel="prettyPhoto[move_to_another_wishlist]"]').on("click", function() {
                var t = r(this),
                    i = r("#move_to_another_wishlist").find("form"),
                    e = i.find(".row-id"),
                    a = t.closest("[data-row-id]").data("row-id");
                e.length && e.remove(), i.append('<input type="hidden" name="row_id" class="row-id" value="' + a + '"/>')
            }).prettyPhoto(t), new MutationObserver(function(t, i) {
                for (var e in t) {
                    var a = t[e];
                    "childList" === a.type && (void 0 !== a.addedNodes && a.addedNodes.forEach(function(t) {
                        t.classList.contains("yith-wcwl-overlay") && r("body").addClass("yith-wcwl-with-pretty-photo")
                    }), void 0 !== a.removedNodes && a.removedNodes.forEach(function(t) {
                        t.classList.contains("yith-wcwl-overlay") && r("body").removeClass("yith-wcwl-with-pretty-photo")
                    }))
                }
            }).observe(document.body, {
                childList: !0
            })
        }
    }

    function a() {
        r(".wishlist_table").find('.product-checkbox input[type="checkbox"]').off("change").on("change", function() {
            var t = r(this);
            t.parent().removeClass("checked").removeClass("unchecked").addClass(t.is(":checked") ? "checked" : "unchecked")
        }).trigger("change")
    }

    function o() {
        r(".add_to_cart").filter("[data-icon]").not(".icon-added").each(function() {
            var t, i = r(this),
                e = i.data("icon");
            t = e.match(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi) ? r("<img/>", {
                src: e
            }) : r("<i/>", {
                class: "fa " + e
            }), i.prepend(t).addClass("icon-added")
        })
    }

    function h() {
        i(), e(), a(), o(), d(), n(), _(), l(), c(), r(document).trigger("yith_wcwl_init_after_ajax")
    }

    function n() {
        yith_wcwl_l10n.enable_tooltip && r(".yith-wcwl-add-to-wishlist").find("[data-title]").each(function() {
            var t = r(this);
            t.hasClass("tooltip-added") || (t.on("mouseenter", function() {
                var t, i = r(this),
                    e = null,
                    a = i.outerWidth(),
                    o = 0;
                e = r("<span>", {
                    class: "yith-wcwl-tooltip",
                    text: i.data("title")
                }), i.append(e), t = e.outerWidth() + 6, e.outerWidth(t), o = (a - t) / 2, e.css({
                    left: o.toFixed(0) + "px"
                }).fadeIn(200), i.addClass("with-tooltip")
            }).on("mouseleave", function() {
                var t = r(this);
                t.find(".yith-wcwl-tooltip").fadeOut(200, function() {
                    t.removeClass("with-tooltip").find(".yith-wcwl-tooltip").remove()
                })
            }), t.addClass("tooltip-added"))
        })
    }

    function d() {
        r(".yith-wcwl-add-button").filter(".with-dropdown").on("mouseleave", function() {
            var t = r(this).find(".yith-wcwl-dropdown");
            t.length && t.fadeOut(200)
        }).children("a").on("mouseenter", function() {
            var t = r(this).closest(".with-dropdown"),
                i = t.find(".yith-wcwl-dropdown");
            i.length && i.children().length && t.find(".yith-wcwl-dropdown").fadeIn(200)
        })
    }

    function l() {
        void 0 !== yith_wcwl_l10n.enable_drag_n_drop && yith_wcwl_l10n.enable_drag_n_drop && r(".wishlist_table").filter(".sortable").not(".no-interactions").each(function() {
            var e = r(this),
                a = !1;
            e.sortable({
                items: "[data-row-id]",
                helper: function(t, i) {
                    return i.children().each(function() {
                        r(this).width(r(this).width())
                    }), i
                },
                update: function() {
                    var t = e.find("[data-row-id]"),
                        i = [];
                    t.length && (a && a.abort(), t.each(function() {
                        var t = r(this);
                        i.push(t.data("row-id"))
                    }), a = r.ajax({
                        data: {
                            action: yith_wcwl_l10n.actions.sort_wishlist_items,
                            positions: i,
                            wishlist_token: e.data("token"),
                            page: e.data("page"),
                            per_page: e.data("per-page")
                        },
                        method: "POST",
                        url: yith_wcwl_l10n.ajax_url
                    }))
                }
            })
        })
    }

    function c() {
        r(".copy-trigger").on("click", function() {
            var t = r(".copy-target");
            if (0 < t.length)
                if (t.is("input")) s() ? t[0].setSelectionRange(0, 9999) : t.select(), document.execCommand("copy");
                else {
                    var i = r("<input/>", {
                        val: t.text(),
                        type: "text"
                    });
                    b("body").append(i), s() ? i[0].setSelectionRange(0, 9999) : i.select(), document.execCommand("copy"), i.remove()
                }
        })
    }

    function _() {
        r(".wishlist_table").filter(".images_grid").not(".enhanced").on("click", "[data-row-id] .product-thumbnail a", function(t) {
            var i = r(this).closest("[data-row-id]"),
                e = i.siblings("[data-row-id]"),
                a = i.find(".item-details");
            t.preventDefault(), a.length && (e.removeClass("show"), i.toggleClass("show"))
        }).on("click", "[data-row-id] a.close", function(t) {
            var i = r(this).closest("[data-row-id]"),
                e = i.find(".item-details");
            t.preventDefault(), e.length && i.removeClass("show")
        }).on("click", "[data-row-id] a.remove_from_wishlist", function(t) {
            var i = r(this);
            return t.stopPropagation(), f(i), !1
        }).addClass("enhanced"), r(document).on("click", function(t) {
            r(t.target).closest("[data-row-id]").length || r(".wishlist_table").filter(".images_grid").find(".show").removeClass("show")
        }).on("added_to_cart", function() {
            r(".wishlist_table").filter(".images_grid").find(".show").removeClass("show")
        })
    }

    function w(i, t, e) {
        i.action = yith_wcwl_l10n.actions.move_to_another_wishlist_action, "" !== i.wishlist_token && "" !== i.destination_wishlist_token && "" !== i.item_id && r.ajax({
            beforeSend: t,
            url: yith_wcwl_l10n.ajax_url,
            data: i,
            dataType: "json",
            method: "post",
            success: function(t) {
                e(t), h(), r("body").trigger("moved_to_another_wishlist", [r(this), i.item_id])
            }
        })
    }

    function f(i) {
        var t = i.parents(".cart.wishlist_table"),
            e = i.parents("[data-row-id]"),
            a = e.data("row-id"),
            o = t.data("id"),
            n = t.data("token"),
            s = {
                action: yith_wcwl_l10n.actions.remove_from_wishlist_action,
                remove_from_wishlist: a,
                wishlist_id: o,
                wishlist_token: n,
                fragments: T(a)
            };
        r.ajax({
            beforeSend: function() {
                x(t)
            },
            complete: function() {
                j(t)
            },
            data: s,
            method: "post",
            success: function(t) {
                void 0 !== t.fragments && P(t.fragments), h(), r("body").trigger("removed_from_wishlist", [i, e])
            },
            url: yith_wcwl_l10n.ajax_url
        })
    }

    function p(t) {
        var i = r(this),
            e = i.closest(".wishlist_table"),
            a = null;
        t.preventDefault(), (a = e.length ? i.closest("[data-wishlist-id]").find(".wishlist-title") : i.parents(".wishlist-title")).next().show().find('input[type="text"]').focus(), a.hide()
    }

    function u(t) {
        var i = r(this);
        t.preventDefault(), i.parents(".hidden-title-form").hide(), i.parents(".hidden-title-form").prev().show()
    }

    function m(t) {
        var i, e = r(this),
            a = e.closest(".hidden-title-form"),
            o = e.closest("[data-wishlist-id]").data("wishlist-id"),
            n = a.find('input[type="text"]'),
            s = n.val();
        if (t.preventDefault(), !s) return a.addClass("woocommerce-invalid"), void n.focus();
        i = {
            action: yith_wcwl_l10n.actions.save_title_action,
            wishlist_id: o,
            title: s,
            fragments: T()
        }, r.ajax({
            type: "POST",
            url: yith_wcwl_l10n.ajax_url,
            data: i,
            dataType: "json",
            beforeSend: function() {
                x(a)
            },
            complete: function() {
                j(a)
            },
            success: function(t) {
                var i = t.fragments;
                t.result ? (a.hide(), a.prev().find(".wishlist-anchor").text(s).end().show()) : (a.addClass("woocommerce-invalid"), n.focus()), void 0 !== i && P(i)
            }
        })
    }

    function v(t) {
        var i = r(this),
            e = i.val(),
            a = i.closest("[data-wishlist-id]").data("wishlist-id"),
            o = {
                action: yith_wcwl_l10n.actions.save_privacy_action,
                wishlist_id: a,
                privacy: e,
                fragments: T()
            };
        r.ajax({
            type: "POST",
            url: yith_wcwl_l10n.ajax_url,
            data: o,
            dataType: "json",
            success: function(t) {
                var i = t.fragments;
                void 0 !== i && P(i)
            }
        })
    }

    function y(t) {
        if (void 0 !== r.prettyPhoto && void 0 !== r.prettyPhoto.close)
            if (void 0 !== t) {
                var i = r(".pp_content_container"),
                    e = i.find(".pp_content"),
                    a = i.find(".yith-wcwl-popup-form"),
                    o = a.closest(".pp_pic_holder");
                if (a.length) {
                    var n = r("<div/>", {
                        class: "yith-wcwl-popup-feedback"
                    });
                    n.append(r("<i/>", {
                        class: "fa fa-check heading-icon"
                    })), n.append(r("<p/>", {
                        class: "feedback",
                        html: t
                    })), n.css("display", "none"), e.css("height", "auto"), a.after(n), a.fadeOut(200, function() {
                        n.fadeIn()
                    }), o.addClass("feedback"), o.css("left", r(window).innerWidth() / 2 - o.outerWidth() / 2 + "px"), setTimeout(y, yith_wcwl_l10n.popup_timeout)
                }
            } else try {
                r.prettyPhoto.close()
            } catch (t) {}
    }

    function g(t) {
        var i = r("#yith-wcwl-popup-message"),
            e = r("#yith-wcwl-message"),
            a = void 0 !== yith_wcwl_l10n.popup_timeout ? yith_wcwl_l10n.popup_timeout : 3e3;
        void 0 !== yith_wcwl_l10n.enable_notices && !yith_wcwl_l10n.enable_notices || (e.html(t), i.css("margin-left", "-" + r(i).width() + "px").fadeIn(), window.setTimeout(function() {
            i.fadeOut()
        }, a))
    }

    function k(n) {
        var t = r("select.wishlist-select"),
            i = r("ul.yith-wcwl-dropdown");
        t.each(function() {
            var e = r(this),
                t = e.find("option"),
                i = t.filter('[value="new"]');
            t.not(i).remove(), r.each(n, function(t, i) {
                r("<option>", {
                    value: i.id,
                    html: i.wishlist_name
                }).appendTo(e)
            }), e.append(i)
        }), i.each(function() {
            var e = r(this),
                t = e.find("li"),
                i = e.closest(".yith-wcwl-add-button").children("a.add_to_wishlist"),
                a = i.attr("data-product-id"),
                o = i.attr("data-product-type");
            t.remove(), r.each(n, function(t, i) {
                r("<li>").append(r("<a>", {
                    rel: "nofollow",
                    html: i.wishlist_name,
                    class: "add_to_wishlist",
                    href: i.add_to_this_wishlist_url,
                    "data-product-id": a,
                    "data-product-type": o,
                    "data-wishlist-id": i.id
                })).appendTo(e)
            })
        })
    }

    function x(t) {
        void 0 !== r.fn.block && t.fadeTo("400", "0.6").block({
            message: null,
            overlayCSS: {
                background: "transparent url(" + yith_wcwl_l10n.ajax_loader_url + ") no-repeat center",
                backgroundSize: "40px 40px",
                opacity: 1
            }
        })
    }

    function j(t) {
        void 0 !== r.fn.unblock && t.stop(!0).css("opacity", "1").unblock()
    }

    function C() {
        if (navigator.cookieEnabled) return !0;
        document.cookie = "cookietest=1";
        var t = -1 !== document.cookie.indexOf("cookietest=");
        return document.cookie = "cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT", t
    }

    function T(t) {
        var e = {},
            i = null;
        return t ? "object" == typeof t ? (i = (t = r.extend({
            s: "",
            container: r(document),
            firstLoad: !1
        }, t)).container.find(".wishlist-fragment"), t.s && (i = i.not("[data-fragment-ref]").add(i.filter('[data-fragment-ref="' + t.s + '"]'))), t.firstLoad && (i = i.filter(".on-first-load"))) : (i = r(".wishlist-fragment"), "string" != typeof t && "number" != typeof t || (i = i.not("[data-fragment-ref]").add(i.filter('[data-fragment-ref="' + t + '"]')))) : i = r(".wishlist-fragment"), i.each(function() {
            var t = r(this),
                i = t.attr("class");
            e[i] = t.data("fragment-options")
        }), e
    }

    function S(t) {
        if (yith_wcwl_l10n.enable_ajax_loading) {
            var i = T(t = r.extend({
                firstLoad: !0
            }, t));
            i && r.ajax({
                data: {
                    action: yith_wcwl_l10n.actions.load_fragments,
                    fragments: i
                },
                method: "post",
                success: function(t) {
                    void 0 !== t.fragments && (P(t.fragments), h(), r(document).trigger("yith_wcwl_fragments_loaded", [i, t.fragments]))
                },
                url: yith_wcwl_l10n.ajax_url
            })
        }
    }

    function P(t) {
        r.each(t, function(t, i) {
            var e = "." + t.split(" ").filter(function(t) {
                    return t.length && "exists" !== t
                }).join("."),
                a = r(e),
                o = r(i).filter(e);
            o.length || (o = r(i).find(e)), a.length && o.length && a.replaceWith(o)
        })
    }

    function s() {
        return navigator.userAgent.match(/ipad|iphone/i)
    }
    r(document).on("yith_wcwl_init", function() {
        var t = r(this),
            s = "undefined" != typeof wc_add_to_cart_params && null !== wc_add_to_cart_params ? wc_add_to_cart_params.cart_redirect_after_add : "";
        t.on("click", ".add_to_wishlist", function(t) {
                var a = r(this),
                    i = a.attr("data-product-id"),
                    o = r(".add-to-wishlist-" + i),
                    e = {
                        add_to_wishlist: i,
                        product_type: a.data("product-type"),
                        wishlist_id: a.data("wishlist-id"),
                        action: yith_wcwl_l10n.actions.add_to_wishlist_action,
                        fragments: T(i)
                    };
                if (t.preventDefault(), jQuery(document.body).trigger("adding_to_wishlist"), yith_wcwl_l10n.multi_wishlist && yith_wcwl_l10n.modal_enable) {
                    var n = a.parents(".yith-wcwl-popup-footer").prev(".yith-wcwl-popup-content"),
                        s = n.find(".wishlist-select"),
                        d = n.find(".wishlist-name"),
                        l = n.find(".wishlist-visibility").filter(":checked");
                    if (e.wishlist_id = s.is(":visible") ? s.val() : "new", e.wishlist_name = d.val(), e.wishlist_visibility = l.val(), "new" === e.wishlist_id && !e.wishlist_name) return d.closest("p").addClass("woocommerce-invalid"), !1;
                    d.closest("p").removeClass("woocommerce-invalid")
                }
                if (C()) return r.ajax({
                    type: "POST",
                    url: yith_wcwl_l10n.ajax_url,
                    data: e,
                    dataType: "json",
                    beforeSend: function() {
                        x(a)
                    },
                    complete: function() {
                        j(a)
                    },
                    success: function(t) {
                        var i = t.result,
                            e = t.message;
                        yith_wcwl_l10n.multi_wishlist ? (y(e), void 0 !== t.user_wishlists && k(t.user_wishlists)) : g(e), "true" !== i && "exists" !== i || (void 0 !== t.fragments && P(t.fragments), yith_wcwl_l10n.multi_wishlist && !yith_wcwl_l10n.hide_add_button || o.find(".yith-wcwl-add-button").remove(), o.addClass("exists")), h(), r("body").trigger("added_to_wishlist", [a, o])
                    }
                }), !1;
                alert(yith_wcwl_l10n.labels.cookie_disabled)
            }), t.on("click", ".wishlist_table .remove_from_wishlist", function(t) {
                var i = r(this);
                return t.preventDefault(), f(i), !1
            }), t.on("adding_to_cart", "body", function(t, i, e) {
                void 0 !== i && void 0 !== e && i.closest(".wishlist_table").length && (e.remove_from_wishlist_after_add_to_cart = i.closest("[data-row-id]").data("row-id"), e.wishlist_id = i.closest(".wishlist_table").data("id"), "undefined" != typeof wc_add_to_cart_params && (wc_add_to_cart_params.cart_redirect_after_add = yith_wcwl_l10n.redirect_to_cart), "undefined" != typeof yith_wccl_general && (yith_wccl_general.cart_redirect = yith_wcwl_l10n.redirect_to_cart))
            }), t.on("added_to_cart", "body", function(t, i, e, a) {
                if (void 0 !== a && a.closest(".wishlist_table").length) {
                    "undefined" != typeof wc_add_to_cart_params && (wc_add_to_cart_params.cart_redirect_after_add = s), "undefined" != typeof yith_wccl_general && (yith_wccl_general.cart_redirect = s);
                    var o = a.closest("[data-row-id]"),
                        n = o.closest(".wishlist-fragment").data("fragment-options");
                    a.removeClass("added"), o.find(".added_to_cart").remove(), yith_wcwl_l10n.remove_from_wishlist_after_add_to_cart && n.is_user_owner && o.remove()
                }
            }), t.on("added_to_cart", "body", function() {
                var t = r(".woocommerce-message");
                0 === t.length ? r("#yith-wcwl-form").prepend(yith_wcwl_l10n.labels.added_to_cart_message) : t.fadeOut(300, function() {
                    r(this).replaceWith(yith_wcwl_l10n.labels.added_to_cart_message).fadeIn()
                })
            }), t.on("cart_page_refreshed", "body", h), t.on("click", ".show-title-form", p), t.on("click", ".wishlist-title-with-form h2", p), t.on("click", ".remove_from_all_wishlists", function(t) {
                var i = r(this),
                    e = i.attr("data-product-id"),
                    a = i.data("wishlist-id"),
                    o = i.closest(".content"),
                    n = {
                        action: yith_wcwl_l10n.actions.remove_from_all_wishlists,
                        prod_id: e,
                        wishlist_id: a,
                        fragments: T(e)
                    };
                t.preventDefault(), r.ajax({
                    beforeSend: function() {
                        x(o)
                    },
                    complete: function() {
                        j(o)
                    },
                    data: n,
                    dataType: "json",
                    method: "post",
                    success: function(t) {
                        void 0 !== t.fragments && P(t.fragments), h()
                    },
                    url: yith_wcwl_l10n.ajax_url
                })
            }), t.on("click", ".hide-title-form", u), t.on("click", ".save-title-form", m), t.on("change", ".wishlist_manage_table .wishlist-visibility", v), t.on("change", ".change-wishlist", function() {
                var t = r(this),
                    i = t.parents(".cart.wishlist_table"),
                    e = i.data("token"),
                    a = t.parents("[data-row-id]").data("row-id");
                w({
                    wishlist_token: e,
                    destination_wishlist_token: t.val(),
                    item_id: a,
                    fragments: T()
                }, function() {
                    x(i)
                }, function(t) {
                    void 0 !== t.fragments && P(t.fragments), j(i)
                })
            }), t.on("click", ".yith-wcwl-popup-footer .move_to_wishlist", function() {
                var e = r(this),
                    t = e.attr("data-product-id"),
                    i = e.data("origin-wishlist-id"),
                    a = e.closest("form"),
                    o = a.find(".wishlist-select").val(),
                    n = a.find(".wishlist-name"),
                    s = n.val(),
                    d = a.find(".wishlist-visibility").filter(":checked").val();
                if ("new" === o && !s) return n.closest("p").addClass("woocommerce-invalid"), !1;
                n.closest("p").removeClass("woocommerce-invalid"), w({
                    wishlist_token: i,
                    destination_wishlist_token: o,
                    item_id: t,
                    wishlist_name: s,
                    wishlist_visibility: d,
                    fragments: T(t)
                }, function() {
                    x(e)
                }, function(t) {
                    var i = t.message;
                    yith_wcwl_l10n.multi_wishlist ? (y(i), void 0 !== t.user_wishlists && k(t.user_wishlists)) : g(i), void 0 !== t.fragments && P(t.fragments), h(), j(e)
                })
            }), t.on("click", ".delete_item", function() {
                var a = r(this),
                    t = a.attr("data-product-id"),
                    i = a.data("item-id"),
                    o = r(".add-to-wishlist-" + t);
                return r.ajax({
                    url: yith_wcwl_l10n.ajax_url,
                    data: {
                        action: yith_wcwl_l10n.actions.delete_item_action,
                        item_id: i,
                        fragments: T(t)
                    },
                    dataType: "json",
                    beforeSend: function() {
                        x(a)
                    },
                    complete: function() {
                        j(a)
                    },
                    method: "post",
                    success: function(t) {
                        var i = t.fragments,
                            e = t.message;
                        yith_wcwl_l10n.multi_wishlist && y(e), a.closest(".yith-wcwl-remove-button").length || g(e), void 0 !== i && P(i), h(), r("body").trigger("removed_from_wishlist", [a, o])
                    }
                }), !1
            }), t.on("change", ".yith-wcwl-popup-content .wishlist-select", function() {
                var t = r(this);
                "new" === t.val() ? t.parents(".yith-wcwl-first-row").next(".yith-wcwl-second-row").show() : t.parents(".yith-wcwl-first-row").next(".yith-wcwl-second-row").hide()
            }), t.on("change", "#bulk_add_to_cart", function() {
                var t = r(this),
                    i = t.closest(".wishlist_table").find("[data-row-id]").find('input[type="checkbox"]:not(:disabled)');
                t.is(":checked") ? i.attr("checked", "checked").change() : i.removeAttr("checked").change()
            }), t.on("submit", ".wishlist-ask-an-estimate-popup", function() {
                var t = r(this),
                    e = t.closest("form"),
                    a = t.closest(".pp_content"),
                    i = e.serialize();
                return r.ajax({
                    beforeSend: function() {
                        x(e)
                    },
                    complete: function() {
                        j(e)
                    },
                    data: i + "&action=" + yith_wcwl_l10n.actions.ask_an_estimate,
                    dataType: "json",
                    method: "post",
                    success: function(t) {
                        if (void 0 !== t.result && t.result) {
                            var i = t.template;
                            void 0 !== i && (e.replaceWith(i), a.css("height", "auto"), setTimeout(y, 3e3))
                        } else void 0 !== t.message && (e.find(".woocommerce-error").remove(), e.find(".popup-description").after(r("<div>", {
                            text: t.message,
                            class: "woocommerce-error"
                        })))
                    },
                    url: yith_wcwl_l10n.ajax_url
                }), !1
            }), t.on("click", ".yith-wfbt-add-wishlist", function(t) {
                t.preventDefault();
                var i = r(this),
                    e = r("#yith-wcwl-form");
                r("html, body").animate({
                        scrollTop: e.offset().top
                    }, 500),
                    function(t, e) {
                        var i = t.data("data-product-id"),
                            a = r(document).find(".cart.wishlist_table"),
                            o = a.data("pagination"),
                            n = a.data("per-page"),
                            s = a.data("id"),
                            d = a.data("token"),
                            l = {
                                action: yith_wcwl_l10n.actions.reload_wishlist_and_adding_elem_action,
                                pagination: o,
                                per_page: n,
                                wishlist_id: s,
                                wishlist_token: d,
                                add_to_wishlist: i,
                                product_type: t.data("product-type")
                            };
                        if (!C()) return alert(yith_wcwl_l10n.labels.cookie_disabled);
                        r.ajax({
                            type: "POST",
                            url: yith_wcwl_l10n.ajax_url,
                            data: l,
                            dataType: "html",
                            beforeSend: function() {
                                x(a)
                            },
                            complete: function() {
                                j(a)
                            },
                            success: function(t) {
                                var i = r(t).find("#yith-wcwl-form");
                                e.replaceWith(i), h()
                            }
                        })
                    }(i, e)
            }), t.on("submit", ".yith-wcwl-popup-form", function() {
                return !1
            }), t.on("yith_infs_added_elem", function() {
                e()
            }), t.on("found_variation", function(t, i) {
                var a = r(t.target).data("product_id"),
                    o = i.variation_id,
                    e = r('.add_to_wishlist[data-product-id="' + a + '"]').add('.add_to_wishlist[data-original-product-id="' + a + '"]');
                a && o && e.length && e.each(function() {
                    var t, i = r(this),
                        e = i.closest(".yith-wcwl-add-to-wishlist");
                    i.attr("data-original-product-id", a), i.attr("data-product-id", o), console.log(i, i.attr("data-product-id")), e.length && (void 0 !== (t = e.data("fragment-options")) && (t.product_id = o, e.data("fragment-options", t)), e.removeClass(function(t, i) {
                        return i.match(/add-to-wishlist-\S+/g).join(" ")
                    }).addClass("add-to-wishlist-" + o).attr("data-fragment-ref", o))
                })
            }), t.on("reset_data", function(t) {
                var o = r(t.target).data("product_id"),
                    i = r('.add_to_wishlist[data-original-product-id="' + o + '"]');
                o && i.length && i.each(function() {
                    var t, i = r(this),
                        e = i.closest(".yith-wcwl-add-to-wishlist"),
                        a = i.attr("data-product-id");
                    i.attr("data-product-id", o), i.attr("data-original-product-id", ""), e.length && (void 0 !== (t = e.data("fragment-options")) && (t.product_id = o, e.data("fragment-options", t)), e.removeClass("add-to-wishlist-" + a).addClass("add-to-wishlist-" + o).attr("data-fragment-ref", o))
                })
            }), t.on("yith_wcwl_reload_fragments", S), t.on("yith_infs_added_elem", function(t, i) {
                S({
                    container: i,
                    firstLoad: !1
                })
            }), t.on("yith_wcwl_fragments_loaded", function(t) {
                r(".variations_form").find(".variations select").last().change()
            }),
            function() {
                if (void 0 !== yith_wcwl_l10n.enable_notices && !yith_wcwl_l10n.enable_notices) return;
                if (r(".yith-wcwl-add-to-wishlist").length && !r("#yith-wcwl-popup-message").length) {
                    var t = r("<div>").attr("id", "yith-wcwl-message"),
                        i = r("<div>").attr("id", "yith-wcwl-popup-message").html(t).hide();
                    r("body").prepend(i)
                }
            }(), n(), d(), l(),
            function() {
                var n, s;
                r(".wishlist_table").on("change", ".product-quantity input", function() {
                    var t = r(this),
                        i = t.closest("[data-row-id]"),
                        e = i.data("row-id"),
                        a = t.closest(".wishlist_table"),
                        o = a.data("token");
                    clearTimeout(s), i.find(".add_to_cart").data("quantity", t.val()), s = setTimeout(function() {
                        n && n.abort(), n = r.ajax({
                            beforeSend: function() {
                                x(a)
                            },
                            complete: function() {
                                j(a)
                            },
                            data: {
                                product_id: e,
                                wishlist_token: o,
                                quantity: t.val(),
                                action: yith_wcwl_l10n.actions.update_item_quantity
                            },
                            method: "POST",
                            url: yith_wcwl_l10n.ajax_url
                        })
                    }, 1e3)
                })
            }(), _(), r(document).on("click", ".show-tab", function(t) {
                var i = r(this),
                    e = i.closest(".yith-wcwl-popup-content"),
                    a = i.data("tab"),
                    o = e.find(".tab").filter("." + a);
                if (t.preventDefault(), !o.length) return !1;
                i.addClass("active").siblings(".show-tab").removeClass("active"), o.show().siblings(".tab").hide(), "create" === a ? e.prepend('<input type="hidden" id="new_wishlist_selector" class="wishlist-select" value="new">') : e.find("#new_wishlist_selector").remove()
            }), r(document).on("change", ".wishlist-select", function(t) {
                var i = r(this),
                    e = i.closest(".yith-wcwl-popup-content"),
                    a = i.closest(".tab"),
                    o = e.find(".tab.create"),
                    n = e.find(".show-tab"),
                    s = n.filter('[data-tab="create"]');
                "new" === i.val() && o.length && (a.hide(), o.show(), n.removeClass("active"), s.addClass("active"), i.find("option").removeProp("selected"), i.change())
            }), i(), a(), e(), o(),
            function() {
                var c = !1;
                r(window).on("resize", function(t) {
                    var i = r(".wishlist_table.responsive"),
                        e = i.is(".mobile"),
                        a = window.matchMedia("(max-width: 768px)"),
                        o = i.closest("form"),
                        n = o.attr("class"),
                        s = o.data("fragment-options"),
                        d = {},
                        l = !1;
                    i.length && (a.matches && i && !e ? (s.is_mobile = "yes", l = !0) : !a.matches && i && e && (s.is_mobile = "no", l = !0), l && (c && c.abort(), d[n] = s, c = r.ajax({
                        beforeSend: function() {
                            x(i)
                        },
                        complete: function() {
                            j(i)
                        },
                        data: {
                            action: yith_wcwl_l10n.actions.load_mobile_action,
                            fragments: d
                        },
                        method: "post",
                        success: function(t) {
                            void 0 !== t.fragments && (P(t.fragments), h(), r(document).trigger("yith_wcwl_responsive_template", [e, t.fragments]))
                        },
                        url: yith_wcwl_l10n.ajax_url
                    })))
                })
            }(), c(), S()
    }).trigger("yith_wcwl_init")
});