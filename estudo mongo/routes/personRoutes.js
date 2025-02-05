const router = require('express').Router()

const Person = require('../models/Person')

//criacao de dados
router.post('/', async (req, res) => {

    // req.body
    //{nome:"mateus", salary:3000, approved : false}
    const { nome, salary, approved} = req.body

    if(!nome) {
        res.status(422).json({error: 'O nome é obrigatorio'})
    }
    const person = {
        nome,
        salary,
        approved
    }

    try {
        //criando dados
        await Person.create(person)

        res.status(201).json({message: 'Pessoa inserida no sistema com sucesso'})

    } catch (error) {
        res.status(500).json({error: error})
    }

})

// leitura de dados
router.get('/', async (req, res) => {
    try{
        const people = await Person.find()

        res.status(200).json(people)

    }catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/:id',async (req, res) => {
    console.log(req)

    // extrair o dado da requisição = req.params
    const id = req.params.id

    try {

        const person = await Person.findOne({_id: id})
        
        if(!person) {
            res.status(422).json({message: 'O usuáio não foi encontrado'})
            return
        }

        res.status(200).json(person)

    } catch (error) {
        res.status(500).json({ error: error })
    }

})

// Update = atualização de dados (PUT, PATCH)
router.patch('/:id', async (req, res) => {

    const id = req.params.id

    const {nome, salary, approved } = req.body

    const person = {
        nome,
        salary,
        approved,
    }

    try {

        const updatedPerson = await Person.updateOne({_id:id}, person) 

        console.log(updatedPerson)

        if(updatedPerson.matchedCount=== 0){
            res.status(422).json({message: 'O usuáio não foi encontrado'})
            return
        }

        res.status(200).json(person)
    }catch(error) {
        res.status(500).json({ error: error})
    }
})

// delete - deletar dados
router.delete('/:id', async (req,res) => {
    
    const id = req.params.id

    const person = await Person.findOne({_id: id})
        
        if(!person) {
            res.status(422).json({message: 'O usuáio não foi encontrado'})
            return
        }
        try{
            await Person.deleteOne({_id: id})

            res.status(200).json({message: 'Usuário removido com sucesso'})
        
        } catch(error) {
            res.status(500).json({ error: error })
        }
})

module.exports = router