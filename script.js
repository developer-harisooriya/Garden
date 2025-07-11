const firebaseConfig = {
  apiKey: "AIzaSyCld-K3KCgcWmpSwmSn_42Ov5m8qSzuuGc",
  authDomain: "garden-ce107.firebaseapp.com",
  projectId: "garden-ce107",
  storageBucket: "garden-ce107.firebasestorage.app",
  messagingSenderId: "474313375228",
  appId: "1:474313375228:web:b16eef2d74ffb958b3c679",
  measurementId: "G-8YB3ZTPVFC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function authenticate() {
  var password = document.getElementById("password").value;
  if (password === "94561") {
    document.getElementById("auth").style.display = "none";
    document.getElementById("control").style.display = "block";
    // Load the gauge value from Firebase
    loadGaugeValue();
  } else {
    alert("Incorrect password!");
  }
}

function toggleValve(valveNumber) {
  var valveState = document.getElementById("valve" + valveNumber).checked;
  firebase.database().ref("/valve" + valveNumber).set(valveState ? 1 : 0);
}

function loadGaugeValue() {
  firebase.database().ref("/gauge").on("value", function(snapshot) {
    var gaugeValue = snapshot.val();
    document.getElementById("gaugeDisplay").innerText = "Gauge Value: " + gaugeValue;
    document.getElementById("gaugeProgressBar").value = gaugeValue;
  });
}

function setSchedule(valveNumber) {
  var scheduleState = document.getElementById("schedule" + valveNumber).checked;
  var startTime = document.getElementById("start" + valveNumber).value;
  var endTime = document.getElementById("end" + valveNumber).value;
  firebase.database().ref("/schedule/valve" + valveNumber).set({
    enabled: scheduleState,
    start: startTime,
    end: endTime
  });
}
