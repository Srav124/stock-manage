
import { getAndSaveStocks } from "../controller/Controller";
import { Express , Router} from "express";
const router = Router()

router.get('/stocks', getAndSaveStocks);
module.exports = router  