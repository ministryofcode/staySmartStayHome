angular.module('app').controller('GridController', ['$scope', 'sharedData', '$element', '$window', function ($scope, sharedData, $element, win) {

    
    this.toogleGridTile = function(tileNum, tile){
        var expanded = tile.isExpanded;
        var heightCountTemp = tile.span.row;
        var widthCountTemp = tile.span.col;
 
        toogleGrid (tileNum,expanded,heightCountTemp,widthCountTemp)
    };
    this.initialize = function (tileNum) {
        if (!(tileNum >= 0))
            return;
        win.setTimeout(function () {
            openExpert(tileNum, true);
        }, 200);
    };


    /*get jquery-window-object*/
    $window = angular.element(win);

    /*attach resize-handler */
    $window.on('resize', resizeHandler);
    /* detach handler when Controller gets destroyed*/
    $scope.$on("$destroy", function () {
        $window.off('resize', resizeHandler);
    });

    var gsd = sharedData.gridSystem;

    var heightCount = 1;
    var widhtCount = 2;
	var gesamt = 3;
	
    var hasResize = false;
    var smarthomeSize = 0;

    SizeEnum = {
        SMARTPHONE: 1,
        LANDSCAPE: 2,
        TABLET: 3,
        DESKTOP: 4,
        OVERSIZE: 5
    };

    function resizeHandler() {

        if (gsd.lastTileNum == 99 || gsd.lastExpand == false)
            return;

        var headerSize = $('body').width();

        if (headerSize <= 400
            && smarthomeSize != SizeEnum.SMARTPHONE) {
            smarthomeSize = SizeEnum.SMARTPHONE;
            hasResize = true;
        }
        else if (headerSize > 400 && headerSize <= 670
            && smarthomeSize != SizeEnum.LANDSCAPE) {
            smarthomeSize = SizeEnum.LANDSCAPE;
            hasResize = true;
        }
        else if (headerSize > 670 && headerSize <= 1024
            && smarthomeSize != SizeEnum.TABLET) {
            smarthomeSize = SizeEnum.TABLET;
            hasResize = true;
        }
        else if (headerSize > 1024 && headerSize <= 1999
            && smarthomeSize != SizeEnum.DESKTOP) {
            smarthomeSize = SizeEnum.DESKTOP;
            hasResize = true;
        }
		else if (headerSize > 1999 
			&& smarthomeSize != SizeEnum.OVERSIZE) {
            smarthomeSize = SizeEnum.OVERSIZE;
            hasResize = true;
        }

        if (hasResize) {
            openExpert(gsd.lastTileNum);
            hasResize = false;
        }
        else {
            var widthGrid = $(".gridSystemClass:first").width();
            var currentTile = $("[id^='grid'][id$=" + gsd.lastTileNum + "]");
            var expertTile = currentTile.find("ng-transclude");
            setSize(expertTile, currentTile, widthGrid);
        }

    }

    function toogleGrid (tileNum,expanded,heightCountTemp,widthCountTemp) {
        
		
		$("[id^='grid'][id$=" + tileNum + "]").css("background", "#f7f7f7");
        if (expanded) {		
			heightCount = heightCountTemp || 1;
			widhtCount = widthCountTemp || 2;
			gesamt = heightCount * widhtCount;
			
            openExpert(tileNum);
            gsd.lastTileNum = tileNum;
            gsd.lastExpand = expanded;
        }
        else if (gsd.lastTileNum == tileNum || gsd.lastExpand == expanded) {
            gsd.lastTileNum = 99;
            gsd.lastExpand = false;
            closeExpert();
        }
    };

    function closeExpert() {
        $('.gridcontentHidden').removeClass("gridcontentHiddenAnimate");
        setTimeout(function () {
            $(".gridcontentHidden").remove();
        }, 400);
    }

    function openExpert(id) {

        var oriantateId;
        var widthGrid = $(".gridSystemClass:first").width();
        var widthTile = $(".gridcontent:first").width();
        var umbruch = Math.floor(widthGrid / widthTile);

        /* Setze hidden Tiles */
        $(".gridcontentHidden").remove();
		var test = $(".gridSystemClass:first > .ng-hide");
		test.remove();
        for (var i = 1; i <= heightCount; i++) {

            var positionGrid = ((umbruch * i) + id);
            var widhtCountTemp = widhtCount;
            var modulo = positionGrid % umbruch;
            var startPoint = 0;

            if (umbruch < widhtCountTemp)
                widhtCountTemp = umbruch;
            if ((umbruch - modulo) < widhtCountTemp)
                startPoint = modulo - (umbruch - widhtCountTemp);

            for (var j = 0; j < widhtCountTemp; j++)
                insertAtIndex(positionGrid - startPoint + j);

            oriantateId = id - startPoint;
        }
        setTimeout(function () {
            $('.gridcontentHidden').addClass("gridcontentHiddenAnimate");
        }, 1);

        /* Show Expert */
        var currentTile = $("[id^='grid'][id$=" + id + "]");
        var expertTile = currentTile.find("ng-transclude");

        if (oriantateId != id)
            gsd.isLeftPosition = false;
        else
            gsd.isLeftPosition = true;

        setSize(expertTile, currentTile, widthGrid);
		currentTile.css("background", "#d0d0d0");
        /* expertTile.addClass("gridExpertShow"); */
        /*         setTimeout(function () {
         $(".wrapperHeaderMain").animate({scrollTop: $("#" + id).offset().top}, 'slow');
         }, 600); */
    }
    function setSize(e, p, widthGrid) {
        var pWidth = p.width();
        var pHeight = p.height();
        var pMarginW = (widthGrid * ((widhtCount * 2) - 2)) / 100;
        var pMarginH = widthGrid * 2 / 100;

        var expertWidth = (pMarginW + (pWidth * widhtCount)) + "px";
        var expertHeight = ((pHeight + pMarginH) * (heightCount)) + "px";
        var expertLeft = "0px";

        if (!gsd.isLeftPosition)
            expertLeft = "-" + (pWidth * (widhtCount - 1) + pMarginW) + "px";

        e.css({height: expertHeight, width: expertWidth, top: "100%", left: expertLeft});
    }

    function insertAtIndex(i) {
        if (i === 0)
            $(".gridSystemClass").prepend("<div class='gridcontentHidden'></div>");
        else{
			if(i <= ($(".gridSystemClass:first > div").children().length + gesamt))
				$(".gridSystemClass:first > div:nth-child(" + i + ")").after("<div class='gridcontentHidden'></div>");
		}
            
    }
}]);
