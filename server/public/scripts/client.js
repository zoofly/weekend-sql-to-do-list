$(document).on(onReady);

console.log('Javascript linked');


//renders whatever inputted within function onto DOM when loaded
function onReady(){
    getTaskList();
}

//get lists of task to populate on DOM
function getTaskList(){
    $.ajax({
        type: "GET",
        url: "/tasks"
    }) .then ((res) => {
        renderTaskList(res)
        console.log('GET request successful');
        }) .catch((error) => {
            console.log('Error server response', error);
        });
}


function clearInputs(){
    console.log('inputs have been cleared');
    $('#numberOne').val('');
    $('#numberTwo').val('');
    operator='';
}

function renderTaskList(){
    $.ajax({
        type: 'GET',
        url: "/tasks"
    }).then (function(res){
        $('#taskTableBody').empty();
        for( let task of res) {
            $('#taskTableBody').append(`
            <tr>
                <td> ${task[i].priority} </td>
                <td> ${task[i].task} </td>
                <td data-id='completion'> ${task[i].complete} </td>
                <td> <button id="completedTask" data-id= ${task.id}> Mark as Complete </button> </td>
                <td> <button id="deleteTask" data-id= ${task.id}> Delete </button> </td>
            </tr>`)
        }
        console.log('getting tasks', res);
    }).catch ( function (err){
        console.log ('Error in sending answer', err);
    })
};