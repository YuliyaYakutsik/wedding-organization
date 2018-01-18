(() => {
    if ('modules' in $ && 'advantages' in $.modules) {
        return;
    }

    /**
     * Creates a new Advantages class.
     * @class
     */
    const Advantages = function() {
        const self = this;

        /**
         * Add events listeners
         */
        self.setupListener = () => {
            $(window).on('resize', self.animateAdvantages);
        };

        /**
         * EqualHeight of the item-titles
         */
        self.equalHeight = function() {
            let item = $('.advantages__item__title');

            item.matchHeight();
        };

        /**
         * Animate Network-Tablet
         */
        self.animateAdvantages = function() {
            let owl = $('.advantages__list');

            if ($(window).width() <= '640') {
                if (!owl.hasClass('owl-carousel')) {
                    owl.addClass('owl-carousel').addClass('.owl-theme');
                    owl.on('initialized.owl.carousel', function() {
                        let item = $('.advantages__item');

                        item.matchHeight();
                    });

                    owl.owlCarousel({
                        loop: true,
                        items: 1,
                        smartSpeed: 300,
                        mouseDrag: false
                    });
                }
            } else {
                if (owl.hasClass('owl-carousel')) {
                    owl.removeClass('owl-carousel').removeClass('.owl-theme');
                    owl.trigger('destroy.owl.carousel');
                }
            }
        };

        /**
         * Init module
         */
        self.init = () => {
            self.equalHeight();
            self.animateAdvantages();
            self.setupListener();
        };
    };

    if (!('modules' in $)) {
        $.modules = {};
    }

    $.modules.advantages = new Advantages();
})();
