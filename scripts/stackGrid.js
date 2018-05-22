var stackGrid = function(options){

    var vars = {
        originHandle : "",
        dropHandle : "",
        resizeHandle : "",
        aspectRatio: "",
        grid: ""
    }
    var root = this;

    this.construct = function(options){
        $.extend(vars , options);
    }
    
    this.resetgrids = function(){
        /* Load Remaining Reports from table */
    }
    
    /* Enables sorting on the grids */
    this.sortgrids = function(){
        
        $(vars.originHandle).sortable({
                            connectWith: vars.dropHandle,
                            stop:function() {
                                root.resizegrids();
                                root.serializegrids();
                            }
        });
        $(vars.dropHandle).sortable({
                          connectWith: vars.originHandle,
                          stop:function() {
                                root.serializegrids();
                                root.resetgrids();
                          }
        });
    }
    
    /* Call resizable on stop() of sortable */
    this.resizegrids = function(){
        var
            resizableEl = $(vars.dropHandle+" "+vars.resizeHandle),
            fullWidth = resizableEl.parent().width();
    
        resizableEl.resizable({
            containment: vars.dropHandle,
            maxWidth: fullWidth,
            stop:function() {
                root.serializegrids();
            },
            resize:function() {
                $(this).removeClass (function (index, className) {
                    return (className.match (/(^|\s)col-md-\S+/g) || []).join(' ');
                });
            }
        });
    }
    
    /* Serializes the data of each grid and store to the database*/
    this.serializegrids = function(){
        $(vars.dropHandle+" "+vars.resizeHandle).each(function(){
            var fullWidth = $(this).parent().width(),
                columns = 12,
                width = $(this).width(),
                height = $(this).height(),
                report_id = $(this).data("report"),
                col_class = Math.round((width / fullWidth)*columns),
                report = {};
                
            report["id"] = report_id;
            report["width"] = col_class;
            report["height"] = height;
            var report_json = JSON.stringify(report);
            console.log(report_json);
            /* Store reports to user_reports table */
        });
    }
    
    this.construct(options);
}