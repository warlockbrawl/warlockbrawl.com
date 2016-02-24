$(function() {
	if (!isMobile.any) {
		$('.jumbotron-video-container[data-jumbotron-video]').each(function() {
			var $t = $(this),
				path = '/assets/img/' + $t.data('jumbotron-video');
			var $vid = $('<video class="jumbotron-video" loop muted autoplay poster="' + path + '.jpg"><source src="' + path + '.webm" type="video/webm"></source><source src="' + path + '.mp4" type="video/mp4"></source><source src="' + path + '.ogv" type="video/ogg"></source></video>');
			$vid.on('playing', function() {
				$t.removeClass('jumbotron-video-static');
			});
			$t.prepend($vid);
		});
	}
});
