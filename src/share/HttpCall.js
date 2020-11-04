import axios from 'axios';
import { toast } from 'react-toastify';

const BaseUrl = 'http://localhost:9002';

const HttpCall = async ({ url = '', method = 'GET', data, headers = '' }) => {
  try {
    const token = localStorage.getItem('accessToken');
    const result = await axios(
      {
        method: method,
        url: `${BaseUrl}${url}`,
        data: data,
        headers: headers ? headers : {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    if (result && result.status && result.status === 200 && result.data) {
      return result.data;
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.data && error.response.data.data[0]) {
      toast(error.response.data.data[0].msg, { type: "error" });
    } else if (error.response && error.response.data && error.response.data.message) {
      toast(error.response.data.message, { type: "error" });
    } else {
      throw error
    }
  }
}

export async function signIn({ url = '', data }) {
  try {
    const result = await axios(
      {
        method: 'POST',
        url: `${BaseUrl}${url}`,
        data: data,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    if (result && result.status && result.status === 200 && result.data) {
      localStorage.setItem('accessToken', result.data.data.token.toString());
      return result.data;
    } else {
      return result;
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.data && error.response.data.data[0]) {
      toast(error.response.data.data[0].msg, { type: "error" });
    } else if (error.response && error.response.data && error.response.data.message) {
      toast(error.response.data.message, { type: "error" });
    } else {
      throw error
    }
  }
}

export default HttpCall;
