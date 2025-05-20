import pokemonStatusModel from "../models/pokemonStatus.model.js";

const createPokemon = async(req,res)=>{
    try {
        console.log(req.body)
        const pokemon = new pokemonStatusModel(req.body)
        await pokemon.save()
        return res.status(201).json(pokemon)
    } catch (error) {
        return res.status(500)
        .json({"code":500,"message":error.message,"status": false})
    }
}

const getPokemons = async (req,res)=>{
    try {
        const pokemons = await pokemonStatusModel.find()
        return res.status(200).json(pokemons)
    } catch (error) {
        return res.status(500)
        .json({"code":500,"message":error.message,"status": false})
}

}

const changeStatePokemon = async (req,res)=> {
  try {
        const pokemon_id = req.params.pokemon_id
        if(req.params.pokemon_id == req.body.pokemon_id) {
        const changePokemon = {
            pokemon_id:req.body.pokemon_id,
            view:req.body.view,
            catch:req.body.catch,
            in_team:req.body.in_team,
            power_level:req.body.power_level
         }
         let filter = {pokemon_id:pokemon_id}
         const pokemon = await pokemonStatusModel
         .findOneAndReplace(filter,changePokemon,{new:true})
         if(pokemon== null){
            return res.status(404).json({"code":404}.json({"code":400, "message": "Bad request:Id diferente en el body que en la ruta", "status": false}))
         }
         return res.status(200).json(pokemon)
        } else{
        return res.status(400).json({"code":400,"message": "Bad request: id diferente en el Body", "status":false})
    }

        } catch (error) {
         return res.status(500)
        .json({"code":500,"message":error.message,"status": false})
        }
    }

const getPokemonByPokemonId = async (req,res)=>{
    try {
        const pokemon_id = req.params.pokemon_id
        const filter ={pokemon_id:pokemon_id}
        const pokemon = await pokemonStatusModel.findOne(filter)
        if(pokemon== null){
        return res.status(404).json({"code":400,"message": "Pokemon no encontrado en la BD", "status": false})
    }
        return res.status(200).json(pokemon)
    } catch (error) {
        return res.status(500)
        .json({"code":500,"message":error.message,"status": false})
    }
}

const deletePokemonByPokemonId = async (req,res)=>{
    try {
        const pokemon_id = req.params.pokemon_id
        const filter ={pokemon_id:pokemon_id}
        const pokemon = await pokemonStatusModel.findOneAndDelete(filter)
        if(pokemon== null){
        return res.status(404).json({"code":400,"message": "Pokemon no encontrado en la BD", "status": false})
    }
        return res.status(200).json({"code":200,"message": "Pokemon eliminado de la BD", "status": false})
  
    } catch (error) {
        return res.status(500)
        .json({"code":500,"message":error.message,"status": false})
    }
}
export default {createPokemon, getPokemons, changeStatePokemon, getPokemonByPokemonId, deletePokemonByPokemonId}