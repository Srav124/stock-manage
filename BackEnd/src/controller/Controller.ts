import axios from 'axios';
import { request, Request, response, Response } from 'express';
import { stocks } from '../model/Model';
import cron from 'node-cron';
import dotenv from 'dotenv'
dotenv.config();

const CMC_API_KEY = process.env.CMC_PRO_API_KEY;
const CMC_API_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map';

if (!CMC_API_KEY) {
    console.log('CoinMarketCap API key is not defined');
}

// Function to get all stocks
export const getStocks = async (req: Request, res: Response) => {
    try {
        const response = await axios.get(CMC_API_URL, {
            headers: {
                'X-CMC_PRO_API_KEY': '6a4f9cea-4c43-4da9-8db8-c37eb9814257',
            },
        });
        let resData = '' ;
        if(response.status == 200) {
            if(response.data != '') {
                if(response?.data?.data != '') {
                    resData = response?.data?.data
                } else{
                    resData = response?.data
                }
            }
        }
    
        return resData
    } catch (error: any ) {
        console.error('Error fetching stocks:', error);
        res.status(500).json({ message: 'Error fetching stocks', error: error.message });
    }
};

// Function to save crypto type
export const getAndSaveStocks = async (req: Request, res: Response): Promise<void> => {
    try {
        // Invoke getAllStocks and to save in DB
        const data = await getStocks(req, res);

        let response
        // Perform operations with the data (e.g., save to database)
        if(data !=undefined && data != null) {
            response =await stocks.create(data)
        }
        res.json(response)
        console.log("response saved successfully to DB")
        
    } catch (error : any) {
        console.error('Error saving crypto type:', error);
        res.status(500).json({ message: 'Error saving crypto type', error: error.message });
    }
};

// Schedule the getAndSaveStocks function to run every 5 minutes
// cron.schedule('*/5 * * * *', () => {
//     console.log('Running getAndSaveStocks every 5 minutes');
//     getAndSaveStocks({} as Request, {} as Response);  // Passing empty objects as placeholders
// });

// console.log('Scheduler started, getAndSaveStocks will be called every 5 minutes.');
