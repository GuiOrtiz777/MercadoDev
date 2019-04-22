import React, { Component } from "react";
import HeaderInterno from "./HeaderInterno";
import base, { storage } from "./base";
import { Redirect } from "react-router-dom";

class NovoAnuncio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nome: "",
      descricao: "",
      preco: 0,
      telefone: "",
      vendedor: "",
      foto: "",
      categoria: "",
      sucess: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    if (evt.target.name === "foto") {
      this.setState({ [evt.target.name]: evt.target.files[0] });
      console.log(evt.target.files[0], " entrei no if");
    } else {
      this.setState({ [evt.target.name]: evt.target.value });
      console.log("value selecionado ", evt.target.value);
      console.log("state cat ", this.state.categoria);
    }

    return false;
  }

  handleSubmit(evt) {
    evt.preventDefault();

    const file = this.state.foto;
    const { name, size } = file;
    const ref = storage.ref(name);
    ref.put(file).then(img => {
      console.log("eu sou o img ", img);
    });

    ref.getDownloadURL().then(img => {
      console.log("imagem url: ", img);
      const infoAnuncio = {
        nome: this.state.nome,
        Descrição: this.state.descricao,
        preco: this.state.preco,
        telefone: this.state.telefone,
        vendedor: this.state.vendedor,
        categoria: this.state.categoria,
        foto: img
      };
      base
        .push("anuncios", {
          data: infoAnuncio
        })
        .then(() => {
          this.setState({ sucess: true });
        });
    });
  }
  render() {
    console.log(this.state.sucess);
    return (
      <div>
        {this.state.sucess && <Redirect to="/" />}
        <HeaderInterno />
        <div className="container" style={{ paddingTop: "120px" }}>
          <h1 className="new">Novo Anúncio</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="foto">Foto</label>
              <input
                type="file"
                className="form-control"
                name="foto"
                id="foto"
                placeholder="Foto"
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="categoria">Categorias</label>
              <select name="categoria" onChange={this.handleChange}>
                {this.props.categorias.map((categ, index) => (
                  <option value={categ.url} key={index}>
                    {categ.categoria}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                className="form-control"
                name="nome"
                id="nome"
                placeholder="Nome"
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="descricao">Descrição</label>
              <input
                type="text"
                className="form-control"
                name="descricao"
                id="descricao"
                placeholder="Descrição"
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="preco">Preço</label>
              <input
                type="text"
                className="form-control"
                name="preco"
                id="preco"
                placeholder="Preço"
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="telefone">Telefone</label>
              <input
                type="text"
                className="form-control"
                name="telefone"
                id="telefone"
                placeholder="Telefone"
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="vendedor">Vendedor</label>
              <input
                type="text"
                className="form-control"
                name="vendedor"
                id="vendedor"
                placeholder="Vendedor"
                onChange={this.handleChange}
              />
            </div>
            <button className="btn btn-primary">Salvar anúncio</button>
          </form>
        </div>
      </div>
    );
  }
}

export default NovoAnuncio;
