const { default: mongoose } = require("mongoose")

const skillsSchema = {
    skill:{type: String, required: true},
    createdAt:{type: String, required: true},
    updatedAt:{type: String, required: true}
}

const Skills = mongoose.model("Skills", skillsSchema)

module.exports = Skills