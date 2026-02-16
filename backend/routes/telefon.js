const sql = require('mssql')
const config = require('../dbconfig')
const express = require('express')

const router = express.Router()

router.get("/", async (req, res) =>{
    try{
        const pool = await sql.connect(config)
        const result = await pool.request().query(`
            SELECT * FROM Telefonok
            `)
            
            pool.close()
            res.status(200).json({success: true, data: result.recordset})
    }
    catch(err){
        console.error(`[ERROR/GET/]`, err.message)
        res.status(500).json({success: false, error: err.message})
    }
})

router.post('/', async (req, res) => {
    try{
        const {Marka, Kiadas, Tipus, Ar} = req.body
        const pool = await sql.connect(config)
        const result = await pool.request()
            .input(`Marka`, sql.NVarChar(50), Marka)
            .input("Kiadas", sql.NVarChar(50), Kiadas)
            .input("Tipus", sql.NVarChar(80), Tipus)
            .input("Ar", sql.Int, Ar)
            .query(`
                INSERT INTO Telefonok (Marka, Kiadas, Tipus, Ar)
                VALUES
                (@Marka, @Kiadas, @Tipus, @Ar)
                `)
        
        pool.close()
        res.status(201).json({success: true, message: "Sikeres adatfelvitel!"})
    }
    catch(err){
        console.error(`[ERROR/POST]`, err.message)
        res.status(500).json({success: false, error: err.message})
    }
})

module.exports = router