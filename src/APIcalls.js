import { API } from "./constant";
import { config } from "./config";
import axios from 'axios';


export const translateText = async ({text,targetLanguage}) => {

    try {
        // const response = await axios.post(`${API.translationAPI}${targetLanguage}`, {
        //     data: text
        // }, {
        //     headers: {
        //         'apikey': config.API_LAYER_API_SECRET_KEY,
        //         'Content-Type': 'application/json'
        //     }
        // }
        // );
        // const translated = await response.data.translations[0].translation.json();
        // console.log("API CALL SUCCESS",translated)
        // return translated;
    } catch (error) {
        console.error('Error during translation:', error);
    }
}




export const uploadAudio = async (audioBlob) => {
    if (!(audioBlob instanceof Blob)) {
        throw new Error('Invalid audioBlob. Expected a Blob object.');
    }
    const response = await fetch(`${API.baseURL}/${API.upload}`, {
        method: 'POST',
        headers: {
            'authorization': config.assemblyAI_secret_key,
            'Content-Type': 'application/octet-stream'
        },
        body: audioBlob
    });
    const data = await response.json();
    return data.upload_url;
};


export const requestTranscription = async (uploadedUrl) => {
    const response = await fetch(`${API.baseURL}/${API.transcript}`, {
        method: 'POST',
        headers: {
            'authorization': config.assemblyAI_secret_key,
            'content-type': "application/json"
        },
        body: JSON.stringify({ audio_url: uploadedUrl })
    });
    const data = await response.json();
    return data;
}

export const pollForTranscription = async (id) => {
    const response = await fetch(`${API.baseURL}/${API.transcript}/${id}`, {
        method: 'GET',
        headers: {
            'authorization': config.assemblyAI_secret_key
        }
    });
    const statusData = await response.json();
    if (statusData.status === 'completed') {
        return statusData.text;
    } else if (statusData.status === 'failed' || statusData.status === 'error') {
        throw new Error('Transcription failed');
    } else {
        // Wait for some time before polling again
        await new Promise(resolve => setTimeout(resolve, 3000)); // Poll every 3 seconds
        return pollForTranscription(id);
    }
}

export const fetchBlobFromURL = async (blobUrl) => {
    try {
        const response = await fetch(blobUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch blob: ${response.statusText}`);
        }
        const blob = await response.blob();
        return blob;
    } catch (error) {
        console.error("Error fetching blob:", error);
        throw error;
    }
};
