function show_all(){
        var obj_sec_pros = $(".sec_pro");
        var sec_pro_n = 0;
        obj_sec_pros.addClass("active");
        
        setTimeout(function(){ 
            $('html, body').animate({
                scrollTop : 0
            },100);
        }, 100);

        var show_interval = setInterval(show_sec_pro, 300);
        function show_sec_pro() {
            var obj_sec_pros_n = $(obj_sec_pros[sec_pro_n]);
            obj_sec_pros_n.addClass("tampil")
            sec_pro_n+=1;
            if(obj_sec_pros.length == sec_pro_n){
                clearInterval(show_interval);
            }
        }
    }

function load_with_param(){
    
    function getParameterByName(name) {
	    var url = window.location.href;
	    name = name.replace(/[\[\]]/g, '\\$&');
	    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
	        results = regex.exec(url);
	    if (!results) return null;
	    if (!results[2]) return '';
	    return decodeURIComponent(results[2].replace(/\+/g, ' '));
	}
	var vt = getParameterByName("vt");
	if(vt !== null){
		var target = "#"+vt;
        var target_li_a = $('a[href="'+vt+'"]');
        var target_li = target_li_a.closest('li');
    	target_li.addClass("active");
        $(target).addClass("active");
        setTimeout(function(){ 
            $(target).addClass("tampil");
        }, 100);
	}
	if(vt === null){
        show_all();
	}
	// if vt === null
}
function body_scrolled(scroll_top1){
    var shrinkHeader = 50;
    if(scroll_top1 > shrinkHeader){
        $("body").addClass("scrolled");
    }else{
        $("body").removeClass("scrolled");
    }
}
$(window).scroll(function() {
    var scroll_top1 = $(window).scrollTop();
    body_scrolled(scroll_top1);
})
$(document).ready(function() {
    $(".back-to-top-wrapper").click(function(){
        $('html, body').animate({
            scrollTop : 0
        },1200);
    });
    
    $("#toggle_menu_mob").click(function(){
        $(this).toggleClass("open");
        $("#sec_head").toggleClass("aktif");
      })
    var scroll_top1 = $(window).scrollTop();
    body_scrolled(scroll_top1);
	
	load_with_param();
	var modal_iframe_src = $('#modal_360 .modal-body iframe').attr("data-src");
    $("a.btn-tour").on("click",function(e) {
    	e.preventDefault();
    	modal_iframe_src = $(this).attr("data-vt");
    	$('#modal_360').modal('toggle');
    });
    $('.modal.modal-360').on('show.bs.modal', function (e) {
        $('body').addClass("popup-show");
        var vthis = $(this);
        var modal_iframe =  $('#modal_360 .modal-body iframe');
        modal_iframe.attr("src",modal_iframe_src);
    });
    $('.modal.modal-360').on('hide.bs.modal', function (e) {
    	var vthis = $(this);
        $('body').removeClass("popup-show");
        $('#modal_360 .modal-body iframe').attr("src","");
    });
    $('#ul_nav li a').on('click', function(e) {
    	e.preventDefault();
    	var this_li = $(this).closest("li");
    	var target = $(this).attr("href"); 
    	var target_url = $(this).attr("href"); ;
    	target = "#"+target;
        var window_w = $(window).width();
        if(window_w<992){
            $("#toggle_menu_mob").click();
        }
    	
    	if(this_li.hasClass("active")){
    		$('#ul_nav li').removeClass("active");
    		$(".sec_pro").removeClass("tampil");
            setTimeout(function(){ 
                $(".sec_pro").removeClass("active");    
            }, 500);
            setTimeout(function(){ 
                show_all();
            }, 600);
    		var new_url = location.protocol + '//' + location.host + location.pathname;
    		window.history.pushState("", "", new_url);
    		return;
    	}
    	$('#ul_nav li').removeClass("active");
    	this_li.addClass("active");
    	$(".sec_pro").removeClass("tampil");
        setTimeout(function(){ 
            $(".sec_pro").removeClass("active");    
        }, 500);
        setTimeout(function(){ 
            $('html, body').animate({
                scrollTop : 0
            },100);
        }, 550);
        
        setTimeout(function(){ 
            $(target).addClass("active");
        }, 500);
        setTimeout(function(){ 
            $(target).addClass("tampil");
        }, 600);
        
        
    	var new_url = location.protocol + '//' + location.host + location.pathname;
    	new_url = new_url+"?vt="+target_url;
    	window.history.pushState("", "", new_url);
    	
    });
});