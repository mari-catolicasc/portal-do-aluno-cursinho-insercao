import styled from 'styled-components';
<<<<<<< HEAD

const Secao = styled.div`
=======
import img from '../assets/imgs/img_capa_exemplo.jpg'

    const Secao = styled.div`
>>>>>>> main
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
<<<<<<< HEAD
        margin: 2% 15% 4% 15%; // Aumentei a margem inferior para separar melhor as seções
    `

const Titulo = styled.h3`
        font-size: 30px;
        text-align: center;
        margin: 0 0 2% 0;
        color: #333; // Adicionei uma cor para o título
    `

const Texto = styled.p`
        font-size: 18px;
        line-height: 1.6; // Melhorei a legibilidade
        margin: 2% 0 0 0;
        text-align: center;
        color: #555; // Adicionei uma cor para o texto
    `

const Img = styled.img`
        width: 60%;
        max-height: 400px;
        border-radius: 8px; // Adicionei um leve arredondamento
        box-shadow: 0 4px 8px rgba(0,0,0,0.1); // Adicionei uma sombra suave
        margin-bottom: 2%; // Adiciona espaço entre a imagem e o texto
    `

// O componente agora recebe as props: titulo, imagem e texto.
export default function Section({ titulo, imagem, texto }) {

    return (
        <Secao>
            {/* Usa o título recebido via prop */}
            <Titulo>{titulo}</Titulo>

            {/* Mostra a imagem APENAS se uma URL de imagem for recebida */}
            {imagem && <Img src={`http://localhost:8080${imagem}`} alt={titulo} />}
            
            {/* Usa o texto recebido via prop */}
            <Texto>{texto}</Texto>
=======
        margin: 2% 15% 2% 15%;
    `

    const Titulo = styled.h3`
        font-size: 30px;
        text-align: center;
        margin: 0 0 2% 0;
    `

    const Texto = styled.p`
        font-size: 18px;
        line-height: 20px;
        margin: 2% 0 0 0;
        text-align: center;
    `

    const Img = styled.img`
        width: 60%;
        max-height: 400px;
    `

export default function Section() {

    return(
        <Secao>
            <Titulo>Titulo teste</Titulo>
            <Img src={img} alt="imagem"></Img>
            <Texto>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim sagittis justo, vel luctus diam condimentum in. Donec sed metus et ipsum laoreet tincidunt ac gravida elit. Aenean porttitor elit nunc, et maximus nibh molestie id. Fusce eu magna neque. Morbi nec blandit elit. Maecenas vehicula mi a dui ullamcorper sagittis. Curabitur molestie tellus ac eros efficitur, ac porta turpis posuere. Sed sapien ante, maximus id scelerisque non, dictum non magna. Praesent interdum ligula at justo efficitur sollicitudin eget nec orci. Nullam suscipit commodo sem.

Suspendisse metus eros, placerat et maximus ac, placerat ut augue. Phasellus sagittis, risus at accumsan placerat, sapien ligula aliquet massa, id gravida justo nisi a quam. Quisque maximus velit arcu. Mauris augue lacus, pulvinar sed imperdiet laoreet, convallis ut libero. Donec mollis libero et diam rhoncus lacinia. Fusce sed iaculis turpis. In fringilla nisi felis, rhoncus varius nisl lobortis id. Mauris semper accumsan ullamcorper. Etiam malesuada ante in velit semper congue. Mauris nec pulvinar massa. Maecenas eget eleifend sem, et vulputate urna.

Etiam sed mattis risus. Maecenas ultrices est a ullamcorper bibendum. Vestibulum ut egestas quam. Nunc nec lacinia tellus. Integer cursus massa semper turpis aliquet pharetra. Curabitur et sodales libero, ac fermentum est. Morbi vulputate tincidunt orci eget dignissim. Morbi purus purus, tempor et interdum a, lacinia a dolor. Curabitur quis feugiat tortor, ut consectetur velit. Nunc convallis ultrices orci ac ullamcorper. Curabitur elementum nec risus sit amet elementum. Praesent sed condimentum est. Nunc pulvinar, ligula ut fermentum laoreet, erat risus tempor justo, ut sollicitudin odio ex quis erat. Donec posuere tempor consequat. In nec justo egestas, maximus dui at, hendrerit felis. Cras pulvinar lacus eu est ultrices ullamcorper.</Texto>
>>>>>>> main
        </Secao>
    );
}
