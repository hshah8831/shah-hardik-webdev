module.exports = function () {
    var mongoose = require("mongoose");
    var widgetSchema = require("./widget.schema.server.js");
    var q = require("q");
    var model = mongoose.model('widget', widgetSchema);

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
        var deferred = q.defer();
        widget._page = pageId;
        model.create(widget, function (err, res) {
            if(err) deferred.reject(err);
            else deferred.resolve(res);
        });
        return deferred.promise;
    }

    function findAllWidgetsForPage(pageId) {
        var deferred = q.defer();
        model.find({_page:pageId}, function (err, res) {
            if(err) deferred.reject(err);
            else deferred.resolve(res);
        });
        return deferred.promise;
    }

    function findWidgetById(widgetId) {
        var deferred = q.defer();
        model.find(widgetId, function (err, res) {
            if(err) deferred.reject(err);
            else deferred.resolve(res);
        });
        return deferred.promise;
    }

    function updateWidget(widgetId, widget) {
        var deferred = q.defer();
        model.update(widgetId,{$set : widget}, function (err, res) {
            if(err) deferred.reject(err);
            else deferred.resolve(res);
        });
        return deferred.promise;
    }

    function deleteWidget(widgetId) {
        var deferred = q.defer();
        model.remove({_id: widgetId},function (err, res) {
            if(err) deferred.reject(err);
            else deferred.resolve(res);
        });
        return deferred.promise;
    }
    
    function reorderWidget(pageId, start, end) {
        var deferred = q.defer();
        findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                widgets = internalReorder(widgets, start, end);
                var updatePromises = [];
                for( var w in widgets){
                    updatePromises.push(updateWidget(widgets[w]._id, widgets[w]))
                }
                Promise.all(updatePromises).then(function (result) {
                    deferred.resolve(res);
                }, function (err) {
                    deferred.reject(err);
                })
            }, function (err) {
                deferred.reject(err);
            })
    }

    function internalReorder(widgets, start, stop) {
        start=parseInt(start);
        stop=parseInt(stop);
        var mult = -1;
        var curInd=start;
        //if stop is greater than start, all the intermediate widgets would move one step up (-1) else (+1)
        if(start>stop){
            mult = 1;
            curInd=stop;
        }

        for(w in widgets){
            curInd = widgets[w].index;
            if(mult == 1){
                if(curInd>=stop && curInd<=start) widgets[w].index+=mult;
            } else if(mult == -1){
                if(curInd>=start && curInd<=stop) widgets[w].index+=mult;
            }
            if(curInd==start) widgets[w].index=stop;
            curInd++;
        }
        return widgets;
    }
}
