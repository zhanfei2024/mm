webpackJsonp([9],{"8r9t":function(l,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var u=e("3j3K"),t=function(){},i=e("5oXY"),o=e("685D"),a=e("WtPQ"),d=e("2Je8"),s=e("MInI"),c=e("UWCg"),r=e("1Nhw"),p=e("PwXO"),m=e("M4fF"),g=e("0PqP"),v=e("8A5H"),f=this&&this.__awaiter||function(l,n,e,u){return new(e||(e=Promise))(function(t,i){function o(l){try{d(u.next(l))}catch(l){i(l)}}function a(l){try{d(u.throw(l))}catch(l){i(l)}}function d(l){l.done?t(l.value):new e(function(n){n(l.value)}).then(o,a)}d((u=u.apply(l,n||[])).next())})},h=this&&this.__generator||function(l,n){var e,u,t,i,o={label:0,sent:function(){if(1&t[0])throw t[1];return t[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(e)throw new TypeError("Generator is already executing.");for(;o;)try{if(e=1,u&&(t=u[2&i[0]?"return":i[0]?"throw":"next"])&&!(t=t.call(u,i[1])).done)return t;switch(u=0,t&&(i=[0,t.value]),i[0]){case 0:case 1:t=i;break;case 4:return o.label++,{value:i[1],done:!1};case 5:o.label++,u=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!(t=(t=o.trys).length>0&&t[t.length-1])&&(6===i[0]||2===i[0])){o=0;continue}if(3===i[0]&&(!t||i[1]>t[0]&&i[1]<t[3])){o.label=i[1];break}if(6===i[0]&&o.label<t[1]){o.label=t[1],t=i;break}if(t&&o.label<t[2]){o.label=t[2],o.ops.push(i);break}t[2]&&o.ops.pop(),o.trys.pop();continue}i=n.call(l,o)}catch(l){i=[6,l],u=0}finally{e=t=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},w=function(){function l(l,n,e){this.homeService=l,this.seoService=n,this.translate=e,this.filter={page:1,limit:6,sorting:"newest",search:""},this.meta={pagination:{}},this.news=[]}return l.prototype.ngDoCheck=function(){this.seoService.setTitle(this.translate.instant("navbar.news_list")+"_"+this.translate.instant("global.coc_title"),this.seoService.getTitleContent()),this.seoService.setKeyWords(""+this.translate.instant("navbar.news_list")),this.seoService.setDescription(""+this.translate.instant("global.coc_news_description"))},l.prototype.ngOnInit=function(){this.readPostCallServer()},l.prototype.readPostCallServer=function(){return f(this,void 0,void 0,function(){var l;return h(this,function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),this.tableLoading=!0,[4,this.homeService.getNews(""===this.filter.search?m.omit(this.filter,["search"]):this.filter).toPromise()];case 1:return l=n.sent(),this.news=l.result,this.meta=l.meta,this.tableLoading=!1,[3,3];case 2:return n.sent(),this.tableLoading=!1,[3,3];case 3:return[2]}})})},l.prototype.pageChanged=function(l){return f(this,void 0,void 0,function(){return h(this,function(n){switch(n.label){case 0:return this.filter.page=l.page,this.filter.limit=l.itemsPerPage,window.scrollTo(0,0),[4,this.readPostCallServer()];case 1:return n.sent(),[2]}})})},l}(),x=e("D01D"),C=e("QvF1"),b=e("j+wb"),y=e("NVOs"),_=u["\u0275crt"]({encapsulation:2,styles:[],data:{}});function M(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,91,"div",[["class","news-list row clearfix"],["role","button"]],null,[[null,"click"]],function(l,n,e){var t=!0;return"click"===n&&(t=!1!==u["\u0275nov"](l,1).onClick()&&t),t},null,null)),u["\u0275did"](1,16384,null,0,i.l,[i.k,i.a,[8,null],u.Renderer2,u.ElementRef],{routerLink:[0,"routerLink"]},null),u["\u0275pad"](2,5),(l()(),u["\u0275ted"](-1,null,["\n        "])),(l()(),u["\u0275eld"](4,0,null,null,34,"div",[["class","col-md-8"],["style","padding-left: 0"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n          "])),(l()(),u["\u0275eld"](6,0,null,null,31,"div",[["class","clearfix"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n            "])),(l()(),u["\u0275eld"](8,0,null,null,6,"div",[["class","news-pic col-xs-12 col-sm-4"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n              "])),(l()(),u["\u0275eld"](10,0,null,null,3,"div",[["class","pic-wrapper"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n                "])),(l()(),u["\u0275eld"](12,0,null,null,0,"img",[["class","img-responsive"]],[[8,"src",4]],null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n              "])),(l()(),u["\u0275ted"](-1,null,["\n            "])),(l()(),u["\u0275ted"](-1,null,["\n            "])),(l()(),u["\u0275eld"](16,0,null,null,20,"div",[["class","news-content col-xs-12 col-sm-8 col-md-8"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n              "])),(l()(),u["\u0275eld"](18,0,null,null,17,"div",[["class","content-wrapper"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n                "])),(l()(),u["\u0275eld"](20,0,null,null,10,"div",[["class","title"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n                  "])),(l()(),u["\u0275eld"](22,0,null,null,1,"h1",[["class","new-title"]],null,null,null,null,null)),(l()(),u["\u0275ted"](23,null,["",""])),(l()(),u["\u0275ted"](-1,null,["\n                  "])),(l()(),u["\u0275eld"](25,0,null,null,4,"p",[],null,null,null,null,null)),(l()(),u["\u0275eld"](26,0,null,null,3,"span",[["class","time"]],null,null,null,null,null)),(l()(),u["\u0275eld"](27,0,null,null,0,"img",[["height","20"],["src","../../assets/img/time.png"],["style","margin-right: 10px"],["width","20"]],null,null,null,null,null)),(l()(),u["\u0275ted"](28,null,[" ",""])),u["\u0275ppd"](29,2),(l()(),u["\u0275ted"](-1,null,["\n                "])),(l()(),u["\u0275ted"](-1,null,["\n                "])),(l()(),u["\u0275eld"](32,0,null,null,2,"div",[["class","content"]],[[8,"innerHTML",1]],null,null,null,null)),u["\u0275ppd"](33,2),(l()(),u["\u0275ted"](-1,null,["\n                "])),(l()(),u["\u0275ted"](-1,null,["\n              "])),(l()(),u["\u0275ted"](-1,null,["\n            "])),(l()(),u["\u0275ted"](-1,null,["\n          "])),(l()(),u["\u0275ted"](-1,null,["\n\n        "])),(l()(),u["\u0275ted"](-1,null,["\n        "])),(l()(),u["\u0275eld"](40,0,null,null,49,"div",[["class","col-md-4 clearSmPadding"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n          "])),(l()(),u["\u0275eld"](42,0,null,null,46,"div",[["class","list-right clearfix"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n            "])),(l()(),u["\u0275eld"](44,0,null,null,43,"div",[["class","col-sm-12 clearPadding"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n              "])),(l()(),u["\u0275eld"](46,0,null,null,4,"div",[["class","title text-overflow title-center"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n                "])),(l()(),u["\u0275eld"](48,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),u["\u0275ted"](49,null,["",""])),(l()(),u["\u0275ted"](-1,null,["\n              "])),(l()(),u["\u0275ted"](-1,null,["\n              "])),(l()(),u["\u0275eld"](52,0,null,null,34,"div",[["class","list-content clearfix"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n                "])),(l()(),u["\u0275eld"](54,0,null,null,31,"ul",[["class","list-unstyled clearfix"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n                  "])),(l()(),u["\u0275eld"](56,0,null,null,8,"li",[["class","text-left col-xs-4 text-overflow"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n                    "])),(l()(),u["\u0275eld"](58,0,null,null,2,"p",[["class","text"]],null,null,null,null,null)),(l()(),u["\u0275ted"](59,null,["",""])),u["\u0275pid"](131072,o.a,[a.a,u.ChangeDetectorRef]),(l()(),u["\u0275ted"](-1,null,["\n                    "])),(l()(),u["\u0275eld"](62,0,null,null,1,"span",[["class","number"]],null,null,null,null,null)),(l()(),u["\u0275ted"](63,null,["",""])),(l()(),u["\u0275ted"](-1,null,["\n                  "])),(l()(),u["\u0275ted"](-1,null,["\n\n                  "])),(l()(),u["\u0275eld"](66,0,null,null,8,"li",[["class","text-center col-xs-4 text-overflow"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n                    "])),(l()(),u["\u0275eld"](68,0,null,null,2,"p",[["class","text"]],null,null,null,null,null)),(l()(),u["\u0275ted"](69,null,["",""])),u["\u0275pid"](131072,o.a,[a.a,u.ChangeDetectorRef]),(l()(),u["\u0275ted"](-1,null,["\n                    "])),(l()(),u["\u0275eld"](72,0,null,null,1,"span",[["class","number"]],null,null,null,null,null)),(l()(),u["\u0275ted"](73,null,["",""])),(l()(),u["\u0275ted"](-1,null,["\n                  "])),(l()(),u["\u0275ted"](-1,null,["\n                  "])),(l()(),u["\u0275eld"](76,0,null,null,8,"li",[["class","text-center col-xs-4 text-overflow"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n                    "])),(l()(),u["\u0275eld"](78,0,null,null,2,"p",[["class","text"]],null,null,null,null,null)),(l()(),u["\u0275ted"](79,null,["",""])),u["\u0275pid"](131072,o.a,[a.a,u.ChangeDetectorRef]),(l()(),u["\u0275ted"](-1,null,["\n                    "])),(l()(),u["\u0275eld"](82,0,null,null,1,"span",[["class","number"]],null,null,null,null,null)),(l()(),u["\u0275ted"](83,null,["",""])),(l()(),u["\u0275ted"](-1,null,["\n                  "])),(l()(),u["\u0275ted"](-1,null,["\n                "])),(l()(),u["\u0275ted"](-1,null,["\n              "])),(l()(),u["\u0275ted"](-1,null,["\n            "])),(l()(),u["\u0275ted"](-1,null,["\n          "])),(l()(),u["\u0275ted"](-1,null,["\n        "])),(l()(),u["\u0275ted"](-1,null,["\n        "])),(l()(),u["\u0275ted"](-1,null,["\n      "]))],function(l,n){l(n,1,0,l(n,2,0,"/coc-show",null==n.context.$implicit?null:null==n.context.$implicit.coc?null:n.context.$implicit.coc.id,"news",null==n.context.$implicit?null:n.context.$implicit.id,"detail"))},function(l,n){l(n,12,0,null==n.context.$implicit?null:null==n.context.$implicit.cover?null:n.context.$implicit.cover.url),l(n,23,0,n.context.$implicit.title),l(n,28,0,u["\u0275unv"](n,28,0,l(n,29,0,u["\u0275nov"](n.parent,0),n.context.$implicit.createdAt,"yyyy-MM-dd"))),l(n,32,0,u["\u0275unv"](n,32,0,l(n,33,0,u["\u0275nov"](n.parent,1),n.context.$implicit.content,50))),l(n,49,0,null==n.context.$implicit?null:null==n.context.$implicit.coc?null:n.context.$implicit.coc.name),l(n,59,0,u["\u0275unv"](n,59,0,u["\u0275nov"](n,60).transform("cocShow.navbar.scale"))),l(n,63,0,null==n.context.$implicit?null:null==n.context.$implicit.coc?null:n.context.$implicit.coc.scale),l(n,69,0,u["\u0275unv"](n,69,0,u["\u0275nov"](n,70).transform("cocShow.navbar.industry"))),l(n,73,0,null==n.context.$implicit?null:null==n.context.$implicit.coc?null:null==n.context.$implicit.coc.industry?null:n.context.$implicit.coc.industry.name),l(n,79,0,u["\u0275unv"](n,79,0,u["\u0275nov"](n,80).transform("cocShow.news.views"))),l(n,83,0,null==n.context.$implicit?null:n.context.$implicit.view)})}function P(l){return u["\u0275vid"](0,[u["\u0275pid"](0,d.DatePipe,[u.LOCALE_ID]),u["\u0275pid"](0,s.a,[]),(l()(),u["\u0275eld"](2,0,null,null,1,"app-home-navbar",[],null,null,null,c.b,c.a)),u["\u0275did"](3,114688,null,0,r.a,[a.a,p.a,i.k],null,null),(l()(),u["\u0275ted"](-1,null,["\n"])),(l()(),u["\u0275eld"](5,0,null,null,65,"div",[["class","news-message"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n  "])),(l()(),u["\u0275eld"](7,0,null,null,62,"div",[["class","container"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n    "])),(l()(),u["\u0275eld"](9,0,null,null,11,"div",[["class","row clearfix"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n      "])),(l()(),u["\u0275eld"](11,0,null,null,8,"div",[["class","header clearfix"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n        "])),(l()(),u["\u0275eld"](13,0,null,null,5,"div",[["class","col-sm-12"],["style","padding-left: 0"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n          "])),(l()(),u["\u0275eld"](15,0,null,null,2,"h4",[],null,null,null,null,null)),(l()(),u["\u0275ted"](16,null,["",""])),u["\u0275pid"](131072,o.a,[a.a,u.ChangeDetectorRef]),(l()(),u["\u0275ted"](-1,null,["\n        "])),(l()(),u["\u0275ted"](-1,null,["\n      "])),(l()(),u["\u0275ted"](-1,null,["\n    "])),(l()(),u["\u0275ted"](-1,null,["\n    "])),(l()(),u["\u0275eld"](22,0,null,null,9,"div",[],[[8,"hidden",0]],null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n      "])),(l()(),u["\u0275eld"](24,0,null,null,6,"div",[["class","text-center pt-3 pb-3"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n        "])),(l()(),u["\u0275eld"](26,0,null,null,3,"div",[["class","pt-3 pb-3"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n          "])),(l()(),u["\u0275eld"](28,0,null,null,0,"i",[["class","loading-img"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n        "])),(l()(),u["\u0275ted"](-1,null,["\n      "])),(l()(),u["\u0275ted"](-1,null,["\n    "])),(l()(),u["\u0275ted"](-1,null,["\n\n    "])),(l()(),u["\u0275eld"](33,0,null,null,10,"div",[["class","row clearfix"]],[[8,"hidden",0]],null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n      "])),(l()(),u["\u0275eld"](35,0,null,null,7,"div",[["class","col-sm-12 no_message no_coc text-center"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n        "])),(l()(),u["\u0275eld"](37,0,null,null,0,"img",[["height","120"],["src","../../../../assets/img/no_activity.png"],["width","120"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n        "])),(l()(),u["\u0275eld"](39,0,null,null,2,"p",[],null,null,null,null,null)),(l()(),u["\u0275ted"](40,null,[" ",""])),u["\u0275pid"](131072,o.a,[a.a,u.ChangeDetectorRef]),(l()(),u["\u0275ted"](-1,null,["\n      "])),(l()(),u["\u0275ted"](-1,null,["\n    "])),(l()(),u["\u0275ted"](-1,null,["\n\n\n    "])),(l()(),u["\u0275eld"](45,0,null,null,4,"div",[["class","news-mesasge-container"]],[[8,"hidden",0]],null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n      "])),(l()(),u["\u0275and"](16777216,null,null,1,null,M)),u["\u0275did"](48,802816,null,0,d.NgForOf,[u.ViewContainerRef,u.TemplateRef,u.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),u["\u0275ted"](-1,null,["\n    "])),(l()(),u["\u0275ted"](-1,null,["\n\n    "])),(l()(),u["\u0275eld"](51,0,null,null,17,"div",[["class","coc-pagination  row clearfix"]],[[8,"hidden",0]],null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n      "])),(l()(),u["\u0275eld"](53,0,null,null,14,"div",[["class","col-md-offset-3 col-md-6 col-md-offset-3"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n        "])),(l()(),u["\u0275eld"](55,0,null,null,11,"div",[["class","pagination-wrapper center-block"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["\n          "])),(l()(),u["\u0275eld"](57,0,null,null,8,"pagination",[],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"pageChanged"]],function(l,n,e){var u=!0,t=l.component;return"ngModelChange"===n&&(u=!1!==(t.filter.page=e)&&u),"pageChanged"===n&&(u=!1!==t.pageChanged(e)&&u),u},x.b,x.a)),u["\u0275did"](58,114688,null,0,C.a,[u.Renderer2,u.ElementRef,b.a,u.ChangeDetectorRef],{previousText:[0,"previousText"],nextText:[1,"nextText"],itemsPerPage:[2,"itemsPerPage"],totalItems:[3,"totalItems"]},{pageChanged:"pageChanged"}),u["\u0275pid"](131072,o.a,[a.a,u.ChangeDetectorRef]),u["\u0275pid"](131072,o.a,[a.a,u.ChangeDetectorRef]),u["\u0275prd"](1024,null,y.NG_VALUE_ACCESSOR,function(l){return[l]},[C.a]),u["\u0275did"](62,671744,null,0,y.NgModel,[[8,null],[8,null],[8,null],[2,y.NG_VALUE_ACCESSOR]],{model:[0,"model"]},{update:"ngModelChange"}),u["\u0275prd"](2048,null,y.NgControl,null,[y.NgModel]),u["\u0275did"](64,16384,null,0,y.NgControlStatus,[y.NgControl],null,null),(l()(),u["\u0275ted"](-1,null,["\n          "])),(l()(),u["\u0275ted"](-1,null,["\n        "])),(l()(),u["\u0275ted"](-1,null,["\n      "])),(l()(),u["\u0275ted"](-1,null,["\n    "])),(l()(),u["\u0275ted"](-1,null,["\n\n  "])),(l()(),u["\u0275ted"](-1,null,["\n"])),(l()(),u["\u0275ted"](-1,null,["\n"]))],function(l,n){var e=n.component;l(n,3,0),l(n,48,0,e.news),l(n,58,0,u["\u0275unv"](n,58,0,u["\u0275nov"](n,59).transform("button.prev_page")),u["\u0275unv"](n,58,1,u["\u0275nov"](n,60).transform("button.next_page")),e.filter.limit,e.meta.pagination.totalCount),l(n,62,0,e.filter.page)},function(l,n){var e=n.component;l(n,16,0,u["\u0275unv"](n,16,0,u["\u0275nov"](n,17).transform("navbar.news_list"))),l(n,22,0,!e.tableLoading),l(n,33,0,!(0===(null==e.news?null:e.news.length)&&!e.tableLoading)),l(n,40,0,u["\u0275unv"](n,40,0,u["\u0275nov"](n,41).transform("cocShow.home.no_coc_news"))),l(n,45,0,!((null==e.news?null:e.news.length)>0&&!e.tableLoading)),l(n,51,0,!((null==e.news?null:e.news.length)>0&&!e.tableLoading)),l(n,57,0,u["\u0275nov"](n,64).ngClassUntouched,u["\u0275nov"](n,64).ngClassTouched,u["\u0275nov"](n,64).ngClassPristine,u["\u0275nov"](n,64).ngClassDirty,u["\u0275nov"](n,64).ngClassValid,u["\u0275nov"](n,64).ngClassInvalid,u["\u0275nov"](n,64).ngClassPending)})}var S=u["\u0275ccf"]("ng-component",w,function(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"ng-component",[],null,null,null,P,_)),u["\u0275did"](1,376832,null,0,w,[p.a,g.a,a.a],null,null)],function(l,n){l(n,1,0)},null)},{},{},[]),R=e("z4U6"),$=e("IH/J"),L=e("1CsO"),D=e("UmVs"),F=e("4d2I"),N=function(){},k=e("NuOl"),O=e("h+R6"),E=e("smdU"),I=e("VHo9"),T=e("e1Eq"),A=e("sE+a"),U=e("PYag"),V=e("sdP6"),H=e("PMsB"),j=e("bigA");e.d(n,"NewsListModuleNgFactory",function(){return z});var z=u["\u0275cmf"](t,[],function(l){return u["\u0275mod"]([u["\u0275mpd"](512,u.ComponentFactoryResolver,u["\u0275CodegenComponentFactoryResolver"],[[8,[S,R.a,$.a]],[3,u.ComponentFactoryResolver],u.NgModuleRef]),u["\u0275mpd"](4608,d.NgLocalization,d.NgLocaleLocalization,[u.LOCALE_ID]),u["\u0275mpd"](4608,y["\u0275i"],y["\u0275i"],[]),u["\u0275mpd"](4608,y.FormBuilder,y.FormBuilder,[]),u["\u0275mpd"](4608,L.a,L.a,[]),u["\u0275mpd"](4608,D.a,D.a,[]),u["\u0275mpd"](4608,p.a,p.a,[F.a]),u["\u0275mpd"](512,i.o,i.o,[[2,i.t],[2,i.k]]),u["\u0275mpd"](512,N,N,[]),u["\u0275mpd"](512,d.CommonModule,d.CommonModule,[]),u["\u0275mpd"](512,y["\u0275ba"],y["\u0275ba"],[]),u["\u0275mpd"](512,y.FormsModule,y.FormsModule,[]),u["\u0275mpd"](512,y.ReactiveFormsModule,y.ReactiveFormsModule,[]),u["\u0275mpd"](512,v.a,v.a,[]),u["\u0275mpd"](512,k.a,k.a,[]),u["\u0275mpd"](512,O.a,O.a,[]),u["\u0275mpd"](512,E.a,E.a,[]),u["\u0275mpd"](512,I.SelectModule,I.SelectModule,[]),u["\u0275mpd"](512,T.a,T.a,[]),u["\u0275mpd"](512,A.a,A.a,[]),u["\u0275mpd"](512,U.CustomFormsModule,U.CustomFormsModule,[]),u["\u0275mpd"](512,V.a,V.a,[]),u["\u0275mpd"](512,H.a,H.a,[]),u["\u0275mpd"](512,j.a,j.a,[]),u["\u0275mpd"](512,t,t,[]),u["\u0275mpd"](1024,i.i,function(){return[[{path:"",component:w}]]},[])])})}});