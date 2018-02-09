function init(Survey, $) {
  $ = $ || window.$;
  var widget = {
    name: "camera-image",
    title: "Image Uploader",
    iconName: "icon-image",
    htmlTemplate: "<pms-widget-image></pms-widget-image>",
    widgetIsLoaded: function() {
      return typeof $ === "function"
        && typeof PmsWidgetImage === "function"; //TODO: Polymer has imported and ready to use...
    },
    isFit: function(question) {
      return question.getType() === "camera-image";
    },
    activatedByChanged: function(activatedBy) {
      if (!this.widgetIsLoaded()) return;
      Survey.JsonObject.metaData.addClass("camera-image", [], null, "empty");
    },
    afterRender: function(question, el) {
      if (el.tagName !== 'PMS-WIDGET-IMAGE')
        el = el.querySelector('pms-widget-image');
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
