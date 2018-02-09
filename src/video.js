function init(Survey, $) {
  $ = $ || window.$;
  var widget = {
    name: "video",
    title: "Video Selector",
    iconName: "icon-imagepicker",
    htmlTemplate: "<pms-widget-video></pms-widget-video>",
    widgetIsLoaded: function() {
      return typeof $ === "function"
        && typeof PmsWidgetVideo === "function"; //TODO: Polymer has imported and ready to use...
    },
    isFit: function(question) {
      return question.getType() === "video";
    },
    activatedByChanged: function(activatedBy) {
      if (!this.widgetIsLoaded()) return;
      Survey.JsonObject.metaData.addClass("video", [], null, "empty");
    },
    afterRender: function(question, el) {
      if (el.tagName !== 'PMS-WIDGET-VIDEO')
        el = el.querySelector('pms-widget-video');
      var isValueChanging = false;
      var updateValueHandler = function() {
        if (isValueChanging) return;
        el.value = question.value;
      };
      $(el).on("value-changed", function() {
        isValueChanging = true;
        question.value = el.value;
        isValueChanging = false;
      });
      question.valueChangedCallback = updateValueHandler;
      updateValueHandler();
    },
    willUnmount: function(question, el) {}
  };

  Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "customtype");
}

if (typeof Survey !== "undefined") {
  init(Survey, window.$);
}

export default init;
