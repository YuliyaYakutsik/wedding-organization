(() => {
    if ('modules' in $ && 'owl' in $.modules) {
        return;
    }

    /**
     * Creates a new Owl class.
     * @class
     */
    const Owl = function() {
        const self = this;

        /**
         * Count the number of items in the carousel
         * @param {Object} items
         * @param {Object} container
         */
        self.countItems = function(items, container) {
            let newText = ' ' + items.length;

            container.data('items', items.length);
            container.text(newText);
        };
    };

    if (!('modules' in $)) {
        $.modules = {};
    }

    $.modules.owl = new Owl();
})();
