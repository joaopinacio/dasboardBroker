var bar;
$( document ).ready(function() {

    $('#toggle').parent().attr('content-off','FECHADA');
    $('#toggle').parent().attr('content-on','ABERTA');
    $('#toggleTwo').parent().attr('content-off','OFF');
    $('#toggleTwo').parent().attr('content-on','ON');


    bar = new ProgressBar.SemiCircle('#progressBar', {
        strokeWidth: 6,
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 1,
        easing: 'easeInOut',
        duration: 2500,
        svgStyle: null,
        text: {
          value: '',
          alignToBottom: false
        },
        // from: {color: '#FFEA82'},
        // to: {color: '#ED6A5A'},
        from: {color: '#717070'},
        to: {color: '#F5B985'},
        step: (state, bar) => {
          bar.path.setAttribute('stroke', state.color);
          var value = Math.round(bar.value() * 100);
          if (value === 0) {
            bar.setText('');
          } else {
            bar.setText(value);
          }
      
          bar.text.style.color = state.color;
        }
    });
    bar.text.style.fontFamily = '"Lato", Helvetica Neue, Arial, Helvetica, sans-serif';
    bar.text.style.fontSize = '1.5rem';
    bar.text.style.fontWeight = '1000';
    bar.text.style.color = '#1b1c1d';
    
    bar.animate((100/100));  // Number from 0.0 to 1.0

    $('#tempValue').countTo({
        from: +$('#tempValue').html(),
        to: 30,
        speed: 2000,  
        refreshInterval: 50,
        onComplete: function(value) {
          var segment = $(this).parent().parent().parent(); // Get the temp segment (card)
          if(value > 25){
            $(segment).addClass('high-color-temp');
            $(segment).removeClass('low-color-temp');
          }else{
            $(segment).removeClass('high-color-temp');
            $(segment).addClass('low-color-temp');
          }
        }
    });

    $('#umidValue').countTo({
        from: +$('#umidValue').html(),
        to: 100,
        speed: 2000,
        refreshInterval: 60,
        onComplete: function(value) {
          var segment = $(this).parent().parent().parent(); // Get the temp segment (card)
          if(value >= 50){
            $(segment).addClass('high-color-umid');
            $(segment).removeClass('low-color-umid');
          }else{
            $(segment).removeClass('high-color-umid');
            $(segment).addClass('low-color-umid');
          }
        }
    });
    
    $('#distValue').countTo({
        from: +$('#distValue').html(),
        to: 100,
        speed: 2000,
        refreshInterval: 60,
        onComplete: function(value) {}
    });

    $('#togglePresence').click(function (e){
      e.preventDefault();
      // $("#togglePresence").prop("checked", true); // Turn the check on
      // $('#togglePresence').parent().parent().toggleClass('on');
    });

    $('#toggleDoorView').click(function (e){
      e.preventDefault();
      // $("#toggleDoorView").prop("checked", true); // Turn the check on
      // $('#toggleDoorView').parent().parent().toggleClass('on');
    });

    $('#toggleAir').click(function (e){
      $('#toggleAir').parent().parent().parent().parent().toggleClass('on');
    });
    
    $('#toggleLum').click(function (e){
      $('#toggleLum').parent().parent().parent().parent().toggleClass('on');
    });

    $('#toggleMult').click(function (e){
      $('#toggleMult').parent().parent().parent().parent().toggleClass('on');
    });

    $('#toggleDoor').click(function (e){
      $('#toggleDoor').parent().parent().parent().parent().toggleClass('on');
    });
});

function changeDistValue(value) {
  $('#distValue').countTo({
      from: +$('#distValue').html(),
      to: +value,
      speed: 2000,
      refreshInterval: 60,
      onComplete: function(value) {}
  });
}

function changeTempValue(value) {
  $('#tempValue').countTo({
      from: +$('#tempValue').html(),
      to: +value,
      speed: 2000,
      refreshInterval: 50,
      onComplete: function(value) {
        var segment = $(this).parent().parent().parent(); // Get the temp segment (card)
        if(value > 25){
          $(segment).addClass('high-color-temp');
          $(segment).removeClass('low-color-temp');
        }else{
          $(segment).removeClass('high-color-temp');
          $(segment).addClass('low-color-temp');
        }
      }
  });
}

function changeUmidValue(value) { 
  $('#umidValue').countTo({
      from: +$('#umidValue').html(),
      to: +value,
      speed: 2000,
      refreshInterval: 60,
      onComplete: function(value) {
        var segment = $(this).parent().parent().parent(); // Get the temp segment (card)
        if(value >= 50){
          $(segment).addClass('high-color-umid');
          $(segment).removeClass('low-color-umid');
        }else{
          $(segment).removeClass('high-color-umid');
          $(segment).addClass('low-color-umid');
        }
      }
  });
}

function changeLumBar(value) {
  bar.animate((value/100));
}

function changePresStatus(value) {
  if(+value == 1){
    $("#togglePresence").prop("checked", true);
  }else{
    $("#togglePresence").prop("checked", false);
  }
}

function changeDoorViewStatus(value) {
  if(+value == 1){
    $("#toggleDoorView").prop("checked", true);
  }else{
    $("#toggleDoorView").prop("checked", false);
  }
}

function changeAirButton(value) {
  if(+value == 1){
    $("#toggleAir").prop("checked", true);
  }else{
    $("#toggleAir").prop("checked", false);
  }
}

function changeLumButton(value) {
  if(+value == 1){
    $("#toggleLum").prop("checked", true);
  }else{
    $("#toggleLum").prop("checked", false);
  }
}

function changeMultButton(value) {
  if(+value == 1){
    $("#toggleMult").prop("checked", true);
  }else{
    $("#toggleMult").prop("checked", false);
  }
}

function changeDoorButton(value) {
  if(+value == 1){
    $("#toggleDoor").prop("checked", true);
  }else{
    $("#toggleDoor").prop("checked", false);
  }
}

function getRoute() {
  var filter = {
    key: 'teste'
  };

  $.ajax({
      url: "https://mqtt.ronaldmiranda.com.br/method/getSearch.php",
      type: 'GET',
      data: filter,
      dataType: 'json',
      async: false,
      success: function (data, textStatus, jqXHR) {
        console.log(data);
        // changeTempValue(value);
        // changeLumBar(value);
        // changeUmidValue(value);
        // changePresStatus(value);
        // changeDistValue(value);
        // changeDoorViewStatus(value);
        // changeAirButton(value);
        // changeLumButton(value);
        // changeMultButton(value);
        // changeDoorButton(value);
      },
      error: function (jqXHR, textStatus, errorThrown) {
          console.log(jqXHR);
      }
  });
}