(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0d22f23a"],{"0d24":function(e,t,a){},d270:function(e,t,a){"use strict";a("0d24")},e29a:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e._self._c;return t("div",[t("tree-select",{staticStyle:{width:"300px"},attrs:{"check-strictly":"","expand-all":!0,"load-data":e.loadData,data:e.treeData},on:{"on-change":e.handleTreeSelectChange,"on-toggle-expand":e.handleTreeSelectExpand,"on-check-change":e.handleTreeSelectCheckChange,"on-select-change":e.handleTreeSelectClick},model:{value:e.treeSelected,callback:function(t){e.treeSelected=t},expression:"treeSelected"}}),t("Button",{on:{click:e.changeTreeSelectData}},[e._v("更新选中数据")]),t("Button",{on:{click:e.changeTreeData}},[e._v("更新树数据")])],1)},c=[],i=function(){var e=this,t=e._self._c;return t("Select",e._b({ref:"select",staticClass:"tree-select",attrs:{multiple:""},on:{"on-change":e.handleChange}},"Select",e.$attrs,!1),[t("tree-select-tree-item",{attrs:{selectedArray:e.value,data:e.data,"load-data":e.loadData},on:{"on-clear":e.handleClear,"on-check":e.handleTreeCheck}})],1)},l=[];function r(e,t,a){this.$children.forEach(n=>{const c=n.$options.name;c===e?n.$emit.apply(n,[t].concat(a)):r.apply(n,[e,t].concat([a]))})}var h={methods:{dispatch(e,t,a){let n=this.$parent||this.$root,c=n.$options.name;while(n&&(!c||c!==e))n=n.$parent,n&&(c=n.$options.name);n&&n.$emit.apply(n,[t].concat(a))},broadcast(e,t,a){r.call(this,e,t,a)}}},o=function(){var e=this,t=e._self._c;return t("Tree",e._g(e._b({attrs:{data:e.data,"load-data":e.loadDataCallback,"show-checkbox":""},on:{"on-check-change":e.handleCheckSelect}},"Tree",e.parent.$attrs,!1),e.parent.$listeners))},d=[],s=(a("6762"),a("2fdb"),a("ac6a"),function(e,t){if(e.length!==t.length)return!1;for(var a=0;a<e.length;a++)if(e[a]!==t[a])return!1;return!0}),u={name:"TreeSelectTree",mixins:[h],props:{data:{type:Array,default:function(){return[]}},selectedArray:{type:Array,default:function(){return[]}},loadData:Function},data:function(){return{flatDic:{},checkedArray:[]}},inject:["parent"],computed:{expandAll:function(){return this.parent.$attrs["expand-all"]}},watch:{data:function(e,t){var a=this;this.updateFlagDic(e);var n=[];this.selectedArray.forEach((function(e){e in a.flatDic&&n.push(e)})),this.$emit("on-check",n.map((function(e){return a.flatDic[e]}))),this.expandAll&&this.checkData(e,!1,!0)},selectedArray:function(e,t){var a=this;if(!s(e,t)){var n=e.filter((function(e){return e in a.flatDic}));this.$emit("on-check",n.map((function(e){return a.flatDic[e]}))),this.$emit("on-clear"),this.$nextTick((function(){a.checkData(a.data,!0)}))}}},methods:{checkEmit:function(e,t){this.dispatch("iSelect","on-select-selected",{value:e,label:t}),this.$emit("on-select-selected",{value:e,label:t})},updateFlagDic:function(e){var t={};this.setFlagDic(e,(function(e){t[e.id]=e})),this.flatDic=t},setFlagDic:function(e,t){var a=this;e.forEach((function(e){e.children&&e.children.length&&a.setFlagDic(e.children,t),t(e)}))},handleCheckSelect:function(e,t){this.$emit("on-check",e),this.parent.$emit("on-change",e)},checkData:function(e,t,a){var n=this;e.forEach((function(e){n.selectedArray.includes(e.id)?(n.$set(e,"checked",!0),n.checkedArray.push(e),t&&n.checkEmit(e.id,e.title)):n.$set(e,"checked",!1),e.children&&e.children.length&&(n.expandAll&&a&&n.$set(e,"expand",!0),n.checkData(e.children,t,a))}))},loadDataCallback:function(e,t){var a=this;this.loadData(e,(function(e){return function(){t(e),a.updateFlagDic(a.data)}()}))}},mounted:function(){var e=this;this.checkData(this.data,!1,!0),this.$nextTick((function(){e.$emit("on-check",e.checkedArray)}))}},f=u,p=a("2877"),k=Object(p["a"])(f,o,d,!1,null,null,null),m=k.exports,g={name:"TreeSelect",mixins:[h],components:{TreeSelectTreeItem:m},props:{value:{type:Array,default:function(){return[]}},data:{type:Array,default:function(){return[]}},loadData:Function},data:function(){return{isChangedByTree:!0,isInit:!0}},provide:function(){return{parent:this}},methods:{handleChange:function(e){this.isChangedByTree||this.$emit("input",e),this.isChangedByTree=!1},handleTreeCheck:function(e){this.isChangedByTree=!0,this.$emit("input",e.map((function(e){return e.id})))},handleClear:function(){this.$refs.select.reset()}}},D=g,T=(a("d270"),Object(p["a"])(D,i,l,!1,null,null,null)),$=T.exports,v=[{id:"a",title:"a",children:[{id:"a1",title:"a-1",children:[{id:112,title:"1-1-2"},{id:"a12",title:"a-1-2"},{id:"a13",title:"a-1-3"},{id:"a14",title:"a-1-4"}]},{id:"a2",title:"a-2",children:[{id:"a21",title:"b-2-1"}]}]}],y=a("7e1e"),S={name:"tree_select_page",components:{TreeSelect:$},data:function(){return{treeSelected:[112,113],treeData:[]}},mounted:function(){var e=this;Object(y["d"])().then((function(t){var a=t.data;e.treeData=a}))},methods:{changeTreeSelectData:function(){this.treeSelected=[111,114]},changeTreeData:function(){this.treeData=v},handleTreeSelectChange:function(e){},handleTreeSelectExpand:function(e){},handleTreeSelectCheckChange:function(e,t){},handleTreeSelectClick:function(e,t){},loadData:function(e,t){setTimeout((function(){var e=[{id:111,title:"1-1-1"},{id:112,title:"1-1-2"},{id:113,title:"1-1-3"},{id:114,title:"1-1-4"}];t(e)}),1e3)}}},C=S,x=Object(p["a"])(C,n,c,!1,null,null,null);t["default"]=x.exports}}]);