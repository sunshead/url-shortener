$('.btn-convert').on('click', function(){
	//Ajax call to /api/convert
	$.ajax({
		url: '/api/convert',
		type: 'POST',
		dataType: 'JSON',
		data: {url: $('#long-url').val()},
		success: function(data) {
			var result = '<a class="result" href="' + data.shortUrl + '">'
						 + data.shortUrl + '</a>';
			$('#short-url').html(result);
			$('#short-url').hide().fadeIn('slow'); //TBD
		}
	});
});