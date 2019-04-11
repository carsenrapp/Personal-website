import cloudinary from 'cloudinary'
import configInfo from "../configInfo.js"

export function handler(event, context, callback) {

    cloudinary.config(configInfo)
    
    cloudinary.v2.search
            .expression('folder:street')
            .execute().then(result=>{
                callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(result)
                  });
            }
        );
    
    
}
  