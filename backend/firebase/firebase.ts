const { initializeApp, cert } = require('firebase-admin/app')
const { getFirestore } = require('firebase-admin/firestore')

const serviceAccount = require('./appcredentials.json')

initializeApp({
    credential: cert(serviceAccount)
})

const dbInstance = getFirestore()

module.exports = { db: dbInstance }
