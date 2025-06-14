import { ReactNode, useEffect, useState } from "react"

function getRandInt(length: number): number {
    return Math.floor(Math.random() * (length*3))+length;
}

function SelectPlace(places: any, setPlaceList: any, setSelecting: any) {
    let placeList: Array<ReactNode> = places.map((place: any) => (<li key={place.location}>{place.displayName}</li>))
    let index = 0;
    const length = places.length;
    const randInt: number = getRandInt(length);
    let intervalId: any;
    let delay: number = 100

    intervalId = setInterval(() => {
        boldItem(places, placeList, index, setPlaceList)
        if(index === randInt) stopSelection()
        index += 1
        delay += 100
    }, delay)

    function stopSelection(){
        clearInterval(intervalId)
        setSelecting(false)
    }

}

function boldItem(places: any, placeList: any, index:number, setPlaceList: any) {
    const length: number = places.length;
    
    placeList[Math.abs(index - 1) % length] = <li key={places[Math.abs(index - 1) % length].location}>{places[Math.abs(index - 1) % length].displayName}</li>
    placeList[index % length] = <li key={places[index % length].location}><strong>{places[index % length].displayName}</strong></li>

    setPlaceList(<ul>{placeList}</ul>)
    
}

function BuildList(places: any, setPlaceList: any, loading: boolean) {

    useEffect(() => {
        if(!loading)
        setPlaceList(
            <ul>
                {places.map((place: any) => (
                    <li key={place.location}>{place.displayName}</li>
                ))}
            </ul>
        )
    }, [places]
)

}

export { BuildList, SelectPlace }