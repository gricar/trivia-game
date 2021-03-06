import React from 'react';
import { Link } from 'react-router-dom';

class ConfigButton extends React.Component {
  render() {
    return (
      <Link to="/config">
        <button
          data-testid="btn-settings"
          type="button"
          className="settings-btn"
        >
          Configurações
        </button>
      </Link>
    );
  }
}

export default ConfigButton;
