import React, { Component } from "react";
import axios from "axios";

import AnuncioHome from "./AnuncioHome";
//import spinner-solid from '../font/spinner-solid';

class Categoria extends Component {
  constructor(props) {
    super(props);
    //Carregar os dados
    this.state = {
      anuncios: {},
      isLoading: false
    };

    this.loadAnuncios = this.loadAnuncios.bind(this);
    this.loadAnuncios(this.props.match.params.urlCategoria);
  }

  loadAnuncios(urlCategoria) {
    this.setState({
      isLoading: true,
      anuncios: {}
    });
    const url = `https://mercadodev-885ed.firebaseio.com/anuncios.json?orderBy=%22categoria%22&equalTo=%22${urlCategoria}%22`;
    axios.get(url).then(data => {
      this.setState({ anuncios: data.data, isLoading: false });
      this.categoria = urlCategoria;
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.match.params.urlCategoria) {
      if (this.categoria !== newProps.match.params.urlCategoria) {
        this.loadAnuncios(newProps.match.params.urlCategoria);
      }
    }
  }

  render() {
    return (
      <div>
        <div className="row">
          <h1>Categoria:</h1>
          {this.state.isLoading && (
            <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" />
          )}
          {!this.state.isLoading &&
            Object.keys(this.state.anuncios).length === 0 && (
              <p>Nenhum produto cadastrado</p>
            )}
          {Object.keys(this.state.anuncios).map(key => {
            const anuncio = this.state.anuncios[key];
            return <AnuncioHome anuncio={anuncio} id={key} key={key} />;
          })}
        </div>
      </div>
    );
  }
}

export default Categoria;
