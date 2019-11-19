$(() => {
  $('.new-game-button').each(function() {
    $(this).click(() => {
      $.ajax({
        type: 'POST',
        url: '/games',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({
          game_type: $(this).data('game'),
          username: document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1")
        })
      })
        .done(data => {
          window.location.href = `/games/${data.uuid}`;
        })
        .fail(err => console.log(err))
    })
  })
})