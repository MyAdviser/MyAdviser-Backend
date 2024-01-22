import fetch from 'node-fetch'; 
const apiKey = process.env.API_HUNTER;
interface ApiResponse {
  data: {
    status: string;
    result: string;
  };
  meta: {
    params: {
      email: string;
    };
  };
}
export const EmailTestVerification = async (emailToVerify: string): Promise<ApiResponse> => {
  try {
    const response = await fetch(`https://api.hunter.io/v2/email-verifier?email=${emailToVerify}&api_key=${apiKey}`);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();

    if (data.data.status === 'invalid') {
      throw new Error(`Error: Email invalido - ${data.data.result}`);
    }
    return data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};
