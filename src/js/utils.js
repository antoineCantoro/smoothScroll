export function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

export function lerp (start, end, amt) {
    return (1 - amt) * start + amt * end;
}