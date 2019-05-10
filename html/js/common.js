// 1、选择日期
$('.form_date').datetimepicker({
    language:'zh-CN',
    weekStart: 1,
    todayBtn:  1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0,
    format: 'yyyy-mm-dd'
});
// 2、选择币种
$('.pullDown-currencyCategory').on('click',function (e) {
    let ele = e.target;
    console.log($(ele).attr('class'))
    // 2.2、关闭
   /* if($(ele).hasClass('close-btn')){
        $(ele).closest('.pullDown-currencyCategory').slideUp();
    }*/
});
// 3、弹出'选择币种'、'取钞城市'、'选择网点';以及点选
/*$('.exchangeCurrency').on('click',function (e) {
    let ele = e.target;
    console.log($(ele).attr('class'))
    // 3.1、弹出'选择币种'、'取钞城市'
    /!*if($(ele).hasClass('currencyCategory')||$(ele).hasClass('currencyCity')){
        $(ele).closest('._form_group_wrap').find('.pullDown-currencyCategory').slideDown();
    }*!/
    // 3.2、弹出'取钞城市'
    /!*if($(ele).hasClass('currencyCity')){
        $(ele).closest('.currencyCity-wrap').find('.pullDown-currencyCategory ').slideDown();
    }*!/
    // 3.3、点选'币种'、'取钞城市'
  /!*  if($(ele).hasClass('pullDown-currency')){
        if($(ele).hasClass('pullDownMask')){
            return;
        }
        if($(ele).hasClass('pullDown-website')){
            return;
        }
        let html = $(ele).html();
        console.log($(ele).attr('class'))
        $(ele).closest('._form_group_wrap').find('._form_control').html(html);
        $(ele).addClass('hover-color').siblings('.pullDown-currency').removeClass('hover-color')
        $(ele).closest('.pullDown-currencyCategory').slideUp();
    }*!/
    // 2.2、关闭
    /!*if($(ele).hasClass('close-btn')){
        $(ele).closest('.pullDown-currencyCategory').slideUp();
    }*!/
});*/
// 3、关闭：'选择币种'、'取钞城市'、'选择网点'的下拉框
$('.close-btn').on('click',function (e) {
    $(this).closest('.pullDown-currencyCategory').slideUp();
});
// 4、弹出'选择币种'、'取钞城市'、选择网点'
$('header ._form_control').on('click',function (e) {
    let ele = e.target;
    $(ele).closest('._form_group_wrap').find('.pullDown-currencyCategory').slideToggle();
});
// 5、点选
$('header .pullDown-currency').on('click',function (e) {
    let ele = e.target;
    let html = $(this).html();
    if($(ele).hasClass('pullDownMask')){
        return;
    }
    if($(this).hasClass('pullDown-website')){
        html = $(this).find('.item-title').html();
        $(this).closest('._form_group_wrap').find('.website').html(html);
        $(this).addClass('hover-bg').siblings('.pullDown-currency').removeClass('hover-bg')
        $(ele).closest('.pullDown-currencyCategory').slideUp();
        return
    }
    // ajax获取的币种
    if($(this).hasClass('ajax-item')){
       // let imgname = $(this).find('.item-name').html().split(' ')[1];
       let name = $(this).find('.item-name').html();
       let imgUrl = name.split(' ')[1];
       html = `<img src="images/${imgUrl}.png">${name}`;
       $(this).closest('._form_group_wrap').find('._form_control').html(html);
       // console.log(imgname)
    }
    console.log($(ele).attr('class'))
    $(this).closest('._form_group_wrap').find('._form_control').html(html);
    $(this).addClass('hover-color').siblings('.pullDown-currency').removeClass('hover-color')
    $(this).closest('.pullDown-currencyCategory').slideUp();
});
// 6、立即兑换
$('header #exchangeBtn').on('click',function (e) {
    $('.person-application-form').fadeIn();
    $('.fullScreenMask').show();
    // let aa = $('.Application-label input').is(':checked')
    $('.Application-label input:checkbox').prop('checked',false);
    // alert(aa)
    // 倒计时函数
    Countdown();
})

// 7、ajax获取币种信息
$('.pullDown-currencyCategory .user-input').on('input',function (e) {
    let val = $(this).val();
    // console.log(val)
    let hello = 'yq';
    // debounce(aa(hello),300)
   /* if(val){
        $(this).closest('.pullDown-currencyCategory').find('.pullDown-currencys').hide()
        $(this).closest('.pullDown-currencyCategory').find('.ajaxGetItem').show()
    }else{
        $(this).closest('.pullDown-currencyCategory').find('.pullDown-currencys').show()
        $(this).closest('.pullDown-currencyCategory').find('.ajaxGetItem').hide()
    }*/
});

//
// $('.pullDown-currencyCategory .user-input').on('input',{msg:'yq'},debounce(aa,500,event));

// 8、 防抖函数
function debounce(fn,wait,event){
    console.log('执行了',event.data.msg)

    let timeout = null;
    return function(){
        if(timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(fn,wait);
    }
}

function getAjaxData(even){
    // console.log('执行了',event.data.msg)
    if(val){
        $(this).closest('.pullDown-currencyCategory').find('.pullDown-currencys').hide()
        $(this).closest('.pullDown-currencyCategory').find('.ajaxGetItem').show()
    }else{
        $(this).closest('.pullDown-currencyCategory').find('.pullDown-currencys').show()
        $(this).closest('.pullDown-currencyCategory').find('.ajaxGetItem').hide()
    }

}

function aa(event){
    console.log('执行了',event.data.msg)
}

// 9、下一页
$('.main_NextPage').on('click','li',function (e) {
    $(this).find('a').addClass('hover-a');
    $(this).siblings('li').find('a').removeClass('hover-a')
});

// 10、切换:'退款说明'、'服务条款'、'填报说明'
$('.aside-nav').on('click','.aboutUs-tab',function (e) {
    $(this).addClass('aboutUs-item-hover').siblings('.aboutUs-item').removeClass('aboutUs-item-hover')
    $('.detail-item').not('.aboutUs-tabDetail').hide();
    let index = $(this).index('.aboutUs-tab');
    $('.aboutUs-tabDetail').eq(index).show().siblings('.aboutUs-tabDetail').hide()
})
// 11、切换：'账号密码登录'、'短信验证登录'
$('.LoginSpan').on('click',function (e) {
    let index = $(this).index();
    $(this).addClass('LoginSpan-active').siblings('.LoginSpan').removeClass('LoginSpan-active')
    $('.springItemInput>form').eq(index).show().siblings('form').hide()
})

// 12、首页头部：请登录、注册
$('.login1-and-register1').on('click',function (e) {
    let ele = e.target;
    if($(ele).hasClass('login1')){
        $('.fullScreenMask').fadeIn();
        $('.springWindowItem-login').fadeIn();
    }
    if($(ele).hasClass('register1')){
        $('.fullScreenMask').fadeIn();
        $('.springWindowItem-register').fadeIn();
    }

})

// 13、关闭遮罩（登录|注册的遮罩）、注册、忘记密码
$('.springItem-right').on('click',function (e) {
    let ele = e.target;
    // 关闭
    if($(ele).hasClass('close-Spring-windows')){
        $(ele).closest('.springWindowItem').fadeOut();
        $('.fullScreenMask').fadeOut()
    }
    // 注册（遮罩层上的注册）
    if($(ele).hasClass('register2')||$(ele).hasClass('_noAccount_register')){
        $(ele).closest('.springWindowItem').fadeOut();
        $('.springWindowItem-register').fadeIn();
    }
    // 登录（遮罩层上的登录）
    if($(ele).hasClass('login2')||$(ele).hasClass('_hasAccount_login')){
        // $(ele).closest('.springWindowItem').hide();
        $('.springWindowItem-ResetPass,.springWindowItem-RealName').hide();
        $('.springWindowItem-register').hide();
        $('.springWindowItem-login').fadeIn();
    }
    // 忘记密码
    if($(ele).hasClass('_forgetPass')){
        $(ele).closest('.springWindowItem').fadeOut();
        $('.springWindowItem-ResetPass').fadeIn();
    }
    // 下一步：实名认证
    if($(ele).hasClass('_nextStep')){
        $(ele).closest('.springWindowItem').fadeOut();
        $('.springWindowItem-RealName').fadeIn();
    }
    // 完成注册、暂不认证 _finishedRegister
    if($(ele).hasClass('_finishedRegister')){
        $(ele).closest('.springWindowItem').fadeOut();
        $('.fullScreenMask').fadeOut(1000)
        // $('.springWindowItem-RealName').show();
    }
})

// 14、点击（黑色透明遮罩）
$('.fullScreenMask').on('click',function (e) {
    $('.springWindowItem,.fullScreenMask').fadeOut();
    $('._website-detail-Item').hide();
    $('.person-application-form').hide();
})

// 15、'选择网点'-->'查看详情'
$('._toCheck_website_detail').on('click','.goTp-detail',function (e) {
    let index = $(this).closest('.pullDown-website').index();;
    console.log(index)
    $('.fullScreenMask').fadeIn();
    $('.website-detail-wrap>._website-detail-Item').eq(index).fadeIn(1000).siblings('._website-detail-Item').hide();
})
// 16、关闭网点详情
$('.website-detail-wrap').on('click','.webDetail-close',function (e) {
    $(this).closest('._website-detail-Item').hide();
    $('.fullScreenMask').fadeOut();
});

// 17、个人申购申请书的确认、关闭
$('.person-application-form').on('click',function (e) {
    let ele = e.target;
    // 关闭:'个人申购申请'
    if($(ele).hasClass('Application-close')){
        $('.person-application-form').fadeOut();
        $('.fullScreenMask').fadeOut();
    }
    // 点击'已阅读'，
    if($('.Application-label input').is(':checked')){
        $('.Application-button-mask').hide();
        $('.person-application-form button').addClass('blue-bg');
    }
    if(!$('.Application-label input').is(':checked')){
        $('.Application-button-mask').show();
        $('.person-application-form button').removeClass('blue-bg');
    }
    // 点击'下一步'
    if($(ele).hasClass('blue-bg')){
        $(location).attr('href', 'apply.html');
    }
})

// 18、30秒倒计时
function Countdown() {
    let time=10;
    let timer = setInterval(function(){
        if(time === 0){
            $('.person-application-form .btn').html('下一步');
            $('.Application-checkbox-mask').hide();
            clearInterval(timer)
            return
        }
        time=time-1;
        $('.Countdown').html(time);
    },1000);
}