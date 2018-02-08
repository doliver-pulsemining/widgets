function init(Survey, $) {
  $ = $ || window.$;
  var widget = {
    name: "barcode",
    title: "Barcode Scanner",
    iconName: "icon-imagepicker",
    htmlTemplate: "<pms-barcode-widget></pms-barcode-widget>",
    widgetIsLoaded: function() {
      return typeof $ === "function"
        && typeof PmsBarcodeWidget === "function"; //TODO: Polymer has imported and ready to use...
    },
    isFit: function(question) {
      return question.getType() === "barcode";
    },
    activatedByChanged: function(activatedBy) {
      if (!this.widgetIsLoaded()) return;
      Survey.JsonObject.metaData.addClass("barcode", [], null, "empty");
    },
    afterRender: function(question, el) {
      if (el.tagName !== 'PMS-BARCODE-WIDGET')
        el = el.querySelector('pms-barcode-widget');
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
