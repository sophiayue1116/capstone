const { Pool } = require('pg');
const pool = new Pool({
  host: 'database-movieradar.cw1d5b7mw14d.us-east-2.rds.amazonaws.com',
  user: 'postgres',
  database: 'postgres',
  password: 'Scu2019!',
  port: 5432
});

console.log("connected!");


const createUser = (request, response) => {
	var userName = request.body.userName;
	var email = request.body.email;
	var password = request.body.password;
	//console.log(userName);
   pool.query('INSERT INTO public.user (user_name, user_email, user_password) VALUES ($1, $2, $3)', [userName, email, password], (error, results) => {
		if (error) {
		  console.log(error);
		  throw error;
		} else {
			console.log("yay");
		}
    //response.status(201).send(`User added with ID: ${result.insertId}`)
	response.redirect('/signin');
	});
};

/* problem for this function is we don't know the result for this query, */
const signin = (request, response) => {

	var email = request.body.email;
	var password = request.body.password;
		
	pool.query('SELECT count(*) From public.user where user_email = $1 and user_password = $2', [email, password], (error, results) => {
		if (error) {
		  console.log(error);
		  throw error;
		  response.redirect('/signin');
		} else if(results.rows[0].count != '1'){
			console.log("no this email in db or pwd not match");  
			console.log(results.rows);
			//response.redirect('/signin');
			response.send("no this email in db or pwd not match");
		} else {
			console.log("yay");
			console.log(results);
			response.redirect('/posts');
		}
    });
};


/* https://node-postgres.com/api/result, can solve the problem stated above in const signin, but cannot catch error 
const { Pool } = require('pg')
const pool = new Pool()
const client = await pool.connect()
const result = await client.query({
  rowMode: 'array',
  text: 'SELECT 1 as one, 2 as two;',
})
console.log(result.fields[0].name) // one
console.log(result.fields[1].name) // two
console.log(result.rows) // [1, 2]
await client.end()
*/
	
/* follow is a varian for query*/
// 	const query = {
// 	  text: 'SELECT count(*) From public.user where user_email = $1 and user_password = $2',
// 	  values: [email, password],
// 	}
// 	// callback
// 	client.query(query, (err, response) => {
// 	  if (err) {
// 		console.log(err.stack);
// 	  } else {
// 		console.log(response.rows[0]);
// 		 response.redirect('/');
// 	  }
// 	})
// 	// promise
// 	client
// 	  .query(query)
// 	  .then(response => console.log(res.rows[0]))
// 	  .catch(e => console.error(e.stack))
// };


/* can be deleted after all is done
const createUser = (request, response) => {
	const userName = request.body.userName;
	const email = request.body.email;
	const password = request.body.password;
	console.log('got to post page');
  //const { userName, email, password } = request.body
  pool.query('INSERT INTO public.user (user_name, user_email, user_password) VALUES ($1, $2, $3)', [userName, email, password], (error, results) => {
    if (error) {
      console.log(error);
      return console.error('Error executing query', error.stack);
    }
    //response.status(201).send(`User added with ID: ${result.insertId}`)
    return console.log('successful!');
  });
};
*/

module.exports = {
  createUser,signin
}

//pool.end().then(() => console.log('pool has ended'))