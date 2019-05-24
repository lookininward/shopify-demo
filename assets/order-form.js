$(function() {

  /* -- Validation --------------------------------------------------------- */
  // focus quantity input of first variant on page load
  $('table .quantity:first').focus();

  // validate - quantity doesn't exceed stock
  $('[max]').change(function(event) {
    var max = parseInt($(this).attr('max'), 10);
    var value = parseInt($(this).val(), 10) || 0;
    if (value > max) {
      $(this).val(0);
      _notify('error', `We only have ${max} of this item in stock.`);
    }
  });

  // validate - engraving text doesn't exceed 5 char
  $('.engraving').change(function() {
    let engravingText = $(this).val();
    const max = $(this).attr('max');
    if (engravingText.length > max) {
      $(this).val(engravingText.slice(0, max));
      _notify('error', `Engravings can be up to ${max} characters. They\'ll come out great. Promise!`);
    }
  });

  function _clearErrors() {
    $(".notifications").removeClass("has-error");
    $(".notifications").removeClass("is-loading");
    $(".notifications").html();
  };

  function _notify(type, notificationText) {
    _clearErrors();
    const notifications = $(".notifications");
    notifications.html(notificationText);

    if (type == 'error') {
      notifications.addClass("has-error");
    } else if (type == 'success') {
      notifications.addClass("is-loading");
    }

    setTimeout(function() { // clear errors after x ms
      _clearErrors();
    }, 2400);
  }

  /* -- Submit Order --------------------------------------------------------*/
  $("#SubmitOrder").click(function (event) {
    event.preventDefault();
    event.stopPropagation();
    _clearErrors();

    const variants = $( ".variant-row" ).toArray();
    const selectedVariants = variants.filter(variant =>
       parseInt($(variant).find( ".quantity" ).val()) > 0
    );

    if (selectedVariants.length < 1) {
      _notify('error','Please select at least one item.');
      return;
    }

    // Notification - Loading
    _notify(
      'success',
      "Hang on. You'll be redirected to checkout in a moment."
    );

    const payloads = selectedVariants.map(variant => {
      return {
        id: parseInt($(variant).attr( "id" )),
        quantity: parseInt($(variant).find( ".quantity" ).val()),
        properties: {
          engraving: $(variant).find( ".engraving" ).val(),
          plastic: $(variant).find(".plastic").prop('checked') == true
        }
      }
    });

    _moveAlong(payloads);
  });

  function _moveAlong(payloads) {
    if (payloads.length) { // requests in queue, process next request
      const request = payloads.shift();
      _addItem(request, payloads);
    } else { // queue empty, redirect to checkout
      window.location.href = "/checkout";
    }
  };

  function _addItem(request, payloads) {
    fetch('/cart/add.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    }).then(response => response.json())
      .then(() => { _moveAlong(payloads) })
  };

});