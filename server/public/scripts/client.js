$(document).ready(onReady);

console.log('Javascript linked');


//renders whatever inputted within function onto DOM when loaded
function onReady(){
    console.log("Page loaded");
    getTaskList();
    $('#addTask').on('click', addNewTask);
    $('#taskTableBody').on('click', deleteTaskHandler);
}

//get lists of task to populate on DOM
function getTaskList(){
    console.log('in getTaskList');
    $.ajax({
        type: "GET",
        url: "/tasks"
    }) .then (function (res){
        renderTaskList(res)
        console.log('GET request successful');
        }) .catch((error) => {
            console.log('Error server response', error);
        });
}

//post new task to database and clear input field
function addNewTask(){
    console.log("in addNewTask");
    const newTask= {
        task: $('#enterTaskIn').val()
    };
    console.log( newTask);
    $.ajax({
        type: "POST",
        url:'/tasks',
        data: newTask
    }) .then( function (res){
        console.log(res);
        getTaskList();
        clearInputs();
    }) .catch( function (err){
        console.log('error in posting new task', err);
        alert ('Unable to add new task. Please try again later.');
    });
}

function clearInputs(){
    console.log('inputs have been cleared');
    $('#enterTaskIn').val('');
}

function renderTaskList(taskList){
    $('#taskTableBody').empty();
    for( let item of taskList) {
        $('#taskTableBody').append(`
        <tr>
            <td> ${item.task} </td>
            <td data-id='completion'> ${item.complete} </td>
            <td> <button id="completedTaskBtn" data-id= ${item.id}> Mark as Complete </button> </td>
            <td> <button id="deleteTaskBtn" data-id= ${item.id}> Delete Task </button> </td>
        </tr>`);
    }

};

//DELETE REQUEST
function deleteTaskHandler(){
    deleteTask($(this).data('id'));
}

function deleteTask(taskId){
    $.ajax({
        type: "DELETE",
        url: `/tasks/${taskId}`
    }) .then (function (res){
        console.log("Successfully deleted task.", res);
        getTaskList();
    }) .catch( function (err){
        console.log('Error in deleting task', err);
    });
};