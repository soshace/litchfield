$(function () {
    var $donateBlock = $('.js-donate-block'),
        $roleBlock = $('.js-role-block'),
        $donateTab = $('.js-donate-tab'),
        $roleTab = $('.js-role-tab');

    function switchTopBlock(blockName) {
        if (blockName === 'donate') {
            $roleBlock.addClass('hide');

            if ($donateBlock.hasClass('hide')) {
                $donateBlock.removeClass('hide');
                return;
            }

            $donateBlock.addClass('hide');
            return;
        }

        $donateBlock.addClass('hide');
        if ($roleBlock.hasClass('hide')) {
            $roleBlock.removeClass('hide');
            return;
        }

        $roleBlock.addClass('hide');
    }

    function slider($slider, interval, speedTime) {
        var $sliderItem = $('li', $slider),
            sliderWidth = $sliderItem.outerWidth(),
            slidersNumber = $sliderItem.length,
            currentSliderNumber = 0;


        setInterval(function () {
            var $nextSliderItem,
                $currentSliderItem,
                nextItemNumber = currentSliderNumber + 1;

            if (nextItemNumber === slidersNumber) {
                nextItemNumber = 0;
            }

            $currentSliderItem = $($sliderItem[currentSliderNumber]);
            $nextSliderItem = $($sliderItem[nextItemNumber]);
            $nextSliderItem.css({'z-index': 1, left: sliderWidth});

            $nextSliderItem.animate({
                left: 0
            });

            $currentSliderItem.animate({
                left: -sliderWidth
            }, function () {
                $currentSliderItem.css({'z-index': 0});
            });

            currentSliderNumber = nextItemNumber;
        }, interval);
    }

    $donateTab.on('click', function () {
        switchTopBlock('donate');
    });

    $roleTab.on('click', function () {
        switchTopBlock('role');
    });

    slider($('.js-slider'), 2000, 500);
});