$(function() {

  /* -- Validation --------------------------------------------------------- */
  // focus quantity input of first variant on page load
  $('table .quantity:first').focus();

  // validate - quantity doesn't exceed stock
  $('[max]').change(function(event) {
    var max = parseInt($(this).attr('max'), 10);
    var value = parseInt($(this).val(), 10) || 0;
    if (value > max) {
      $(this).val(max);
      _addError('We only have ' + max + ' of this item in stock');
    }
  });

  // validate - engraving text doesn't exceed 5 char
  $('.engraving').change(function() {
    let engravingText = $(this).val();
    if (engravingText.length > 5) {
      $(this).val(engravingText.slice(0,5));
      _addError('Engravings are limited to 5 characters.');
    }
  });

  function _clearErrors() {
    $(".notifications").html();
    $(".notifications").removeClass("has-error");
  }

  function _addError(errorText) {
    _clearErrors();
    $(".notifications").html(errorText);
    $(".notifications").addClass("has-error");

    setTimeout(function() { // clear errors after x ms
      _clearErrors();
    }, 1000);
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
      _addError('Please select at least one item.');
      return;
    }

    // Notification - Loading
    $(".notifications").html("Hang on while we add update the cart with your order.<br>You will be redirected in a moment");
    $(".notifications").addClass("is-loading");

    const payloads = selectedVariants.map(variant => {
      return {
        id: parseInt($( variant).attr( "id" )),
        quantity: parseInt($(variant).find( ".quantity" ).val()),
        properties: {
          engraving: $(variant).find( ".engraving" ).val(),
          plastic: $(variant).find(".plastic")
                                     .prop('checked') == true
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