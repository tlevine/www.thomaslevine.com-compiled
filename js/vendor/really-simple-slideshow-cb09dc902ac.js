/**
*	Really Simple™ Slideshow jQuery plug-in 1.4.12
*	---------------------------------------------------------
*	Load slideshow images dynamically, instead of all at once
*	---------------------------------------------------------
*
*	Introduction, Demos, Docs and Downloads:
*	http://reallysimpleworks.com/slideshow
*
*	Copyright (c) 2011 Really Simple
*	http://reallysimpleworks.com
*
*	Licensed under the MIT license:
*	http://www.opensource.org/licenses/mit-license.php
*	Free to use for both commercial and non-commercial.
*/
/**
*	Extra Bite-Sized Docs
*	---------------------
*
*	If embedding slide data in your markup, you can initialise
*	and start a slideshow with one line of code:
*
*	$('#my-slideshow-div').rsfSlideshow();
*
*	If you're pulling in slide data from elsewhere and want to
*	manually add slides to the slideshow:
*
*	var slides = Array(
*		{url: 'http://mydomain.com/images/1.png', caption: 'This is slide number 1'},
*		{url: 'http://mydomain.com/images/2.png', caption: 'This is slide number 2', captionClass: 'highlight'},
*		{url: '/images/3.png', caption: 'This is slide number 3'},
*	);
*	$('#my-slideshow-div').rsfSlideshow({slides: slides});
*
*	For complete docs and demos, visit:
*	http://reallysimpleworks.com/slideshow
*/
(function(e){var t={init:function(t){return this.each(function(){var n=this,r=e(this),i=r.data("rsf_slideshow"),s;i||(s=e.extend(!0,{},e.rsfSlideshow.defaults),typeof t=="object"&&e.extend(!0,s,t),r.data("rsf_slideshow",{slides:[],this_slide:0,effect_iterator:{this_effect:-1,direction:1},settings:s,interval_id:!1,loaded_imgs:[],queued:0}),i=r.data("rsf_slideshow")),s=i.settings,r.rsfSlideshow("getSlidesFromMarkup"),s.slides.length&&(r.rsfSlideshow("addSlides",s.slides),s.slides=[]),typeof s.eventHandlers=="object"&&e.each(s.eventHandlers,function(e,t){r.bind(e,function(e){t(r,e)})}),s.controls.playPause.auto&&r.rsfSlideshow("addControl","playPause"),s.controls.previousSlide.auto&&r.rsfSlideshow("addControl","previousSlide"),s.controls.index.auto&&r.rsfSlideshow("addControl","index"),s.controls.nextSlide.auto&&r.rsfSlideshow("addControl","nextSlide"),s.autostart&&r.rsfSlideshow("startShow")})},addSlides:function(t){return this.each(function(){if(t instanceof Array)for(var r=0,i=t.length;r<i;r++)n._addSlide(e(this),t[r]);else n._addSlide(e(this),t)})},removeSlides:function(t){if(t===undefined)return this.each(function(){e(this).data("rsf_slideshow").slides=[]});if(t instanceof Array){t.sort(function(e,t){return t-e});var r=[];return this.each(function(){for(var i=0,s=t.length;i<s;i++)e.inArray(t[i],r)===-1&&(n._removeSlide(e(this),t[i]),r.push(t[i]))})}return this.each(function(){n._removeSlide(e(this),t)})},getSlideData:function(e){return e===undefined?this.data("rsf_slideshow").slides:this.data("rsf_slideshow").slides[e]?this.data("rsf_slideshow").slides[e]:!1},startShow:function(t,r){return this.each(function(){var i=e(this);i.data("rsf_slideshow").interval_id||(r&&i.rsfSlideshow("nextSlide"),i.data("rsf_slideshow")._current_interval=t,n._setTimeout(i,t),i.bind("_rsSlideReady",function(e,r){n._setTimeout(i,t)}),n._trigger(i,"rsStartShow"))})},stopShow:function(){return this.each(function(){var t=e(this),r=t.data("rsf_slideshow");r.interval_id&&(clearTimeout(r.interval_id),r.interval_id=!1),t.unbind("_rsSlideReady"),n._trigger(e(this),"rsStopShow")})},toggleShow:function(){return this.each(function(){e(this).rsfSlideshow("isRunning")?e(this).rsfSlideshow("stopShow"):e(this).rsfSlideshow("startShow",!1,!0)})},isRunning:function(){return this.data("rsf_slideshow").interval_id?!0:!1},currentSlideKey:function(){var e=this.data("rsf_slideshow");return e.this_slide},totalSlides:function(){var e=this.data("rsf_slideshow");return e.slides.length},getSlidesFromMarkup:function(t){return this.each(function(){var r=e(this).data("rsf_slideshow");t||(t={}),t.data_container||(t.data_container=r.settings.data_container);var i;t.data_container.charAt(0)==="#"?i=e(t.data_container):i=e(this).children(t.data_container);if(!i.length)return!1;t.slide_data_container||(t.slide_data_container=r.settings.slide_data_container);var s=e.extend(!0,{},r.settings.slide_data_selectors);t.slide_data_selectors&&e.extend(!0,s,t.slide_data_selectors),t.slide_data_selectors=s;var o=e(this);i.children(t.slide_data_container).each(function(){var r=n._findData(e(this),t.slide_data_selectors);o.rsfSlideshow("addSlides",r)})})},nextSlide:function(){return this.each(function(){var t=e(this).data("rsf_slideshow");t.this_slide++;if(t.this_slide>=t.slides.length){if(!t.settings.loop)return t.this_slide=t.slides.length-1,e(this).rsfSlideshow("stopShow"),!0;t.this_slide=0}e(this).rsfSlideshow("showSlide",t.slides[t.this_slide])})},previousSlide:function(){return this.each(function(){var t=e(this).data("rsf_slideshow");t.this_slide--;if(t.this_slide<0){if(!t.settings.loop)return t.this_slide=0,e(this).rsfSlideshow("stopShow"),!0;t.this_slide=t.slides.length-1}e(this).rsfSlideshow("showSlide",t.slides[t.this_slide])})},goToSlide:function(t){return this.each(function(){var n=e(this).data("rsf_slideshow");typeof n.slides[t]=="object"&&(n.this_slide=t,e(this).rsfSlideshow("showSlide",n.slides[n.this_slide]))})},showSlide:function(t){var r=this,i=r.data("rsf_slideshow"),s=r.width(),o=r.height();n._trigger(r,"rsPreTransition"),r.children("img:first").css("z-index",0);var u=function(u){var a=e(u);a.addClass("rsf-slideshow-image");var f=function(u,f){n._trigger(r,"rsImageReady");var l=0;u&&(l=Math.ceil(s/2-u/2));var c=0;f&&(c=Math.ceil(o/2-f/2)),a.css({left:l}),a.css({top:c}),t.image_title&&a.attr("title",t.image_title),t.image_alt&&a.attr("alt",t.image_alt),t.link_to&&(a=e('<a href="'+t.link_to+'"></a>').append(a));var h=e("<div></div>");h.addClass(i.settings.slide_container_class),h.append(a).css("display","none");if(t.caption){var p=e("<div>"+t.caption+"</div>");p.addClass(i.settings.slide_caption_class),p.appendTo(h),t.captionClass&&p.addClass(t.captionClass)}var d=i.settings.effect;return t.effect&&(d=t.effect),n._trigger(r,"_rsSlideReady",{$slide:h}),n._trigger(r,"rsSlideReady",{$slide:h}),n._transitionWith(r,h,d),!0};n._getImageDimensions(r,a,f,i.settings.interval*1e3/2,function(){f()})},a=new Image;return e(a).bind("load",function(){u(this)}),a.src=t.url,this},addControl:function(t){return this.each(function(){var r=e(this),i=r.data("rsf_slideshow").settings,s=i.controls[t].generate(r);n._controlsContainer(r),i.controls[t].place(r,s);var o="bind"+t.substr(0,1).toUpperCase()+t.substr(1,t.length);r.rsfSlideshow(o,s)})},bindPlayPause:function(t){return this.each(function(){var n=e(this),r=n.data("rsf_slideshow");t.bind("click.rsfSlideshow",function(e){e.preventDefault(),n.rsfSlideshow("toggleShow")})})},bindPreviousSlide:function(t,n){return this.each(function(){var r=e(this),i=r.data("rsf_slideshow");n||(n=i.settings.controls.previousSlide.autostop),t.bind("click.rsfSlideshow",function(e){e.preventDefault(),r.rsfSlideshow("previousSlide"),n&&r.rsfSlideshow("stopShow")})})},bindNextSlide:function(t,n){return this.each(function(){var r=e(this),i=r.data("rsf_slideshow");n||(n=i.settings.controls.nextSlide.autostop),t.bind("click.rsfSlideshow",function(e){e.preventDefault(),r.rsfSlideshow("nextSlide"),n&&r.rsfSlideshow("stopShow")})})},bindIndex:function(t,r){return this.each(function(){var t=e(this),i=t.data("rsf_slideshow").settings;r||(r=i.controls.index.autostop);var s=i.controls.index.getEach(t);s.bind("click.rsfSlideshow",function(n){n.preventDefault();var s=i.controls.index.getSlideKey(e(this));s&&(t.rsfSlideshow("goToSlide",s),r&&t.rsfSlideshow("stopShow"))}),n._bindActiveIndex(t)})}};e.fn.rsfSlideshow=function(n){if(!this.length)return this;if(t[n])return t[n].apply(this,Array.prototype.slice.call(arguments,1));if(typeof n=="object"||!n)return t.init.apply(this,arguments);e.error("Method "+n+" does not exist on jQuery.rsfSlidehow")};var n={_findData:function(e,t){var n={},r;for(var i in t)if(t.hasOwnProperty(i)){var s=e.clone();t[i].selector&&(s=s.children(t[i].selector)),t[i].attr?r=s.attr(t[i].attr):r=s.html(),n[i]=r}return n},_addSlide:function(t,n){var r=t.data("rsf_slideshow");if(typeof n=="string"){var i=e.trim(n);r.slides.push({url:i})}else if(n.url){for(var s in n)n.hasOwnProperty(s)&&(n[s]=e.trim(n[s]));r.slides.push(n)}},_removeSlide:function(e,t){e.data("rsf_slideshow").slides.splice(t,1)},_transitionWith:function(t,n,r){var i=t.data("rsf_slideshow"),s="random",o=t.find("."+i.settings.slide_container_class+":last");o.length?n.insertAfter(o):n.prependTo(t),typeof r=="object"&&r.iteration&&r.effects&&(s=r.iteration,r=r.effects);if(r instanceof Array){switch(s){case"loop":i.effect_iterator.this_effect++,i.effect_iterator.this_effect>r.length-1&&(i.effect_iterator.this_effect=0);break;case"backAndForth":i.effect_iterator.this_effect+=i.effect_iterator.direction,i.effect_iterator.this_effect<0&&(i.effect_iterator.this_effect=1,i.effect_iterator.direction=i.effect_iterator.direction*-1),i.effect_iterator.this_effect>r.length-1&&(i.effect_iterator.this_effect=r.length-2,i.effect_iterator.direction=i.effect_iterator.direction*-1);break;default:i.effect_iterator.this_effect=Math.floor(Math.random()*r.length)}r=r[i.effect_iterator.this_effect]}e.rsfSlideshow.transitions[r]&&typeof e.rsfSlideshow.transitions[r]=="function"&&e.rsfSlideshow.transitions[r](t,n)},_doSlide:function(e,t,r,i){var s=e.data("rsf_slideshow"),o=t.prev();t.css({top:i,left:r}),t.css("display","block"),t.stop().animate({top:0,left:0},s.settings.transition,s.settings.easing,function(){n._endTransition(e,t)}),o.stop().animate({top:0-i,left:0-r},s.settings.transition,s.settings.easing)},_getImageDimensions:function(e,t,r,i,s,o){o||(o=0,e.prepend(t));var u=t.outerWidth(),a=t.outerHeight();if(u&&a)return t.detach(),r(u,a),!0;if(i&&o>i)return t.detach(),s&&typeof s=="function"&&s(i,o),!1;o+=200,setTimeout(function(){n._getImageDimensions(e,t,r,i,s,o)},200)},_endTransition:function(e,t){t.prev().remove(),n._trigger(e,"rsPostTransition"),e.rsfSlideshow("currentSlideKey")===e.rsfSlideshow("totalSlides")-1?n._trigger(e,"rsLastSlide"):e.rsfSlideshow("currentSlideKey")===0&&n._trigger(e,"rsFirstSlide")},_bindActiveIndex:function(t){var n=t.data("rsf_slideshow").settings.controls.index;t.bind("rsPreTransition",function(){var r=e(this).rsfSlideshow("currentSlideKey");n.getEach(t).removeClass(n.active_class),n.getSingleByKey(t,r).addClass(n.active_class)})},_controlsContainer:function(e){var t=e.data("rsf_slideshow").settings;if(!t.controls.container.get(e).length){var n=t.controls.container.generate(e);t.controls.container.place(e,n)}},_trigger:function(t,n,r){var i=t.data("rsf_slideshow");typeof r!="object"&&(r={}),e.extend(r,{slide_key:i.this_slide,slide:i.slides[i.this_slide]}),t.trigger(n,r)},_setTimeout:function(e,t){var n=e.data("rsf_slideshow");n.interval_id&&clearTimeout(n.interval_id),t||(t=n.settings.interval),t<=n.settings.transition/1e3&&(t=n.settings.transition/1e3+.1),n.interval_id=setTimeout(function(){e.rsfSlideshow("nextSlide")},t*1e3)}};e.rsfSlideshow={defaults:{interval:5,transition:1e3,effect:"fade",easing:"swing",loop:!0,autostart:!0,slides:[],slide_container_class:"slide-container",slide_caption_class:"slide-caption",data_container:"ol.slides",slide_data_container:"li",slide_data_selectors:{url:{selector:"a",attr:"href"},caption:{selector:"a",attr:"title"},link_to:{selector:"a",attr:"data-link-to"},effect:{selector:"a",attr:"data-effect"}},eventHandlers:{rsStartShow:function(t,n){var r=e(t).data("rsf_slideshow").settings.controls.playPause,i=r.get(e(t));i.html("Pause").addClass(r.playing_class)},rsStopShow:function(t,n){var r=e(t).data("rsf_slideshow").settings.controls.playPause,i=r.get(e(t));i.html("Play").addClass(r.paused_class)}},controls:{playPause:{generate:function(t){return e('<a href="#" class="rs-play-pause '+t.data("rsf_slideshow").settings.controls.playPause.paused_class+'" data-control-for="'+t.attr("id")+'">Play</a>')},place:function(e,t){var n=e.data("rsf_slideshow").settings.controls.container.get(e);n.append(t)},get:function(t){return e('.rs-play-pause[data-control-for="'+t.attr("id")+'"]')},playing_class:"rs-playing",paused_class:"rs-paused",auto:!1},previousSlide:{generate:function(t){return e('<a href="#" class="rs-prev" data-control-for="'+t.attr("id")+'">&lt;</a>')},place:function(e,t){var n=e.data("rsf_slideshow").settings.controls.container.get(e);n.append(t)},get:function(t){return e('.rs-prev[data-control-for="'+t.attr("id")+'"]')},autostop:!0,auto:!1},nextSlide:{generate:function(t){return e('<a href="#" class="rs-next" data-control-for="'+t.attr("id")+'">&gt;</a>')},place:function(e,t){var n=e.data("rsf_slideshow").settings.controls.container.get(e);n.append(t)},get:function(t){return e('.rs-next[data-control-for="'+t.attr("id")+'"]')},autostop:!0,auto:!1},index:{generate:function(t){var n=t.rsfSlideshow("totalSlides"),r=e('<ul class="rs-index-list clearfix"></ul>');r.attr("data-control-for",t.attr("id"));for(var i=0;i<n;i++){var s=e('<a href="#"></a>');s.addClass("rs-index"),s.attr("data-control-for",t.attr("id")),s.attr("data-slide-key",i),s.append(i+1),i===t.rsfSlideshow("currentSlideKey")&&s.addClass("rs-active");var o=e("<li></li>");o.append(s),r.append(o)}return r},place:function(e,t){var n=e.data("rsf_slideshow").settings.controls.container.get(e);n.append(t)},get:function(t){return e('.rs-index-list[data-control-for="'+t.attr("id")+'"]')},getEach:function(t){return e('.rs-index[data-control-for="'+t.attr("id")+'"]')},getSingleByKey:function(t,n){return e('.rs-index[data-control-for="'+t.attr("id")+'"][data-slide-key="'+n+'"]')},getSlideKey:function(e){return e.attr("data-slide-key")},active_class:"rs-active",autostop:!0,auto:!1},container:{generate:function(t){return e('<div class="rs-controls clearfix" id="rs-controls-'+t.attr("id")+'"></div>')},place:function(e,t){e.after(t)},get:function(t){return e("#rs-controls-"+t.attr("id"))}}}},transitions:{none:function(e,t){t.css("display","block")},fade:function(e,t){t.fadeIn(e.data("rsf_slideshow").settings.transition,function(){n._endTransition(e,t)})},slideLeft:function(e,t){var r=t.outerWidth();n._doSlide(e,t,r,0)},slideRight:function(e,t){var r=0-t.outerWidth();n._doSlide(e,t,r,0)},slideUp:function(e,t){var r=t.outerHeight();n._doSlide(e,t,0,r)},slideDown:function(e,t){var r=0-t.outerHeight();n._doSlide(e,t,0,r)}}}})(jQuery);