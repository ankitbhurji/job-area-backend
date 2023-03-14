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

route.post('/findjobs', async (req, res)=>{
    // const skills = ["NODE"]
    const skills = req.body.skills
    let searchFields;

    if(skills.length==0){
        searchFields = {}
    }else{
        searchFields = {skillRequired:{$in:[...skills]}}
    }
    const addedJobData = await Addjob.find({...searchFields})
    // const addedJobData = await Addjob.find({skillRequired:{$in:["NODE"]}})
    // const newdata =  await Addjob.find({$and:[{skillRequired:{$size:1}}, {skillRequired:{$in:['CSS', 'CSS']}}]})
    // const addedJobData = await Addjob.find({$and:[{skillRequired:{$in:['NODE']}}, {skillRequired:{$lt:{$size:5}}}]})
    res.send(addedJobData)
})

route.get('/jobdetails/:id', async (req, res)=>{
    const jobDetails = await Addjob.find({_id:req.params.id})
    res.send(jobDetails)
})

route.put('/editdetails', async (req, res)=>{

    const skill = req.body.requiredSkill.toUpperCase().split(',').map((values)=>{return values.trim()})

    const userId =        req.body.userId
    const companyName =   req.body.companyName 
    const logoUrl=        req.body.logoUrl
    const jobPosition=    req.body.jobPosition
    const monthlySallery= req.body.monthlySallery
    const jobType=        req.body.jobType
    const workFrom=       req.body.workFrom
    const location=       req.body.location
    const jobDiscription= req.body.jobDiscription
    const aboutCompany=   req.body.aboutCompany
    const skillRequired=  skill
    const time=date
    await Addjob.updateMany(
        {_id:userId},
        {$set:
            {
                companyName:companyName, 
                logoUrl:logoUrl, 
                jobPosition:jobPosition, 
                monthlySallery:monthlySallery, 
                jobType:jobType,
                workFrom:workFrom, 
                location:location,
                jobDiscription:jobDiscription,
                aboutCompany:aboutCompany,
                skillRequired:skillRequired,
                time:date
            }})
    // console.log(userId)
    res.send('update data')
})









module.exports = route;