/*
** assign variables in global scope
*/

var a = 0,
  b = 0,
  is_a = true,
  is_b = false,
  o = 'null',
  answer = 0,
  first_a = true,
  first_b = true,
  is_submission = false,
  format_sub = false,
  display = jQuery('#total');



/*
** Calculator main Functions 
*/

// console.log
function write(x) {
  console.log(x);
}
// add int to current display value
function changeDisplayVal(i) {
  display.text(display.text() + i);
}
// make * into ×
function  changeOperand(x) {
  if ( x === '*' ) {
 
    return '×';
  } else if ( x === '/' ) {
 
    return '÷';
  } else {
    return x;
  }
}
// set display value
function setDisplayVal(x) {
  display.text( changeOperand(x));
}
// type of animation
function animateButton(obj) {
  var button = obj.addClass('hovering');
  setTimeout(function() {
      button.removeClass('hovering');
  }, 100);
}



/*
** operation functions
*/

// setting a
function set_a(i) {
  if ( is_a ) {
    // nothing if a duplicate decimal
    if ( i === '.' && a.toString().indexOf('.') !== -1 ) {
      write('Duplicate Decimal');
      i = '';
    } else if ( i === '.' && first_a ) {
      i = '0.';
    }
    // first_a time, we need to clear the display
    if ( first_a === true ) {
      if ( i === '0' ) {
        i = '';
      } else {
        // set display value
        setDisplayVal(i);
        // no longer first_a
        first_a = false;
      }
    } else {
      // add int to current display value
      changeDisplayVal(i);
    }

    a = display.text();

    write('Set "a" to ' + a);
  }
}

// setting b
function set_b(i) {
  if ( !is_a ) {
    // nothing if a duplicate decimal
    if ( i === '.' && b.toString().indexOf('.') !== -1 ) {
      write('Duplicate Decimal!');
      i = '';
    } else if ( i === '.' && first_b ) {
      i = '0.';
    }
    // first_b time, we need to clear the display
    if ( first_b === true ) {
      if ( i === '0' ) {
        i = '';
      } else {
        // set display value
        setDisplayVal(i);
        // no longer first_b
        first_b = false;
      }
    } else {
      // add int to current display value
      changeDisplayVal(i);
    }
    // set b to current display Value
    b = display.text();

    write('Set "b" to ' + b);
  }
}

// looping calculator
function loop_calc(answer) {
  write('Loop Calculator');

  a = answer;
  b = 0;
  answer = 0;
  // set display value
  setDisplayVal(a);
}

// setting operator
function set_o(op) {
  
  if ( is_submission ) {
    loop_calc(display.text());
    is_submission = false;
  }
  // if new op is submitting calc
  if ( !first_b ) {
    format_submit_calc();
  }


  setDisplayVal(op);
  
  o = op;

  if ( is_a ) { is_a = false; }
  if ( !is_b ) { is_b = true; }

  write('Set "o" to ' + o);
}

// format submit calc
function format_submit_calc() {
  // evaluate equation
  var preCalc = eval(a + '' + o + '' + b);
  
  answer = parseFloat(preCalc.toPrecision(12));

  // submit answer to display
  display.text(answer);

  // reset first_b to true
  first_b = true;

  // post result
  newResult(a,o,b,answer);

  write(a + ' ' + o + ' ' + b + ' = ' + answer);

  a = answer;
  b = 0;
  o = o;
  // set display value
  setDisplayVal(o);
  is_a = false;
  is_b = true;

  first_b = true;

  format_sub = true;

  write(' Submission');
}

// submit calculator
function submit_calc() {
  write('Submission');
  if ( first_b === false ) {
    var preCalc = 0;
    if ( o === "^" ) {
        // evaluate equation
        preCalc = Math.pow(a,b);
    } else {
        // evaluate equation
        preCalc = eval(a + '' + o + '' + b);
    }
    // parse float to 12
    answer = parseFloat(preCalc.toPrecision(12));

    // submit answer to display
    display.text(answer);
    // display is now the answer
    is_submission = true;
    // reset first_b to true
    first_b = true;

    // post result
    newResult(a,o,b,answer);

    write(a + ' ' + o + ' ' + b + ' = ' + answer);
  } else {
    write("Oops! we could not format this submission");
  }
}

// negging value
function neg() {
  display.text(display.text() * -1);
  if ( is_submission ) {
    a = a * -1;
  } else {
    if ( is_a ) {
      a = a * -1;
      setDisplayVal(a);
    } else {
      b = b * -1;
      setDisplayVal(b);
    }
  }
}

// resetting calculator
function reset_calc() {
  a = 0;
  b = 0;
  o = 'null';
  answer = 0;
  is_a = true;
  is_b = false;
  first_a = true;
  first_b = true;
  is_submission = false;
  format_sub = false;
  display.text(0);

  // reset display value
  setDisplayVal(0);

  write('Calculator Reset');
}

// backspacing value
function backspace() {
  if ( display.text() !== '' && display.text() !== '0' ) {
    display.text( display.text().substring(0, display.text().length - 1) );
    if ( is_a === true ) {
        a = parseFloat(a.toString().substring(0, a.toString().length - 1 ));
    } else {
        b = parseFloat(b.toString().substring(0, b.toString().length - 1 ));
    }
  } else {
    write('Nothing Left to Backspace');
  }
}

/*
**  Events
*/

// clicks
jQuery('.calc_int, #calc_decimal').each(function() {
  jQuery(this).click(function() {
    var value = jQuery(this).val();
    if ( is_submission === false ) {
      if ( is_a === true ) {
        set_a(value);
      } else {
        set_b(value);
      }
    } else {
      reset_calc();
      set_a(value);
    }
  });
});

// click operators
jQuery('.calc_op').each(function() {
  jQuery(this).click(function() {
    var value = jQuery(this).val();
    set_o(value);
  });
});

// click equals
jQuery('#calc_eval').click(function() {
  submit_calc();
});

// click clear
jQuery('#calc_clear').click(function() {
  reset_calc();
});

// click neg
jQuery('#calc_neg').click(function() {
  neg();
});

// click backspace
jQuery('#calc_back').click(function() {
  backspace();
});





/*
** Key Events
*/

// key press for integers and operators
jQuery(document).keypress(function (e) {
  // the character code
  var charCode = e.which;
  // the key
  var key = String.fromCharCode(charCode);

  // key integers & decimal
  if ( charCode >= 46 && charCode <= 58 && charCode !== 47 ) {
    if ( !is_submission ) {
      if ( is_a ) {
        set_a(key);
      } else {
        set_b(key);
      }
    } else if ( format_sub ) {
      set_b(key);
    } else {
      reset_calc();
      set_a(key);
    }
  }

  // operators
  if ( charCode >= 42 && charCode <= 45 && charCode !== 44 || charCode === 47 ) {
    set_o(key);
  }

  // key equals
  if ( charCode === 61 ) {
    submit_calc();
  }

  // animate the corrosponding button
  jQuery('button').each(function() {
    var value = jQuery(this).val();
    if ( value === key ) {
      animateButton(jQuery(this));
    }
  });

});

// keydown for backspace and return
jQuery(document).keydown(function (e) {

  // the character code
  var charCode = e.which;

  // backspace
  if ( charCode === 8 ) {
    backspace();
    animateButton(jQuery('#calc_back'));
    return false;
  }

  // clear
  if ( charCode === 12 ) {
    reset_calc();
    animateButton(jQuery('#calc_clear'));
    return false;
  }

  // return
  if ( charCode === 13 ) {
    submit_calc();
    animateButton(jQuery('#calc_eval'));
    return false;
  }

});
