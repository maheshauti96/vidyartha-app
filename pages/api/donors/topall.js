export default async function handler(req, res) {
    
    let topDonors = await fetch("https://api.vidyartha.org/shastradaan/donors/")
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Something went wrong');
        }
    })
    .then(data => data)
    .catch(error => error)

    res.status(200).json(topDonors)
}