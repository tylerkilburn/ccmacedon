var keystone = require('keystone');

/**
 * TeachingCategory Model
 * ==================
 */

var TeachingCategory = new keystone.List('TeachingCategory', {
	autokey: { path: 'slug', from: 'name', unique: true },
	sortable: true,
});

TeachingCategory.add({
	name: { type: String, required: true },
});

TeachingCategory.relationship({ ref: 'Teaching', path: 'teachings', refPath: 'categories' });

TeachingCategory.register();
