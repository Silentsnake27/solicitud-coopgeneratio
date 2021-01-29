// Example starter JavaScript for disabling form submissions if there are invalid fields
(function() {
    'use strict';
  
    window.addEventListener('load', function() {
      var form = document.getElementById('needs-validation');
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
          alert('Por favor verifique los campos');
        }
        form.classList.add('was-validated');
      }, false);
    }, false);
  })();
(function() {
    'use strict';
  
    window.addEventListener('load', function() {
      var form = document.getElementById('needs-validationn');
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    }, false);
  })();

function submitUserForm() {
  var response = grecaptcha.getResponse();
  if(response.length == 0) {
      document.getElementById('g-recaptcha-error').innerHTML = '<span style="color:red;">El captcha es Requerido.</span>';
      return false;
  }
  return true;
}

function verifyCaptcha() {
  document.getElementById('g-recaptcha-error').innerHTML = '';
}

// var regexCedu = /^[1-9]-\d{4}-\d{4}$/;
var regex = /[^-,\d]/g;

var cedula = document.getElementById("cedula");

cedula.addEventListener("keyup", function(){
    if (cedula.value == ""){
     
    }
    new Cleave('#cedula', {
      delimiter:"-",
      blocks: [ 3,7,1]
  });
    cedula.value = cedula.value.replace(regex,"");
})


var cedula2 = document.getElementById("cedula2");

cedula2.addEventListener("keyup", function(){
    if (cedula2.value == ""){
     
    }
    new Cleave('#cedula2', {
      delimiter:"-",
      blocks: [ 3,7,1]
  });
    cedula2.value = cedula2.value.replace(regex,"");
})


var telefono = document.getElementById("telefonos");

telefono.addEventListener("keyup", function(){
    if (telefono.value == ""){
     
    }
    new Cleave('#telefonos', {
      delimiter:"-",
      blocks: [ 3, 3, 4]
  });
    telefono.value = telefono.value.replace(regex,"");
})


var celular = document.getElementById("celular");

celular.addEventListener("keyup", function(){
    if (celular.value == ""){
     
    }
    new Cleave('#celular', {
      delimiter:"-",
      blocks: [ 3, 3, 4]
  });
    celular.value = celular.value.replace(regex,"");
})


var TeleTrabajo = document.getElementById("telefonotrabajo");

TeleTrabajo.addEventListener("keyup", function(){
    if (TeleTrabajo.value == ""){
     
    }
    new Cleave('#telefonotrabajo', {
      delimiter:"-",
      blocks: [ 3, 3, 4]
  });
    TeleTrabajo.value = TeleTrabajo.value.replace(regex,"");
})


var sueldo = document.getElementById("sueldo");

sueldo.addEventListener("keyup", function(){
    if (sueldo.value == ""){
     
    }
    new Cleave('#sueldo', {
      numeral: true,
      // numeralDecimalMark: ','
      delimiter: ','
  });
    sueldo.value = sueldo.value.replace(regex,"");
})
var ahorro = document.getElementById("ahorromensual");

ahorro.addEventListener("keyup", function(){
    if (ahorro.value == ""){
     
    }
    new Cleave('#ahorromensual', {
      numeral: true,
      // numeralDecimalMark: ','
      delimiter: ','
  });
    ahorro.value = ahorro.value.replace(regex,"");
})

var monto = document.getElementById("monto");

monto.addEventListener("keyup", function(){
    if (monto.value == ""){
     
    }
    new Cleave('#monto', {
      numeral: true,
      // numeralDecimalMark: ','
      delimiter: ','
  });
    monto.value = monto.value.replace(regex,"");
})

// var headers = new Headers();
// headers.append('Content-Type', 'application/json');
// headers.append('Accept', 'application/json');

// return fetch('/login', {
//     method: 'POST',
//     mode: 'same-origin',
//     redirect: 'follow',
//     credentials: 'include', // Don't forget to specify this if you need cookies
//     headers: headers,
//     body: JSON.stringify({
//         _id: 'John',
//         email: 'Doe'
//     })
// })

// var url = '/login';

// // ajax call
// $.ajax({
//     url: url,
//     dataType : 'jsonp',
//     beforeSend : function(xhr) {
//       // set header if JWT is set
//       if ($window.sessionStorage.token) {
//           xhr.setRequestHeader("Authorization", "Bearer " +  $window.sessionStorage.token);
//       }

//     },
//     error : function() {
//       // error handler
//     },
//     success: function(data) {
//         // success handler
//     }
// });

// var token = window.localStorage.getItem('token');

// if (token) {
//   $.ajaxSetup({
//     headers: {
//       'x-access-token': token
//     }
//   });
// }









// var local_data =!{JSON.stringify(title)}
// const authToken = res.token
// localStorage.setItem('token', res.token);
// fetch('/user/data', {
//   method: 'GET',
//   headers: {
//     'Authorization': 'Bearer' + authToken
//   }
// })
// .then(res => res.json())
// .then(data => { console.log(data) })
// .catch(err => { console.log(err) })


// function login(event) {
//   event.preventDefault();
//   let formData = new FormData(event.target);

//   fetch("/login", {
//           method: 'POST',
//           body: formData 
//   }).then(function (response) {          
//           return response.json();
//       }).then(function (result) {
//           if (result.auth === true) {
//               localStorage.token = result.token;
//           //HERE IS THE PROBLEM
//              $.ajax({ 
//                type : "GET", 
//                url : "/admin", 
//                beforeSend: function(xhr){
//               xhr.setRequestHeader('access-token', localStorage.token);
//                           },
//       success : function(result) { 
//                //HERE IS THE PROBLEM                
//              window.location='/admin';
//                }
//               }); 
//           } else {
//               console.log("Incorrect username or password.");
//           }
//       });       
// }