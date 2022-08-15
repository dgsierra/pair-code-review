/* eslint-disable semi */
import './style.css'
// Project Modules
import addTaskForm from './EventListeners.js'
import loadContent from './LoadStorage.js'
import removeAll from './RemoveElements.js'

addTaskForm();

// Load content from localStorage
loadContent();

// Remove all elements from the list
removeAll();
