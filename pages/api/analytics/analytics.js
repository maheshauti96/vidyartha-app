export default async function handler(req, res) {
  let response = await fetch(
    "https://api.vidyartha.org/shastradaan/dashboard/"
  )
  .then(res => res.json())
  .then(data => res.status(200).json({ data, success: true }))
  .catch(error => res.json(error))
//   res.status(200).json({hello : "World"})
  
}
