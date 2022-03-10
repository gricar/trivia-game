import React from 'react';

class GameCard extends React.Component {
  render() {
    return (
      <div className="game-card">
        <h2>Perguntas</h2>
        <p data-testid="question-category">category</p>
        <p data-testid="question-text">question</p>
        <p data-testid="correct-aswer">correct_answer</p>
        <p data-testid="wrong-answer-0">category</p>

      </div>

    );
  }
}

export default GameCard;
