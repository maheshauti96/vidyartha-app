export default async function handler(req, res) {

    let schoolInfo = await fetch('https://api.vidyartha.org/shastradaan/contactus/contactus', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                throw new Error('Something went wrong');
            }
        })
        .then(data => data)
        .catch(error => error)

    res.status(200).json(schoolInfo)

}