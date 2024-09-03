import review from "../models/review.js";

export async function addReview(req, res) {
    try {
        const { user_id } = req.user;
        const book_id = req.params.id;
        const { review_text } = req.body;

        const foundReview = await review.findOne({ where: { UserId: user_id, BookId: book_id } })

        if (foundReview) {
            const newReview = await review.update({ review_text }, { where: { UserId: user_id, BookId: book_id } });
            return res.json({ message: `Review added/updated successfully!` });
        }

        const newReview = await review.create({ UserId: user_id, BookId: book_id, review_text });
        res.json({ message: `Review added/updated successfully!` });
    } catch (error) {

        res.status(500).json({ message: "Internal Server Error!!" });

    }
}

export async function getReview(req, res) {
    try {
        const { id } = req.params;
        const bookReview = await review.findAll({ attributes: ["review_text"], where: { BookId: id } })

        if (!bookReview.length) {
            return res.json({ message: "No review found for this book!" });
        }

        res.json({ message: "review found for this book", bookReview });

    } catch (error) {

        res.status(500).json({ message: "Internal Server Error!!" });

    }
}

export async function deleteReview(req, res) {
    try {

        const { user_id } = req.user;
        const { id } = req.params;

        const deletedReview = await review.destroy({ where: { UserId: user_id, BookId: id } });

        if (!deletedReview) {
            return res.json({ message: "No review found for that user to delete!" });
        }

        res.json({ message: "review deleted for that user successfully!" });

    } catch (error) {

        res.status(500).json({ message: "Internal Server Error!!" });

    }
}