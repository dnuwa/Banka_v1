const express = require('express');
const path = require('path');
const app = express();


// app.use(logger);

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Members API routes
app.use('/api/members', require('./routes/api/users'))


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
