import React from 'react';
import { Link } from 'react-router-dom';

class Config extends React.Component {
  render() {
    return (
      <Link to="/config">
        <button
          data-testid="btn-settings"
          type="button"
        >
          Configurações
        </button>
      </Link>
    );
  }
}

export default Config;
