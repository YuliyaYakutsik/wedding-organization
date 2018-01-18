(() => {
    if ('modules' in $ && 'menu' in $.modules) {
        return;
    }

    /**
     * Creates a new Menu class.
     * @class
     */
    const Menu = function() {
        const self = this;

        /**
         * Add events listeners
         */
        self.setupListener = () => {
            if (window.location.hash) {
                self.showSection(window.location.hash, false);
            }

            $(window).on('scroll', self.checkSection);

            $('.menu__link').on('click', function(e) {
                e.preventDefault();

                if (!$('.header__menu').hasClass('header__menu_burger_active')) {
                    self.showSection($(this).attr('href'), true);
                } else {
                    self.showSection($(this).attr('href'), false);
                }
                $('html').removeClass('fixed');
                $('.header__burger-menu__link').removeClass('header__burger-menu__link_active');
                $('.header__menu').removeClass('header__menu_burger_active');
            });
        };

        /**
         * Check Section (add hash to URL)
         */
        self.checkSection = function() {
            $('section').each(function() {

                let $this = $(this);

                if ($this.data('section')) {

                    let topEdge = $this.offset().top - 250;
                    let bottomEdge = topEdge + $this.height();
                    let wScroll = $(window).scrollTop();

                    if (topEdge < wScroll && bottomEdge > wScroll) {
                        let currentId = $this.data('section');
                        let reqLink = $('.menu__link').filter('[href="#' + currentId + '"]');

                        reqLink.closest('.menu__item').addClass('menu__item_active').siblings().removeClass('menu__item_active');
                        window.location.hash = currentId;

                        if ($this.data('section') === 'main') {

                            let items = $('.menu__item');

                            items.removeClass('menu__item_active');
                        }

                    }
                }
            });
        };

        /**
         * Show Section
         * @param {Object} section
         * @param {Object} isAnimate
         */
        self.showSection = function(section, isAnimate) {
            let direction = section.replace(/#/, '');
            let reqSection = $('section').filter('[data-section="' + direction + '"]');
            let reqSectionPos = reqSection.offset().top-$('.header').height();

            if (isAnimate) {
                $('body, html').animate({scrollTop: reqSectionPos}, 600);
            } else {
                $('body, html').scrollTop(reqSectionPos);
            }
        };

        /**
         * Init module
         */
        self.init = () => {
            self.setupListener();
        };
    };

    if (!('modules' in $)) {
        $.modules = {};
    }

    $.modules.menu = new Menu();
})();
