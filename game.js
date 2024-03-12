class Game {
  constructor() {
    this.score = 0;
    this.choice = '';
    this.muted = false;
    this.shouldShowAdOnPlay = false;

    this.canvas = document.getElementById('gameContainer').getContext('2d');
    this.canvas.font = '24px Arial';

    this.playButton = document.getElementById('playButton');
    this.headsButton = document.getElementById('headsButton');
    this.tailsButton = document.getElementById('tailsButton');
    this.muteButton = document.getElementById('muteButton');

    this.playButton.addEventListener('click', () => {
      this.erase();
      this.play();
    });

    this.headsButton.addEventListener('click', () => {
      this.choice = 'Heads';
      this.flipCoin();
    });

    this.tailsButton.addEventListener('click', () => {
      this.choice = 'Tails';
      this.flipCoin();
    });

    this.muteButton.addEventListener('click', () => {
      let soundString = this.muted ? 'on' : 'off';
      this.muteButton.innerHTML = this.muted ? 'Mute sound' : 'Un-mute sound';
      this.muted = !this.muted;
      adConfig({
        sound: soundString
      });
    });

    adConfig({ sound: 'on' }); // Initial sound config
    this.erase();
  }

  play() {
    if (this.shouldShowAdOnPlay) {
      this.shouldShowAdOnPlay = false;

      adBreak({
        type: 'next', 
        name: 'restart-game',
        beforeAd: () => { this.disableButtons(); },
        afterAd: () => { this.enableButtons(); } 
      });
    }

    this.score = 0;
    this.canvas.fillText('Score: ' + this.score, 8, 26);
    this.canvas.fillText('Heads or Tails?', 66, 150);
    this.playButton.style.display = 'none';
    this.headsButton.style.display = 'inline-block';
    this.tailsButton.style.display = 'inline-block';
  }

  flipCoin() {
    this.headsButton.disabled = true;
    this.tailsButton.disabled = true;
    this.erase();
    this.canvas.fillText('Score: ' + this.score, 8, 26);
    this.canvas.fillText('Flipping coin . . .', 60, 150);

    setTimeout(() => { this.coinLanded() }, 2000);
  }

  coinLanded() {
    this.headsButton.disabled = false;
    this.tailsButton.disabled = false;
    let sideUp = (Math.random() < 0.5) ? 'Heads' : 'Tails';

    if (sideUp === this.choice ) {
      this.win(sideUp);
    } else {
      this.lose(sideUp);
    }
  }

  win(sideUp) {
    this.erase();
    this.score += 1;
    this.canvas.fillText('Score: ' + this.score, 8, 26);
    this.canvas.fillText('It was ' + sideUp + '!', 66, 150);
    this.canvas.fillText('Guess again', 70, 200);
  }

  lose(sideUp) {
    this.erase();
    this.canvas.fillText('Sorry, it was ' + sideUp, 50, 100);
    this.canvas.fillText('Your score was ' + this.score, 50, 150);
    this.canvas.fillText('Want to play again?', 45, 200);

    this.playButton.style.display = 'inline-block';
    this.headsButton.style.display = 'none';
    this.tailsButton.style.display = 'none';
    this.shouldShowAdOnPlay = true;
  }

  erase() {
    this.canvas.fillStyle = '#ADD8E6';
    this.canvas.fillRect(0, 0, 300, 300);
    this.canvas.fillStyle = '#000000';
  }

  enableButtons() {
    this.playButton.disabled = false;
    this.headsButton.disabled = false;
    this.tailsButton.disabled = false;
  }

  disableButtons() {
    this.playButton.disabled = true;
    this.headsButton.disabled = true;
    this.tailsButton.disabled = true;
  }
}

const game = new Game();
