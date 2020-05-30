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
    
    bar.animate(1.0);  // Number from 0.0 to 1.0

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
