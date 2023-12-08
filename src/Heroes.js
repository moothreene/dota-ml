import { useEffect, useState } from "react";
import HeroButton from "./HeroButton";
import { heroes_data } from "./heroes_data";
import './Heroes.css'


export default function Heroes(){
    const hero_empty={
        id: 0,
        name: "",
        localized_name: "",
        primary_attr: "",
        attack_type: "",
        roles: [],
        legs: 0,
        img:"No_Hero.png"
    }
    let [teamActive, setTeamActive] = useState("radiant");
    let [heroesRadiant, setHeroesRadiant] = useState([]);
    let [heroesDire, setHeroesDire] = useState([]);
    let [predictionValue, setPredictionValue] = useState(".5");
    let [winrateState, setWinrateState] = useState("uncalculated");

    useEffect(()=>{
        document.getElementById("radiantBar").style.width = 60*+predictionValue+"em";
        document.getElementById("direBar").style.width = 60*(1-+predictionValue)+"em";
    },[predictionValue]);

    useEffect(()=>{
        let team_buttons = document.getElementsByClassName("team-button");
        for(let button of team_buttons){
            button.classList.toggle("active");
        }
    },[teamActive]);

    function handleClick(hero){
        if(hero!=hero_empty){
            let hero_team = heroesRadiant.includes(hero)?"radiant":heroesDire.includes(hero)?"dire":null;
            let radiant_copy = [...heroesRadiant];
            let dire_copy = [...heroesDire];
            let toggle = true;
            if (hero_team=="radiant"){
                radiant_copy.splice(radiant_copy.indexOf(hero),1);
            }
            else if (hero_team=="dire"){
                dire_copy.splice(dire_copy.indexOf(hero),1);
            }
            else{
                if(teamActive === "radiant"&&heroesRadiant.length < 5){
                    radiant_copy.push(hero);
                    hero_team = "radiant";
                }
                else if(teamActive==="dire"&&heroesDire.length < 5){
                    dire_copy.push(hero)
                    hero_team = "dire";
                }
                else{
                    toggle = false;
                }
            }
            if(toggle==true){
                let selected = document.getElementsByClassName("id_"+hero.id);
                for(let element of selected){
                        element.classList.toggle("selected");
                        element.classList.toggle(hero_team);
            }
             
            setHeroesRadiant(radiant_copy);
            setHeroesDire(dire_copy);
            }
        
        }
    }

    function handleClickTeam(){
        teamActive=="radiant"?setTeamActive("dire"):setTeamActive("radiant");
    }

    async function handleSubmit(data){
        if (data){
            try{
                const response = await fetch('http://127.0.0.1:5000/get-pred/'+"1500,1500,"+data,{
                mode:"cors",
                method:'GET',
                headers:{
                    'Content-type':'application/json'
                        }
                });
                const result = await response.json();
                setPredictionValue(result);
                if(winrateState == "uncalculated"){
                    setWinrateState("calculated");
                }
            } catch(error){
                console.log("Error:"+error);
            }
        }

    }


    return(
        <div class="heroes-container">
            <div class="team-buttons">
                <div class="team-button radiant active">
                    <button onClick={handleClickTeam}>Radiant</button>
                </div>
                <div class="team-button dire">
                    <button onClick={handleClickTeam}>Dire</button>
                </div>
            </div>
            <div class="heroes-selected">

                {heroesRadiant.map(hero=>{
                    return(
                        <HeroButton hero={hero} handleClick={handleClick}></HeroButton>
                    )
                })}
                {Array.from(Array(5-heroesRadiant.length)).map(()=>{
                    return(
                    <HeroButton hero={hero_empty} handleClick={handleClick}></HeroButton>
                    )
                })}

                <div class="divider">|</div>
                
                {heroesDire.map(hero=>{
                    return(
                        <HeroButton hero={hero} handleClick={handleClick}></HeroButton>
                    )
                })}
                {Array.from(Array(5-heroesDire.length)).map(()=>{
                    return(
                    <HeroButton hero={hero_empty} handleClick={handleClick}></HeroButton>
                    )
                })}

            </div>
            <div class="button-container">
                <button onClick={()=>handleSubmit(heroesRadiant.concat(heroesDire).map((hero)=>hero.name))}><p>Submit</p></button>
            </div>
            <div class="winrate-container">
                <div class={`radiant bar `+winrateState} id="radiantBar"></div>
                <div class={`dire bar `+winrateState} id="direBar"></div>
            </div>
            <p class={`winrate-number `+winrateState}>{predictionValue}</p>
            <div class="heroes_pool">
                {heroes_data.map(hero=>{
                    return(
                        <HeroButton hero={hero} handleClick={handleClick}></HeroButton>
                    )
                })}
            </div>
        </div>
    )
}