'use strict';

window.renderStatistics = renderStatistics;
function renderStatistics(ctx, names, times) {
  var statisticsBarWidth = 420;
  var statisticsBarHeight = 270;
  var statisticsBarColor = 'rgba(255, 255, 255, 1.0)';
  var statisticsShadowColor = 'rgba(0, 0, 0, 0.7)';
  var shadowIndentX = 10;
  var shadowIndentY = 10;
  var barWidth = 40;
  var barHeight = 150;
  var barIndent = 50;
  var initialX = 100;
  var initialY = 10;
  var lineHeight = 15;

  var topIndent = lineHeight * 5;
  var xIndent = (statisticsBarWidth - (barWidth * names.length + barIndent * (names.length - 1))) / 2;

  var drawStatisticsBar = function (a, b, fillColor) {
    ctx.fillStyle = fillColor;
    ctx.strokeRect(initialX + a, initialY + b, statisticsBarWidth, statisticsBarHeight);
    ctx.fillRect(initialX + a, initialY + b, statisticsBarWidth, statisticsBarHeight);
  };

  drawStatisticsBar(shadowIndentX, shadowIndentY, statisticsShadowColor);
  drawStatisticsBar(0, 0, statisticsBarColor);

  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  ctx.textAlign = 'center';
  ctx.fillText('Ура вы победили!', initialX + (statisticsBarWidth / 2), lineHeight * 3);
  ctx.textAlign = 'left';
  ctx.fillText('Список результатов: ', initialX + xIndent, lineHeight * 5);

  for (var i = 0; i <= times.length - 2; i++) {
    var minimum = times[i];
    for (var j = i + 1; j <= times.length - 1; j++) {
      if (times[j] < minimum) {
        minimum = times[j];
        times[j] = times[i];
        times[i] = minimum;
        var nameMin = names[j];
        names[j] = names[i];
        names[i] = nameMin;
      }
    }
  }

  var step = barHeight / times[times.length - 1];

  var getRandomNumber = function (min, max) {
    return (min + (max - min) * Math.random());
  };

  for (var k = 0; k <= names.length - 1; k++) {
    var x = initialX + xIndent + k * (barWidth + barIndent);
    var y = initialY + topIndent + barHeight;
    ctx.fillStyle = (names[k] === 'Вы') ? 'rgba(255, 0, 0, 1.0)' : 'rgba(0, 0, 255, ' + getRandomNumber(0.2, 1.0).toFixed(2) + ')';
    ctx.fillRect(x, y - step * times[k], barWidth, step * times[k]);
    ctx.textAlign = 'center';
    ctx.font = '18px PT Mono';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(k + 1, x + barWidth / 2, y - lineHeight);
    ctx.font = '14px PT Mono';
    ctx.fillStyle = '#000000';
    ctx.fillText(names[k], x + barWidth / 2, y + lineHeight);
    ctx.fillText(times[k].toFixed() + 'ms', x + barWidth / 2, y + 2 * lineHeight);
  }
}
