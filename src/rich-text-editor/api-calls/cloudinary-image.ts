/*__________________________________________

 ✅ import
____________________________________________*/
// hook
import { useState } from 'react';

// axios
import { axios } from '../../dependencies/axios/axios'


/*__________________________________________

 ✅ axios instance
____________________________________________*/

// Note: We're removing baseURL since we're passing the full URL to mutate
const uploadImageAxios = axios.create({
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});


/*__________________________________________

 ✅ hook
____________________________________________*/
export default function useCloudImage() {

    const [isLoading, setLoading] = useState(false)
    const [isSuccess, setSuccess] = useState(false)
    const [isError, setError] = useState(false)
    const [data, setData] = useState(null)

    // Modify mutate to accept the URL and formData as parameters
    const mutate = async (url, formData) => {

        setLoading(true)
        setError(false)
        setSuccess(false)

        try {
            // Use the passed URL in the axios call
            const response = await uploadImageAxios.post(url, formData)

            setData(response.data)
            setSuccess(true)
        }

        catch (error) {
            setError(true)
            // console.error('Error uploading image:', error.response?.data?.message)
        }

        finally {
            setLoading(false)
        }

    }

    return { mutate, isLoading, isSuccess, isError, data };
}
