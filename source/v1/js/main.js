import { TimerContainer } from "./timerContainer.js";
import { TaskList } from "./taskList.js";
import { InstructionsBox } from "./instructionsBox.js";
import { EventBus } from "./eventBus.js";
import { TaskDisplay } from "./taskDisplay.js";
/**
 * Event handler function to change the theme
 */
function handleThemeBtnPressed() {
    // Obtains an array of all <link> elements. Select your element using indexing. 
    let theme = document.getElementById("theme");
    let theme_btn = document.getElementById("theme-btn");

    // Change the value of href attribute to change the css sheet.
    if (theme.getAttribute("href") == "./css/colors.css") {
        theme.setAttribute("href", "./css/colors2.css");
        theme_btn.setAttribute("title", "Simple Theme");
    } else {
        theme.setAttribute("href", "./css/colors.css");
        theme_btn.setAttribute("title", "Complex Theme");
    }
}

/**
 * Event handler function to show TaskList when task button is pressed
 */
function showTaskList() {
    document.EventBus.fireEvent("showTasks");
}

/**
 * Event handler function to show Instructions when info button is pressed
 * @param {Event} o_event event instance
 */
function showInstructions(o_event) {
    let inst = document.querySelector("instructions-box");
    inst.showInstructionsBox();

}

/**
 * Event handler function to handleKeybinds
 * @param {Event} o_event event instance
 */
function handleKeyBinds(o_event) {
    console.log(o_event);
    if (o_event.target.tagName != "INPUT") {
        switch (o_event.key) {
            case "c":
                handleThemeBtnPressed();
                break;
            case " ":
                document.EventBus.fireEvent("spaceKeybind");
                // disable space scrolling
                o_event.preventDefault();
                break;
            case "Escape":
                document.EventBus.fireEvent("closeWindows");
                break;
            case "t":
                document.EventBus.fireEvent("showTasks");
                // prevent event from bubbling into input
                o_event.preventDefault();
                break;
            case "n":
                document.EventBus.fireEvent("nextTask");
                break;
            case "r":
                document.EventBus.fireEvent("resetPomo");
                break;
        }
    }

}

/**
 * This event listener is used for initializing anything that isn't associated with any specific webcomponent.
 */
document.addEventListener("DOMContentLoaded", () => {

    // Code for change theme button functionality
    let o_theme_btn = document.getElementById("theme-btn");
    o_theme_btn.addEventListener("click", handleThemeBtnPressed);

    // Code for showing / hiding TaskList functionality
    let o_task_btn = document.getElementById("task-btn");
    o_task_btn.addEventListener("click", showTaskList);

    document.addEventListener("keydown", handleKeyBinds);

    // Code for showing / hiding Instructions functionality
    let o_info_btn = document.getElementById("info-btn-new");
    o_info_btn.addEventListener("click", showInstructions);

    // initialize Event Bus instance
    document.EventBus = new EventBus();

});

