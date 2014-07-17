$(function() {

	var	maxWidth = 500,
		maxHeight = 500,
		photo = $('#photo'),
		originalCanvas = null,
		filters = $('#filters li a'),
		filterContainer = $('#filterContainer');

	photo.fileReaderJS({
		on:{
			load: function(e, file){

				var img = $('<img>').appendTo(photo),
					imgWidth, newWidth,
					imgHeight, newHeight,
					ratio;

				photo.find('canvas').remove();
				filters.removeClass('active');

				img.load(function() {

					imgWidth  = this.width;
					imgHeight = this.height;


					if (imgWidth >= maxWidth || imgHeight >= maxHeight) {

						if (imgWidth > imgHeight) {

							// Wide
							ratio = imgWidth / maxWidth;
							newWidth = maxWidth;
							newHeight = imgHeight / ratio;

						} else {

							// Tall or square
							ratio = imgHeight / maxHeight;
							newHeight = maxHeight;
							newWidth = imgWidth / ratio;

						}

					} else {
						newHeight = imgHeight;
						newWidth = imgWidth;
					}

					// Create the original canvas.

					originalCanvas = $('<canvas>');
					var originalContext = originalCanvas[0].getContext('2d');

					// Set the attributes for centering the canvas

					originalCanvas.attr({
						width: newWidth,
						height: newHeight
					}).css({
						marginTop: -newHeight/2,
						marginLeft: -newWidth/2
					});

					originalContext.drawImage(this, 0, 0, newWidth, newHeight);

					// We don't need this any more
					img.remove();

					filterContainer.fadeIn();

					// Trigger the default "normal" filter
					filters.first().click();
				});


				img.attr('src', e.target.result);
			},

			beforestart: function(file){

				return /^image/.test(file.type);
			}
		}
	});

	// Listen for clicks on the filters

	filters.click(function(e){

		e.preventDefault();

		var f = $(this);

		if(f.is('.active')){
			// Apply filters only once
			return false;
		}

		filters.removeClass('active');
		f.addClass('active');

		var clone = originalCanvas.clone();

		// Clone the image stored in the canvas as well
		clone[0].getContext('2d').drawImage(originalCanvas[0],0,0);

		photo.find('canvas').remove().end().append(clone);

		var effect = $.trim(f[0].id);

		Caman(clone[0], function () {

			// If such an effect exists, use it:

			if( effect in this){
				this[effect]();
				this.render();

				// Show the download button
				showDownload(clone[0]);
			}
			else{
				hideDownload();
			}
		});

	});

	filterContainer.find('ul').on('mousewheel',function(e, delta){

		this.scrollLeft -= (delta * 50);
		e.preventDefault();

	});

	var downloadImage = $('a.downloadImage');

	function showDownload(canvas){


		downloadImage.off('click').click(function(){
			
			var url = canvas.toDataURL("image/png;base64;");
			downloadImage.attr('href', url);
			
		}).fadeIn();

	}

	function hideDownload(){
		downloadImage.fadeOut();
	}

});
