(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-795651cc"],{"2b0a":function(e,t,r){},6861:function(e,t,r){"use strict";var a=r("2b0a"),l=r.n(a);l.a},e8aa:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"publish-container"},[r("el-card",[r("div",{attrs:{slot:"header"},slot:"header"},[r("my-breadcrumb",[e._v("发布文章")])],1),r("el-form",{ref:"form",attrs:{rules:e.rules,model:e.article,"label-width":"80px"}},[r("el-form-item",{attrs:{label:"标题",prop:"title"}},[r("el-input",{model:{value:e.article.title,callback:function(t){e.$set(e.article,"title","string"===typeof t?t.trim():t)},expression:"article.title"}})],1),r("el-form-item",{attrs:{label:"内容",prop:"content"}},[r("quill-editor",{attrs:{options:e.editorOption},model:{value:e.article.content,callback:function(t){e.$set(e.article,"content",t)},expression:"article.content"}})],1),r("el-form-item",{attrs:{label:"封面"}},[r("el-radio-group",{model:{value:e.article.cover.type,callback:function(t){e.$set(e.article.cover,"type",t)},expression:"article.cover.type"}},[r("el-radio",{attrs:{label:1}},[e._v("单图")]),r("el-radio",{attrs:{label:3}},[e._v("三图")]),r("el-radio",{attrs:{label:0}},[e._v("无图")]),r("el-radio",{attrs:{label:-1}},[e._v("自动")])],1)],1),e.article.cover.type>0?r("el-form-item",{attrs:{label:""}},[r("el-row",{attrs:{gutter:10}},e._l(e.article.cover.type,(function(t,a){return r("el-col",{key:a,attrs:{xs:8,sm:6,md:6,lg:4}},[e._v(" "+e._s(a)),r("my-cover",{model:{value:e.article.cover.images[a],callback:function(t){e.$set(e.article.cover.images,a,t)},expression:"article.cover.images[idx]"}})],1)})),1)],1):e._e(),r("vmodel1",{model:{value:e.article.channel_id,callback:function(t){e.$set(e.article,"channel_id",t)},expression:"article.channel_id"}}),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.hAddArticle(!1)}}},[e._v("发表")]),r("el-button",{on:{click:function(t){return e.hAddArticle(!0)}}},[e._v("存入草稿")])],1)],1)],1)],1)},l=[],n=(r("96cf"),r("1da1")),c=r("663f"),i=(r("a753"),r("8096"),r("14e1"),r("953d")),o=r("c20d"),s=r("8691"),u=r("b1d5"),d={name:"AddArticle",props:{},components:{MyBreadcrumb:c["a"],quillEditor:i["quillEditor"],MyCover:u["a"],vmodel1:o["a"]},data:function(){return{rules:{title:[{required:!0,message:"请输入文章标题",trigger:"blur"},{min:5,max:30,message:"长度在5到30之间",trigger:"blur"}],content:[{required:!0,message:"请输入文章内容",trigger:"blur"},{min:20,max:3e4,message:"最少20个字",trigger:"blur"}],channel_id:[{required:!0,message:"请选择文章频道",trigger:"blur"}]},channels:[],article:{title:"",content:"",cover:{type:0,images:[]},channel_id:""},editorOption:{placeholder:"",modules:{toolbar:[["bold","italic"],["blockquote","code-block"],[{header:1},{header:2}],[{list:"ordered"},{list:"bullet"}],[{indent:"-1"},{indent:"+1"}],["image"]]}}}},computed:{},created:function(){this.loadChannels()},methods:{loadChannels:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,Object(s["d"])();case 3:r=t.sent,e.channels=r.data.data.channels,t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](0),console.log(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()},hAddArticle:function(e){var t=this;this.$refs.form.validate(function(){var r=Object(n["a"])(regeneratorRuntime.mark((function r(a){var l;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:if(!a){r.next=17;break}return r.prev=1,r.next=4,Object(s["a"])(e,t.article);case 4:l=r.sent,console.log(l),t.$message.success("发布成功"),t.article.title="",t.article.content="",r.next=15;break;case 11:r.prev=11,r.t0=r["catch"](1),console.log(r.t0),t.$message.error("发布失败");case 15:r.next=18;break;case 17:return r.abrupt("return",!1);case 18:case"end":return r.stop()}}),r,null,[[1,11]])})));return function(e){return r.apply(this,arguments)}}())}}},m=d,p=(r("6861"),r("2877")),b=Object(p["a"])(m,a,l,!1,null,"06980296",null);t["default"]=b.exports}}]);
//# sourceMappingURL=chunk-795651cc.7332d1c0.js.map