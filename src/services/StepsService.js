import apiURL from '../constants/apiURL'
import axios from 'axios'

export function getPastaTypes() {
        return axios.get(`${apiURL}/pastaTypes`)
}

export function getPizzaSizes() {
        return axios.get(`${apiURL}/pizzaSizes`)
}

export function getPizzas() {
        return axios.get(`${apiURL}/pizzas`)
}

export function getRecommendation() {
        return axios.get(`${apiURL}/pizzaRecommendation`)
}

export function getCredits () {
        return axios.get(`${apiURL}/userCredits`)
}

export function putCreditsUser (value) {
        return axios.put(`${apiURL}/userCredits`, { creditsQuantity: value })
}