const User = require('../models/User')
const tasks = require('../apis/tasksApi.js')
const pokedex = require('../apis/pokedexApi.js')
const gyms = require('../apis/gymsApi.js')
const teamStar = require('../apis/teamStarApi.js')
const titans = require('../apis/titansApi.js')

module.exports = {
     getUser: async (req,res)=>{
        try{
            res.render('tracker.ejs', {
              user: req.user, 
              tasks: tasks,
              pokedex: pokedex,
              gyms: gyms,
              teamStar: teamStar,
              titans: titans,

          })
            console.log(tasks)
        }catch(err){
            console.log(err)
        }
    },
    addDivId: async (req, res) =>{
        try{
          await User.findOneAndUpdate({_id: req.body.userId},
            { $addToSet: { completedDivs: req.body.divId }
          })
          res.json('Added Div ID')
        } catch(err) {
          console.log(err)
        }
    },
    removeDivId: async (req, res) =>{
        try{
          await User.findOneAndUpdate({_id: req.body.userId},
            {$pull: { completedDivs: {$in: req.body.divId}}}
          ),
          res.json('Removed Div ID')
        } catch(err) {
          console.log(err)
        }
    }
}