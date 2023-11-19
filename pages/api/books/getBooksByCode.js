export default async function handler(req , res){
    try {
        const {name} = req.params
        const response = await fetch(`https://shastradaan.ap-south-1.elasticbeanstalk.com/shastradaan/admin/book/findByCode/${name}?size=1000`)
        const data = await response.json()
        return res.status(200).json({
            books : data.content,
            errorOccured : false
        })
    }catch(error){
        return res.json({
            error,
            errorOccured : false
        })
    }
}