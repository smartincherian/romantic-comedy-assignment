import { combineReducers } from 'redux';

//declaring variables
const JSON_DATA = 'JSON_DATA';
const JSON_ARRAY = 'JSON_ARRAY';
const JSON_FILTER = 'JSON_FILTER';


export function getJSONData(data) {
    return {
        type: JSON_DATA,
        data
    }
}

export function getJSONArray(array) {
    return {
        type: JSON_ARRAY,
        array
    }
}

export function searchJSONArray(search) {
    return {
        type: JSON_FILTER,
        search
    }
}

//initial states
const defaultData = {
    page: {
        title: "",
        'content-items': {
            content: [
            ]
        }
    }
};

const defaultArray = [];
const defaultSearch = '';

//reducer functions
function getJSONDataReducer(state = defaultData, action) {
    switch (action.type) {
        case JSON_DATA:
            return action.jsonData;

        default:
            return state;
    }
}

function getJSONArrayReducer(state = defaultArray, action) {

    switch (action.type) {

        case JSON_ARRAY:
            if (action.search == undefined || action.search == '') {
                return [...state, ...action.jsonArray]
            }
            else {
                return [...state, ...action.jsonArray]
            }

        default:
            return state;
    }
}

function searchJSONArrayReducer(state = defaultSearch, action) {
    switch (action.type) {

        case JSON_FILTER:
            const filteredArray = action.contents.filter(item => item.name.includes(action.searchFilter))
            return {
                filteredArray: filteredArray,
                searchFilter: action.searchFilter,
                isSearchOn : action.searchFilter.length>0
            }

        default:
            return state;
    }
}

const jsonDataApp = combineReducers({
    getJSONDataReducer, getJSONArrayReducer,
    searchJSONArrayReducer
});

export default jsonDataApp