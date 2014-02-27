'use strict';

// 上传公共服务
smartUI.factory('uploadService', ['$http', 'UtilTools',  function($http, UtilTools) {
    
    // return uploadTool;
    var _ = UtilTools._;
    
    var UploadFile = function(para){

        this.base64Files = [];                // 保存所有图片base64编码数据
        this.fileInput = null,                //html file控件
        this.dragDrop = null,                 //拖拽敏感区域
        this.upButton = null,                 //提交按钮
        this.url = "",                        //ajax地址
        this.fileFilter = [],                 //过滤后的文件数组
        this.filter = function(files) {       //选择文件组的过滤方法
            return files;   
        },
        this.onSelect = function() {},        //文件选择后
        this.onDelete = function() {},        //文件删除后
        this.onDragOver = function() {},      //文件拖拽到敏感区域时
        this.onDragLeave = function() {}, //文件离开到敏感区域时
        this.onProgress = function() {},      //文件上传进度
        this.onSuccess = function() {},       //文件上传成功时
        this.onFailure = function() {},       //文件上传失败时,
        this.onComplete = function() {},      //文件全部上传完毕时

        para && $.extend(this, para);
        console.log(this);

    };

    UploadFile.prototype = {
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
                file.index = i;
            }
            //执行选择回调
            this.onSelect(this.fileFilter);
            return this;
        },
        
        //删除对应的文件
        funDeleteFile: function(fileDelete) {
            var fileName = fileDelete.name;
            var arrFile = [];
            for (var i = 0, file; file = this.fileFilter[i]; i++) {
                if (file != fileDelete) {
                    arrFile.push(file);
                } else {
                    this.onDelete(fileDelete);  
                }
            }
            this.fileFilter = arrFile;
            this.base64Files = _.filter(this.base64Files, function(v){
                if(v.name != fileName){
                    return v;
                }
            });
            return this;
        },

        funDeleteFileAll: function(){
            for(var i = 0;i<this.fileFilter.length;i++){
                 this.onDelete({ index: i});  
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
            
            if (this.dragDrop) {
                this.dragDrop.addEventListener("dragover", function(e) { self.funDragHover(e); }, false);
                this.dragDrop.addEventListener("dragleave", function(e) { self.funDragHover(e); }, false);
                this.dragDrop.addEventListener("drop", function(e) { self.funGetFiles(e); }, false);
            }
            
            //文件选择控件选择
            if (this.fileInput) {
                this.fileInput.addEventListener("change", function(e) { self.funGetFiles(e); }, false); 
            }
            
            //上传按钮提交
            if (this.upButton) {
                this.upButton.addEventListener("click", function(e) { self.funUploadFileAll(e); }, false); 
            } 
        }
    };

    return UploadFile;

}])
.directive('uploadFile',['uploadService','UtilTools', function(uploadService, UtilTools){
    return {
       restrict: 'EA',
       replace: true,
       templateUrl: 'tmpl/upload.html',
       link:function(scope,element,attrs,ctrl){
            var _ = UtilTools._; // underscore
            var params = {
                fileInput: $("#fileImage").get(0),
                dragDrop: $("#fileDragArea").get(0),
                upButton: $("#fileSubmit").get(0),
                url: 'data/upload.php',
                filter: function(files) {
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
                },
                onSelect: function(files) {
                      var self = this;
                      var html = '', i = 0;
                      $("#preview").html('<div class="upload_loading"></div>');
                      var funAppendImage = function() {
                        var file = files[i];
                        if (file) {
                          var reader = new FileReader();
                          reader.onload = function(e) {
                            console.log(e.target.result);
                            html = html + '<div id="uploadList_'+ i +'" class="upload_append_list"><p><strong>' + file.name + '</strong>'+ 
                              '<a href="javascript:" class="upload_delete" title="删除" data-index="'+ i +'">删除</a><br />' +
                              '<img id="uploadImage_' + i + '" src="' + e.target.result + '" class="upload_image" /></p>'+ 
                              '<span id="uploadProgress_' + i + '" class="upload_progress"></span>' +
                            '</div>';
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
                          reader.readAsDataURL(file);
                        } else {
                          $("#preview").html(html);
                          if (html) {
                            //删除方法
                            $(".upload_delete").click(function() {
                                self.funDeleteFile(files[parseInt($(this).attr("data-index"))]);
                                return false; 
                            });
                            //提交按钮显示
                            $("#fileSubmit").show();  
                          } else {
                            //提交按钮隐藏
                            $("#fileSubmit").hide();  
                          }
                        }
                      };
                      funAppendImage();   
                },
                onDelete: function(file) {
                    $("#uploadList_" + file.index).fadeOut();
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
                    $("#uploadInf").append("<p>上传成功，图片地址是：" + response + "</p>");
                },
                onFailure: function(file) {
                    $("#uploadInf").append("<p>图片" + file.name + "上传失败！</p>");  
                    $("#uploadImage_" + file.index).css("opacity", 0.2);
                },
                onComplete: function() {
                      //提交按钮隐藏
                      $("#fileSubmit").hide();
                      //file控件value置空
                      $("#fileImage").val("");
                      $("#uploadInf").append("<p>当前图片全部上传完毕，可继续添加上传。</p>");
                }
            };

            var uploadObj = new uploadService(params);
            uploadObj.init();


       }
    }
}]);