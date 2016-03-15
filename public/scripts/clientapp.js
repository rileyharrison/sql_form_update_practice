// Description
// Node SQL Form Update
// Expand upon the form and database from lecture.
//
// Get code from Github
//
// Download the zipped code from Github (link above). Or Fork it. Do NOT Clone!
//
// You'll need to run: npm install to bring in all the node modules needed.
//
// Create people Table
//
// In a Database in Postico/pgAdmin, let's create our people table to hold our data.
//
//     CREATE TABLE people
//     (
//         id SERIAL NOT NULL,
//         name character varying(255) NOT NULL,
//         address character varying(255) NOT NULL,
//         city varchar(100) NOT NULL,
//         state varchar(3) NOT NULL,
//         zip_code varchar(5) NOT NULL,
//         CONSTRAINT people_pkey PRIMARY KEY (id)
//     );
// Your connectionString
//
// Update your connectionString in our app.js, line 12:
//  connectionString = 'postgres://localhost:5432/your-database-name';
//
// Tasks
// I have added 3 new fields to our people database. You need to update our app to support them.
//
// Update our HTML form to capture those new fields and update our server side database queries
// to use them for insertion.
//
// Then update our AJAX Get request to append all of our information to the DOM when it returns
// successfully so we can see the data from our database.

// new fields



$(document).ready(function() {

    $('#submit-button').on('click', postData);
    getData();
    $('.container').on('click','.nuke', nukePerson);
    $('.container').on('click','.edit', editPerson);




});

function editPerson(){
    var editID = $(this).data('id');

    editID = editID.toString();
    console.log("gonna edit", editID);
    // deletePerson(nukeID);


}

function nukePerson(){
    var nukeID = $(this).data('id');

    nukeID = nukeID.toString();
    console.log("gonna nuke", nukeID);
    deletePerson(nukeID);


}

function deletePerson(nukeID){
    event.preventDefault();
    var objNuke = {};
    objNuke.removeID = nukeID;
    console.log("in nukePerson", objNuke);


    $.ajax({
        type: 'POST',
        url: '/nukeID',
        data: objNuke,
        success: function(data) {
            if(data) {
                // everything went ok
                console.log('from server:', data);
                getData();
            } else {
                console.log('error');
            }
        }
    });


}



function postData() {
    event.preventDefault();
    // $('.my-input').val("");

    var values = {};
    $.each($('#sql-form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    console.log(values);

    $.ajax({
        type: 'POST',
        url: '/people',
        data: values,
        success: function(data) {
            if(data) {
                // everything went ok
                console.log('from server:', data);
                getData();
            } else {
                console.log('error');
            }
        }
    });

}

function getData() {
    $.ajax({
        type: 'GET',
        url: '/people',
        success: function(data) {
        showPeople(data);
        }
    });
}
function showPeople(data){
    $('.my-input').val("");

    console.log("hey we got some data back", data);
    console.log("data.length=", data.length);
    $('.container').empty();
    for(var i=0; i<data.length; i++){

        $('.container').append('<p><b>Person # ' + i + '</p>');

        $('.container').append('<p>Name:  ' + data[i].name + '</p>');
        $('.container').append('<p>Address:  ' + data[i].address + '</p>');
        $('.container').append('<p>City:  ' + data[i].city + '</p>');
        $('.container').append('<p>State:  ' + data[i].state + '</p>');
        $('.container').append('<p>Zip Code:  ' + data[i].zip_code + '</p>');
        $('.container').append('<button class = "nuke" data-id="' + data[i].id + '">Delete</button>');
        $('.container').append('<button class = "edit" data-id="' + data[i].id + '">Edit</button>');

    }
    // $('.container').append('<p>'+ data.name)



}
