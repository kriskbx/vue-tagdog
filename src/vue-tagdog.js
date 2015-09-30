(function(root, factory){
    var tagdog = {

        twoWay: true,

        tagdog: null,

        tagdogSettings: null,

        tagdogProps: {
            destroy: function destroy() {
                // Remove listeners by cloning the original input
                this.originalInput.setAttribute('value', this.hiddenInput.getAttribute('value'));
                this.field.appendChild(this.originalInput.cloneNode(true));
                this.field.removeChild(this.originalInput);

                // Remove DOM manipulations
                this.field.removeChild(this.hiddenInput);
                this.field.removeChild(this.tagContainer);
            }
        },

        bind: function () {
            // Get and parse the settings expression
            var settingsExpression = this.el.getAttribute('settings');
            if (settingsExpression) {
                this.tagdogSettings = this.vm.$eval(settingsExpression);
                this.vm.$watch(settingsExpression, this.settingsChange.bind(this), {deep: true});
            }

            this.init();
        },

        update: function (value) {
            this.tagdog.resetTags();
            var tags;

            // Parse the given value to an array of tags
            if (value instanceof String || typeof value == 'string') {
                tags = value.split(',');
            } else {
                tags = [];
            }

            // Add each tag individually
            tags.forEach(function (el) {
                if (!this.tagdog.hasTag(el) && el != '')
                    this.tagdog.addTag(el);
            }.bind(this));
        },

        unbind: function () {
            this.tagdog.field.removeEventListener('change', this.updateValue.bind(this));

            this.tagdog.destroy();

            delete(this.tagdog);
        },

        init: function () {
            // Init tagdog
            this.tagdog = tagdog(this.el, this.tagdogSettings, this.tagdogProps);

            // Add eventListener that updates the binded value
            this.tagdog.field.addEventListener('change', this.updateValue.bind(this));
        },

        updateValue: function () {
            this.set(this.tagdog.getTags().join(','));
        },

        settingsChange: function (settings) {
            var tags = this.tagdog.getTags();

            this.tagdogSettings = settings;
            this.tagdog.destroy();
            this.init();

            tags.forEach(function (el) {
                if (!this.tagdog.hasTag(el) && el != '')
                    this.tagdog.addTag(el);
            }.bind(this));
        },

        extend: function (receiver /*, emitters */) {
            var emitters = [].slice.call(arguments, 1),
                n = emitters.length,
                i, key, emitter;

            if (!n) return receiver;

            for (i = 0; i < n; i++) {
                emitter = emitters[i];
                for (key in emitter) {
                    receiver[key] = emitter[key];
                }
            }

            return receiver;
        }

    };

    if (typeof exports === 'object' && typeof module === 'object') {
        module.exports = factory();
    }
    else if (typeof define === 'function' && define.amd) {
        define([], factory);
    }
    else if (typeof exports === 'object') {
        exports['vue-tagdog'] = factory();
    }
    else {
        root['vue-tagdog'] = factory();
    }

    function factory() {
        return function (Vue, options) {
            options = options || {};
            var directiveName = options.directive || 'tagdog';
            Vue.directive(directiveName, tagdog);
        };
    }
})(this);