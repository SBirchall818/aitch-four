export default function random(range) {
  const smallest = -range;
  const largest = range;
  return Math.random() * (largest - smallest) + smallest;
}
