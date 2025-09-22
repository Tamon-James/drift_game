<!DOCTYPE html>
<html>
<head>
    <title>ドリフト局ゲーム</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="game_css/gameStyle.css">
</head>
<body>
    <div id="startScreen">
        <h1>エンジン音クイズ</h1>
        <p>エンジン音を聞いて、どの車か当ててみてください！</p>
        <button id="startBtn">スタート</button>
    </div>

    <div id="countdownScreen" style="display: none;">
        <h1 id="countdown">3</h1>
    </div>

    <div id="gameScreen" style="display: none;">
        <h2 id="questionTitle"></h2>
        <button id="playBtn">▶ 再生</button>
        <button id="pauseBtn">⏸ 一時停止</button>
        <div id="choices"></div>
        <p id="result"></p>
    </div>

    <script src="./game_js/game.js"></script>
</body>
</html>