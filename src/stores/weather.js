import axios from "axios";
import dayjs from "dayjs";
import { defineStore } from "pinia";
import { computed, ref } from "vue";
const axiosInstance = axios.create({
  baseURL: 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline',
  params: {
    lang: 'ko',
    key: '6SY9EKB7V7WCMLZZX24CPTYFD',
    unitGroup: 'metric',
  }
})
const axiosInstance2 = axios.create({
  baseURL: 'https://api64.ipify.org/?format=json',
})
const axiosInstance3 = axios.create({
  baseURL: 'https://free.freeipapi.com/api/json'
})
export const useWeatherStore = defineStore('weather', () => {
  const address = ref('seoul')
  const days = ref(null)
  const currentConditions = ref(null)
  const searchData = ref([])
  const hours = computed(() => {
    return days.value
      ?.find((v) => v.datetime === dayjs().format('YYYY-MM-DD'))
      ?.hours.filter((v) => v.datetime > dayjs().format('HH:mm:ss'))
  })
  const forecast = computed(() => {
    return days.value?.filter((v) => v.datetime > dayjs().format('YYYY-MM-DD'))
  })
  const getCurrentWeatherInfo = async () => {
    try {
      const res = await axiosInstance.get('/' + address.value)
      currentConditions.value = res.data.currentConditions
      days.value = res.data.days
    } catch (e) {
      alert(e.response?.data ? e.response?.data : e.message)
    }
  }
  const getSearchWeatherInfo = async (city) => {
    try {
      const res = await axiosInstance.get('/' + city)
      const printData = {
        address: res.data.address,
        feelslikemax: res.data.days[0].feelsLIkemax,
        feelslikemin: res.data.days[0].feelslikemin,
        icon: res.data.currentConditions.icon,
        temp: res.data.currentConditions.temp,
      }
      if (searchData.value.findIndex((v) => v.address === res.data.address) === -1) {
        searchData.value.push(printData)
      } else {
        alert('이미 조회한 지역입니다.')
      }
    } catch (e) {
      console.log(e)
      alert(e.response?.data ? e.response.data : e.message)
    }
  }
  const getCityName = async () => {
    try {
      const res = await axiosInstance2.get()
      const ip = res.data.ip
      const res2 = await axiosInstance3.get('/' + ip)
      address.value = res2.data.cityName.split(' ')[0]
      console.log(res2)
    } catch (e) {
      alert(e.response?.data ? e.response.data : e.message)
    }
  }
  return { currentConditions, hours, forecast, searchData, getCurrentWeatherInfo, getSearchWeatherInfo, getCityName, address }
})