const db = require('../config/dbConfig');
var Promise = require('bluebird');

module.exports = {
	getProject,
	getReviewsByProjectID,
	addProject,
	editProject,
	removeProject
};

function getProject(project_id) {
	return db('projects')
		.where({ project_id })
		.first()
		.then(project => {
			if (project) {
				// strip rating_sum and rating_count
				const { rating_sum, rating_count, ...projectLite } = project;
				return (
					db('project_categories')
						.where({ project_id })
						.join(
							'categories',
							'categories.category_id',
							'project_categories.category_id'
						)
						// strip project_id
						.select('categories.category_id', 'categories.category_name')
						.then(categories => ({ ...projectLite, categories }))
						.then(projectWithCategories => {
							return (
								db('posts')
									.where({ project_id })
									// strip project_id
									.select('post_id', 'img_url', 'text')
									.then(posts => ({ ...projectWithCategories, posts }))
							);
						})
				);
			} else return undefined;
		});
}

function getReviewsByProjectID(project_id) {
	return db('projects')
		.where({ project_id })
		.first()
		.then(project => {
			if (project) {
				return db('reviews').where({ project_id });
			} else return undefined;
		});
}

// I'm not satisfied with this solution because it's not atomic. It can add a project but fail to add its categories.
function addProject({ categories, ...project }) {
	return db('projects')
		.insert(project, 'project_id')
		.then(([project_id]) => {
			if ((project_id, categories.length)) {
				return db
					.transaction(trx => {
						return Promise.map(categories, category_id => {
							const project_category = { project_id, category_id };
							console.log('addProject: project_category', project_category);

							return trx('project_categories').insert(project_category);
						});
					})
					.then(inserts => {
						console.log(
							`${inserts.length} categories added for project ${project_id}`
						);
						return { project_id };
					})
					.catch(error => {
						console.error(error);
						return { project_id, failedToAddCategories: true };
					});
			} else return { project_id };
		});
}

// This works with postgres but it doesn't return a project_id to update the reviewModal
// function addProject(project, categories) {
// 	return db
// 		.transaction(trx => {
// 			return trx
// 				.insert(project, 'project_id')
// 				.into('projects')
// 				.then(([project_id]) => {
// 					console.log('addProject: project_id', project_id);
// 					if ((project_id, categories.length))
// 						return Promise.map(categories, category_id => {
// 							const project_category = { project_id, category_id };
// 							console.log('addProject: project_category', project_category);

// 							return trx.insert(project_category).into('project_categories');
// 						});
// 				});
// 		})
// 		.then(inserts => {
// 			console.log(inserts.length + ' categories added for project');
// 			// return project_id;
// 		})
// 		.catch(error => {
// 			console.error(error);
// 		});
// }

function editProject(user_id, project_id, changes) {
	return db('projects')
		.where({ user_id, project_id })
		.returning('project_id')
		.update(changes)
		.then(ids => ids.length);
}

function removeProject(user_id, project_id) {
	return db('projects')
		.where({ user_id, project_id })
		.del();
}
