import styled from 'styled-components';
// A imagem estática pode servir como uma "reserva" caso a da API não carregue
import bannerReserva from "../assets/imgs/img_capa_exemplo.jpg";

// O styled component agora usa a prop 'imageUrl' para definir o fundo.
const Imagem = styled.div`
  width: 100%;
  height: 500px;
  filter: brightness(50%);
  background-image: url(${props => props.imageUrl || bannerReserva});
  background-position: center;
  background-size: cover;
  transition: background-image 0.5s ease-in-out; // Efeito suave de transição
`;

// O componente agora recebe 'imagemUrl' como uma propriedade (prop).
export default function Banner({ imagemUrl }){
    return(
        // Passamos a URL recebida para o nosso styled component.
        <Imagem imageUrl={imagemUrl} />
    )
}
