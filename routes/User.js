const express = require('express')
const route = express.Router()

const Skill = require('../models/SkillsSchema')
const Addjob = require('../models/AddJobSchema')


route.get('/skills', async (req, res)=>{
    const skill = await Skill.find()
    res.send(skill)
})

route.post('/addjob', async (req, res)=>{

    const skill = req.body.requiredSkill.toUpperCase().split(',').map((values)=>{return values.trim()})
    const jobPosition = req.body.jobPosition.split(' ').map((values)=>{return values.charAt(0).toUpperCase()+values.slice(1)}).join(' ')
    const location = req.body.location.split(' ').map((values)=>{return values.charAt(0).toUpperCase()+values.slice(1)}).join(' ')
  
    const addJob = new Addjob({
        companyName:    req.body.companyName, 
        logoUrl:        req.body.logoUrl,
        jobPosition:    jobPosition,
        monthlySallery: req.body.monthlySallery,
        jobType:        req.body.jobType,
        workFrom:       req.body.workFrom,
        location:       location,
        jobDiscription: req.body.jobDiscription,
        aboutCompany:   req.body.aboutCompany,
        skillRequired:  skill,
        time:           req.body.time
    })
    if(skill && jobPosition){
        addJob.save()
    }
    res.send('job data added.')
})

route.get('/findjobs/:skills',  async (req, res)=>{
    const skills = req.params.skills.split(',')
    let newSkill;
    if(skills=='null'){
        newSkill = {}
    }else{
        newSkill = {skillRequired:{$all:[...skills]}}
    }
    const findData = await Addjob.find({...newSkill}).sort({time: -1})
    res.send(findData)
})

route.get('/jobdetails/:id', async (req, res)=>{
    const jobDetails = await Addjob.find({_id:req.params.id})
    res.send(jobDetails)
})

route.put('/editdetails', async (req, res)=>{

    const skill = req.body.requiredSkill.toUpperCase().split(',').map((values)=>{return values.trim()})
    const jobPositionEdited = req.body.jobPosition.split(' ').map((values)=>{return values.charAt(0).toUpperCase()+values.slice(1)}).join(' ')
    const locationEdited = req.body.location.split(' ').map((values)=>{return values.charAt(0).toUpperCase()+values.slice(1)}).join(' ')


    const userId =         req.body.userId
    const companyName =    req.body.companyName 
    const logoUrl =        req.body.logoUrl
    const jobPosition =    jobPositionEdited
    const monthlySallery = req.body.monthlySallery
    const jobType =        req.body.jobType
    const workFrom =       req.body.workFrom
    const location =       locationEdited
    const jobDiscription = req.body.jobDiscription
    const aboutCompany =   req.body.aboutCompany
    const skillRequired =  skill
    const time =           req.body.time

    const data = await Addjob.updateMany(
        {_id:userId},
        {$set:
            {
                companyName :    companyName, 
                logoUrl :        logoUrl, 
                jobPosition :    jobPosition, 
                monthlySallery : monthlySallery, 
                jobType :        jobType,
                workFrom :       workFrom, 
                location :       location,
                jobDiscription : jobDiscription,
                aboutCompany :   aboutCompany,
                skillRequired :  skillRequired,
                time :           time
            }})
    res.send(data)
})

route.get('/:searchjob', async (req, res)=>{
    var regex = new RegExp(req.params.searchjob, 'i')
    const searchFile = await Addjob.find({jobPosition:regex})
    res.send(searchFile)
})








module.exports = route;