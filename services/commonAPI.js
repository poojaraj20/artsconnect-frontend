import axios from 'axios'
 export const commonAPI=async(httpRequest,url,reqBody,reqHeader,onUploadProgress = null)=>{
    const config={
        method:httpRequest,
        url,
        data:reqBody,
        headers:reqHeader
    }

    if (httpRequest !== "GET") {
      config.data = reqBody;
    }

   
    if (onUploadProgress) {
      config.onUploadProgress = onUploadProgress;
    }
    return await axios(config).then((res)=>{
        return res
    }).catch((err)=>{
        return err
    })
    
}