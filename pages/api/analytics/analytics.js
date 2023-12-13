export default async function handler(req, res) {
  let response = await fetch(
    "https://shastradaan.ap-south-1.elasticbeanstalk.com/shastradaan/dashboard/"
  )
  .then(response => res.status(200).json({ response, success: true }))
  .catch(error => res.json(error))
//   res.status(200).json({hello : "World"})
  
}
