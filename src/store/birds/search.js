import { combineReducers } from 'redux';

const JSON_SEARCH = 'JSON_SEARCH';

export function searchJSONArray(search) {
    return {
        type: JSON_SEARCH,
        search
    }
}

const defaultSearch = '';

function searchJSONArrayReducer(state = defaultSearch, action) {
    switch (action.type) {

        case JSON_SEARCH:
            return action.search

        default:
            return state;
    }
}



const searchDataApp = combineReducers({
    searchJSONArrayReducer
});

export default searchDataApp