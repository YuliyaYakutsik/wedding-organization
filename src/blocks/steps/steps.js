(() => {
    if ('modules' in $ && 'steps' in $.modules) {
        return;
    }

    /**
     * Creates a new Steps class.
     * @class
     */
    const Steps = function() {
        const self = this;

        /**
         * Add events listeners
         */
        self.setupListener = () => {
            $(window).on('resize', self.animateSteps);
        };

        /**
         * Makes equal hight of steps-items
         */
        self.equalHight = function() {
            let item = $('.steps__item');

            item.matchHeight();
        };

        /**
         * Animate Steps-Tablet
         */
        self.animateSteps = function() {
            let owl = $('.steps__list');
            let nav = owl.next('.owl-navigation');
            let allPages = nav.find('.owl-navigation__all-pages');

            if ($(window).width() <= '1023') {
                if (!owl.hasClass('owl-carousel')) {
                    owl.addClass('owl-carousel').addClass('.owl-theme');
                    owl.on('initialized.owl.carousel', function(e) {
                        let item = $('.steps__item');
                        let activeItem = nav.find('.owl-navigation__active-page');

                        item.addClass('steps__item_carousel');
                        item.matchHeight();
                        activeItem.text('1 ');
                        nav.addClass('owl-navigation_active');
                        nav.find('.owl-navigation__link_prev').addClass('disabled');

                        allPages.text(e.item.count - (Math.floor(owl.width()/item.innerWidth())-1));
                    });

                    owl.owlCarousel({
                        loop: false,
                        items: 1,
                        autoWidth: true,
                        slideBy: 1,
                        smartSpeed: 300,
                        mouseDrag: false,
                        info: true,
                        responsive: {
                            641: {
                                items: 4,
                                autoWidth: true,
                                margin: 0,
                                slideBy: 1
                            }
                        }
                    });

                    owl.on('changed.owl.carousel', function() {
                        let activeItem = owl.find('.owl-dot.active').index();
                        let newText = activeItem + 1 + ' ';
                        let container = nav.find('.owl-navigation__active-page');

                        container.text(newText);
                        if (activeItem === 0) {
                            nav.find('.owl-navigation__link_prev').addClass('disabled');
                        } else {
                            nav.find('.owl-navigation__link_prev').removeClass('disabled');
                        }
                        if ((activeItem+1).toString() === nav.find('.owl-navigation__all-pages').text().replace(" ", "")) {
                            nav.find('.owl-navigation__link_next').addClass('disabled');
                        } else {
                            nav.find('.owl-navigation__link_next').removeClass('disabled');
                        }
                    });

                    nav.find('.owl-navigation__link').on('click', function(e) {
                        e.preventDefault();
                        let $this = $(this);

                        if ($this.hasClass('owl-navigation__link_prev')) {
                            owl.trigger('prev.owl.carousel');
                        } else {
                            owl.trigger('next.owl.carousel');
                        }
                    });
                } else {
                    allPages.text($('.steps__list').next('.owl-navigation').find('.owl-navigation__all-pages').data('items') - (Math.floor(owl.width()/$('.steps__item').innerWidth())-1));
                }
            } else {
                if (owl.hasClass('owl-carousel')) {
                    owl.off('changed.owl.carousel');
                    owl.removeClass('owl-carousel').removeClass('.owl-theme');
                    nav.find('.owl-navigation__link').off();
                    owl.next('.owl-navigation').removeClass('owl-navigation_active');
                    owl.trigger('destroy.owl.carousel');
                    $('.steps__item').removeClass('steps__item_carousel');
                }
            }
        };

        self.init = () => {
            self.equalHight();
            $.modules.owl.countItems($('.steps__item'), $('.steps__list').next('.owl-navigation').find('.owl-navigation__all-pages'));
            self.animateSteps();
            self.setupListener();
        };
    };

    if (!('modules' in $)) {
        $.modules = {};
    }

    $.modules.steps = new Steps();
})();
