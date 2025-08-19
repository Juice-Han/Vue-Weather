import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";
const axiosInstance = axios.create({
  baseURL: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline',
  params: {
    lang: 'ko',
    key: '6SY9EKB7V7WCMLZZX24CPTYFD',
    unitGroup: 'metric',
  }
})
export const useWeatherStore = defineStore('weather', () => {
  const address = ref('seoul')
  const currentConditions = ref(null)
  const getCurrentWeatherInfo = async () => {
    try {
      const res = await axiosInstance.get('/' + address.value)
      currentConditions.value = res.data.currentConditions
    } catch (e) {
      alert(e.response?.data ? e.response?.data : e.message)
    }
  }
  return { currentConditions, getCurrentWeatherInfo }
})