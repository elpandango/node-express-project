/**
 * December 2016 @author Radchenko Eugen (elpandango@gmail.com)
 * custom slide
 */

(function (jQuery) {

    jQuery.fn.sliderScroll = function (options) {

        var options = jQuery.extend({
            mobileSpeed: 2  //коэффициент ускорения прокрутки на тач-скринах
        },options);

        var self = jQuery(this).find('.slider'),
            scrollItems = [],
            temp = 0,
            panoramWidth = checkScreenSize(),
            startPos = 0,
            globalPosition = 0; //абсолютная позиция центра экрана

        slideFirstUnit();
        sliderInit();

        //desktop events

        self.mousewheel(function (event, delta) {
            temp -= (delta * 100);
            if (temp < 0) {
                temp = 0;
            } else if (temp > panoramWidth) {
                temp = panoramWidth;
            }
            event.preventDefault();
            jQuery(this).stop().animate({scrollLeft: temp}, 250);
            checkPosition(temp);
        });


        //mobile events

        /*Ловим нажатие пальца*/
        self.bind('touchstart', function (event) {
            var e = event.originalEvent;
            startPos = globalPosition + e.touches[0].pageX;
            e.preventDefault();
        });

        /*Ловим при зажатом пальце*/
        self.bind('touchmove', function (event) {
            var e = event.originalEvent;

            self.scrollLeft((startPos - e.touches[0].pageX) * options.mobileSpeed);
            globalPosition = self.scrollLeft() / options.mobileSpeed;

            if (globalPosition < 1) {
                globalPosition = 1;
            } else if (globalPosition > panoramWidth) {
                globalPosition = panoramWidth;
            }

            checkPosition(globalPosition * options.mobileSpeed);
            e.preventDefault();
        });

        jQuery(window).on('resize', function () {
            panoramWidth = checkScreenSize();
        });

        //**************FUNCTIONS**************************//

        //определение ширины экрана
        function checkScreenSize() {
            var size = jQuery(window).width();
            if (size < 768) {
                return +7500;
            } else if (size >= 768 && size <= 1024) {
                return +7000;
            } else {
                return +6600;
            }
        }

        //определение кол-ва слайдов в HTML
        function sliderInit() {
            var slideBox = jQuery('.slide-box'),
                slidesCount = 0,
                slidesStep = 0,
                i = 0;
            slideBox.each(function () {
                slidesCount++;
            });
            slidesStep = jQuery('.slider-bg').width() / slidesCount;
            slideBox.each(function () {
                jQuery(this).attr('data-slide-num', i + 1);
                jQuery(this).attr('data-slide-step', parseInt(slidesStep * i));
                i++;
                scrollItems.push([jQuery(this).attr('data-slide-num'), jQuery(this).attr('data-slide-step')]);
            });
        }

        //определение позиции экрана относительно слайдов
        function checkPosition(pos) {
            for (var i = 0; i < scrollItems.length; i++) {
                if (pos >= scrollItems[i][1]) {
                    self.find('.slide-box').each(function () {
                        if (+jQuery(this).attr('data-slide-step') == +scrollItems[i][1]) {
                            jQuery(this).closest('.slides').find('.slide-box.active').removeClass('active');
                            jQuery(this).fadeIn(100).addClass('active');
                        }
                    });
                }
            }
        }

        function slideFirstUnit() {
            self.find('.slide-box').eq(0).addClass('active');
        }


    };
})(jQuery);