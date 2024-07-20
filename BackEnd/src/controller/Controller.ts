import axios from 'axios';
import {  Request, Response } from 'express';
import { market, stocks } from '../model/Model';
import cron from 'node-cron'

const BASE_URL = 'https://api.coingecko.com/api/v3/coins/';

// Function to get all stocks
export const getStocksFromAPI = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/list`);
        let resData ;
        if (response.status == 200) {
            let data = response.data
            if(data !=undefined && data != null) {
              resData =await stocks.create(data)
            }
        }
    } catch (error: any) {
        console.error('Error fetching stocks:', error);
    }
};

export const getAllCryptoTypes = async (req: Request, res: Response) => {

    try {
        let resData = await stocks.find({});
        if(resData.length == 0 ) {
            let response = await getStocksFromAPI ();
            return res.json(response)
        } else {
            return res.json(resData)
        }
    } catch (error: any) {
        console.error('Error fetching stocks:', error);
        res.status(500).json({ message: 'Error fetching stocks', error: error.message });
    }
};

export const getAvailableTypes = async (req: Request, res: Response) => {
    try {
        let resData = await stocks.find({});
        if(resData.length == 0 ) {
            let response = await getStocksFromAPI ();
            console.log('respomsee', response)
            return res.json(response)
        } else {
            return res.json(resData)
        }
    } catch (error: any) {
        console.error('Error fetching stocks:', error);
        res.status(500).json({ message: 'Error fetching stocks', error: error.message });
    }
};

// Function to get all stock based on market value
export const stockUpdate = async (cryptoIds: Array<String>) => {
    try {
        // const type = currency_type != '' ? currency_type : 'USD'
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets`, {
            params: {
              vs_currency: 'usd', // The currency in which the data should be returned (e.g., 'usd')
              ids: cryptoIds.join(','), // Comma-separated list of cryptocurrency IDs
            }
          });
        if (response.status == 200) {
            let data = response.data
            if(data !=undefined && data != null) {
              await market.create(data)
              console.log("Data added successfully")
            }
        }
        
    } catch (error : any) {
        console.error('Error fetching crypto data:', error);
    }
};

export const getStockUpdateById =  async (req: Request, res: Response) => {
    const id =req.params.id;
    console.log("sysbmpp", id)
    try{
        const data = await market.find({id: id}).sort({ timestamp: -1 }).limit(20)
        if(data.length > 0) {
            return res.status(200).json(data);
        }else{
            return res.status(400).json({ message: 'No data available' });
        }
    }catch (error: any) {
        console.error('Error fetching stocks:', error);
        res.status(500).json({ message: 'Error fetching stocks', error: error.message });
    }
    
}
// Schedule the getAndSaveStocks function to run every 5 minutes
cron.schedule('*/5 * * * *', () => {
    console.log('Running getAndSaveStocks every 5 minutes');
    stockUpdate(['bitcoin','buff-doge-coin','ethereum','tether','binancecoin'])
});

console.log('Scheduler started, getAndSaveStocks will be called every 5 minutes.');
