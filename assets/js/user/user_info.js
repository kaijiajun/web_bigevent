$(function(){
    var form=layui.form;
    var layer = layui.layer;
    form.verify({
        nickname:function(value){
           if(value.length>6){
               return '昵称长度必须在 1 ~ 6 个字符之间！'
           }
        }
    })

    initUserInfo();

    function initUserInfo(){
     $.ajax({
         method:'GET',
         url:'/my/userinfo',
         success:function(res){
             if(res.status!==0){
                 return layer.msg('获取用户信息失败！');
             }
             console.log(res);
             form.val('formUserInfo',res.data)
         }
     })
    }
    
    $('#btnReset').on('click',function(e){
        e.preventDefault();
        initUserInfo();
    });

    //监听表单事件
    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('更新用户信息失败')
                }
                layer.msg('更新用户信息成功')
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                // window代表iframe这个窗口  .parent代表这个大的父页面
                window.parent.getUserInfo();
            }
        })
    }) 

})