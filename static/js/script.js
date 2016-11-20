(function() {

// Localize jQuery variable
var jQuery;

/******** Load jQuery if not present *********/
if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.11.2') {
    var script_tag = document.createElement('script');
    script_tag.setAttribute("type","text/javascript");
    script_tag.setAttribute("src",
        "http://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js");
    if (script_tag.readyState) {
      script_tag.onreadystatechange = function () { // For old versions of IE
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
              scriptLoadHandler();
          }
      };
    } else {
      script_tag.onload = scriptLoadHandler;
    }
    // Try to find the head, otherwise default to the documentElement
    (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
} else {
    // The jQuery version on the window is the one we want to use
    jQuery = window.jQuery;
    main();
}

/******** Called once jQuery has loaded ******/
function scriptLoadHandler() {
    // Restore $ and window.jQuery to their previous values and store the
    // new jQuery in our local jQuery variable
    jQuery = window.jQuery.noConflict(true);
    // Call our main function
    main(); 
}

/******** Our main function ********/
function main() { 
    jQuery(document).ready(function($) { 

          /******* Load CSS *******/
        var css_link = $("<link>", { 
            rel: "stylesheet", 
            type: "text/css", 
            href: "custom.css" 
        });
        css_link.appendTo('head');   

        /******* Load HTML *******/
        var jsonp_url = "http://al.smeuh.org/cgi-bin/webwidget_tutorial.py?callback=?";
        $.getJSON(jsonp_url, function(data) {
          $('#example-widget-container').append("<div class='cardpanel panel panel-primary'><div class='panel-body'><img src='<?php echo $photopath ?>' class='img-rounded' alt='profile pic' width='60px' height='60px'/><p><h6><a target='_blank' href='https://twitter.com/<?php echo $uqname ?>'>@<?php echo $uqname ?></a></h6></p><div class='row'><div class='col-sm-6 col-xs-12 col-md-6 col-lg-6'><p><a href='individualWork.php?user="+name+"' style='left:10px;'>Work</a></p></div><div class='col-sm-6 col-xs-12 col-md-6 col-lg-6'><p><a href='individualWork.php?user="+name+"' style='right:10px;'>Activities</a></h6></p></div></div></div></div><div class = 'container'><div class = 'panel-body' style='margin-top:10px;'><h5>Follow/Subscribe</h5></div></div>");
        });
    });
}

})(); // We call our anonymous function immediately