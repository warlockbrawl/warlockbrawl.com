import * as $ from 'jquery';
import * as isMobile from 'ismobilejs';

if (!isMobile.any) {
  $('.jumbotron-video-container[data-jumbotron-video]').each(function() {
    var $t = $(this),
      html = $t.data('jumbotron-video');
    var $vid = $(html);
    $vid.on('playing', function() {
      $t.removeClass('jumbotron-video-static');
    });
    $t.prepend($vid);
  });
}
