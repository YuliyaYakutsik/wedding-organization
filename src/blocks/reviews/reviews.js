(() => {
    if ('modules' in $ && 'reviews' in $.modules) {
        return;
    }

    /**
     * Creates a new Reviews class.
     * @class
     */
    const Reviews = function() {
        const self = this;

        /**
         * Opens full review
         */
        self.openFullReview = function() {
            $('.review__href').fancybox({
                type: 'inline',
                maxWidth: 460,
                padding: 0,
                closeBtn: false
            });
        };

        self.init = () => {
            self.openFullReview();
        };
    };

    if (!('modules' in $)) {
        $.modules = {};
    }

    $.modules.reviews = new Reviews();
})();
