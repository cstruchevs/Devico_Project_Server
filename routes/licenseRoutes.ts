import express from 'express'
import { deleteLicense, deleteLicenseType, getLicenses, postLicense, postLicenseType, userRegisterLicense } from '../controllers/licenseCotroller'
const router = express.Router()

router.route('/').get(getLicenses)
router.route('/').post(postLicense)
router.route('/licenseType').post(postLicenseType)
router.route('/registerToLicense').post(userRegisterLicense)
router.route('/deleteLicense/:id').post(deleteLicense)
router.route('/deleteLicenseType/:id').post(deleteLicenseType)

export default router