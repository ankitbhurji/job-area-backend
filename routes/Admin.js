const express = require('express');
const { default: mongoose } = require('mongoose');
const route = express.Router();

// const categorySchema = {
//     name: String,
//     age: String
// }
// const Category = mongoose.model('Category', categorySchema)

const Skills = require('../models/SkillsSchema')


const date = new Date();

route.post('/skill/:myskill', (req, res)=>{
    const skill = new Skills({
        skill:req.params.myskill, 
        createdAt:date,
        updatedAt:date
    })
    skill.save()
    res.send('skill has been saved.')
})

module.exports = route;