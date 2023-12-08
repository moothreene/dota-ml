import './HeroButton.css'
export default function HeroButton(props){
    return(
        <button class={"hero-button "+"id_"+props.hero.id} onClick={()=>props.handleClick(props.hero)}>
            <img src={require(`./images/${props.hero.img}`)} alt={props.hero.name}/>
            <p>{props.hero.localized_name}</p>
        </button>
    )
}