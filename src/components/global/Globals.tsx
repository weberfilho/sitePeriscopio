"use client"

import { useCityStorage } from "@/storage/city"


export default abstract class Globals {
static idCity: number | null  = 1
static cityName: string = "Sacramento"

static async GetCidade () {

  return await  useCityStorage().cityId
}

}