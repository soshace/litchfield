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

    $donateTab.on('click', function(){
        switchTopBlock('donate');
    });

    $roleTab.on('click', function(){
        switchTopBlock('role');
    });
});