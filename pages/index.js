import React from "react";
import config from "../config.json"
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSRESET";
import Menu from "../src/components/menu/index";
import { StyledTimeline } from "../src/components/Timeline"
import banner from "./nasa.jpg"

function HomePage() {
    const estilosDaHomePage = {
        //backgroundColor: "red" 
    };
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");

    //console.log(config.playList);

    return (
        <>
            <CSSReset />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>

                {/* Prop Drilling */}
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header />
                <Timeline searchValue={valorDoFiltro} playList={config.playList} />
            </div>
        </>
    )
}
// o que o nextjs exporta é a home da sua pagina
export default HomePage


/*
function Menu() {
    return (
        <div>
            Menu
        </div>
    )
}
*/

/* a variável se torna um componente div com atributos css */
const StyledHeader = styled.div`

    img{
        margin-top: 0px;
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .imagem {
        margin-top: 56px;
        position: relative;
        width: 100vw;
        height: 300px;
        border-radius: 0;
        
        object-fit: cover;
        background-clip: border-box;
    }
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;

function Header() {
    return (
        <StyledHeader>

            {<img className="imagem" src={banner.src} />/* precisa colocar o .src no objeto importado */}

            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

//Construindo a estilização do favoritos
const Styledfavorite = styled.div`
    .h2{
        margin-left: 15px;
    }
    .lista{
        //overflow-y: scroll;
        gap: 4px;
        display: flex;
        justify-content: center;
    }
    .div1{
        text-align: center;
    }
    .thumb {
        align-items: center;
        border-radius: 50%;
        height: 60px;
        width: 60px;
    }
    .nome{
        color: black;
        text-align: center;
        display: flex;
        justify-content: center;
    }
`;

function Timeline({ searchValue, ...propriedades }) {
    //console.log("Dentro do componente", props.playList);
    const playListName = Object.keys(propriedades.playList)

    // não pode usar o loop for tradicional, pq ele é Statement
    // o react aceita tudo que é retorno por expressão
    return (
        // pode ser escrita assim: {playListName.map(function(playListName) {

        <StyledTimeline>
            {playListName.map((playListName) => {
                const videos = propriedades.playList[playListName]
                //console.log(playListName);
                //console.log(videos);
                return (
                    <section key={playListName}>
                        <h2>{playListName}</h2>
                        <div>
                            {videos.filter((video) => {
                                const titleNormalized = video.title.toLowerCase()
                                const searchValueNormalized = searchValue.toLowerCase()
                                return titleNormalized.includes(searchValueNormalized);
                            }).map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
            <Styledfavorite>
                <h2 className="h2">AluraTube Favoritos</h2>
                <div className="lista">
                    {config.favorite.map(function (favorito) {
                        return (
                            // o favorito recebeu os indices do array
                            <div key={favorito.url} className="div1" >
                                <a href={favorito.url}>
                                    <img className="thumb" src={`https://github.com/${favorito.github}.png`} />
                                    <h5 className="nome">{favorito.name}</h5>
                                </a>
                            </div>
                        )
                    })}
                </div>
            </Styledfavorite>
        </StyledTimeline>
    )
}