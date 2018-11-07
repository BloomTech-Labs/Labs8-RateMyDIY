exports.up = function(knex, Promise) {
	return knex.schema.createTable('reviews', table => {
		table.increments('review_id'); //primary key
		table
			.string('project_id') // project's primary key
			.notNullable()
			.references('projects.project_id');
		table
			.string('user_id') // reviewer's primary key
			.notNullable()
			.references('users.user_id');
		table
			.integer('rating') // rating submitted by reviewer
			.notNullable()
			.unsigned();
		table.string('text', 560); // review text (not nullable? minimum length?)
		table
			.integer('likes') // count of all likes received
			.unsigned()
			.defaultTo(0);
		table
			.integer('dislikes') // count of all dislikes received
			.unsigned()
			.defaultTo(0);
		// we could just keep the difference but we may want to hold onto counts to track engagement
		table.integer('helpfulness').defaultTo(0); // likes minus dislikes
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('reviews');
};