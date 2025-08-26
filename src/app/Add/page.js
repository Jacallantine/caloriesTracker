import ClientFoods from "./clientPage"

export default async function AddPage() {
  const res = await fetch("http://localhost:3000/api/add", { cache: "no-store" })
  const foods = await res.json()
  

  return <ClientFoods foods = {foods} />
}
