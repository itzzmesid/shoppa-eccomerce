import AxiosInstance from '../../Utils/axios/axiosConfig'


export const getCategoryList=()=>{
   const trendData = AxiosInstance.get("/category/list/")  //get request for accessing category list
      .then(response => {
        console.log(response.data);
        return(response.data)
      }
      
      )
      return(trendData)
}
export const getCategoryData=()=>{
    const suggestedData =  AxiosInstance.get("")  //get request for accessing categories and products
    .then(response => {
            return(response.data)
     
    }
    )
    return(suggestedData)
}
