// StatNusa charts — plain canvas, no libraries. Every chart draws from the
// data in data.js and scales itself to its element's size.

const COLORS = {
  navy: '#0f2a43',
  teal: '#0e7c6b',
  amber: '#e8a33d',
  grid: '#e2e8ec',
  axis: '#8a99a5',
  text: '#5b6b78',
};

// Size a canvas to its CSS box (times the device pixel ratio) and return the
// 2d context plus the drawing dimensions.
export function setupCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  canvas.width = Math.max(1, Math.round(width * dpr));
  canvas.height = Math.max(1, Math.round(height * dpr));
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, width, height };
}

function niceTicks(min, max, count) {
  if (min === max) { min -= 1; max += 1; }
  const span = max - min;
  const stepRaw = span / count;
  const mag = Math.pow(10, Math.floor(Math.log10(stepRaw)));
  const norm = stepRaw / mag;
  const step = (norm < 1.5 ? 1 : norm < 3.5 ? 2 : norm < 7.5 ? 5 : 10) * mag;
  const start = Math.floor(min / step) * step;
  const end = Math.ceil(max / step) * step;
  const ticks = [];
  for (let v = start; v <= end + step * 0.001; v += step) ticks.push(v);
  return ticks;
}

function drawAxes(ctx, box, ticks, format) {
  ctx.strokeStyle = COLORS.grid;
  ctx.fillStyle = COLORS.text;
  ctx.font = '11px -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.lineWidth = 1;
  for (const t of ticks) {
    const y = box.top + ((box.max - t) / (box.max - box.min)) * box.height;
    ctx.beginPath();
    ctx.moveTo(box.left, y);
    ctx.lineTo(box.left + box.width, y);
    ctx.stroke();
    ctx.fillText(format(t), box.left - 7, y);
  }
}

// A line chart with points, a filled area and value labels.
export function lineChart(canvas, labels, values, options = {}) {
  const { ctx, width, height } = setupCanvas(canvas);
  const color = options.color || COLORS.teal;
  const unit = options.unit || '';
  const decimals = options.decimals ?? 1;
  const min = Math.min(...values, 0);
  const max = Math.max(...values);
  const ticks = niceTicks(min, max, 4);
  const box = {
    left: 46, top: 12, width: width - 58, height: height - 44,
    min: ticks[0], max: ticks[ticks.length - 1],
  };
  drawAxes(ctx, box, ticks, (v) => v.toFixed(decimals) + unit);
  const xAt = (i) => box.left + (labels.length === 1 ? box.width / 2 : (i / (labels.length - 1)) * box.width);
  const yAt = (v) => box.top + ((box.max - v) / (box.max - box.min)) * box.height;

  // Area fill.
  ctx.beginPath();
  values.forEach((v, i) => (i === 0 ? ctx.moveTo(xAt(i), yAt(v)) : ctx.lineTo(xAt(i), yAt(v))));
  ctx.lineTo(xAt(values.length - 1), box.top + box.height);
  ctx.lineTo(xAt(0), box.top + box.height);
  ctx.closePath();
  ctx.fillStyle = color + '22';
  ctx.fill();

  // Line and points.
  ctx.beginPath();
  values.forEach((v, i) => (i === 0 ? ctx.moveTo(xAt(i), yAt(v)) : ctx.lineTo(xAt(i), yAt(v))));
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.stroke();
  ctx.fillStyle = color;
  for (let i = 0; i < values.length; i++) {
    ctx.beginPath();
    ctx.arc(xAt(i), yAt(values[i]), 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Labels and values. A label that would run past the top of the plot area
  // is drawn below its point instead, so no value is ever clipped.
  ctx.fillStyle = COLORS.text;
  ctx.font = '11px -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  labels.forEach((label, i) => ctx.fillText(label, xAt(i), box.top + box.height + 8));
  ctx.fillStyle = COLORS.navy;
  ctx.font = 'bold 11px -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
  values.forEach((v, i) => {
    if (yAt(v) - 18 < box.top) {
      ctx.textBaseline = 'top';
      ctx.fillText(v.toFixed(decimals) + unit, xAt(i), yAt(v) + 7);
    } else {
      ctx.textBaseline = 'bottom';
      ctx.fillText(v.toFixed(decimals) + unit, xAt(i), yAt(v) - 7);
    }
  });
}

// A vertical bar chart.
export function barChart(canvas, labels, values, options = {}) {
  const { ctx, width, height } = setupCanvas(canvas);
  const color = options.color || COLORS.teal;
  const unit = options.unit || '';
  const decimals = options.decimals ?? 1;
  const max = Math.max(...values, 0);
  const ticks = niceTicks(0, max, 4);
  const box = {
    left: 46, top: 12, width: width - 58, height: height - 44,
    min: 0, max: ticks[ticks.length - 1],
  };
  drawAxes(ctx, box, ticks, (v) => v.toFixed(decimals) + unit);
  const slot = box.width / values.length;
  const barW = Math.min(46, slot * 0.62);
  values.forEach((v, i) => {
    const x = box.left + i * slot + (slot - barW) / 2;
    const y = box.top + ((box.max - v) / box.max) * box.height;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, barW, box.top + box.height - y);
    // Value label above the bar, or just inside it when the bar fills the plot.
    if (y - 16 < box.top) {
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 11px -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(v.toFixed(decimals) + unit, x + barW / 2, y + 5);
    } else {
      ctx.fillStyle = COLORS.navy;
      ctx.font = 'bold 11px -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(v.toFixed(decimals) + unit, x + barW / 2, y - 4);
    }
    ctx.fillStyle = COLORS.text;
    ctx.font = '11px -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
    ctx.textBaseline = 'top';
    ctx.fillText(labels[i], x + barW / 2, box.top + box.height + 8);
  });
}

// A horizontal bar chart: long labels on the left, bars to the right.
export function hbarChart(canvas, labels, values, options = {}) {
  const { ctx, width, height } = setupCanvas(canvas);
  const color = options.color || COLORS.teal;
  const unit = options.unit || '';
  const decimals = options.decimals ?? 1;
  const max = Math.max(...values);
  const rowH = (height - 16) / values.length;
  const barH = Math.min(20, rowH * 0.6);
  const left = options.labelWidth || 168;
  values.forEach((v, i) => {
    const y = 8 + i * rowH + (rowH - barH) / 2;
    const w = ((width - left - 56) * v) / max;
    ctx.fillStyle = COLORS.text;
    ctx.font = '12px -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
    ctx.fillText(labels[i], left - 8, y + barH / 2);
    ctx.fillStyle = color;
    ctx.fillRect(left, y, Math.max(1, w), barH);
    ctx.fillStyle = COLORS.navy;
    ctx.font = 'bold 12px -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(v.toFixed(decimals) + unit, left + w + 6, y + barH / 2);
  });
}

// A grouped bar chart with two series (used for trade: exports vs imports).
export function groupedBarChart(canvas, labels, seriesA, seriesB, options = {}) {
  const { ctx, width, height } = setupCanvas(canvas);
  const unit = options.unit || '';
  const max = Math.max(...seriesA, ...seriesB, 0);
  const ticks = niceTicks(0, max, 4);
  const box = {
    left: 46, top: 12, width: width - 58, height: height - 52,
    min: 0, max: ticks[ticks.length - 1],
  };
  drawAxes(ctx, box, ticks, (v) => v.toFixed(0) + unit);
  const slot = box.width / labels.length;
  const barW = Math.min(30, slot * 0.3);
  labels.forEach((label, i) => {
    const cx = box.left + i * slot + slot / 2;
    const yA = box.top + ((box.max - seriesA[i]) / box.max) * box.height;
    const yB = box.top + ((box.max - seriesB[i]) / box.max) * box.height;
    ctx.fillStyle = COLORS.teal;
    ctx.fillRect(cx - barW - 2, yA, barW, box.top + box.height - yA);
    ctx.fillStyle = COLORS.amber;
    ctx.fillRect(cx + 2, yB, barW, box.top + box.height - yB);
    ctx.fillStyle = COLORS.text;
    ctx.font = '11px -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText(label, cx, box.top + box.height + 8);
  });
  ctx.font = '12px -apple-system, "Segoe UI", Roboto, Arial, sans-serif';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  const ly = box.top + box.height + 28;
  ctx.fillStyle = COLORS.teal;
  ctx.fillRect(box.left, ly - 5, 12, 10);
  ctx.fillStyle = COLORS.text;
  ctx.fillText(options.labelA || 'Series A', box.left + 17, ly);
  const wA = ctx.measureText(options.labelA || 'Series A').width;
  ctx.fillStyle = COLORS.amber;
  ctx.fillRect(box.left + 24 + wA, ly - 5, 12, 10);
  ctx.fillStyle = COLORS.text;
  ctx.fillText(options.labelB || 'Series B', box.left + 41 + wA, ly);
}
