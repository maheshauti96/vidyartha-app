export default async function handler(req, response) {
  let resp = await fetch(
    "https://api.vidyartha.org/shastradaan/admin/delivery?size=100000"
  )
    .then((res) => res.json())
    .then((data) => response.status(200).json({ data, success: true }))
    .catch((error) => response.json(error));
  //   res.status(200).json({hello : "World"})
}
