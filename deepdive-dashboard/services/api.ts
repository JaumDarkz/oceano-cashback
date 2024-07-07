import axios from 'axios';

export const login = async (email: string, password: string, baseURL: string): Promise<any> => {

    const data = JSON.stringify({ "email": email, "password": password });

    const request: any = {
        method: 'POST',
        url: `${baseURL}/login`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'HEAD, GET, POST, PUT, PATCH, DELETE',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
        },
        data: data
    }

        const response = await axios(request)
        return response
    
}

export const register = async (name: string, email: string, password: string, baseURL: string): Promise<any> => {

    const data = JSON.stringify({ "name": name, "email": email, "password": password });

    const request: any = {
        method: 'POST',
        url: `${baseURL}/users/register`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        data: data
    }

        const response = await axios(request)
        return response
}

export const getUserData = async (baseURL: string): Promise<any> => {

    const auth = localStorage.getItem('userToken')

    const request: any = {
        method: 'GET',
        url: `${baseURL}/users/info`,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${auth}`
        },
        maxRedirects: 0,
        data: ''
    }

    try {
        const response = await axios(request)
        return response
    } catch (error) {
        console.log(error)
    }
}


export const getMyOrders = async (baseURL: string): Promise<any> => {

    const auth = localStorage.getItem('userToken')

    const request: any = {
        method: 'GET',
        url: `${baseURL}/checkout/my-orders`,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${auth}`
        },
        maxRedirects: 0,
        data: ''
    }

    try {
        const response = await axios(request)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const productSearch = async (baseURL: string, query: string): Promise<any> => {

    const request: any = {
        method: 'GET',
        maxBodyLength: Infinity,
        url: `${baseURL}/product/search/${query}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        data: ''
    }

    try {
        const response = await axios(request)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const changePassword = async (baseURL: string, oldPassword: string, newPassword: string): Promise<any> => {

    const data = JSON.stringify({ "oldPassword": oldPassword, "newPassword": newPassword });
    const auth = localStorage.getItem('userToken')

    const request: any = {
        method: 'POST',
        url: `${baseURL}/users/change-password`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth}`
        },
        data: data
    }

    try {
        const response = await axios(request)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const updateUserData = async (baseURL: string, name: string, email: string): Promise<any> => {

    if (name === '' && email === '')
    return

    let data;

    if (name === '') {
        data = JSON.stringify({ "email": email })
    } else if (email === '') {
        data = JSON.stringify({ "name": name })
    } else {
        data = JSON.stringify({ "name": name, "email": email })
    }

    const auth = localStorage.getItem('userToken')

    const request: any = {
        method: 'POST',
        url: `${baseURL}/users/update`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth}`
        },
        data: data
    }

    try {
        const response = await axios(request)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const getAllProducts = async (baseURL: string): Promise<any> => {

    const request: any = {
        method: 'GET',
        url: `${baseURL}/product/all`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        data: ''
    }

    try {
        const response = await axios(request)
        return response
    } catch (error) {
        console.log(error)
    }

}

export const fullTextSearch = async (baseURL: string, query: string) => {
    const request = {
        method: 'get',
        url: `${baseURL}/product/search/${query}`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    }

    try {
        const response = await axios(request)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const checkout = async (baseURL: string, productsIds: string[], productsTotals: number[]) => {

    let data = JSON.stringify({
        "productsIds": productsIds, 
        "productsTotals": productsTotals
      })

    const auth = localStorage.getItem('userToken')

    const request: any = {
        method: 'post',
        url: `${baseURL}/checkout/buy`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth}`
        },
        data: data
    }

    try {
        const response = await axios(request)
        return response
    } catch (error) {
        console.log(error)
    }
}



        

    
    


    




