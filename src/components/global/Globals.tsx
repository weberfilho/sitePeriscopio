
export default abstract class Globals {
static idCity: any = 1
static cityName: string = "Belo Horizonte"

static GetCidade () {

  return localStorage.getItem("nome")
}
}
