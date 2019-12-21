/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// escape function
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweetDataObj) {
  const markup = `
    <article class="tweet">
      <header>
        <div class="article-avatar-pic">
          <img src=${tweetDataObj["user"]["avatars"]}>
        </div>
        <div class="article-avatar-name">
          <h3>${tweetDataObj["user"]["name"]}</h3>
        </div>
        <div class="article-avatar-username">
          <h4>${tweetDataObj["user"]["handle"]}</h4>
        </div>
      </header>
      <div class="context">
        <p>
          ${escape(tweetDataObj["content"]["text"])}
        </p>
      </div>
      <footer>
        <div class="time">
          ${tweetDataObj["created_at"]}
        </div>
        <div class="icons">
          <div class="flag-icon"><i class="fas fa-flag"></i></div>
          <div class="share-icon"><i class="fas fa-retweet"></i></div>
          <div class="like-icon"><i class="fas fa-heart"></i></div>
        </div>
      </footer>
    </article>
  `;
  return markup;
};


const renderTweets = function(tweets) {
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  tweets.forEach(tweetDataObj => {
    const $tweet = createTweetElement(tweetDataObj);
    $('#tweets-container').prepend($tweet);
  });
};


// why is it that in this case, JSON data does not need to be parsed? Because if it is JSON, AJAX parse it for you
$(document).ready(function() {
  $.ajax('/tweets', { method: 'GET' })
  .then(function(tweetsToLoad) {
    renderTweets(tweetsToLoad);
  });

  $('#error-msg').hide();

  $("#form-inline").submit(function(event) {
    console.log($("#form-inline"));
    console.log(event);

    event.preventDefault();

    if ($('#form-inline textarea').val().length === 0) {
      $('#error-msg').slideUp(() => {});
      $('#error-msg').hide();
      $('#error-msg').text('Error: Please Write Something Cool!');
      $('#error-msg').slideDown(() => {});
    } else if ($('#form-inline textarea').val().length > 140) {
      $('#error-msg').slideUp(() => {});
      $('#error-msg').hide();
      $('#error-msg').text('Error: Too Much To Say!');
      $('#error-msg').slideDown(() => {});
    } else {
      $('#error-msg').slideUp(() => {});
      $.ajax(
        {
        type: "POST",
        url: "/tweets",
        data: $("#form-inline").serialize(),
        }
      ).then(function() {
        $("#tweets-container").empty();
        $.ajax('/tweets', { method: 'GET' })
        .then(function(tweetsToLoad) {
          renderTweets(tweetsToLoad);
          $('#form-inline textarea').val('');
        });
      });
    }  
  });
});