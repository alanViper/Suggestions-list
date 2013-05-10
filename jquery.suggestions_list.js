/*!
* Suggestions list - jQuery Plugin
*
* Author: Alan Raphael <alan@xr1.com.br> 
* Version: 0.8
* Requires: jQuery v1.7.1+ 
*
* Dual licensed under the MIT and GPL licenses:
*   http://www.opensource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
*/

(function($){
	$.suggestions_list = function(settings){
		var config = {
			"id_input" 			: false,
			"id_screen_list" 	: false,
			"id_loading" 		: false,
			"url" 				: false,
			"data_link_rev" 	: false,
			"method_type" 		: "GET"
			};

		if(settings){jQuery.extend(config, settings);}

		var id_input = "#"+config.id_input;
		var id_screen_list = "#"+config.id_screen_list;
		var id_loading = "#"+config.id_loading;
		var data_link_rev = config.data_link_rev;

		jQuery(id_input).keyup(function(){
			var input_value = jQuery(id_input).val();
			if(input_value.length > 0){
				jQuery.ajax({
					url: config.url,
					data: {input_text: input_value},
					type: config.method_type,
					success: function(data){
						jQuery(id_loading).css("display", "block");

						if(data.length > 0){
							jQuery(id_screen_list).fadeIn().html(data);
						} else{
							jQuery(id_screen_list).fadeOut();
						}

						jQuery(id_loading).css("display", "none");

						jQuery("a[rev="+data_link_rev+"]").click(function(e){
							e.preventDefault();
							jQuery(id_input).val(jQuery(this).html());
							jQuery(id_screen_list).fadeOut();
						});
					}
				});
			} else{
				jQuery(id_screen_list).fadeOut();
			}
		});
	};
})(jQuery);