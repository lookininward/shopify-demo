$(function() {

  // focus quantity input of first variant on page load
  $('table .quantity:first').focus();

  // validate - quantity doesn't exceed stock
  $('[max]').change(function() {
    var max = parseInt($(this).attr('max'), 10);
    var value = parseInt($(this).val(), 10) || 0;
    if (value > max) {
      alert('We only have ' + max + ' of this item in stock');
      $(this).val(max);
      $(this).addClass("input--error");
    }
  });

  // validate - engraving text doesn't exceed 5 char
  $('.engraving').change(function() {
    let engravingText = $(this).val();
    if (engravingText.length > 5) {
      alert('Engravings are limited to 5 characters');
      $(this).val(engravingText.slice(0,5));
      $(this).addClass("input--error");
    }
  });

  $("#SubmitOrder").click(function (event) {
    event.preventDefault();
    event.stopPropagation();
    $(".input-error-message").html(); // clear error if any

    const variants = $( ".variant-row" ).toArray();
    const selectedVariants = variants.filter(variant =>
       parseInt($(variant).find( ".quantity" ).val()) > 0
    );

    if (selectedVariants.length < 1) {
      $(".input-error-message").html('Please select at least one item.');
      return;
    }

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