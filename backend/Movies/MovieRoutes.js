const express = require("express");
const router = express.Router();
const Movie = require("./movieModel");

// Get all movies
router.get("/", (req, res) => {
	Movie.find({})
		.then((movies) => {
			//console.log(movies);
			res.json(movies);
		})
		.catch((error) => {
			res.status(500).json({
				success: false,
				message: "Error fetching movies",
				error: error.message,
			});
		});
});

router.get("/search", (req, res) => {
	const { q } = req.query;
	if (!q || q.trim() === "") {
		return res
			.status(400)
			.json({ success: false, message: "Query is required" });
	}

	const searchRegex = new RegExp(q.trim(), "i"); // case-insensitive

	Movie.find({
		$or: [
			{ title: searchRegex },
		],
	})
		.then((movies) => res.json(movies))
		.catch((error) =>
			res.status(500).json({
				success: false,
				message: "Error searching movies",
				error: error.message,
			})
		);
});

// Get movie by ID
router.get("/:id", (req, res) => {
	Movie.findOne({ id: Number(req.params.id) })
		.then((movie) => {
			if (!movie) {
				return res.status(404).json({
					success: false,
					message: "Movie not found",
				});
			}
			res.json({
				success: true,
				data: movie,
			});
		})
		.catch((error) => {
			res.status(500).json({
				success: false,
				message: "Error fetching movie",
				error: error.message,
			});
		});
});

module.exports = router;
