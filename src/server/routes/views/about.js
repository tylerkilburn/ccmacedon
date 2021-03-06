const keystone = require('keystone');

exports = module.exports = function (req, res) {

	const view = new keystone.View(req, res);
	const locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'about';
	locals.filters = {
		aboutSlug: req.params.aboutSlug,
	};
	locals.data = {
		abouts: [],
		isMain: req.params.aboutSlug ? false : true,
	};

	// Load Abouts
	view.on('init', function (next) {
		let q = keystone.list('About').model.find()
			.where('state', 'published')
			.populate('author')
			.sort('sortOrder');
		if (req.params.aboutSlug) { q.where('slug', locals.filters.aboutSlug); }
		q.exec(function (err, results) {
			locals.data.abouts = results;
			next(err);
		});
	});

	// Render the view
	view.render('about');
};
