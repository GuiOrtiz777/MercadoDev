import React, { Component } from "react";
import HeaderHome from "./HeaderHome";
import AnuncioHome from "./AnuncioHome";
import LinkCategoria from "./LinkCategoria";
import base from "./base";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anuncios: []
    };

    base.bindToState("anuncios", {
      context: this,
      state: "anuncios",
      queries: {
        limitToLast: 3
      }
    });
  }

  render() {
    let index = 0;
    return (
      <div>
        <HeaderHome />
        <div className="container">
          <h3>Últimos Anuncios</h3>
          <div className="row">
            {Object.keys(this.state.anuncios).map(key => {
              const anuncio = this.state.anuncios[key];
              return <AnuncioHome anuncio={anuncio} id={key} key={key} />;
            })}
          </div>
          <h3>Categorias</h3>
          <div className="row">
            {this.props.categorias.map((categ, index) => {
              return [
                <LinkCategoria categoria={categ} key={index} />,
                ++index % 4 === 0 && <div className="w-100" key={`c${index}`} />
              ];
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
