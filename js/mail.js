import * as $ from 'jquery'

$('[data-mail]').each(function() {
  var $this = $(this),
    mail = $this.data('mail') || $this.html();
  mail = mail.replace(' ', '@').replace(' ', '.');
  if ($this.is('a')) {
    $this.attr('href', 'mailto:' + mail);
  } else {
    $this.html(mail);
  }
});
