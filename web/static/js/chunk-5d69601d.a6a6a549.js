(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5d69601d"],{"0dd5":function(e,t,a){},"49b7":function(e,t,a){"use strict";var l=a("997b"),o=a.n(l);o.a},"7afe":function(e,t,a){"use strict";var l=a("0dd5"),o=a.n(l);o.a},"997b":function(e,t,a){},"9a8b":function(e,t,a){"use strict";var l=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-form",{ref:"postForm",attrs:{model:e.postForm,rules:e.rules}},[a("sticky",{attrs:{"sticky-top":84,"class-name":"sub-navbar"}},[e.isEdit?e._e():a("el-button",{on:{click:e.showGuide}},[e._v("显示帮助")]),e._v(" "),a("el-button",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{"margin-left":"10px"},attrs:{type:"success"},on:{click:e.submitForm}},[e._v(e._s(e.isEdit?"编辑电子书":"新增电子书"))])],1),e._v(" "),a("div",{staticClass:"detail-container"},[a("el-row",[a("warning"),e._v(" "),a("el-col",{attrs:{span:24}},[a("ebook-upload",{attrs:{"file-list":e.fileList,disabled:e.isEdit},on:{onSuccess:e.onUploadSuccess,onRemove:e.onUploadRemove}})],1),e._v(" "),a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{prop:"title"}},[a("MDinput",{attrs:{maxlength:100,name:"name",required:""},model:{value:e.postForm.title,callback:function(t){e.$set(e.postForm,"title",t)},expression:"postForm.title"}},[e._t("default",[e._v("书名")])],2)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{prop:"author",label:"作者：","label-width":e.lableWidth}},[a("el-input",{attrs:{placeholder:"作者"},model:{value:e.postForm.author,callback:function(t){e.$set(e.postForm,"author",t)},expression:"postForm.author"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{prop:"publisher",label:"出版社：","label-width":e.lableWidth}},[a("el-input",{attrs:{placeholder:"出版社"},model:{value:e.postForm.publisher,callback:function(t){e.$set(e.postForm,"publisher",t)},expression:"postForm.publisher"}})],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{prop:"language",label:"语言：","label-width":e.lableWidth}},[a("el-input",{attrs:{placeholder:"语言"},model:{value:e.postForm.language,callback:function(t){e.$set(e.postForm,"language",t)},expression:"postForm.language"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{prop:"rootFile",label:"根文件：","label-width":e.lableWidth}},[a("el-input",{attrs:{placeholder:"根文件",disabled:""},model:{value:e.postForm.rootFile,callback:function(t){e.$set(e.postForm,"rootFile",t)},expression:"postForm.rootFile"}})],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{prop:"filePath",label:"文件路径：","label-width":e.lableWidth}},[a("el-input",{attrs:{placeholder:"文件路径",disabled:""},model:{value:e.postForm.filePath,callback:function(t){e.$set(e.postForm,"filePath",t)},expression:"postForm.filePath"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{prop:"unzipPath",label:"解压路径：","label-width":e.lableWidth}},[a("el-input",{attrs:{placeholder:"解压路径",disabled:""},model:{value:e.postForm.unzipPath,callback:function(t){e.$set(e.postForm,"unzipPath",t)},expression:"postForm.unzipPath"}})],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{prop:"coverPath",label:"封面路径：","label-width":e.lableWidth}},[a("el-input",{attrs:{placeholder:"封面路径",disabled:""},model:{value:e.postForm.coverPath,callback:function(t){e.$set(e.postForm,"coverPath",t)},expression:"postForm.coverPath"}})],1)],1),e._v(" "),a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{prop:"originalName",label:"文件名称：","label-width":e.lableWidth}},[a("el-input",{attrs:{placeholder:"文件名称",disabled:""},model:{value:e.postForm.originalName,callback:function(t){e.$set(e.postForm,"originalName",t)},expression:"postForm.originalName"}})],1)],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{prop:"cover",label:"封面：","label-width":e.lableWidth}},[e.postForm.cover?a("a",{attrs:{href:e.postForm.cover,target:"_blank"}},[a("img",{staticClass:"preview-img",attrs:{src:e.postForm.cover,alt:""}})]):a("span",[e._v("无")])])],1)],1),e._v(" "),a("el-row",[a("el-col",{attrs:{span:24}},[a("el-form-item",{attrs:{label:"目录：","label-width":e.lableWidth}},[e.contentsTree&&e.contentsTree.length>0?a("div",{staticClass:"content-wrapper"},[a("el-tree",{attrs:{data:e.contentsTree},on:{"node-click":e.onContentClick}})],1):a("span",[e._v("无")])])],1)],1)],1)],1)],1)],1)},o=[],n=(a("5ab2"),a("6d57"),a("e10e"),a("b081")),i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{style:{height:e.height+"px",zIndex:e.zIndex}},[a("div",{class:e.className,style:{top:e.isSticky?e.stickyTop+"px":"",zIndex:e.zIndex,position:e.position,width:e.width,height:e.height+"px"}},[e._t("default",[a("div",[e._v("sticky")])])],2)])},r=[],s=(a("163d"),{name:"Sticky",props:{stickyTop:{type:Number,default:0},zIndex:{type:Number,default:1},className:{type:String,default:""}},data:function(){return{active:!1,position:"",width:void 0,height:void 0,isSticky:!1}},mounted:function(){this.height=this.$el.getBoundingClientRect().height,window.addEventListener("scroll",this.handleScroll),window.addEventListener("resize",this.handleResize)},activated:function(){this.handleScroll()},destroyed:function(){window.removeEventListener("scroll",this.handleScroll),window.removeEventListener("resize",this.handleResize)},methods:{sticky:function(){this.active||(this.position="fixed",this.active=!0,this.width=this.width+"px",this.isSticky=!0)},handleReset:function(){this.active&&this.reset()},reset:function(){this.position="",this.width="auto",this.active=!1,this.isSticky=!1},handleScroll:function(){var e=this.$el.getBoundingClientRect().width;this.width=e||"auto";var t=this.$el.getBoundingClientRect().top;t<this.stickyTop?this.sticky():this.handleReset()},handleResize:function(){this.isSticky&&(this.width=this.$el.getBoundingClientRect().width+"px")}}}),u=s,c=a("e90a"),d=Object(c["a"])(u,i,r,!1,null,null,null),p=d.exports,m=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"upload-container"},[a("el-upload",{staticClass:"image-upload",attrs:{action:e.action,headers:e.headers,multiple:!1,limit:1,"before-upload":e.beforeUpload,"on-success":e.onSuccess,"on-error":e.onError,"on-remove":e.onRemove,"file-list":e.fileList,"on-exceed":e.onExceed,disabled:e.disabled,drag:"","show-file-list":"",accept:"application/epub+zip"}},[a("i",{staticClass:"el-icon-upload"}),e._v(" "),0===e.fileList.length?a("div",{staticClass:"el-upload__text"},[e._v("将电子书拖入或"),a("em",[e._v("点击上传")])]):a("div",{staticClass:"el-upload__text"},[e._v("图书已上传")])])],1)},h=[],f=a("5f87"),v={props:{fileList:{type:Array,default:function(){return[]}},disabled:{type:Boolean,default:!1}},data:function(){return{action:"".concat("http://47.115.35.86:5000","/book/upload")}},computed:{headers:function(){return{Authorization:"Bearer ".concat(Object(f["a"])())}}},methods:{beforeUpload:function(e){this.$emit("beforeUpload",e)},onSuccess:function(e,t){this.log(e,t);var a=e.code,l=e.msg,o=e.data;0===a&&(this.$message({message:l,type:"success"}),this.$emit("onSuccess",o))},onError:function(e){this.log({err:e});var t=e.message&&JSON.parse(e.message);this.$message({message:t&&t.msg&&"上传失败，失败原因：".concat(t.msg)||"上传失败",type:"error"}),this.$emit("onError",e)},onRemove:function(){this.$message({message:"电子书删除成功",type:"success"}),this.$emit("onRemove")},onExceed:function(){this.$message({message:"每次只能上传一本电子书",type:"warning"})}}},b=v,g=Object(c["a"])(b,m,h,!1,null,"a6accde0",null),y=g.exports,_=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"material-input__component",class:e.computedClasses},[a("div",{class:{iconClass:e.icon}},[e.icon?a("i",{staticClass:"el-input__icon material-input__icon",class:["el-icon-"+e.icon]}):e._e(),e._v(" "),"email"===e.type?a("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],staticClass:"material-input",attrs:{name:e.name,placeholder:e.fillPlaceHolder,readonly:e.readonly,disabled:e.disabled,autocomplete:e.autoComplete,required:e.required,type:"email"},domProps:{value:e.currentValue},on:{focus:e.handleMdFocus,blur:e.handleMdBlur,input:[function(t){t.target.composing||(e.currentValue=t.target.value)},e.handleModelInput]}}):e._e(),e._v(" "),"url"===e.type?a("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],staticClass:"material-input",attrs:{name:e.name,placeholder:e.fillPlaceHolder,readonly:e.readonly,disabled:e.disabled,autocomplete:e.autoComplete,required:e.required,type:"url"},domProps:{value:e.currentValue},on:{focus:e.handleMdFocus,blur:e.handleMdBlur,input:[function(t){t.target.composing||(e.currentValue=t.target.value)},e.handleModelInput]}}):e._e(),e._v(" "),"number"===e.type?a("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],staticClass:"material-input",attrs:{name:e.name,placeholder:e.fillPlaceHolder,step:e.step,readonly:e.readonly,disabled:e.disabled,autocomplete:e.autoComplete,max:e.max,min:e.min,minlength:e.minlength,maxlength:e.maxlength,required:e.required,type:"number"},domProps:{value:e.currentValue},on:{focus:e.handleMdFocus,blur:e.handleMdBlur,input:[function(t){t.target.composing||(e.currentValue=t.target.value)},e.handleModelInput]}}):e._e(),e._v(" "),"password"===e.type?a("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],staticClass:"material-input",attrs:{name:e.name,placeholder:e.fillPlaceHolder,readonly:e.readonly,disabled:e.disabled,autocomplete:e.autoComplete,max:e.max,min:e.min,required:e.required,type:"password"},domProps:{value:e.currentValue},on:{focus:e.handleMdFocus,blur:e.handleMdBlur,input:[function(t){t.target.composing||(e.currentValue=t.target.value)},e.handleModelInput]}}):e._e(),e._v(" "),"tel"===e.type?a("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],staticClass:"material-input",attrs:{name:e.name,placeholder:e.fillPlaceHolder,readonly:e.readonly,disabled:e.disabled,autocomplete:e.autoComplete,required:e.required,type:"tel"},domProps:{value:e.currentValue},on:{focus:e.handleMdFocus,blur:e.handleMdBlur,input:[function(t){t.target.composing||(e.currentValue=t.target.value)},e.handleModelInput]}}):e._e(),e._v(" "),"text"===e.type?a("input",{directives:[{name:"model",rawName:"v-model",value:e.currentValue,expression:"currentValue"}],staticClass:"material-input",attrs:{name:e.name,placeholder:e.fillPlaceHolder,readonly:e.readonly,disabled:e.disabled,autocomplete:e.autoComplete,minlength:e.minlength,maxlength:e.maxlength,required:e.required,type:"text"},domProps:{value:e.currentValue},on:{focus:e.handleMdFocus,blur:e.handleMdBlur,input:[function(t){t.target.composing||(e.currentValue=t.target.value)},e.handleModelInput]}}):e._e(),e._v(" "),a("span",{staticClass:"material-input-bar"}),e._v(" "),a("label",{staticClass:"material-label"},[e._t("default")],2)])])},w=[],F={name:"MdInput",props:{icon:String,name:String,type:{type:String,default:"text"},value:[String,Number],placeholder:String,readonly:Boolean,disabled:Boolean,min:String,max:String,step:String,minlength:Number,maxlength:Number,required:{type:Boolean,default:!0},autoComplete:{type:String,default:"off"},validateEvent:{type:Boolean,default:!0}},data:function(){return{currentValue:this.value,focus:!1,fillPlaceHolder:null}},computed:{computedClasses:function(){return{"material--active":this.focus,"material--disabled":this.disabled,"material--raised":Boolean(this.focus||this.currentValue)}}},watch:{value:function(e){this.currentValue=e}},methods:{handleModelInput:function(e){var t=e.target.value;this.$emit("input",t),"ElFormItem"===this.$parent.$options.componentName&&this.validateEvent&&this.$parent.$emit("el.form.change",[t]),this.$emit("change",t)},handleMdFocus:function(e){this.focus=!0,this.$emit("focus",e),this.placeholder&&""!==this.placeholder&&(this.fillPlaceHolder=this.placeholder)},handleMdBlur:function(e){this.focus=!1,this.$emit("blur",e),this.fillPlaceHolder=null,"ElFormItem"===this.$parent.$options.componentName&&this.validateEvent&&this.$parent.$emit("el.form.blur",[this.currentValue])}}},x=F,k=(a("49b7"),Object(c["a"])(x,_,w,!1,null,"9d7baaf6",null)),$=k.exports,P=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},C=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("aside",[e._v("\n  上传电子书分为两步：上传电子书和新增电子书。上传的电子书文件需是epub格式，上传成功后，表单中将自动填充电子书的各字段，\n  您只需要点击"),a("b",[e._v("新增电子书")]),e._v("即可完成对电子书的保存。\n")])}],O={},S=Object(c["a"])(O,P,C,!1,null,null,null),E=S.exports,j=a("b067");function N(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,l)}return a}function V(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?N(Object(a),!0).forEach((function(t){Object(n["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):N(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var M={title:"书名",author:"作者",publisher:"出版社",language:"语言"},B={components:{Sticky:p,EbookUpload:y,MDinput:$,Warning:E},props:{isEdit:Boolean},data:function(){var e=function(e,t,a){t&&0!==t.length?a():a(new Error(M[e.field]+"必须填写"))};return{loading:!1,postForm:{},fileList:[],lableWidth:"120px",rules:{title:[{validator:e}],author:[{validator:e}],publisher:[{validator:e}],language:[{validator:e}]},contentsTree:[]}},created:function(){if(this.isEdit){var e=this.$route.params.fileName;this.getBookData(e)}},methods:{getBookData:function(e){var t=this;Object(j["c"])(e).then((function(e){console.log(e),t.setData(e.data)}))},onContentClick:function(e){e&&e.text&&window.open(e.text)},setData:function(e){var t=e.title,a=e.author,l=e.publisher,o=e.language,n=e.rootFile,i=e.cover,r=e.url,s=e.originalName,u=e.contents,c=e.contentsTree,d=e.fileName,p=e.coverPath,m=e.filePath,h=e.unzipPath;this.postForm=V({},this.postForm,{title:t,author:a,publisher:l,language:o,rootFile:n,cover:i,url:r,originalName:s,contents:u,contentsTree:c,fileName:d,coverPath:p,filePath:m,unzipPath:h}),this.contentsTree=c,this.fileList=[{name:s||d,url:r}]},setDefault:function(){this.fileList=[],this.contentsTree=[],this.$refs.postForm.resetFields()},onUploadSuccess:function(e){this.log("onUploadSuccess",e),this.setData(e)},onUploadRemove:function(){this.setDefault()},showGuide:function(){this.log("show guide...")},submitForm:function(){var e=this,t=function(t){e.$notify({title:"操作成功",message:t,type:"success",duration:1500}),e.loading=!1};this.loading||(this.loading=!0,this.$refs.postForm.validate((function(a,l){if(a){var o=V({},e.postForm);delete o.contentsTree,e.isEdit?Object(j["f"])(o).then((function(e){t(e.msg)})).catch((function(t){console.log(t),e.loading=!1})):Object(j["a"])(o).then((function(a){t(a.msg),e.setDefault()})).catch((function(t){console.log(t),e.loading=!1}))}else{var n=l[Object.keys(l)[0]][0].message;e.$message({message:n,type:"error"}),e.loading=!1}})))}}},z=B,I=(a("7afe"),Object(c["a"])(z,l,o,!1,null,"3ba5fcc8",null));t["a"]=I.exports},b067:function(e,t,a){"use strict";a.d(t,"a",(function(){return o})),a.d(t,"f",(function(){return n})),a.d(t,"c",(function(){return i})),a.d(t,"d",(function(){return r})),a.d(t,"e",(function(){return s})),a.d(t,"b",(function(){return u}));var l=a("b775");function o(e){return Object(l["a"])({url:"/book/create",method:"post",data:e})}function n(e){return Object(l["a"])({url:"/book/update",method:"post",data:e})}function i(e){return Object(l["a"])({url:"/book/get",method:"get",params:{fileName:e}})}function r(){return Object(l["a"])({url:"/book/category",method:"get"})}function s(e){return Object(l["a"])({url:"/book/list",method:"get",params:e})}function u(e){return Object(l["a"])({url:"/book/delete",method:"get",params:{fileName:e}})}}}]);