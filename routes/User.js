const express = require('express')
const route = express.Router()

const Skill = require('../models/SkillsSchema')
const Addjob = require('../models/AddJobSchema')
const date = new Date()

route.get('/skills', async (req, res)=>{
    const skill = await Skill.find()
    res.send(skill)
})


route.post('/addjob', async (req, res)=>{
    // const skill = req.body.requiredSkill.toUpperCase().split(',').filter(word => word.trim().length > 0)
    const skill = req.body.requiredSkill.toUpperCase().split(',').map((values)=>{return values.trim()})
    const addJob = new Addjob({
        companyName:    req.body.companyName, 
        logoUrl:        req.body.logoUrl,
        jobPosition:    req.body.jobPosition,
        monthlySallery: req.body.monthlySallery,
        jobType:        req.body.jobType,
        workFrom:       req.body.workFrom,
        location:       req.body.location,
        jobDiscription: req.body.jobDiscription,
        aboutCompany:   req.body.aboutCompany,
        skillRequired:  skill,
        time:date
    })
    if(skill){
        addJob.save()
    }
    console.log(skill)
    res.send('job data added.')
})

route.get('/findjobs', async (req, res)=>{
    const addedJobData = await Addjob.find({skillRequired:{$in:['HTML']}})
    res.send(addedJobData)
})









module.exports = route;