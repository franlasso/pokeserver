import express from "express"
import pokemonControllers from "../controllers/pokemonStatus.controllers.js"

const router = express.Router()

router.post("/",pokemonControllers.createPokemon)
router.get("/",pokemonControllers.getPokemons)
router.put("/:pokemon_id",pokemonControllers.changeStatePokemon)
router.get("/:pokemon_id",pokemonControllers.getPokemonByPokemonId)
router.delete("/:pokemon_id",pokemonControllers.deletePokemonByPokemonId)
export default router