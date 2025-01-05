export default function generateDayWiseTimeSeries(
  baseval: number,
  count: number,
  yrange: {
    min: number;
    max: number;
  }
) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = baseval;
    var y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push([x, y]);
    baseval += 86400000;
    i++;
  }
  return series;
}
