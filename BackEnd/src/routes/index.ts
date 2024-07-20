
import { getAllCryptoTypes,getAvailableTypes,getStockUpdateById } from "../controller/Controller";
import { Express , Router} from "express";
const router = Router()

router.get('/allCrypto', getAllCryptoTypes);
// router.get('/availableCrypto', getAvailableTypes);
router.get('/stock/:id', getStockUpdateById);
module.exports = router  