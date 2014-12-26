$(function () {
    var $carousel = $('.carousel'),
        $donateBlock = $('.js-donate-block'),
        $roleBlock = $('.js-role-block'),
        $donateTab = $('.js-donate-tab'),
        $roleTab = $('.js-role-tab'),
        $categories = $('.js-categories'),
        $fullCalendar = $('.js-full-calendar'),
        categoriesApi = 'http://50.118.20.207/json_cats.php',
        eventsApi = 'http://50.118.20.207/json_events.php';

    /**
     * Function switches between top menu blocks
     *
     * @function
     * @name switchTopBlock
     * @param {string} blockName Name of top menu block
     * @returns {undefined}
     */
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

    /**
     * Function fills category list
     *
     * @function
     * @name fillCategoryList
     * @param {jQuery} $categoryList Link of category list DOM list
     * @param {string} api API of list of categories
     * @returns {undefined}
     */
    function fillCategoryList($categoryList, api) {
        $.get(api, function (categories) {
            var $documentFragment = $(document.createDocumentFragment());

            $.each(categories, function (index, categoryName) {
                $documentFragment.append($('<option>', {
                    value: categoryName,
                    text: categoryName
                }));
            });

            $categoryList.html($documentFragment);

            if ($fullCalendar.length) {
                setCalendar($fullCalendar);
            }
        }, 'json');
    }

    /**
     * Function configures calendar plugin
     *
     * @function
     * @name setCalendar
     * @param {jQuery} $calendar Calendar's parent element
     * @returns {undefined}
     */
    function setCalendar($calendar) {
        $calendar.fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,basicWeek,basicDay'
            },
            defaultDate: new Date(),
            editable: true,
            eventLimit: true,
            events: calendarEventsHandler
        });
    }

    /**
     * Handler of fetching of events
     *
     * @function
     * @name calendarEventsHandler
     * @param {string} start
     * @param {string} end
     * @param {string} timezone
     * @param {Function} callback
     * @returns {undefined}
     */
    function calendarEventsHandler(start, end, timezone, callback) {
        $.ajax({
            url: eventsApi,
            method: 'GET',
            dataType: 'json',
            data: {
                start: start.format(),
                end: end.format(),
                cat: $categories.val()
            },
            success: function (events) {
                callback(events.data);
            }
        });
    }

    $donateTab.on('click', function () {
        switchTopBlock('donate');
    });

    $roleTab.on('click', function () {
        switchTopBlock('role');
    });

    fillCategoryList($categories, categoriesApi);
    $categories.on('change', function () {
        $fullCalendar.fullCalendar('refetchEvents');
    });

    if ($carousel.length) {
        $carousel.carousel()
    }
});