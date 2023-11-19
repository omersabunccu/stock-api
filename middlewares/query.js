module.exports = (req, res, next)=>{

    // Searching URL?search[key1]=value1&search[key1]=value1
    let search  =req.query?.search || {}
    for(let key in search ) search[key] = {$regex: search[key],$options:'i'}
    // sort 
    const sort = req.query?.sort || {}
    // Pagination 
    let limit = Number(req.query?.limit)
    limit= limit>0 ?limit : Number(process.env?.PAGE_SIZE || 20)
    // Page
    let page = Number (req.query?.page)
    page = (page>0 ? page : 1)-1
    // Skip
    let skip = Number(req.query?.skip)
    skip=skip>0? skip :(page*limit)


    res.getModelList = async function (Model, filters={}, populate=null){
        const filterAndSearch = {...filters, ...search}
        return await Model.find(filterAndSearch).populate(populate)
      
    }

    res.getModelListDetails = async function(Model, filters = {}){
        const filterAndSearch = {...filters, ...search}
        const dataCount = await Model.count(filterAndSearch)
        let details = {
            search, 
            sort,
            limit, 
            page, 
            skip, 
            pagenation:{
                prev: (page>0? page: false),
                current: page+1,
                next: page+2,
                total: Math.ceil(dataCount/limit)
            },
            totalRecords: dataCount
        }
        details.pagenation.next = (details.pagenation.next> details.pagenation.total? false: details.pagenation.next)
        if(details.totalRecords<=limit) details.pagenation = false;
        return details
    }
    next()
}