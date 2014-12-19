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

        $sliderItem.css({'z-index': 1});
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
            }, speedTime);

            $currentSliderItem.animate({
                left: -sliderWidth
            }, speedTime, function () {
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

    slider($('.js-slider'), 3000, 500);

    $('.js-full-calendar').fullCalendar({
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,basicWeek,basicDay'
        },
        defaultDate: new Date(),
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        events: [
            {
                title: 'All Day Event',
                start: '2014-11-01'
            },
            {
                title: 'Long Event',
                start: '2014-11-07',
                end: '2014-11-10'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: '2014-11-09T16:00:00'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: '2014-11-16T16:00:00'
            },
            {
                title: 'Conference',
                start: '2014-11-11',
                end: '2014-11-13'
            },
            {
                title: 'Meeting',
                start: '2014-11-12T10:30:00',
                end: '2014-11-12T12:30:00'
            },
            {
                title: 'Lunch',
                start: '2014-11-12T12:00:00'
            },
            {
                title: 'Meeting',
                start: '2014-11-12T14:30:00'
            },
            {
                title: 'Happy Hour',
                start: '2014-11-12T17:30:00'
            },
            {
                title: 'Dinner',
                start: '2014-11-12T20:00:00'
            },
            {
                title: 'Birthday Party',
                start: '2014-11-13T07:00:00'
            },
            {
                title: 'Click for Google',
                url: 'http://google.com/',
                start: '2014-11-28'
            }
        ]
    });

});