export const runtime = 'edge';

export default function Page() {
  try {
    return <h1>Test OK</h1>;
  } catch (e) {
    return <pre>{JSON.stringify(e, null, 2)}</pre>;
  }
}