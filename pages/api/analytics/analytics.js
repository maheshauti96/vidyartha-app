export default async function handler(req, res) {

    try {
        let response = await fetch("https://shastradaan.ap-south-1.elasticbeanstalk.com/shastradaan/dashboard/")
        let data = await schoolInfo.json()
        res.status(200).json({data , success : true})
    }catch(error){
        res.json({error , success : false})
    }   

}