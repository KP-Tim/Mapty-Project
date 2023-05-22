'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// Start new project
let map, mapEvent;
// Get current geo location
if (navigator.geolocation.getCurrentPosition) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(position);
      console.log(latitude);
      console.log(longitude);

      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];

      map = L.map('map').setView(coords, 13);
      // console.log(map);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // L.marker(coords)
      //   .addTo(map)
      //   .bindPopup('A pretty CSS popup.<br> Easily customizable.')
      //   .openPopup();

      map.on('click', function (mapE) {
        mapEvent = mapE;
        console.log(mapEvent);

        form.classList.remove('hidden');
        inputDistance.focus();

        const { lat, lng } = mapEvent.latlng;
        // console.log(lat, lng);
        // L.marker([lat, lng])
        //   .addTo(map)
        //   .bindPopup(
        //     L.popup({
        //       maxHeight: 250,
        //       minWidth: 100,
        //       autoClose: false,
        //       closeOnClick: false,
        //       className: 'running-popup',
        //     })
        //   )
        //   .setPopupContent('Workout')
        //   .openPopup();
      });
    },
    function () {
      alert('Can not get the current location');
    }
  );
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  console.log(map);
  const { lat, lng } = mapEvent.latlng;
  console.log(mapEvent);
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxHeight: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
    )
    .setPopupContent('Workout')
    .openPopup();
});

//https://www.google.com/maps/@34.000888,-118.2021674,15z

// map.event.addListener(map, 'click', function (e) {
//   placeMarker(e.latLng);
// });
// function placeMarker(location) {
//   var marker = new google.maps.Marker({
//     position: location,
//     map: map,
//   });
// }
