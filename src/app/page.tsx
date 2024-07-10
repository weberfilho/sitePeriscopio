

import Button from "@/components/button/Button";
import Link from "next/link";

export default function Home() {  
  
  var cityRef: string = "Belo Horizonte"
  return (
    <main className="flex flex-col px-16 pt-8  ">
      <input type="text" id="principal" className="px-4 py-4 border-spacing-4 rounded-full border-green border-solid border-2 shadow-md shadow-gray-500 border-black " placeholder="Pesquisar Festas e Locais">        
      </input>
      <div className="flex flex-col space-y-5 my-8 ">
        <Link href={{
          pathname: "./events/eventDate",
          query: { userId: 1, city: cityRef }
        }}>
          <Button title="FESTAS E EVENTOS" />
        </Link>

        <Link href={`./places/placeList/1`}>
        <Button title="BARES E BOTECOS" />          
        </Link>
        <Link href={`./places/placeList/2`}>
        <Button title="CASAS NOTURNAS" />                  
        </Link>
        <Link href={`./places/placeList/3`}>
        <Button title="TEATROS" />                
        </Link>
        <Link href={`./places/placeList/4`}>
        <Button title="CINEMAS" />               
        </Link> 
               

      </div>

    </main>
  );
}
