import express from "express";
import { MerchantRepo } from "../../repo/index.js";

const router = express.Router();

// POST /api/merchant_config/
router.post('/', async (req, res, next) => {
  const { data } = req.body

  const merchant_conf = await MerchantRepo.get_merchant_configuration(data.merchant_id);

  // findByPk returns null if no entry was found in the DB.
  if (!merchant_conf) {
    return res.status(400).send({
      field: 'merchant_id',
      message: 'Could not find that merchant.',
    });
  }

  if (!MerchantRepo.verify_merchant_configuration(data)){
    return res.status(400).send('Merchant Data Validation Error')
  }

  try {
    await MerchantRepo.set_merchant_configuration(merchant_conf, data);
    return res.status(200).send();
  } catch (err) {
    return res.status(400).send('Error updating merchant configuration');
  }
})

export default router
