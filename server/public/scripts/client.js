$(document).ready(onReady);

console.log('Javascript linked');


//renders whatever inputted within function onto DOM when loaded
function onReady(){
    console.log("Page loaded");
    getTaskList();
    $('#addTask').on('click', addNewTask);
    $('#taskTableBody').on('click', '#deleteTaskBtn', deleteTaskHandler);
    $('#taskTableBody').on('click', '#completedTaskBtn', completedTaskHandeler );
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
} //end getTaskList

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
} //end addNewTask

//clears input field
function clearInputs(){
    console.log('inputs have been cleared');
    $('#enterTaskIn').val('');
}

//populates table on database onto DOM
function renderTaskList(taskList){
    $('#taskTableBody').empty();
    for( let task of taskList) {
        if( task.complete === false){
        $('#taskTableBody').append(`
        <tr class= "incompleteTask">
            <td> <button id="completedTaskBtn" data-id= ${task.id}> Mark Complete </button> </td>
            <td> ${task.task} </td>
            <td> ${task.complete} </td>
            <td> <button id="deleteTaskBtn" data-id= ${task.id}> Delete </button> </td>
        </tr>`);
        } else if (task.complete === true){
            $('#taskTableBody').append(`
            <tr class= "completedTask">
                <td> </td>
                <td> ${task.task} </td>
                <td> ${task.complete} </td>
                <td> <button id="deleteTaskBtn" data-id= ${task.id}> Delete </button> </td>
            </tr>`);
        }
    }
};//end renderTaskList


//PUT REQUEST"
function markComplete(){
    console.log('in markComplete')
    $.ajax({
        type: "PUT",
        url: `/tasks/${taskId}`
    }) .then( function (res){
        console.log('Updated status to true');
        getTaskList();
    }) .catch ( function (err) {
        console.log('Unable to update status');
    });
} // end markComplete


//should change false complete status to true
function completedTaskHandeler(){
    completedTask($(this).data('id'));
}

//DELETE REQUEST

//deletes from DOM
function deleteTaskHandler(){
    deleteTask($(this).data('id'));
}

//deletes from database
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