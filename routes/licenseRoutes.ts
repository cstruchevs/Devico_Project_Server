import express from 'express'
import { deleteLicense, deleteLicenseType, getLicenses, postLicense, postLicenseType, userRegisterLicense, getLicenseTypes } from '../controllers/licenseCotroller'
import auth from '../middleware/auth'
const router = express.Router()

router.route('/').get(getLicenses)
router.route('/').post(postLicense)
router.route('/licenseType').post(auth, postLicenseType)
router.route('/licenseType').get(getLicenseTypes)
router.route('/registerToLicense').post(auth, userRegisterLicense)
router.route('/deleteLicense/:id').post(deleteLicense)
router.route('/deleteLicenseType/:id').post(deleteLicenseType)

export default router