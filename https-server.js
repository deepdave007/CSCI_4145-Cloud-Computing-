//Adding the HTTP module as a dependency through the require keyword in Node.js
const http =  require ('http');


//Creating an array named jobs455 where all the information regarding the jobs is stored as JSON objects
const jobs455 =[

    {
       "jobName":"j1455",
       "partId":1455,
       "qty":55
    },
    
    {
       "jobName":"j2455",
       "partId":2455,
       "qty":66
    },

    {
       "jobName":"j3455",
       "partId":3455,
       "qty":77
}];

//Creating a HTTP server and storing it in a constant named server 455 for further usage in the program
const server455 = http.createServer((req, res) => {

//Adding '/api455/jobs' as an endpoint to list all information about the jobs that can be retrieved using a GET request by looping through every item in the objects
    if (req.url === '/api455/getjobs') {

        res.write(JSON.stringify(jobs455) + '\n\n');
        res.end;


        res.write('Alternative format for easier brevity: \n\n');
        res.end;

        jobs455.forEach((item) => {
            res.write('Name of Job: ' + item.jobName + '\n');
            res.write('Job ID: ' + item.partId + '\n');
            res.write('Quantity Required: ' + item.qty + '\n');
          });
          res.end();
    }

/*Adding '/api455/jobs/getqty' as the second endpoint to list the required quantities for all jobs
    if (req.url === '/api455/getjobs/getqty') {
        
        jobs455.forEach((item) => {
            res.write('The quantity required for Job ' + item.jobName + ', ID No. ' + item.partId + ' is: \n' + item.qty + '\n');
          });
          res.end();
    }
*/

//Adding '/api455/jobs/getqty' as an endpoint to list the required quantity for a specific jobs - job2 in this case

    if (req.url === '/api455/getjobs/jobName=j2455,partId=2455') {

        res.write(JSON.stringify(jobs455[1]) + '\n\n');
        res.end;


        res.write('Alternative format for easier brevity: \n\n');
        res.end;

        
        res.write('The quantity required for Job ' + jobs455[1].jobName + ', ID No. ' + jobs455[1].partId + ' is: \n' + jobs455[1].qty + '\n');
        res.end();
    }
});

//Setting the listener for the port 17000
const port = process.env.PORT || 17000;

//Log message indicating successful port connection
server455.listen(port, () => console.log(`Listening on Port ${port}`));
