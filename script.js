const character = document.getElementById('character');
const obstacle = document.getElementById('obstacle');
const scoreSpan = document.getElementById('score');
const totalScoreContainer = document.getElementById('total-score-container');
const totalScoreSpan = document.getElementById('total-score');
const restartButton = document.getElementById('restart-button');

let score = 0;
let gameInterval;

// ジャンプ処理
document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && !character.classList.contains('jump')) {
        character.classList.add('jump');
        setTimeout(() => {
            character.classList.remove('jump');
        }, 500);
    }
});

function startGame() {
    // ゲーム状態のリセット
    score = 0;
    scoreSpan.textContent = score;
    totalScoreContainer.style.display = 'none';
    
    // 既存のゲームループがあれば停止
    if (gameInterval) {
        clearInterval(gameInterval);
    }

    // 障害物の移動とゲームループ開始
    moveObstacle();
}

function moveObstacle() {
    let obstacleRight = -20;
    let obstacleHeight = Math.floor(Math.random() * 50) + 20; // 20pxから70pxの高さ
    obstacle.style.height = obstacleHeight + 'px';
    obstacle.style.right = obstacleRight + 'px';

    const obstacleMove = () => {
        obstacleRight += 5;
        obstacle.style.right = obstacleRight + 'px';

        // 障害物を超えたか判定
        if (obstacleRight > 600) {
            score += Math.floor(obstacleHeight / 10); // 高さに基づいてスコアを追加
            scoreSpan.textContent = score;
            obstacleRight = -20;
            obstacleHeight = Math.floor(Math.random() * 50) + 20;
            obstacle.style.height = obstacleHeight + 'px';
        }

        // 衝突判定
        const characterRect = character.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        if (
            characterRect.left < obstacleRect.right &&
            characterRect.right > obstacleRect.left &&
            characterRect.bottom > obstacleRect.top
        ) {
            // 衝突した場合
            clearInterval(gameInterval);
            totalScoreSpan.textContent = score;
            totalScoreContainer.style.display = 'block';
        }
    };

    gameInterval = setInterval(obstacleMove, 20);
}

// リスタートボタンのイベントリスナー
restartButton.addEventListener('click', startGame);

// ゲーム開始
startGame();
