const express = require('express');
var router = express.Router();
const { initializingPassport, isAuthenticated } = require('../passportConfig');
const Student = require('../student');

router.get('/', isAuthenticated, (req, res)=>{
    res.render('./addOrEdit', {msg: "Insert data"});
});

router.post('/', isAuthenticated, (req, res)=>{
    insert(req, res);
});

function insert(req, res){
    var student = new Student();

    student.fname = req.body.fullName;
    student.email = req.body.email;
    student.mobile = req.body.mobile;
    student.city = req.body.city;

    student.save((err, result)=>{
        if(err) console.log(err);

        res.redirect('/profile/list');
    })

}


router.get('/list', (req, res)=>{

    Student.find((err, result)=>{
        if(err){
            return console.log(err);
        }

        res.render('list', {list: result})
    })
})

router.get('/:id', (req, res)=>{
    Student.findById(req.params.id, (err, result)=>{
        if(err){
            return console.log(err);
        }
        console.log(result._id);
        res.render('profile', {value:  result});
    })

})


module.exports = router;