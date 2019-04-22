import React from "react";
import { Link } from "react-router-dom";
// import { Container } from './styles';

const LinkCategoria = ({ categoria }) => {
  return (
    <Link
      to={`/categorias/${categoria.url}`}
      className="btn btn-secondary h-100 m-2 col-sm"
    >
      <i className={`fa ${categoria.icon} fa-4x`} aria-hidden="true" />
      {categoria.categoria}
    </Link>
  );
};

export default LinkCategoria;
