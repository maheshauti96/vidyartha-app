export default async function handler(req , res){
    try {
        const response = await fetch(`https://shastradaan.ap-south-1.elasticbeanstalk.com/shastradaan/admin/book?size=500`)
        const data = await response.json()

        res.status(200).json({
            books : data,
            errorOccured : false
        })
    }catch(error){
        res.json({
            error,
            errorOccured : true
        })
    }
}