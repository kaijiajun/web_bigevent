$(function(){
    getUserInfo();
    var layer=layui.layer;
    $('#btnLogout').one('click',function(){
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?',{icon:3,title:'提示'},
        function(index){
            // 清空本地存储中的 token
           localStorage.removeItem('token');
        // 重新跳转到登录页面   
           location.href='/就业班/9.14号/login.html';
        //  关闭 confirm 询问框  
           layer.close(index);
        })
    })
});

function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success:function(res){
            if(res.status!==0){
                return layui.layer.msg('获取用户信息失败')
            }
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data);
        }
    })
};

function renderAvatar(user){
    // 获取用户的名称
    var name=user.nickname||user.username;
    // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name);
    if(user.user_pic!==null){
        // 渲染图片头像
       $('.layui-nav-img').attr('src',user.user_pic).show();
       $('.text-avatar').hide();
    } else {
        // 渲染文本头像
    $('.layui-nav-img').hide();
    $('.text-avatar').html(name[0].toUpperCase()).show();

    }
    
};