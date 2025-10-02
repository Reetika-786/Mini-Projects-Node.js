const path = require('path');
const express = require('express');
const multer = require('multer');

const app = express();
const PORT = 8000;

//upload ka instance create krna hoga
//mtlb user jb bhi file upload krega to wo kaha store hogi, uska path dena hoga 
// const upload = multer({ dest: 'uploads/' });
 
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        return cb(null, './uploads');
    },
    filename: function (req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
}
);

const upload = multer({ storage: storage });


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
    
app.get('/', (req, res) => {
    res.render("homepage");
});

app.post('/upload', upload.single('profileImage'), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    return res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});