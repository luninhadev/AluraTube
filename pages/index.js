import config from "../config.json"
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSRESET";
import Menu from "../src/components/menu";
import { StyledTimeline } from "../src/components/Timeline";

function HomePage() {
    const estilosDaHomePage = { 
        //backgroundColor: "red" 
    };

    //console.log(config.playList);

    return (
        <>
            <CSSReset />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,}}>
                <Menu />
                <Header />
                <Timeline playList={config.playList} />
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
    img {
        margin-top: 70px;
        width: 80px;
        height: 80px;
        border-radius: 50%;
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
            {/*<img src="banner" />*/}

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

function Timeline(propriedades) {
    //console.log("Dentro do componente", props.playList);
    const playListName = Object.keys(propriedades.playList)

    // não pode usar o loop for tradicional, pq ele é Statement
    // o react aceita tudo que é retorno por expressão
    return (
        // A linha 72 pode ser escrita assim: {playListName.map(function(playListName) {
        <StyledTimeline>
            {playListName.map((playListName) => {
                const videos = propriedades.playList[playListName]
                console.log(playListName);
                console.log(videos);
                return (
                    <section>
                        <h2>{playListName}</h2>
                        <div>
                            {videos.map((video) => {
                                return (
                                    <a href={video.url}>
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
        </StyledTimeline>
    )
}