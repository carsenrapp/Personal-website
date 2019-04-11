import cloudinary from 'cloudinary'
import configInfo from "../configInfo.js"

export function handler(event, context, callback) {

    cloudinary.config(configInfo)

      cloudinary.v2.api.resources_by_tag(
        'photography', 
        function(error, result){
            callback(null, {
                statusCode: 200,
                body: JSON.stringify(result)
              });
        });
    
}
  