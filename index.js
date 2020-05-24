var bar;
$( document ).ready(function() {

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
        from: {color: '#FFEA82'},
        to: {color: '#ED6A5A'},
        // Set default step function for all animate calls
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
    bar.text.style.fontWeight = '400';
    bar.text.style.color = '#1b1c1d';
    
    bar.animate(1.0);  // Number from 0.0 to 1.0

    $('#tempValue').countTo({
        from: +$('#tempValue').html(),
        to: 100,
        speed: 2000,
        refreshInterval: 60,
        onComplete: function(value) {
            console.debug(this);
        }
    });

    $('#umidValue').countTo({
        from: +$('#tempValue').html(),
        to: 100,
        speed: 2000,
        refreshInterval: 60,
        onComplete: function(value) {
            console.debug(this);
        }
    });

    // var bar = new ProgressBar.Circle('#progressBar', {
    //     color: '#aaa',
    //     strokeWidth: 10,
    //     trailWidth: 5,
    //     easing: 'easeInOut',
    //     duration: 2500,
    //     text: {
    //       autoStyleContainer: false
    //     },
    //     from: { color: '#aaa', width: 3 },
    //     to: { color: '#333', width: 8 },
    //     step: function(state, circle) {
    //       circle.path.setAttribute('stroke', state.color);
    //       circle.path.setAttribute('stroke-width', state.width);
      
    //       var value = Math.round(circle.value() * 20);
    //       if (value === 0) {
    //         circle.setText('');
    //       } else {
    //         circle.setText(value);
    //       }
      
    //     }
    // });
    //   bar.text.style.fontFamily = '"Lato", Helvetica Neue, Arial, Helvetica, sans-serif';
    //   bar.text.style.fontSize = '1.5rem';
    //   bar.text.style.fontWeight = '400';
    //   bar.text.style.color = '#1b1c1d';
      
    //   bar.animate(0.5);  // Number from 0.0 to 1.0

});
