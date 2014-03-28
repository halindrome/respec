// Module w3c/permalinks
// Adds "permalinks" into the document at sections with explicit IDs
// Introduced by Shane McCarron (shane@aptest.com) from the W3C PFWG
// Only enabled when the includePermalinks option is set to true.
// Defaults to false.

define(
    ["text!w3c/css/permalinks.css", "core/utils"], // load this to be sure that the jQuery extensions are loaded
    function (css, utils) {
        return {
            run:    function (conf, doc, cb, msg) {
                if (conf.includePermalinks === true ) {
                    msg.pub("start", "w3c/permalinks");
                    $(doc).find("head link").first().before($("<style/>").text(css));
                    var $secs = $(doc).find("h2, h3, h4, h5, h6");
                    $secs.each(function(i, item) {
                        var $item = $(item)
                        ,   resourceID = $item.attr('id');

                            var par = $item.parent()[0];
                            if (par && par.localName && par.localName.toLowerCase() == "section") {
                                if (!$(par).hasClass("introductory")) {
                                    resourceID = $(par).attr('id') ;
                                } else {
                                    resourceID = null;
                                }
                            }

                        // if we still have resourceID
                        if (resourceID != null) {
                            // we have an id.  add a permalink
                            // right after the h* element
                            $item.after("<p class='permalink'><a href='#"+resourceID+"' title='Permalink for "+resourceID+"'>#</a></p>");
                        }
                    });
                    msg.pub("end", "w3c/permalinks");
                };
                cb();
            }
        };
    }
);
