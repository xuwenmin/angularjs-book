'use strict';

/*
  example:
  $scope.filePara = {
            url: 'data/upload-file.php', //上传地址
            isImage: false,       // 是否为图片
            isMultiple: true,    // 是否多选 
            responseData: {}    // 接收返回成功的值
        }
*/
// 上传公共服务
smartUI.factory('uploadService', ['$http', 'UtilTools',  function($http, UtilTools) {
    
    // return uploadTool;
    var _ = UtilTools._;
    
    var UploadFile = function(para){

        this.base64Files = [];                // 保存所有图片base64编码数据
        //this.fileInput = null,                //html file控件
        //this.dragDrop = null,                 //拖拽敏感区域
        //this.upButton = null,                 //提交按钮
        this.guid = '';                       // 标识对象的唯一性
        this.url = "";                       //ajax地址
        this.fileFilter = [];                 //过滤后的文件数组
        this.filter = function(files) {       //选择文件组的过滤方法
            var arrFiles = [];
            for (var i = 0, file; file = files[i]; i++) {
                arrFiles.push(file);
            }
            return arrFiles;   
        };
        this.onSelect = function() {},        //文件选择后
        this.onDelete = function() {},        //文件删除后
        this.onDragOver = function() {},      //文件拖拽到敏感区域时
        this.onDragLeave = function() {}, //文件离开到敏感区域时
        this.onProgress = function() {},      //文件上传进度
        this.onSuccess = function() {},       //文件上传成功时
        this.onFailure = function() {},       //文件上传失败时,
        this.onComplete = function() {},      //文件全部上传完毕时

        para && $.extend(this, para);

    };

    UploadFile.prototype = {
        getRoot: function(){
            return angular.element('[data-guid=' + this.guid + ']');
        },
        //文件拖放
        funDragHover: function(e) {
            e.stopPropagation();
            e.preventDefault();
            this[e.type === "dragover"? "onDragOver": "onDragLeave"].call(e.target);
            return this;
        },
        //获取选择文件，file控件或拖放
        funGetFiles: function(e) {
            // 取消鼠标经过样式
            this.funDragHover(e);
                    
            // 获取文件列表对象
            var files = e.target.files || e.dataTransfer.files;
            //继续添加文件
            this.fileFilter = this.fileFilter.concat(this.filter(files));
            this.funDealFiles();
            return this;
        },
        
        //选中文件的处理与回调
        funDealFiles: function() {
            for (var i = 0, file; file = this.fileFilter[i]; i++) {
                //增加唯一索引值
                file.index = UtilTools.guid();
            }
            //执行选择回调
            this.onSelect(this.fileFilter);
            return this;
        },
        
        //删除对应的文件
        funDeleteFile: function(fileDelete) {
            var fileName = fileDelete.name;
            var arrFile = [];
            this.base64Files = _.filter(this.base64Files, function(v){
                if(v.name != fileName){
                    return v;
                }
            });
            for (var i = 0, file; file = this.fileFilter[i]; i++) {
                if (file != fileDelete) {
                    arrFile.push(file);
                } else {
                    this.onDelete(fileDelete);  
                }
            }
            this.fileFilter = arrFile;
            return this;
        },

        funDeleteFileAll: function(){
            for(var i = 0;i<this.fileFilter.length;i++){
                 // console.log(this.fileFilter[i].index);
                 this.onDelete({ index: this.fileFilter[i].index});  
            }
            this.fileFilter = [];
            this.base64Files = [];
            return this;
        },
        
        //文件上传 利用formdata单个上传
        funUploadFile: function() {
            var self = this; 
            console.log(self);   
            if (location.host.indexOf("sitepointstatic") >= 0) {
                //非站点服务器上运行
                return; 
            }
            for (var i = 0, file; file = this.fileFilter[i]; i++) {
                (function(file) {
                    var xhr = new XMLHttpRequest();
                    if (xhr.upload) {
                        // 上传中
                        xhr.upload.addEventListener("progress", function(e) {
                            self.onProgress(file, e.loaded, e.total);
                        }, false);
            
                        // 文件上传成功或是失败
                        xhr.onreadystatechange = function(e) {
                            if (xhr.readyState == 4) {
                                if (xhr.status == 200) {
                                    self.onSuccess(file, xhr.responseText);
                                    self.funDeleteFile(file);
                                    if (!self.fileFilter.length) {
                                        //全部完毕
                                        self.onComplete();  
                                    }
                                } else {
                                    self.onFailure(file, xhr.responseText);     
                                }
                            }
                        };
                        // 开始上传
                        xhr.open("POST", self.url, true);
                        var formData = new FormData(); 
                        formData.append('fileData', file);
                        xhr.send(formData);
                    }   
                })(file);   
            }   
                
        },
        // 批量上传
        funUploadFileAll: function(){
            var self = this;    
            if (location.host.indexOf("sitepointstatic") >= 0) {
                //非站点服务器上运行
                return; 
            }
            var file = {
                index: 0
            };
            var xhr = new XMLHttpRequest();
            if (xhr.upload) {
                // 上传中
                xhr.upload.addEventListener("progress", function(e) {
                    self.onProgress(file, e.loaded, e.total);
                }, false);
    
                // 文件上传成功或是失败
                xhr.onreadystatechange = function(e) {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            self.onSuccess(file, xhr.responseText);
                            self.funDeleteFileAll();
                            self.onComplete();  
                        } else {
                            self.onFailure(file, xhr.responseText);     
                        }
                    }
                };
    
                // 开始上传
                xhr.open("POST", self.url, true);
                var formData = new FormData(); 

                formData.append('fileData', JSON.stringify(this.base64Files));
                xhr.send(formData);
            }
        },
        init: function() {
            var self = this;
            self.getRoot().delegate('.c_fileImage', 'change', function(e){
                self.funGetFiles(e);
            });

            self.getRoot().delegate('.c_fileSubmit', 'click', function(e){
                if(self.isImage){
                    self.funUploadFileAll(e);
                }else{
                    self.funUploadFile(e);
                } 
            });
            self.getRoot().delegate('.c_fileDragArea', 'dragover', function(e){
                self.funDragHover(e);
            });
            self.getRoot().delegate('.c_fileDragArea', 'dragleave', function(e){
                self.funDragHover(e);
            });
            self.getRoot().find('.c_fileDragArea').length && self.getRoot().find('.c_fileDragArea')[0].addEventListener('drop', function(e){
                console.log(e);
                self.funGetFiles(e);
            });
        }
    };

    // 返回创建上传类的方法
    return {
        create: function(para){
            return new UploadFile(para);
        },
        comitUpload: function(){
            $('.c_fileSubmit').each(function(){
                if($(this).is(':visible')){
                    $(this).trigger('click');
                };
            });
        }
    };

}])
.directive('uploadFile',['uploadService','UtilTools', '$timeout',  function(uploadService, UtilTools, $timeout){
    return {
       restrict: 'EA',
       replace: true,
       scope:{
           filePara: '=filePara'
       },
       templateUrl: 'tmpl/upload.html',
       link:function(scope,element,attrs,ctrl){

            var guid = UtilTools.guid();
            scope.guid = guid;  
            console.log(scope);
            var _ = UtilTools._; // underscore
            var noop = function(){};
            var params = {
                isImage: scope.filePara.isImage,
                guid: guid,
                url: scope.filePara.url,
                onSelect: function(files) {
                      var self = this;
                      var html = '', i = 0;
                      self.getRoot().find(".c_filePreview").html('<div class="upload_loading"></div>');
                      var funAppendImage = function() {
                            var file = files[i];
                            if (file) {
                                var reader = new FileReader();
                                reader.onload = function(e) {
                                    if(scope.filePara.isImage){
                                        html = html + '<div id="uploadList_'+ file.index +'" class="upload_append_list"><p><strong>' + file.name + '</strong>'+ 
                                          '<a href="javascript:" class="upload_delete" title="删除" data-index="'+ i +'">删除</a>' +
                                          '<img id="uploadImage_' + file.index + '" src="' + e.target.result + '" class="upload_image" /></p>'+ 
                                          '<span id="uploadProgress_' + file.index + '" class="upload_progress"></span>' +
                                        '</div>';
                                    }else{
                                        html = html + '<div id="uploadList_'+ file.index +'" class="upload_append_list upload_append_file"><p><strong>' + file.name + '</strong>'+ 
                                          '<a href="javascript:" class="upload_delete" title="删除" data-index="'+ i +'">删除</a></p>' +
                                          '<span id="uploadProgress_' + file.index + '" class="upload_progress"></span>' +
                                        '</div>';
                                    }
                                    console.log(html);
                                    if(_.filter(self.base64Files, function(v){
                                        return v['name'] != file.name;
                                    })){
                                        var obj = {};
                                        obj['name'] = file.name;
                                        obj['type'] = file.type;
                                        obj['size'] = file.size;
                                        obj['info'] = e.target.result;
                                        self.base64Files.push(angular.copy(obj));
                                    }
                                    i++;
                                    funAppendImage();
                                }
                                if(scope.filePara.isImage){
                                    reader.readAsDataURL(file);
                                }else{
                                    console.log(file);
                                    reader.readAsBinaryString(file.slice(0));
                                }
                            } else {
                                self.getRoot().find(".c_filePreview").html(html).show();
                                if (html) {
                                    //删除方法
                                    self.getRoot().find(".upload_delete").click(function() {
                                        self.funDeleteFile(files[parseInt($(this).attr("data-index"))]);
                                        return false; 
                                    });
                                    //提交按钮显示
                                    self.getRoot().find(".c_fileSubmit").show();  
                                  } else {
                                    //提交按钮隐藏
                                    self.getRoot().find(".c_fileSubmit").hide();  
                                }
                            }
                      };
                      funAppendImage();   
                },
                onDelete: function(file) {
                    $("#uploadList_" + file.index).remove();
                    // console.log(this.base64Files);
                    if(!this.base64Files.length){
                        this.getRoot().find(".c_fileSubmit").hide();
                        this.getRoot().find(".c_fileImage").val("");
                        this.getRoot().find(".c_filePreview").hide();
                    }
                },
                onDragOver: function() {
                    $(this).addClass("upload_drag_hover");
                },
                onDragLeave: function() {
                    $(this).removeClass("upload_drag_hover");
                },
                onProgress: function(file, loaded, total) {
                    var eleProgress = $("#uploadProgress_" + file.index), percent = (loaded / total * 100).toFixed(2) + '%';
                    eleProgress.show().html(percent);
                },
                onSuccess: function(file, response) {
                    this.getRoot().find(".c_uploadInf").empty().show();
                    this.getRoot().find(".c_uploadInf").append("<p>上传成功，图片地址是：" + response + "</p>");
                    scope.$apply(function(){
                        scope.filePara.responseData.data = scope.filePara.responseData.data || [] ;
                        console.log(response);
                        scope.filePara.responseData.data.push(angular.isString(response) ? JSON.parse(response) : response);
                        console.log(scope.filePara.responseData);
                    });
                },
                onFailure: function(file) {
                    this.getRoot().find(".c_uploadInf").append("<p>图片" + file.name + "上传失败！</p>");  
                    $("#uploadImage_" + file.index).css("opacity", 0.2);
                },
                onComplete: function() {
                    //提交按钮隐藏
                    this.getRoot().find(".c_fileSubmit").hide();
                    this.getRoot().find(".c_fileImage").val("");
                    this.getRoot().find(".c_uploadInf").append("<p>当前图片全部上传完毕，可继续添加上传。</p>");
                }
            };
            if (scope.filePara.isImage){
                params.filter = function(files) {
                      var arrFiles = [];
                      for (var i = 0, file; file = files[i]; i++) {
                        if (file.type.indexOf("image") == 0) {
                          if (file.size >= 999000) {
                            alert('您这张"'+ file.name +'"图片大小过大，应小于999k');  
                          } else {
                            arrFiles.push(file);  
                          }     
                        } else {
                          alert('文件"' + file.name + '"不是图片。');  
                        }
                      }
                      return arrFiles;
                };
            }
            $timeout(function(){
                var uploadObj = uploadService.create(params);
                uploadObj.init();
                console.log(uploadObj);
            }, 0);

       }
    }
}]);