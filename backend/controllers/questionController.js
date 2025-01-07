const Question = require("../models/questionModel")
const User = require("../models/userModel")

exports.getAllQuestions = async (req, res) => {
    try{
        const queryObject = {...req.query};
        const excludedFields = ["sort", "limit", "fields"];
        excludedFields.forEach((element) => delete queryObject[element]);
        
        // Advanced filtering:
        let queryString = JSON.stringify(queryObject);
        queryString = queryString.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}` // query rasyti reikia taip: http://localhost:3000/api/v1/hotels?comfort[gte]=5
        );
        // console.log(JSON.parse(queryString));

        let query = Question.find(JSON.parse(queryString));
        if (req.query.sort){
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy); // http://localhost:3000/api/v1/hotels?comfort[gte]=6&sort=-price
        } else {
            query = query.sort("-created_at"); // http://localhost:3000/api/v1/hotels?comfort[gte]=6&sort
        }
    
        // Field limiting:
        if (req.query.fields){
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields); // http://localhost:3000/api/v1/hotels?fields=name,address
        }
    
        // Execute query
        const questions = await query;
        res.status(200).json({
            status: "success",
            results: questions.length,
            data: {
                questions,
            },
        });
    } catch (err) {
        console.log(err);
    }
};

exports.createQuestion = async (req, res) => {
    try{
        console.log(req.body, "line 48")
        const newQuestion = await Question.create(req.body);

        const creator = await User.findById(req.body.creator);
        console.log(newQuestion._id)

        creator.questions.push(newQuestion._id);
        await creator.save()

        res.status(201).json({
            status: "success",
            data: {
                question: newQuestion
            },
        });
     }catch (error){
        console.log(error)
        }

    }


exports.getQuestionById = async (req, res) => {
    try {
         const question = await Question.findById(req.params.id).populate("likes").populate("creator").populate("category"); // populate, kad sudeti users is duomenu bazes
        if (!question) {
            res.status(404).json({
                status: "failed",
                message: "invalid id",
            });
        } else {
            res.status(200).json({
                status: "success",
                data: {
                    question,
                },
            });
        }
    } catch (err) {
        console.log(err);
    }
};

exports.updateQuestion = async (req, res) => {
    try{
        const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        question.likes.push(req.body.likes)
        res.status(200).json({
            status: "success",
            data: {
                question,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "failed",
            message: err.message,
        });
    }
};

exports.updateLikes = async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({
                status: "failed",
                message: "Question not found",
            });
        }
        const user = await User.findById(req.body.likes);
        const existingLikeIndex = question.likes.indexOf(req.body.likes);
        const existingUserIndex = user.likes.indexOf(req.params.id);

        if (existingLikeIndex === -1) {
            // Item does not exist, so add it
            question.likes.push(req.body.likes);
            user.likes.push(req.params.id)
        } else {
            // Item exists, so remove it
            question.likes.splice(existingLikeIndex, 1);
            user.likes.splice(existingUserIndex, 1);
        }

        await question.save();
        await user.save();

        res.status(200).json({
            status: "success",
            data: {
                question,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "failed",
            message: err.message,
        });
    }
};

exports.deleteQuestion = async (req, res) => {
    try {
        await Question.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "success",
            data: {
                question: "deleted",
            },
        });
    } catch (err) {
        console.log(err);
    }
};