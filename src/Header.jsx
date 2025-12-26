import Trollface from './assets/troll-face.png'

export default function Header(){
    return(
        <>
        <div className="header">
            <img className="troll-face" src={Trollface}/>
            <span>Meme Generator</span>
        </div>
        </>
    )
}