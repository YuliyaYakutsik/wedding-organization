(() => {
    if ('modules' in $ && 'header' in $.modules) {
        return;
    }

    /**
     * Creates a new Header class.
     * @class
     */
    const Header = function() {
        const self = this;

        /**
         * Add events listeners
         */
        self.setupListener = () => {
            $(window).on('resize', self.showHeaderMenu);
            $('.header__preview__link').on('click', self.goToTop);
            $('.header__burger-menu__link').on('click', self.burgerMenu);
        };

        /**
         * Shows HeaderMenu
         */
        self.showHeaderMenu = function() {
            let headerMenu = $('.header__menu');

            if ($(window).width() >= '1024' && headerMenu.hasClass('header__menu_burger_active')) {
                headerMenu.removeClass('header__menu_burger_active');
                $('.header__burger-menu__link').removeClass('header__burger-menu__link_active');
            }
        };

        /**
         * Scroll Page to the Top
         * @param {Object} e
         */
        self.goToTop = function(e) {
            e.preventDefault();

            $('body, html').animate({scrollTop: 0}, 600);
        };

        /**
         * Shows burger-menu
         * @param {Object} e
         */
        self.burgerMenu = function(e) {
            e.preventDefault();

            if ($(this).hasClass('header__burger-menu__link_active')) {
                $(this).removeClass('header__burger-menu__link_active');
                $('.header__menu').removeClass('header__menu_burger_active');
                $('html').removeClass('fixed');
            } else {
                $(this).addClass('header__burger-menu__link_active');
                $('.header__menu').addClass('header__menu_burger_active');
                $('html').addClass('fixed');
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

    $.modules.header = new Header();
})();
