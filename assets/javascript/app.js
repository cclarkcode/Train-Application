var config = {
    apiKey: "AIzaSyA1-n6Mr3DjnoqUkNRiEenYGLn8ISkXSjo",
    authDomain: "my-demo-project-216da.firebaseapp.com",
    databaseURL: "https://my-demo-project-216da.firebaseio.com",
    projectId: "my-demo-project-216da",
    storageBucket: "my-demo-project-216da.appspot.com",
    messagingSenderId: "436833087961"
  };
  firebase.initializeApp(config);


  var database = firebase.database();


  $("#add-employee-btn").on("click", function() {

	event.preventDefault();

	var name = $("#name-input").val().trim();
	var destination = $("#destination-input").val().trim();
	var	starttime = $("#start-input").val().trim();
	var frequency = $("#freq-input").val().trim();

	console.log(name);
	console.log(destination);
	console.log(starttime);
	console.log(frequency);

	

	database.ref('/trains').push({
			// employeeid: id,
            name: name,
            destination: destination,
            starttime: starttime,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });




	$("#employee-name-input").val("");
	$("#role-input").val("");
	$("#start-input").val("");
	$("#rate-input").val("");




});


   // Firebase watcher + initial loader
    database.ref('/trains').on("child_added", function(childSnapshot) {

      // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().name);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().starttime);
      console.log(childSnapshot.val().frequency);
      console.log(childSnapshot.val().dateAdded);

      var newrow = $("<tr/>");

      var nexttime = findnext(childSnapshot.val().starttime,parseInt(childSnapshot.val().frequency));





      console.log(nexttime.format("HH:mm"));
     
      var timeleft = nexttime.diff(moment(),"m");

      console.log(timeleft);

      

      newrow.html('<td>' + childSnapshot.val().name +'</td>');
      newrow.append('<td>' + childSnapshot.val().destination +'</td>');
      newrow.append('<td>' + childSnapshot.val().frequency +'</td>');
      newrow.append('<td>' + nexttime.format("HH:mm") +'</td>');
      newrow.append('<td>' + timeleft +'</td>');


      $("#train-table").append(newrow);

      // full list of items to the well
      // $("#full-member-list").append("<div class='well'><span id='name'> " + childSnapshot.val().name +
      //   " </span><span id='email'> " + childSnapshot.val().email +
      //   " </span><span id='age'> " + childSnapshot.val().age +
      //   " </span><span id='comment'> " + childSnapshot.val().comment + " </span></div>");

    // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });



    function findnext(first,frequency) {

    	console.log(first)

    	var time = moment(first,"HH:mm");

    	while (time.isBefore(moment())){


    	time.add(frequency,"m");
    	
    }

    return time   	

    }