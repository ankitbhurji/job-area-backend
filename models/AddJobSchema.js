const { default: mongoose } = require("mongoose")


const AddJobSchema = {
    companyName:{type: String, required: true}, 
    logoUrl:{type: String, required: true},
    jobPosition:{type: String, required: true},
    monthlySallery:{type: String, required: true},
    jobType:{type: String, required: true},
    workFrom:{type: String, required: true},
    location:{type: String, required: true},
    jobDiscription:{type: String, required: true},
    aboutCompany:{type: String, required: true},
    skillRequired:{type: Array, required: true},
    time:{type: String, required: true}
}

const Addjob = mongoose.model('Addjob', AddJobSchema)
module.exports = Addjob

