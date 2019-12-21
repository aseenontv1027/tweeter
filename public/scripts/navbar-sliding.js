$(document).ready(function() {
  let clicks = 0;
  $(".write-new-tweet-arrow").click(function() {
    if (clicks % 2 === 0) {
      $('.new-tweet').slideUp(() => {});
      clicks++;
    } else {
      $('.new-tweet').slideDown(() => {});
      $('#form-inline textarea').focus();
      clicks++;
    }
  });
});