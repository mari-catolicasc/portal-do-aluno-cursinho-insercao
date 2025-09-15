import styled from 'styled-components';
<<<<<<< HEAD
=======
import banner from "../assets/imgs/img_capa_exemplo.jpg";

const Imagem = styled.div`
  width: 100%;
  height: 500px;
  filter: brightness(50%);
  background-image: url(${banner});
  background-position: center;
  background-size: cover;
`;
>>>>>>> main

const Imagem = styled.div`
  width: 100%;
  height: 500px;
  filter: brightness(50%);
  background-image: url(${props => props.imageUrl});
  background-position: center;
  background-size: cover;
  transition: background-image 0.5s ease-in-out; // Efeito suave de transição
`;

export default function Banner({ imagemUrl }){
    return(
<<<<<<< HEAD
        <Imagem imageUrl={imagemUrl} />
=======
        <Imagem/>
>>>>>>> main
    )
}
