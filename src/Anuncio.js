import React, { Component } from "react";
import axios from "axios";

class Anuncio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anuncio: {},
      isLoading: true
    };

    const id = this.props.match.params.idAnuncio;
    const url = `https://mercadodev-885ed.firebaseio.com/anuncios/${id}.json`;

    axios.get(url).then(data => {
      this.setState({ anuncio: data.data, isLoading: false });
    });
  }
  render() {
    const anuncio = this.state.anuncio;

    if (this.state.isLoading) {
      return <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" />;
    }

    return (
      <div>
        <h1>{anuncio.nome}</h1>
        <p>
          <img src={anuncio.foto} alt="Imagem do anuncio" />
        </p>
        <p>{anuncio.descricao}</p>
        <p>{anuncio.valor}</p>
        <p>{anuncio.vendedor}</p>
      </div>
    );
  }
}

export default Anuncio;
