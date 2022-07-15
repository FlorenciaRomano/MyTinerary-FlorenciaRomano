const Activity = require("../models/activities");
const Itineraries = require('../models/itineraries');

const activitiesControllers = {
	getActivities: async (req, res) => {
		let activities;
		let error = null;

		try {
			activities = await Activity.find().populate("itinerary", {
				itineraryName: 1,
			});
		} catch (err) {
			error = err;
			console.log("Something went wrong");
		}
		res.json({
			response: error ? "ERROR" : { activities },
			success: error ? false : true,
			error: error,
		});
	},

	addActivity: async (req, res) => {
		try {
			const { itineraryId, name, image } = req.body.data
			const newActivity = await Itineraries
				.findOneAndUpdate({ _id: itineraryId }, { $push: { activities: { name: name, image: image } } },
					{ new: true })
				.populate("comments.userId", { fullName: 1, avatar: 1 })
			res.json({
				success: true,
				response: newActivity,
			})
		} catch (error) {
			console.log(error);
			res.json({
				success: false,
				message: "Something went wrong, try again in a few minutes!",
			})
		}
	},

	// addActivity: async (req, res) => {
	// 	const { name, image, itinerary } = req.body.data;

	// 	let activity;
	// 	let error = null;
	// 	try {
	// 		activity = await new Activity({
	// 			name: name,
	// 			image: image,
	// 			itinerary: itinerary,
	// 		}).save();
	// 	} catch (err) {
	// 		error = err;
	// 	}
	// 	res.json({
	// 		response: error ? "ERROR" : activity,
	// 		success: error ? false : true,
	// 		error: error,
	// 	});
	// },

	modifyActivity: async (req, res) => {
		const id = req.params.id;
		const activity = req.body.data;
		let activitydb;
		let error = null;
		try {
			activitydb = await Activity.findOneAndUpdate({ _id: id }, activity, {
				new: true,
			});
		} catch (err) {
			error = err;
		}
		res.json({
			response: error ? "ERROR" : activitydb,
			success: error ? false : true,
			error: error,
		});
	},

	removeActivity: async (req, res) => {
		const id = req.params.id;
		let activity;
		let error = null;
		try {
			activity = await Activity.findByIdAndDelete({ _id: id });
		} catch (err) {
			error = err;
		}
		res.json({
			response: error ? "ERROR" : activity,
			success: error ? false : true,
			error: error,
		});
	},

	findActivityFromItinerary: async (req, res) => {
		let activityId = req.params.id;
		// console.log(activityId);
		let activities;
		let error = null;
		try {
			activities = await Activity.find({ itinerary: activityId }).populate(
				"itinerary",
				{
					itineraryName: 1,
				}
			);
		} catch (err) {
			error = err;
		}
		res.json({
			response: error ? "ERROR" : activities,
			success: error ? false : true,
			error: error,
		});
	},
};

module.exports = activitiesControllers;