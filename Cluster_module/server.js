const cluster = require('cluster');
const os = require('os');
const express = require('express');

const totalCPUs = os.cpus().length;

// cluster.isPrimary 
// Node.js has a single primary process (sometimes called master) and multiple worker processes.
// cluster.isPrimary checks if the current process is the primary process.
// Only the primary process should spawn worker processes!!

if(cluster.isPrimary){
    for(let i=0; i<totalCPUs; i++){
        cluster.fork(); //Creates a worker process — a new Node.js process running the same code
    }
}else{
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.get("/", (req, res)=>{
        return res.json({
            message: `Hello from Worker ${process.pid}`
        })
    });

    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT} | Worker ${process.pid}`);
    })
}

