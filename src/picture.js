function init(Survey, $) {
  $ = $ || window.$;
  var widget = {
    name: "picture",
    title: "Picture Selector",
    iconName: "icon-gallery",
    htmlTemplate: "<pms-widget-picture></pms-widget-picture>",
    widgetIsLoaded: function() {
      return typeof $ === "function"
        && typeof PmsWidgetPicture === "function"; //TODO: Polymer has imported and ready to use...
    },
    isFit: function(question) {
      return question.getType() === "picture";
    },
    activatedByChanged: function(activatedBy) {
      if (!this.widgetIsLoaded()) return;
      Survey.JsonObject.metaData.addClass("picture", [], null, "empty");
    },
    afterRender: function(question, el) {
      if (el.tagName !== 'PMS-WIDGET-PICTURE')
        el = el.querySelector('pms-widget-picture');
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
