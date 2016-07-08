/* JS für den Aufruf von JQueryUI Elementen */
/* ---------------------------------------------------------------------------------------------------------- */

var toRotate;
var fromRotate;
var start = true;
var longpress = 400;
var start;
jQuery(document).ready(function ($) {
    /* Toogle für verstecktes Menü - Klick auf Menüpunkt Mehr */
    /* ---------------------------------------------------------------------------------------------------------- */
	$(document).click(function (evt) {
			
		if(evt.target.id == "clickProfilLink" || evt.target.parentNode.id == "clickProfilLink"){
			
			if ($("#headerSecond").css("position") == "fixed")
				setProfilFixed();
			else
				setProfilAbsolute();
			
			$("#headerProfil").toggle("slide", {direction: 'up', easing: 'easeOutBounce'}, 1000);
		}
		else{
			$("#headerProfil").hide("slide", {direction: 'up', easing: 'easeOutBounce'}, 1000);
		}
		
		if (evt.target.id == "sh-nav-menu-more" || evt.target.parentNode.id == "sh-nav-menu-more"){
            // cancel handler while animation running, or use .stop() to cancel running animations
            if ($("#sh-nav-menu-overflow:animated").length)
                return false;
            $("#sh-nav-menu-overflow").toggle("slide", {direction: 'down', easing: 'easeOutBounce'}, 1000);
			
			if(start){
				$("#sh-nav-menu a img").last().addClass( "imgRotateTo180");
				$("#sh-nav-menu a img").last().removeClass( "imgRotateTo0");
			}
			else{
				$("#sh-nav-menu a img").last().addClass( "imgRotateTo0");
				$("#sh-nav-menu a img").last().removeClass( "imgRotateTo180");				
			}
			start = !start;
        }
		else{
			$("#sh-nav-menu-overflow").hide("slide", {direction: 'down', easing: 'easeOutBounce'}, 1000);
			$("#sh-nav-menu a img").last().addClass( "imgRotateTo0");
			$("#sh-nav-menu a img").last().removeClass( "imgRotateTo180");  	
		} 
    });
	
    /* Animation für den Header */
    /* ---------------------------------------------------------------------------------------------------------- */
    $("#wrapperHeaderMain").on("scroll", function (e) {
        if (this.scrollTop > ($("#headerFirst").height() - $("#headerSecond").height())) {
            $("#headerSecond").addClass("fixHeaderSecond");
            setProfilFixed();
        } else {
            $("#headerSecond").removeClass("fixHeaderSecond");
			setProfilAbsolute();
        }
    });
});

function setProfilAbsolute(){
	$("#headerProfil").css({position: "absolute", top: "160px"});
}
function setProfilFixed(){
	var pHeight = $("#headerSecond").height();
	$("#headerProfil").css({position: "fixed", top: pHeight});
}

/* ImageLoader, Image FullSize */
/* ---------------------------------------------------------------------------------------------------------- */
function loadImgToFullSize(img){
	$("#imageLoaderDiv").css("display", "block");
	$("#imageLoaderImg").attr("src", img);
	
	var iWidth = $("#imageLoaderImg").width();
	var iHeight = $("#imageLoaderImg").height();
	var ratio = iWidth / iHeight;
	var pWidth = $("body").width();
	var pHeight = $("body").height();
	var eW = iWidth, eH = iHeight;
	
	if(pHeight <= pWidth){
		if(pHeight < iWidth){
			eW = pHeight - 15;
			eH = (pHeight - 15) / ratio;
		}	
	}else{
		if(pWidth < iWidth){
			eW = pWidth - 15;
			eH = (pWidth - 15) / ratio;
		}
	}
	
	$("#imageLoaderImg").css("width", eW);
	$("#imageLoaderImg").css("height", eH);
}
function CloseImgFullSize(){
	$("#imageLoaderDiv").css("display", "none");
	$("#imageLoaderImg").css("width", "auto");
	$("#imageLoaderImg").css("height", "auto");
}





