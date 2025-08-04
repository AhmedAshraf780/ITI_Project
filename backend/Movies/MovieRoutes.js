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

// Get favorite movies
// router.get('/favorites', (req, res) => {
//   Movie.find({ is_favorite: true })
//     .then(favorites => {
//       res.json({
//         success: true,
//         data: favorites
//       });
//     })
//     .catch(error => {
//       res.status(500).json({
//         success: false,
//         message: 'Error fetching favorite movies',
//         error: error.message
//       });
//     });
// });

// GET /api/movies/search?q=shawshank
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
			{ original_title: searchRegex },
			{ overview: searchRegex },
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

// Add new movie
// router.post("/", (req, res) => {
//   const movie = new Movie(req.body);
//   movie
//     .save()
//     .then((savedMovie) => {
//       res.status(201).json({
//         success: true,
//         message: "Movie added successfully",
//         data: savedMovie,
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         success: false,
//         message: "Error adding movie",
//         error: error.message,
//       });
//     });
// });

// Update movie
// router.put("/:id", (req, res) => {
//   Movie.findByIdAndUpdate(req.params.id, req.body, { new: true })
//     .then((movie) => {
//       if (!movie) {
//         return res.status(404).json({
//           success: false,
//           message: "Movie not found",
//         });
//       }
//       res.json({
//         success: true,
//         message: "Movie updated successfully",
//         data: movie,
//       });
//     })
//     .catch((error) => {
//       res.status(400).json({
//         success: false,
//         message: "Error updating movie",
//         error: error.message,
//       });
//     });
// });

// Delete movie
// router.delete("/:id", (req, res) => {
//   Movie.findByIdAndDelete(req.params.id)
//     .then((movie) => {
//       if (!movie) {
//         return res.status(404).json({
//           success: false,
//           message: "Movie not found",
//         });
//       }
//       res.json({
//         success: true,
//         message: "Movie deleted successfully",
//       });
//     })
//     .catch((error) => {
//       res.status(500).json({
//         success: false,
//         message: "Error deleting movie",
//         error: error.message,
//       });
//     });
// });

// Add movie to favorites
// router.post("/:id/favorite", (req, res) => {
//   Movie.findByIdAndUpdate(req.params.id, { is_favorite: true }, { new: true })
//     .then((movie) => {
//       if (!movie) {
//         return res.status(404).json({
//           success: false,
//           message: "Movie not found",
//         });
//       }
//       res.json({
//         success: true,
//         message: "Movie added to favorites",
//         data: movie,
//       });
//     })
//     .catch((error) => {
//       res.status(500).json({
//         success: false,
//         message: "Error adding to favorites",
//         error: error.message,
//       });
//     });
// });

// Remove movie from favorites
// router.delete("/:id/favorite", (req, res) => {
//   Movie.findByIdAndUpdate(req.params.id, { is_favorite: false }, { new: true })
//     .then((movie) => {
//       if (!movie) {
//         return res.status(404).json({
//           success: false,
//           message: "Movie not found",
//         });
//       }
//       res.json({
//         success: true,
//         message: "Movie removed from favorites",
//         data: movie,
//       });
//     })
//     .catch((error) => {
//       res.status(500).json({
//         success: false,
//         message: "Error removing from favorites",
//         error: error.message,
//       });
//     });
// });

module.exports = router;
