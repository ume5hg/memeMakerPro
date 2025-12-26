import template from './assets/disasterGirl.jpg'
import {useState,useEffect} from 'react'
import html2canvas from 'html2canvas';
export default function BelowHeader(){

    const[meme, setMeme] = useState({
        topText:"Enter Top Text",
        bottomText:"Enter Bottom Text",
        memeUrl:template
    })

    function handleChange(event){
        const{name,value}=event.target;
        setMeme(prev => ({
            ...prev,
            [name]:value
        }));
    }

    const[allMemes, setAllMemes] = useState(null);
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
                .then(data => setAllMemes(data.data.memes)
            )
    },[]);

    function getRandomMeme(){
        const randomIndex = Math.floor(Math.random()*allMemes.length);
        const randomMeme = allMemes[randomIndex];
        setMeme(prev => ({
            ...prev,
            memeUrl: randomMeme.url
        }));
    }
    console.log("rendered!");

    function downloadMeme(){
        const memeElement = document.querySelector(".meme");

        html2canvas(memeElement, 
            {useCORS:true,
             allowTaint: false
            })
        .then((canvas)=> {
            const link = document.createElement("a");
            link.download = "meme.png";
            link.href = canvas.toDataURL("image/png");
            link.click();
        });
    }

    return(
        <>
        <div className="body-container">
            <form>
                <div className="input-row">
                    <div className="label1">
                        <label for="toptext">Top Text</label>
                        <input type="text"
                        id="toptext"
                        placeholder="Enter Top Text"
                        name="topText"
                        value={meme.topText}
                        onChange={handleChange}/>
                    </div>
                    
                    <div className="label1">
                        <label for="bottomtext">Bottom Text</label>
                        <input type="text" 
                        id="bottomtext"
                        placeholder="Enter Bottom Text"
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={handleChange}/>
                    </div>
                </div>
                
                <button type="button"
                    className="getImageBtn"
                    onClick = {getRandomMeme}>
                    Get a new meme image
                </button>
            </form>
            
            
            <div className="meme">
                <img className="generated-meme" src={meme.memeUrl}
                crossOrigin='anonymous'
                alt='meme' />
                <span className="top-text">{meme.topText}</span>
                <span className="bottom-text">{meme.bottomText}</span>
            </div>

            <button type="button"
                    className="downloadImageBtn"
                    onClick={downloadMeme}>
                    Download the meme
                </button>
        </div>
        </>
    )
}