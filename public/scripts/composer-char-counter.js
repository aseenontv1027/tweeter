$(document).ready(function() {
  const num = 140;
  $('textarea').on("keyup", function() {
    const characterCount = $(this).val().length;
    let charLeft = num - characterCount;
    console.log(charLeft);
    if (charLeft >= 0) {
      $($(this).siblings("span")).addClass('plus-char');
      $($(this).siblings("span")).removeClass('minus-char');
    } else {
      $($(this).siblings("span")).addClass('minus-char');
      $($(this).siblings("span")).removeClass('plus-char');
    }
    $($(this).siblings("span")).text(num - characterCount);
  });
});