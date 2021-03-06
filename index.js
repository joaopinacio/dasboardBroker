
var bar;

/* FireBase

// (function(){
//   var firebaseConfig = {
//     apiKey: "AIzaSyAaCBN9_ucz_A4qtq2geZRl7uknsqAkJwY",
//     authDomain: "dashboard-projeto.firebaseapp.com",
//     databaseURL: "https://dashboard-projeto.firebaseio.com",
//     projectId: "dashboard-projeto",
//     storageBucket: "dashboard-projeto.appspot.com",
//     messagingSenderId: "851013457828",
//     appId: "1:851013457828:web:2a8a3e866f95f0cdd41331",
//     measurementId: "G-8MJP0ZRQ8Y"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();

// })()

// var db = firebase.database();

// // Cria os listeners dos dados no firebase
// var tempViewValue = db.ref('room/temperatura');
// var lumViewValue = db.ref('room/luminosidade');
// var umidViewValue = db.ref('room/umidade');
// var presViewValue = db.ref('room/presenca');
// var distValue = db.ref('room/distancia');
// var doorViewValue = db.ref('room/porta-status');
// var airValue = db.ref('room/ar-condicionado');
// var lumValue = db.ref('room/luz');
// var multValue = db.ref('room/multimidia');
// var doorValue = db.ref('room/porta-acao');

*/

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
          var value = Math.round(bar.value() * 1000);
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
    
    // bar.animate((100/100));  // Number from 0.0 to 1.0

    // getAllValues(); // FireBase
    getAllData();
    setInterval(() => {
      getAllData();
    }, 5000);

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
      var filter = {
        value: ($('#toggleAir').prop('checked') ? 1 : 0)
      };
    
      $.ajax({
          url: "https://mqtt.ronaldmiranda.com.br/sala/set_ar",
          type: 'POST',
          data: filter,
          dataType: 'json',
          success: function (data, textStatus, jqXHR) {
            console.log(data);
          },
          error: function (jqXHR, textStatus, errorThrown) {
              console.log(jqXHR);
          }
      });

      if($('#toggleAir').parent().parent().parent().parent().hasClass('on')){
        // airValue.set(0).then().catch();
      $('#toggleAir').parent().parent().parent().parent().removeClass('on');
      }else{
        // airValue.set(1).then().catch();
        $('#toggleAir').parent().parent().parent().parent().addClass('on');
      }

    });
    
    $('#toggleLum').click(function (e){
      var filter = {
        value: ($('#toggleLum').prop('checked') ? 1 : 0)
      };
    
      $.ajax({
          url: "https://mqtt.ronaldmiranda.com.br/sala/set_luminosidade",
          type: 'POST',
          data: filter,
          dataType: 'json',
          success: function (data, textStatus, jqXHR) {
            console.log(data);
          },
          error: function (jqXHR, textStatus, errorThrown) {
              console.log(jqXHR);
          }
      });

      if($('#toggleLum').parent().parent().parent().parent().hasClass('on')){
        // lumValue.set(0).then().catch();
        $('#toggleLum').parent().parent().parent().parent().removeClass('on');
      }else{
        // lumValue.set(1).then().catch();
        $('#toggleLum').parent().parent().parent().parent().addClass('on');
      }
    });

    $('#toggleMult').click(function (e){
      if($('#toggleMult').parent().parent().parent().parent().hasClass('on')){
        // multValue.set(0).then().catch();
        $('#toggleMult').parent().parent().parent().parent().removeClass('on');
      }else{
        // multValue.set(1).then().catch();
        $('#toggleMult').parent().parent().parent().parent().addClass('on');
      }

      var filter = {
        value: ($('#toggleMult').prop('checked') ? 1 : 0)
      };
    
      $.ajax({
          url: "https://mqtt.ronaldmiranda.com.br/sala/set_multimidia",
          type: 'POST',
          data: filter,
          dataType: 'json',
          success: function (data, textStatus, jqXHR) {
            console.log(data);
          },
          error: function (jqXHR, textStatus, errorThrown) {
              console.log(jqXHR);
          }
      });
    });

    $('#toggleDoor').click(function (e){
      if($('#toggleDoor').parent().parent().parent().parent().hasClass('on')){
        // doorValue.set(0).then().catch();
        $('#toggleDoor').parent().parent().parent().parent().removeClass('on');
      }else{
        // doorValue.set(1).then().catch();
        $('#toggleDoor').parent().parent().parent().parent().addClass('on');
      }

      var filter = {
        value: ($('#toggleDoor').prop('checked') ? 1 : 0)
      };
    
      $.ajax({
          url: "https://mqtt.ronaldmiranda.com.br/sala/set_porta",
          type: 'POST',
          data: filter,
          dataType: 'json',
          success: function (data, textStatus, jqXHR) {
            console.log(data);
          },
          error: function (jqXHR, textStatus, errorThrown) {
              console.log(jqXHR);
          }
      });
    });
});

// function getAllValues(){
//   tempViewValue.on('value', function(snapshot) {
//     $('#tempValue').countTo({
//         from: +$('#tempValue').html(),
//         to: +snapshot.val(),
//         speed: 2000,
//         refreshInterval: 50,
//         onComplete: function(value) {
//           var segment = $(this).parent().parent().parent(); // Get the temp segment (card)
//           if(value > 25){
//             $(segment).addClass('high-color-temp');
//             $(segment).removeClass('low-color-temp');
//           }else{
//             $(segment).removeClass('high-color-temp');
//             $(segment).addClass('low-color-temp');
//           }
//         }
//     });
//   });

//   lumViewValue.on('value', function(snapshot) {
//     bar.animate((+snapshot.val()/1000));
//   });

//   umidViewValue.on('value', function(snapshot) {
//     $('#umidValue').countTo({
//         from: +$('#umidValue').html(),
//         to: +snapshot.val(),
//         speed: 2000,
//         refreshInterval: 60,
//         onComplete: function(value) {
//           var segment = $(this).parent().parent().parent(); // Get the temp segment (card)
//           if(value >= 50){
//             $(segment).addClass('high-color-umid');
//             $(segment).removeClass('low-color-umid');
//           }else{
//             $(segment).removeClass('high-color-umid');
//             $(segment).addClass('low-color-umid');
//           }
//         }
//     });
//   });

//   presViewValue.on('value', function(snapshot) {
//     if(+snapshot.val() == 1){
//       $("#togglePresence").prop("checked", true);
//     }else{
//       $("#togglePresence").prop("checked", false);
//     }
//   });

//   distValue.on('value', function(snapshot) {
//     $('#distValue').countTo({
//         from: +$('#distValue').html(),
//         to: +snapshot.val(),
//         speed: 2000,
//         refreshInterval: 60,
//         onComplete: function(value) {}
//     });
//   });

//   doorViewValue.on('value', function(snapshot) {
//     if(+snapshot.val() == 1){
//       $("#toggleDoorView").prop("checked", true);
//     }else{
//       $("#toggleDoorView").prop("checked", false);
//     }
//   });

//   airValue.on('value', function(snapshot) {
//     if(+snapshot.val() == 1){
//       $("#toggleAir").prop("checked", true);
//       $('#toggleAir').parent().parent().parent().parent().addClass('on');
//     }else{
//       $("#toggleAir").prop("checked", false);
//       $('#toggleAir').parent().parent().parent().parent().removeClass('on');

//     }
//   });
  
//   lumValue.on('value', function(snapshot) {
//     if(+snapshot.val() == 1){
//       $("#toggleLum").prop("checked", true);
//       $('#toggleLum').parent().parent().parent().parent().addClass('on');
//     }else{
//       $("#toggleLum").prop("checked", false);
//       $('#toggleLum').parent().parent().parent().parent().removeClass('on');
//     }
//   });
  
//   multValue.on('value', function(snapshot) {
//     if(+snapshot.val() == 1){
//       $("#toggleMult").prop("checked", true);
//       $('#toggleMult').parent().parent().parent().parent().addClass('on');
//     }else{
//       $("#toggleMult").prop("checked", false);
//       $('#toggleMult').parent().parent().parent().parent().removeClass('on');
//     }
//   });

//   doorValue.on('value', function(snapshot) {
//     if(+snapshot.val() == 1){
//       $("#toggleDoor").prop("checked", true);
//       $('#toggleDoor').parent().parent().parent().parent().addClass('on');
//     }else{
//       $("#toggleDoor").prop("checked", false);
//       $('#toggleDoor').parent().parent().parent().parent().removeClass('on');
//     }
//   });
// }

function getAllData() {
  $.getJSON('https://mqtt.ronaldmiranda.com.br/sala/temperatura', function(json) {
    $('#tempValue').countTo({
        from: +$('#tempValue').html(),
        to: +json[0].value,
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
  });

  $.getJSON('https://mqtt.ronaldmiranda.com.br/sala/luminosidade', function(json) {
    bar.animate((+json[0].value/1000));
  });

  $.getJSON('https://mqtt.ronaldmiranda.com.br/sala/umidade', function(json) {
    $('#umidValue').countTo({
        from: +$('#umidValue').html(),
        to: +json[0].value,
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
  });

  $.getJSON('https://mqtt.ronaldmiranda.com.br/sala/presenca', function(json) {
    if(+json[0].value >= 1){
      $("#togglePresence").prop("checked", true);
    }else{
      $("#togglePresence").prop("checked", false);
    }
  });

  $.getJSON('https://mqtt.ronaldmiranda.com.br/sala/distancia', function(json) {
    $('#distValue').countTo({
        from: +$('#distValue').html(),
        to: +json[0].value,
        speed: 2000,
        refreshInterval: 60,
        onComplete: function(value) {}
    });
  });

  $.getJSON('https://mqtt.ronaldmiranda.com.br/sala/porta', function(json) {
    if(+json[0].value >= 1){
      $("#toggleDoorView").prop("checked", true);
    }else{
      $("#toggleDoorView").prop("checked", false);
    }
  });
}