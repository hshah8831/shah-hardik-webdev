module.exports = function () {
    var mongoose = require("mongoose");
    var wigdetModel = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    }
    return wigdetModel;

    function createWidget(pageId, widget) {

    }

    function findAllWidgetsForPage(pageId) {

    }

    function findWidgetById(widgetId) {

    }

    function updateWidget(widgetId, widget) {

    }

    function deleteWidget(widgetId) {

    }
    
    function reorderWidget(pageId, start, end) {
        
    }
}
