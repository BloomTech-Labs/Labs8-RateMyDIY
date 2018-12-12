import {
	FETCH_SEARCH_RESULTS,
	FETCH_SEARCH_RESULTS_SUCCESS,
	FETCH_SEARCH_RESULTS_ERROR,
	FETCH_CATEGORY_RESULTS,
	FETCH_CATEGORY_RESULTS_SUCCESS,
	FETCH_CATEGORY_RESULTS_ERROR,
	FETCH_PROJECTS_BY_REVIEWER,
	FETCH_PROJECTS_BY_REVIEWER_SUCCESS,
	FETCH_PROJECTS_BY_REVIEWER_ERROR,
	SORT_PROJECTS_BY_RATING,
	SORT_PROJECTS_BY_DATE
} from '../actions';

const initialState = {
	projects: []
};

let arraySort = require('array-sort');

const searchReducer = (state = initialState, action) => {
	switch (action.type) {
		// example action
		case FETCH_SEARCH_RESULTS:
			return { ...state, gettingSearchResults: true };
		case FETCH_SEARCH_RESULTS_SUCCESS:
			return {
				...state,
				projects: action.payload,
				gettingSearchResults: false
			};
		case FETCH_SEARCH_RESULTS_ERROR:
			return { ...state, error: 'There was an error' };
		case FETCH_CATEGORY_RESULTS:
			return { ...state };
		case FETCH_CATEGORY_RESULTS_SUCCESS:
			return { ...state, projects: action.payload };
		case FETCH_CATEGORY_RESULTS_ERROR:
			return { ...state, error: 'There was an error' };
		case FETCH_PROJECTS_BY_REVIEWER:
			return { ...state };
		case FETCH_PROJECTS_BY_REVIEWER_SUCCESS:
			return { ...state, projects: action.payload };
		case FETCH_PROJECTS_BY_REVIEWER_ERROR:
			return { ...state, error: 'There was an error' };

		case SORT_PROJECTS_BY_RATING: {
			//sort by rating
			const projects = state.projects.slice();
			const sortedProjects = arraySort(projects, 'project_id');
			console.log(arraySort(state.projects, 'project_id'));

			return {
				...state,
				projects: sortedProjects
			};
		}
		case SORT_PROJECTS_BY_DATE: {
			//sort by date
		}
		default:
			return state;
	}
};

export default searchReducer;
