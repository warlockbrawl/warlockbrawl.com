$(function() {
	if (!isMobile.any) {
		$('.bg-video-container[data-bg-video]').each(function() {
			var $t = $(this),
				path = '/assets/img/' + $t.data('bg-video');
			var $vid = $('<video class="bg-video" loop muted autoplay poster="' + path + '.jpg"><source src="' + path + '.webm" type="video/webm"></source><source src="' + path + '.mp4" type="video/mp4"></source><source src="' + path + '.ogv" type="video/ogg"></source></video>');
			$vid.on('load', function() {
				$t.removeClass('bg-video-static');
			});
			$t.prepend($vid);
		});
	}
});
