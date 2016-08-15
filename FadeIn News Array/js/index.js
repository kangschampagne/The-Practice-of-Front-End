	var sliderArray = [
		"index1.jpg",
		"index2.jpg",
		"index3.jpg",
		"index4.jpg",
		"index5.jpg"
	];

	var imgDir = 'img/index';
	$(".container").append('<div class="slider-image"></div>');
	$(".slider-image").html('<img class="img/'+sliderArray[0]+'">');
	$(".slider-image").after('<ul id="nav"></ul>');

	var sliderLength = slider0Array.length;

	for (var i = 0; i<sliderLength;i++) {
		var sliderText = i+1;
		$("#nav").append('<li><a href="#" rel = "'+sliderText+'">'+sliderText+'</a></li>')
	}

	$("#nav li a ").on('click mouseover',function(){
		var numSlider = $(this).attr('rel');
		$(".slider-image").html('<img src="'+imgDir+numSlider+'.jpg"/>');
		$(".slider-image img").fadeIn(2000);
		$("#nav li a").removeClass('active');	
		$(this).addClass('active');
	})

	$("#nav li a:eq(0)").click();