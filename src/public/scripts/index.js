$(() => {
  $('.new-game-button').each(function() {
    $(this).click(() => {
      $.ajax({
        type: 'POST',
        url: '/games',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify({
          game_type: $(this).data('game')
        })
      })
        .done(data => {
          window.location.href = `/games/${data.uuid}`;
        })
        .fail(err => console.log(err))
    })
  });

  $('.join-game-button').each(function() {
    $(this).click(() => {
      $.ajax({
        type: 'PUT',
        url: `/games/${$(this).data('uuid')}`
      })
        .done(data => {
          window.location.href = `/games/${data.uuid}`;
        })
        .fail(err => console.log(err))
    });
  });
})